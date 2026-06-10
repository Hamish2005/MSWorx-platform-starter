"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { audiences } from "@/lib/site-content";

export function AudienceSection() {
  return (
    <section className="px-5 py-16 sm:px-8" id="learners">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Choose your path"
          title="One front door for learners, teams, and instructors."
          description="The homepage directs each audience to the right next step while the public catalog grows into the central buying surface."
        />
        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-3"
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {audiences.map((audience) => (
            <motion.article
              key={audience.id}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              className="rounded border border-[#e7dccd] bg-white p-6 shadow-[0_12px_30px_rgba(36,48,47,0.06)]"
            >
              <div className="mb-5 h-1.5 w-16 rounded bg-[#BD9227]" />
              <h3 className="text-2xl font-bold text-[#24302f]">{audience.title}</h3>
              <p className="mt-4 min-h-28 text-sm leading-7 text-[#4f5f5c]">{audience.text}</p>
              <a
                href={audience.href}
                className="mt-6 inline-flex text-sm font-bold text-[#116466] transition hover:text-[#0d4f50]"
              >
                {audience.cta}
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
