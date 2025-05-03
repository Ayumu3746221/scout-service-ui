"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface ApplyButtonProps {
  jobPostingId: string;
}

export default function ApplyButton({ jobPostingId }: ApplyButtonProps) {
  const handleClick = async () => {
    const requestData = {
      id: jobPostingId,
    };

    try {
      const response = await fetch("/api/v1/auth/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to apply");
      }

      redirect("/");
    } catch (error) {
      console.error("Failed apply", error);
    }
  };

  return (
    <Button size="lg" className="w-full sm:w-auto" onClick={handleClick}>
      応募する
    </Button>
  );
}
