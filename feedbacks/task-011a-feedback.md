# TASK-011A Feedback - Fix Scene 04 MP4 Highlighting / Focus Timing Only

## 1. Summary

This task made a single, scoped correction: the animated focus/highlight
overlays in Scene 04 ("Original Request Path"). The approved source JPG and
its background were not touched, no new media was generated, and no other
scene was redesigned. Only
`src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx` was changed.

## 2. Root Cause

I inspected the existing implementation and the source JPG's own proportions
before changing anything. Two concrete bugs were found:

1. **Oversized, unscoped region ("Request" highlight covered Database
   too).** The single "path" focus box was hardcoded at
   `left: 320, top: 432, width: 1270, height: 200`. Its right edge sat at
   `320 + 1270 = 1590` canvas pixels. The Database node, however, starts at
   canvas x ≈ 1104 (derived from the JPG's own layout — see below). So this
   one box stretched roughly 490px past the end of the Application block,
   straight across the Database node, before the Expensive Work box even
   began. This is exactly the "highlight regions are too broad and visually
   overlap unrelated areas" symptom the user reported, and it also meant
   there was no dedicated Database highlight at all — the task's four-step
   sequence (Request/Application → Database → Expensive Work → Total
   Latency) was being rendered as only three overlay windows, with Database
   silently absorbed into the oversized first box.
2. **Undersized, vertically-offset "Expensive Work" box.** That box was
   `left: 1372, top: 372, width: 325, height: 292`. Its left edge (1372) was
   almost exactly correct, but its top edge started about 51px too low and
   its bottom edge fell about 79px short of the actual red panel's extent —
   so the box visibly clipped the top CPU/gear icons and the bottom gear
   icon of the "Expensive work" panel while glowing over adjacent empty
   canvas at the sides. This produced the "highlight regions... do not
   visually misalign with the underlying JPG" symptom.

No scaling/`objectFit` bug was involved — the diagram already renders at
`objectFit: 'contain'`, and because the source JPG (2752x1536) is nearly
exactly 16:9, it fills the full 1920px canvas width with only ~4px of
top/bottom letterboxing. The bug was purely in the hand-picked pixel
constants for the boxes, not in the scaling math.

## 3. Fix

- **Coordinates re-derived from the source JPG's own layout, not
  re-guessed.** I opened `scene-04-original-request-path.jpg` directly,
  located each of the four target regions (User/Client→Request→Application,
  Database, Expensive Work, Total Latency) as fractional positions within
  the image, and mapped those fractions onto the actual rendered canvas
  geometry (1920 × 1071.7px image area, ~4.15px top offset from the minor
  letterboxing). This is documented in a code comment directly above the
  four `FocusFrame` elements so the derivation isn't lost.
- **Added the missing fourth highlight.** The scene now has one
  `FocusFrame` per intended target — Request/Application, Database,
  Expensive Work, Total Latency — instead of three windows covering four
  concepts.
- **Tightened each box to its own element only**, with small gaps between
  neighboring boxes (e.g. the Request box now ends at canvas x≈902, well
  before the Database box starts at x≈1100) so no box can visually bleed
  into a neighboring label even at the edges of its fade-in/out window.
- **Corrected the Expensive Work box's vertical extent** (`top: 321, height:
  380` vs. the old `top: 372, height: 292`) so it now fully encloses the red
  panel including its top and bottom icons.
- **Simplified the opacity math.** The old code multiplied each window's
  `interpolate()` opacity by an extra fixed alpha baked into both the color
  string and a numeric factor (e.g. `pathOpacity * 0.48`), which made the
  actual on-screen alpha hard to reason about and tune. Each box's color now
  carries its final alpha directly (`rgba(..., 0.85)`), and the `opacity`
  style prop is driven purely by the timing window — one clear multiplier
  instead of two compounding ones. Visual style is otherwise unchanged: thin
  4px border + soft outer glow, matching the task's "Preferred: a thin,
  clean focus outline or subtle glow" guidance.
- **Timing**: the four regions now reveal sequentially, left to right,
  matching the intended explanation order — Request/Application
  (2.8–4.6s) → Database (4.9–6.7s) → Expensive Work (7.0–9.2s, the longest
  hold, since the task calls this "the most important emphasis") → Total
  Latency (9.5s onward, held to the end as before). Only one box is ever
  visible at a time (no stacked/overlapping focus frames). The scene's
  overall duration is unchanged — still the 360-frame / 12-second window
  from `scene04Window` (`sharedWindow(11)` in `scenes.ts`, untouched by this
  task) — only the internal beat timings for the four highlight windows
  were adjusted, which the task explicitly allowed ("a small timing
  adjustment" for the highlight correction itself).

## 4. Source Asset Preservation

- Exact JPG path: `public/episodes/001-redis/assets/scene-04-original-request-path.jpg`
- `git diff --stat` on this exact path shows no changes — the file was not
  edited, replaced, or regenerated.
- The background (grid pattern, radial gradients, "Before Redis" / "180 ms"
  header) is produced by unrelated code earlier in the same component and
  was not touched.

## 5. Review Artifacts

- `renders/review/task-011a/scene-04-clean.png`
- `renders/review/task-011a/scene-04-highlight-request.png`
- `renders/review/task-011a/scene-04-highlight-database.png`
- `renders/review/task-011a/scene-04-highlight-expensive-work.png`
- `renders/review/task-011a/scene-04-highlight-latency.png`
- `renders/review/task-011a/scene-04-preview.mp4`
- `renders/review/task-011a/scene-01-regression.png`
- `renders/review/task-011a/scene-02-regression.png`
- `renders/review/task-011a/scene-03-regression.png`

## 6. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-011a/scene-04-highlight-request.png`

Purpose:
Confirm the Request/Application highlight is scoped correctly.

What to review:
- Whether the box cleanly bounds only User/Client → Request → Application.
- Whether it stops before the Database node (it should not touch it).

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-011a/scene-04-highlight-database.png`

Purpose:
Confirm the new, previously-missing Database highlight is scoped correctly.

What to review:
- Whether the box bounds only the Database block.
- Whether it avoids the Application block on the left and the Expensive Work
  panel on the right.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 3

Artifact:
`renders/review/task-011a/scene-04-highlight-expensive-work.png`

Purpose:
Confirm the Expensive Work highlight now fully encloses that panel.

What to review:
- Whether the box now covers the full red "Expensive work" panel, including
  the top and bottom gear/CPU icons that were previously clipped.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 4

Artifact:
`renders/review/task-011a/scene-04-highlight-latency.png`

Purpose:
Confirm the Total Latency highlight remains correctly aligned.

What to review:
- Whether the box cleanly bounds only the "Total Latency: ~180 ms" panel.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 5

Artifact:
`renders/review/task-011a/scene-04-clean.png`

Purpose:
Confirm the underlying diagram and background are unchanged, with no overlay
present.

What to review:
- Whether the image/background exactly match the previously-approved Scene
  04 visual.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 6

Artifact:
`renders/review/task-011a/scene-04-preview.mp4`

Purpose:
Review the full 12-second Scene 04 sequence with the corrected highlight
timing.

What to review:
- Whether the four highlights now feel cleaner and easier to follow than the
  previous MP4.
- Whether the sequential reveal (Request → Database → Expensive Work → Total
  Latency) matches the intended explanation order.
- Whether motion still feels restrained.

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
| composition discovery | PASS | `npm run compositions`; Redis-EN/DE/FR unchanged at 3360 frames, 112.00s (Scene 04 duration unchanged) |
| scene validation | PASS | Exercised during module load by typecheck/build/composition discovery (`validateEpisodeArchitecture`) |
| asset validation | PASS | `scene04OriginalRequestPath` manifest entry untouched, still `approved` |
| request highlight frame | PASS | `renders/review/task-011a/scene-04-highlight-request.png` |
| database highlight frame | PASS | `renders/review/task-011a/scene-04-highlight-database.png` |
| expensive-work highlight frame | PASS | `renders/review/task-011a/scene-04-highlight-expensive-work.png` |
| latency highlight frame | PASS | `renders/review/task-011a/scene-04-highlight-latency.png` |
| Scene 04 MP4 | PASS | `renders/review/task-011a/scene-04-preview.mp4`, 1.1 MB |
| Scene 01 regression | PASS | `renders/review/task-011a/scene-01-regression.png` |
| Scene 02 regression | PASS | `renders/review/task-011a/scene-02-regression.png` |
| Scene 03 regression | PASS | `renders/review/task-011a/scene-03-regression.png` |

## 9. Problems / Risks

- The four focus-box coordinates were derived from the JPG's visual layout by
  inspection (fractional position mapped onto the rendered canvas), not from
  an automated pixel-measurement tool. They were then verified against
  actual rendered stills at each highlight's peak-visibility frame, and all
  four align cleanly in those renders. If the source JPG is ever replaced or
  re-exported at different internal margins, these coordinates would need
  re-verification — but the task requires keeping the exact existing JPG
  unchanged, so this is not an active risk today.
- No narration audio exists yet, so the new sequential timing (Request 2.8s →
  Database 4.9s → Expensive Work 7.0s → Total Latency 9.5s) was tuned by
  visual pacing only; final narration may call for small adjustments to
  these same four numbers, without needing further coordinate changes.

## 10. Recommended Next Step

If Scene 04 MP4 highlight behavior is human-approved:
-> keep Scene 04 locked and continue reviewing later scene MP4s.

Otherwise:
-> revise only Scene 04 highlight logic again.

## 11. Git Status

- Branch: `master`
- Changed files:
  - `src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx` (the only
    file this task modified)
  - The following files were already modified before this task began (from
    TASK-012/013/014, not committed yet) and were not touched further here:
    `src/episodes/001-redis/RedisEpisode.tsx`,
    `src/episodes/001-redis/assets.ts`,
    `src/episodes/001-redis/episode.config.ts`,
    `src/episodes/001-redis/scenes.ts`,
    `src/shared/localization/index.ts`
- Untracked files (all pre-existing from earlier tasks, not committed yet;
  none added by this task):
  - `feedbacks/task-012-feedback.md`
  - `feedbacks/task-013-feedback.md`
  - `feedbacks/task-014-feedback.md`
  - `public/episodes/001-redis/assets/scene-06-ready-shelf.png`
  - `public/episodes/001-redis/assets/scene-06-serve-from-shelf.png`
  - `public/episodes/001-redis/assets/scene-07-analogy-mapping.png`
  - `public/episodes/001-redis/assets/scene-07-technical-architecture.png`
  - `src/episodes/001-redis/scenes/Scene05RestaurantRepeatWork.tsx`
  - `src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx`
  - `src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx`
  - `tasks/TASK-011A.md`
  - `tasks/TASK-012.md`
  - `tasks/TASK-013.md`
  - `tasks/TASK-014.md`
  - `feedbacks/task-011a-feedback.md` (this report)
- Ignored review media:
  - `renders/review/task-011a/scene-04-clean.png`
  - `renders/review/task-011a/scene-04-highlight-request.png`
  - `renders/review/task-011a/scene-04-highlight-database.png`
  - `renders/review/task-011a/scene-04-highlight-expensive-work.png`
  - `renders/review/task-011a/scene-04-highlight-latency.png`
  - `renders/review/task-011a/scene-04-preview.mp4`
  - `renders/review/task-011a/scene-01-regression.png`
  - `renders/review/task-011a/scene-02-regression.png`
  - `renders/review/task-011a/scene-03-regression.png`
- Commits/pushes: none.

## 12. Final Status

TASK-011A STATUS: PASS
