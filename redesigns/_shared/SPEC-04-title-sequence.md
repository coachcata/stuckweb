# SPEC 04 — THE TITLE SEQUENCE
Folder: redesigns/04-title-sequence/

## Thesis
A film's opening titles: dark, cinematic, scroll-driven scenes. The visitor
does not browse a page; they watch a sequence they control with their thumb.

## Atmosphere
Projection-room dark. Patient. Confident enough to show six words at a time.
Prestige-drama titles, not trailer bombast: think slow fades and holds, not
impact cuts.

## Differentiation guard (important)
The live site is also dark. This concept must NOT read as a variation of it:
no Cormorant, no DM Sans, no cognac/amber accent, no warm greys. Cool
neutral darkness, letterboxing, and sequence pacing are the identity.

## Palette (tokens)
--black: #0B0B0C        (true screen black, page)
--charcoal: #141416     (panels)
--silver: #E8E8EA       (primary text, slightly cool)
--mist: #8E8F94         (secondary text)
--line: rgba(232,232,234,0.14)
Accent: none. White light on black is the whole palette. (If one is ever
needed for focus states use --silver.)

## Type
- Marcellus: titles and headings ONLY, generously tracked (+0.04 to +0.12em),
  often uppercase for card titles, sized clamp(1.8rem, 5vw, 3.6rem). Roman
  inscription calm, not Trajan-movie-poster shouting: keep sizes moderate
  and let space do the work.
- Manrope (variable): body, navigation, captions. Body 300-400, 1.0-1.1rem,
  line-height 1.7, max 60ch, --silver at 90% for long text. Small caps-style
  tracked labels at 11-12px for kickers ("SCENE 02", "IN THEIR WORDS").

## Signature devices
- Letterboxing: full-bleed video scenes sit inside a frame with black bars
  implied by aspect (use aspect-ratio 2.39/1 on desktop heroes where the
  footage allows, 16/9 fallback) and a very subtle top+bottom 1px --line.
  Videos are graded darker via a black overlay (linear-gradient or rgba
  0.35-0.5) so silver type always reads.
- Scroll-driven title cards: on index, each scene opens with a centred title
  card (kicker + Marcellus line) that fades/tracks-in as it enters the
  viewport (IntersectionObserver adding a class; CSS transitions 900ms
  opacity, 1200ms letter-spacing from +0.3em settling to final). Body copy
  follows as quiet paragraphs. Cards hold; nothing autoplays past the reader.
- Index opening: drill-landscape.mp4 full viewport (100svh), the two-line
  premise quote fading in over it in sequence ("The first word goes on the
  board." … hold … "Everything that matters happens after that."), then the
  orient line small at the bottom with a scroll cue (thin vertical line that
  breathes, 2s ease-in-out, opacity only).
- A progress element: a thin (2px) --silver bar at the very top of the
  viewport showing scroll progress through the page. The only chrome that
  moves constantly.
- Nav: hidden until needed. A minimal fixed top bar: wordmark left
  ("CATALYST GROWTH COACHING", Manrope tracked, small), a "MENU" text
  button right; menu opens as a full-screen black overlay with the pages
  listed as credits (Marcellus, large, centred, staggered fade-in), close ×.
  Same on mobile and desktop.
- The programmes on index: a credits-style block: "THE PROGRAMMES" kicker,
  then three rows, each a Marcellus title (LEADSTRONG) with a Manrope
  description line beneath, ruled by --line, whole row links; hover: row
  text brightens from mist to silver, 250ms.
- Testimonial: presented as a review card: the quote in larger Manrope
  light with the attribution in tracked caps beneath, centred, on --black
  with the img-1739 photo as a darkened backdrop panel (charcoal section,
  image at 40% opacity behind, or side-by-side on desktop).
- Programme pages: open on the programme's still image, letterboxed and
  darkened, with the eyebrow as kicker and the H1 as the main title card;
  the body then runs as scenes with kickers (THE PROBLEM / THE WORK / THE
  LENSES / THE INVITATION). The lenses as three numbered cards on charcoal.
- In Practice lessons: "SEVEN LESSONS" as an episode list: numbered rows;
  opening one plays it as an interstitial: full-screen black overlay, the
  lesson title as a title card, body in a centred readable column, coda
  styled as a closing card (italic Manrope, mist). Escape/× closes.
- Contact: the final card. Near-empty black screen: "Let's get an hour in
  the diary." in Marcellus, the lede in Manrope, the booking button, then
  the form further down on charcoal. End the page with a proper end card:
  the brand wordmark centred and "London · Est. 2024" beneath, like a
  production credit.
- Footer everywhere else: minimal credit strip (single row, small tracked
  links, --line rule above).

## Layout system
Centred, single-column narrative, max 720px for text; video/image scenes
full-bleed. Section spacing 140-200px desktop. Generous 100svh usage on
heroes only; interior scenes size to content.

## Motion rules
All motion is opacity/transform, slow (600-1200ms), ease-out, once per
element. Letter-spacing settle only on title cards. Video overlay gradients
static. Reduced-motion: everything appears instantly, videos still play
(they are content), progress bar stays.

## Buttons
One style: 1px --line border, transparent, silver tracked-caps label,
generous padding; hover: background --silver, text --black, 250ms. Used
only for booking CTAs; everything else is text links.

## Avoid
Amber/warm tones, glows, lens-flare gradients, parallax zoom on stills
(Ken Burns is banned), autoplaying scroll-jacking (the user's scroll is
never hijacked), sound of any kind.
