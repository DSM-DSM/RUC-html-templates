// themes/_build.mjs
// 从基座 ../index.html 生成 10 个主题变体 + themes/index.html 预览入口。
// 主题 = :root 令牌重定义 + 组件皮肤覆盖层，叠加在基座共享结构 CSS 之上。
// 用法：node _build.mjs（cwd 不限）；改动主题后重跑即可全量再生成。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BASE_SRC = path.join(ROOT, '..', 'index.html');
const SUB_BASE_SRC = path.join(ROOT, '..', '01_example_method', 'index.html');
const base = fs.readFileSync(BASE_SRC, 'utf8');
const subBase = fs.readFileSync(SUB_BASE_SRC, 'utf8');
// 主题定义来自 ../theme-pack.js（唯一数据源：构建脚本与页面内切换器共用）
const THEMES = require('../theme-pack.js');


// ═══════════════════════════════════════════════════════════════════
// 生成逻辑
// ═══════════════════════════════════════════════════════════════════
function buildTheme(t) {
    const contract = `<!--
  主题变体 · ${t.name}（${t.en}）
  ------------------------------------------------------------------------
  THESIS: ${t.desc}
  OWN-WORLD: 见下方「主题覆盖层」CSS——基于主模板 index.html 的设计令牌
             重定义 + 组件皮肤覆盖，共享同一套组件类名、JS 与数据源。
  STORY: ${t.features.join('；')}。
  FIRST VIEWPORT: 主题化 header + 快速链接卡 + 仪表盘对比卡，第一屏即定调。
  FORM: 用户指定 10 主题体系（含 WWDC 浅/深）；由 themes/_build.mjs 生成。
  FINISH: 预览候选，未经选定与 finish review。
  数据源: ../web_data/（与主模板共享）；子页面入口: ../01_example_method/。
================================================================================
-->`;
    let html = base;
    html = html.replace('<!DOCTYPE html>\n<html', '<!DOCTYPE html>\n' + contract + '<html');
    // 页面默认主题（切换器回退项）+ 主题包路径适配（themes/ 子目录 → ../）
    html = html.replace('<body data-default-theme="default">', '<body data-default-theme="' + t.id + '">');
    html = html.replace('<body data-default-theme="default" data-asset-prefix="">', '<body data-default-theme="' + t.id + '" data-asset-prefix="../">');
    html = html.split('src="theme-pack.js"').join('src="../theme-pack.js"');
    // favicon：变体在 themes/ 子目录，相对路径上移一层
    html = html.split('<link rel="icon" type="image/svg+xml" href="assets/ruc-logo.svg">').join('<link rel="icon" type="image/svg+xml" href="../assets/ruc-logo.svg">');
    // 主题字体：有 webfont 的主题在 head 预置 link（切换器会按需替换）
    if (t.fonts) {
        html = html.replace('<head>', '<head>\n    <link rel="stylesheet" id="theme-fonts" href="' + t.fonts + '">');
    }
    // 主题素材（如 assets/ 下的校徽/背景图）：变体在 themes/ 子目录，url 上移一层
    const css = t.css.split('url(assets/').join('url(../assets/');
    html = html.replace('</style>', css + '\n        /* ═══ 主题覆盖层结束 ═══ */\n    </style>');
    html = html.replace('<title>项目名 实验进度报告 — 总览</title>',
        `<title>项目名 实验进度报告 — 总览 · ${t.name}</title>`);
    // 路径适配：themes/ 子目录 → 数据上移一层；子页面入口指向同主题子页面变体
    html = html.split("'web_data/").join("'../web_data/");
    html = html.split('href="01_example_method/index.html"').join(`href="${t.id}_sub.html"`);
    // 侧边栏页内导航的 data-target 不受影响；回写提示注释
    html = html.replace('<!-- 方向契约：', '<!-- 方向契约：主题变体 · ' + t.name + '（生成自 themes/_build.mjs） | ');
    return html;
}

