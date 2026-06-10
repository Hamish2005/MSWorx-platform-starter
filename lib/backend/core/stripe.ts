import { requireEnv } from "@/lib/backend/core/env";
import crypto from "crypto";
import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

const stripeApiUrl = "https://api.stripe.com/v1";

export function getStripeSecretKey() {
  return requireEnv("STRIPE_SECRET_KEY");
}

export function getStripeWebhookSecret() {
  return requireEnv("STRIPE_WEBHOOK_SECRET");
}

function parseStripeSignature(signatureHeader: string) {
  return signatureHeader.split(",").reduce(
    (parts, part) => {
      const [key, value] = part.split("=");

      if (key === "t") {
        parts.timestamp = value;
      }

      if (key === "v1") {
        parts.signatures.push(value);
      }

      return parts;
    },
    { timestamp: "", signatures: [] as string[] },
  );
}

export function verifyStripeWebhookSignature({
  payload,
  signatureHeader,
}: {
  payload: string;
  signatureHeader: string | null;
}) {
  if (!signatureHeader) {
    throw new Error("Missing Stripe signature header");
  }

  const { timestamp, signatures } = parseStripeSignature(signatureHeader);

  if (!timestamp || signatures.length === 0) {
    throw new Error("Invalid Stripe signature header");
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac("sha256", getStripeWebhookSecret())
    .update(signedPayload, "utf8")
    .digest("hex");

  const isValid = signatures.some((signature) => {
    const expected = Buffer.from(expectedSignature, "hex");
    const received = Buffer.from(signature, "hex");

    return expected.length === received.length && crypto.timingSafeEqual(expected, received);
  });

  if (!isValid) {
    throw new Error("Invalid Stripe webhook signature");
  }
}

function sanitizeStripeError(message: string) {
  return message.replace(/sk_(test|live)_[A-Za-z0-9*_]+/g, "sk_$1_[redacted]");
}

async function callStripe<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`${stripeApiUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getStripeSecretKey()}`,
      ...(init.headers ?? {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      typeof data?.error?.message === "string"
        ? data.error.message
        : `Stripe request failed with status ${response.status}`;

    throw new Error(sanitizeStripeError(message));
  }

  return data as T;
}

export type StripeAccountStatus = {
  id: string;
  country?: string;
  charges_enabled?: boolean;
  payouts_enabled?: boolean;
};

export function getStripeAccountStatus() {
  return callStripe<StripeAccountStatus>("/account");
}

export type CheckoutSessionRequest = {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
};

export type CheckoutSessionResponse = {
  id: string;
  url: string;
};

export function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  customerEmail,
}: CheckoutSessionRequest) {
  const body = new URLSearchParams();

  body.set("mode", "payment");
  body.set("success_url", successUrl);
  body.set("cancel_url", cancelUrl);
  body.set("line_items[0][price]", priceId);
  body.set("line_items[0][quantity]", "1");

  if (customerEmail) {
    body.set("customer_email", customerEmail);
  }

  return callStripe<CheckoutSessionResponse>("/checkout/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

export type CartCheckoutSessionRequest = {
  courses: WebsiteCourse[];
  successUrl: string;
  cancelUrl: string;
  customerEmail: string;
};

export type StripeCheckoutSessionEvent = {
  id: string;
  metadata?: Record<string, string>;
  customer_details?: {
    email?: string | null;
  };
  customer_email?: string | null;
};

export function createCartCheckoutSession({
  courses,
  successUrl,
  cancelUrl,
  customerEmail,
}: CartCheckoutSessionRequest) {
  const body = new URLSearchParams();

  body.set("mode", "payment");
  body.set("success_url", successUrl);
  body.set("cancel_url", cancelUrl);
  body.set("customer_email", customerEmail);
  body.set("metadata[skyprep_course_ids]", courses.map((course) => course.skyprepCourseId).join(","));
  body.set("metadata[source]", "msworx_course_cart");

  courses.forEach((course, index) => {
    if (!course.priceCents || !course.currency) {
      throw new Error(`Course ${course.skyprepCourseId} is missing a configured price.`);
    }

    body.set(`line_items[${index}][price_data][currency]`, course.currency);
    body.set(`line_items[${index}][price_data][unit_amount]`, String(course.priceCents));
    body.set(`line_items[${index}][price_data][product_data][name]`, course.title.slice(0, 120));
    body.set(
      `line_items[${index}][price_data][product_data][metadata][skyprep_course_id]`,
      course.skyprepCourseId,
    );
    body.set(`line_items[${index}][quantity]`, "1");
  });

  return callStripe<CheckoutSessionResponse>("/checkout/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}
