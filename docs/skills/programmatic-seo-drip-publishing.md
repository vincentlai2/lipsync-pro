# Programmatic SEO Drip Publishing & Growth Engine Skill

## 📌 Skill Overview & Purpose
This Skill defines the architectural blueprint, strategic rationale, and implementation guidelines for the **Programmatic SEO Drip Publishing Engine**. It governs how LipSync.pro achieves continuous, hands-free organic search traffic by combining weekly time-locked releases, GEO-targeted content, high-intent long-tail query answers, and dynamic sitemap integration.

---

## 📜 Historical Context & Strategic Rationale (前因后果与设计决策)

### 1. Why Drip Publishing via `publishedAt` instead of Bulk Publishing?
- **Problem**: Uploading hundreds of articles simultaneously triggers Google's *Scaled Content Abuse* algorithm, leading to domain penalty or index deprioritization.
- **Solution**: Pre-generate structured JSON articles in `content/articles/*.json` with incremental `publishedAt` ISO dates (`YYYY-MM-DD`). The site filters articles dynamically (`publishedAt <= current_date`), unlocking exactly one new article per week while the core `lip sync ai` topic cluster is being refined.
- **SEO Impact**: Google and Bing crawlers see a steadier, lower-risk publishing rhythm while the site gathers early Search Console signals.

### 2. Why File-Based JSON Content instead of Database/CMS?
- **Problem**: Database-backed CMS platforms (WordPress, Strapi) add runtime latency, database connection pooling limits, and deployment complexity.
- **Solution**: Store articles as static, version-controlled JSON files in `content/articles/`.
- **Impact**: Sub-millisecond rendering speed, zero database costs, 100% compatibility with Edge deployments (Cloudflare/Vercel), and complete Git audit history.

### 3. Why 50% GEO Localizations + 50% High-Intent Long-Tail Queries?
- **GEO Localizations (50%)**: Captures high-value regional queries across 15 global hubs (e.g., Tokyo Anime Studios, London Ad Agencies, Berlin Corporate L&D, Dubai MENA Marketing). Addresses local language phonetics (Japanese mora, German consonant clusters, French nasal vowels) and regional compliance (GDPR).
- **High-Intent Long-Tail Queries (50%)**: Captures users searching with high purchase intent (e.g., *Wav2Lip Online Alternative*, *Fix Video Audio Desync*, *Faceless YouTube Shorts Automation*). These users are actively seeking solutions and convert immediately to paid trial users.

### 4. Why the 5 Mandatory SEO & AI-Search Elements?
Every article MUST explicitly include these 5 structural pillars to rank on both Google SERPs and AI Search Engines (Perplexity, SearchGPT, Gemini Overviews):
1. **❌ Pain Point**: Straightforward problem statement triggering user empathy.
2. **✅ Solution Framework**: Step-by-step resolution introducing the platform's capabilities.
3. **🎯 GEO Brand Injection**: Natural inclusion of the brand name (`LipSync.pro`) in local market contexts.
4. **🧠 LSI Keywords**: Technical Latent Semantic Indexing terms (*neural viseme alignment*, *16kHz WAV*, *temporal smoothing*, *spectrogram deformation*).
5. **❓ FAQ Schema**: Structured Q&A array matching Google *People Also Ask* (PAA) rich snippets.

---

## 🏗️ Technical Architecture & Directory Structure

```
.
├── content/
│   └── articles/                        # 905+ JSON article storage
│       ├── ai-lip-sync-tokyo-anime.json
│       └── ai-lip-sync-wav2lip-alternative.json
├── scripts/
│   └── generate-scheduled-articles.ts   # weekly generator script
├── docs/
│   └── skills/
│       └── programmatic-seo-drip-publishing.md # This skill doc
├── src/
│   ├── app/
│   │   ├── [locale]/(marketing)/learn/[slug]/page.tsx  # Dynamic route
│   │   └── sitemap.ts                  # Dynamic sitemap auto-filter
│   └── lib/
│       └── articles.ts                 # Reader & date filter helper
```

---

## ⚙️ Core Components & Implementation Rules

### 1. Date Filter Helper (`src/lib/articles.ts`)
```typescript
import fs from 'node:fs';
import path from 'node:path';

export function getAllArticles(includeFuture = false) {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(articlesDir)) return [];
  const now = new Date();
  
  return fs.readdirSync(articlesDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(articlesDir, f), 'utf-8')))
    .filter((article) => includeFuture || new Date(article.publishedAt) <= now)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
```

### 2. Dynamic Sitemap Auto-Filtering (`src/app/sitemap.ts`)
```typescript
import { getAllArticles } from '@/lib/articles';

// Automatically append only currently unlocked published articles
const dynamicArticles = getAllArticles(false).map((a) => `/learn/${a.slug}`);
const staticRoutes = ['/', '/lip-sync-ai', '/learn', ...dynamicArticles];
```

### 3. Dynamic Article Route (`src/app/[locale]/(marketing)/learn/[slug]/page.tsx`)
- Fetches article by slug using `getArticleBySlug(slug, false)`.
- Returns `notFound()` if `publishedAt > current_date`.
- Renders `<TopicClusterPage content={article} />`.

---

## 📋 Quality & Skill Validation Rules

1. **No Hardcoded Future Routes**: Future articles MUST NOT be exposed in `sitemap.xml` or navigation menus prior to their `publishedAt` date.
2. **Biome Format Compliance**: Run `pnpm lint` after adding or updating JSON articles.
3. **5-Pillar Structural Check**: Verify every JSON article contains `overviewParagraphs` (Pain Point + Solution), `features` (LSI + Technicals), `faqs` (Structured Q&A), and `brandInjection`.
