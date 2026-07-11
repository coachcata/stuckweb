# SPEC 05 — THE WHITEBOARD
Folder: redesigns/05-whiteboard/

## Thesis
One continuous thinking session: the whole site is a single board being
worked, from the first word to the solution. The signature line is the
literal architecture: thinking → board → solution, top to bottom.

## Structure (differs from the other four)
ONE page: index.html. The full site content flows as a single session with
anchored sections. Order:
  1. The first word        (premise hero)
  2. The problem           (the argument)
  3. The practice          (what a session is + signature line)
  4. What gets resolved    (three altitudes)
  5. In their words        (testimonial)
  6. Three contexts        (LeadStrong / BuildStrong / TeamStrong, each a
     substantial sub-section carrying its programme page's core copy:
     problem lede, the work, its quotes where they exist, its CTA)
  7. The practitioner      (about John: two careers, credentials, clients,
     how I work, fuller story link)
  8. In practice           (the seven lessons + the people series)
  9. Going further         (the argument + vignettes)
  10. The solution         (contact: booking CTA + form)
Nav is a fixed rail of anchor links (session agenda). Keep every section's
copy from the content pack; trims allowed where flow demands, meaning never.

## Atmosphere
Standing at a good whiteboard in a quiet room with a strong thinking
partner. Warm white, marker charcoal, one marker colour. Restrained: this
concept fails instantly if it becomes a cartoon. No comic fonts, no clip
art, no post-it yellows.

## Palette (tokens)
--board: #FAFAF7        (whiteboard white, slightly warm)
--board-shade: #F1F1EC  (worked areas, panels)
--marker: #26282B       (charcoal marker, primary text)
--marker-faded: #6F7276 (dry-marker grey, secondary)
--line: #E3E3DD
--marker-blue: #1F4E8C  (the one marker colour: strokes, underlines, links,
                         active states; a serious deep board-marker blue)

## Type
- Instrument Sans (variable): body and UI. 400-500, 1.02rem, line-height
  1.65, max 62ch. Headings 550-600 weight, tight tracking.
- Instrument Serif (italic especially): the "words written on the board":
  section opening words, pull lines, the signature line, codas. Used at
  display sizes: clamp(2rem, 6vw, 4.2rem). Its slightly penned character
  reads hand-adjacent while staying typeset and credible.

## Signature devices
- Marker strokes: hand-drawn-feel SVG paths (rough single-stroke underlines,
  circles around a key word, connector arrows between sections) in
  --marker-blue, drawn with stroke-dashoffset animation as they enter the
  viewport (600-900ms, ease-out, once). Build 4-6 reusable SVG strokes
  (underline, double underline, circle, arrow-down, asterisk, box) with
  slightly irregular paths (2-3px waver, round linecaps, stroke-width
  4-6px). These are the ONLY hand elements.
- The session starts: hero is the drill-landscape video in a thin
  board-tray frame (1px --line, small radius 6px), label "The session
  starts with one word." and a huge Instrument Serif word "Stuck." that
  gets a blue marker strike-through drawn through it as you begin to
  scroll, replaced visually by "Thinking." (two stacked words; the strike
  animates on scroll progress via IntersectionObserver, no scroll-jack).
- Session agenda rail: fixed left rail on desktop (right-edge dots on
  mobile): numbered agenda items 01-10 in small tracked caps; the active
  item gets a small blue marker tick (SVG). Smooth-scrolls on click.
- Section headings: a small caps kicker ("AGENDA 04 · WHAT GETS RESOLVED")
  + an Instrument Serif line, one word or phrase of which carries a drawn
  blue underline or circle.
- The three altitudes: drawn as a board list: three items with hand-drawn
  SVG bullet asterisks and a drawn arrow connecting to the close line.
- Programmes: three board panels (--board-shade cards, 6px radius, 1px
  line) each headed by the programme name with a drawn underline in blue;
  inside, the programme copy in typeset text. Each panel closes with its
  own CTA link.
- Client logos: pinned reference row: small, grayscale, 60% opacity.
- Lessons (in practice): the board's margin notes: each lesson a numbered
  line; expands INLINE (accordion, 250ms height ease + fade) with body and
  coda; coda set in Instrument Serif italic with a short blue end-stroke.
- Videos: board-tray frames as the hero; captions beneath in small caps.
- The solution (contact): the board's bottom-right corner energy: a boxed
  (drawn SVG box) conclusion: "Let's get an hour in the diary." + booking
  button + the form. The final element of the page: the signature line set
  in Instrument Serif with "solution" circled in blue, then the fine print.
- A subtle progress affordance: the agenda rail doubles as it; no extra bar.

## Layout system
Single column, 720px text measure, panels to 1080px; the rail occupies a
90px gutter on desktop (collapses on <900px to a slim bottom-edge or
hamburger agenda). Section spacing 130-180px. Occasional deliberate
asymmetry: pull a serif board-word into the left margin.

## Motion
Stroke draw-ins (the identity), gentle 300ms fades for text blocks,
accordion ease. Nothing else. Reduced-motion: strokes render fully drawn
instantly.

## Buttons
Rounded-rectangle 8px, 1.5px --marker border, board background, marker
text; primary booking CTA inverts to --marker fill with board text on
hover; a small drawn blue underline sits beneath the primary CTA's label.

## Avoid
Handwriting body fonts, post-it/sticker/tape skeuomorphism, marker texture
images, rotation on text blocks, more than one marker colour, whimsy in
copy. The drawings assist reading; they never decorate for its own sake.
