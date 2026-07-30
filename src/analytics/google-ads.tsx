'use client';

import Script from 'next/script';

/**
 * Google Ads Conversion Tag
 *
 * Loads the Google Ads global site tag (AW-) alongside GA4.
 * This enables conversion tracking in Google Ads without needing
 * to install any additional code in Google Ads dashboard.
 *
 * https://support.google.com/google-ads/answer/6095821
 */
export default function GoogleAds() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!adsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${adsId}');
        `}
      </Script>
    </>
  );
}
