import User from "@/types/User";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user");

  if (!userCookie) {
    return null;
  }

  try {
    const userData: User = JSON.parse(userCookie.value);
    return userData;
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    return null;
  }
}
