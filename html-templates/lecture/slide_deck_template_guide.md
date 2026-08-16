# 通用演示讲演 HTML 模板 — 使用说明与扩展指南

> 配套文件：
> - `slide_deck_template.html` — 可迁移模板本体（占位内容，默认"通用蓝系"主题）
> - `theme-pack.js` — 主题包（唯一主题数据源：17 套完整 CSS + 字体 + 色板元数据）
> - `style_previews/` — 16 个风格变体预览库 + 生成脚本
> 提炼来源：TianTanAI 项目 `mr_lecture.html`（方法教学讲演）与 `reproduction_results.html`（复现结果讲演）

---

## 1. 这是什么

一份**自包含、零构建依赖**的讲演网页模板。单个 HTML 文件即可在浏览器直接打开，无需安装任何工具或框架。

它把两个成熟讲演页面中反复使用的**设计系统**（配色、排版、组件）与**交互**（侧边导航、滚动高亮、主题切换）沉淀为通用骨架，并把示例内容替换成了领域无关的占位符——因此**可迁移到任何背景的项目**：

| 适用场景 | 说明 |
|---|---|
| 项目汇报 | 里程碑进度、结果展示、风险与下一步 |
| 技术分享 / 方案评审 | 幕式叙事 + 组件化表达，适合 15–50 分钟 |
| 论文 / 报告解读 | 幕结构天然适配「背景 → 方法 → 结果 → 讨论」 |
| 复现 / 对照报告 | 统计卡片 + 徽章 + 效果量条形图直击"复现 vs 原论文" |
| 课程 / 培训课件 | 每张卡片自带"核心问题"，适合问答式讲解 |
| 远程会议 | 侧边目录 + 平滑滚动，便于逐页跳转与跟讲 |

---

## 2. 文件清单

```
lecture/
├── slide_deck_template.html         ← 主模板本体（复制后改名即可用）
├── theme-pack.js                    ← 主题包：17 套主题 CSS + 字体 + 色板（唯一数据源）
├── slide_deck_template_guide.md     ← 本说明文档
├── ruc_beamer_templates/            ← 人大红 Beamer 素材（14 号主题的校徽/水印图）
└── style_previews/                  ← 16 种风格变体预览库
    ├── _skeleton.html               ←   生成基座（含全部主题装饰元素的联合骨架，勿手改）
    ├── _build.mjs                   ←   构建脚本：node _build.mjs 重生成全部变体
    ├── index.html                   ←   统一预览页（浏览器打开，对比挑选）
    ├── 01_dark_premium.html         ←   深色奢华 · 路演风
    ├── 02_minimal_elegance.html     ←   极简留白 · 高级咨询风
    ├── 03_glassmorphism.html        ←   玻璃拟态 · 渐变科技风
    ├── 04_refined_blue.html         ←   蓝白精细化
    ├── 05_ink_vermilion.html        ←   东方水墨 · 朱砂风
    ├── 06_neumorphism.html          ←   新拟态 Soft UI
    ├── 07_editorial.html            ←   杂志编辑风
    ├── 08_acid_neon.html            ←   霓虹酸性
    ├── 09_dossier.html              ←   档案卷宗
    ├── 10_terminal.html             ←   赛博终端
    ├── 11_blueprint.html            ←   蓝晒蓝图
    ├── 12_starmap.html              ←   深空星图
    ├── 13_swiss_grid.html           ←   瑞士网格
    ├── 14_ruc_beamer.html           ←   人大红 Beamer（LaTeX 模板复刻）
    ├── 15_wwdc.html                 ←   WWDC 发布会（深色）
    └── 16_wwdc_light.html           ←   WWDC 发布会（亮色）
```

> **架构铁律**：`theme-pack.js` 是主题**唯一数据源**。主模板、16 个变体、预览入口全部从它取主题。变体 HTML 由 `style_previews/_build.mjs` 生成——**改主题请改 theme-pack.js 后重跑 `node _build.mjs`，不要手改变体文件**（重跑会覆盖）。

---

## 3. 主题切换方块（一键换肤）

**每个模板页面右下角都有一个方块按钮**（调色盘图标），点击展开主题面板：

