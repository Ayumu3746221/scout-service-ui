import Link from "next/link";
import { User, Briefcase, MessageSquare, Bell, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser } from "@/domain/user/getUser";
import UserType from "@/types/User";
import LogoutButton from "../authentication/LogoutButton";

export async function Header() {
  const user: UserType | null = await getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 pl-6">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">
              インターンマッチ
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 pr-6">
          {!user ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="gap-1">
                    <User className="h-4 w-4" />
                    ログイン
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">新規登録</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/messages">
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">メッセージ</span>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">通知</span>
                </Link>
              </Button>

              {user.role === "student" ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/student/${user.id}`}>
                    <User className="h-5 w-5" />
                    <span className="sr-only">プロフィール</span>
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/company/profile">
                    <Building2 className="h-5 w-5" />
                    <span className="sr-only">企業プロフィール</span>
                  </Link>
                </Button>
              )}

              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
