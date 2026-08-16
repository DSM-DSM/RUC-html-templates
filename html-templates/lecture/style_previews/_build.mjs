// style_previews/_build.mjs
// 从 _skeleton.html + ../theme-pack.js 生成 16 个风格预览变体 + 预览入口 index.html。
// 主题 = theme-pack.js 内的完整 CSS（唯一数据源）；变体文件是生成产物，勿手改。
// 用法：node _build.mjs（cwd 不限）；改动主题后重跑即可全量再生成。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SKELETON = fs.readFileSync(path.join(ROOT, '_skeleton.html'), 'utf8');
const PACK = require('../theme-pack.js');
const THEMES = PACK.THEMES;

// 变体文件名（保持历史文件名稳定，预览入口与旧链接不失效）
const SLUGS = {
    '01': '01_dark_premium',
    '02': '02_minimal_elegance',
    '03': '03_glassmorphism',
    '04': '04_refined_blue',
    '05': '05_ink_vermilion',
    '06': '06_neumorphism',
    '07': '07_editorial',
    '08': '08_acid_neon',
    '09': '09_dossier',
    '10': '10_terminal',
    '11': '11_blueprint',
    '12': '12_starmap',
    '13': '13_swiss_grid',
    '14': '14_ruc_beamer',
    '15': '15_wwdc',
    '16': '16_wwdc_light',
};

function buildVariant(t) {
    const contract = `<!--
  风格候选 #${t.id} · ${t.name}（${t.en}）
  ------------------------------------------------------------------------
  THESIS: ${t.desc}
  OWN-WORLD: 主题 CSS 全部来自 ../theme-pack.js（唯一数据源），本文件由
             _build.mjs 生成，手改会被重跑覆盖——改主题请改 theme-pack.js。
  STORY: ${t.features.join('；')}。
  FIRST VIEWPORT: 主题化封面 header + 幕头 + 幻灯片卡片，第一屏即定调。
  FORM: 16 风格候选统一接入主题切换方块（右下角），localStorage 跨页连续。
  FINISH: 预览候选，未经选定与 finish review。
  说明: ../slide_deck_template.html 为占位内容主模板，../slide_deck_template_guide.md 为配套文档。
================================================================================
-->`;
    let html = SKELETON;
    html = html.replace('<!DOCTYPE html>\n<html', '<!DOCTYPE html>\n' + contract + '<html');
    html = html.split('__DEFAULT_THEME__').join(t.id);
    html = html.split('__THEME_NAME__').join(t.name);
    html = html.split('__THEME_FONTS__').join(t.fonts || '');
    html = html.split('__THEME_CSS__').join(t.css);
    return html;
}

// ── 生成 16 个变体 ──
for (const t of THEMES) {
    const out = path.join(ROOT, SLUGS[t.id] + '.html');
    fs.writeFileSync(out, buildVariant(t), 'utf8');
    console.log('generated:', SLUGS[t.id] + '.html');
}

