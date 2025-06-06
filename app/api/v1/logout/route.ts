import { getToken } from "@/domain/token/getToken";
import { NextResponse } from "next/server";

export async function DELETE() {
  const token = await getToken();

  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      return NextResponse.json(
        { error: errorText },
        { status: backendResponse.status },
      );
    }

    const response = NextResponse.json({ message: "Logged out successfully." });

    response.cookies.delete("token");
    response.cookies.delete("user");

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
