import { NextResponse } from "next/server";
import { getIntegrationStatus } from "@/lib/backend/core/env";

export function GET() {
  return NextResponse.json({
    ok: true,
    integrations: getIntegrationStatus(),
  });
}