// ── 生成预览入口 index.html ──
// 色条背景：各主题首屏观感的缩略（含浅色主题的标签反色）
const SWATCH_BG = {
    '01': `radial-gradient(600px 200px at 80% -40px, rgba(201,162,94,0.4), transparent 65%), #070b12`,
    '02': `#faf9f7`,
    '03': `radial-gradient(350px 220px at 30% 0%, rgba(34,211,238,0.5), transparent 60%), radial-gradient(350px 220px at 100% 80%, rgba(167,139,250,0.5), transparent 65%), linear-gradient(160deg,#0b1120,#1c1735)`,
    '04': `radial-gradient(450px 180px at 50% -60px, rgba(36,113,163,0.3), transparent 70%), #f5f8fc`,
    '05': `radial-gradient(450px 200px at 50% -60px, rgba(35,33,29,0.12), transparent 70%), #f5f1e8`,
    '06': `#e3e8ec`,
    '07': `#ffffff`,
    '08': `radial-gradient(350px 200px at 85% -40px, rgba(168,85,247,0.4), transparent 65%), radial-gradient(350px 200px at 10% 120%, rgba(255,46,136,0.35), transparent 65%), #0a0a10`,
    '09': `linear-gradient(160deg, #f4ecd9 0%, #e8dcbf 100%)`,
    '10': `radial-gradient(450px 180px at 80% -50px, rgba(56,189,248,0.2), transparent 70%), #0a0e14`,
    '11': `repeating-linear-gradient(0deg, rgba(143,176,216,0.12) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(143,176,216,0.12) 0 1px, transparent 1px 22px), #10325c`,
    '12': `radial-gradient(1.5px 1.5px at 20% 30%, #e8eef7 50%, transparent 51%), radial-gradient(1px 1px at 60% 20%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 80% 60%, #e8eef7 50%, transparent 51%), radial-gradient(1.5px 1.5px at 35% 75%, #fff 50%, transparent 51%), linear-gradient(160deg, #0c1730, #070d1f)`,
    '13': `#f6f5f1`,
    '14': `radial-gradient(500px 220px at 50% -40px, rgba(151,31,48,0.2), transparent 70%), #fdf8f8`,
    '15': `radial-gradient(400px 180px at 20% -40px, rgba(10,132,255,0.45), transparent 65%), radial-gradient(400px 180px at 88% 115%, rgba(255,55,95,0.32), transparent 65%), radial-gradient(300px 160px at 60% 45%, rgba(191,90,242,0.35), transparent 65%), #000`,
    '16': `radial-gradient(400px 180px at 20% -40px, rgba(10,132,255,0.16), transparent 65%), radial-gradient(400px 180px at 88% 115%, rgba(255,45,85,0.11), transparent 65%), radial-gradient(300px 160px at 60% 45%, rgba(175,82,222,0.11), transparent 65%), #ffffff`,
};
const LIGHT_TAG = new Set(['02', '04', '05', '06', '07', '09', '13', '14', '16']);
// 链接按钮文字色：深底按钮用白字，浅底/亮色按钮用深字（对比度 ≥4.5:1）
const LINK_TEXT = {
    '01': '#0b0f17', // 香槟金底
    '02': '#ffffff',
    '03': '#062024', // 青色半透明底
    '04': '#ffffff',
    '05': '#ffffff',
    '06': '#0b0f17', // 柔和蓝底
    '07': '#ffffff',
    '08': '#0b0f17', // 荧光绿底
    '09': '#ffffff',
    '10': '#0b0f17', // 荧光绿底
    '11': '#0b2342', // 蓝图线底
    '12': '#0c1730', // 星金底
    '13': '#ffffff',
    '14': '#ffffff',
    '15': '#ffffff',
    '16': '#ffffff',
};

const cardTpl = t => {
    const sw = t.swatch.map(c => `<span style="background:${c};"></span>`).join('');
    const tagDark = LIGHT_TAG.has(t.id)
        ? `<span class="tag tag-light">${t.id} · ${t.name}</span>`
        : `<span class="tag">${t.id} · ${t.name}</span>`;
    return `    <div class="card">
        <div class="swatch s-${t.id}">${tagDark}<div class="sw-colors">${sw}</div></div>
        <div class="body">
            <h2>${t.name}</h2>
            <div class="en">${t.en}</div>
            <div class="desc">${t.desc}</div>
            <ul>${t.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <a class="link" href="${SLUGS[t.id]}.html" style="background:${t.linkBg};color:${LINK_TEXT[t.id]};">打开预览 →</a>
        </div>
    </div>`;
};

