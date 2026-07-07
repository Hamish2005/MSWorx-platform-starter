"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";

const audienceLinks = [
  ["Individual learners", "Course Catalog", "/courses"],
  ["Organizations", "Training Portals", "/organizations"],
  ["Instructors", "Course Creation", "/instructors"],
] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#e7dccd] bg-[#FAF6EF]">
      <Image
        src="/msworx-platform-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#FAF6EF]/88" />
      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
            Equip. Empower. Lead.
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#24302f] sm:text-5xl lg:text-6xl">
            Training infrastructure for the nonprofit frontline.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#4f5f5c]">
            MSWorx Learning helps case managers, shelter staff, volunteers,
            program leaders, and organizations build skill with courses,
            portals, completion tracking, and certificates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#courses">Browse Courses</ButtonLink>
            <ButtonLink href="/organizations" variant="secondary">
              For Organizations
            </ButtonLink>
            <ButtonLink href="/instructors" variant="gold">
              For Instructors
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="hidden lg:block" x={24} y={0}>
          <div className="ml-auto max-w-md rounded border border-[#e7dccd] bg-white/95 p-6 shadow-[0_16px_40px_rgba(36,48,47,0.12)]">
            <div className="border-b border-[#e7dccd] pb-4">
              <p className="text-sm font-bold text-[#116466]">Featured Courses</p>
            </div>
            <a
              href="https://shift.msworx.co/"
              className="mt-5 block rounded border border-[#e7dccd] bg-[#FAF6EF] p-4 transition hover:border-[#BD9227] hover:bg-[#F5EBDD]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#BD9227]">
                Featured series
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-[#24302f]">
                Navigating the Shift
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#4f5f5c]">
                A four-module series for teams preparing for the 2026 HUD NOFO shift.
              </p>
            </a>
            <div className="mt-5 space-y-4">
              {audienceLinks.map(([label, value, href]) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[#24302f]">{label}</span>
                  <a
                    href={href}
                    className="rounded bg-[#F5EBDD] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#116466] transition hover:bg-[#BD9227] hover:text-[#24302f]"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
