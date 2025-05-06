import { getToken } from "@/domain/token/getToken";
import { MessagesResponse } from "@/types/Message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { partnerId: string } },
) {
  const { partnerId } = params;
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages/${partnerId}/conversation`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.error("Failed fetching conversation", await response.text());
      return NextResponse.json({
        status: response.status,
        error: await response.text(),
      });
    }

    const data = (await response.json()) as MessagesResponse;
    return NextResponse.json({
      status: response.status,
      response: data,
    });
  } catch (error) {
    console.error("Error during fetching conversation:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
