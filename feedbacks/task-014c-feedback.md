# TASK-014C — Tune Scene 07 Redis Spotlight Prototype

## 1. Summary

This task only tuned the two brightness/feather parameters of the existing,
already-approved Redis/Cache `SpotlightImage` prototype from TASK-014B. No
redesign, no new targets, no structural changes. The spotlight technique
(dimmed base image + masked full-brightness image, both inside one shared
transformed wrapper, normalized `0–1` region, soft radial-gradient mask, no
border/glow) is unchanged; only `dimBrightness` and `featherPaddingFactor`
were retuned to make the surrounding frame less dark and the bright zone
tighter, per the target values given in the task.

## 2. Final Tuning Values

```text
dimBrightness: 0.58
featherPaddingFactor: 1.35
```

These are exactly the target starting values given in the task, with no
further adjustment — the rendered result at these values already met all
stated visual goals (tighter bright zone, less aggressive dimming, soft
edge, readable surroundings), so no deviation from `0.58` / `1.35` was
needed and none is claimed.

Changed in `src/shared/components/SpotlightImage.tsx` only (the component's
default prop values — Scene 07 does not pass explicit overrides for either
parameter, so this single edit retunes the Redis/Cache spotlight):

```diff
- dimBrightness = 0.45,
- featherPaddingFactor = 1.7,
+ dimBrightness = 0.58,
+ featherPaddingFactor = 1.35,
```

## 3. Visual Result

- **Surrounding brightness:** Visibly lighter than TASK-014B at peak
  spotlight. Request, Application, and Database badges, the cashier, and
  the chef all remain clearly readable rather than falling close to black.
- **Spotlight tightness:** The bright zone around the Redis/Cache badge is
  noticeably tighter than TASK-014B's `1.7×` feather padding — the badge
  and shelf read as the clear focal point without the glow extending as far
  into neighboring elements.
