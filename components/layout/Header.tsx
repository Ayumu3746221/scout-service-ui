import Link from "next/link";
import { User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
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
        </div>
      </div>
    </header>
  );
}
