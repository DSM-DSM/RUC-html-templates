/* style_previews/_build.mjs — 生成 34 个主题预览变体 + 预览索引
 * 用法：node style_previews/_build.mjs（cwd 不限，可重复运行全量覆盖）
 * 变体从 ../index.html 派生：注入 __PREVIEW_THEME__ 固定主题、烘焙主题 css、修正相对路径。
 * 产物：style_previews/01_ruc-light.html ... 34_*.html + index.html + assets/ruc-emblem.svg 副本。
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const require = createRequire(import.meta.url);
const pack = require(join(root, 'theme-pack.js'));

const template = readFileSync(join(root, 'index.html'), 'utf8');

/* 学科材质豁免（detect.mjs 的 cream-palette / repeating-stripes-gradient 是
 * 「AI 默认奶油底 / 条纹装饰」告警；本模板的宣纸、羊皮纸、方格纸、竹简纹、
 * 烛图纹是用户指定的学科特征，非 AI 默认。豁免随变体文件一起分发。 */
const WAIVERS = {
  'cream-palette': ['lit-light', 'politics-light', 'law-light', 'history-light', 'socio-light', 'philo-light', 'fin-light', 'journal-light'],
  'repeating-stripes-gradient': ['math-light', 'math-dark', 'politics-light', 'politics-dark', 'law-light', 'law-dark', 'econ-light', 'econ-dark', 'lit-light', 'lit-dark', 'history-light', 'history-dark', 'bio-light', 'bio-dark', 'biz-light', 'biz-dark', 'fin-light', 'fin-dark']
};
const WAIVER_REASONS = {
  'cream-palette': '学科材质：该主题的纸张底色（宣纸/羊皮纸/旧纸/报纸）是学科特征需求，非默认奶油底',
  'repeating-stripes-gradient': '学科纹样：条纹为该学科背景母题（方格纸/竹简纤维/烛图刻度），有明确学科语义',
  'design-system-color': '主题包机制：变体烘焙了本主题的 37 个 token 颜色，34 套换肤本身就是设计系统的一部分'
};

/* 1. 生成变体 */
pack.THEMES.forEach((th, i) => {
  const no = String(i + 1).padStart(2, '0');
  let html = template;
  /* 豁免注入（整文件级，置于 head 顶部） */
  const waivers = [];
  for (const rule of Object.keys(WAIVERS)) {
    if (WAIVERS[rule].includes(th.id)) {
      waivers.push('<!-- impeccable-disable ' + rule + ': ' + WAIVER_REASONS[rule] + ' -->');
    }
  }
  /* 全部变体统一豁免：主题 token 颜色对照的是 DESIGN.md 的默认主题清单 */
  waivers.push('<!-- impeccable-disable design-system-color: ' + WAIVER_REASONS['design-system-color'] + ' -->');
  if (waivers.length) { html = html.replace('<head>', '<head>\n' + waivers.join('\n')); }
  /* 烘焙主题 css（替换兜底样式块内容） */
  html = html.replace(/<style id="theme-css">[\s\S]*?<\/style>/, '<style id="theme-css">\n' + th.css + '\n</style>');
  /* 相对路径修正 + 固定主题注入（注入必须在 head 预设脚本之前） */
  html = html.replace('<script src="theme-pack.js"></script>', '<script src="../theme-pack.js"></script><script>window.__PREVIEW_THEME__="' + th.id + '";</script>');
  /* css 里 url(assets/...) 同样剥层（ruc 校徽背景图，base-css 与 theme css 两处都会命中） */
  html = html.split('url(assets/').join('url(../assets/');
  /* html 标签与标题（只替换标签属性，勿全文 /g——会误伤 base-css 里 body[data-theme="ruc-light"] 选择器文本） */
  html = html.replace('<html lang="zh-CN" data-theme="ruc-light"', '<html lang="zh-CN" data-theme="' + th.id + '"');
  html = html.replace('<body data-theme="ruc-light">', '<body data-theme="' + th.id + '" data-f="' + (th.field || 'stats') + '">');
  html = html.replace(/<title>.*?<\/title>/, '<title>' + th.group + ' · ' + th.name + ' · 学术个人主页模板</title>');
  writeFileSync(join(__dirname, no + '_' + th.id + '.html'), html, 'utf8');
});

/* 2. 素材副本（css/img 的 url 相对 HTML 文档目录解析，每个目录放一份） */
mkdirSync(join(__dirname, 'assets'), { recursive: true });
copyFileSync(join(root, 'assets', 'ruc-emblem.svg'), join(__dirname, 'assets', 'ruc-emblem.svg'));
copyFileSync(join(root, 'assets', 'ruc-emblem-white.svg'), join(__dirname, 'assets', 'ruc-emblem-white.svg'));

