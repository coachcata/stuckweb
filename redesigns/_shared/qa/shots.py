#!/usr/bin/env python3
"""Full-page screenshots of every page at 375/768/1440 + console error capture.
Usage: python3 shots.py <site-dir> <out-dir> [pass-name]"""
import sys, os, glob, threading, functools, http.server, socketserver
from playwright.sync_api import sync_playwright

def serve(root, port):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", port), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd

def main(site, out, tag="pass"):
    os.makedirs(out, exist_ok=True)
    port = 8931
    httpd = serve(site, port)
    pages = sorted(os.path.basename(p) for p in glob.glob(os.path.join(site, "*.html")))
    errors = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path="/opt/pw-browsers/chromium"
                                     if os.path.exists("/opt/pw-browsers/chromium") else None)
        for w, label in ((375, "m"), (768, "t"), (1440, "d")):
            ctx = browser.new_context(viewport={"width": w, "height": 900},
                                      device_scale_factor=1, reduced_motion="no-preference")
            pg = ctx.new_page()
            pg.on("console", lambda m: errors.append(f"{m.type}: {m.text}") if m.type in ("error",) else None)
            pg.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
            for f in pages:
                pg.goto(f"http://127.0.0.1:{port}/{f}", wait_until="networkidle", timeout=45000)
                pg.wait_for_timeout(1200)
                # force lazy/observer content in
                pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                pg.wait_for_timeout(900)
                pg.evaluate("window.scrollTo(0, 0)")
                pg.wait_for_timeout(600)
                name = f.replace(".html", "")
                pg.screenshot(path=os.path.join(out, f"{name}-{label}{w}.png"), full_page=True)
                # horizontal overflow check
                sw = pg.evaluate("document.documentElement.scrollWidth")
                cw = pg.evaluate("document.documentElement.clientWidth")
                if sw > cw + 1:
                    errors.append(f"HSCROLL {f}@{w}: scrollWidth {sw} > client {cw}")
            ctx.close()
        browser.close()
    httpd.shutdown()
    log = os.path.join(out, "console.log")
    with open(log, "w") as fh:
        fh.write("\n".join(dict.fromkeys(errors)))
    print(f"shots done: {len(pages)} pages x3 widths -> {out}")
    if errors:
        print("ISSUES:")
        for e in dict.fromkeys(errors): print("  ", e)
    return 0

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "pass")
