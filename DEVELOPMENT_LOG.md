# LipSync.pro Development Log

## 2026-07-30 - Wav2Lipia architecture alignment

User clarified the intended baseline:

- `I:\jp\mksaas\wav2lip-fr-main` is the wav2lipia.com codebase.
- LipSync.pro should reuse wav2lipia's code architecture, not merely imitate its UI.
- Current AG frontend UI and SEO copy should remain the primary marketing surface.
- The key architecture pattern is same-URL behavior:
  - Before login: SEO/conversion landing page.
  - After login: workspace-oriented tool page.
  - URLs stay the same for `/lip-sync-ai`, `/text-to-lip-sync`, and `/photo-to-lip-sync`.

Current mapping found:

- `/text-to-lip-sync`: already follows the wav2lipia pattern with `getSession()`, `DashboardSidebar`, `DashboardHeader`, and `Wav2LipUploader`.
- `/photo-to-lip-sync`: already follows the wav2lipia pattern with `getSession()`, `DashboardSidebar`, `DashboardHeader`, and `Wav2LipUploader`.
- `/lip-sync-ai`: AG marketing page is present, but the logged-in workspace branch was missing.

Implementation intent:

- Preserve AG's logged-out `/lip-sync-ai` SEO landing page.
- Add wav2lipia-style logged-in branch to `/lip-sync-ai` using the existing SaaS primitives:
  - `getSession()`
  - `claimDailyLoginCredits()`
  - `DashboardSidebar`
  - `DashboardHeader`
  - `Wav2LipUploader`
  - user credits card
  - recent task history card
  - quick help card

No SEO/UI rewrite is intended in this step beyond restoring the same-URL logged-in workspace architecture.

Completed in this step:

- Added the logged-in `/lip-sync-ai` workspace branch.
- Kept AG's logged-out `/lip-sync-ai` SEO landing page as the default unauthenticated experience.
- Reused the wav2lipia-style server session branch with:
  - `DashboardSidebar`
  - `DashboardHeader`
  - `Wav2LipUploader`
  - credits panel
  - recent videos panel
  - quick production tips panel
- Ran `pnpm build` successfully.

Known environment note:

- Build still prints Better Auth default secret warnings when `BETTER_AUTH_SECRET` is not configured. The build itself passes.

## 2026-07-30 - Login workspace shell and local generation fixes

User confirmed scheme A for logged-in pages:

- Logged-out marketing pages keep AG's SEO UI/copy.
- Logged-in tool pages should not be wrapped by the public marketing navbar/footer.
- Workspace pages should show the SaaS dashboard shell only.

Completed in this step:

- Updated the marketing layout to render only page content when a valid session exists, so logged-in `/lip-sync-ai`, `/text-to-lip-sync`, and `/photo-to-lip-sync` are workspace-first.
- Changed the Wav2Lip TTS API default voice from French to English (`en-US-JennyNeural`) for LipSync.pro.
- Added a small-file server upload fallback when direct browser upload to R2/S3 fails, which helps local testing when storage CORS blocks `localhost`.

Notes:

- French voices remain selectable as optional TTS voices.
- For future multi-domain support, default TTS language should become tenant-aware instead of hardcoded globally.

## 2026-07-30 - Remove redundant logged-in tool header

User reviewed the logged-in workspace and confirmed the top breadcrumb/header strip was unnecessary.

Completed in this step:

- Removed `DashboardHeader` from logged-in `/lip-sync-ai`.
- Removed `DashboardHeader` from logged-in `/text-to-lip-sync`.
- Removed `DashboardHeader` from logged-in `/photo-to-lip-sync`.
- Kept the left dashboard sidebar and main workspace content.

Rationale:

- The active sidebar item and page H1 already identify the current tool.
- Removing the top strip also removes the extra horizontal divider, making the app workspace cleaner.

## 2026-07-30 - Workspace density and naming cleanup

User asked whether the logged-in workspace felt mature enough. The assessment was:

- The direction is better after removing the marketing shell.
- The right column looked too empty.
- The main generator card still felt slightly like a landing-page component.
- Sidebar naming should match the canonical `/photo-to-lip-sync` route.

Completed in this step:

- Renamed the logged-in sidebar item from `Image to Lip Sync` to `Photo to Lip Sync`.
- Added right-column workspace panels on `/lip-sync-ai`:
  - render settings
  - render cost
  - production checklist
- Moved quick production guidance out of the left tool flow.
- Reduced the main generator card's heavy rounded corners, gradients, and shadows for a more app-like workspace feel.

Verification:

- `pnpm build` passed.

