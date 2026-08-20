# Paper Explainer 网页架构模板 — 使用说明

本文档说明 `html-templates/paper-explainer/` 下四个由 **paper-explainer** 技能产出的网页架构模板的来源、层级结构与用法。模板已升级为「学术纸感 · 内容优先」视觉系统，内置 8 套明暗主题一键切换（架构与项目 lecture / lab-meeting / commerical-lecture 三个模板同构）。

## 一、目录层级结构（模仿成品 literature/summary）

模板目录的层级结构与项目成品 `literature/summary/` 一一对应，用文件夹区分不同类别的页面：

```
paper-explainer/
├── knowledge_graph_template.html            ← 知识图谱页（根目录，对应成品 knowledge_graph.html）
├── paper_explainer_template_guide.md        ← 本说明文档
├── theme-pack.js                            ← 8 套主题唯一数据源（UMD，明暗各 4）
├── papers/
│   └── paper_explainer_page_template.html   ← 论文详解页（对应成品 papers/*.html）
├── nav/
│   ├── reading_path_template.html           ← 阅读路径页（对应成品 nav/reading_path.html）
│   └── knowledge_supplement_template.html   ← 背景知识页（对应成品 nav/knowledge_supplement.html）
└── style_previews/                          ← 主题预览画廊（_build.mjs 生成，勿手改产物）
    ├── _skeleton.html                       ← 全组件预览骨架（生成器的输入）
    ├── _build.mjs                           ← 构建脚本：骨架 × theme-pack → 变体
    ├── index.html                           ← 画廊入口
    └── NN_{theme-id}.html                   ← 每主题一个全组件预览变体
```

成品 `literature/summary/` 的真实布局（作为参照）：

```
literature/summary/
├── knowledge_graph.html         ← 知识图谱（根目录）
├── papers/                      ← 论文详解页（每篇一个）
│   ├── Sanderson_2022_..._zh.html
│   └── images/                  ← 原论文图/表截图，按 {Slug}/ 分子文件夹
└── nav/                         ← 导航页
    ├── reading_path.html        ← 阅读路径主页
    └── knowledge_supplement.html ← 背景知识补充页
```

## 二、四个模板的来源

四个模板都是从 paper-explainer 技能**实际生成的页面**中逆向提取的「架构层」抽象，不是凭空设计：

| 模板文件 | 提取来源 | 对应成品 |
|---|---|---|
| `papers/paper_explainer_page_template.html` | 用户验收通过的黄金样板 `Skrivankova_2021_..._zh.html` 的完整 CSS + 结构 | 单篇论文详解页 |
| `knowledge_graph_template.html` | `knowledge_graph.html`（含 10 篇论文完整版）的 CSS + 五板块 | 跨论文知识图谱页 |
| `nav/reading_path_template.html` | `nav/reading_path.html` 的 CSS + 阶段/步骤结构 | 阅读路径主页 |
| `nav/knowledge_supplement_template.html` | `nav/knowledge_supplement.html` 的 CSS + 概念卡片结构 | 背景知识补充页 |

技能的原始参考文件（`.claude/skills/paper-explainer/references/html-template.md`）只含 4 条简略 CSS 属性，**并非**真实页面使用的完整设计系统。这四个模板补全了实际页面中经过多轮用户验收沉淀的完整样式。

## 三、四个页面的关系（页面拓扑）

```
              ┌─────────────────────────────────────────┐
              │        nav/reading_path_template         │  阅读路径（导览门户）
              │   phase 阶段条 + step 步骤卡             │
              └───────────────┬─────────────────────────┘
                              │ step 指向论文 / .supp 指向背景知识
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌───────────────────────┐
│ papers/ 论文详解页 │  │ nav/ 背景知识页    │  │ knowledge_graph 知识图谱 │
│ 7 种标注盒逐章讲解  │  │ concept+def-box  │  │ 5 板块概念关联           │
└─────────────────┘  └─────────────────┘  └───────────────────────┘
```

- **阅读路径页**（导览门户）：用「阶段 + 步骤」把多篇论文组织成渐进式学习路线，每站说明「学什么 + 为什么在这一站」
- **论文详解页**（核心）：深入浅出讲解一篇论文，7 种标注盒承载「直觉 → 定义 → 示例 → 总结」的三层展开
- **背景知识页**（随行词典）：集中速查论文中反复出现但正文不展开的背景概念，每个概念回链到论文
- **知识图谱页**（关联中枢）：把多篇论文的概念关联、方法关系、推荐阅读顺序组织成 5 个板块

## 四、命名规范（paper-explainer 强制）

