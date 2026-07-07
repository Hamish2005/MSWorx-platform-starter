"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WebsiteCourse } from "@/lib/backend/core/skyprep";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CourseCard } from "@/components/catalog/CourseCard";
import { EnrollmentCart } from "@/components/catalog/EnrollmentCart";
import {
  trackAddToCart,
  trackCatalogFilter,
  trackCatalogSearch,
  trackCatalogView,
  trackCheckoutStarted,
  trackRemoveFromCart,
} from "@/lib/analytics";
import {
  filterCourses,
  formatCartTotal,
  getCartCourses,
  getCartTotalCents,
  getCourseCategories,
} from "@/lib/catalog/catalog-filters";

export function CourseCatalog({ courses }: { courses: WebsiteCourse[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [length, setLength] = useState("All");
  const [certificateOnly, setCertificateOnly] = useState(false);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutPending, setCheckoutPending] = useState(false);
  const [introductionCourse, setIntroductionCourse] = useState<WebsiteCourse | null>(null);

  const categories = useMemo(() => getCourseCategories(courses), [courses]);

  const filteredCourses = useMemo(() => {
    return filterCourses(courses, { query, category, length, certificateOnly });
  }, [category, certificateOnly, courses, length, query]);

  const cartCourses = useMemo(() => {
    return getCartCourses(cartIds, courses);
  }, [cartIds, courses]);
  const cartTotalCents = getCartTotalCents(cartCourses);
  const cartTotalLabel = formatCartTotal(cartCourses);
  const hasTrackedCatalogView = useRef(false);

  useEffect(() => {
    if (hasTrackedCatalogView.current) {
      return;
    }

    hasTrackedCatalogView.current = true;
    trackCatalogView(courses);
  }, [courses]);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      trackCatalogSearch(normalizedQuery, filteredCourses.length);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [filteredCourses.length, query]);

  function updateCategory(value: string) {
    setCategory(value);
    trackCatalogFilter("category", value, filteredCourses.length);
  }

  function updateLength(value: string) {
    setLength(value);
    trackCatalogFilter("length", value, filteredCourses.length);
  }

  function updateCertificateOnly(value: boolean) {
    setCertificateOnly(value);
    trackCatalogFilter("certificate_only", value, filteredCourses.length);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setLength("All");
    setCertificateOnly(false);
    trackCatalogFilter("clear_filters", "all", courses.length);
  }

  function toggleCartCourse(courseId: string) {
    const course = courses.find((item) => item.skyprepCourseId === courseId);

    if (!course) {
      return;
    }

    if (!course.purchasable) {
      setCheckoutError("This course needs a price before it can be added to cart.");
      return;
    }

    setCheckoutError("");
    setCartIds((current) => {
      const removing = current.includes(courseId);
      const nextCartIds = removing
        ? current.filter((selectedCourseId) => selectedCourseId !== courseId)
        : [...current, courseId];
      const nextCartValueCents = getCartTotalCents(getCartCourses(nextCartIds, courses));

      if (removing) {
        trackRemoveFromCart(course, nextCartValueCents);
      } else {
        trackAddToCart(course, nextCartValueCents);
      }

      return nextCartIds;
    });
  }

  async function startCheckout() {
    setCheckoutError("");

    if (cartIds.length === 0) {
      setCheckoutError("Add at least one course before checkout.");
      return;
    }

    if (!email.includes("@")) {
      setCheckoutError("Enter the learner email so MSWorx can enroll the right person.");
      return;
    }

    setCheckoutPending(true);
    trackCheckoutStarted(cartCourses, cartTotalCents);

    try {
      const response = await fetch("/api/core/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          courseIds: cartIds,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Unable to start checkout.");
      setCheckoutPending(false);
    }
  }

  return (
    <div className="mt-10">
      <CatalogFilters
        categories={categories}
        query={query}
        category={category}
        length={length}
        certificateOnly={certificateOnly}
        visibleCount={filteredCourses.length}
        totalCount={courses.length}
        onQueryChange={setQuery}
        onCategoryChange={updateCategory}
        onLengthChange={updateLength}
        onCertificateOnlyChange={updateCertificateOnly}
        onClear={clearFilters}
      />

      <EnrollmentCart
        courses={cartCourses}
        totalLabel={cartTotalLabel}
        email={email}
        error={checkoutError}
        pending={checkoutPending}
        onEmailChange={setEmail}
        onRemoveCourse={toggleCartCourse}
        onCheckout={startCheckout}
      />

      {filteredCourses.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => {
            const inCart = cartIds.includes(course.skyprepCourseId);

            return (
              <CourseCard
                key={course.id}
                course={course}
                inCart={inCart}
                onToggle={toggleCartCourse}
                onReadIntroduction={setIntroductionCourse}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded border border-[#e7dccd] bg-white p-8 text-center">
          <h2 className="text-2xl font-bold text-[#24302f]">
            {courses.length === 0 ? "Catalog is temporarily unavailable" : "No courses found"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#4f5f5c]">
            {courses.length === 0
              ? "Course data could not be loaded. Check the deployment environment variables."
              : "Try a different search term or clear the filters."}
          </p>
        </div>
      )}

      {introductionCourse ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#24302f]/60 px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-introduction-title"
          onClick={() => setIntroductionCourse(null)}
        >
          <div
            className="max-h-[84vh] w-full max-w-2xl overflow-y-auto rounded border border-[#e7dccd] bg-white p-6 shadow-[0_24px_80px_rgba(36,48,47,0.24)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#BD9227]">
                  Course introduction
                </p>
                <h2
                  id="course-introduction-title"
                  className="mt-2 text-2xl font-bold leading-tight text-[#24302f]"
                >
                  {introductionCourse.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIntroductionCourse(null)}
                className="rounded border border-[#d8cbb9] px-3 py-2 text-sm font-bold text-[#116466] transition hover:border-[#116466] hover:bg-[#FAF6EF]"
                suppressHydrationWarning
              >
                Close
              </button>
            </div>
            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#4f5f5c]">
              {introductionCourse.introduction}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
