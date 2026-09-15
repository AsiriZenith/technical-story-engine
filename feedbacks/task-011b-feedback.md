# TASK-011B — Convert Scene 04 Highlighting to Spotlight Approach

## 1. Summary

Scene 04 ("Before Redis") has been converted from its rectangle/glow
`FocusFrame` emphasis to the same `SpotlightImage` spotlight system approved
for Scene 07 (TASK-014B/C/D). All four of Scene 04's existing highlight
beats — Request, Database, Expensive work, and Total Latency — now use
`SpotlightImage` instead of `FocusFrame`. The old `FocusFrame` component and
all four of its call sites were removed from the scene file entirely.
`SpotlightImage` itself gained one small, backward-compatible addition (an
`objectFit` prop, described in Section 2) to accommodate Scene 04's source
image, which — unlike Scene 07's assets — is not exactly the canvas's
aspect ratio and was already rendered with `objectFit: 'contain'` rather
than `'cover'`.

## 2. Final Spotlight Settings

```text
dimBrightness: 0.58
featherPaddingFactor: 0.55
```

`dimBrightness` remained exactly `0.58`, unchanged from Scene 07.

`featherPaddingFactor` **did require a retune**, down from `0.58/1.35`'s
`1.35` to `0.55`, for a concrete, measured reason (not a stylistic
preference):

