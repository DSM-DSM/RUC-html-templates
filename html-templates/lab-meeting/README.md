# 组会进度报告网页模板

从 `week_report/` 现有组会网页（总览页 + 4 个子页面）与 `.baton/` 更新历史提炼出的**通用单页模板**。一套模板 = 总览页 + 方法/论文子页面 + 两份数据 JSON，纯静态 HTML，无构建步骤，`python -m http.server` 即可预览。

## 目录结构

```
week_report_template/
├── README.md                  ← 本文件
├── index.html                 ← 总览页模板（主模板 = 默认蓝系主题，唯一必须页面）
├── theme-pack.js              ← 主题统一模块（11 个主题 CSS + 元数据；唯一数据源，
│                                 构建脚本与页面内一键切换器共用）
├── assets/                    ← 主题素材（人大红主题的校徽 ruc-logo.svg 与
│                                 背景水印 ruc-bg.png；变体页面自动上移路径）
├── 01_example_method/         ← 子页面模板目录（方法页/论文页，复制整个目录后改名）
│   └── index.html             ← 子页面模板（每个子页面一个目录，文件都叫 index.html）
├── themes/                    ← 10 个主题变体（可选，与主模板共享组件/JS/数据）
│   ├── index.html             ← 主题预览入口（卡片网格，每卡含总览/子页面双入口）
│   ├── _build.mjs             ← 生成脚本：改动主题 CSS 后重跑即可全量再生成
│   ├── 01_wwdc_light.html     ← WWDC 浅色（总览）+ 01_wwdc_light_sub.html（子页面）
│   ├── 02_wwdc_dark.html      ← WWDC 深色（总览）+ 02_wwdc_dark_sub.html（子页面）
│   ├── 03_dark_premium.html   ← 深色奢华（成对同上）
│   ├── 04_glassmorphism.html  ← 玻璃拟态
│   ├── 05_ink_vermilion.html  ← 东方水墨
│   ├── 06_cyber_terminal.html ← 赛博终端
│   ├── 07_blueprint.html      ← 蓝晒蓝图
│   ├── 08_starmap.html        ← 深空星图
│   ├── 09_editorial.html      ← 杂志编辑
│   ├── 10_aurora_night.html   ← 极光之夜（各主题均含同名 _sub.html 子页面）
│   └── 11_ruc_beamer.html     ← 人大红 Beamer（RenminUniv.sty 网页复刻：校徽红
│                                #971f30 顶导底栏 + 校徽 + 背景水印 + 宋体衬线）
└── web_data/
    ├── report_data.json       ← 数据源（必须）：基线/方法/每周进度/待办
    ├── metrics_summary.json   ← 数据源（可选）：汇总指标明细，缺失时汇总卡隐藏
    └── schema.md              ← 字段字典（改 JSON 前先查）
```

## 快速预览

```bash
cd <站点目录的上级>            # 例如 D:\projects
python -m http.server 8080
# 浏览器打开 http://localhost:8080/week_report_template/
# 主题变体预览: http://localhost:8080/week_report_template/themes/
```

> 数据经 `fetch()` 加载，**必须走 HTTP 服务器**；直接双击 index.html 只能看到静态部分。

## 主题变体（themes/）

10 个主题与主模板共享**同一套组件类名、JS 渲染逻辑与数据源**（`web_data/`），差异只在 `<style>` 末尾的「主题覆盖层」——`:root` 令牌重定义 + 组件皮肤覆盖。每个主题**成对生成总览页与子页面**：`0N_主题.html`（总览）+ `0N_主题_sub.html`（子页面），两页互相链接（总览的侧边栏/快速链接指向同主题子页面，子页面的「返回总览」指向同主题总览）。数据路径为 `../web_data/`。

**选用主题（总览 + 子页面同步换肤）**：把对应变体的「主题覆盖层」CSS 块（`/* ═══════ 主题覆盖层 · … ═══════ */` 至 `/* ═══ 主题覆盖层结束 ═══ */`）复制进主模板 `index.html` 的 `</style>` 之前，并**同样复制进子页面模板 `01_example_method/index.html`** 的 `</style>` 之前（子页面的覆盖层放在共享设计系统 CSS 之后、其 3 行子页面变体之上，令牌自动生效）。两页覆盖层内容完全相同，无需调整。

