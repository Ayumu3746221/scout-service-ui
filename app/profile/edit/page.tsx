import StudentProfileEditor from "@/components/student_profile/StudentProfileEditor";
import { industriesFetcher } from "@/domain/fetcher/industriesFetcher";
import { skillsFetcher } from "@/domain/fetcher/skillsFetcher";
import { studentProfileFetcher } from "@/domain/fetcher/studentProfileFetcher";
import { getUser } from "@/domain/user/getUser";
import { IndustriesResponse } from "@/types/Industry";
import { SkillsResponse } from "@/types/Skill";
import StudentProfile from "@/types/StudentProfile";

export default async function EditProfilePage() {
  const currentUser = await getUser();
  const industries: IndustriesResponse = await industriesFetcher();
  const skills: SkillsResponse = await skillsFetcher();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">ログインが必要です。</p>
      </div>
    );
  }

  const studentProfile = await studentProfileFetcher(currentUser.id.toString());
  return (
    <StudentProfileEditor
      industries={industries}
      skills={skills}
      studentProfile={studentProfile}
    />
  );
}
