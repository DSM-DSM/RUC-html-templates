# 数据 Schema 字典

`web_data/content.json` 是本网页的唯一数据源，经 `fetch()` 加载。**修改文案只改这个文件，无需动 index.html**（结构与样式不变的前提下）。

> ⚠️ 当前 `content.json` 全部为**占位内容**，正式汇报前必须替换（清单见 `../README.md`「替换清单」）。

---

## 顶层字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `meta` | object | 是 | 站点元信息（标题、署名） |
| `overview` | object | 是 | 开场「三条线，一个终点」段 |
| `lines` | array | 是 | 三条叙事线，**固定 3 项**（每项结构见下） |
| `closing` | object | 是 | 汇流收尾段 |

### `meta`

| 字段 | 说明 |
|---|---|
| `brand` | 顶栏品牌区文字（建议 4-10 字） |
| `title_line1` / `title_line2` | Hero 主标题两行。`title_line2` 支持 HTML：可用 `<span class="hl">…</span>` 标紫高亮词 |
| `subtitle` | Hero 副标题（一句话） |
| `presenter` / `institution` | 汇报人 / 机构，出现在 Hero 署名行与页脚 |
| `date` | 年份或日期 |
| `hero_cta` | Hero 主按钮文案 |

### `overview`

| 字段 | 说明 |
|---|---|
| `heading` | 大标题 |
| `lede` | 导语段 |
| `metrics` | 能力快照 3 项：`{value, label}`。value 建议用大数字（半角、`tabular-nums` 渲染） |
| `metrics_note` | 指标下方的注脚 |

### `lines[]`（三条线，顺序即页面顺序）

| 字段 | 说明 |
|---|---|
| `no` | 章号 `"01"`-`"03"`（半角数字，同时驱动脊柱与顶栏） |
| `title` | 线标题（顶栏、脊柱、线序言页共用） |
| `theme` | 一句话主题（脊柱节点与预览卡展示） |
| `intro` | 线序言页导语 |
| `skills` | **1-2 项**。1 项时该章自动变为 3 页（无 Skill ②页） |
| `outcomes` | 产出与构建页数据 |

`skills[]` 每项：

| 字段 | 说明 |
|---|---|
| `name` | skill 名 |
| `tagline` | 一句话定义（紫色强调行） |
| `purpose` | 解决什么问题（一段） |
| `capabilities` | 核心能力 3 条（右侧列表，编号自动生成） |

`outcomes`：

| 字段 | 说明 |
|---|---|
| `products` | 任意项；超过 2 个时产出页自动分页（每页 ≤2 张产品卡）。每项 `{name, desc, shot, build?}`：`shot` 填图片路径（如 `assets/line01-a.webp`）则渲染真实截图（16:9 矩形左上角对齐裁切），留空 `""` 则渲染内置「产品截图占位」框；`build` 可选——该产品自己的构建步骤（`{step, title, desc}` 数组），填写后点击此产品卡时右侧「如何构建」栏切换为它，未填则回退到本章 `outcomes.build` |
| `metrics` | 2 项：`{value, label}`（仅产出页第 1 分页显示） |
| `build` | 本章默认构建流程 4 步：`{step, title, desc}`（step 为 `"01"` 式半角编号）；产出页右侧「如何构建」默认显示第 1 个产品的 `build`（若其未填则显示本章此字段，多分页时按分页切分） |

### `closing`

| 字段 | 说明 |
|---|---|
| `heading` | 收尾大标题 |
| `text` | 合作邀约文案 |
| `cta_primary` / `cta_secondary` | 两个按钮文案 |
| `foot_note` | 页脚左侧声明 |

---

## 渲染规则备忘

- 中文文案遵循盘古之白：中西文之间、中文与数字之间留空格（如 `AI 能力`、`共 3 条线`）。
- 数字一律半角；`no`、`step` 等编号字段会以等宽字体渲染。
- 文案中不要使用 emoji；图标由页面内置 SVG 承担。
- `lines` 多于或少于 3 项时：多出的会被顶栏/脊柱忽略（不建议）；缺少的会留下空章节——请始终保持 3 项。
