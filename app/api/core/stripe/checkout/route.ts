import { NextResponse } from "next/server";
import { completeCatalogEnrollment } from "@/lib/backend/core/enrollment";
import { createCartCheckoutSession, createCheckoutSession } from "@/lib/backend/core/stripe";
import { getCatalogCourses } from "@/lib/courses";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const priceId = typeof body.priceId === "string" ? body.priceId : "";
    const customerEmail = typeof body.email === "string" ? body.email : undefined;
    const courseIds = Array.isArray(body.courseIds)
      ? body.courseIds.filter((courseId: unknown) => typeof courseId === "string")
      : [];
    const origin = new URL(request.url).origin;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

    if (courseIds.length > 0) {
      if (!customerEmail || !customerEmail.includes("@")) {
        return NextResponse.json(
          { ok: false, error: "A valid email is required for course enrollment." },
          { status: 400 },
        );
      }

      const allCourses = await getCatalogCourses();
      const selectedCourses = allCourses.filter((course) => courseIds.includes(course.skyprepCourseId));
      const unpricedCourses = selectedCourses.filter((course) => !course.purchasable);

      if (selectedCourses.length === 0) {
        return NextResponse.json(
          { ok: false, error: "Select at least one valid SkyPrep course." },
          { status: 400 },
        );
      }

      if (unpricedCourses.length > 0) {
        return NextResponse.json(
          {
            ok: false,
            error: `Set prices before checkout for: ${unpricedCourses
              .map((course) => course.title)
              .join(", ")}`,
          },
          { status: 400 },
        );
      }

      const cartTotalCents = selectedCourses.reduce(
        (total, course) => total + (course.priceCents ?? 0),
        0,
      );

      if (cartTotalCents === 0) {
        await completeCatalogEnrollment({
          email: customerEmail,
          courseIds: selectedCourses.map((course) => course.skyprepCourseId).join(","),
        });

        return NextResponse.json({
          ok: true,
          freeEnrollment: true,
          url: `${siteUrl}/courses?checkout=success&free_enrollment=true`,
        });
      }

      const session = await createCartCheckoutSession({
        courses: selectedCourses,
        customerEmail,
        successUrl: `${siteUrl}/courses?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${siteUrl}/courses?checkout=cancelled`,
      });

      return NextResponse.json({
        ok: true,
        sessionId: session.id,
        url: session.url,
      });
    }

    if (!priceId.startsWith("price_")) {
      return NextResponse.json(
        { ok: false, error: "A valid Stripe priceId is required." },
        { status: 400 },
      );
    }

    const session = await createCheckoutSession({
      priceId,
      customerEmail,
      successUrl: `${siteUrl}/courses?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${siteUrl}/courses?checkout=cancelled`,
    });

    return NextResponse.json({
      ok: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to create checkout session",
      },
      { status: 500 },
    );
  }
}
