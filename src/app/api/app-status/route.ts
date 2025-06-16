// src/app/api/app-status/route.ts
import { fetchProjectStatus } from "@/lib/status-utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statusData = await fetchProjectStatus();
    return NextResponse.json(statusData);
  } catch (error) {
    console.error("Error fetching project status:", error);
    return NextResponse.json(
      { error: "Failed to fetch project status" },
      { status: 500 }
    );
  }
}
