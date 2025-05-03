"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send, User } from "lucide-react";
import type {
  Partner,
  PartnersResponse,
  Message,
  MessagesResponse,
} from "@/types/Message";
import useSWR from "swr";
import { formatDate } from "@/utils/formatters/formatDate";

interface MessageProps {
  currentUserId: number;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("データの取得に失敗しました");
    return res.json();
  });

export default function Message({ currentUserId }: MessageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("partner");
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(
    partnerId ? Number(partnerId) : null,
  );
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data: partnersData,
    error: partnersError,
    isLoading: isLoadingPartners,
  } = useSWR<{ response: PartnersResponse }>(
    "/api/v1/auth/message/partners",
    fetcher,
  );

  const {
    data: messagesData,
    error: messagesError,
    isLoading: isLoadingMessages,
    mutate: mutateMessages,
  } = useSWR<{ response: MessagesResponse }>(
    selectedPartnerId ? `/api/v1/auth/message/${selectedPartnerId}` : null,
    fetcher,
  );

  useEffect(() => {
    if (partnerId) {
      setSelectedPartnerId(Number(partnerId));
    }
  }, [partnerId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  const selectPartner = (partner: Partner) => {
    router.push(`/messages?partner=${partner.id}`);
    setSelectedPartnerId(partner.id);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedPartnerId || sendingMessage) return;

    setSendingMessage(true);
    try {
      const response = await fetch("/api/v1/auth/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver_id: selectedPartnerId,
          content: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      if (messagesData) {
        const newMessageObj: Message = {
          id: Date.now(),
          sender_id: currentUserId,
          receiver_id: selectedPartnerId,
          content: newMessage,
          created_at: new Date().toISOString(),
          sender: { id: currentUserId },
          receiver: { id: selectedPartnerId },
        };

        mutateMessages(
          {
            response: {
              messages: [...messagesData.response.messages, newMessageObj],
            },
          },
          false,
        );
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const getPartnerName = (partnerId: number) => {
    const partner = partnersData?.response.partners.find(
      (p) => p.id === partnerId,
    );
    return partner ? partner.name : "不明なユーザー";
  };

  const formatMessageDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = formatDate(dateString);
      return date;
    } catch (error) {
      return "";
    }
  };

  if (isLoadingPartners) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">
              メッセージを読み込み中...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (partnersError) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">エラー</h2>
              <p className="text-muted-foreground">
                メッセージの取得に失敗しました。
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const partners = partnersData?.response.partners || [];
  const messages = messagesData?.response.messages || [];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100vh-10rem)]">
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 bg-muted/50 border-b">
              <h2 className="font-semibold">メッセージ一覧</h2>
            </div>
            <div className="overflow-y-auto flex-1">
              {partners.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <p>メッセージのやり取りはありません</p>
                </div>
              ) : (
                <ul className="divide-y">
                  {partners.map((partner) => (
                    <li key={partner.id}>
                      <button
                        onClick={() => selectPartner(partner)}
                        className={`w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-center gap-3 ${
                          selectedPartnerId === partner.id ? "bg-muted" : ""
                        }`}
                      >
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          {partner.company_name && (
                            <p className="text-xs text-muted-foreground">
                              {partner.company_name}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3 border rounded-lg overflow-hidden flex flex-col">
            {selectedPartnerId ? (
              <>
                <div className="p-4 bg-muted/50 border-b">
                  <h2 className="font-semibold">
                    {getPartnerName(selectedPartnerId)} とのメッセージ
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {isLoadingMessages ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : messagesError ? (
                    <div className="text-center p-4 text-red-500">
                      メッセージの取得に失敗しました
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      <p>メッセージのやり取りはまだありません</p>
                      <p className="text-sm mt-2">
                        最初のメッセージを送信しましょう
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isSentByMe = message.sender_id === currentUserId;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isSentByMe ? "justify-end" : "justify-start"} items-end gap-2`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                isSentByMe
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <p className="break-words">{message.content}</p>
                              {message.created_at && (
                                <p
                                  className={`text-xs mt-1 ${isSentByMe ? "text-primary-foreground/80" : "text-muted-foreground/80"}`}
                                >
                                  {formatMessageDate(message.created_at)}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
                <Separator />
                <div className="p-4">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="メッセージを入力..."
                      className="min-h-[60px] resize-none"
                      disabled={sendingMessage}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!newMessage.trim() || sendingMessage}
                    >
                      {sendingMessage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center p-4">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>左側のリストからメッセージ相手を選択してください</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
