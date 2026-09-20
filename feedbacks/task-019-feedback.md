# TASK-019 Feedback — Plan Scene 11: Should We Cache Everything?

## 1. Summary

Recommended Scene 11 concept: a **fully Remotion-native, text/typography-driven scene (Option D)** with no image asset at all — no `SpotlightImage`, no reused architecture/restaurant PNG, no new illustration. The scene bridges from Scene 10's closing line, delivers a short, purely typographic joke ("CACHE EVERYTHING!" → "Not so fast."), names the concrete costs of caching everything in two short conceptual lines (memory / stale data / invalidation, then "not every request is expensive enough — and misses still happen"), and closes on the required decision rule: "Cache where avoiding repeated expensive work is worth the tradeoff." This mirrors Scene 01's own precedent (the episode's only other scene with no photographic/illustrated asset, built entirely from typography, existing architecture-node icons, and `Interactive.Div` motion), so it is not a new visual language for the project. **NO NEW ASSET REQUIRED.** Two non-visual findings are flagged for the implementation task: the already-approved `scenes.ts` entry for Scene 11 is currently sized (7s target, 2 story beats) for a much shorter "setup + punchline" scene than the decision-filter content this task now specifies, and its `assetIds` still lists the `developer` character asset, which remains an unapproved `placeholder` with no file — Option D does not depend on it. Scene 11 was not implemented. No `src/`, asset, or localization files were modified.

## 2. Skills Used

```text
technical-story-video
  Used for: workflow ordering, the manual-asset-workflow stop condition, and the Human Media Review Gate framing (confirming this stays a planning-only deliverable).
  Influenced: the decision to flag the `developer` asset's placeholder status as a blocker to avoid, rather than silently assuming it will exist by implementation time.

remotion-best-practices
  Used for: default routing confirmation that no new Remotion mechanic is needed — this plan reuses `interpolate()`-driven fades/scales and `Interactive.Div`, all already present in the codebase.
  Influenced: ruled out proposing any new animation primitive; the plan builds entirely on Scene 01/07-10's existing vocabulary.

remotion-markup
  Used for: reviewing how Scene 01 structures a no-image, typography-driven scene (`Interactive.Div` blocks, `typography` tokens, `theme` colors, scene-relative `beats` timing) as the concrete precedent for this scene's Option D.
  Influenced: the recommendation to model Scene 11's beats on Scene 01's "Final comparison" treatment (centered, scaled-in text) rather than force-fitting the `BottomCaption` gradient-scrim component, which exists specifically to keep text legible over a photographic image Scene 11 does not have.

frontend-design
  Used for: restraint principles (avoid ALL-CAPS eyebrow labels except where the content is genuinely an exclamation/punchline, spend boldness in one place, avoid decorative numbered badges/chips for a 3-item list that isn't a sequence).
  Influenced: rejecting an icon-chip row for the "memory / stale data / invalidation" costs (Section 4/7) in favor of one plain sentence, since three short nouns don't need three decorated cards to read clearly, and a chip row would be the "SaaS-card kit" default the skill warns against.

animate
  Used for: classifying Beat 2 (the joke) as "Explanation"-adjacent humor rather than "Delight" (Delight is reserved for rare/first-time moments; this is closer to marketing/explainer seasoning, which the skill's own vocabulary and this project's "explain -> tiny joke -> continue" rule both point to), and confirming ease-out fades / no `scale(0)` entrances / no ease-in.
  Influenced: kept the joke's on-screen hold under ~1.5s combined (punch + correction), reused the same ease-out bezier and sub-second fade durations as every other scene, and rejected any idea of a bouncier/springier joke-specific curve as an invented, non-token value.
```

Not consulted: `remotion-captions` (all caption text follows the existing `translate()`/messages pattern already established; no new captioning mechanic is introduced), `remotion-docs` (no API uncertainty arose), `remotion-studio` (a still/preview render was not part of this planning-only task), `review-animations` (there is no implementation diff yet to review — this skill applies at QA time, not planning time).

## 3. Teaching Goal

Scene 11 needs to explain *why caching everything is a bad default* without re-teaching Scene 12/13's material. The plan does this in four short conceptual beats, each staying at the "named concern, not mechanism" level:

```text
memory usage              -> named in Beat 3 ("More memory.") -- not explained (no discussion of eviction, limits, or monitoring; that is Scene 13's job).
stale data risk            -> named in Beat 3 ("More stale data.") -- not explained (no discussion of what stale data IS or how it happens; that is Scene 12's entire job).
invalidation complexity     -> named in Beat 3 ("More to keep in sync.") -- deliberately plain language, no mention of TTLs, eviction policies, or invalidation strategies (Scene 13's job).
cache misses still happen    -> folded into Beat 4's second clause ("...and misses still happen") -- a one-clause acknowledgment, not a re-explanation of hit/miss mechanics (already fully taught in Scenes 08/09).
not every computation is expensive enough -> Beat 4's main clause ("not every request is expensive enough to justify caching").
```

Each concern gets at most a few words, never a mechanism. This keeps Scene 11 a **decision filter** (should we cache this? -> weigh cost vs. payoff) rather than drifting into *how* those costs manifest or are managed, which is explicitly Scenes 12-13's material per the existing `scenes.ts` purposes (`12-stale-cache`: "Demonstrate that a fast answer can still be wrong"; `13-cache-tradeoffs`: "Introduce the operational and design costs that accompany caching").

## 4. Visual Option Comparison

### Option A — Reuse `scene-07-technical-architecture.png`

- Advantages: zero new asset risk; already approved.
- Disadvantages: this would be the **fifth consecutive scene** (07, 08, 09, 10, now 11) built on the same diagram. Scene 11 is a tonal break (lighter, a small joke, a decision-filter question) — anchoring it to the same serious flow diagram undercuts that shift and gives the viewer no visual signal that the topic has changed from "how the request flows" to "should we even cache this." Also nothing in that diagram represents memory pressure, staleness, or invalidation.
- Clarity: low for this scene's actual content.
- Implementation risk: low.

### Option B — Reuse an existing restaurant/shelf visual (Scenes 05-07)

- Advantages: would reuse approved assets; the "too many items piled onto the shelf" metaphor is intuitive if it existed.
- Disadvantages: **the described visual does not exist.** `scene06ReadyShelf.png` and `scene06ServeFromShelf.png` show a single prepared burger on the shelf, not an overflowing pile — reusing either while captioning it as "too much cached" would misrepresent what the approved asset actually shows, which the project's own asset-manifest discipline (`docs/production-architecture.md`: "Rendered exactly as supplied; never redrawn or reinterpreted") does not permit. Achieving the literal Option B metaphor would require a **new** image, collapsing this option into Option C's asset dependency in practice.
- Clarity: would be high **if** the asset existed as described; as things stand, not actually available.
- Implementation risk: medium-high once the misrepresentation issue is accounted for (it either blocks on a new asset, or ships something interpretively incorrect).

### Option C — New dedicated Scene 11 infographic

- Advantages: could show exactly the "overflowing cache box" metaphor the task describes, purpose-built for this scene's costs.
- Disadvantages: precision-critical (the task's own accuracy constraints — do not imply caching is bad, do not imply only slow DB queries are cacheable, do not imply staleness is inevitable — make composition and labeling choices high-stakes), so per the manual-asset workflow this blocks on user generation and approval before any implementation can start. A scene whose entire content is nameable in a few short sentences does not obviously need a bespoke illustration to justify that wait.
- Clarity: potentially high, but only after the approval round-trip.
- Implementation risk: highest — hard stop until the asset exists and is approved.

### Option D — Remotion-native hybrid (RECOMMENDED)

- Advantages: **no new asset dependency at all** — ships as soon as this plan is approved. Has a direct, already-implemented precedent in this exact codebase: `Scene01Mystery.tsx` is a no-image scene built entirely from `typography` tokens, `theme` colors, `Interactive.Div` motion, and the existing `architectureNodeSemantics` icon set — proving this visual language is already a first-class part of the episode's style, not a one-off improvisation. The tonal shift (lighter, a quick joke, a decision question) is reinforced rather than undercut, since the visual language itself changes from "dense diagram" to "bold statement," signaling to the viewer that the scene's *purpose* has changed too.
- Disadvantages: cannot show a physical metaphor (no shelf, no box) the way Option B/C could; leans entirely on wording to carry the costs, which raises the bar on caption precision (mitigated by keeping captions to short, plain-language nouns rather than mechanism explanations — see Section 3).
- Clarity: high for the decision-filter framing this scene actually needs; adequate (not maximal) for making the individual costs viscerally memorable, which is an acceptable tradeoff since Scenes 12-13 will make each cost concrete and memorable in its own dedicated scene.
- Implementation risk: lowest — reuses only already-existing, already-approved code patterns.

**Recommendation: Option D.** It is the only option that ships without any new-asset dependency, has a direct in-codebase precedent (Scene 01), and its "bold typography" visual language actively reinforces the tonal shift the task asks for rather than working against it.

## 5. Asset Decision

```text
NO NEW ASSET REQUIRED
```

## 6. External Asset Request

```text
None.
```

**Flag for the implementation task (not a new asset request, a pre-existing dependency to remove):** `scenes.ts`'s current `11-cache-everything` entry lists `assetIds: ['developer']`. The `developer` asset in `assets.ts` is `status: 'placeholder'` with `path: null` — it does not exist yet, and `characters.ts` records it as intended for "excited realization / overconfident cache-everything pose." Since Option D uses no character illustration at all, the implementation task should update Scene 11's `assetIds` to `[]` rather than attempt to resolve a placeholder asset (which would throw, per every scene's existing `if (!asset.path) throw` pattern) or block on generating/approving a `developer` illustration this plan does not need. This is a scope note for the next task, not something this planning task modifies.

## 7. Beat-by-Beat Plan

Recommended duration: the currently-approved `scenes.ts` window (`sharedWindow(7)` = 7s target + 1s default margin = 8s = 240 frames at 30fps) is sized for a bare two-beat "recap + punchline," per its current `storyBeats: ['180 ms -> 8 ms', 'CACHE EVERYTHING']`. The decision-filter content this task now specifies (setup, joke, three named costs, the "not every request" caveat, and an explicit decision rule) does not fit legibly in 8s without becoming a rapid-fire slide flip. **Recommend widening to `sharedWindow(9, 2)` = 11s = 330 frames** for the implementation task to apply (this planning task does not modify timing, per its own scope rules) — still one of the shorter scenes in the episode, consistent with this being "slightly lighter than Scene 10," not a scope creep into Scene 13's territory.

```text
Beat 1 — Setup / bridge (0.4s-2.0s)
  Visual: plain centered text, no spotlight, no image (full dark background, same as every scene's base AbsoluteFill).
  Caption: "So... why not avoid repeated work everywhere?"
  Motion: fade + slight upward settle (Scene 01's `enterSoft`/exitSoft pattern), ease-out.
  Why: bridges directly from Scene 10's closing line ("avoiding repeated work is the real reason for the speedup") into the natural next question, without re-explaining Scene 10's mechanism -- satisfies the task's explicit Scene 10 continuity requirement.

Beat 2 — Temptation + correction (2.4s-4.2s)
  Visual: large bold display text (`typography.display`, ~112px, accent-colored) reading "CACHE EVERYTHING!" for ~0.8s, immediately followed (no gap, same beat) by a much smaller, muted correction line "Not so fast." fading in as the big text fades out.
  Caption: the two lines above are the caption -- no separate BottomCaption needed since this beat IS the text.
  Motion: `emphasizeScale`-style quick scale-in (0.88->1) on the big text for punch, then a soft crossfade to the small correction line; no bounce/spring (per `animate`, bounce is reserved for drag/gesture interactions, not text emphasis).
  Why: this is the scene's one permitted joke, per the task's tone guidance ("Cache everything!" -> "Not so fast.") -- kept to a single beat, under two seconds combined, so it seasons rather than dominates the scene.

Beat 3 — Costs (4.6s-6.8s)
  Visual: plain centered text, same treatment as Beat 1.
  Caption: "More memory. More stale data. More to keep in sync."
  Motion: simple fade-in/fade-out, no stagger needed since it is a single sentence, not three separate elements.
  Why: names memory usage, stale data risk, and invalidation complexity in plain, mechanism-free language -- enough to justify "no" without pre-empting Scenes 12/13's deeper treatment of each.

Beat 4 — Not every request qualifies (7.2s-9.0s)
  Visual: plain centered text, same treatment.
  Caption: "Not every request is expensive enough to justify caching -- and misses still happen."
  Motion: simple fade-in/fade-out.
  Why: covers the two remaining required reasons (not every computation is expensive enough; cache misses still happen) in one sentence, keeping the beat count low per the task's "avoid checklist-heavy" instruction.

Beat 5 — Decision rule / closing (9.4s-10.8s)
  Visual: plain centered text, slightly larger than Beats 3-4 (closer to `typography.sceneTitle`) to mark it as the scene's takeaway, matching how Scene 09/10 give their closing line slightly more visual weight than mid-scene captions.
  Caption: "Cache where avoiding repeated expensive work is worth the tradeoff."
  Motion: fade + gentle scale-in, ease-out, holding to the scene's own duration boundary (same "land exactly at the cutoff" technique Scenes 08/09/10 use for their closing lines).
  Why: this is the task's own required simple rule, delivered as the scene's last word so it is what the viewer carries into Scene 12.
```

5 beats total, matching the task's own suggested "likely structure" closely (its Beats 2/3 are combined here into one joke beat, and its numeric recap beat is replaced by Beat 1's conceptual bridge -- see Section 12 for why).

## 8. Humor Decision

- **A joke is used**, exactly once, in Beat 2.
- **Where:** immediately after the bridge question, before any cost is named -- "CACHE EVERYTHING!" (the tempting instinct, stated as an exclamation) followed immediately by "Not so fast." (the correction).
- **Exact purpose:** externalizes the viewer's own likely reaction (having just watched Scene 10 show how much faster caching made one path) as a brief, self-aware beat, then immediately deflates it -- classic "explain -> tiny joke -> continue" seasoning, not a standalone comedic detour.
- **Why it does not harm clarity:** it is purely typographic (no character, no new asset, no sound effect to design), lasts under two seconds combined, and is immediately followed by the actual technical content (Beats 3-4's costs) -- the joke sets up the correction, it does not replace or delay the explanation. It also does not imply "caching is bad" (which the task explicitly forbids); "Not so fast" corrects the *default*, not the *tool*.

## 9. Tradeoff Scope

```text
Scene 11 introduces (brief, named, not mechanism-level):
  - memory usage as a cost
  - stale data risk as a cost
  - invalidation complexity as a cost (as "keep in sync", no TTL/eviction-policy detail)
  - the fact that not every computation is expensive enough to justify caching
  - the fact that cache misses still happen (one clause, no hit/miss mechanics re-explanation)
  - the closing decision rule: cache where avoiding repeated expensive work is worth the tradeoff

Scene 11 intentionally leaves for later scenes:
  - what stale data actually is and how it causes a wrong answer -> Scene 12 ("Stale Cache") in full
  - expiration and invalidation mechanics (TTLs, eviction policies, invalidation strategies) -> Scene 13 ("Cost of Caching")
  - memory limits, monitoring, and failure handling in operational depth -> Scene 13
  - extra infrastructure costs -> Scene 13
  - the final cross-episode mental-model recap -> Scene 14
```

This boundary matches the already-approved `scenes.ts` purposes for Scenes 12 (`'Demonstrate that a fast answer can still be wrong.'`) and 13 (`'Introduce the operational and design costs that accompany caching.'`), so Scene 11 does not duplicate either.

## 10. Motion / Spotlight Strategy

- **`SpotlightImage` is not used.** There is no image in this scene under Option D -- nothing to spotlight, dim, or feather-mask. This is a deliberate, stated departure (per the task's "If no SpotlightImage is needed, say so"), not an oversight.
- **No regions defined**, for the same reason.
- All motion is `interpolate()`-driven opacity/scale on plain text blocks, using the exact same `motionPresets` (`enterSoft`, `enterFast`, `exitSoft`, `emphasizeScale`) and ease-out bezier (`Easing.bezier(0.16, 1, 0.3, 1)`) every other scene in the episode already uses -- no new curve, duration, or easing token is introduced.
- No FocusBox/glow-box treatment, no badges, no arrows -- consistent with the task's explicit rules and with Scenes 08-10's established restraint.

## 11. Localization Plan

- **EN / DE / FR:** six new translation keys are needed for implementation (not added by this planning task): a bridge line, the "CACHE EVERYTHING!" punch line, the "Not so fast." correction, the costs line, the "not every request" line, and the decision-rule closing line. All six are short (well under the ~75-character single-line budget Scenes 08-10 already operate within) and written in plain, non-idiomatic language to translate cleanly.
- **Phrase-shortening concerns:** the punch line "CACHE EVERYTHING!" needs a punchy, short translation in each language (e.g. a German or French equivalent that keeps the exclamation's energy without becoming a long compound phrase) -- this is a translation-quality concern to verify during implementation via rendered DE/FR stills (the same verification method Scenes 08-10 used for their own new caption keys), not a structural risk, since the source phrase is already short.
- **Character-based joke risk avoided:** because Option D uses no character asset, there is no risk of a facial-expression-dependent joke reading differently across languages -- the joke is 100% carried by localized text, which is the safer choice per this project's "keep visuals language-neutral, render essential localized copy in Remotion" principle.
- No dense copy anywhere in the plan: every beat is at most one short sentence.

## 12. Latency Number Recommendation

**Scene 11 avoids all numeric latency references.** No `~8 ms`, `~10 ms`, or `~180 ms` appears in any of the five recommended beats. This is a deliberate change from the currently-approved `scenes.ts` `storyBeats` for this scene, which lists `'180 ms -> 8 ms'` as its first beat (a numeric recap of Scene 01's mystery hook). That recap beat is replaced here by Beat 1's conceptual bridge ("So... why not avoid repeated work everywhere?"), which achieves the same "remind the viewer what we just showed" function without re-stating numbers that: (a) are not needed to ask "should we cache everything?", and (b) would be the numbers' sixth-plus appearance across the episode, well past the point of reinforcement and into repetition. This also sidesteps the still-unresolved `~8 ms` vs. baked `~10 ms` discrepancy entirely, since Scene 11 does not reuse the architecture image or any number at all.

## 13. Reusable Component Notes

- **`BottomCaption` is NOT recommended for this scene.** That component exists specifically to keep text legible over a photographic/illustrated background image (its dark gradient scrim only makes sense against image content); Scene 11 under Option D has no image, so a plain centered text block (Scene 01's own `Interactive.Div` pattern) is the correct existing precedent to follow instead, not a new component.
- **No existing title/diagram component needs to change.** `typography` tokens (`display`, `sceneTitle`, `body`), `theme` colors, and `motionPresets` are all directly reusable as-is.
- **No new reusable primitive is needed.** Every visual element this plan calls for (centered fading/scaling text at a few different type scales) already exists as a token or an established per-scene pattern (Scene 01's `Interactive.Div` usage). This is an explicit finding, not an oversight: the implementation task should not introduce a new "BigStatement" or "JokeText" component for what is a one-scene need already covered by existing tokens.

## 14. Verification Results

```text
installed skills consulted:            PASS (Section 2)
Scene 10 continuity reviewed:           PASS (Scene10WhyRedisFast.tsx and its closing caption read directly; Beat 1 bridges from it explicitly)
visual options compared:                 PASS (Section 4)
asset decision made:                      PASS (Section 5 -- NO NEW ASSET REQUIRED)
motion plan created:                       PASS (Section 7)
humor decision made:                        PASS (Section 8)
tradeoff boundary defined:                   PASS (Section 9)
localization plan created:                    PASS (Section 11)
latency-number policy addressed:               PASS (Section 12)
no production source changes:                   PASS (git status shows only pre-existing untracked/modified files from TASK-017/018, none touched by this task)
no asset changes:                                PASS (no files under public/ or assets.ts touched)
Scene 11 not implemented:                         PASS (no Scene11*.tsx file created; RedisEpisode.tsx/episode.config.ts/scenes.ts unchanged by this task)
Scene 12 not started:                              PASS
```

## 15. Git Status

- Branch: `master`
- Files changed by this task: `feedbacks/task-019-feedback.md` (new, this report).
- Pre-existing changes at task start (from TASK-018, not committed, untouched by this task):
  - Modified: `src/episodes/001-redis/RedisEpisode.tsx`, `src/episodes/001-redis/episode.config.ts`, `src/episodes/001-redis/scenes.ts`, `src/shared/localization/index.ts`
  - Untracked: `feedbacks/task-017-feedback.md`, `feedbacks/task-018-feedback.md`, `src/episodes/001-redis/scenes/Scene10WhyRedisFast.tsx`, `tasks/TASK-017.md`, `tasks/TASK-018.md`, `tasks/TASK-019.md`
- No other files modified, added, or deleted by this task.
- No commits made. No pushes made.

## 16. Recommended Next Step

```text
If NO NEW ASSET REQUIRED:
→ create the Scene 11 implementation task using the approved motion plan and required installed skills.
```

## 17. Final Status

```text
TASK-019 STATUS: PASS
```
