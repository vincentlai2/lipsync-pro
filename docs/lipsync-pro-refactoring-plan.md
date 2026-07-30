# LipSync.pro 高级 UI/UX 全面重构计划书 (Phase 2 & SEO Standards)

> **重构目标**：全面提升 LipSync.pro 的产品质感、交互体验与转化效率，从工具区、Demo 体验、全站 navigation、Pricing 页、Studio 历史作品集到 SEO 营销落地页进行全方位升级。

---

## 阶段一：基础整改与净化（已完成）

- [x] **纯英文定位与路由规范**：移除了 `/fr` 多语言配置，将 `/animer-photo-ia` 重定向至 `/photo-to-lip-sync`。
- [x] **彻底清除非商业 Meta 文案**：清除了首页与 `/lip-sync-ai` 中所有由 Codex 生成的开发者提示与技术自述。
- [x] **代码质量保证**：Biome 代码校验 0 报错，TypeScript 类型检查 0 报错。

---

## 阶段二：顶级 UI/UX 体验大修（已完成）

### 1. 核心工具区 (`Wav2LipUploader`) 交互与视效重构
- [x] **多音色 Selector 增强**：
  - 增加美化后的音色下拉选择与 Neural Voice 试听预览。
- [x] **输入媒体诊断与感知提示**：
  - 用户拖入视频/图片后，显示智能模式感知（Expressive Photo / High Precision Video）。
- [x] **成果面板 (Result Showcase Card)**：
  - 增加无缝高清 1080p 下载按钮、一键复制链接、以及快速重新生成功能。

### 2. 1-Click Sample Demo 快速套用体验
- [x] 在工具区添加高颜值的 **Sample Presenter Video** & **Sample Talking Photo** 预设选项卡，让无素材访客 1 秒一键载入体验。

### 3. 全站组件与路由美化
- [x] **Header & Navbar 优化**：
  - 采用现代 Glassmorphism 玻璃拟态效果。
  - 为已登录用户增加亮色 **Live Credit Balance Badge** 与快速充值按钮。
- [x] **Pricing 价格卡片页 (`/pricing`) 升华**：
  - 引入 Month / Annual 计费切换 Toggle（标记 Save 20%）。
  - 严格对齐 wav2lipia.com 纯美元计费体系（Basic $9.90 / Pro $19.90 / Ultra $36.90）。
  - 加强 "Pro / Most Popular" 方案卡片的渐变高亮与圆角边框。
- [x] **Studio 历史作品 (`/studio/creations`) 极简大修**：
  - 升级为交互式 `CreationsGrid` 视频网格展示，支持 1080p HD 标签、复制链接与一键下载。

---

## 阶段四：SEO 落地页规范与差异化（已完成）

### 1. Hero 卖点与副标题规范
- [x] **副标题控制在 2 行以内**：所有落地页 Hero H1 下方副标题统一控制在 `max-w-xl` 精确 2 行以内，去除冗余描述。
- [x] **统一绿勾 CheckCircle2Icon**：移除警示性退款承诺，统一使用 `<CheckCircle2Icon className="size-3.5 text-emerald-600">` 作为积极正向权益标示。
- [x] **页面差异化卖点矩阵**：
  - `Homepage`：`Video, Photo & Script Studio` • `40+ Language Voiceover Localizer` • `1080p Full HD Export`
  - `/lip-sync-ai`：`Frame-Accurate Video Re-Dubbing` • `Preserves Original Lighting & Skin` • `40+ Language Alignment`
  - `/text-to-lip-sync`：`Script-to-Presenter Video Generator` • `40+ Neural AI Voice Personas` • `Instant Script Preview`
  - `/photo-to-lip-sync`：`Animate Any 1 Still Portrait Photo` • `Sub-Pixel Eye Blinks & Expressions` • `Works with Avatars & AI Art`

### 2. 独立视觉 Demo 素材生成
- [x] 为每个落地页单独使用 AI 图像生成工具创建专属高质感 UI 预览图：
  - `/text-to-lip-sync`: `public/text_to_lipsync_demo_ui.png`
  - `/photo-to-lip-sync`: `public/photo_to_lipsync_demo_ui.png`
  - `/lip-sync-ai`: `public/multilingual_dubbing_demo_ui.png`

### 3. SEO 5 维结构与 Schema.org 支持
- [x] **5 维架构**：完整融入 What/Problem、How-to、Selling Points、Use Cases、Advantages 模块。
- [x] **Google FAQ Schema**：在 `MarketingFaq` 组件中自动嵌入 `<script type="application/ld+json">` 格式的 FAQPage 结构化数据。

---

## 阶段三：品质与构建验证（已完成）

- [x] **Biome 规范**：全站代码符合 2 空格、单引号与尾随分号规范，0 错误 (379 个文件全过)。
- [x] **TypeScript 校验**：`npx tsc --noEmit` 0 错误 (Exit code 0)。
- [x] **Next.js 生产构建**：`pnpm build` 全量 80 个路由编译打散成功，0 报错。