`SpotlightImage`'s soft-edge mask is a CSS
`radial-gradient(ellipse <W>% <H>% at ...)`. Per the CSS spec, the two
explicit length/percentage values given to an ellipse gradient are its
**radii**, not its diameter. `SpotlightImage` computes
`maskWidthPct = region.width * 100 * featherPaddingFactor`, so the
mask's actual radius in pixels works out to `region_width_px *
featherPaddingFactor` — meaning the mask's real reach is roughly **double**
what "featherPaddingFactor × region size" reads as documented (the intended
meaning, per the component's own doc comment, is that value describing the
mask's full extent, not its radius).

This discrepancy is present for Scene 07 too, but didn't surface as a
visible defect there because Scene 07's targets have generous open space
around them. Scene 04's four targets are packed much more tightly — as
close as ~18px apart (Database's right edge to Work's left edge) — so at
`1.35`, the Request spotlight's mask (radius ≈ 816px × 1.35 ≈ 1102px)
visibly bled brightness into the Database node more than 700px away. This
was caught with a pixel-level check (see Section 9 / Problems and Risks for
the exact measurements) before it was visible enough to dismiss as
subjective. `0.55` was chosen empirically: at that value, each of the four
regions' mask radius (`region_width_px × 0.55`) stays within roughly its
own half-width plus the gap to its nearest neighbor, so no target lights up
a neighboring node. This is the "slight retune... only if truly necessary"
the task explicitly allows, and only `featherPaddingFactor` changed —
`dimBrightness` needed no adjustment.

The underlying radius-vs-diameter discrepancy in `SpotlightImage.tsx` was
deliberately **not** fixed in this task, since doing so would change
Scene 07's already-rendered, pending-human-review appearance (from
TASK-014D) without that being in this task's scope — see Section 11.

## 3. Converted Targets

```text
Request           -> SpotlightImage (was FocusFrame, left:86, top:417, width:816, height:221)
Database          -> SpotlightImage (was FocusFrame, left:1100, top:336, width:255, height:345)
Expensive work    -> SpotlightImage (was FocusFrame, left:1373, top:321, width:355, height:380)
Total Latency     -> SpotlightImage (was FocusFrame, left:513, top:872, width:900, height:122)
```

**Target mapping note (per the task's "nearest equivalent" instruction):**
Scene 04's current implementation never had a separate "Application"
highlight. The "Request" `FocusFrame` box is a single wide rectangle that
spans both the Client/User icon *and* the Application node together in the
source diagram — there is no distinct pixel region in the existing code
that isolates Application alone. Per TASK-011B Section 9's explicit
guidance ("if one of those target labels does not exactly exist... render
the nearest equivalent spotlight checkpoint and document the mapping"),
`scene-04-application-spotlight.png` renders the same Request spotlight
target (same region, a nearby moment in its hold window) rather than a
distinct one. No new region was invented to split Request from Application,
since doing so would require guessing at coordinates not present in the
current implementation, which is out of scope for a highlighting-system
upgrade that must preserve the existing scene structure.

All four normalized (0-1) regions, converted from the removed `FocusFrame`
pixel boxes against the 1920x1080 canvas:

```text
Request         x: 0.0447916667  y: 0.3861111111  width: 0.425          height: 0.2046296296
Database        x: 0.5729166667  y: 0.3111111111  width: 0.1328125      height: 0.3194444444
Expensive work  x: 0.7151041667  y: 0.2972222222  width: 0.1848958333   height: 0.3518518519
Total Latency   x: 0.2671875     y: 0.8074074074  width: 0.46875        height: 0.1129629630
```

## 4. Timing

```text
Request spotlight window:         2.8s -> 4.6s hold, fade out to 4.9s
Database spotlight window:        4.9s -> fade in to 5.2s, holds to 6.7s, fade out to 7.0s
Expensive-work spotlight window:  7.0s -> fade in to 7.3s, holds to 9.2s, fade out to 9.55s
Total Latency spotlight window:   9.55s -> fade in to 9.9s, holds to scene end (12.0s)
```

Windows do not overlap. Two of the three handoffs (Request->Database at
4.9s, Database->Work at 7.0s) already met exactly in the pre-existing
timing and needed no change. The third (Work->Total) had a ~0.05s overlap
(`workFocusOut` 9.2 + its 0.35s fade-out = 9.55, but `totalFocusIn` was
previously 9.5, i.e. 0.05s before Work's fade-out fully completed) — this
was closed by nudging `totalFocusIn` from `9.5` to `9.55`
(`workFocusOut + fadeOutDuration`), the same "tiny adjustment... only to
prevent spotlight overlap" pattern already used in Scene 07 (TASK-014D).
No other timing changed. As in Scene 07, this is enforced structurally, not
just numerically: `pickSequentialSpotlight(seconds, segments)` selects
exactly one of the four targets per frame based on ascending handoff
seconds, so at most one `SpotlightImage` region is ever active.

## 5. Transform Safety

Confirmed. Scene 04 previously had the same transform-tracking defect
already fixed in Scenes 06/07 (TASK-013A/014D): the diagram `<Img>` lived
inside one `AbsoluteFill` with `transform: scale(diagramScale)`, while the
four `FocusFrame` boxes lived in a **separate**, untransformed sibling
`AbsoluteFill` — positioned in fixed canvas coordinates that didn't track
the image's own small entrance scale (0.985 -> 1.0 over the first 0.8s).
This is fixed as a side effect of the conversion: `SpotlightImage` now owns
a single wrapper `<div style={{transform: scale(diagramScale)}}>`
containing both its dimmed base `<Img>` and its masked full-brightness
`<Img>` as siblings — the same `diagramScale` value the scene already
computed is passed straight into `SpotlightImage`'s `scale` prop, so both
image layers move in lockstep, and there is no separate, untransformed
overlay layer anymore.

## 6. Source Asset Preservation

Confirmed unchanged.
`public/episodes/001-redis/assets/scene-04-original-request-path.jpg` was
only read at render time via `staticFile()`, exactly as before — never
opened for editing, replaced, cropped, or recolored. `git status` (Section
13) shows no changes under `public/episodes/001-redis/assets/`.

## 7. Old Highlight Removal

The `FocusFrame` component definition and all four of its call sites
(Request, Database, Work, Total) were removed from
`Scene04OriginalRequestPath.tsx` and replaced by a single `SpotlightImage`
whose active `region`/`spotlightOpacity` switches between the four targets
via `pickSequentialSpotlight`. A grep for `FocusFrame` in the file now
matches only three code comments documenting the pixel-to-normalized
conversion and the transform-safety fix — no component definition or JSX
usage remains.

## 8. Review Artifacts

```text
renders/review/task-011b/scene-04-start.png
renders/review/task-011b/scene-04-request-spotlight.png
renders/review/task-011b/scene-04-application-spotlight.png
renders/review/task-011b/scene-04-database-spotlight.png
renders/review/task-011b/scene-04-expensive-work-spotlight.png
renders/review/task-011b/scene-04-handoff-check.png
renders/review/task-011b/scene-04-end.png
renders/review/task-011b/scene-04-preview.mp4
```

All frames render against the `Redis-EN` composition. Scene 04 occupies
global frames 1590-1949 (360 frames / 12s, unchanged from before this
task, confirmed via `remotion compositions` reporting the same 3360-frame
episode total as before).

## 9. Human Review Requests

### Review Request 1

Artifact:
renders/review/task-011b/scene-04-start.png

Purpose:
Confirm the scene's clean, pre-highlight state is unaffected by the
conversion.

What to review:
- Full, uniform brightness, no seam between the stacked image layers.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
renders/review/task-011b/scene-04-request-spotlight.png

Purpose:
Confirm the Request spotlight (covering the User/Client + Application
nodes, per the documented target mapping) reads correctly and does not
bleed into the Database node to its right.

What to review:
- Whether the highlighted region is the right one, and whether it's too
  broad or too tight.
- Whether Database, Expensive work, and Total Latency are all visibly
  dimmed with no partial "ghost" brightness leaking in.

Agent assessment:
PASS

Known issues:
- None observed after the featherPaddingFactor retune; see Section 2/11
  for the bleed issue found and fixed during this task.

Human review status:
PENDING

### Review Request 3

Artifact:
renders/review/task-011b/scene-04-application-spotlight.png

Purpose:
Cover the task's requested "Application" checkpoint via its documented
nearest-equivalent mapping (same Request region, since no separate
Application highlight exists in the current scene).

What to review:
- Whether reusing the combined Request/Application region is acceptable,
  or whether a future task should split it into two distinct spotlights.

Agent assessment:
PASS WITH ISSUES

Known issues:
- This is a mapping choice, not a rendering defect: there is no dedicated
  Application-only spotlight in Scene 04's current implementation. Flagging
  for human judgment on whether splitting Request/Application into two
  separate spotlights is worth a follow-up task.

Human review status:
PENDING

### Review Request 4

Artifact:
renders/review/task-011b/scene-04-database-spotlight.png

Purpose:
Confirm the Database spotlight is tight and correctly isolated from its
very close neighbors (Request ~198px to its left, Work only ~18px to its
right).

What to review:
- Whether the Database node stays clearly the brightest element with no
  spillover into the adjacent Work node.

Agent assessment:
PASS

Known issues:
- None observed; this was the tightest-spaced target and the main proof
  point for the featherPaddingFactor retune.

Human review status:
PENDING

### Review Request 5

Artifact:
renders/review/task-011b/scene-04-expensive-work-spotlight.png

Purpose:
Confirm the Expensive Work spotlight (the scene's most important beat) is
clean and doesn't bleed back into the adjacent Database node.

What to review:
- Whether "Expensive work" reads as clearly the emphasized element.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 6

Artifact:
renders/review/task-011b/scene-04-handoff-check.png

Purpose:
Prove the Work->Total handoff (the one timing adjustment made in this
task, 9.5s -> 9.55s) has no moment where two spotlights are both visible.

What to review:
- Confirm the frame at the handoff second shows the full image at uniform,
  undimmed brightness, with neither spotlight active.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 7

Artifact:
renders/review/task-011b/scene-04-end.png

Purpose:
Confirm the scene's final state (Total Latency spotlighted, holding to the
end) looks correct.

What to review:
- Whether "Total Latency: ~180 ms" reads as the clear closing emphasis.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 8

Artifact:
renders/review/task-011b/scene-04-preview.mp4

Purpose:
Confirm the full Scene 04 sequence (all four spotlights, all three
handoffs) plays back cleanly end to end, with no drift against the
diagram's small entrance scale, and reads as cleaner/more professional than
the old FocusFrame version.

What to review:
- Full playback of all four spotlight fade-in/hold/fade-out cycles.
- Any perceptible drift during the diagram's 0.985->1.0 entrance scale.
- Overall impression versus the prior rectangle/glow version.

Agent assessment:
PASS

Known issues:
- None observed in playback (full 360-frame / 12s render).

Human review status:
PENDING

## 10. Verification Results

```text
TypeScript:                    PASS
build:                         PASS
composition discovery:         PASS
scene validation:              PASS (validateEpisodeArchitecture runs at
                                      module load; bundling/discovery
                                      succeeded with no thrown error)
