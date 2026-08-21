---
name: 学术个人主页模板（Academic Personal Homepage）
description: 一套学科风格可迁移的学术主页模板——同一套内容骨架，34 套主题换肤，学科气质靠参照物传达。
colors:
  paper: "#f8f7f5"
  paper-dim: "#f2f0ed"
  card-paper: "#ece9e5"
  crimson-tint-weak: "rgba(151,31,48,.04)"
  crimson-tint: "rgba(151,31,48,.07)"
  ink-border: "rgba(90,30,35,.14)"
  ink-border-soft: "rgba(90,30,35,.08)"
  ink-border-strong: "rgba(90,30,35,.3)"
  ink: "#2a1d1a"
  ink-mid: "rgba(42,29,26,.78)"
  ink-low: "rgba(42,29,26,.58)"
  ink-faint: "rgba(42,29,26,.4)"
  crimson: "#971f30"
  crimson-deep: "#7c1524"
  ivory: "#fff8f4"
  crimson-soft: "rgba(151,31,48,.1)"
  crimson-dim: "rgba(151,31,48,.38)"
  antique-gold: "#8a6d3b"
  brick-rose: "#b03040"
  hero-grad-top: "#f9f4ec"
  hero-grad-mid: "#f1e7da"
  hero-grad-bottom: "#f8f5f1"
  code-paper: "#f0ede7"
  crimson-selection: "rgba(151,31,48,.22)"
  ink-scrollbar: "rgba(90,30,35,.22)"
  ink-scrollbar-hover: "rgba(90,30,35,.36)"
  ink-chip-bg: "rgba(90,30,35,.05)"
  chip-ink: "#7a5644"
  paper-translucent: "rgba(248,247,245,.86)"
typography:
  display:
    fontFamily: 'Georgia, "Times New Roman", "Songti SC", "SimSun", serif'
    fontSize: "46px"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "0.01em"
  headline:
    fontFamily: 'Georgia, "Times New Roman", "Songti SC", "SimSun", serif'
    fontSize: "24px"
    fontWeight: 700
    letterSpacing: "0.02em"
  title:
    fontFamily: 'Georgia, "Times New Roman", "Songti SC", "SimSun", serif'
    fontSize: "16.5px"
    fontWeight: 700
  body:
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "Source Han Sans SC", -apple-system, "Segoe UI", sans-serif'
    fontSize: "15px"
    lineHeight: 1.75
  label:
    fontFamily: 'Consolas, "SF Mono", Menlo, ui-monospace, monospace'
    fontSize: "12.5px"
    letterSpacing: "0.02em"
  scale:
    caption-en: "11px"
    toc-title: "11.5px"
    meta: "12px"
    badge: "12.5px"
    small: "13px"
    small-2: "13.5px"
    base: "14px"
    base-2: "14.5px"
    body: "15px"
    body-2: "15.5px"
    title-sm: "16px"
    title: "16.5px"
    subtitle: "17px"
    mark: "18px"
    year: "19px"
    headline: "24px"
    sprite-lg: "34px"
    display-mobile: "34px"
    display: "46px"
rounded:
  hairline: "1px"
  focus: "2px"
  swatch: "4px"
  thumb: "5px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "14px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "18px"
  lg: "20px"
  xl: "28px"
components:
  card:
    backgroundColor: "{colors.card-paper}"
    rounded: "{rounded.lg}"
    padding: "22px 24px"
  badge:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip:
    rounded: "{rounded.full}"
    padding: "5px 14px"
  soc-pill:
    rounded: "{rounded.full}"
    padding: "6px 14px"
---

# Design System: 学术个人主页模板（Academic Personal Homepage）

## Overview

**Creative North Star: "The Discipline Is the Frame"**

同一套内容骨架——关于我/研究方向/学术论文/科研项目/教学/荣誉奖励/学术报告/团队/联系九节——被 34 套主题反复装裱。每套主题的身份不靠换色成立，而靠学科的参照物在场：数学的尺规与方格纸、法学的天平与条文、统计学的正态曲线、文学的竹简与朱砂印、物理的原子轨道、经济学的供需曲线、金融学的 K 线烛图。访客 30 秒内知道「这是谁、做什么方向、怎么联系」，30 秒后记住所在学科的视觉母题。