- **17 个选项**：通用蓝系（默认）+ 16 个风格主题，每个选项带主题色板圆点；
- **随时切换**：点选即换肤，整页视觉语言（配色/字体/装饰）瞬间切换；
- **跨页连续**：选择保存在 `localStorage`（键 `lecture-theme`），换页、刷新、关浏览器后仍保持；
- **装饰联动**：部分主题有专属装饰元素（05 朱砂印章、09 装订孔与"已解密"章、10 终端标题栏、11 四角准星、12 星座标注、13 红方块编号、07 壹贰章节号）。这些元素常驻 DOM，由 `data-theme` 控制显隐，切到对应主题即出现。

**工作原理**：切换时 JS 把目标主题的完整 CSS 注入 `<style id="theme-css">`，替换字体 `<link id="theme-fonts">`，并把 `data-theme` 写到 `<html>`。预置在 `<head>` 的小脚本会在页面渲染前从 localStorage 恢复 `data-theme`，避免装饰元素闪错。

> 注意：切换方块有自己的独立样式（`<style id="ts-css">`），不会随主题切换而消失。它使用深色中性外观，在所有主题（含浅色）下都可读。

---

## 4. 整体结构（先看骨架）

模板是一个长页面，从上到下由固定区域组成。用 `<div class="slide">` 划分"幻灯片"，用 `<div class="act-header">` 划分"幕"（章节）。

```
┌─────────────────────────────────────────────┐
│ <head>                                      │
│   <link id="theme-fonts">    主题字体（切主题时替换）      │
│   <script>                   主题预设：渲染前恢复 data-theme │
│   <style id="decor-guard">   装饰显隐守卫（data-decor 元素） │
│   <style id="theme-css">     当前主题 CSS（切主题时整体替换） │
│   <style id="ts-css">        切换方块样式（不随主题变）      │
│   MathJax 公式库（两个 <script>，不需要可删）   │
└─────────────────────────────────────────────┘
<nav class="side-nav">  侧边目录容器（JS 自动填充，无需手写条目）
<header>                封面：大标题 + 副标题 + 元信息
                        （内含各主题专属装饰元素，data-decor 标记）
<div class="rb">        顶部相关链接条（可选）
<div class="act-header">第一幕：{幕主题}（N张）        ─┐
<div class="slide">    幻灯片 1（卡片）               │  ← 核心区：
<div class="slide">    幻灯片 2                       │    "幕 + 卡"结构，
<div class="act-header">第二幕：…                    │    可任意复制增删
<div class="slide">    幻灯片 N                       │
<footer>               页脚：项目信息 + 链接           │
<button id="themeSwitcher">  主题切换方块（右下角固定）    │
<script src="theme-pack.js">  主题包                  │
<script>               侧边导航 JS + 切换方块 JS       ─┘
```

**工作原理**：页面加载时，底部 JS 遍历所有 `.act-header` 与 `.slide`：
- 把 `.act-header` 的标题渲染为侧边导航的**章节分组**；
- 把每张 `.slide` 的 `<h3>` 标题渲染为**目录项**，点击平滑滚动到对应卡片；
- 用 `IntersectionObserver` 监测滚动，**自动高亮当前正在阅读的目录项**。

因此你**只需写内容**，目录是自动生成的。

---

## 5. 分部分详解

### 5.1 主题定制（三层路径）

**路径 A：直接用现成主题（推荐）**。打开页面，点右下角方块选一个主题即可。要固定某个主题作为默认：把 `<html data-default-theme="default">` 与 `<body data-default-theme="default">` 中的 `default` 改成对应主题 id（如 `"14"`）。

**路径 B：微调某个主题**。改 `theme-pack.js` 里对应主题对象的 `css` 字段，然后重跑 `node style_previews/_build.mjs`。主模板（`slide_deck_template.html`）里的 `<style id="theme-css">` 内容与包内 `DEFAULT_THEME.css` 同步——改默认主题时两处都要改。

**路径 C：新增自定义主题**。在 `theme-pack.js` 的 `THEMES` 数组追加一个对象：

```js
{ id: '17', name: '你的主题名', en: 'Your Theme',
  desc: '一句话描述', features: ['特征一', '特征二'],
  swatch: ['#主色', '#底色', '#辅色'], linkBg: '#主色',
  fonts: '',   // 或 Google Fonts css2 链接
  css: '/* 完整 CSS，可复制任意主题改造 */' }
```

