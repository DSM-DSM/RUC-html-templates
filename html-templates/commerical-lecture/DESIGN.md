---
name: "AI × 科研 · 能力汇报（commerical-lecture 模板）"
description: "三条叙事线汇于一个终点的暗色演示模板——Linear 暗基底 + Superhuman twilight 星云 + 单一薰衣草 accent"
colors:
  primary: "#cbb7fb"
  neutral-bg: "#08090a"
  surface-1: "#0f1011"
  surface-2: "#17181c"
  deep: "#1b1938"
  deep-0: "#0b0a1c"
  border: "rgba(255,255,255,.08)"
  border-soft: "rgba(255,255,255,.05)"
  btn-bg: "#e9e5dd"
  btn-ink: "#292827"
  text-hi: "#f7f8f8"
  text-mid: "rgba(255,255,255,.85)"
  text-low: "rgba(255,255,255,.58)"
  text-faint: "rgba(255,255,255,.36)"
  atmosphere-indigo: "#5e6ad2"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', sans-serif"
    fontSize: "clamp(32px, 5.2vw, 54px)"
    fontWeight: 500
    lineHeight: 1.32
    letterSpacing: "0.02em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', sans-serif"
    fontSize: "clamp(26px, 3.4vw, 36px)"
    fontWeight: 500
    letterSpacing: "0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', sans-serif"
    fontSize: "clamp(22px, 2.6vw, 28px)"
    fontWeight: 500
    letterSpacing: "0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Mono', Consolas, 'Segoe UI Mono', monospace"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.02em"
  numeral:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', sans-serif"
    fontSize: "clamp(64px, 9vw, 96px)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.01em"
  micro:
    fontSize: "11px"
  caption:
    fontSize: "13px"
  small:
    fontSize: "14px"
  ui:
    fontSize: "15px"
  emphasis:
    fontSize: "17px"
  card-title:
    fontSize: "20px"
  card-num:
    fontSize: "34px"
  metric:
    fontSize: "40px"
  preview-num:
    fontSize: "56px"
  watermark:
    fontSize: "clamp(110px, 16vw, 200px)"
  watermark-mobile:
    fontSize: "120px"
  slide-title:
    fontSize: "clamp(24px, 3vw, 32px)"
rounded:
  hairline: "1px"
  thumb: "5px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.btn-bg}"
    textColor: "{colors.btn-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "#f4f1ea"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-mid}"
    rounded: "{rounded.sm}"
    padding: "11px 27px"
  chip:
    backgroundColor: "rgba(255,255,255,.02)"
    textColor: "{colors.text-mid}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  card:
    backgroundColor: "rgba(255,255,255,.02)"
    rounded: "{rounded.lg}"
    padding: "28px 32px"
---

# Design System: AI × 科研 · 能力汇报（commerical-lecture 模板）

## Overview

**Creative North Star: "星夜叙事轴（The Starlit Axis）"**

这是一场在暗色星空下展开的能力汇报：页面不是组件陈列，而是一条从「个人」走向「团队」、最终「汇于一处」的叙事轴。暗场底色（Linear `#08090a`）是黑夜本身，内容如星光浮出；唯一强调色薰衣草紫（Superhuman `#cbb7fb`）收束为一个 signature——沿着脊柱滚动的脉冲光点，沿途点亮三个节点，最后在汇流处汇聚成核心光。整个系统靠「一条线、一个光点」完成 AI 元素的表达，拒绝堆砌。

风格气质来自四系统的合成：Linear 供给暗色基底、半透明白边框与亮度分层；Superhuman 供给 twilight 深紫星云（`#1b1938` / `#0b0a1c`）与薰衣草 accent；Stripe 供给「轻字重大数字」（weight 300 的章号与指标）与蓝调浮影；IBM 供给结构节奏、token 化与 mono 技术标签。落地时四者不是拼贴，而是统一到「克制的高级感」：暗场 + 单一紫 accent + 暖奶油 CTA（`#e9e5dd`）+ 无斜体无装饰的中文排版。

密度呈三段式：开场 hero 星云最空灵、留白最大；overview 以非对称预览卡与能力快照承载信息；章节 slide deck 密度最高、信息结构化。全站无 CDN、无外部字体、双击 `file://` 可离线演示（fetch 需本地服务器）。

