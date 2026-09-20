# TASK-018 Feedback — Implement Scene 10: Why Redis Is Fast

## 1. Summary

Implemented `Scene10WhyRedisFast.tsx` and wired it into the episode (`episode.config.ts`, `RedisEpisode.tsx`). The scene reuses the exact approved `scene-07-technical-architecture.png` with a single Redis `SpotlightImage` target held across three explanatory beats (prepared result, simple lookup, in-memory access), then released — not handed to Database — for the payoff beat naming the avoided Database work, closing on two short captions that state the correct mental model and explicitly guard against the RAM-vs-disk oversimplification. No new image asset was created. All required review artifacts were rendered. Scene 11 was not started.

## 2. Skills Used

```text
technical-story-video
  Purpose: overall workflow ordering, Human Media Review Gate, feedback handoff contract.
  Decision influenced: kept the deliverable at "candidate" (rendered, agent-QA'd) with human review PENDING, not approved.

remotion-best-practices
  Purpose: default routing check for any Remotion-specific implementation question.
  Decision influenced: confirmed no new Remotion mechanic was needed; the existing interpolate()-driven fade/spotlight vocabulary from Scenes 07-09 covers this scene fully.

remotion-markup
  Purpose: reviewed how Scenes 08/09 structure layered image + caption + timing markup.
  Decision influenced: reused the exact `SpotlightImage` + `BottomCaption` + `beats`/`captionWindows` shape rather than inventing new primitives; only the spotlight-sequencing logic changed (single held-then-released window instead of `pickSequentialSpotlight`).

frontend-design
  Purpose: restraint / anti-generic-template guidance.
  Decision influenced: kept all seven captions plain sentence-case (no ALL-CAPS labels, no new eyebrow/label chrome, no numbered badges), matching Scenes 07-09's existing caption style.

animate
  Purpose: classify the motion as "Explanation" purpose, confirm ease-out fades and sub-second durations are correct ingredients, confirm no `scale(0)`/hard-cut entrances.
  Decision influenced: reused the exact `windowOpacity` fade-in/fade-out (0.3-0.5s, `Easing.bezier(0.16, 1, 0.3, 1)`) and `computePushInScale` push-in Scenes 07-09 already use; no new curve or duration was invented.

remotion-captions
  Purpose: localization-safe caption timing/layout guidance for EN/DE/FR.
  Decision influenced: kept the `whyFastClosing` line as a concise equivalent of the task's longer original wording once the tight 13.6s-15.0s closing budget was measured against DE/FR text length (see Section 9); confirmed via rendered stills that the shortened wording stays on one line in all three languages.

remotion-render
  Purpose: production of the required review stills and preview MP4.
  Decision influenced: none design-related; used directly to produce Section 11's artifacts and to verify the actual rendered frames matched the intended beat design (this caught nothing wrong, but is how Sections 4/5/8 were confirmed rather than assumed).

review-animations
  Purpose: self-QA against the "Never Ship" checklist (no `transition: all` equivalent, no `scale(0)`, no ease-in on entrances, no keyframe restarts on rapidly-retriggered elements, reduced-motion consideration) before declaring the scene complete.
  Decision influenced: confirmed the implementation has no violations — fades use `interpolate()` (Remotion's transition-equivalent, not keyframe restart), push-in starts at scale 1 not 0, all easing is the shared ease-out bezier, and Remotion's deterministic frame model makes CSS `prefers-reduced-motion` inapplicable (this is a rendered video, not a live DOM the viewer can toggle), consistent with how Scenes 07-09 treat this concern.
```

Not consulted: `remotion-docs` (no API uncertainty arose), `remotion-studio` (stills/preview render were sufficient for verification; no interactive debugging session was needed).

## 3. Source Asset Usage

- Exact asset path: `public/episodes/001-redis/assets/scene-07-technical-architecture.png`
- Logical asset ID: `scene07TechnicalArchitecture`, resolved via `resolveAsset('scene07TechnicalArchitecture')` in `asset-resolver.ts` — the same resolver call Scenes 08/09 use.
- Confirmed unchanged: the file was only read via `staticFile()` at render time and via the `Read` tool for visual inspection (never opened for editing). `scenes.ts`'s Scene 10 entry now lists `scene07TechnicalArchitecture` in `assetIds` (previously empty), validated against the asset manifest by `validateEpisodeArchitecture` at module load (confirmed passing — see Section 13). No new manifest entry was added; no new asset ID was introduced.