面板选项、预览入口卡片会自动多出这一项（默认主题 + N 项自适应）。若新主题带专属装饰元素，在联合骨架的对应位置加 `data-decor="17"` 元素，并在 `decor-guard` 与 `theme-pack` 里同步。

### 5.2 封面 `header`

```html
<header>
    <h1>{讲演大标题}</h1>
    <div class="sub">{一句话副标题}</div>
    <div class="meta">{项目名} · {日期} · 适合远程会议讲解 · 预计时长 30-45 分钟</div>
</header>
```

`header` 内有一些 `data-decor="XX"` 的装饰元素（印章/装订孔/终端栏等），**非对应主题时它们被 CSS 隐藏，直接忽略即可**；不要删除——它们是主题切换系统的组成部分。

### 5.3 相关链接条 `.rb`

```html
<div class="rb">
    <a href="#">📄 文档</a>
    <a href="#">📊 数据</a>
    <a href="#">🔗 链接</a>
</div>
```

一排胶囊链接，通常放"这篇讲演的依据材料 / 可跳转的相关页面"。**不需要就整段删掉**。

### 5.4 幕头 `.act-header`（章节分隔）

```html
<div class="act-header" data-act="I">
    <h2>第一幕：{幕主题}（{N}张）</h2>
    <div class="sub">{幕的副标题}</div>
</div>
```

- `{N}张` 是可选的，用于告知听众本章篇幅；`data-act` 供瑞士网格主题显示章节色块，保留即可；
- 幕头会被 JS 自动加入侧边目录，形成"分组标题"；
- 幕的数量与顺序可自由调整；整幕复制即可扩页。

### 5.5 幻灯片卡片 `.slide`（最核心的单元）

```html
<div class="slide">
    <h3>1. {标题}<span class="q">核心问题：{这张要回答的关键问题}</span></h3>
    <div class="key-box"><strong>核心信息：</strong>{先给结论}</div>
    <p>{正文，再给论证}</p>
    <table>…</table>
    <div class="ref">📖 详细解读：<a href="#">来源一</a> §X | <a href="#">来源二</a> §Y</div>
</div>
```

一张卡片 = 一套**"先结论、后论证、附出处"**的表达模板：

| 元素 | 职责 | 备注 |
|---|---|---|
| `<h3>` 标题 | 本张主题 | 会被 JS 提取为目录项 |
| `.q` 小字 | 核心问题 | 灰色副行，引导听众带着问题听 |
| `.key-box` | 核心信息 | **每张都建议放**，一句话给结论 |
| 正文 / 表格 / 图 | 论证过程 | 自由组合 |
| `.ref` | 参考来源 | 灰底细线框，收尾标注出处 |

### 5.6 页脚 `footer`

```html
<footer>
    <p><strong>{项目名}：</strong>{一句话定位}<br>
       <strong>最近更新：</strong>{日期} · <strong>主讲：</strong>{姓名}</p>
</footer>
```

适合放归属信息与相关链接。

### 5.7 侧边导航（无需配置）

```html
<nav class="side-nav" id="sideNav">
    <div class="nav-title">📋 {讲演目录标题}</div>
    <div id="navList"></div>
</nav>
```

只需改 `nav-title` 的文字。目录条目由 JS 自动生成，宽屏（≥1100px）时显示在左侧，窄屏自动隐藏。

---

## 6. 组件库详解

以下组件可直接复制到任意 `.slide` 中使用。

### 6.1 三色提示框

```html
<div class="key-box"><strong>核心信息：</strong>蓝框——先给结论，每张卡标配</div>
<div class="warn-box"><strong>关键发现：</strong>红框——风险、阻塞、踩坑、缺失</div>
<div class="success-box"><strong>破局关键：</strong>绿框——成功、解决思路、下一步</div>
```

| 类 | 底色 | 语义 | 建议用于 |
|---|---|---|---|
| `key-box` | 浅蓝 | 核心 / 中性 | 每张幻灯片的开场结论（淡底 + 彩色标题，语义靠颜色本身） |
| `warn-box` | 浅红 | 警告 / 风险 | 数据缺失、依赖阻塞、已知坑、反直觉发现 |
| `success-box` | 浅绿 | 成功 / 收尾 | 破局方案、中间结论、下一步行动 |

`<strong>` 内的短词（如"核心信息："）作为标签，可自由替换。

### 6.2 统计卡片 `.stat-grid` / `.stat-card`