**Key Characteristics:**
- 暗色原生基底 `#08090a`，层级靠白透明度（`rgba(255,255,255,.02` 面 / `.05` / `.08` 边框）而非色彩
- 单一交互 accent 薰衣草紫 `#cbb7fb`；冷靛 `#5e6ad2` 仅以 4%–12% 低透明度存在于星云与章节背景的「大气」中
- 暖奶油 `#e9e5dd` 主 CTA + 深墨 `#292827`，是唯一高饱和反色
- 系统字体栈（中文合规），无 CDN 字体、无斜体
- 轻字重大数字（weight 300）+ 中等字重标题（weight 500），Stripe × Linear 字重气质
- 叙事轴脉冲光点 signature（traveler → 节点点亮 → 汇流核心光），零偏移薰衣草光晕
- 混合式交互：开场自然滚动 → 三章全屏 slide deck → 汇流收尾，`prefers-reduced-motion` 完整降级

## Colors

调色板是一条「深紫夜空」上的单一高亮：暗场由近黑蓝到 twilight 深紫渐变，唯一发光的颜色是薰衣草紫，唯一的高饱和反色是暖奶油。

### Primary
- **Lavender Glow 薰衣草光** (`#cbb7fb`): 系统唯一的交互 accent。用于 hero 高亮词、章号、节点、路径、rail 激活点、按钮 focus 环、hover 边框、selection 底色。不用于大块背景填充——它永远以「光点 / 细线 / 小面积」的形式出现，稀缺是它的意义。

### Neutral
- **Midnight Canvas 午夜底** (`#08090a`): 页面最深背景，hero 星云落入的目标色，也是数据失败面板底色。
- **Surface One** (`#0f1011`): 一档上移的面板底，产品截图框与错误卡片底。
- **Surface Two** (`#17181c`): 截图框顶部色条与占位 SVG 内层，最浅的「实」面。
- **Twilight Deep 深紫** (`#1b1938`): 星云渐变中段（`--deep-0` 到 `--bg-0` 之间），Superhuman 暮色。
- **Void Deep 深紫底** (`#0b0a1c`): 星云渐变起点、favicon 底，比午夜底更偏紫。
- **Whisper Border 细语边框** (`rgba(255,255,255,.08)`): 标准边框——chip、截图框、deck 圆钮、ghost 按钮、code 框。
- **Soft Border 柔边框** (`rgba(255,255,255,.05)`): 更弱的边框——顶栏下缘、预览卡、能力列表分隔、指标分隔、页脚。
- **Text Hi** (`#f7f8f8`): 主标题与强调文字，非纯白。
- **Text Mid** (`rgba(255,255,255,.85)`): 暗色正文，对比度 ≥ 7:1。
- **Text Low** (`rgba(255,255,255,.58)`): 次级说明、副题、导语。
- **Text Faint** (`rgba(255,255,255,.36)`): 元数据、占位说明、章背景数字。
- **Btn Bg 按钮底** (`#e9e5dd`，默认夜航值): 主 CTA 背景，唯一高饱和反色。token 名为 `--btn-bg`/`--btn-ink`/`--btn-hover`，由主题包按主题重定义（亮色主题改为深紫/蓝/朱砂实心按钮）。
- **Atmosphere Indigo 冷靛大气** (`#5e6ad2`): 仅以 `rgba(94,106,210,.12)` 与 `.045` 出现在星云 g2 光斑与章节背景，营造冷调对位。**不是**第二个 accent——永不作为文字、边框、CTA 或交互色。

### Named Rules
**The One Accent Rule（唯一强调色规则）。** 交互色只有薰衣草紫 `#cbb7fb` 一个。冷靛 `#5e6ad2` 是「大气」而非 accent：它只存在于低透明度星云/背景光斑中，永不得上到文字、边框、按钮或任何可交互元素。

**The Whisper Border Rule（细语边框规则）。** 边框永远是半透明白（`.05` 或 `.08`），从不用不透明深色实线。用细线在月光里画结构，而不是描边。

## Typography

