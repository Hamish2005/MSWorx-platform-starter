import { mockCourseCatalog } from "@/lib/ai/course-finder-data";
import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

export type FinderCourse = {
  id: string;
  title: string;
  track: string;
  level: string;
  length: string;
  reason: string;
  tags: string[];
  certificate: boolean;
};

export type FinderAnswers = {
  category: string;
  goal: string;
  certificate: string;
};

export const defaultFinderAnswers: FinderAnswers = {
  category: "All",
  goal: "",
  certificate: "Any",
};

export function normalizeFinderCourses(courses?: WebsiteCourse[]): FinderCourse[] {
  if (!courses || courses.length === 0) {
    return mockCourseCatalog.map((course) => ({
      id: course.code,
      title: course.title,
      track: course.track,
      level: course.level,
      length: course.length,
      reason: course.reason,
      tags: course.tags,
      certificate: true,
    }));
  }

  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    track: course.category,
    level: course.format ?? "Online",
    length: course.lengthLabel,
    reason: course.description,
    certificate: course.certificate,
    tags: [
      course.title,
      course.description,
      course.category,
      course.format,
      course.certificate ? "Certificate" : "",
    ].filter(Boolean) as string[],
  }));
}

export function getFinderCategories(courses: FinderCourse[]) {
  return ["All", ...Array.from(new Set(courses.map((course) => course.track))).filter(Boolean)];
}

export function scoreCourse(course: FinderCourse, answers: FinderAnswers) {
  const searchableText = [course.title, course.track, course.reason, course.level, ...course.tags]
    .join(" ")
    .toLowerCase();
  const categoryScore = answers.category === "All" || course.track === answers.category ? 6 : 0;
  const certificateScore =
    answers.certificate === "Any" || (answers.certificate === "Certificate" && course.certificate)
      ? 3
      : 0;

  return Object.values(answers).reduce((score, answer) => {
    const normalizedAnswer = answer.toLowerCase();
    const answerWords = normalizedAnswer.split(/\s+/).filter((word) => word.length > 2);
    const exactMatch = searchableText.includes(normalizedAnswer) ? 3 : 0;
    const wordMatches = answerWords.filter((word) => searchableText.includes(word)).length;

    return score + exactMatch + wordMatches;
  }, categoryScore + certificateScore);
}

export function getRecommendedCourses(courses: FinderCourse[], answers: FinderAnswers) {
  return courses
    .map((course) => ({ ...course, score: scoreCourse(course, answers) }))
    .sort((first, second) => second.score - first.score)
    .slice(0, 3);
}

export function getFinderPathSummary(goal: string) {
  return goal.trim().length > 0
    ? `Based on "${goal}", this mock finder is ranking the live catalog by matching course titles, categories, and descriptions.`
    : "Choose a category or describe what you want to learn, and this mock finder will rank the live course catalog.";
}
