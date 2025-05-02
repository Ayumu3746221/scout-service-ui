import TokenManager from "@/utils/token/TokenManager";

export async function PATCH(request: Request) {
  const token = await TokenManager.getInstance().getToken();
}
