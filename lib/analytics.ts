import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

type AnalyticsParams = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

function track(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, params);
}

function courseItem(course: WebsiteCourse, index?: number) {
  return {
    item_id: course.skyprepCourseId,
    item_name: course.title,
    item_category: course.category,
    price: (course.priceCents ?? 0) / 100,
    quantity: 1,
    index,
  };
}

export function trackCatalogView(courses: WebsiteCourse[]) {
  track("view_item_list", {
    item_list_id: "course_catalog",
    item_list_name: "Course Catalog",
    items: courses.slice(0, 20).map(courseItem),
  });
}

export function trackCatalogSearch(searchTerm: string, resultCount: number) {
  track("search", {
    search_term: searchTerm,
    result_count: resultCount,
  });
}

export function trackCatalogFilter(filterName: string, filterValue: string | boolean, resultCount: number) {
  track("filter_applied", {
    filter_name: filterName,
    filter_value: String(filterValue),
    result_count: resultCount,
  });
}

export function trackAddToCart(course: WebsiteCourse, cartValueCents: number) {
  track("add_to_cart", {
    currency: course.currency ?? "usd",
    value: (course.priceCents ?? 0) / 100,
    cart_value: cartValueCents / 100,
    items: [courseItem(course)],
  });
}

export function trackRemoveFromCart(course: WebsiteCourse, cartValueCents: number) {
  track("remove_from_cart", {
    currency: course.currency ?? "usd",
    value: (course.priceCents ?? 0) / 100,
    cart_value: cartValueCents / 100,
    items: [courseItem(course)],
  });
}

export function trackCheckoutStarted(courses: WebsiteCourse[], valueCents: number) {
  track("begin_checkout", {
    currency: courses[0]?.currency ?? "usd",
    value: valueCents / 100,
    items: courses.map(courseItem),
  });
}

export function trackCheckoutCompleted(sessionId: string) {
  track("checkout_completed", {
    transaction_id: sessionId,
  });
}
