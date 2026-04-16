# Catalyst Growth Coaching — Site & Portal Status Document

**Last updated:** April 2026  
**Prepared for:** Ongoing Claude development sessions  
**Owner:** John Obidipe — Catalyst Growth Coaching  
**Live domain:** https://www.catalystgrowthcoach.co.uk  
**Repository:** coachcata/stuckweb  
**Active dev branch:** `claude/monthly-changes-summary-oXQce`

---

## 1. What This Site Is

A high-end coaching website for **John Obidipe**, executive/leadership coach trading as **Catalyst Growth Coaching**. Target audience is senior leaders, VPs, founders, and C-suite executives in the UK who are "stuck" — experiencing leadership plateaus, team dysfunction, burnout, or strategic friction.

The site serves two audiences:
- **Individual leaders** buying 1:1 or team coaching programmes (B2C)
- **Organisations** buying a scalable Leadership Practice Portal for their leadership bench (B2B)

Brand voice: sophisticated, neuroscience-backed, direct. No fluff. Dark luxury design aesthetic with Cormorant Garamond (display) + DM Sans (body), dark background `#0C0C0E`, copper accent `#C8956C`.

---

## 2. Site Architecture

### File Structure

The repository has two near-identical copies of all pages:

| Location | Purpose |
|---|---|
| `/` (root) | Source / working copies |
| `/site/` | Deployed copies (what the live site serves) |

**Important:** Changes must be applied to **both** root and `site/` versions, or the live site won't reflect the edit. This has caused bugs before (e.g. TeamStrong copy was updated in root but `site/teamstrong.html` was missed).

**Exception:** `for-organisations.html` only exists in the root. It has **not yet been added to `site/`** — meaning it is likely not yet live on the deployed site.

### All Pages

| File | Title / Purpose | In site/? |
|---|---|---|
| `index.html` | Homepage — "I Get Leaders Unstuck" | Yes |
| `about.html` | About John | Yes |
| `leadstrong.html` | LeadStrong service (1:1 coaching, £3,200) | Yes |
| `buildstrong.html` | BuildStrong service (founders, from £600/mo) | Yes |
| `cognitive-reset.html` | Cognitive Reset service (intensive, from £1,300) | Yes |
| `teamstrong.html` | TeamStrong service (team coaching, 12-week) | Yes |
| `testimonials.html` | Client results / testimonials | Yes |
| `contact.html` | Contact page | Yes |
| `stuck-quiz.html` | 8-question diagnostic quiz | Yes |
| `for-organisations.html` | B2B — Leadership Practice Portal landing page | **NO** |

---

## 3. Services & Pricing

| Service | Audience | Price | Duration |
|---|---|---|---|
| **LeadStrong** | Senior leaders, VPs, C-suite | £3,200 | 12 weeks |
| **BuildStrong** | Founders / business owners | From £600/month | Ongoing |
| **Cognitive Reset** | Any leader needing fast shift | From £1,300 | 1–3 day intensive |
| **TeamStrong** | Teams (5–25 people) | Contact for pricing | 12 weeks |
| **Leadership Practice Portal** | Organisations (B2B) | Not yet published | Ongoing |

---

## 4. Page-by-Page Summary

### index.html (Homepage)

Sections in order:
1. **Hero** — "I Get Leaders Unstuck" + 3 proof points (90% Fortune 500 use CliftonStrengths, 3-month avg shift, evidence-based)
2. **Problem** — "Most Senior Leaders Are Stuck in Ways They Won't Admit" — neuroscience framing (amygdala vs prefrontal cortex)
3. **Logo bar** — Client companies (Lexus, Toyota, Convatec, Arrow Planning, Next Energy Capital, New Socks)
4. **ICP Selector + Video** — 4 clickable service cards (LeadStrong / BuildStrong / Cognitive Reset / TeamStrong) + embedded YouTube video (ID: QZPBDdQJ7Go)
5. **Atmospheric image** — City skyline placeholder
6. **Cost Section** — "What's It Costing You?" — 4 cost cards (Credibility, Opportunities, Mental Energy, Team Confidence)
7. **Four Stuck Patterns** — Pattern 01: Stuck in Thinking / 02: Stuck in Outputting / 03: Stuck in Relating / 04: Stuck in Moving
8. **Method: PAUSE → RESET → GO** — Phase 1: Pause (diagnose), Phase 2: Reset (retrain), Phase 3: Go (new patterns)
9. **Leadership Practice Portal callout** — B2B callout above services grid, links to for-organisations.html
10. **Services grid** — All 4 services with pricing
11. **Quiz CTA** — "Take the Stuck Quiz" → stuck-quiz.html
12. **Testimonials** — 3 client quotes
13. **Why Different** — 3 cards (Frameworks, Psychology, Outside the System)
14. **Assessment Tools** — CliftonStrengths, FITT16, Amygdala-PFC Assessment
15. **Final CTA** — Tag cloud of stuck states + closing question

