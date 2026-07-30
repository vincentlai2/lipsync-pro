# LipSync.pro AI SaaS Rebuild Route

## Decision

LipSync.pro will be rebuilt as a mature, reusable AI SaaS framework, not treated as a lightweight placeholder marketing site.

We choose route B:

- Use the MK SaaS / wav2lipia architecture as the starting blueprint.
- Build a clean LipSync.pro SaaS baseline from that architecture.
- Do not keep the current lightweight `lipsync.pro` project as the long-term architectural constraint.
- Reuse the current `lipsync.pro` content and assets only where useful.

## Why Route B

The target product will likely need:

- Auth
- Credits
- Payments
- AI task creation and polling
- Upload/storage
- User workspace
- Creation history
- Pricing
- SEO landing pages
- Future multilingual expansion
- Future multi-tool expansion

These are core SaaS platform concerns. Adding them piecemeal into the current placeholder site would create a mixed architecture with more friction and technical debt.

## What To Reuse From MK SaaS / wav2lipia

- App Router grouping: marketing, protected app, auth, API routes.
- Auth flow and protected routes.
- Credits system: balance, consumption, refund, transactions.
- Payment system: pricing, checkout, webhook, billing/customer portal.
- Storage system: R2/S3-style presigned upload.
- AI task system: create task, poll task status, task records, user history.
- Dashboard/studio structure.
- Metadata, sitemap, robots, and hreflang-ready SEO infrastructure.
- Conversion structure: tool-first landing page with SEO content below.
- `/lip-sync-ai` as the primary tool and SEO conversion page.

## What Not To Copy Blindly

- Wav2Lip-specific keyword strategy and copy.
- French-first positioning.
- Boilerplate docs/content that does not serve LipSync.pro.
- Overly heavy feature areas that are not needed for MVP.
- UI decisions that work in pure dark mode but feel weak in light mode.
- Any garbled or encoding-damaged copy.

## Initial Product Scope

Start with English only.

Keep the architecture i18n-ready, but do not implement multilingual pages in the first build.

Initial required surfaces:

- `/` brand homepage
- `/lip-sync-ai` main conversion/tool page
- Auth pages
- Studio/tool workspace
- My creations
- Credits
- Billing/pricing
- Basic legal pages

Later expansion (Phase 2):

- French and other locales (Phase 2 - Deferred for now)
- SEO topic clusters
- Blog/docs
- Additional AI video/audio tools
- API keys and developer API
- Admin workflows

## Core UX Strategy

- `/lip-sync-ai` should be the main search and ad landing page.
- First viewport should expose the tool entry directly.
- SEO content belongs below the tool.
- Home page should introduce the brand and route users toward the tool.
- Users should be able to prepare inputs before being forced to log in where feasible.
- Login should preserve the user's flow and recover as much state as possible.
- Uploaded file persistence should be explicit: if files cannot survive auth return, preserve filenames/settings and ask the user to re-confirm uploads.

## UI Direction

Do not simply inherit MK SaaS visual styling.

The new LipSync.pro UI should support both light and dark mode, with light mode treated as a first-class product experience.

Design goals:

- Quiet, professional AI SaaS interface.
- Clear hierarchy in light mode.
- Strong tool usability over decorative landing-page effects.
- Stable card, input, upload, and result states.
- Less glow-heavy, less glass-heavy, less low-contrast gray-on-gray.
- Use product screenshots/previews and clear workflow affordances.

Preferred light-mode direction:

- Background: warm white or neutral zinc, not flat pure white everywhere.
- Panels: solid white with subtle borders and restrained shadows.
- Primary color: keep a recognizable LipSync blue, with secondary accent used sparingly.
- Text: strong contrast for headings/body/helper text.
- Tool area: dense but calm, with clear upload zones, steps, and result panel.
- Avoid relying on gradients for legibility.

## First Build Milestone

Create a clean AI SaaS baseline for LipSync.pro:

1. Choose/import the SaaS base.
2. Strip unrelated Wav2Lipia-specific content.
3. Rebrand to LipSync.pro and Lip Sync AI.
4. Implement `/lip-sync-ai` as the primary tool-first conversion page.
5. Keep i18n hooks possible but ship English only.
6. Build a light-mode-first UI pass.
7. Wire auth, credits, storage, and task scaffolding.
8. Verify build, routes, metadata, and core conversion flow.

## URL Preservation And Redirect Strategy

The old LipSync.pro URLs should not be discarded casually. Existing indexed pages, bookmarks, and backlinks should either keep working at the same path or receive a deliberate 301 redirect.

General rule:

- Preserve high-value SEO URLs at their original paths.
- Rewrite weak content instead of changing URLs when the topic remains useful.
- Merge thin or overlapping pages with 301 redirects.
- Add new SaaS product routes separately.
- Keep a URL migration table before launch.

### Must Preserve

These old URLs should continue to exist:

- `/`
- `/blog`
- `/contact`
- `/privacy`
- `/what-is-ai-lip-sync`
- `/how-to-create-lip-sync-videos`
- `/ai-lip-sync-vs-traditional-dubbing`
- `/video-translation-dubbing`

### Preserve And Rewrite

These URLs are useful as guide/use-case pages and should be kept, but the content should be rewritten to support the new SaaS product and link naturally to `/lip-sync-ai`:

- `/ai-lip-sync-for-elearning`
- `/ai-lip-sync-for-social-media`
- `/video-localization-best-practices`
- `/corporate-training`
- `/ai-lip-sync-guide`

### Merge Or Redirect

These pages may be merged if their content overlaps or is too thin:

- `/cultural-adaptation-tips` -> `/video-localization-best-practices`
- `/measuring-localization-success` -> `/video-localization-best-practices` or a future `/video-localization` page
- `/author/lipsync-team` -> `/about`, unless author pages remain part of the SEO/content system
- `/changelog` -> preserve only if product changelog is maintained; otherwise simplify or noindex

### New SaaS Routes

The rebuilt SaaS should add these product routes:

- `/lip-sync-ai`
- `/pricing`
- `/studio` or `/dashboard`
- `/studio/creations`
- `/settings/credits`
- `/settings/billing`
- `/auth/login`
- `/auth/register`
- `/terms`
- `/cookie` optional

### Preferred Migration Shape

Old SEO URLs should generally keep their exact slugs. New SaaS product functionality should use standard SaaS paths. The homepage should route users clearly toward `/lip-sync-ai`, while `/lip-sync-ai` becomes the main search/ad conversion page.

## Multi-Domain & Traffic Aggregation Strategy (多域名矩阵与轻量导流架构)

To expand into multiple sub-niches (e.g. Lip Sync, Talking Avatars, Multilingual Dubbing) without multiplying SaaS backend maintenance overhead, we adopt the **Hub & Satellite (主平台 + 轻量卫星站/导流站)** architecture:

1. **Core SaaS Hub (e.g. LipSync.pro)**
   - Maintains the single source of truth for Auth, Credits, Stripe Payments, User Workspace, and Backend AI Generation Queues.
   - Deployed once, maintained once.

2. **Satellite Traffic Sites (卫星长尾/导流站)**
   - No heavy SaaS backend or Stripe configuration required.
   - Designed for ultra-fast deployment on static hosting (Cloudflare Pages, Vercel, Netlify).
   - Captures long-tail keyword traffic (e.g. specific niche terms, regional domains).
   - Seamlessly routes users to the Core SaaS Hub via URL parameters (`?ref=satellite_name`) or direct API invocation with unified SSO/OAuth.
   - Alternatively, use Single-Deployment Multi-Tenant Domain Customization where multiple domain aliases map to the same deployed Next.js app.

