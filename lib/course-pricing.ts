import coursePrices from "@/data/course-prices.json";
import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

type CoursePriceConfig = {
  currency: string;
  courses: Record<
    string,
    {
      priceCents: number;
    }
  >;
};

const pricing = coursePrices as CoursePriceConfig;

export function formatPrice(priceCents?: number, currency = pricing.currency) {
  if (!Number.isFinite(priceCents)) {
    return "Price coming soon";
  }

  if (priceCents === 0) {
    return "Free";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format((priceCents ?? 0) / 100);
}

function isPurchasableCourseStatus(status?: string) {
  if (!status) {
    return true;
  }

  return ["live", "scheduled"].includes(status.trim().toLowerCase());
}

export function enrichCourseWithPricing(course: WebsiteCourse): WebsiteCourse {
  const coursePricing = pricing.courses[course.skyprepCourseId];
  const priceCents = course.priceCents ?? coursePricing?.priceCents;
  const currency = course.currency ?? pricing.currency;
  const hasPrice = Number.isInteger(priceCents) && priceCents >= 0;

  return {
    ...course,
    priceCents,
    currency,
    priceLabel: formatPrice(priceCents, currency),
    purchasable: hasPrice && isPurchasableCourseStatus(course.status),
  };
}

export function enrichCoursesWithPricing(courses: WebsiteCourse[]) {
  return courses.map(enrichCourseWithPricing);
}
