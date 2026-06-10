import { NextResponse } from "next/server";
import { getStripeAccountStatus } from "@/lib/backend/core/stripe";

export async function GET() {
  try {
    const account = await getStripeAccountStatus();

    return NextResponse.json({
      ok: true,
      account: {
        id: account.id,
        country: account.country,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Stripe connection failed",
      },
      { status: 500 },
    );
  }
}
