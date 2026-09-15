# TASK-014B — SpotlightImage Prototype (Scene 07, Redis/Cache Only)

Implements a small, scoped prototype of the spotlight highlight design from
`feedbacks/task-014a-feedback.md`, limited exactly to what TASK-014B asked
for: one reusable component, one converted target (Redis/Cache in the
analogy-mapping beat), everything else in Scene 07 left untouched.

## What changed

### New file: `src/shared/components/SpotlightImage.tsx`

A reusable component implementing the two-image spotlight design:

- Renders a base `<Img>` and a second, identically-sized `<Img>` of the same
  `src` inside one shared transformed wrapper (`transform: scale(...)`), so
  both layers and any `children` overlay always move in exact lockstep — the
  same transform-tracking fix `DiagramBeat` already applies, generalized to
  two image layers instead of one.
- The base layer's brightness is driven by `filter: brightness(...)`,
  interpolated between `1` (no dim) at `spotlightOpacity: 0` and
  `dimBrightness` (default `0.45`) at `spotlightOpacity: 1`. At `0` the two
  layers are visually identical, so the "before" state is the plain,
  undimmed image with no seam.
- The top layer is masked with a CSS `mask-image: radial-gradient(ellipse
  ...)` centered on the normalized `region`, sized larger than the region
  itself (`featherPaddingFactor`, default `1.7`×) with a `0% / 50% / 100%`
  stop ramp, so the edge fades out rather than cutting sharply — no
  `clip-path`, no hard rectangle.
- No border, no glow, no drawn shape anywhere — the highlight is entirely
  the underlying artwork staying bright against its dimmed surroundings.
- `region` coordinates are normalized `{x, y, width, height}` in `0–1`,
  fractions of the image's own rendered (`objectFit: cover`) box, per the
  feasibility review's recommendation. The component's doc comment states
  the aspect-ratio-match assumption explicitly (percentage-of-container
  equals percentage-of-source-image only when the asset's aspect ratio
  matches the container's, exactly as already true for both Scene 07
  assets).
- `children` is still accepted and rendered inside the same transformed
  wrapper, so a scene can still layer an unrelated `FocusBox` (or anything
  else) alongside a `SpotlightImage` without losing shared-transform safety.

### `src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx`

- Extracted the existing push-in scale formula (`interpolate(seconds,
  [start, end], [1, 1.03], ...)`) out of `DiagramBeat` into a shared
  `computePushInScale` helper, so both `DiagramBeat` (technical-architecture
  beat, Database highlight in the analogy beat) and the new
  `SpotlightImage` usage (Redis/Cache highlight) use the identical curve
  and stay in sync. No behavior change to the extracted formula itself.
- Added `redisCacheSpotlightRegion`, the Redis/Cache target converted from
  the existing `FocusBox` pixel box (`left:935, top:245, width:375,
  height:90` against the 1920×1080 canvas) into normalized fractions
  (`935/1920, 245/1080, 375/1920, 90/1080`) — same reference geometry
  the feasibility review recommended reusing, just converted to `0–1`.
- Replaced the analogy beat's `DiagramBeat` + Redis/Cache `FocusBox` pairing
  with a single `SpotlightImage`, driven by the exact same `redisCacheFocus`
  opacity value the old `FocusBox` used (no change to beat timing:
  `redisCacheIn: 2.5s`, `redisCacheOut: 4.3s`, `0.4s` fades in/out) and the
  same `analogyScale` value `DiagramBeat` would have computed.
- The Database highlight in the same beat is **unchanged** — it still
  renders as the original `FocusBox` amber/green rectangle, now passed as
  `SpotlightImage`'s `children` so it keeps riding the same shared
  transform it always did.
- The technical-architecture beat (`DiagramBeat` + its two `FocusBox`
  highlights) is **completely untouched**.

### Not changed

- No source assets modified.
- No Database highlight conversion.
- No technical-architecture beat changes.
- `FocusBox` itself is untouched and still used for Database (analogy beat)
  and both technical-architecture beat highlights.

## Visual QA

Composition rendered: `Redis-EN` (full episode composition; Scene 07 begins
at global frame 2820 — `redisPlannedSceneTimeline` scene07 window,
computed from `episode.config.ts`'s scene durations, confirmed against
`remotion compositions` reporting a 3360-frame total).

Frames inspected (`renders/review/task-014b/`):

- `scene-07-clean-before.png` (frame 2865, local ~1.5s — well before
  `redisCacheIn`): image at full, uniform brightness, no dimming, no
  spotlight visible. Confirms the "one clean frame before spotlight" state
  has no seam or artifact from the two stacked image layers.
