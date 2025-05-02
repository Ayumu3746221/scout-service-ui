import CompanyEditor from "@/components/company_profile/CompanyEditor";
import { CompanyByIdFeatcher } from "@/domain/fetcher/companyFetcher";
import { industriesFetcher } from "@/domain/fetcher/industriesFetcher";
import { getUser } from "@/domain/user/getUser";

export default async function CompanyProfileEditPage() {
  const currentUser = await getUser();
  const industries = await industriesFetcher();

  if (!currentUser || !currentUser.company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">ログインが必要です。</p>
      </div>
    );
  }

  const companyProfileResponse = await CompanyByIdFeatcher(
    currentUser.company.toString(),
  );
  const companyProfile = companyProfileResponse.company;

  return (
    <CompanyEditor companyProfile={companyProfile} industries={industries} />
  );
}
