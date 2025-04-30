import { describe, it, expect, vi, beforeEach } from "vitest";
import { jobPostingByIdFetcher } from "../jobPostingFetcher";
import { fetchApi } from "../commonFetcher";
import { JobPosting } from "@/types/Jobposting";

// fetchApiをモック化
vi.mock("../commonFetcher", () => ({
  fetchApi: vi.fn(),
}));

describe("jobPostingByIdFetcher", () => {
  const mockJobPosting: JobPosting = {
    id: 1,
    company_id: 1,
    title: "テストポジション",
    description: "テスト説明文",
    requirements: "テスト応募条件",
    is_active: true,
    company: {
      id: 1,
      name: "テスト企業",
    },
    skills: [
      {
        id: 1,
        name: "TypeScript",
      },
    ],
    industries: [
      {
        id: 1,
        name: "IT",
      },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("指定されたIDでfetchApiを呼び出し、正しいデータを返す", async () => {
    // fetchApiのモックが指定された値を返すように設定
    vi.mocked(fetchApi).mockResolvedValue(mockJobPosting);

    // テスト対象の関数を呼び出す
    const result = await jobPostingByIdFetcher("1");

    // 検証
    expect(fetchApi).toHaveBeenCalledWith("/api/v1/job_postings/1");
    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockJobPosting);
  });

  it("fetchApiがエラーを投げた場合、そのエラーを伝播する", async () => {
    // エラーをスローするようにfetchApiをモック
    const expectedError = new Error("API error");
    vi.mocked(fetchApi).mockRejectedValue(expectedError);

    // エラーが伝播することを確認
    await expect(jobPostingByIdFetcher("1")).rejects.toThrow(expectedError);
  });
});
