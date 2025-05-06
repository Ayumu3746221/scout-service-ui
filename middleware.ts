import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/api/v1/auth/:path*",
    "/api/v1/logout",
    "/profile/edit",
    "/job-postings",
    "/company/profile",
  ],
};

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  console.log("Token found, proceeding to next middleware");
  return NextResponse.next();
};
