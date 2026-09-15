# TASK-013A Feedback - Fix Scene 06 MP4 Ready-Shelf Highlighting Only

## 1. Summary

This task made a single, scoped correction: the ready-shelf focus/highlight
overlay in Scene 06 ("The Ready Shelf / Cache-Hit Analogy"), specifically the
drift and misalignment reported in the ~2s–5s window of
`renders/review/task-013/scene-06-preview.mp4`. The approved source PNGs and
their background were not touched, no new media was generated, Scene 07 and
all other scenes were not modified. Only
`src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx` was changed.

## 2. Root Cause

I inspected the actual implementation and the source PNG before changing
anything, per the lesson from TASK-011A. Two concrete, code-confirmed causes
were found — not guessed:

1. **Image scale/translation while the overlay stayed fixed (the primary
   cause of the reported 2s→5s drift).** The `RestaurantBeat` component
   applied `transform: scale(${scale}) translateX(${panX}px)` directly to
   the `<Img>` element, while `ShelfFocusFrame` was rendered as a plain
   sibling `<div>` with static `position: absolute; left/top/width/height`
   values and no transform of its own. During the shelf beat (0.4s–5.6s),
   the image scales from 1.0 to 1.045 and pans from 0 to -20px. The old
   focus window (`shelfFocusIn: 1.9s` to `shelfFocusOut: 5.15s`) sits inside
   that same moving interval: at 1.9s the image had already reached
   `scale ≈ 1.013, panX ≈ -5.8px`, and by 5.15s it reached
   `scale ≈ 1.041, panX ≈ -18.3px`. Since the box never moved or scaled to
   match, it drifted relative to the shelf cabinet throughout the entire
   visible highlight window — worse toward the end, which matches the "the
   problem is most visible from approximately 2s → 5s" report exactly.
