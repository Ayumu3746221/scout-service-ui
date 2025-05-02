"use client";

import { IndustriesResponse } from "@/types/Industry";
import { SkillsResponse } from "@/types/Skill";
import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MultiSelect } from "@/components/multi_selector/MultiSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import StudentProfile from "@/types/StudentProfile";

interface StudentProfileEditorProps {
  industries: IndustriesResponse;
  skills: SkillsResponse;
  studentProfile: StudentProfile;
}

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 6 }, (_, i) => currentYear + i);

const profileFormSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  introduce: z.string().nullable(),
  graduation_year: z.string().nullable(),
  school: z.string().nullable(),
  portfolio_url: z.string().nullable(),
  industry_ids: z.array(z.number()),
  skill_ids: z.array(z.number()),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function StudentProfileEditor({
  industries,
  skills,
  studentProfile,
}: StudentProfileEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: studentProfile.name,
      introduce: studentProfile.introduce || "",
      graduation_year: studentProfile.graduation_year?.toString() || null,
      school: studentProfile.school || "",
      portfolio_url: studentProfile.portfolio_url || "",
      industry_ids:
        studentProfile.industries.map((industry) => industry.id) || [],
      skill_ids: studentProfile.skills.map((skill) => skill.id) || [],
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    setIsSaving(true);
    try {
      const requestData = {
        student: {
          user_id: studentProfile.user_id,
          name: values.name,
          introduce: values.introduce || null,
          graduation_year: values.graduation_year
            ? parseInt(values.graduation_year)
            : null,
          school: values.school || null,
          portfolio_url: values.portfolio_url || null,
          industry_ids: values.industry_ids,
          skill_ids: values.skill_ids,
        },
      };

      const response = await fetch("/api/v1/auth/profile/student", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      router.push(`/student/${studentProfile.user_id}`);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>プロフィール編集</CardTitle>
            <CardDescription>
              あなたのプロフィール情報を更新します。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名前</FormLabel>
                      <FormControl>
                        <Input placeholder="山田 太郎" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>学校名</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="○○大学 △△学部"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        大学名と学部を入力してください。
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="graduation_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>卒業予定年</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString() || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="卒業予定年を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {graduationYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}年
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="introduce"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>自己紹介</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="自己紹介文を入力してください"
                          className="min-h-[120px]"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        あなたの経験、興味、目標などを書いてください。
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolio_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ポートフォリオURL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-portfolio.com"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        あなたの作品やGitHubなどのURLを入力してください。
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
                      <FormLabel>興味のある業界</FormLabel>
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
                        興味のある業界を選択してください（複数選択可）。
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
                      <FormLabel>スキル</FormLabel>
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
                        あなたが持っているスキルを選択してください（複数選択可）。
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isSaving}
            >
              キャンセル
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                "保存する"
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
