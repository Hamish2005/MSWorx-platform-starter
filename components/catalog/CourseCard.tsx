import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

type CourseCardProps = {
  course: WebsiteCourse;
  inCart: boolean;
  onToggle: (courseId: string) => void;
  onReadIntroduction: (course: WebsiteCourse) => void;
};

export function CourseCard({ course, inCart, onToggle, onReadIntroduction }: CourseCardProps) {
  const isReviewCourse = course.status?.trim().toLowerCase() === "review";

  return (
    <article className="group flex min-h-[320px] flex-col rounded border border-[#e7dccd] bg-white p-5 shadow-[0_12px_30px_rgba(36,48,47,0.06)] transition hover:-translate-y-1 focus-within:-translate-y-1">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#BD9227]">
        {course.category} - Course #{course.id}
      </p>
      <h2 className="mt-3 text-2xl font-bold leading-tight text-[#24302f]">{course.title}</h2>
      {course.creator ? (
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-[#4f5f5c]">
          Instructor {course.creator}
        </p>
      ) : null}
      <p className="mt-4 max-h-14 overflow-hidden text-sm leading-7 text-[#4f5f5c] transition-all group-hover:max-h-40 group-focus-within:max-h-40">
        {course.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-[#116466]">
        <span className="rounded bg-[#FAF6EF] px-2 py-1">
          {course.priceLabel ?? "Price coming soon"}
        </span>
        <span className="rounded bg-[#FAF6EF] px-2 py-1">{course.lengthLabel}</span>
        {course.moduleCount > 0 ? (
          <span className="rounded bg-[#FAF6EF] px-2 py-1">
            {course.moduleCount} {course.moduleCount === 1 ? "module" : "modules"}
          </span>
        ) : null}
        {course.certificate ? (
          <span className="rounded bg-[#FAF6EF] px-2 py-1">Certificate</span>
        ) : null}
        {course.status ? (
          <span className="rounded bg-[#FAF6EF] px-2 py-1">{course.status}</span>
        ) : null}
      </div>
      {course.tags && course.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#4f5f5c]">
          {course.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded border border-[#e7dccd] px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {course.introduction ? (
        <button
          type="button"
          onClick={() => onReadIntroduction(course)}
          className="mt-5 w-fit rounded border border-[#d8cbb9] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#116466] transition hover:border-[#116466] hover:bg-[#FAF6EF]"
          suppressHydrationWarning
        >
          Read introduction
        </button>
      ) : null}
      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => onToggle(course.skyprepCourseId)}
          disabled={!course.purchasable}
          className={`min-h-12 w-full rounded border px-5 text-sm font-bold transition ${
            inCart
              ? "border-[#116466] bg-[#116466] text-white hover:bg-[#0d4f50]"
              : !course.purchasable
                ? "cursor-not-allowed border-[#d8cbb9] bg-[#efebe4] text-[#7c8884]"
                : "border-[#d8cbb9] bg-[#FAF6EF] text-[#116466] hover:border-[#116466]"
          }`}
          suppressHydrationWarning
        >
          {inCart
            ? "Added to cart"
            : course.purchasable
              ? "Add to cart"
              : isReviewCourse
                ? "In review"
                : "Price needed"}
        </button>
      </div>
    </article>
  );
}
