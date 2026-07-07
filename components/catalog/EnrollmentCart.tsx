import type { WebsiteCourse } from "@/lib/backend/core/skyprep";

type EnrollmentCartProps = {
  courses: WebsiteCourse[];
  totalLabel: string;
  email: string;
  error: string;
  pending: boolean;
  onEmailChange: (value: string) => void;
  onRemoveCourse: (courseId: string) => void;
  onCheckout: () => void;
};

function formatGoLiveDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function EnrollmentCart({
  courses,
  totalLabel,
  email,
  error,
  pending,
  onEmailChange,
  onRemoveCourse,
  onCheckout,
}: EnrollmentCartProps) {
  const scheduledCourses = courses.filter(
    (course) => course.status?.trim().toLowerCase() === "scheduled",
  );

  return (
    <aside className="mt-6 rounded border border-[#d8cbb9] bg-white p-5 shadow-[0_12px_30px_rgba(36,48,47,0.06)]">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#BD9227]">
            Enrollment cart
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#24302f]">
            {courses.length === 1 ? "1 course selected" : `${courses.length} courses selected`}
          </h2>
          {courses.length > 0 ? (
            <p className="mt-1 text-sm font-bold text-[#116466]">Total: {totalLabel}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {courses.length > 0 ? (
              courses.map((course) => (
                <button
                  key={course.skyprepCourseId}
                  type="button"
                  onClick={() => onRemoveCourse(course.skyprepCourseId)}
                  className="rounded border border-[#d8cbb9] bg-[#FAF6EF] px-3 py-2 text-left text-xs font-bold text-[#116466] transition hover:border-[#116466]"
                  suppressHydrationWarning
                >
                  Remove {course.title}
                </button>
              ))
            ) : (
              <p className="text-sm leading-6 text-[#4f5f5c]">
                Add courses below, then checkout once. After purchase, the learner
                receives account access by email.
              </p>
            )}
          </div>
          {scheduledCourses.length > 0 ? (
            <div className="mt-4 rounded border border-[#e7dccd] bg-[#FAF6EF] p-3 text-xs font-semibold leading-5 text-[#4f5f5c]">
              {scheduledCourses.length === 1 ? (
                <p>
                  {scheduledCourses[0].title} can be purchased now, but access begins{" "}
                  {formatGoLiveDate(scheduledCourses[0].goLiveDate) ?? "on the scheduled launch date"}.
                </p>
              ) : (
                <p>
                  This cart includes scheduled courses. You can purchase now, but access begins on each course&apos;s scheduled launch date.
                </p>
              )}
            </div>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-bold text-[#24302f]" htmlFor="cart-email">
            Learner email
          </label>
          <input
            id="cart-email"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="learner@example.com"
            className="mt-2 min-h-12 w-full rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm text-[#24302f] outline-none transition placeholder:text-[#7c8884] focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
            suppressHydrationWarning
          />
          {error ? <p className="mt-2 text-sm font-semibold text-[#9f2d20]">{error}</p> : null}
          {!error ? (
            <p className="mt-2 text-xs leading-5 text-[#4f5f5c]">
              Course access will be created under this email with a username and
              temporary password.
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={pending || courses.length === 0}
          className="min-h-12 rounded bg-[#116466] px-6 text-sm font-bold text-white transition hover:bg-[#0d4f50] disabled:cursor-not-allowed disabled:bg-[#9aa5a2]"
          suppressHydrationWarning
        >
          {pending ? "Starting checkout..." : "Checkout"}
        </button>
      </div>
    </aside>
  );
}