## 2026-07-31 - Hide Tailwind breakpoint indicator

User reported a floating `xs` badge on mobile workspace preview.

Finding:

- The badge came from `TailwindIndicator`, a development-only breakpoint helper rendered globally.

Completed in this step:

- Changed `TailwindIndicator` to render only when `NEXT_PUBLIC_ENABLE_TAILWIND_INDICATOR=true`.
- Default local preview no longer shows the floating breakpoint badge.

Verification:

- `pnpm build` passed.

## 2026-07-31 - Mobile workspace navigation and devtools cleanup

User reported two mobile issues:

- The floating bottom-right icon opened TanStack React Query Devtools.
- Logged-in mobile workspace had no clear way to return home or open navigation.

Completed in this step:

- Added `WorkspaceMobileHeader` for logged-in tool pages.
- Mobile header includes:
  - sidebar trigger for the existing mobile drawer
  - LipSync.pro logo/name linking to the homepage
  - compact credits button
- Added the mobile header to:
  - `/lip-sync-ai`
  - `/text-to-lip-sync`
  - `/photo-to-lip-sync`
- Changed React Query Devtools so it only renders when `NEXT_PUBLIC_ENABLE_QUERY_DEVTOOLS=true`.

Verification:

- `pnpm build` passed.

## 2026-07-31 - Remove low-value right-panel settings block

User questioned the value of the right-side render settings block.

Decision:

- The static `Current render` / render settings card did not justify its space.
- Credits and recent tasks are the high-value right-side workspace information.
- Render cost is still useful, but belongs with the credits context.

Completed in this step:

- Removed the separate `Current render` card from the shared workspace side panel.
- Moved `Render cost: 20 credits` into the credits card.
- Simplified `WorkspaceSidePanel` props because per-tool mode copy is no longer needed.

Verification:

- `pnpm build` passed.

## 2026-07-31 - Right panel weight and mobile behavior

User reviewed desktop and mobile workspace screenshots and noted:

- Mobile felt crowded.
- The right panel was useful on desktop, but visually too heavy.
- The previous more direct feeling should be partially restored.

Completed in this step:

- Kept the right workspace panel on desktop as an auxiliary control rail.
- Hid the right workspace panel below the `lg` breakpoint so mobile remains focused on the main task flow.
- Reduced right-panel spacing, card headers, and copy weight.
- Renamed `Render settings` to `Current render`.
- Removed the separate `Production checklist` card from the right rail to avoid a stack of heavy cards.
- Kept credits, current render details, and recent videos as the core right-side workspace information.

Verification:

- `pnpm build` passed.
- Local dev server on `http://localhost:3001/lip-sync-ai` returned HTTP 200 after restart.

## 2026-07-31 - Default logged-in workspace route

User confirmed that logged-in users should enter `/lip-sync-ai` by default.

Completed in this step:

- Kept `websiteConfig.routes.defaultLoginRedirect` pointed at `/lip-sync-ai`.
- Changed the framework fallback for `DEFAULT_LOGIN_REDIRECT` from `/dashboard` to `/lip-sync-ai`.
- Changed the legacy protected `/dashboard` page to redirect to `/lip-sync-ai`.

Expected behavior:

- Login/register flows without a specific callback land on `/lip-sync-ai`.
- Logged-in users who open `/auth/login` or `/auth/register` are redirected to `/lip-sync-ai`.
- Old `/dashboard` visits are forwarded to the Lip Sync AI workspace.

## 2026-07-31 - SaaS cleanup pass after route/workspace audit

User asked to keep `/#pricing` unchanged and finish the other issues found in the audit.

Completed in this step:

- Kept navbar pricing behavior as `/#pricing`.
- Replaced user-facing French/Wav2Lip leftovers in:
  - footer copyright text
  - footer `Resources` section title
  - credit recharge button text and default callback URL
  - TTS API validation and failure messages
  - upload and presigned upload API validation messages
  - task failure/refund messages
  - credit purchase feature copy
  - English About intro copy
- Rewrote Privacy Policy, Terms of Service, and Cookie Policy content for LipSync.pro in English.
- Made task history and task status lookup tenant-aware through `site_id`:
  - new task records use `getTenantByHost()`
  - `/api/wav2lip/tasks` filters by current tenant
  - workspace side panel filters recent videos by current tenant
  - `/studio/creations` filters by current tenant
  - task status lookup/update checks the current tenant
- Adjusted `/api/wav2lip/health` so generation readiness is not marked unhealthy only because optional commerce price IDs are missing. Commerce readiness is still reported separately.

Verification:

