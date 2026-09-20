# TASK-017 Feedback — Plan Scene 10: Why Redis Is Fast + Asset Decision

## 1. Summary

Recommended Scene 10 concept: a single continuous **Redis spotlight** held across three explanatory beats (prepared result, simple lookup, in-memory access), followed by a **no-new-spotlight** beat where the Database card is left visibly dim/untouched while the caption states the expensive work was avoided, closing on a no-spotlight beat that states the corrected mental model and explicitly defuses the RAM-vs-disk misconception. This is a deliberate departure from Scenes 07/08/09's node-to-node spotlight hopping: Scene 10 does not retrace the request path (already taught), it dissects *why one step in that path is fast*, so one held focal point communicates that better than a sequence of handoffs. **NO NEW ASSET REQUIRED** — recommend Option C (hybrid): reuse the approved `scene-07-technical-architecture.png` as the visual anchor, with all new explanatory copy delivered as localized Remotion captions, never baked into the image. Scene 10 was not implemented. No `src/`, asset, or localization files were modified.

## 2. Skills Used

```text
technical-story-video
  Used for: overall workflow ordering (source material -> thesis -> beats -> visual mapping), the manual-asset-workflow stop condition, and the Human Media Review Gate framing.
  Influenced: confirming this task stays a planning-only deliverable and that any precision asset would need to stop implementation until human-approved.

remotion-best-practices
  Used for: default routing confirmation that no Remotion-specific implementation question in this planning task needed a deeper official skill (no new component/timing/render mechanic is being introduced).
  Influenced: kept the plan inside Remotion's existing `interpolate()`-driven fade/spotlight vocabulary already used by Scenes 07-09, rather than proposing a new technique.

remotion-markup
  Used for: reviewing how Scenes 08/09 structure layered image + caption + timing markup (SpotlightImage stacking, BottomCaption gradient/caption block, scene-relative `beats`/`captionWindows` objects).
  Influenced: the recommended beat plan reuses this exact markup shape (one `SpotlightImage`, layered `BottomCaption` blocks) instead of inventing new visual primitives.

frontend-design
  Used for: applying its restraint principle ("spend your boldness in one place," avoid generic ALL-CAPS eyebrow labels, avoid decorative numbered markers unless content is truly sequential) to the beat/caption design.
  Influenced: recommending plain sentence-case captions (matching Scene 07-09's existing style) and rejecting any new drawn callout shapes/arrows/badges around the reused image, consistent with the task's own "no unnecessary arrows/shapes" rule.

animate
  Used for: classifying the motion as "Explanation" purpose (its only tier that fits marketing/technical-explainer motion), confirming ease-out fades and sub-second fade durations are the right ingredients, and that entrances should never start from a hard cut or `scale(0)`-equivalent.
  Influenced: recommending the same `windowOpacity` fade-in/fade-out (~0.35-0.5s, ease-out bezier) and `computePushInScale` push-in Scenes 07-09 already use, rather than proposing new curves or durations.
```

Not consulted (not relevant to a planning-only task with no new API surface, no interactive preview needed yet, and no motion-heavy implementation to QA): `remotion-docs`, `remotion-studio`, `review-animations`. `review-animations` is explicitly for QA on implemented motion; there is no diff to review yet.

## 3. Technical Teaching Goal

The scene communicates the four core ideas through one held Redis spotlight plus one deliberately un-spotlit Database beat:

```text
prepared result   -> Beat 1, Redis spotlighted: the value already exists, nothing is computed now.
simple lookup      -> Beat 2, Redis spotlight held: retrieval is a direct key lookup, not a query.
in-memory access     -> Beat 3, Redis spotlight held: mentioned last and briefly, as one contributing factor, never as the headline reason (task's explicit "do not present this as the only reason").
avoided Database work -> Beat 4, no spotlight change (full-brightness or ambient-dim over Database): the strongest emphasis beat, longest hold, explicit caption naming the skipped expensive work.
```

**Strongest emphasis: "avoided Database work."** This matches the task's own instruction ("This is the most important point"), the existing `scenes.ts` purpose string for this scene ("Explain fast cache hits without reducing the comparison to RAM versus disk"), and the corrected mental model the episode has been building toward since Scene 03. Holding the Redis spotlight through beats 1-3 and only removing it for beat 4 means the removal itself is the visual cue that beat 4 is different in kind, not just another bullet in the same list — the payoff idea gets the payoff staging.

## 4. Visual Approach Comparison

### Option A — Reuse `scene-07-technical-architecture.png` as-is (SpotlightImage only, no new captions beyond node labels)

