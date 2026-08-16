# commerical-lecture · AI 能力汇报演示页

面向潜在合作方（如华为）的**商业汇报演示网页模板**：以三条叙事线展开——个人科研开展 → 团队科研协作 → 从个人到团队，每条线展示 1-2 个 skill、skill 产出的产品、以及 skill 的构建过程。

## 设计语言（四系统合并）

- **基底**：Linear 暗色原生（`#08090a`、半透明白边框、亮度层级堆叠）
- **Hero 与 AI 元素**：Superhuman twilight 深紫渐变（`#1b1938`）+ 薰衣草紫 `#cbb7fb` 唯一 accent——星云背景、星座网络、叙事轴脉冲光点
- **排版气质**：Stripe 轻字重大数字、蓝调浮影
- **信息架构**：IBM 结构化内容块、token 化变量体系、企业级克制密度

## 形态：混合式

1. **开场（自然滚动）**：全屏 twilight Hero → 「三条线，一个终点」滚动驱动叙事轴 + 三线预览卡 + 能力快照
2. **三章（翻页节奏）**：每章一个全屏 slide deck（线序言 / Skill ① / Skill ② / 产出与构建），滚轮、键盘、翻页笔（PageDown）、触屏滑动、左右按钮均可翻页
3. **收尾（自然滚动）**：三线汇流动画 + 合作邀约 + 页脚

## 主题系统：一键切换 6 套主题

顶栏右侧的半月按钮打开主题面板，点击即切换、**刷新后保持**（localStorage）。7 套主题（3 暗 4 亮、全部离线可用）：

| 主题 | 明暗 | 气质 |
|---|---|---|
| 夜航 Twilight（默认） | 暗 | 深紫星夜 + 薰衣草紫 + 奶油 CTA |
| 晨雾 Dawn | 亮 | 暖白 + 深紫，夜航的昼版 |
| 蓝图 Blueprint | 亮 | 白蓝坐标纸 + 工程蓝 + 图纸数字 |
| 宣纸 Ink | 亮 | 暖宣纸 + 朱砂 + 宋体书卷气 |
| 星图 Starmap | 暗 | 深蓝夜幕 + 金色星轨 + 衬线数字 |
| 墨夜 Nocturne | 暗 | 暖黑墨底 + 朱砂，宣纸的夜版 |
| 人大红 RUC | 亮 | 校徽红 `#971f30`：红底顶栏 + hero 最左侧竖版校徽组合 + 白底页脚红分隔线 + 预览卡校徽水印 |

> **人大红主题的校徽**：`assets/ruc-emblem.svg`（官方单色校徽矢量）与网页排版的「中国人民大学 / RENMIN UNIVERSITY OF CHINA」标准字组合成官方「中英文标准组合（上下）」的竖版效果，置于 **hero 最左侧、导航栏下方**（垂直居中，主内容自动右移）；页脚另有一枚横版校徽（`ruc-logo-1.png`）。移动端（<760px）竖版组合自动隐藏、内容恢复居中。需要让页面**默认以人大红打开**时，把 `<body data-default-theme="twilight">` 改为 `data-default-theme="ruc"` 即可。

**主题维护**：所有主题定义在 `theme-pack.js`（唯一数据源），每个主题 = 一段 CSS token 覆盖（约 40 行）。新增主题 = 在 pack 数组里加一个 `{id, name, swatch, css}` 条目；改主题 = 改对应 css 字符串。基座组件颜色必须全部走 `var(--token)`（约 40 个 token 在 index.html 的 `:root`），硬编码颜色会导致换肤失效。

## 打开方式

数据经 `fetch()` 加载，**必须走 HTTP 服务器**（与 lab-meeting 模板相同约定）：

```bash
cd html-templates/commerical-lecture
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

> 直接双击 index.html 会被浏览器拦截 fetch，只会显示「数据加载失败」说明面板。Edge / Firefox 直接打开 file:// 通常可用。

## 目录结构

```
commerical-lecture/
├── index.html              # 全部样式与交互（内联 CSS/JS，无任何外部依赖）
├── theme-pack.js           # 主题包唯一数据源：6 套主题的 token 覆盖定义
├── web_data/
│   ├── content.json        # 唯一数据源：全部文案、章节、skill、产出
│   └── schema.md           # 数据字典
├── assets/                 # 真实素材（产品截图等），见 assets/README.md
├── PRODUCT.md              # 产品事实记录
└── DESIGN.md               # 设计系统（含主题系统章节）
```

## 替换清单（正式汇报前必做）

当前 `content.json` **全部为占位文案**，按以下顺序替换：

1. **`meta`**：`title_line1` / `title_line2` / `subtitle`（汇报主题）、`presenter`（汇报人）、`institution`（课题组/机构）、`date`
2. **`overview`**：`lede` 导语；`metrics` 三格真实数据（技能数 / 产出项目数 / 协作人次等）
3. **`lines[0..2]`**：每条线的 `title` / `theme` / `intro`、1-2 个真实 skill（`name` / `tagline` / `purpose` / `capabilities`）、`outcomes.products`（名称 + 描述 + `shot` 截图路径）、`outcomes.metrics`、`outcomes.build` 四步构建过程
4. **产品截图**：把真实截图放入 `assets/`（建议命名 `line01-a.png`、`line01-b.png`、`line02-a.png`…），在 `shot` 字段填路径；不填则显示内置占位框
5. **`closing`**：合作邀约文案、两个按钮文案

> 每条线 `skills` 允许 1-2 项：填 1 项时该章自动省略 Skill ②页（3 页制）。页面结构与样式在替换文案后自动适配，无需改代码。

## 交互速查

| 操作 | 效果 |
|---|---|
| 滚轮 / PageDown / ↓ / → / 空格 | 章节内下一页；末页进入下一段 |
| PageUp / ↑ / ← | 上一页；首页回到上一段 |
| Home / End | 跳到本章首 / 末页 |
| 触屏上下滑动 | 同上（移动端） |
| 顶栏 01/02/03 或预览卡 | 直接跳入对应章节 |
| 左下角圆钮 | 上一页 / 下一页 |

## 已知限制

- 无外部字体/CDN 依赖，中文用系统字体栈（PingFang / 微软雅黑等）
- `prefers-reduced-motion` 开启时自动降级为纯淡入淡出、无位移动画
- 章节内为翻页模式，页面滚动条在章节区域不可用（属预期行为）