视觉实现是「token 化基座 + 主题块」的严格分层。基座 CSS（`#base-css`）全部颜色走 `var()`，主题只是 37 个 token 的 `:root` 覆盖层加几条 `body[data-theme]` 专属规则，切换时整块替换 `<style id="theme-css">`。因此「换肤」不触碰任何结构、组件或排版，只换 token、装饰符号与底层纹样三样东西。默认打开主题是人大红浅色（`ruc-light`），其校徽红 `#971f30` 是中国人民大学官方视觉识别体系的锚色。

装饰系统分四层：整页右下角学科主图水印 `.page-orn`（`#main-*` 符号，低透明，全站唯一的主图位置——hero 区不重复放置）、版块标题右侧的学科纹样 `.sec-orn`（`#orn-*` 符号）、版块内容角落的小点缀 `.mini-orn`（按 `data-slot` 奇偶轮换两枚符号，人大红主题隐藏）、以及人大红主题专属的官方校徽背景层（`.sec-orn-vi` 版块校徽 + `body::after` 整页校徽纹样）。主图符号用 160×100 横向 viewBox，公式一行完整显示；版块纹样是独立绘制的第三套图形，与小图标零重复。所有装饰符号都是 `stroke="currentColor"` 的单色线条风，随主题 `--decor-ink` 换色。字体走系统栈，无 webfont、零外部依赖。深度是「扁平分层」：靠 `--bg-0/1/2` 三级纸面与两档软阴影建立层次，不出现硬偏移投影。

**Key Characteristics:**

- 37-token 设计令牌基座 + 34 套主题块；基座 CSS 一律 `var()`，硬编码颜色会使换肤失效。
- 学科气质靠参照物（装饰符号 + 底层纹样）传达，不靠换色；每套主题 3 枚色板（accent / 页面底 / 卡片底）。
- 66 个单色线条 SVG 符号（16 `main-*` 学科主图 160×100 横版 + 16 `orn-*` 学科纹样 96×96 + 32 `mini-*-a/b` 点缀 + 2 个 ruc 空壳），`currentColor` 随主题变色；同一学科的多枚符号互不重形。
- 默认主题为人大红浅色（校徽红 `#971f30`），系统栈字体、零 webfont、零运行时依赖。
- 中英双语 `data-zh`/`data-en` 双 span + `html[data-lang]` 显隐；主题/语言/目录折叠状态均记入 localStorage。

## Colors

色板不是一套，而是「37 个语义 token 槽位」：基座只引用语义槽（`--accent`、`--bg-2`、`--text-hi`…），34 套主题各自填值。以下 Primary/Neutral 分组取默认主题 `ruc-light` 的规范值作代表（值以 `theme-pack.js` 为准）；33 套其他主题在同一组槽位上填自己的学科色，换肤只换值、不改槽位语义。

### Primary
- **人大红 RUC Crimson**（`#971f30`）：默认主题的 accent。校徽红，官方 VI（RGB 151,31,48）。用于链接、时间线节点、年份数字、导航 active 下划线、徽章实底、按钮实底与主题面板选中态。同槽位兼 `--badge-bg`、`--btn-bg`。
- **沉红 Deep Crimson**（`#7c1524`）：accent 的 hover/加深态（`--accent-strong`），兼 `--code-ink` 与 `--btn-hover`。用于 `a:hover` 与选中态加强。
- **米白 Ivory**（`#fff8f4`）：accent 的反色墨（`--accent-ink`），落在 accent 实底上的文字色（徽章、按钮、`.ts-lang.on`），兼 `--badge-ink`、`--btn-ink`。
- **旧金 Antique Gold**（`#8a6d3b`）：次要强调 `--accent-2`（人大红主题的青铜金点缀）。槽位已定义但基座无组件消费——作为保留槽随主题派发。
- **砖玫瑰 Brick Rose**（`#b03040`）：装饰符号墨色 `--decor-ink`，专用于 `#orn-*`/`#mini-*` 线条与版块头符号，比主 accent 略亮，使低透明大符号不浑浊。

