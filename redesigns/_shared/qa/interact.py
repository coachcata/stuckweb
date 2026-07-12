#!/usr/bin/env python3
"""Interaction tests: lesson reveal device, contact form validation+confirmation,
mobile menu. Usage: python3 interact.py <site-dir> <out-dir>"""
import sys, os, functools, http.server, socketserver, threading
from playwright.sync_api import sync_playwright

site, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=site)
socketserver.TCPServer.allow_reuse_address = True
httpd = socketserver.TCPServer(("127.0.0.1", 8944), handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()
issues = []
single = not os.path.exists(os.path.join(site, "in-practice.html"))
ip_url = "http://127.0.0.1:8944/index.html#in-practice" if single else "http://127.0.0.1:8944/in-practice.html"
ct_url = "http://127.0.0.1:8944/index.html#solution" if single else "http://127.0.0.1:8944/contact.html"

with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    pg = b.new_context(viewport={"width":1440,"height":900}).new_page()
    pg.on("pageerror", lambda e: issues.append(f"pageerror: {e}"))

    # 1. lesson reveal
    pg.goto(ip_url, wait_until="networkidle"); pg.wait_for_timeout(900)
    trig = pg.locator("button.read-more, .lesson button, button[data-lesson], .lesson-row button, [data-open-lesson], .lessons-list button, details.lesson summary, .lesson a[href^='#']").first
    if trig.count() == 0:
        issues.append("no lesson trigger found")
    else:
        trig.scroll_into_view_if_needed(); pg.wait_for_timeout(400)
        trig.click(); pg.wait_for_timeout(700)
        pg.screenshot(path=f"{out}/lesson-open.png")
        body_len = pg.evaluate("document.body.innerText.length")
        pg.keyboard.press("Escape"); pg.wait_for_timeout(500)
        pg.screenshot(path=f"{out}/lesson-closed.png")

    # 2. form: invalid submit then valid submit
    pg.goto(ct_url, wait_until="networkidle"); pg.wait_for_timeout(700)
    form = pg.locator("form[name=contact]")
    if form.count() == 0:
        issues.append("no contact form found")
    else:
        form.scroll_into_view_if_needed(); pg.wait_for_timeout(300)
        pg.locator("form[name=contact] button[type=submit], form[name=contact] .form-submit, form[name=contact] button").first.click()
        pg.wait_for_timeout(500)
        pg.screenshot(path=f"{out}/form-errors.png")
        pg.fill("form[name=contact] input[name=name]", "Test Person")
        pg.fill("form[name=contact] input[name=email]", "test@example.com")
        pg.locator("form[name=contact] input[type=radio]").first.check()
        pg.fill("form[name=contact] textarea", "A short message.")
        pg.locator("form[name=contact] button[type=submit], form[name=contact] .form-submit, form[name=contact] button").first.click()
        pg.wait_for_timeout(600)
        pg.screenshot(path=f"{out}/form-confirm.png")
        conf = pg.evaluate("document.body.innerText.includes('within one working day')")
        if not conf: issues.append("confirmation text not visible after valid submit")

    # 3. mobile menu
    m = b.new_context(viewport={"width":375,"height":760}).new_page()
    m.on("pageerror", lambda e: issues.append(f"pageerror(mobile): {e}"))
    m.goto("http://127.0.0.1:8944/index.html", wait_until="networkidle"); m.wait_for_timeout(700)
    btn = m.locator("button[aria-label*='enu'], button.menu-toggle, .nav-toggle, button:has-text('MENU'), button:has-text('Menu'), button:has-text('SECTIONS'), button:has-text('AGENDA'), button:has-text('Agenda')").first
    if btn.count() == 0:
        issues.append("no mobile menu trigger found")
    else:
        btn.click(); m.wait_for_timeout(500)
        m.screenshot(path=f"{out}/mobile-menu.png")
    b.close()
httpd.shutdown()
print("interact done:", site)
for i in issues: print("  ISSUE:", i)
