/**
 * Multi-Tenant Config & Domain Resolver Module
 *
 * Supports single-deployment multi-domain hosting.
 * Identifies request domain (Host Header) and returns corresponding tenant configuration.
 */

export interface TenantConfig {
  siteId: string;
  brandName: string;
  logoUrl: string;
  defaultLocale: string;
  defaultPath: string;
  supportEmail: string;
  currency: string;
}

export const TENANT_CONFIGS: Record<string, TenantConfig> = {
  'lipsync.pro': {
    siteId: 'lipsync.pro',
    brandName: 'LipSync.pro',
    logoUrl: '/logo.png',
    defaultLocale: 'en',
    defaultPath: '/lip-sync-ai',
    supportEmail: 'hi@lipsync.pro',
    currency: 'USD',
  },
  'wav2lipia.com': {
    siteId: 'wav2lipia.com',
    brandName: 'Wav2LipIA',
    logoUrl: '/logo.png',
    defaultLocale: 'fr',
    defaultPath: '/animer-photo-ia',
    supportEmail: 'support@wav2lipia.com',
    currency: 'EUR',
  },
};

export const DEFAULT_TENANT: TenantConfig = TENANT_CONFIGS['lipsync.pro'];

/**
 * Resolve tenant configuration by request hostname
 */
export function getTenantByHost(host?: string | null): TenantConfig {
  if (!host) return DEFAULT_TENANT;

  const cleanHost = host
    .split(':')[0]
    .toLowerCase()
    .replace(/^www\./, '');

  if (TENANT_CONFIGS[cleanHost]) {
    return TENANT_CONFIGS[cleanHost];
  }

  // Domain matching rules for subdomains or custom domains
  if (cleanHost.includes('wav2lipia') || cleanHost.includes('wav2lip.fr')) {
    return TENANT_CONFIGS['wav2lipia.com'];
  }

  return DEFAULT_TENANT;
}