**修改主题**：编辑 `theme-pack.js` 中对应主题的 `css` 字段（唯一数据源），然后 `node themes/_build.mjs` 全量再生成（总览 + 子页面 20 个文件一并更新）。

## 主题一键切换器

主页（顶导右侧）与子页面（顶导工具链接末尾）各有一个调色板按钮，点开可任选「默认蓝系 + 10 个主题」，一键切换整页皮肤。选择写入 `localStorage`（键 `labmeeting-theme`），**跨页连续**——在子页面切到东方水墨后返回主页，主页自动保持东方水墨；反之亦然。页面刷新后保持最后选择。切换器与 `theme-pack.js` 强绑定：删除主题包脚本（或离线使用）时切换器自动消失、页面退回自身默认主题（`<body data-default-theme>`，主题变体文件中为各自主题 id）。

## 页面解剖

### 总览页 `index.html`

四区布局：**顶部导航 / 左侧页内导引 / 中部内容 / 底部声明栏**。

| 区域 | 类型 | 说明 |
|---|---|---|
| 顶部导航 | 静态+数据 | 品牌区（项目名，`site_meta` 渲染）+ 子页面入口链接 + 组会倒计时 |
| 侧边栏·页内导航 | 静态+JS | 滚动高亮当前章节（scrollspy） |
| 仪表盘 | **数据驱动** | `renderDashboard()`：baseline + `methods[]` 渲染为 **3D 转盘**（水平圆环 + 自动旋转 + 拖拽 + 点击选中，正前方卡片详情实时显示在转盘下方），明细表在转盘之下 |
| 实验卡片区 | 手写 HTML | 每个实验方向一张卡，**卡片内两栏**（左 `.viz` 图/表展示 + 右 `.explain` 文字解释），细节图表用 `.fold` 折叠（核心展开、细节默认折叠） |
| 汇总指标卡 | 数据驱动(可选) | `renderSummaryMetrics()`，数据缺失时整卡隐藏；两栏布局（左指标网格+明细表，右公式说明） |
| 每周时间线 | 数据驱动 | 当前周高亮脉冲、未来周虚线、历史周折叠 |
| 本周任务 / 待办清单 | 数据驱动 | 单栏流式卡片 |
| 底部声明栏 | 数据驱动 | `site_meta`：作者 / 机构 / 版本 / 更新时间；logo 用 `<img>` 替换 `.logo-slot` 占位 |

### 实验卡片解剖（总览页手写区）

```
.card [id="sec-xxx", 可选 border:2px solid var(--accent) 强调]
├─ .card-header > .card-title + .status-tag         标题 + 状态徽章
├─ .source-line（<code> 包裹文档/日志路径）          来源说明
├─ .card-body（两栏：minmax(0,1fr) 290px）
│   ├─ .viz                                         图/表展示列
│   │   ├─ .section-h4.c-* + .data-table            ① 主表（核心，默认展开）
│   │   └─ .fold ×N（折叠区）                        细节图表：默认折叠
│   │       ├─ .fold-head（按钮 + .fold-chevron + .fold-hint）
│   │       └─ .fold-body > .fold-inner > .fold-pad
│   └─ .explain                                     文字解释列
│       ├─ .info-box（问题 / 关键发现 / 假设 / 结论）
│       └─ 段落（数据与假设的对照等）
└─ .code-ref                                        代码与数据文件引用页脚
```

模板内置一张「实验示例卡片」即完整示范（两栏 + 3 个折叠区），复制替换即可。**新增卡片必须同步 3 处**（漏一处侧边栏不出现）：
① 侧边栏 `sidebar-child` 的 `data-target` → ② 卡片 `id` → ③ 底部 JS `sections` 数组。

### 子页面 `01_example_method/index.html`

