import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { SiteHeader } from "@/components/SiteHeader";

const instructorSteps = [
  {
    title: "Bring field-earned expertise",
    text: "MSWorx Learning is looking for practitioners whose teaching is grounded in real frontline work, supervision, operations, or systems leadership.",
  },
  {
    title: "Shape it into a course",
    text: "We help turn your knowledge into structured lessons, applied examples, and learner activities that sound like the work instead of generic training.",
  },
  {
    title: "Teach without managing the platform",
    text: "MSWorx handles the learning infrastructure so instructors can focus on clear content, credibility, and useful outcomes.",
  },
];

export default function InstructorsPage() {
  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#24302f]">
      <SiteHeader />

      <section className="border-b border-[#e7dccd] bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
              For Instructors
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#24302f] sm:text-5xl lg:text-6xl">
              Turn field experience into training that helps people do the work.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#4f5f5c]">
              MSWorx Learning partners with practitioners, supervisors, and
              nonprofit leaders who can teach from direct experience and make
              complex work easier to understand.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="mailto:support@msworx.co?subject=Instructor%20Interest">
                Start a Conversation
              </ButtonLink>
              <ButtonLink href="/courses#featured-courses" variant="secondary">
                View Featured Courses
              </ButtonLink>
            </div>
          </div>

          <div className="rounded border border-[#e7dccd] bg-[#FAF6EF] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#BD9227]">
              Course creation
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#24302f]">
              Built for experts who do not want to become platform managers.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4f5f5c]">
              Bring the judgment, examples, and plain language. MSWorx helps
              structure the learning experience and connect it to the people who
              need it.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {instructorSteps.map((step) => (
              <article
                key={step.title}
                className="rounded border border-[#e7dccd] bg-white p-6 shadow-[0_12px_30px_rgba(36,48,47,0.06)]"
              >
                <h2 className="text-2xl font-bold leading-tight text-[#24302f]">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#4f5f5c]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
