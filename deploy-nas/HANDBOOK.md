# NAS 网页发布工作手册 — example.com

> **TL;DR**：静态网站托管在绿联 NAS（UGOS，192.168.1.100）的 Docker nginx 容器里，
> 公网主通道 = **Cloudflare Tunnel**（`https://example.com`，任何网络可达、自带 HTTPS，2026-10-07 上线）；
> 辅通道 = IPv6 直连 `http://[2001:db8:1234:5678::3ec]:18080`（校园网认证在线时国内速度更快）。
> 校园网认证由 `campus-auth` 容器自动维持（深澜自动登录，凭据在 /volume1/docker/campus-auth/credentials.json）。
> 本文档 = 架构 + 上手 + 日常操作 + 故障排查 + 已知坑。
> 接手 agent 从「上手 30 秒」开始读；**不要跳过「已知坑」——每一条都是实测踩出来的死路。**

---

## 1. 服务总览（2026-10-05 实测验证）

| 项目 | 值 | 验证方式 |
|---|---|---|
| **公网主通道** | **`https://example.com`**（Cloudflare Tunnel，2026-10-07 上线） | curl HTTP 200（经 CF 边缘 104.21.28.163） |
| 公网辅通道 | `http://[2001:db8:1234:5678::3ec]:18080`（IPv6 直连；前缀变了会失效） | curl -6 |
| 局域网地址 | `http://192.168.1.100:18080` | curl HTTP 200 |
| 容器 1 | `ruc-templates`（镜像 `ruc-nginx`）— 网站服务，18080 | `docker ps` Up |
| 容器 2 | `cloudflared`（`--user 0 --net host`）— CF 隧道，出站连接，无需入站端口 | `docker ps` Up，日志见 Registered；健康自查 `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:20241/ready` = 200 |
| 容器 3 | `campus-auth` — 深澜校园网自动认证，60s 巡检 | `docker ps` Up；日志 /volume1/docker/campus-auth/auth.log |
| 容器 4 | `ddns-go` — **已无实际作用**（域名权威已迁至 Cloudflare，DNSPod 记录不再生效），待退役 | — |
| 域名 | `example.com` 注册于腾讯云，**DNS 托管已迁 Cloudflare**（ns1.example-ns.com / ns2.example-ns.com），apex 为 CNAME→隧道（CF 代理，橙云） | nslookup 返回 CF 边缘 IP |
| 自动续费 | 已开启（用户确认） | — |

**Cloudflare 资产**：账号=用户邮箱注册；隧道名 `ruc-nas`，ID `00000000-0000-0000-0000-000000000000`；
隧道凭据 `/volume1/docker/cloudflared/tunnel-cred.json`、origin 证书同目录 `cert.pem`（root 保管）。

## 2. 架构

```
example.com ──AAAA──▶ 2001:db8:1234:5678::3ec (NAS, DHCPv6 稳定地址)
                            ▲
        ddns-go 每 300s 对比网卡/接口 IP，变了自动调 DNSPod API 改记录
                            │
  访客(需有IPv6) ──18080──▶ 小米路由器 ──▶ NAS: nginx 容器(ruc-templates)
                                                挂载 /volume1/docker/RUC-html-templates (只读)
```

**端口为什么是 18080**：国内封 80/443/8080 入站，选高位端口避开。
**为什么只有 IPv6**：上行是**人大校园网**（不是家宽；双出口探测见过 211.71.x = RUC/CERNET 段 + 36.112.x 电信段的多线出口），无公网 IPv4，端口转发这条路不存在；IPv6 直连免费且快。访客网络必须有 IPv6（国内手机流量基本都有）。
**★在线铁律（2026-10-07 已解锁）★**：出口 = 校园网认证，由 NAS 上的 `campus-auth` 容器自动维持
（深澜自动登录，60s 巡检；**下线→自愈实测 22s/12s 两次通过**）。网站在线只需：**NAS 开机 + 路由器在线**。
PC 可以永久关机。若认证意外掉线，恢复链 = campus-auth 重登(≤60s) → cloudflared QUIC/IPv6 自动重连(≤15s)，
全程无人干预。仅当手动重启了路由器且长时间(>5min)不通时才需人工看一眼 campus-auth 日志。
（边缘协议史：2026-10-07~10-14 = http2+v4 → 10-15 白天 quic+v4 → 10-15 晚 v4 段被断，改 quic+v6，见坑 #14。）

