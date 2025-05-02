import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StudentProfileType from "@/types/StudentProfile";
import { getUser } from "@/domain/user/getUser";
import User from "@/types/User";
import { isOwner } from "@/domain/user/isOwner";
import { studentProfileFetcher } from "@/domain/fetcher/studentProfileFetcher";
import StudentProfile from "@/components/student_profile/StudentProfile";

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let error: string | null = null;
  let profile: StudentProfileType | null = null;
  let visiteUser: User | null = await getUser();
  const isProfileOwner = isOwner(visiteUser, parseInt(id), "student");
  const isRecruiter = visiteUser?.role === "recruiter";

  try {
    profile = await studentProfileFetcher(id);
  } catch (error) {
    console.error("Error fetching job posting or company:", error);
    error = "求人情報の取得に失敗しました";
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8">
          <Card>
            <CardHeader>
              <CardTitle>エラー</CardTitle>
              <CardDescription>
                プロフィールの取得に失敗しました
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{error || "プロフィールが見つかりません。"}</p>
            </CardContent>
            <CardFooter>
              <Link href="/">
                <Button>ホームに戻る</Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto">
      <StudentProfile
        isRecruiter={isRecruiter}
        isProfileOwner={isProfileOwner}
        profile={profile}
      />
    </div>
  );
}
