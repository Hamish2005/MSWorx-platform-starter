import { NextResponse } from "next/server";
import { testSkyPrepConnection } from "@/lib/backend/core/skyprep";

export async function GET() {
  try {
    const result = await testSkyPrepConnection();

    return NextResponse.json({
      ok: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "SkyPrep connection failed",
      },
      { status: 500 },
    );
  }
}