### Neutral
- **纸面 Paper**（`#f8f7f5`）：页面底色 `--bg-0`，正文承载面；半透明版 `rgba(248,247,245,.86)` 作 `--topbar-bg`。
- **纸面灰 Paper Dim**（`#f2f0ed`）：第二级底 `--bg-1`（移动端展开导航底色）。
- **卡片纸 Card Paper**（`#ece9e5`）：卡片/面板底 `--bg-2`，`card`/`rcard`/`member` 与主题切换面板的底色。
- **墨 Ink**（`#2a1d1a`）：正文主文字 `--text-hi`，暖黑（非纯黑）；其低透明阶梯 `rgba(42,29,26,.78/.58/.4)` 依次为 `--text-mid/--text-low/--text-faint`。
- **墨色 Tint**（`rgba(90,30,35,…)`）：边框三档 `--border/--border-soft/--border-strong`、滚动条 `--scrollbar/--scrollbar-hover`、chip 底 `--chip-bg` 与阴影色的共同墨色基。分隔线、描边、投影统一走这一墨色，不出现纯黑描边。
- **暖褐 Chip Ink**（`#7a5644`）：研究兴趣 chip 的文字色 `--chip-ink`，中性纸墨感，非 accent。
- **代码纸 Code Paper**（`#f0ede7`）：BibTeX 代码块底 `--code-bg`。
- **Hero 渐变三停靠**（`#f9f4ec` → `#f1e7da` → `#f8f5f1`）：`--hero-grad` 的首屏纵向渐变，顶部米金、中部暖沙、收束回纸面。

### 37-token 槽位总表（ruc-light 值）

| Token | 值 | Token | 值 | Token | 值 |
|---|---|---|---|---|---|
| `--bg-0` | `#f8f7f5` | `--accent-2` | `#8a6d3b` | `--sel-bg` | `rgba(151,31,48,.22)` |
| `--bg-1` | `#f2f0ed` | `--decor-ink` | `#b03040` | `--scrollbar` | `rgba(90,30,35,.22)` |
| `--bg-2` | `#ece9e5` | `--hero-grad` | `linear-gradient(180deg,#f9f4ec 0%,#f1e7da 55%,#f8f5f1 100%)` | `--scrollbar-hover` | `rgba(90,30,35,.36)` |
| `--surface-1` | `rgba(151,31,48,.04)` | `--bg-pattern` | `none` | `--chip-bg` | `rgba(90,30,35,.05)` |
| `--surface-2` | `rgba(151,31,48,.07)` | `--shadow-float` | 见 Elevation | `--chip-ink` | `#7a5644` |
| `--border` | `rgba(90,30,35,.14)` | `--shadow-card` | 见 Elevation | `--topbar-bg` | `rgba(248,247,245,.86)` |
| `--border-soft` | `rgba(90,30,35,.08)` | `--code-bg` | `#f0ede7` | `--badge-bg` | `#971f30` |
| `--border-strong` | `rgba(90,30,35,.3)` | `--code-ink` | `#7c1524` | `--badge-ink` | `#fff8f4` |
| `--text-hi` | `#2a1d1a` | `--accent` | `#971f30` | `--btn-bg` | `#971f30` |
| `--text-mid` | `rgba(42,29,26,.78)` | `--accent-strong` | `#7c1524` | `--btn-ink` | `#fff8f4` |
| `--text-low` | `rgba(42,29,26,.58)` | `--accent-ink` | `#fff8f4` | `--btn-hover` | `#7c1524` |
| `--text-faint` | `rgba(42,29,26,.4)` | `--accent-soft` | `rgba(151,31,48,.1)` | 字体四件套 | 由 `_font` 键映射 |
| | | `--accent-dim` | `rgba(151,31,48,.38)` | | |

### Named Rules
**The Three-Swatch Rule.** 每套主题由恰好 3 枚色板定义并呈现在切换面板：`[accent, 页面底, 卡片底]`。色板是主题的速写，比 37 个 token 浓缩，是用户对主题的第一眼感知。
**The Var-Only Rule.** 基座 CSS 的任何颜色都必须走 `var()`；硬编码颜色会在换肤时失效。新增组件只能引用语义槽，不得写死 hex。基座里唯一例外是 `.ts-dot` 的 `rgba(0,0,0,.12)` 内圈描边阴影——它是跨主题恒定的「色板描边」，记录在 sidecar 阴影档。
**The Accent-On-Composite Rule.** accent 文字在 `--bg-2` 与 `--accent-soft` 合成面上必须 ≥4.5:1（亮色主题）；暗色主题正文 ≥7:1、accent 合成面 ≥4.5:1。小号 accent 文字（年份、时间线时间）最容易踩线，先算后改。
**The Reserved-Slot Rule.** `--accent-2`、`--surface-2`、`--btn-bg`、`--btn-ink`、`--btn-hover` 五个槽位在 34 套主题中已定义，但当前基座尚无组件消费。它们是主题契约的保留槽，不是缺陷，也不该据此虚构一个不存在的实底主按钮。

## Typography

