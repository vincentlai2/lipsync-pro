'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackSignUp } from '@/lib/ads-tracking';

/**
 * Listener component that catches '?signup=success' in URL parameters
 * and triggers GA4 and Meta Pixel Sign Up conversion tracking.
 */
function SignUpListener() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const signup = searchParams.get('signup');
    const method = searchParams.get('method') as 'email' | 'google' | null;
    if (signup === 'success') {
      console.log(
        '[AdsEventListener] Detected signup=success in URL, method:',
        method
      );
      // Fire sign up tracking event
      trackSignUp(method || 'email');

      // Remove 'signup' and 'method' from URL query params quietly without reloading page
      const url = new URL(window.location.href);
      url.searchParams.delete('signup');
      url.searchParams.delete('method');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  return null;
}

export default function AdsEventListener() {
  return (
    <Suspense fallback={null}>
      <SignUpListener />
    </Suspense>
  );
}
