"use client";

import { useEffect } from "react";

export function BackNavigationReset() {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetScrollOnRestore = (event: PageTransitionEvent) => {
      const [navigation] = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];

      if (event.persisted || navigation?.type === "back_forward") {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
      }
    };

    window.addEventListener("pageshow", resetScrollOnRestore);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("pageshow", resetScrollOnRestore);
    };
  }, []);

  return null;
}
