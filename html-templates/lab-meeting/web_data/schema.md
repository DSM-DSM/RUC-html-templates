# 数据 Schema 字典

`web_data/` 下两个 JSON 是网页的数据源。**`report_data.json` 必须存在**，`metrics_summary.json` 可选（缺失时总览页「汇总指标」卡整体隐藏）。

口径约定（全站一致）：**agg1 = 测试集（大字主值），agg0 = 验证集（小字副值），Δ 主行为测试集口径**。

> ⚠️ 模板自带的两个 JSON 均为**示例占位数据**（数值为整十整百的占位值、文字均以「占位」标注），新建站点时必须替换为你项目的真实数据。

---

## report_data.json

### 顶层字段

| 字段 | 类型 | 必填 | 消费方 | 说明 |
|---|---|---|---|---|
| `generated_at` | string | 否 | — | 数据生成日期，备忘用 |
| `site_meta` | object | 否 | `renderSiteMeta()`（总览）/ `loadSiteMeta()`（子页） | 站点元信息：顶部导航项目名 + 底部声明栏 |
| `project` | object | 否 | — | 项目元信息，备忘/展示用 |
| `baseline` | object | 是 | `renderDashboard()` | 基线指标 |
| `methods` | array | 否 | `renderDashboard()` | 方法列表（**list 而非 dict**） |
| `weekly_progress` | array | 是 | `updateHeader()` / `renderTimeline()` / `renderThisWeek()` | 每周进度，最后一周的 `saturday` 即下次组会日（倒计时用） |
| `todo_list` | array | 否 | `renderTodos()` | 待办分类列表 |
| `todos_note` | string | 否 | `renderTodos()` | 待办清单末尾的提示框 HTML（可含 `<code>`/`<a>`），删除则无提示框 |

### `site_meta`（可选；缺失时页面保留 HTML 占位符）

| 字段 | 说明 |
|---|---|
| `project_name` | 顶部导航品牌区显示的项目名（总览页） |
| `authors` | 底部声明栏「作者」 |
| `institution` | 底部声明栏「机构」（学校/公司；logo 用 `<img>` 替换声明栏 `.logo-slot` 占位） |
| `version` | 版本号（展示为 `v{version}`） |
| `updated` | 更新时间 |

### `project`

| 字段 | 说明 |
|---|---|
| `name` | 项目名（展示用） |
| `repo` | 仓库地址 |
| `description` | 一句话描述 |
| `core_idea` | 核心思想 |

### `baseline`

| 字段 | 类型 | 说明 |
|---|---|---|
| `original` | object | 原始基线：`run_name`、`test_auroc_macro_agg0`、`test_auroc_macro_agg1`、`best_val_auroc_macro` |
| `with_nan_mask` | object | 主基线（同 `original` 结构）。渲染时优先取 `with_nan_mask`，缺失回退 `original` |
| `violation_rate_pct` | number? | 可选。基线汇总指标（如层次违反率 VR%），提供则仪表盘卡片显示 |
| `reference_from_paper` | string? | 可选。论文声称值，渲染在仪表盘注释行 |

### `methods[]`（列表，勿用 dict）

| 字段 | 类型 | 说明 |
|---|---|---|
| `name` | string | 方法显示名 |
| `status` | string | `"completed"` = 已完成（仪表盘高亮），其他值（如 `"pending"`）= 未完成（半透明 + 待开展） |
| `best_result` | object? | 最优结果：`test_auroc_macro_agg0`、`test_auroc_macro_agg1`、`run_name`、`notes`（未完成方法为 `null`） |
| `runs` | array | 各次运行记录（含 `subtype`/`weight` 等筛选字段，供 subgroups 行回查 agg1） |
| `subgroups` | object | 可选。按分组（如 `variant_a`/`variant_b`）给出：`best_vr`、`best_vr_weight`、`best_agg0`、`best_agg0_weight`、`runs`。仪表盘为每组渲染一行 |
| `group` | string | 可选。仪表盘网格视图（dash-view-toggle 切换）的分组名：同组方法收进一个 `<details>` 折叠组；缺省时 Baseline 进「基准」组、其余进「方法总览」组 |

### `weekly_progress[]`（旧→新排列）

| 字段 | 类型 | 说明 |
|---|---|---|
| `week_start` | string | `"YYYY-MM-DD"`，周一 |
| `saturday` | string | `"YYYY-MM-DD"`，组会日（周六）。**最后一周的 saturday = 下次组会日** |
| `summary` | string | 本周一句话总结 |
| `completed` | string[] | 完成事项（✅） |
| `issues` | string[] | 遇到的问题（⚠️） |
| `next_steps` | string[] | 下周计划（📋） |
| `key_metrics` | object | 可选。本周关键指标 `{指标名: 数值/字符串}` |

### `todo_list[]`

| 字段 | 说明 |
|---|---|
| `category` | 分类名（含「紧急」字样时渲染 🔴 图标，否则 📌） |
| `items[].text` | 待办文字 |
| `items[].done` | 是否完成（勾选 + 删除线） |
| `items[].urgent` | 紧急（红底 + 🔴 tag） |
| `items[].in_progress` | 进行中（蓝 tag） |

---

## metrics_summary.json（可选）

结构自由，但总览页 `renderSummaryMetrics()` 按以下约定读取（不匹配则跳过渲染）：

| 字段 | 类型 | 说明 |
|---|---|---|
| `n_pairs` | number? | 约束/对数量，展示在指标卡 |
| `baseline_run` | string? | 基线 run 名（缺省取第一个 run） |
| `per_run_results` | object | `{run_name: {...}}` |

`per_run_results` 每项：

| 字段 | 说明 |
|---|---|
| `status` | `"ok"` 才参与渲染 |
| `violations.overall_violation_rate_pct` | 主指标（百分比，卡片 + 表格排序用） |
| `violations.overall_violation_rate` | 同上（小数形式） |
| `violations.n_samples_with_violations` / `n_samples` | 受影响样本数 / 总样本数 |

> 想改汇总卡的指标定义（公式、单位），改 `index.html` 的 `renderSummaryMetrics()` 与 `#summary-formula` 内的 LaTeX 即可。
