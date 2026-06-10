import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

export const COURSE_LENGTH_FILTERS = ["All", "Self-paced", "Under 1 hour", "1 hour or more"];

export type CourseFilters = {
  query: string;
  category: string;
  length: string;
  certificateOnly: boolean;
};

export function getCourseCategories(courses: WebsiteCourse[]) {
  return ["All", ...Array.from(new Set(courses.map((course) => course.category))).filter(Boolean)];
}

export function filterCourses(courses: WebsiteCourse[], filters: CourseFilters) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesCategory = filters.category === "All" || course.category === filters.category;
    const matchesCertificate = !filters.certificateOnly || course.certificate;
    const matchesLength =
      filters.length === "All" ||
      (filters.length === "Self-paced" && course.lengthLabel === "Self-paced") ||
      (filters.length === "Under 1 hour" &&
        course.lengthMinutes !== null &&
        course.lengthMinutes < 60) ||
      (filters.length === "1 hour or more" &&
        course.lengthMinutes !== null &&
        course.lengthMinutes >= 60);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        course.title,
        course.description,
        course.category,
        course.format,
        course.skyprepCourseId,
        course.creator,
        ...(course.tags ?? []),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesCertificate && matchesLength && matchesQuery;
  });
}

export function getCartCourses(courseIds: string[], courses: WebsiteCourse[]) {
  return courseIds
    .map((courseId) => courses.find((course) => course.skyprepCourseId === courseId))
    .filter((course): course is WebsiteCourse => Boolean(course));
}

export function getCartTotalCents(courses: WebsiteCourse[]) {
  return courses.reduce((total, course) => total + (course.priceCents ?? 0), 0);
}

export function formatCartTotal(courses: WebsiteCourse[]) {
  const currency = courses[0]?.currency ?? "usd";
  const totalCents = getCartTotalCents(courses);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(totalCents / 100);
}
