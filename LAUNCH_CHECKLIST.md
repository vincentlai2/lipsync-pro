# LipSync.pro Launch Checklist

## Domain And App URLs

- `NEXT_PUBLIC_BASE_URL=https://lipsync.pro`
- Google OAuth redirect: `https://lipsync.pro/api/auth/callback/google`
- Stripe webhook endpoint: `https://lipsync.pro/api/webhooks/stripe`

## Required Secrets

- Set a strong `BETTER_AUTH_SECRET`.
- Configure `DATABASE_URL` for the production Postgres database.
- Configure Resend, storage, DashScope, and Stripe keys.

## Product Checks

- `/` loads and shows the tool in the first viewport.
- `/lip-sync-ai` loads as the main conversion page.
- `/text-to-lip-sync` and `/animer-photo-ia` load as feature pages.
- Old placeholder URLs redirect to the closest new page.
- Login modal does not unnecessarily discard the current creation intent.

## SEO Checks

- `/sitemap.xml` includes the active LipSync.pro URLs.
- `/robots.txt` blocks private app routes and allows public marketing pages.
- `/lip-sync-ai` targets the English head term while keeping "Lip Sync AI" as the feature name.
- Future French pages should target `synchronisation labiale IA`.

## Payment And Credits

- Create LipSync.pro Stripe products and prices in USD unless a market-specific plan says otherwise.
- Verify subscription checkout, one-time credit packs, webhooks, credit grants, refunds, and billing portal links.
- Multi-currency & per-domain pricing: Stripe supports multi-currency prices (USD, EUR, JPY) per tenant site.

## Multi-Tenant Multi-Domain Architecture (Completed)

- [x] Implemented `src/lib/tenant.ts` domain resolver.
- [x] Injected tenant context headers in proxy middleware (`src/proxy.ts`).
- [x] Added `siteId` field to Drizzle database schema (`wav2lipTask`).
- [x] Tracked task creations with domain origin `siteId`.
- [x] Verified full build compilation with `pnpm lint` and `pnpm build`.