## 3. 上手 30 秒

```bash
# SSH（本机公钥已注入 NAS 的 ~/.ssh/authorized_keys，免密）
ssh nasuser@192.168.1.100

# sudo 必须 -tt（UGOS 强制 TTY），密码 = UGOS 管理密码（向用户索取，勿写入任何文件）
ssh -tt nasuser@192.168.1.100 "sudo -S -p '' true <<< '<密码>' 2>/dev/null; sudo -n docker ps"
# ↑ 第一个 sudo -S 验证并缓存凭据，同一会话内后续用 sudo -n 即可

# 传文件：scp/SFTP 在 UGOS 上是坏的（见坑 #3），用 cat 管道；二进制/大文件用 `scp -O`（见坑 #20）
ssh nasuser@192.168.1.100 'cat > /目标路径/文件名' < 本地文件
# 传目录：
tar -C 本地父目录 -cf - 目录名 | ssh nasuser@192.168.1.100 "tar -xf - -C /volume1/docker/RUC-html-templates"
```

## 4. 文件地图

| 位置 | 路径 | 说明 |
|---|---|---|
| NAS 网页根目录 | `/volume1/docker/RUC-html-templates/` | **活挂载进容器，改文件即时生效，无需重启**。内含 6 套模板目录 + `index.html`（落地页，17KB，用户自行维护过） |
| NAS 部署套件 | `/volume1/docker/deploy-nas/` | `nginx.conf` `Dockerfile` `docker-compose.yml`（均为生效中的正本） |
| NAS 访问日志 | `/volume1/docker/ruc-logs/` | `access.log`（容器 rw 挂载落盘）+ `legacy.log`（2026-10-11 前历史）+ `count_visits.sh`；统计见 §5.5 |
| NAS ddns-go 配置 | `/volume1/docker/ddns-go/.ddns_go_config.yaml` | 含 DNSPod 密钥，**读时必须打码，勿外发** |
| 本地源 | `D:\RUC-html-templates\html-templates\` | 模板源头（与 NAS 网页根目录对应） |
| 本地部署套件 | `D:\RUC-html-templates\deploy-nas\` | 与 NAS deploy-nas 同步（2026-10-05 已对齐） |

> **★本目录的入库与脱敏约定（2026-10-16 定）★**
> 本仓库 `master` 是**公开**的，因此入库版已脱敏：内网 IP、SSH 登录名、真实域名、隧道 UUID、
> IPv6 前缀、权威 NS 名全部替换为样例值（`192.168.1.100` / `nasuser` / `example.com` /
> 全零 UUID / `2001:db8:1234:5678` / `ns1.example-ns.com`）。
> - **含真值的版本只存在本地 `deploy-nas` 分支**（查看：`git show deploy-nas:deploy-nas/HANDBOOK.md`），永不推远端。
> - 因此**从公开仓库取文件推回 NAS 会覆盖掉真值**——改动先同步回 `deploy-nas` 分支，或直接从 NAS 取回真值。
> - `campus-auth/credentials.json`、`*.log`、`*.local` 永久忽略（凭据 + 本机专属值）。
> - 脚本里凡"因机而异"的值（如守夜人的 `V6_PREFIX`）一律走同目录 `tunnel_watchdog.local` 覆盖，
>   不写进入库文件——否则换网络后该功能会**静默失效**（守夜人的 v6 前缀告警就踩过这个设计缺陷）。

## 5. 日常操作

### 5.1 加/更新网页（最高频）
把文件放进 NAS 的 `/volume1/docker/RUC-html-templates/` 对应目录即可，**即时生效**。
本地改完推上去：`tar`/`cat` 管道见上手段，或用绿联客户端拖拽。

### 5.2 改 nginx 配置
```bash
# 1. 改 /volume1/docker/deploy-nas/nginx.conf（挂载是 :ro，文件级挂载）
# 2. 重启容器生效：
ssh -tt nasuser@192.168.1.100 "sudo -S -p '' true <<< '<密码>' 2>/dev/null; sudo -n docker restart ruc-templates"
```

### 5.3 完整重建容器（固件升级后 / 配置改坏时）
```bash
sudo -n docker rm -f ruc-templates
sudo -n docker run -d --name ruc-templates --restart unless-stopped -p 18080:80 \
  -v /volume1/docker/deploy-nas/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v /volume1/docker/RUC-html-templates:/usr/share/nginx/html:ro \
  -v /volume1/docker/ruc-logs:/var/log/nginx:rw \
  ruc-nginx
