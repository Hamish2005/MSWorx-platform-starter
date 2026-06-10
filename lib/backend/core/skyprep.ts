import { requireEnv } from "@/lib/backend/core/env";

const skyprepApiUrl = "https://api.skyprep.io/admin/api";

type SkyPrepParam = string | number | boolean | undefined;

export type SkyPrepMessage = {
  message?: string;
  [key: string]: unknown;
};

export type SkyPrepCourse = {
  id: string | number;
  course_id?: string | number;
  name?: string;
  title?: string;
  description?: string;
  category?: string;
  active?: boolean;
  certificate?: boolean;
  credits?: string;
  picture_url?: string;
  type_of_training?: string;
  estimated_course_length_in_minutes?: number | null;
  tags?: string[];
  course_items?: Array<{
    id?: string | number;
    course_item_id?: string | number;
    item_type?: string;
    name?: string;
    position?: number;
    mandatory?: boolean;
  }>;
};

export type WebsiteCourse = {
  id: string;
  title: string;
  description: string;
  category: string;
  certificate: boolean;
  active: boolean;
  credits?: string;
  imageUrl?: string;
  format?: string;
  lengthLabel: string;
  lengthMinutes: number | null;
  moduleCount: number;
  skyprepCourseId: string;
  priceCents?: number;
  currency?: string;
  priceLabel?: string;
  purchasable?: boolean;
  status?: string;
  tags?: string[];
  creator?: string;
  introduction?: string;
};

export type SkyPrepUser = {
  id: string | number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  card_no?: string;
  created_at?: string;
  [key: string]: unknown;
};

export type SkyPrepUserInput = {
  email: string;
  first_name?: string;
  last_name?: string;
  role?: "admin" | "manager" | "content_manager" | "learner";
  password?: string;
  card_no?: string;
  title?: string;
  cell?: string;
  work_phone?: string;
  address?: string;
  email_notifications?: boolean;
  send_login_information?: boolean;
};

export type SkyPrepLoginKey = {
  email: string;
  login_key: string;
  url: string;
};

export type SkyPrepGroup = {
  id: string | number;
  name?: string;
  description?: string;
  [key: string]: unknown;
};

export type SkyPrepLearningPath = {
  id: string | number;
  name?: string;
  description?: string;
  [key: string]: unknown;
};

