"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { Briefcase, Loader2, GraduationCap } from "lucide-react";
import { IndustriesResponse } from "@/types/Industry";

interface RegisterRecruiterFormProps {
  industries: IndustriesResponse;
}

const recruiterFormSchema = z
  .object({
    company_name: z.string().min(1, { message: "会社名を入力してください" }),
    company_email: z
      .string()
      .min(1, { message: "会社のメールアドレスを入力してください" })
      .email({ message: "有効なメールアドレスを入力してください" }),
    industry_id: z.string().min(1, { message: "業界を選択してください" }),
    recruiter_name: z
      .string()
      .min(1, { message: "担当者名を入力してください" }),
    email: z
      .string()
      .min(1, { message: "メールアドレスを入力してください" })
      .email({ message: "有効なメールアドレスを入力してください" }),
    password: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください" })
      .max(100, { message: "パスワードは100文字以下で入力してください" }),
    password_confirmation: z
      .string()
      .min(1, { message: "パスワード（確認）を入力してください" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "パスワードが一致しません",
    path: ["password_confirmation"],
  });

export default function RegisterRecruiterForm({
  industries,
}: RegisterRecruiterFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // フォームの初期化
  const form = useForm<z.infer<typeof recruiterFormSchema>>({
    resolver: zodResolver(recruiterFormSchema),
    defaultValues: {
      company_name: "",
      company_email: "",
      industry_id: "",
      recruiter_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // 会社のメールアドレスを担当者のメールアドレスに自動コピー
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name === "company_email" &&
        value.company_email &&
        !form.getValues("email")
      ) {
        form.setValue("email", value.company_email);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // フォーム送信処理
  async function onSubmit(values: z.infer<typeof recruiterFormSchema>) {
    setIsLoading(true);

    try {
      // APIに送信するデータ形式に変換
      const requestData = {
        company: {
          name: values.company_name,
          email: values.company_email,
          industry_id: Number.parseInt(values.industry_id),
        },
        user: {
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        },
        recruiter: {
          name: values.recruiter_name,
        },
      };

      const response = await fetch("/api/v1/register/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("faild signup with creating company");
      }

      router.push("/login");
    } catch (error) {
      console.error("faild register with creating company, catch ->:", error);
      // エラー処理
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <Briefcase className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">インターンマッチ</h1>
            <p className="text-muted-foreground">企業アカウント登録</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>企業アカウント登録</CardTitle>
              <CardDescription>
                採用担当者として登録して、インターンシップを募集しましょう。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4 border-b pb-4">
                    <h3 className="font-medium">企業情報</h3>
                    <FormField
                      control={form.control}
                      name="company_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>会社名</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="株式会社サンプル"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>会社のメールアドレス</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="info@company.com"
                              type="email"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
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
                            defaultValue={field.value}
                            disabled={isLoading}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="業界を選択してください" />
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
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="font-medium">担当者情報</h3>
                    <FormField
                      control={form.control}
                      name="recruiter_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>担当者名</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="採用 太郎"
                              disabled={isLoading}
                              {...field}
                            />
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
                          <FormLabel>担当者メールアドレス</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="recruiter@company.com"
                              type="email"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>パスワード</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password_confirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>パスワード（確認）</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        登録中...
                      </>
                    ) : (
                      "登録する"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              <p className="text-sm text-muted-foreground">
                すでにアカウントをお持ちの方は{" "}
                <Link href="/login" className="text-primary hover:underline">
                  ログイン
                </Link>{" "}
                してください。
              </p>
              <div className="w-full border-t pt-4">
                <p className="text-sm text-center mb-2">学生の方はこちら</p>
                <Link href="/register" className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    <GraduationCap className="h-4 w-4" />
                    学生アカウント登録
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
