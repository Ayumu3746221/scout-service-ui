"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Loader2 } from "lucide-react";
import type { NotificationsResponse, Notification } from "@/types/Notification";
import { formatDate } from "@/utils/formatters/formatDate";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("通知の取得に失敗しました");
    return res.json();
  });

export default function NotificationsPage() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<{
    response: NotificationsResponse;
  }>("/api/v1/auth/notification", fetcher);

  const handleNotificationClick = async (notification: Notification) => {
    if (notification.notifiable_type === "Application") {
      router.push(`/student/${notification.sender_id}`);
    } else {
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">通知を読み込み中...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8">
          <Card>
            <CardHeader>
              <CardTitle>エラー</CardTitle>
              <CardDescription>通知の取得に失敗しました</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{error.message}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const { notifications, unread_count } = data?.response || {
    notifications: [],
    unread_count: 0,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold">通知</h1>
            {unread_count > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unread_count}件の未読
              </Badge>
            )}
          </div>
        </div>

        {notifications.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">通知はありません</h2>
              <p className="text-muted-foreground">
                新しい通知が届くとここに表示されます。
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>通知一覧</CardTitle>
              <CardDescription>最新の通知が表示されます</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {notifications.map((notification) => (
                  <li key={notification.id} className="relative">
                    <button
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full text-left p-4 sm:p-6 hover:bg-muted/50 transition-colors ${
                        !notification.is_read
                          ? "bg-blue-50/50 dark:bg-blue-950/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm sm:text-base">
                            {notification.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>
                        {!notification.is_read && (
                          <div className="ml-4 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
