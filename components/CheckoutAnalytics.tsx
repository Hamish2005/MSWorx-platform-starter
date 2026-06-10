"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackCheckoutCompleted } from "@/lib/analytics";

export function CheckoutAnalytics() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkoutStatus = searchParams.get("checkout");
    const sessionId = searchParams.get("session_id");

    if (checkoutStatus !== "success" || !sessionId) {
      return;
    }

    const storageKey = `msworx_checkout_tracked_${sessionId}`;

    if (window.localStorage.getItem(storageKey)) {
      return;
    }

    trackCheckoutCompleted(sessionId);
    window.localStorage.setItem(storageKey, "true");
  }, [searchParams]);

  return null;
}