| 页面类型 | 命名规则 | 示例 |
|---|---|---|
| 论文详解页 | `{第一作者姓氏}_{出版年份}_{标题前三个实义词}_zh.html`（跳过冠词/介词/连接词） | `Sanderson_2022_Mendelian_randomization_zh.html` |
| 知识图谱页 | 固定 `knowledge_graph.html` | — |
| 阅读路径页 | 固定 `reading_path.html` | — |
| 背景知识页 | 固定 `knowledge_supplement.html` | — |

## 五、组件速查（按页面分类）

> 图标统一为 stroke SVG（1.8 线宽、圆端点、currentColor），标注盒标签图标用 CSS mask 渲染，不占 markup；导航链接图标为内联 `<svg class="ico">`。

### 5.1 论文详解页（`papers/`）

| 组件 | 类名 | 用途 |
|---|---|---|
| 直观理解 | `.intuition` | 每个新概念的开场，白话无公式（绿） |
| 正式定义 | `.definition` | 精确定义 / 模型公式（蓝） |
| 具体示例 | `.example` | 低维数字演示 / 数据场景（琥珀） |
| 定理/结论 | `.theorem` | 理论结果（紫） |
| 算法 | `.algorithm` | 伪代码 / 计算步骤（等宽字体；标签 12px 兜底） |
| 要点总结 | `.summary` | 每节收尾（淡蓝） |
| 注意事项 | `.warning` | 局限 / 陷阱（红） |
| 盒内小标题 | `h3.box-h` | 标注盒内标题用语义 h3 + box-h 类（视觉等同旧 h4，避免标题层级跳跃） |
| 交叉引用 | `.crossref` | 指向其他论文或知识图谱（琥珀虚线） |
| 原文出处 | `.src-ref` | 边注样式：短横线引导的灰色小字，标注出自原论文哪个章节 |
| 原图截图 | `figure` + `.fig-caption` | 卡片式图框 + 逐面板中文图注 + 版权行 |
| 数据表 | `table.data` | 墨色表头（--accent-deep）+ 斑马纹 + tabular-nums |
| 返回目录 | `.back-top` | 节末锚点链接 |
| 目录 | `nav.toc` + `h2` | 目录标题为 h2（小字标签样式），列表 marker 为衬线重音色 |
| 顶部导航 | `.top-nav-bar` | 其他论文 + 阅读路径 + 知识图谱 + 原始 PDF |
| 相关资源栏 | `.related-bar` | 底部相关资源 |
| 阅读进度 | `.progress` | 顶部 2px 进度线，跟随滚动 |

### 5.2 知识图谱页（根目录）

| 组件 | 类名 | 用途 |
|---|---|---|
| 概念关联图谱 | `.network-grid` + `.paper-node` | 每篇论文一个节点，标签分 shared/unique/bridge/new |
| 对照矩阵 | `table.matrix` | 概念 × 论文矩阵，单元格 checkmark/partial/cross |
| 关系卡片 | `.rel-card` + `.rel-type` | 论文两两关系（标题用 h3），rel-shares/complements/generalizes |
| 阅读路径 | `ol.roadmap-steps` | 推荐阅读顺序，衬线数字圆徽自动编号 |
| 论文索引 | `.paper-links` | 全部论文链接（胶囊按钮） |
| 页眉刊头 | `.kg-header` + `.kg-stat` | 期刊刊头式：顶部粗规线 + 衬线标题 + 衬线大数字统计 |

### 5.3 阅读路径页（`nav/`）

| 组件 | 类名 | 用途 |
|---|---|---|
| 阶段分隔条 | `.phase` | 「第N阶段」主题（次级表面 + 上下发丝线，居中） |
| 步骤卡片 | `.step` | 每站 = 一篇论文/知识点，卡片 + 悬停微浮起 |
| 学习目标 | `.step .goal` | 一句话，绿色，旗帜图标 |
| 为何这站 | `.step .why` | 一句话，灰色小字 |
| 跳转链接 | `.step .links` | 快速导引 / 补充知识点（胶囊按钮） |
| 补充提示 | `.supp` | 琥珀虚线框 + 问号图标，引导去背景知识页 |
| 底部导航 | `.rb` | 知识图谱 / 补充知识点 |

### 5.4 背景知识页（`nav/`）

| 组件 | 类名 | 用途 |
|---|---|---|
| 概念卡片 | `.concept` | 一个卡片 = 一个背景概念；概念名用 h2（卡片内样式覆盖） |
| 定义框 | `.def-box` | 定义色淡底 + 1px 同系细边，承载概念解释 |
| 相关论文 | `.concept .papers` | 灰色小字，回链论文 |
| 跳转链接 | `.concept .links` | 跳转论文 / 返回路径主页 |
| 底部导航 | `.rb` | 知识图谱 / 阅读路径 |

