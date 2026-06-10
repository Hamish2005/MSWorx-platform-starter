import { requireEnv } from "@/lib/backend/core/env";

export function getPostmarkServerToken() {
  return requireEnv("POSTMARK_SERVER_TOKEN");
}
