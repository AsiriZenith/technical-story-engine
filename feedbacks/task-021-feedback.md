# TASK-021 Feedback — Plan Scene 12: Stale Cache / Fast but Wrong Answer

## 1. Summary

Recommended Scene 12 concept: a **fully Remotion-native data-state scene (Option D)**, directly continuing the visual-language shift Scene 11 just established — no image asset, no `SpotlightImage`, no character illustration. The scene uses two small value-comparison cards (Database vs. Redis) built from existing typography tokens and theme colors to show a Database value changing while the cached Redis value stays frozen, then a fast response that returns the stale value, a brief "Wrong answer. Very fast." joke, and a closing takeaway that reusing old work is exactly what makes it possible for that work to go stale. The already-approved `scenes.ts` example (Alice's email address: `alice.new@example.com` in the Database vs. `alice.old@example.com` in Redis) is recommended unchanged — it is technically neutral, needs no translation, and requires continuity work. **NO NEW ASSET REQUIRED.** One non-visual finding is flagged for the implementation task: Scene 12's `assetIds` currently lists `alicePortrait`, an unapproved `placeholder` asset with no file, which Option D does not need (the same situation TASK-019/020 found and resolved for Scene 11's `developer` asset). Scene 12 was not implemented. No `src/`, asset, or localization files were modified.

## 2. Skills Used

```text
technical-story-video
  Used for: workflow ordering, the manual-asset-workflow stop condition, and the Human Media Review Gate framing (confirming this stays a planning-only deliverable).
  Influenced: flagging the `alicePortrait` placeholder-asset dependency as something to remove rather than silently assuming it will exist by implementation time -- the same reasoning TASK-019 applied to the `developer` asset.

remotion-best-practices
  Used for: default routing confirmation that no new Remotion mechanic is needed.
  Influenced: ruled out proposing any new animation primitive; the plan reuses the exact `interpolate()`/`AbsoluteFill`/local-component vocabulary Scene 01 and the just-implemented Scene 11 already use.

remotion-markup
  Used for: reviewing how Scene 01's `SceneNode` (a small labeled card: icon/value + role label, built from `typography` tokens and `theme`/`provisionalColors`) and Scene 11's `CenteredLine` (a file-local, unexported helper) are structured.
  Influenced: recommending a small local "ValueCard" component modeled directly on `SceneNode`'s shape (label + value + role, not a new visual language) for the Database/Redis comparison, rather than inventing new card markup.

frontend-design
  Used for: restraint principles (avoid decorative badges/arrows for a two-item comparison that isn't a sequence, keep contrast meaningful rather than decorative).
  Influenced: recommending the OLD/NEW contrast be carried entirely by an existing, currently-unused design token (`provisionalColors.warning`, an amber already defined in `visual-system.ts` but not yet used anywhere in the episode) rather than inventing a new "stale" color, and rejecting any arrow-heavy "Database -> Redis -> Response" diagram in favor of two static, clearly-labeled cards.

animate
  Used for: confirming ease-out fades and a crossfade (not a keyframe restart) for the Database value's old->new transition, and classifying the "Wrong answer. Very fast." beat the same way Scene 11's joke was classified (explanatory seasoning, not Delight-tier).
  Influenced: recommending the Database value change render as a same-treatment crossfade to the punch/correction pattern Scene 11 already established (quick opacity swap, no bounce/spring, ease-out bezier), so the two scenes visually rhyme rather than introducing a new transition style.
```

Not consulted: `remotion-captions` (all caption text follows the existing `translate()` pattern; no new captioning mechanic), `remotion-docs` (no API uncertainty arose), `remotion-studio` (a still/preview render is not part of this planning-only task), `review-animations` (no implementation diff exists yet to review).

## 3. Teaching Goal

```text
current Database value  -> Beat 2: the Database card's value visibly changes (old email -> new email), labeled "CURRENT" / role "source of truth" (reusing the exact role language Scenes 01/07-10 already established for Database).
cached old value          -> Beat 3: the Redis card appears/remains alongside it, still showing the pre-change value, labeled "CACHED COPY" -- held on screen together with the Database card so the divergence is visually simultaneous, not just narrated.
fast stale response         -> Beat 4: the application reads Redis (not Database) and returns quickly -- the caption states "fast" without inventing a number, and the returned value is visibly the OLD one, making the mismatch the viewer's own observation rather than something only stated in text.
```

The scene's single throughline is: reuse-for-speed is exactly the mechanism that can produce a stale answer -- not a separate failure mode bolted onto caching, but the same behavior viewed from a different angle. This directly continues Scene 11's "More stale data." line into something concrete, without repeating Scene 11's other costs (memory, invalidation complexity, "not every request qualifies") or drifting into Scene 13's expiration/invalidation mechanics.

## 4. Example Choice

**Recommended: keep the already-approved Alice email-address example** (`scenes.ts`'s current Scene 12 entry: `Database: alice.new@example.com` / `Redis: alice.old@example.com` / `FAST: yes; CORRECT: no`), used as the Database-vs-Redis value pair in an Option D card comparison rather than any image.

Why this is the clearest of the candidate examples:

```text
user name changed       -> plausible, but names can carry cultural/localization assumptions (which name order, honorifics) that email does not.
product price changed    -> viable, but a monetary value sits closer to the "financial loss scenario" the task says to avoid, even without an explicit loss narrative -- a viewer's first association with "wrong price" tends to be billing/money, adding unintended weight.
profile status changed    -> viable and neutral, but vaguer than a concrete field -- "status" requires the viewer to also infer what status means before evaluating whether OLD vs NEW matters.
inventory value changed     -> viable and neutral, but introduces an unrelated domain (retail/stock) the episode has not touched, costing a beat of context-setting this scene's tight budget doesn't have.
email address changed        -> RECOMMENDED. Already present in the approved `scenes.ts` outline (no rework). Universally understood without domain context. The value itself (`alice.new@example.com` / `alice.old@example.com`) requires zero translation in DE/FR, unlike a status label or product name would. It is unambiguously neutral -- no drama, no medical/financial framing. It also concretizes the "Alice" user record `characters.ts` already earmarks for exactly this purpose ("Provides a concrete user record for repeat-query and stale-cache examples," `likelyScenes: [..., '12']`), continuing a thread the episode has been running since Scene 01's `GET /users/42` without requiring a new character illustration -- see Section 6.
```

## 5. Visual Option Comparison

### Option A — Reuse `scene-07-technical-architecture.png`

- Advantages: zero new asset risk; already approved.
- Disadvantages: the task's own framing is correct -- that diagram depicts cache-hit/miss *flow* (which path a request takes), not *state divergence* (two different values existing at once). Nothing in the image can show "Database says X, Redis still says Y" without adding new overlay content the asset itself doesn't contain. This would also be the **sixth** consecutive/near-consecutive scene reusing the same diagram (07, 08, 09, 10, and near-miss in 11's original outline), compounding the visual fatigue risk already flagged in TASK-017/019.
- Clarity: low for this scene's actual content (state divergence, not flow).
- Implementation risk: low technically, but high risk of shipping a scene that doesn't actually show what it claims to teach.

### Option B — Reuse an existing restaurant/shelf analogy asset

- Advantages: would reuse approved assets; a "the shelf still has yesterday's order" framing is intuitive if the image supported it.
- Disadvantages: **no existing approved restaurant image depicts a stale/old item distinct from a fresh one.** `scene06ReadyShelf.png` and `scene06ServeFromShelf.png` show a single prepared burger, with no visual encoding of "this one is outdated." Captioning either as showing staleness would misrepresent what the asset actually depicts, the same problem TASK-019 identified when evaluating Option B for Scene 11's "overflowing shelf" idea. Achieving this literally would require a new image, collapsing into Option C.
- Clarity: would be adequate if the metaphor were visually present; it is not, in any currently-approved asset.
- Implementation risk: medium-high, for the same misrepresentation reason as TASK-019's Option B finding.

### Option C — New dedicated Scene 12 infographic

- Advantages: could show exactly the "Database: NEW / Redis: OLD / response: OLD" contrast the task describes, purpose-built.
- Disadvantages: precision-critical (the task's own accuracy constraints -- do not imply staleness happens on every request, do not imply Redis or the Database is "wrong," do not imply invalidation always fails -- make composition and labeling choices high-stakes), so per the manual-asset workflow this blocks on user generation and approval before implementation can start. This is exactly the kind of simple, entirely nameable-in-a-sentence content that does not obviously justify that wait, especially immediately after Scene 11 shipped the same conclusion (image-free is both faster and appropriate) for comparably simple content.
- Clarity: potentially high, but only after the approval round-trip.
- Implementation risk: highest -- hard stop until the asset exists and is approved.

### Option D — Fully Remotion-native data-state scene (RECOMMENDED)

- Advantages: **no new asset dependency** -- ships as soon as this plan is approved. Directly extends the precedent Scene 11 (TASK-019/020) just established and validated in this exact codebase, and adds a second concrete use case (data-state comparison, not just typographic statements) for that visual language, making it a pattern rather than a one-off. The two-card comparison can show the divergence *simultaneously on screen* (Database card reading NEW while the Redis card, visible at the same time, still reads OLD) -- arguably a clearer demonstration of "these two things used to agree and now don't" than any single static image could give without becoming cluttered.
- Disadvantages: cannot show a photographic/illustrated scene-setting the way an image could; relies on two short labeled values to carry the entire teaching point, which raises the bar on label/value precision (mitigated by using the already-established, translation-safe email example -- see Section 4).
- Clarity: high -- the divergence is the visual content itself, not something described around an unrelated image.
- Implementation risk: lowest -- reuses only already-approved, already-implemented code patterns (Scene 01's card shape, Scene 11's crossfade/typography/motion vocabulary).

**Recommendation: Option D.** It is the only option that ships without a new-asset dependency, has two in-codebase precedents to build from (Scene 01's cards, Scene 11's no-image scene structure), and can show the actual teaching content (divergence between two values) more directly than a photographic image reused from an unrelated context could.

## 6. Asset Decision

```text
NO NEW ASSET REQUIRED
```

**Flag for the implementation task (a pre-existing dependency to remove, not a new asset request):** `scenes.ts`'s current `12-stale-cache` entry lists `assetIds: ['alicePortrait']`. The `alicePortrait` asset in `assets.ts` is `status: 'placeholder'` with `path: null` -- it does not exist yet. Since Option D uses text values in cards, not a character portrait, the implementation task should update Scene 12's `assetIds` to `[]` rather than attempt to resolve a placeholder asset (which would throw, per every existing scene's `if (!asset.path) throw` pattern) or block on generating/approving an Alice illustration this plan does not need. This mirrors exactly what TASK-020 did for Scene 11's `developer` asset. This is a scope note for the next task, not something this planning task modifies.

## 7. External Asset Request

```text
None.
```

## 8. Beat-by-Beat Plan

Using the currently-approved `scenes.ts` window (`sharedWindow(11, 2)` = 13.0s = 390 frames at 30fps) -- unlike Scene 11, this duration appears adequate for the recommended 6 concise beats below (each beat is a single short value/caption change, not a multi-element diagram), so **no duration change is recommended** for this scene, pending confirmation once actual timing is drafted in the implementation task.

```text
Beat 1 — Bridge (0.4s-2.0s)
  Visual: plain centered text, no cards yet, dark background (Scene 11 Beat 1's exact treatment).
  Caption: "What does 'stale data' actually mean?"
  Motion: soft fade + slight upward settle, ease-out (Scene 01/11's shared entrance).
  Why: directly continues Scene 11's "More stale data." line into a concrete question, without re-litigating Scene 11's other costs -- satisfies the task's explicit Scene 11 continuity requirement.

Beat 2 — Database value changes (2.4s-4.6s)
  Visual: a Database card (label "Database", role "CURRENT" or equivalent, reusing the database role language already established) appears, its value crossfading from "alice.old@example.com" to "alice.new@example.com" -- a quick opacity swap between two stacked value strings, same ease-out crossfade technique as Scene 11's punch->correction handoff, not a keyframe restart.
  Caption: "The Database record changes."
  Motion: card fade/settle-in, then the internal value crossfade; no scale(0), no bounce.
  Why: establishes that change is normal and expected -- the Database is not "wrong" for changing, it is doing its job as source of truth.

Beat 3 — Redis stays frozen (5.0s-7.2s)
  Visual: a Redis card appears beside/below the Database card (both now visible together), value reading "alice.old@example.com", label "Redis", role "CACHED COPY". The Database card remains visible and unchanged (still showing the NEW value) so the two cards' disagreement is on screen simultaneously.
  Caption: "But Redis still holds the old value."
  Motion: simple fade/settle-in for the Redis card; no motion on the already-settled Database card (avoids "everything entering at once").
  Why: this is the scene's central image -- two labeled, correct-looking cards that simply disagree. Holding both on screen together (rather than cutting away from one to show the other) is what makes "diverge" visually true rather than just asserted.

Beat 4 — Fast stale response (7.6s-9.4s)
  Visual: brief emphasis (scale-pulse, not a new arrow/shape) on the Redis card to indicate it is the one being read; a small "Response" indicator or label appears showing the OLD value being returned.
  Caption: "The application reads Redis -- and returns that answer fast."
  Motion: `emphasizeScale`-style pulse (per `motionPresets`), ease-out, no arrow-drawing (per the task's explicit "avoid unnecessary arrows" rule).
  Why: makes concrete that "fast" and "which value" are two separate facts -- the response is fast BECAUSE it came from Redis, and it is the old value BECAUSE Redis is what got read.

Beat 5 — Joke: "Wrong answer. Very fast." (9.6s-10.8s)
  Visual: plain centered text, Scene 11's punch-then-settle treatment but at a calmer scale (this is a wry aside, not an exclamation-point punch like "CACHE EVERYTHING!").
  Caption: "Wrong answer. Very fast."
  Motion: quick fade-in, brief hold, fade-out -- under 1.5s total, well within the task's "brief" requirement.
  Why: the task's own suggested joke, placed exactly where it specifies ("after the stale result is established"), landing as a wry technical aside rather than mockery of the system, the Database, Redis, or the user.

Beat 6 — Takeaway (11.0s-13.0s, holding to the scene's own duration boundary)
  Visual: plain centered text, slightly more visual weight (closer to `typography.sceneTitle`) than Beats 1-4, matching how Scenes 09-11 give their closing line extra weight.
  Caption: "Caching reuses old work. That's also how it can become stale."
  Motion: fade + gentle scale-in, ease-out, holding to 13.0s exactly (the same "land at the cutoff" technique Scenes 08-11 use).
  Why: this is the task's own required key point, stated as the scene's last word, deliberately NOT previewing Scene 13's invalidation-strategy content (per the explicit "do not explain the full invalidation strategy here" instruction) -- it states the mechanism (reuse -> staleness), not the fix.
```

6 beats, within the task's "prefer 4-6" guidance (at the upper bound, justified by needing two separate value-reveal beats plus the joke and takeaway as genuinely distinct moments rather than padding).

## 9. Humor Decision

- **The "Wrong answer. Very fast." joke is used**, in Beat 5.
- **Exact wording:** "Wrong answer. Very fast." (the task's own suggested line, used verbatim -- it is already concise, technically accurate, and needs no modification).
- **Timing:** 9.6s-10.8s, immediately after Beat 4 establishes that the stale value was in fact returned quickly, and immediately before Beat 6's technical takeaway -- exactly the "after the stale result is established... followed immediately by the technical takeaway" placement the task requires.
- **Why it supports rather than distracts:** it is a one-line, purely typographic aside (no character reaction, no new asset) that names the exact contradiction the scene just demonstrated (fast + wrong) in the fewest possible words, then gets out of the way for the closing mental model. It mocks neither the system's design (caching is not "bad") nor the user -- it is a wry observation about the situation the viewer just watched unfold, consistent with the task's "not mocking the system or user" requirement.

## 10. Correctness / Invalidation Boundary

```text
Scene 12 explains:
  - that a Database value can change (source of truth updates)
  - that Redis, once it holds a cached value, does not automatically know about that change
  - that reading from Redis after such a change returns a fast but outdated answer
  - the "fast ≠ correct" mental model, in the specific presence of stale data
  - the key mechanism: caching reuses old work, and reused work can become stale

Scene 12 explicitly does NOT explain (deferred to Scene 13, "Cost of Caching"):
  - expiration mechanics (TTLs)
  - invalidation strategies (how a system would actually detect or fix a stale entry)
  - eviction policies
  - memory limits, monitoring, or failure handling
  - "the system needs an expiration/invalidation strategy" is used only as background framing for THIS plan's own accuracy check (Section titled "Technical Accuracy" in the task), not as on-screen scene content -- Beat 6's actual caption stops at the mechanism (reuse -> staleness), not the fix, so it does not preview or duplicate Scene 13's material.
```

This boundary matches the already-approved `scenes.ts` purpose for Scene 13 ("Introduce the operational and design costs that accompany caching," including "Expiration and invalidation" as its own explicit story beat), so Scene 12 does not duplicate it.

## 11. Motion / Spotlight Strategy

- **`SpotlightImage` is not used.** There is no image in this scene under Option D -- nothing to spotlight, dim, or feather-mask. Stated explicitly per the task's "If SpotlightImage is not needed, say so."
- **Preferred Remotion-native components/tokens:**
  - A small local (file-scoped, unexported) "ValueCard" component, modeled directly on Scene 01's `SceneNode` shape (label + role + value, `typography.technicalLabel`/`typography.sectionHeading` scale, `theme`/`provisionalColors`) -- not a new shared primitive, matching Scene 11's precedent of keeping scene-specific helpers local to the scene file.
  - `theme.foreground`/`theme.muted` for neutral card chrome, `provisionalColors.warning` (already defined, currently unused anywhere in the episode) for the OLD/cached-stale value specifically -- a meaningful reuse of an existing token rather than a new color, satisfying the task's "use color carefully through existing theme tokens" and "no new arbitrary visual style" rules.
  - `motionPresets` (`enterSoft`, `emphasizeScale`) and the shared ease-out bezier for every transition, exactly as Scene 11 uses them -- no new curve or duration token.
- No arrows, no glow-box/FocusBox, no dense UI -- two cards and short captions are the entire visual vocabulary, per the task's explicit restraint rules.

## 12. Localization Plan

- **EN / DE / FR:** roughly seven short translation keys will be needed at implementation time (bridge, Database-changes caption, Redis-frozen caption, fast-response caption, the joke line, the takeaway line, plus the two card role labels "CURRENT"/"CACHED COPY"). All are short, single-sentence, and follow the existing `translate()` key-naming pattern.
- **The example value itself needs no translation:** `alice.new@example.com` / `alice.old@example.com` render identically in EN/DE/FR, which is a large part of why this example was recommended over a price or status label (Section 4) -- those would each need a translated value string, not just a translated caption.
- **Short label translations to verify at implementation time:** "CURRENT" -> DE "AKTUELL", FR "ACTUEL"; "CACHED COPY" -> DE "ZWISCHENGESPEICHERT" (longer; may need a shorter equivalent such as "GECACHT" if it overflows the card width) or FR "COPIE EN CACHE"; "Wrong answer. Very fast." -> DE "Falsche Antwort. Sehr schnell." FR "Mauvaise réponse. Très rapide." -- all plausible fits, to be confirmed with rendered DE/FR stills during implementation, the same verification method Scenes 08-11 used for their own new caption keys.
- No dense copy anywhere in the plan: every beat is at most one short sentence plus, at most, two short card labels.

## 13. Latency Number Recommendation

**Numeric latency references are avoided entirely.** No `~8 ms`, `~10 ms`, or `~180 ms` appears in any of the six recommended beats. Beat 4's caption uses "fast" as a plain adjective ("returns that answer fast"), matching the task's explicit preference for "fast" over a number, since this scene's point is correctness, not a new speed comparison. This also means Scene 12 does not reuse or touch the already-documented `~8 ms` vs. baked `~10 ms` discrepancy from Scenes 07-10 at all.

## 14. Reusable Component Notes

- **Existing typography tokens:** reused directly (`typography.technicalLabel` for role labels, `typography.sectionHeading`/`body` for values and captions, `typography.sceneTitle`-adjacent scale for the closing takeaway) -- no new type scale needed.
- **Existing card/node components:** Scene 01's `SceneNode` is the shape precedent, but it is scene-local (defined inside `Scene01Mystery.tsx`, not exported/shared), so Scene 12 should define its own small local card component rather than importing Scene 01's -- consistent with how Scene 11 also did not reach into Scene 01's file. This keeps each scene file self-contained, matching the project's existing pattern of not prematurely sharing one-scene-use code (per `AGENTS.md`: "Do not promote one-off code prematurely").
- **`BottomCaption` is NOT recommended**, for the same reason TASK-019 gave for Scene 11: that component's dark gradient scrim exists to protect text legibility over a photographic image, which this scene does not have. Plain centered text (Scene 01/11's `Interactive.Div`/`AbsoluteFill` pattern) is the correct precedent.
- **No new shared primitive is needed.** Everything this plan calls for (two small labeled value cards, centered captions, simple crossfades/pulses) is expressible with existing tokens plus one new file-local component, following the exact precedent Scene 01 and Scene 11 already set.

## 15. Verification Results

```text
installed skills consulted:              PASS (Section 2)
Scene 11 continuity reviewed:             PASS (Scene11CacheEverything.tsx and its "More stale data." line read directly; Beat 1 bridges from it explicitly)
stale-data example selected:               PASS (Section 4 -- Alice email address, keeping the already-approved scenes.ts example)
visual options compared:                    PASS (Section 5)
asset decision made:                         PASS (Section 6 -- NO NEW ASSET REQUIRED)
motion plan created:                          PASS (Section 8)
humor decision made:                           PASS (Section 9)
Scene 12 / Scene 13 boundary defined:           PASS (Section 10)
localization plan created:                       PASS (Section 12)
latency-number policy addressed:                  PASS (Section 13)
no production source changes:                      PASS (git status shows only pre-existing untracked/modified files from TASK-017/018/019/020, none touched by this task)
no asset changes:                                   PASS (no files under public/ or assets.ts touched)
Scene 12 not implemented:                            PASS (no Scene12*.tsx file created; RedisEpisode.tsx/episode.config.ts/scenes.ts unchanged by this task)
Scene 13 not started:                                 PASS
```

## 16. Git Status

- Branch: `master`
- Files changed by this task: `feedbacks/task-021-feedback.md` (new, this report).
- Pre-existing changes at task start (from TASK-018/020, not committed, untouched by this task):
  - Modified: `src/episodes/001-redis/RedisEpisode.tsx`, `src/episodes/001-redis/episode.config.ts`, `src/episodes/001-redis/scenes.ts`, `src/shared/localization/index.ts`
  - Untracked: `feedbacks/task-017-feedback.md`, `feedbacks/task-018-feedback.md`, `feedbacks/task-019-feedback.md`, `feedbacks/task-020-feedback.md`, `src/episodes/001-redis/scenes/Scene10WhyRedisFast.tsx`, `src/episodes/001-redis/scenes/Scene11CacheEverything.tsx`, `tasks/TASK-017.md`, `tasks/TASK-018.md`, `tasks/TASK-019.md`, `tasks/TASK-020.md`, `tasks/TASK-021.md`
- No other files modified, added, or deleted by this task.
- No commits made. No pushes made.

## 17. Recommended Next Step

```text
If NO NEW ASSET REQUIRED:
→ create the Scene 12 implementation task using the approved motion plan and required installed skills.
```

## 18. Final Status

```text
TASK-021 STATUS: PASS
```
