# MSWorx Learning Website

Premium course catalog and learning portal front door for MSWorx Learning.

The site is built with Next.js, Tailwind CSS, and Framer Motion. It connects the
public course catalog to Airtable for catalog governance, SkyPrep for learning
delivery, Stripe for checkout, and GA4 for funnel analytics.

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run lint
npm run build
```

Run both before deploys or larger changes.

## Project Map

- `app/` - routes, pages, and API handlers
- `components/` - shared UI components
- `components/home/` - homepage sections
- `components/catalog/` - course catalog UI pieces
- `data/course-prices.json` - fallback price mapping by SkyPrep course ID
- `lib/catalog/` - catalog filtering and cart helpers
- `lib/ai/` - AI finder data and scoring utilities
- `lib/backend/core/` - stable server integrations such as Stripe and SkyPrep
- `lib/backend/ai/` - server-side AI pathway logic
- `docs/integrations.md` - setup notes for Stripe, SkyPrep, GA4, and webhooks

## Environment

Create `.env.local` from `.env.example`. Never commit real secrets.

Core values:

```txt
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SKYPREP_API_KEY=
SKYPREP_ACCT_KEY=
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_ID=
AIRTABLE_VIEW_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For Netlify, add these under Site configuration -> Environment variables. The
catalog will look wrong without the Airtable and SkyPrep variables because the
site cannot load the governed course list.

## Pricing

Course prices are primarily managed in Airtable. `data/course-prices.json` is a
fallback for local development or courses that do not yet have Airtable prices:

```txt
data/course-prices.json
```

Fallback prices are keyed by SkyPrep course ID and stored in cents.

## Integration Flow

1. Airtable controls public title, description, status, category, tags, and price.
2. SkyPrep provides delivery records, module counts, introductions, and enrollment IDs.
3. `Draft` courses stay hidden, `Review` courses are visible but not purchasable,
   and `Live` courses are visible and purchasable.
4. Learners add one or more live courses to the cart.
5. Stripe Checkout collects payment.
6. Stripe webhooks enroll the learner into the selected SkyPrep courses.
7. GA4 tracks catalog and checkout behavior.