- `pnpm build` passed.
- Restarted local dev server on `http://localhost:3001`.
- Checked these routes return 200:
  - `/lip-sync-ai`
  - `/text-to-lip-sync`
  - `/photo-to-lip-sync`
  - `/pricing`
  - `/privacy`
  - `/terms`
  - `/cookie`
  - `/api/wav2lip/health`

## 2026-07-31 - Live Stripe products, prices, and webhook

User confirmed creating Stripe configuration directly in Live mode.

Safety approach:

- Confirmed the configured Stripe secret key is a Live key before making changes.
- Used stable Stripe `lookup_key` values and LipSync.pro metadata to avoid duplicate price creation.
- Did not log or store Stripe signing secrets in the development log.

Created or verified Live Stripe prices:

- Basic monthly: USD 9.90, monthly subscription
- Basic yearly: USD 94.80, yearly subscription
- Pro monthly: USD 19.90, monthly subscription
- Pro yearly: USD 178.80, yearly subscription
- Ultra monthly: USD 36.90, monthly subscription
- Ultra yearly: USD 358.80, yearly subscription
- Starter credits: USD 9.90, one-time, 100 credits
- Popular credits: USD 14.90, one-time, 200 credits
- Pro Creator credits: USD 29.90, one-time, 500 credits
- Studio Power credits: USD 49.90, one-time, 1000 credits

Completed in this step:

- Added the resulting `NEXT_PUBLIC_STRIPE_PRICE_*` price IDs to `.env`.
- Created a Live Stripe webhook endpoint for `https://lipsync.pro/api/webhooks/stripe`.
- Updated `.env` with the new LipSync.pro webhook signing secret.

Verification:

- Read the created Stripe prices back from Stripe and confirmed:
  - all are active
  - all use USD
  - subscription prices have the correct monthly/yearly interval
  - credit packs are one-time prices
- `pnpm build` passed.
- Restarted local dev server on `http://localhost:3001`.
- `/api/wav2lip/health` now reports:
  - generation: true
  - commerce: true
  - email: true

## 2026-07-31 - Reusable workspace side panel

User pointed out that `/text-to-lip-sync` did not have the right-side workspace panel after `/lip-sync-ai` was improved.

Completed in this step:

- Added a reusable `WorkspaceSidePanel` component for logged-in tool pages.
- Moved credits, recent videos, render settings, render cost, and production checklist into the shared component.
- Connected the shared panel to:
  - `/lip-sync-ai`
  - `/text-to-lip-sync`
  - `/photo-to-lip-sync`
- Customized render input/model/checklist copy per tool mode.
- Removed duplicated right-panel helper code from `/lip-sync-ai`.
- Unified footer naming from `Image to Lip Sync` to `Photo to Lip Sync`.

Verification:

- `pnpm build` passed.

## 2026-07-31 - Google OAuth callback configuration

User entered Google Cloud Console for the existing OAuth Web client used by LipSync.pro.

Completed in this step:

- Kept the existing OAuth client ID and secret already configured in project env files.
- Added the missing LipSync.pro production origins and redirect URIs.
- Added the local `127.0.0.1:3001` origin and redirect URI for local testing.
- Preserved existing local and wav2lipia callback entries for shared/multi-domain compatibility.

Configured OAuth JavaScript origins:

- `http://localhost:3001`
- `http://127.0.0.1:3001`
- `https://lipsync.pro`
- `https://www.lipsync.pro`

Configured OAuth redirect URIs:

- `http://localhost:3001/api/auth/callback/google`
- `http://127.0.0.1:3001/api/auth/callback/google`
- `https://lipsync.pro/api/auth/callback/google`
- `https://www.lipsync.pro/api/auth/callback/google`

Verification:

- Google Cloud Console displayed `OAuth client saved`.

## 2026-07-31 - Dedicated LipSync.pro Google OAuth app

User confirmed using a separate Google OAuth setup so changing LipSync.pro branding does not affect wav2lipia.com.

Completed in this step:

- Created a separate Google Cloud project:
  - Project name: `LipSync Pro OAuth`
  - Project ID: `lipsync-pro-oauth`
- Created a new Google Auth Platform brand:
  - App name: `LipSync.pro`
  - Audience: external
  - Publishing status: production
  - Support/contact email configured for LipSync.pro
- Created a new Web OAuth client:
  - Client name: `LipSync.pro Web Client`
  - JavaScript origins:
    - `https://lipsync.pro`
    - `https://www.lipsync.pro`
    - `http://localhost:3001`
    - `http://127.0.0.1:3001`
  - Redirect URIs:
    - `https://lipsync.pro/api/auth/callback/google`
    - `https://www.lipsync.pro/api/auth/callback/google`
    - `http://localhost:3001/api/auth/callback/google`
    - `http://127.0.0.1:3001/api/auth/callback/google`
