import fs from 'node:fs';
import path from 'node:path';
import { getAllArticles } from '../src/lib/articles';

async function sendEmailNotification(
  htmlReport: string,
  publishedTitle: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;

  if (!apiKey || !toEmail) {
    console.log(
      'ℹ️ Resend Email notification skipped (RESEND_API_KEY or NOTIFICATION_EMAIL env not set).'
    );
    return;
  }

  console.log(`📧 Sending daily SEO Drip status email to ${toEmail}...`);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LipSync.pro SEO Engine <noreply@lipsync.pro>',
        to: [toEmail],
        subject: `[LipSync.pro SEO Drip Report] Today's New Article Released: ${publishedTitle}`,
        html: htmlReport,
      }),
    });

    if (res.ok) {
      console.log(
        '✅ Daily SEO Drip status email sent successfully via Resend!'
      );
    } else {
      const errText = await res.text();
      console.log(
        `⚠️ Resend API responded with status ${res.status}: ${errText}`
      );
    }
  } catch (error) {
    console.error('❌ Failed to send status email:', error);
  }
}

async function generateSeoStatusReport() {
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
        new Date(a.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 7);

  const latestArticle = published[0];

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

### 🔮 Next 7 Days Scheduled Release Plan

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

  // HTML Email version for daily notification
  const htmlReport = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 680px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
      <h2 style="color: #0f172a; margin-top: 0;">🚀 LipSync.pro Daily SEO Drip Report</h2>
      <p style="color: #475569; font-size: 14px;">Here is your automated daily content publishing status and indexing report.</p>
      
      <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0; border: 1px solid #cbd5e1;">
        <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 15px;">📊 Progress Summary</h3>
        <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>Total 365-Day Articles:</strong> ${total}</p>
        <p style="margin: 4px 0; font-size: 14px; color: #16a34a;"><strong>Currently Published (Live):</strong> ${publishedCount}</p>
        <p style="margin: 4px 0; font-size: 14px; color: #2563eb;"><strong>Completion Rate:</strong> ${percentage}%</p>
      </div>

      <h3 style="color: #0f172a; font-size: 16px; margin-top: 24px;">✅ Today's Newly Unlocked Article</h3>
      ${
        latestArticle
          ? `<p style="font-size: 15px; margin: 8px 0;"><a href="https://lipsync.pro/learn/${latestArticle.slug}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${latestArticle.title}</a></p>
             <p style="font-size: 13px; color: #64748b; margin: 0;">URL: https://lipsync.pro/learn/${latestArticle.slug}</p>`
          : '<p style="color: #64748b;">No new articles unlocked today.</p>'
      }

      <h3 style="color: #0f172a; font-size: 16px; margin-top: 24px;">🔮 Next 3 Days Scheduled Releases</h3>
      <ul style="padding-left: 20px; color: #334155; font-size: 14px;">
        ${futureArticles
          .slice(0, 3)
          .map(
            (a) =>
              `<li style="margin-bottom: 8px;"><strong>${a.publishedAt.slice(0, 10)}</strong>: ${a.title}</li>`
          )
          .join('')}
      </ul>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center;">LipSync.pro Automated Programmatic SEO Engine</p>
    </div>
  `;

  await sendEmailNotification(
    htmlReport,
    latestArticle?.title || 'Daily Digest'
  );
}

generateSeoStatusReport();