### for-organisations.html (B2B Landing Page)

The newest and most important page for business development. Sections:

1. **Hero** — "Develop the Leaders You Can't Afford to Lose" — targets L&D Directors, CHROs, CEOs
2. **The Problem** — "You Already Know Who's Stuck" — promote too early = failure, hold back = lose to competitors
3. **Why It Works** — 3 pillars: Practice (165 scenarios), Initiative (no right answers), Exposure (senior mindset)
4. **Inside the Portal** — 90 Scenarios + 45 Challenges + 30 Pressure Map scenarios; tiered by seniority, updated weekly
5. **How It Works** — Two delivery models: Self-Serve (portal only, 5–25 leaders) vs Blended (portal + 1:1 coaching from John)
6. **Fit Check** — Qualified buyer signals vs disqualifiers
7. **Demo Form** (#demo, id="fo-form") — Name, work email, organisation, number of leaders → reveals demo video on submit
8. **FAQ** — 6 expandable questions about time commitment, customisation, measurement, self-serve vs coached
9. **Final CTA** — "Develop Them Before Someone Else Does"

### teamstrong.html

12-week team coaching programme. Key structural detail:

- **Phase 1 (Weeks 1–4): Reconnection & Synergy**
  - CliftonStrengths assessment for every team member
  - 1:1 coaching for each member (60 mins) — Weeks 1–3
  - Full-day Experience Day off-site — Week 4:
    - Morning: workshop (strengths mapping, friction naming, shared OS)
    - Lunch: TOCA Social
    - Afternoon: Activate at The O2
  - All venue costs included in programme fee
- **Phase 2 (Weeks 5–12): Sustained Connection**
  - 4× bi-weekly group coaching sessions (90 mins each)
  - Real-time friction resolution, pattern embedding

Pricing: Contact for pricing (tailored to team size).

**Pending:** TODO comment in code — John needs to add Experience Day imagery (The O2 exterior, TOCA Social interior, Activate at The O2 game room) near the Week 4 section.

### Other Pages (stable, no known issues)

- **about.html** — John's background, credentials, coaching philosophy
- **leadstrong.html** — Detailed LeadStrong programme breakdown
- **buildstrong.html** — BuildStrong for founders
- **cognitive-reset.html** — Intensive 1–3 day reset programme
- **testimonials.html** — Client results and quotes
- **contact.html** — Contact form (status of form backend not confirmed)
- **stuck-quiz.html** — 8-question diagnostic quiz, stripped-down nav (intentional)

---

## 5. Navigation Structure

**Primary nav (all main pages):**
- Logo → index.html
- Services dropdown → LeadStrong, BuildStrong, Cognitive Reset, TeamStrong
- For Organisations → for-organisations.html
- About → about.html
- Results → testimonials.html
- CTA button: "Get Unstuck" → contact.html

**Footer links (all pages):**
- LeadStrong, BuildStrong, Cognitive Reset, TeamStrong, About, Contact
- © 2026 John Obidipe · Catalyst Growth Coaching · coach@catalystgrowthcoach.co.uk

**stuck-quiz.html** has a deliberately stripped-back nav (quiz-focused UX) — do not add the full nav to this page.

---

## 6. Design System

All pages share a single inline `<style>` block (no external CSS file). Key tokens:

| Token | Value |
|---|---|
| Background | `#0C0C0E` |
| Surface | `#141416` |
| Border | `#2A2A2E` |
| Text primary | `#F5F0EB` |
| Text muted | `#8A8490` |
| Copper accent | `#C8956C` |
| Copper dark | `#A0734E` |
| Display font | Cormorant Garamond (Google Fonts) |
| Body font | DM Sans (Google Fonts) |

**Layout conventions:**
- `.section-full` — full-width section
- `.container` — max-width centred wrapper
- `.grid-2-asym` — asymmetric 2-column grid
- `.signal-card` — bordered card with label/title/body pattern
- `.overline` — small uppercase label above section headings
- Scroll-reveal animations via Intersection Observer (class `.reveal`, triggers `.visible`)
- Mobile hamburger menu with staggered open animation

---

## 7. Tech Stack

**Frontend only** — no backend exists.

| Concern | Solution |
|---|---|
| HTML/CSS/JS | Vanilla, inline styles, no frameworks |
| Fonts | Google Fonts (Cormorant Garamond + DM Sans) |
| Analytics | Google Analytics 4 — ID: `G-2Z17HSYFCV` |
| Video (homepage) | YouTube embed — ID: `QZPBDdQJ7Go` |
| Schema markup | JSON-LD on index, for-organisations, teamstrong |
| Favicon | SVG + PNG fallback + apple-touch-icon (180×180) |
| Forms | Client-side only — **no backend integration yet** |
| Hosting | Unknown (catalystgrowthcoach.co.uk — external host) |

No npm, no build tools, no package.json. All code is static HTML files.

---

## 8. Outstanding TODOs & Known Issues

### Blocking Issues

| # | File | Issue | Priority |
|---|---|---|---|
| 1 | `for-organisations.html` | Demo form non-functional — collects data but sends nothing. Needs Formspree / Mailchimp / HubSpot integration | HIGH |
| 2 | `for-organisations.html` | Demo video has empty `src` attribute — video not yet uploaded/hosted | HIGH |
| 3 | `for-organisations.html` | Page missing from `site/` directory — likely not live on deployed site | HIGH |

### Content / Asset TODOs

| # | File | Issue |
|---|---|---|
| 4 | `teamstrong.html` (both copies) | TODO: John to add Experience Day imagery near Week 4 section (The O2 exterior, TOCA Social interior, Activate at The O2 game room) |
| 5 | All pages | `/images/og-image.jpg` referenced in Open Graph meta tags — existence not confirmed |

### SEO Issues

| # | Issue |
|---|---|
| 6 | `for-organisations.html` not in `sitemap.xml` — invisible to search engines |
| 7 | Sitemap uses paths without `.html` extension (`/about`, `/leadstrong`) — check if server handles this correctly |

### Structural Issues

| # | Issue |
|---|---|
| 8 | Dual directory structure (`/` and `/site/`) requires every change to be applied twice. No automated sync. Error-prone. |
| 9 | `contact.html` form backend status unknown — not confirmed whether form submissions are received |

---

## 9. Recent Changes (Last Month — March–April 2026)

- **TeamStrong copy rewrite** — new phase structure (Weeks 1–4 / 5–12), corrected session counts, new positioning copy
- **TeamStrong Experience Day** — added full O2 narrative (TOCA Social + Activate at The O2) to Phase 1 card and What's Included list
- **Favicon** — added starburst SVG favicon across all 19 HTML files; added PNG fallback + apple-touch-icon for Safari/iOS
- **For Organisations page** — created full B2B landing page (`for-organisations.html`) targeting L&D Directors, CHROs, CEOs
- **Homepage rebuild** — replaced placeholder with full dark-brand homepage including Leadership Practice Portal callout
- **Nav update** — "For Organisations" link added to all 8 main pages (desktop + mobile)
- **Initial site upload** — full `site/` directory uploaded to repo as deployment baseline

---

## 10. Suggested Next Development Priorities

Based on current state, the most impactful next steps would be:

1. **Wire up the demo form** on `for-organisations.html` — integrate Formspree (simplest, no backend needed) or preferred email service so leads are captured
2. **Add the demo video** — host the 4-minute walkthrough video and add the src to the `<video>` element
3. **Deploy `for-organisations.html` to `site/`** — copy the file into the `site/` directory so it goes live
4. **Add `for-organisations` to sitemap.xml** — both root and `site/` versions
5. **Experience Day imagery** — add photos of The O2 / TOCA Social / Activate to the TeamStrong page when John supplies them
6. **Confirm contact form** — verify `contact.html` form is wired and submissions are being received
7. **Resolve dual-directory structure** — consider whether to automate syncing or consolidate into a single source of truth

---

## 11. Key Content Principles (for future copy)

- **Framework:** PAUSE → RESET → GO (the core coaching method)
- **Neuroscience framing:** Amygdala vs Prefrontal Cortex — leaders get stuck when amygdala hijacks PFC
- **Four stuck patterns:** Thinking / Outputting / Relating / Moving
- **Three diagnostics used:** CliftonStrengths, FITT16, Amygdala-PFC Assessment
- **Tone:** Direct, premium, evidence-based. No clichés. No generic motivational language.
- **Target individual buyer:** Senior leader, VP, or founder, UK-based, 35–55, high-functioning but plateaued
- **Target org buyer:** L&D Director, CHRO, or CEO at company with 5–25 high-potential Directors/VPs
- **Price positioning:** Premium but justified. Not cheap. Not apologetic about cost.
