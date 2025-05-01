import { IndustriesResponse } from "@/types/Industry";
import { industriesFetcher } from "@/domain/fetcher/industriesFetcher";
import RegisterRecruiterForm from "@/components/authentication/RegisterRecruiterForm";

export default async function RecruiterRegisterPage() {
  const industries: IndustriesResponse = await industriesFetcher();

  return <RegisterRecruiterForm industries={industries} />;
}
