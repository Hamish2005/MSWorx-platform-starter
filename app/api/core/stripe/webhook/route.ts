import { NextResponse } from "next/server";
import { completeCatalogEnrollment } from "@/lib/backend/core/enrollment";
import {
  type StripeCheckoutSessionEvent,
  verifyStripeWebhookSignature,
} from "@/lib/backend/core/stripe";

export const runtime = "nodejs";

type StripeWebhookEvent = {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
};

async function handleCompletedCheckout(session: StripeCheckoutSessionEvent) {
  const courseIds = session.metadata?.skyprep_course_ids;
  const email = session.customer_details?.email ?? session.customer_email ?? undefined;

  if (!courseIds || !email) {
    return;
  }

  await completeCatalogEnrollment({ email, courseIds });
}

export async function POST(request: Request) {
  const payload = await request.text();

  try {
    verifyStripeWebhookSignature({
      payload,
      signatureHeader: request.headers.get("stripe-signature"),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid Stripe webhook",
      },
      { status: 400 },
    );
  }

  const event = JSON.parse(payload) as StripeWebhookEvent;

  switch (event.type) {
    case "checkout.session.completed":
      await handleCompletedCheckout(event.data.object as StripeCheckoutSessionEvent);
      break;
    case "checkout.session.expired":
    case "payment_intent.payment_failed":
      break;
    default:
      break;
  }

  return NextResponse.json({
    ok: true,
    received: true,
    eventId: event.id,
    eventType: event.type,
  });
}
