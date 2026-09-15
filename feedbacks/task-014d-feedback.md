# TASK-014D — Regenerate Full Scene 07 Using Approved Spotlight System

## 1. Summary

Scene 07 has been fully converted from the old rectangle/glow `FocusBox`
highlights to the approved `SpotlightImage` system, using the exact tuning
locked in by TASK-014C (`dimBrightness: 0.58`, `featherPaddingFactor:
1.35`). All four highlight targets — analogy-mapping Redis/Cache, analogy-
mapping Database, technical-architecture Redis node, technical-architecture
Database node — now use `SpotlightImage`. Request, Application, and Cached
result remain unhighlighted, as required. Both beats' `FocusBox` and
`DiagramBeat` code has been removed from the scene file entirely, since
nothing in Scene 07 uses either anymore. No source PNGs were touched, and
the scene's overall duration (540 frames / 18s) is unchanged.

## 2. Spotlight Settings

```text
dimBrightness: 0.58
featherPaddingFactor: 1.35
```

These are exactly the approved TASK-014C values — no deviation. Both beats'
`SpotlightImage` call sites pass them explicitly (via a shared
`spotlightTuning` constant in `Scene07AnalogyToArchitecture.tsx`) rather
than relying on `SpotlightImage`'s own defaults, so this scene stays
correct even if the component's defaults are ever retuned for a different
scene later.

## 3. Target Regions

All four regions are normalized `{x, y, width, height}` in `0–1`, converted
from the exact pixel boxes the old `FocusBox` rectangles used against the
1920×1080 canvas (both source assets are exactly 16:9, so this conversion
is a straight division, documented inline in the scene file):

```text
Analogy Redis / Cache      (was left:935,  top:245, width:375, height:90)
  x: 0.4869791667
  y: 0.2268518519
  width: 0.1953125
  height: 0.0833333333

Analogy Database           (was left:1470, top:135, width:330, height:90)
  x: 0.765625
  y: 0.125
  width: 0.171875
  height: 0.0833333333

Technical Redis node       (was left:1225, top:130, width:365, height:225)
  x: 0.6380208333
  y: 0.1203703704
  width: 0.1901041667
  height: 0.2083333333

Technical Database node    (was left:1225, top:635, width:365, height:230)
  x: 0.6380208333
  y: 0.5879629630
  width: 0.1901041667
  height: 0.2129629630
```

## 4. Timing

```text
Redis analogy spotlight window:      2.5s -> 4.3s hold, fade out to 4.7s
Database analogy spotlight window:   4.7s -> fade in to 5.1s, holds to analogyOut (6.4s)
Redis technical spotlight window:    8.5s -> 11.5s hold, fade out to 11.9s
Database technical spotlight window: 11.9s -> fade in to 12.3s, holds to 15.3s, fade out to 15.7s
```

Confirmation the windows do not overlap: `analogyFocusTimes.databaseIn`
(4.7) was nudged from its previous value of 4.5 to exactly equal
`redisCacheOut + fadeOutDuration` (4.3 + 0.4 = 4.7), and
`beats.databaseFocusIn` (11.9) was nudged from 11.8 to exactly equal
`redisFocusOut + fadeOutDuration` (11.5 + 0.4 = 11.9). Both are the "tiny
adjustment... only to prevent spotlight overlap" the task explicitly
permits. Structurally, at most one `SpotlightImage` region is ever active
per beat: `pickActiveSpotlight(seconds, handoffSeconds, before, after)`
switches from the Redis target to the Database target at exactly the
handoff second, so the two spotlights can never both be nonzero at once —
this is enforced by the code shape, not just by the numbers happening to
line up. The `scene-07-analogy-handoff.png` and
`scene-07-technical-handoff.png` stills (rendered at each handoff second)
confirm the frame is fully undimmed at that instant, with neither spotlight
active.

## 5. Transform Safety

