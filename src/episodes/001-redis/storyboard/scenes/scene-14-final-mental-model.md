# Scene 14 — Final Mental Model

## Purpose
Leave viewers with the correct question to ask about any cache, tying the entire episode together without introducing new concepts.

## Narrative Beat
Without caching: `Request -> Application -> Database -> expensive work -> Response`. Cache hit: `Request -> Application -> Redis -> Response`. Closing question: "What work did Redis allow us to stop doing?"

Planned framing from the production-status doc: "Redis did not magically speed up the Database. It allowed the application to avoid repeating expensive work. That is why the request became faster." Scene 14 should only synthesize what the viewer already learned and should likely be a relatively simple scene compared with Scenes 07–13.

## Status
Implemented under TASK-026 (Option A), awaiting human video review. This is the same human-review gate Scene 13's rebuild went through — see the Human Media Review Gate in `docs/agent-workflow.md`. Implementing this scene does not itself satisfy the gate; a human must watch the rendered scene before it can move to `approved`.

## Visual Approach
**Approved.** (Planned under TASK-025b, see `feedbacks/task-025b-scene14-planning-feedback.md` for the full option comparison; approved as Option A under TASK-025c per the repository's [Visual-first design principle](../../../../../AGENTS.md#visual-first-design-principle).)

Approved direction: **Option A** — rebuild a simplified version of Scene 01's Client/Application/Database/Redis node diagram, animating a request packet along the slow path (without caching) and then the fast path (cache hit), ending on the closing question — mirroring Scene 01 as a visual bookend.

Approved screen order:
1. Simplified Client/Application/Database/Redis node diagram (rebuilt locally for this scene, not imported from Scene 01).
2. Request packet animates along the slow path for the "without caching" beat: `Request -> Application -> Database -> expensive work -> Response`.
3. Request packet animates along the fast path for the "cache hit" beat: `Request -> Application -> Redis -> Response`.
4. Closing question fades/settles in: "What work did Redis allow us to stop doing?"

Implementation pattern: reimplement a simplified, file-local copy of Scene 01's node/packet diagram, following the same "re-implement a simplified local copy" pattern Scene 13 already used for its own central Redis node — not a shared-component extraction. Extracting a shared diagram component out of Scene 01/13/14 remains a separate, not-yet-scheduled cleanup item, out of scope here.

Animation: `interpolate()` drives the packet-motion animation via `motionPresets.moveLinear`, consistent with the rest of the episode. The `spring()` question raised during planning (TASK-025b, Option C) does not apply to Option A as scoped and is intentionally left out of Scene 14; it was tied to Option C's typography-only closing beat, not this diagram-based approach. A future task may propose `spring()` specifically for this scene's closing beat if desired, but that is not decided here.

Rejected alternatives (Option B — `SpotlightImage` pass on the Scene 07 architecture image; Option C — fully typography-driven recap): see the feedback file for the full comparison. Per the repository's visual-first design principle, Option A's higher implementation cost relative to Option C is an accepted trade-off, not a reason to prefer the cheaper text-only option.

### Implemented (TASK-026)

Built as planned above: a simplified, file-local rebuild of Scene 01's Client/Application/Database/Redis node-and-packet diagram, following the same "re-implement, don't extract" pattern Scene 13 already used. One packet makes a single forward trip per path (no animated return leg, mirroring Scene 01's own baseline-packet convention); a "Response" chip near the Request node stands in for the return trip on both paths. The slow path pauses at the Database node with a small pulsing three-dot "Expensive work" indicator before the Response chip appears; the fast path fades in the Redis node above Application (mirroring Scene 01's Redis entrance) and dims the Database node to show it being skipped.

Packet motion uses a scene-local `interpolate()` timeline sized to this scene's own beat windows, not `motionPresets.moveLinear`'s fixed 3.8s duration, which does not fit — the same per-scene timing convention Scenes 01/12/13 already use, noted here per the standing convention of recording this deviation explicitly.

No `spring()` is used in this scene: every beat is a one-way entrance/exit or forward packet travel, never a return-to-a-prior-state settle, so the TASK-025e standing rule (`spring()` for node-settle/return beats) does not apply here — confirmed and left out deliberately, not overlooked.

The closing question fades in only after the diagram fades out (mirroring Scene 01's own architecture-diagram-then-final-comparison sequencing), rather than overlapping the diagram — an as-built refinement over the plan above, found necessary during self-review/rendering (see `feedbacks/task-026-scene14-implementation-feedback.md`).

No bottom-caption treatment: the closing beat is a single centered question, not a caption over a background visual, so the Scenes 06–10 `BottomCaption` extraction considered under TASK-026 was not needed for this scene.

## Assets Used
None (`assetIds: []` in `scenes.ts`). Confirmed: the implemented scene uses only inline SVG/div shapes, no new external image asset.

## Known Issues
None currently known. The slow-path packet visually lands centered on the Database node (overlapping its icon briefly) rather than stopping beside it — this matches Scene 01's own baseline-packet behavior (its packet also lands centered on the arrival node), so it is treated as consistent with established precedent, not a new defect. Worth a human eye during review in case it reads differently here.

## Review Notes
Per the project's stated sequencing, this scene should only be planned/implemented after Scene 13 receives human review approval. **As of TASK-026, Scene 13's rebuild (TASK-025e) was confirmed reviewed and approved by the user before this task's implementation work began**, clearing the gate that `decisions.md` item 3 and the TASK-025b/025c notes above describe. This is the episode's final scene: the next step after this scene's own human video review is the full-episode review (Phase B / TASK-027 in the original sequence), not another per-scene implementation task.
