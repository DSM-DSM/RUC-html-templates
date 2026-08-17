# assets/ · 素材目录

存放演示页的真实素材。目前不需要任何文件即可运行——`content.json` 中 `products[].shot` 留空时，页面自动渲染内置的「产品截图占位」框。

## 产品截图

放入截图后，在 `web_data/content.json` 对应产品的 `shot` 字段填写路径（相对本页面的 index.html）：

```json
{ "name": "产品 A", "desc": "……", "shot": "assets/line01-a.png" }
```

建议：

| 建议 | 说明 |
|---|---|
| 命名 | `line{章号}{序号}.{ext}`，如 `line01-a.webp`、`line03-b.webp` |
| 格式 | 优先 WebP（PNG / JPG 也可，但注意体积）；高分辨率 PNG 务必先压缩 |
| 比例 | 卡片统一 16:9 矩形 `object-fit: cover` 裁切，**左上角对齐**（左上角主体保证可见，溢出裁右侧/下侧） |
| 分辨率 | ≤ 1440px 宽即可（覆盖 Retina 2x），卡片实际渲染宽约 400-712px；headless 截图常按 DPR 放大产出 2400-3700px PNG（单张 1-3MB），引用前先降采样 |
| 背景 | 深色系截图融入最佳；浅色截图由卡片边框自然分隔，无需处理 |

> **体积红线**：产品截图合计控制在 ~1MB 量级。超过时用 PIL 转 WebP（quality 85、宽 ≤1440、RGBA 合白底丢 alpha），参考配方 `optimize_shots.py`（在正式实例 `commerical-lecture/assets/_shots_build/` 内）——实测 10.4MB → 1.2MB（8.6x），网页明显不卡。 |

## 人大主题素材（已内置）

| 文件 | 用途 |
|---|---|
| `ruc-emblem.svg` | 官方**单色校徽矢量**（100×100 viewBox，校徽红 `#931F31`）。人大红主题下与网页排版的「中国人民大学 / RENMIN UNIVERSITY OF CHINA」标准字组合为官方「中英文标准组合（上下）」的竖版效果，显示在 hero 最左侧（宽 108px） |
| `ruc-logo-1.webp` | 横版校徽组合（源 1545×392，已压缩为 WebP）。人大红主题下显示于页脚居中（高 26px，白底页脚上无缝融入） |
| `ruc-logo.svg` | 与 `ruc-emblem.svg` 同源的单色校徽矢量（lab-meeting 命名） |
| `ruc-bg.webp` | 校徽水印背景（源 2000×1500，已压缩为 WebP）。人大红主题下以 `contain` + multiply 渲染在预览卡右下角 |

以上素材随「人大红」主题（`theme-pack.js` 中 `id: "ruc"`）自动启用，其他主题不引用。来源：`html-templates/lecture/ruc_beamer_templates/`（RenminUniv.sty 视觉规范，校徽红 RGB 151,31,48）与 `html-templates/中国人民大学视觉识别系统/`（官方 VI 源文件为 EPS/PSD；`ruc-emblem.svg` 来自 lab-meeting 已矢量化处理件）。

## 其他可放素材（当前版本未消费）

- 汇报人照片 / 课题组 logo（后续如需加入 Hero 或页脚时再约定字段）
- 演示视频（当前版本不支持内嵌，建议改用截图 + 外部链接）
