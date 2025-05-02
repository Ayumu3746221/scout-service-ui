import StudentProfile from "@/types/StudentProfile";
import { fetchApi } from "./commonFetcher";

export async function studentProfileFetcher(
  id: string,
): Promise<StudentProfile> {
  return fetchApi<StudentProfile>(`/api/v1/students/${id}`);
}