export async function callSkyPrep<T>(
  endpoint: string,
  params: Record<string, SkyPrepParam> = {},
) {
  const body = new URLSearchParams();

  body.set("api_key", requireEnv("SKYPREP_API_KEY"));
  body.set("acct_key", requireEnv("SKYPREP_ACCT_KEY"));

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      body.set(key, String(value));
    }
  });

  const response = await fetch(`${skyprepApiUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `SkyPrep ${endpoint} failed with status ${response.status}${
        details ? `: ${details.slice(0, 240)}` : ""
      }`,
    );
  }

  return (await response.json()) as T;
}

export function testSkyPrepConnection() {
  return callSkyPrep("test_connection");
}

export function getSkyPrepCourses() {
  return callSkyPrep<SkyPrepCourse[]>("get_courses");
}

export function getSkyPrepCourse(courseId: string | number) {
  return callSkyPrep<SkyPrepCourse>("get_course", { course_id: courseId });
}

export function getSkyPrepUsers(params: {
  limit?: number;
  page?: number;
  offset?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  include_groups?: boolean;
  include_learning_paths?: boolean;
} = {}) {
  return callSkyPrep<SkyPrepUser[]>("get_users", params);
}

export function getSkyPrepUser(identifier: { user_id?: string | number; user_email?: string }) {
  return callSkyPrep<SkyPrepUser>("get_user", identifier);
}

export function createSkyPrepUser(input: SkyPrepUserInput) {
  return callSkyPrep<SkyPrepUser>("create_user", input);
}

export function updateSkyPrepUser(input: SkyPrepUserInput & { user_id?: string | number; user_email?: string }) {
  return callSkyPrep<SkyPrepUser>("update_user", input);
}

export function getSkyPrepLoginLink(input: {
  user_email: string;
  autocreate?: boolean;
  user_first_name?: string;
  user_last_name?: string;
  key_type?: "otl" | "daily";
  redirect_full_url?: string;
  user_groups?: string;
}) {
  return callSkyPrep<SkyPrepLoginKey>("get_login_key", input);
}

export function getSkyPrepUserCourses(userEmail: string) {
  return callSkyPrep<SkyPrepCourse[]>("get_user_courses", { user_email: userEmail });
}

export function enrollSkyPrepUserInCourse(input: {
  course_id: string | number;
  user_id?: string | number;
  user_email?: string;
  course_enrollment_expiration_date?: string;
}) {
  return callSkyPrep<SkyPrepMessage>("enroll_user_in_course", input);
}

export function enrollSkyPrepUserInCourses(input: {
  user_id: string | number;
  course_ids: Array<string | number> | string;
}) {
  const courseIds = Array.isArray(input.course_ids) ? input.course_ids.join(",") : input.course_ids;

  return callSkyPrep<SkyPrepMessage>("enroll_user_in_courses", {
    user_id: input.user_id,
    course_ids: courseIds,
  });
}

export function massEnrollSkyPrepUsers(input: {
  user_ids?: Array<string | number> | string;
  user_emails?: string[] | string;
  user_group_ids?: Array<string | number> | string;
  course_ids?: Array<string | number> | string;
  course_bundle_ids?: Array<string | number> | string;
}) {
  return callSkyPrep<SkyPrepMessage>("mass_enroll", {
    user_ids: Array.isArray(input.user_ids) ? input.user_ids.join(",") : input.user_ids,
    user_emails: Array.isArray(input.user_emails) ? input.user_emails.join(",") : input.user_emails,
    user_group_ids: Array.isArray(input.user_group_ids)
      ? input.user_group_ids.join(",")
      : input.user_group_ids,
    course_ids: Array.isArray(input.course_ids) ? input.course_ids.join(",") : input.course_ids,
    course_bundle_ids: Array.isArray(input.course_bundle_ids)
      ? input.course_bundle_ids.join(",")
      : input.course_bundle_ids,
  });
}

export function removeSkyPrepUserFromCourse(input: {
  course_id: string | number;
  user_id?: string | number;
  user_email?: string;
}) {
  return callSkyPrep<SkyPrepMessage>("remove_user_from_course", input);
}

export function getSkyPrepGroups() {
  return callSkyPrep<SkyPrepGroup[]>("get_user_groups");
}

export function getSkyPrepGroup(userGroupId: string | number) {
  return callSkyPrep<SkyPrepGroup>("get_user_group", { user_group_id: userGroupId });
}

export function addSkyPrepUserToGroup(input: {
  user_group_id: string | number;
  user_id?: string | number;
  user_email?: string;
}) {
  return callSkyPrep<SkyPrepMessage>("add_user_to_user_group", input);
}

export function getSkyPrepLearningPaths() {
  return callSkyPrep<SkyPrepLearningPath[]>("get_learning_paths");
}

export function getSkyPrepLearningPath(learningPathId: string | number) {
  return callSkyPrep<SkyPrepLearningPath>("get_learning_path", {
    learning_path_id: learningPathId,
  });
}

export function getSkyPrepCourseProgress(input: {
  user_id?: string | number;
  course_id?: string | number;
  course_progress_id?: string | number;
}) {
  return callSkyPrep<Record<string, unknown>>("get_course_progress", input);
}

export function getSkyPrepProgram() {
  return callSkyPrep<Record<string, unknown>>("get_program");
}

export function getSkyPrepSystemData(dataType: "user_count" | "admin_count" | "learner_count" | "course_count" | "user_group_count") {
  return callSkyPrep<{ data: string }>("get_data", { data_type: dataType });
}

function formatCourseLength(minutes?: number | null) {
  if (!minutes) {
    return "Self-paced";
  }

  if (minutes < 60) {
    return `${minutes} minutes`;
  }

  const hours = minutes / 60;

  return Number.isInteger(hours) ? `${hours} hours` : `${hours.toFixed(1)} hours`;
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function htmlToPlainText(value?: string) {
  if (!value) {
    return "";
  }

  return decodeHtmlEntities(value)
    .replace(/<\s*br\s*\/?>/gi, " ")
    .replace(/<\s*\/p\s*>/gi, " ")
    .replace(/<\s*li\s*>/gi, " ")
    .replace(/<\s*\/li\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeSkyPrepCourse(course: SkyPrepCourse): WebsiteCourse {
  const id = String(course.course_id ?? course.id);
  const moduleCount = course.course_items?.length ?? 0;
  const description = htmlToPlainText(course.description);

  return {
    id,
    title: course.name ?? course.title ?? "Untitled course",
    description: description || "Course details are being prepared.",
    category: course.category ?? "General",
    certificate: Boolean(course.certificate),
    active: course.active !== false,
    credits: course.credits,
    imageUrl: course.picture_url,
    format: course.type_of_training,
    lengthLabel: formatCourseLength(course.estimated_course_length_in_minutes),
    lengthMinutes: course.estimated_course_length_in_minutes ?? null,
    moduleCount,
    skyprepCourseId: id,
  };
}

export async function getWebsiteCourses() {
  const courses = await getSkyPrepCourses();

  return courses.filter((course) => course.active !== false).map(normalizeSkyPrepCourse);
}
