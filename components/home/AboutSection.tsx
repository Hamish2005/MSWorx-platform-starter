"use client";

import { motion } from "framer-motion";
import { CheckMark } from "@/components/CheckMark";
import { fadeUp } from "@/lib/animation";
import { proofPoints } from "@/lib/site-content";

export function AboutSection() {
  return (
    <section id="about" className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div {...fadeUp}>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
            About MSWorx Learning
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#24302f] sm:text-4xl">
            Built by a practitioner for the sector she came from.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#4f5f5c]">
            Michele S. Williams brings direct field experience, technical assistance,
            and operations leadership to a platform built for the people doing
            community work every day.
          </p>
        </motion.div>
        <motion.div className="grid gap-4" {...fadeUp}>
          {proofPoints.map((point) => (
            <div
              key={point}
              className="flex gap-3 rounded border border-[#e7dccd] bg-white p-5 text-sm leading-7 text-[#4f5f5c]"
            >
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded bg-[#116466] text-white">
                <CheckMark />
              </span>
              {point}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
