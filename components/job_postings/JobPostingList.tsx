import { JobPosting } from "@/types/Jobposting";
import { jobPostingFetcher } from "@/domain/fetcher/jobPostingFetcher";
import JobPostingList_Loading from "./JobPostingList_Loading";
import JobPostingListItem from "./JobPostingListItem";

export async function JobPostingList() {
  let jobPostings: JobPosting[] = [];
  let error: string | null = null;
  let isLoading = true;

  try {
    const response = await jobPostingFetcher();
    jobPostings = response.job_postings;
  } catch (error) {
    console.error("Error fetching job postings:", error);
    error = "求人情報の取得に失敗しました";
  } finally {
    isLoading = false;
  }

  if (isLoading) {
    return <JobPostingList_Loading />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (jobPostings.length === 0) {
    return (
      <div className="text-center py-8">
        現在募集中のインターンシップはありません。
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobPostings.map((job) => (
        <JobPostingListItem key={job.id} {...job} />
      ))}
    </div>
  );
}