## 六、图片插入要点（用户验收硬指标，写死在技能里）

- **必须居中**：`img { display: block; margin-left: auto; margin-right: auto; }`（窄图默认靠左会左偏）
- **四边收紧**：原图截图四周只留 10–15px 均匀边距，任一方向残留白边 <20%
- **图注 1:1 配对**：每个 `img` 配一个 `.fig-caption`，逐子面板中文说明 + 「图源：Author et al., Journal (Year), CC BY …」
- 图放在 `figure` 卡片图框内（表面色 + 发丝线 + 圆角），图注在框内

## 七、知识图谱五板块（新增论文时全部同步更新）

1. **概念关联图谱** `.network-grid` — 新增论文节点 + 独有(`.tag.unique`)/新概念(`.tag.new`)/共享(`.tag.shared`)/桥梁(`.tag.bridge`)标签
2. **概念-论文对照矩阵** `table.matrix` — 新增一列 + 新概念行；单元格 `checkmark`/`partial`/`cross`
3. **论文间关系卡片** `.rel-card` — 新论文与每篇已有论文的关系；`rel-shares`/`rel-complements`/`rel-generalizes`
4. **推荐阅读路径** `ol.roadmap-steps` — 必要时调整顺序
5. **论文索引** `.paper-links` — 新增一个链接条目

## 八、防孤立机制（三级相关性分层）

paper-explainer 技能 Step 4/Step 9 规定：新论文加入后，按与已有论文的相关性等级**分级插入**链接：

| 等级 | 判据 | 插入位置 |
|---|---|---|
| 强相关 | 概念集交集 ≥2 且可串联（Shared/Complements/Generalizes） | top-nav-bar + 正文 `.crossref` + related-bar |
| 弱相关 | 交集 ≥1 但不可串联 | top-nav-bar + related-bar |
| 无关 | 交集 =0 | 仅 top-nav-bar |

**禁止编造关系**——无法确认具体串联方式时降级为弱相关，只加条目不插 `.crossref`。

## 九、与技能的对应关系

| 模板 | 技能步骤 |
|---|---|
| `papers/paper_explainer_page_template.html` | Step 6（撰写 HTML）+ Step 6.5（原图插入） |
| `knowledge_graph_template.html` | Step 8（更新知识图谱） |
| `nav/reading_path_template.html` | Step 9.4（导航页同步更新） |
| `nav/knowledge_supplement_template.html` | Step 9.4（导航页同步更新） |
| 本指南 | Step 5（大纲）+ Step 9（交叉引用）+ 关键质量标准 |

## 十、主题系统（theme-pack.js）

与项目其余三个模板同构的主题架构（theme-pack.js 唯一数据源 + 右下角切换方块 + localStorage 跨页连续）：

### 10.1 八套主题

| # | id | 名称 | 明/暗 | 增强档位 | 个性 |
|---|---|---|---|---|---|
| 1 | `paper-ink` | 纸墨（默认） | 明 | 克制 | 冷调纸白 + 墨蓝重音，基座世界 |
| 2 | `ruc` | 人大红 | 明 | 克制 | 校徽红 #971f30 + 页顶朱红规线 + 右下角校徽底图水印 |
| 3 | `ink-wash` | 素墨 | 明 | 克制 | 纯墨色，链接常下划线 |
| 4 | `celadon` | 青瓷 | 明 | 适中 | 松花绿 + 极淡点阵氛围层 |
| 5 | `ink-night` | 墨夜 | 暗 | 克制 | 暖墨夜读 + 金线 |
| 6 | `abyss` | 深海 | 暗 | 克制 | 沉静深海蓝 |
| 7 | `terminal` | 磷光 | 暗 | 克制 | 终端磷光绿 + 等宽元信息 |
| 8 | `twilight` | 暮紫 | 暗 | 适中 | 紫晕氛围层 |

克制 = 仅色彩/排版变化；适中 = 额外带静态氛围层（`body::before`，fixed 一次绘制，不随滚动重绘）。

### 10.2 架构铁律

