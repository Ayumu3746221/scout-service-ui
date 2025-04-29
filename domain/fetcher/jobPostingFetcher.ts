import { JobPosting, JobPostingsResponse } from "@/types/Jobposting";
import { fetchApi } from "./commonFetcher";

export async function jobPostingFetcher(): Promise<JobPostingsResponse> {
  return fetchApi<JobPostingsResponse>("/api/v1/job_postings");
}
