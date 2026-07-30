import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function hasEnv(name: string) {
  return Boolean(process.env[name]);
}

function section(names: string[]) {
  const missing = names.filter((name) => !hasEnv(name));
  return {
    ok: missing.length === 0,
    missing,
  };
}

export async function GET() {
  const dashScopeOk =
    hasEnv('ALIBABA_DASHSCOPE_API_KEY') || hasEnv('DASHSCOPE_API_KEY');

  const checks = {
    app: section(['NEXT_PUBLIC_BASE_URL', 'BETTER_AUTH_SECRET']),
    database: section(['DATABASE_URL']),
    auth: section(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']),
    email: section(['RESEND_API_KEY']),
    storage: section([
      'STORAGE_REGION',
      'STORAGE_ENDPOINT',
      'STORAGE_BUCKET_NAME',
      'STORAGE_ACCESS_KEY_ID',
      'STORAGE_SECRET_ACCESS_KEY',
      'STORAGE_PUBLIC_URL',
    ]),
    commerce: section([
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY',
      'NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY',
      'NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY',
      'NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY',
      'NEXT_PUBLIC_STRIPE_PRICE_ULTRA_MONTHLY',
      'NEXT_PUBLIC_STRIPE_PRICE_ULTRA_YEARLY',
      'NEXT_PUBLIC_STRIPE_PRICE_CREDITS_BASIC',
      'NEXT_PUBLIC_STRIPE_PRICE_CREDITS_STANDARD',
      'NEXT_PUBLIC_STRIPE_PRICE_CREDITS_PREMIUM',
      'NEXT_PUBLIC_STRIPE_PRICE_CREDITS_ENTERPRISE',
    ]),
    dashscope: {
      ok: dashScopeOk,
      missing: dashScopeOk
        ? []
        : ['ALIBABA_DASHSCOPE_API_KEY or DASHSCOPE_API_KEY'],
    },
  };

  const generationOk = [
    checks.app,
    checks.database,
    checks.auth,
    checks.storage,
    checks.dashscope,
  ].every((check) => check.ok);

  return NextResponse.json(
    {
      ok: generationOk,
      checks,
      readiness: {
        generation: generationOk,
        commerce: checks.commerce.ok,
        email: checks.email.ok,
      },
      wav2lip: {
        creditsPerTask: Number(process.env.WAV2LIP_CREDITS_PER_TASK || 20),
        maxVideoFileSize: Number(
          process.env.WAV2LIP_MAX_VIDEO_FILE_SIZE ||
            process.env.WAV2LIP_MAX_FILE_SIZE ||
            300 * 1024 * 1024
        ),
        maxAudioFileSize: Number(
          process.env.WAV2LIP_MAX_AUDIO_FILE_SIZE || 30 * 1024 * 1024
        ),
      },
    },
    { status: generationOk ? 200 : 503 }
  );
}
