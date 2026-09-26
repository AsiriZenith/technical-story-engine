# TASK-026 Feedback — Scene 14 Implementation (Option A — Scene 01 Bookend)

## Gate check before starting

TASK-026's own Step 1 requires confirming Scene 13's human review outcome before implementation begins (per `decisions.md` item 3 and the storyboard's Review Notes). Scene 13's rebuild (TASK-025e) had no recorded approval in the repository at the start of this task. I stopped and asked the user directly; they confirmed the Scene 13 rebuild had been reviewed and approved, and to proceed. `decisions.md` item 3 has been updated to record this.

## What was built

`src/episodes/001-redis/scenes/Scene14FinalMentalModel.tsx` — a simplified, file-local rebuild of Scene 01's Client/Application/Database/Redis node-and-packet diagram, per the approved Option A plan in `storyboard/scenes/scene-14-final-mental-model.md`.

- **Diagram grammar:** re-implements a trimmed local copy of Scene 01's `SceneNode`/`NodeGlyph`/`HorizontalArrow`/`VerticalArrow` (Scene 01's own versions are not shared/exported), consistent with the "re-implement, don't extract" convention Scene 13 already established. Trimmed relative to Scene 01: no role subtitle text under each node, no `dimmed` variant beyond the one needed here, packet is a plain dot rather than a "GET" text bubble.
- **Slow-path beat:** a single packet travels Request → Application → Database (one forward trip, no animated return leg — mirroring Scene 01's own baseline-packet convention, which also never animates a return trip). A small three-dot pulsing "Expensive work" indicator appears beneath the Database node while the packet holds there, then a "Response" chip fades in near the Request node.
- **Fast-path beat:** the Redis node fades/scales in above Application (same entrance treatment as Scene 01's own Redis introduction), the Database node dims to ~0.42 opacity once cache-hit mode is active (showing it being skipped, same technique as Scene 01), the Application→Database arrow dims and turns dashed, and the packet makes a shorter Request → Application → Redis trip before the same "Response" chip reappears.
- **Closing beat:** the whole diagram group fades out, then the closing question ("What work did Redis allow us to stop doing?") fades and scale-settles in, centered — mirroring Scene 01's own architecture-diagram-then-final-comparison sequencing (Scene 01 also fades its diagram before showing its final text block).
- Registered in `episode.config.ts` (`scene14Window`, added to `durationInFrames`) and `RedisEpisode.tsx` (new `<Sequence>`).
- Added `visualNotes` to Scene 14's `scenes.ts` entry documenting the as-built approach (small, closely-related doc-consistency addition, same judgment call TASK-025e made for Scene 13).
- Added five new localization keys (`finalMentalModelWithoutCaching`, `finalMentalModelCacheHit`, `finalMentalModelExpensiveWork`, `finalMentalModelResponse`, `finalMentalModelQuestion`) in all three languages. All other node/label text (`request`, `application`, `database`, `requestOrigin`... — not actually used here since the trimmed node has no role subtitle) reuses existing keys already used by Scene 01.

## BottomCaption extraction (Step 2)

**Not needed.** Scene 14's closing beat is a single centered question over the plain background (mirroring Scene 01's centered "What changed?" finale), not a caption over a background visual — the same condition the task named as the reason to skip this step. No `BottomCaption` component was extracted, and Scenes 06–10 are unchanged.

## Standing-rule application

- **No `spring()` in this scene.** Every beat is a one-way entrance/exit or forward packet travel (never a return-to-a-prior-state settle), so the TASK-025e standing rule (`spring()` for node-settle/return beats, `interpolate()` for everything else) does not apply here — confirmed deliberately, not overlooked.
- **Packet motion uses a scene-local `interpolate()` timeline**, not `motionPresets.moveLinear`'s fixed 3.8s duration, which does not fit this scene's compressed beat windows (slow path ~2.2s, fast path ~1.0s) — the same per-scene timing convention Scenes 01/12/13 already use, per the task's own guidance to note this explicitly.

## Self-review (Step 4, `review-animations` standards)

- **Justified motion:** every animation indicates a state (packet = request in flight, pulsing dots = work happening, dim/dash = a path being deprioritized, fade+scale = arrival/emphasis). Nothing decorative.
- **GPU-safe properties:** all motion is `opacity`, `scale`, and `translate`/absolute `left`/`top` position offsets driven by `interpolate()` — no animated `width`/`height` layout properties. (Note: packet horizontal motion is expressed via absolute `left` in pixels rather than a `translate` transform, matching Scene 01's own existing packet implementation exactly; this is pre-existing codebase practice for packet motion specifically, not a new deviation introduced here.)
- **No zero-scale entrances:** Redis node scales from 0.88→1, question from 0.94→1; Database's dim floor is 0.42 opacity, never 0.
- **No jarring restarts on short beats:** the "Expensive work" dot-pulse uses a modulo-based looping `interpolate()` sized to its own window, consistent with Scene 13's `OperationsHeartbeat` technique.
- **One finding, fixed during self-review:** the initial draft used `windowOpacity(seconds, start, closingEnd, fadeIn, 0)` for the diagram and closing-question groups (elements meant to hold indefinitely). A `fadeOut` of `0` produced a duplicate breakpoint (`[..., 14, 14]`), which Remotion's `interpolate()` rejects as non-monotonic and threw at render time. Fixed by adding a dedicated `enterOpacity` helper (fade-in only, clamped) for hold-forever elements, and separately fixed the diagram to explicitly fade out before the closing question fades in — which also fixed a visual bug: the first working version left the diagram at full opacity indefinitely, so the large closing-question text rendered overlapping the still-visible node diagram (unreadable in a rendered still). This is now sequenced like Scene 01's own diagram-then-final-text transition. Re-verified with fresh renders after the fix.

## Verification

- `npm run typecheck` — pass.
- `npm run compositions` — `Redis-EN`/`Redis-DE`/`Redis-FR` now report **6330 frames / 211.00s**, up from **5910 frames / 197.00s** before this scene existed — confirms Scene 14's 420-frame (12+2s @ 30fps) window was added correctly to the shared episode timeline.
- Rendered representative stills via `remotion still` for `Redis-EN`: slow-path beat (packet en route to Database), expensive-work beat (pulsing dots + label under Database), fast-path beat (Redis node in, Database dimmed, packet en route to Redis), and the closing question. Also rendered the closing-question frame for `Redis-DE` and `Redis-FR` to check line-wrapping. All read correctly: diagram elements are legible, the slow/fast path distinction is clear, dimmed/dashed treatment on the Database side during cache-hit reads as "skipped," and the closing question wraps cleanly across two lines in all three languages with no overflow past the safe margins. Temporary renders were deleted after review (`renders/` is gitignored; the files removed were ones created by this task only).

## Known issue (non-blocking, flagged for human review)

The slow-path packet visually lands centered on top of the Database node's icon (a brief overlap) rather than stopping just beside it. This matches Scene 01's own baseline-packet behavior exactly (its packet also interpolates to the arrival node's exact center), so it's treated as consistent with established precedent rather than a new defect — but noted in the storyboard file in case it reads differently to a human eye once part of the full sequence.

## Confirmation: final scene

This completes all 14 scenes in `scenes.ts` — each now has a corresponding implemented `.tsx` file registered in both `episode.config.ts` and `RedisEpisode.tsx`. Per the task and `docs/agent-workflow.md`'s Human Media Review Gate, the next step after this scene's own human video review is the full-episode review (Phase B / TASK-027 in the original sequence), not another per-scene implementation task. `storyboard/README.md`'s status table and overall-status block have been updated accordingly, and `decisions.md`'s item 3 records that the 13-vs-14 scene-count mismatch identified in the original architecture review is now fully resolved.

## Human Review Requests

### Review Request 1

Artifact:
Scene 14 within `Redis-EN` / `Redis-DE` / `Redis-FR` compositions (frames 5910–6329, the scene's own local range 0.0s–14.0s)

Type:
Remotion composition (render to MP4/stills for review)

Purpose:
Confirm the episode's closing scene (the Scene 01 bookend) reads correctly as a full-motion sequence, not just as isolated stills.

What to review:
- Pacing: is the slow-path beat long enough to register as "slow" and the fast-path beat clearly faster by contrast?
- The "Expensive work" pulsing-dots indicator — is it a clear-enough visual for "work happening," or does it read as too subtle/too small?
- The dim+dash treatment on the Database node/arrow during the cache-hit beat — is "being skipped" legible in motion?
- The diagram-fades-out-then-question-fades-in transition at the very end — does the timing feel right, or too abrupt/too slow?
- The known packet-overlaps-node-icon issue noted above — acceptable as-is (matches Scene 01 precedent), or worth a follow-up polish task?
- Overall: does this land as a satisfying bookend/closer for the whole episode?

Agent assessment:
PASS WITH ISSUES (the one known, precedent-consistent packet-overlap issue noted above; everything else passed self-review and static-frame inspection)

Known issues:
- Slow-path packet overlaps the Database node icon on arrival (matches Scene 01's existing behavior, not a regression).

Human review status:
PENDING

## External Asset Requests

None.
