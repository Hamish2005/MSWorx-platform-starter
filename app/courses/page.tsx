import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { CheckoutAnalytics } from "@/components/CheckoutAnalytics";
import { CheckoutStatusNotice } from "@/components/CheckoutStatusNotice";
import { CourseCatalog } from "@/components/CourseCatalog";
import { CourseFinder } from "@/components/CourseFinder";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteHeader } from "@/components/SiteHeader";
import { getCatalogCourses } from "@/lib/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getCatalogCourses();
  const tracks = Array.from(new Set(courses.map((course) => course.category))).filter(Boolean);
  const certificateCount = courses.filter((course) => course.certificate).length;

  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#24302f]">
      <Suspense fallback={null}>
        <CheckoutAnalytics />
        <CheckoutStatusNotice />
      </Suspense>
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#e7dccd] bg-white">
        <Image
          src="/msworx-platform-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#FAF6EF]/90" />
        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
              Course Catalog
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#24302f] sm:text-5xl lg:text-6xl">
              Practical learning paths for nonprofit frontline work.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#4f5f5c]">
              Browse the launch catalog preview, explore tracks, and use the AI
              Course Finder to choose a starting point.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#catalog">Browse Catalog</ButtonLink>
              <ButtonLink href="#ai-course-finder" variant="secondary">
                Use Course Finder
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            className="rounded border border-[#e7dccd] bg-white/95 p-6 shadow-[0_16px_40px_rgba(36,48,47,0.12)]"
            x={24}
            y={0}
          >
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#BD9227]">
              Catalog snapshot
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded border border-[#e7dccd] bg-[#FAF6EF] p-4">
                <p className="text-3xl font-bold text-[#116466]">{courses.length}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#4f5f5c]">
                  Courses
                </p>
              </div>
              <div className="rounded border border-[#e7dccd] bg-[#FAF6EF] p-4">
                <p className="text-3xl font-bold text-[#116466]">{tracks.length}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#4f5f5c]">
                  Categories
                </p>
              </div>
              <div className="rounded border border-[#e7dccd] bg-[#FAF6EF] p-4">
                <p className="text-3xl font-bold text-[#116466]">{certificateCount}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#4f5f5c]">
                  Certificates
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-[#4f5f5c]">
              Use the search and filters below to narrow the live SkyPrep catalog.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="catalog" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Launch catalog"
            title="Start with the courses closest to the work."
            description="These courses are pulled from SkyPrep and shaped for the public catalog."
          />

          <CourseCatalog courses={courses} />
        </div>
      </section>

      <CourseFinder courses={courses} />

      <footer className="border-t border-[#e7dccd] bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#4f5f5c]">Equip. Empower. Lead.</p>
          <Link href="/" className="text-sm font-bold text-[#116466] hover:text-[#0d4f50]">
            Back to homepage
          </Link>
        </div>
      </footer>
    </main>
  );
}