**Display/Body Font:** 系统字体栈（`-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif`）——中文合规、零 CDN、离线可用。
**Label/Mono Font:** 系统 mono 栈（`ui-monospace, "SF Mono", "Cascadia Mono", Consolas, "Segoe UI Mono", monospace`）——编号、技术标签、rail 计数。

**Character:** 无装饰性展示字体；气质来自字重而非字体——标题用 500（比常规略重、不吼），大数字用 300（Stripe 式轻盈权威），技术标签用 mono 小字（IBM 式工程感）。中文全部无负字距、无斜体。

### Hierarchy
- **Display** (500, `clamp(32px, 5.2vw, 54px)`, 1.32, `.02em`): hero 主标题两行，逐行 rise 入场，`title_line2` 中可用 `<span class="hl">` 标紫。
- **Headline** (500, `clamp(26px, 3.4vw, 36px)`, `.02em`): 段落大标题（overview「三条线，一个终点」、closing「三条线，汇于一处」）。
- **Title** (500, `clamp(22px, 2.6vw, 28px)`, `.01em`): slide 标题、skill 名、预览卡标题（featured 22px / 半宽 17px）。
- **Numeral** (300, `clamp(64px, 9vw, 96px)`, 1, `-.01em`): 章号、预览卡大数字（featured 56px / 半宽 34px）、能力快照值（40px）、指标值（26px）。`font-variant-numeric: tabular-nums` 保证等宽对齐。
- **Body** (400, 16px, 1.75): 标准正文，行高 1.75（≥1.5 中文规范）。
- **Label** (400, 12px, mono): 编号、技术标签、`col-heading` / `caps-heading` / `b-step`、rail 计数（`writing-mode: vertical-rl`、`.14em`）。

### Component Ramp（组件级字号全档位）
六大层级之外，组件内部使用以下全档位（有意的组件级步骤，非层级漂移）：**11px**（切换面板「默认」角标）、**12px**（mono 标签）、**13px**（chip / deck 标签 / 卡片描述 / 指标标签）、**14px**（预览卡主题句 / 构建步骤描述 / 切换面板选项 / 顶栏品牌名）、**15px**（按钮 / 正文强化 / skill 目的段）、**17px**（线主题句 / 预览卡半宽标题）、**18px**（hero 副题 16px、slide 主题句 17px 的邻近档）、**20px**（预览卡 featured 标题）、**34px / 56px**（预览卡半宽 / featured 大数字）、**40px**（能力快照值）、**26px**（产出指标值）、**120px**（章节水印 `clamp(110px,16vw,200px)` 桌面档）。流体标题端点：`clamp(24px,3vw,32px)`（slide 标题）、`clamp(32px,5.2vw,54px)`、`clamp(26px,3.4vw,36px)`、`clamp(22px,2.6vw,28px)`、`clamp(64px,9vw,96px)`。

### Named Rules
**The 300-Numeral Rule（轻数字规则）。** 大数字永远 weight 300——它靠轻盈而非重量建立权威。标题是 500，正文是 400，数字是 300；三档字重，无 700 粗体。

**The No-Negative-CJK Rule（中文禁负字距规则）。** 负字距（`-.01em` 到 `-.02em`）只出现在纯半角数字/章号元素上；任何含中文字符的文本一律正字距或 0。中文标题统一 `.01em`–`.02em` 正字距。

**The No-Italic Rule（无斜体规则）。** 全站不出现斜体。`em` 与 `i` 仅作语义标签，样式强制 `font-style: normal`（中文无斜体传统）。

## Layout

**容器**：内容列 `width: min(1120px, 100% - clamp(40px, 8vw, 160px))` 居中；顶栏 `padding: 0 clamp(20px, 4vw, 40px)`、固定高 56px。

**页面结构（混合式）**：三个「自然滚动 stage」（hero → overview → closing）之间插入三个「全屏 slide deck chapter」。hero 与 chapter 各占 `100vh`（min-height 640px / 620px）。chapter 内 `touch-action: none`，滚轮/键盘/翻页笔/触摸驱动翻页；末页后回到自然滚动进入下一章。

**间距节奏**：以 8px 为基的宽松节奏（16 / 24 / 32 / 40 / 56 / 64 / 72 / 96），段落呼吸 96–140px，段落间距用更大的留白而非分隔线（除页脚与指标行顶部分隔线外）。存在 10 / 12 / 14 / 18 / 20 / 28 / 44 等光学微步用于紧贴对齐——间距是「光学节奏」而非严格 token 栅格。