Confirmed. Both beats render a single `SpotlightImage` whose internal
structure (unchanged since TASK-014B/C) is one shared `transform:
scale(...)` wrapper containing the dimmed base `<Img>` and the masked
full-brightness `<Img>` as siblings — no spotlight layer has an independent
transform. The scale value each beat passes (`analogyScale`,
`technicalScale`) comes from the same `computePushInScale` helper used
throughout this scene's history, so the push-in curve is unchanged from
TASK-014B/C for the analogy beat and now applies identically to the
technical-architecture beat's two spotlights as well (previously
`DiagramBeat` computed its own, functionally identical, copy of this
formula).

## 6. Source Asset Preservation

Confirmed unchanged. Neither
`public/episodes/001-redis/assets/scene-07-analogy-mapping.png` nor
`public/episodes/001-redis/assets/scene-07-technical-architecture.png` was
read for editing, written to, or referenced by any asset-generation step —
only read at render time via `staticFile()`, exactly as before. `git
status` (Section 13) shows no changes under `public/episodes/001-redis/
assets/`.

## 7. Old FocusBox Removal

All `FocusBox` usages in `Scene07AnalogyToArchitecture.tsx` were removed
and replaced:

- The analogy beat's `FocusBox` for Redis/Cache — already replaced by
  `SpotlightImage` in TASK-014B/C — is unchanged (still `SpotlightImage`).
- The analogy beat's `FocusBox` for Database (previously rendered as
  `SpotlightImage`'s `children`) — **removed**, replaced by
  `SpotlightImage`'s own `region`/`spotlightOpacity` switching to the
  Database target after the handoff second.
- The technical-architecture beat's `FocusBox` for the Redis node —
  **removed**, replaced by `SpotlightImage`.
- The technical-architecture beat's `FocusBox` for the Database node —
  **removed**, replaced by `SpotlightImage`.

The `FocusBox` component definition itself and the `DiagramBeat` component
(which rendered a single `<Img>` + `children` overlay, now fully
superseded by `SpotlightImage`) were both deleted from the file — neither
had any remaining call site in Scene 07. A grep for `FocusBox|DiagramBeat`
in the file now matches only one code comment describing the pixel-to-
normalized conversion (`"the old FocusBox rectangles..."`), not any
component or usage.

## 8. Review Artifacts

```text
renders/review/task-014d/scene-07-start.png
renders/review/task-014d/scene-07-analogy-redis-spotlight.png
renders/review/task-014d/scene-07-analogy-database-spotlight.png
renders/review/task-014d/scene-07-technical-redis-spotlight.png
renders/review/task-014d/scene-07-technical-database-spotlight.png
renders/review/task-014d/scene-07-end.png
renders/review/task-014d/scene-07-preview.mp4
renders/review/task-014d/scene-07-analogy-handoff.png
renders/review/task-014d/scene-07-technical-handoff.png
```

One extra, non-required comparison still saved for this report's own
verification (not part of the required list, kept for traceability):
`renders/review/task-014d/scene-07-technical-clean-check.png` (a clean,
pre-highlight technical-architecture frame used to visually confirm the
dim effect against, since that image's own art is already very dark and
the dimming is otherwise hard to eyeball from a single still).

All frames render against the `Redis-EN` composition; Scene 07 occupies
global frames 2820–3359 (540 frames / 18s, confirmed via `remotion
compositions` reporting an unchanged 3360-frame episode total).

## 9. Human Review Requests

### Review Request 1

Artifact:
renders/review/task-014d/scene-07-analogy-redis-spotlight.png

Purpose:
Confirm the analogy-beat Redis/Cache spotlight (unchanged since TASK-014C)
still reads correctly after the surrounding code restructuring.

What to review:
- Tightness, dim level, and soft edge — should match TASK-014C exactly.

Agent assessment:
PASS

Known issues:
- None observed; pixel-identical to the TASK-014C-approved frame.

Human review status:
PENDING

### Review Request 2

Artifact:
renders/review/task-014d/scene-07-analogy-database-spotlight.png

Purpose:
Confirm the newly-converted analogy-beat Database spotlight matches the
same tuned look as Redis/Cache.

