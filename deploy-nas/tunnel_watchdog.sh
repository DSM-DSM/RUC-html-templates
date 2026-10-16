#!/bin/sh
# example.com 隧道守夜人 v2（部署名：/volume1/docker/ruc-logs/tunnel_watchdog.sh）
# 宿主 cron 每分钟：/etc/cron.d/tunnel-watchdog → */1 * * * * root /volume1/docker/ruc-logs/tunnel_watchdog.sh
#
# ── 为什么重写（2026-10-15 晚高峰事故复盘）──────────────────────────────
# 旧版（tunnel_watchdog.sh，备份 .bak-20261015）三个短板：
#  1) 只记失败不记成功 → 无法区分"一直正常"和"cron 根本没跑"（故障当晚就误判过）。
#  2) 连续 2 次 × 5 分钟 = 最长 10 分钟才动作 → 访客看 10 分钟 502/1033。
#  3) 恢复动作是 docker restart：对"路径级阻断"无效（18:25/18:35/18:50 三连实测无效），
#     真正对症的是换边缘地址族 v4 ↔ v6（HANDBOOK 坑 #14）。
#
# ── 本版判据（全部为 NAS 上实测可行的信号）────────────────────────────
#  A. cloudflared 自带 /ready（127.0.0.1:20241，实测 200=有活跃连接）
#     —— 直接反映"隧道有没有连上 CF 边缘"，比外部探测更权威、更快、更省流量。
#  B. 公网 https://example.com/ 200 —— 端到端真话（覆盖 DNS/边缘/隧道/nginx）。
#     A 与 B 至少一个正常即视为健康；两个都坏才进入恢复流程（避免单一信号误判）。
#  C. 边缘 TCP 7844 连通性：dig 现查 A/AAAA（实测 region1/region2 各 10 条），
#     每族抽样 3 个握手，定出"哪一族的路是通的"。注意：不能用 curl 探 1.1.1.1/边缘 443
#     ——实测本出口 000（被干扰），会得出"两族都不可达"的错误结论。
#
# ── 恢复策略 ────────────────────────────────────────────────────────
#  切到"唯一可达"的那一族；两族都可达而当前族已坏 → 切对侧；两族都不可达 → 只记录（出口整体异常）。
#  切换后重启 cloudflared 让其按新族重建连接。10 分钟冷却窗防抖动来回切。

LOG=/volume1/docker/ruc-logs/watchdog.log
STATE=/volume1/docker/ruc-logs/.tunnel-state   # "<当前族> <上次故障epoch> <上次切换epoch>"
V6STATE=/volume1/docker/ruc-logs/.v6-prefix    # 上次见到的 v6 全局地址（前缀漂移告警）
V6RASTATE=/volume1/docker/ruc-logs/.v6-ra-warned  # "RA 推不到前缀"只告警一次的标记
CONFIG=/volume1/docker/cloudflared/config.yml
METRICS=http://127.0.0.1:20241/ready
URL=https://example.com/
STAMP=$(date '+%F %T')

CUR_FAM=unknown; LAST_FAIL=0; LAST_SWITCH=0
[ -f "$STATE" ] && read -r CUR_FAM LAST_FAIL LAST_SWITCH < "$STATE" 2>/dev/null
[ -n "$CUR_FAM" ] || CUR_FAM=unknown
[ -n "$LAST_FAIL" ] || LAST_FAIL=0
[ -n "$LAST_SWITCH" ] || LAST_SWITCH=0

# 状态文件丢了也能自愈：从现役配置反推当前族
if [ "$CUR_FAM" = "unknown" ] && [ -f "$CONFIG" ]; then
  CUR_FAM=$(sed -n 's/^edge-ip-version:[[:space:]]*"\{0,1\}\([46]\)"\{0,1\}$/\1/p' "$CONFIG" | head -1)
  [ -n "$CUR_FAM" ] || CUR_FAM=unknown
fi

