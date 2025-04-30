import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const protecedPaths = ["/api/v1/auth", "/api/v1/logout"];

  const isProtectedPath = protecedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedPath) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      redirect("/login");
    }
  }

  return NextResponse.next();
}
