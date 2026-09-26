# TASK-025e Feedback — Scene 13 Rebuild Implementation (Option A)

`Scene13CacheCosts.tsx` was rebuilt per TASK-025d's approved Option A: the four text-label-plus-caption callouts are replaced with four literal per-category diagrams around the central Redis node. No other scene or shared file needed a behavior change (only `scenes.ts` `visualNotes` was touched, for documentation consistency with the storyboard — see below).

## What was built, per category

1. **Memory usage (Capacity)** — `CapacityBar`: a horizontal bar fills via a `scale`/`transformOrigin: left` transform (not an animated `width`, see self-review below) over the first ~1.4s of its window, then a warning-colored block slides out and fades (eviction) over the remainder. Caption unchanged (`cacheCostsCapacityCaption`).
2. **Stale data (Freshness)** — `FreshnessRing`: an SVG ring around a small chip depletes via `strokeDashoffset` from fresh (cache accent) to stale (warning color, chip text flips "fresh" → "stale") across the held part of its window.
3. **Resilience / not every request is expensive enough** — `ResilienceReroute`: the central Redis node dims (`interpolate()`, not a pulse) while a "GET" packet travels along a dashed path to a temporary Database node (new use of `architectureNodeSemantics.database` in this scene) that exists only for this beat; both fade out, then the Redis node returns to its resting scale/opacity via `spring()`. This is the scene's one `spring()` beat, per the standing rule this task set: **`spring()` for node-settle/return-to-state beats, `interpolate()` for everything else** — documented in `AGENTS.md`-adjacent motion guidance via the storyboard file, not re-litigated per scene going forward.
4. **Cache misses still happen / monitoring** — `OperationsHeartbeat`: a small ring pulses on a short repeating cycle (`interpolate()` over `seconds % period`) next to a "monitoring" status readout.

The central Redis node, the four cardinal `calloutOffset` positions, the `windowOpacity` helper, the bridge/closing beats, and the overall 16-beat timeline (`beats` object, `closingEnd = 16.0`) are all unchanged from the superseded implementation — only what renders inside each category's window and the central node's Resilience-beat treatment changed.

**One as-built deviation from the TASK-025d plan:** the reroute packet uses a scene-local `interpolate()` timeline sized to its own ~1.9s beat window rather than `motionPresets.moveLinear`'s fixed 3.8s duration, which didn't fit. This follows the same "each scene defines its own beat-relative timing" convention Scenes 01/12/13 already use for their own packet/value motion — not a new pattern, and noted inline in the storyboard file.

## Self-Review (Step 3, `review-animations` standards)

Applied against my own output before finalizing:

- **Justified motion:** every animation is state-indication or explanation (ring depletion = staleness happening, bar fill/evict = memory pressure, dim+reroute+return = a cache miss/failure and recovery, heartbeat = "something is watching this"). Nothing decorative.
- **GPU-safe properties — one finding, fixed:** the first draft of `CapacityBar`'s fill animated a literal CSS `width` percentage every frame, which is exactly the layout-triggering property this skill's standards flag. Replaced with a fixed-width div animated via the `scale` CSS property (`scale: "${fillProgress} 1"` with `transformOrigin: 'left'`) instead — consistent with this codebase's existing preference for `scale`/`translate`/`rotate` over computed layout properties (see `shared/components/TimingBar.tsx`'s own `transform: scaleY()` emphasis pulse). Re-verified with a fresh render after the fix.
- **No zero-scale entrances:** the Resilience node's dim floor is `0.32` opacity/blended scale, never `0` or `scale(0)`.
- **No jarring restarts on short beats:** the heartbeat's repeating pulse and the packet's reroute both use `interpolate()` with clamped extrapolation sized to their own window, not keyframes that would snap/restart oddly if a beat were shortened later.
- **Duration/easing:** all beat-scale motion uses the existing `easeOut` cubic-bezier already used throughout the episode; nothing in this scene is UI-frequency motion (it's explanatory video content, which the `animate` skill explicitly treats differently from interactive UI), so the sub-300ms UI guidance doesn't apply.

## Verification

- `npm run typecheck` — pass.
- `npm run compositions` (`remotion compositions src/index.ts`) — all compositions still resolve; `Redis-EN/DE/FR` remain **5910 frames / 197.00s**, i.e. **no timing/duration impact** — this rebuild only changed what renders inside Scene 13's existing beats, not the beat lengths or the shared episode timeline.
- Rendered representative stills (via `remotion still`) at each of Scene 13's five active beats (Freshness, Capacity — before and after the transform fix, Resilience dim, Resilience return/reroute, Operations, Closing) for `Redis-EN`, plus one German and one French still to check localized caption line-wrapping at typical beat frames. All read correctly: diagrams render as intended, the reroute-to-Database beat reads clearly, captions wrap without overflow in all three languages, and the closing frame shows only the takeaway line — no lingering per-category labels. QA stills were temporary (`renders/` is gitignored) and have been deleted after review.
- One pre-existing, not-introduced-by-this-task cosmetic note: the closing beat's text box is sized to the wrapped takeaway text, not the full frame, so the central Redis node (which stays at `opacity: 1` from Beat 2 onward, same as the superseded version) is faintly visible through the semi-transparent closing overlay during its fade-in. This exact structure existed in the superseded implementation too — not a regression from this rebuild — but worth a human eye during review in case it reads differently now that there's no ambient-label layer to compare it against.

## Storyboard, scenes.ts, and decisions.md updates

- `storyboard/scenes/scene-13-cache-tradeoffs.md`: `Visual Approach` now documents Option A as **implemented**, with the two as-built deviations noted inline; `Status` updated to "rebuilt, awaiting human video review" (a distinct gate from the automated checks above, per the Human Media Review Gate in `docs/agent-workflow.md`); `Known Issues` cleared of the ambient-label item.
- `storyboard/decisions.md` item 3: added a TASK-025e update marking the ambient-label issue itself **resolved**, while explicitly stating this does **not** clear the broader Scene 13 human-review gate that still blocks Scene 14.
- `scenes.ts`: updated Scene 13's `visualNotes` to match the storyboard's implemented description (was still describing the superseded label+caption treatment) — small, closely-related doc-consistency fix, not new scope.

## Confirmation: does not block or change TASK-026

This task and Scene 14 (TASK-026) remain **independent** — nothing about Scene 14's approved Option A (the Scene 01 node/packet bookend) depends on any detail of how Scene 13's costs are visualized. The **separate sequencing gate** noted since TASK-025b/025c still applies unchanged: Scene 13's human review (of this rebuild, not of this feedback) must happen before TASK-026 implementation begins. This task does not satisfy that gate — it only makes Scene 13 ready to be reviewed.

## Judgment Calls

1. Updated `scenes.ts` `visualNotes` even though the task's explicit steps only named the storyboard file — left stale, it would have described the superseded implementation as current. Treated as closely-related doc consistency, not scope creep.
2. Interpreted the standing `spring()` rule as applying specifically to the Resilience beat's return-to-rest (the one beat with an actual dim-then-recover state change), and left the Freshness/Capacity/Operations entrance pulses on their existing `interpolate()` + `motionPresets.emphasizeScale` treatment, since those are one-way entrances, not a "return to a prior state."
3. Fixed the `CapacityBar` width-animation finding from my own self-review (Step 3) before finalizing, per the task's "fix anything that fails this check before finalizing" instruction, rather than just flagging it.