# ---- v6 前缀漂移检测（不阻塞主流程） ----
# 目标：盯住"隧道真正依赖的那条 v6 稳定全局地址"，变了就告警（v6 前缀靠路由器 RA 下发，
# 前缀一变隧道就断，且只能人工处置）。
#
# 为什么不用硬编码前缀：本机运营商前缀各不相同，写死进脚本后换网络就静默失效
# （awk 匹配不到 → NOWV6 为空 → 告警永远不触发）。仓库入库版也不能写真实前缀。
# 因此按三级取值，**优先级从高到低**：
#   ① 本目录 tunnel_watchdog.local 里的 V6_PREFIX（本机专属值，gitignore，不随仓库分发）
#   ② 环境变量 V6_PREFIX（注意：若 .local 存在，它的赋值会覆盖环境变量——POSIX source 语义）
#   ③ 从 RA 通告的默认路由自动推导（见下，默认路径，无需任何配置）
# 中国大陆三家运营商前缀不同，需要手填时取 `ip -6 addr show scope global` 里那条 /128 dynamic 的开头。
[ -f "$(dirname "$0")/tunnel_watchdog.local" ] && . "$(dirname "$0")/tunnel_watchdog.local"
# 去掉可能混入的 CR/BOM：.local 常在 Windows 上编辑后经 `cat >` 逐字节透传，
# 若带 \r 则 V6_PREFIX 尾附回车 → 下面 awk 模式永不匹配 → 又是同一种静默失效。
[ -n "$V6_PREFIX" ] && V6_PREFIX=$(printf '%s' "$V6_PREFIX" | tr -d '\r\n')
# ③ 自动推导：取 RA 通告默认路由的 /64 前缀（把 "xxxx:xxxx:xxxx:xxxx::/64" 归一成 "xxxx:xxxx:xxxx:xxxx:"）。
# 该地址由路由器 RA 下发，正是隧道与 DDNS 依赖的那条；隐私扩展地址（stable-privacy）不在此前缀下时
# 天然被排除，无需再按接口/标志位过滤。
if [ -z "$V6_PREFIX" ]; then
  V6_PREFIX=$(ip -6 route show default 2>/dev/null | awk '
    /via/ && !/unreachable/ {
      for (i = 1; i <= NF; i++) {
        if ($i ~ /^[0-9a-fA-F:]+:\/64$/) { sub(/:\/64$/, ":", $i); print $i; exit }
      }
    }')
fi
# 说明：不少路由器/内核的默认路由只写 `via fe80::… dev ethX`，不带 ::/64 字面量，
# 此时推导为空 → 退回"空前缀=匹配任意前缀"，仍能取到 /128 稳定地址（实测本机即此情形）。
if [ -z "$V6_PREFIX" ]; then
  # 只在首次（或前缀来源变化后）告警一次，避免每分钟刷屏把真信号淹掉
  if [ ! -f "$V6RASTATE" ]; then
    echo "$STAMP WARN v6 前缀未能从 RA 路由推导（默认路由不含 ::/64）：退回全前缀匹配（本条只报一次）" >> "$LOG"
    : > "$V6RASTATE"
  fi
fi
# 只认 /128 scope global dynamic 那条（DHCPv6 下发的稳定全局地址），它才是隧道/DDNS 真正依赖的地址。
# 刻意排除 mngtmpaddr stable-privacy 那些 /64 —— 那是内核隐私扩展地址，会每隔几小时自动轮换，
# 盯它只会刷无意义的 WARN（实测踩过）。
# 注：掩码用 /\/128([[:space:]]|$)/ 而非 /\/128/ —— 后者是子串匹配，/1280 之类会误命中。
# ★别写成 (\/|$) 这种交替★：NAS 上是 busybox awk，不支持 (...) 交替语法，会让整条 awk 静默返回空
# （2026-10-16 实测：busybox awk 下 A 写法可用、B/C 写法返回空；[[:space:]] 是 POSIX 字符类，两者都支持）。
NOWV6=$(ip -6 addr show scope global 2>/dev/null | awk -v p="$V6_PREFIX" '$0 ~ ("inet6 " p) && /\/128([[:space:]]|$)/ && /dynamic/ {print $2; exit}')
# 取不到就明确告警一次，别让本节悄悄空转（这就是本机制此前踩过的坑）
if [ -z "$NOWV6" ]; then
  echo "$STAMP WARN v6 前缀检测未取到稳定地址（V6_PREFIX='${V6_PREFIX:-空}'）：本节空转，请核对前缀配置" >> "$LOG"
fi
OLDV6=$(cat "$V6STATE" 2>/dev/null)
if [ -n "$NOWV6" ] && [ "$NOWV6" != "$OLDV6" ]; then
  [ -n "$OLDV6" ] && echo "$STAMP WARN v6 稳定全局地址变化: $OLDV6 -> $NOWV6（前缀漂移，隧道可能断）" >> "$LOG"
  echo "$NOWV6" > "$V6STATE"
fi

# ---- 健康判据 A：cloudflared 自报 ----
ready=$(curl -s -m 5 -o /dev/null -w '%{http_code}' "$METRICS" 2>/dev/null)
# ---- 健康判据 B：端到端公网 ----
code=$(curl -m 10 -s -o /dev/null -w '%{http_code}' "$URL" 2>/dev/null)
case "$code" in 200|301|302|304) pub_ok=1 ;; *) pub_ok=0 ;; esac
[ "$ready" = "200" ] && ready_ok=1 || ready_ok=0

