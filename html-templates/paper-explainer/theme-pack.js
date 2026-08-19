/* ============================================================================
 * Paper Explainer 模板主题包 (theme-pack.js) —— 主题唯一数据源
 * ----------------------------------------------------------------------------
 * 架构铁律（与 lecture / lab-meeting / commerical-lecture 三个模板同构）：
 *   1. 本文件是主题的唯一数据源。四个模板页面（knowledge_graph_template /
 *      papers/paper_explainer_page_template / nav/reading_path_template /
 *      nav/knowledge_supplement_template）的基座 <style> 只含默认主题
 *      「纸墨 paper-ink」的 :root 令牌；其余主题以完整令牌覆盖块的形式
 *      存放在本文件 THEMES[].css 中，切换时整块写入 <style id="theme-css">。
 *   2. 默认主题静态化：applyTheme 对默认主题清空 theme-css（回落到基座
 *      :root），改默认主题须同时改四个模板基座 :root（逐字同步）。
 *   3. localStorage 键 paper-explainer-theme，跨四页连续；首屏前由 head 内
 *      恢复脚本注入，防闪烁。
 *   4. UMD 双模式：浏览器全局 PAPER_EXPLAINER_THEME_PACK / CJS require。
 *   5. 改完主题后重跑 style_previews/_build.mjs 全量再生成变体，勿手改产物。
 * ----------------------------------------------------------------------------
 * 8 套主题 = 4 明 + 4 暗；克制 ×6（三明三暗）+ 适中 ×2（一明一暗）：
 *   paper-ink 纸墨（默认）· ruc 人大红 · ink-wash 素墨 · celadon 青瓷(适中)
 *   ink-night 墨夜 · abyss 深海 · terminal 磷光 · twilight 暮紫(适中)
 * ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    root.PAPER_EXPLAINER_THEME_PACK = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DEFAULT_THEME = 'paper-ink';

  var THEMES = [

    /* ------------------------------------------------------------------
     * 1. 纸墨 paper-ink —— 默认主题（明 · 克制）
     *    冷调纸白 + 墨蓝重音 + 衬线刊头。令牌已烘焙进四个模板基座 :root，
     *    此处 css 留空；改它必须同步改四个模板基座。
     * ------------------------------------------------------------------ */
    {
      id: 'paper-ink',
      name: '纸墨',
      en: 'Paper Ink',
      mode: 'light',
      flavor: '克制',
      desc: '默认主题。冷调纸白底、墨蓝重音、衬线刊头，学术纸感的基座世界。',
      swatch: ['#f6f6f3', '#24547c', '#ffffff'],
      css: ''
    },

    /* ------------------------------------------------------------------
     * 2. 人大红 ruc（明 · 克制）—— 校徽红 #971f30，与项目其余三模板同系
     * ------------------------------------------------------------------ */
    {
      id: 'ruc',
      name: '人大红',
      en: 'RUC Red',
      mode: 'light',
      flavor: '克制',
      desc: '校徽红 #971f30 重音 + 页顶朱红规线 + 右下角校徽水印 + 页眉校徽标记，暖纸底；与项目其余三个模板的人大红体系呼应。',
      swatch: ['#f8f7f5', '#971f30', '#ffffff'],
      css: [
        ':root{color-scheme:light;',
        '--bg:#f8f7f5;--surface:#ffffff;--surface-2:#faf8f4;--rule:#e8e1d6;--rule-strong:#d6c8c2;',
        '--ink:#2b241f;--ink-2:#64564a;--ink-3:#71624f;',
        '--accent:#971f30;--accent-deep:#7a1826;--accent-soft:#f7e9eb;--on-accent:#ffffff;',
        '--link:#971f30;--focus:#971f30;',
        '--sel:rgba(151,31,48,.15);--scroll:#d6c8c2;--progress:#971f30;',
        '--c-def-fg:#971f30;--c-def-bg:#f9eef0;--c-def-bd:#eccfd5;',
        '--c-int-fg:#2c7a4b;--c-int-bg:#ecf5ee;--c-int-bd:#d2e5d8;',
        '--c-ex-fg:#916309;--c-ex-bg:#faf3e0;--c-ex-bd:#ecdcb2;',
        '--c-th-fg:#6b4a8e;--c-th-bg:#f3eff8;--c-th-bd:#e1d7ec;',
        '--c-al-fg:#64564a;--c-al-bg:#f3f2ee;--c-al-bd:#e0dcd2;',
        '--c-su-fg:#971f30;--c-su-bg:#f9eef0;--c-su-bd:#eccfd5;',
        '--c-wa-fg:#b03a32;--c-wa-bg:#f9eeee;--c-wa-bd:#edd0cc;',
        '--rel-share:#971f30;--rel-comp:#2c7a4b;--rel-gen:#6b4a8e;--rel-ink:#ffffff;}',
        /* 页顶朱红规线：body 顶边 3px（内容栏宽，期刊刊头语汇） */
        'html[data-theme="ruc"] body{border-top:3px solid #971f30}',
        /* 页面右下角校徽背景水印：裁剪增强后的半透明底图，z-index:-1 置于内容之下 */
        'html[data-theme="ruc"] body::after{content:"";position:fixed;right:0;bottom:0;',
        'width:min(24vw,280px);aspect-ratio:848/1248;pointer-events:none;z-index:-1;',
        'background:url(background-1.png) center/contain no-repeat;mix-blend-mode:multiply}'
      ].join('\n')
    },

    /* ------------------------------------------------------------------
     * 3. 素墨 ink-wash（明 · 克制）—— 纯黑白墨戏，排版即风格
     * ------------------------------------------------------------------ */
    {
      id: 'ink-wash',
      name: '素墨',
      en: 'Ink Wash',
      mode: 'light',
      flavor: '克制',
      desc: '去彩色的纯墨色世界：链接常带下划线、标题黑规线，语义色只保留在标注盒里。',
      swatch: ['#fafaf8', '#1d1d1a', '#ffffff'],
      css: [
        ':root{color-scheme:light;',
        '--bg:#fafaf8;--surface:#ffffff;--surface-2:#f4f4f0;--rule:#e6e6e0;--rule-strong:#c9c9c0;',
        '--ink:#1d1d1a;--ink-2:#54544c;--ink-3:#6d6d63;',
        '--accent:#3d3d38;--accent-deep:#1d1d1a;--accent-soft:#f0f0ea;--on-accent:#fafafa;',
        '--link:#242420;--focus:#3d3d38;',
        '--sel:rgba(29,29,26,.12);--scroll:#c9c9c0;--progress:#1d1d1a;',
        '--c-def-fg:#4a4a44;--c-def-bg:#f1f1ec;--c-def-bd:#dcdcd3;',
        '--c-int-fg:#3f6b4f;--c-int-bg:#eff3ee;--c-int-bd:#d7e2d8;',
        '--c-ex-fg:#7d5d1a;--c-ex-bg:#f6f1e3;--c-ex-bd:#e5dbbd;',
        '--c-th-fg:#5c5470;--c-th-bg:#f1f0f3;--c-th-bd:#dddbe2;',
        '--c-al-fg:#54544c;--c-al-bg:#f2f2ee;--c-al-bd:#deded6;',
        '--c-su-fg:#44556b;--c-su-bg:#eef1f4;--c-su-bd:#d9dfe6;',
        '--c-wa-fg:#8f4038;--c-wa-bg:#f5ecea;--c-wa-bd:#e4d2ce;',
        '--rel-share:#3d3d38;--rel-comp:#3f6b4f;--rel-gen:#5c5470;--rel-ink:#fafafa;}',
        /* 排版个性：链接常下划线，悬停加深 */
        'html[data-theme="ink-wash"] a{text-decoration:underline;text-underline-offset:3px;',
        'text-decoration-thickness:1px;text-decoration-color:#b9b9ae}',
        'html[data-theme="ink-wash"] a:hover{text-decoration-color:currentColor}',
        'html[data-theme="ink-wash"] .step .links a,html[data-theme="ink-wash"] .paper-links a,',
        'html[data-theme="ink-wash"] .concept .links a,html[data-theme="ink-wash"] .rb a{text-decoration:none}'
      ].join('\n')
    },

    /* ------------------------------------------------------------------
     * 4. 青瓷 celadon（明 · 适中）—— 松花绿 + 细点纸纹氛围层
     * ------------------------------------------------------------------ */
    {
      id: 'celadon',
      name: '青瓷',
      en: 'Celadon',
      mode: 'light',
      flavor: '适中',
      desc: '松花绿重音的暖纸世界，背景浮一层极淡的青色点阵纹理（氛围层，静态不滚动）。',
      swatch: ['#f4f5ef', '#3b7a57', '#fdfdfa'],
      css: [
        ':root{color-scheme:light;',
        '--bg:#f4f5ef;--surface:#fdfdfa;--surface-2:#eef0e4;--rule:#e0e3d2;--rule-strong:#c6cdb0;',
        '--ink:#263029;--ink-2:#5a675d;--ink-3:#63705f;',
        '--accent:#3b7a57;--accent-deep:#2c5f43;--accent-soft:#e8f0ea;--on-accent:#ffffff;',
        '--link:#31684a;--focus:#3b7a57;',
        '--sel:rgba(59,122,87,.18);--scroll:#c6cdb0;--progress:#3b7a57;',
        '--c-def-fg:#2c5f43;--c-def-bg:#e9f1ec;--c-def-bd:#cfe0d5;',
        '--c-int-fg:#77681f;--c-int-bg:#f4f1de;--c-int-bd:#e2dab4;',
        '--c-ex-fg:#916309;--c-ex-bg:#faf3e0;--c-ex-bd:#ecdcb2;',
        '--c-th-fg:#6b4a8e;--c-th-bg:#f3eff8;--c-th-bd:#e1d7ec;',
        '--c-al-fg:#5a675d;--c-al-bg:#f1f3ec;--c-al-bd:#dcded2;',
        '--c-su-fg:#2c5f43;--c-su-bg:#e9f1ec;--c-su-bd:#cfe0d5;',
        '--c-wa-fg:#b03a32;--c-wa-bg:#f9eeee;--c-wa-bd:#edd0cc;',
        '--rel-share:#3b7a57;--rel-comp:#2f6b45;--rel-gen:#6b4a8e;--rel-ink:#ffffff;}',
        /* 氛围层：极淡青色点阵（fixed，一次绘制不随滚动重绘） */
        'html[data-theme="celadon"] body::before{content:"";position:fixed;inset:0;z-index:-1;',
        'pointer-events:none;background-image:radial-gradient(rgba(59,122,87,.09) 1px,transparent 1.5px);',
        'background-size:24px 24px}'
      ].join('\n')
    },

    /* ------------------------------------------------------------------
     * 5. 墨夜 ink-night（暗 · 克制）—— 暖墨夜读，金线点缀
     * ------------------------------------------------------------------ */
    {
      id: 'ink-night',
      name: '墨夜',
      en: 'Ink Night',
      mode: 'dark',
      flavor: '克制',
      desc: '暖墨色夜读主题：羊皮纸色文字落在深棕墨底上，金线做重音，久读不眩目。',
      swatch: ['#191713', '#d8b46a', '#211e18'],
      css: [
        ':root{color-scheme:dark;',
        '--bg:#191713;--surface:#211e18;--surface-2:#262219;--rule:#3a352b;--rule-strong:#4d4638;',
        '--ink:#eae3d4;--ink-2:#b5ac97;--ink-3:#948a74;',
        '--accent:#d8b46a;--accent-deep:#7c5f28;--accent-soft:#2c2718;--on-accent:#f7eedb;',
        '--link:#e3c27e;--focus:#d8b46a;',
        '--shadow:0 1px 2px rgba(0,0,0,.35),0 4px 14px rgba(0,0,0,.28);',
        '--shadow-hover:0 2px 6px rgba(0,0,0,.45),0 10px 26px rgba(0,0,0,.35);',
        '--sel:rgba(216,180,106,.28);--scroll:#4d4638;--progress:#d8b46a;',
        '--c-def-fg:#93bedd;--c-def-bg:#1e2530;--c-def-bd:#324254;',
        '--c-int-fg:#93cf9d;--c-int-bg:#1c281e;--c-int-bd:#2f4534;',
        '--c-ex-fg:#e2b877;--c-ex-bg:#2a2314;--c-ex-bd:#4c3f22;',
        '--c-th-fg:#c6a8e4;--c-th-bg:#272031;--c-th-bd:#413553;',
        '--c-al-fg:#b5ac97;--c-al-bg:#1d1b15;--c-al-bd:#3a352b;',
        '--c-su-fg:#9cc2e0;--c-su-bg:#1d242e;--c-su-bd:#314152;',
        '--c-wa-fg:#e2938a;--c-wa-bg:#2d1c19;--c-wa-bd:#53302b;',
        '--rel-share:#7fa7c9;--rel-comp:#7fbf8e;--rel-gen:#b394d6;--rel-ink:#17130c;}'
      ].join('\n')
    },

    /* ------------------------------------------------------------------
     * 6. 深海 abyss（暗 · 克制）—— 沉静的深海蓝
     * ------------------------------------------------------------------ */
    {
      id: 'abyss',
      name: '深海',
      en: 'Abyss',
      mode: 'dark',
      flavor: '克制',
      desc: '深海蓝暗色主题：冷静的藏青底、天蓝重音，适合屏幕前长时间研读。',
      swatch: ['#0e151d', '#5fa8dc', '#151e28'],
      css: [
        ':root{color-scheme:dark;',
        '--bg:#0e151d;--surface:#151e28;--surface-2:#19242f;--rule:#283746;--rule-strong:#37495c;',
        '--ink:#dee8f0;--ink-2:#a3b7c7;--ink-3:#8298a9;',
        '--accent:#5fa8dc;--accent-deep:#27567e;--accent-soft:#17293a;--on-accent:#e8f3fb;',
        '--link:#82c0ea;--focus:#5fa8dc;',
        '--shadow:0 1px 2px rgba(0,0,0,.4),0 4px 14px rgba(0,0,0,.3);',
        '--shadow-hover:0 2px 6px rgba(0,0,0,.5),0 10px 26px rgba(0,0,0,.38);',
        '--sel:rgba(95,168,220,.26);--scroll:#37495c;--progress:#5fa8dc;',
        '--c-def-fg:#8ec3e8;--c-def-bg:#142435;--c-def-bd:#2a4258;',
        '--c-int-fg:#8fd0a5;--c-int-bg:#14281f;--c-int-bd:#284a38;',
        '--c-ex-fg:#e5c084;--c-ex-bg:#241f10;--c-ex-bd:#4a3f1e;',
        '--c-th-fg:#c3abe6;--c-th-bg:#211b30;--c-th-bd:#3d3156;',
        '--c-al-fg:#a3b7c7;--c-al-bg:#131b24;--c-al-bd:#283746;',
        '--c-su-fg:#96c6e8;--c-su-bg:#132333;--c-su-bd:#2a4258;',
        '--c-wa-fg:#e59a90;--c-wa-bg:#2b1815;--c-wa-bd:#553029;',
        '--rel-share:#6fa9d4;--rel-comp:#79bd8f;--rel-gen:#af95d6;--rel-ink:#0c1116;}'
      ].join('\n')
    },

    /* ------------------------------------------------------------------
     * 7. 磷光 terminal（暗 · 克制）—— 终端磷光绿 + 等宽点缀
     * ------------------------------------------------------------------ */
    {
      id: 'terminal',
      name: '磷光',
      en: 'Phosphor',
      mode: 'dark',
      flavor: '克制',
      desc: '终端磷光绿主题：近黑底、荧光绿重音，出处边注与元信息换等宽字体，算法框最对味。',
      swatch: ['#0b0e0c', '#4ec97e', '#121713'],
      css: [
        ':root{color-scheme:dark;',
        '--bg:#0b0e0c;--surface:#121713;--surface-2:#161c17;--rule:#26332a;--rule-strong:#36483c;',
        '--ink:#d9e7dc;--ink-2:#a2b8a7;--ink-3:#82998a;',
        '--accent:#4ec97e;--accent-deep:#1d5c38;--accent-soft:#132519;--on-accent:#e9f8ee;',
        '--link:#74d79c;--focus:#4ec97e;',
        '--shadow:0 1px 2px rgba(0,0,0,.42),0 4px 14px rgba(0,0,0,.32);',
        '--shadow-hover:0 2px 6px rgba(0,0,0,.52),0 10px 26px rgba(0,0,0,.4);',
        '--sel:rgba(78,201,126,.25);--scroll:#36483c;--progress:#4ec97e;',
        '--c-def-fg:#86d3b0;--c-def-bg:#12221c;--c-def-bd:#2a4a3c;',
        '--c-int-fg:#a8d68f;--c-int-bg:#1a2412;--c-int-bd:#37491f;',
        '--c-ex-fg:#e0c479;--c-ex-bg:#221e0e;--c-ex-bd:#47401c;',
        '--c-th-fg:#bfa8e0;--c-th-bg:#1d1826;--c-th-bd:#383049;',
        '--c-al-fg:#a2b8a7;--c-al-bg:#10140f;--c-al-bd:#26332a;',
        '--c-su-fg:#8fd0b6;--c-su-bg:#122019;--c-su-bd:#2a4436;',
        '--c-wa-fg:#e09486;--c-wa-bg:#26140f;--c-wa-bd:#4d2a20;',
        '--rel-share:#5fbf8a;--rel-comp:#8bc46f;--rel-gen:#a98fd0;--rel-ink:#0a0d0b;}',
        /* 等宽点缀：出处边注、节点元信息、刊头副题 */
        'html[data-theme="terminal"] .src-ref,html[data-theme="terminal"] .node-meta,',
        'html[data-theme="terminal"] .kg-sub,html[data-theme="terminal"] header .meta{',
        'font-family:var(--font-mono);font-size:.82em;letter-spacing:0}'
      ].join('\n')
    },

    /* ------------------------------------------------------------------
     * 8. 暮紫 twilight（暗 · 适中）—— 紫晕氛围层
     * ------------------------------------------------------------------ */
    {
      id: 'twilight',
      name: '暮紫',
      en: 'Twilight',
      mode: 'dark',
      flavor: '适中',
      desc: '暮色紫主题：深紫底 + 堇色重音，页面上方浮两片极淡的紫色光晕（氛围层，静态）。',
      swatch: ['#131118', '#a78bfa', '#1b1823'],
      css: [
        ':root{color-scheme:dark;',
        '--bg:#131118;--surface:#1b1823;--surface-2:#211d2c;--rule:#312b42;--rule-strong:#453c5c;',
        '--ink:#e9e5f2;--ink-2:#b2a9c8;--ink-3:#8f86a8;',
        '--accent:#a78bfa;--accent-deep:#5b4a9e;--accent-soft:#251f38;--on-accent:#f1ecfd;',
        '--link:#bfa9f8;--focus:#a78bfa;',
        '--shadow:0 1px 2px rgba(0,0,0,.4),0 4px 14px rgba(0,0,0,.3);',
        '--shadow-hover:0 2px 6px rgba(0,0,0,.5),0 10px 26px rgba(0,0,0,.38);',
        '--sel:rgba(167,139,250,.26);--scroll:#453c5c;--progress:#a78bfa;',
        '--c-def-fg:#a9c1f5;--c-def-bg:#171e30;--c-def-bd:#2f3d5c;',
        '--c-int-fg:#93d3a8;--c-int-bg:#14231b;--c-int-bd:#2a4434;',
        '--c-ex-fg:#e2bd85;--c-ex-bg:#241e10;--c-ex-bd:#4a3e20;',
        '--c-th-fg:#c9b2f0;--c-th-bg:#221a33;--c-th-bd:#3f3158;',
        '--c-al-fg:#b2a9c8;--c-al-bg:#181520;--c-al-bd:#312b42;',
        '--c-su-fg:#b3c7f2;--c-su-bg:#161c2e;--c-su-bd:#2e3a58;',
        '--c-wa-fg:#e59a9a;--c-wa-bg:#291618;--c-wa-bd:#52292d;',
        '--rel-share:#8ba7e8;--rel-comp:#7fc795;--rel-gen:#b79ae6;--rel-ink:#120f18;}',
        /* 氛围层：两片静态紫色光晕（fixed，一次绘制不随滚动重绘） */
        'html[data-theme="twilight"] body::before{content:"";position:fixed;inset:0;z-index:-1;',
        'pointer-events:none;background:',
        'radial-gradient(620px 420px at 85% -10%,rgba(167,139,250,.14),transparent 62%),',
        'radial-gradient(520px 400px at -8% 28%,rgba(99,102,241,.10),transparent 60%)}'
      ].join('\n')
    }
  ];

  return { DEFAULT_THEME: DEFAULT_THEME, THEMES: THEMES };
});
