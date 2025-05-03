import JobPostingEditor from "@/components/job_posting/JobPostingEditor";
import { industriesFetcher } from "@/domain/fetcher/industriesFetcher";
import { jobPostingByIdFetcher } from "@/domain/fetcher/jobPostingFetcher";
import { skillsFetcher } from "@/domain/fetcher/skillsFetcher";
import { IndustriesResponse } from "@/types/Industry";
import { JobPostingResponse } from "@/types/Jobposting";
import { SkillsResponse } from "@/types/Skill";

export default async function JobPostingEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skills: SkillsResponse = await skillsFetcher();
  const industries: IndustriesResponse = await industriesFetcher();
  const jobPosting: JobPostingResponse = await jobPostingByIdFetcher(id);

  return (
    <JobPostingEditor
      skills={skills}
      industries={industries}
      jobPosting={jobPosting.job_posting}
    />
  );
}
