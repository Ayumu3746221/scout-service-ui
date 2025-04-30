import { describe, it, expect, vi, beforeEach } from "vitest";
import { CompanyByIdFeatcher } from "../companyFetcher";
import { fetchApi } from "../commonFetcher";
import { Company } from "@/types/Company";

// fetchApiをモック化
vi.mock("../commonFetcher", () => ({
  fetchApi: vi.fn(),
}));

describe("CompanyByIdFeatcher", () => {
  const mockCompany: Company = {
    id: 1,
    name: "Example Company",
    email: "example@company.com",
    address: null,
    industry_id: 1,
    description: null,
    industry: {
      id: 1,
      name: "IT",
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("指定されたIDでfetchApiを呼び出し、正しいデータを返す", async () => {
    // fetchApiのモックが指定された値を返すように設定
    vi.mocked(fetchApi).mockResolvedValue(mockCompany);

    // テスト対象の関数を呼び出す
    const result = await CompanyByIdFeatcher("1");

    // 検証
    expect(fetchApi).toHaveBeenCalledWith("/companies/1");
    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCompany);
  });

  it("fetchApiがエラーを投げた場合、そのエラーを伝播する", async () => {
    // エラーをスローするようにfetchApiをモック
    const expectedError = new Error("API error");
    vi.mocked(fetchApi).mockRejectedValue(expectedError);

    // エラーが伝播することを確認
    await expect(CompanyByIdFeatcher("1")).rejects.toThrow(expectedError);
  });
});
