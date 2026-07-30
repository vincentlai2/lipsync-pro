import { requireSession, unauthorizedResponse } from '@/lib/require-session';
import { getTenantByHost } from '@/lib/tenant';
import { listUserWav2LipTasks } from '@/wav2lip/tasks';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return unauthorizedResponse();
  }

  const tenant = getTenantByHost(request.headers.get('host'));
  const tasks = await listUserWav2LipTasks({
    userId: session.user.id,
    siteId: tenant.siteId,
  });
  return NextResponse.json({ tasks });
}
