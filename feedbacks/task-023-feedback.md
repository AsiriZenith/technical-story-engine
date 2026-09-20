# TASK-023 Feedback — Plan Scene 13: Operational and Design Costs of Caching

## 1. Summary

Recommended Scene 13 concept: a **hybrid, fully Remotion-native central-node scene (Option D)** — a simple central "Redis" node (reusing the existing `cache` node accent color and stack-icon vocabulary Scene 01 already established) with four short callouts revealing one at a time around it: **Freshness** (expiration/invalidation), **Capacity** (memory usage), **Resilience** (misses/failures), **Operations** (monitoring/infrastructure). This gives Scene 13 its own visual signature — a system with responsibilities radiating around it — rather than reusing Scene 12's exact side-by-side twin-card layout a third time, while still requiring **NO NEW ASSET**. No arrows or connecting lines are used; the central node itself gets a small emphasis pulse timed with each callout instead. The scene closes on the task's own required mental model: "Caching trades repeated work for extra state, infrastructure, and coordination." The already-approved `scenes.ts` grouping (`'Memory and cache misses'` / `'Monitoring and failure handling'`) is recommended for revision to the cleaner Freshness/Capacity/Resilience/Operations split, since the current wording conflates Capacity with Resilience and Resilience with Operations. Scene 13 was not implemented. No `src/`, asset, or localization files were modified.

## 2. Skills Used

```text
technical-story-video
  Used for: workflow ordering, the manual-asset-workflow stop condition, and the Human Media Review Gate framing (confirming this stays a planning-only deliverable).
  Influenced: checking scenes.ts's current Scene 13 entry before proposing anything, rather than assuming a blank slate, and flagging the grouping mismatch as a recommendation rather than silently working around it.

remotion-best-practices
  Used for: default routing confirmation that no new Remotion mechanic is needed.
  Influenced: ruled out proposing any new animation primitive; the plan reuses the exact interpolate()/AbsoluteFill vocabulary Scenes 01/11/12 already use, plus one new small file-local component for the central node.

remotion-markup
  Used for: reviewing Scene 01's NodeGlyph/SceneNode (icon + label + role, built from architectureNodeSemantics' cache accent/shape) and Scene 12's ValueCard (label + role + value) as the two existing card/node precedents in this codebase.
  Influenced: recommending the central node be modeled on Scene 01's cache-node visual language (same accent red, same stack-icon shape) rather than inventing new iconography, and recommending each callout be a small text block (Scene 11/12's CenteredLine-style treatment) rather than a full ValueCard, since callouts here are short 1-2 word labels plus a brief caption, not label/role/value triples.

frontend-design
  Used for: restraint principles (avoid a dense icon grid or dashboard look, keep exactly one focal idea per beat, avoid decorative connecting arrows for a radial layout that doesn't need them).
  Influenced: rejecting connecting lines/arrows between the central node and each callout (a "hub and spoke" diagram look this project has consistently avoided since Scene 04/07/08's "no unnecessary arrows" precedent) in favor of a central-node emphasis pulse timed with each callout's entrance -- proximity and timing carry the relationship, not drawn geometry.

animate
  Used for: confirming the central-node pulse should be a small ease-out scale emphasis (reusing the same 1 -> 1.06 -> 1 shape Scene 12's Redis-card pulse already established), not a spring/bounce, and that each callout's entrance/exit should use the same enterSoft/exitSoft fade vocabulary as every prior scene.
  Influenced: the beat plan's motion (Section 9) reuses Scene 12's exact pulse shape rather than inventing a new emphasis curve, keeping the fourth consecutive no-image scene visually consistent with its immediate predecessor's motion language even though the layout itself is new.
```

Not consulted: `remotion-captions` (all caption text follows the existing `translate()` pattern; no new captioning mechanic), `remotion-docs` (no API uncertainty arose), `remotion-studio` (a still/preview render is not part of this planning-only task), `review-animations` (no implementation diff exists yet to review).

## 3. Teaching Goal

```text
freshness cost      -> Beat 2: "Freshness" callout, caption naming expiration and invalidation as ongoing responsibilities (not solved once and forgotten) -- deliberately not re-explaining Scene 12's specific stale-email mechanism, just naming the category of cost it belongs to.
memory/capacity cost  -> Beat 3: "Capacity" callout, caption naming that cached data occupies memory, which is finite.
resilience cost         -> Beat 4: "Resilience" callout, caption naming that cache misses and cache failures both need to be handled, not treated as exceptional errors.
operational/infrastructure cost -> Beat 5: "Operations" callout, caption naming monitoring and the extra infrastructure a cache layer itself requires.
```

