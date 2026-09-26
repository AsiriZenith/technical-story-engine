# TASK-025b Feedback — Scene 14 Visual Approach Planning

This is a planning task only. No `.tsx` files were written or modified, and Scene 14 was not implemented.

## Context Reviewed
- `storyboard/scenes/scene-14-final-mental-model.md` (Purpose/Narrative Beat).
- `storyboard/README.md` (episode goal/thesis: "what work did Redis allow us to stop doing?").
- All 13 implemented scene files (`Scene01Mystery.tsx` through `Scene13CacheCosts.tsx`) for existing visual motifs.
- `shared/motion/presets.ts` and `shared/architecture/node-semantics.ts`.

Key findings from that review, relevant to the options below:
- **`spring()` is not used anywhere in production scenes.** The only `Easing.spring(...)` reference is inside a DEV composition (`DevMotionBasics.tsx`), and that's `Easing.spring` passed into `interpolate()`'s easing option, not Remotion's actual `spring()` physics API. Every production scene (01–13) drives motion through `interpolate()` with named eased curves from `motionPresets`.
- **Scene 01's architecture diagram (nodes, packets, arrows) is not a shared component.** `SceneNode`, `NodeGlyph`, `HorizontalArrow`/`VerticalArrow` are all defined locally inside `Scene01Mystery.tsx`. Scene 13 already needed a simplified central "Redis" node and, per its own code comment, reimplemented a **file-local, simplified copy** of Scene 01's node/stack-icon treatment rather than importing it — the codebase's established pattern is "re-implement a simplified local copy," not "extract a shared component."
- Scene 01's closing beat (not previously described this precisely in the Scene 01 storyboard file) is actually a big-typography finale: `180 ms -> 8 ms` side by side, then "What changed?" fading in centered beneath it — this is a stronger and more literal bookend candidate for Scene 14's closing question than I'd noted in the TASK-025a storyboard file for Scene 01.
- Scenes 07–10 all reuse the single approved `scene07TechnicalArchitecture` PNG via `SpotlightImage`; Scenes 11–13 are fully Remotion-native with no image asset.

## Options Considered

### Option A — Bookend with Scene 01's node/packet diagram
**On screen:** Rebuild a simplified version of Scene 01's Client/Application/Database/Redis node diagram. Animate a request packet along the long path (Application -> Database -> expensive work -> Response) for the "without caching" beat, then along the short path (Application -> Redis -> Response) for the "cache hit" beat, ending on the closing question.
**Reuse vs. new:** Reuses `architectureNodeSemantics` (shared) but requires re-implementing node/arrow/packet rendering, since that code is not shared/exported from Scene 01 — same pattern Scene 13 already followed for its own simplified node. No new image asset.
**Animation:** `interpolate()` throughout, consistent with the rest of the episode; packet-motion timing would follow `motionPresets.moveLinear`, same preset Scene 01 uses.
**Trade-off:** Strongest thematic bookend (literally mirrors Scene 01's opening diagram), but highest implementation effort of the three options — a second from-scratch diagram build, more surface area for visual bugs, and it re-introduces the two-path diagram idea right after Scene 13's calm, diagram-light closing tone.

### Option B — SpotlightImage pass on the Scene 07 architecture image
**On screen:** Reuse `scene07TechnicalArchitecture` (already approved, already reused by Scenes 07–10) with two sequential `SpotlightImage` passes: one tracing Application -> Database (dim Redis) for "without caching," one tracing Application -> Redis (dim Database) for "cache hit," then fade to the closing question as plain text.
**Reuse vs. new:** No new asset; reuses the exact pattern already established in Scenes 08/09/10. Lowest new-code effort of the three.
**Animation:** `interpolate()`-driven `SpotlightImage` transitions, identical vocabulary to Scenes 08–10.
**Trade-off:** Cheapest to build correctly since the pattern is proven, but it (a) extends the open `SpotlightImage` mask-math regression set (`decisions.md` item 2) to a sixth scene, and (b) keeps the still-unresolved `~8 ms`/`~10 ms` baked-text image on screen in the episode's very last visual beat, which risks ending the episode on its own open inconsistency.

### Option C — Fully typography-driven recap (recommended)
**On screen:** Two short text-arrow rows (no diagram, no image) stating the "without caching" and "cache hit" paths as plain sentences/arrows, held together briefly for contrast, then the closing question fading in alone, echoing Scene 01's big-number-then-question finale structure but in Scene 11/12/13's typography language.
**Reuse vs. new:** No new asset, no new diagram/`SpotlightImage` code. Reuses `typography`/`theme`/`layout` tokens and the `Interactive.Div` + `motionPresets`/`interpolate()` vocabulary already used by Scenes 11–13.
**Animation:** `interpolate()` for the two text rows (consistent with Scenes 11–13); proposes Remotion's actual `spring()` for the final closing-question settle — the one emphasis beat in the whole episode where a physically-settling motion would suit the "final word" moment better than another `interpolate()`+`Easing.bezier` curve, and a one-time, deliberate departure rather than a new episode-wide norm.
**Trade-off:** Lowest production effort and lowest risk (doesn't touch the two open image/`SpotlightImage` issues at all), and matches the production-status doc's own guidance that Scene 14 "should likely be a relatively simple scene compared with Scenes 07–13" and "should not introduce new concepts." Weakest of the three on pure visual spectacle, since it has no diagram at all — the bookend with Scene 01 has to be carried by typography/staging rather than a mirrored diagram.

## Recommendation

**Option C**, pending human approval. Reasoning: it's the only option that doesn't extend either of the two open issues in `decisions.md` (SpotlightImage mask-math debt, baked ~10ms text) into a new scene, it matches the episode's own stated intent for Scene 14 (simple synthesis, no new concepts), and it still achieves a real bookend with Scene 01 through shared typography treatment and the literal callback question, without the cost of rebuilding Scene 01's diagram code. Option A is the strongest visual bookend if the team wants to spend more production effort here; Option B is rejected as it actively worsens the two entries in `decisions.md` before they're resolved.

This has **not** been treated as final — it's marked "proposed, pending approval" in `scene-14-final-mental-model.md`, not "decided."

## Open Questions for Human Decision (before TASK-026 can start)

1. **Approve or override the Option C recommendation** (or pick A/B) — this is the primary decision blocking TASK-026.
2. **Introducing `spring()`:** Option C proposes this episode's only use of Remotion's actual `spring()`, for the closing-question settle. Confirm whether that one-time exception is wanted, or whether the closing beat should stay on `interpolate()` + `motionPresets.emphasizeScale` for full episode-wide consistency instead.
3. **Sequencing dependency:** per `decisions.md` and the production-status doc's "Immediate Next Step," Scene 13 is still awaiting human review, and that review is meant to gate whether Scene 14 planning/implementation proceeds at all. This task proceeded with planning regardless (as instructed), but TASK-026 (implementation) should confirm Scene 13's review outcome first.
4. Not urgent, but worth noting: none of the three options touch the disputed `~8 ms`/`~10 ms` architecture image, so the open decision in `decisions.md` item 1 does not block Scene 14 either way.