if [ "$pub_ok" = "1" ] || [ "$ready_ok" = "1" ]; then
  echo "$STAMP OK ready=$ready public=$code family=$CUR_FAM" >> "$LOG"
  echo "$CUR_FAM 0 $LAST_SWITCH" > "$STATE"
  exit 0
fi

echo "$STAMP FAIL ready=$ready public=$code family=$CUR_FAM" >> "$LOG"
[ "$LAST_FAIL" = "0" ] && LAST_FAIL=$(date +%s)

# ---- 健康判据 C：哪一族到边缘的路是通的（dig 现查 + TCP 7844 抽样握手） ----
probe_family() { # $1=[46] → 任一可达则输出 1
  fam=$1
  if [ "$fam" = "4" ]; then qtype=A; else qtype=AAAA; fi
  ips=""
  for d in region1.v2.argotunnel.com region2.v2.argotunnel.com; do
    ips="$ips $(dig +short +time=3 +tries=1 "$qtype" "$d" 2>/dev/null | grep -E '^[0-9a-fA-F:.]+$')"
  done
  if [ -z "$(echo "$ips" | tr -d ' ')" ]; then
    if [ "$fam" = "4" ]; then ips="198.41.192.27 198.41.200.63 198.41.200.193"
    else ips="2606:4700:a0::5 2606:4700:a8::4"; fi
  fi
  n=0
  for ip in $ips; do
    case "$ip" in
      *:*) [ "$fam" = "6" ] || continue ;;
      *)   [ "$fam" = "4" ] || continue ;;
    esac
    n=$((n + 1))
    [ "$n" -gt 3 ] && break
    if timeout 4 sh -c "echo > /dev/tcp/$ip/7844" 2>/dev/null; then echo 1; return 0; fi
  done
  echo 0
}
v4ok=$(probe_family 4)
v6ok=$(probe_family 6)

NOW=$(date +%s)
SINCE_SWITCH=$((NOW - LAST_SWITCH))
echo "$STAMP   族可达性 v4=$v4ok v6=$v6ok（当前=$CUR_FAM 距上次切换=${SINCE_SWITCH}s）" >> "$LOG"

if [ "$SINCE_SWITCH" -lt 600 ]; then
  echo "$STAMP   冷却中（<600s）：本轮只记录，不切换" >> "$LOG"
  echo "$CUR_FAM $LAST_FAIL $LAST_SWITCH" > "$STATE"
  exit 0
fi

TARGET=""
if [ "$v4ok" = "1" ] && [ "$v6ok" = "0" ]; then TARGET=4; fi
if [ "$v6ok" = "1" ] && [ "$v4ok" = "0" ]; then TARGET=6; fi
if [ "$v4ok" = "1" ] && [ "$v6ok" = "1" ]; then
  case "$CUR_FAM" in 4) TARGET=6 ;; *) TARGET=4 ;; esac
fi

if [ -z "$TARGET" ]; then
  echo "$STAMP   两族到边缘都不可达：出口整体异常，仅记录不动配置" >> "$LOG"
  echo "$CUR_FAM $LAST_FAIL $LAST_SWITCH" > "$STATE"
  exit 0
fi

if [ "$TARGET" = "$CUR_FAM" ]; then
  echo "$STAMP   目标族与当前族相同($TARGET)：仅重启 cloudflared 重建连接" >> "$LOG"
else
  echo "$STAMP   切换边缘地址族 $CUR_FAM -> $TARGET" >> "$LOG"
  sed -i "s/^edge-ip-version:.*/edge-ip-version: \"$TARGET\"/" "$CONFIG" 2>>"$LOG"
fi

docker restart cloudflared >> "$LOG" 2>&1
sleep 15
ready2=$(curl -s -m 5 -o /dev/null -w '%{http_code}' "$METRICS" 2>/dev/null)
code2=$(curl -m 10 -s -o /dev/null -w '%{http_code}' "$URL" 2>/dev/null)
echo "$STAMP   恢复后 ready=$ready2 public=$code2（族=$TARGET）" >> "$LOG"
echo "$TARGET 0 $NOW" > "$STATE"