const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <link rel="icon" href="data:,">
    <title>演示讲演模板 · ${THEMES.length} 风格预览</title>
    <!-- impeccable-disable repeating-stripes-gradient -- 预览入口顶部多色规则线为 16 主题色标合辑，非 AI 装饰条纹 -->
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
            background: #0e131c; color: #d3dae6;
            max-width: 1140px; margin: 0 auto; padding: 48px 24px 64px;
        }
        header { text-align: center; margin-bottom: 40px; }
        header h1 { font-size: 2em; font-weight: 700; letter-spacing: -0.01em; color: #fff; }
        header .sub { color: #9aa5b8; margin-top: 12px; font-size: 0.95em; line-height: 1.7; }
        header .rule {
            width: 200px; height: 2px; margin: 24px auto 0;
            background: linear-gradient(90deg, transparent, #5b84c5, #c9a25e, #3ddc84, #e4685b, transparent);
            border-radius: 1px;
        }
        .divider {
            margin: 36px 0 20px;
            color: #7a859a;
            font-size: 0.84em;
            letter-spacing: 0.08em;
            text-align: center;
        }
        .divider span { padding: 0 20px; }
        .divider::before, .divider::after {
            content: "";
            display: inline-block;
            width: 60px;
            vertical-align: middle;
            border-top: 1px solid #29303d;
        }
        .divider::before { margin-right: 12px; }
        .divider::after { margin-left: 12px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }
        .card {
            background: #141a24; border-radius: 12px; border: 1px solid #1f2835;
            overflow: hidden; display: flex; flex-direction: column;
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.32);
            transition: transform .2s, box-shadow .2s, border-color .2s;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.42); border-color: #3a4555; }
        .swatch { height: 80px; position: relative; display: flex; align-items: flex-end; padding: 10px 14px; }
        .swatch .tag {
            position: absolute; top: 10px; left: 12px;
            font-size: 0.72em; font-weight: 600; letter-spacing: 0.05em;
            background: rgba(0, 0, 0, 0.5); color: #d3dae6;
            border-radius: 999px; padding: 2px 10px;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .swatch .tag-light { color: #2b2f38; background: rgba(255, 255, 255, 0.72); border-color: rgba(0, 0, 0, 0.1); }
        .swatch .sw-colors { display: flex; gap: 5px; }
        .swatch .sw-colors span { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255, 255, 255, 0.5); }
        .body { padding: 16px 20px 20px; display: flex; flex-direction: column; flex: 1; }
        .body h2 { font-size: 1.12em; margin-bottom: 2px; color: #fff; }
        .body .en { font-size: 0.74em; color: #7a859a; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
        .body .desc { font-size: 0.88em; color: #9ba5b8; line-height: 1.65; }
        .body ul { list-style: none; margin: 10px 0 14px; font-size: 0.82em; color: #7a859a; line-height: 1.75; }
        .body ul li::before { content: "·"; margin-right: 5px; color: #4a5568; }
        .body .link {
            margin-top: auto; display: block; text-align: center;
            padding: 9px 0; border-radius: 8px; font-size: 0.88em;
            font-weight: 600; text-decoration: none; color: #0b0f17;
            transition: filter .15s;
        }
        .body .link:hover { filter: brightness(1.15); }
        footer { text-align: center; margin-top: 44px; font-size: 0.84em; color: #7a859a; line-height: 1.9; }
        footer a { color: #5b84c5; }
        @media (max-width: 640px) {
            body { padding: 28px 14px 40px; }
            header h1 { font-size: 1.5em; }
        }
    </style>
</head>
<body>
<header>
    <h1>演示讲演模板 · ${THEMES.length} 风格预览</h1>
    <div class="sub">同一套组件、同一页面结构，${THEMES.length} 种视觉世界。每个页面右下角都有主题切换方块，可随时换肤；选择会跨页面保持。</div>
    <div class="rule"></div>
</header>

<div class="divider"><span>系列一 · 风格主题（01–08）</span></div>
<div class="grid">
${THEMES.filter(t => Number(t.id) <= 8).map(cardTpl).join('\n')}
</div>

<div class="divider"><span>系列二 · 视觉世界（09–16）</span></div>
<div class="grid">
${THEMES.filter(t => Number(t.id) > 8).map(cardTpl).join('\n')}
</div>

<footer>
    <p>全部变体由 <code>_build.mjs</code> 从 <code>_skeleton.html</code> + <code>../theme-pack.js</code> 生成，与主模板 <a href="../slide_deck_template.html">slide_deck_template.html</a> 共享组件类名、切换方块与主题数据。</p>
    <p>配套说明见 <a href="../slide_deck_template_guide.md">slide_deck_template_guide.md</a></p>
</footer>
</body>
</html>
`;

const swatchCss = Object.entries(SWATCH_BG)
    .map(([id, bg]) => `        .s-${id} { background: ${bg}; }`)
    .join('\n');
fs.writeFileSync(path.join(ROOT, 'index.html'), indexHtml.replace(
    '        .swatch .sw-colors span { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255, 255, 255, 0.5); }',
    '        .swatch .sw-colors span { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255, 255, 255, 0.5); }\n' + swatchCss
), 'utf8');
console.log('generated: index.html (preview)');
console.log(`done: ${THEMES.length} variants`);