- Advantages: zero new asset risk; fully consistent with Scenes 07-09's visual language; fastest to implement.
- Disadvantages: the diagram shows *flow* (numbered steps, arrows), not *why a step is cheap*. None of "prepared result," "simple lookup," or "database work is expensive because X" is visually present in the image — SpotlightImage alone (dim everything but Redis) cannot communicate those ideas without caption text carrying the entire teaching load, which is what Scenes 08/09 already do for flow-tracing, not concept explanation.
- Implementation risk: low.
- Clarity: medium — relies entirely on caption text; visual reinforcement is weak for a scene whose whole job is a *why*, not a *what happens next*.

### Option B — New dedicated Scene 10 infographic

- Advantages: could show "prepared result / in-memory lookup / simple key lookup / work skipped" as purpose-built visual concepts (e.g., a small side-by-side "lookup vs. computation" comparison) not obtainable from the existing diagram.
- Disadvantages: introduces a fourth consecutive scene's worth of new visual grammar right after three scenes (07-09) built viewer familiarity with one diagram; risks visual whiplash immediately before Scene 11's lighter beat. Precision-critical (the "do not oversimplify to RAM-vs-disk" constraint makes wording/iconography choices high-stakes), so per the manual-asset workflow this would require a user-generated, user-approved image before any implementation — a real stop-and-wait dependency for a scene whose content is otherwise fully expressible in existing components.
- Implementation risk: highest — blocks on external asset generation/approval before Scene 10 can start at all.
- Clarity: potentially highest if executed well, but only after the approval round-trip; not achievable in the current task boundary.

### Option C — Hybrid: reuse `scene-07-technical-architecture.png` + new Remotion-native captions/callouts (no new drawn shapes) — **RECOMMENDED**

- Advantages: no new asset dependency (ships immediately after approval of this plan); preserves the viewer's now-established mental map of Client/Application/Redis/Database from Scenes 07-09; every new idea ("prepared result," "simple lookup," "database work avoided," "modern databases use memory too") is delivered as fully localized Remotion text, never baked into media, satisfying the task's localization and "do not silently choose a number" constraints simultaneously since no new image-baked number is introduced either.
- Disadvantages: still can't visually show "the result is already computed" the way a purpose-built diagram could; leans on caption wording carrying more of the "why," partially offset by the deliberate spotlight-hold/spotlight-drop staging described in Section 3.
- Implementation risk: low — reuses `resolveAsset('scene07TechnicalArchitecture')`, `SpotlightImage`, `BottomCaption`, and the existing translation-key pattern exactly as Scenes 08/09 do.
- Clarity: high for the flow-level idea (which node holds the answer) and adequate for the conceptual idea, provided caption wording is precise (see Section 7 for exact recommended wording per beat).

**Recommendation: Option C.** It is the only option that ships without a new external-asset dependency while still giving the scene something visually distinct from Scenes 08/09 (a *held* single spotlight instead of a *sequence* of spotlights, deliberately dropped for the payoff beat) rather than reusing the exact same node-hopping choreography a third time.

## 5. Asset Decision

```text
NO NEW ASSET REQUIRED
```

## 6. External Asset Request

```text
None.
```

## 7. Beat-by-Beat Motion Plan

Scene duration: `sharedWindow(13, 2)` = 15.0s target+margin = 450 frames at 30fps (from the already-approved `scenes.ts` entry for `10-why-redis-fast`; this task does not change it). All timings are scene-relative seconds, following Scene 07-09's `beats`/`captionWindows`/`windowOpacity` pattern exactly (0.35-0.5s ease-out fade in/out, `Easing.bezier(0.16, 1, 0.3, 1)`, no hard cuts).

