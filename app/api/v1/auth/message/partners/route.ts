import { getToken } from "@/domain/token/getToken";
import { PartnersResponse } from "@/types/Message";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages/partners`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json({
        error: await response.text(),
        status: response.status,
      });
    }

    const data = (await response.json()) as PartnersResponse;

    return NextResponse.json({
      response: data,
      status: 200,
    });
  } catch (error) {
    console.error("Error during fetching job postings:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
