#!/usr/bin/env python3
"""Copy sweep: em dashes, banned words, Americanisms in VISIBLE text of HTML files.
Usage: python3 sweep.py <site-dir>"""
import sys, re, os
from html.parser import HTMLParser

BANNED = re.compile(r"\b(unleash\w*|transform\w*|empower\w*|unlock\w*|amazing|game.chang\w*)\b", re.I)
HERES = re.compile(r"here.s the thing", re.I)
AMERICAN = re.compile(r"\b(optimiz\w+|organiz\w+|color(?!:)\w*|center(?!ed\b)|favorite|analyze\w*)\b")
# allowlist: verbatim client quote wording
ALLOW = {"transformative"}  # Ralph Shorthose's own words

class T(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.texts = []  # (line, text)
    def handle_starttag(self, tag, attrs):
        if tag in ("style", "script"): self.skip += 1
        for k, v in attrs:
            if k in ("alt", "aria-label", "title", "content", "placeholder") and v:
                self.texts.append((self.getpos()[0], v))
    def handle_endtag(self, tag):
        if tag in ("style", "script") and self.skip: self.skip -= 1
    def handle_data(self, d):
        if not self.skip and d.strip(): self.texts.append((self.getpos()[0], d))

def main(root):
    findings = 0
    for dirpath, _, files in os.walk(root):
        for f in sorted(files):
            if not f.endswith(".html"): continue
            path = os.path.join(dirpath, f)
            src = open(path, encoding="utf-8").read()
            # em dash anywhere in file (including comments/CSS) is banned
            for i, line in enumerate(src.splitlines(), 1):
                if "—" in line:
                    print(f"EMDASH  {path}:{i}: {line.strip()[:100]}"); findings += 1
            p = T(); p.feed(src)
            for ln, text in p.texts:
                for m in BANNED.finditer(text):
                    if m.group(0).lower() in ALLOW: continue
                    print(f"BANNED  {path}:{ln}: '{m.group(0)}' in: {text.strip()[:90]}"); findings += 1
                if HERES.search(text):
                    print(f"PHRASE  {path}:{ln}: {text.strip()[:90]}"); findings += 1
                for m in AMERICAN.finditer(text):
                    print(f"AMERICN {path}:{ln}: '{m.group(0)}' in: {text.strip()[:90]}"); findings += 1
    print(f"-- sweep: {findings} finding(s) in {root}")
    return 1 if findings else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))
