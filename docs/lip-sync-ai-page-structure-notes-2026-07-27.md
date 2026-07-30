# /lip-sync-ai 页面结构判断记录

可以，这个方案我觉得更顺。

`/lip-sync-ai` 这个 slug 可以用。虽然法语主词是 `synchronisation labiale ia`，但 URL 用英文行业词也没问题，尤其 `lip sync ai` 本身搜索量和国际识别度更强。页面 SEO 可以这样定：

- URL：`/lip-sync-ai`
- H1：`Synchronisation labiale IA en ligne`
- Title：`Synchronisation labiale IA en ligne | Lip Sync AI`
- Meta description：围绕 `synchronisation labiale IA`、`lip sync AI`、`doublage vidéo IA` 写
- 页面正文自然出现：`lip sync AI`、`AI lip sync`、`synchronisation labiale vidéo`

关于 `/studio`：

代码里其实已经有 `/studio` 和 `/studio/creations` 这种路由，属于登录后的后台/工作台。但如果你的目标是 **用户登录前后都停留在 `/lip-sync-ai`**，那就不应该把用户强制送去 `/studio`。

我更建议这样：

`/lip-sync-ai` = 主工具页，也是公开转化页，也是登录后继续生成的页面。

用户未登录时：

- 看到上传/生成面板
- 上传文件状态保留在页面
- 点击生成时弹登录 modal
- 登录成功后仍回到 `/lip-sync-ai`
- 文件和输入状态尽量保留

用户已登录时：

- 还是 `/lip-sync-ai`
- 直接显示 credits、生成按钮、任务状态
- 可以在页面里有一个轻入口：`Mes vidéos` → `/studio/creations`

这样比跳 `/studio` 更适合 Ads 和 SEO，因为：

1. 用户从关键词进来后不会被切到一个后台感很强的路径。
2. `/lip-sync-ai` 的停留、互动、注册、生成都集中在一个 URL。
3. Google Ads 转化路径更干净。
4. 用户认知也更简单：这个页面就是工具，不是文章页。

那 `/studio` 怎么办？

我建议保留，但弱化成后台辅助页：

- `/lip-sync-ai`：主生成入口
- `/studio/creations`：历史作品
- `/settings/credits`：credits
- `/settings/billing`：付款
- `/dashboard` 或 `/studio`：可以以后再决定是否保留在导航里

也就是说，公开主产品不是 `/studio`，而是 `/lip-sync-ai`。

`/wav2lip-en-ligne` 的 CTA 可以改成：

- 主按钮：`Créer une vidéo lip-sync` → `/lip-sync-ai`
- 次按钮：`Lire les guides Wav2Lip` → `/blog`

而 `/lip-sync-ai` 页面内部可以在一小段里承接 Wav2Lip：

> Vous cherchez Wav2Lip en ligne ? Vous pouvez créer une vidéo lip-sync ici directement dans le navigateur, sans Colab, Python ni installation locale.

这个结构我觉得是最稳的：  
**/lip-sync-ai 承担产品转化，/wav2lip-en-ligne 承担 Wav2Lip SEO，登录前后都不打断用户路径。**

## 反向链接修正

`/lip-sync-ai` 不主动反链到 `/wav2lip-en-ligne`。

原因：

- 搜 `lip sync ai` / `synchronisation labiale ia` 进来的用户，核心需求是生成视频，不是了解 Wav2Lip 技术。
- 在主工具页主动提 Wav2Lip 会分散转化注意力，增加理解成本。
- `/lip-sync-ai` 应该保持主词干净：`synchronisation labiale IA`、`lip sync AI`、`doublage video IA`。

最终结构：

- `/wav2lip-en-ligne` 可以导向 `/lip-sync-ai`。
- `/lip-sync-ai` 不主动把用户带回 `/wav2lip-en-ligne`。
- `/lip-sync-ai` 只讲用户任务：上传视频、添加音频、生成同步嘴型视频。
