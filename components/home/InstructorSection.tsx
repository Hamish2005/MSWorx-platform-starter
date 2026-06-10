"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { instructors } from "@/lib/site-content";

export function InstructorSection() {
  return (
    <section className="bg-[#116466] px-5 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Instructor network"
          title="Courses should sound like the work."
          description="MSWorx Learning centers instructors with lived field experience, clear credentials, and course content that speaks in real human language."
          tone="dark"
        />
        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-3"
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {instructors.map((item) => (
            <motion.div
              key={item}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              className="rounded border border-white/20 bg-white p-5 text-[#24302f]"
            >
              <p className="text-xl font-bold">{item}</p>
              <p className="mt-3 text-sm leading-6 text-[#4f5f5c]">
                Directory profiles will connect instructor credibility with the courses they teach.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
