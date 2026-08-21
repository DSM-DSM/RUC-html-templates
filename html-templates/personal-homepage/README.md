# 个人学术主页模板（personal-homepage）

面向高校教师、博士生、硕士生的个人学术主页模板。同一套内容骨架，通过右下角主题切换方块在 **34 套主题**间一键换肤：16 个学科（数学、物理、政治学、法学、经济学、人工智能、统计学、文学、新闻传播、社会学、哲学、历史学、化学、生物学、工商管理、金融学）各配浅色/深色两套，另加人大红主题浅色/深色两套（默认打开，**只使用官方视觉识别素材**）。

每套主题的学科装饰分三层，全部为统一规格的线条风格 SVG（横向主图 160:100，同一学科五符不重形）：
1. **主图**（整页右下角低透明水印，公式一行完整显示，全站唯一位置、hero 区不重复）：数学的欧拉恒等式与泰勒展开式、统计学的正态密度函数与 Lasso 惩罚回归、物理的薛定谔方程与费曼图、文学的竹简与竖排诗句、法学的天平与条文等；
2. **版块图标**（每个版块标题右侧）：与主图零重复的第三套图形——双纽线、法槌、芯片、箱线图、显微镜、卷轴、国会穹顶、线装书、温度计、地球仪、柱廊、广播塔、饼图、趋势箭头、干涉波纹、无差异曲线族；
3. **版块点缀小图标**（6 处卡片角落，两枚轮换）：π、双曲线、印章、分子链等；
另有**背景纹样**：方格纸、宣纸纤维、终端点阵、星点、羊皮纸横线等。

内置**中英双语一键切换**、**左侧可折叠目录**（跳转 + 滚动高亮 + 伸缩记忆）、年份分组论文列表（BibTeX 一键复制、本人姓名高亮）、招生版块、移动端适配。运行时零依赖、无网络字体（大陆可用），全部素材内联或随包分发。

## 快速开始

1. 用浏览器直接打开 `index.html` 预览（含全部主题与双语切换）。
2. 部署：把本目录复制到你的站点目录，按下方「替换清单」替换占位内容即可。
3. 想看全部主题：打开 `style_previews/index.html`（由构建脚本生成的主题画廊）。

## 主题与语言

- **主题切换**：右下角方块按钮 → 面板按学科分组列出 34 套主题（浅色/深色两枚色片），点击即换。选择保存在 `localStorage`（键 `homepage-theme`），跨页与刷新保持。**全页内容随学科切换**：hero 单位、研究兴趣、关于我、教育/工作经历、研究方向、学术论文（含 BibTeX）、科研项目、教学、荣誉奖励、学术报告、团队与招生共 11 个内容区，每学科一套（17 套 `<div class="f-set" data-f="××">` 内容块，`display:contents` 显隐）——切到数学显示解析数论与数论论文，切到经济学显示宏观经济学与经济学项目。新增学科需同时追加 `theme-pack.js` 的 `field` 键与 index.html 各内容区的 f-set 内容块。
- **默认主题**：人大红（`ruc-light`）。修改 `theme-pack.js` 末尾的 `DEFAULT_THEME_ID` 即可改默认。
- **语言切换**：顶栏「中 / EN」按钮或主题面板右上角。选择保存在 `localStorage`（键 `homepage-lang`），默认中文。双语实现：文案以 `<span data-zh>…</span><span data-en>…</span>` 成对书写，由 `html[data-lang]` 控制显隐。
- **左侧目录**：视口宽度 ≥1360px 时显示，条目点击跳转对应版块、滚动时高亮当前阅读位置；展开时为主题色背景卡片（随主题换色），点右上角把手可折叠成细条（状态保存在 `homepage-toc`），移动端自动隐藏。
- **占位链接**：所有 `href="#"` 的链接（论文 PDF/代码/DOI、社交、讲义等）都是**占位链接**，模板已拦截点击避免跳回页首。上线前把 `href="#"` 替换为真实地址：论文条目在 `#publications` 版块（PDF 贴论文全文地址、代码贴仓库地址、DOI 贴 `https://doi.org/...`），社交链接在 `.hero-soc`，讲义链接在 `#teaching`。

## 替换清单（占位内容总表）

模板全部内容为虚构占位，按出现位置替换：