```
★ 第三个挂载（ruc-logs → /var/log/nginx，**rw**）承载访问量统计的 access.log——**漏挂它 = 重建后访问日志消失进容器层、统计断流**（历史已抢救为 legacy.log，重建前无需再动）。
镜像没了吗：`sudo -n docker build -t ruc-nginx /volume1/docker/deploy-nas/`（Dockerfile 就 2 行）。
基础镜像没了吗：`sudo -n docker pull docker.1ms.run/library/nginx:alpine && sudo -n docker tag docker.1ms.run/library/nginx:alpine nginx:alpine`。

### 5.5 访问量统计（2026-10-11 建）
主站右上角 + 各模板卡右下角的访问量来自这条全自动管线：
- **日志**：容器 `/var/log/nginx/access.log` 落盘宿主 `/volume1/docker/ruc-logs/`（见 5.3 第三挂载）；2026-10-11 重建前的历史已抢救在同目录 `legacy.log`。
- **统计脚本**：`/volume1/docker/ruc-logs/count_visits.sh`（本地正本 `D:\RUC-html-templates\deploy-nas\count_visits.sh`）——合并两份日志，统计各**入口页** GET（status<400），过滤工具/爬虫 UA（curl、okhttp、bot 等，含我们自己的 curl 验证流量）；awk 坑：`split(f[3], s, " ")` 的 FS=" " 特殊规则剥前导空格，**s[1] 才是 status**（取 s[2] 得到 body 字节数 → 全被 ≥400 过滤，全 0，踩过）。
- **定时**：`/etc/cron.d/visit-counter`（root 每 5 分钟）；**固件升级会清 /etc/cron.d，重刷后按 5.3 重建完记得补这条**：`*/5 * * * * root /volume1/docker/ruc-logs/count_visits.sh >/dev/null 2>&1`
- **输出**：`/volume1/docker/RUC-html-templates/visit_counts.json`（**宿主生成、勿手工编辑、不进 git**），前端 `index.html` fetch 同名文件显示，失败（file:// 双击/本地无数据）自动隐藏徽章。
- **点击计数（clicks）**：主站 6 张技能卡的「一键安装」链接无站内落地页，计数走**零后端 beacon**——点击时前端 `fetch('vk/<key>', {mode:'no-cors', keepalive:true})` 产生一条 404 请求落 access.log，统计脚本把 `GET /vk/<key>`（任意 status、同款 UA 过滤）计入 `clicks` 对象，与 `pages` 同管线渲染。headless 浏览器 UA 会被防爬过滤正确排除（自动化测试须覆盖 UA 才能计入）。


### 5.4 ddns-go
- 面板：`http://192.168.1.100:9876`（首次已设管理员账号）
- 日志：`sudo -n docker logs --tail 20 ddns-go`
- 正常巡检日志长这样：`Your IP 2001:db8:1234:5678::3ec has not changed! Domain: example.com`
- DNSPod 密钥更换：面板顶部「DNS 服务商」处替换 → 保存（**密钥不进对话、不进文件**）

## 6. 故障排查决策树