```text
Beat 0 — Bridge (0.4s-2.0s), no spotlight
  Visual: full-brightness architecture diagram (same push-in scale start as Scenes 07-09).
  Caption: "Why is that path so much faster?"
  Why: one-line bridge from Scene 09's closing line, per the task's explicit "Scene 10 should now answer: Why is that path so much faster?" Does not re-explain the cache-hit flow itself.

Beat 1 — Already prepared result (2.4s-5.0s), Redis spotlighted (redisSpotlightRegion, reused byte-for-byte from Scenes 07-09)
  Visual: Redis card isolated, rest of the diagram dimmed.
  Caption: "Redis already holds a prepared result."
  Why: establishes the #1 core point before anything else — nothing is computed at this step, it is retrieved.

Beat 2 — Simple lookup (5.4s-7.8s), Redis spotlight HELD (no handoff — same technique Scene 09 used to hold Redis through two captions)
  Visual: unchanged from Beat 1; only the caption changes.
  Caption: "Finding it is a simple, direct lookup — not a query."
  Why: keeping the same node lit while the caption changes signals "same place, next reason," reinforcing that these are facets of one answer, not separate events.

Beat 3 — In-memory access (8.2s-10.4s), Redis spotlight HELD again
  Visual: unchanged.
  Caption: "That lookup happens in memory, which helps — but it is not the whole story."
  Why: covers point 2 (in-memory access) last and briefly, with an explicit qualifier baked into the caption itself, directly satisfying the task's "do not present this as the only reason for the speedup."

Beat 4 — Original expensive work avoided (10.8s-13.6s), spotlight RELEASED — full brightness, Database card visible but not spotlighted
  Visual: the Redis spotlight fades out and is not replaced by another target; the whole diagram returns to uniform brightness. Database is deliberately never spotlighted here (same contrast-by-omission technique Scene 09 used for the Database-skipped beat), but unlike Scene 09 it is also not held dim under an active Redis spotlight — it is simply present, unremarked, while the caption does the explanatory work.
  Caption: "The expensive Database work behind that result is skipped entirely."
  Why: this is the scene's single most important beat (Section 3) and the longest hold (2.8s vs. ~2.2-2.6s for Beats 1-3); dropping the spotlight entirely (rather than moving it) is the visual signal that this is the payoff conclusion, not another item in the same list.

Beat 5 — Closing mental model + misconception guard (14.0s-14.9s... clamped inside the 15.0s window), no spotlight
  Visual: unchanged, full brightness, closing caption only (mirrors Scenes 08/09's no-spotlight closing beats).
  Caption, two sequential lines (matching the two already-approved closing storyBeats in `scenes.ts`): "Modern databases also use memory heavily." then "The speedup comes from avoiding repeated work — not from memory being magic."
  Why: the first line is the scene's own built-in guard against the RAM-vs-disk oversimplification (this exact beat already exists in the approved `scenes.ts` outline, confirming the outline anticipated this exact risk); the second line is the task's own required closing mental model, phrased as its second suggested alternative ("The speedup comes from avoiding repeated work, not from making the Database itself faster").
```

No beat spotlights Database directly at any point, and at most one spotlight target is ever active — Redis, then nothing. This satisfies the task's "one primary focus at a time; no accumulated highlights" rule using an even simpler shape than Scenes 07-09 (a hold-then-release instead of a multi-node sequence).

## 8. Spotlight Strategy

