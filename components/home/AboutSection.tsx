"use client";

import { motion } from "framer-motion";
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
            Michele S. Williams spent roughly twenty years inside homelessness
            services. Not studying them. Inside them.
          </p>
          <p className="mt-4 text-base leading-7 text-[#4f5f5c]">
            She led Continuum of Care operations. She delivered technical
            assistance the Department of Housing and Urban Development
            recognized. She sat across from people in crisis and ran the systems
            meant to help them. She saw where those systems held. She saw where
            they failed the people who could least afford the failure.
          </p>
          <p className="mt-4 text-base font-semibold leading-7 text-[#24302f]">
            That is where MSWorx Learning comes from.
          </p>
        </motion.div>
        <motion.div className="grid gap-4" {...fadeUp}>
          {proofPoints.map((point) => (
            <div
              key={point.title}
              className="rounded border border-[#e7dccd] bg-white p-5 shadow-[0_12px_30px_rgba(36,48,47,0.05)]"
            >
              <h3 className="text-xl font-bold text-[#24302f]">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4f5f5c]">{point.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
