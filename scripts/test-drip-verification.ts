import { getAllArticles } from '../src/lib/articles';

const published = getAllArticles(false);
const all = getAllArticles(true);

console.log('----------------------------------------------------');
console.log('⏰ Current Local System Time:', new Date().toISOString());
console.log('🔒 Total Stored Articles in Repo:', all.length);
console.log('✅ Currently Visible / Published Articles:', published.length);
console.log('🚫 Currently LOCKED Future Articles:', all.length - published.length);
console.log('----------------------------------------------------');
console.log('Sample Currently Unlocked Articles:');
published.slice(0, 3).forEach((a) => console.log(` - [RELEASED] ${a.slug} (${a.publishedAt})`));
console.log('Sample Future LOCKED Articles (Hidden from Site & Sitemap):');
all.filter((a) => new Date(a.publishedAt) > new Date()).slice(0, 3).forEach((a) => console.log(` - [LOCKED] ${a.slug} (${a.publishedAt})`));
console.log('----------------------------------------------------');
