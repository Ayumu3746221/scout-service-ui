import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const protecedPaths = ["/api/v1/auth", "/api/v1/logout", "/profile/edit"];

  const isProtectedPath = protecedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedPath) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
