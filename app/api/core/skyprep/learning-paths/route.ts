import { NextResponse } from "next/server";
import { getSkyPrepLearningPaths } from "@/lib/backend/core/skyprep";

export async function GET() {
  try {
    const learningPaths = await getSkyPrepLearningPaths();

    return NextResponse.json({
      ok: true,
      learningPaths,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to load SkyPrep learning paths",
      },
      { status: 500 },
    );
  }
}