```
网站打不开
├─ 先问一句:PC(校园网认证机)开着吗?PC 离线/认证掉 = 整站公网离线,属预期,先恢复认证
├─ 手机侧"IP 直连通、域名不通" → 服务器侧无故障(权威/公共 DNS 全对时):是访客
│   运营商递归 DNS 的 AAAA 毛病。鉴别:手机设 私人DNS=dot.pub 后重试,通则实锤;
│   给访客的建议同(或直接发 [IPv6字面量]:18080 的链接)
├─ 局域网(192.168.1.100:18080)也不通
│   ├─ docker ps 看容器 Up？ → 没起来: docker logs ruc-templates，按日志修，或按 5.3 重建
│   └─ 容器 Up 但 403/404 → 见坑 #1（LSM），确认 nginx.conf 里 user root; 还在
├─ 局域网通、公网(域名)不通
│   ├─ 手机流量测试 [2001:db8:1234:5678::3ec]:18080 通不通
│   │   ├─ IP 直连通、域名不通 → DNS 问题：nslookup -type=AAAA example.com
│   │   │      对比 NAS 实际地址(ip -6 addr show dev eth1 | grep 2001:db8)
│   │   │      └─ 不一致 = ddns-go 没跟上 → docker logs ddns-go（多半密钥失效/过期）
│   │   └─ IP 直连也不通 → 路由器 IPv6 防火墙或前缀刚变（等 ddns-go 一轮 + TTL 600s）
│   └─ 对方打不开、你手机流量能开 → 对方网络无 IPv6（让他换手机流量），不是你的故障
└─ 全都不通且 NAS 刚重启/断电 → **别假设自愈，走 §7 坑 #10**：
    docker ps 看容器是否 Up → Up 但端口不通 = 端口映射损坏，按 5.3 rm+重建；
    docker 服务本身没起 → UGOS 界面检查 Docker 应用状态
```

良性日志别误报：ddns-go 的 `The 1st config does not fill in the domain` 是指
**IPv4 段**（已禁用）没填域名，本来就不填，忽略。

## 7. 已知坑（死路清单 —— 每条都实测烧过时间，别重踩）

1. **★UGOS 内核钩子：容器内非 root 进程禁止读 /volume1 的一切（含 docker 卷）★**
   文件 777 + ACL `other::rwx` 照样 EACCES，与权限体系完全无关，root 豁免。
   已验证的死路：setfacl 全量放权 ✗、named volume 迁移 ✗（卷也在 /volume1/@docker 下）。
   **结论：nginx worker 必须 `user root;`**（nginx.conf 里已设，别"优化"掉）。
   鉴别实验模板：`docker run --rm --user 1000 -v /tmp/f:/f:ro -v 卷:/w:ro img sh -c 'cat /f; cat /w/x'`
   ——/tmp 通、卷不通即此钩子。
2. **sudo 强制 TTY**：非交互 `sudo -S` 报 `a terminal is required`。用第 3 节的 `-tt` 模板。
   herestring 传密码不会被回显（走 fd 不进 tty 输入缓冲）。
3. **scp/SFTP 坏的**：目标目录明明存在仍报 `No such file or directory`。用 cat 管道/tar。
4. **Docker Hub 直连超时**：`registry-1.docker.io` 连不上。镜像站用 `docker.1ms.run`
   （2026-10-05 实测一次成功），拉完 `docker tag` 回标准名。
5. **nginx `user` 指令不认数字 uid**：`user 1000;` → `getpwnam("1000") failed` 起不来。
   要么 Dockerfile 里注册用户名，要么 `user root;`（现方案）。
6. **ddns-go 面板默认监听 `:9876` = 全网卡**：IPv6 公网可达，面板里存着 DNSPod 密钥。
   启动命令必须带 `-l 192.168.1.100:9876` 绑死局域网。现容器已如此，**重建时别丢这个参数**。
7. **ddns-go 的 `speed.neu6.edu.cn` 取 IP 源在电信网必超时**（已从配置删除，有备份
   `.ddns_go_config.yaml.bak-20261005`）。别加回。现用 `v6.ident.me / 6.ipw.cn / v6.yinghualuo.cn`。