| 卡片 | 用途 |
|---|---|
| 顶部导航 | 品牌区（项目名，点击返回总览）+ 兄弟方法链接 + PDF/GitHub 工具链接 |
| 方法概览 | 纯文字卡（单栏流式）：论文来源 + 核心创新 + 方法分类 + status-tag |
| 📄 论文详解（mineru 解析） | 两栏：左 `.viz` 公式截图（① 核心展开，②③④ 折叠），右 `.explain` 公式说明文字；LaTeX 重排版小节折叠 |
| 实验记录 | 两栏：左 `.viz` 实验结果表（配置对比表折叠），右 `.explain` 设计/失败/修正/结论 info-box |
| 失败/错误实验归档 | `border:2px solid var(--warning)` 强调卡，一行一个教训 |
| 关键发现与后续规划 | 两栏：左 `.viz` 后续规划表，右 `.explain` 关键发现 + 代码位置 |
| 底部声明栏 | `site_meta` 轻量 fetch 渲染（与总览页共用数据） |

页内导航由底部 `buildInpageNav()` 按 `groups` 配置生成。**新增小节必须同步 3 处**：① `groups` 数组加 child → ② 「h4 id 分配」代码块按文本片段匹配加分支 → ③ 新卡片还要在「卡片 id 分配」加分支。

## 占位符说明

模板内置示例内容**全部是占位符**，不含任何真实项目数据。使用模板 = 把下表各类占位符替换成你的内容：

| 占位符 | 出现位置 | 含义与替换方法 |
|---|---|---|
| `项目名` | 总览页 `<title>`/`<h1>` | 项目名称 |
| `方法 1（示例）` 等 | 数据 JSON `methods[].name`、侧边栏/快速链接 | 你的方法名 |
| `0.8xxx` / `+0.xx` / `xx.x%` / `~x.xM` / `0.0xxx` | 实验示例卡片、实验记录表格、数据 JSON | 数值占位（含 `x` 的占位形仅在 HTML 示例卡片中使用；JSON 中用整十整百占位值，必须整体替换为真实指标） |
| `（在此填写……）` | 各 info-box/段落 | 需要人工撰写的内容（背景、结论、说明） |
| `占位：…` | 数据 JSON 的文字字段 | 替换为真实文字 |
| `docs/…`、`src/models/…`、`analysis/…` | `.source-line`/`.code-ref` 中的 `<code>` 路径 | 指向你仓库的真实文档/代码/分析文件 |
| `literature/示例论文.pdf`、`literature_output/示例论文/` | 子页面论文详解卡 | 你的论文 PDF 路径与 mineru 解析输出目录 |
| 📈/📊/🏗️ **图片占位**（`.img-placeholder`） | 总览页实验卡片、子页面论文插图 | 结果对比图/消融图/架构图——整块替换为 `<img src="...">`（替换写法见占位符旁 TEMPLATE 注释） |
| 🧮 **公式截图占位** | 子页面论文详解卡 | mineru 输出的公式图片（见下方工作流），替换为 `<img src="...">` |
| `run__baseline`、`run__method1_a` 等 | 数据 JSON 的 `run_name` | 你的训练 run 命名 |

## 论文详解与 mineru 工作流

子页面「📄 论文详解」卡片演示了用 **mineru 技能**解析论文 PDF 并展示公式的标准做法：

1. **解析 PDF**：用 mineru 技能（`/mineru` 或 Skill 调用）解析论文 PDF，得到输出目录（含 `markdown/`、`images/` 等——mineru 会把文中的公式渲染成图片文件，命名如 `eq_1.jpg`）
2. **拷贝公式截图**：从 mineru 输出的 `images/` 中挑选关键公式截图，复制到站点可引用的位置（模板示例约定 `<站点>/literature_output/示例论文/images/`）
3. **页面展示**：每个关键公式一个小节（`.section-h4` ① ② ③）：
   - `.figure` 放公式截图（`<img src>`）
   - `.fig-caption` 标公式编号（如 `Eq. 1 — 公式名称（mineru 解析截图）`）
   - 下方段落写**公式说明**（符号含义、作用、在模型中的位置）