What to review:
- Whether the Database target is too broad or too tight.
- Whether the ready-shelf/chef area outside the target reads at a
  consistent dim level with the Redis frame.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 3

Artifact:
renders/review/task-014d/scene-07-technical-redis-spotlight.png

Purpose:
Confirm the newly-converted technical-architecture Redis-node spotlight
reads correctly against a denser, already-high-contrast diagram.

What to review:
- Whether the dim effect is sufficiently perceptible against this image's
  naturally dark art (compare against
  `scene-07-technical-clean-check.png`, a pre-highlight frame of the same
  beat, if useful).
- Whether Client, Application, numbered arrows, callouts, and the latency
  panel remain readable and are not spotlighted.

Agent assessment:
PASS

Known issues:
- The dim effect is more subtle here than on the analogy-mapping image,
  because the technical-architecture artwork is already close to black in
  its own background. This is expected given the shared image and not a
  defect, but it's a legitimate item for human judgment: whether "subtle"
  here still reads as intentional guidance rather than negligible.

Human review status:
PENDING

### Review Request 4

Artifact:
renders/review/task-014d/scene-07-technical-database-spotlight.png

Purpose:
Confirm the newly-converted technical-architecture Database-node spotlight.

What to review:
- Same criteria as Review Request 3, mirrored for the Database node.

Agent assessment:
PASS

Known issues:
- Same subtlety note as Review Request 3.

Human review status:
PENDING

### Review Request 5

Artifact:
renders/review/task-014d/scene-07-analogy-handoff.png

Purpose:
Prove the analogy beat's Redis→Database handoff has no moment where both
spotlights (or neither, incorrectly) are visible.

What to review:
- Confirm the frame at the exact handoff second (4.7s) shows the full
  image at uniform, undimmed brightness — neither spotlight active.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 6

Artifact:
renders/review/task-014d/scene-07-technical-handoff.png

Purpose:
Prove the technical-architecture beat's Redis→Database handoff has no
overlap, mirroring Review Request 5.

What to review:
- Confirm the frame at the exact handoff second (11.9s) is visually
  identical to a clean, no-highlight frame of this beat.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 7

Artifact:
renders/review/task-014d/scene-07-start.png

Purpose:
Confirm the scene's opening frame (before any spotlight) is unaffected by
the conversion.

What to review:
- Full, uniform brightness, no seam between stacked image layers.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 8

Artifact:
renders/review/task-014d/scene-07-end.png

Purpose:
Confirm the scene's closing takeaway caption still appears correctly after
both images have fully faded, unaffected by the conversion.

What to review:
- Caption text, position, and timing look unchanged from before this task.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 9

Artifact:
renders/review/task-014d/scene-07-preview.mp4

Purpose:
Confirm the full Scene 07 sequence (both beats, all four spotlights, both
handoffs) plays back cleanly end to end with no drift, no simultaneous
spotlights, and a scene that "feels cleaner than the old FocusBox version."

What to review:
- Full playback of all four spotlight fade-in/hold/fade-out cycles.
- Any perceptible drift against each beat's push-in scale.
- Overall impression versus the prior FocusBox-based version.
- Whether Scene 07 is ready to lock.

Agent assessment:
PASS

Known issues:
- None observed in playback (full 540-frame / 18s render).

Human review status:
PENDING

## 10. Verification Results

```text
TypeScript:                  PASS
build:                       PASS
composition discovery:       PASS
scene validation:            PASS (validateEpisodeArchitecture runs at
                                    module load; bundling/discovery
                                    succeeded with no thrown error)
asset validation:            PASS (same mechanism as scene validation;
                                    both Scene 07 asset IDs still resolve)
source image preservation:   PASS (no diff under public/episodes/001-redis/assets/)
analogy Redis spotlight:     PASS
analogy Database spotlight:  PASS
analogy handoff:             PASS (no simultaneous spotlights)
technical Redis spotlight:   PASS
technical Database spotlight:PASS
technical handoff:           PASS (no simultaneous spotlights)
no seam:                     PASS (checked at scene-07-start.png, opacity 0 state)
no drift:                    PASS (shared transformed wrapper unchanged; single scale value feeds both image layers per beat)
no hard edge:                PASS (radial-gradient mask on all four targets, no clip-path)
no simultaneous spotlights:  PASS (pickActiveSpotlight enforces single-active-target per beat; confirmed visually at both handoff frames)
full Scene 07 MP4:           PASS (rendered, 540 frames / 18s, frames 2820-3359)
```

