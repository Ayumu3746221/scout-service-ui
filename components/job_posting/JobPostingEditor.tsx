"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobPostingForm } from "@/components/job_posting/JobPostingEdit";
import { JobPosting } from "@/types/Jobposting";
import { SkillsResponse } from "@/types/Skill";
import { IndustriesResponse } from "@/types/Industry";

interface JobPostingEditorProps {
  jobPosting: JobPosting;
  skills: SkillsResponse;
  industries: IndustriesResponse;
}

export default function JobPostingEditor({
  jobPosting,
  skills,
  industries,
}: JobPostingEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const requestData = {
        job_posting: {
          id: jobPosting.id,
          title: values.title,
          description: values.description,
          requirements: values.requirements,
          is_active: values.is_active,
          skill_ids: values.skill_ids,
          industry_ids: values.industry_ids,
        },
      };

      const response = await fetch("/api/v1/auth/job-posting", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Error updating job posting");
      }

      router.push("/job-postings");
    } catch (err) {
      console.error("Error updating job posting:", err);
      setError("求人の更新中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error || !jobPosting) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8">
          <Card>
            <CardHeader>
              <CardTitle>エラー</CardTitle>
              <CardDescription>求人情報の取得に失敗しました</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{error || "求人情報が見つかりません。"}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>求人編集</CardTitle>
            <CardDescription>
              インターンシップ募集内容を編集します。
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <JobPostingForm
              jobPosting={jobPosting}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              skills={skills}
              industries={industries}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
