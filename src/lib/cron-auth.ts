import { NextResponse } from 'next/server';

export function validateCronAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const isVercelCron = request.headers.get('x-vercel-cron') !== null;
  const cronSecret = process.env.CRON_SECRET;

  if (isVercelCron) {
    return true;
  }

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  if (authHeader?.startsWith('Basic ')) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8'
    );
    const [username, password] = credentials.split(':');

    const expectedUsername = process.env.CRON_JOBS_USERNAME;
    const expectedPassword = process.env.CRON_JOBS_PASSWORD;

    if (expectedUsername && expectedPassword) {
      return username === expectedUsername && password === expectedPassword;
    }
  }

  return process.env.NODE_ENV === 'development';
}

export function unauthorizedCronResponse() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
