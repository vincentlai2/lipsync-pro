import 'server-only';

import { headers } from 'next/headers';
import { getTenantByHost } from './tenant';

export async function getCurrentTenant() {
  const headersList = await headers();
  return getTenantByHost(headersList.get('host'));
}

export async function getCurrentTenantSiteId() {
  const tenant = await getCurrentTenant();
  return tenant.siteId;
}
