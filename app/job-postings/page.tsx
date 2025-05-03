"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Building2, PenSquare, Fan } from "lucide-react";
import { JobPostingsResponse } from "@/types/Jobposting";
import useSWR from "swr";

const fetcher = (url: string): Promise<{ response: JobPostingsResponse }> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Faild fetching job_posting in client");
    }
    return response.json();
  });

export default function JobPostingsPage() {
  const { data, isLoading, error } = useSWR(
    "/api/v1/auth/job-posting",
    fetcher,
  );
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleStatusChange = async (id: number, isActive: boolean) => {
    const requestData = {
      id: id,
      isActive: isActive,
    };

    setUpdatingId(id);

    try {
      const response = await fetch("/api/v1/auth/job-posting/change_active", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to change job posting status");
      }
    } catch (error) {
      console.error("Error creating job posting:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8">
          <Card>
            <CardHeader>
              <CardTitle>エラー</CardTitle>
              <CardDescription>求人情報の取得に失敗しました</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
            <CardFooter>
              <Link href="/">
                <Button>ホームに戻る</Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

  if (isLoading || !data || !data.response) {
    console.log(data);
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">
              求人情報を読み込み中...
            </p>
          </div>
        </main>
      </div>
    );
  }

  const jobPostings: JobPostingsResponse = data.response;

  return (
    <div className="min-h-screen flex flex-col w-[80%] mx-auto">
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">求人管理</h1>
            <p className="text-muted-foreground mt-2">
              自社の求人情報を管理します
            </p>
          </div>
          <Link href="/job-postings/create">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              新規求人を作成
            </Button>
          </Link>
        </div>

        {jobPostings.job_postings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">求人がありません</h2>
              <p className="text-muted-foreground mb-6">
                新しい求人を作成して、インターンを募集しましょう。
              </p>
              <Link href="/job-postings/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新規求人を作成
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {jobPostings.job_postings.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <div className="flex items-center justify-center gap-4">
                        {updatingId === job.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Switch
                            checked={job.is_active}
                            onCheckedChange={(checked: any) =>
                              handleStatusChange(job.id, checked)
                            }
                            aria-label="募集状態"
                          />
                        )}
                        <span
                          className={
                            job.is_active ? "text-green-600" : "text-red-500"
                          }
                        >
                          {job.is_active ? "募集中" : "停止中"}
                        </span>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Link
                            href={`/job-postings/edit/${job.id}`}
                            className="flex items-center gap-2"
                          >
                            <PenSquare className="h-4 w-4" />
                            編集する
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {job.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {job.skills.map((skill) => (
                          <Badge key={skill.id} variant="secondary">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {job.industries.map((industry) => (
                          <Badge
                            key={industry.id}
                            variant="outline"
                            className="bg-slate-100"
                          >
                            {industry.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