// 子页面变体：与总览同主题，链接互指（返回总览 → 同主题总览；兄弟占位 → 本页自身）
function buildSubpage(t) {
    const contract = `<!--
  主题变体 · ${t.name}（${t.en}）· 子页面
  ------------------------------------------------------------------------
  THESIS: ${t.desc}
  OWN-WORLD: 与同主题总览变体（${t.id}.html）共享同一份「主题覆盖层」CSS。
  STORY: ${t.features.join('；')}。
  FIRST VIEWPORT: 主题化 header（含工具链接）+ 方法概览卡，第一屏即定调。
  FORM: 用户指定 10 主题体系需覆盖总览 + 子页面；由 themes/_build.mjs 生成。
  FINISH: 预览候选，未经选定与 finish review。
  数据源: ../web_data/（与主模板共享）；返回总览: ${t.id}.html（同主题）。
================================================================================
-->`;
    let html = subBase;
    html = html.replace('<!DOCTYPE html>\n<html', '<!DOCTYPE html>\n' + contract + '<html');
    html = html.replace('<body data-default-theme="default">', '<body data-default-theme="' + t.id + '">');
    // 子页面基座的 asset-prefix 已是 ../，保持；主题字体：有 webfont 的主题在 head 预置 link
    if (t.fonts) {
        html = html.replace('<head>', '<head>\n    <link rel="stylesheet" id="theme-fonts" href="' + t.fonts + '">');
    }
    // 主题素材（如 assets/ 下的校徽/背景图）：变体在 themes/ 子目录，url 上移一层
    const css = t.css.split('url(assets/').join('url(../assets/');
    html = html.replace('</style>', css + '\n        /* ═══ 主题覆盖层结束 ═══ */\n    </style>');
    html = html.replace('<title>子页面示例 — 方法概览 + 论文详解</title>',
        `<title>子页面示例 — 方法概览 + 论文详解 · ${t.name}</title>`);
    // 返回总览 → 同主题总览变体；兄弟页面占位链接 → 本页自身
    html = html.split('href="../index.html"').join(`href="${t.id}.html"`);
    html = html.split('href="index.html"').join(`href="${t.id}_sub.html"`);
    return html;
}

// ── 生成 10 个主题（总览 + 子页面成对） ──
for (const t of THEMES) {
    const out = path.join(ROOT, t.id + '.html');
    fs.writeFileSync(out, buildTheme(t), 'utf8');
    console.log('generated:', path.basename(out));
    const outSub = path.join(ROOT, t.id + '_sub.html');
    fs.writeFileSync(outSub, buildSubpage(t), 'utf8');
    console.log('generated:', path.basename(outSub));
}

