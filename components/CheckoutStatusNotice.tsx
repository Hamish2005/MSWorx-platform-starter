"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export function CheckoutStatusNotice() {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);

  const notice = useMemo(() => {
    const checkoutStatus = searchParams.get("checkout");
    const isFreeEnrollment = searchParams.get("free_enrollment") === "true";

    if (checkoutStatus === "success") {
      return {
        title: isFreeEnrollment ? "Enrollment complete" : "Checkout complete",
        message:
          "Your course enrollment is being processed. If this is a new SkyPrep account, login details will be sent to the learner email address.",
      };
    }

    if (checkoutStatus === "cancelled") {
      return {
        title: "Checkout cancelled",
        message: "No payment was completed and no new course enrollment was made.",
      };
    }

    return null;
  }, [searchParams]);

  if (!notice || dismissed) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#24302f]/40 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-status-title"
    >
      <div className="w-full max-w-lg rounded border border-[#e7dccd] bg-white p-6 shadow-[0_24px_70px_rgba(36,48,47,0.22)]">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#BD9227]">
          MSWorx Learning
        </p>
        <h2 id="checkout-status-title" className="mt-3 text-3xl font-bold text-[#24302f]">
          {notice.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#4f5f5c]">{notice.message}</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-6 min-h-12 rounded bg-[#116466] px-6 text-sm font-bold text-white transition hover:bg-[#0d4f50]"
          suppressHydrationWarning
        >
          Continue
        </button>
      </div>
    </div>
  );
}