Each callout gets one short caption naming the *category* of responsibility, never the specific mechanism (no TTL numbers, no eviction policy names, no cluster/replication detail) -- satisfying the task's explicit "Too deep for this scene" list. The scene's single throughline, delivered in the closing beat, is that these are not isolated problems but one coherent fact: introducing a cache adds a second, stateful copy of data that now has to be stored, refreshed, observed, and handled when unavailable -- the task's own "correct framing" quote, used verbatim as the closing line's underlying idea.

## 4. Scene 12 Continuity

Scene 12 ended on "Caching reuses old work. That's also how it can become stale." -- a single, concrete correctness risk (staleness). Scene 13's Beat 1 bridges directly from that with the task's own suggested line, "And stale data is only one of the costs," which explicitly reframes staleness as one instance of a broader category (Freshness) rather than the whole story, before widening to the other three categories. The Alice email example is not reused, repeated, or referenced again -- Scene 13 operates entirely at the category level (Freshness/Capacity/Resilience/Operations), never returning to a specific data example, satisfying the task's explicit "Do not repeat the Alice email example in depth" instruction.

## 5. Visual Option Comparison

### Option A — Reuse `scene-07-technical-architecture.png`

- Advantages: zero new asset risk; already approved.
- Disadvantages: the task's own framing is correct -- that diagram explains request *flow* (which path a request takes on a hit/miss), not *operational responsibility* (what a team has to do to keep a cache healthy over time). Nothing in the image represents monitoring, memory pressure, or infrastructure cost. This would also be the diagram's sixth-plus reuse across the episode, well past the point where it can carry a genuinely new idea.
- Clarity: low for this scene's actual content.
- Implementation risk: low technically, high risk of a scene that doesn't show what it claims to teach.

### Option B — Reuse Scene 12's Remotion-native card language

- Advantages: zero new asset risk; directly continues the no-image visual language Scenes 11 and 12 already established and validated; low implementation risk since the card shape (label + short text) is already built and approved.
- Disadvantages: this would be the **third consecutive** no-image scene using essentially the same visual grammar (centered text / small labeled cards). Scene 12's specific layout -- two cards side by side, directly comparable -- doesn't map naturally onto four categories; forcing four cards into the same two-card comparison shape either crowds the frame or requires a new grid layout that no longer resembles "Scene 12's language" closely enough to justify calling it a continuation rather than a new pattern anyway.
- Clarity: adequate, but risks visual monotony for a viewer who has just watched two scenes in a row built the same way.
- Implementation risk: low.

### Option C — New dedicated infographic

