import { getToken } from "@/domain/token/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await getToken();
  const data = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            receiver_id: data.receiver_id,
            content: data.content,
          },
        }),
      },
    );

    if (!response.ok) {
      return NextResponse.json({
        error: await response.text(),
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "send message successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error during sending message:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
