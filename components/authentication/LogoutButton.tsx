"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/logout", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("failed logout");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("failed logout", error);
    }
  };
  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => handleLogout()}>
        ログアウト
      </Button>
    </div>
  );
}