**Display Font:** Georgia / "Times New Roman" / "Songti SC" / "SimSun"（衬线，`--font-display`）
**Body Font:** PingFang SC / Microsoft YaHei / Hiragino Sans GB / Source Han Sans SC（无衬线，`--font-sans`）
**Label/Mono Font:** Consolas / SF Mono / Menlo / ui-monospace（`--font-mono`）

**Character:** 衬线标题 + 无衬线正文的「学报」气质；数字一律等宽（`tabular-nums`），年份、时间线时间、卷期用 mono 呈现「文献」的严谨。字体随主题由 `_font` 键切换显示体：文学主题用楷体（KaiTi/STKaiti）标题，数理/计算机/商科主题用无衬线标题，其余默认衬线。字号为一个精确的 18 级步进（11–46px），不夹任何中间值。

### Hierarchy
- **Display**（700，46px，line-height 1.18）：Hero 姓名（`hero-name`）。仅此一处；文学主题降为 400，560px 断点降为 34px。
- **Headline**（700，24px，letter-spacing 0.02em）：版块标题 `h2`，右侧缀 13px 的英文副题（`en-sub`，`--text-faint`）。
- **Title**（700，16.5px）：卡片 `h3`（研究/项目卡、招募卡标题）。
- **Body**（400，15px，line-height 1.75）：正文，卡片内段落略降至 14–14.5px、行高 1.8。正文最小 14px。
- **Label**（mono，12.5px，letter-spacing 0.02em）：时间线时间、年份分组数字（19px 粗体）、BibTeX 代码、联系方式。数字用 tabular-nums 对齐。

### Named Rules
**The No-Wefont Rule.** 不引任何网络字体与 CDN；全部回退系统字体栈（中文 PingFang/微软雅黑，衬线 Georgia/Songti，楷体 KaiTi/STKaiti）。新增主题不得引入 webfont。
**The 0.04em Rule.** 中文字距 ≤0.04em。基座里 letter-spacing 收敛在 0.01–0.03em；超过 0.04em 是检测红线。
**The Fixed-Ramp Rule.** 字号只取 18 级步进（11 / 11.5 / 12 / 12.5 / 13 / 13.5 / 14 / 14.5 / 15 / 15.5 / 16 / 16.5 / 17 / 18 / 19 / 24 / 34 / 46 px），新增文案不得夹带中间值。

## Layout

单页锚点滚动，容器 `max-width:1120px`、左右 28px 内边距（560px 以下 18px），主内容居中。顶部 sticky 导航栏高 62px（backdrop blur 14px），六项锚点（关于/研究/论文/教学/荣誉/联系）覆盖九节内容（另有项目/报告/团队节，不占顶栏）。版块垂直节奏：`section` 上下 72px/8px，`scroll-margin-top:74px` 让锚点落在导航下方。

Hero 为两栏 `1.15fr / .85fr`、gap 84px（左：姓名/职称/徽章/兴趣 chips/联系与社交；右：3:4 照片卡），`padding-left:clamp(16px,3.5vw,56px)` 给窄视口下文字与背景左缘留白；背景 `--hero-grad` 渐变层（主图不放置于 hero，只保留整页右下水印）。通用网格两个：`duo` 双栏（1fr/1fr，gap 20px）与 `grid3` 三栏（repeat(3,1fr)，gap 18px）。

断点三档：**1360px** 起左侧折叠目录 `.toc` 显示（200px 宽，主容器改为 1080px 左移）；**900px** 时 Hero 改单列、grid3 落两列、duo 落单列、导航折叠为汉堡菜单；**560px** 时 grid3 单列、Hero 姓名降为 34px、主题面板全宽、contact 行改纵向。间距节奏以 8px 为步进基，常用 gap 8/14/18/20/28，卡片内边距 22–24px。

## Elevation & Depth

系统是「扁平分层」而非投影分层。深度主要由三级纸面 `--bg-0 → --bg-1 → --bg-2` 加两档半透明着色层 `--surface-1/--surface-2`（accent 的低透明 tint）建立；卡片靠纸面层级 + 细边框区分，投影只作柔性环境光，不作结构分隔。硬偏移（如 4px/8px 实色偏移）投影明确不使用。

### Shadow Vocabulary
- **float**（`0 10px 14px -6px rgba(90,30,35,.16), 0 2px 6px -2px rgba(90,30,35,.1)`）：浮层用，主题切换按钮与面板、照片卡。
- **card**（`0 1px 2px rgba(90,30,35,.05), 0 3px 10px -3px rgba(90,30,35,.12)`）：卡片/成员卡的静息投影，极淡。
- **swatch-ring**（`inset 0 0 0 1px rgba(0,0,0,.12)`）：主题面板色板点 `.ts-dot` 的内圈描边，跨主题恒定的唯一硬编码阴影。