| 位置 | 占位内容 | 替换方式 |
|---|---|---|
| `<title>` / `<meta description>` | ××× | 改 `index.html` head |
| 浏览器标签图标 | 红底「人」字 data URI | 换成校徽/个人图标 SVG data URI 或文件路径 |
| 顶栏品牌 | 人 + ××× | `.tb-mark` 与 `.tb-name` 两处 |
| Hero 姓名/头衔 | ×××、副教授·博士生导师 | `.hero-name` / `.hero-en-name` / `.hero-title` |
| 单位 | 中国人民大学·统计与大数据研究院 | `.hero-kicker` |
| 人才称号徽章 | 国家优秀青年科学基金获得者（占位）等 2 枚 | `.hero-badges` 内 `.hb`，可增删 |
| 研究兴趣 chips | 高维统计推断等 4 枚 | `.hero-chips` 内 `.chip` |
| 联系方式 | shenzy@ruc.edu.cn（占位邮箱）等 3 行 | `.hero-contact` 与「联系我」版块 |
| 社交链接 | Scholar / ORCID / GitHub / 知乎（href 均为 `#`） | 各 `.soc` 的 `href` 替换为真实主页地址 |
| 照片 | 灰色人像 SVG 占位 | `.portrait` 内 SVG 换成 `<img>`（建议 600×800 以上，3:4；加载等待可用 `<div class="skel" style="min-height:320px">` 骨架占位） |
| 关于我 | 两段介绍 | `#about` 内 `.card p` |
| 教育/工作经历 | 北大博士、哈佛博士后等 | `#about` 内 `.tl-item` |
| 研究方向 | 3 张卡片 | `#research` 内 `.rcard` |
| 学术论文 | 8 篇虚构论文（2022–2025），作者均为 ××× | `#publications` 内按年份组增删 `.pub-item`；本人姓名加 `class="self"` 高亮；PDF/代码/DOI 的 `href="#"` 换成真实地址 |
| BibTeX | 各篇 `.bib pre`（作者 XXX） | 替换为真实引用文本，复制按钮自动取 `pre` 文本 |
| 科研项目 | 4 个项目（占位） | `#projects` 内 `.rcard` |
| 教学 | 4 门课程 + 讲义链接（`href="#"`） | `#teaching` 内 `.course` |
| 荣誉奖励 | 5 条时间线 | `#honors` 内 `.tl-item` |
| 学术报告 | 4 场报告（幻灯片 `href="#"`） | `#talks` 内 `.tl-item` |
| 团队与招生 | 3 名博士生卡片（姓名 ×××）+ 招生文案 | `#team` 内 `.member` 与 `.recruit` |
| 页脚 | © 2025、×××、ICP 备案号、模板来源说明 | `footer` |

## 目录结构

```
personal-homepage/
├── index.html              # 主模板（含基座 CSS、双语内容、装饰 sprite、切换器）
├── theme-pack.js           # 主题唯一数据源（34 套，UMD：浏览器 / Node 构建通用）
├── assets/
│   ├── ruc-emblem.svg      # 人大校徽矢量·红色版（ruc 浅色主题）
│   └── ruc-emblem-white.svg # 反白版（ruc 深色主题，官方红色 SVG 改色生成）
├── style_previews/
│   ├── _build.mjs          # 构建脚本：生成 34 个主题变体 + 预览索引
│   ├── index.html          # 预览画廊（生成产物，勿手改）
│   ├── 01_ruc-light.html … # 34 个主题变体（生成产物，勿手改）
│   └── assets/             # 变体用素材副本
├── PRODUCT.md              # 产品事实（html-beautify init 产物）
├── DESIGN.md               # 设计系统记录（html-beautify document 产物）
└── README.md
```

## 新增 / 修改主题

主题唯一数据源是 `theme-pack.js`，`style_previews/*.html` 是生成产物（手改会被重跑覆盖）。

1. 在 `theme-pack.js` 的 `THEMES` 数组中追加条目，字段：
   - `id`（建议 `学科-light` / `学科-dark`）、`group` / `groupEn`（切换面板分组名）、`name` / `en`、`desc`、`swatch`（3 色：accent / 页面底 / 卡片底）、`decor`（对应 `index.html` 装饰 sprite 中 `#orn-*` 符号，无则用 `"ruc"`）、`_font`（`serif` / `kai` / `sans` 之一）、`css`（`buildCss(37 个 token, 额外规则)`，token 名见 `TOKEN_ORDER`）。
