/* theme-pack.js — 学术个人主页主题包单一数据源（UMD 双模式）
 * 浏览器：<script src="theme-pack.js"> → window.HOMEPAGE_THEME_PACK
 * Node 构建：require('./theme-pack.js')
 * 新增/修改主题只改本文件；css 为 :root token 覆盖层 + body[data-theme] 专属装饰。
 * 每个主题必须写全 37 个 token（buildCss 按 TOKEN_ORDER 展开，缺项会漏写变量）。
 * 注意：index.html 中 <style id="theme-css"> 的兜底内容与 ruc-light 条目保持同值（两处同步改）。
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.HOMEPAGE_THEME_PACK = factory();
})(typeof self !== 'undefined' ? self : this, function () {

var TOKEN_ORDER = [
    '--bg-0','--bg-1','--bg-2',
    '--surface-1','--surface-2',
    '--border','--border-soft','--border-strong',
    '--text-hi','--text-mid','--text-low','--text-faint',
    '--accent','--accent-strong','--accent-ink','--accent-soft','--accent-dim',
    '--accent-2','--decor-ink',
    '--hero-grad','--bg-pattern','--bg-pattern-size',
    '--shadow-float','--shadow-card',
    '--code-bg','--code-ink','--sel-bg','--scrollbar','--scrollbar-hover',
    '--chip-bg','--chip-ink','--topbar-bg',
    '--badge-bg','--badge-ink','--btn-bg','--btn-ink','--btn-hover'
];

var F_SANS  = '"PingFang SC","Microsoft YaHei","Hiragino Sans GB","Source Han Sans SC",-apple-system,"Segoe UI",sans-serif';
var F_SERIF = 'Georgia,"Times New Roman","Songti SC","SimSun",serif';
var F_KAI   = '"KaiTi","STKaiti","Kaiti SC",Georgia,serif';
var F_MONO  = 'Consolas,"SF Mono",Menlo,ui-monospace,monospace';

var FONTS = {
    serif: { sans: F_SANS, serif: F_SERIF, display: F_SERIF, mono: F_MONO },
    kai:   { sans: F_SANS, serif: F_SERIF, display: F_KAI,   mono: F_MONO },
    sans:  { sans: F_SANS, serif: F_SERIF, display: F_SANS,  mono: F_MONO }
};

function buildCss(o, extra) {
    var s = ':root{';
    var f = FONTS[o._font] || FONTS.serif;
    for (var i = 0; i < TOKEN_ORDER.length; i++) {
        var k = TOKEN_ORDER[i];
        s += k + ':' + o[k] + ';';
    }
    s += '--font-sans:' + f.sans + ';';
    s += '--font-serif:' + f.serif + ';';
    s += '--font-display:' + f.display + ';';
    s += '--font-mono:' + f.mono + ';';
    return s + '}' + (extra || '');
}

var THEMES = [
/* ================= 人大红（默认主题） ================= */
{
    id: "ruc-light", group: "人大红", groupEn: "RUC",
    name: "人大红", en: "RUC Crimson",
    desc: "米白纸面 + 校徽红 accent，宋体标题的官方风亮色主题",
    swatch: ["#971f30", "#f8f5f1", "#ece5da"], decor: "ruc", field: "stats", minis: [], _font: "serif",
    css: buildCss({
        "--bg-0":"#f8f7f5","--bg-1":"#f2f0ed","--bg-2":"#ece9e5",
        "--surface-1":"rgba(151,31,48,.04)","--surface-2":"rgba(151,31,48,.07)",
        "--border":"rgba(90,30,35,.14)","--border-soft":"rgba(90,30,35,.08)","--border-strong":"rgba(90,30,35,.3)",
        "--text-hi":"#2a1d1a","--text-mid":"rgba(42,29,26,.78)","--text-low":"rgba(42,29,26,.58)","--text-faint":"rgba(42,29,26,.4)",
        "--accent":"#971f30","--accent-strong":"#7c1524","--accent-ink":"#fff8f4","--accent-soft":"rgba(151,31,48,.1)","--accent-dim":"rgba(151,31,48,.38)",
        "--accent-2":"#8a6d3b","--decor-ink":"#b03040",
        "--hero-grad":"linear-gradient(180deg,#f9f4ec 0%,#f1e7da 55%,#f8f5f1 100%)",
        "--bg-pattern":"none","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(90,30,35,.16),0 2px 6px -2px rgba(90,30,35,.1)",
        "--shadow-card":"0 1px 2px rgba(90,30,35,.05),0 3px 10px -3px rgba(90,30,35,.12)",
        "--code-bg":"#f0ede7","--code-ink":"#7c1524",
        "--sel-bg":"rgba(151,31,48,.22)","--scrollbar":"rgba(90,30,35,.22)","--scrollbar-hover":"rgba(90,30,35,.36)",
        "--chip-bg":"rgba(90,30,35,.05)","--chip-ink":"#7a5644","--topbar-bg":"rgba(248,247,245,.86)",
        "--badge-bg":"#971f30","--badge-ink":"#fff8f4","--btn-bg":"#971f30","--btn-ink":"#fff8f4","--btn-hover":"#7c1524"
    }, "body[data-theme='ruc-light']{border-top:3px solid #971f30}body[data-theme='ruc-light']::after{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:url(assets/ruc-emblem.svg);background-size:180px;background-repeat:repeat;opacity:.035}")
},
{
    id: "ruc-dark", group: "人大红", groupEn: "RUC",
    name: "人大夜红", en: "RUC Crimson Dark",
    desc: "暗红黑底 + 亮朱 accent 的深夜校园版",
    swatch: ["#e97a8c", "#1c1214", "#291a1d"], decor: "ruc", field: "stats", minis: [], _font: "serif",
    css: buildCss({
        "--bg-0":"#1c1214","--bg-1":"#221518","--bg-2":"#291a1d",
        "--surface-1":"rgba(240,190,200,.05)","--surface-2":"rgba(240,190,200,.09)",
        "--border":"rgba(240,200,205,.16)","--border-soft":"rgba(240,200,205,.09)","--border-strong":"rgba(240,200,205,.3)",
        "--text-hi":"#f4e9e4","--text-mid":"rgba(244,233,228,.8)","--text-low":"rgba(244,233,228,.62)","--text-faint":"rgba(244,233,228,.45)",
        "--accent":"#e97a8c","--accent-strong":"#f2a3ad","--accent-ink":"#2a0d12","--accent-soft":"rgba(233,122,140,.16)","--accent-dim":"rgba(233,122,140,.5)",
        "--accent-2":"#c9a25a","--decor-ink":"#de6f81",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(151,31,48,.16),transparent 70%),linear-gradient(180deg,#241317 0%,#1a1113 60%,#1c1214 100%)",
        "--bg-pattern":"none","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#2a1a1e","--code-ink":"#e8aab3",
        "--sel-bg":"rgba(233,122,140,.3)","--scrollbar":"rgba(240,200,205,.25)","--scrollbar-hover":"rgba(240,200,205,.4)",
        "--chip-bg":"rgba(240,200,205,.07)","--chip-ink":"#d9b9bb","--topbar-bg":"rgba(28,18,20,.85)",
        "--badge-bg":"#a82738","--badge-ink":"#fff","--btn-bg":"#b03a4c","--btn-ink":"#fff","--btn-hover":"#962c3d"
    }, "body[data-theme='ruc-dark']{border-top:3px solid #a82738}body[data-theme='ruc-dark']::after{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:url(assets/ruc-emblem-white.svg);background-size:180px;background-repeat:repeat;opacity:.04}")
},
/* ================= 数学 ================= */
{
    id: "math-light", group: "数学", groupEn: "Mathematics",
    name: "方格纸", en: "Graph Paper",
    desc: "方格纸底纹 + 黑板绿 accent，尺规作图装饰的亮色主题",
    swatch: ["#2c5e49", "#f7f8f3", "#e9ece1"], decor: "math", field: "math", minis: ["mini-math-a", "mini-math-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#f7f8f3","--bg-1":"#f0f2ea","--bg-2":"#e9ece1",
        "--surface-1":"rgba(44,94,73,.04)","--surface-2":"rgba(44,94,73,.07)",
        "--border":"rgba(28,38,32,.14)","--border-soft":"rgba(28,38,32,.08)","--border-strong":"rgba(28,38,32,.3)",
        "--text-hi":"#1c2620","--text-mid":"rgba(28,38,32,.78)","--text-low":"rgba(28,38,32,.58)","--text-faint":"rgba(28,38,32,.4)",
        "--accent":"#2c5e49","--accent-strong":"#1f4736","--accent-ink":"#f5faf6","--accent-soft":"rgba(44,94,73,.1)","--accent-dim":"rgba(44,94,73,.38)",
        "--accent-2":"#9a7b3f","--decor-ink":"#2c5e49",
        "--hero-grad":"linear-gradient(180deg,#f4f6ee 0%,#e7ecdf 55%,#f7f8f3 100%)",
        "--bg-pattern":"repeating-linear-gradient(0deg,rgba(44,94,73,.05) 0 1px,transparent 1px 26px),repeating-linear-gradient(90deg,rgba(44,94,73,.05) 0 1px,transparent 1px 26px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(28,38,32,.16),0 2px 6px -2px rgba(28,38,32,.1)",
        "--shadow-card":"0 1px 2px rgba(28,38,32,.05),0 3px 10px -3px rgba(28,38,32,.12)",
        "--code-bg":"#eef1e8","--code-ink":"#1f4736",
        "--sel-bg":"rgba(44,94,73,.22)","--scrollbar":"rgba(28,38,32,.22)","--scrollbar-hover":"rgba(28,38,32,.36)",
        "--chip-bg":"rgba(44,94,73,.06)","--chip-ink":"#3f574a","--topbar-bg":"rgba(247,248,243,.86)",
        "--badge-bg":"#2c5e49","--badge-ink":"#f5faf6","--btn-bg":"#2c5e49","--btn-ink":"#f5faf6","--btn-hover":"#1f4736"
    }, "body[data-theme='math-light'] .hero-en-name{font-style:italic}")
},
{
    id: "math-dark", group: "数学", groupEn: "Mathematics",
    name: "黑板", en: "Chalkboard",
    desc: "黑板绿黑底 + 粉笔白字，衬线标题的演算夜版",
    swatch: ["#7fb69b", "#101d17", "#182a21"], decor: "math", field: "math", minis: ["mini-math-a", "mini-math-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#101d17","--bg-1":"#14241d","--bg-2":"#182a21",
        "--surface-1":"rgba(232,239,233,.05)","--surface-2":"rgba(232,239,233,.09)",
        "--border":"rgba(232,239,233,.15)","--border-soft":"rgba(232,239,233,.08)","--border-strong":"rgba(232,239,233,.3)",
        "--text-hi":"#e8efe9","--text-mid":"rgba(232,239,233,.8)","--text-low":"rgba(232,239,233,.62)","--text-faint":"rgba(232,239,233,.45)",
        "--accent":"#7fb69b","--accent-strong":"#a3d0ba","--accent-ink":"#0f1c16","--accent-soft":"rgba(127,182,155,.14)","--accent-dim":"rgba(127,182,155,.45)",
        "--accent-2":"#d9b46a","--decor-ink":"#9fc7ad",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(127,182,155,.1),transparent 70%),linear-gradient(180deg,#15251d 0%,#0f1b15 60%,#101d17 100%)",
        "--bg-pattern":"repeating-linear-gradient(0deg,rgba(232,239,233,.06) 0 1px,transparent 1px 26px),repeating-linear-gradient(90deg,rgba(232,239,233,.06) 0 1px,transparent 1px 26px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#1c2f25","--code-ink":"#cfe3d6",
        "--sel-bg":"rgba(127,182,155,.28)","--scrollbar":"rgba(232,239,233,.25)","--scrollbar-hover":"rgba(232,239,233,.4)",
        "--chip-bg":"rgba(232,239,233,.07)","--chip-ink":"#b9ccc0","--topbar-bg":"rgba(16,29,23,.85)",
        "--badge-bg":"#3c6b54","--badge-ink":"#f0f7f2","--btn-bg":"#7fb69b","--btn-ink":"#0f1c16","--btn-hover":"#9fc7ad"
    }, "body[data-theme='math-dark'] .hero-en-name{font-style:italic}")
},
/* ================= 物理 ================= */
{
    id: "physics-light", group: "物理", groupEn: "Physics",
    name: "光谱", en: "Spectrum",
    desc: "冷白底 + 量子紫 accent + 光子金点缀，原子轨道装饰的亮色主题",
    swatch: ["#4f46b8", "#f8f9fc", "#e9edf5"], decor: "physics", field: "physics", minis: ["mini-physics-a", "mini-physics-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#f8f9fc","--bg-1":"#f1f4f9","--bg-2":"#e9edf5",
        "--surface-1":"rgba(79,70,184,.04)","--surface-2":"rgba(79,70,184,.07)",
        "--border":"rgba(27,32,51,.13)","--border-soft":"rgba(27,32,51,.08)","--border-strong":"rgba(27,32,51,.3)",
        "--text-hi":"#1b2033","--text-mid":"rgba(27,32,51,.78)","--text-low":"rgba(27,32,51,.58)","--text-faint":"rgba(27,32,51,.4)",
        "--accent":"#4f46b8","--accent-strong":"#3c3594","--accent-ink":"#f6f4ff","--accent-soft":"rgba(79,70,184,.1)","--accent-dim":"rgba(79,70,184,.38)",
        "--accent-2":"#b8860b","--decor-ink":"#4f46b8",
        "--hero-grad":"linear-gradient(180deg,#f3f4fc 0%,#e4e7f7 55%,#f8f9fc 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 20% 30%,rgba(79,70,184,.16) 50%,transparent 51%),radial-gradient(1px 1px at 70% 15%,rgba(79,70,184,.12) 50%,transparent 51%),radial-gradient(1.4px 1.4px at 50% 72%,rgba(184,134,11,.12) 50%,transparent 51%)","--bg-pattern-size":"170px 170px",
        "--shadow-float":"0 10px 14px -6px rgba(27,32,51,.16),0 2px 6px -2px rgba(27,32,51,.1)",
        "--shadow-card":"0 1px 2px rgba(27,32,51,.05),0 3px 10px -3px rgba(27,32,51,.12)",
        "--code-bg":"#edeff8","--code-ink":"#3c3594",
        "--sel-bg":"rgba(79,70,184,.22)","--scrollbar":"rgba(27,32,51,.22)","--scrollbar-hover":"rgba(27,32,51,.36)",
        "--chip-bg":"rgba(79,70,184,.06)","--chip-ink":"#4a4a63","--topbar-bg":"rgba(248,249,252,.86)",
        "--badge-bg":"#4f46b8","--badge-ink":"#f6f4ff","--btn-bg":"#4f46b8","--btn-ink":"#f6f4ff","--btn-hover":"#3c3594"
    }, "")
},
{
    id: "physics-dark", group: "物理", groupEn: "Physics",
    name: "星空", en: "Deep Space",
    desc: "深空蓝黑底 + 光子金 accent，星点与原子轨道装饰的暗色主题",
    swatch: ["#f4c430", "#0b1026", "#141b3a"], decor: "physics", field: "physics", minis: ["mini-physics-a", "mini-physics-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#0b1026","--bg-1":"#0f1530","--bg-2":"#141b3a",
        "--surface-1":"rgba(232,236,248,.05)","--surface-2":"rgba(232,236,248,.09)",
        "--border":"rgba(232,236,248,.15)","--border-soft":"rgba(232,236,248,.08)","--border-strong":"rgba(232,236,248,.3)",
        "--text-hi":"#e8ecf8","--text-mid":"rgba(232,236,248,.8)","--text-low":"rgba(232,236,248,.62)","--text-faint":"rgba(232,236,248,.45)",
        "--accent":"#f4c430","--accent-strong":"#f7d35e","--accent-ink":"#241a02","--accent-soft":"rgba(244,196,48,.14)","--accent-dim":"rgba(244,196,48,.45)",
        "--accent-2":"#8f9ff0","--decor-ink":"#e5c35c",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(79,70,184,.2),transparent 70%),linear-gradient(180deg,#101638 0%,#0b1026 60%,#0b1026 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 20% 30%,rgba(232,236,248,.22) 50%,transparent 51%),radial-gradient(1px 1px at 70% 15%,rgba(232,236,248,.16) 50%,transparent 51%),radial-gradient(1.4px 1.4px at 50% 72%,rgba(244,196,48,.22) 50%,transparent 51%)","--bg-pattern-size":"170px 170px",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#161d3d","--code-ink":"#c3cdf2",
        "--sel-bg":"rgba(244,196,48,.3)","--scrollbar":"rgba(232,236,248,.25)","--scrollbar-hover":"rgba(232,236,248,.4)",
        "--chip-bg":"rgba(232,236,248,.07)","--chip-ink":"#b9c2e0","--topbar-bg":"rgba(11,16,38,.85)",
        "--badge-bg":"#51471a","--badge-ink":"#f7e9b8","--btn-bg":"#f4c430","--btn-ink":"#241a02","--btn-hover":"#f7d35e"
    }, "")
},
/* ================= 政治学 ================= */
{
    id: "politics-light", group: "政治学", groupEn: "Political Science",
    name: "议厅", en: "Assembly",
    desc: "羊皮纸底 + 藏青与绯红双色，讲台列柱装饰的庄重亮色主题",
    swatch: ["#14213d", "#f7f3e8", "#e9e1c8"], decor: "politics", field: "politics", minis: ["mini-politics-a", "mini-politics-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#f7f3e8","--bg-1":"#f0ead9","--bg-2":"#e9e1c8",
        "--surface-1":"rgba(20,33,61,.04)","--surface-2":"rgba(20,33,61,.07)",
        "--border":"rgba(28,32,48,.14)","--border-soft":"rgba(28,32,48,.08)","--border-strong":"rgba(28,32,48,.3)",
        "--text-hi":"#1c2030","--text-mid":"rgba(28,32,48,.78)","--text-low":"rgba(28,32,48,.58)","--text-faint":"rgba(28,32,48,.4)",
        "--accent":"#14213d","--accent-strong":"#0e1a33","--accent-ink":"#f5f2e8","--accent-soft":"rgba(20,33,61,.1)","--accent-dim":"rgba(20,33,61,.38)",
        "--accent-2":"#a31621","--decor-ink":"#2c4470",
        "--hero-grad":"linear-gradient(180deg,#f6efdf 0%,#eae0c6 55%,#f7f3e8 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(20,33,61,.035) 0 1px,transparent 1px 84px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(28,32,48,.16),0 2px 6px -2px rgba(28,32,48,.1)",
        "--shadow-card":"0 1px 2px rgba(28,32,48,.05),0 3px 10px -3px rgba(28,32,48,.12)",
        "--code-bg":"#efe8d5","--code-ink":"#0e1a33",
        "--sel-bg":"rgba(20,33,61,.22)","--scrollbar":"rgba(28,32,48,.22)","--scrollbar-hover":"rgba(28,32,48,.36)",
        "--chip-bg":"rgba(20,33,61,.05)","--chip-ink":"#4a4a3d","--topbar-bg":"rgba(247,243,232,.86)",
        "--badge-bg":"#14213d","--badge-ink":"#f5f2e8","--btn-bg":"#14213d","--btn-ink":"#f5f2e8","--btn-hover":"#0e1a33"
    }, "")
},
{
    id: "politics-dark", group: "政治学", groupEn: "Political Science",
    name: "议政", en: "Council Night",
    desc: "深藏青底 + 绯红亮 accent 的夜间议事厅",
    swatch: ["#ec7b86", "#10151f", "#191f2e"], decor: "politics", field: "politics", minis: ["mini-politics-a", "mini-politics-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#10151f","--bg-1":"#141a26","--bg-2":"#191f2e",
        "--surface-1":"rgba(232,228,216,.05)","--surface-2":"rgba(232,228,216,.09)",
        "--border":"rgba(232,228,216,.15)","--border-soft":"rgba(232,228,216,.08)","--border-strong":"rgba(232,228,216,.3)",
        "--text-hi":"#e8e4d8","--text-mid":"rgba(232,228,216,.8)","--text-low":"rgba(232,228,216,.62)","--text-faint":"rgba(232,228,216,.45)",
        "--accent":"#ec7b86","--accent-strong":"#f5a5ae","--accent-ink":"#2a0a0e","--accent-soft":"rgba(236,123,134,.16)","--accent-dim":"rgba(236,123,134,.5)",
        "--accent-2":"#8fa3c8","--decor-ink":"#a9b8d4",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(194,59,70,.12),transparent 70%),linear-gradient(180deg,#151b29 0%,#0f131c 60%,#10151f 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(232,228,216,.04) 0 1px,transparent 1px 84px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#1c2130","--code-ink":"#d4d0c2",
        "--sel-bg":"rgba(236,123,134,.3)","--scrollbar":"rgba(232,228,216,.25)","--scrollbar-hover":"rgba(232,228,216,.4)",
        "--chip-bg":"rgba(232,228,216,.07)","--chip-ink":"#c0bcaa","--topbar-bg":"rgba(16,21,31,.85)",
        "--badge-bg":"rgba(194,59,70,.2)","--badge-ink":"#f0b7bc","--btn-bg":"#c23b46","--btn-ink":"#fff","--btn-hover":"#a33039"
    }, "")
},
/* ================= 法学 ================= */
{
    id: "law-light", group: "法学", groupEn: "Law",
    name: "天平", en: "Scales of Justice",
    desc: "羊皮纸底 + 深褐与金，天平与法典装饰的亮色主题",
    swatch: ["#3e2723", "#f6f1e6", "#e8dfc9"], decor: "law", field: "law", minis: ["mini-law-a", "mini-law-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#f6f1e6","--bg-1":"#efe8d8","--bg-2":"#e8dfc9",
        "--surface-1":"rgba(62,39,35,.04)","--surface-2":"rgba(62,39,35,.07)",
        "--border":"rgba(44,35,32,.15)","--border-soft":"rgba(44,35,32,.08)","--border-strong":"rgba(44,35,32,.3)",
        "--text-hi":"#2c2320","--text-mid":"rgba(44,35,32,.78)","--text-low":"rgba(44,35,32,.58)","--text-faint":"rgba(44,35,32,.4)",
        "--accent":"#3e2723","--accent-strong":"#2e1c19","--accent-ink":"#f7f1e6","--accent-soft":"rgba(62,39,35,.1)","--accent-dim":"rgba(62,39,35,.38)",
        "--accent-2":"#c9a227","--decor-ink":"#5a4436",
        "--hero-grad":"linear-gradient(180deg,#f5eddc 0%,#eadfc4 55%,#f6f1e6 100%)",
        "--bg-pattern":"repeating-linear-gradient(0deg,rgba(62,39,35,.028) 0 1px,transparent 1px 34px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(44,35,32,.16),0 2px 6px -2px rgba(44,35,32,.1)",
        "--shadow-card":"0 1px 2px rgba(44,35,32,.05),0 3px 10px -3px rgba(44,35,32,.12)",
        "--code-bg":"#efe7d2","--code-ink":"#2e1c19",
        "--sel-bg":"rgba(62,39,35,.22)","--scrollbar":"rgba(44,35,32,.22)","--scrollbar-hover":"rgba(44,35,32,.36)",
        "--chip-bg":"rgba(62,39,35,.05)","--chip-ink":"#5f514a","--topbar-bg":"rgba(246,241,230,.86)",
        "--badge-bg":"#3e2723","--badge-ink":"#f7f1e6","--btn-bg":"#3e2723","--btn-ink":"#f7f1e6","--btn-hover":"#2e1c19"
    }, "")
},
{
    id: "law-dark", group: "法学", groupEn: "Law",
    name: "法典", en: "Codex Night",
    desc: "深褐黑底 + 鎏金 accent 的暗色法典主题",
    swatch: ["#d4b04c", "#1e1715", "#2b211d"], decor: "law", field: "law", minis: ["mini-law-a", "mini-law-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#1e1715","--bg-1":"#241c19","--bg-2":"#2b211d",
        "--surface-1":"rgba(236,227,213,.05)","--surface-2":"rgba(236,227,213,.09)",
        "--border":"rgba(236,227,213,.15)","--border-soft":"rgba(236,227,213,.08)","--border-strong":"rgba(236,227,213,.3)",
        "--text-hi":"#ece3d5","--text-mid":"rgba(236,227,213,.8)","--text-low":"rgba(236,227,213,.62)","--text-faint":"rgba(236,227,213,.45)",
        "--accent":"#d4b04c","--accent-strong":"#e0c06a","--accent-ink":"#241c10","--accent-soft":"rgba(212,176,76,.15)","--accent-dim":"rgba(212,176,76,.5)",
        "--accent-2":"#b08a72","--decor-ink":"#c9a25a",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(212,176,76,.09),transparent 70%),linear-gradient(180deg,#261d19 0%,#1c1513 60%,#1e1715 100%)",
        "--bg-pattern":"repeating-linear-gradient(0deg,rgba(236,227,213,.035) 0 1px,transparent 1px 34px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#2b211d","--code-ink":"#d8c9a8",
        "--sel-bg":"rgba(212,176,76,.3)","--scrollbar":"rgba(236,227,213,.25)","--scrollbar-hover":"rgba(236,227,213,.4)",
        "--chip-bg":"rgba(236,227,213,.07)","--chip-ink":"#c5b9a0","--topbar-bg":"rgba(30,23,21,.85)",
        "--badge-bg":"rgba(212,176,76,.16)","--badge-ink":"#eed9a0","--btn-bg":"#d4b04c","--btn-ink":"#241c10","--btn-hover":"#b8943a"
    }, "")
},
/* ================= 经济学 ================= */
{
    id: "econ-light", group: "经济学", groupEn: "Economics",
    name: "均衡", en: "Equilibrium",
    desc: "坐标纸底 + 墨蓝与铜金，供需曲线装饰的亮色主题",
    swatch: ["#12305b", "#fafbfc", "#eceff4"], decor: "econ", field: "econ", minis: ["mini-econ-a", "mini-econ-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#fafbfc","--bg-1":"#f3f5f8","--bg-2":"#eceff4",
        "--surface-1":"rgba(18,48,91,.04)","--surface-2":"rgba(18,48,91,.07)",
        "--border":"rgba(23,35,59,.13)","--border-soft":"rgba(23,35,59,.08)","--border-strong":"rgba(23,35,59,.3)",
        "--text-hi":"#17233b","--text-mid":"rgba(23,35,59,.78)","--text-low":"rgba(23,35,59,.58)","--text-faint":"rgba(23,35,59,.4)",
        "--accent":"#12305b","--accent-strong":"#0c2344","--accent-ink":"#f5f8fc","--accent-soft":"rgba(18,48,91,.1)","--accent-dim":"rgba(18,48,91,.38)",
        "--accent-2":"#a8842c","--decor-ink":"#1d4376",
        "--hero-grad":"linear-gradient(180deg,#f5f7fa 0%,#e8edf4 55%,#fafbfc 100%)",
        "--bg-pattern":"repeating-linear-gradient(0deg,rgba(18,48,91,.04) 0 1px,transparent 1px 28px),repeating-linear-gradient(90deg,rgba(18,48,91,.04) 0 1px,transparent 1px 28px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(23,35,59,.16),0 2px 6px -2px rgba(23,35,59,.1)",
        "--shadow-card":"0 1px 2px rgba(23,35,59,.05),0 3px 10px -3px rgba(23,35,59,.12)",
        "--code-bg":"#eef1f6","--code-ink":"#0c2344",
        "--sel-bg":"rgba(18,48,91,.22)","--scrollbar":"rgba(23,35,59,.22)","--scrollbar-hover":"rgba(23,35,59,.36)",
        "--chip-bg":"rgba(18,48,91,.05)","--chip-ink":"#465268","--topbar-bg":"rgba(250,251,252,.86)",
        "--badge-bg":"#12305b","--badge-ink":"#f5f8fc","--btn-bg":"#12305b","--btn-ink":"#f5f8fc","--btn-hover":"#0c2344"
    }, "")
},
{
    id: "econ-dark", group: "经济学", groupEn: "Economics",
    name: "金市", en: "Bull Market",
    desc: "墨蓝黑底 + 金 accent 的夜间行情主题",
    swatch: ["#d9b25f", "#0e1626", "#172238"], decor: "econ", field: "econ", minis: ["mini-econ-a", "mini-econ-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#0e1626","--bg-1":"#121c30","--bg-2":"#172238",
        "--surface-1":"rgba(232,237,246,.05)","--surface-2":"rgba(232,237,246,.09)",
        "--border":"rgba(232,237,246,.15)","--border-soft":"rgba(232,237,246,.08)","--border-strong":"rgba(232,237,246,.3)",
        "--text-hi":"#e8edf6","--text-mid":"rgba(232,237,246,.8)","--text-low":"rgba(232,237,246,.62)","--text-faint":"rgba(232,237,246,.45)",
        "--accent":"#d9b25f","--accent-strong":"#e5c47c","--accent-ink":"#221a06","--accent-soft":"rgba(217,178,95,.15)","--accent-dim":"rgba(217,178,95,.5)",
        "--accent-2":"#7fa0d0","--decor-ink":"#c9a44e",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(217,178,95,.1),transparent 70%),linear-gradient(180deg,#131d33 0%,#0d1423 60%,#0e1626 100%)",
        "--bg-pattern":"repeating-linear-gradient(0deg,rgba(232,237,246,.05) 0 1px,transparent 1px 28px),repeating-linear-gradient(90deg,rgba(232,237,246,.05) 0 1px,transparent 1px 28px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#182238","--code-ink":"#c7d3ea",
        "--sel-bg":"rgba(217,178,95,.3)","--scrollbar":"rgba(232,237,246,.25)","--scrollbar-hover":"rgba(232,237,246,.4)",
        "--chip-bg":"rgba(232,237,246,.07)","--chip-ink":"#b3bfd6","--topbar-bg":"rgba(14,22,38,.85)",
        "--badge-bg":"rgba(217,178,95,.16)","--badge-ink":"#f0dda8","--btn-bg":"#d9b25f","--btn-ink":"#221a06","--btn-hover":"#bf9b47"
    }, "")
},
/* ================= 人工智能 ================= */
{
    id: "ai-light", group: "人工智能", groupEn: "AI & CS",
    name: "电路", en: "Circuit",
    desc: "点阵底 + 深青绿 accent，神经网络与等宽标注的亮色主题",
    swatch: ["#0c6b58", "#f6f9f7", "#e6ece8"], decor: "ai", field: "ai", minis: ["mini-ai-a", "mini-ai-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#f6f9f7","--bg-1":"#eef3f0","--bg-2":"#e6ece8",
        "--surface-1":"rgba(12,107,88,.04)","--surface-2":"rgba(12,107,88,.07)",
        "--border":"rgba(22,32,28,.13)","--border-soft":"rgba(22,32,28,.08)","--border-strong":"rgba(22,32,28,.3)",
        "--text-hi":"#16201c","--text-mid":"rgba(22,32,28,.78)","--text-low":"rgba(22,32,28,.58)","--text-faint":"rgba(22,32,28,.4)",
        "--accent":"#0c6b58","--accent-strong":"#095344","--accent-ink":"#f2faf6","--accent-soft":"rgba(12,107,88,.1)","--accent-dim":"rgba(12,107,88,.38)",
        "--accent-2":"#2e9e4f","--decor-ink":"#0c6b58",
        "--hero-grad":"linear-gradient(180deg,#f2f8f5 0%,#e3efe9 55%,#f6f9f7 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 12% 12%,rgba(12,107,88,.22) 50%,transparent 51%)","--bg-pattern-size":"24px 24px",
        "--shadow-float":"0 10px 14px -6px rgba(22,32,28,.16),0 2px 6px -2px rgba(22,32,28,.1)",
        "--shadow-card":"0 1px 2px rgba(22,32,28,.05),0 3px 10px -3px rgba(22,32,28,.12)",
        "--code-bg":"#e8efe9","--code-ink":"#095344",
        "--sel-bg":"rgba(12,107,88,.22)","--scrollbar":"rgba(22,32,28,.22)","--scrollbar-hover":"rgba(22,32,28,.36)",
        "--chip-bg":"rgba(12,107,88,.06)","--chip-ink":"#3d5550","--topbar-bg":"rgba(246,249,247,.86)",
        "--badge-bg":"#0c6b58","--badge-ink":"#f2faf6","--btn-bg":"#0c6b58","--btn-ink":"#f2faf6","--btn-hover":"#095344"
    }, "")
},
{
    id: "ai-dark", group: "人工智能", groupEn: "AI & CS",
    name: "终端", en: "Terminal",
    desc: "终端黑底 + 荧光绿 accent，代码位点阵的暗色主题",
    swatch: ["#39d353", "#0d1117", "#161c24"], decor: "ai", field: "ai", minis: ["mini-ai-a", "mini-ai-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#0d1117","--bg-1":"#11161d","--bg-2":"#161c24",
        "--surface-1":"rgba(230,237,243,.05)","--surface-2":"rgba(230,237,243,.09)",
        "--border":"rgba(230,237,243,.15)","--border-soft":"rgba(230,237,243,.08)","--border-strong":"rgba(230,237,243,.3)",
        "--text-hi":"#e6edf3","--text-mid":"rgba(230,237,243,.8)","--text-low":"rgba(230,237,243,.62)","--text-faint":"rgba(230,237,243,.45)",
        "--accent":"#39d353","--accent-strong":"#5ce07a","--accent-ink":"#06200c","--accent-soft":"rgba(57,211,83,.14)","--accent-dim":"rgba(57,211,83,.5)",
        "--accent-2":"#58a6ff","--decor-ink":"#3fb950",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(57,211,83,.1),transparent 70%),linear-gradient(180deg,#121823 0%,#0c1016 60%,#0d1117 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 12% 12%,rgba(57,211,83,.12) 50%,transparent 51%)","--bg-pattern-size":"26px 26px",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#161b22","--code-ink":"#7ee787",
        "--sel-bg":"rgba(57,211,83,.28)","--scrollbar":"rgba(230,237,243,.25)","--scrollbar-hover":"rgba(230,237,243,.4)",
        "--chip-bg":"rgba(230,237,243,.07)","--chip-ink":"#aebbc7","--topbar-bg":"rgba(13,17,23,.85)",
        "--badge-bg":"rgba(57,211,83,.15)","--badge-ink":"#9be8a8","--btn-bg":"#238636","--btn-ink":"#fff","--btn-hover":"#2ea043"
    }, "")
},
/* ================= 统计学 ================= */
{
    id: "stats-light", group: "统计学", groupEn: "Statistics",
    name: "钟形", en: "Bell Curve",
    desc: "数据蓝 + 强调橙双色，正态曲线与散点装饰的亮色主题",
    swatch: ["#1d4ed8", "#fbfcfd", "#edf1f8"], decor: "stats", field: "stats", minis: ["mini-stats-a", "mini-stats-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#fbfcfd","--bg-1":"#f4f7fb","--bg-2":"#edf1f8",
        "--surface-1":"rgba(29,78,216,.04)","--surface-2":"rgba(29,78,216,.07)",
        "--border":"rgba(26,36,51,.13)","--border-soft":"rgba(26,36,51,.08)","--border-strong":"rgba(26,36,51,.3)",
        "--text-hi":"#1a2433","--text-mid":"rgba(26,36,51,.78)","--text-low":"rgba(26,36,51,.58)","--text-faint":"rgba(26,36,51,.4)",
        "--accent":"#1d4ed8","--accent-strong":"#1e40af","--accent-ink":"#f5f8ff","--accent-soft":"rgba(29,78,216,.1)","--accent-dim":"rgba(29,78,216,.38)",
        "--accent-2":"#d97706","--decor-ink":"#1d4ed8",
        "--hero-grad":"linear-gradient(180deg,#f5f8fd 0%,#e7edf7 55%,#fbfcfd 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 30% 40%,rgba(29,78,216,.14) 50%,transparent 51%),radial-gradient(1px 1px at 70% 65%,rgba(217,119,6,.1) 50%,transparent 51%)","--bg-pattern-size":"130px 130px",
        "--shadow-float":"0 10px 14px -6px rgba(26,36,51,.16),0 2px 6px -2px rgba(26,36,51,.1)",
        "--shadow-card":"0 1px 2px rgba(26,36,51,.05),0 3px 10px -3px rgba(26,36,51,.12)",
        "--code-bg":"#eef2f9","--code-ink":"#1e40af",
        "--sel-bg":"rgba(29,78,216,.22)","--scrollbar":"rgba(26,36,51,.22)","--scrollbar-hover":"rgba(26,36,51,.36)",
        "--chip-bg":"rgba(29,78,216,.06)","--chip-ink":"#414e63","--topbar-bg":"rgba(251,252,253,.86)",
        "--badge-bg":"#1d4ed8","--badge-ink":"#f5f8ff","--btn-bg":"#1d4ed8","--btn-ink":"#f5f8ff","--btn-hover":"#1e40af"
    }, "")
},
{
    id: "stats-dark", group: "统计学", groupEn: "Statistics",
    name: "数据", en: "Data Night",
    desc: "数据蓝黑底 + 亮蓝橙双色 accent 的暗色主题",
    swatch: ["#60a5fa", "#0b1526", "#14223a"], decor: "stats", field: "stats", minis: ["mini-stats-a", "mini-stats-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#0b1526","--bg-1":"#0f1b30","--bg-2":"#14223a",
        "--surface-1":"rgba(232,238,248,.05)","--surface-2":"rgba(232,238,248,.09)",
        "--border":"rgba(232,238,248,.15)","--border-soft":"rgba(232,238,248,.08)","--border-strong":"rgba(232,238,248,.3)",
        "--text-hi":"#e8eef8","--text-mid":"rgba(232,238,248,.8)","--text-low":"rgba(232,238,248,.62)","--text-faint":"rgba(232,238,248,.45)",
        "--accent":"#60a5fa","--accent-strong":"#8abcfb","--accent-ink":"#0a1420","--accent-soft":"rgba(96,165,250,.15)","--accent-dim":"rgba(96,165,250,.5)",
        "--accent-2":"#fb923c","--decor-ink":"#60a5fa",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(96,165,250,.14),transparent 70%),linear-gradient(180deg,#101d36 0%,#0a1422 60%,#0b1526 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 30% 40%,rgba(96,165,250,.18) 50%,transparent 51%),radial-gradient(1px 1px at 70% 65%,rgba(251,146,60,.14) 50%,transparent 51%)","--bg-pattern-size":"130px 130px",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#15243d","--code-ink":"#bcd7fb",
        "--sel-bg":"rgba(96,165,250,.3)","--scrollbar":"rgba(232,238,248,.25)","--scrollbar-hover":"rgba(232,238,248,.4)",
        "--chip-bg":"rgba(232,238,248,.07)","--chip-ink":"#b2c0d8","--topbar-bg":"rgba(11,21,38,.85)",
        "--badge-bg":"rgba(96,165,250,.16)","--badge-ink":"#bcd7fb","--btn-bg":"#2563eb","--btn-ink":"#fff","--btn-hover":"#3b82f6"
    }, "")
},
/* ================= 文学 ================= */
{
    id: "lit-light", group: "文学", groupEn: "Literature",
    name: "宣纸", en: "Rice Paper",
    desc: "宣纸底 + 墨色与朱砂，竹简装饰、楷体标题的书卷亮色主题",
    swatch: ["#a51d20", "#f5f0e2", "#e8dfc4"], decor: "lit", field: "lit", minis: ["mini-lit-a", "mini-lit-b"], _font: "kai",
    css: buildCss({
        "--bg-0":"#f5f0e2","--bg-1":"#efe8d4","--bg-2":"#e8dfc4",
        "--surface-1":"rgba(195,39,43,.04)","--surface-2":"rgba(195,39,43,.07)",
        "--border":"rgba(43,43,38,.16)","--border-soft":"rgba(43,43,38,.08)","--border-strong":"rgba(43,43,38,.3)",
        "--text-hi":"#2b2b26","--text-mid":"rgba(43,43,38,.78)","--text-low":"rgba(43,43,38,.58)","--text-faint":"rgba(43,43,38,.4)",
        "--accent":"#a51d20","--accent-strong":"#861a1d","--accent-ink":"#fdf6ec","--accent-soft":"rgba(165,29,32,.1)","--accent-dim":"rgba(165,29,32,.38)",
        "--accent-2":"#3d4a5c","--decor-ink":"#a33a33",
        "--hero-grad":"linear-gradient(180deg,#f4ecd9 0%,#e9dfc6 55%,#f5f0e2 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(43,43,38,.02) 0 1px,transparent 1px 5px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(43,43,38,.16),0 2px 6px -2px rgba(43,43,38,.1)",
        "--shadow-card":"0 1px 2px rgba(43,43,38,.05),0 3px 10px -3px rgba(43,43,38,.12)",
        "--code-bg":"#eee6d0","--code-ink":"#861a1d",
        "--sel-bg":"rgba(165,29,32,.22)","--scrollbar":"rgba(43,43,38,.22)","--scrollbar-hover":"rgba(43,43,38,.36)",
        "--chip-bg":"rgba(195,39,43,.05)","--chip-ink":"#6b5f48","--topbar-bg":"rgba(245,240,226,.86)",
        "--badge-bg":"#a51d20","--badge-ink":"#fdf6ec","--btn-bg":"#a51d20","--btn-ink":"#fdf6ec","--btn-hover":"#861a1d"
    }, "body[data-theme='lit-light'] .hero-name{font-weight:400}body[data-theme='lit-dark'] .hero-name{font-weight:400}")
},
{
    id: "lit-dark", group: "文学", groupEn: "Literature",
    name: "墨夜", en: "Ink Night",
    desc: "墨夜底 + 朱砂亮 accent，楷体标题的暗色书卷主题",
    swatch: ["#f08686", "#201d17", "#2d2820"], decor: "lit", field: "lit", minis: ["mini-lit-a", "mini-lit-b"], _font: "kai",
    css: buildCss({
        "--bg-0":"#201d17","--bg-1":"#262219","--bg-2":"#2d2820",
        "--surface-1":"rgba(236,228,210,.05)","--surface-2":"rgba(236,228,210,.09)",
        "--border":"rgba(236,228,210,.15)","--border-soft":"rgba(236,228,210,.08)","--border-strong":"rgba(236,228,210,.3)",
        "--text-hi":"#ece4d2","--text-mid":"rgba(236,228,210,.8)","--text-low":"rgba(236,228,210,.62)","--text-faint":"rgba(236,228,210,.45)",
        "--accent":"#f08686","--accent-strong":"#f7a6a6","--accent-ink":"#33110f","--accent-soft":"rgba(240,134,134,.15)","--accent-dim":"rgba(240,134,134,.5)",
        "--accent-2":"#c9a25a","--decor-ink":"#e08a7e",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(224,82,82,.09),transparent 70%),linear-gradient(180deg,#272319 0%,#1d1a14 60%,#201d17 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(236,228,210,.028) 0 1px,transparent 1px 5px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#2d2820","--code-ink":"#e0c9a8",
        "--sel-bg":"rgba(240,134,134,.3)","--scrollbar":"rgba(236,228,210,.25)","--scrollbar-hover":"rgba(236,228,210,.4)",
        "--chip-bg":"rgba(236,228,210,.07)","--chip-ink":"#c5bca6","--topbar-bg":"rgba(32,29,23,.85)",
        "--badge-bg":"rgba(224,82,82,.16)","--badge-ink":"#f0b5a8","--btn-bg":"#c2483f","--btn-ink":"#fff","--btn-hover":"#e05252"
    }, "")
},
/* ================= 新闻传播 ================= */
{
    id: "journal-light", group: "新闻传播", groupEn: "Journalism",
    name: "报头", en: "Masthead",
    desc: "报白底 + 报头红 accent，报纸版式装饰的亮色主题",
    swatch: ["#b3121c", "#fafaf7", "#edece5"], decor: "journal", field: "journal", minis: ["mini-journal-a", "mini-journal-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#fafaf7","--bg-1":"#f4f4ef","--bg-2":"#edece5",
        "--surface-1":"rgba(179,18,28,.04)","--surface-2":"rgba(179,18,28,.07)",
        "--border":"rgba(35,39,46,.13)","--border-soft":"rgba(35,39,46,.08)","--border-strong":"rgba(35,39,46,.3)",
        "--text-hi":"#23272e","--text-mid":"rgba(35,39,46,.78)","--text-low":"rgba(35,39,46,.58)","--text-faint":"rgba(35,39,46,.4)",
        "--accent":"#b3121c","--accent-strong":"#8f0e16","--accent-ink":"#fdf6f3","--accent-soft":"rgba(179,18,28,.1)","--accent-dim":"rgba(179,18,28,.38)",
        "--accent-2":"#5a6472","--decor-ink":"#a3131b",
        "--hero-grad":"linear-gradient(180deg,#f7f7f3 0%,#eeece4 55%,#fafaf7 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 14% 14%,rgba(35,39,46,.08) 50%,transparent 51%)","--bg-pattern-size":"14px 14px",
        "--shadow-float":"0 10px 14px -6px rgba(35,39,46,.16),0 2px 6px -2px rgba(35,39,46,.1)",
        "--shadow-card":"0 1px 2px rgba(35,39,46,.05),0 3px 10px -3px rgba(35,39,46,.12)",
        "--code-bg":"#f0efe9","--code-ink":"#8f0e16",
        "--sel-bg":"rgba(179,18,28,.22)","--scrollbar":"rgba(35,39,46,.22)","--scrollbar-hover":"rgba(35,39,46,.36)",
        "--chip-bg":"rgba(179,18,28,.05)","--chip-ink":"#5a5f66","--topbar-bg":"rgba(250,250,247,.86)",
        "--badge-bg":"#b3121c","--badge-ink":"#fdf6f3","--btn-bg":"#b3121c","--btn-ink":"#fdf6f3","--btn-hover":"#8f0e16"
    }, "")
},
{
    id: "journal-dark", group: "新闻传播", groupEn: "Journalism",
    name: "电讯", en: "Wire Night",
    desc: "铅灰黑底 + 电讯红 accent 的夜间报馆",
    swatch: ["#f1838b", "#16181d", "#21252c"], decor: "journal", field: "journal", minis: ["mini-journal-a", "mini-journal-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#16181d","--bg-1":"#1b1e24","--bg-2":"#21252c",
        "--surface-1":"rgba(232,233,236,.05)","--surface-2":"rgba(232,233,236,.09)",
        "--border":"rgba(232,233,236,.15)","--border-soft":"rgba(232,233,236,.08)","--border-strong":"rgba(232,233,236,.3)",
        "--text-hi":"#e8e9ec","--text-mid":"rgba(232,233,236,.8)","--text-low":"rgba(232,233,236,.62)","--text-faint":"rgba(232,233,236,.45)",
        "--accent":"#f1838b","--accent-strong":"#f7a6ae","--accent-ink":"#2e0c0e","--accent-soft":"rgba(241,131,139,.15)","--accent-dim":"rgba(241,131,139,.5)",
        "--accent-2":"#8fa0b5","--decor-ink":"#e26a73",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(214,69,80,.12),transparent 70%),linear-gradient(180deg,#1c1f26 0%,#14161b 60%,#16181d 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 14% 14%,rgba(232,233,236,.06) 50%,transparent 51%)","--bg-pattern-size":"14px 14px",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#21252c","--code-ink":"#d9c2c4",
        "--sel-bg":"rgba(241,131,139,.3)","--scrollbar":"rgba(232,233,236,.25)","--scrollbar-hover":"rgba(232,233,236,.4)",
        "--chip-bg":"rgba(232,233,236,.07)","--chip-ink":"#adb1b8","--topbar-bg":"rgba(22,24,29,.85)",
        "--badge-bg":"rgba(214,69,80,.16)","--badge-ink":"#f0b4b8","--btn-bg":"#c03c46","--btn-ink":"#fff","--btn-hover":"#d64550"
    }, "")
},
/* ================= 社会学 ================= */
{
    id: "socio-light", group: "社会学", groupEn: "Sociology",
    name: "群像", en: "Social Fabric",
    desc: "暖灰底 + 群青与赭石，社会网络节点装饰的亮色主题",
    swatch: ["#33597e", "#f6f4ef", "#e9e5da"], decor: "socio", field: "socio", minis: ["mini-socio-a", "mini-socio-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#f6f4ef","--bg-1":"#f0ede5","--bg-2":"#e9e5da",
        "--surface-1":"rgba(51,89,126,.04)","--surface-2":"rgba(51,89,126,.07)",
        "--border":"rgba(35,40,44,.13)","--border-soft":"rgba(35,40,44,.08)","--border-strong":"rgba(35,40,44,.3)",
        "--text-hi":"#23282c","--text-mid":"rgba(35,40,44,.78)","--text-low":"rgba(35,40,44,.58)","--text-faint":"rgba(35,40,44,.4)",
        "--accent":"#33597e","--accent-strong":"#254463","--accent-ink":"#f5f8fb","--accent-soft":"rgba(51,89,126,.1)","--accent-dim":"rgba(51,89,126,.38)",
        "--accent-2":"#a1662f","--decor-ink":"#3f668c",
        "--hero-grad":"linear-gradient(180deg,#f5f1e8 0%,#eae4d4 55%,#f6f4ef 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 20% 30%,rgba(51,89,126,.12) 50%,transparent 51%),radial-gradient(1px 1px at 70% 70%,rgba(161,102,47,.1) 50%,transparent 51%)","--bg-pattern-size":"110px 110px",
        "--shadow-float":"0 10px 14px -6px rgba(35,40,44,.16),0 2px 6px -2px rgba(35,40,44,.1)",
        "--shadow-card":"0 1px 2px rgba(35,40,44,.05),0 3px 10px -3px rgba(35,40,44,.12)",
        "--code-bg":"#ece8dc","--code-ink":"#254463",
        "--sel-bg":"rgba(51,89,126,.22)","--scrollbar":"rgba(35,40,44,.22)","--scrollbar-hover":"rgba(35,40,44,.36)",
        "--chip-bg":"rgba(51,89,126,.05)","--chip-ink":"#50544f","--topbar-bg":"rgba(246,244,239,.86)",
        "--badge-bg":"#33597e","--badge-ink":"#f5f8fb","--btn-bg":"#33597e","--btn-ink":"#f5f8fb","--btn-hover":"#254463"
    }, "")
},
{
    id: "socio-dark", group: "社会学", groupEn: "Sociology",
    name: "网结", en: "Network Night",
    desc: "群青黑底 + 亮青与赭石 accent 的暗色网络主题",
    swatch: ["#7fa3c8", "#12161c", "#1c222b"], decor: "socio", field: "socio", minis: ["mini-socio-a", "mini-socio-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#12161c","--bg-1":"#161b22","--bg-2":"#1c222b",
        "--surface-1":"rgba(230,227,218,.05)","--surface-2":"rgba(230,227,218,.09)",
        "--border":"rgba(230,227,218,.15)","--border-soft":"rgba(230,227,218,.08)","--border-strong":"rgba(230,227,218,.3)",
        "--text-hi":"#e6e3da","--text-mid":"rgba(230,227,218,.8)","--text-low":"rgba(230,227,218,.62)","--text-faint":"rgba(230,227,218,.45)",
        "--accent":"#7fa3c8","--accent-strong":"#a3bfdb","--accent-ink":"#0e141c","--accent-soft":"rgba(127,163,200,.15)","--accent-dim":"rgba(127,163,200,.5)",
        "--accent-2":"#c98d5f","--decor-ink":"#87a9cc",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(127,163,200,.12),transparent 70%),linear-gradient(180deg,#181d25 0%,#101319 60%,#12161c 100%)",
        "--bg-pattern":"radial-gradient(1px 1px at 20% 30%,rgba(127,163,200,.14) 50%,transparent 51%),radial-gradient(1px 1px at 70% 70%,rgba(201,141,95,.1) 50%,transparent 51%)","--bg-pattern-size":"110px 110px",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#1c222b","--code-ink":"#c5d0da",
        "--sel-bg":"rgba(127,163,200,.3)","--scrollbar":"rgba(230,227,218,.25)","--scrollbar-hover":"rgba(230,227,218,.4)",
        "--chip-bg":"rgba(230,227,218,.07)","--chip-ink":"#b4b1a6","--topbar-bg":"rgba(18,22,28,.85)",
        "--badge-bg":"rgba(127,163,200,.16)","--badge-ink":"#c2d7ea","--btn-bg":"#5f86ab","--btn-ink":"#fff","--btn-hover":"#7fa3c8"
    }, "")
},
/* ================= 哲学 ================= */
{
    id: "philo-light", group: "哲学", groupEn: "Philosophy",
    name: "思辨", en: "Dialectic",
    desc: "米白底 + 希腊蓝与陶土，Ω 同心环装饰的亮色主题",
    swatch: ["#1f4e79", "#f5f2ec", "#e8e3d6"], decor: "philo", field: "philo", minis: ["mini-philo-a", "mini-philo-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#f5f2ec","--bg-1":"#efebe1","--bg-2":"#e8e3d6",
        "--surface-1":"rgba(31,78,121,.04)","--surface-2":"rgba(31,78,121,.07)",
        "--border":"rgba(35,41,47,.13)","--border-soft":"rgba(35,41,47,.08)","--border-strong":"rgba(35,41,47,.3)",
        "--text-hi":"#23292f","--text-mid":"rgba(35,41,47,.78)","--text-low":"rgba(35,41,47,.58)","--text-faint":"rgba(35,41,47,.4)",
        "--accent":"#1f4e79","--accent-strong":"#173b5c","--accent-ink":"#f5f9fc","--accent-soft":"rgba(31,78,121,.1)","--accent-dim":"rgba(31,78,121,.38)",
        "--accent-2":"#b4582f","--decor-ink":"#275d90",
        "--hero-grad":"linear-gradient(180deg,#f4efe6 0%,#e9e2d1 55%,#f5f2ec 100%)",
        "--bg-pattern":"radial-gradient(circle at 30% 40%,transparent 0 56px,rgba(31,78,121,.05) 57px 58px,transparent 59px)","--bg-pattern-size":"240px 240px",
        "--shadow-float":"0 10px 14px -6px rgba(35,41,47,.16),0 2px 6px -2px rgba(35,41,47,.1)",
        "--shadow-card":"0 1px 2px rgba(35,41,47,.05),0 3px 10px -3px rgba(35,41,47,.12)",
        "--code-bg":"#eae5d9","--code-ink":"#173b5c",
        "--sel-bg":"rgba(31,78,121,.22)","--scrollbar":"rgba(35,41,47,.22)","--scrollbar-hover":"rgba(35,41,47,.36)",
        "--chip-bg":"rgba(31,78,121,.05)","--chip-ink":"#555a5c","--topbar-bg":"rgba(245,242,236,.86)",
        "--badge-bg":"#1f4e79","--badge-ink":"#f5f9fc","--btn-bg":"#1f4e79","--btn-ink":"#f5f9fc","--btn-hover":"#173b5c"
    }, "")
},
{
    id: "philo-dark", group: "哲学", groupEn: "Philosophy",
    name: "夜思", en: "Night Thought",
    desc: "深蓝黑底 + 亮蓝与陶土 accent 的暗色思辨主题",
    swatch: ["#8fb3d9", "#0e1420", "#171f30"], decor: "philo", field: "philo", minis: ["mini-philo-a", "mini-philo-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#0e1420","--bg-1":"#121927","--bg-2":"#171f30",
        "--surface-1":"rgba(231,226,214,.05)","--surface-2":"rgba(231,226,214,.09)",
        "--border":"rgba(231,226,214,.15)","--border-soft":"rgba(231,226,214,.08)","--border-strong":"rgba(231,226,214,.3)",
        "--text-hi":"#e7e2d6","--text-mid":"rgba(231,226,214,.8)","--text-low":"rgba(231,226,214,.62)","--text-faint":"rgba(231,226,214,.45)",
        "--accent":"#8fb3d9","--accent-strong":"#b3cfea","--accent-ink":"#0c141f","--accent-soft":"rgba(143,179,217,.15)","--accent-dim":"rgba(143,179,217,.5)",
        "--accent-2":"#cf8a5e","--decor-ink":"#98badc",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(143,179,217,.11),transparent 70%),linear-gradient(180deg,#141b2b 0%,#0c111d 60%,#0e1420 100%)",
        "--bg-pattern":"radial-gradient(circle at 30% 40%,transparent 0 56px,rgba(143,179,217,.05) 57px 58px,transparent 59px)","--bg-pattern-size":"240px 240px",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#171f30","--code-ink":"#c6c2b4",
        "--sel-bg":"rgba(143,179,217,.3)","--scrollbar":"rgba(231,226,214,.25)","--scrollbar-hover":"rgba(231,226,214,.4)",
        "--chip-bg":"rgba(231,226,214,.07)","--chip-ink":"#b3afa2","--topbar-bg":"rgba(14,20,32,.85)",
        "--badge-bg":"rgba(143,179,217,.16)","--badge-ink":"#cfe0f0","--btn-bg":"#5f84ab","--btn-ink":"#fff","--btn-hover":"#7a9fc7"
    }, "")
},
/* ================= 历史学 ================= */
{
    id: "history-light", group: "历史学", groupEn: "History",
    name: "竹帛", en: "Bamboo & Silk",
    desc: "旧纸底 + 青铜绿与铜金，鼎器装饰的亮色主题",
    swatch: ["#35604f", "#f2ecdd", "#e3dac0"], decor: "history", field: "history", minis: ["mini-history-a", "mini-history-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#f2ecdd","--bg-1":"#ebe3cf","--bg-2":"#e3dac0",
        "--surface-1":"rgba(63,107,94,.04)","--surface-2":"rgba(63,107,94,.07)",
        "--border":"rgba(42,38,32,.15)","--border-soft":"rgba(42,38,32,.08)","--border-strong":"rgba(42,38,32,.3)",
        "--text-hi":"#2a2620","--text-mid":"rgba(42,38,32,.78)","--text-low":"rgba(42,38,32,.58)","--text-faint":"rgba(42,38,32,.4)",
        "--accent":"#35604f","--accent-strong":"#2a4c3f","--accent-ink":"#f4f8f5","--accent-soft":"rgba(53,96,79,.1)","--accent-dim":"rgba(53,96,79,.38)",
        "--accent-2":"#a67c2e","--decor-ink":"#4a7666",
        "--hero-grad":"linear-gradient(180deg,#f1e9d6 0%,#e6dcc2 55%,#f2ecdd 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(42,38,32,.03) 0 1px,transparent 1px 38px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(42,38,32,.16),0 2px 6px -2px rgba(42,38,32,.1)",
        "--shadow-card":"0 1px 2px rgba(42,38,32,.05),0 3px 10px -3px rgba(42,38,32,.12)",
        "--code-bg":"#e9e0c8","--code-ink":"#2a4c3f",
        "--sel-bg":"rgba(53,96,79,.22)","--scrollbar":"rgba(42,38,32,.22)","--scrollbar-hover":"rgba(42,38,32,.36)",
        "--chip-bg":"rgba(63,107,94,.05)","--chip-ink":"#5d5648","--topbar-bg":"rgba(242,236,221,.86)",
        "--badge-bg":"#35604f","--badge-ink":"#f4f8f5","--btn-bg":"#35604f","--btn-ink":"#f4f8f5","--btn-hover":"#2a4c3f"
    }, "")
},
{
    id: "history-dark", group: "历史学", groupEn: "History",
    name: "铜鼎", en: "Bronze Night",
    desc: "青铜黑底 + 铜绿与金 accent 的暗色主题",
    swatch: ["#6fa38d", "#171310", "#221c16"], decor: "history", field: "history", minis: ["mini-history-a", "mini-history-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#171310","--bg-1":"#1c1713","--bg-2":"#221c16",
        "--surface-1":"rgba(232,224,208,.05)","--surface-2":"rgba(232,224,208,.09)",
        "--border":"rgba(232,224,208,.15)","--border-soft":"rgba(232,224,208,.08)","--border-strong":"rgba(232,224,208,.3)",
        "--text-hi":"#e8e0d0","--text-mid":"rgba(232,224,208,.8)","--text-low":"rgba(232,224,208,.62)","--text-faint":"rgba(232,224,208,.45)",
        "--accent":"#6fa38d","--accent-strong":"#94c2ad","--accent-ink":"#0e1a15","--accent-soft":"rgba(111,163,141,.15)","--accent-dim":"rgba(111,163,141,.5)",
        "--accent-2":"#c9a35a","--decor-ink":"#7caf9a",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(201,163,90,.08),transparent 70%),linear-gradient(180deg,#1e1914 0%,#14100d 60%,#171310 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(232,224,208,.032) 0 1px,transparent 1px 38px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#221c16","--code-ink":"#d5c9a8",
        "--sel-bg":"rgba(111,163,141,.3)","--scrollbar":"rgba(232,224,208,.25)","--scrollbar-hover":"rgba(232,224,208,.4)",
        "--chip-bg":"rgba(232,224,208,.07)","--chip-ink":"#bfb7a4","--topbar-bg":"rgba(23,19,16,.85)",
        "--badge-bg":"rgba(111,163,141,.16)","--badge-ink":"#c5e0d4","--btn-bg":"#5e8a76","--btn-ink":"#0e1a15","--btn-hover":"#6fa38d"
    }, "")
},
/* ================= 化学 ================= */
{
    id: "chem-light", group: "化学", groupEn: "Chemistry",
    name: "烧瓶", en: "Flask",
    desc: "实验室白底 + 靛蓝 accent，烧瓶与苯环装饰的亮色主题",
    swatch: ["#3456a6", "#f8fafc", "#e9eff5"], decor: "chem", field: "chem", minis: ["mini-chem-a", "mini-chem-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#f8fafc","--bg-1":"#f1f5f9","--bg-2":"#e9eff5",
        "--surface-1":"rgba(52,86,166,.04)","--surface-2":"rgba(52,86,166,.07)",
        "--border":"rgba(26,34,48,.13)","--border-soft":"rgba(26,34,48,.08)","--border-strong":"rgba(26,34,48,.3)",
        "--text-hi":"#1a2230","--text-mid":"rgba(26,34,48,.78)","--text-low":"rgba(26,34,48,.58)","--text-faint":"rgba(26,34,48,.4)",
        "--accent":"#3456a6","--accent-strong":"#27418a","--accent-ink":"#f5f8ff","--accent-soft":"rgba(52,86,166,.1)","--accent-dim":"rgba(52,86,166,.38)",
        "--accent-2":"#2f9e77","--decor-ink":"#3456a6",
        "--hero-grad":"linear-gradient(180deg,#f4f7fb 0%,#e6edf6 55%,#f8fafc 100%)",
        "--bg-pattern":"radial-gradient(1.4px 1.4px at 25% 25%,rgba(52,86,166,.14) 50%,transparent 51%),radial-gradient(1.4px 1.4px at 75% 75%,rgba(47,158,119,.1) 50%,transparent 51%)","--bg-pattern-size":"100px 100px",
        "--shadow-float":"0 10px 14px -6px rgba(26,34,48,.16),0 2px 6px -2px rgba(26,34,48,.1)",
        "--shadow-card":"0 1px 2px rgba(26,34,48,.05),0 3px 10px -3px rgba(26,34,48,.12)",
        "--code-bg":"#eaf0f8","--code-ink":"#27418a",
        "--sel-bg":"rgba(52,86,166,.22)","--scrollbar":"rgba(26,34,48,.22)","--scrollbar-hover":"rgba(26,34,48,.36)",
        "--chip-bg":"rgba(52,86,166,.06)","--chip-ink":"#434e64","--topbar-bg":"rgba(248,250,252,.86)",
        "--badge-bg":"#3456a6","--badge-ink":"#f5f8ff","--btn-bg":"#3456a6","--btn-ink":"#f5f8ff","--btn-hover":"#27418a"
    }, "")
},
{
    id: "chem-dark", group: "化学", groupEn: "Chemistry",
    name: "试剂", en: "Reagent Night",
    desc: "深蓝黑底 + 亮蓝与试剂青 accent 的暗色主题",
    swatch: ["#6ea8dc", "#0d1b2a", "#162640"], decor: "chem", field: "chem", minis: ["mini-chem-a", "mini-chem-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#0d1b2a","--bg-1":"#112035","--bg-2":"#162640",
        "--surface-1":"rgba(232,240,248,.05)","--surface-2":"rgba(232,240,248,.09)",
        "--border":"rgba(232,240,248,.15)","--border-soft":"rgba(232,240,248,.08)","--border-strong":"rgba(232,240,248,.3)",
        "--text-hi":"#e8f0f8","--text-mid":"rgba(232,240,248,.8)","--text-low":"rgba(232,240,248,.62)","--text-faint":"rgba(232,240,248,.45)",
        "--accent":"#6ea8dc","--accent-strong":"#94c2ea","--accent-ink":"#0a1520","--accent-soft":"rgba(110,168,220,.15)","--accent-dim":"rgba(110,168,220,.5)",
        "--accent-2":"#7fd1ae","--decor-ink":"#7cb2e0",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(110,168,220,.14),transparent 70%),linear-gradient(180deg,#12233a 0%,#0b1726 60%,#0d1b2a 100%)",
        "--bg-pattern":"radial-gradient(1.4px 1.4px at 25% 25%,rgba(110,168,220,.16) 50%,transparent 51%),radial-gradient(1.4px 1.4px at 75% 75%,rgba(127,209,174,.1) 50%,transparent 51%)","--bg-pattern-size":"100px 100px",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#162640","--code-ink":"#c3dcf2",
        "--sel-bg":"rgba(110,168,220,.3)","--scrollbar":"rgba(232,240,248,.25)","--scrollbar-hover":"rgba(232,240,248,.4)",
        "--chip-bg":"rgba(232,240,248,.07)","--chip-ink":"#b0c2d4","--topbar-bg":"rgba(13,27,42,.85)",
        "--badge-bg":"rgba(110,168,220,.16)","--badge-ink":"#cfe3f2","--btn-bg":"#4d7fb0","--btn-ink":"#fff","--btn-hover":"#6ea8dc"
    }, "")
},
/* ================= 生物学 ================= */
{
    id: "bio-light", group: "生物学", groupEn: "Biology",
    name: "双螺旋", en: "Double Helix",
    desc: "叶绿与花橙，DNA 双螺旋装饰的亮色主题",
    swatch: ["#276b43", "#f7faf7", "#e7efe9"], decor: "bio", field: "bio", minis: ["mini-bio-a", "mini-bio-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#f7faf7","--bg-1":"#eff5f0","--bg-2":"#e7efe9",
        "--surface-1":"rgba(47,125,79,.04)","--surface-2":"rgba(47,125,79,.07)",
        "--border":"rgba(28,38,32,.13)","--border-soft":"rgba(28,38,32,.08)","--border-strong":"rgba(28,38,32,.3)",
        "--text-hi":"#1c2620","--text-mid":"rgba(28,38,32,.78)","--text-low":"rgba(28,38,32,.58)","--text-faint":"rgba(28,38,32,.4)",
        "--accent":"#276b43","--accent-strong":"#1f5735","--accent-ink":"#f4faf6","--accent-soft":"rgba(39,107,67,.1)","--accent-dim":"rgba(39,107,67,.38)",
        "--accent-2":"#e9a13b","--decor-ink":"#37855a",
        "--hero-grad":"linear-gradient(180deg,#f3f8f4 0%,#e4efe7 55%,#f7faf7 100%)",
        "--bg-pattern":"repeating-linear-gradient(45deg,rgba(47,125,79,.028) 0 1px,transparent 1px 30px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(28,38,32,.16),0 2px 6px -2px rgba(28,38,32,.1)",
        "--shadow-card":"0 1px 2px rgba(28,38,32,.05),0 3px 10px -3px rgba(28,38,32,.12)",
        "--code-bg":"#e9f0e9","--code-ink":"#1f5735",
        "--sel-bg":"rgba(39,107,67,.22)","--scrollbar":"rgba(28,38,32,.22)","--scrollbar-hover":"rgba(28,38,32,.36)",
        "--chip-bg":"rgba(47,125,79,.06)","--chip-ink":"#3f5745","--topbar-bg":"rgba(247,250,247,.86)",
        "--badge-bg":"#276b43","--badge-ink":"#f4faf6","--btn-bg":"#276b43","--btn-ink":"#f4faf6","--btn-hover":"#1f5735"
    }, "")
},
{
    id: "bio-dark", group: "生物学", groupEn: "Biology",
    name: "夜林", en: "Forest Night",
    desc: "夜林绿黑底 + 亮绿与花橙 accent 的暗色主题",
    swatch: ["#74b88a", "#0e1f16", "#162d20"], decor: "bio", field: "bio", minis: ["mini-bio-a", "mini-bio-b"], _font: "serif",
    css: buildCss({
        "--bg-0":"#0e1f16","--bg-1":"#122619","--bg-2":"#162d20",
        "--surface-1":"rgba(228,239,231,.05)","--surface-2":"rgba(228,239,231,.09)",
        "--border":"rgba(228,239,231,.15)","--border-soft":"rgba(228,239,231,.08)","--border-strong":"rgba(228,239,231,.3)",
        "--text-hi":"#e4efe7","--text-mid":"rgba(228,239,231,.8)","--text-low":"rgba(228,239,231,.62)","--text-faint":"rgba(228,239,231,.45)",
        "--accent":"#74b88a","--accent-strong":"#98cfa9","--accent-ink":"#0b1a11","--accent-soft":"rgba(116,184,138,.15)","--accent-dim":"rgba(116,184,138,.5)",
        "--accent-2":"#e2b26a","--decor-ink":"#82c496",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(116,184,138,.12),transparent 70%),linear-gradient(180deg,#142b1d 0%,#0c1a12 60%,#0e1f16 100%)",
        "--bg-pattern":"repeating-linear-gradient(45deg,rgba(116,184,138,.04) 0 1px,transparent 1px 30px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#162d20","--code-ink":"#c3e0cd",
        "--sel-bg":"rgba(116,184,138,.3)","--scrollbar":"rgba(228,239,231,.25)","--scrollbar-hover":"rgba(228,239,231,.4)",
        "--chip-bg":"rgba(228,239,231,.07)","--chip-ink":"#adc5b3","--topbar-bg":"rgba(14,31,22,.85)",
        "--badge-bg":"rgba(116,184,138,.16)","--badge-ink":"#cfe8d8","--btn-bg":"#4d8a63","--btn-ink":"#0b1a11","--btn-hover":"#74b88a"
    }, "")
},
/* ================= 工商管理 ================= */
{
    id: "biz-light", group: "工商管理", groupEn: "Business",
    name: "蓝筹", en: "Blue Chip",
    desc: "商务白底 + 钢蓝与琥珀，组织结构图装饰的亮色主题",
    swatch: ["#35506e", "#f7f8f5", "#e8ebe6"], decor: "biz", field: "biz", minis: ["mini-biz-a", "mini-biz-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#f7f8f5","--bg-1":"#f0f2ee","--bg-2":"#e8ebe6",
        "--surface-1":"rgba(53,80,110,.04)","--surface-2":"rgba(53,80,110,.07)",
        "--border":"rgba(30,38,48,.13)","--border-soft":"rgba(30,38,48,.08)","--border-strong":"rgba(30,38,48,.3)",
        "--text-hi":"#1e2630","--text-mid":"rgba(30,38,48,.78)","--text-low":"rgba(30,38,48,.58)","--text-faint":"rgba(30,38,48,.4)",
        "--accent":"#35506e","--accent-strong":"#273c54","--accent-ink":"#f6f9fb","--accent-soft":"rgba(53,80,110,.1)","--accent-dim":"rgba(53,80,110,.38)",
        "--accent-2":"#c26a1e","--decor-ink":"#3d5b7c",
        "--hero-grad":"linear-gradient(180deg,#f4f6f2 0%,#e7ebe5 55%,#f7f8f5 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(53,80,110,.038) 0 2px,transparent 2px 30px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(30,38,48,.16),0 2px 6px -2px rgba(30,38,48,.1)",
        "--shadow-card":"0 1px 2px rgba(30,38,48,.05),0 3px 10px -3px rgba(30,38,48,.12)",
        "--code-bg":"#ecefea","--code-ink":"#273c54",
        "--sel-bg":"rgba(53,80,110,.22)","--scrollbar":"rgba(30,38,48,.22)","--scrollbar-hover":"rgba(30,38,48,.36)",
        "--chip-bg":"rgba(53,80,110,.05)","--chip-ink":"#4c5763","--topbar-bg":"rgba(247,248,245,.86)",
        "--badge-bg":"#35506e","--badge-ink":"#f6f9fb","--btn-bg":"#35506e","--btn-ink":"#f6f9fb","--btn-hover":"#273c54"
    }, "")
},
{
    id: "biz-dark", group: "工商管理", groupEn: "Business",
    name: "商道", en: "Boardroom Night",
    desc: "钢蓝黑底 + 亮蓝与琥珀 accent 的暗色主题",
    swatch: ["#9db8d8", "#10161f", "#1a2230"], decor: "biz", field: "biz", minis: ["mini-biz-a", "mini-biz-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#10161f","--bg-1":"#141b26","--bg-2":"#1a2230",
        "--surface-1":"rgba(232,235,240,.05)","--surface-2":"rgba(232,235,240,.09)",
        "--border":"rgba(232,235,240,.15)","--border-soft":"rgba(232,235,240,.08)","--border-strong":"rgba(232,235,240,.3)",
        "--text-hi":"#e8ebf0","--text-mid":"rgba(232,235,240,.8)","--text-low":"rgba(232,235,240,.62)","--text-faint":"rgba(232,235,240,.45)",
        "--accent":"#9db8d8","--accent-strong":"#bcd1e8","--accent-ink":"#0e1520","--accent-soft":"rgba(157,184,216,.15)","--accent-dim":"rgba(157,184,216,.5)",
        "--accent-2":"#d98e3f","--decor-ink":"#a5bdd9",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(157,184,216,.12),transparent 70%),linear-gradient(180deg,#161d29 0%,#0e131c 60%,#10161f 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(157,184,216,.05) 0 2px,transparent 2px 30px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#1a2230","--code-ink":"#c9d6e4",
        "--sel-bg":"rgba(157,184,216,.3)","--scrollbar":"rgba(232,235,240,.25)","--scrollbar-hover":"rgba(232,235,240,.4)",
        "--chip-bg":"rgba(232,235,240,.07)","--chip-ink":"#b1bac6","--topbar-bg":"rgba(16,22,31,.85)",
        "--badge-bg":"rgba(157,184,216,.16)","--badge-ink":"#d5e2ef","--btn-bg":"#5f7d9e","--btn-ink":"#fff","--btn-hover":"#7d9cbf"
    }, "")
},
/* ================= 金融学 ================= */
{
    id: "fin-light", group: "金融学", groupEn: "Finance",
    name: "烛图", en: "Candlestick",
    desc: "白底 + 深青与铜金，K 线蜡烛图装饰的亮色主题",
    swatch: ["#155e75", "#f8f7f2", "#e9e6db"], decor: "fin", field: "fin", minis: ["mini-fin-a", "mini-fin-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#f8f7f2","--bg-1":"#f1efe8","--bg-2":"#e9e6db",
        "--surface-1":"rgba(21,94,117,.04)","--surface-2":"rgba(21,94,117,.07)",
        "--border":"rgba(29,42,46,.13)","--border-soft":"rgba(29,42,46,.08)","--border-strong":"rgba(29,42,46,.3)",
        "--text-hi":"#1d2a2e","--text-mid":"rgba(29,42,46,.78)","--text-low":"rgba(29,42,46,.58)","--text-faint":"rgba(29,42,46,.4)",
        "--accent":"#155e75","--accent-strong":"#0f4a5d","--accent-ink":"#f3f9fa","--accent-soft":"rgba(21,94,117,.1)","--accent-dim":"rgba(21,94,117,.38)",
        "--accent-2":"#b98a2e","--decor-ink":"#1c6f88",
        "--hero-grad":"linear-gradient(180deg,#f5f4ee 0%,#e9e7dd 55%,#f8f7f2 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(21,94,117,.05) 0 2px,transparent 2px 12px),repeating-linear-gradient(90deg,transparent 0 4px,rgba(185,138,46,.05) 4px 6px,transparent 6px 12px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(29,42,46,.16),0 2px 6px -2px rgba(29,42,46,.1)",
        "--shadow-card":"0 1px 2px rgba(29,42,46,.05),0 3px 10px -3px rgba(29,42,46,.12)",
        "--code-bg":"#ebe8dd","--code-ink":"#0f4a5d",
        "--sel-bg":"rgba(21,94,117,.22)","--scrollbar":"rgba(29,42,46,.22)","--scrollbar-hover":"rgba(29,42,46,.36)",
        "--chip-bg":"rgba(21,94,117,.05)","--chip-ink":"#4c5a5c","--topbar-bg":"rgba(248,247,242,.86)",
        "--badge-bg":"#155e75","--badge-ink":"#f3f9fa","--btn-bg":"#155e75","--btn-ink":"#f3f9fa","--btn-hover":"#0f4a5d"
    }, "")
},
{
    id: "fin-dark", group: "金融学", groupEn: "Finance",
    name: "金盘", en: "Trading Night",
    desc: "深青黑底 + 亮青与金 accent 的暗色行情主题",
    swatch: ["#4fb3cc", "#0c1a20", "#152630"], decor: "fin", field: "fin", minis: ["mini-fin-a", "mini-fin-b"], _font: "sans",
    css: buildCss({
        "--bg-0":"#0c1a20","--bg-1":"#101f26","--bg-2":"#152630",
        "--surface-1":"rgba(230,237,240,.05)","--surface-2":"rgba(230,237,240,.09)",
        "--border":"rgba(230,237,240,.15)","--border-soft":"rgba(230,237,240,.08)","--border-strong":"rgba(230,237,240,.3)",
        "--text-hi":"#e6edf0","--text-mid":"rgba(230,237,240,.8)","--text-low":"rgba(230,237,240,.62)","--text-faint":"rgba(230,237,240,.45)",
        "--accent":"#4fb3cc","--accent-strong":"#79c9de","--accent-ink":"#08141a","--accent-soft":"rgba(79,179,204,.15)","--accent-dim":"rgba(79,179,204,.5)",
        "--accent-2":"#d4ae5e","--decor-ink":"#5cbcd3",
        "--hero-grad":"radial-gradient(620px 340px at 20% 0%,rgba(79,179,204,.12),transparent 70%),linear-gradient(180deg,#12222a 0%,#0a161c 60%,#0c1a20 100%)",
        "--bg-pattern":"repeating-linear-gradient(90deg,rgba(79,179,204,.07) 0 2px,transparent 2px 12px),repeating-linear-gradient(90deg,transparent 0 4px,rgba(212,174,94,.05) 4px 6px,transparent 6px 12px)","--bg-pattern-size":"auto",
        "--shadow-float":"0 10px 14px -6px rgba(0,0,0,.5),0 2px 6px -2px rgba(0,0,0,.35)",
        "--shadow-card":"0 1px 2px rgba(0,0,0,.25),0 3px 10px -3px rgba(0,0,0,.4)",
        "--code-bg":"#152630","--code-ink":"#bcdde6",
        "--sel-bg":"rgba(79,179,204,.3)","--scrollbar":"rgba(230,237,240,.25)","--scrollbar-hover":"rgba(230,237,240,.4)",
        "--chip-bg":"rgba(230,237,240,.07)","--chip-ink":"#aebfc4","--topbar-bg":"rgba(12,26,32,.85)",
        "--badge-bg":"rgba(79,179,204,.16)","--badge-ink":"#cde9f0","--btn-bg":"#2f8ba0","--btn-ink":"#fff","--btn-hover":"#4fb3cc"
    }, "")
}
];

return { DEFAULT_THEME_ID: 'ruc-light', THEMES: THEMES };
});
