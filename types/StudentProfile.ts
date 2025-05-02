import { Industry } from "./Industry";
import { Skill } from "./Skill";

export default interface StudentProfile {
  user_id: number;
  name: string;
  introduce: string | null;
  graduation_year: number | null;
  school: string | null;
  portfolio_url: string | null;
  industries: Industry[];
  skills: Skill[];
}