4. **为什么用截图**：精确还原论文公式的排版与编号、无需手写 LaTeX 转写（转写易错）。若你需要重排/改动公式（如推导扩展），再用「可选：LaTeX 重排版（MathJax）」小节，此时才需要页面头部 MathJax 配置

## 新建流程

### A. 新建整个站点（新项目）

1. 复制 `week_report_template/` 整个目录，改名（如 `week_report_myproj/`）
2. 改 `index.html`：`<title>`、`<h1>` 项目名、侧边栏与快速链接卡的子页面入口
3. 复制 `01_example_method/` 目录为 `01_paper/`、`02_method1/`…（每个子页面一个目录，**文件都叫 index.html**，页面间链接用 `../index.html`、返回总览 `../index.html`）
4. 填 `web_data/report_data.json`（参照 `schema.md`）
5. `python -m http.server` 预览，跑下方「验证清单」

### B. 新增一个实验卡片（总览页）

复制「实验示例卡片」，替换标题/内容/id，然后同步侧边栏 `data-target` + JS `sections` 数组。

### C. 新增一个方法（子页面 + 数据）

1. 复制 `01_example_method/` 整个目录为新目录 `0N_name/`（内为 `index.html`）
2. 在 `report_data.json` 的 `methods[]` **追加**（不要插入——渲染循环按数组顺序，旧索引有历史依赖）
3. 在总览页侧边栏 + 快速链接卡加入口链接

### D. 更新每周进度 / 待办

只改 `report_data.json`：`weekly_progress` 追加新周（`saturday` = 下次组会日，倒计时自动更新）、归档 `todo_list`。**网页 HTML 不用动。**

## 设计系统

### 颜色令牌（`:root`，全站唯一配色入口）

> 语义色已按浅色底文字对比度 ≥4.5:1 校准（原 Tailwind 500 色阶过亮，小字不可读）。

