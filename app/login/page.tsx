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
import { Briefcase, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください" })
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // フォームの初期化
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // フォーム送信処理
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const respose = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!respose.ok) {
        throw new Error("faild login");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("ログインエラー:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-2">
                <Briefcase className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">インターンマッチ</h1>
              <p className="text-muted-foreground">アカウントにログイン</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ログイン</CardTitle>
                <CardDescription>
                  メールアドレスとパスワードを入力してログインしてください。
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
                          <div className="flex items-center justify-between">
                            <FormLabel>パスワード</FormLabel>
                          </div>
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

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ログイン中...
                        </>
                      ) : (
                        "ログイン"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">
                  アカウントをお持ちでない方は{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    新規登録
                  </Link>{" "}
                  してください。
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