/* 3. 预览索引 */
const groups = [];
const seen = {};
pack.THEMES.forEach((th) => {
  if (!seen.hasOwnProperty(th.group)) {
    seen[th.group] = groups.length;
    groups.push({ name: th.group, en: th.groupEn, items: [] });
  }
  groups[seen[th.group]].items.push(th);
});
let cards = '';
pack.THEMES.forEach((th, i) => {
  const no = String(i + 1).padStart(2, '0');
  cards += '  <a class="card" href="' + no + '_' + th.id + '.html">'
    + '<span class="sw"><i style="background:' + th.swatch[0] + '"></i><i style="background:' + th.swatch[1] + '"></i><i style="background:' + th.swatch[2] + '"></i></span>'
    + '<b>' + th.name + '</b><em>' + th.en + '</em><small>' + th.desc + '</small></a>\n';
});
let secs = '';
groups.forEach((g) => {
  let inner = '';
  pack.THEMES.forEach((th, i) => {
    if (th.group !== g.name) return;
    const no = String(i + 1).padStart(2, '0');
    inner += '<a href="' + no + '_' + th.id + '.html"><i style="background:' + th.swatch[0] + '"></i>'
      + th.name + ' <em>' + th.en + '</em></a>';
  });
  secs += '<section><h2>' + g.name + ' <em>' + g.en + '</em></h2><div class="row">' + inner + '</div></section>\n';
});
const gallery = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>个人学术主页 · 主题预览索引</title>
<!-- impeccable-disable design-system-color: 开发工具页独立中性样式，不随主题设计系统换肤 -->
<!-- impeccable-disable design-system-font: 开发工具页独立字体层级 -->
<!-- impeccable-disable design-system-radius: 开发工具页独立圆角刻度 -->
<style>
body{margin:0;background:#f6f5f3;color:#26211c;font:14px/1.7 "PingFang SC","Microsoft YaHei",sans-serif}
.wrap{max-width:1000px;margin:0 auto;padding:40px 24px 80px}
h1{font:700 26px Georgia,"Songti SC",serif;margin:0 0 6px}
p.sub{margin:0 0 34px;color:#6b645c;font-size:13px}
section{margin-bottom:30px}
section h2{font:700 17px Georgia,"Songti SC",serif;border-bottom:1px solid #e2ddd4;padding-bottom:8px}
section h2 em{font:400 12px Consolas,monospace;color:#6b645c;margin-left:8px}
.row{display:flex;flex-wrap:wrap;gap:8px;padding:12px 0 6px}
.row a{display:inline-flex;align-items:center;gap:7px;padding:6px 12px;background:#fff;border:1px solid #e2ddd4;border-radius:8px;color:#26211c;text-decoration:none;font-size:13px}
.row a:hover{border-color:#971f30;color:#971f30}
.row a i{width:11px;height:11px;border-radius:3px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)}
.row a em{font:400 11px Consolas,monospace;color:#6b645c}
.card{display:flex;flex-direction:column;gap:5px;background:#fff;border:1px solid #e2ddd4;border-radius:10px;padding:14px 16px;text-decoration:none;color:#26211c;width:calc(33.333% - 24px);box-sizing:border-box}
.card:hover{border-color:#971f30}
.sw{display:flex;gap:4px}
.sw i{width:16px;height:16px;border-radius:4px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)}
.card b{font-size:15px}
.card em{font:400 11px Consolas,monospace;color:#6b645c}
.card small{color:#6b645c;font-size:12px}
.grid{display:flex;flex-wrap:wrap;gap:16px}
@media(max-width:700px){.card{width:calc(50% - 8px)}}
@media(max-width:480px){.card{width:100%}}
</style>
</head>
<body>
<div class="wrap">
<h1>个人学术主页 · 主题预览</h1>
<p class="sub">34 套主题（16 学科 × 浅/深 + 人大红浅/深）。点击卡片直接打开对应主题的完整模板；主题可在右下角切换方块中随时更换。</p>
${secs}
<h2 style="margin-top:40px">全部变体文件</h2>
<div class="grid">
${cards}
</div>
</div>
</body>
</html>
`;
writeFileSync(join(__dirname, 'index.html'), gallery, 'utf8');
console.log('生成完成：' + pack.THEMES.length + ' 个变体 + 预览索引 + assets 副本');
