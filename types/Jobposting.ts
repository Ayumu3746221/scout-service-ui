import { Industry } from "./Industry";
import { Skill } from "./Skill";

interface Company {
  id: number;
  name: string;
}

export interface JobPosting {
  id: number;
  company_id: number;
  title: string;
  description: string;
  requirements: string;
  is_active: boolean;
  company: Company;
  skills: Skill[];
  industries: Industry[];
}

export interface JobPostingsResponse {
  job_postings: JobPosting[];
}

export interface JobPostingResponse {
  job_posting: JobPosting;
}