2. 新学科需要专属装饰符号时，在 `index.html` 的 `<svg><defs>` 中加 `<symbol id="orn-××">`（96×96 viewBox，`stroke="currentColor"` 单色线条，随主题换色）。
3. 重建变体：`node style_previews/_build.mjs`。**注意**：构建脚本对 `data-theme="ruc-light"` 的替换只针对 `<html>`/`<body>` 标签属性（勿改回全文 /g 替换——会误伤 base-css 里 `body[data-theme="ruc-light"]` 选择器文本，导致学科变体的 ruc 专属规则全部错乱）。
4. 三项验证：结构配对（div/section/span/a 平衡、无 em-dash `—`）· `node --check theme-pack.js` · detect 去 AI 味：`node C:\Users\YJY\.claude\skills\html-beautify\scripts\detect.mjs --json index.html style_previews/*.html`（期望零发现；学科材质豁免已在构建脚本中注入，见下）。
5. 若改了默认主题 `ruc-light` 的 token，**同步改** `index.html` 中 `<style id="theme-css">` 的兜底内容（两处同步改原则）。

### 对比度铁律

- 深色主题正文 ≥7:1、accent 文字在 `--bg-2` 与 `--accent-soft` 合成面上 ≥4.5:1（合成面 = accent-soft rgba 叠 bg-2，检测器按此计算，曾因差 0.01 打回）。
- 亮色主题 accent 在 `--bg-2` 上 ≥4.5:1（小号 accent 文字如年份、时间线时间会踩线，先算后改）。
- 阴影 blur ≤14px（「细边框+宽阴影」是检测项）；中文字距 ≤0.04em；正文不用 em-dash（`—`），分隔用 `·`。

### 学科材质豁免

`style_previews/_build.mjs` 的 `WAIVERS` 表为变体注入 `impeccable-disable` 豁免注释：宣纸/羊皮纸/旧纸底色（`cream-palette`）与方格纸/竹简/烛图条纹纹样（`repeating-stripes-gradient`）是**用户指定的学科特征**，非 AI 默认奶油底。若主模板 `index.html` 本身引进了条纹/奶油底，需在 `index.html` 顶部手写同样的豁免注释。

## 验证

项目验证基建在 `.claude-tmp/shot-tools/`（gitignore）：

- 无头浏览器全量验证（Edge + puppeteer-core）：`node .claude-tmp/shot-tools/verify.mjs`（474 断言：主模板功能 / 全页 11 内容区学科切换 / 目录背景卡片与经历卡片 / 34 变体装饰显隐与学科内容匹配 / 切换残留回归 / 代表主题对比度 / 移动端 / 预览索引）。
- 依赖重装：`npm install --no-save --prefix .claude-tmp/shot-tools puppeteer-core`。

## 技术说明

- 无任何外部依赖与网络字体；字体为系统栈（中文回退 PingFang/微软雅黑，衬线 Georgia/Songti，楷体主题用 KaiTi/STKaiti）。
- 主题切换 = 整块替换 `<style id="theme-css">` 内容（`:root` token 覆盖层 + `body[data-theme]` 专属规则）；基座 CSS 全部走 `var()`，硬编码颜色会使换肤失效。`data-theme` 同时挂在 `<html>` 与 `<body>` 上（主题规则用 `body[data-theme]` 选择器）。
- 装饰三层：顶部 SVG sprite 66 个符号（`#main-*` 主图 160:100 横向、`#orn-*` 版块图标、`#mini-*-a/b` 点缀小图标，全部 stroke `currentColor` 随主题换色，同一学科五符不重形）+ 切换时 JS 交换 `<use href>`；学科纹样 = 主题 css 的 `--bg-pattern`（固定底层，`z-index:-1`）；整页水印 `.page-orn` 固定右下低透明（主图唯一位置，hero 区不重复放置）。
- 人大红主题只使用官方视觉识别：版块右上角装饰为官方校徽（`assets/ruc-emblem.svg` 浅色红色版 / `ruc-emblem-white.svg` 深色反白版），整页铺设极淡的官方校徽纹样层（`body::after`）；hero 照片后的水印已按用户要求删除（背景纹样已足够）；该主题隐藏全部学科小图标（`.mini-orn` display:none + JS 清空 use 引用）。素材为矢量，变体目录各存一份副本（css 的 `url()` 相对 HTML 文档目录解析）。
- 等待动画：hero 首屏入场（尊重 `prefers-reduced-motion`）；`.skel` 骨架呼吸占位类供嵌入大图等待加载时使用。
- 移动端：顶栏折叠为汉堡菜单；主题面板自适应宽度；左侧目录自动隐藏。

## 人大视觉识别

校徽红 `#971f30`（官方 VI，RGB 151,31,48）。校徽与标准字素材源：
`html-templates/lecture/ruc_beamer_templates/pic/`（矢量 SVG）与 `html-templates/中国人民大学视觉识别系统/`（官方 EPS/PSD，仅作标准参照）。
