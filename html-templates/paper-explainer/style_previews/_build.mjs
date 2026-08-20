#!/usr/bin/env node
/* ============================================================================
 * Paper Explainer 主题预览构建脚本（与 lecture/style_previews/_build.mjs、
 * lab-meeting/themes/_build.mjs 同构）
 * ----------------------------------------------------------------------------
 * 读取 _skeleton.html + ../theme-pack.js，为每套主题生成一个变体页面
 * （NN_{id}.html，主题 css 烘焙进 <style id="theme-css">），外加 index.html
 * 画廊入口。产物勿手改：改主题 → 改 theme-pack.js → 重跑本脚本。
 * 用法：node style_previews/_build.mjs   （cwd 不限）
 * ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');

const pack = require(join(ROOT, 'theme-pack.js'));
const skeleton = readFileSync(join(HERE, '_skeleton.html'), 'utf8');
mkdirSync(HERE, { recursive: true });

const files = [];

pack.THEMES.forEach((t, i) => {
  const num = String(i + 1).padStart(2, '0');
  const fname = `${num}_${t.id}.html`;
  const isDefault = t.id === pack.DEFAULT_THEME;

  /* 三处占位符全部用 split/join 替换（字符串 replace 只换首个匹配，
     头注释里的同名占位符会先被消耗 —— 踩过的坑） */
  let html = skeleton
    .split('/*__THEME_CSS__*/').join(t.css)
    .split('__THEME_ATTR__').join(isDefault
      ? ''
      : ` data-theme="${t.id}" style="color-scheme:${t.mode}"`)
    .split('__THEME_NAME__').join(t.name);

  writeFileSync(join(HERE, fname), html, 'utf8');
  files.push({ fname, t });
  console.log(`  生成 ${fname}  （${t.name} ${t.en} · ${t.mode} · ${t.flavor}）`);
});

/* ---------------- index.html 画廊入口 ---------------- */
const cards = files.map(({ fname, t }) => `
  <a class="card" href="${fname}">
    <span class="band" style="background:linear-gradient(100deg,${t.swatch[0]} 0 38%,${t.swatch[2]} 38% 62%,${t.swatch[1]} 62% 100%)"></span>
    <span class="row">
      <b>${t.name}</b><i>${t.en}</i>
      <em class="mode ${t.mode}">${t.mode === 'dark' ? '暗' : '明'} · ${t.flavor}</em>
    </span>
    <span class="desc">${t.desc}</span>
  </a>`).join('\n');

const index = `<!DOCTYPE html>
<!-- Paper Explainer 主题预览画廊（_build.mjs 生成，勿手改） -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Paper Explainer 模板 · 主题预览画廊</title>
<link rel="icon" type="image/svg+xml" href="ruc-mark.svg">
<style>
  :root{color-scheme:light}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans SC",sans-serif;
    background:#f6f6f3;color:#232a31;line-height:1.7;padding:40px 24px 64px;max-width:1060px;margin:0 auto}
  header{border-top:2px solid #232a31;padding:22px 2px 18px;border-bottom:1px solid #cfcec3;margin-bottom:10px}
  h1{font-family:Georgia,"Times New Roman","Songti SC","STSong","SimSun",serif;font-weight:600;font-size:1.7em;letter-spacing:.01em}
  .sub{color:#5b6470;font-size:.92em;margin-top:6px}
  .meta{color:#5f6974;font-size:.82em;margin-top:14px}
  .meta a{color:#2a6298;text-decoration:none}
  .meta a:hover{text-decoration:underline;text-underline-offset:3px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:24px}
  .card{display:block;background:#fff;border:1px solid #e4e3db;border-radius:12px;overflow:hidden;text-decoration:none;color:inherit;
    box-shadow:0 1px 2px rgba(22,26,31,.05),0 4px 14px rgba(22,26,31,.04);
    transition:transform .15s cubic-bezier(.2,.8,.2,1),box-shadow .15s ease,border-color .15s ease}
  .card:hover{transform:translateY(-3px);box-shadow:0 2px 5px rgba(22,26,31,.08),0 12px 28px rgba(22,26,31,.09);border-color:#cfcec3}
  .band{display:block;height:54px}
  .row{display:flex;align-items:baseline;gap:8px;padding:13px 16px 2px}
  .row b{font-size:1.06em}
  .row i{font-style:normal;color:#5f6974;font-size:.78em;letter-spacing:.02em}
  .row .mode{margin-left:auto;font-style:normal;font-size:11px;border:1px solid #e4e3db;border-radius:999px;padding:1px 9px;color:#5b6470;white-space:nowrap}
  .row .mode.dark{background:#232a31;color:#e9eff5;border-color:#232a31}
  .desc{display:block;padding:2px 16px 15px;color:#5b6470;font-size:.86em}
</style>
</head>
<body>
<header>
  <h1>Paper Explainer 模板 · 主题预览画廊</h1>
  <div class="sub">8 套主题 = 4 明 + 4 暗（克制 ×6 · 适中 ×2）。点击卡片进入对应主题的全组件预览页；预览页右下角的切换方块可在任意主题间跳转，选择会记住并同步到四个模板页面。</div>
  <div class="meta">模板入口：<a href="../knowledge_graph_template.html">知识图谱</a> · <a href="../papers/paper_explainer_page_template.html">论文详解</a> · <a href="../nav/reading_path_template.html">阅读路径</a> · <a href="../nav/knowledge_supplement_template.html">背景知识</a>　|　主题数据源：../theme-pack.js　|　本页由 _build.mjs 生成</div>
</header>
<div class="grid">${cards}
</div>
</body>
</html>
`;
writeFileSync(join(HERE, 'index.html'), index, 'utf8');
console.log(`  生成 index.html  （${files.length} 套主题画廊入口）`);
console.log(`完成：${files.length + 1} 个文件 → ${HERE}`);
