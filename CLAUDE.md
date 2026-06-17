# stuckweb — repository conventions

## Deploy / "push to live"

This repo deploys from the GitHub default branch, which is
**`claude/add-client-logo-bar-gmN4g`** (yes — historical name; treat it as
`main`). Merging a PR into that branch publishes the change to the live
site. There is no `main`/`master`/`live` branch.

**Standard process when the user says "push to live", "ship it",
"publish", or similar:**

1. Develop on the session's assigned feature branch (`claude/...`).
2. Commit and push the branch with `git push -u origin <branch>`.
3. Open a PR via `mcp__github__create_pull_request` with
   `base = claude/add-client-logo-bar-gmN4g` and `head = <feature branch>`.
   Use the standard Summary / Test plan template.
4. Report the PR URL back. The user merges via the GitHub UI; the merge
   is what deploys.

Do **not** ask which branch to target — it's always
`claude/add-client-logo-bar-gmN4g`. Do **not** attempt to push directly
to the default branch.

## Dual directory structure

Every page exists in **two places** that must stay in sync:

- root: `/index.html`, `/about.html`, `/images/foo.jpg`, `/videos/bar.mp4`, …
- mirror: `/site/index.html`, `/site/about.html`, `/site/images/foo.jpg`,
  `/site/videos/bar.mp4`, …

Any HTML edit, image add, or video add must be applied to **both** the
root and the `/site/` mirror in the same commit. Asset paths in markup
are absolute (`/images/foo.jpg`, `/videos/bar.mp4`) — those resolve to
whichever tree the page is served from.

## Asset conventions

- Photos live in `/images/` and `/site/images/`. Library naming follows
  the iPhone source pattern `img-NNNN.jpg`. New shots take the next
  sequential number.
- Videos live in `/videos/` and `/site/videos/`. Web-optimised H.264,
  muted, autoplay/loop/playsinline, no controls — they're "living
  photos", not players.
- Photos: progressive JPEG, quality ~82, target ≤350KB. If an upload
  arrives as PNG or oversized, convert before committing (use Pillow:
  `Image.open(src).convert("RGB").save(dst, "JPEG", quality=82,
  optimize=True, progressive=True)`).
- The `_backup-pre-editorial-rebuild/` folder is historical only —
  never edit it, and ignore it in audits.

## Editorial tone (when writing copy or alt text)

Plain, declarative, no marketing hedge. Short. The site's voice is
"another mind in the room", not a brochure. Match the surrounding copy
on the page being edited rather than imposing a generic tone.
