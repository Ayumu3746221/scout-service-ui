import { getToken } from "@/domain/token/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job_postings/by_company`,
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

    const data = await response.json();

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

export async function POST(request: NextRequest) {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job_postings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(await request.json()),
      },
    );

    if (!response.ok) {
      return NextResponse.json({
        error: await response.text(),
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "Job posting created successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error during creating job posting:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}

export async function PATCH(request: NextRequest) {
  const token = await getToken();
  const data = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job_postings/${data.job_posting.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      return NextResponse.json({
        error: await response.text(),
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "Job posting updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error during updating job posting:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
