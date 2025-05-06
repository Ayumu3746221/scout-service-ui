import { getToken } from "@/domain/token/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const token = await getToken();
  const body = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/${body.company.company_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error during profile update:", errorText);
      return NextResponse.json(
        { error: errorText },
        { status: response.status },
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error during profile update:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