8. **家宽 80/443/8080 入站被封 + CGNAT**：任何"换 443/加端口转发"的想法都直接放弃。
9. **API 密钥泄露史**：2026-10-05 首对腾讯云**主账号**密钥曾泄露进对话，已轮换（用户确认）。
   铁律：密钥只在 ddns-go 网页面板里填；展示 NAS 上的 yaml 必须打码，且**打码正则要先验证命中**
   （该文件字段名是 `id:`/`secret:`，不是直觉的 secretid/secretkey）。
10. **★断电后 `docker start` 拉起的容器，端口映射可能是坏的★**（2026-10-06 实战）：
    NAS 断电重启后 `ruc-templates` Exited(128)，`docker start` 后容器 Up、nginx 容器内正常监听，
    但宿主 18080 无人监听、`docker port` 为空，inspect 显示 `PortBindings: {invalid IP 18080}` ——
    **映射数据库被断电写坏，`docker start` 修不好，必须 `rm -f` + 按手册 5.3 重新 `docker run`**。
    顺带两条断电观察：① ddns-go（`--net host`，无端口映射）重启自愈无恙；
    ② DHCPv6 前缀这次扛住了断电（`::3ec` 原样回归，DNS 无需更新）——但不能指望每次都这样，DDNS 仍是必需。
    两个容器重启策略已于 2026-10-06 从 `unless-stopped` 升级为 `always`。
11. **★cloudflared 容器必须 `--user 0`（坑 #1 的又一化身）★**：cloudflared 镜像默认以 nonroot 跑，
    读不了 `/volume1` 下的挂载（cert/凭据/config 全在那）——报 `Cannot determine default origin certificate path`。
    所有 cloudflared 命令（create/route/run）一律加 `--user 0`。
    另外 **`tunnel login` 把 cert.pem 写进容器内 `/home/nonroot/.cloudflared/`**（不在挂载里）——
    用 `docker cp cf-login:/home/nonroot/.cloudflared/cert.pem <挂载目录>/` 捞出来再删登录容器。
12. **cloudflared 其他坑（2026-10-07 实测）**：
    - `route dns --overwrite-dns` 在该版本里导致参数解析错乱（报 expects the format）——去掉它用裸命令；
      若报 `record already exists` = apex 上有旧 AAAA，去 CF 面板删掉再 route。
    - 启动 precheck 可能 `hard_fail=true`（region2 的 QUIC+HTTP2 都被阻断）——**不致命**，
      只要日志里出现 `Registered tunnel connection ... location=lax protocol=quic` 即可用（region1 通就行）。
    - 授权链接可反复点、每次都显示成功；登录容器必须保持存活直到 cert 落地。
    - `ssh -tt` 和 heredoc 组合会把脚本回显而非执行——脚本先 `cat > /tmp/x.sh` 上传，再 `ssh -tt "sudo bash /tmp/x.sh"`。
    - DNS 切换后有 ~10 分钟缓存窗口：旧 AAAA 还在解析器/路由器缓存里，HTTPS 会秒连秒拒。
      问 CF 权威拿真答案：`nslookup example.com ns1.example-ns.com`；
      立即验证可 `curl --resolve example.com:443:104.21.28.163 https://example.com/`。
13. **★校园网重认证后 QUIC 隧道不自愈 → 必须用 http2 + IPv4 边缘★**（2026-10-07 下线实测）：
    campus-auth 重登会换 NAT 绑定，cloudflared 默认的 QUIC(UDP) 抱着旧 UDP 流重试到死
    （`failed to dial to edge with quic: timeout` 刷屏，530 持续，重启容器才活）。
    **解法 = config.yml 头两行 `protocol: http2` + `edge-ip-version: "4"`**（TCP 重拨秒级自愈，
    实测断网→网络恢复→隧道 200 只需 15 秒内，全程无人干预）。
    附坑：`edge-ip-version: 4`（不带引号）会被 YAML 解析成 int 报 `expected string found int`
    刷屏——必须写成 `"4"`。校园网 IPv6 到 CF 边缘 7844 端口不通，所以强制 v4 消除噪音。
    **下线自愈全链路已两次实测通过**（断网 22s/12s 恢复 + 隧道自动回 200）。
    手动下线测试方法：`/cgi-bin/srun_portal?action=logout&username=<学号>&ip=&ac_id=6&callback=cb`。
    **⚠️ 2026-10-15 修订**：本节「必须 http2 + IPv4 边缘」的结论已被取代——当日出口对 v4 隧道边缘段
    （198.41.x）大面积阻断，http2 与 quic 双双失效（两协议走同一段 IP，切协议无用）；当晚切 v6 边缘恢复。
    本节「校园网 IPv6 到 CF 边缘不通」的观测同日失效（v6 实测通，见坑 #14）。
    campus-auth 重认证对 QUIC/v6 的影响待复测（v6 无 NAT 绑定，理论上不触发本坑）。

