import { NextResponse } from "next/server";
import { getSkyPrepGroups } from "@/lib/backend/core/skyprep";

export async function GET() {
  try {
    const groups = await getSkyPrepGroups();

    return NextResponse.json({
      ok: true,
      groups,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to load SkyPrep groups",
      },
      { status: 500 },
    );
  }
}
