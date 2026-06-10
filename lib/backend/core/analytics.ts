import { readEnv } from "@/lib/backend/core/env";

export function getGaMeasurementId() {
  return readEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID");
}
