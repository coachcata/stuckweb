# SPEC 03 — THE QUIET GALLERY
Folder: redesigns/03-quiet-gallery/

## Thesis
A private gallery hang: each idea given a wall of its own. The visitor walks
rooms at their own pace; the work is lit, captioned and never crowded.

## Atmosphere
Hushed, spacious, slow. More whitespace than any of the other four. Reading
it should feel like being alone in a good museum ten minutes before closing.

## Palette (tokens)
--wall: #F4F2EE         (gallery wall, main background)
--wall-shadow: #E9E6E0  (recessed panels)
--stone: #2E2C29        (primary text, soft near-black)
--plinth: #8B867E       (secondary text, captions)
--thread: #D8D4CC       (the faintest rules)
NO accent colour at all. Emphasis is achieved with scale, space and italics
only. Links are stone with a 1px underline offset low; hover deepens to
black. This restraint is the concept; hold it.

## Type
- EB Garamond (variable): display and body. Display light-to-regular
  (400-500), large but airy: clamp(2rem, 5.5vw, 4rem), line-height 1.15,
  centred where the composition is centred. Body 400, 1.1rem, line-height
  1.75, max 58ch. Italic for every emphasis.
- Public Sans (variable, light 300/regular 400): museum labels, captions,
  nav, wayfinding. 11-13px, uppercase tracked +0.14em for labels; sentence
  case for caption bodies.

## Signature devices
- Wayfinding: every page is a ROOM. Header (top, minimal, not sticky... a
  slim sticky bar is allowed if nearly invisible): "CATALYST GROWTH
  COACHING" centred small caps, nav as tracked small links either side or
  beneath. Each page opens with "ROOM I" / "ROOM II" etc. (Public Sans
  tracked) + the room's name in Garamond beneath.
- One idea per wall: sections are full-viewport-height (min-height 92vh,
  content centred both axes) with generous max-widths. The visitor scrolls
  from wall to wall.
- Works: each image/video is hung, i.e. centred, contained (never full
  bleed), sized around 60-75% of the viewport width on desktop, with a
  museum label card beside or below: a small left-aligned block with title
  line (Public Sans caps), medium line in italic Garamond ("Whiteboard
  Session, May 2026"), and one-line description. A faint 2-3px vertical
  offset shadow, at most, may lift the work off the wall (rgba stone at 6%).
- Long copy sections are set as wall texts: centred column, Garamond,
  with the section's first line rendered as a slightly larger standfirst.
- The signature line gets its own wall on index: nothing but the sentence,
  large Garamond italic, centred, with a small caps label "THE PRACTICE"
  above it.
- The testimonial is a single vitrine: recessed --wall-shadow panel,
  generous padding, the quote in Garamond with the attribution as a museum
  label beneath.
- Programme tiles on index: three hung photographs in a row (stacked on
  mobile), each with a label card; the whole work is the link.
- In Practice: lessons are the catalogue. Each lesson: numbered entry
  (Roman numerals, Public Sans) with title and preview; opens as a modal
  LIGHTBOX: wall-coloured overlay at 96% opacity, text centred column,
  close × top right, Escape closes. Reading a lesson should feel like
  stepping close to a piece.
- Client logos (about): "LENDERS TO THE COLLECTION" style treatment is
  wrong; keep the real heading. Render logos small, grayscale, opacity .55,
  generously spaced in a loose centred cluster, not a grid with borders.
- Footer: a closing wall: centred brand, tag line in italic, then a single
  row of small links, then fine print. Lots of air.

## Layout system
Centred axis almost everywhere. Max content width 680px for text, 1100px
for works. Vertical space is the main material: 160-220px between walls on
desktop, 96px mobile. No visible grid, no columns.

## Motion
- Slow fades only: works and wall texts fade in (opacity 0→1, 700ms,
  ease-out, translate 8px max) once on entry. Stagger labels 150ms after
  works.
- Optional: a very gentle parallax on hung works (max 12px drift) IF it
  passes reduced-motion and feels museum-calm; drop it if in doubt.
- Hover on works: none, or a 400ms deepening of the shadow. Links underline.

## Buttons
No buttons. CTAs are set as an invitation card: a centred bordered card
(1px --thread) with tracked caps label "THE INVITATION", the lede in
Garamond, and the booking link as a tracked small-caps underlined line
"BOOK A WHITEBOARD SESSION". Quiet, engraved-invitation energy.

## Avoid
Any accent colour, bold weights above 500, full-bleed imagery, dark
sections, fast motion, drop shadows beyond the whisper allowed above.
