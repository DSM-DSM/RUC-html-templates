# Paper Explainer 网页架构模板 — 使用说明

本文档说明 `templates/pdf-explainer/` 下四个由 **paper-explainer** 技能产出的网页架构模板的来源、层级结构与用法。

## 一、目录层级结构（模仿成品 literature/summary）

模板目录的层级结构与项目成品 `literature/summary/` 一一对应，用文件夹区分不同类别的页面：

```
templates/pdf-explainer/
├── knowledge_graph_template.html            ← 知识图谱页（根目录，对应成品 knowledge_graph.html）
├── paper_explainer_template_guide.md        ← 本说明文档
├── papers/
│   └── paper_explainer_page_template.html   ← 论文详解页（对应成品 papers/*.html）
└── nav/
    ├── reading_path_template.html           ← 阅读路径页（对应成品 nav/reading_path.html）
    └── knowledge_supplement_template.html   ← 背景知识页（对应成品 nav/knowledge_supplement.html）
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

### 5.1 论文详解页（`papers/`）

| 组件 | 类名 | 用途 |
|---|---|---|
| 直观理解 | `.intuition` | 每个新概念的开场，白话无公式（绿色） |
| 正式定义 | `.definition` | 精确定义 / 模型公式（蓝色） |
| 具体示例 | `.example` | 低维数字演示 / 数据场景（黄色） |
| 定理/结论 | `.theorem` | 理论结果（紫色） |
| 算法 | `.algorithm` | 伪代码 / 计算步骤（灰色，等宽字体） |
| 要点总结 | `.summary` | 每节收尾（淡蓝） |
| 注意事项 | `.warning` | 局限 / 陷阱（红色） |
| 交叉引用 | `.crossref` | 指向其他论文或知识图谱（黄色虚线） |
| 原文出处 | `.src-ref` | 标注内容出自原论文哪个章节 |
| 原图截图 | `figure` + `.fig-caption` | 逐面板中文图注 + 版权行 |
| 数据表 | `table.data` | 深蓝表头 + 斑马纹 |
| 返回目录 | `.back-top` | 节末锚点链接 |
| 顶部导航 | `.top-nav-bar` | 其他论文 + 阅读路径 + 知识图谱 + 原始 PDF |
| 相关资源栏 | `.related-bar` | 底部相关资源 |

### 5.2 知识图谱页（根目录）

| 组件 | 类名 | 用途 |
|---|---|---|
| 概念关联图谱 | `.network-grid` + `.paper-node` | 每篇论文一个节点，标签分 shared/unique/bridge/new |
| 对照矩阵 | `table.matrix` | 概念 × 论文矩阵，单元格 checkmark/partial/cross |
| 关系卡片 | `.rel-card` + `.rel-type` | 论文两两关系，rel-shares/complements/generalizes |
| 阅读路径 | `ol.roadmap-steps` | 推荐阅读顺序，自动编号 |
| 论文索引 | `.paper-links` | 全部论文链接 |
| 页眉统计 | `.kg-header` + `.kg-stat` | 渐变页眉 + 论文数/概念数/关系数 |

### 5.3 阅读路径页（`nav/`）

| 组件 | 类名 | 用途 |
|---|---|---|
| 阶段分隔条 | `.phase` | 「第N阶段」主题（淡蓝居中条） |
| 步骤卡片 | `.step` | 每站 = 一篇论文/知识点，白底 + 左侧蓝边 |
| 学习目标 | `.step .goal` | 一句话，绿色 |
| 为何这站 | `.step .why` | 一句话，灰色小字 |
| 跳转链接 | `.step .links` | 快速导引 / 补充知识点 |
| 补充提示 | `.supp` | 黄色虚线框，引导去背景知识页 |
| 底部导航 | `.rb` | 知识图谱 / 补充知识点 |

### 5.4 背景知识页（`nav/`）

| 组件 | 类名 | 用途 |
|---|---|---|
| 概念卡片 | `.concept` | 一个卡片 = 一个背景概念 |
| 定义框 | `.def-box` | 淡蓝背景 + 左侧蓝边，承载概念解释 |
| 相关论文 | `.concept .papers` | 灰色小字，回链论文 |
| 跳转链接 | `.concept .links` | 跳转论文 / 返回路径主页 |
| 底部导航 | `.rb` | 知识图谱 / 阅读路径 |

## 六、图片插入要点（用户验收硬指标，写死在技能里）

- **必须居中**：`img { display: block; margin-left: auto; margin-right: auto; }`（窄图默认靠左会左偏）
- **四边收紧**：原图截图四周只留 10–15px 均匀边距，任一方向残留白边 <20%
- **图注 1:1 配对**：每个 `img` 配一个 `.fig-caption`，逐子面板中文说明 + 「图源：Author et al., Journal (Year), CC BY …」

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

> 维护提示：若 paper-explainer 技能后续升级（如新增标注盒、调整色板），应同步回灌这四个模板；反之，本模板沉淀的新组件也应回写进技能的 `references/html-template.md`，避免模板与技能脱节。