// ── 生成预览入口 themes/index.html ──
const cardTpl = t => {
    const sw = t.swatch.map(c => `<span style="background:${c};"></span>`).join('');
    return `    <div class="card">
        <div class="swatch s-${t.id.split('_')[0]}"><span class="tag">${t.id.split('_')[0]} · ${t.name}</span><div class="sw-colors">${sw}</div></div>
        <div class="body">
            <h2>${t.name}</h2>
            <div class="en">${t.en}</div>
            <div class="desc">${t.desc}</div>
            <ul>${t.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <a class="link" href="${t.id}.html" style="background:${t.linkBg};">打开总览预览 →</a>
            <a class="link link-sub" href="${t.id}_sub.html">打开子页面预览 →</a>
        </div>
    </div>`;
};
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <link rel="icon" type="image/svg+xml" href="../assets/ruc-logo.svg">
    <title>组会汇报模板 · ${THEMES.length} 主题预览</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
            background: #0e131c; color: #d3dae6;
            max-width: 1140px; margin: 0 auto; padding: 48px 24px 64px;
        }
        header { text-align: center; margin-bottom: 40px; }
        header h1 { font-size: 2em; font-weight: 700; letter-spacing: -0.01em; color: #fff; }
        header .sub { color: #848fa3; margin-top: 12px; font-size: 0.95em; line-height: 1.65; }
        header .rule {
            width: 200px; height: 2px; margin: 24px auto 0;
            background: linear-gradient(90deg, transparent, #5b84c5, #c9a25e, #3ddc84, #e4685b, transparent);
            border-radius: 1px;
        }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }
        .card {
            background: #141a24; border-radius: 12px; border: 1px solid #1f2835;
            overflow: hidden; display: flex; flex-direction: column;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            transition: transform .2s, box-shadow .2s, border-color .2s;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45); border-color: #3a4555; }
        .swatch { height: 80px; position: relative; display: flex; align-items: flex-end; padding: 10px 14px; }
        .swatch .tag {
            position: absolute; top: 10px; left: 12px;
            font-size: 0.72em; font-weight: 600; letter-spacing: 0.05em;
            background: rgba(0, 0, 0, 0.5); color: #d3dae6;
            border-radius: 999px; padding: 2px 10px;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .swatch .sw-colors { display: flex; gap: 5px; }
        .swatch .sw-colors span { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255, 255, 255, 0.5); }
        .s-01 { background: radial-gradient(400px 180px at 20% -40px, rgba(10,132,255,0.16), transparent 65%), radial-gradient(400px 180px at 88% 115%, rgba(255,45,85,0.11), transparent 65%), #ffffff; }
        .s-01 .tag { color: #1d1d1f; background: rgba(255,255,255,0.7); border-color: rgba(0,0,0,0.1); }
        .s-02 { background: radial-gradient(400px 180px at 20% -40px, rgba(10,132,255,0.45), transparent 65%), radial-gradient(400px 180px at 88% 115%, rgba(255,55,95,0.32), transparent 65%), radial-gradient(300px 160px at 60% 45%, rgba(191,90,242,0.35), transparent 65%), #000; }
        .s-03 { background: radial-gradient(600px 200px at 80% -40px, rgba(201,162,94,0.4), transparent 65%), #070b12; }
        .s-04 { background: radial-gradient(350px 220px at 30% 0%, rgba(34,211,238,0.5), transparent 60%), radial-gradient(350px 220px at 100% 80%, rgba(167,139,250,0.5), transparent 65%), linear-gradient(160deg,#0b1120,#1c1735); }
        .s-05 { background: radial-gradient(450px 200px at 50% -60px, rgba(179,64,47,0.08), transparent 70%), #f5f1e8; }
        .s-05 .tag { color: #b3402f; background: rgba(255,255,255,0.7); border-color: rgba(0,0,0,0.1); }
        .s-06 { background: radial-gradient(450px 180px at 80% -50px, rgba(61,220,132,0.2), transparent 70%), #0a0e14; }
        .s-07 { background: repeating-linear-gradient(0deg, rgba(143,176,216,0.12) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(143,176,216,0.12) 0 1px, transparent 1px 22px), #10325c; }
        .s-08 { background: radial-gradient(1.5px 1.5px at 20% 30%, #e8eef7 50%, transparent 51%), radial-gradient(1px 1px at 60% 20%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 80% 60%, #e8eef7 50%, transparent 51%), radial-gradient(1.5px 1.5px at 35% 75%, #fff 50%, transparent 51%), linear-gradient(160deg, #0c1730, #070d1f); }
        .s-09 { background: #ffffff; }
        .s-09 .tag { color: #141414; background: rgba(255,255,255,0.7); border-color: rgba(0,0,0,0.1); }
        .s-10 { background: radial-gradient(120% 60% at 50% -10%, rgba(94,234,212,0.35), transparent 55%), radial-gradient(80% 50% at 90% 40%, rgba(167,139,250,0.35), transparent 60%), #050510; }
        .body { padding: 16px 20px 20px; display: flex; flex-direction: column; flex: 1; }
        .body h2 { font-size: 1.12em; margin-bottom: 2px; color: #fff; }
        .body .en { font-size: 0.74em; color: #6b7486; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
        .body .desc { font-size: 0.88em; color: #9ba5b8; line-height: 1.65; }
        .body ul { list-style: none; margin: 10px 0 14px; font-size: 0.82em; color: #6b7486; line-height: 1.75; }
        .body ul li::before { content: "·"; margin-right: 5px; color: #4a5568; }
        .body .link {
            margin-top: auto; display: block; text-align: center;
            padding: 9px 0; border-radius: 8px; font-size: 0.88em;
            font-weight: 600; text-decoration: none; color: #fff;
            transition: filter .15s;
        }
        .body .link:hover { filter: brightness(1.15); }
        .body .link-sub {
            margin-top: 8px; background: transparent; color: #9ba5b8;
            border: 1px solid #2a3442;
        }
        .body .link-sub:hover { filter: none; border-color: #4a5568; color: #d3dae6; }
        footer { text-align: center; margin-top: 44px; font-size: 0.82em; color: #6b7486; line-height: 1.9; }
        footer a { color: #5b84c5; }
        @media (max-width: 640px) {
            body { padding: 28px 14px 40px; }
            header h1 { font-size: 1.5em; }
        }
    </style>
</head>
<body>
<header>
    <h1>组会汇报模板 · ${THEMES.length} 主题预览</h1>
    <div class="sub">同一套组件、同一套数据源（web_data/），${THEMES.length} 种视觉世界 × 总览/子页面成对。点开对比，选出你的主题。</div>
    <div class="rule"></div>
</header>

<div class="grid">
${THEMES.map(cardTpl).join('\n')}
</div>

<footer>
    <p>全部变体由 <code>themes/_build.mjs</code> 从主模板 <a href="../index.html">index.html</a> 与子页面模板 <a href="../01_example_method/index.html">01_example_method/</a> 成对生成，与主模板共享组件类名、JS 逻辑与数据 JSON。</p>
    <p>每个主题一对文件：<code>0N_主题.html</code>（总览）+ <code>0N_主题_sub.html</code>（子页面），两页互相链接。</p>
    <p>主题数据源路径为 <code>../web_data/</code>，需在 <code>lab-meeting-1</code> 的上级目录启动 HTTP 服务器预览。</p>
</footer>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), indexHtml, 'utf8');
console.log('generated: index.html (preview)');
console.log(`done: ${THEMES.length} themes`);

