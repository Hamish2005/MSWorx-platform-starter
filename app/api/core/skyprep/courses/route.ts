import { NextResponse } from "next/server";
import { getCatalogCourses } from "@/lib/courses";

export async function GET() {
  try {
    const courses = await getCatalogCourses();

    return NextResponse.json({
      ok: true,
      courses,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to load SkyPrep courses",
      },
      { status: 500 },
    );
  }
}
