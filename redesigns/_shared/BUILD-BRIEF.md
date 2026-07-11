# SHARED BUILD BRIEF — applies to all five sites

You are building ONE standalone site in /home/user/stuckweb/redesigns/<your-folder>/.
Read /home/user/stuckweb/redesigns/_shared/content.md first: it is the single
source of truth for every word of copy, every link, every asset. Then read
your design spec. Content is locked; design is yours within the spec.

## Non-negotiables

1. **The register test.** Every choice must survive: "Would a sceptical,
   time-poor senior executive find this credible and respect-worthy?" If a
   choice feels loud, gimmicky or salesy, it fails, however impressive.
2. **No em dashes anywhere.** Not in copy, alt text, titles, meta, comments.
   The content pack is already clean; do not reintroduce them. Middle dots
   (·) and en dashes in ranges are fine.
3. **No hype words** (unleash, transform, empower, unlock, amazing,
   game-changing, "here's the thing"). Exception: "transformative" inside
   Ralph Shorthose's verbatim quote stays.
4. **British English.** organise, optimise, colour spellings in copy (copy is
   already correct; keep it that way).
5. **Copy fidelity.** You may lightly trim or re-break lines where the layout
   genuinely needs it; you may not change meaning, claims or voice, and you
   may not invent anything.

## File structure (self-contained; no external requests at all)

```
<your-folder>/
  index.html  about.html  leadstrong.html  buildstrong.html
  teamstrong.html  in-practice.html  going-further.html  contact.html
  css/main.css          (one stylesheet; @font-face at top)
  js/main.js            (only if needed; vanilla, small)
  fonts/                (copy ONLY your families from _shared/fonts/<slug>/*.woff2)
  images/  images/logos/  videos/   (copy ONLY what your design uses)
  favicon.svg           (design one to match your concept; simple mark)
```
Exception: site 05 (Whiteboard) is a single index.html plus assets; internal
links become anchors. Everything else in this brief still applies.

- All hrefs/srcs RELATIVE (e.g. `about.html`, `images/fsr.jpg`,
  `videos/session-wide.mp4`), never absolute `/...` paths, so the folder works
  from any subpath and on Netlify Drop.
- Fonts: self-hosted. `_shared/fonts/<family>/faces.css` contains ready
  @font-face rules with `src: url(fonts/<family>/<file>.woff2)`; paste them
  into the top of css/main.css and fix the relative path to `../fonts/...`
  (since main.css lives in css/). These are VARIABLE fonts: one file covers
  the whole weight range declared in `font-weight: X Y`.
- No Google Fonts links, no CDNs, no analytics, no external images.

## Source assets (copy, never move; never modify the originals)

- Photos: /home/user/stuckweb/images/  · Logos: /home/user/stuckweb/images/logos/
- Videos: /home/user/stuckweb/videos/
- Copy only the files your pages actually reference. Keep total site weight
  reasonable; you do not have to use every video.

## Behavioural requirements

- Videos: `autoplay muted loop playsinline preload="metadata"` +
  aria-label, never controls. They are living photos. Give every video a
  sensible `poster`-free fallback (background colour) and lazy treatment for
  below-the-fold clips (`loading` is not valid on video; use preload
  metadata + IntersectionObserver play/pause if you use JS).
- In Practice: the seven lessons show preview text; the full body + coda is
  revealed in-page in whatever device suits your design (modal, inline
  expander, side panel). Must work with keyboard (Escape/again-click closes),
  must not break scroll, must work at 375px.
- Contact form: fields, validation messages and local confirmation exactly as
  the content pack specifies (`data-netlify="true"`, honeypot, action="#",
  JS shows confirmation, no real POST target). Style errors inline, quietly.
- Mobile nav: at small widths provide a usable menu (your design idiom:
  hamburger, overflow row, whatever fits the concept). Every page reachable
  on a phone.
- Smooth-scroll for same-page anchors where used.
- Respect `prefers-reduced-motion: reduce`: disable nonessential animation
  and scroll-driven effects when set.

## Quality baseline (before you report done)

- Valid, semantic HTML5; one h1 per page; images have alt text (use the
  content pack's descriptions); videos have aria-labels.
- Responsive from 360px to 1920px; no horizontal scrollbar at any width;
  test-think at 375 / 768 / 1440.
- Text contrast at least WCAG AA against its background.
- Focus states visible on all interactive elements; skip-to-content link.
- Every internal link resolves to a file you created; the booking link and
  the external links (johnob1.co.uk, LinkedIn) open in new tabs with
  rel="noopener".
- Per-page `<title>` and meta description from the content pack; og:title,
  og:description. Use `<html lang="en-GB">`.
- Set og:image to your site's most representative photo (relative path is
  acceptable in this demo).
- No console errors. No JS required for reading any copy (progressive
  enhancement: lessons content must be in the DOM).

## Tone of implementation

Hand-finished, not templated. Typographic details matter: real quotation
marks ("…"), apostrophes ('), `text-wrap: balance` on headings where
supported, `font-variant-numeric` where tabular numbers appear, hanging
punctuation on pull quotes if your design uses them. Micro-interactions are
subtle: 150-350ms, eased, purposeful. Nothing bounces.