1. **theme-pack.js 是唯一数据源**：`{ DEFAULT_THEME, THEMES[8] }`，每主题 `{id, name, en, mode, flavor, desc, swatch, css}`。UMD 双模式（浏览器全局 `PAPER_EXPLAINER_THEME_PACK` / CJS require）。
2. **令牌覆盖模型**：四个模板基座 `<style>` 只含默认主题「纸墨」的 `:root` 令牌；其余主题的 css 是完整的 `:root` 覆盖块 + 少量主题专属规则，切换时整块写入 `<style id="theme-css">`。**改默认主题必须同时改四个模板基座 :root（逐字同步）**。
3. **首屏防闪烁**：head 内 `<script src="...theme-pack.js">` 阻塞加载 + 紧随其后的恢复脚本，渲染前从 localStorage 注入主题；body 末尾主脚本兜底（含「无保存时回落到 html 烘焙的 data-theme」，保证预览变体直开即是对应主题）。
4. **逐字相同块**：`<style id="ts-css">`（切换方块样式）、head 恢复脚本、body 末尾主脚本，在四个模板与 `_skeleton.html` 五份**逐字相同**，改一处必须五处同步。
5. **localStorage 键** `paper-explainer-theme`，跨四页连续。
6. **预览变体是生成产物**：`style_previews/NN_*.html` 与 `index.html` 由 `node style_previews/_build.mjs` 生成（cwd 不限），勿手改；改主题 → 改 theme-pack.js → 重跑构建。
7. **主题令牌面**（每套主题必须全量覆盖）：表面（bg/surface/surface-2/rule/rule-strong）、墨色（ink/ink-2/ink-3）、主色（accent/accent-deep/accent-soft/on-accent/link/focus）、阴影、选区/滚动条/进度、七种标注盒三色组（fg/bg/bd）、关系徽章（rel-share/rel-comp/rel-gen/rel-ink）。暗色主题正文对比度按 ≥7:1 设防。
8. **人大红主题 Logo 依赖**：ruc 主题的 CSS 引用 `background-1.png` 右下角水印底图，必须与模板 HTML **同目录**放置（相对路径解析依赖此约定）；四页的 favicon 引用 `ruc-mark.svg`（官方 SVG 校徽，标签页图标用）。四个模板目录 + `style_previews/` 各需一份副本（共 8 个文件，逐份相同）。素材来源：`lecture/ruc_beamer_templates/pic/中国人民大学-logo.svg` + `lecture/ruc_beamer_templates/pic/background-1.png`（原图为 beamer 极淡水印，最深处仅 229 灰，**已用 PIL 裁剪水印区域并做 3.3× 对比度拉伸**，否则在白底网页上肉眼不可见）。

### 10.3 改主题 / 加主题流程

- **改现有主题**：编辑 `theme-pack.js` 对应条目 css → `node style_previews/_build.mjs` → 浏览器验收。改默认主题另需同步四个基座 :root。
- **加新主题**：theme-pack.js `THEMES` 追加一条（css 全量覆盖上述令牌面，可加 `html[data-theme="xx"]` 专属规则）→ 重跑构建 → 切换方块自动多一项。

### 10.4 单独拷贝使用

模板页面可单独拷出使用（样式独立工作）；若需保留主题切换，一并拷贝 `theme-pack.js` 并检查 head 中 `<script src>` 相对路径。若需保留人大红主题的校徽效果，须同目录拷贝 `ruc-mark.svg` 和 `background-1.png`。论文详解页的 MathJax 两个 `<script>` 不需要公式时可删。

## 十一、视觉与动效说明（去 AI 味设计决策）

- **字体**：衬线标题用本地栈（Georgia → Songti SC → SimSun），正文系统无衬线栈，零 webfont（离线 file:// 可用，无大陆网络风险）；中文字重只用 400/500/600，行高 1.75–1.8。
- **页眉**：期刊刊头式（顶部粗规线 + 衬线标题），替代 135° 渐变横幅。
- **签名细节**：h2 横规线下的短墨线；`.src-ref` 边注短横线；目录 marker 衬线重音色；人大红主题右下角校徽底图背景水印（固定定位，z-index -1，内容层遮盖，multiply 融入纸底）。
- **图标**：统一 stroke SVG（1.8 线宽），emoji 已全部清除。
- **动效**（克制档）：滚动入场渐显（IntersectionObserver，指数 ease-out，尊重 `prefers-reduced-motion`）、卡片悬停微浮起、链接悬停下划线、主题切换 250ms 色彩过渡；仅 transform/opacity 动画。
- **浏览器表面**：选区色、caret、滚动条、focus-visible 环、tabular-nums 均由令牌驱动，随主题变化。
- 验证标准：detect.mjs 零发现；结构配对 / 内联 JS 语法 / ts-css 五份逐字一致；Edge headless 冒烟（加载无错、切换生效、跨页连续、刷新恢复、无横向溢出）。

> 维护提示：若 paper-explainer 技能后续升级（如新增标注盒、调整色板），应同步回灌这四个模板；反之，本模板沉淀的新组件也应回写进技能的 `references/html-template.md`，避免模板与技能脱节。主题系统改动遵循第十节铁律。
