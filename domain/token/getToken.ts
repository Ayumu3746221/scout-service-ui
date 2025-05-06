import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");

  if (!tokenCookie) {
    return null;
  }

  try {
    const token = tokenCookie.value;
    return token;
  } catch (error) {
    console.error("Failed to get token:", error);
    return null;
  }
}
