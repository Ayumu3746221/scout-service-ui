import { Industry } from "./Industry";

export interface Company {
  id: number;
  name: string;
  email: string;
  address: string | null;
  industry_id: number;
  description: string | null;
  industry: Industry;
}

export interface CompanyResponse {
  company: Company;
}
