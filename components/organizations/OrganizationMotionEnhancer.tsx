"use client";

import { useEffect } from "react";

const motionSelectors = [
  ".org-hero-inner",
  ".org-pain-copy",
  ".org-pain-list",
  ".org-section-head",
  ".org-pricing-note",
  ".org-core-note",
  ".org-setup-head",
  ".org-cta-inner",
  ".org-stage",
  ".org-diff-card",
  ".org-bundle-card",
  ".org-setup-card",
  ".org-addon-card",
  ".org-who-card",
  ".org-faq-item",
];

export function OrganizationMotionEnhancer() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(motionSelectors.join(",")),
    );

    elements.forEach((element, index) => {
      element.classList.add("org-motion-target");
      element.style.setProperty("--org-motion-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("org-motion-visible"));
      return;
    }

    const restoreVisibleState = (event: PageTransitionEvent) => {
      const [navigation] = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];

      if (event.persisted || navigation?.type === "back_forward") {
        elements.forEach((element) => element.classList.add("org-motion-visible"));
        window.location.reload();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("org-motion-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("pageshow", restoreVisibleState);

    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", restoreVisibleState);
    };
  }, []);

  return null;
}
