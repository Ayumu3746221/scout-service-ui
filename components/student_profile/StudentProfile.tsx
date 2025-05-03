import StudentProfileType from "@/types/StudentProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Globe,
  Calendar,
  MessageSquare,
  PenSquare,
  Code,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import NewMessageButton from "../NewMessageButton";

interface StudentProfileProps {
  profile: StudentProfileType;
  isProfileOwner: boolean;
  isRecruiter: boolean;
}

export default async function StudentProfile({
  profile,
  isProfileOwner,
  isRecruiter,
}: StudentProfileProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="mt-4">{profile.name}</CardTitle>
                {profile.school && (
                  <CardDescription className="flex items-center justify-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {profile.school}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.graduation_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.graduation_year}年卒業予定</span>
                  </div>
                )}

                {profile.portfolio_url && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={profile.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      ポートフォリオ
                    </a>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {isProfileOwner && (
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={"/profile/edit"}>
                      <PenSquare className="mr-2 h-4 w-4" />
                      プロフィールを編集
                    </Link>
                  </Button>
                )}

                {isRecruiter && (
                  <NewMessageButton receiver_id={profile.user_id} />
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                {profile.introduce ? (
                  <p className="whitespace-pre-line">{profile.introduce}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    自己紹介文はまだ設定されていません。
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>スキルと興味のある業界</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4" />
                    スキル
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills && profile.skills.length > 0 ? (
                      profile.skills.map((skill) => (
                        <Badge key={skill.id} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        スキルはまだ登録されていません。
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4" />
                    興味のある業界
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.industries && profile.industries.length > 0 ? (
                      profile.industries.map((industry) => (
                        <Badge key={industry.id} variant="outline">
                          {industry.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        興味のある業界はまだ登録されていません。
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