- **Feather softness:** The edge is still a gradual falloff, not a hard
  rectangle — `1.35×` padding is smaller than TASK-014B's `1.7×` but still
  comfortably above `1.0×` (which would make the mask's outer edge coincide
  with the region's own edge, i.e. no feather at all), so softness is
  preserved.
- **Ready-shelf spill:** A small amount of soft brightness still spills
  onto the shelf/burger below the Redis/Cache badge, consistent with the
  task's "may receive a small amount of soft spill" allowance — visibly
  less than TASK-014B but not eliminated.

## 4. Transform Safety

Confirmed unchanged. Both `<Img>` layers in `SpotlightImage.tsx` are still
siblings inside the same single `<div style={{transform: scale(${scale})}}>`
wrapper (no separate transforms were introduced), and `Scene07AnalogyTo
Architecture.tsx`'s `SpotlightImage` call site is untouched — it still
passes the same `analogyScale` (from the shared `computePushInScale`
helper) that `DiagramBeat` also uses for the technical-architecture beat,
so the two beats' image layers continue to share their respective
transforms exactly as before.

## 5. Source Asset Preservation

Confirmed. No PNG files were read, written, or touched. `git status`
(below) shows no changes under `public/episodes/001-redis/assets/`.

## 6. Review Artifacts

```text
renders/review/task-014c/scene-07-clean-before.png
renders/review/task-014c/scene-07-spotlight-peak.png
renders/review/task-014c/scene-07-spotlight-fadeout.png
renders/review/task-014c/scene-07-preview.mp4
```

Rendered against the `Redis-EN` composition (Scene 07 begins at global
frame 2820, confirmed unchanged from TASK-014B via `remotion compositions`
still reporting a 3360-frame total). Frame numbers match TASK-014B's for a
direct before/after comparison:

- `scene-07-clean-before.png` — frame 2865 (local ~1.5s, before
  `redisCacheIn`).
- `scene-07-spotlight-peak.png` — frame 2922 (local ~3.4s, mid-hold, peak
  opacity).
- `scene-07-spotlight-fadeout.png` — frame 2955 (local ~4.5s, mid fade-out,
  just past `redisCacheOut: 4.3s`).
- `scene-07-preview.mp4` — frames 2880–2970 (local ~2.0s–5.0s, ~3s / 91
  frames), covering fade-in, hold, and fade-out.

## 7. Human Review Requests

### Review Request 1

Artifact:
renders/review/task-014c/scene-07-clean-before.png

Purpose:
Confirm the "before spotlight" state is unaffected by the tuning change —
plain, uniform brightness, no seam between the two stacked image layers.

What to review:
- No visible seam, ghosting, or brightness mismatch.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
renders/review/task-014c/scene-07-spotlight-peak.png

Purpose:
Confirm the tuned peak spotlight is tighter and less aggressively dimmed
than TASK-014B's, while remaining a soft-edged, professional-feeling
highlight rather than dramatic stage lighting.

What to review:
- Whether the dim level now feels subtle enough.
- Whether the bright zone is tighter around Redis/Cache and whether the
  ready-shelf spill is acceptable.
- Whether the soft edge still reads as natural (no rectangle).

Agent assessment:
PASS

Known issues:
- None observed; this is the primary artifact the tuning targets, and it
  matches every item in the task's Visual Goal section.

Human review status:
PENDING

### Review Request 3

Artifact:
renders/review/task-014c/scene-07-spotlight-fadeout.png

Purpose:
Confirm the fade-out with tuned values returns cleanly toward normal
brightness without a stuck dim or abrupt cut.

What to review:
- Whether the mid-fade dim level looks proportionate to the peak frame.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 4

Artifact:
renders/review/task-014c/scene-07-preview.mp4

Purpose:
Confirm the tuned spotlight fades in, holds, and fades out smoothly in
motion, with no drift against the image's push-in scale, and that this
tuned style is the one to standardize for future spotlight conversions.

What to review:
- Fade-in/fade-out pacing (timing itself is unchanged from TASK-014B).
- Any perceptible drift between the spotlight and the image during the
  push-in.
- Whether this tuned style (0.58 / 1.35) should become the standard for
  future spotlight highlights (Database, technical-architecture beat).

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

## 8. Verification Results

```text
TypeScript:            PASS
composition discovery: PASS
clean frame:            PASS (no visible seam)
peak frame:             PASS (no hard rectangle; soft radial falloff)
fade-out frame:         PASS (dim relaxes proportionately, no stuck state)
preview MP4:            PASS (rendered, 91 frames / ~3s, fade-in/hold/fade-out visible)
no seam:                PASS
no drift:               PASS (shared transformed wrapper unchanged; same analogyScale feeding both layers)
no hard rectangle:      PASS (radial-gradient mask, not clip-path)
```

## 9. Problems / Risks

None found at these values. The task's own acceptable ranges
(`dimBrightness: 0.55–0.60`, `featherPaddingFactor: 1.30–1.40`) were used
at their exact suggested starting point without needing to explore the
range further — the rendered result already satisfied every item in the
Visual Goal section, so no technical justification for deviating outside
(or even within) the range was needed. The only residual note carried over
from TASK-014B still applies: these values are tuned by eye against this
one image and this one target; they haven't yet been checked against
Database or the technical-architecture beat, since neither is in scope
here.

## 10. Recommended Next Step

```text
If TASK-014C is human-approved:
→ reuse these exact spotlight tuning values for the next Scene 07 spotlight conversion.

Otherwise:
→ tune only these two spotlight parameters again.
```

## 11. Git Status

Branch: `master`

Changed files (tracked, modified before and unrelated to this task — pre-
existing working-tree state, not touched by TASK-014C):
```text
M src/episodes/001-redis/RedisEpisode.tsx
M src/episodes/001-redis/assets.ts
M src/episodes/001-redis/episode.config.ts
M src/episodes/001-redis/scenes.ts
M src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx
M src/shared/localization/index.ts
```

Untracked files relevant to this task's history (created in TASK-014A/B,
unchanged by this task, except `SpotlightImage.tsx` and
`Scene07AnalogyToArchitecture.tsx`, which carry this task's actual edits):
```text
?? feedbacks/task-014a-feedback.md
?? feedbacks/task-014b-feedback.md
?? src/shared/components/SpotlightImage.tsx        (edited this task: dimBrightness, featherPaddingFactor)
?? src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx   (not edited this task; unchanged since TASK-014B)
?? tasks/TASK-014C.md
```
(plus other pre-existing untracked files from earlier tasks — assets,
TASK-011A through TASK-014B, feedbacks — unrelated to this task, unchanged)

New untracked files from this task:
```text
?? feedbacks/task-014c-feedback.md
```

Review media (untracked, new this task):
```text
?? renders/review/task-014c/scene-07-clean-before.png
?? renders/review/task-014c/scene-07-spotlight-peak.png
?? renders/review/task-014c/scene-07-spotlight-fadeout.png
?? renders/review/task-014c/scene-07-preview.mp4
```

Commits/pushes: None. No commits were made and nothing was pushed; all
changes remain in the working tree per the task's "stop after feedback"
instruction.

## 12. Final Status

TASK-014C STATUS: PASS
