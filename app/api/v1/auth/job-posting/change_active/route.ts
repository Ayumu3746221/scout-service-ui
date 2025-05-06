import { getToken } from "@/domain/token/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await getToken();
  const body = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job_postings/${body.id}/toggle_active`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return NextResponse.json({
      message: "Changing active status successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error during changing active status:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
