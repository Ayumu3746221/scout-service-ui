import { IndustriesResponse } from "@/types/Industry";
import { fetchApi } from "./commonFetcher";

export async function industriesFetcher(): Promise<IndustriesResponse> {
  return fetchApi<IndustriesResponse>("/api/v1/industries");
}
