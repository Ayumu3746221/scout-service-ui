export type Role = "recruiter" | "student";

export default interface User {
  id: number;
  email: string;
  role: Role;
  company?: number;
}
