import { NextResponse } from "next/server";
import { getSkyPrepCourse, normalizeSkyPrepCourse } from "@/lib/backend/core/skyprep";
import { enrichCourseWithPricing } from "@/lib/course-pricing";

type RouteContext = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { courseId } = await context.params;

  try {
    const course = await getSkyPrepCourse(courseId);

    const normalizedCourse = enrichCourseWithPricing(normalizeSkyPrepCourse(course));

    return NextResponse.json({
      ok: true,
      course: normalizedCourse,
      raw: course,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to load SkyPrep course",
      },
      { status: 500 },
    );
  }
}