14. **★v4 隧道边缘段被出口阻断 → 切 IPv6 边缘★**（2026-10-15 晚高峰实测）：
    症状 = example.com 全站 530/502，cloudflared 日志 `Failed to dial to edge with quic: timeout` 刷屏
    （v4 IP 全是 198.41.192.x/200.x），最后 `no more connections active and exiting`、容器反复退出重启。
    取证：v4 四个边缘 IP 三个连 TCP 握手都 FAIL；198.41.200.63 双端口 OPEN 但数据面 359ms 即死；
    ICMP 全丢、1.1.1.1 超时；**v6 到 CF 边缘（2606:4700:a0::/a8::）ping 82ms 0 丢包、4 条连接秒注册、公网 200**。
    **解法 = config.yml `edge-ip-version: "6"`（protocol 保持 quic）**；本地正本 `deploy-nas/cloudflared-config.yml`。
    诊断一口令：`ping6 2606:4700:4700::1111` 通 + `ping 198.41.200.63` 全丢 ⇒ 该切 v6。
    NAS 备份：`config.yml.bak-v4-quic`（quic+v4）与 `config.yml.bak-http2`（http2+v4）可回退。
    脆弱点：v6 前缀（2001:db8:1234:5678:…，电信线）靠路由器 RA 下发，路由器重置/ISP 换前缀则隧道断——需人工回退 v4
    或等前缀恢复（ddns-go 时代记录的 DHCPv6 前缀偶发变更同源）。v4 多线出口（211.71.x CERNET + 36.112.x 电信）
    与 v6 电信线是不同路径，故 v4 被打时 v6 可独活。

15. **★v4 路径是"半死"路径 —— 绝不要让它当常驻 replica★**（2026-10-15 20:30 现场取证）：
    坑 #14 当晚我一度加了个 `cloudflared-v4` 容器（`config-v4.yml`，quic+v4）当第二个 replica，
    想让 CF 自动容灾。**实测证明这是有害的，已撤除**：
    - 同一时刻连测 5 轮 v4 边缘 TCP 7844 可达率 = 3/3 → 2/3 → 1/3 → **0/3 → 0/3**；同期 v6 恒 3/3。
    - v4 连接器启动 49 秒内：Registered 7 次 / `datagram manager error: timeout` 10 次 / 连接终止 9 次 / 拨号失败 7 次。
    - 对照：v6 连接器自 19:04 起 4 条连接**零中断**。
    机理：v4 是"TCP 握手能过、数据面随时死"的劣质路径，而 **CF 对 replica 不做健康感知分流**
    （官方文档：只按就近选、失败才重试）——让一个"看着活着实则半死"的 replica 上线，
    等于把访客请求喂给它，反而制造 502/1033。**结论：v4 只做备胎，不做常驻**；
    备胎配置 `cloudflared-config-v4.yml` 留在 NAS `/volume1/docker/cloudflared/config-v4.yml`，
    启用命令写在文件顶部注释里，**启用时必须带 `--metrics 127.0.0.1:20252`**
    （现役实例以 `--net host` 已占用 20241，第二个实例默认也绑 20241 → 冲突）。

