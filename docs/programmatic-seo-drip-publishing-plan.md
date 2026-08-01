# Programmatic SEO & Drip Publishing System Architecture Plan

## Executive Summary
This document outlines the technical design for LipSync.pro's automated content engine, combining **Programmatic SEO (GEO/Keyword Matrix)**, **Competitor Skyscraper Scraping**, and **Daily Drip Publishing**.

---

## 1. System Architecture Diagram & Dual-Layer Strategy

### Dual-Layer Growth Architecture
- **Layer 1: Flagship Main Site (`LipSync.pro`)**: Focuses on **EEAT, Brand Trust, & High Conversion**. Competitor articles are ingested purely as a **Knowledge Corpus**. The AI synthesizes multi-source data, enriches it with 2026 benchmarks & custom UI diagrams (`VisemeAlignmentDiagram`), and publishes high-authority Skyscraper content on a daily drip schedule.
- **Layer 2: Micro-CMS Satellite Network (PBN / Link Juice Generator)**: Ultra-lightweight static satellite sites (deployed on Cloudflare Pages/Vercel). Automatically crawls competitor blogs, runs light AI translation/rewriting, and injects contextual anchor backlinks pointing directly to `LipSync.pro`.

```mermaid
flowchart TD
    subgraph Layer 1: Flagship Main Site - LipSync.pro
        A1[GEO & Keyword Matrix<br/>scripts/geo-matrix.json] --> B[Corpus Synthesis Engine<br/>scripts/generate-scheduled-articles.ts]
        A2[Competitor Corpus & Reference Data] --> B
        B -->|LLM Synthesis & Viseme Diagram Mapping| C[Content Store<br/>content/articles/*.json]
        C --> D[Dynamic Next.js Route<br/>src/app/[locale]/(marketing)/learn/[slug]/page.tsx]
        D -->|publishedAt <= Today| E[Public Site & sitemap.xml]
    end

    subgraph Layer 2: Micro-CMS Satellite Network
        C1[Competitor Crawled Blogs] --> C2[Lightweight Micro-CMS<br/>Node.js + Cloudflare Pages]
        C2 -->|Inject Backlink to LipSync.pro| E
    end
```

---

## 2. Core Components & Implementation Steps

### Phase 1: Drip Publishing Engine & Dynamic Routing
1. **Content Schema (`content/articles/[slug].json`)**:
   - `slug`: Unique URL path segment.
   - `publishedAt`: ISO date string (e.g. `"2026-08-03T00:00:00Z"`).
   - `title`, `description`, `category`, `pillarRoute`, `pillarTitle`.
   - `content`: Structured sections, Viseme diagrams, FAQ, and related links.
2. **Dynamic App Router Page**:
   - Path: `src/app/[locale]/(marketing)/learn/[slug]/page.tsx`
   - Validates `publishedAt <= new Date()`. If future date, returns `notFound()`.
3. **Automated Sitemap & Hub Filtering**:
   - `src/app/sitemap.ts`: Filters `content/articles` where `publishedAt <= now`.
   - `src/app/[locale]/(marketing)/learn/page.tsx`: Dynamically renders unlocked articles.

### Phase 2: Dual-Engine Generator CLI Script
1. **Engine A (Keyword & GEO Matrix Generator)**:
   - Inputs: Focus keywords + target regions/cities (e.g. Tokyo, London, Paris).
   - Generates unique, localized guides adhering to `TopicClusterPage` standards.
2. **Engine B (Competitor Scraper & Skyscraper Rewriter)**:
   - Inputs: Competitor blog URLs or Japanese/French technical articles.
   - Extracts body text, performs LLM Skyscraper enhancement (adds 2026 model benchmarks, LipSync.pro tool CTAs, and interactive UI components).
3. **Sequential Date Scheduler**:
   - Assigns incremental `publishedAt` dates (1 article per day starting from `tomorrow`).

---

## 3. Top Competitors for Content Benchmarking

| Competitor Domain | Target Category | SEO Strength & Strategy |
| :--- | :--- | :--- |
| **SyncLabs** (`synclabs.so`) | AI Lip Sync & Viseme Alignment | Deep technical comparisons (Wav2Lip vs Synclabs), latency benchmarks, API docs. |
| **ElevenLabs** (`elevenlabs.io`) | Voice Cloning & Video Localization | Master of Programmatic SEO; covers hundreds of micro-use-cases & languages. |
| **Rask AI** (`rask.ai`) | Multilingual Video Re-Dubbing | Ranks #1 for "AI video dubbing" and "lip sync software"; rich ROI calculators. |
| **HeyGen** (`heygen.com`) | Corporate Avatars & Translation | Enterprise case studies, video marketing guides, and spokespeople tutorials. |
| **Hedra** (`hedra.com`) | Generative Character Lip Sync | Creator tutorials, prompt engineering for lip animation, and social media guides. |
| **Akool** (`akool.com`) | Photo Avatar & Face Swap | High-ranking photo talking portrait guides and e-commerce marketing blogs. |

---

## 4. Milestone Checklist

- [ ] **Step 1**: Create `content/articles/` directory and article JSON loader utility (`src/lib/articles.ts`).
- [ ] **Step 2**: Implement dynamic route `src/app/[locale]/(marketing)/learn/[slug]/page.tsx`.
- [ ] **Step 3**: Update `src/app/sitemap.ts` and `learn/page.tsx` with `publishedAt` date filter.
- [ ] **Step 4**: Build `scripts/generate-scheduled-articles.ts` supporting GEO matrix & Competitor URL ingestion.
