# lipsync.pro 改造判断记录

我建议：**应该改造 lipsync.pro，而且优先级可能比继续只做 Wav2Lip 更高。**

但不是把它改成 Wav2Lip 站，而是把它做成更大的商业入口：**AI Lip Sync / Lip Sync AI / Video Dubbing AI / Multilingual Lip Sync**。

我刚看了当前 `lipsync.pro`，它现在已经是这个方向：首屏标题是 “Create AI Lip Sync Videos Instantly”，也覆盖了 AI lip sync generator、video dubbing、multilingual lip sync 等词。这个方向本身是对的。问题是现在页面有几个明显风险：

1. **CTA 居然跳到 Synthesia**
   页面里的 “Try AI Lip Sync Generator / Generate Preview” 链接指向 `synthesia.io`，这对转化是致命的。用户来了以后被送走了。

2. **信任文案太夸张**
   页面里有 “100K+ Active Users”、“5M+ Videos Processed”、“Stanford AI Lab”、“TechCrunch Review”、“OpenAI”等信任背书。如果这些不是事实，SEO 和转化都会有风险，也容易显得假。

3. **页面太像模板站**
   内容很满，但很多地方像 SaaS 模板堆料，不像一个真实可用的产品。自然流量来了，如果第一感觉是“这站真的假的”，注册会被浪费。

4. **它比 Wav2Lip 更适合吃泛需求**
   `wav2lip` 是技术词，用户可能找 GitHub、Colab、模型文件。  
   `lip sync ai / ai lip sync / synchronisation labiale ia` 是任务词，用户更接近“我要做一个视频”，更容易注册。

我的建议是这样分工：

- `lipsync.pro`：主做英文/国际的 **AI Lip Sync Generator**
- `wav2lipia.com`：主做法语市场 + Wav2Lip 长尾 + Google Ads 法语落地页
- 两个站可以互相少量链接，但不要写成一模一样的站

**lipsync.pro 改造方向：**

- 首屏改成真实产品承诺：上传视频 + 上传音频/输入文本 + 生成 lip sync 视频
- 所有 CTA 改回自己的注册/上传页面，不要再外链 Synthesia
- 删除或弱化无法证明的背书
- 做 3 个核心落地页：
  - `/ai-lip-sync-generator`
  - `/video-dubbing-ai`
  - `/lip-sync-video`
- 如果要打法语，再加：
  - `/fr/synchronisation-labiale-ia`
  - `/fr/doublage-video-ia`

一句话：  
**Wav2Lip 是技术长尾，lipsync.pro 才更像主商业资产。**  
如果它已经有自然流量，值得认真改造，但要先把“外链流失”和“模板信任文案”这两个问题修掉。
