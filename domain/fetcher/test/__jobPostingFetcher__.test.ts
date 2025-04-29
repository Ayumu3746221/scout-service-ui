import { describe, it, expect, vi, beforeEach } from "vitest";
import { jobPostingFetcher } from "../jobPostingFetcher";
import { fetchApi } from "../commonFetcher";
import { JobPosting } from "@/types/Jobposting";

vi.mock("../commonFetcher", () => ({
  fetchApi: vi.fn(),
}));

describe("jobPostingFetcher", () => {
  const mockJobPostings: JobPosting[] = [
    {
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
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正しいエンドポイントでfetchApiを呼び出す", async () => {
    // fetchApiのモックが指定された値を返すように設定
    vi.mocked(fetchApi).mockResolvedValue(mockJobPostings);

    // テスト対象の関数を呼び出す
    const result = await jobPostingFetcher();

    // 検証
    expect(fetchApi).toHaveBeenCalledWith("/api/v1/job_postings");
    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockJobPostings);
  });

  it("fetchApiがエラーを投げた場合、そのエラーを伝播する", async () => {
    // エラーをスローするようにfetchApiをモック
    const expectedError = new Error("API error");
    vi.mocked(fetchApi).mockRejectedValue(expectedError);

    // エラーが伝播することを確認
    await expect(jobPostingFetcher()).rejects.toThrow(expectedError);
  });
});
