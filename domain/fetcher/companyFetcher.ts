import { CompanyResponse } from "@/types/Company";
import { fetchApi } from "./commonFetcher";

export async function CompanyByIdFeatcher(
  id: string
): Promise<CompanyResponse> {
  return fetchApi<CompanyResponse>(`/companies/${id}`);
}