asset validation:               PASS (same mechanism; scene04OriginalRequestPath
                                      still resolves)
source image preservation:      PASS (no diff under public/episodes/001-redis/assets/)
request spotlight:               PASS
application spotlight:           PASS (documented nearest-equivalent mapping, not a distinct region)
database spotlight:               PASS
expensive-work spotlight:          PASS
handoff check:                      PASS (no simultaneous spotlights)
no seam:                             PASS (checked at scene-04-start.png, opacity-0 state)
no drift:                            PASS (single shared transformed wrapper; one diagramScale value feeds SpotlightImage)
no hard edge:                        PASS (radial-gradient mask on all four targets, no clip-path)
no simultaneous conflicting spotlights: PASS (pickSequentialSpotlight enforces single-active-target; confirmed at handoff frame)
preview MP4:                          PASS (rendered, 360 frames / 12s, frames 1590-1949)
```

## 11. Problems / Risks

- **Found and fixed within this task's scope:** the initial pass using
  Scene 07's exact `featherPaddingFactor: 1.35` produced visible spotlight
  bleed between Scene 04's closely-packed targets. This was caught with a
  pixel-level brightness comparison across the four spotlight stills (not
  just visual inspection) before finalizing — sample data: with
  `1.35`, the Database-node pixel measured `(131,156,198)` while Request
  was spotlighted, versus its own fully-bright value of `(161,190,241)` and
  its fully-dimmed value of `(93,110,140)` — clearly a partial, unwanted
  reveal. After retuning to `0.55`, the same pixel measured the correct
  fully-dimmed `(93,110,140)` while Request was active. Fixed by retuning
  Scene 04's `featherPaddingFactor` only, as documented in Section 2.
- **Not fixed, flagged for a separate follow-up:** the root cause is a
  units mismatch inside `SpotlightImage.tsx` itself — CSS
  `radial-gradient(ellipse <W> <H> at ...)` treats the two given lengths as
  radii, but `maskWidthPct`/`maskHeightPct` are computed as if they were the
  mask's full width/height, making the actual soft-edge reach roughly 2x
  what `featherPaddingFactor`'s documentation describes. This affects
  Scene 07 too (not just Scene 04) but wasn't a visible problem there
  because its targets have more open space around them. Fixing the
  underlying formula was deliberately left alone here, since it would
  change Scene 07's already-rendered, pending-human-review appearance
  (TASK-014D's `1.35` value was tuned and approved-pending against the
  current, doubled-reach behavior) without that being part of this task's
  scope ("do not refactor unrelated scenes"). Recommend a dedicated
  follow-up task to fix `SpotlightImage`'s mask-sizing math and re-tune
  Scene 07's `featherPaddingFactor` in step with it, so the documented
  contract ("how much larger... as a multiple of the region's own size")
  matches the actual rendered result for every scene using the component.
- **Target-mapping choice, not a defect:** the "Application" review
  artifact reuses the Request region rather than a distinct one, since no
  separate Application highlight exists in Scene 04's current
  implementation (see Section 3). Flagged for human judgment on whether a
  future task should split it.
- No other visual concerns identified across the eight rendered artifacts.

## 12. Recommended Next Step

```text
If TASK-011B is human-approved:
→ lock Scene 04 spotlight behavior and continue with the next planned scene task.

