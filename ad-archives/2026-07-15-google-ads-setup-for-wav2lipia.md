# 推广与投放归档：wav2lipia.com 广告开户与 Google Ads 法语区投放策略

**归档时间：** 2026-07-15  
**案例类型：** 广告账户开通 & 独立站冷启动投放方案  
**推广项目：** wav2lipia.com (AI 嘴型同步在线工具 - 法语区)  
**广告账户信息：**
* **平台：** SinoClick (Google 广告代理)
* **广告账号名：** `wav2lipia-com-1`
* **Google Ads 账号 ID：** `353-197-4325`

---

## Google Ads 投放配置与启动方案

### 1. 资金划拨 (Allocate Budget)
当前该广告户余额为 `$0`，需要先从团队钱包或者其他账户向该账户分配额度（或充值）（建议首期分配 $100 - $200 预算），即可激活并开始投放。

### 2. 第一步：配置转化追踪 (Setup Conversion Tracking)
在广告正式上线前，必须配置好转化追踪，告诉 Google 的机器学习算法哪些是真正的价值用户。

* **代码配置：**
  项目代码 `src/lib/ads-tracking.ts` 中已经原生集成了向 Google Analytics 4 (GA4) 发送核心事件的埋点：
  1. `sign_up` (注册成功)
  2. `begin_checkout` (发起购买结账)
  3. `purchase` (付款成功 - 最关键)
* **操作配置：**
  1. 登录 Google Ads 后台，点击 **“工具和设置” (Tools & Settings) ➜ “关联的账号” (Linked Accounts)**，将广告账户与您的 **GA4 媒体资源** 进行关联。
  2. 进入 **“转化” (Conversions)** 页面，点击新建转化操作，选择 **“导入” (Import) ➜ “Google Analytics 4 媒体资源” (Web)**。
  3. 导入 `purchase` 作为 **主要转化目标（Primary）**，导入 `sign_up` 作为 **次要转化目标（Secondary）**。

### 3. 第二步：广告系列 (Campaign) 基础设置
* **广告系列类型：** 搜索广告系列 (Search Campaign) — 最适合高意图的 SaaS 工具类产品。
* **地理位置 (Locations)：**
  * 首选（付费意愿与单价最高）：**法国 (France)**
  * 次选（法语同语言市场）：**比利时 (Belgium)、瑞士 (Switzerland)、加拿大 (Canada)**（重点选魁北克法语区）
* **语言 (Languages)：** 法语 (French)
* **出价策略 (Bidding)：**
  * **前 1~2 周（冷启动）：** 选择 **“尽可能争取点击次数” (Maximize Clicks)**，并设置最高每次点击费用限制（CPC Cap，如 $0.5 - $0.8），防止前期被高价竞价浪费预算。
  * **两周后（积累了 15~30 个 Purchase 转化后）：** 更改出价策略为 **“尽可能提高转化次数” (Maximize Conversions)**，由 Google 算法自动接管并寻找具有高付费倾向的用户。

### 4. 第三步：关键词选择 (Keywords Selection)
使用 **“词组匹配” (Phrase Match)** 和 **“完全匹配” (Exact Match)**，避免广泛匹配引入垃圾流量。

* **品牌词：** `wav2lip`, `wav2lip ia`, `wav2lipia`
* **核心工具词：** `"synchronisation labiale ia"`, `"wav2lip en ligne"`
* **功能意图词：** `"doublage video ia"`, `"ia synchronisation des levres"`
* **痛点解决词：** `"resynchroniser levres video"`, `"ia doublage voix"`
* **高转化竞价词：** `[wav2lip gratuit]`, `[doubler une video en francais]`

### 5. 第四步：自适应搜索广告文案 (French Ad Copy)

#### 标题建议 (Headlines - 限制 30 字符)：
* `Synchronisation Labiale Wav2Lip`
* `Wav2Lip IA en Ligne Gratuit`
* `Doublage Vidéo IA 1 Click`
* `Resynchroniser les Lèvres`
* `Rendu HD Rapide en Ligne`
* `Wav2Lip Gratuit - Essai Libre`

#### 描述建议 (Descriptions - 限制 90 字符)：
* `Doublez et traduisez vos vidéos sans réenregistrement coûteux. Rendu parfait en 30s.`
* `L'IA adapte et resynchronise les mouvements des lèvres sur le son cible. Testez gratuit.`
* `Wav2Lip IA en ligne ultra-réaliste. Zéro installation Python, rendu cloud instantané.`