16. **★排障利器：cloudflared 自带指标端点 + 两个"看着像探针其实没用"的坑★**（2026-10-15 实测）：
    - **`curl http://127.0.0.1:20241/ready` → `200` 表示隧道有活跃连接**（503/000 表示无）。
      这是本地最快、最权威的健康判据，比任何外部探测都快且不消耗公网配额；`/metrics` 还有 22KB
      Prometheus 指标（`/healthcheck` 恒 200，仅证明进程活着）。⚠️ 该端口是**单实例占用**，
      多连接器时必须给后来者换端口（见坑 #15）。
    - **别用 `curl https://1.1.1.1/` 或 `curl https://<边缘IP>/` 当路径探针**：本出口实测**恒 000**
      （1.1.1.1 与 v4/v6 边缘 443 全 000，但 TCP 7844 握手正常、站点 200）——用它判断"哪一族可达"
      会得出"两族都不可达"的错误结论（守夜人 v2 开发时踩过）。**可靠的族可达性判据 = dig 现查
      `region1/2.v2.argotunnel.com` 的 A/AAAA + `/dev/tcp/<ip>/7844` 握手**。
      （注：坑 #14 里用 `ping6`/`ping` 做的诊断当时有效，但普通用户跑 ping 会报
      `missing cap_net_raw`，脚本里别用 ping。）
    - `dig +short SRV _v2-origintunneld._tcp.argotunnel.com` 只回 region 域名，边缘 IP 要再查 A/AAAA。

17. **★守夜人 cron 已升级为每分钟★**（2026-10-15 重写，取代旧版）：
    脚本 `/volume1/docker/ruc-logs/tunnel_watchdog.sh`（本地正本 `deploy-nas/tunnel_watchdog_v2.sh`），
    cron `/etc/cron.d/tunnel-watchdog` = `*/1 * * * * root …`。三点改进：
    ①**成功也写心跳**（`OK ready=… public=… family=…`）——旧版只记失败，导致"一直正常"和"cron 没跑"
    在日志上无法区分（故障当晚就误判过一次）；②**恢复窗口从最长 10 分钟压到 1~2 分钟**
    （旧版 2 次 × 5 分钟才动作，访客白看 10 分钟错误页）；③**恢复动作换族而非无脑重启**
    （旧版 `docker restart` 对路径级阻断无效，18:25/18:35/18:50 三连实测无效）。
    判据 = `/ready` 与公网 200 **任一正常即健康**（双判据防单点误判）；两个都坏才测族可达性，
    切到唯一可达族（两族都通则切对侧），10 分钟冷却窗防抖动。另含 v6 稳定地址漂移告警
    （**只认 `/128 … dynamic` 那条**，即 `2001:db8:1234:5678::3ec`；`mngtmpaddr stable-privacy` 的
    /64 是内核隐私地址会几小时轮换一次，盯它会刷无意义 WARN——实测踩过）。
    旧版备份：`ruc-logs/tunnel_watchdog.sh.bak-20261015`。

18. **（占位：SSH 口令登录被拒 → 走 Docker 容器终端，含未脱敏细节，待自本地 deploy-nas 分支同步后补全）**

19. **★busybox awk 不支持 `(...)` 交替语法 —— 失败方式是静默返回空★**（2026-10-16 实测）：
    NAS 的 awk 是 busybox。`/\/128(\/|$)/` 这种写法**不报错、直接返回空**，自愈脚本静默失效。
    实测对照：`/\/128/` ✓ 可用；`/\/128(\/|$)/` ✗ 返回空；`/\/128$/` ✗ 返回空。
    **正解 = POSIX 字符类**：`/\/128([[:space:]]|$)/`（busybox awk 与 GNU awk 都支持）。
    通用教训：写给 NAS/嵌入式环境的 awk/sed 按 **POSIX 最小集**写，写完必须在目标机实测——
    它的失败方式是"静默返回空"，不是报错。

20. **★坑 #3 的修订：`scp -O`（旧协议）在 UGOS 上可用★**（2026-10-20 实测，129KB tar 一次传成）：
    坑 #3 里"scp 是坏的"其实坏的是 **SFTP 子系统**——OpenSSH ≥ 9.0 的 scp 默认走 SFTP 协议，故一并失败；
    `scp -O` 强制走传统 scp 协议（远端 exec `scp -t`），绕开 SFTP 子系统，实测正常。
    适用条件：客户端 OpenSSH ≥ 9.0（Windows 11 自带 9.5 已验证）。大文件/二进制比 cat 管道省事：
    `scp -O 本地文件 用户@NAS:/目标路径`。未测：交互式 sftp、rsync。

