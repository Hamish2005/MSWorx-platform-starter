"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
      <p
        className={`text-sm font-bold uppercase tracking-[0.12em] ${
          isDark ? "text-[#F1D99B]" : "text-[#116466]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold leading-tight sm:text-4xl ${
          isDark ? "text-white" : "text-[#24302f]"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${isDark ? "text-white/82" : "text-[#4f5f5c]"}`}>
        {description}
      </p>
    </motion.div>
  );
}
