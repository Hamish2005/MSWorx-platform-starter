import { NextResponse } from "next/server";
import { getSkyPrepProgram, getSkyPrepSystemData } from "@/lib/backend/core/skyprep";

export async function GET() {
  try {
    const [program, courseCount, learnerCount, userGroupCount] = await Promise.all([
      getSkyPrepProgram(),
      getSkyPrepSystemData("course_count"),
      getSkyPrepSystemData("learner_count"),
      getSkyPrepSystemData("user_group_count"),
    ]);

    return NextResponse.json({
      ok: true,
      program,
      stats: {
        courses: courseCount.data,
        learners: learnerCount.data,
        userGroups: userGroupCount.data,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to load SkyPrep account data",
      },
      { status: 500 },
    );
  }
}
