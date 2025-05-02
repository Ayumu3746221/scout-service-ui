"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@/types/Company";
import { IndustriesResponse } from "@/types/Industry";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const companyFormSchema = z.object({
  name: z.string().min(1, { message: "会社名を入力してください" }),
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください" })
    .email({ message: "有効なメールアドレスを入力してください" }),
  address: z.string().nullable(),
  industry_id: z.string().min(1, { message: "業界を選択してください" }),
  description: z.string().nullable(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

interface CompanyEditorProps {
  companyProfile: Company;
  industries: IndustriesResponse;
}

export default function CompanyEditor({
  companyProfile,
  industries,
}: CompanyEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: companyProfile.name,
      email: companyProfile.email,
      address: companyProfile.address || "",
      industry_id: companyProfile.industry_id.toString(),
      description: companyProfile.description || "",
    },
  });

  async function onSubmit(values: CompanyFormValues) {
    setIsSaving(true);
    try {
      const requestData = {
        company: {
          company_id: companyProfile.id,
          name: values.name,
          email: values.email,
          address: values.address || null,
          industry_id: Number.parseInt(values.industry_id),
          description: values.description || null,
        },
      };

      const response = await fetch("/api/v1/auth/profile/company", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to update company profile");
      }

      router.push(`/company/profile/${companyProfile.id}`);
    } catch (err) {
      console.error("Error updating company profile:", err);
      setError("プロフィールの更新中にエラーが発生しました。");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>企業プロフィール編集</CardTitle>
            <CardDescription>企業情報を更新します。</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
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
                        <FormLabel>会社名</FormLabel>
                        <FormControl>
                          <Input placeholder="株式会社サンプル" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="info@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          企業の連絡先として表示されます。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>所在地</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="東京都渋谷区〇〇"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>
                          会社の所在地を入力してください。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>業界</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="業界を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem
                                key={industry.id}
                                value={industry.id.toString()}
                              >
                                {industry.name}
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>会社概要</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="会社の概要や特徴を入力してください"
                            className="min-h-[150px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>
                          会社の事業内容や特徴、企業文化などを記入してください。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
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
