'use client';

/**
 * Utility client functions for Ads and Conversion tracking (GA4 and Meta Pixel)
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Safely send an event to Google Analytics (gtag)
 */
function sendGaEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
      console.log(`[GA4 Event] ${eventName}`, params);
    } catch (e) {
      console.error('[GA4 Error] Failed to send event:', e);
    }
  }
}

/**
 * Safely send a Google Ads conversion event.
 */
function sendGoogleAdsConversion(params: {
  label: string;
  transactionId: string;
  value: number;
  currency: string;
}) {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!adsId || !params.label) {
    return;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const sendTo = params.label.includes('/')
      ? params.label
      : `${adsId}/${params.label}`;

    try {
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        value: params.value,
        currency: params.currency,
        transaction_id: params.transactionId,
      });
      console.log('[Google Ads Conversion] subscription', {
        send_to: sendTo,
        value: params.value,
        currency: params.currency,
        transaction_id: params.transactionId,
      });
    } catch (e) {
      console.error('[Google Ads Error] Failed to send conversion:', e);
    }
  }
}

/**
 * Safely send an event to Facebook/Meta Pixel (fbq)
 */
function sendMetaEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
      console.log(`[Meta Pixel Event] ${eventName}`, params);
    } catch (e) {
      console.error('[Meta Pixel Error] Failed to send event:', e);
    }
  }
}

/**
 * Track user registration (Sign Up / CompleteRegistration)
 */
export function trackSignUp(method: 'email' | 'google') {
  // GA4: sign_up
  sendGaEvent('sign_up', {
    method: method,
  });

  // Meta Pixel: CompleteRegistration
  sendMetaEvent('CompleteRegistration', {
    content_name: 'Sign Up',
    status: 'success',
  });
}

/**
 * Track when a user initiates checkout
 */
export function trackInitiateCheckout(planId: string, priceId: string) {
  // GA4: begin_checkout
  sendGaEvent('begin_checkout', {
    value: 0, // dynamic or updated later if needed
    currency: 'EUR',
    items: [
      {
        item_id: planId,
        item_name: planId,
        price_id: priceId,
      },
    ],
  });

  // Meta Pixel: InitiateCheckout
  sendMetaEvent('InitiateCheckout', {
    content_ids: [planId],
    content_type: 'product',
  });
}

/**
 * Track successful purchase (Purchase)
 */
export function trackPurchase(params: {
  transactionId: string;
  value: number;
  currency: string;
  planId: string;
  priceId: string;
}) {
  // GA4: purchase
  sendGaEvent('purchase', {
    transaction_id: params.transactionId,
    value: params.value,
    currency: params.currency,
    items: [
      {
        item_id: params.planId,
        item_name: params.planId,
        price_id: params.priceId,
      },
    ],
  });

  // Meta Pixel: Purchase
  sendMetaEvent('Purchase', {
    value: params.value,
    currency: params.currency,
    content_ids: [params.planId],
    content_type: 'product',
  });

  const subscriptionLabel =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_SUBSCRIPTION_LABEL;
  const isCreditPurchase = params.planId.startsWith('credits_');
  if (subscriptionLabel && !isCreditPurchase) {
    sendGoogleAdsConversion({
      label: subscriptionLabel,
      transactionId: params.transactionId,
      value: params.value,
      currency: params.currency,
    });
  }
}
