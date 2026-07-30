# LipSync.pro

LipSync.pro is an AI SaaS application for creating lip sync videos online.

## Product Direction

- `/` is the brand entry page with the tool available in the first viewport.
- `/lip-sync-ai` is the primary SEO and conversion page for the head term.
- SEO content lives below the tool, so visitors can start creating before reading.
- Login should preserve the user's upload/text intent whenever possible.
- English is the first live locale; the codebase remains ready for future i18n.

## Development

```bash
pnpm install
pnpm dev
pnpm build
```

## Important Setup

Copy `env.example` to your local environment file and configure:

- `NEXT_PUBLIC_BASE_URL`
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- OAuth credentials
- Resend email
- S3/R2 storage
- DashScope generation API
- Stripe prices and webhook secret

Production auth requires a real `BETTER_AUTH_SECRET`.
