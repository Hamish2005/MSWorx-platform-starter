"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ButtonLink";
import { fadeUp } from "@/lib/animation";
import { shiftPaymentTiers, shiftSeries } from "@/lib/site-content";

export function FeaturedCoursesSection({ sectionId = "courses" }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="border-y border-[#e7dccd] bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <motion.div {...fadeUp}>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
            Featured series
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#24302f] sm:text-4xl">
            {shiftSeries.title}: training for the 2026 HUD NOFO shift.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#4f5f5c]">
            {shiftSeries.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded border border-[#e7dccd] bg-[#FAF6EF] px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#4f5f5c]">
              {shiftSeries.subtitle}
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={shiftSeries.href}>View Series Page</ButtonLink>
            <ButtonLink href="/courses#catalog" variant="secondary">
              Browse Catalog
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4"
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.article
            variants={{ hidden: { y: 18 }, show: { y: 0 } }}
            className="rounded border border-[#e7dccd] bg-[#FAF6EF] p-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#BD9227]">
              Four-module bundle
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#24302f]">
              Bought together for team readiness
            </h3>
            <div className="mt-4 grid gap-3">
              {shiftSeries.modules.map((module, index) => (
                <div key={module} className="flex gap-3 text-sm leading-6 text-[#4f5f5c]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white text-xs font-bold text-[#116466]">
                    {index + 1}
                  </span>
                  <span>{module}</span>
                </div>
              ))}
            </div>
          </motion.article>

          <div className="grid gap-4 md:grid-cols-2">
            {shiftPaymentTiers.map((tier) => (
              <motion.article
                key={tier.label}
                variants={{ hidden: { y: 18 }, show: { y: 0 } }}
                className="flex flex-col rounded border border-[#e7dccd] bg-white p-5 shadow-[0_12px_30px_rgba(36,48,47,0.06)]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#BD9227]">
                  {tier.label}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-[#24302f]">{tier.price}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#4f5f5c]">{tier.note}</p>
                <a
                  href={tier.href}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded border border-[#116466] bg-[#116466] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d4f50]"
                >
                  Buy {tier.label}
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
