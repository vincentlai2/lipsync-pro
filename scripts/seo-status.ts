import fs from 'node:fs';
import { getAllArticles } from '../src/lib/articles';

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function sendSeoStatusEmail({
  html,
  subject,
}: {
  html: string;
  subject: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const reportEmail = process.env.SEO_REPORT_EMAIL;

  if (!apiKey || !reportEmail) {
    console.log(
      'SEO report email skipped: RESEND_API_KEY or SEO_REPORT_EMAIL is not configured.'
    );
    return;
  }

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);
  const recipients = reportEmail
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    console.log('SEO report email skipped: SEO_REPORT_EMAIL has no recipients.');
    return;
  }

  const { error } = await resend.emails.send({
    from: process.env.SEO_REPORT_FROM || 'LipSync.pro <hi@lipsync.pro>',
    to: recipients,
    subject,
    html,
  });

  if (error) {
    throw new Error(`SEO report email failed: ${JSON.stringify(error)}`);
  }

  console.log(`SEO report email sent to ${recipients.length} recipient(s).`);
}

async function generateSeoStatusReport() {
  const published = getAllArticles(false);
  const all = getAllArticles(true);
  const total = all.length;
  const publishedCount = published.length;
  const lockedCount = total - publishedCount;
  const percentage =
    total > 0 ? ((publishedCount / total) * 100).toFixed(2) : '0';

  const totalBlocks = 20;
  const filledBlocks =
    total > 0 ? Math.round((publishedCount / total) * totalBlocks) : 0;
  const progressBar =
    '#'.repeat(filledBlocks) + '-'.repeat(totalBlocks - filledBlocks);

  const now = new Date();
  const today = getTodayIsoDate();
  const futureArticles = all
    .filter((article) => new Date(article.publishedAt) > now)
    .sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    )
    .slice(0, 7);

  const todayArticles = published.filter(
    (article) => article.publishedAt.slice(0, 10) === today
  );
  const latestArticle = todayArticles[0] || published[0];

  const publishedTable = published
    .map(
      (article) =>
        `| **${article.publishedAt.slice(0, 10)}** | **[${article.title}](https://lipsync.pro/learn/${article.slug})** | \`https://lipsync.pro/learn/${article.slug}\` |`
    )
    .join('\n');

  const futureTable = futureArticles
    .map(
      (article) =>
        `| **${article.publishedAt.slice(0, 10)}** | *${article.title}* | \`${article.category}\` |`
    )
    .join('\n');

  const reportMarkdown = `
# LipSync.pro Programmatic SEO Drip Publishing Status & Links

### Publishing Cadence & Progress Overview
- **Total Pipeline Articles**: \`${total}\`
- **Currently Unlocked & Live**: \`${publishedCount}\`
- **Time-Locked Future Queue**: \`${lockedCount}\`
- **Overall Completion Rate**: \`${percentage}%\`
- **Progress Bar**: \`[${progressBar}]\`

---

### Currently Live & Published URLs

| Release Date | Article Title | Live Web Address |
| :--- | :--- | :--- |
${publishedTable}

---

### Next 7 Scheduled Releases

| Target Release Date | Planned Article Title | SEO Category |
| :--- | :--- | :--- |
${futureTable}

---
*Report generated automatically on ${new Date().toISOString()}*
`;

  console.log(reportMarkdown);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, reportMarkdown);
  }

  const latestArticleHtml = latestArticle
    ? `<p style="font-size: 15px; margin: 8px 0;"><a href="https://lipsync.pro/learn/${latestArticle.slug}" style="color: #2563eb; text-decoration: none; font-weight: 700;">${escapeHtml(latestArticle.title)}</a></p>
       <p style="font-size: 13px; color: #64748b; margin: 0;">URL: <a href="https://lipsync.pro/learn/${latestArticle.slug}">https://lipsync.pro/learn/${latestArticle.slug}</a></p>`
    : '<p style="color: #64748b;">No articles are currently published.</p>';

  const nextArticlesHtml = futureArticles
    .slice(0, 3)
    .map(
      (article) =>
        `<li style="margin-bottom: 8px;"><strong>${article.publishedAt.slice(0, 10)}</strong>: ${escapeHtml(article.title)}</li>`
    )
    .join('');

  const htmlReport = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 680px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
      <h2 style="color: #0f172a; margin-top: 0;">LipSync.pro Weekly SEO Drip Report</h2>
      <p style="color: #475569; font-size: 14px;">Here is the automated weekly content publishing and indexing report for <strong>LipSync.pro</strong>.</p>

      <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0; border: 1px solid #cbd5e1;">
        <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 15px;">Progress Summary</h3>
        <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>Total Articles:</strong> ${total}</p>
        <p style="margin: 4px 0; font-size: 14px; color: #16a34a;"><strong>Currently Published:</strong> ${publishedCount}</p>
        <p style="margin: 4px 0; font-size: 14px; color: #2563eb;"><strong>Completion Rate:</strong> ${percentage}%</p>
      </div>

      <h3 style="color: #0f172a; font-size: 16px; margin-top: 24px;">Latest Published Article</h3>
      ${latestArticleHtml}

      <h3 style="color: #0f172a; font-size: 16px; margin-top: 24px;">Next 3 Scheduled Releases</h3>
      <ul style="padding-left: 20px; color: #334155; font-size: 14px;">
        ${nextArticlesHtml || '<li>No upcoming articles found.</li>'}
      </ul>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center;">LipSync.pro Automated Programmatic SEO Engine</p>
    </div>
  `;

  fs.writeFileSync('seo-status-report.html', htmlReport, 'utf-8');

  await sendSeoStatusEmail({
    subject: `LipSync.pro weekly SEO report - ${today}`,
    html: htmlReport,
  });
}

generateSeoStatusReport().catch((error) => {
  console.error(error);
  process.exit(1);
});
