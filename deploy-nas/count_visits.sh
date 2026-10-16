#!/bin/sh
# example.com 访问量统计（宿主 cron 每 5 分钟跑一次，/etc/cron.d/visit-counter）
# 合并历史日志 legacy.log + 增量 access.log，统计各入口页的浏览器 GET 次数（status<400），
# 过滤工具类/爬虫 UA（curl、wget、okhttp、python、bot 等——含我们自己的 curl 验证流量）。
# 输出 visit_counts.json 到站点根（宿主写入，容器 :ro 挂载可读到），主站前端 fetch 显示。
LOGDIR=/volume1/docker/ruc-logs
OUT=/volume1/docker/RUC-html-templates/visit_counts.json
TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)
awk -v ts="$TS" '
function key(p) {
  if (p=="/" || p=="/index.html") return "total";
  if (p=="/lecture/slide_deck_template.html" || p=="/lecture/index.html") return "lecture";
  if (p=="/lab-meeting/index.html") return "lab-meeting";
  if (p=="/commerical-lecture/index.html") return "commerical-lecture";
  if (p=="/paper-explainer/nav/reading_path_template.html" || p=="/paper-explainer/index.html") return "paper-explainer";
  if (p=="/personal-homepage/index.html") return "personal-homepage";
  if (p=="/showcase/paper-reading/nav/reading_path.html") return "reading-path";
  if (p=="/showcase/paper-reading/knowledge_graph.html") return "knowledge-graph";
  if (p=="/showcase/weekly-report/index.html") return "weekly-report";
  if (p=="/showcase/skills-briefing/index.html") return "skills-briefing";
  return "";
}
BEGIN { c["total"]=0; c["lecture"]=0; c["lab-meeting"]=0; c["commerical-lecture"]=0; c["paper-explainer"]=0; c["personal-homepage"]=0; c["reading-path"]=0; c["knowledge-graph"]=0; c["weekly-report"]=0; c["skills-briefing"]=0; ck["gitee"]=0; ck["github"]=0; ck["paper-explainer-gitee"]=0; ck["paper-explainer-github"]=0; ck["html-beautify-gitee"]=0; ck["html-beautify-github"]=0; ck["prompt-enhancer-gitee"]=0; ck["prompt-enhancer-github"]=0; ck["baton-gitee"]=0; ck["baton-github"]=0; ck["anysearch-gitee"]=0; ck["anysearch-github"]=0; ck["agent-reach-gitee"]=0; ck["agent-reach-github"]=0 }
{
  if (index($0, "\"GET ") == 0) next;   # 只统计 GET（跳过 docker 启动横幅/HEAD/POST 扫描）
  split($0, f, "\"");
  split(f[2], r, " ");                   # r[1]=GET r[2]=path r[3]=HTTP/1.1
  # 点击 beacon：/vk/<key>（前端 fetch 触发的 404 请求即一次真实点击，不计 status）
  if (match(r[2], /^\/vk\/[a-z-]+$/)) {
    vk = substr(r[2], 5);
    # 旧版单按钮(无 -gitee/-github 后缀)历史点击全部指向 GitHub 链接，并入 -github 侧
    if (vk=="paper-explainer" || vk=="html-beautify" || vk=="prompt-enhancer" || vk=="baton" || vk=="anysearch" || vk=="agent-reach") vk = vk "-github";
    ua = tolower(f[6]);
    if (ua !~ /curl|wget|okhttp|python|go-http|headlesschrome|bot|crawler|spider|zgrab|masscan|scanner/) ck[vk]++;
    next;
  }
  k = key(r[2]); if (k == "") next;
  split(f[3], s, " "); status = s[1] + 0;   # FS=" " 特殊规则剥前导空格，s[1] 才是 status
  if (status == 0 || status >= 400) next;
  ua = tolower(f[6]);
  if (ua ~ /curl|wget|okhttp|python|go-http|headlesschrome|bot|crawler|spider|zgrab|masscan|scanner/) next;
  c[k]++;
}
END {
  printf("{\"updated\":\"%s\"", ts);
  printf(",\"total\":%d", c["total"]);
  printf(",\"pages\":{");
  printf("\"lecture\":%d,\"lab-meeting\":%d,\"commerical-lecture\":%d,\"paper-explainer\":%d,\"personal-homepage\":%d",
    c["lecture"], c["lab-meeting"], c["commerical-lecture"], c["paper-explainer"], c["personal-homepage"]);
  printf(",\"reading-path\":%d,\"knowledge-graph\":%d,\"weekly-report\":%d,\"skills-briefing\":%d",
    c["reading-path"], c["knowledge-graph"], c["weekly-report"], c["skills-briefing"]);
  printf("},\"clicks\":{");
  printf("\"paper-explainer-gitee\":%d,\"paper-explainer-github\":%d,\"html-beautify-gitee\":%d,\"html-beautify-github\":%d",
    ck["paper-explainer-gitee"], ck["paper-explainer-github"], ck["html-beautify-gitee"], ck["html-beautify-github"]);
  printf(",\"prompt-enhancer-gitee\":%d,\"prompt-enhancer-github\":%d,\"baton-gitee\":%d,\"baton-github\":%d",
    ck["prompt-enhancer-gitee"], ck["prompt-enhancer-github"], ck["baton-gitee"], ck["baton-github"]);
  printf(",\"anysearch-gitee\":%d,\"anysearch-github\":%d,\"agent-reach-gitee\":%d,\"agent-reach-github\":%d",
    ck["anysearch-gitee"], ck["anysearch-github"], ck["agent-reach-gitee"], ck["agent-reach-github"]);
  printf(",\"gitee\":%d,\"github\":%d", ck["gitee"], ck["github"]);
  printf("}}\n");
}' "$LOGDIR/legacy.log" "$LOGDIR/access.log" > "$OUT"
