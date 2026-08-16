// theme-pack.js ， 10 个主题的统一模块（唯一数据源）
// 浏览器 <script> 加载：挂 window.THEME_PACK；Node CJS require：module.exports。
// _build.mjs 从此模块读取主题生成 themes/ 下的静态变体；
// 各页面内联的「主题一键切换器」从此模块注入所选主题 CSS。
(function (root, factory) {
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.THEME_PACK = factory();
})(typeof self !== 'undefined' ? self : this, function () {
    return [

/* ─────────────── 01 · WWDC 浅色 ─────────────── */
{
  id: '01_wwdc_light',
  name: 'WWDC 浅色',
  en: 'Apple Keynote Light',
  desc: '苹果官网白昼版：纯白画布 + 极淡蓝紫粉天光 + 官网按钮蓝，浅色 iOS 语义色。',
  features: ['纯白画布 + 淡渐变天光', '官网按钮蓝 #0071e3 系', '浅色 iOS 语义色（文字加深保对比）'],
  swatch: ['#007aff', '#af52de', '#ff2d55'],
  linkBg: '#0071e3',
  css: `
        /* ═══════ 主题覆盖层 · WWDC 浅色 ═══════ */
        :root {
            --bg:#ffffff; --card-bg:#ffffff; --card-radius:16px;
            --line:rgba(0,0,0,0.08);
            --shadow:0 1px 2px rgba(0,0,0,0.04),0 1px 3px rgba(0,0,0,0.05);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.08),0 2px 4px rgba(0,0,0,0.04);
            --primary:#007aff; --primary-light:#eaf4ff; --primary-dark:#0055d4;
            --accent:#af52de; --accent-light:#f6effc;
            --success:#248a3d; --success-bg:#e8f8ee;
            --warning:#b25000; --warning-bg:#fff8e6;
            --danger:#d70015; --danger-bg:#fdecec;
            --ease-move:cubic-bezier(0.25,0.1,0.25,1);
        }
        body{background:
            radial-gradient(1100px 520px at 50% -220px, rgba(10,132,255,0.10), transparent 68%),
            radial-gradient(900px 460px at 8% 20%, rgba(175,82,222,0.06), transparent 70%),
            radial-gradient(900px 480px at 92% 90%, rgba(255,45,85,0.05), transparent 72%),
            var(--bg);}
        ::selection{background:rgba(0,122,255,0.25);color:var(--gray-900)}
        .bar-fill.blue{background:linear-gradient(90deg,#007aff,#af52de)}
        .bar-fill.green{background:linear-gradient(90deg,#248a3d,#34c759)}
        .bar-fill.orange{background:linear-gradient(90deg,#b25000,#ffcc00)}
        .info-box.info{border-color:rgba(0,122,255,0.28)}
        .info-box.success{border-color:rgba(36,138,61,0.28)}
        .info-box.warning,.info-box.warn{border-color:rgba(178,80,0,0.28)}
        .info-box.danger{border-color:rgba(215,0,21,0.28)}
        .card:hover{border-color:rgba(0,0,0,0.14)}
        /* ── WWDC 浅色特征强化 ── */
        /* header 底部蓝紫粉渐变追光 hairline */
        #header{border-bottom:none;background-image:linear-gradient(90deg,#007aff,#af52de,#ff2d55);background-repeat:no-repeat;background-position:left bottom;background-size:100% 1.5px}
        /* 苹果式大标题排印 */
        #header h1{font-size:1.3rem;letter-spacing:-0.02em}
        /* 背景天光加强 */
        body{background:
            radial-gradient(1100px 520px at 50% -220px, rgba(10,132,255,0.15), transparent 68%),
            radial-gradient(900px 460px at 8% 20%, rgba(175,82,222,0.09), transparent 70%),
            radial-gradient(900px 480px at 92% 90%, rgba(255,45,85,0.08), transparent 72%),
            var(--bg)}
        /* 快速链接卡：渐变顶条（WWDC 三原色） */
        .quick-link-card{position:relative;overflow:hidden;border-top-color:transparent}
        .quick-link-card::before{content:"";position:absolute;left:0;top:0;right:0;height:2px;background:linear-gradient(90deg,#007aff,#af52de,#ff2d55)}
        .quick-link-card.ql-m1::before{background:#34c759}
        .quick-link-card.ql-m2::before{background:#ffcc00}
        .quick-link-card.ql-m3::before{background:#8e8e93}
        /* 小节标题：渐变下划线 */
        .section-h4{border-bottom:2px solid;border-image:linear-gradient(90deg,#007aff,#af52de,#ff2d55) 1}
        .section-h4.c-accent{border-image:linear-gradient(90deg,#af52de,#ff2d55) 1}
        .section-h4.c-success{border-image:linear-gradient(90deg,#34c759,#66d9a0) 1}
        .section-h4.c-warning{border-image:linear-gradient(90deg,#ffcc00,#ff9500) 1}
        .section-h4.c-danger{border-image:linear-gradient(90deg,#ff3b30,#ff2d55) 1}
        /* 数字：SF 排印（负字距 + 等宽数字） */
        .metric-value,.big-num,.data-table .num{letter-spacing:-0.02em;font-variant-numeric:tabular-nums}
        /* 图标容器：iOS 风格浅渐变底 */
        .quick-link-card .ql-icon{background:linear-gradient(135deg,#eaf4ff,#f6effc);color:#007aff;border-radius:12px}
        .quick-link-card:hover .ql-icon{background:linear-gradient(135deg,#007aff,#af52de);color:#fff}
        .header-links a:active{transform:scale(0.97)}
        /* 风格强化：轨道线 */
        .carousel-viewport::before{border-color:rgba(0,122,255,0.35)}`,
  fonts: null },

/* ─────────────── 02 · WWDC 深色 ─────────────── */
{
  id: '02_wwdc_dark',
  name: 'WWDC 深色',
  en: 'Apple Keynote Dark',
  desc: '苹果发布会黑夜版：纯黑舞台 + 蓝紫粉渐变追光 + 玻璃侧边栏，深色 iOS 语义色。',
  features: ['纯黑舞台 + 渐变追光', '玻璃材质侧边导航', '深色 iOS 语义色'],
  swatch: ['#0a84ff', '#bf5af2', '#ff375f'],
  linkBg: 'linear-gradient(90deg,#0a84ff,#bf5af2,#ff375f)',
  css: `
        /* ═══════ 主题覆盖层 · WWDC 深色 ═══════ */
        :root {
            --bg:#000000; --card-bg:#161618; --card-radius:16px;
            --line:rgba(255,255,255,0.10);
            --shadow:0 1px 2px rgba(0,0,0,0.4),0 8px 24px rgba(0,0,0,0.5);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.5),0 12px 32px rgba(0,0,0,0.55);
            --primary:#0a84ff; --primary-light:rgba(10,132,255,0.14); --primary-dark:#5e9eff;
            --accent:#bf5af2; --accent-light:rgba(191,90,242,0.14);
            --success:#30d158; --success-bg:rgba(48,209,88,0.12);
            --warning:#ffd60a; --warning-bg:rgba(255,214,10,0.12);
            --danger:#ff453a; --danger-bg:rgba(255,69,58,0.12);
            --gray-50:#1c1c1e; --gray-100:#2c2c2e; --gray-200:#3a3a3c; --gray-300:#48484a; --gray-400:#8e8e93; --gray-500:#98989d; --gray-600:#a1a1a6; --gray-700:#d1d1d6; --gray-800:#f5f5f7; --gray-900:#ffffff;
            --ease-move:cubic-bezier(0.25,0.1,0.25,1);
        }
        body{background:
            radial-gradient(1100px 520px at 50% -220px, rgba(10,132,255,0.22), transparent 68%),
            radial-gradient(900px 460px at 8% 20%, rgba(191,90,242,0.10), transparent 70%),
            radial-gradient(900px 480px at 92% 90%, rgba(255,55,95,0.09), transparent 72%),
            var(--bg);}
        ::selection{background:rgba(10,132,255,0.45);color:#fff}
        #header{background:rgba(22,22,24,0.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
        #sidebar{background:rgba(18,18,20,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        #content::-webkit-scrollbar-thumb,#sidebar::-webkit-scrollbar-thumb{background:#2c2c2e;border-radius:4px}
        #content::-webkit-scrollbar-thumb:hover,#sidebar::-webkit-scrollbar-thumb:hover{background:#48484a}
        .sidebar-parent:hover,.sidebar-child:hover{background:rgba(255,255,255,0.08)}
        .sidebar-child.active{background:rgba(255,255,255,0.12);color:#fff}
        .bar-fill.blue{background:linear-gradient(90deg,#0a84ff,#bf5af2)}
        .bar-fill.green{background:linear-gradient(90deg,#30d158,#66d9a0)}
        .bar-fill.orange{background:linear-gradient(90deg,#ffd60a,#ffb340)}
        .bar-fill.gray{background:linear-gradient(90deg,#48484a,#8e8e93)}
        .info-box.info{border-color:rgba(10,132,255,0.35)}
        .info-box.success{border-color:rgba(48,209,88,0.35)}
        .info-box.warning,.info-box.warn{border-color:rgba(255,214,10,0.35)}
        .info-box.danger{border-color:rgba(255,69,58,0.35)}
        .card:hover{border-color:rgba(255,255,255,0.16)}
        .source-line code,.code-ref code{background:rgba(255,255,255,0.10);color:var(--gray-700)}
        .metric-card{background:var(--card-bg)}
        .timeline-dot{border-color:var(--card-bg)}
        .formula-card{background:rgba(255,255,255,0.05)}
        .img-placeholder{background:rgba(255,255,255,0.04)}
        /* 图标容器：深色玻璃蓝 */
        .quick-link-card .ql-icon{background:rgba(10,132,255,0.16);color:#5e9eff}
        .quick-link-card:hover .ql-icon{background:#0a84ff}
        .header-links a:active{transform:scale(0.97)}
        .carousel-viewport::before{border-color:rgba(10,132,255,0.4)}`,
  fonts: null },

/* ─────────────── 03 · 深色奢华 ─────────────── */
{
  id: '03_dark_premium',
  name: '深色奢华',
  en: 'Dark Premium',
  desc: '舞台聚光灯下的路演气场：近黑底 + 香槟金，结论如金箔发光。',
  features: ['香槟金 #c9a25e 主强调', '金色 hairline 与光晕', '低饱和深色衬底'],
  swatch: ['#c9a25e', '#070b12', '#38bdf8'],
  linkBg: '#c9a25e',
  css: `
        /* ═══════ 主题覆盖层 · 深色奢华 ═══════ */
        :root {
            --bg:#070b12; --card-bg:#0e1520; --card-radius:14px;
            --line:rgba(255,255,255,0.08);
            --shadow:0 1px 2px rgba(0,0,0,0.4),0 10px 30px rgba(0,0,0,0.35);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.5),0 16px 36px rgba(0,0,0,0.45);
            --primary:#c9a25e; --primary-light:rgba(201,162,94,0.12); --primary-dark:#e0c48a;
            --font-sans:"Cormorant Garamond","Songti SC","STSong","SimSun","PingFang SC",serif;
            --font-mono:"Cormorant Garamond","Georgia","SF Mono",serif;
            --accent:#38bdf8; --accent-light:rgba(56,189,248,0.12);
            --success:#4ade80; --success-bg:rgba(74,222,128,0.10);
            --warning:#fbbf24; --warning-bg:rgba(251,191,36,0.10);
            --danger:#f87171; --danger-bg:rgba(248,113,113,0.10);
            --gray-50:#1c1c1e; --gray-100:#2c2c2e; --gray-200:#3a3a3c; --gray-300:#48484a; --gray-400:#8e8e93; --gray-500:#98989d; --gray-600:#a1a1a6; --gray-700:#d1d1d6; --gray-800:#f5f5f7; --gray-900:#ffffff;
        }
        body{background:
            radial-gradient(1200px 500px at 50% -160px, rgba(201,162,94,0.10), transparent 70%),
            radial-gradient(900px 400px at 85% 110%, rgba(56,189,248,0.05), transparent 70%),
            var(--bg);}
        ::selection{background:rgba(201,162,94,0.35);color:#fff}
        #header{background:#0a101a}
        #sidebar{background:#0a101a}
        .sidebar-child.active{background:rgba(201,162,94,0.12);color:var(--primary-dark)}
        .card:hover{border-color:rgba(201,162,94,0.35)}
        .countdown{background:rgba(201,162,94,0.12);color:var(--primary-dark)}
        .bar-fill.blue{background:linear-gradient(90deg,#c9a25e,#e0c48a)}
        .bar-fill.green{background:linear-gradient(90deg,#4ade80,#86efac)}
        .bar-fill.orange{background:linear-gradient(90deg,#fbbf24,#fcd34d)}
        .bar-fill.gray{background:linear-gradient(90deg,#334155,#64748b)}
        .info-box.info{border-color:rgba(201,162,94,0.35)}
        .info-box.success{border-color:rgba(74,222,128,0.35)}
        .info-box.warning,.info-box.warn{border-color:rgba(251,191,36,0.35)}
        .info-box.danger{border-color:rgba(248,113,113,0.35)}
        .source-line code,.code-ref code{background:rgba(255,255,255,0.08);color:var(--gray-700)}
        .img-placeholder{background:rgba(255,255,255,0.04)}
        /* 图标容器：香槟金 */
        .quick-link-card .ql-icon{background:rgba(201,162,94,0.14);color:var(--primary-dark)}
        .quick-link-card:hover .ql-icon{background:var(--primary)}
        .carousel-viewport::before{border-color:rgba(201,162,94,0.45)}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::before{content:"";position:absolute;left:14px;right:14px;top:-2px;height:2px;background:linear-gradient(90deg,transparent,#c9a25e,transparent)}
        .timeline-dot{transform:rotate(45deg)}`,
  fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap' },

/* ─────────────── 04 · 玻璃拟态 ─────────────── */
{
  id: '04_glassmorphism',
  name: '玻璃拟态',
  en: 'Glassmorphism',
  desc: '深色渐变宇宙 + 半透明玻璃卡片，信息浮于彩色光晕之上。',
  features: ['三色光晕背景', '卡片 backdrop blur 玻璃质感', '青色主强调 + 紫罗兰光斑'],
  swatch: ['#22d3ee', '#a78bfa', '#0b1120'],
  linkBg: 'linear-gradient(90deg,#22d3ee,#a78bfa)',
  css: `
        /* ═══════ 主题覆盖层 · 玻璃拟态 ═══════ */
        :root {
            --bg:#0b1120; --card-bg:rgba(255,255,255,0.06); --card-radius:16px;
            --line:rgba(255,255,255,0.12);
            --shadow:0 1px 2px rgba(0,0,0,0.3),0 8px 24px rgba(0,0,0,0.35);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.4),0 12px 32px rgba(0,0,0,0.45);
            --primary:#22d3ee; --primary-light:rgba(34,211,238,0.12); --primary-dark:#67e8f9;
            --font-sans:"Chakra Petch","PingFang SC","Microsoft YaHei",sans-serif;
            --accent:#a78bfa; --accent-light:rgba(167,139,250,0.12);
            --success:#34d399; --success-bg:rgba(52,211,153,0.12);
            --warning:#fbbf24; --warning-bg:rgba(251,191,36,0.12);
            --danger:#fb7185; --danger-bg:rgba(251,113,133,0.12);
            --gray-50:#1c1c1e; --gray-100:#2c2c2e; --gray-200:#3a3a3c; --gray-300:#48484a; --gray-400:#8e8e93; --gray-500:#98989d; --gray-600:#a1a1a6; --gray-700:#d1d1d6; --gray-800:#f5f5f7; --gray-900:#ffffff;
        }
        body{background:
            radial-gradient(700px 400px at 15% 0%, rgba(34,211,238,0.35), transparent 60%),
            radial-gradient(700px 400px at 100% 75%, rgba(167,139,250,0.35), transparent 65%),
            radial-gradient(500px 300px at 60% 100%, rgba(34,211,238,0.12), transparent 60%),
            linear-gradient(160deg,#0b1120,#1c1735);}
        ::selection{background:rgba(34,211,238,0.4);color:#fff}
        .card{border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.085)}
        .card:hover{border-color:rgba(34,211,238,0.4)}
        #header{background:rgba(11,17,32,0.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
        #sidebar{background:rgba(11,17,32,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        .sidebar-child.active{background:rgba(34,211,238,0.14);color:var(--primary-dark)}
        .metric-card{background:rgba(255,255,255,0.08)}
        .quick-link-card{background:rgba(255,255,255,0.08)}
        .timeline-card{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.14)}
        .bar-fill.blue{background:linear-gradient(90deg,#22d3ee,#a78bfa)}
        .bar-fill.green{background:linear-gradient(90deg,#34d399,#6ee7b7)}
        .bar-fill.orange{background:linear-gradient(90deg,#fbbf24,#fcd34d)}
        .bar-fill.gray{background:linear-gradient(90deg,#475569,#94a3b8)}
        .info-box.info{border-color:rgba(34,211,238,0.35)}
        .info-box.success{border-color:rgba(52,211,153,0.35)}
        .info-box.warning,.info-box.warn{border-color:rgba(251,191,36,0.35)}
        .info-box.danger{border-color:rgba(251,113,133,0.35)}
        .source-line code,.code-ref code{background:rgba(255,255,255,0.10);color:var(--gray-700)}
        .formula-card{background:rgba(255,255,255,0.05)}
        .img-placeholder{background:rgba(255,255,255,0.05)}
        /* 图标容器：玻璃青 */
        .quick-link-card .ql-icon{background:rgba(34,211,238,0.14);color:var(--primary-dark)}
        .quick-link-card:hover .ql-icon{background:var(--primary)}
        .carousel-viewport::before{border-color:rgba(34,211,238,0.4)}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::before{content:"";position:absolute;left:14px;right:14px;top:-2px;height:2px;background:linear-gradient(90deg,transparent,rgba(34,211,238,0.9),transparent)}`,
  fonts: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap' },

/* ─────────────── 05 · 东方水墨 ─────────────── */
{
  id: '05_ink_vermilion',
  name: '东方水墨',
  en: 'Ink & Vermilion',
  desc: '宣纸灰白 + 墨黑 + 朱砂印章，宋体书卷气，中文组会的文化记忆点。',
  features: ['宣纸暖白底 + 墨色文字', '朱砂主强调 + 印章点缀', '宋体衬线标题'],
  swatch: ['#23211d', '#f5f1e8', '#b3402f'],
  linkBg: '#b3402f',
  css: `
        /* ═══════ 主题覆盖层 · 东方水墨 ═══════ */
        :root {
            --bg:#f5f1e8; --card-bg:#faf7ef; --card-radius:6px;
            --line:rgba(35,33,29,0.14);
            --shadow:0 1px 2px rgba(35,33,29,0.06),0 2px 6px rgba(35,33,29,0.07);
            --shadow-hover:0 4px 12px rgba(35,33,29,0.10),0 4px 10px rgba(35,33,29,0.08);
            --primary:#b3402f; --primary-light:rgba(179,64,47,0.08); --primary-dark:#8c2f22;
            --accent:#1b4332; --accent-light:rgba(27,67,50,0.08);
            --success:#2f6b3f; --success-bg:#e9f0e6;
            --warning:#a16207; --warning-bg:#f8f0dd;
            --danger:#b3402f; --danger-bg:#f6e8e4;
            --gray-50:#f7f3ea; --gray-100:#efe9dc; --gray-200:#e3dbc9;
            --gray-300:#d2c8b2; --gray-400:#a89e88; --gray-500:#8a8170;
            --gray-600:#6d655a; --gray-700:#4d473f; --gray-800:#2c2823; --gray-900:#1d1a16;
            --font-sans:"Noto Serif","Songti SC","STSong","SimSun","PingFang SC",serif;
        }
        body{background:
            radial-gradient(900px 360px at 50% -160px, rgba(179,64,47,0.05), transparent 70%),
            var(--bg);}
        ::selection{background:rgba(179,64,47,0.18);color:var(--gray-900)}
        #header{border-bottom:1px solid rgba(35,33,29,0.18)}
        #sidebar{border-right:1px solid rgba(35,33,29,0.18)}
        .sidebar-child.active{background:rgba(179,64,47,0.09);color:var(--primary-dark)}
        .card{box-shadow:0 1px 2px rgba(35,33,29,0.05),0 3px 8px rgba(35,33,29,0.06)}
        .card:hover{border-color:rgba(179,64,47,0.3)}
        .section-h4{border-bottom-width:1px;border-bottom-color:var(--gray-300)}
        /* 标题前朱砂小印章 */
        .card-title::before{content:"";display:inline-block;width:8px;height:8px;background:var(--primary);margin-right:6px}
        .countdown{background:rgba(179,64,47,0.08);color:var(--primary-dark);border-radius:4px}
        .status-tag{border-radius:4px}
        .badge-ok,.badge-warn,.badge-new,.badge-ext{border-radius:4px}
        .bar-fill.blue{background:linear-gradient(90deg,#4d473f,#8a8170)}
        .bar-fill.green{background:linear-gradient(90deg,#2f6b3f,#5a9a6c)}
        .bar-fill.orange{background:linear-gradient(90deg,#a16207,#c98a2d)}
        .bar-fill.gray{background:linear-gradient(90deg,#8a8170,#c5bda6)}
        .info-box{border-radius:6px}
        .info-box.info{border-color:rgba(179,64,47,0.28)}
        .info-box.success{border-color:rgba(47,107,63,0.28)}
        .info-box.warning,.info-box.warn{border-color:rgba(161,98,7,0.28)}
        .info-box.danger{border-color:rgba(179,64,47,0.28)}
        .timeline-dot{outline-width:1px}
        .timeline::before{background:rgba(35,33,29,0.25)}
        .img-placeholder{border-style:solid;border-width:1px;border-color:rgba(35,33,29,0.25);background:rgba(35,33,29,0.03)}
        #content::-webkit-scrollbar-thumb,#sidebar::-webkit-scrollbar-thumb{background:#d2c8b2}
        #content::-webkit-scrollbar-thumb:hover,#sidebar::-webkit-scrollbar-thumb:hover{background:#a89e88}
        /* 图标容器：朱砂印章方底 */
        .quick-link-card .ql-icon{background:rgba(179,64,47,0.09);color:var(--primary-dark);border-radius:4px}
        .quick-link-card:hover .ql-icon{background:var(--primary)}
        .carousel-viewport::before{border-color:rgba(35,33,29,0.4);border-style:solid}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::before{content:"";position:absolute;left:10px;top:8px;width:8px;height:8px;background:var(--primary)}
        .timeline-dot{border-radius:2px}`,
  fonts: 'https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&display=swap' },

/* ─────────────── 06 · 赛博终端 ─────────────── */
{
  id: '06_cyber_terminal',
  name: '赛博终端',
  en: 'Cyber Terminal',
  desc: '一台正在运行的科研数据终端：深空底、等宽数字、荧光绿光标。',
  features: ['荧光绿 #3ddc84 主强调', '全站等宽数字', '终端感 hairline'],
  swatch: ['#3ddc84', '#0a0e14', '#38bdf8'],
  linkBg: '#3ddc84',
  css: `
        /* ═══════ 主题覆盖层 · 赛博终端 ═══════ */
        :root {
            --bg:#0a0e14; --card-bg:#0d141c; --card-radius:4px;
            --line:rgba(61,220,132,0.14);
            --shadow:0 1px 2px rgba(0,0,0,0.4),0 6px 18px rgba(0,0,0,0.4);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.5),0 10px 26px rgba(0,0,0,0.5);
            --primary:#3ddc84; --primary-light:rgba(61,220,132,0.10); --primary-dark:#86efac;
            --accent:#38bdf8; --accent-light:rgba(56,189,248,0.10);
            --success:#3ddc84; --success-bg:rgba(61,220,132,0.10);
            --warning:#fbbf24; --warning-bg:rgba(251,191,36,0.10);
            --danger:#fb7185; --danger-bg:rgba(251,113,133,0.10);
            --gray-50:#1c1c1e; --gray-100:#2c2c2e; --gray-200:#3a3a3c; --gray-300:#48484a; --gray-400:#8e8e93; --gray-500:#98989d; --gray-600:#a1a1a6; --gray-700:#d1d1d6; --gray-800:#f5f5f7; --gray-900:#ffffff;
            --font-mono:"JetBrains Mono","Cascadia Code","SF Mono","Consolas",monospace;
            --font-sans:"JetBrains Mono","PingFang SC","Microsoft YaHei",sans-serif;
        }
        body{background:
            radial-gradient(800px 400px at 85% -80px, rgba(56,189,248,0.08), transparent 70%),
            var(--bg);}
        ::selection{background:rgba(61,220,132,0.35);color:#04100a}
        #header{background:#0a1018;border-bottom:1px solid rgba(61,220,132,0.18)}
        #sidebar{background:#0a1018}
        .sidebar-child.active{background:rgba(61,220,132,0.10);color:var(--primary-dark)}
        .card{box-shadow:0 1px 2px rgba(0,0,0,0.4),0 6px 18px rgba(0,0,0,0.4)}
        .card:hover{border-color:rgba(61,220,132,0.3)}
        .card-header{border-bottom:1px solid rgba(61,220,132,0.12)}
        .countdown{background:rgba(61,220,132,0.10);color:var(--primary-dark);border-radius:4px}
        .status-tag{border-radius:4px}
        .badge-ok,.badge-warn,.badge-new,.badge-ext{border-radius:4px}
        .bar-fill{border-radius:0}
        .bar-track{border-radius:0;background:rgba(255,255,255,0.06)}
        .bar-fill.blue{background:linear-gradient(90deg,#3ddc84,#38bdf8)}
        .bar-fill.green{background:linear-gradient(90deg,#3ddc84,#86efac)}
        .bar-fill.orange{background:linear-gradient(90deg,#fbbf24,#fcd34d)}
        .bar-fill.gray{background:linear-gradient(90deg,#334155,#64748b)}
        .info-box{border-radius:4px}
        .info-box.info{border-color:rgba(61,220,132,0.3)}
        .info-box.success{border-color:rgba(61,220,132,0.3)}
        .info-box.warning,.info-box.warn{border-color:rgba(251,191,36,0.3)}
        .info-box.danger{border-color:rgba(251,113,133,0.3)}
        .source-line code,.code-ref code{background:rgba(61,220,132,0.08);color:var(--gray-700)}
        .timeline-dot{border-radius:2px}
        .img-placeholder{border-style:dashed;border-width:1px;border-color:rgba(61,220,132,0.3);background:rgba(61,220,132,0.03);border-radius:2px}
        #content::-webkit-scrollbar-thumb,#sidebar::-webkit-scrollbar-thumb{background:#1e293b;border-radius:2px}
        #content::-webkit-scrollbar-thumb:hover,#sidebar::-webkit-scrollbar-thumb:hover{background:#334155}
        /* 图标容器：终端绿直角 */
        .quick-link-card .ql-icon{background:rgba(61,220,132,0.12);color:var(--primary-dark);border-radius:4px}
        .quick-link-card:hover .ql-icon{background:var(--primary);color:#04100a}
        .carousel-viewport::before{border-color:rgba(61,220,132,0.35)}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::before{content:"";position:absolute;left:10px;top:9px;width:7px;height:13px;background:var(--primary)}
        .timeline-dot{border-radius:0}
        .card-title::after{content:"";display:inline-block;width:7px;height:1em;margin-left:5px;background:var(--primary);animation:cursor-blink 1.1s steps(2,start) infinite}
        @keyframes cursor-blink{0%,60%{opacity:1}61%,100%{opacity:0}}`,
  fonts: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap' },

/* ─────────────── 07 · 蓝晒蓝图 ─────────────── */
{
  id: '07_blueprint',
  name: '蓝晒蓝图',
  en: 'Blueprint',
  desc: '一张施工蓝图：普鲁士蓝纸底、白色线条、坐标网格背景。',
  features: ['全页坐标网格背景', '白蓝线条体系', '图纸式准星点缀'],
  swatch: ['#8fb0d8', '#10325c', '#ffffff'],
  linkBg: '#8fb0d8',
  css: `
        /* ═══════ 主题覆盖层 · 蓝晒蓝图 ═══════ */
        :root {
            --bg:#10325c; --card-bg:rgba(255,255,255,0.05); --card-radius:6px;
            --line:rgba(143,176,216,0.35);
            --shadow:0 1px 2px rgba(0,0,0,0.3),0 6px 18px rgba(0,0,0,0.3);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.4),0 10px 26px rgba(0,0,0,0.4);
            --primary:#8fb0d8; --primary-light:rgba(143,176,216,0.14); --primary-dark:#ffffff;
            --accent:#ffffff; --accent-light:rgba(255,255,255,0.12);
            --success:#7ee2b8; --success-bg:rgba(126,226,184,0.12);
            --warning:#ffd166; --warning-bg:rgba(255,209,102,0.12);
            --danger:#ff8a8a; --danger-bg:rgba(255,138,138,0.12);
            --gray-50:rgba(255,255,255,0.06); --gray-100:rgba(255,255,255,0.10); --gray-200:rgba(143,176,216,0.35);
            --gray-300:rgba(143,176,216,0.5); --gray-400:#7d9cc4; --gray-500:#9db9d8; --gray-600:#b6cce6;
            --gray-700:#d3e2f2; --gray-800:#eef4fb; --gray-900:#ffffff;
            --font-sans:"Bahnschrift","DengXian","Microsoft YaHei",sans-serif;
        }
        body{background:
            repeating-linear-gradient(0deg, rgba(143,176,216,0.10) 0 1px, transparent 1px 24px),
            repeating-linear-gradient(90deg, rgba(143,176,216,0.10) 0 1px, transparent 1px 24px),
            linear-gradient(160deg,#10325c,#0c2444);}
        ::selection{background:rgba(143,176,216,0.4);color:#fff}
        #header{background:rgba(12,36,68,0.95);border-bottom:1px solid rgba(143,176,216,0.35)}
        #sidebar{background:rgba(12,36,68,0.95);border-right:1px solid rgba(143,176,216,0.35)}
        .sidebar-child.active{background:rgba(143,176,216,0.16);color:#fff}
        .card{background:rgba(255,255,255,0.055)}
        .card:hover{border-color:rgba(143,176,216,0.7)}
        .section-h4{border-bottom-width:1px;border-bottom-color:rgba(143,176,216,0.45)}
        .bar-fill.blue{background:linear-gradient(90deg,#8fb0d8,#ffffff)}
        .bar-fill.green{background:linear-gradient(90deg,#7ee2b8,#d1fae5)}
        .bar-fill.orange{background:linear-gradient(90deg,#ffd166,#ffe9b8)}
        .bar-fill.gray{background:linear-gradient(90deg,#7d9cc4,#b6cce6)}
        .bar-fill{color:#0c2444}
        .info-box{border-radius:4px}
        .info-box.info{border-color:rgba(143,176,216,0.5)}
        .info-box.success{border-color:rgba(126,226,184,0.5)}
        .info-box.warning,.info-box.warn{border-color:rgba(255,209,102,0.5)}
        .info-box.danger{border-color:rgba(255,138,138,0.5)}
        .source-line code,.code-ref code{background:rgba(143,176,216,0.14);color:var(--gray-800)}
        .formula-card{background:rgba(255,255,255,0.05)}
        .img-placeholder{border-style:solid;border-width:1px;border-color:rgba(143,176,216,0.5);background:rgba(143,176,216,0.05)}
        .timeline::before{background:rgba(143,176,216,0.4)}
        #content::-webkit-scrollbar-thumb,#sidebar::-webkit-scrollbar-thumb{background:#2a4d7d;border-radius:2px}
        #content::-webkit-scrollbar-thumb:hover,#sidebar::-webkit-scrollbar-thumb:hover{background:#3d6499}
        /* 图标容器：图纸白蓝直角 */
        .quick-link-card .ql-icon{background:rgba(143,176,216,0.16);color:#ffffff;border-radius:4px}
        .quick-link-card:hover .ql-icon{background:var(--primary);color:#0c2444}
        .carousel-viewport::before{border-color:rgba(143,176,216,0.6)}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::after{content:"";position:absolute;right:8px;top:6px;width:10px;height:10px;border-top:2px solid rgba(143,176,216,0.9);border-right:2px solid rgba(143,176,216,0.9)}
        .timeline-dot{border-radius:0}`,
  fonts: null },

/* ─────────────── 08 · 深空星图 ─────────────── */
{
  id: '08_starmap',
  name: '深空星图',
  en: 'Starmap',
  desc: '一张天文星图：深空夜空、满屏星点、金色星标与坐标。',
  features: ['满屏星点背景', '金色主强调 #e6c26a', '衬线标题'],
  swatch: ['#e6c26a', '#0c1730', '#e8eef7'],
  linkBg: '#e6c26a',
  css: `
        /* ═══════ 主题覆盖层 · 深空星图 ═══════ */
        :root {
            --bg:#070d1f; --card-bg:#0d1530; --card-radius:14px;
            --line:rgba(232,238,247,0.12);
            --shadow:0 1px 2px rgba(0,0,0,0.4),0 8px 24px rgba(0,0,0,0.45);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.5),0 14px 34px rgba(0,0,0,0.55);
            --primary:#e6c26a; --primary-light:rgba(230,194,106,0.12); --primary-dark:#f2dc9e;
            --accent:#7dd3fc; --accent-light:rgba(125,211,252,0.12);
            --success:#6ee7b7; --success-bg:rgba(110,231,183,0.12);
            --warning:#fbbf24; --warning-bg:rgba(251,191,36,0.12);
            --danger:#f87171; --danger-bg:rgba(248,113,113,0.12);
            --gray-50:#1c1c1e; --gray-100:#2c2c2e; --gray-200:#3a3a3c; --gray-300:#48484a; --gray-400:#8e8e93; --gray-500:#98989d; --gray-600:#a1a1a6; --gray-700:#d1d1d6; --gray-800:#f5f5f7; --gray-900:#ffffff;
            --font-sans:"Palatino Linotype","Georgia","Songti SC","STSong","PingFang SC",serif;
        }
        body{background:
            radial-gradient(1.5px 1.5px at 20% 30%, #e8eef7 50%, transparent 51%),
            radial-gradient(1px 1px at 60% 20%, #ffffff 50%, transparent 51%),
            radial-gradient(1px 1px at 80% 60%, #e8eef7 50%, transparent 51%),
            radial-gradient(1.5px 1.5px at 35% 75%, #ffffff 50%, transparent 51%),
            radial-gradient(1px 1px at 90% 30%, #e8eef7 50%, transparent 51%),
            radial-gradient(1px 1px at 50% 50%, #ffffff 50%, transparent 51%),
            radial-gradient(1000px 500px at 50% -180px, rgba(230,194,106,0.10), transparent 70%),
            linear-gradient(160deg,#0c1730,#070d1f);}
        ::selection{background:rgba(230,194,106,0.4);color:#1d1507}
        .sidebar-child.active{background:rgba(230,194,106,0.12);color:var(--primary-dark)}
        .card:hover{border-color:rgba(230,194,106,0.35)}
        .countdown{background:rgba(230,194,106,0.12);color:var(--primary-dark)}
        .bar-fill.blue{background:linear-gradient(90deg,#e6c26a,#f2dc9e)}
        .bar-fill.green{background:linear-gradient(90deg,#6ee7b7,#a7f3d0)}
        .bar-fill.orange{background:linear-gradient(90deg,#fbbf24,#fcd34d)}
        .bar-fill.gray{background:linear-gradient(90deg,#334155,#64748b)}
        .info-box.info{border-color:rgba(230,194,106,0.35)}
        .info-box.success{border-color:rgba(110,231,183,0.35)}
        .info-box.warning,.info-box.warn{border-color:rgba(251,191,36,0.35)}
        .info-box.danger{border-color:rgba(248,113,113,0.35)}
        .source-line code,.code-ref code{background:rgba(255,255,255,0.08);color:var(--gray-700)}
        .img-placeholder{background:rgba(255,255,255,0.04)}
        /* 图标容器：星图金 */
        .quick-link-card .ql-icon{background:rgba(230,194,106,0.14);color:var(--primary-dark)}
        .quick-link-card:hover .ql-icon{background:var(--primary);color:#1d1507}
        .carousel-viewport::before{border-color:rgba(230,194,106,0.4)}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::after{content:"";position:absolute;right:11px;top:10px;width:8px;height:8px;border-radius:50%;background:var(--primary)}`,
  fonts: null },

/* ─────────────── 09 · 杂志编辑 ─────────────── */
{
  id: '09_editorial',
  name: '杂志编辑',
  en: 'Editorial',
  desc: '报刊版面：黑白高对比 + 衬线大标题 + 双线分章，有格调。',
  features: ['黑白高对比 + 点缀红', '衬线 display 标题', '双线分节'],
  swatch: ['#141414', '#ffffff', '#c8372f'],
  linkBg: '#c8372f',
  css: `
        /* ═══════ 主题覆盖层 · 杂志编辑 ═══════ */
        :root {
            --bg:#ffffff; --card-bg:#ffffff; --card-radius:2px;
            --line:rgba(20,20,20,0.14);
            --shadow:0 1px 0 rgba(20,20,20,0.12);
            --shadow-hover:0 2px 8px rgba(20,20,20,0.12);
            --primary:#141414; --primary-light:#f2f2f2; --primary-dark:#000000;
            --accent:#c8372f; --accent-light:#fbefee;
            --success:#1a7f37; --success-bg:#eef7f0;
            --warning:#9a6700; --warning-bg:#faf4e3;
            --danger:#c8372f; --danger-bg:#fbefee;
            --font-sans:"Playfair Display","Songti SC","STSong","SimSun","PingFang SC",serif;
        }
        body{background:var(--bg)}
        ::selection{background:rgba(200,55,47,0.15);color:var(--gray-900)}
        #header{border-bottom:2px solid var(--gray-900)}
        #sidebar{border-right:1px solid rgba(20,20,20,0.18)}
        .sidebar-child.active{background:var(--primary-light);color:var(--gray-900);font-weight:700}
        .card{box-shadow:none;border:1px solid rgba(20,20,20,0.14)}
        .card:hover{border-color:var(--gray-900);box-shadow:0 2px 8px rgba(20,20,20,0.10)}
        .card-header{border-bottom:1px solid var(--gray-900)}
        /* 双线分节 */
        .section-h4{border-bottom:2px solid var(--gray-900);padding-bottom:6px;font-weight:800}
        .section-h4.c-primary{border-bottom-color:var(--gray-900)}
        .section-h4.c-accent{border-bottom-color:var(--accent)}
        .section-h4.c-success{border-bottom-color:var(--success)}
        .section-h4.c-warning{border-bottom-color:var(--warning)}
        .section-h4.c-danger{border-bottom-color:var(--danger)}
        .countdown{background:var(--gray-900);color:#fff;border-radius:2px}
        .status-tag{border-radius:2px;font-weight:700}
        .badge-ok,.badge-warn,.badge-new,.badge-ext{border-radius:2px}
        .data-table thead th{border-bottom:2px solid var(--gray-900)}
        .bar-fill{border-radius:0}
        .bar-track{border-radius:0;border:1px solid rgba(20,20,20,0.14);background:#fff}
        .bar-fill.blue{background:#141414}
        .bar-fill.green{background:#1a7f37}
        .bar-fill.orange{background:#9a6700}
        .bar-fill.gray{background:#6b7280}
        .info-box{border-radius:2px;border-style:solid;border-width:1px}
        .info-box.info{border-color:rgba(20,20,20,0.3);background:#fafafa}
        .info-box.success{border-color:rgba(26,127,55,0.3)}
        .info-box.warning,.info-box.warn{border-color:rgba(154,103,0,0.3)}
        .info-box.danger{border-color:rgba(200,55,47,0.3)}
        .timeline-dot{outline-width:1px;border-radius:0}
        .timeline::before{background:var(--gray-900);width:1px}
        .img-placeholder{border-style:solid;border-width:1px;border-color:rgba(20,20,20,0.25);background:#fafafa;border-radius:2px}
        .metric-card,.compare-card,.quick-link-card{border-radius:2px;box-shadow:none}
        .quick-link-card{border-top-width:3px}
        /* 图标容器：编辑风黑块白图标 */
        .quick-link-card .ql-icon{background:var(--gray-900);color:#ffffff;border-radius:2px}
        .quick-link-card:hover .ql-icon{background:var(--accent)}
        .carousel-viewport::before{border-color:var(--gray-900);border-style:solid}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::before{content:"";position:absolute;left:0;top:-2px;width:34%;height:2px;background:var(--gray-900)}
        .timeline-dot{border-radius:0}
        .card-body .viz p:first-of-type::first-letter,.card-body .explain p:first-of-type::first-letter{font-size:2.1em;font-weight:800;float:left;line-height:.95;margin:3px 7px 0 0;color:var(--accent)}`,
  fonts: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&display=swap' },

/* ─────────────── 10 · 极光之夜 ─────────────── */
{
  id: '10_aurora_night',
  name: '极光之夜',
  en: 'Aurora Night',
  desc: '极地夜空：青绿紫极光渐变穹顶，深色玻璃卡面，冷静又炫酷。',
  features: ['青绿紫极光穹顶', '极光渐变 hairline', '玻璃侧边栏'],
  swatch: ['#5eead4', '#a78bfa', '#050510'],
  linkBg: 'linear-gradient(90deg,#5eead4,#a78bfa)',
  css: `
        /* ═══════ 主题覆盖层 · 极光之夜 ═══════ */
        :root {
            --bg:#050510; --card-bg:rgba(13,14,24,0.8); --card-radius:14px;
            --line:rgba(148,233,255,0.14);
            --shadow:0 1px 2px rgba(0,0,0,0.4),0 8px 24px rgba(0,0,0,0.45);
            --shadow-hover:0 4px 12px rgba(0,0,0,0.5),0 14px 34px rgba(0,0,0,0.55);
            --primary:#5eead4; --primary-light:rgba(94,234,212,0.12); --primary-dark:#99f6e4;
            --font-sans:"Sora","PingFang SC","Microsoft YaHei",sans-serif;
            --accent:#a78bfa; --accent-light:rgba(167,139,250,0.12);
            --success:#6ee7b7; --success-bg:rgba(110,231,183,0.12);
            --warning:#fcd34d; --warning-bg:rgba(252,211,77,0.12);
            --danger:#fda4af; --danger-bg:rgba(253,164,175,0.12);
            --gray-50:#1c1c1e; --gray-100:#2c2c2e; --gray-200:#3a3a3c; --gray-300:#48484a; --gray-400:#8e8e93; --gray-500:#98989d; --gray-600:#a1a1a6; --gray-700:#d1d1d6; --gray-800:#f5f5f7; --gray-900:#ffffff;
        }
        body{background:
            radial-gradient(120% 60% at 50% -10%, rgba(94,234,212,0.16), transparent 55%),
            radial-gradient(70% 45% at 15% 25%, rgba(34,211,238,0.10), transparent 60%),
            radial-gradient(80% 50% at 90% 40%, rgba(167,139,250,0.14), transparent 60%),
            radial-gradient(60% 40% at 40% 110%, rgba(94,234,212,0.08), transparent 60%),
            var(--bg);}
        ::selection{background:rgba(94,234,212,0.35);color:#04140f}
        /* 卡片顶部极光渐变细线 */
        .card{border-top:1px solid transparent;background-image:linear-gradient(rgba(13,14,24,0.8),rgba(13,14,24,0.8)),linear-gradient(90deg,rgba(94,234,212,0.5),rgba(167,139,250,0.5));background-origin:border-box;background-clip:padding-box,border-box}
        .card:hover{border-color:rgba(148,233,255,0.3)}
        #header{background:rgba(5,5,16,0.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
        #sidebar{background:rgba(5,5,16,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        .sidebar-child.active{background:rgba(94,234,212,0.12);color:var(--primary-dark)}
        .countdown{background:rgba(94,234,212,0.12);color:var(--primary-dark)}
        .bar-fill.blue{background:linear-gradient(90deg,#5eead4,#a78bfa)}
        .bar-fill.green{background:linear-gradient(90deg,#6ee7b7,#a7f3d0)}
        .bar-fill.orange{background:linear-gradient(90deg,#fcd34d,#fde68a)}
        .bar-fill.gray{background:linear-gradient(90deg,#334155,#64748b)}
        .info-box.info{border-color:rgba(94,234,212,0.32)}
        .info-box.success{border-color:rgba(110,231,183,0.32)}
        .info-box.warning,.info-box.warn{border-color:rgba(252,211,77,0.32)}
        .info-box.danger{border-color:rgba(253,164,175,0.32)}
        .source-line code,.code-ref code{background:rgba(255,255,255,0.08);color:var(--gray-700)}
        .formula-card{background:rgba(255,255,255,0.05)}
        .img-placeholder{background:rgba(255,255,255,0.04)}
        /* 图标容器：极光青 */
        .quick-link-card .ql-icon{background:rgba(94,234,212,0.14);color:var(--primary-dark)}
        .quick-link-card:hover .ql-icon{background:var(--primary);color:#04140f}
        .carousel-viewport::before{border-color:rgba(94,234,212,0.4)}
        .carousel-item .ci-card{position:relative}
        .carousel-item .ci-card::before{content:"";position:absolute;left:14px;right:14px;top:-2px;height:2px;background:linear-gradient(90deg,transparent,#5eead4,#a78bfa,transparent)}
        .card{position:relative;overflow:hidden}
        .card::before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,#5eead4,#a78bfa);opacity:.3;animation:aurora-breathe 6s ease-in-out infinite}
        @keyframes aurora-breathe{0%,100%{opacity:.2}50%{opacity:.85}}`,
  fonts: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap' },
    
/* ─────────────── 11 · 人大红 Beamer ─────────────── */
{
  id: '11_ruc_beamer',
  name: '人大红 Beamer',
  en: 'RUC Beamer',
  desc: '中国人民大学 LaTeX beamer 模板（RenminUniv.sty）的网页复刻：校徽红 #971f30 顶导底栏、校徽与背景水印、宋体衬线。',
  features: ['校徽红 #971f30 定调全页', '校徽 + background 水印', '宋体/Georgia 衬线庄重感'],
  swatch: ['#971f30', '#b83047', '#fdf8f8'],
  linkBg: '#971f30',
  fonts: null,
  css: `        /* ═══════ 主题覆盖层 · 人大红 Beamer ═══════ */
        :root {
            --bg:#fdf8f8; --card-bg:#ffffff; --card-radius:8px;
            --line:rgba(151,31,48,0.12);
            --shadow:0 1px 2px rgba(151,31,48,0.05),0 2px 6px rgba(151,31,48,0.06);
            --shadow-hover:0 4px 12px rgba(151,31,48,0.10),0 6px 16px rgba(151,31,48,0.08);
            /* 校徽红 #971f30（RenminUniv.sty tsinghua RGB 151,31,48） */
            --primary:#971f30; --primary-light:#f9eef0; --primary-dark:#6e1623;
            --accent:#b83047; --accent-light:#fdf0f2;
            --success:#1a7f37; --success-bg:#eef7f0;
            --warning:#9a6700; --warning-bg:#faf4e3;
            --danger:#c8372f; --danger-bg:#fbefee;
            /* LaTeX beamer 衬线感：宋体 + Georgia */
            --font-sans:"Songti SC","STSong","SimSun","Georgia","PingFang SC","Microsoft YaHei",serif;
        }
        /* 背景水印：beamer background.pdf 低透明度铺底（白色膜压淡） */
        body{background:
            linear-gradient(rgba(253,248,248,0.88),rgba(253,248,248,0.88)),
            url(assets/ruc-bg.png) center 30%/55% no-repeat,
            var(--bg);}
        ::selection{background:rgba(151,31,48,0.22);color:var(--gray-900)}
        /* ── 顶导：校徽红底白字（beamer frametitle）── */
        #header{background:var(--primary);border-bottom:1px solid rgba(255,255,255,0.25)}
        #header .nav-brand{color:#ffffff}
        #header .nav-brand a,#header .nav-brand span{color:#ffffff}
        .nav-links a{color:rgba(255,255,255,0.85)}
        .nav-links a:hover{background:rgba(255,255,255,0.16);color:#ffffff;text-decoration:none}
        .nav-links a.active{background:rgba(255,255,255,0.24);color:#ffffff;font-weight:600}
        .nav-links a:active{transform:scale(0.97)}
        #header .header-right{color:rgba(255,255,255,0.8)}
        .countdown{background:rgba(255,255,255,0.18);color:#ffffff}
        .ts-btn{background:transparent;border-color:rgba(255,255,255,0.4);color:#ffffff}
        .ts-btn:hover{border-color:#ffffff;color:#ffffff}
        /* ── 底栏：白底 + 校徽红分隔线；logo 在 X 轴最右、Y 轴中心（基座 flex 布局） ── */
        #footer{background:#ffffff;color:var(--gray-500);border-top:1px solid rgba(151,31,48,0.3)}
        #footer .footer-meta strong{color:var(--primary-dark)}
        #footer .footer-meta .sep{color:var(--gray-300)}
        /* 校徽：底部声明栏右侧 logo（素材 assets/ruc-logo-1.png）；去占位虚线边框 */
        #footer .footer-logo .logo-slot{
            display:inline-block;width:140px;height:26px;
            background:url(assets/ruc-logo-1.png) center/contain no-repeat;
            border:none;border-radius:0;padding:0;
            color:transparent;font-size:0;
            transform:translateY(-3px);   /* 整体上移，避开底缘裁切感 */
        }
        /* ── 侧边栏 ── */
        #sidebar{border-right:1px solid rgba(151,31,48,0.15)}
        .sidebar-parent:hover{background:#fdf3f4}
        .sidebar-child:hover{background:#fdf3f4}
        .sidebar-child.active{background:var(--primary-light);color:var(--primary-dark)}
        /* ── 卡片与分节（beamer separation line 红细线）── */
        .card{border-radius:8px;position:relative}
        /* 背景图按左侧导引标签的模块粒度，铺在每个卡片右侧作淡背景 */
        .card::after{
            content:"";position:absolute;right:0;bottom:0;
            width:100%;height:100%;
            /* contain：图片按区域等比缩放、完整显示（绝不裁切）；
               元素高度跟随卡片实时变化（折叠开合），背景尺寸随之自动重算，
               纯 CSS 即动态适配，无需 JS 计算 */
            background:url(assets/ruc-bg.png) right bottom/contain no-repeat;
            opacity:0.6;mix-blend-mode:multiply;
            pointer-events:none;z-index:0;
        }
        .card>*{position:relative;z-index:1}
        .card:hover{border-color:rgba(151,31,48,0.3)}
        .card-header{border-bottom:1px solid rgba(151,31,48,0.25)}
        .section-h4{border-bottom:2px solid var(--primary);padding-bottom:6px}
        .section-h4.c-primary{border-bottom-color:var(--primary)}
        .section-h4.c-accent{border-bottom-color:var(--accent)}
        .info-box.info{border-color:rgba(151,31,48,0.3)}
        .info-box.info::before{background:var(--primary)}
        .info-box.info strong{color:var(--primary-dark)}
        .data-table thead th{background:#fdf3f4;color:var(--primary-dark);border-bottom:2px solid rgba(151,31,48,0.35)}
        .timeline::before{background:rgba(151,31,48,0.3)}
        /* 图标容器：校徽红浅底 */
        .quick-link-card .ql-icon{background:var(--primary-light);color:var(--primary-dark);border-radius:8px}
        .quick-link-card:hover .ql-icon{background:var(--primary);color:#ffffff}
        #content::-webkit-scrollbar-thumb,#sidebar::-webkit-scrollbar-thumb{background:#e3c8cd}
        #content::-webkit-scrollbar-thumb:hover,#sidebar::-webkit-scrollbar-thumb:hover{background:var(--primary)}`
}
];
});