- **SpotlightImage should be used**, exactly as in Scenes 07-09, for Beats 1-3.
- **Active regions:** only `redisSpotlightRegion` (`x: 1225/1920, y: 130/1080, width: 365/1920, height: 225/1080`), reused byte-for-byte from Scene 07/08/09's already-approved constant. No other region is activated.
- **Existing Scene 07/08/09 regions reused as-is:** yes for Redis. `applicationSpotlightRegion` and `clientSpotlightRegion` are not needed (Scene 10 does not retrace the request path). `databaseSpotlightRegion` (already defined and approved in `Scene08CacheMiss.tsx`) exists and could be reused later but is deliberately **not** activated in this plan — see Beat 4 reasoning above.
- **No new normalized regions needed.**
- **Local tuning:** carry over Scene 08/09's approved `dimBrightness: 0.58` and `featherPaddingFactor: 0.9` unchanged, since the only active region (Redis) is identical to those scenes' own Redis usage — no new spacing relationship is introduced that would require re-tuning.
- **Known `featherPaddingFactor` radius/diameter technical debt:** still present (it's a `SpotlightImage`-wide issue, not scene-specific) but does not newly affect Scene 10 beyond how it already affects Scenes 07-09's identical Redis region — no scene-specific mitigation is needed, and this task does not touch the shared component, per the task's explicit instruction.

## 9. Localization Plan

- **New Remotion captions** (Beats 0-5, 7 total including the two-line closing) must be added as new translation keys in `src/shared/localization/index.ts`, following the exact `cacheHit*`/`cacheMiss*` naming and per-language-block pattern (e.g. `whyFastBridge`, `whyFastPreparedResult`, `whyFastSimpleLookup`, `whyFastInMemory`, `whyFastWorkAvoided`, `whyFastModernDbMemory`, `whyFastClosing`), with EN authored first and DE/FR translated in the same task that implements the scene. This planning task adds none of these keys.
- **EN / DE / FR treatment:** all seven caption lines are short, non-idiomatic, and render as plain sentence-case Remotion text (per `frontend-design`'s guidance against decorative ALL-CAPS labels), matching Scene 07-09's `BottomCaption` component and safe-margin layout — no new typography risk expected for any of the three languages at this length.
- **Reused-asset limitation (documented, not new):** `scene-07-technical-architecture.png` still carries baked English labels (Client/Application/Redis/Database, step numbers, "~10 ms" / "vs. ~180 ms without cache", "SAME REQUEST. FASTER RESPONSE.") in every language composition. This is the same pre-existing, already-documented limitation from Scenes 07-09, not newly introduced by this plan. Since Option C adds no new baked text to the image, no new localization limitation is created.

## 10. Latency Number Recommendation

- Recommend Scene 10 **avoid introducing any new numeric latency comparison**, per the task's own stated preference for a conceptual framing ("fast cache lookup vs. expensive Database work avoided"). None of the seven recommended captions in Section 7 contains a number.
- The pre-existing **~8 ms (episode narration, e.g. Scene 09's `cacheHitFastResponse`) vs. ~10 ms (baked into `scene-07-technical-architecture.png`)** discrepancy, first surfaced in TASK-016, is **not resolved by this plan** and remains visible in Scene 10 if Option C is implemented, since the same PNG is reused. This is an inherited, already-documented asset limitation, not a new one.
- **Do not silently choose between ~8 ms and ~10 ms.** Recommend one of two explicit follow-ups, decided by the user before or during Scene 10 implementation (not in this task):
  1. Retune the episode's canonical spoken/caption figure to ~10 ms for full consistency with the existing approved asset (no asset change needed), or
  2. Treat the baked ~10 ms as an asset defect and request a corrected `scene-07-technical-architecture.png` (or a cropped/updated version) in a future task, following the manual-asset workflow, since that image is reused across Scenes 07-10.
- **Scene 10 specifically does not need this resolved to proceed**, since its own captions carry no number at all under this plan — the discrepancy only resurfaces because the shared background image is visible on-screen throughout, exactly as it already is in Scenes 07-09.

## 11. Scene Boundary

**Scene 10 covers:** why the cache-hit path (already established in Scene 09) is fast — prepared result, simple lookup, in-memory access as a contributing but non-exclusive factor, the expensive Database work being skipped rather than accelerated, and the explicit guard against reducing this to "RAM is fast, disk is slow."

**Scene 10 must leave for later scenes:**
- Re-explaining the cache-hit request/response flow itself (Scene 09's job, already done).
- The tempting "cache everything" overgeneralization (Scene 11).
- Stale cache / correctness failure (Scene 12).
- Expiration, invalidation, memory limits, monitoring, and other operational tradeoffs (Scene 13).
- The final cross-scene mental-model recap (Scene 14).

No content from Scenes 11-14 was planned, drafted, or implemented in this task.

## 12. Documentation / Reusable Component Notes

- No new reusable component appears necessary for this plan — the "held spotlight, then release" pattern in Section 7 is expressible entirely with the existing `SpotlightImage`, `windowOpacity`, and `BottomCaption` building blocks Scenes 07-09 already established; it is a new *sequence shape* (hold-then-release instead of node-to-node handoff), not a new component.
- One forward-looking note for whoever implements Scene 10: `pickSequentialSpotlight`'s existing shape (an array of `{handoffSeconds, target}` segments) already supports "spotlight, then nothing" if the final segment's target has `opacity: 0` for its whole window — no helper change is needed, just one extra segment with a zero-opacity target for Beat 4/5. This is an implementation detail to confirm during Scene 10 coding, not something to build now.

## 13. Verification Results

```text
installed skills consulted:              PASS (Section 2)
existing assets reviewed:                PASS (scene-07-technical-architecture.png read directly; assets.ts manifest reviewed)
Scene 09 continuity reviewed:             PASS (Scene09CacheHit.tsx and task-016-feedback.md read in full)
visual options compared:                  PASS (Section 4)
asset decision made:                      PASS (Section 5 — NO NEW ASSET REQUIRED)
motion plan created:                      PASS (Section 7)
localization plan created:                PASS (Section 9)
latency discrepancy addressed:            PASS (Section 10)
no production source changes:             PASS (git status shows only the pre-existing untracked TASK-017.md)
no asset changes:                         PASS (no files under public/ or assets.ts touched)
Scene 10 not implemented:                 PASS (no Scene10*.tsx file created; RedisEpisode.tsx/episode.config.ts unchanged)
Scene 11 not started:                     PASS
```

## 14. Git Status

- Branch: `master`
- Files changed by this task: `feedbacks/task-017-feedback.md` (new, this report).
- Pre-existing changes at task start: `tasks/TASK-017.md` (untracked, the task file itself — present before this task began work).
- No other files modified, added, or deleted.
- No commits made. No pushes made.

## 15. Recommended Next Step

```text
If NO NEW ASSET REQUIRED:
→ create the Scene 10 implementation task using the approved motion plan and required installed skills.
```

## 16. Final Status

```text
TASK-017 STATUS: PASS
```