Otherwise:
→ revise only the rejected spotlight target or timing; do not redesign the whole scene.
```

## 13. Git Status

Branch: `master`

Changed files (tracked, modified):
```text
M src/episodes/001-redis/RedisEpisode.tsx        (pre-existing, unrelated to this task)
M src/episodes/001-redis/assets.ts                (pre-existing, unrelated to this task)
M src/episodes/001-redis/episode.config.ts        (pre-existing, unrelated to this task)
M src/episodes/001-redis/scenes.ts                (pre-existing, unrelated to this task)
M src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx
     (this task's actual edit — full spotlight conversion)
M src/shared/localization/index.ts                (pre-existing, unrelated to this task)
```

Untracked files:
```text
?? src/shared/components/SpotlightImage.tsx
     (untracked since before this task; edited this task — added the
     optional `objectFit` prop, described in Section 2, needed for Scene
     04's non-16:9 asset; default behavior for existing 'cover' callers
     such as Scene 07 is unchanged)
```

Other pre-existing untracked files (assets, prior task files and feedback
reports) — unrelated to this task, unchanged:
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
?? feedbacks/task-014d-feedback.md
?? public/episodes/001-redis/assets/scene-06-ready-shelf.png
?? public/episodes/001-redis/assets/scene-06-serve-from-shelf.png
?? public/episodes/001-redis/assets/scene-07-analogy-mapping.png
?? public/episodes/001-redis/assets/scene-07-technical-architecture.png
?? src/episodes/001-redis/scenes/Scene05RestaurantRepeatWork.tsx
?? src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx
?? src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx
?? tasks/TASK-011A.md ... tasks/TASK-014D.md
```

New untracked file from this task:
```text
?? feedbacks/task-011b-feedback.md
```

Ignored review media (confirmed via `git check-ignore -v`, matched by
`.gitignore:7: renders/*`):
```text
renders/review/task-011b/scene-04-start.png
renders/review/task-011b/scene-04-request-spotlight.png
renders/review/task-011b/scene-04-application-spotlight.png
renders/review/task-011b/scene-04-database-spotlight.png
renders/review/task-011b/scene-04-expensive-work-spotlight.png
renders/review/task-011b/scene-04-handoff-check.png
renders/review/task-011b/scene-04-end.png
renders/review/task-011b/scene-04-preview.mp4
```

Commits/pushes: None. No commits were made and nothing was pushed; all
changes remain in the working tree.

## 14. Final Status

TASK-011B STATUS: PASS
