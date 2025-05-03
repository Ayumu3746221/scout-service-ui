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
import { SkillsResponse } from "@/types/Skill";
import { IndustriesResponse } from "@/types/Industry";

interface JobCreatorProps {
  skills: SkillsResponse;
  industries: IndustriesResponse;
}

export default function JobCreator({ skills, industries }: JobCreatorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const requestData = {
        job_posting: {
          title: values.title,
          description: values.description,
          requirements: values.requirements,
          is_active: values.is_active,
          skill_ids: values.skill_ids,
          industry_ids: values.industry_ids,
        },
      };

      const response = await fetch("/api/v1/auth/job-posting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      router.push("/job-postings");
    } catch (err) {
      console.error("Error creating job posting:", err);
      setError("求人の作成中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>新規求人作成</CardTitle>
            <CardDescription>
              新しいインターンシップ募集を作成します。
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <JobPostingForm
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
