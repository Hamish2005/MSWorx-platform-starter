import { COURSE_LENGTH_FILTERS } from "@/lib/catalog/catalog-filters";

type CatalogFiltersProps = {
  categories: string[];
  query: string;
  category: string;
  length: string;
  certificateOnly: boolean;
  visibleCount: number;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLengthChange: (value: string) => void;
  onCertificateOnlyChange: (value: boolean) => void;
  onClear: () => void;
};

export function CatalogFilters({
  categories,
  query,
  category,
  length,
  certificateOnly,
  visibleCount,
  totalCount,
  onQueryChange,
  onCategoryChange,
  onLengthChange,
  onCertificateOnlyChange,
  onClear,
}: CatalogFiltersProps) {
  return (
    <div className="rounded border border-[#e7dccd] bg-white p-5 shadow-[0_12px_30px_rgba(36,48,47,0.06)]">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.62fr_0.62fr_auto] lg:items-end">
        <div>
          <label className="text-sm font-bold text-[#24302f]" htmlFor="course-search">
            Search courses
          </label>
          <input
            id="course-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by title, topic, or course ID"
            className="mt-2 min-h-12 w-full rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm text-[#24302f] outline-none transition placeholder:text-[#7c8884] focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
            suppressHydrationWarning
          />
        </div>

        <div>
          <label className="text-sm font-bold text-[#24302f]" htmlFor="course-category">
            Category
          </label>
          <select
            id="course-category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="mt-2 min-h-12 w-full rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm font-semibold text-[#24302f] outline-none transition focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
            suppressHydrationWarning
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-[#24302f]" htmlFor="course-length">
            Length
          </label>
          <select
            id="course-length"
            value={length}
            onChange={(event) => onLengthChange(event.target.value)}
            className="mt-2 min-h-12 w-full rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm font-semibold text-[#24302f] outline-none transition focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
            suppressHydrationWarning
          >
            {COURSE_LENGTH_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label className="flex min-h-12 items-center gap-3 rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm font-semibold text-[#24302f]">
          <input
            type="checkbox"
            checked={certificateOnly}
            onChange={(event) => onCertificateOnlyChange(event.target.checked)}
            className="h-4 w-4 accent-[#116466]"
            suppressHydrationWarning
          />
          Certificates only
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e7dccd] pt-4">
        <p className="text-sm font-semibold text-[#4f5f5c]">
          Showing {visibleCount} of {totalCount} courses
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-bold text-[#116466] transition hover:text-[#0d4f50]"
          suppressHydrationWarning
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
