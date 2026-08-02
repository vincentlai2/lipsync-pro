import { getAllArticles } from '../src/lib/articles';

/**
 * IndexNow Auto-Push Script for Bing, Yandex, Seznam, and DuckDuckGo.
 *
 * Usage: npx tsx scripts/push-indexnow.ts
 *
 * IndexNow Documentation: https://www.indexnow.org/
 */
async function pushIndexNow() {
  const HOST = 'lipsync.pro';
  const KEY = 'c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3'; // IndexNow API Key
  const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

  // Get all currently unlocked published articles
  const publishedArticles = getAllArticles(false);

  if (publishedArticles.length === 0) {
    console.log('ℹ️ No published articles available to push to IndexNow.');
    return;
  }

  // Build full URLs array for IndexNow
  const urlList = publishedArticles.map(
    (article) => `https://${HOST}/learn/${article.slug}`
  );

  // Add hub pages
  urlList.push(`https://${HOST}/learn`);
  urlList.push(`https://${HOST}/lip-sync-ai`);
  urlList.push(`https://${HOST}/photo-to-lip-sync`);
  urlList.push(`https://${HOST}/text-to-lip-sync`);

  console.log(
    `🚀 Submitting ${urlList.length} URLs to IndexNow (api.indexnow.org)...`
  );

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(
        '✅ IndexNow Submission Successful! Bing & partners notified.'
      );
    } else {
      console.log(`⚠️ IndexNow returned status code: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Failed to push to IndexNow:', error);
  }
}

pushIndexNow();
