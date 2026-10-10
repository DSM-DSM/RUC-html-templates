/* ============================================================================
 * a4r-bridge.js — 全站偏好桥（主站 index.html 的语言/明暗选择广播到子站）
 * ----------------------------------------------------------------------------
 * 用法：子页面在 <head> 内、引入本文件之前设置：
 *   <script>window.A4R = {
 *     mode: 1,                              // 接听明暗广播
 *     lang: 1,                              // 接听语言广播（data-zh/data-en 显隐）
 *     themeKey: 'paper-explainer-theme',    // 本站主题 localStorage key
 *     lightId: 'ruc', darkId: 'ink-night',  // 明/暗广播映射到本站主题包的 id
 *     langKey: 'homepage-lang'              // （可选）本站已有的语言 key，同步写入
 *   };</script>
 *   <script src="…/a4r-bridge.js"></script>
 *
 * 行为（广播覆盖式）：
 *   - 首次加载：a4r-mode 未设置 → 不干预（保持本站默认）；已设置 → 写本站
 *     themeKey（light→lightId / dark→darkId）并标记 -set，各站自身的防闪恢复
 *     与切换面板照常工作；a4r-lang → <html data-lang> + lang 属性（CSS 显隐
 *     data-zh/data-en 双节点），可选写入本站 langKey。
 *   - storage 事件：其他标签页切换偏好时实时联动（语言即时切换；明暗写 key
 *     后 reload 一次以走本站完整主题管线）。
 * 需要页面自带的 CSS（接听语言的页面）：
 *   html[data-lang="en"] [data-zh]{display:none!important}
 *   html[data-lang="zh"] [data-en]{display:none!important}
 * ========================================================================== */
(function () {
  var cfg = window.A4R || {};
  var MODE_KEY = 'a4r-mode', LANG_KEY = 'a4r-lang';

  function readMode() { try { return localStorage.getItem(MODE_KEY); } catch (e) { return null; } }
  function readLang() { try { var l = localStorage.getItem(LANG_KEY); return l === 'en' ? 'en' : 'zh'; } catch (e) { return 'zh'; } }

  function applyMode() {
    if (!cfg.mode || !cfg.themeKey) return;
    var m = readMode();
    if (m !== 'light' && m !== 'dark') return;  // 从未在主站切换过 → 不干预本站默认
    try {
      localStorage.setItem(cfg.themeKey, m === 'dark' ? cfg.darkId : cfg.lightId);
      localStorage.setItem(cfg.themeKey + '-set', '1');
    } catch (e) {}
  }

  function applyLang() {
    if (!cfg.lang) return;
    var l = readLang();
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'zh-CN');
    if (cfg.langKey) { try { localStorage.setItem(cfg.langKey, l); } catch (e) {} }
  }

  applyMode();
  applyLang();

  window.addEventListener('storage', function (ev) {
    if (ev.key === LANG_KEY) { applyLang(); if (cfg.reloadOnLang) location.reload(); }
    else if (ev.key === MODE_KEY && cfg.mode && cfg.themeKey) { applyMode(); location.reload(); }
  });
})();
