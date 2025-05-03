import TokenManager from "@/utils/token/TokenManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await TokenManager.getInstance().getToken();
  const body = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job_postings/${body.id}/apply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: "学生からの応募がありました。",
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return NextResponse.json({
      status: 200,
      message: "apply is success!!",
    });
  } catch (error) {
    console.error("Error during applying:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
