/* theme-pack.js — 主题包单一数据源（UMD 双模式）
 * 浏览器：<script src="theme-pack.js"> → window.THEME_PACK
 * Node 构建：require('./theme-pack.js')
 * 新增/修改主题只改本文件；css 为 :root token 覆盖层 + body[data-theme] 专属装饰。
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.THEME_PACK = factory();
})(typeof self !== 'undefined' ? self : this, function () {
    return [
        {
            id: "dawn",
            name: "晨雾",
            en: "Dawn Mist",
            desc: "暖白宣纸底 + 深紫 accent，晨雾渐变的亮色主题",
            swatch: ["#5b3fd4", "#faf8f5", "#e6def5"],
            css: ":root{" +
                "--bg-0:#faf8f5;--bg-1:#f3f0ea;--bg-2:#ece8e0;" +
                "--border:rgba(30,25,60,.14);--border-soft:rgba(30,25,60,.08);--border-strong:rgba(30,25,60,.28);" +
                "--hero-grad:linear-gradient(180deg,#f6f2fb 0%,#e6def5 58%,#faf8f5 100%);" +
                "--accent:#5b3fd4;--accent-mid:rgba(91,63,212,.55);--accent-dim:rgba(91,63,212,.4);--accent-strong:rgba(91,63,212,.75);" +
                "--btn-bg:#5b3fd4;--btn-ink:#ffffff;--btn-hover:#4c33b8;" +
                "--text-hi:#23203a;--text-mid:rgba(35,32,58,.78);--text-low:rgba(35,32,58,.58);--text-faint:rgba(35,32,58,.4);" +
                "--topbar-bg:rgba(250,248,245,.82);--surface-1:rgba(35,32,58,.035);--surface-2:rgba(35,32,58,.065);" +
                "--glow-a:radial-gradient(circle,rgba(91,63,212,.14),transparent 65%);--glow-b:radial-gradient(circle,rgba(120,150,240,.12),transparent 65%);" +
                "--star-a:radial-gradient(1px 1px at 25% 35%,rgba(91,63,212,.32) 50%,transparent 51%);" +
                "--star-b:radial-gradient(1px 1px at 60% 20%,rgba(91,63,212,.24) 50%,transparent 51%);" +
                "--star-c:radial-gradient(1.5px 1.5px at 45% 70%,rgba(91,63,212,.16) 50%,transparent 51%);" +
                "--star-drift:rgba(91,63,212,.42);--star-drift-accent:rgba(91,63,212,.6);" +
                "--const-line:rgba(91,63,212,.22);--const-node:#5b3fd4;" +
                "--spine-line:rgba(35,32,58,.14);--spine-halo:rgba(91,63,212,.18);--traveler-halo:rgba(91,63,212,.28);" +
                "--conv-p1:rgba(91,63,212,.35);--conv-p2:rgba(91,63,212,.25);--conv-p3:rgba(91,63,212,.18);--conv-halo:rgba(91,63,212,.2);" +
                "--chapter-glow:radial-gradient(52% 46% at 84% 16%,rgba(91,63,212,.05),transparent 70%),radial-gradient(44% 40% at 6% 92%,rgba(120,150,240,.05),transparent 70%);" +
                "--rail-dot:rgba(35,32,58,.3);--glow-dot:rgba(91,63,212,.45);--build-line:rgba(35,32,58,.14);" +
                "--sel-bg:rgba(91,63,212,.25);--scrollbar:rgba(35,32,58,.22);--scrollbar-hover:rgba(35,32,58,.36);--watermark:rgba(35,32,58,.05);" +
                "--shadow-float:0 24px 48px -16px rgba(35,32,58,.18),0 8px 16px -8px rgba(35,32,58,.12);" +
                "}"
        },
        {
            id: "blueprint",
            name: "蓝图",
            en: "Blueprint",
            desc: "白蓝坐标纸 + 工程深蓝，Bahnschrift 图纸数字，亮色主题",
            swatch: ["#1d4ed8", "#f4f7fb", "#dbe7f7"],
            css: ":root{" +
                "--bg-0:#f4f7fb;--bg-1:#eef2f8;--bg-2:#e6ebf4;" +
                "--border:rgba(20,33,61,.14);--border-soft:rgba(20,33,61,.08);--border-strong:rgba(20,33,61,.28);" +
                "--hero-grad:linear-gradient(180deg,#eef3fb 0%,#dbe7f7 58%,#f4f7fb 100%);" +
                "--accent:#1d4ed8;--accent-mid:rgba(29,78,216,.55);--accent-dim:rgba(29,78,216,.4);--accent-strong:rgba(29,78,216,.75);" +
                "--btn-bg:#1d4ed8;--btn-ink:#ffffff;--btn-hover:#1a44bd;" +
                "--text-hi:#14213d;--text-mid:rgba(20,33,61,.78);--text-low:rgba(20,33,61,.56);--text-faint:rgba(20,33,61,.38);" +
                "--topbar-bg:rgba(244,247,251,.82);--surface-1:rgba(20,33,61,.035);--surface-2:rgba(20,33,61,.065);" +
                "--glow-a:radial-gradient(circle,rgba(29,78,216,.12),transparent 65%);--glow-b:radial-gradient(circle,rgba(56,189,248,.1),transparent 65%);" +
                "--star-a:radial-gradient(1px 1px at 25% 35%,rgba(29,78,216,.3) 50%,transparent 51%);" +
                "--star-b:radial-gradient(1px 1px at 60% 20%,rgba(29,78,216,.22) 50%,transparent 51%);" +
                "--star-c:radial-gradient(1.5px 1.5px at 45% 70%,rgba(29,78,216,.15) 50%,transparent 51%);" +
                "--star-drift:rgba(29,78,216,.4);--star-drift-accent:rgba(29,78,216,.55);" +
                "--const-line:rgba(29,78,216,.25);--const-node:#1d4ed8;" +
                "--spine-line:rgba(20,33,61,.14);--spine-halo:rgba(29,78,216,.18);--traveler-halo:rgba(29,78,216,.28);" +
                "--conv-p1:rgba(29,78,216,.35);--conv-p2:rgba(29,78,216,.25);--conv-p3:rgba(29,78,216,.18);--conv-halo:rgba(29,78,216,.2);" +
                "--chapter-glow:radial-gradient(52% 46% at 84% 16%,rgba(29,78,216,.05),transparent 70%),radial-gradient(44% 40% at 6% 92%,rgba(56,189,248,.045),transparent 70%);" +
                "--rail-dot:rgba(20,33,61,.3);--glow-dot:rgba(29,78,216,.4);--build-line:rgba(20,33,61,.14);" +
                "--sel-bg:rgba(29,78,216,.22);--scrollbar:rgba(20,33,61,.22);--scrollbar-hover:rgba(20,33,61,.36);--watermark:rgba(20,33,61,.05);" +
                "--shadow-float:0 24px 48px -16px rgba(20,33,61,.16),0 8px 16px -8px rgba(20,33,61,.1);" +
                "--font-sans:Bahnschrift,\"DIN Alternate\",-apple-system,\"PingFang SC\",\"DengXian\",\"Microsoft YaHei\",sans-serif;" +
                "}" +
                "body[data-theme='blueprint'] .nebula-grid{display:block;opacity:.5;background-image:repeating-linear-gradient(0deg,rgba(29,78,216,.05) 0 1px,transparent 1px 28px),repeating-linear-gradient(90deg,rgba(29,78,216,.05) 0 1px,transparent 1px 28px)}"
        },
        {
            id: "ink",
            name: "宣纸",
            en: "Ink Vermilion",
            desc: "暖宣纸底 + 朱砂 accent + 宋体书卷气，亮色主题",
            swatch: ["#b3442f", "#f7f2e8", "#e9e0c8"],
            css: ":root{" +
                "--bg-0:#f7f2e8;--bg-1:#f1ead9;--bg-2:#eae2cd;" +
                "--border:rgba(44,37,24,.15);--border-soft:rgba(44,37,24,.09);--border-strong:rgba(44,37,24,.3);" +
                "--hero-grad:linear-gradient(180deg,#f4eedd 0%,#e9e0c8 58%,#f7f2e8 100%);" +
                "--accent:#b3442f;--accent-mid:rgba(179,68,47,.55);--accent-dim:rgba(179,68,47,.4);--accent-strong:rgba(179,68,47,.75);" +
                "--btn-bg:#b3442f;--btn-ink:#fff8f0;--btn-hover:#9e3a28;" +
                "--text-hi:#2c2518;--text-mid:rgba(44,37,24,.78);--text-low:rgba(44,37,24,.55);--text-faint:rgba(44,37,24,.38);" +
                "--topbar-bg:rgba(247,242,232,.84);--surface-1:rgba(44,37,24,.04);--surface-2:rgba(44,37,24,.07);" +
                "--glow-a:radial-gradient(circle,rgba(179,68,47,.1),transparent 65%);--glow-b:radial-gradient(circle,rgba(150,120,60,.1),transparent 65%);" +
                "--star-a:radial-gradient(1px 1px at 25% 35%,rgba(179,68,47,.2) 50%,transparent 51%);" +
                "--star-b:radial-gradient(1px 1px at 60% 20%,rgba(179,68,47,.15) 50%,transparent 51%);" +
                "--star-c:radial-gradient(1.5px 1.5px at 45% 70%,rgba(150,120,60,.12) 50%,transparent 51%);" +
                "--star-drift:rgba(179,68,47,.3);--star-drift-accent:rgba(179,68,47,.45);" +
                "--const-line:rgba(179,68,47,.3);--const-node:#b3442f;" +
                "--spine-line:rgba(44,37,24,.15);--spine-halo:rgba(179,68,47,.16);--traveler-halo:rgba(179,68,47,.25);" +
                "--conv-p1:rgba(179,68,47,.35);--conv-p2:rgba(179,68,47,.25);--conv-p3:rgba(179,68,47,.18);--conv-halo:rgba(179,68,47,.18);" +
                "--chapter-glow:radial-gradient(52% 46% at 84% 16%,rgba(179,68,47,.04),transparent 70%),radial-gradient(44% 40% at 6% 92%,rgba(150,120,60,.045),transparent 70%);" +
                "--rail-dot:rgba(44,37,24,.32);--glow-dot:rgba(179,68,47,.4);--build-line:rgba(44,37,24,.15);" +
                "--sel-bg:rgba(179,68,47,.22);--scrollbar:rgba(44,37,24,.25);--scrollbar-hover:rgba(44,37,24,.4);--watermark:rgba(44,37,24,.05);" +
                "--shadow-float:0 24px 48px -16px rgba(44,37,24,.16),0 8px 16px -8px rgba(44,37,24,.1);" +
                "--font-sans:Georgia,\"Times New Roman\",\"Songti SC\",STSong,SimSun,serif;" +
                "}"
        },
        {
            id: "starmap",
            name: "星图",
            en: "Starmap",
            desc: "深蓝夜幕 + 金色星轨 accent + 衬线数字，暗色主题",
            swatch: ["#e6c26a", "#070a14", "#0e1430"],
            css: ":root{" +
                "--bg-0:#070a14;--bg-1:#0d1120;--bg-2:#141a2e;" +
                "--border:rgba(255,255,255,.09);--border-soft:rgba(255,255,255,.06);--border-strong:rgba(255,255,255,.2);" +
                "--hero-grad:linear-gradient(180deg,#05060d 0%,#0e1430 58%,#070a14 100%);" +
                "--accent:#e6c26a;--accent-mid:rgba(230,194,106,.55);--accent-dim:rgba(230,194,106,.4);--accent-strong:rgba(230,194,106,.75);" +
                "--btn-bg:#e6c26a;--btn-ink:#1a1406;--btn-hover:#f0d489;" +
                "--text-hi:#f5f0e4;--text-mid:rgba(255,255,255,.85);--text-low:rgba(255,255,255,.58);--text-faint:rgba(255,255,255,.36);" +
                "--topbar-bg:rgba(7,10,20,.8);--surface-1:rgba(255,255,255,.025);--surface-2:rgba(255,255,255,.055);" +
                "--glow-a:radial-gradient(circle,rgba(230,194,106,.12),transparent 65%);--glow-b:radial-gradient(circle,rgba(80,110,220,.1),transparent 65%);" +
                "--star-a:radial-gradient(1px 1px at 25% 35%,rgba(255,255,255,.6) 50%,transparent 51%);" +
                "--star-b:radial-gradient(1px 1px at 60% 20%,rgba(255,255,255,.42) 50%,transparent 51%);" +
                "--star-c:radial-gradient(2px 2px at 45% 70%,rgba(255,235,190,.3) 50%,transparent 51%);" +
                "--star-drift:rgba(255,255,255,.6);--star-drift-accent:rgba(230,194,106,.7);" +
                "--const-line:rgba(230,194,106,.3);--const-node:#e6c26a;" +
                "--spine-line:rgba(255,255,255,.12);--spine-halo:rgba(230,194,106,.2);--traveler-halo:rgba(230,194,106,.32);" +
                "--conv-p1:rgba(230,194,106,.34);--conv-p2:rgba(230,194,106,.24);--conv-p3:rgba(230,194,106,.17);--conv-halo:rgba(230,194,106,.2);" +
                "--chapter-glow:radial-gradient(52% 46% at 84% 16%,rgba(230,194,106,.05),transparent 70%),radial-gradient(44% 40% at 6% 92%,rgba(80,110,220,.05),transparent 70%);" +
                "--rail-dot:rgba(255,255,255,.28);--glow-dot:rgba(230,194,106,.5);--build-line:rgba(255,255,255,.13);" +
                "--sel-bg:rgba(230,194,106,.28);--scrollbar:rgba(255,255,255,.14);--scrollbar-hover:rgba(255,255,255,.24);--watermark:rgba(255,255,255,.04);" +
                "--shadow-float:0 24px 48px -16px rgba(0,0,0,.55),0 8px 16px -8px rgba(5,6,13,.5);" +
                "--font-sans:\"Palatino Linotype\",Palatino,Georgia,\"Songti SC\",STSong,SimSun,serif;" +
                "}"
        },
        {
            id: "nocturne",
            name: "墨夜",
            en: "Nocturne",
            desc: "暖黑墨色 + 朱砂 accent + 宋体，宣纸的暗色兄弟",
            swatch: ["#d4563c", "#12100d", "#1f1812"],
            css: ":root{" +
                "--bg-0:#12100d;--bg-1:#1a1712;--bg-2:#232019;" +
                "--border:rgba(255,255,255,.09);--border-soft:rgba(255,255,255,.06);--border-strong:rgba(255,255,255,.2);" +
                "--hero-grad:linear-gradient(180deg,#0e0c09 0%,#1f1812 58%,#12100d 100%);" +
                "--accent:#d4563c;--accent-mid:rgba(212,86,60,.55);--accent-dim:rgba(212,86,60,.4);--accent-strong:rgba(212,86,60,.75);" +
                "--btn-bg:#c2402a;--btn-ink:#fff8f2;--btn-hover:#a83824;" +
                "--text-hi:#f4efe7;--text-mid:rgba(255,255,255,.85);--text-low:rgba(255,255,255,.58);--text-faint:rgba(255,255,255,.36);" +
                "--topbar-bg:rgba(18,16,13,.8);--surface-1:rgba(255,255,255,.025);--surface-2:rgba(255,255,255,.055);" +
                "--glow-a:radial-gradient(circle,rgba(212,86,60,.12),transparent 65%);--glow-b:radial-gradient(circle,rgba(200,150,60,.08),transparent 65%);" +
                "--star-a:radial-gradient(1px 1px at 25% 35%,rgba(255,230,200,.42) 50%,transparent 51%);" +
                "--star-b:radial-gradient(1px 1px at 60% 20%,rgba(255,230,200,.3) 50%,transparent 51%);" +
                "--star-c:radial-gradient(1.5px 1.5px at 45% 70%,rgba(255,220,180,.2) 50%,transparent 51%);" +
                "--star-drift:rgba(255,230,200,.4);--star-drift-accent:rgba(212,86,60,.6);" +
                "--const-line:rgba(212,86,60,.3);--const-node:#d4563c;" +
                "--spine-line:rgba(255,255,255,.12);--spine-halo:rgba(212,86,60,.2);--traveler-halo:rgba(212,86,60,.3);" +
                "--conv-p1:rgba(212,86,60,.34);--conv-p2:rgba(212,86,60,.24);--conv-p3:rgba(212,86,60,.17);--conv-halo:rgba(212,86,60,.2);" +
                "--chapter-glow:radial-gradient(52% 46% at 84% 16%,rgba(212,86,60,.05),transparent 70%),radial-gradient(44% 40% at 6% 92%,rgba(200,150,60,.04),transparent 70%);" +
                "--rail-dot:rgba(255,255,255,.28);--glow-dot:rgba(212,86,60,.5);--build-line:rgba(255,255,255,.13);" +
                "--sel-bg:rgba(212,86,60,.28);--scrollbar:rgba(255,255,255,.14);--scrollbar-hover:rgba(255,255,255,.24);--watermark:rgba(255,255,255,.04);" +
                "--shadow-float:0 24px 48px -16px rgba(0,0,0,.55),0 8px 16px -8px rgba(10,8,6,.5);" +
                "--font-sans:Georgia,\"Songti SC\",STSong,SimSun,\"Times New Roman\",serif;" +
                "}"
        },
        {
            id: "twilight",
            name: "夜航",
            en: "Twilight",
            desc: "近黑暗场 + 深紫 twilight + 薰衣草紫 accent，默认暗色主题",
            swatch: ["#cbb7fb", "#08090a", "#1b1938"],
            css: null
        },
        {
            id: "ruc",
            name: "人大红",
            en: "RUC Crimson",
            desc: "校徽红 #971f30：红底顶栏 + 居中校徽 logo 常显 + 白底页脚红分隔线，亮色主题",
            swatch: ["#971f30", "#fdfcfb", "#f3e9ea"],
            css: ":root{" +
                "--bg-0:#fdfcfb;--bg-1:#f6f4f2;--bg-2:#efece9;" +
                "--border:rgba(40,25,30,.14);--border-soft:rgba(40,25,30,.08);--border-strong:rgba(40,25,30,.28);" +
                "--hero-grad:linear-gradient(180deg,#fbf7f6 0%,#f3e9ea 58%,#fdfcfb 100%);" +
                "--accent:#971f30;--accent-mid:rgba(151,31,48,.55);--accent-dim:rgba(151,31,48,.4);--accent-strong:rgba(151,31,48,.75);" +
                "--btn-bg:#971f30;--btn-ink:#ffffff;--btn-hover:#7e1a28;" +
                "--text-hi:#2a1a1e;--text-mid:rgba(42,26,30,.78);--text-low:rgba(42,26,30,.56);--text-faint:rgba(42,26,30,.38);" +
                "--topbar-bg:rgba(253,252,251,.85);--surface-1:rgba(42,26,30,.035);--surface-2:rgba(42,26,30,.065);" +
                "--glow-a:radial-gradient(circle,rgba(151,31,48,.1),transparent 65%);--glow-b:radial-gradient(circle,rgba(190,80,95,.08),transparent 65%);" +
                "--star-a:radial-gradient(1px 1px at 25% 35%,rgba(151,31,48,.28) 50%,transparent 51%);" +
                "--star-b:radial-gradient(1px 1px at 60% 20%,rgba(151,31,48,.2) 50%,transparent 51%);" +
                "--star-c:radial-gradient(1.5px 1.5px at 45% 70%,rgba(151,31,48,.12) 50%,transparent 51%);" +
                "--star-drift:rgba(151,31,48,.32);--star-drift-accent:rgba(151,31,48,.48);" +
                "--const-line:rgba(151,31,48,.25);--const-node:#971f30;" +
                "--spine-line:rgba(42,26,30,.14);--spine-halo:rgba(151,31,48,.16);--traveler-halo:rgba(151,31,48,.25);" +
                "--conv-p1:rgba(151,31,48,.32);--conv-p2:rgba(151,31,48,.22);--conv-p3:rgba(151,31,48,.15);--conv-halo:rgba(151,31,48,.16);" +
                "--chapter-glow:radial-gradient(52% 46% at 84% 16%,rgba(151,31,48,.045),transparent 70%),radial-gradient(44% 40% at 6% 92%,rgba(190,80,95,.04),transparent 70%);" +
                "--rail-dot:rgba(42,26,30,.3);--glow-dot:rgba(151,31,48,.4);--build-line:rgba(42,26,30,.14);" +
                "--sel-bg:rgba(151,31,48,.2);--scrollbar:rgba(42,26,30,.22);--scrollbar-hover:rgba(42,26,30,.36);--watermark:rgba(151,31,48,.05);" +
                "--shadow-float:0 24px 48px -16px rgba(42,26,30,.16),0 8px 16px -8px rgba(42,26,30,.1);" +
                "}" +
                "body[data-theme='ruc'] .topbar{background:#971f30;border-bottom-color:rgba(0,0,0,.1)}" +
                "body[data-theme='ruc'] .topbar .brand{color:#ffffff}" +
                "body[data-theme='ruc'] .topbar .brand svg{color:#ffffff}" +
                "body[data-theme='ruc'] .chapter-nav-btn{color:rgba(255,255,255,.82)}" +
                "body[data-theme='ruc'] .chapter-nav-btn:hover{color:#ffffff}" +
                "body[data-theme='ruc'] .chapter-nav-btn .cn{color:rgba(255,255,255,.6)}" +
                "body[data-theme='ruc'] .chapter-nav-btn.on{color:#ffffff}" +
                "body[data-theme='ruc'] .chapter-nav-btn.on .cn{color:#ffffff}" +
                "body[data-theme='ruc'] .chapter-nav-btn::after{background:#ffffff}" +
                "body[data-theme='ruc'] .ts-btn{border-color:rgba(255,255,255,.4);color:#ffffff;background:rgba(255,255,255,.1)}" +
                "body[data-theme='ruc'] .ts-btn:hover{border-color:rgba(255,255,255,.7);color:#ffffff;background:rgba(255,255,255,.18)}" +
                "body[data-theme='ruc'] .page-foot{background:#ffffff;border-top:1px solid #971f30;flex-direction:column;align-items:center;gap:12px}" +
                "body[data-theme='ruc'] .page-foot .foot-brand{color:rgba(42,26,30,.6)}" +
                "body[data-theme='ruc'] .page-foot .foot-meta{color:rgba(42,26,30,.6)}" +
                "body[data-theme='ruc'] .foot-logo{display:flex}" +
                "body[data-theme='ruc'] .hero-logo{display:flex;position:absolute;left:clamp(28px,5vw,72px);top:96px;bottom:24px;align-items:center;z-index:2;pointer-events:none}" +
                "body[data-theme='ruc'] .ruc-vertical{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}" +
                "body[data-theme='ruc'] .rv-emblem{width:108px;height:auto}" +
                "body[data-theme='ruc'] .rv-cn{font-size:17px;font-weight:600;color:#971f30;letter-spacing:.14em}" +
                "body[data-theme='ruc'] .rv-en{font-size:9px;color:#971f30;letter-spacing:.1em}" +
                "body[data-theme='ruc'] .stage-hero .stage-inner{margin-left:clamp(170px,20vw,260px);margin-right:auto;width:min(1120px,calc(100% - clamp(170px,20vw,260px) - clamp(40px,8vw,160px)))}" +
                "@media (max-width:760px){body[data-theme='ruc'] .hero-logo{display:none}body[data-theme='ruc'] .stage-hero .stage-inner{margin-left:auto;margin-right:auto;width:min(1120px,100% - clamp(40px,8vw,160px))}}" +
                "body[data-theme='ruc'] .preview-card{position:relative;overflow:hidden}" +
                "body[data-theme='ruc'] .preview-card::after{content:\"\";position:absolute;right:0;bottom:0;width:42%;height:78%;background:url(assets/ruc-bg.webp) no-repeat right bottom;background-size:contain;opacity:.45;mix-blend-mode:multiply;pointer-events:none}" +
                "body[data-theme='ruc'] .preview-card>*{position:relative;z-index:1}"
        }
    ];
});
