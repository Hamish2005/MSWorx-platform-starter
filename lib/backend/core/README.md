# Core Backend

Stable, non-AI server code lives here.

Use this folder for integrations the site depends on but should rarely change:

- Stripe checkout and webhook helpers
- SkyPrep checkout enrollment orchestration
- SkyPrep catalog, learner, group, learning path, sign-in, and progress helpers
- Transactional email helpers
- GA4 server-side event helpers
- Shared environment variable validation

AI-specific code belongs in `lib/backend/ai`.
