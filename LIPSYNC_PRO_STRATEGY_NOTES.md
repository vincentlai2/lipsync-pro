我看完了，没改任何文件。`git status` 是干净的。

这个项目当前更像一个“内容营销站 + 等待名单 API”，不是完整产品工具站：

- 技术栈：Next.js App Router + React 19 + Tailwind + shadcn/ui，入口在 [app/page.tsx](I:/xu/lipsync.pro/app/page.tsx)。
- 现有页面：主页、博客页、10 多个英文 SEO 文章页、contact/privacy/changelog/author 等。
- 暂无多语言路由：没有 `/fr`、`i18n`、locale middleware，也没有法语页。
- 暂无真正站内生成工具：首页有 `#generate` 视觉区，但 CTA 多处指向 `https://wav2lip.pro`，不是站内流程。
- 有 waitlist：`components/ui/WaitlistForm.tsx` 和 `app/api/waitlist/route.ts`，但首页没有把它作为首屏核心转化工具。
- Wav2Lip 技术词过重：`app/page.tsx` 和 [app/layout.tsx](I:/xu/lipsync.pro/app/layout.tsx) 里大量出现 “Wav2Lip alternative / Does LipSync.pro use Wav2Lip / difference between LipSync.pro and Wav2Lip”。这正好需要按你说的“不要照搬 Wav2Lip 技术词策略”来降权或移除。

我对你给的策略理解是：

1. `/lip-sync-ai` 应该新做成英文行业主词转化页，不只是文章页。
2. 首屏直接放工具入口：上传视频、音频/文本输入、语言/模式选择、生成按钮，而不是先讲一堆卖点。
3. SEO 内容放在工具下方：介绍、场景、FAQ、格式/质量建议、商业用途等，下方承接搜索流量。
4. 登录前保留状态：用户上传/输入后再触发登录，登录返回后尽量恢复文本、选项和上传文件状态；文件如果不能持久化，也至少保留文件名、参数和提示用户重新确认。
5. 法语页主词用 `synchronisation labiale IA`，但英文 `Lip Sync AI` 作为功能名保留，例如 “Lip Sync AI by LipSync.pro”。
6. 技术词策略要从 “Wav2Lip 替代品” 转成产品/任务词：AI lip sync、lip sync AI、AI lip sync video generator、video dubbing/localization 等。Wav2Lip 最多放在 FAQ 或比较页里轻触，不作为核心定位。

我建议下一步不要先大改首页，而是先做一个独立 `/lip-sync-ai` 转化页，复用现有 UI 组件和品牌视觉，同时抽一个可复用的 “LipSyncToolEntry” 客户端组件。这样后面首页、法语页、博客 CTA 都能接同一个工具入口，比较稳。