**密度**：hero 空灵（大片星云留白）→ overview 中等（非对称卡 + 快照）→ slide 最密（两列 `1.05fr .95fr`、gap 72px，含产出列表与构建步骤）。章节背景右上角有一枚巨大的半透明章号（`rgba(255,255,255,.04)`、weight 300、`-.02em`）作为章节水印。

**响应式**：`1024px` 收紧两列 gap、章号降至 120px；`760px` 隐藏导航文字、横向脊柱切换为竖向 `spine-v`、预览卡与两列转单列、rail 隐藏、slide 内容改 `overflow-y: auto` 优先滚动；`480px` 截图框全宽、产品纵向堆叠。

## Elevation & Depth

**扁平为主、阴影克制**。深度靠三种手段，而非阴影：半透明白边框（`.05` / `.08`）、面亮度分层（`#08090a → #0f1011 → #17181c` 与 `rgba(255,255,255,.02 → .04 → .05`）、星云渐变与光晕的「大气纵深」。全站仅一处真实投影。

### Shadow Vocabulary
- **Float 浮影** (`box-shadow: 0 24px 48px -16px rgba(0,0,0,.55), 0 8px 16px -8px rgba(10,8,30,.4)`): 只用于产品截图框 `.shot`——Stripe 式蓝调多层阴影，第二层 `rgba(10,8,30,.4)` 是带深靛底色的近色层，让「截图漂浮在星空里」。负 spread 使阴影不外溢、垂直可控。

### Named Rules
**The Flat-By-Default Rule（静默扁平规则）。** 面在静止时无阴影，靠边框与亮度分层；阴影只出现在需要「悬浮」的截图框上。唯一的半透明毛玻璃是滚动后顶栏的 `backdrop-filter: blur(14px)`。

## Shapes

**小圆角克制**。圆角体系极简：1px（导航下划线 / col-heading 短线端点）、5px（滚动条拇指）、6px（按钮）、8px（截图框）、12px（卡片）、9999px（chip 药丸）、50%（deck 圆钮、rail 点、drift 星、构建步骤节点）。无大圆角、无复杂裁剪。

**几何母题**：圆形是贯穿全站的形状——节点、光点、halo、rail 点、圆钮、呼吸星。脊柱终点是一枚 45° 旋转的方点（`spine-end`，`10×10 rx:1.5`）。星座网络与汇流三线是仅有的两处 SVG 构图，均以 `stroke-linecap: round`、1–1.5 描边、低透明度紫渐变。

**边框语言**：见 Whisper Border Rule。卡与面用 `rgba(255,255,255,.02)` 半透明底 + 半透明白边，从不用不透明填充块。

## Components

### Buttons
- **Shape:** 6px 圆角，`transform: scale(.97)` 按压反馈。
- **Primary（奶油）** `.hero-cta` / `.btn-cream`: `#e9e5dd` 底 + `#292827` 字，`12px 28px`，15px/500。hover `#f4f1ea`。唯一高饱和 CTA，只出现在 hero 与 closing。
- **Ghost** `.btn-ghost`: 透明底 + `rgba(255,255,255,.85)` 字 + `1px solid rgba(255,255,255,.08)` 边，`11px 27px`，6px。hover 底 `.05`、字 `#f7f8f8`、边 `.18`。
- **Deck 圆钮** `.deck-btn`: 44px 圆，`1px` 边 + `.02` 底，内嵌 16px SVG 箭头。hover 边 `rgba(203,183,251,.5)`。deck 底部 prev/next 翻页。
- **章节导航** `.chapter-nav-btn`: 无边框文字钮，mono 章号 + 标题，`::after` 下划线 `2px` 薰衣草 `scaleX(0→1)`、`transform-origin: left` 作激活态。hover 字转 `#f7f8f8`。
- **主题切换器** `.theme-switch`: 顶栏右端 40px 圆形 `.ts-btn`（半月图标）+ 264px `.ts-panel`（`position: fixed` 动态定位防裁剪，token 化底色/边框/浮影，随主题自动换肤）。面板选项 = 三色 swatch 圆点 + 主题名 + 选中对勾，点击即切、localStorage 持久化、ESC / 外点关闭。