## 11. Problems / Risks

- The technical-architecture beat's dim effect is visually more subtle than
  the analogy-mapping beat's, purely because that source image's own
  background is already close to black — flagged above (Review Requests 3
  and 4) as a human-judgment item, not a code defect. The same
  `dimBrightness`/`featherPaddingFactor` values are applied identically to
  both images; the perceptual difference is a property of the artwork, not
  the implementation.
- No other visual concerns identified across the nine rendered artifacts.

## 12. Recommended Next Step

```text
If TASK-014D is human-approved:
→ lock Scene 07 and proceed to plan Scene 08.

Otherwise:
→ revise only the rejected spotlight target or timing; do not redesign the whole scene.
```

## 13. Git Status

Branch: `master`

Changed files (tracked, modified — pre-existing working-tree state from
before this task, not touched by TASK-014D):
```text
M src/episodes/001-redis/RedisEpisode.tsx
M src/episodes/001-redis/assets.ts
M src/episodes/001-redis/episode.config.ts
M src/episodes/001-redis/scenes.ts
M src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx
M src/shared/localization/index.ts
```

Untracked files carrying this task's actual code edits:
```text
?? src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx
     (untracked since before this task began; edited this task — full
     spotlight conversion of both beats)
?? src/shared/components/SpotlightImage.tsx
     (untracked since before this task began; unchanged this task — the
     component itself needed no edits, only its call sites in Scene 07)
```

Other pre-existing untracked files (assets, prior task files and feedback
reports, TASK-011A through TASK-014D) — unrelated to this task, unchanged:
```text
?? feedbacks/scene-07-motion-design-review.md
?? feedbacks/task-011a-feedback.md
?? feedbacks/task-012-feedback.md
?? feedbacks/task-013-feedback.md
?? feedbacks/task-013a-feedback.md
?? feedbacks/task-014-feedback.md
?? feedbacks/task-014a-feedback.md
?? feedbacks/task-014b-feedback.md
?? feedbacks/task-014c-feedback.md
?? public/episodes/001-redis/assets/scene-06-ready-shelf.png
?? public/episodes/001-redis/assets/scene-06-serve-from-shelf.png
?? public/episodes/001-redis/assets/scene-07-analogy-mapping.png
?? public/episodes/001-redis/assets/scene-07-technical-architecture.png
?? src/episodes/001-redis/scenes/Scene05RestaurantRepeatWork.tsx
?? src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx
?? tasks/TASK-011A.md ... tasks/TASK-014D.md
```

New untracked file from this task:
```text
?? feedbacks/task-014d-feedback.md
```

Ignored review media (confirmed via `git check-ignore -v`, matched by
`.gitignore:7: renders/*`):
```text
renders/review/task-014d/scene-07-start.png
renders/review/task-014d/scene-07-analogy-redis-spotlight.png
renders/review/task-014d/scene-07-analogy-database-spotlight.png
renders/review/task-014d/scene-07-technical-redis-spotlight.png
renders/review/task-014d/scene-07-technical-database-spotlight.png
renders/review/task-014d/scene-07-end.png
renders/review/task-014d/scene-07-preview.mp4
renders/review/task-014d/scene-07-analogy-handoff.png
renders/review/task-014d/scene-07-technical-handoff.png
renders/review/task-014d/scene-07-technical-clean-check.png
```

Commits/pushes: None. No commits were made and nothing was pushed; all
changes remain in the working tree per the task's "stop after feedback"
instruction.

## 14. Final Status

TASK-014D STATUS: PASS
