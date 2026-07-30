'use server';

import { getUserCredits } from '@/credits/credits';
import type { User } from '@/lib/auth-types';
import { userActionClient } from '@/lib/safe-action';
import { getCurrentTenantSiteId } from '@/lib/server-tenant';

/**
 * Get current user's credits
 */
export const getCreditBalanceAction = userActionClient.action(
  async ({ ctx }) => {
    try {
      const currentUser = (ctx as { user: User }).user;
      const siteId = await getCurrentTenantSiteId();
      const credits = await getUserCredits(currentUser.id, siteId);
      return { success: true, credits };
    } catch (error) {
      console.error('get credit balance error:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch credit balance',
      };
    }
  }
);
