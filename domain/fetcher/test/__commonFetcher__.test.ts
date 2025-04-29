import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchApi } from "../commonFetcher";

// フェッチのモック
global.fetch = vi.fn();

describe("fetchApi", () => {
  const mockApiUrl = "http://mocked-api";
  const originalEnv = process.env;

  beforeEach(() => {
    // 環境変数をリセット
    vi.resetModules();
    process.env = { ...originalEnv, API_URL: mockApiUrl };

    // フェッチのモックをリセット
    vi.mocked(fetch).mockReset();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("正常なレスポンスを処理できる", async () => {
    const mockData = { message: "success" };
    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

    const result = await fetchApi("/test-endpoint");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      `${mockApiUrl}/test-endpoint`,
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("204 No Contentレスポンスをundefinedとして処理する", async () => {
    const mockResponse = new Response(null, { status: 204 });
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

    const result = await fetchApi("/no-content");
    expect(result).toBeUndefined();
  });

  it("エラーレスポンスを適切に処理する", async () => {
    const errorMessage = "Not found";
    const mockResponse = new Response(errorMessage, { status: 404 });
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

    await expect(fetchApi("/error")).rejects.toThrow("Error: 404: Not found");
  });

  it("カスタムオプションを正しく適用する", async () => {
    const mockData = { success: true };
    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse);

    const customOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer token",
      },
      body: JSON.stringify({ id: 1 }),
    };

    await fetchApi("/custom", customOptions);

    expect(fetch).toHaveBeenCalledWith(
      `${mockApiUrl}/custom`,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        }),
        body: JSON.stringify({ id: 1 }),
      })
    );
  });
});
