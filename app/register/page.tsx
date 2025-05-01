"use client";

import { useState } from "react";
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
import { Briefcase, Loader2, Building2 } from "lucide-react";

const studentFormSchema = z
  .object({
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
    name: z.string().min(1, { message: "名前を入力してください" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "パスワードが一致しません",
    path: ["password_confirmation"],
  });

export default function StudentRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof studentFormSchema>) {
    setIsLoading(true);

    try {
      const requestData = {
        user: {
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        },
        student: {
          name: values.name,
        },
      };

      const respose = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!respose.ok) {
        throw new Error("faild signup");
      }

      router.push("/login");
    } catch (error) {
      console.error("faild register: catch ->", error);
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
            <p className="text-muted-foreground">学生アカウント登録</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>新規登録</CardTitle>
              <CardDescription>
                学生として登録して、インターンシップに応募しましょう。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>名前</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="山田 太郎"
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
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
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
                <p className="text-sm text-center mb-2">
                  企業の採用担当者の方はこちら
                </p>
                <Link href="/register/recruiter" className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    <Building2 className="h-4 w-4" />
                    企業アカウント登録
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
