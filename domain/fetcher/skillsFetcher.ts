import { SkillsResponse } from "@/types/Skill";
import { fetchApi } from "./commonFetcher";

export async function skillsFetcher(): Promise<SkillsResponse> {
  return fetchApi<SkillsResponse>("/api/v1/skills");
}