- Updated the local project environment to use the new LipSync.pro OAuth client.
- Left the previous wav2lipia OAuth project/client untouched.

Verification:

- Restarted the local dev server on `http://localhost:3001`.
- `/api/wav2lip/health` reports `auth: true`.
- Google login completed successfully and redirected back to `/lip-sync-ai`.

## 2026-07-31 - Strict workspace task isolation

Observed on production:

- A user who had older wav2lipia.com generations saw those historical tasks in the LipSync.pro workspace.
- The leaked rows had `wav2lip_task.site_id = NULL`, created before the multi-domain `site_id` field existed.

Completed in this step:

- Removed the LipSync.pro fallback that included legacy `site_id IS NULL` tasks in recent videos.
- `listUserWav2LipTasks` now filters strictly by the current tenant `site_id` when a tenant is resolved.

Expected behavior:

- `https://lipsync.pro/lip-sync-ai` shows only tasks created on `lipsync.pro`.
- Legacy null-site tasks no longer appear in the LipSync.pro workspace.

## 2026-07-31 - Tenant isolation for credits and billing

Completed in this step:

- Added `site_id` to `payment`, `user_credit`, and `credit_transaction`.
- Backfilled existing credits/payment history to `wav2lipia.com`, so LipSync.pro no longer shares balances or transaction history with the older site.
- Added tenant-aware reads and writes for workspace credits, credit transactions, generation spend/refunds, checkout metadata, webhook benefit fulfillment, payment completion polling, and current plan lookup.
- Added a `(user_id, site_id)` unique index for `user_credit` to prevent duplicate balance rows per site.
- Avoided `db:push`; used an explicit SQL migration because Drizzle previously tried an unsafe primary-key diff on this production database.

Expected behavior:

- The same Google user can use `wav2lipia.com` and `lipsync.pro` with independent credits, transaction history, and paid plan state.
- Old wav2lipia credit rows remain attached to `wav2lipia.com`.
- First-time LipSync.pro workspace access can initialize that site's registration credits independently.

## 2026-07-31 - Post-migration credit display hardening

Observed on production:

- A generation completed during the deployment window after the database migration.
- The task and usage transaction were written to `lipsync.pro`, but the per-site `user_credit` row was missing, so the workspace could keep showing the old server-rendered balance until refresh.

Completed in this step:

- Repaired `oprom0004@gmail.com` on `lipsync.pro` to `0` credits after one successful generation.
- Hardened credit reads: if a site has credit transactions but no `user_credit` row, the balance row is rebuilt from transactions instead of granting a new signup gift.
- Refreshed the current route after generation success/failure so the server-rendered side panel updates credits and recent videos.

Verification:

- `pnpm exec tsc --noEmit` passed.
- `pnpm exec next build` passed.

## 2026-07-31 - User signup source attribution

Observed on production:

- User-level records did not store which domain created the account.
- Credits, payments, and task history are now tenant-isolated, but 24-hour signup reports still had to infer site from later activity.

Completed in this step:

- Added `first_site_id` and `signup_host` to the `user` table.
- Added a user signup hook that records the current tenant from the request host.
- Registration gift credits and monthly free credits now use the signup tenant instead of the default site.
- Backfilled historical users from their earliest tenant-scoped credit, task, or payment activity.

Production migration:

- Applied `src/db/migrations/0012_user_signup_site.sql` manually to the production database.
- Added `user_first_site_id_idx`.

Verification:

- `pnpm exec tsc --noEmit` passed.
- `pnpm exec next build` passed.
- Last 24 hours after backfill: 4 registrations, all attributed to `wav2lipia.com` from existing activity.

## 2026-07-31 - Repair deployment-window task attribution

Observed on production:

- `sueurcatholique@gmail.com` had a `lipsync.pro` usage transaction and credit balance update, but the matching `wav2lip_task` row had `site_id = NULL`.
- This happened during the tenant-isolation deployment window: credits were already tenant-aware, while one task row was still written without task-site attribution.

Completed in this step:

- Repaired the affected production task by assigning `site_id = lipsync.pro`.
- Repaired the user's `first_site_id` and `signup_host` to `lipsync.pro`.
- Added `src/db/migrations/0013_repair_null_task_sites.sql` to document and automate the same class of repair: match null-site tasks to nearby tenant-aware usage transactions, then backfill missing user signup source from tenant activity.

Result:

- `lipsync.pro` now has 2 succeeded task records in production.
