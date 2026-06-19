import { getWebsiteCourses } from "@/lib/backend/core/skyprep";
import { mockCourseCatalog } from "@/lib/ai/course-finder-data";
import {
  getAirtableCourseMetadata,
  hasAirtableConfig,
  isPublicAirtableStatus,
} from "@/lib/backend/core/airtable";
import { enrichCoursesWithPricing } from "@/lib/course-pricing";

const canUseMockCatalog = process.env.NODE_ENV !== "production";

function normalizeCourseTitle(value?: string) {
  return (value ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\bsops?\b/g, "standard operating procedures")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter((word) => !["a", "an", "and", "of", "the"].includes(word))
    .join(" ");
}

async function mergeAirtableMetadata(courses: Awaited<ReturnType<typeof getWebsiteCourses>>) {
  if (!hasAirtableConfig()) {
    return courses;
  }

  const airtableCourses = await getAirtableCourseMetadata();
  const skyPrepCourseByTitle = new Map(
    courses.map((course) => [normalizeCourseTitle(course.title), course]),
  );

  return airtableCourses
    .filter((metadata) => isPublicAirtableStatus(metadata.status))
    .map((metadata) => {
      const course =
        courses.find((item) => item.skyprepCourseId === metadata.skyprepCourseId) ??
        skyPrepCourseByTitle.get(normalizeCourseTitle(metadata.title));

      if (!course) {
        return {
          id: metadata.skyprepCourseId,
          title: metadata.title || metadata.skyprepCourseId,
          description: metadata.description || "Course details are being prepared.",
          category: metadata.category || metadata.tags[0] || "General",
          certificate: true,
          active: true,
          credits: undefined,
          imageUrl: undefined,
          format: "Online",
          lengthLabel: "Self-paced",
          lengthMinutes: null,
          moduleCount: metadata.moduleCount ?? 0,
          skyprepCourseId: metadata.skyprepCourseId,
          priceCents: metadata.priceCents,
          status: metadata.status,
          goLiveDate: metadata.goLiveDate,
          tags: metadata.tags,
          creator: metadata.creator,
          introduction: metadata.description,
        };
      }

      return {
        ...course,
        id: metadata.skyprepCourseId,
        title: metadata.title || course.title,
        description: metadata.description || course.description,
        category: metadata.category || course.category,
        priceCents: metadata.priceCents,
        status: metadata.status,
        goLiveDate: metadata.goLiveDate,
        tags: metadata.tags,
        creator: metadata.creator,
        moduleCount: metadata.moduleCount ?? course.moduleCount,
        introduction: course.description,
      };
    });
}

async function getAirtableCatalogCourses() {
  if (!hasAirtableConfig()) {
    return [];
  }

  const airtableCourses = await getAirtableCourseMetadata();

  return airtableCourses
    .filter((course) => isPublicAirtableStatus(course.status))
    .map((course) => ({
      id: course.skyprepCourseId,
      title: course.title || course.skyprepCourseId,
      description: course.description || "Course details are being prepared.",
      category: course.category || course.tags[0] || "General",
      certificate: true,
      active: true,
      credits: undefined,
      imageUrl: undefined,
      format: "Online",
      lengthLabel: "Self-paced",
      lengthMinutes: null,
      moduleCount: course.moduleCount ?? 0,
      skyprepCourseId: course.skyprepCourseId,
      priceCents: course.priceCents,
      status: course.status,
      goLiveDate: course.goLiveDate,
      tags: course.tags,
      creator: course.creator,
    }));
}

export async function getCatalogCourses() {
  try {
    const courses = await mergeAirtableMetadata(await getWebsiteCourses());

    if (courses.length > 0) {
      return enrichCoursesWithPricing(courses);
    }

    const airtableCourses = await getAirtableCatalogCourses();

    if (airtableCourses.length > 0) {
      return enrichCoursesWithPricing(airtableCourses);
    }
  } catch (error) {
    try {
      const airtableCourses = await getAirtableCatalogCourses();

      if (airtableCourses.length > 0) {
        return enrichCoursesWithPricing(airtableCourses);
      }
    } catch {
      // Fall through to mock courses so local UI still renders if integrations are unavailable.
    }

    if (!canUseMockCatalog) {
      throw error;
    }
  }

  if (!canUseMockCatalog) {
    throw new Error("Catalog integrations are not configured for production.");
  }

  return enrichCoursesWithPricing(
    mockCourseCatalog.map((course) => ({
      id: course.code,
      title: course.title,
      description: course.reason,
      category: course.track,
      certificate: true,
      active: true,
      credits: undefined,
      imageUrl: undefined,
      format: "Online",
      lengthLabel: course.length,
      lengthMinutes: null,
      moduleCount: 0,
      skyprepCourseId: course.code,
    })),
  );
}
