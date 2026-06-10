import { NextResponse } from "next/server";
import { buildMockCoursePathway } from "@/lib/backend/ai/course-pathway";

export async function POST(request: Request) {
  const body = await request.json();

  const role = typeof body.role === "string" ? body.role : "Case manager";
  const goal = typeof body.goal === "string" ? body.goal : "Use AI at work";
  const pace = typeof body.pace === "string" ? body.pace : "1 to 3 hours";

  return NextResponse.json(buildMockCoursePathway({ role, goal, pace }));
}
