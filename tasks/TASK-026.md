# TASK-026: Scene 14 Implementation (Option A — Scene 01 Bookend)

## Why

Scene 14 ("final mental model") is the episode's closing scene. Option A was
approved in TASK-025c: a simplified rebuild of Scene 01's Client/Application/
Database/Redis node diagram, animating a request packet along the slow path
(without caching), then the fast path (cache hit), ending on the closing
question — a visual bookend with Scene 01's opening.

## Standing rules being applied (established in TASK-025e, confirmed)

- `spring()` for node-settle/return-to-state beats; `interpolate()` for
  everything else. Scene 14's packet motion is one-way travel along a path,
  not a return-to-state beat — use `interpolate()` with
  `motionPresets.moveLinear` (or a scene-local timeline sized to its own beat
  window, if the fixed preset duration doesn't fit, per the convention
  Scenes 01/12/13 already use — note explicitly in feedback which approach
  was used and why, as TASK-025e did).
- No new external image assets — this is confirmed unnecessary for Option A;
  everything is inline SVG/div, consistent with Scene 01 and Scene 13's
  rebuild.

## Step 1 — Read context first

- `storyboard/scenes/scene-14-final-mental-model.md` — the approved Visual
  Approach, Purpose, and Narrative Beat.
- `Scene01Mystery.tsx` — the node/packet/arrow grammar being mirrored.
  Per TASK-025b's finding, this is not a shared/exported component; build a
  simplified local copy in `Scene14FinalMentalModel.tsx`, consistent with the
  "re-implement a simplified local copy" convention Scene 13 already
  followed for its own node.
- `episode.config.ts` and `scenes.ts` — confirm the 13-vs-14 scene count
  mismatch flagged in the original architecture review is resolved once this
  scene exists (it should be, once Scene 14 is added to the sequence and
  timeline — verify, don't assume).

## Step 2 — Check whether Scene 14 needs a bottom caption

If this scene needs the same bottom-caption treatment used in Scenes 06–10
(currently duplicated five times, per the architecture review), **do not
create a sixth duplicate.** Instead:
1. Extract a single shared `BottomCaption` component into
   `shared/components/BottomCaption.tsx`, using the `typography` scale for
   font sizing (not a hardcoded value) and including the `emphasize` prop
   that Scene 06 already added but the other four lack.
2. Update Scenes 06–10 to import the shared component instead of their
   local copies.
3. Use the shared component in Scene 14 if needed.

If Scene 14's closing beat doesn't need a bottom caption at all (e.g. the
closing question is its own centered text treatment, not a caption), skip
this step entirely and note that in feedback.

## Step 3 — Build Scene 14

- Slow-path beat: packet travels Application → Database → expensive work →
  Response.
- Fast-path beat: packet travels Application → Redis → Response.
- Closing beat: the episode's closing question, echoing Scene 01's
  big-number-then-question finale structure per TASK-025b's finding about
  Scene 01's actual closing treatment.
- Add this scene to `RedisEpisode.tsx` and `episode.config.ts`'s timeline.

## Step 4 — Self-review

Apply the `review-animations` skill standards as TASK-025e did: justified
motion, GPU-safe properties (`transform`/`opacity` via `interpolate()`/
`spring()`, not layout-triggering properties like literal `width`), no
zero-scale entrances, no jarring restarts on short beats. Fix anything that
fails this check before finalizing, per the same standard applied last time.

## Step 5 — Verify

- `npm run typecheck`
- `npm run compositions` — confirm the episode's total duration updates
  correctly to include Scene 14, and report the new total frame count/
  duration (previously 5910 frames / 197.00s before this scene existed).
- Render representative stills at each beat (slow-path, fast-path, closing)
  for `Redis-EN`, plus one DE and one FR still to check caption/text
  line-wrapping if any localized text is involved. Delete temporary renders
  after review, as TASK-025e did.

## Step 6 — Update storyboard

In `storyboard/scenes/scene-14-final-mental-model.md`: mark `Status` as
"implemented, awaiting human video review" (the same human-review gate
Scene 13 just went through — this task does not satisfy that gate, only
makes the scene ready for it).

Also update `storyboard/README.md`'s status table (14/14 scenes now
implemented) and note in `decisions.md` if the 13-vs-14 scene count mismatch
from the original architecture review is now fully resolved.

## Step 7 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\task-026-scene14-implementation-feedback.md
```

Include: what was built, whether BottomCaption extraction happened (and if
so, confirm Scenes 06–10 still render correctly after the swap), self-review
findings, new episode duration, and confirmation that this is the final
scene — meaning the next step after your review is the full-episode review
(Phase B / TASK-027 in the original sequence), not another per-scene task.
