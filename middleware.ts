import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./domain/user/getUser";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const protecedPaths = ["/api/v1/auth", "/api/v1/logout", "/profile/edit"];
  const requiredRecruiterPath = ["/company/profile"];

  const isProtectedPath = protecedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  const isRequiredRecruiterPath = requiredRecruiterPath.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedPath || isRequiredRecruiterPath) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (isRequiredRecruiterPath) {
    const user = await getUser();

    if (!user?.company) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