### Chips
- **Style:** 药丸 9999px，`1px solid rgba(255,255,255,.08)` 边 + `rgba(255,255,255,.02)` 底，13px `text-mid`。线序言页展示该线 skill 名。

### Cards / Containers
- **预览卡** `.preview-card`: 12px 圆角，`1px solid rgba(255,255,255,.05)` 边 + `rgba(255,255,255,.02)` 底，`28px 32px`。featured（首卡）横跨两列、行布局、`36px 40px`。hover 边 `rgba(203,183,251,.45)`、底 `.04`、`translateY(-2px)`，箭头右移 4px。
- **产品截图框** `.shot`: 8px 圆角，`1px solid rgba(255,255,255,.08)` 边 + `#0f1011` 底 + `--shadow-float` 投影。占位时内置虚线框 + 「产品截图占位」标注（诚实占位），`shot` 字段填入路径则渲染真实截图。

### Navigation
- **顶栏** `.topbar`: 固定 56px，左品牌（SVG 三节点星 + 14px/500 名）、右章节导航。滚动后 `rgba(8,9,10,.78)` + `blur(14px)` + 下缘 `.05` 边。当前章以 `.on` 点亮（章号转紫 + 下划线满格）。

### Signature: 叙事轴（Spine）与汇流（Converge）
- **Spine**：overview 的横向脊柱 SVG，滚动驱动 `traveler` 光点沿路径移动，沿途点亮三个 `spine-node`（halo 紫晕 + 点亮编号）。移动端切换为竖向 `spine-v`（`scaleY` 进度填充 + 点亮节点）。
- **Converge**：closing 三线 SVG，进入视口时以 `stroke-dashoffset` 绘制动画依次描出三线，最后核心光点 + halo 脉冲点亮，呼应「三条线汇于一处」。

## Theming（主题系统）

**架构：token-overlay + theme-pack.js 单一数据源。** 基座 `index.html` 的 `:root` 定义全部颜色/字体/浮影 token（约 40 个，含星云、星座、脊柱、汇流、浏览器表面），组件 CSS 一律 `var(--token)`，不写硬编码颜色。`theme-pack.js`（UMD）是 6 套主题的唯一数据源：每套主题 = 一段 `:root` token 覆盖 CSS（约 40 行）+ 可选的 `body[data-theme]` 专属装饰（如蓝图的坐标网格）。运行时切换 = 把该段 CSS 注入 `<head>` 末尾的 `#theme-overlay` `<style>`（级联晚于基座即生效）；选回默认主题 = 清空 overlay。持久化 key `commerical-lecture-theme`，恢复顺序 localStorage → 页面默认（`<body data-default-theme>`），非法值忽略。

**7 套主题（3 暗 4 亮，全部零外部依赖）：**

| id | 名称 | 明暗 | accent | 字体层 | 签名 |
|---|---|---|---|---|---|
| twilight | 夜航（默认） | 暗 | 薰衣草 `#cbb7fb` | 系统栈 | twilight 星云 + 奶油 CTA |
| dawn | 晨雾 | 亮 | 深紫 `#5b3fd4` | 系统栈 | 浅紫晨雾渐变，夜航的昼版 |
| blueprint | 蓝图 | 亮 | 工程蓝 `#1d4ed8` | Bahnschrift + 等线 | 坐标网格背景 |
| ink | 宣纸 | 亮 | 朱砂 `#b3442f` | Georgia + 宋体 | 暖纸底 + 书卷气 |
| starmap | 星图 | 暗 | 金 `#e6c26a` | Palatino + 宋体 | 密星点阵 + 金色星轨 |
| nocturne | 墨夜 | 暗 | 朱砂亮 `#d4563c` | Georgia + 宋体 | 暖黑墨底，宣纸的夜版 |
| ruc | 人大红 | 亮 | 校徽红 `#971f30` | 系统栈 | 红底顶栏 + hero 左侧竖版校徽组合 + 白底页脚红分隔线 |

