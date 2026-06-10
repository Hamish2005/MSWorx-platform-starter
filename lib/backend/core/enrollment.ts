import crypto from "crypto";
import {
  createSkyPrepUser,
  getSkyPrepUser,
  massEnrollSkyPrepUsers,
  type SkyPrepUser,
} from "@/lib/backend/core/skyprep";

type CatalogEnrollmentRequest = {
  email: string;
  courseIds: string;
};

type LearnerAccountResult = {
  user?: SkyPrepUser;
  created: boolean;
};

function generateTemporaryPassword() {
  return `MSWorx-${crypto.randomBytes(6).toString("base64url")}-1!`;
}

async function ensureSkyPrepLearner(email: string): Promise<LearnerAccountResult> {
  try {
    const user = await getSkyPrepUser({ user_email: email });

    return {
      user,
      created: false,
    };
  } catch {
    const user = await createSkyPrepUser({
      email,
      password: generateTemporaryPassword(),
      role: "learner",
      email_notifications: true,
      send_login_information: true,
    });

    return {
      user,
      created: true,
    };
  }
}

export async function completeCatalogEnrollment({ email, courseIds }: CatalogEnrollmentRequest) {
  const learner = await ensureSkyPrepLearner(email);

  await massEnrollSkyPrepUsers({
    user_emails: email,
    course_ids: courseIds,
  });

  return learner;
}
