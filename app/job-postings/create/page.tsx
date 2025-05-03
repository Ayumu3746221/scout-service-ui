import JobPostingCreator from "@/components/job_posting/JobPostingCreator";
import { industriesFetcher } from "@/domain/fetcher/industriesFetcher";
import { skillsFetcher } from "@/domain/fetcher/skillsFetcher";
import { IndustriesResponse } from "@/types/Industry";
import { SkillsResponse } from "@/types/Skill";

export default async function CreateJobPostingPage() {
  const skills: SkillsResponse = await skillsFetcher();
  const industries: IndustriesResponse = await industriesFetcher();

  return (
    <>
      <JobPostingCreator skills={skills} industries={industries} />
    </>
  );
}
