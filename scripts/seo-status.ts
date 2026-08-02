import fs from 'node:fs';
import path from 'node:path';
import { getAllArticles } from '../src/lib/articles';

function generateSeoStatusReport() {
  const published = getAllArticles(false);
  const all = getAllArticles(true);
  const total = all.length;
  const publishedCount = published.length;
  const lockedCount = total - publishedCount;
  const percentage =
    total > 0 ? ((publishedCount / total) * 100).toFixed(2) : '0';

  // Build ascii progress bar
  const totalBlocks = 20;
  const filledBlocks = Math.round((publishedCount / total) * totalBlocks);
  const progressBar =
    '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  // Future upcoming articles (Next 7 days)
  const now = new Date();
  const futureArticles = all
    .filter((a) => new Date(a.publishedAt) > now)
    .sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    )
    .slice(0, 10);

  const publishedTable = published
    .map(
      (a) =>
        `| **${a.publishedAt.slice(0, 10)}** | **[${a.title}](https://lipsync.pro/learn/${a.slug})** | \`https://lipsync.pro/learn/${a.slug}\` |`
    )
    .join('\n');

  const futureTable = futureArticles
    .map(
      (a) =>
        `| 📅 **${a.publishedAt.slice(0, 10)}** | *${a.title}* | \`${a.category}\` |`
    )
    .join('\n');

  const reportMarkdown = `
# 🚀 LipSync.pro Programmatic SEO Drip Publishing Status & Links

### 📊 Publishing Cadence & Progress Overview
- **Total Pipeline Articles**: \`${total}\`
- **Currently Unlocked & Live**: \`${publishedCount}\`
- **Time-Locked Future Queue**: \`${lockedCount}\`
- **Overall Completion Rate**: \`${percentage}%\`
- **Progress Bar**: \`[${progressBar}]\`

---

### ✅ Currently Live & Published URLs (Click to Visit)

| Release Date | Article Title | Live Web Address (URL) |
| :--- | :--- | :--- |
${publishedTable}

---

### 🔮 Next 10 Days Scheduled Release Plan

| Target Release Date | Planned Article Title | SEO Category |
| :--- | :--- | :--- |
${futureTable}

---
*Report generated automatically on ${new Date().toISOString()}*
`;

  console.log(reportMarkdown);

  // Write to GITHUB_STEP_SUMMARY if running inside GitHub Actions
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, reportMarkdown);
  }
}

generateSeoStatusReport();
