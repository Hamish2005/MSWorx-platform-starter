import { NextResponse } from "next/server";
import { getAirtableCourseMetadata, hasAirtableConfig } from "@/lib/backend/core/airtable";

export async function GET() {
  try {
    if (!hasAirtableConfig()) {
      return NextResponse.json(
        {
          ok: false,
          error: "Airtable is not configured.",
        },
        { status: 400 },
      );
    }

    const courses = await getAirtableCourseMetadata();

    return NextResponse.json({
      ok: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to load Airtable courses",
      },
      { status: 500 },
    );
  }
}