2. **The box's base coordinates were also imprecise, independent of the
   drift.** I derived the shelf cabinet's true bounds directly from
   `scene-06-ready-shelf.png` (which is 1672×941 — the same 16:9 aspect
   ratio as the 1920×1080 canvas, so it renders full-bleed via
   `objectFit: 'cover'` with no letterboxing/cropping to account for): the
   cabinet (header bar + both glass shelves) occupies roughly the
   fractional region x 0.476–0.675, y 0.295–0.647 of the source image,
   which maps to canvas coordinates `left ≈ 915, top ≈ 318, width ≈ 381,
   height ≈ 381`. The old box was `left: 995, top: 315, width: 350, height:
   420` — about 80px too far right (clipping the left portion of the
   cabinet header/sign, the direction that also brings the box closer to
   the cashier), and about 40px too tall at the bottom (extending past the
   cabinet's true bottom edge). This matches "the amber ready-shelf focus
   rectangle is too large... does not tightly match the intended ready-shelf
   area."

No `objectFit` mismatch was involved beyond what's described above — `cover`
on an already-16:9 source is effectively a no-op crop, so it was not a
contributing factor once the transform-sync and coordinate issues were
fixed.

## 3. Fix

Per the task's own guidance ("apply equivalent transform to the highlight,
or simplify/remove the image pan... choose the simpler and more reliable
solution"), I chose to make the highlight track the image, since a
tightly-fitted highlight was still judged worth keeping (removing it
entirely was the fallback, not needed here once tracking was fixed
correctly):

- **`RestaurantBeat` now applies its scale/pan transform to a wrapping
  `<div>` that contains both the `<Img>` and an optional focus-frame
  overlay, passed in as `children`**, instead of applying the transform to
  the `<Img>` alone and rendering the overlay as an untransformed sibling.
  CSS `transform` (when not `none`) makes its element a containing block for
  absolutely-positioned descendants, so `ShelfFocusFrame` — still using the
  same simple `left/top/width/height` coordinates it always used, expressed
  against the untransformed 1920×1080 canvas — now scales and translates in
  exact lockstep with the image, at every frame, automatically. No manual
  `transform-origin` offset math was needed; this is the simpler, more
  reliable option the task recommended.
- **The box's base coordinates were corrected** to `left: 912, top: 315,
  width: 385, height: 385` (from the source-image-derived measurement
  above), so it now tightly bounds the cabinet frame, the "Ready shelf"
  sign, and the shelf containing the burger — and stops short of the
  cashier on the left and the chef on the right, as required.
- **Visual treatment kept the same "thin outline + subtle glow" style** the
  task asked for (3px amber border, soft `boxShadow` glow, no fill), only
  slightly reducing the glow radius (32px → 26px) and corner radius (22 →
  18) to match the smaller, tighter box — otherwise unchanged.
- **No rectangle was removed.** Once precisely tracked and tightly sized,
  the highlight cleanly satisfies "look here: the burger is already waiting
  on the shelf" without drifting or oversizing, so the safer
  no-highlight/vignette fallback was not needed.
- **Timing was not changed.** `shelfFocusIn: 1.9s` / `shelfFocusOut: 5.15s`
  and every other beat in the scene are untouched; only the box's
  positioning mechanism and its base coordinates changed. Overall Scene 06
  duration remains the existing 420-frame / 14-second window
  (`sharedWindow(12, 2)` in `scenes.ts`, untouched by this task).

## 4. Source Asset Preservation

- Exact PNG paths:
  - `public/episodes/001-redis/assets/scene-06-ready-shelf.png`
  - `public/episodes/001-redis/assets/scene-06-serve-from-shelf.png`
- Neither file was opened with a write/edit tool during this task — both
  remain byte-identical to their state at the start of this task (confirmed
  via checksum: `scene-06-ready-shelf.png` = `0775e2e7476b5b9c0f68133d7a35e645`,
  `scene-06-serve-from-shelf.png` = `b00677804d5e9b7124c968ca5a922408`).
- The background (dark restaurant scene baked into both PNGs, plus the
  scene's own `theme.background` fill) is untouched; only the overlay logic
  in the `.tsx` component changed.

## 5. Review Artifacts

- `renders/review/task-013a/scene-06-highlight-2s.png`
- `renders/review/task-013a/scene-06-highlight-3s.png`
- `renders/review/task-013a/scene-06-highlight-4s.png`
- `renders/review/task-013a/scene-06-highlight-5s.png`
- `renders/review/task-013a/scene-06-clean.png`
- `renders/review/task-013a/scene-06-preview.mp4`
- `renders/review/task-013a/scene-01-regression.png`
- `renders/review/task-013a/scene-02-regression.png`
- `renders/review/task-013a/scene-03-regression.png`
- `renders/review/task-013a/scene-04-regression.png`
- `renders/review/task-013a/scene-05-regression.png`

## 6. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-013a/scene-06-highlight-2s.png`

Purpose:
Confirm the ready-shelf highlight is correctly aligned near the start of its
visible window.

What to review:
- Whether the box tightly bounds the cabinet, sign, and shelved burger.
- Whether it avoids the cashier and chef.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-013a/scene-06-highlight-3s.png`

Purpose:
Confirm alignment holds partway through the previously-drifting window.

What to review:
- Whether the box remains tightly on the shelf, matching the 2s frame.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 3

Artifact:
`renders/review/task-013a/scene-06-highlight-4s.png`

Purpose:
Confirm alignment holds further into the previously-drifting window.

What to review:
- Whether the box remains tightly on the shelf, matching the 2s/3s frames.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 4

Artifact:
`renders/review/task-013a/scene-06-highlight-5s.png`

Purpose:
Confirm alignment holds at the end of the focus window, where drift was
previously worst.

What to review:
- Whether the box remains tightly on the shelf with no visible drift
  compared to the 2s/3s/4s frames.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 5

Artifact:
`renders/review/task-013a/scene-06-clean.png`

Purpose:
Confirm the underlying images and background are unchanged, with no overlay
present.

What to review:
- Whether the image/background exactly match the previously-approved Scene
  06 visual.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 6

Artifact:
`renders/review/task-013a/scene-06-preview.mp4`

Purpose:
Review the full 14-second Scene 06 sequence with the corrected, tracked
highlight.

What to review:
- Whether the ready-shelf highlight now feels correct and stable throughout
  its visible window, with no drift.
- Whether it still feels subtle and supportive rather than intrusive.
- Whether the rest of the scene (serve-from-shelf beat, captions, beat
  marker) is unaffected.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

## 7. External Asset Requests

None.

## 8. Verification Results

| Check | Result | Notes |
| --- | --- | --- |
| TypeScript | PASS | `npm run typecheck` |
| build | PASS | `npm run build` |
| composition discovery | PASS | `npm run compositions`; Redis-EN/DE/FR unchanged at 3360 frames, 112.00s (Scene 06 duration unchanged) |
| scene validation | PASS | Exercised during module load by typecheck/build/composition discovery (`validateEpisodeArchitecture`) |
| asset validation | PASS | `scene06ReadyShelf` / `scene06ServeFromShelf` manifest entries untouched, still `approved` |
| highlight @ 2s | PASS | `renders/review/task-013a/scene-06-highlight-2s.png` |
| highlight @ 3s | PASS | `renders/review/task-013a/scene-06-highlight-3s.png` |
| highlight @ 4s | PASS | `renders/review/task-013a/scene-06-highlight-4s.png` |
| highlight @ 5s | PASS | `renders/review/task-013a/scene-06-highlight-5s.png` |
| Scene 06 MP4 | PASS | `renders/review/task-013a/scene-06-preview.mp4`, 7 MB |
| Scene 01 regression | PASS | `renders/review/task-013a/scene-01-regression.png` |
| Scene 02 regression | PASS | `renders/review/task-013a/scene-02-regression.png` |
| Scene 03 regression | PASS | `renders/review/task-013a/scene-03-regression.png` |
| Scene 04 regression | PASS | `renders/review/task-013a/scene-04-regression.png` (confirms TASK-011A's Scene 04 highlight fix remains intact) |
| Scene 05 regression | PASS | `renders/review/task-013a/scene-05-regression.png` |

## 9. Problems / Risks

- The corrected box coordinates (`left: 912, top: 315, width: 385, height:
  385`) were derived from the source PNG's own layout by visual inspection
  (fractional position mapped onto the rendered canvas), not an automated
  pixel-measurement tool. They were verified across four sampled frames
  spanning the entire previously-drifting window (2s, 3s, 4s, 5s) and show
  no visible drift or misalignment in any of them. If the source PNG is
  ever replaced or re-exported with a different internal layout, this box
  would need re-verification — but the task requires keeping the exact
  existing PNGs unchanged, so this is not an active risk today.
- The same transform-tracking fix (wrapping the `<Img>` and any focus-frame
  overlay in one transformed container) is a pattern worth reusing for any
  other scene that pairs a panning/scaling image with a focus-frame overlay,
  to avoid the same class of bug recurring.

## 10. Recommended Next Step

If Scene 06 MP4 highlighting is human-approved:
-> keep Scene 06 locked and continue reviewing remaining scene MP4s.

Otherwise:
-> revise only Scene 06 highlight logic again.

## 11. Git Status

- Branch: `master`
- Changed files:
  - The following files were already modified before this task began (from
    TASK-012/013/014/011A, not committed yet) and were not touched further
    by this task: `src/episodes/001-redis/RedisEpisode.tsx`,
    `src/episodes/001-redis/assets.ts`,
    `src/episodes/001-redis/episode.config.ts`,
    `src/episodes/001-redis/scenes.ts`,
    `src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx`,
    `src/shared/localization/index.ts`
  - `src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx` is the
    file this task modified; it shows as untracked (`??`) rather than
    modified (`M`) because it was created, not yet committed, in an earlier
    task (TASK-013).
- Untracked files (all pre-existing from earlier tasks except this report;
  none of the pre-existing ones were touched by this task):
  - `feedbacks/task-011a-feedback.md`
  - `feedbacks/task-012-feedback.md`
  - `feedbacks/task-013-feedback.md`
  - `feedbacks/task-014-feedback.md`
  - `public/episodes/001-redis/assets/scene-06-ready-shelf.png` (verified
    byte-unchanged, see Source Asset Preservation)
  - `public/episodes/001-redis/assets/scene-06-serve-from-shelf.png`
    (verified byte-unchanged, see Source Asset Preservation)
  - `public/episodes/001-redis/assets/scene-07-analogy-mapping.png`
  - `public/episodes/001-redis/assets/scene-07-technical-architecture.png`
  - `src/episodes/001-redis/scenes/Scene05RestaurantRepeatWork.tsx`
  - `src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx`
  - `src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx`
  - `tasks/TASK-011A.md`
  - `tasks/TASK-012.md`
  - `tasks/TASK-013.md`
  - `tasks/TASK-013A.md`
  - `tasks/TASK-014.md`
  - `feedbacks/task-013a-feedback.md` (this report)
- Ignored review media:
  - `renders/review/task-013a/scene-06-highlight-2s.png`
  - `renders/review/task-013a/scene-06-highlight-3s.png`
  - `renders/review/task-013a/scene-06-highlight-4s.png`
  - `renders/review/task-013a/scene-06-highlight-5s.png`
  - `renders/review/task-013a/scene-06-clean.png`
  - `renders/review/task-013a/scene-06-preview.mp4`
  - `renders/review/task-013a/scene-01-regression.png`
  - `renders/review/task-013a/scene-02-regression.png`
  - `renders/review/task-013a/scene-03-regression.png`
  - `renders/review/task-013a/scene-04-regression.png`
  - `renders/review/task-013a/scene-05-regression.png`
- Commits/pushes: none.

## 12. Final Status

TASK-013A STATUS: PASS
