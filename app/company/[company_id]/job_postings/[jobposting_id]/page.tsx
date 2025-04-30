import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { JobPosting } from "@/types/Jobposting";
import { Company } from "@/types/Company";
import { jobPostingByIdFetcher } from "@/domain/fetcher/jobPostingFetcher";
import { CompanyByIdFeatcher } from "@/domain/fetcher/companyFetcher";
import Link from "next/link";
import { JobPostingCard } from "@/components/job_posting/JobPostingCard";
import { CompanyDescriptionCard } from "@/components/job_posting/CompanyDescriptionCard";
import { Header } from "@/components/layout/Header";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ company_id: string; jobposting_id: string }>;
}) {
  const { company_id, jobposting_id } = await params;
  let jobPosting: JobPosting | null = null;
  let company: Company | null = null;
  let error: string | null = null;
  let isLoading = true;

  try {
    const response_jobPsting = await jobPostingByIdFetcher(jobposting_id);
    jobPosting = response_jobPsting.job_posting;

    const response_company = await CompanyByIdFeatcher(company_id);
    company = response_company.company;
  } catch (error) {
    console.error("Error fetching job posting or company:", error);
    error = "求人情報の取得に失敗しました";
  } finally {
    isLoading = false;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <main className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 bg-muted rounded"></div>
            <div className="h-4 w-1/2 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !jobPosting || !company) {
    return (
      <>
        <Header />
        <div className="min-h-screen">
          <main className="container py-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">エラー</h2>
              <p className="text-muted-foreground">
                {error || "募集情報が見つかりませんでした"}
              </p>
              <Button className="mt-4">トップページに戻る</Button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <main className="container py-8 w-[90%] mx-auto">
          <div className="mb-6">
            <Link href={"/"} className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <JobPostingCard
                companyName={company.name}
                jobPosting={jobPosting}
              />
            </div>

            <div>
              <CompanyDescriptionCard {...company} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