## 4. Teaching Structure

```text
prepared result       -> Beat 1 (2.4s-5.0s), Redis spotlighted: "Redis already holds a prepared result."
simple lookup          -> Beat 2 (5.4s-7.8s), Redis spotlight HELD, no handoff: "Finding it is a simple, direct lookup — not a query."
in-memory access         -> Beat 3 (8.2s-10.4s), Redis spotlight HELD again: "That lookup happens in memory, which helps — but it is not the whole story." (explicit qualifier, per the task's "do not present this as the only reason")
avoided Database work      -> Beat 4 (10.8s-13.6s), spotlight RELEASED entirely (not handed to Database): "The expensive Database work behind that result is skipped entirely."
```

**Strongest emphasis: avoided Database work.** This beat is the longest hold (2.8s vs. 2.2-2.6s for Beats 1-3) and is the only beat where the visual state itself changes kind (spotlight → no spotlight) rather than just the caption changing under an unchanged spotlight. Dropping the spotlight, rather than moving it to Database, is the deliberate signal that this idea is categorically different from the first three — the "avoided work" point doesn't get its own highlighted node because the point being made is precisely that nothing there needed attention this time.

## 5. Motion Design

- **Why Redis remains highlighted across several beats:** Beats 1-3 are three facets of one underlying fact (the answer already exists, in a form that's easy and cheap to retrieve). Holding one continuous spotlight window (`redisSpotlightWindow`, fading in once at 2.4s and fading out once at 10.4s) across all three, rather than treating each beat as a separate handoff, visually groups them as one idea with three parts — consistent with `frontend-design`'s "spend your boldness in one place" principle and distinct from Scenes 08/09's multi-node handoff choreography, which was tracing a *path*, not explaining a single step.
- **Why the spotlight is released rather than handed to Database:** the task and the approved TASK-017 plan are explicit that Database must never become a spotlight target in this scene (it stays visible-but-unremarked, the same contrast-by-omission technique Scene 09 used for its own "Database skipped" beat). Releasing the spotlight to full brightness — rather than moving it — keeps that constraint intact while still giving the payoff beat its own distinct visual state: the diagram returns to its "default" look at exactly the moment the caption explains why the Database didn't need to do anything unusual this time.

## 6. Spotlight Region

Normalized `0-1` values, reused byte-for-byte from Scenes 07/08/09's approved constant (`TASK-014C`-approved):

```text
Redis
  x: 0.638021 (1225/1920)
  y: 0.120370 (130/1080)
  width: 0.190104 (365/1920)
  height: 0.208333 (225/1080)
```

No other region (Application, Client, Database) is used in this scene. `databaseSpotlightRegion` (defined in `Scene08CacheMiss.tsx`) exists and was deliberately not imported here.

## 7. Spotlight Settings

```text
dimBrightness: 0.58
featherPaddingFactor: 0.9
```

Both carried over unchanged from Scene 08/09's approved local tuning, per the task's explicit instruction to reuse them directly — no new spacing relationship is introduced since the only active region is the same Redis region those scenes already tuned for.

## 8. Timing

Scene duration: `sharedWindow(13, 2)` = 15.0s = 450 frames at 30fps (unchanged from the approved `scenes.ts` entry; global frames 4260-4709 in the composed episode, confirmed by `remotion compositions` reporting 4710 total frames after this scene's addition).

```text
Beat/spotlight windows (scene-relative seconds):
  bridgeIn:            0.4   bridgeOut:            2.0   (no spotlight)
  preparedResultIn:    2.4   preparedResultOut:    5.0   (Redis spotlight fades in 2.4-2.8, then held)
  simpleLookupIn:      5.4   simpleLookupOut:      7.8   (Redis spotlight held, unchanged)
  inMemoryIn:          8.2   inMemoryOut:         10.4   (Redis spotlight held, then fades out 10.4-10.8)
  workAvoidedIn:      10.8   workAvoidedOut:      13.6   (no spotlight -- full brightness)
  modernDbIn:         13.9   modernDbOut:         14.3   (no spotlight)
  closingIn:          14.5   (closing window end: 15.0, the scene's own duration boundary)

Redis spotlight window (single continuous window, not a handoff sequence):
  start: 2.4   end: 10.4   fadeIn: 0.4   fadeOut: 0.4
  (fully bright 2.8s-10.4s, fully released by 10.8s)

Caption windows:
  bridge           0.4-2.0    fadeIn 0.5  fadeOut 0.4   "Why is that path so much faster?"
  preparedResult   2.4-5.0    fadeIn 0.4  fadeOut 0.35  "Redis already holds a prepared result."
  simpleLookup     5.4-7.8    fadeIn 0.35 fadeOut 0.35  "Finding it is a simple, direct lookup — not a query."
  inMemory         8.2-10.4   fadeIn 0.35 fadeOut 0.35  "That lookup happens in memory, which helps — but it is not the whole story."
  workAvoided     10.8-13.6   fadeIn 0.35 fadeOut 0.35  "The expensive Database work behind that result is skipped entirely."
  modernDbMemory  13.9-14.3   fadeIn 0.3  fadeOut 0.3   "Modern databases also use memory heavily."
  closing         14.5-15.0   fadeIn 0.3  fadeOut 0.4   "Not memory magic — we simply avoided repeated work." (shortened, see Section 9)
```

No two captions are ever both at full opacity; each beat's fade-out completes (or nearly completes) before the next beat's fade-in begins, mirroring Scenes 08/09's non-overlapping caption discipline. The closing caption's window `end` (15.0s) is set exactly at the scene's own duration boundary, so it reaches and holds full opacity before the hard `Sequence` cut rather than visibly fading — the same technique Scene 08/09 use for their own closing beats.

## 9. Localization

- **EN / DE / FR:** all seven new keys (`whyFastBridge`, `whyFastPreparedResult`, `whyFastSimpleLookup`, `whyFastInMemory`, `whyFastWorkAvoided`, `whyFastModernDbMemory`, `whyFastClosing`) were added to `src/shared/localization/index.ts` in all three language blocks, following the existing `cacheHit*`/`cacheMiss*` naming and structure. Rendered and visually confirmed correct: `scene-10-de-check.png`, `scene-10-fr-check.png` (prepared-result beat) and `scene-10-de-closing-check.png`, `scene-10-fr-closing-check.png` (closing beat).
- **Wrapping/overflow:** all six full-length captions (bridge through modernDbMemory) rendered on a single line at 40px/700-weight within the existing `BottomCaption` safe-margin container in all three languages, with no visible clipping or overflow past the safe horizontal margins.
- **`whyFastClosing` was shortened from the task's suggested full line.** The task's exact required closing wording ("The speedup comes from avoiding repeated work — not from memory being magic.") does not fit legibly within the time actually available: the "work avoided" beat runs until 13.6s and the scene ends at 15.0s, leaving only ~1.4s total for *two* sequential captions (`modernDbMemory` + closing). The task explicitly permits this ("If the second line is too long for the available localized timing, preserve the same meaning with a concise equivalent... Do not change the technical meaning."). The implemented closing line — "Not memory magic — we simply avoided repeated work." (DE: "Keine Speicher-Magie — wir haben nur wiederholte Arbeit vermieden."; FR: "Pas de magie mémoire — nous avons simplement évité un travail répété.") — preserves both required claims (not memory magic; avoided repeated work is the real cause) in a form confirmed to render on one line in all three languages at the available ~0.5-0.9s hold time. **Flagging this wording substitution explicitly for human review** since it is a content decision, not a mechanical one.
- **Baked-English limitation (inherited, not new):** the reused PNG still carries baked English labels (Client/Application/Redis/Database, step numbers 1-6, "~10 ms" / "vs. ~180 ms without cache", "THE REAL SYSTEM", "SAME REQUEST. FASTER RESPONSE.") in every language composition — the same pre-existing limitation already documented for Scenes 07-09. No new baked text was added; Option C's entire premise (Section 4 of TASK-017's feedback) was that no new image-baked content would be introduced.

## 10. Latency Discrepancy

- No new numeric latency comparison was added anywhere in Scene 10 — none of the seven captions contains a number.
- The pre-existing discrepancy from TASK-016 — **episode narration ~8 ms (e.g. Scene 09's `cacheHitFastResponse`) vs. the baked "~10 ms" in `scene-07-technical-architecture.png`** — is inherited into Scene 10 because the same PNG is reused as the visual anchor for the entire scene. It is visible in every rendered still in this task's review set (the gold "~10 ms / vs. ~180 ms without cache" text in the lower-left of frame, at reduced brightness while the Redis spotlight is active and at full brightness during Beats 0, 4, 5).
- Per the task's explicit instructions, the baked number was **not hidden**, the source image was **not edited**, **no contradictory numeric overlay** was added, and the episode was **not silently normalized** to either number. This remains an open, documented, inherited limitation — not resolved by this task — exactly as TASK-017's plan anticipated (Section 10 of that report). Recommend the same two follow-up options already on record: retune the episode's spoken/caption figure to ~10 ms, or request a corrected asset in a future task.

## 11. Review Artifacts

```text
renders/review/task-018/scene-10-start.png
renders/review/task-018/scene-10-prepared-result.png
renders/review/task-018/scene-10-simple-lookup.png
renders/review/task-018/scene-10-in-memory.png
renders/review/task-018/scene-10-work-avoided.png
renders/review/task-018/scene-10-end.png
renders/review/task-018/scene-10-preview.mp4
renders/review/task-018/scene-10-spotlight-release-check.png
renders/review/task-018/scene-09-regression.png
renders/review/task-018/scene-08-regression.png
renders/review/task-018/scene-10-de-check.png
renders/review/task-018/scene-10-fr-check.png
renders/review/task-018/scene-10-de-closing-check.png
renders/review/task-018/scene-10-fr-closing-check.png
```

All confirmed Git-ignored via `git check-ignore -v renders/review/task-018` (matched by `renders/*` in `.gitignore`).

## 12. Human Review Requests

| Artifact | Purpose | What to review | Agent assessment | Known issues |
|---|---|---|---|---|
| scene-10-start.png | Bridge beat, no spotlight | Whether the transition question from Scene 09 reads clearly | Full-brightness diagram, "Why is that path so much faster?" caption legible | Baked "~10 ms" visible (Section 10) |
| scene-10-prepared-result.png | Beat 1, Redis spotlight begins | Whether "prepared result" lands clearly and the Redis isolation is clean | Redis card cleanly isolated, rest uniformly dimmed, caption reinforces | None observed |
| scene-10-simple-lookup.png | Beat 2, Redis spotlight held | Whether holding the same spotlight (not handing off) reads as intentional rather than repetitive | Same visual state as Beat 1, only caption changed; question 2 of Section "Human Review Requests" in the task | Depends on human judgment of pacing/feel across the held sequence, not verifiable from stills alone |
| scene-10-in-memory.png | Beat 3, Redis spotlight held again | Whether the in-memory qualifier reads as "one factor, not the whole story" | Same spotlight state; caption explicitly hedges ("which helps — but it is not the whole story") | Baked "~10 ms" partially visible at reduced brightness under the spotlight, same as Scenes 08/09 |
| scene-10-work-avoided.png | Beat 4, spotlight released | Whether the release (vs. a Database spotlight) creates a clean payoff and whether Database reads as "skipped" without being highlighted | Full brightness, Database visible but unremarked, caption states the skip explicitly | None observed |
| scene-10-spotlight-release-check.png | Exact release boundary (10.8s) | Whether the Redis→released handoff is clean, no bleed, no hard edge | Whole frame at uniform full brightness, confirms clean release | None observed |
| scene-10-end.png | Closing beat | Whether the final mental model and RAM-vs-disk guard land correctly | "Not memory magic — we simply avoided repeated work." caption visible at full opacity at the scene's last frame | Closing line is a shortened equivalent of the task's suggested wording — see Section 9 for the explicit flag |
| scene-10-de-check.png / scene-10-fr-check.png | Localization, prepared-result beat | Whether DE/FR captions are legible, correctly translated, and don't overflow | Single-line, correctly translated, no overflow | None observed |
| scene-10-de-closing-check.png / scene-10-fr-closing-check.png | Localization, closing beat | Whether the shortened closing line still reads naturally and stays legible in DE/FR | Single-line in both languages, natural phrasing | Wording is a shortened equivalent, not a literal translation of the task's suggested full sentence — flagged in Section 9 |
| scene-10-preview.mp4 | Full Scene 10 playback (frames 4260-4709) | Overall pacing across all 7 beats; whether the held-then-released spotlight shape feels intentional in motion, not just in stills | Not independently assessable from stills alone; included for full-motion human review | None observed in constituent stills |
| scene-09-regression.png | Regression check | Confirm Scene 09 unaffected by Scene 10's addition | Identical cache-hit visual/caption content as before this task | None observed |
| scene-08-regression.png | Regression check | Confirm Scene 08 unaffected | Identical cache-miss visual/caption content as before this task | None observed |

Human review status: **PENDING**

## 13. Verification Results

```text
TypeScript:                 PASS
build:                       PASS (npm run build: typecheck + remotion bundle, both succeeded)
composition discovery:        PASS (remotion compositions: Redis-EN/DE/FR now report 4710 frames / 157.00s, up from 4260/142.00s, confirming Scene 10's 450-frame window was added without disturbing Scenes 01-09)
scene validation:              PASS (validateEpisodeArchitecture ran without throwing at bundle/import time; 14-scene count, ordering, and asset-ID references all still valid)
asset validation:               PASS (scene07TechnicalArchitecture reference in Scene 10's assetIds validated against the existing asset manifest; no new manifest entry required)
Redis-EN:                        PASS (stills rendered across all 7 beats without runtime error)
Redis-DE:                         PASS (stills rendered, captions correct, no overflow)
Redis-FR:                          PASS (stills rendered, captions correct, no overflow)
Scene 10 start:                     PASS
prepared result:                     PASS
simple lookup:                        PASS
in-memory:                             PASS
work avoided:                           PASS
end:                                     PASS
spotlight release:                        PASS
Scene 10 MP4:                              PASS
Scene 09 regression:                        PASS
Scene 08 regression:                         PASS
no seam:                                      PASS (single shared push-in transform wraps the spotlight layer and image throughout, same technique as Scenes 07-09)
no drift:                                      PASS (visually confirmed across all stills; region reused byte-for-byte from approved Scene 07/08/09 constant)
no hard edge:                                   PASS (SpotlightImage's existing radial-gradient feather mask, unchanged)
no simultaneous spotlights:                      PASS (only one spotlight region is ever used in this scene; its opacity is a single continuous window, never more than one target)
```

## 14. Problems / Risks

- **`whyFastClosing` wording was shortened from the task's suggested full sentence** (Section 9). This was explicitly permitted by the task given the tight time budget, and the technical meaning (not memory magic; avoiding repeated work is the real cause) is preserved and confirmed legible in all three languages — but it is a content judgment call, not a mechanical one, and is called out here for human review rather than treated as self-evidently correct.
- The inherited **~8 ms vs. baked ~10 ms** discrepancy (Section 10) remains unresolved and is visible in every still of this scene, same as Scenes 07-09. Not introduced or worsened by this task; carried forward as previously documented.
- `SpotlightImage`'s known radial-gradient radius/diameter technical debt (documented since Scene 08) still applies to the Redis region used here; not fixed, per the task's explicit instruction not to touch the global component.
- Whether the three-beat Redis hold "feels intentional rather than repetitive" in motion (vs. in stills) can only be judged from `scene-10-preview.mp4` — flagged as human-review question 2 in Section 12, not something this agent can self-certify from static frames.

## 15. Recommended Next Step

```text
If Scene 10 is human-approved:
→ plan Scene 11: should we cache everything?

If Scene 10 is not approved:
→ revise only the rejected Scene 10 spotlight, timing, caption, or explanatory beat.
```

## 16. Git Status

- Branch: `master`
- Changed files (modified):
  - `src/episodes/001-redis/RedisEpisode.tsx` — added Scene 10 import, `scene10Window` import, and `<Sequence>`
  - `src/episodes/001-redis/episode.config.ts` — added `scene10Window` export and included its duration in `durationInFrames`
  - `src/episodes/001-redis/scenes.ts` — added `scene07TechnicalArchitecture` to Scene 10's `assetIds` and added `visualNotes`
  - `src/shared/localization/index.ts` — added 7 new translation keys × 3 languages for Scene 10 captions
- New untracked files added by this task:
  - `src/episodes/001-redis/scenes/Scene10WhyRedisFast.tsx` (new scene component)
  - `feedbacks/task-018-feedback.md` (this report)
- Pre-existing untracked files at task start, unrelated to this task and left untouched:
  - `feedbacks/task-017-feedback.md`, `tasks/TASK-017.md`, `tasks/TASK-018.md`
- Ignored review media: all files under `renders/review/task-018/` and the `build/` directory (confirmed via `git check-ignore -v`), not shown in `git status`.
- No commits made. No pushes made.

## 17. Final Status

```text
TASK-018 STATUS: PASS
```
