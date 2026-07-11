#!/usr/bin/env python3
"""Structural checks: internal links/assets resolve, alts present, video attrs,
absolute-path leaks, booking URL correctness. Usage: python3 links.py <site-dir>"""
import sys, os, re
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

BOOKING = "https://portal.catalystgrowthcoach.co.uk/public/appointment-scheduler/6045bde2cbf031000aba1a55/schedule"
EXPECT_EXTERNAL_OK = ("johnob1.co.uk", "linkedin.com", "portal.catalystgrowthcoach.co.uk", "mailto:")

class C(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs = []; self.issues = []; self.ids = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        ln = self.getpos()[0]
        if "id" in a: self.ids.add(a["id"])
        for k in ("href", "src", "poster"):
            if k in a and a[k]: self.refs.append((ln, tag, a[k], a))
        if tag == "img" and not a.get("alt", "").strip():
            self.issues.append((ln, f"<img src={a.get('src')}> missing alt"))
        if tag == "video":
            for req in ("autoplay", "muted", "loop", "playsinline"):
                if req not in a: self.issues.append((ln, f"<video> missing {req}"))
            if "controls" in a: self.issues.append((ln, "<video> has controls"))
            if not a.get("aria-label"): self.issues.append((ln, "<video> missing aria-label"))
        if tag == "html" and a.get("lang") not in ("en-GB",):
            self.issues.append((ln, f"html lang={a.get('lang')}"))

def main(root):
    root = os.path.abspath(root); n = 0
    pages = {}
    for dp, _, fs in os.walk(root):
        for f in fs:
            if f.endswith(".html"): pages[os.path.join(dp, f)] = None
    booking_seen = 0
    for path in sorted(pages):
        src = open(path, encoding="utf-8").read()
        c = C(); c.feed(src); pages[path] = c
        base = os.path.dirname(path)
        for ln, tag, ref, a in c.refs:
            u = urlparse(ref)
            if u.scheme in ("http", "https"):
                if "6045bde2cbf031000aba1a55" in ref: booking_seen += 1
                if "6040903c" in ref:
                    print(f"BOOKING {path}:{ln}: wrong scheduler id"); n += 1
                if not any(d in ref for d in EXPECT_EXTERNAL_OK):
                    print(f"EXTERN  {path}:{ln}: unexpected external ref {ref}"); n += 1
                elif a.get("target") == "_blank" and "noopener" not in a.get("rel", ""):
                    print(f"NOOPEN  {path}:{ln}: target=_blank without noopener {ref}"); n += 1
                continue
            if u.scheme in ("mailto", "tel", "data"): continue
            if ref.startswith("#"):
                if ref != "#" and ref[1:] not in c.ids:
                    print(f"ANCHOR  {path}:{ln}: #{ref[1:]} not found in page"); n += 1
                continue
            if ref.startswith("/"):
                print(f"ABSPATH {path}:{ln}: absolute path {ref}"); n += 1
                continue
            frag = unquote(u.path)
            target = os.path.normpath(os.path.join(base, frag))
            if not os.path.exists(target):
                print(f"MISSING {path}:{ln}: {ref}"); n += 1
            elif u.fragment:
                tsrc = open(target, encoding="utf-8").read() if target.endswith(".html") else ""
                if target.endswith(".html") and f'id="{u.fragment}"' not in tsrc and f"id='{u.fragment}'" not in tsrc:
                    print(f"ANCHOR  {path}:{ln}: {ref} fragment missing"); n += 1
        for ln, msg in c.issues:
            print(f"ATTR    {path}:{ln}: {msg}"); n += 1
        for tag_needed, label in (("<title>", "title"),):
            if tag_needed not in src: print(f"META    {path}: missing {label}"); n += 1
        if 'name="description"' not in src: print(f"META    {path}: missing meta description"); n += 1
    if booking_seen == 0:
        print("BOOKING no page links the Dubsado scheduler"); n += 1
    # orphaned assets
    used = set()
    for path, c in pages.items():
        base = os.path.dirname(path)
        for ln, tag, ref, a in c.refs:
            u = urlparse(ref)
            if not u.scheme and not ref.startswith("#") and not ref.startswith("/"):
                used.add(os.path.normpath(os.path.join(base, unquote(u.path))))
    # also count refs inside css (url(...)) and js
    for dp, _, fs in os.walk(root):
        for f in fs:
            if f.endswith((".css", ".js")):
                p = os.path.join(dp, f)
                for m in re.finditer(r"url\(['\"]?([^'\")]+)['\"]?\)", open(p, encoding="utf-8").read()):
                    r = m.group(1)
                    if not r.startswith(("data:", "http")):
                        used.add(os.path.normpath(os.path.join(os.path.dirname(p), r)))
                used.add(p)
    for dp, _, fs in os.walk(root):
        for f in fs:
            p = os.path.join(dp, f)
            if p.endswith((".html", ".css", ".js")) or f == "favicon.svg": continue
            if p not in used:
                print(f"ORPHAN  {p} ({os.path.getsize(p)//1024}KB) not referenced"); n += 1
    print(f"-- links: {n} finding(s) in {root}")
    return 1 if n else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))
