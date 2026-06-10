import { mockCourseCatalog } from "@/lib/ai/course-finder-data";

export type CoursePathwayRequest = {
  role: string;
  goal: string;
  pace: string;
};

export type CoursePathwayRecommendation = {
  code: string;
  title: string;
  track: string;
  level: string;
  length: string;
  reason: string;
};

export type CoursePathwayResponse = {
  summary: string;
  recommendations: CoursePathwayRecommendation[];
};

export function buildMockCoursePathway({
  role,
  goal,
  pace,
}: CoursePathwayRequest): CoursePathwayResponse {
  const answers = [role, goal, pace];
  const recommendations = mockCourseCatalog
    .map((course) => {
      const score = answers.reduce(
        (total, answer) => total + (course.tags.includes(answer) ? 1 : 0),
        0,
      );

      return { ...course, score };
    })
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map(({ code, title, track, level, length, reason }) => ({
      code,
      title,
      track,
      level,
      length,
      reason,
    }));

  return {
    summary: `${role}s focused on ${goal.toLowerCase()} usually start with a focused course, then move into a deeper skill builder or team path.`,
    recommendations,
  };
}
