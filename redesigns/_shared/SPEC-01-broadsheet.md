# SPEC 01 — THE BROADSHEET
Folder: redesigns/01-broadsheet/

## Thesis
A quality Sunday paper's long read: the practice presented as serious
journalism. If the Financial Times' weekend supplement profiled a thinking
partnership, this is the page you'd be holding.

## Atmosphere
Unhurried, literate, printed. The confidence is entirely in the typography
and the editorial structure. Nothing moves unless the reader touches it.

## Palette (tokens)
--paper: #F7F3EA        (warm cream, the page)
--paper-deep: #EFE9DB   (tint panels, well of the page)
--ink: #1A1815          (near-black warm ink)
--ink-soft: #57524A     (secondary text)
--rule: #C9C1B0         (hairlines)
--oxblood: #6E1E2B      (the single accent: links, drop caps, folio marks)
No other colours. No gradients. Paper texture may be suggested only by the
two paper tones, never by a texture image.

## Type
- Fraunces (variable, opsz): masthead, headlines, pull quotes. Use high
  optical size for display, real italics for emphasis. Tight, confident
  sizes: clamp(2.2rem, 6vw, 4.5rem) for page titles.
- Newsreader (variable, opsz): all body text, 1.05-1.15rem, line-height 1.65,
  justified with hyphens:auto ONLY on wide columns; ragged right on mobile.
- Archivo: small-caps-style labels (letterspaced uppercase 11-12px), bylines,
  captions, nav.

## Signature devices
- A proper masthead on index.html: "CATALYST GROWTH COACHING" set large in
  Fraunces across the full measure, with a thin double rule above and below,
  a dateline row (e.g. "London · Est. 2024" left, "The Whiteboard Sessions"
  right) in Archivo caps. Subpages get a condensed one-line masthead.
- Hairline column rules (1px --rule) between text columns on desktop.
- Drop cap (Fraunces, --oxblood, 3 lines) on the first paragraph of each
  page's opening section. Only the first.
- Section folios as running heads: "01 · The Argument" style, Archivo caps,
  oxblood number.
- Photography as documentary plates: full column width, thin ink border or
  none, italic Newsreader caption underneath with an Archivo caps credit
  line. Videos framed identically to photos (living photographs).
- Pull quotes set in Fraunces italic across two columns with oxblood
  quotation mark, used sparingly (one per page maximum).
- End of article: a small centred asterisk or square (◼, oxblood) as an end
  mark, newspaper style.
- The testimonial (index) runs as a boxed "Letters" style feature: rule
  border, "In their words" caps label, the quote in Newsreader, attribution
  right-aligned in Archivo caps.
- Footer as a colophon: thin double rule, three columns of links, fine print
  centred beneath.

## Layout system
- Max measure 72ch for single-column text; desktop uses a 12-col grid where
  articles run 2 columns (CSS columns with column-rule) for the long body
  sections; heroes and plates break wider.
- Programme pages open with a "feature front": headline left column,
  standfirst (the lede) in larger italic, image plate right, byline row.
- The three programme tiles on index become editorial teasers: rule-topped
  entries with caps kicker (LEADSTRONG), one-line description, "Learn more"
  as an oxblood in-text link. Small thumbnail images allowed.
- In Practice: the seven lessons are the letters page. Lessons expand INLINE
  (details/summary enhanced, or JS expander that pushes content down) like
  unfolding the paper; no modal overlay in this concept.
- Contact: set like a classified/notice page: the booking CTA is a bordered
  notice box; the form fields are ruled lines (bottom-border only inputs).

## Motion
Hover only: links get oxblood underline thickening; plates get a very slow
(600ms) sepia-to-full transition on hover if tasteful, else nothing. No
scroll animation whatsoever. Page loads complete and still.

## Buttons
No pill buttons. CTAs are bordered notice boxes or oxblood small-caps links
with arrows. "Book a Whiteboard Session" on index/programme pages: a
rule-bordered rectangle, paper background, ink text, oxblood keyline on
hover; feels like a printed coupon, not a web button.

## Avoid
Anything glossy, any shadow, any rounded corner (border-radius 0 sitewide),
any second accent colour, sticky headers that shrink/animate (a plain sticky
one-line masthead on subpages is fine).
