# SPEC 02 — THE ARCHITECT'S STUDIO
Folder: redesigns/02-architects-studio/

## Thesis
A modernist architect's portfolio: the practice presented as built work.
Sessions are projects; programmes are commissions; the whiteboard is the
drawing board.

## Atmosphere
Cool, precise, generous with silence. Everything measured, nothing decorated.
The grid is allowed to show itself.

## Palette (tokens)
--white: #FCFCFB
--concrete: #F2F1EE     (secondary surfaces)
--graphite: #17181A     (primary text, near-black cool)
--steel: #6A6D71        (secondary text, annotations)
--line: #DDDCD8         (grid lines, borders)
--drafting-blue: #2B4C7E  (single accent: links, plate numbers, active states)
Strictly these six. Photography carries all the warmth.

## Type
- Schibsted Grotesk (variable): everything from H1 to body. Display at
  clamp(2.4rem, 7vw, 5.5rem), weight 500-600, tracking -0.02em. Body 400 at
  1.0-1.05rem, line-height 1.6, max 64ch.
- IBM Plex Mono: all annotations, labels, coordinates, captions, nav items,
  plate numbers ("PL. 01"), file-data rows. 11-13px, uppercase where used as
  labels, letterspacing 0.08em.

## Signature devices
- Exposed grid: a faint 12-column guide (1px --line verticals) visible in
  page margins/gutters on desktop (background-image linear-gradient columns
  at very low contrast), so content visibly sits ON a system. Subtle: barely
  there, disappears on mobile.
- Every section carries a mono coordinate label in the margin:
  "01 / THE ARGUMENT", "FIG. 02", "PL. 03". Photography and video are
  "plates": presented uncropped, full-bleed-to-grid, with a mono data
  caption row underneath (e.g. "PL. 02 · WHITEBOARD SESSION · LONDON").
- A thin fixed header: brand as a mono wordmark "CATALYST GROWTH COACHING"
  left, nav items mono right, separated from page by a 1px line.
- Index hero: the drill-landscape video presented as the current project on
  the board: video occupies columns 2-12, with a large Schibsted headline
  overlapping it from column 1 (negative margin overlap, text on white, not
  on the video). Orient line as a mono annotation beside it.
- The three altitudes (index scene 04) as a numbered specification table:
  rows with mono numbers 01/02/03, ruled between.
- Credentials (about) as a data sheet: a real two-column definition table
  with ruled rows, mono keys, grotesk values.
- Client logos: uniform grayscale, opacity .65, arranged on the exposed
  grid with 1px cell borders like a materials board; hover restores full
  opacity (no colour restore needed if sources are dark marks).
- Programme pages open like project sheets: mono data block first
  (COMMISSION: LEADSTRONG / FOR: DIRECTORS, VPS, EXECUTIVES / FORMAT:
  WHITEBOARD SESSIONS), then the headline, then the plate.
- In Practice lessons: a project index. Each lesson is a ruled row (mono
  numeral, title, one-line preview); clicking opens a right-side panel
  (fixed, full-height, white, 1px left border) sliding in 240ms with the
  full text. Escape and × close. On mobile the panel is full-screen.
- Footer: a title block like a drawing's, bottom of page: ruled box with
  mono fields (PRACTICE / PROGRAMMES / CONTACT / SHEET NO.).

## Layout system
- 12-col grid, 1400px max, 24px gutters. Asymmetry is deliberate: text
  blocks typically occupy columns 1-6 or 7-12, plates cross more.
- Vertical rhythm on an 8px base; section paddings large (120-160px desktop).
- White dominates; --concrete panels used for at most one section per page.

## Motion
- Reveals: content translates up 12px + fades in over 300ms when entering
  viewport, once, staggered 60ms. Nothing else. Hover states: drafting-blue
  underlines/border shifts, 150ms.
- The side panel slide is the only large motion.

## Buttons
Rectangular, 1px graphite border, mono uppercase label, generous horizontal
padding; hover fills graphite with white text (150ms). Primary booking CTA
may use drafting-blue border/fill instead.

## Avoid
Warm tints in UI (photography provides warmth), rounded corners, shadows,
serif anywhere, decorative icons. No parallax.
