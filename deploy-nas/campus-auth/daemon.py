#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
人大校园网(深澜 srun)自动认证守护 — 部署于 NAS Docker(python:3-alpine)
协议逆向自 https://go.ruc.edu.cn/static/themes/ruc/js/Portal.js (2026-10 抓取):
  hmd5    = HMAC-MD5(key=password, msg=token).hex()
  info    = "{SRBX1}" + 自定义字母表base64( XXTEA(json, token) )
  chksum  = SHA1(token+username+token+hmd5+token+ac_id+token+ip+token+n+token+type+token+info)
端点: /cgi-bin/get_challenge | /cgi-bin/srun_portal | /cgi-bin/rad_user_info
凭据: /config/credentials.json  (host 侧 root/属主可读, 本进程绝不外传/不打印)
"""
import hashlib, hmac, json, base64, time, sys, os, re, ssl, urllib.request, urllib.parse

PORTAL   = "https://go.ruc.edu.cn"
CRED     = "/config/credentials.json"
LOGF     = "/config/auth.log"
AC_ID    = 6
N, TYPE_ = 200, 1
PROBES   = ["http://www.gstatic.cn/generate_204", "http://connect.rom.miui.com/generate_204"]
ALPHA    = "LVoJPiCN2R8G90yg+hmFHuacZ1OWMnrsSTXkYpUq/3dlbfKwv6xztjI7DeBE45QA"
SSL_CTX  = ssl._create_unverified_context()  # 门户为内网地址,证书链本机不可验,属预期

# ---------- 深澜加密 ----------
def _pack_s(a: str, append_len: bool):
    c = len(a); v = []
    for i in range(0, c, 4):
        w = 0
        for j in range(4):
            if i + j < c:
                w |= ord(a[i + j]) << (8 * j)
        v.append(w)
    if append_len:
        v.append(c)
    return v

def _xxtea_str(data: str, key: str) -> bytes:
    if data == "":
        return b""
    M = 0xFFFFFFFF
    v = _pack_s(data, True); k = _pack_s(key, False)
    while len(k) < 4:
        k.append(0)
    n = len(v) - 1; z = v[n]; y = v[0]
    d = 0; q = 6 + 52 // (n + 1)
    while q > 0:
        q -= 1
        d = (d + 0x9E3779B9) & M
        e = (d >> 2) & 3
        p = 0
        while p < n:
            y = v[p + 1]
            m = (z >> 5) ^ ((y << 2) & M)
            m += ((y >> 3) ^ ((z << 4) & M)) ^ (d ^ y)
            m += k[(p & 3) ^ e] ^ z
            z = v[p] = (v[p] + m) & M
            p += 1
        y = v[0]
        m = (z >> 5) ^ ((y << 2) & M)
        m += ((y >> 3) ^ ((z << 4) & M)) ^ (d ^ y)
        m += k[(p & 3) ^ e] ^ z
        z = v[n] = (v[n] + m) & M
    out = bytearray()
    for w in v:
        out += (w & 0xFF).to_bytes(1, "little") + ((w >> 8) & 0xFF).to_bytes(1, "little") \
             + ((w >> 16) & 0xFF).to_bytes(1, "little") + ((w >> 24) & 0xFF).to_bytes(1, "little")
    return bytes(out)

def _b64_custom(raw: bytes) -> str:
    std = base64.b64encode(raw).decode()
    table = str.maketrans("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ALPHA)
    return std.translate(table)

def make_login_params(username: str, password: str, ip: str, token: str) -> dict:
    hmd5 = hmac.new(password.encode(), token.encode(), hashlib.md5).hexdigest()
    info_plain = json.dumps({"username": username, "password": password, "ip": ip,
                             "acid": str(AC_ID), "enc_ver": "srun_bx1"},
                            separators=(",", ":"), ensure_ascii=False)
    info = "{SRBX1}" + _b64_custom(_xxtea_str(info_plain, token))
    chk = token + username + token + hmd5 + token + str(AC_ID) + token + ip \
        + token + str(N) + token + str(TYPE_) + token + info
    chksum = hashlib.sha1(chk.encode()).hexdigest()
    return {"action": "login", "username": username, "password": "{MD5}" + hmd5,
            "ac_id": AC_ID, "ip": ip, "chksum": chksum, "info": info,
            "n": N, "type": TYPE_, "callback": "srun_cb"}

# ---------- HTTP ----------
def _get(url: str, timeout=6):
    with urllib.request.urlopen(url, timeout=timeout, context=SSL_CTX) as r:
        return r.status, r.read().decode("utf-8", "replace")

def _jsonp(body: str):
    m = re.search(r"\((\{.*\})\)\s*;?\s*$", body, re.S)
    return json.loads(m.group(1)) if m else {}

def probe_online() -> bool:
    for u in PROBES:
        try:
            s, _ = _get(u, 5)
            if s == 204:
                return True
        except Exception:
            continue
    return False

def srun_status():
    try:
        s, b = _get(PORTAL + "/cgi-bin/rad_user_info?" +
                    urllib.parse.urlencode({"callback": "srun_cb", "_": int(time.time() * 1000)}))
        return _jsonp(b)
    except Exception as e:
        return {"error": "probe_fail", "msg": str(e)[:80]}

def srun_login(username, password):
    try:
        s, b = _get(PORTAL + "/cgi-bin/get_challenge?" +
                    urllib.parse.urlencode({"callback": "srun_cb", "username": username,
                                            "ip": "", "_": int(time.time() * 1000)}))
        ch = _jsonp(b)
        token = ch.get("challenge", "")
        if not token:
            return {"ok": False, "why": "no_challenge:" + json.dumps(ch, ensure_ascii=False)[:120]}
        ip = ch.get("ip") or ch.get("client_ip") or ""
        p = make_login_params(username, password, ip, token)
        s2, b2 = _get(PORTAL + "/cgi-bin/srun_portal?" + urllib.parse.urlencode(p))
        res = _jsonp(b2)
        ok = (res.get("error") == "ok") or ("already" in str(res.get("suc_msg", "")) +
                                            str(res.get("error", "")))
        return {"ok": ok, "res": json.dumps(res, ensure_ascii=False)[:200]}
    except Exception as e:
        return {"ok": False, "why": "exc:" + repr(e)[:120]}

# ---------- 日志/主循环 ----------
def log(msg):
    line = time.strftime("%F %T") + "  " + msg
    try:
        if os.path.exists(LOGF) and os.path.getsize(LOGF) > 1_000_000:
            open(LOGF, "w").close()
        with open(LOGF, "a") as f:
            f.write(line + "\n")
    except Exception:
        pass
    print(line, flush=True)

def load_creds():
    try:
        with open(CRED) as f:
            c = json.load(f)
        u, p = c.get("username", ""), c.get("password", "")
        if u and p and "在这里填" not in u + p:
            return c
    except Exception:
        pass
    return None

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "status":
        log("STATUS probe=" + ("ONLINE" if probe_online() else "OFFLINE") +
            " srun=" + json.dumps(srun_status(), ensure_ascii=False)[:160] +
            " creds=" + ("yes" if load_creds() else "NO"))
        return
    log("daemon 启动 (ac_id=%d)" % AC_ID)
    last = None
    while True:
        online = probe_online()
        if online != last:
            log("网络状态: " + ("在线" if online else "离线") +
                ("" if online else "  srun=" + json.dumps(srun_status(), ensure_ascii=False)[:120]))
            last = online
        if not online:
            c = load_creds()
            if c:
                r = srun_login(c["username"], c["password"])
                log("自动认证: " + ("成功 " if r.get("ok") else "失败 ") + json.dumps(r, ensure_ascii=False)[:200])
                last = probe_online()
            else:
                log("离线且 /config/credentials.json 未填,无法自动认证")
        time.sleep(60)

if __name__ == "__main__":
    main()
