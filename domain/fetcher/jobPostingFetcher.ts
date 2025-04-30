import { JobPostingResponse, JobPostingsResponse } from "@/types/Jobposting";
import { fetchApi } from "./commonFetcher";

export async function jobPostingFetcher(): Promise<JobPostingsResponse> {
  return fetchApi<JobPostingsResponse>("/api/v1/job_postings");
}

export async function jobPostingByIdFetcher(
  jobposting_id: string
): Promise<JobPostingResponse> {
  return fetchApi<JobPostingResponse>(`/api/v1/job_postings/${jobposting_id}`);
}