- `scene-07-spotlight-peak.png` (frame 2922, local ~3.4s — mid-hold,
  `spotlightOpacity` at 1): the Redis/Cache badge and the ready-shelf below
  it stay at full brightness while the rest of the frame (Request,
  Application, Database, the chef, background) is visibly dimmed. The
  transition between bright and dim is a soft gradient, not a rectangular
  edge — no border, no glow rectangle anywhere.
- `scene-07-spotlight-fadeout.png` (frame 2955, local ~4.5s — during the
  fade-out that starts at `redisCacheOut: 4.3s`): dimming has partially
  relaxed, confirming the fade-out drives both the mask opacity and the
  base-layer brightness back toward the "clean" state together rather than
  leaving a stuck dim.
- `scene-07-preview.mp4` (frames 2880–2970, local ~2.0s–5.0s, 91 frames /
  ~3s): short preview spanning fade-in, hold, and fade-out of the Redis/
  Cache spotlight. Playback confirms the spotlight tracks the image's own
  push-in scale with no visible drift (expected, since both layers and the
  Database `FocusBox` share one transformed wrapper) and that the Database
  badge (not yet converted) is correctly not lit during this window, since
  its own fade-in starts later at `databaseIn: 4.5s`.

What was checked: focal point (Redis/Cache badge and shelf stay legible and
bright), no harsh/obvious rectangular edge, no border or glow artifact,
alignment with the image's push-in transform across the fade window,
absence of a visible seam between the two stacked image layers at
`spotlightOpacity: 0`.

Known visual issues / follow-ups (not fixed in this prototype, matching its
scope):

- The elliptical feather mask is generously padded (`1.7×` the region's own
  size), so the "bright zone" visually extends a bit beyond the Redis/Cache
  badge itself (softly, into the shelf below it) — this reads as intentional
  "spotlight" softness rather than a defect, but is worth a deliberate
  design call (tighter or looser feather) once this pattern is adopted
  scene-wide rather than left at this prototype's default.
- `dimBrightness` (0.45) and `featherPaddingFactor` (1.7) are both
  prototype defaults, not tuned against the full storyboard/narration —
  worth revisiting once Database and the technical-architecture beat are
  also converted, so all spotlights in the episode read consistently.
- Typecheck (`npm run typecheck`) and `remotion compositions` both pass
  with no errors; no regression check was run against Scenes 01–06 or the
  technical-architecture beat since neither was touched by this change.

## Human Review Requests

### Review Request 1

Artifact:
renders/review/task-014b/scene-07-clean-before.png

Type:
PNG

Purpose:
Confirm the "before spotlight" state (spotlightOpacity: 0) shows the
analogy-mapping image at plain, uniform brightness with no artifact from
the two stacked SpotlightImage layers.

What to review:
- No visible seam, ghosting, or brightness mismatch between the base and
  top image layers.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
renders/review/task-014b/scene-07-spotlight-peak.png

Type:
PNG

Purpose:
Confirm the peak spotlight state reads as a subtle, soft-edged highlight on
Redis/Cache with the rest of the frame dimmed, and no rectangular border/
glow artifact remains from the old FocusBox approach.

What to review:
- Whether the dim level (`dimBrightness: 0.45`) and feather softness
  (`featherPaddingFactor: 1.7`) feel right, or should be tuned.
- Whether the bright zone's extent (padded beyond the badge itself, into
  the shelf below) is the desired look.

Agent assessment:
PASS WITH ISSUES

Known issues:
- Bright-zone extent is a deliberate design choice not yet tuned against
  the full scene (see "Known visual issues" above).

Human review status:
PENDING

### Review Request 3

Artifact:
renders/review/task-014b/scene-07-preview.mp4

Type:
MP4

Purpose:
Confirm the spotlight fades in, holds, and fades out correctly in motion,
tracks the image's push-in scale without drift, and that the Database
FocusBox (not yet converted) does not incorrectly light up during the
Redis/Cache window.

What to review:
- Fade-in/fade-out pacing feel relative to the original FocusBox timing
  (unchanged: 2.5s–4.3s, 0.4s fades).
- Any perceptible drift between the spotlight and the image during the
  push-in.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

## External Asset Requests

None.

---

**Stopped after this prototype**, per TASK-014B's instructions. Database
and the technical-architecture beat remain on the original `FocusBox`
approach, unconverted, as scoped.
