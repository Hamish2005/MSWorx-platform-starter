type EnvKey =
  | "OPENAI_API_KEY"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET"
  | "SKYPREP_API_KEY"
  | "SKYPREP_ACCT_KEY"
  | "AIRTABLE_API_KEY"
  | "AIRTABLE_BASE_ID"
  | "AIRTABLE_TABLE_ID"
  | "AIRTABLE_VIEW_ID"
  | "POSTMARK_SERVER_TOKEN"
  | "NEXT_PUBLIC_GA_MEASUREMENT_ID";

export function readEnv(key: EnvKey) {
  return process.env[key];
}

export function requireEnv(key: EnvKey) {
  const value = readEnv(key);

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getIntegrationStatus() {
  const stripeWebhookSecret = readEnv("STRIPE_WEBHOOK_SECRET");

  return {
    openai: Boolean(readEnv("OPENAI_API_KEY")),
    stripe: Boolean(readEnv("STRIPE_SECRET_KEY")),
    stripeWebhook: Boolean(stripeWebhookSecret),
    stripeWebhookLooksValid: Boolean(stripeWebhookSecret?.startsWith("whsec_")),
    skyprep: Boolean(readEnv("SKYPREP_API_KEY") && readEnv("SKYPREP_ACCT_KEY")),
    airtable: Boolean(
      readEnv("AIRTABLE_API_KEY") && readEnv("AIRTABLE_BASE_ID") && readEnv("AIRTABLE_TABLE_ID"),
    ),
    postmark: Boolean(readEnv("POSTMARK_SERVER_TOKEN")),
    ga4: Boolean(readEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID")),
  };
}
