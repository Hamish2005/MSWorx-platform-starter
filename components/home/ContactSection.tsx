"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ButtonLink";
import { fadeUp } from "@/lib/animation";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded border border-[#e7dccd] bg-white p-6 shadow-[0_12px_30px_rgba(36,48,47,0.06)] sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <motion.div {...fadeUp}>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
            Stay connected
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#24302f] sm:text-4xl">
            Get catalog updates and launch notes.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#4f5f5c]">
            Newsletter signup will connect to Growth Hub 365 for course updates,
            instructor news, and launch communications.
          </p>
        </motion.div>
        <motion.form
          className="grid gap-3"
          action="mailto:support@msworx.co"
          method="post"
          encType="text/plain"
          {...fadeUp}
        >
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            suppressHydrationWarning
            placeholder="Email address"
            className="min-h-12 rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm text-[#24302f] outline-none transition placeholder:text-[#7c8884] focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
          />
          <ButtonLink href="mailto:support@msworx.co?subject=MSWorx%20Learning%20Updates">
            Contact MSWorx
          </ButtonLink>
        </motion.form>
      </div>
    </section>
  );
}
