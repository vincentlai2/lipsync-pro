# 仓库指南 (Repository Guidelines)

## 项目结构与模块组织
路由与服务端 Actions 存放在 `src/app` 目录下（本地化页面存放在 `[locale]` 目录）。可复用的 UI 存放在 `src/components`——如 `ui/`、`magicui/`、`tailark/` 等基础库，以及各业务领域文件夹。共享逻辑与 AI 工作流归入 `src/lib` and `src/ai`，而 Drizzle Schema 与数据库迁移文件保留在 `src/db`。交易型电子邮件存放在 `src/mail`，分析服务提供商存放在 `src/analytics`，静态资源存放在 `public/`，日常运维脚本存放在 `scripts/`，营销和文档内容存放在 `content/`。

## 构建、测试与开发命令
使用 `pnpm install` 安装依赖，使用 `pnpm dev` 启动本地 Next.js 开发服务器。使用 `pnpm build` 进行生产环境优化打包，使用 `pnpm start` 启动本地生产环境服务。运行 `pnpm lint` 触发 Biome 静态检查，使用 `pnpm format` 应用统一代码格式化。数据库开发采用 Drizzle 工作流：`pnpm db:generate` 从 Schema 生成 SQL 迁移文件，`pnpm db:migrate` 应用本地变更，`pnpm db:push` 直接同步到远程数据库。辅助工具包含用于邮件预览的 `pnpm email` 以及各种实用脚本，例如 `pnpm list-users` 或 `pnpm fix-payments`。

## 编码规范与命名约定
Biome (`biome.json`) 强制执行 2 空格缩进、单引号、ES5 尾随逗号和必须以分号结尾。模块文件名应使用短横线命名法（kebab-case，如 `dashboard-sidebar.tsx`），Hooks 文件名应使用 `use-` 前缀（如 `use-session.ts`），工具模块默认采用命名导出（named exports）。Tailwind 样式变量存放在 `src/styles` 中；请在其中扩展设计 Token，切勿在页面中散布硬编码的魔法值。服务端专属代码必须标记 `"use server"`，且避免在此类模块中引入客户端 Hooks。

## 测试指南
由于自动测试未集成到 package 脚本中，请使用 `pnpm dev` 本地调试、Biome 代码检查，并在权限、计费和 AI 生成流程等核心链条上进行专注的手动 QA 测试。如果添加测试运行器，请将测试规格文件（spec/test）与对应功能文件放置在同一目录下，以 `.test.ts(x)` 或 `.spec.ts(x)` 结尾，并在 PR 中说明运行命令。如果对数据结构进行了修改，请更新 `src/db/migrations` 内的夹具（fixtures），以便评审人员进行测试。

## 提交与拉取请求（PR）指南
遵循 Commit 提交日志中的约定式提交规范（Conventional Commits，如 `feat:`、`fix:`、`chore:`）。提交范围需聚焦且精准，在 Commit Body 中关联 Issue ID，每当环境变量发生变更时必须同步更新 `env.example`。PR 中应包含简短的改动摘要、测试说明（包含命令与测试结果）、UI 更新截图以及任何文档或配置的改动提醒。通过检查后请尽快发起评审，并提早标明破坏性变更。

## 配置与密钥安全
运行任何命令前，请将 `env.example` 复制為 `.env`。生产环境的凭证及密钥应配置在部署平台（如 Vercel 或 Cloudflare）上，切勿提交私密数据。使用 `opennextjs-cloudflare` 或 `wrangler` 部署时请配置对应的 API Key。AI 服务商的密钥可在 `src/ai` 内进行轮换，合并分支前请删除所有的临时调试日志。

## 浅色与深色主题兼容性
页面与组件必须同时完美支持浅色与深色模式。避免在布局元素上硬编码绝对的白色文字（`text-white`）或绝对的黑色背景（`bg-black`）。请使用响应式 Tailwind 样式类：
- 背景：使用半透明变体如 `bg-zinc-50/60 dark:bg-black/40` 或标准的主题 Token `bg-background`。
- 边框：使用响应式边框类如 `border-black/5 dark:border-white/10` 或 `border-border`。
- 文本颜色：将绝对白色 `text-white` 替换为 `text-zinc-950 dark:text-white` 以确保浅色模式下的可读性。

## 转化率与 SEO 最佳实践
- 竞品脱敏：在对比表格或宣传文案中，切勿提及竞品域名或品牌链接（统一使用“其他在线工具”或“Google Colab”等泛称）。
- 用户上传状态：在登录状态校验时，必须将用户已上传的媒体保存在客户端 React 状态中，避免刷新整个页面。登录校验应使用模态框叠加层（`LoginWrapper` 中的 `mode="modal"`）流式引导，使用户在登录完成后仍保留在原有操作界面。
- 媒体无障碍：对于故意省略字幕的 `<video>`/`<audio>` 元素，请使用正确的 Biome 忽略注释（`/* biome-ignore lint/a11y/useMediaCaption: reason */`）。
