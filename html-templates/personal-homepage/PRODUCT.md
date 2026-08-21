# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

纯静态 HTML/CSS/JS 单文件模板（无构建依赖）。主题数据源 `theme-pack.js`（UMD 双模式）；变体预览由 `node style_previews/_build.mjs` 生成。运行时零依赖，无 CDN 字体（Google Fonts 大陆不可靠，全部回退系统字体栈）。

## Users

- 主要用户：高校教师、博士生、硕士生，需要一个对外展示学术成果与个人履历的主页，让同行、学生与潜在合作者认识自己。
- 使用场景：挂在院系教师主页链接、个人域名、GitHub Pages、简历 QR 码等；由非前端背景的使用者复制目录、替换占位内容即可上线。

## Product Purpose

一套「学科风格可迁移」的个人学术主页模板：同一套内容骨架（关于我/研究方向/学术论文/科研项目/教学/荣誉奖励/学术报告/团队/联系），通过一键切换在 16 个学科主题（数学、物理、政治学、法学、经济学、人工智能、统计学、文学、新闻传播、社会学、哲学、历史学、化学、生物学、工商管理、金融学，每科浅/深两套）与人大红主题（浅/深两套，共 34 套）之间换肤。成功标准：使用者只改内容不改结构即可上线，且访客一眼能感知页主所属学科的视觉气质。

## Positioning

同类模板（Hugo Academic、al-folio 等）的「主题」只是配色或明暗差异；本模板的主题差异建立在**学科参照物**上——数学的圆规与方格纸、法学的天平与法典、统计学的正态曲线、文学的竹简与朱砂印等学科符号构成每套主题的装饰母题。同时内置**中英双语一键切换**与**人大红特色主题**（中国人民大学视觉识别体系）。

## Operating Context

- 素材：`html-templates/lecture/ruc_beamer_templates/pic/` 与 `commerical-lecture/assets/` 中的 RUC 矢量 logo（ruc-emblem.svg 等，校徽红 #971f30）。
- 项目既有模板（lecture / lab-meeting / commerical-lecture / paper-explainer）的契约：theme-pack.js 唯一数据源、整块替换 `<style id="theme-css">`、右下角切换方块、localStorage 跨页连续、decor-guard `:not()` 显隐、detect.mjs 去 AI 味。
- 内容政策（项目级约束）：模板不得含任何真实项目/个人信息，一律虚构占位（lab-meeting 先例）；占位符含义统一记录在 README。

## Capabilities and Constraints

- 34 套主题（16 学科 × 浅/深 + 人大红浅/深），一键切换，localStorage 记住选择（键 `homepage-theme`）。
- 中英双语切换（`html[data-lang]`），localStorage 记住选择（键 `homepage-lang`），默认中文。
- 单页滚动 + 顶部锚点导航（9 项：关于/研究/论文/项目/教学/荣誉/报告/团队/联系，预留全部跳转接口供使用者删改），移动端汉堡折叠。
- 去 AI 味为硬性验收：detect.mjs 零发现（含 advisory），不用 em-dash（—）双形态，中文字距 ≤0.04em，避免 AI 常用字体清单。
- 未决：模板是否提供 CV 下载页（当前仅简历条目按钮占位）；页脚 ICP 备案号为占位文本，由使用者替换。

## Brand Commitments

- 人大红主题使用校徽红 #971f30 及官方矢量素材；该主题为默认打开主题（用户指定）。
- 项目既有 RUC 素材契约：小尺寸 logo 必须用 SVG 矢量（用户明确反馈过 PNG 缩放模糊）；校徽不放大红主题页眉（paper-explainer 先例，页眉小 logo 已按用户要求删除，只用背景水印 + favicon 形态需再确认）。
- 用户对「AI 味」敏感：模板文案避免套话与模板腔，学科装饰追求「手作感」而非「生成感」。

## Evidence on Hand

- 调研报告（2026-08-19，agent-reach + anysearch）：学术主页标准版块清单、al-folio/Wowchemy/Academic Pages 的最佳实践（年份分组论文列表、BibTeX 按钮、作者高亮、招生版块）、Berkeley 导航准则。
- 学科视觉符号调研（2026-08-19）：16 学科的标志性视觉元素、配色联想、字体气质清单。
- 项目记忆与 baton（.baton/ 目录）：主题系统架构铁律、人大红视觉终版、RUC 素材调试经验。

## Product Principles

1. 学科气质靠「参照物」传达，不靠颜色——每套主题必须有学科符号装饰母题。
2. 模板是给别人填内容的：所有数据占位、路径契约、替换清单必须写进 README。
3. 切换器与主题系统沿用项目既有架构，不另起炉灶。
4. 访客 30 秒内要能回答「这是谁、做什么方向、怎么联系」。
5. 无 AI 味是交付门槛，不是可选优化。

## Accessibility & Inclusion

- 正文最小 14px，对比度：暗色正文 ≥7:1、亮色 ≥4.5:1、accent ≥4.5:1（项目验收惯例）。
- 动效尊重 prefers-reduced-motion。
- 双语切换覆盖全部正文文案。
