import { cookies } from "next/headers";

class TokenManager {
  private static instace: TokenManager;
  private token: string | null = null;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instace) {
      TokenManager.instace = new TokenManager();
    }

    return TokenManager.instace;
  }

  public async getToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }

    const cookieStore = cookies();
    const tokenFormCookie = (await cookieStore).get("token")?.value || null;

    this.token = tokenFormCookie || null;
    return this.token;
  }

  public resetToken(): void {
    this.token = null;
  }
}

export default TokenManager;