```html
<div class="stat-grid">
    <div class="stat-card green"><div class="num">15/15</div><div class="label">达成目标</div></div>
    <div class="stat-card yellow"><div class="num">12/15</div><div class="label">提前完成</div></div>
    <div class="stat-card"><div class="num">0/15</div><div class="label">未达标</div></div>
</div>
```

- **布局**：`auto-fit` 自适应列数，卡片数量任意；
- **变体**：数字默认主题主色；加 `green` 类变绿（达标），加 `yellow` 变黄（预警）；
- **用途**：任何"用 3 秒抓住注意力"的指标——通过率、覆盖率、收益、偏差、匹配数等；
- 可自行新增变体，例如 `.stat-card.purple`（在目标主题 CSS 里追加规则）。

### 6.3 徽章 `.badge`

三组语义，类名即用途：

| 分组 | 类 | 示例 |
|---|---|---|
| 结果质量 | `badge-ok` | ✅ 通过 / 一致 / 达成 |
| | `badge-warn` | ⚠️ 接近 / 注意 |
| | `badge-bad` | ✗ 失败 / 相反 / 缺失 |
| 方向 | `badge-pos` | ↑ 正向 / 上升 |
| | `badge-neg` | ↓ 负向 / 下降 |
| 进度 | `badge-done` | ✅ 完成 |
| | `badge-todo` | ⬜ 待执行 |
| | `badge-block` | 🔒 阻塞 |

```html
<span class="badge badge-ok">✅ 通过</span>
<span class="badge badge-block">🔒 阻塞</span>
```

> 类名可自定义——例如做科研复现讲演时，可把 `badge-ok/badge-warn/badge-bad` 改名为 `badge-match/badge-close/badge-risk`，语义更贴切。改 CSS 里的 `.badge-*` 规则与 HTML 里的类名即可。

### 6.4 进度条 `.progress-row`

```html
<div class="progress-row">
    <span class="progress-step">阶段一</span>
    <span class="progress-name">需求分析与调研</span>
    <div class="progress-bar"><div class="progress-fill" style="width:100%;background:#27ae60;"></div></div>
    <span class="badge badge-done">✅ 完成</span>
</div>
```

- 一行 = 一个阶段/步骤：左步骤名 + 进度条 + 右状态徽章；
- 进度填充宽度 `width:%` 与填充色 `background:#…` 按需调整（建议沿用绿/黄/红语义色）；
- 用途：项目里程碑、复现步骤、路线图总览。

### 6.5 数据表格 `table`

```html
<table>
    <tr><th>维度</th><th>说明</th><th>结论</th></tr>
    <tr><td>条目一</td><td>{内容}</td><td>{结论}</td></tr>
    <tr class="row-pos"><td>正向项</td><td>{内容}</td><td>{绿底}</td></tr>
    <tr class="row-neg"><td>负向项</td><td>{内容}</td><td>{红底}</td></tr>
</table>
```

- 默认样式：表头浅蓝 + 隔行斑马纹（各主题有自己的配色）；
- 行着色：整行加 `row-pos`（绿底）或 `row-neg`（红底），或对单个单元格加 `pos` / `neg` 类——适合"支持 vs 反对""达标 vs 不达标"的对照表；
- 列数任意，内容换行可用 `<br>`。

### 6.6 效果量条形图 `.forest-table`（森林图风格）

用纯表格模拟"点估计 + 区间"图，**避免截图模糊、保证像素级对齐**。任何需要"多个条目的估计值与不确定性对比"的场景都能用（方案对比、效果量、前后差异……）。

```html
<table class="forest-table">
    <tr><th>条目</th><th>方向</th><th>估计值</th><th></th></tr>
    <tr><td><span class="badge badge-pos f-pos">方案 A ↑</span></td><td>正向</td><td>+1.21</td><td class="f-bar">        ●━━━▶</td></tr>
    <tr><td><span class="badge badge-neg f-neg">方案 C ↓</span></td><td>负向</td><td>−0.89</td><td class="f-bar">  ◀━━━●━━━━</td></tr>
    <tr class="axis-row"><td colspan="3" style="text-align:right;">← 负向</td><td>正向 →</td><td>−1.00  0.00  +1.00</td></tr>
</table>
```

