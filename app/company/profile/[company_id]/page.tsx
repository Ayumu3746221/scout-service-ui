import { CompanyDescriptionCard } from "@/components/job_posting/CompanyDescriptionCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CompanyByIdFeatcher } from "@/domain/fetcher/companyFetcher";
import { getUser } from "@/domain/user/getUser";
import { isOwner } from "@/domain/user/isOwner";
import { Company } from "@/types/Company";
import { Building2, PenSquare } from "lucide-react";
import Link from "next/link";

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{ company_id: string }>;
}) {
  const { company_id } = await params;
  let company: Company | null = null;
  let error: string | null = null;
  const currentUser = await getUser();
  const isPageOwner = isOwner(currentUser, parseInt(company_id), "recruiter");

  try {
    const companyResponse = await CompanyByIdFeatcher(company_id.toString());
    company = companyResponse.company;
  } catch (error) {
    console.error("Error fetching company:", error);
    error = "会社情報の取得に失敗しました";
  }

  if (error || !company) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-8">
          <Card>
            <CardHeader>
              <CardTitle>エラー</CardTitle>
              <CardDescription>企業情報の取得に失敗しました</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{error || "企業情報が見つかりません。"}</p>
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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <p className="text-muted-foreground mt-2">
                {company.industry.name}
              </p>
            </div>
            {isPageOwner && (
              <Button variant="outline" className="gap-1" asChild>
                <Link href="/company/profile/edit">
                  <PenSquare className="h-4 w-4" />
                  プロフィールを編集
                </Link>
              </Button>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <CompanyDescriptionCard {...company} />
          </div>

          {isPageOwner && (
            <div className="mt-6">
              <Button className="gap-1" asChild>
                <Link href="/job-postings">
                  <Building2 className="h-4 w-4" />
                  求人一覧を管理する
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