## 8. 安全边界

- **公网暴露面 = 仅 18080**（只读静态文件 nginx，无 CGI/PHP/数据库）。
- 以下端口**只许局域网**，任何配置变更不得引入公网暴露：22 (SSH)、9876 (ddns-go 面板)、
  9443/9999 (UGOS 管理)、445 (SMB，本来就关)。
- nginx worker 以 root 运行是坑 #1 下的既定妥协（只读静态站可接受）；**若未来加动态内容
  （CGI/后端应用），必须重新评估这个决定**。
- UGOS 管理密码曾在对话中出现，建议用户已轮换（接手后可向用户确认）；SSH 走公钥为主通道。

## 9. 指针

| 资源 | 位置 |
|---|---|
| 方法论技能（本部署的完整复盘） | `%USERPROFILE%\.claude\skills\nas-home-broadband-publishing\SKILL.md` |
| 带宽归属/孤儿进程排查技能 | `%USERPROFILE%\.claude\skills\windows-disk-io-attribution\SKILL.md` |
| 域名/DNSPod 控制台 | https://console.dnspod.cn （域名续费、解析记录） |
| 腾讯云 API 密钥页 | https://console.cloud.tencent.com/cam/capi |

## 10. 维护姿态 / Next Steps

**无待办**。低频巡检建议（每月或 NAS 断电/固件升级后）：

```bash
curl -6 -s -o /dev/null -w "%{http_code}" -m 10 http://example.com:18080/   # 应 200
ssh nasuser@192.168.1.100 "sudo -n true 2>/dev/null; docker ps --format '{{.Names}} {{.Status}}'"  # 两个容器 Up
nslookup -type=AAAA example.com 223.5.5.5   # 与 NAS ip -6 addr 里的 2001:db8 地址一致
```

**隧道日常巡检（每分钟已由守夜人自动做，人工只需看日志）**：

```bash
ssh nasuser@192.168.1.100 "tail -5 /volume1/docker/ruc-logs/watchdog.log; echo '--- ready ---'; curl -s -o /dev/null -w '%{http_code}\n' -m 5 http://127.0.0.1:20241/ready"
# 健康长这样：  20:32:01 OK ready=200 public=200 family=6
# 有 FAIL 行的处置顺序见坑 #14 → #16 → #15（先看错误里的 IP 属于 v4 还是 v6 段）
```

**GitHub 推送备选通路（2026-10-15 实测有效，别再死磕 HTTPS）**：本出口到 `github.com:443` 会分钟级抽风
（NAS 侧也实测 `000`/12s）。**当 HTTPS 死、代理端口全关、而 `ssh.github.com:443` 活时**，用 SSH-over-443：

```bash
ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new -T -p 443 git@ssh.github.com   # 探测：回 Hi <user>! 即可用
git -C D:\RUC-html-templates -c "url.ssh://git@ssh.github.com:443/.insteadOf=https://github.com/" push github master
git -C D:\RUC-html-templates -c "url.ssh://git@ssh.github.com:443/.insteadOf=https://github.com/" ls-remote github master
```

一次性 `-c`，不污染 config；**收尾只信 ls-remote 的 SHA 与本地 `rev-parse HEAD` 比对**。
两个反直觉点：①`api.github.com` 返回 200 **不代表** `github.com` 通（实测两者同时 200 vs 000）；
②**挂 VPN 可能更糟**：mihomo TUN 把 `ssh.github.com` 解析成 Fake-IP `198.18.0.14` 后直接掐断，关掉代理反而通。
（2026-10-15 21:19 旧仓双远端已补齐至 `ff525b3`，Gitee + GitHub 双双实测一致；旧仓 `origin`=Gitee、`github`=GitHub，**别推反**。）

开放问题：none。