**人大红主题的结构性覆盖**（`body[data-theme='ruc']` 专属规则，随该主题 css 注入）：顶栏恒为校徽红实底（非滚动态也常显），品牌位改白字白图标（红底对比度 8.2:1）；`.hero-logo`（`.hero-logo` 插槽，默认隐藏）在 hero 内绝对定位于**最左侧、导航栏下方**（`left: clamp(28px,5vw,72px)`、`top:96px`、`bottom:24px` 垂直居中、`pointer-events:none`），内含「官方单色校徽矢量 `assets/ruc-emblem.svg`（108px）+ 『中国人民大学』17px/600/`.14em` + 『RENMIN UNIVERSITY OF CHINA』9px/`.1em`」的竖版标准组合（复刻官方「中英文标准组合（上下）」，矢量 + 真实文字保证任意尺寸清晰）；`.stage-hero .stage-inner` 左移让位（`margin-left: clamp(170px,20vw,260px)`、宽度同步扣减，内容与 logo 零重叠）；<760px 竖版组合隐藏、内容恢复居中。章节导航与切换钮白字/白边框；页脚白底 + `1px solid #971f30` 顶边分隔线 + 列向居中加入 `.foot-logo`（横版校徽，高 26px）；预览卡以 `::after` 右下角 `contain` 渲染 `assets/ruc-bg.png` 水印（`mix-blend-mode: multiply`、opacity .45、`> *` z-index 1）。校徽不进入正文区域——「左侧常显、不喧宾夺主」由「hero 一个固定插槽」保证。

**对比度纪律（已程序化验证）**：暗色主题正文 ≥ 7:1（中文规范）、亮色主题正文 ≥ 4.5:1；标题 ≥ 7:1；accent ≥ 4.5:1（暗色主题实际 ≥ 7）；按钮字/底 ≥ 4.5:1（墨夜朱砂按钮底因 3.8:1 已加深至 `#c2402a`）。

**新增/修改主题**：只改 `theme-pack.js`（css 字符串为自包含 token 覆盖，不得引用构建常量）；`css: null` 表示「本页默认」主题。基座 CSS 若出现新组件，必须同步为 `var()` 引用新 token 并给 7 套主题补默认值——「硬编码 rgba/渐变」是换肤失效的第一根因。主题级**结构**差异（人大红顶栏 logo、蓝图网格等）用 `body[data-theme='<id>']` 选择器写在对应主题的 css 字符串内，不进入基座。

## Do's and Don'ts

### Do:
- **Do** 用系统字体栈渲染全部中文；永不引入 CDN/webfont。
- **Do** 主 CTA 用暖奶油 `#e9e5dd` + 墨字 `#292827`，不用纯白或饱和色。
- **Do** 让薰衣草 `#cbb7fb` 以小面积「光点 / 细线」出现——稀缺是它的力量。
- **Do** 边框用半透明白（`.05` / `.08`），层级用面亮度分层（`.02 → .04 → .05`）。
- **Do** 大数字用 weight 300 + `tabular-nums`，标题用 weight 500，正文 weight 400，无 700 粗体。
- **Do** 数字（编号、指标）用半角 + mono 或 `tabular-nums`，中西文之间留盘古之白空格。
- **Do** 图标用内联 SVG（16px 圆头描边），不用图标字体、不用 emoji。
- **Do** 任何位移/动画配 `prefers-reduced-motion` 降级（保留透明度、去除位移）。

### Don't:
- **Don't** 引入第二个交互 accent——冷靛 `#5e6ad2` 只作星云大气，永不上文字/边框/CTA。
- **Don't** 用纯白 `#ffffff` 作文本——主文本 `#f7f8f8`，正文 `.85` 白。
- **Don't** 给中文字符施加负字距（`-.01em`/`-.02em` 只用于纯数字）。
- **Don't** 使用斜体——`em`/`i` 保持 `font-style: normal`。
- **Don't** 使用硬偏移阴影或大面积投影——阴影仅 `--shadow-float` 一处、仅截图框。
- **Don't** 用不透明深色实线边框，或给面铺不透明填充块。
- **Don't** 把占位文案伪装成真实内容——待填字段用明确占位框/「（占位）」标注。
- **Don't** 堆叠 AI 元素——AI 表达收敛为一个 signature（叙事轴脉冲光点），不额外撒图标/渐变。