- Advantages: could show a purpose-built "Redis surrounded by responsibilities" image exactly as the task describes, with full control over composition and labeling.
- Disadvantages: precision-critical (the task's own accuracy constraints -- do not imply caching is usually not worth it, do not imply Redis is unreliable by default, do not imply every production cache needs the same strategy -- make composition and labeling choices high-stakes), so per the manual-asset workflow this blocks on user generation and approval before implementation can start. Scene 11 and Scene 12 already demonstrated that comparably conceptual content ships faster and just as clearly without a bespoke image.
- Clarity: potentially high, but only after the approval round-trip.
- Implementation risk: highest -- hard stop until the asset exists and is approved.

### Option D — Hybrid central-node scene (RECOMMENDED)

- Advantages: **no new asset dependency** -- ships as soon as this plan is approved. Directly visualizes the task's own "correct framing" quote -- a system (the central Redis node) that now has responsibilities around it -- more literally than any of the other three options. Gives Scene 13 a distinct visual signature (a central subject with things revealed around it) instead of a third repetition of Scene 11/12's plain-centered-text or side-by-side-card shapes, while still reusing only already-established tokens and icon vocabulary (Scene 01's cache-node accent/shape). Naturally supports "avoid more than 4 conceptual groups visible at once" since the four callouts occupy four fixed positions around one center, never competing for the same visual space.
- Disadvantages: introduces one new layout shape (radial positions around a center) that neither Scene 11 nor Scene 12 used, so it is not a pure continuation of an existing pattern -- though it reuses existing tokens/colors/motion, the spatial arrangement itself is new to this project's Remotion-native scenes.
- Clarity: high -- "the cache is one node, and here are four kinds of upkeep it now needs" is a more direct visual argument than a checklist or a comparison pair.
- Implementation risk: low -- the central node is a simplified version of Scene 01's existing `SceneNode`/`NodeGlyph` cache treatment, and each callout is a short text block using the same fade/scale vocabulary already proven in Scenes 08-12.

**Recommendation: Option D.** It is the only option that both avoids a new-asset dependency and gives the scene's central idea (a system now surrounded by responsibilities) a visual form that argues for itself, rather than relying entirely on caption wording to carry a categorical framework the way a third consecutive card-based scene would.

## 6. Asset Decision

```text
NO NEW ASSET REQUIRED
```

## 7. External Asset Request

```text
None.
```

## 8. Tradeoff Grouping

**Recommended final grouping: Freshness / Capacity / Resilience / Operations**, exactly as the task's own "Grouping Guidance" section proposes:

```text
Freshness   -> expiration + invalidation
Capacity    -> memory usage
Resilience  -> cache misses + cache failures
Operations  -> monitoring + extra infrastructure
```

**Why this is the clearest available grouping:** it cleanly separates four distinct kinds of responsibility with no overlap, each nameable in one word. This is a genuine improvement over the already-approved `scenes.ts` `storyBeats` for Scene 13, which currently read `'Expiration and invalidation'`, `'Memory and cache misses'`, `'Monitoring and failure handling'`, `'Extra infrastructure'` -- note that `'Memory and cache misses'` conflates Capacity (memory) with Resilience (misses), and `'Monitoring and failure handling'` conflates Operations (monitoring) with Resilience (failures) a second time. The task's four-category split is strictly cleaner: each of the seven items in the Core Teaching Goal's list (expiration, invalidation, memory usage, cache misses, monitoring, cache failures, extra infrastructure) maps to exactly one category with no item split across two. **Recommend the implementation task update Scene 13's `storyBeats` to this four-category grouping** rather than keeping the current wording, since the current wording's overlaps would make the beat-to-caption mapping ambiguous during implementation (which beat "owns" cache misses -- the memory beat or the failure-handling beat?). This planning task does not make that edit itself, per its own scope rules.

## 9. Beat-by-Beat Plan

Using the currently-approved `scenes.ts` window (`sharedWindow(14, 2)` = 16.0s = 480 frames at 30fps) -- this duration is generous for 6 concise beats (comparable to Scene 10's 15.0s for 6 beats and more generous than Scene 12's 13.0s for 6 beats), so **no duration change is recommended**, pending confirmation once actual timing is drafted in the implementation task.

```text
Beat 1 — Bridge (0.4s-2.4s)
  Visual: plain centered text (Scene 11/12's exact treatment), no central node yet.
  Caption: "And stale data is only one of the costs."
  Motion: soft fade + slight upward settle, ease-out.
  Why: bridges directly from Scene 12's closing line into this scene's wider scope, per the task's explicit continuity requirement (Section 4).

Beat 2 — Central node appears + Freshness (2.8s-5.6s)
  Visual: a small central "Redis" node (Scene 01's cache-node accent red, stack-icon shape, simplified) fades/settles into the center of frame; a "Freshness" callout appears to one side (e.g. top) with its caption below.
  Caption: "It needs expiration and invalidation -- so data does not sit unchecked forever."
  Motion: central node fade/settle-in once; Freshness callout fade-in with a small ease-out scale pulse on the central node (1 -> 1.06 -> 1) timed to its appearance, no connecting line/arrow.
  Why: establishes the central subject (the cache, now a permanent part of the system) before its first responsibility, and ties each responsibility back to that one subject through timing/proximity rather than drawn geometry.

Beat 3 — Capacity (6.0s-8.4s)
  Visual: central node remains, unchanged; Freshness callout fades out; "Capacity" callout appears at a different position (e.g. right).
  Caption: "It consumes memory -- and memory is not infinite."
  Motion: same pulse-on-central-node + callout fade-in/out pattern as Beat 2, one callout visible at a time.
  Why: names the second, distinct cost category without re-using Freshness's language or visual slot.

Beat 4 — Resilience (8.8s-11.2s)
  Visual: central node remains; Capacity callout fades out; "Resilience" callout appears (e.g. bottom).
  Caption: "Sometimes it misses. Sometimes it fails. Both need a plan."
  Motion: same pattern.
  Why: names cache misses and cache failures together as one category, without implying either is exceptional or rare (per the task's explicit accuracy constraint).

Beat 5 — Operations (11.6s-14.0s)
  Visual: central node remains; Resilience callout fades out; "Operations" callout appears (e.g. left).
  Caption: "Someone has to watch it, and something has to run it."
  Motion: same pattern.
  Why: names monitoring and infrastructure together as the fourth category, completing the four-position layout around the central node.

Beat 6 — Closing mental model (14.4s-16.0s, holding to the scene's own duration boundary)
  Visual: all four callouts may remain faintly visible around the central node (at most 4 conceptual groups on screen at once, satisfying the task's explicit limit) while the closing line takes visual precedence in the center; alternatively the callouts fade to a low ambient opacity so the closing text reads cleanly -- final treatment to be confirmed visually during implementation.
  Caption: "Caching trades repeated work for extra state, infrastructure, and coordination." (the task's own required closing mental model, used verbatim).
  Motion: fade + gentle scale-in on the closing text, ease-out, holding to 16.0s exactly (the same "land at the cutoff" technique Scenes 08-12 use).
  Why: this is the task's own required takeaway, stated as the scene's last word, tying all four named categories back to one coherent idea rather than leaving them as an unconnected list.
```

6 beats, matching the task's own suggested structure closely (its Beat 1/2/3/4/5/6 mapping is preserved beat-for-beat, with the addition of an explicit central-node introduction folded into Beat 2 rather than as a separate beat, to avoid a 7th beat).

## 10. Tone / Humor Decision

**No humor is used.** The task explicitly states "No joke is required" and that any humor used "must be extremely light and serve comprehension" -- given that Scene 13 already carries four distinct categories in a tight 16-second window, adding a joke beat would either crowd the scene or dilute one of the four categories' already-short caption budget. The recommended tone is the task's own "Here is the cost side of the tradeoff" framing: grounded, professional, and matter-of-fact, avoiding anything closer to "Caching is scary" (the task's explicit anti-pattern). This is a deliberate contrast with Scene 11's typographic joke and Scene 12's brief wry aside -- not every scene in this run needs a humor beat, and this is the first of the three consecutive no-image scenes (11, 12, 13) to intentionally omit one.

## 11. Motion / Spotlight Strategy

- **`SpotlightImage` is not used.** There is no image in this scene under Option D -- nothing to spotlight, dim, or feather-mask. Stated explicitly per the task's "explicitly state that SpotlightImage is not needed" instruction.
- **Preferred Remotion-native components/tokens:**
  - A small local (file-scoped, unexported) central-node component, modeled on Scene 01's `NodeGlyph`/`SceneNode` cache treatment (`architectureNodeSemantics.cache`'s accent red and stack-icon shape), simplified to just the icon + "Redis" label -- not importing Scene 01's actual component (it is not exported), following the same "each scene keeps its own local copy" pattern Scene 12 already established for its `ValueCard`.
  - A small local callout component (label + short caption, reusing Scene 11/12's `CenteredLine`-style fade/lift treatment) for each of the four categories -- one instance reused four times with different position/content, not four separate components.
  - `theme`/`provisionalColors` for the central node's accent and general chrome; no new colors introduced.
  - `motionPresets` (`enterSoft`, `emphasizeScale`) and the shared ease-out bezier for every transition, exactly as Scenes 11/12 use them.
- No arrows, no glow-box/FocusBox, no connecting lines, no dense icon grid -- one central node, one callout visible at a time, and short captions are the entire visual vocabulary, per the task's explicit restraint rules.
- **New local helper needed:** yes, one small central-node component and one small callout component, both file-local to the new scene file, not new shared primitives (Section 14).

## 12. Localization Plan

- **EN / DE / FR:** roughly ten short translation keys will be needed at implementation time (bridge, four category labels, four category captions, one closing mental-model line). All are short, single-sentence, and follow the existing `translate()` key-naming pattern.
- **Category label translations to verify at implementation time:**

```text
Freshness  -> DE "Aktualität" (data-currency sense, more natural here than a literal "Frische"), FR "Fraîcheur" (commonly used metaphorically for data freshness in French technical writing) or the safer, more literal "Actualité" -- both short, to be confirmed visually.
Capacity   -> DE "Kapazität", FR "Capacité" -- direct cognates, no concerns.
Resilience -> DE "Resilienz" (an increasingly common German tech loanword, shorter than a native alternative like "Ausfallsicherheit"), FR "Résilience" -- direct cognate, no concerns.
Operations -> DE "Betrieb" (short, idiomatic for ops/infrastructure context) preferred over a longer literal "Operationen", FR "Opérations" (direct, clear) with "Exploitation" as a more domain-idiomatic alternative to consider (as in "équipe d'exploitation") -- to be confirmed with rendered stills.
```

- **Caption length:** each category's caption is a single short sentence (two clauses at most), matching the length budget Scenes 08-12 already operate within safely; no caption references a number or a specific mechanism name, so translation should not introduce new overflow risk beyond what prior scenes already handled.
- The closing mental-model line ("Caching trades repeated work for extra state, infrastructure, and coordination.") is a single sentence of comparable length to Scene 12's closing takeaway, which was confirmed to wrap cleanly (2-4 lines depending on language) without overflow.

## 13. Numeric Latency Recommendation

**Numeric latency references are avoided entirely.** No `~8 ms`, `~10 ms`, or `~180 ms` appears in any of the six recommended beats or in the closing mental model, consistent with the task's explicit "Scene 13 is about tradeoffs, not latency" instruction. This also means Scene 13 does not reuse or touch the already-documented `~8 ms` vs. baked `~10 ms` discrepancy from Scenes 07-10 at all, the same clean separation Scenes 11 and 12 already maintained.

## 14. Reusable Component Notes

- **Existing typography tokens:** reused directly (`typography.technicalLabel` for the four category labels, `typography.body`/`sectionHeading` for captions, a `sceneTitle`-adjacent scale for the closing mental model) -- no new type scale needed.
- **Scene 12 card patterns:** not reused directly -- Scene 12's `ValueCard` (label/role/value triple with a bordered value box) is shaped for a two-item side-by-side comparison, not a four-position radial layout with short label+caption pairs. Scene 13's callouts are a simpler shape (label + one caption line, no bordered value box), so a new, smaller local component is more appropriate than forcing `ValueCard`'s shape onto this content.
- **Existing node/card styles:** the central node reuses Scene 01's cache-node visual language (accent color, stack-icon shape) at a smaller, simplified scale -- this is the one piece of existing visual vocabulary Scene 13 draws on directly.
- **New file-local components needed:** yes, two -- a small central-node component and a small callout component, both scoped to the new scene file only, following the exact precedent Scenes 01/11/12 already set of keeping scene-specific helpers local rather than promoting them prematurely (per `AGENTS.md`: "Do not promote one-off code prematurely").
- **No new shared primitive is needed.** Everything this plan calls for is expressible with existing tokens plus two new file-local components.

## 15. Verification Results

```text
installed skills consulted:            PASS (Section 2)
Scene 12 continuity reviewed:           PASS (Scene12StaleCache.tsx and its closing "Caching reuses old work..." line read directly; Beat 1 bridges from it explicitly)
tradeoff scope reviewed:                 PASS (Section 3/Section 8 -- confirmed the "too deep for this scene" list is excluded from every beat's caption)
visual options compared:                  PASS (Section 5)
asset decision made:                       PASS (Section 6 -- NO NEW ASSET REQUIRED)
tradeoff grouping defined:                  PASS (Section 8 -- Freshness/Capacity/Resilience/Operations recommended, with an explicit recommendation to revise the current scenes.ts wording)
motion plan created:                         PASS (Section 9/11)
tone decision made:                           PASS (Section 10 -- no humor)
localization plan created:                     PASS (Section 12)
latency-number policy addressed:                PASS (Section 13)
no production source changes:                    PASS (git status shows only pre-existing untracked/modified files from TASK-018/020/022, none touched by this task)
no asset changes:                                 PASS (no files under public/ or assets.ts touched)
Scene 13 not implemented:                          PASS (no Scene13*.tsx file created; RedisEpisode.tsx/episode.config.ts/scenes.ts unchanged by this task)
Scene 14 not started:                               PASS
```

## 16. Git Status

- Branch: `master`
- Files changed by this task: `feedbacks/task-023-feedback.md` (new, this report).
- Pre-existing changes at task start (from TASK-018/020/022, not committed, untouched by this task):
  - Modified: `src/episodes/001-redis/RedisEpisode.tsx`, `src/episodes/001-redis/episode.config.ts`, `src/episodes/001-redis/scenes.ts`, `src/shared/localization/index.ts`
  - Untracked: `feedbacks/task-017-feedback.md` through `feedbacks/task-022-feedback.md`, `src/episodes/001-redis/scenes/Scene10WhyRedisFast.tsx`, `src/episodes/001-redis/scenes/Scene11CacheEverything.tsx`, `src/episodes/001-redis/scenes/Scene12StaleCache.tsx`, `tasks/TASK-017.md` through `tasks/TASK-023.md`
- No other files modified, added, or deleted by this task.
- No commits made. No pushes made.

## 17. Recommended Next Step

```text
If NO NEW ASSET REQUIRED:
→ create the Scene 13 implementation task using the approved motion plan and required installed skills.
```

## 18. Final Status

```text
TASK-023 STATUS: PASS
```