- **`f-bar` 单元格**是最关键的一列：用等宽字体字符 `●`（点估计）与 `━`（区间）手绘条形，靠空格调整位置；
- 图标字符约定：`◀` = 左侧、`▶` = 右侧、`●` = 点、`━` = 区间线；
- **做医学/科研讲演时**，把"正向/负向"改回"风险/保护"，`badge-pos/neg` 改回 `badge-risk/badge-protect` 即可复用原语义。

### 6.7 图文网格 `.fig3-grid`

```html
<div class="fig3-grid">
    <div class="fig3-cell">
        <img alt="Panel a" src="data:image/svg+xml,…">  <!-- 占位灰图，换成你的图片地址 -->
        <div class="fig3-label"><strong>a · {小标题}</strong></div>
        <p>{解释文字}</p>
    </div>
    <div class="fig3-cell">…</div>
</div>
```

- 默认两列（`grid-template-columns: 1fr 1fr`），改为 `1fr 1fr 1fr` 即成三列；
- 每格 = 图 + 小标题 + 一句话解释，适合"原图多 panel 还原 / 多方案截图对照"。

### 6.8 来源注记 `.src-ref`

```html
<div class="src-ref">📖 数据来源：outputs/xxx.csv · 统计口径：…</div>
```

灰色斜体小字，常用于表格/图片下方标注数据出处。区别于 `.ref`：`src-ref` 是轻量一行注记，`.ref` 是卡片底部的多链接参考块。

### 6.9 数学公式 MathJax

```html
行内公式 $x_i$；独立成行 $$ f(x) = \frac{1}{n}\sum x_i $$
```

- 依赖 `<head>` 末尾的两个 `<script>`（MathJax 3，CDN 加载）；
- **不需要公式**：删除那两个 `<script>` 即可，完全不影响其他功能；
- **离线环境**：可把 `tex-svg.js` 下载到本地改 `src` 路径，或改用 CDN 版本（如 jsdelivr / 国内镜像）。

---

## 7. 定制步骤（把模板变成你的讲演）

按顺序执行，10 分钟内可完成基本改造：

1. **复制** `slide_deck_template.html` 到目标项目，改名为 `{你的讲演名}.html`（若部署到子目录，把 `theme-pack.js` 一起复制，并把 `src="theme-pack.js"` 改成相对路径）
2. **选主题**：浏览器打开页面，点右下角切换方块挑选；要固定主题则改 `data-default-theme`
3. **改封面**：`<header>` 的标题、副标题、meta 行
4. **配链接条**：`.rb` 里的链接；不需要则删除该块
5. **填充内容**：把"第一幕/第二幕"的示例 `.slide` 替换成你的内容；需要更多页就整块复制 `.slide`，需要更多章就复制 `.act-header + 若干 slide`
6. **删掉示例**：确认所有 `{花括号占位符}` 都已替换；不需要公式就删 MathJax
7. **改页脚**：`<footer>` 的项目信息与链接
8. **本地预览**：直接双击用浏览器打开即可；侧边目录、滚动高亮、主题切换自动生效

---

## 8. 扩展指南（进阶）

### 8.1 新增一个组件

在目标主题 CSS（theme-pack.js 对应条目的 `css` 字段）的"组件库"区段追加规则，然后在任意 `.slide` 中使用。例如给统计卡片加紫色变体：

```css
.stat-card.purple .num { color: var(--purple); }
```

### 8.2 嵌入内嵌 SVG 示意图

不需要图片文件时，可把矢量图直接写进 HTML（参考原页面的 MR DAG 图）。要点：

```html
<figure style="text-align:center; margin:24px 0;">
    <svg viewBox="0 0 680 300" style="max-width:600px; width:100%; height:auto;">
        <!-- 用 <circle> <line marker-end="url(#箭头)"> <text> 画节点与连线 -->
    </svg>
    <figcaption style="font-size:0.88em; color:#5d6d70;">图注…</figcaption>
</figure>
```

- 用 `<defs><marker>` 定义箭头，`stroke-dasharray` 画虚线（如"被禁止的路径"）；
- 好处：无限缩放不糊、随主题色可变、可搜索文本。

### 8.3 深色模式

模板自带 16 套主题（含多种深色），用切换方块即可。若仍想给单个主题加"跟随系统深浅"：

```css
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #1e272e; --gray-d: #dfe6e9; --gray-m: #a4b0be;
        /* …其余浅底色组件按需微调 */
    }
}
```

### 8.4 调整侧边导航

