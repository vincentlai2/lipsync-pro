# Multi-Tenant Multi-Domain Single-Deployment Architecture Specification
## 多租户多域名单体 SaaS 矩阵架构重大迭代规划

---

## 1. 架构目标与核心理念 (Core Goals)

为支持未来在 AI 口型同步、数字人 (Talking Avatar)、照片说话与多语种领域的无限扩展，LipSync.pro 采用 **单体多租户多域名架构 (Single-Deployment Multi-Tenant Architecture)**。

### 核心优势
1. **零重复运维**: 在 Cloudflare Pages / Vercel 上仅做 **1 次代码部署**，所有域名绑在同一个工程上。
2. **共享基础设施**: 共享一套 Postgres 数据库、Stripe 收银台、R2 存储桶与 AI 渲染后台。
3. **独立品牌与 SEO**: 根据请求域名 (`Host` 头) 动态渲染各自领域的独立品牌 Logo、H1 标题、落地页与 FAQ，彻底规避 Google Duplicate Content 问题。
4. **统一管理大盘**: 管理员在统一 Admin 后台可一键监控所有域名的收益、任务量与用户客服。

---

## 2. 域名与租户映射表 (Tenant Mapping Schema)

| 域名 (Domain Host) | 租户标识 (siteId) | 核心定位 (Niche Focus) | 默认语种 | 首屏路由 |
| :--- | :--- | :--- | :--- | :--- |
| `lipsync.pro` | `lipsync.pro` | AI Lip Sync Video Generator / 英文口型同步主站 | `en` | `/lip-sync-ai` |
| `wav2lipia.com` | `wav2lipia.com` | Synchronisation Labiale IA / 法语区与 Wav2Lip 主站 | `fr` | `/animer-photo-ia` |
| `[自定义新域名]` | `[domain-slug]` | 特定垂直场景 (如 Talking Avatar / Japan Dubbing) | 动态识别 | 动态关联 |

---

## 3. 技术实现细节 (Technical Implementation)

### 3.1 Tenant 识别与 Middleware 扩展 (`src/lib/tenant.ts` & `src/middleware.ts`)
* 在中间件中读取 `request.headers.get('host')`。
* 匹配当前租户配置 (`TenantConfig`)，包括：
  * `siteId`: 租户唯一标识
  * `brandName`: 品牌展示名称 (`LipSync.pro` vs `Wav2LipIA`)
  * `logoUrl`: 租户专属 Logo 路径
  * `defaultPath`: 该域名的首屏推荐路由
* 将租户标识写入 Request Header (`x-tenant-site-id`)，供 Server Actions / API Routes 和 SSR 页面无缝调用。

### 3.2 数据库 Task 表标记 (`site_id`)
* 在 `src/db/schema.ts` 中的 `tasks` 表增加 `siteId` 字段。
* 用户创建 AI 渲染任务时自动记录当前的 `siteId`。
* 用户在 `/studio/creations` 查看历史记录时，可依当前域名过滤显示或全量显示。

### 3.3 管理员多域名大盘 (Multi-Domain Admin Dashboard)
* 管理后台增加 `siteId` 统计维度，支持汇总看全网数据或按域名筛选转化数据。

---

## 4. 实施阶段 (Implementation Phases)

- [x] **Phase 1**: 设计与架构文档落盘 (`docs/multi-tenant-architecture-plan.md`)
- [ ] **Phase 2**: 创建 `src/lib/tenant.ts` 租户配置与识别模块
- [ ] **Phase 3**: 更新 Middleware 注入租户 Context Headers
- [ ] **Phase 4**: 给 Drizzle Schema 及 Task 创建 API 补全 `siteId` 属性
- [ ] **Phase 5**: 全量构建、Linter 校验与构建验证 (`pnpm lint` & `pnpm build`)
