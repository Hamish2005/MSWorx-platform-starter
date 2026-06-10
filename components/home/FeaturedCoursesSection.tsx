"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ButtonLink";
import { fadeUp } from "@/lib/animation";
import { featuredCourses } from "@/lib/site-content";

export function FeaturedCoursesSection() {
  return (
    <section id="courses" className="border-y border-[#e7dccd] bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div {...fadeUp}>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
            Featured courses
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#24302f] sm:text-4xl">
            The first catalog wave begins with practical AI training.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#4f5f5c]">
            The June launch starts with the TWL series and expands into compliance,
            role-based paths, and topic clusters as the catalog grows.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/courses">Open Catalog</ButtonLink>
            <ButtonLink href="/courses/tracks/ai-track" variant="secondary">
              View AI Track
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
          {featuredCourses.map((course) => (
            <motion.article
              key={course.code}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              className="rounded border border-[#e7dccd] bg-[#FAF6EF] p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#BD9227]">
                    {course.code} - {course.track}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-[#24302f]">{course.title}</h3>
                  <p className="mt-2 text-sm text-[#4f5f5c]">{course.meta}</p>
                </div>
                <ButtonLink href={course.href} variant="secondary">
                  Enroll
                </ButtonLink>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
