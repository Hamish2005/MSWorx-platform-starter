# Integrations

## Environment Variables

Create `.env.local` in the project root. Do not commit it.

```txt
STRIPE_SECRET_KEY=sk_test_or_live_key
STRIPE_WEBHOOK_SECRET=whsec_later_when_webhooks_are_added
SKYPREP_API_KEY=your_skyprep_api_key
SKYPREP_ACCT_KEY=yourdomain.skyprepapp.com
AIRTABLE_API_KEY=your_airtable_personal_access_token
AIRTABLE_BASE_ID=appV6DZWjRyB1ikqL
AIRTABLE_TABLE_ID=tbluHBGECBwuRhSSD
AIRTABLE_VIEW_ID=viwZ0xmweFAZsVSB4
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Restart the dev server after changing `.env.local`.

`STRIPE_WEBHOOK_SECRET` can be blank until Stripe webhooks are created. Checkout
and account status only require `STRIPE_SECRET_KEY`.

Course prices are managed in `data/course-prices.json`, keyed by SkyPrep course
ID. Prices are stored in cents, so `9900` is `$99.00`.

Use `0` for a free course. Free-only carts bypass Stripe and enroll the learner
directly through the SkyPrep enrollment flow.

When Airtable is configured, Airtable becomes the public catalog metadata source.
SkyPrep still provides the deliverable course records, but Airtable controls
which matching courses appear and supplies price, status, tags, creator, and any
public title/category/description overrides. `data/course-prices.json` remains a
fallback when Airtable credentials are not configured.

`SKYPREP_ACCT_KEY` should be the SkyPrep account domain with no `https://`
prefix, usually something like `yourdomain.skyprepapp.com`.

## Test Routes

Use these locally after the dev server is running:

```txt
GET http://localhost:3000/api/core/status
GET http://localhost:3000/api/core/stripe/status
GET http://localhost:3000/api/core/skyprep/status
GET http://localhost:3000/api/core/skyprep/courses
GET http://localhost:3000/api/core/skyprep/courses/306660
GET http://localhost:3000/api/core/skyprep/groups
GET http://localhost:3000/api/core/skyprep/learning-paths
GET http://localhost:3000/api/core/skyprep/program
GET http://localhost:3000/api/core/airtable/courses
```

## Airtable Course Metadata

The current Airtable source is:

```txt
Base: appV6DZWjRyB1ikqL
Table: tbluHBGECBwuRhSSD
View: viwZ0xmweFAZsVSB4
```

The integration matches Airtable rows to SkyPrep courses using a shared course
ID field. It recognizes common field names such as:

- `SkyPrep Course ID`, `SkyPrep ID`, `Course ID`, or `course_id`
- `Price`, `Course Price`, `priceCents`, or `Price Cents`
- `Status`, `Course Status`, or `Publish Status`
- `Tags`, `Tag`, `Topics`, or `Category Tags`
- `Creator`, `Instructor`, `Author`, or `Course Creator`

Statuses such as `Draft`, `Hidden`, `Inactive`, `Archived`, `Disabled`, and
`Do Not Publish` are excluded from the public catalog.

## Google Analytics 4

Set the GA4 measurement ID in `.env.local`:

```txt
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The site loads GA4 globally when this value exists. The course catalog currently
tracks:

- `view_item_list` when the catalog loads
- `search` after a learner searches the catalog
- `filter_applied` when a filter changes or filters are cleared
- `add_to_cart` and `remove_from_cart`
- `begin_checkout`
- `checkout_completed` after Stripe redirects back with a checkout session ID

## Stripe Checkout

Create products and prices in Stripe. Store the returned `price_...` ID with
the matching course record.

The checkout route is:

```txt
POST http://localhost:3000/api/core/stripe/checkout
```

Example body:

```json
{
  "email": "learner@example.com",
  "courseIds": ["306660", "306661"]
}
```

The route returns a Stripe Checkout URL for a cart-style checkout. After payment
succeeds, the webhook uses the selected SkyPrep course IDs to enroll the buyer.

If every selected course is free, the same route returns a success URL without
creating a Stripe Checkout Session. The learner account is created or reused and
the free courses are enrolled immediately.

## Enrollment Flow

The desired buyer flow is:

1. The learner adds one or more catalog courses to the cart.
2. The learner enters the email address that should own the SkyPrep account.
3. Stripe Checkout collects payment.
4. The Stripe webhook creates a SkyPrep learner account when one does not already
   exist for that email.
5. New SkyPrep learners receive login information by email, including username
   and temporary password details.
6. The webhook enrolls the learner into every course purchased in the cart.

For existing SkyPrep learners, the webhook reuses the account tied to that email
and enrolls the purchased courses without resetting the learner password.

The site should not show or store temporary passwords. Password delivery should
come from SkyPrep's login-information email or, if MSWorx later wants branded
messages, from a transactional email service such as Postmark.

## Organization Flow

The organization page is a sales and consultation page, not a bulk self-service
enrollment dashboard.

Organizations have two paths:

- Direct purchase: an organization buyer can use the public catalog and checkout
  like an individual buyer. This is best for individual learners and small teams
  where the buyer can provide the learner email during checkout.
- Consultation purchase: if an organization decides to enroll after speaking with
  MSWorx, the organization provides learner email addresses and MSWorx can create
  or enroll those learners through SkyPrep.

Recommended bulk threshold: use consultation for roughly 25+ learners. Bulk
buyers should not be asked to manually enter every staff member during website
checkout. MSWorx should collect learner details separately, usually as a
spreadsheet or CSV with email, first name, last name, and optional role/team
fields.

## Stripe Webhooks

The local webhook route is:

```txt
POST http://localhost:3000/api/core/stripe/webhook
```

Use PowerShell if Git Bash cannot find the `stripe` command:

```powershell
stripe listen --forward-to localhost:3000/api/core/stripe/webhook
```

Copy the printed `whsec_...` value into `.env.local`:

```txt
STRIPE_WEBHOOK_SECRET=whsec_...
```

Restart the dev server after changing `.env.local`.

Then test:

```powershell
stripe trigger checkout.session.completed
```

## SkyPrep

SkyPrep keys stay server-side. The helper in `lib/backend/core/skyprep.ts` uses
POST requests to SkyPrep endpoints such as `test_connection` and `get_courses`.

Course IDs returned by SkyPrep should be stored on the matching course record,
then used after Stripe payment succeeds to enroll the learner.

The current public API routes are read-only and safe for local testing. User
creation, enrollment, sign-in links, groups, learning paths, and progress helpers
exist in `lib/backend/core/skyprep.ts` for server-side workflows, but should only
be called from protected routes or trusted webhook handlers.