### Named Rules
**The Blur-Cap Rule.** 阴影 blur ≤14px（「细边框 + 宽阴影」是检测项）；阴影色一律走主题的墨色 tint（`rgba(90,30,35,…)` 低透明），暗色主题 tint 收敛为黑。新增投影不得放大模糊半径或引入实色偏移。

## Shapes

圆角语言克制，无直角裁切冲突。完整九档步进：**1px**（导航 active 下划线）、**2px**（`:focus-visible` 焦点环）、**4px**（主题色板点 `.ts-dot`）、**5px**（滚动条 thumb）、**6px**（论文按钮、卷宗标签、BibTeX 代码块、复制按钮、语言分段控件）、**8px**（导航链接、语言/汉堡按钮、主题 chip、TOC 手柄与项、骨架 `.skel`、BibTeX 容器）、**12px**（卡片/研究卡/成员卡/招募卡/切换方块）、**14px**（照片卡、主题面板）、**999px** 胶囊（人才徽章、研究兴趣 chip、社交链接）。圆头像与时间线节点用 `50%` 圆形。边框一律 1px 细线，按层级三档透明（`--border`/`--border-soft`/`--border-strong`）。照片卡用 14px 圆角 + 5px 内圈描边（`inset 0 0 0 5px var(--bg-0)`）形成「裱框」轮廓。

### Named Rules
**The Pill-Is-Identity Rule.** 胶囊（999px）只用于个人身份物（徽章、chips、社交、头像）；内容容器（卡片、面板）用 12–14px 直角圆角。二者不可混用。

## Components

### Cards / Containers
- **Corner Style:** 12px（`.card`/`.rcard`/`.member`/`.recruit`），照片卡与主题面板 14px。
- **Background:** `--bg-2` 底，1px `--border-soft` 描边，`--shadow-card` 投影。
- **Internal Padding:** 22px 24px（`.card`），24px（`.rcard`），成员卡 16px 18px，招募卡 20px 24px。

### Chips / Badges / Social Pills
- **Chip（研究兴趣）:** 胶囊，`--chip-bg` 底 + `--chip-ink` 字 + 1px `--border-soft`；仅 hover 收边框。是「中性纸墨」标签，非 accent。
- **Badge（人才称号）:** 胶囊实底，`--badge-bg`/`--badge-ink`（即 accent 实底 + ivory 反字），前导 5px 圆点；是页面仅有的实底强调物。
- **社交胶囊 `.soc`:** 胶囊空心（1px `--border`），hover 转 accent 字 + `--accent-soft` 底。

### Buttons（空心，无实底主按钮）
系统没有 accent 实底主按钮——所有按钮都是空心描边 + hover 填充 tint。论文按钮 `.pbtn`（6px，1px `--border`，hover 转 accent 字 + `--accent-soft` 底）、复制按钮 `.copy-btn`（6px，`--accent-dim` 描边 + accent 字）、语言按钮 `.lang-btn`（8px，1px `--border`）。主题切换方块 `.ts-btn` 是唯一的右下角浮层按钮（12px，`--bg-2` 底 + `--shadow-float`，hover 上浮 2px、active 缩 0.95）。

### Navigation
顶部 sticky 栏 62px，左品牌（8px 圆角 `--badge-bg` 方块字标 + 姓名/副题）、中六锚点、右语言/汉堡。导航链接 8px 圆角、hover 铺 `--surface-1`、active 转 accent 字 + 底部 2px accent 下划线（移动端改为 accent-soft 底）。900px 以下折叠为汉堡下拉。

### 左侧目录 TOC（Signature Component）
1360px 断点起显示在左侧（200px 宽，`top:76px`），六项锚点与顶栏同步高亮（IntersectionObserver）。`.toc-handle` 按钮折叠/展开（`transform:translateX(-162px)`，状态记忆键 `homepage-toc`），`.toc-item` 8px 圆角、前导 6px 圆点 `.toc-dot`，active 时转 accent 字 + accent 圆点。

