# CANONICAL CONTENT PACK — Catalyst Growth Coaching

This is the single source of truth for all five design recreations. The copy
below is carried from the live site with one systematic change: every em dash
has been rewritten (commas, colons, semicolons or split sentences). Do not
reintroduce em dashes anywhere, including in HTML comments, alt text, captions
and meta descriptions. En dashes in ranges (Weeks 1–4) are allowed.

Voice rules (locked): British English. No hype words (unleash, transform,
empower, unlock, amazing, game-changing). No "here's the thing" or variants.
Flowing, connected sentences. The senior leader is the hero; John is the
invisible thinking partner. Client quotes are verbatim (the word
"transformative" inside Ralph Shorthose's quote is his own wording and stays).

Italics in the source are marked *like this*; each design may honour or
restyle emphasis in its own idiom, and may lightly trim or re-break copy where
the layout genuinely needs it, but meaning, claims and voice must not change.
Do not invent testimonials, statistics, client names or credentials.

## Global

- Brand: **Catalyst** Growth Coaching (brand renders as two words/lines:
  "Catalyst" + "Growth Coaching")
- Site name for meta: John Obidipe | Catalyst Growth Coaching
- Footer tag: "No need to get stuck."
- Footer fine print: "© Catalyst Growth Coaching, London · Est. 2024"
- Footer signoff: "Don't get stuck."
- Booking URL (the ONLY booking link, opens in new tab):
  https://portal.catalystgrowthcoach.co.uk/public/appointment-scheduler/6045bde2cbf031000aba1a55/schedule
- Email: coach@catalystgrowthcoach.co.uk
- LinkedIn profile: https://www.linkedin.com/in/johnobidipe
- Fuller story external link: https://www.johnob1.co.uk
- Signature line (must appear on the homepage and may recur):
  "Your thinking, out of your head, onto the board, into a solution."
- No analytics snippet in these demos (deliberate: keeps demo traffic out of
  the live site's GA property).

### Navigation (every page)
Brand → index.html · About → about.html · Programmes (LeadStrong →
leadstrong.html, BuildStrong → buildstrong.html, TeamStrong → teamstrong.html)
· In Practice → in-practice.html · Contact (CTA) → contact.html
Going Further (going-further.html) is reachable from the footer and from each
programme page's closing link, not the top nav.

### Footer (every page)
Brand + tag, then:
- Programmes: LeadStrong / BuildStrong / TeamStrong
- Read: About John / In Practice / Going Further / Contact
- Fine print + signoff as above.

### Videos (living photos, never players)
Attributes always: `autoplay muted loop playsinline preload="metadata"`,
no controls, with aria-label. Files available:
- drill-landscape.mp4 (2.3MB) · "John writing the first word on the whiteboard"
- session-wide.mp4 (2.2MB) · "Wide view of a whiteboard session in progress"
- session-client-writing.mp4 (3.6MB) · "A client writing on the whiteboard while John watches"
- ember-laughter.mp4 (4.7MB) · "John and a client at the whiteboard, conversation ending in laughter"
- tablet-annotation.mp4 (1.8MB, portrait) · "John alone, annotating a tablet with a stylus in an atrium"
- drill-portrait.mp4 (0.9MB, portrait 9:16) · "John at the whiteboard mid-session, mapping a strategic mind-map"

### Photos
- img-1739.jpg · John and a client in a hospitality lounge, mid-conversation (testimonial)
- img-1983.jpg (2000×923 wide) · wall whiteboard session with a corporate leader (LeadStrong)
- img-1935.jpg (16:9) · hospitality whiteboard session with a business owner (BuildStrong)
- img-1981.jpg (2000×923 wide) · two people working together at a wall whiteboard (TeamStrong)
- img-1985.jpg · John and a client at a glass-wall whiteboard, mid-session, board content obscured for confidentiality (About)
- fsr.jpg (2000×1125) · John seated with a laptop while a client reads the whiteboard (LeadStrong, The Work)
- img-1989.jpg (16:9) · a team mapping project oversight, squad leadership and delegation at the whiteboard (BuildStrong, The Work)
- img-1987.jpg (16:9) · a small group session in a skylit room, two clients working alongside John at the shared screen (TeamStrong, The Work)
- img-1988.jpg (16:9) · a small group session in a skylit workshop room with whiteboard wall and shared screen (In Practice hero)
- img-1984.jpg (2000×1143) · a wide skylit room with a long whiteboard mind-map (Going Further hero)
- img-1986.jpg (16:9) · John and a client close-in at a populated wall whiteboard, working through arrows and notes (Going Further)

### Client logos (About page, /images/logos/)
toyota.png, lexus.png, convatec.png, cambridge-up.png, autoglass.png,
oxford.png, new-socks.png, arrow-planning.png, nextenergy.png
(dark source marks; the live site renders them white with
`filter: brightness(0) invert(1)`; on light designs use them as-is or
`grayscale(1) opacity(.7)`.)

---

# PAGE: index.html
Title: Catalyst Growth Coaching — use "Catalyst Growth Coaching | Strategic Thinking Partnership" (avoid the em dash in title; use a pipe or comma)
Meta description: "Your thinking, out of your head, onto the board, into a solution. The Whiteboard Sessions for senior leaders, founders and teams."

## Scene 01 · The Premise  [video: drill-landscape.mp4]
Label: Catalyst Growth Coaching
Orient line: Strategic thinking, out loud, at a whiteboard. Another mind in the room with you. For senior leaders.
Display quote:
  "The first word goes on the board."
  "Everything that matters happens after that."

## Scene 02 · The Argument
Lede: Nothing in your week is designed for thinking.
Body:
  Meetings are designed for decisions. Email is designed for response. The calendar is designed for time-blocking. Your assistant is designed for protection.
  Every system around you is optimising for output. None of them are optimising for *thought*.
  The result: you make decisions in the cracks. You arrive at the most important meeting of your quarter without having actually sat with the question. You leave the most expensive moments of your week to be navigated by reflex.
Punchline: Whiteboard Sessions are the thing the rest of your week is incompatible with.

## Scene 03 · The Practice  [video: session-wide.mp4, caption "Whiteboard Session · May 2026"]
Heading: A Whiteboard Session is what it *sounds* like, with one thing the name doesn't tell you. You're not thinking alone.
Body:
  You arrive. The board is empty. We start with whatever's actually live for you, and we think it through together, out loud, until it's clear. I'm not there to watch you work. I'm the other mind in the room, asking the question you'd stopped asking, catching the thing you've gone blind to because you see it every day.
  Sometimes that takes an hour. Sometimes three. The work is finished when the question is answered, when the next move is clear, the decision made.
Signature line (emphasised): Your thinking, out of your head, onto the board, into a solution.

## Scene 04 · What Gets Resolved  [video: session-client-writing.mp4, caption "Whiteboard Session · April 2026"]
Heading: Three things, *mostly*.
Items:
  1. *The strategic question you've been carrying without having sat with.* The thing you keep meaning to think about but haven't.
  2. *The mid-altitude problem that's stuck.* Where the system is producing the wrong output and you can't see where the leverage is.
  3. *The tactical decision you've been over-thinking.* Where you know what to do but haven't given yourself permission to do it.
Close: These are the three altitudes. Most weeks have at least one of them building up. We find which one needs the work, and we think it through together.

## Scene 05 · In Their Words  [image: img-1739.jpg]
Quote (verbatim, em dashes rewritten):
  What can I say about the work John has done with us today at Arrow Planning. He's just delivered a fantastic coaching session with the team. We've been working through some genuinely difficult subjects, and he's presented them in a way that's allowed everybody to engage properly with these difficult matters.
  It takes a real *weight* off my shoulders. The pressure and expectation isn't solely on me. I'm not standing there having to find a way through these problems alone. John leads me through them, then comes in and helps me actually activate them within the team, creating solutions that set the standard for the future.
  Thanks, John.
Attribution: Mark Schmull, MD, Arrow Planning

## Scene 06 · The Programmes  [id="programmes"]
Heading: Three contexts. Same *practice*.
Tiles:
  - LeadStrong [img-1983.jpg]: For directors, VPs, and executives navigating the corporate altitude. → leadstrong.html
  - BuildStrong [img-1935.jpg]: For founders, MDs, and owners building the business itself. → buildstrong.html
  - TeamStrong [img-1981.jpg]: For the leader and the team, working together over twelve weeks. → teamstrong.html
Tile CTA text: Learn more

## Scene 07 · The Invitation  [video: ember-laughter.mp4]
Lede: The fastest way to know if this is for you is to be at the board for an hour.
Sub: You'll know whether the practice fits you.
CTA: Book a Whiteboard Session → contact.html

---

# PAGE: about.html
Title: About John Obidipe | Catalyst Growth Coaching
Meta description: "Executive coach, strategy and change consultant. 15+ years working with senior leaders. The person at the other end of the whiteboard."

## Scene 01 · The Practitioner  [video: tablet-annotation.mp4, portrait]
Label: The Practitioner · John Obidipe
H1: John.
Lede: Executive coach. Strategy and change consultant. Sits at the other end of the whiteboard.

## Scene 02 · Two Careers, One Practice  [image: img-1985.jpg]
Body:
  For over a decade I consulted to organisations on change, business architecture, and strategy. That's where the organisational instinct comes from.
  Alongside and after that, I trained as an executive coach and built a practice with senior leaders, directors, VPs, and founders. That's where the people-side instinct comes from: how high-performing leaders behave under pressure, where their patterns trip them up, what changes when the right question gets asked at the right moment.
Punchline: The Whiteboard Sessions are what happens when those two careers sit at the same board.

## Scene 03 · At the Board  [video: session-wide.mp4]
Heading: I sit at a board with senior leaders and we *think*.
Body:
  The board makes the thinking visible. It externalises what would otherwise stay in your head. You can see the connections, the gaps, the place the argument breaks. You can move the pieces around and watch what changes.
  Most weeks, the leaders I work with don't get an hour to think this way. The session is where they do.

## Scene 04 · The Credentials
Heading: What's behind the *work*.
  i. Gallup-certified CliftonStrengths coach — detail: The most-used talent assessment in the world, used by 90%+ of the Fortune 500.
  ii. FITT16 practitioner — detail: Uses the 16-archetype model derived from CliftonStrengths in coaching engagements.
  iii. 15+ years with senior leaders — detail: Organisational consulting and executive coaching across plc, private and entrepreneurial contexts.
  iv. Multi-year retained relationships — detail: Clients across industries and countries. See selected clients below.
(The "—" above is list formatting in this pack only; render as layout, never as an em dash in copy.)

## Scene 05 · Selected Clients
Heading: Organisations and leaders worked with.
Logos: Toyota, Lexus, Convatec, Cambridge University Press, Autoglass, University of Oxford, New Socks, Arrow Planning, NextEnergy Capital
Line: *Individual leaders coached from* AWS, Bassett Mechanical, Volkswagen Financial Services, Nexans, among others, across industries and countries.

## Scene 06 · How I Work  [video: drill-portrait.mp4, portrait inset]
Heading: Three things to *know*.
  i. Mixed questions, asked directly. Reflective when the moment calls for it. Practical when there's a real problem to solve. Obvious when no one else is willing to ask. The work is done in the room, through to a solution. Not in questions you take away.
  ii. I'll tell you when I think you're the problem. Not bluntly. Not unkindly. But I won't pretend not to see it, because that's the most expensive thing a coach can do.
  iii. Long-term by default. The clients who get the most from this work tend to stay for years. Not because they're stuck. Because the thinking partnership compounds.

## Scene 07 · The Fuller Story (note)
Body: The fuller personal story, the path that led to this work and what came before, sits on a separate page.
Link: Read the fuller story → https://www.johnob1.co.uk (new tab)

## Closing CTA
Heading: Ready to be at the board?
CTA: Book a Whiteboard Session → contact.html

---

# PAGE: leadstrong.html
Title: LeadStrong | Strategic Thinking for the Corporate Leader | Catalyst
Meta description: "Strategic thinking partnership for Directors, VPs and executives navigating organisations they don't own."

## Hero  [image: img-1983.jpg]
Eyebrow: A feature for *Directors, VPs, and Executives*
H1: LeadStrong.
Lede: For the corporate leader carrying decisions that nobody else in your week can help you think through.

## 01 · The Problem
Lede: You're already operating at a high level. That's not the problem.
Body:
  The problem is the gap between the decisions you're making and the thinking those decisions deserve.
  The promotion happens. The remit expands. The decisions get more consequential. But nothing changes about *how* you think about them. You're still making them in the same fifteen-minute windows between meetings.
  The result: you're operating at the new altitude with the old thinking infrastructure.
Punchline: That's the gap LeadStrong is built around.

## 02 · The Work  [image: fsr.jpg]
Heading: A LeadStrong engagement is a sustained thinking partnership.
Body:
  Each session is a Whiteboard Session. Your thinking, out of your head, onto the board, into a solution. Between sessions there is no homework; the thinking happens at the board, not in the gaps. We work on whatever altitude the week presents: the quarter-defining decision, the team dynamic that's stuck, the calendar question that's quietly draining you.
  The work is finished when the work is finished. Most engagements run for years, not because the leader is stuck, but because the *thinking partnership* compounds.

## 03 · The Lenses
Heading: Three frames the work moves through.
  i. The strategic altitude. Most senior leaders don't get to think at altitude during the week. The session is where you do, without losing the texture of the operational reality below.
  ii. The CliftonStrengths lens. A profile of how you actually operate, used not as a personality test but as an operating language. We use it when the question is about you: your patterns, your blind spots, the conditions that produce your best work.
  iii. The FITT16 lens. A 16-archetype model built from your CliftonStrengths Full 34. It maps the *drive* underneath the strengths, so the strategy fits the leader, not just the role.

## In Their Words
Head label: In Their Words · From leaders who've worked this *way*.
Quote 1: "Working with John has been transformative. I came in overwhelmed and stuck; I left with a clear structure for how I lead and make decisions *under pressure*." · Ralph Shorthose, Redhouse Bank · LeadStrong
Quote 2: "Working with John has given me renewed focus and confidence at a point in my career when I really needed it. The CliftonStrengths work was the most *clarifying* thing I've done professionally." · Martin Malins, Senior Leader · LeadStrong

## 04 · One Thing Worth Knowing
Statement: The point of the practice is to make the thinking that should already be happening, happen.
Support: Not new knowledge. Not new frameworks. The thinking you'd already be doing if your week had room for it.

## 05 · The Invitation
Lede: The fastest way to know whether LeadStrong fits is to be at the board for an hour.
Sub: You'll know whether the practice is for you. The hour is enough.
CTA: Book a Whiteboard Session → contact.html
Stepping further: Wondering what this looks like when the relationship deepens? Read about going further → going-further.html

---

# PAGE: buildstrong.html
Title: BuildStrong | Strategic Thinking for the Business Owner | Catalyst
Meta description: "Strategic thinking partnership for entrepreneurs, MDs and business owners building the thing they lead."

## Hero  [image: img-1935.jpg]
Eyebrow: A feature for *Founders, MDs, and Owners*
H1: BuildStrong.
Lede: For the leader who is also building the business. Where the strategic question and the operational reality are the same thing.

## 01 · The Problem
Lede: You're running a business that exists because you built it. That's not the problem.
Body:
  The problem is that the business now needs you to be in the *strategic seat* and the *operational seat* and the *founder seat*, and there's no time to sit in any of them properly.
  You make decisions at speed because there's no other speed available. You over-rotate on whichever fire is loudest. The thing you most need to think about, the long view, is the thing that's hardest to actually look at.
Punchline: That's the gap BuildStrong is built around.

## 02 · The Work  [image: img-1989.jpg]
Heading: A BuildStrong engagement runs differently from the corporate version because owners run differently.
Body:
  Sessions happen when the business needs them, not on a quarterly calendar. The work moves between altitudes because the work *of being an owner* moves between altitudes. One week we're working on the next ten-year question; the next we're working on the hire that's quietly breaking the team.
  The session is the space where the founder-seat, the strategic-seat, and the operational-seat are all the same chair, and they get to talk to each other.

## 03 · The Lenses
Heading: Three frames the work moves through.
  i. The owner altitude. Owners think differently from corporate leaders because owners *are* the business in a way corporate leaders aren't. The session respects that.
  ii. The CliftonStrengths lens. A profile of how you actually operate. Used to make the business fit the founder, not the other way around. Most founders build companies that demand they be people they aren't. We use the lens to stop that.
  iii. The FITT16 lens. A 16-archetype model built from your CliftonStrengths Full 34. It maps the *drive* underneath the strengths, so the business fits the founder, not just the operator.

## In Their Words
Head label: In Their Words · From an owner who's worked this *way*.
Quote: "I just wish I'd met John years ago. The frameworks he uses would have saved me from expensive mistakes in two previous *businesses*." · Stuart Ploughman, Serial Entrepreneur · BuildStrong

## 04 · One Thing Worth Knowing
Statement: Most founders are accidentally the bottleneck in their own business.
Support: Not because they're bad at it. Because the business needs them to be three people, and they're trying to be three people in the same hour. The work is on what changes when only one of those people has to be in the room.

## 05 · The Invitation
Lede: The fastest way to know whether BuildStrong fits is to be at the board for an hour.
Sub: You'll know whether the practice is for you. The hour is enough.
CTA: Book a Whiteboard Session → contact.html
Stepping further: Wondering what this looks like when the relationship deepens? Read about going further → going-further.html

---

# PAGE: teamstrong.html
Title: TeamStrong | Strategic Thinking for the Senior Team | Catalyst
Meta description: "Strategic thinking partnership for senior teams that need to think together, decide together, and move faster."

## Hero  [image: img-1981.jpg]
Eyebrow: A feature for *The Leader and the Team*
H1: TeamStrong.
Lede: For the leader who needs the team to think with them, not just receive what's already been thought.

## 01 · The Problem
Lede: The team is full of good people. That's not the problem.
Body:
  The problem is that good people working hard isn't the same as a team thinking together.
  You can feel it in the meetings that go nowhere, the strategy sessions that produce slides but not decisions, the way the team waits for you to make the move that you wish they would make themselves.
  They're not failing. But they're also not *thinking with you*. They're thinking around you.
Punchline: That's the gap TeamStrong is built around.

## 02 · The Work  [image: img-1987.jpg]
Heading: TeamStrong runs over twelve weeks in two phases.
Body:
  *Phase 1 (Weeks 1–4):* Individual CliftonStrengths assessments and one-to-one coaching with each team member. Culminates in an Experience Day at The O2: morning workshop, lunch at TOCA Social, afternoon at Activate at The O2. The team thinks together for the first time.
  *Phase 2 (Weeks 5–12):* Bi-weekly group coaching sessions. Four sessions total. The team works on the actual strategic and operational questions in front of them, with the thinking infrastructure now built into how they engage.
Punchline: The structure is the structure. The work inside it is yours.

## 03 · The Lenses
Heading: Three frames the work moves through.
  i. The team altitude. Teams aren't just individuals plus interaction. They have their own thinking patterns. The work isn't only on each person; it's on the way the team *thinks together*.
  ii. The CliftonStrengths lens. Each team member gets a profile. The team learns to read each other's profiles. The vocabulary of strengths becomes the shared operating language.
  iii. The FITT16 lens. A 16-archetype model built from CliftonStrengths Full 34. For TeamStrong, it shows how each archetype contributes to the team's collective *drive*, and where the gaps are.

## 04 · One Thing Worth Knowing
Statement: The team doesn't think with the leader by default. It has to be designed to.
Support: A team that thinks with the leader is a team that takes ownership, sees the architecture, anticipates the move. That's not personality. That's *design*.

## 05 · The Invitation
Lede: TeamStrong runs over twelve weeks. The fastest way to know whether it fits the team is to start with the leader.
Sub: An hour at the board, on the situation you're trying to move through. From there we both know whether the team version makes sense.
CTA: Book a Leader Session → contact.html   (note the different CTA label on this page)
Stepping further: Wondering what this looks like when the relationship deepens? Read about going further → going-further.html

---

# PAGE: in-practice.html
Title: In Practice | Catalyst Growth Coaching
Meta description: "Lessons distilled from sessions, and the leaders behind them. This is the room, after the work."

## Hero  [image: img-1988.jpg]
Eyebrow: In Practice
H1: Where the work shows itself.
Body:
  Two sections. The first is what gets distilled from sessions: small essays on what the practice keeps revealing. The second is the leaders I've worked with, told their way.
  *Nothing here is selling. This is the room, after the work.*

## Lessons
Head: Lessons · Each piece below is a single observation from a single client, anonymous but real. Read one, or read them all.
(Seven lessons. Preview shown in list; full body + coda revealed on demand:
modal, expander, or the design's own device. Codas are set apart, italic in
the source.)

### i. Too simple to see
Preview: I had a session with a very experienced business development manager. He'd been thinking about his situation for a long time and seemed to already know the options available to him.
Body:
  I had a session with a very experienced business development manager. He'd been thinking about his situation for a long time and seemed to already know the options available to him. I thought I knew the answer too, but as I regularly do, I dropped my preconclusions and went in blank, asking questions.
  The more I asked, the more we noted on the board. Once it was all out, we looked at what was there and traced the connections that became visible. What seemed obvious to me turned into natural options and routes he hadn't yet seen, including a new direction he hadn't considered.
  The lightbulbs started turning on. He became visibly excited, and we went deeper into the new space of possibility.
Coda: Sometimes the answer is staring you in the face. You can't see it because you're looking for something more complicated. It can be too simple to see as anything.

### ii. The answer isn't always in you
Preview: A lot of coaches say the answer is always in you. Sometimes it is. Sometimes it isn't. Sometimes it only comes from a conversation with someone who has a different perspective.
Body:
  A lot of coaches say the answer is always in you. Sometimes it is. Sometimes it isn't. Sometimes it only comes from a conversation with someone who has a different perspective.
  I was working with a business owner so focused on the present that the future he could see had very little detail. That bothered him. Alongside the work of freeing up his time through delegation, we had whiteboard sessions to explore what he really wanted.
  Looking at his FITT16 report, I was able to help him put words to what he'd felt inside but had not been able to articulate. He could have arrived at it eventually on his own, but we generated that understanding there and then, and fleshed it out over a few more sessions.
  That vision is now what he's working towards daily.
Coda: The answer isn't always in you. Sometimes it's in the room between you and the right thinking partner.

### iii. What only writing reveals
Preview: A pattern I've noticed across many whiteboard sessions: leaders have epiphanies that come not from new information, but from finally seeing what they already knew laid out in front of them.
Body:
  A pattern I've noticed across many whiteboard sessions: leaders have epiphanies that come not from new information, but from finally seeing what they already knew laid out in front of them.
  One client put it like this: *sometimes decisions only become clear when you see all the elements written out on the page.*
  The common thread is that thought held in the head is fundamentally different from thought made visible. The same content, externalised on a board, behaves differently. Connections become visible. Weighting becomes possible. A decision that felt impossible internally becomes obvious externally.
Coda: The whiteboard isn't a teaching tool. It's a thinking tool. The lesson is what people see in their own thinking once they can actually see it.

### iv. When the noise drowns the signal
Preview: A client of mine had been promoted to COO. In the first weeks she felt overwhelmed: too much new information, too many issues landing at once, and a real uncertainty about what she was actually supposed to be doing.
Body:
  A client of mine had been promoted to COO. In the first weeks she felt overwhelmed: too much new information, too many issues landing at once, and a real uncertainty about what she was actually supposed to be doing.
  We took a whiteboard session and pushed past the noise. What had she noticed during her orientation? What had she seen while still in her last role? What were the key things her stakeholders were saying to her, repeatedly?
  We mapped what we had against the things that mattered: impact if solved, complexity, time, resources available. The picture changed quickly. By the end of the hour she had a short list of the right things to work on first, in the right order.
Coda: The job of a senior leader isn't to handle everything that lands. It's to know which things to work on. Sometimes that means having someone in the room helping you sort signal from noise out loud.

### v. The path you're avoiding
Preview: There's a reason you don't know what to do, and it's that you're avoiding a particular path, not because it's wrong, but because you have so little data on how to handle it. It feels like a dead end. So you keep choosing the paths you know.
Body:
  There's a reason you don't know what to do, and it's that you're avoiding a particular path, not because it's wrong, but because you have so little data on how to handle it. It feels like a dead end. So you keep choosing the paths you know.
  A client of mine has a perfectionist tendency. He sticks to familiar routes that reliably produce the outcomes he wants. He's very successful at it, but he's not the most flexible, and he knows that isn't to his advantage. There are options he can see are available to him that he doesn't explore, because exploring them isn't his natural inclination.
  Whiteboard sessions have given him the confidence to map what those new options actually look like: what implementation would involve, what the early steps would be, what the risks really are.
Coda: The path you don't take isn't always the wrong path. Sometimes it's just the one you've never had time to think about properly.

### vi. Confidence, from seeing yourself
Preview: A leader I worked with was feeling imposter syndrome after a new promotion. He didn't feel worthy of taking on the role. The internal narrative had taken over: *I shouldn't be here, I'm not the right person, somebody's about to notice.* He couldn't argue his way out of it from the inside.
Body:
  A leader I worked with was feeling imposter syndrome after a new promotion. He didn't feel worthy of taking on the role. The internal narrative had taken over: *I shouldn't be here, I'm not the right person, somebody's about to notice.* He couldn't argue his way out of it from the inside.
  So I asked him question after question about what he'd actually achieved. We put it all on the board. The work, the wins, the moments that had earned him the seat. As the board grew, so did his smile.
  He didn't need new information. He had all of it already. What he needed was to see who he was, how he'd got there, and why he was deserving of the role he'd been offered, laid out in front of him where the imposter narrative couldn't argue against it.
  He stepped into the role with new energy.
Coda: Confidence often isn't about adding something. It's about seeing what's already there clearly enough that the inner critic loses the argument.

### vii. The obvious choice rarely wins
Preview: Two partners had been handed a remarkable opportunity. An inventor had brought them a product he had no interest in commercialising himself; the business side was theirs to build. The product was revolutionary. The applications looked endless.
Body:
  Two partners had been handed a remarkable opportunity. An inventor had brought them a product he had no interest in commercialising himself; the business side was theirs to build. The product was revolutionary. The applications looked endless.
  That was the problem. They had so many options they were overwhelmed, and the first option that had occurred to them had already started to feel like the obvious choice.
  We hired a white room for the day. Out with the whiteboard pen. We spent a full session breaking down the product, the applications, the players in each adjacent space, the partnerships available, the resources each direction would require.
  By the end of a vibrant day's discussion, the best options weren't just clearer. They were obvious. And the option they'd walked in thinking was the answer wasn't even in the top three. They left with a clear action plan: who to contact, who to hire, what came next.
Coda: The obvious choice rarely survives the longer list. Most strategic mistakes happen when the second option never gets named.

## The People I Work With
Head: The People I Work With · A small ongoing series.
Intro: Once a week, sometimes more, I share something about a leader I've worked with. Their work, their character, what makes them remarkable. These are the three most recent.
Cards:
  - Tim · AVP · Wisconsin
    Excerpt: Today I'm celebrating another past client: Tim Cook, now an AVP in Wisconsin. When I first met Tim, he struck me as quietly pensive: incredibly intelligent, observant, and astute. The kind of person who's listening and thinking more than he's saying…
    Link "Read on LinkedIn →": https://www.linkedin.com/posts/johnobi_today-im-celebrating-another-past-client-activity-7462385307611488256-7kmP
  - Ashley · Strategic delivery leader · Atlanta
    Excerpt: Over the years I've had the privilege of coaching some genuinely impressive leaders. Today I want to celebrate one of them: Ashley. Working with Ashley was a privilege. She's deeply thoughtful, experienced, and well-travelled, yet so open to learning…
    Link "Read on LinkedIn →": https://www.linkedin.com/posts/johnobi_over-the-years-ive-had-the-privilege-of-activity-7464925855492923392-jzG1
  - Oli · Chef and restaurateur · Hertford
    Excerpt: Oli is one of my favourite types of clients to work with because he's both an entrepreneur and a craftsman. He's completely committed to his craft. Having finished top of his class, he developed in the toughest of kitchens…
    Link "Read on LinkedIn →": https://www.linkedin.com/in/johnobidipe
    (NOTE: the live site has a placeholder here; we point Oli's card at the profile instead. Do not use a placeholder.)
Follow line: Follow the full series on LinkedIn → https://www.linkedin.com/in/johnobidipe

## Close · Next
Lede: If something in here pointed at a question you've been carrying, the fastest way to know if the practice fits is to be at the board for an hour.
Sub: You'll know whether the practice fits you.
CTA: Book a Whiteboard Session → contact.html

---

# PAGE: going-further.html
Title: Going Further | Catalyst Growth Coaching
Meta description: "Where the Whiteboard Sessions lead. How a single session becomes a longer thinking partnership when the work asks for it."

## Hero  [image: img-1984.jpg]
Label: Catalyst Growth Coaching · Going Further
H1: Going further.
Sub: Where the Whiteboard Sessions lead.

## 01 · The Argument
Lede: The Whiteboard Sessions are where the work begins.
Body:
  What happens next depends on what the sessions reveal. Sometimes it's more sessions; the question is bigger than an hour allowed. Sometimes it's working with the team; the thinking needs to happen with them, not just about them. Sometimes it's coaching the person you're developing; the successor question is best answered with the successor in the room. Sometimes it's being in the business with you for a period, alongside whatever you're working through.
Punchline: The shape of the work follows the work. Not the other way around.

## 02 · What This Looks Like  [image: img-1986.jpg]
Vignettes:
  A client booked a session because they were stuck on a strategic question. We worked through it at the board. By the end, the question wasn't the strategic one. It was a question about the team that needed to think differently. We ran the next session with the team.
  A client booked a session about whether to promote a particular person to the leadership team. We worked through it at the board. The session revealed the person was ready but the role needed redesigning around their actual capabilities. The next sessions were with that person, redesigning their remit.
  A client booked a session because the business was scaling faster than their bandwidth allowed. We worked through it at the board. The session revealed they couldn't do their actual job because they were doing three other jobs as well. The next phase was me being in the business with them, helping them work out what to delegate, what to hire, and what to stop doing.
Punchline: In each case, the first session set the next move. The relationship took shape around the work.

## 03 · The Invitation
Lede: If you're at the point of asking what this could look like for you, the conversation starts the same way as anything else here. An hour at the board.
Sub: The first session will tell us both whether there's a longer relationship in this, and what shape it should take.
CTA: Book a Whiteboard Session → contact.html

---

# PAGE: contact.html
Title: Book a Whiteboard Session | Catalyst Growth Coaching
Meta description: "An hour at the board. Bring whatever you're carrying."

## The Booking Path
Eyebrow: Contact
H1: Let's get an hour in the diary.
Lede: The first step is the same regardless of what you're thinking about. An hour at the board, working on whatever's actually live for you right now.
Primary CTA (new tab): Book a Whiteboard Session → the booking URL above
  (label may also be "Book via Dubsado →" as on the live site; either is
  acceptable, keep it consistent within the site)
Closer: *No prep needed. Just bring the thing you'd think about if you had the time.*
Note, labelled "What the hour is like":
  It's a full session, the same work I do with anyone at the board. You bring what's live, we think it through together, and you leave with a real conclusion, not a summary of what we could do if you signed up. If it turns out to be a fit, we'll talk about working together. If it doesn't, you've still spent a genuinely useful hour. Either way, the hour is yours.

## 01 · If You'd Rather Ask First
Intro: Some people want a brief conversation before booking a session. Some are enquiring on behalf of an organisation. Some have a specific question that needs an answer before any of this makes sense.
Prompt: Quick enquiry or organisational interest? Use the form below.
Form (name="contact", method="POST", data-netlify="true", honeypot
"bot-field", action="#", hidden form-name + source-page fields; client-side
validation; on valid submit show the confirmation locally):
  - Name (text, required; error: Please enter your name.)
  - Email (email, required; error: Please enter a valid email address.)
  - Enquiry type (radios: Individual / Organisational / Other, required; error: Please choose one.)
  - Message (textarea, required; error: Please add a short message.)
  - Submit: Send Message
Confirmation: Got it. I'll be in touch within one working day.  · signed: John
Email line: Want to write something longer, or just prefer email? coach@catalystgrowthcoach.co.uk
Closing italic: *I read everything that comes in. I'll reply within one working day.*