| 令牌 | 用途 |
|---|---|
| `--primary` (#2563eb) / `--primary-light` / `--primary-dark` | 主色：链接、激活态、当前周、蓝色小节 |
| `--accent` (#0e7490) / `--accent-light` | 青色：次要强调、最佳实验行 |
| `--success` (#059669) / `--success-bg` | 绿色：涨点、已完成、成功结论 |
| `--warning` (#b45309) / `--warning-bg` | 琥珀：警告、部分成功、归档卡 |
| `--danger` (#dc2626) / `--danger-bg` | 红色：下跌、失败、紧急 |
| `--line` (rgba(0,0,0,0.07)) | hairline 细边框：卡片 / 页头 / 侧边栏描边 |
| `--shadow` / `--shadow-hover` | 卡片柔和阴影（有偏移 + 模糊） |
| `--ease-move` | 位移类动效缓动（ease-out）；颜色类用 `--transition` |
| `--gray-50`…`--gray-900` | 中性色阶 |

其他约定：根字号 16px；`info-box` 为「同色调浅底 + 圆形色点」样式；全站支持 `prefers-reduced-motion`（关闭时间线脉冲与位移动效）。

### 组件清单（两页同一套设计系统 CSS）

> 总览页与子页面共用同一套 CSS 设计系统，**差异仅两处**（子页面 CSS 中已用「子页面变体」注释标出）：① 子页面 2 行变体——`--sidebar-width: 240px` / `--header-height: 48px`（总览页 260px / 52px）、`.nav-brand` 字号 1rem（总览页 1.1rem）；② 子页面省略「7b. 3D 转盘」小节（子页面无转盘组件）。除此之外不要各自微调——改配色只动 `:root` 令牌。

`card` / `card-header` / `card-title` / `card-body`(`.viz`+`.explain` 两栏) / `fold`(`.fold-head`/`.fold-body`/`.fold-inner`) / `section-h4`(+`c-*`) / `status-tag`(+`status-*`) / `info-box`(+`info/success/warning|warn/danger`) / `source-line` / `code-ref` / `data-table`(`.num`/`.highlight`/`.up`/`.down`/`.warn-cell`) / `metric-grid`+`metric-card` / `compare-grid`+`compare-card`(`.m1/.m2/.m3`) / `carousel` 3D 转盘(`.carousel-viewport`/`.carousel-turn`/`.carousel-item`/`.ci-card`/`.carousel-detail`) / `bar-chart` / `timeline` / `todo-item` / `formula-card` / `arch-diagram` / `figure`+`fig-caption`+`fig-grid` / `img-placeholder`（模板预览用，接入真实图时整块换成 `<img>`） / `quick-links`（含 `.ql-icon` 图标容器，主题覆盖层可改底色/圆角） / `back-to-top` / `empty-state` / `nav-brand`+`nav-links`（顶部导航） / `#footer`（声明栏）+`.logo-slot` / **`ic-*` 图标集**（见下）

### 图标集（`.ic` 系列）

结构层图标（侧边栏、卡片标题、快速链接卡、回到顶部）使用 stroke 线性 SVG 图标（CSS mask + `currentColor`）——**图标颜色自动跟随所在文字颜色**，主题换色无需换图标。用法：`<span class="ic ic-xxx"></span>`（复制卡片时替换 `ic-xxx` 即可）。可用图标：`ic-dashboard / ic-doc / ic-nav / ic-flask / ic-search / ic-calendar / ic-clipboard / ic-check / ic-chart / ic-bulb / ic-archive / ic-book / ic-formula / ic-code / ic-paper / ic-arrow`。新增图标按同一 24×24 stroke=2 风格在共享 CSS 第 17 节补充 data URI。行内状态符号（✅/⚠️/📋 列表前缀、🟡/🔴 表格判定等）属内容层，保留 emoji。

### 口径约定（全站一致，用户偏好）

- 指标卡：**测试集 (agg1) 大字主值**在前，验证集 (agg0) 小字副值在后
- Δ 主行为测试集口径，验证集 Δ 附小字括号
- 表格数值类单元格加 `.num`（等宽字体）

## 约定清单 & 雷区（来自历次更新记录）

1. **fetch 路径**：总览页 `web_data/report_data.json`；子页面在子目录里，用 `../web_data/report_data.json`。站点根目录不放 `report_data.json`。
2. **`.sidebar-children.open` 必须 `max-height:none`**：固定值 + `overflow:hidden` 会裁剪页内导航下方的条目。
3. **`methods` 是 list 不是 dict**：`d.methods[0]`，渲染循环按序，新方法**追加**不插入。
4. **卡片新增三处同步** / **页内导航三处同步**，见「页面解剖」。
5. **图片物理路径 ≠ 展示文字**：`<img src>`/`<code>` 指向磁盘真实路径，页面日期文字可另行统一，不要为对齐文字改物理路径（改路径会挂图）。
6. **失败实验也归档**：证伪/失败结论同样是进展，写在子页面归档卡，别从网页删掉。
7. **验证命令**：
   ```bash
   python -c "import json; json.load(open('web_data/report_data.json', encoding='utf-8'))"
   python -c "from html.parser import HTMLParser; ..."   # 或用任意 HTML 校验器查标签配对
   ```
8. **浏览器人工点开验证**：无头环境只能查结构与路径，最终渲染必须人工过一遍（图片是否加载、MathJax 是否渲染、侧边栏跳转是否生效）。
9. **性能优化已内置**：MathJax 渲染器改为按需加载（总览页仅在汇总指标卡公式显示时注入；子页面仅在存在 `.mathjax-process` 元素时注入——纯截图模式页面零 MathJax 开销）；滚动监听已做 rAF 节流 + passive 合并，请勿把滚动处理改回每事件触发 `offsetTop` 读取的写法。

## 与线上站点 `week_report/` 的关系

本模板是从 `week_report/` 提炼的通用化版本，**不影响线上站点**。线上站点的日常更新（配置表补齐、卡片增量、任务清单同步）请继续使用 `week-report-html-update` 技能；本模板用于新站点从零搭建或旧站点重构的参照。
