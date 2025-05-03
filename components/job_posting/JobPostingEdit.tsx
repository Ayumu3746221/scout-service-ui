"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/multi_selector/MultiSelector";
import { Loader2 } from "lucide-react";
import { JobPosting } from "@/types/Jobposting";
import { SkillsResponse } from "@/types/Skill";
import { IndustriesResponse } from "@/types/Industry";

const jobPostingFormSchema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  description: z.string().min(1, { message: "募集内容を入力してください" }),
  requirements: z.string().min(1, { message: "応募要件を入力してください" }),
  is_active: z.boolean(),
  skill_ids: z
    .array(z.number())
    .min(1, { message: "少なくとも1つのスキルを選択してください" }),
  industry_ids: z
    .array(z.number())
    .min(1, { message: "少なくとも1つの業界を選択してください" }),
});

type JobPostingFormValues = z.infer<typeof jobPostingFormSchema>;

interface JobPostingFormProps {
  jobPosting?: JobPosting | null;
  onSubmit: (values: JobPostingFormValues) => Promise<void>;
  isSubmitting: boolean;
  skills: SkillsResponse;
  industries: IndustriesResponse;
}

export function JobPostingForm({
  jobPosting,
  onSubmit,
  isSubmitting,
  skills,
  industries,
}: JobPostingFormProps) {
  const router = useRouter();

  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingFormSchema),
    defaultValues: {
      title: jobPosting?.title || "",
      description: jobPosting?.description || "",
      requirements: jobPosting?.requirements || "",
      is_active: false,
      skill_ids: jobPosting?.skills.map((skill) => skill.id) || [],
      industry_ids: jobPosting?.industries.map((industry) => industry.id) || [],
    },
  });

  const handleSubmit = async (values: JobPostingFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input
                  placeholder="Webアプリケーション開発インターン"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                求人のタイトルを入力してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>募集内容</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="募集内容の詳細を入力してください"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                業務内容や期待する成果などを詳しく記入してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>応募要件</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="応募要件を入力してください"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                必要なスキルや経験、資格などを記入してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skill_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>必要スキル</FormLabel>
              <FormControl>
                <MultiSelect
                  options={skills.map((skill) => ({
                    value: skill.id,
                    label: skill.name,
                  }))}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="スキルを選択してください"
                />
              </FormControl>
              <FormDescription>
                この求人に必要なスキルを選択してください（複数選択可）。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>関連業界</FormLabel>
              <FormControl>
                <MultiSelect
                  options={industries.map((industry) => ({
                    value: industry.id,
                    label: industry.name,
                  }))}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="業界を選択してください"
                />
              </FormControl>
              <FormDescription>
                この求人に関連する業界を選択してください（複数選択可）。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">募集状態</FormLabel>
                <FormDescription>
                  {field.value ? "現在募集中です" : "現在募集を停止しています"}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              "保存する"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
