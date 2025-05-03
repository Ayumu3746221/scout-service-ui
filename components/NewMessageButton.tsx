"use client";

import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewMessageButton {
  receiver_id: number;
}

export default function NewMessageButton({ receiver_id }: NewMessageButton) {
  const router = useRouter();

  const handleClick = async () => {
    const requestData = {
      receiver_id: receiver_id,
      content: "応募を確認しました。（システムメッセージ）",
    };

    try {
      const response = await fetch("/api/v1/auth/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      router.push("/");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      <MessageSquare className="mr-2 h-4 w-4" />
      メッセージを送る
    </Button>
  );
}