### 装饰符号系统（Signature Component）
页面顶部一个 `width=0` 的 SVG sprite 承载 66 个 `<symbol>`（`stroke="currentColor"` 单色线条风），分三组：16 个 `main-*` 学科主图用 **160×100 横向 viewBox**，公式一行完整显示（数学的欧拉恒等式与泰勒展开、统计的正态密度与 Lasso、物理的薛定谔方程与费曼图、文学的竹简竖排诗句等）；16 个 `orn-*` 学科纹样是独立绘制的第三套全新 96×96 图形（双纽线、法槌、芯片、箱线图、显微镜、卷轴、国会穹顶、线装书、温度计、地球仪、柱廊、广播塔、饼图、趋势箭头、干涉波纹、无差异曲线族），与主图、小图标零重复；32 个 `mini-*-a/b` 版块小点缀仍为 96×96。另加 2 个 ruc 空壳（`orn-ruc`/`main-ruc`，人大红主题不自绘符号、用官方校徽）。

**同一学科五符不重形**：每个学科的主图、版块纹样、两枚小点缀（以及主图内的公式与图形母题）互不借用形状，主题身份由一组各自独立的参照物共同构成，而非同一图形的缩放复用。

切换主题时 JS 交换 `<use href>`：`.page-orn`（整页右下水印，`min(52vw,680px) × min(32.5vw,425px)`，透明度 .05，主图唯一位置）用 `main-*`；`.sec-orn` 与 `.sec-orn-vi`（版块头，34×34px）分别用 `orn-*` 与官方校徽背景图；`.mini-orn`（26×26px）按 `data-slot` 奇偶在 `mini-*-a/b` 间轮换。人大红主题另启官方校徽背景层（`body::after` 整页 180px 重复纹样，透明度 0.035–0.12），并隐藏全部学科小图标（`.mini-orn` display:none + JS 清空 use 引用）。

### 时间线 / BibTeX
时间线左 1px `--border` 轴线，节点为 accent 描边空心圆（9px），时间用 mono accent 字。BibTeX 为 `<details>` 折叠：虚线描边、`--code-bg` 底、`--code-ink` mono 字、复制按钮复制 `pre` 原文。

### 招募卡（Recruit Callout）
团队节底部的招生文案卡：`--accent-soft` 底 + 1px `--accent-dim` 描边 + 12px 圆角，标题用 `--accent-strong`。是 accent tint 用作「整块容器」的唯一实例，区别于中性的纸面卡片。

### 骨架屏（Skeleton）
嵌入大图等待加载时的占位：`.skel`（`--surface-2` 底 + 8px 圆角）以 1.6s ease-in-out 的透明度呼吸动画占位；`prefers-reduced-motion` 下停用动画。

## Do's and Don'ts

### Do:
- **Do** 用语义 token 槽（`--accent`、`--bg-2`、`--text-hi`…）写任何基座颜色，新增组件只引用槽位，不写死 hex。
- **Do** 给每套新主题写全 37 个 token 槽位（`TOKEN_ORDER` 顺序）并指定 `decor` 与 `_font`；缺项会使 `buildCss` 漏写变量。
- **Do** 新增学科装饰用 `stroke="currentColor"` 单色线条 `<symbol>`：主图 160×100 横版（公式一行放得下），版块纹样与点缀 96×96，且不得与该学科既有符号重形。
- **Do** 让小号 accent 文字（年份、时间线时间）先验证 `--bg-2` 上 ≥4.5:1 对比度，再落值。
- **Do** 阴影 blur 保持 ≤14px，色值走墨色 tint；分隔用 `·` 或 en-dash（`–`），正文避免 em-dash（`—`）。
- **Do** 双语文案成对书写 `data-zh`/`data-en`，由 `html[data-lang]` 统一显隐。
- **Do** 圆角只取九档步进（1/2/4/5/6/8/12/14/999），字号只取 18 级步进。

### Don't:
- **Don't** 用「换色即换主题」——学科气质靠参照物（装饰符号 + 底层纹样）在场，不靠只改 accent。
- **Don't** 在基座 CSS 里写硬编码颜色或引入 webfont/CDN 字体；两者都会破坏换肤与大陆可达性。
- **Don't** 引入硬偏移投影（实色 4px/8px 偏移）或放大阴影模糊超过 14px。
- **Don't** 把胶囊圆角（999px）用到内容容器上；容器用 12–14px，胶囊专属身份物。
- **Don't** 因 `--btn-bg/--btn-ink/--btn-hover` 槽位存在而虚构一个实底主按钮——当前基座没有该组件，按钮一律空心描边。
- **Don't** 在同一学科的多个符号间复用同一图形的缩放版本；每枚符号保持独立形状（五符不重形）。
- **Don't** 手改 `style_previews/*.html` 或 `theme-pack.js` 之外的主题数据；预览变体是生成产物，重跑会被覆盖。
