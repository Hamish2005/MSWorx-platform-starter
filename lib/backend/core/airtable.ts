import { readEnv, requireEnv } from "@/lib/backend/core/env";

const airtableApiUrl = "https://api.airtable.com/v0";

type AirtableFieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[]
  | Array<{ name?: string; url?: string }>
  | { name?: string; url?: string };

type AirtableRecord = {
  id: string;
  fields: Record<string, AirtableFieldValue>;
};

type AirtableListResponse = {
  records: AirtableRecord[];
  offset?: string;
};

export type AirtableCourseMetadata = {
  skyprepCourseId: string;
  priceCents?: number;
  status?: string;
  tags: string[];
  creator?: string;
  category?: string;
  title?: string;
  description?: string;
  moduleCount?: number;
};

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getField(fields: Record<string, AirtableFieldValue>, aliases: string[]) {
  const normalizedAliases = aliases.map(normalizeKey);
  const entry = Object.entries(fields).find(([key]) => normalizedAliases.includes(normalizeKey(key)));

  return entry?.[1];
}

function stringifyField(value: AirtableFieldValue) {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "object" && item !== null && "name" in item) {
          return item.name;
        }

        return String(item);
      })
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "object") {
    return value.name ?? value.url;
  }

  return String(value);
}

function listField(value: AirtableFieldValue) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "object" && item !== null && "name" in item) {
          return item.name;
        }

        return String(item);
      })
      .filter((item): item is string => Boolean(item));
  }

  const text = stringifyField(value);

  if (!text) {
    return [];
  }

  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueList(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function parsePriceCents(value: AirtableFieldValue) {
  if (typeof value === "number") {
    return value < 1000 ? Math.round(value * 100) : Math.round(value);
  }

  const text = stringifyField(value)?.replace(/[$,\s]/g, "");

  if (!text) {
    return undefined;
  }

  const amount = Number(text);

  if (!Number.isFinite(amount)) {
    return undefined;
  }

  return amount < 1000 ? Math.round(amount * 100) : Math.round(amount);
}

function parseCount(value: AirtableFieldValue) {
  if (typeof value === "number") {
    return Math.max(0, Math.round(value));
  }

  const text = stringifyField(value)?.replace(/[^\d.]/g, "");

  if (!text) {
    return undefined;
  }

  const count = Number(text);

  return Number.isFinite(count) ? Math.max(0, Math.round(count)) : undefined;
}

function normalizeAirtableCourse(record: AirtableRecord): AirtableCourseMetadata | null {
  const fields = record.fields;
  const skyprepCourseId = stringifyField(
    getField(fields, [
      "SkyPrep Course ID",
      "SkyPrep ID",
      "Course ID",
      "course_id",
      "course id",
      "ID",
    ]),
  );

  if (!skyprepCourseId) {
    return null;
  }

  const primaryCategory = stringifyField(
    getField(fields, ["Primary Category", "Category", "Track", "Course Category"]),
  );
  const secondaryTags = listField(getField(fields, ["Secondary Tags", "Secondary Tag"]));

  return {
    skyprepCourseId,
    priceCents: parsePriceCents(getField(fields, ["Price", "Course Price", "priceCents", "Price Cents"])),
    status: stringifyField(getField(fields, ["Status", "Course Status", "Publish Status"])),
    tags: uniqueList(
      [
        primaryCategory,
        ...secondaryTags,
        ...listField(
          getField(fields, [
            "Primary Tags",
            "Primary Tag",
            "Tags",
            "Tag",
            "Topics",
            "Category Tags",
          ]),
        ),
      ].filter((tag): tag is string => Boolean(tag)),
    ),
    creator: stringifyField(
      getField(fields, [
        "Instructor",
        "Instructor Tag",
        "Instructor Tags",
        "Instructor Name",
        "Creator",
        "Author",
        "Course Creator",
      ]),
    ),
    category: primaryCategory,
    title: stringifyField(
      getField(fields, ["Public Title", "Title", "Course Title", "Name", "Course Name"]),
    ),
    description: stringifyField(
      getField(fields, [
        "Public Description",
        "Description",
        "Summary",
        "Catalog Description",
      ]),
    ),
    moduleCount: parseCount(
      getField(fields, [
        "Module Count",
        "Modules",
        "Lesson Count",
        "Lessons",
        "Material Count",
        "Materials",
        "Resource Count",
        "Resources",
        "File Count",
        "Files",
        "Course Item Count",
        "Course Items",
      ]),
    ),
  };
}

export function hasAirtableConfig() {
  return Boolean(readEnv("AIRTABLE_API_KEY") && readEnv("AIRTABLE_BASE_ID") && readEnv("AIRTABLE_TABLE_ID"));
}

export function isPublicAirtableStatus(status?: string) {
  if (!status) {
    return true;
  }

  const normalizedStatus = status.trim().toLowerCase();

  return !["draft", "hidden", "inactive", "archived", "disabled", "do not publish"].includes(
    normalizedStatus,
  );
}

export async function getAirtableCourseMetadata() {
  if (!hasAirtableConfig()) {
    return [];
  }

  const baseId = requireEnv("AIRTABLE_BASE_ID");
  const tableId = requireEnv("AIRTABLE_TABLE_ID");
  const viewId = readEnv("AIRTABLE_VIEW_ID");
  const metadata: AirtableCourseMetadata[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();

    if (viewId) {
      params.set("view", viewId);
    }

    params.set("cellFormat", "string");
    params.set("timeZone", "America/Toronto");
    params.set("userLocale", "en-us");

    if (offset) {
      params.set("offset", offset);
    }

    const response = await fetch(`${airtableApiUrl}/${baseId}/${tableId}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${requireEnv("AIRTABLE_API_KEY")}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Airtable request failed with status ${response.status}`);
    }

    const data = (await response.json()) as AirtableListResponse;

    data.records.forEach((record) => {
      const course = normalizeAirtableCourse(record);

      if (course) {
        metadata.push(course);
      }
    });

    offset = data.offset;
  } while (offset);

  return metadata;
}
