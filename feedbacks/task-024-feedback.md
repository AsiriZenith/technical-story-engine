# TASK-024 Feedback — Implement Scene 13: Operational and Design Costs of Caching

## 1. Summary

Implemented `Scene13CacheCosts.tsx` — a fully Remotion-native, hybrid central-node scene (Option D from TASK-023) with no image asset and no `SpotlightImage`. A small central "Redis" node (reusing Scene 01's existing cache-node accent color and stack-icon vocabulary) fades in and stays on screen from Beat 2 onward, while exactly one of four callouts — Freshness, Capacity, Resilience, Operations — is fully active around it at a time, each entrance paired with a small ease-out pulse on the central node instead of an arrow or connecting line. The scene closes on the task's required mental model, with the four category labels settling to a low ambient opacity around it. Scene 13's `scenes.ts` metadata was updated: `storyBeats`/`visualNotes` rewritten to the approved Freshness/Capacity/Resilience/Operations grouping (replacing the earlier overlapping "Memory and cache misses" / "Monitoring and failure handling" wording); the approved `sharedWindow(14, 2)` duration was kept unchanged. Wired into the episode (`episode.config.ts`, `RedisEpisode.tsx`). All required review artifacts were rendered, including DE/FR localization checks for the Freshness, Resilience, and closing beats. Scene 14 was not started.

## 2. Skills Used

```text
technical-story-video
  Purpose: workflow ordering, Human Media Review Gate.
  Decision influenced: kept the deliverable at "candidate" (rendered, agent-QA'd) with human review PENDING, not approved.

remotion-best-practices
  Purpose: default routing check for any Remotion-specific implementation question.
  Decision influenced: confirmed no new Remotion mechanic was needed -- the scene is built entirely from existing interpolate()/AbsoluteFill patterns already used by Scenes 01/11/12, plus two new small file-local components.

remotion-markup
  Purpose: reviewed Scene 01's NodeGlyph/SceneNode (cache-node accent + stack-icon shape) and Scene 11/12's CenteredLine pattern.
  Decision influenced: built a simplified, file-local StackIcon + CentralNode pair directly modeled on Scene 01's cache-node treatment (same accent, same three-bar shape), and reused CenteredLine verbatim for the bridge beat.

frontend-design
  Purpose: restraint guidance; explicit instruction against connecting arrows/lines for the radial layout.
  Decision influenced: implemented the callout-to-node relationship entirely through timing (each callout's entrance pairs with a node pulse) and spatial proximity, with zero drawn lines, arrows, or borders connecting the callouts to the central node.

animate
  Purpose: confirm the central-node pulse should reuse the same ease-out scale shape Scene 12's Redis-card pulse already established, not a spring/bounce, and that callout entrances/exits use the standard enterSoft/exitSoft fade vocabulary.
  Decision influenced: the node pulse (1 -> 1.06 -> 1) reuses `motionPresets.emphasizeScale`'s duration and the shared ease-out bezier exactly as Scene 12 already established, giving this fourth no-image scene a consistent motion signature with its predecessor even though the spatial layout is new.

remotion-captions
  Purpose: localization-safe caption/label timing and layout guidance.
  Decision influenced: chose "Betrieb" over a longer literal "Operationen" for the German Operations label, and "Aktualität" over a literal "Frische" for Freshness, per the planning report's own recommendations; confirmed via rendered DE/FR stills that all four category labels and captions stay legible and well-clear of the central node.

remotion-render
  Purpose: production of the required review stills and preview MP4.
  Decision influenced: used directly to produce Section 11's artifacts and to catch and fix a runtime `interpolate()` error (Section 14) before it reached the review set.

review-animations
  Purpose: self-QA against the "Never Ship" checklist before declaring the scene complete.
  Decision influenced: confirmed no violations -- the node pulse and all callout fades use `interpolate()` (not CSS `transition: all` or keyframe restarts), nothing starts at `scale(0)`, all easing is the shared ease-out bezier, and no spring/bounce config was introduced anywhere in the file.
```

Not consulted: `remotion-docs` (no lasting API uncertainty — see Section 14 for the one runtime error encountered and resolved), `remotion-studio` (stills/preview render were sufficient for verification).

## 3. Visual Strategy

Confirmed as fully Remotion-native, per the approved TASK-023 plan:

- **No image asset** — `Scene13CacheCosts.tsx` imports no `staticFile()`, no `resolveAsset()`, nothing from `assets.ts`.
- **No `SpotlightImage`** — not imported or used anywhere in the file.
- **Central Redis node** — a small bordered box (accent-red border, `architectureNodeSemantics.cache.accent`, panel background) containing a simplified three-bar stack icon and the "Redis" label, fading/settling in once at Beat 2 and remaining on screen through the closing beat.
- **Four callouts** — one reusable `Callout` component instantiated four times (top/right/bottom/left), each showing a category label and one short caption, with exactly one fully active (opacity > 0) at any point during Beats 2-5.
- Local helpers used (all file-local, unexported, not added to `src/shared/components/`): `CenteredLine` (reused verbatim from Scene 11/12), `StackIcon`, `CentralNode`, `Callout`, `AmbientLabel`.

## 4. Tradeoff Grouping

Final mapping, exactly as approved in TASK-023:

```text
Freshness  -> expiration + invalidation
Capacity   -> memory usage
Resilience -> cache misses + cache failures
Operations -> monitoring + extra infrastructure
```

`scenes.ts`'s `13-cache-tradeoffs` entry was updated to this grouping (Section 16), replacing the earlier overlapping wording (`'Memory and cache misses'`, `'Monitoring and failure handling'`) that TASK-023 identified as ambiguous.

## 5. Teaching Structure

```text
Freshness  -> Beat 2 (2.8s-5.6s): node enters, top callout appears. Caption: "It needs expiration and invalidation — so data does not sit unchecked forever."
Capacity   -> Beat 3 (6.0s-8.4s): Freshness fades, right callout appears. Caption: "It consumes memory — and memory is not infinite."
Resilience -> Beat 4 (8.8s-11.2s): Capacity fades, bottom callout appears. Caption: "Sometimes it misses. Sometimes it fails. Both need a plan." (phrased to avoid implying either is exceptional, per the task's explicit accuracy constraint)
Operations -> Beat 5 (11.6s-14.0s): Resilience fades, left callout appears. Caption: "Someone has to watch it, and something has to run it."
```

Each caption names its category at the conceptual level only — no TTL numbers, no eviction-policy names, no cluster/replication/Sentinel/persistence-mode detail, satisfying the approved scope boundary.

## 6. Central Node Design

- **Visual tokens:** `provisionalColors.panel` background, `architectureNodeSemantics.cache.accent` (the project's existing red cache accent) for the border and icon color, `theme.foreground` for the "Redis" label text.
- **Icon treatment:** a simplified three-bar stack icon (`StackIcon`), directly copying the shape Scene 01's `NodeGlyph` uses for the `cache` node kind — not a detailed Redis logo, per the task's explicit instruction.
- **Labels:** just "Redis" beneath the icon — no role/status text, keeping the node itself minimal since the callouts carry the category information.
- **Motion:** fades/settles in once at 2.8s (`enterSoft` duration, ease-out) and then receives a small scale pulse (1 -> 1.06 -> 1, `emphasizeScale` duration, ease-out) at the start of each of the four callout beats (2.8s, 6.0s, 8.8s, 11.6s) — no spring, no bounce, no `scale(0)` at any point.

## 7. Callout Design

- **Positions:** Freshness → top (y: -260), Capacity → right (x: +460), Resilience → bottom (y: +260), Operations → left (x: -460), relative to the frame center — confirmed via rendered stills (Section 11) to keep clear separation from the central node's ~200px-wide box in every case, with no overlap.
- **Typography:** `typography.technicalLabel` (uppercase, accent-red) for the category label, a plain 30px/700-weight white line for the caption — no bordered card, no background, per the task's "no icon grid" and "keep it simple" instructions.
- **Active-state behavior:** confirmed — **exactly one callout is fully active (opacity > 0) at a time during Beats 2-5.** Each callout's window is non-overlapping with its neighbors (e.g. Freshness ends its fade-out by 6.0s exactly as Capacity begins fading in), verified visually via the rendered per-beat stills (Section 11) and the full preview MP4.

## 8. Timing

Scene duration: `sharedWindow(14, 2)` = 16.0s = 480 frames at 30fps (unchanged from the approved `scenes.ts` entry; global frames 5430-5909 in the composed episode, confirmed by `remotion compositions` reporting 5910 total frames after this scene's addition).

```text
bridgeIn:        0.4   bridgeOut:        2.4   (no central node yet)
nodeIn:          2.8   (central node fades/settles in once, stays for the rest of the scene)
freshnessIn:     2.8   freshnessOut:     5.6   (top callout, node pulse at 2.8s)
capacityIn:      6.0   capacityOut:      8.4   (right callout, node pulse at 6.0s)
resilienceIn:    8.8   resilienceOut:   11.2   (bottom callout, node pulse at 8.8s)
operationsIn:   11.6   operationsOut:   14.0   (left callout, node pulse at 11.6s)
closingIn:      14.4   (window end: 16.0, the scene's own duration boundary)
```

The closing beat's window end (16.0s) is set exactly at the scene's own duration boundary, the same "land at the cutoff" technique Scenes 08-12 use for their closing lines.

## 9. Localization

- **EN / DE / FR:** all ten new keys (`cacheCostsBridge`, four category labels, four category captions, `cacheCostsClosing`) were added to `src/shared/localization/index.ts` in all three language blocks.
- **Final category translations:**

```text
Freshness  -> DE "Aktualität", FR "Fraîcheur"
Capacity   -> DE "Kapazität", FR "Capacité"
Resilience -> DE "Resilienz", FR "Résilience"
Operations -> DE "Betrieb", FR "Opérations"
```

- **Shortened/adapted equivalents used (as the planning report anticipated):** German "Betrieb" was chosen over the longer, less idiomatic "Operationen"; German "Aktualität" was chosen over a literal "Frische", which reads oddly applied to data. Both confirmed via rendered stills to fit cleanly.
- **Overflow/wrapping findings:** all four category captions wrap to 2-3 lines in every language and stay well clear of the central node in every rendered still (Section 11) — the largest wrap observed was French Freshness at 4 lines, still with a visible gap above the node. The closing mental-model line wraps to 3-4 lines depending on language, consistent with Scene 12's closing line's own wrap behavior, with no clipping.
- Email-style untranslated values are not applicable to this scene (no data values are shown, only category labels and captions).

## 10. Numeric Latency Policy

**Confirmed:** no `~8 ms`, `~10 ms`, or `~180 ms` appears anywhere in `Scene13CacheCosts.tsx` or in any of the ten new translation keys, consistent with the approved plan's "Scene 13 is about tradeoffs, not performance measurement" instruction.

## 11. Review Artifacts

```text
renders/review/task-024/scene-13-start.png
renders/review/task-024/scene-13-freshness.png
renders/review/task-024/scene-13-capacity.png
renders/review/task-024/scene-13-resilience.png
renders/review/task-024/scene-13-operations.png
renders/review/task-024/scene-13-end.png
renders/review/task-024/scene-13-preview.mp4
renders/review/task-024/scene-13-de-freshness.png
renders/review/task-024/scene-13-fr-freshness.png
renders/review/task-024/scene-13-de-resilience.png
renders/review/task-024/scene-13-fr-resilience.png
renders/review/task-024/scene-13-de-closing.png
renders/review/task-024/scene-13-fr-closing.png
renders/review/task-024/scene-12-regression.png
renders/review/task-024/scene-11-regression.png
```

All confirmed Git-ignored (matched by `renders/*` in `.gitignore`).

## 12. Human Review Requests

| Artifact | Purpose | What to review | Agent assessment | Known issues |
|---|---|---|---|---|
| scene-13-start.png | Bridge beat | Whether the bridge from Scene 12 feels natural | Muted centered text, single line, legible | None observed |
| scene-13-freshness.png | Beat 2 | Whether the central node is simple/readable and Freshness communicates expiration/invalidation | Node clearly legible (icon + "Redis"), top callout reads clearly with a visible gap above the node | None observed |
| scene-13-capacity.png | Beat 3 | Whether Capacity clearly communicates finite memory | Right callout, clean spacing from node, no overlap | None observed |
| scene-13-resilience.png | Beat 4 | Whether misses/failures are framed without sounding catastrophic | Bottom callout, calm factual wording ("Both need a plan"), no alarming tone | None observed |
| scene-13-operations.png | Beat 5 | Whether Operations clearly communicates monitoring/infrastructure | Left callout, clean spacing, balanced with the other three positions | None observed |
| scene-13-end.png | Beat 6 -- closing | Whether the closing line unifies all four categories without visual competition | Closing text dominates; only Freshness/Resilience (top/bottom) partially peek at low opacity, Capacity/Operations (left/right) fully occluded by the closing text's own background | Question 9 (whether this occlusion reads as intentional restraint vs. an odd partial-visibility artifact) is a human judgment call worth flagging explicitly |
| scene-13-de-freshness.png / scene-13-fr-freshness.png | Localization, Beat 2 | Whether DE/FR Freshness label and caption stay legible and clear of the node | Both legible, "Aktualität"/"Fraîcheur" read naturally | None observed |
| scene-13-de-resilience.png / scene-13-fr-resilience.png | Localization, Beat 4 | Whether DE/FR Resilience label and caption stay legible | Both legible, natural phrasing, no overflow | None observed |
| scene-13-de-closing.png / scene-13-fr-closing.png | Localization, Beat 6 | Whether the closing mental model stays legible in DE/FR | Both wrap to 3-4 lines, stay within safe margins | None observed |
| scene-13-preview.mp4 | Full Scene 13 playback (frames 5430-5909) | Overall pacing across all 6 beats; whether the node pulse feels restrained in motion and whether "only one callout at a time" reads clearly | Not independently assessable from stills alone; included for full-motion human review | None observed in constituent stills |
| scene-12-regression.png | Regression check | Confirm Scene 12 unaffected by Scene 13's addition | Identical stale-cache visual/caption content as before this task | None observed |
| scene-11-regression.png | Regression check | Confirm Scene 11 unaffected | Identical cache-everything visual/caption content as before this task | None observed |

Human review status: **PENDING**

## 13. Verification Results

```text
TypeScript:                 PASS
build:                       PASS (npm run build: typecheck + remotion bundle, both succeeded)
composition discovery:        PASS (remotion compositions: Redis-EN/DE/FR now report 5910 frames / 197.00s, up from 5430/181.00s -- exactly Scene 13's 480-frame window, no other scene's duration changed)
scene validation:              PASS (validateEpisodeArchitecture ran without throwing at bundle/import time; 14-scene count, ordering, and empty assetIds all still valid)
asset validation:               PASS (Scene 13's assetIds is [] -- no asset reference to validate; no manifest changes)
Redis-EN:                        PASS (all 6 EN stills rendered without runtime error, after fixing the interpolate() issue in Section 14)
Redis-DE:                         PASS (3 DE stills rendered, correct translations, no overflow)
Redis-FR:                          PASS (3 FR stills rendered, correct translations, no overflow)
start:                              PASS
Freshness:                           PASS
Capacity:                             PASS
Resilience:                            PASS
Operations:                             PASS
closing:                                 PASS
Scene 13 MP4:                             PASS
localization checks:                       PASS (DE/FR Freshness, Resilience, and closing all confirmed legible)
Scene 12 regression:                        PASS
Scene 11 regression:                         PASS
no image asset:                               PASS
no SpotlightImage:                             PASS
review-animations QA:                           PASS (Section 2 / no "Never Ship" violations found)
```

## 14. Problems / Risks

- **Runtime `interpolate()` error caught and fixed during implementation, not shipped:** the first version of the ambient-label opacity calculation passed `fadeOut: 0` to `windowOpacity`, producing a duplicate `[..., 16, 16]` breakpoint that Remotion's `interpolate()` rejects (non-strictly-increasing input range). Fixed by using a small non-zero `fadeOut` (0.1s) instead. Confirmed resolved — all stills and the full preview MP4 render without error. Documented here per the task's "report remaining concerns" instruction, even though it was resolved before any review artifact was produced, since it reflects a real constraint of the shared `windowOpacity` helper (zero-length fade segments are invalid) worth knowing for future scenes.
- **Closing beat's partial occlusion of ambient labels** (Section 12, `scene-13-end.png`) is a deliberate design choice (Section 3/6 of TASK-023's plan allowed either "faintly visible" or "fade low enough that the closing line dominates") but was not fully resolved toward one specific look during implementation — the current result is a middle state (2 of 4 labels partially visible, 2 fully hidden behind the closing text's opaque background) rather than a clean "all four faint" or "all four hidden" treatment. Flagged explicitly for human review rather than presented as a settled decision.
- No other risks identified.

## 15. Recommended Next Step

```text
If Scene 13 is human-approved:
→ plan Scene 14: final mental-model recap.

If Scene 13 is not approved:
→ revise only the rejected Scene 13 grouping, wording, callout layout, or motion.
```

## 16. Git Status

- Branch: `master`
- Changed files (modified):
  - `src/episodes/001-redis/RedisEpisode.tsx` — added Scene 13 import, `scene13Window` import, and `<Sequence>`
  - `src/episodes/001-redis/episode.config.ts` — added `scene13Window` export and included its duration in `durationInFrames`
  - `src/episodes/001-redis/scenes.ts` — replaced Scene 13's `storyBeats` with the Freshness/Capacity/Resilience/Operations grouping and added `visualNotes` describing the central-node/callout scene
  - `src/shared/localization/index.ts` — added 10 new translation keys × 3 languages for Scene 13 text
- New untracked files added by this task:
  - `src/episodes/001-redis/scenes/Scene13CacheCosts.tsx` (new scene component)
  - `feedbacks/task-024-feedback.md` (this report)
- Pre-existing untracked files at task start, unrelated to this task and left untouched:
  - `feedbacks/task-017-feedback.md` through `feedbacks/task-023-feedback.md`
  - `src/episodes/001-redis/scenes/Scene10WhyRedisFast.tsx`, `Scene11CacheEverything.tsx`, `Scene12StaleCache.tsx`
  - `tasks/TASK-017.md` through `tasks/TASK-024.md`
- Ignored review media: all files under `renders/review/task-024/` and the `build/` directory (confirmed via `.gitignore` matching `renders/*` and `build/`), not shown in `git status`.
- No commits made. No pushes made.

## 17. Final Status

```text
TASK-024 STATUS: PASS
```
