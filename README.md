# MSWorx Learning Website

Premium course catalog and learning portal front door for MSWorx Learning.

The site is built with Next.js, Tailwind CSS, and Framer Motion. It connects the
public course catalog to SkyPrep for learning delivery, Stripe for checkout, and
GA4 for funnel analytics.

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
- `data/course-prices.json` - public price mapping by SkyPrep course ID
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
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Pricing

Course prices are intentionally not stored in `.env.local`. Manage them in:

```txt
data/course-prices.json
```

Prices are keyed by SkyPrep course ID and stored in cents.

## Integration Flow

1. SkyPrep provides course records and course IDs.
2. `data/course-prices.json` marks which courses are purchasable.
3. Learners add one or more courses to the cart.
4. Stripe Checkout collects payment.
5. Stripe webhooks enroll the learner into the selected SkyPrep courses.
6. GA4 tracks catalog and checkout behavior.