- **改目录标题**：`<nav class="side-nav">` 里的 `.nav-title` 文本；
- **隐藏侧栏**：删除 `<nav class="side-nav">…</nav>` 块，并把 CSS 中 `@media (min-width:1100px)` 的 `padding-left:222px` 一并删除；
- **改触发宽度**：`@media (min-width: 1100px)` 里的阈值。

### 8.5 导出 PDF

浏览器打开后 `Ctrl+P` → 目标选"另存为 PDF" → 建议关闭"背景图形"（或保留以维持配色），边距选"无"。长页面会自动分页。注意导出前可用切换方块选好主题。

### 8.6 风格迁移到 Markdown / PPT

这套设计系统的**信息结构**（结论先行 → 论证 → 出处；幕式章节；绿/黄/红三态）同样适用于 Markdown 讲稿或 PowerPoint：
- Markdown：用 `>` 引用块模拟 `key-box`，用表格模拟对照表；
- PPT：每张 `.slide` ≈ 一页 PPT，`.act-header` ≈ 章节页。

### 8.7 无障碍与性能约定（改造时保持）

- 切换方块支持键盘（Enter 开合、Esc 关闭），选项为真实 `<button>`；
- 所有动效尊重 `prefers-reduced-motion`；
- 页面背景光晕/网格用 `body::before` 固定层实现，**不要改回 `background-attachment: fixed`**（滚动重绘卡顿源）；
- 卡片级 `backdrop-filter` 已实心化（玻璃拟态主题保留大块玻璃），新增卡片避免大面积 backdrop-filter；
- 功能文字不小于 12px（森林图等小字已用 px 定值兜底）。

---

## 9. 迁移核对清单

迁移到新项目时逐项勾选：

- [ ] 所有 `{花括号占位符}` 已替换为真实内容
- [ ] `theme-pack.js` 已随文件复制（依赖切换方块时），或已删除切换方块相关代码
- [ ] `<header>` 封面信息已更新（标题 / 副标题 / 日期 / 时长）
- [ ] `.rb` 链接条已更新或删除
- [ ] 各 `.slide` 的 `<h3>`、`.q`、`key-box`、表格、`.ref` 已填写
- [ ] 不需要公式时已删除 MathJax 两个 `<script>`（离线环境注意）
- [ ] 图片引用路径正确（`src` 指向真实文件，占位灰图已替换）
- [ ] `<footer>` 项目归属与链接已更新
- [ ] 浏览器打开预览：目录自动生成、点击跳转、滚动高亮正常
- [ ] 切换方块：开合、换肤、刷新后主题保持、跨页连续
- [ ] 窄屏（<768px）显示正常，侧栏自动隐藏

---

## 10. 来源与致谢

本模板由 TianTanAI 项目的两份成熟讲演页面提炼而来，并扩展为 16 个风格变体：

- **`literature/summary/nav/mr_lecture.html`** — 孟德尔随机化系统讲演（21 张，幕式教学）：贡献了幕式骨架、`.key-box`、`.fig3-grid`、内嵌 SVG DAG 图、三色行着色表格。
- **`reproduction/reproduction_results.html`** — 蛋白质组范围 MR 复现讲演：贡献了 `.warn-box` / `.success-box`、`.stat-card`、`.badge` 徽章体系、`.progress-row` 进度条、`.forest-table` 森林图、MathJax 公式支持。
- **`style_previews/01~08`** — 提炼自以上两页并经 impeccable 设计流程产出的 8 个风格变体（深色奢华、极简留白、玻璃拟态、蓝白精细化、东方水墨、新拟态、杂志编辑、霓虹酸性）。
- **`style_previews/09~13`** — 5 个"视觉世界"概念变体（档案卷宗、赛博终端、蓝晒蓝图、深空星图、瑞士网格），原为独立系列，已合入统一预览库。
- **`style_previews/14`** — 人大红 Beamer：基于 `ruc_beamer_templates/RenminUniv.sty` 的 LaTeX beamer 模板复刻（校徽红 #971f30、背景水印、校徽右上角）。
- **`style_previews/15~16`** — WWDC 发布会深/亮双版本：系统字体栈零外部依赖，玻璃侧边导航，iOS 语义色。

16 个变体共享同一套组件类名与页面结构，视觉语言由 `theme-pack.js` 统一管理，通过主题切换方块一键互切。
