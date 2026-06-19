"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ButtonLink";
import { fadeUp } from "@/lib/animation";
import {
  defaultFinderAnswers,
  getFinderCategories,
  getFinderPathSummary,
  getRecommendedCourses,
  normalizeFinderCourses,
  type FinderAnswers,
} from "@/lib/ai/course-finder";
import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

export function CourseFinder({ courses }: { courses?: WebsiteCourse[] }) {
  const finderCourses = useMemo(() => normalizeFinderCourses(courses), [courses]);
  const categories = useMemo(() => getFinderCategories(finderCourses), [finderCourses]);

  const [answers, setAnswers] = useState<FinderAnswers>(defaultFinderAnswers);

  const recommendedCourses = useMemo(() => {
    return getRecommendedCourses(finderCourses, answers);
  }, [answers, finderCourses]);

  const pathSummary = getFinderPathSummary(answers.goal);

  return (
    <section id="ai-course-finder" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
            AI Course Finder
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#24302f] sm:text-4xl">
            Find the right learning path before you enroll.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#4f5f5c]">
            This preview uses simple matching today. It can connect to OpenAI
            later, but it already reads from the available course catalog.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="rounded border border-[#e7dccd] bg-white p-5 shadow-[0_12px_30px_rgba(36,48,47,0.06)] sm:p-6"
            {...fadeUp}
          >
            <div className="border-b border-[#e7dccd] pb-5">
              <p className="text-sm font-bold text-[#116466]">Tell us what you need</p>
              <p className="mt-2 text-sm leading-6 text-[#4f5f5c]">
                The final version can use these answers with OpenAI retrieval to
                match learners to courses, tracks, and next steps.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-bold text-[#24302f]" htmlFor="finder-goal">
                  What do you want to learn?
                </label>
                <input
                  id="finder-goal"
                  type="search"
                  value={answers.goal}
                  onChange={(event) =>
                    setAnswers((current) => ({ ...current, goal: event.target.value }))
                  }
                  placeholder="Try AI, conflict, HUD, leadership, documentation..."
                  className="mt-2 min-h-12 w-full rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm text-[#24302f] outline-none transition placeholder:text-[#7c8884] focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <p className="text-sm font-bold text-[#24302f]">Category</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isSelected = answers.category === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setAnswers((current) => ({ ...current, category }))}
                        className={`min-h-10 rounded border px-4 py-2 text-sm font-semibold transition ${
                          isSelected
                            ? "border-[#116466] bg-[#116466] text-white"
                            : "border-[#d8cbb9] bg-[#FAF6EF] text-[#4f5f5c] hover:border-[#116466] hover:text-[#116466]"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-[#24302f]">Credential preference</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Any", "Certificate"].map((certificate) => {
                    const isSelected = answers.certificate === certificate;

                    return (
                      <button
                        key={certificate}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setAnswers((current) => ({ ...current, certificate }))}
                        className={`min-h-10 rounded border px-4 py-2 text-sm font-semibold transition ${
                          isSelected
                            ? "border-[#116466] bg-[#116466] text-white"
                            : "border-[#d8cbb9] bg-[#FAF6EF] text-[#4f5f5c] hover:border-[#116466] hover:text-[#116466]"
                        }`}
                      >
                        {certificate}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded border border-[#e7dccd] bg-[#116466] p-5 text-white shadow-[0_16px_40px_rgba(36,48,47,0.12)] sm:p-6"
            {...fadeUp}
          >
            <div className="flex flex-col gap-4 border-b border-white/20 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#F1D99B]">
                  Recommended path
                </p>
                <h3 className="mt-2 text-3xl font-bold leading-tight">
                  Start here, then build depth.
                </h3>
              </div>
              <span className="rounded border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white">
                Mock AI
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/82">{pathSummary}</p>

            <div className="mt-6 space-y-3">
              {recommendedCourses.map((course, index) => (
                <article key={course.id} className="rounded bg-white p-4 text-[#24302f]">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#BD9227]">
                        Step {index + 1} - {course.id} - {course.track}
                      </p>
                      <h4 className="mt-2 text-xl font-bold">{course.title}</h4>
                    </div>
                    <div className="flex shrink-0 gap-2 text-xs font-bold text-[#116466]">
                      <span className="rounded bg-[#FAF6EF] px-2 py-1">{course.level}</span>
                      <span className="rounded bg-[#FAF6EF] px-2 py-1">{course.length}</span>
                    </div>
                  </div>
                  <p className="mt-3 max-h-16 overflow-hidden text-sm leading-6 text-[#4f5f5c] transition-all hover:max-h-40">
                    {course.reason}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/courses" variant="gold">
                View Catalog
              </ButtonLink>
              <ButtonLink
                href="mailto:support@msworx.co?subject=Course%20Finder%20Question"
                variant="light"
              >
                Ask for Guidance
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
