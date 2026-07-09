import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { SiteHeader } from "@/components/SiteHeader";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#24302f]">
      <SiteHeader />

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl rounded border border-[#e7dccd] bg-white p-8 text-center shadow-[0_16px_40px_rgba(36,48,47,0.08)] sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#BD9227]">
            MSWorx Learning
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#24302f] sm:text-5xl">
            Thank you for signing up.
          </h1>
          <p className="mt-5 text-base leading-7 text-[#4f5f5c]">
            You are on the MSWorx Learning update list. We will share course
            updates, launch notes, and instructor news as the catalog grows.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/courses#featured-courses">View Featured Courses</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back to Homepage
            </ButtonLink>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e7dccd] bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#4f5f5c]">Equip. Empower. Lead.</p>
          <Link href="/#contact" className="text-sm font-bold text-[#116466] hover:text-[#0d4f50]">
            Stay connected
          </Link>
        </div>
      </footer>
    </main>
  );
}
