# TASK-020 Feedback — Implement Scene 11: Should We Cache Everything?

## 1. Summary

Implemented `Scene11CacheEverything.tsx` — a fully Remotion-native, typography-driven scene (Option D from TASK-019) with no image asset, no `SpotlightImage`, and no character illustration. The scene bridges from Scene 10's closing line, delivers a brief typographic joke ("CACHE EVERYTHING!" → "Not so fast."), names caching's costs in two plain conceptual sentences (memory/staleness/sync, then "not every request qualifies" + cache misses still happen), and closes on the required decision rule. Scene 11's `scenes.ts` metadata was updated: duration widened to `sharedWindow(9, 2)` (11.0s / 330 frames), `assetIds` changed from `['developer']` to `[]`, and `storyBeats`/`visualNotes` rewritten to match the implemented 5-beat structure. Wired into the episode (`episode.config.ts`, `RedisEpisode.tsx`). All required review artifacts were rendered, including DE/FR localization checks for the punch line, long explanatory beat, and closing rule. Scene 12 was not started.

## 2. Skills Used

```text
technical-story-video
  Purpose: workflow ordering, Human Media Review Gate.
  Decision influenced: kept the deliverable at "candidate" (rendered, agent-QA'd) with human review PENDING, not approved.

remotion-best-practices
  Purpose: default routing check for any Remotion-specific implementation question.
  Decision influenced: confirmed no new Remotion mechanic was needed -- the scene is built entirely from existing interpolate()/AbsoluteFill/Interactive.Div patterns already used by Scene 01.

remotion-markup
  Purpose: reviewed how Scene 01 structures a no-image, typography-driven scene (Interactive.Div blocks, typography tokens, theme colors, scene-relative `beats` timing).
  Decision influenced: modeled the scene's structure directly on Scene 01's "Final comparison" treatment (centered, scaled-in text) rather than the BottomCaption gradient-scrim component Scenes 07-10 use, since there is no background image here for a scrim to protect.

frontend-design
  Purpose: restraint / anti-generic-template guidance; explicit instruction against cards/chips/badges for the costs beat.
  Decision influenced: implemented the costs and "not every request" beats as single plain sentences (no icon row, no card layout), matching the task's explicit "do not split this into cards/chips/badges" rule and avoiding the SaaS-card-kit default the skill warns against.

animate
  Purpose: confirm ease-out fades, correct quick-scale-in ingredients for the punch line (0.88 -> 1, no bounce/spring), and no scale(0)/ease-in entrances.
  Decision influenced: the punch beat uses `motionPresets.emphasizeScale`'s duration with a 0.88->1 scale driven by the shared ease-out bezier, not a spring -- consistent with the skill's "bounce is for drag/gesture, not text emphasis" guidance and the task's explicit "no bounce/spring" instruction.

remotion-captions
  Purpose: localization-safe caption/text timing and layout guidance.
  Decision influenced: pre-emptively shortened the German `cacheEverythingNotEveryRequest` line (rather than translating the full English sentence literally) after estimating it would run long in German; confirmed via rendered DE/FR stills that both the shortened German line and the full-length French line render legibly within the safe margins.

remotion-render
  Purpose: production of the required review stills and preview MP4.
  Decision influenced: used directly to produce Section 10's artifacts and to verify actual rendered frames (bridge, punch, correction, costs, not-every-request, decision rule, DE/FR checks, regressions) matched the intended design rather than assuming correctness from code alone.

review-animations
  Purpose: self-QA against the "Never Ship" checklist before declaring the scene complete.
  Decision influenced: confirmed no violations -- all fades/scales use `interpolate()` (not CSS `transition: all` or keyframe restarts), the punch text starts at scale 0.88 (never `scale(0)`), all easing is the shared ease-out bezier (no `ease-in` on any entrance), and no new spring/bounce config was introduced anywhere in the scene.
```

Not consulted: `remotion-docs` (no API uncertainty arose), `remotion-studio` (stills/preview render were sufficient for verification).

## 3. Visual Strategy

Confirmed as fully Remotion-native, per the approved TASK-019 plan:

- **No image asset** — `Scene11CacheEverything.tsx` imports no `staticFile()`, no `resolveAsset()`, nothing from `assets.ts`.
- **No `SpotlightImage`** — not imported or used anywhere in the file.
- **No new visual primitive** — the only local helper is `CenteredLine`, a small internal (unexported, file-local) component that wraps an `AbsoluteFill` + centered `div` with opacity/lift styling shared across three of the five beats. This is not a new shared/reusable component (it lives entirely inside `Scene11CacheEverything.tsx`, is not exported, and is not added to `src/shared/components/`); it exists only to avoid repeating the same five-property style object three times within this one file. The punch line and decision-rule beats intentionally do not use `CenteredLine` (they need scale-based motion `CenteredLine` doesn't support), so they use direct inline `AbsoluteFill` blocks instead, matching Scene 01's own per-block inline-style pattern.

## 4. Asset Cleanup

- **Removed:** `scenes.ts`'s `11-cache-everything` entry previously listed `assetIds: ['developer']`. This has been changed to `assetIds: []`.
- **Final `assetIds`:** `[]`.
- **Placeholder asset untouched:** `assets.ts`'s `developer` entry (`status: 'placeholder'`, `path: null`) was not modified, generated, or resolved. `resolveAsset('developer')` is never called anywhere in the new scene. Confirmed via `grep` that no `developer` reference remains in Scene 11's `assetIds` array (only an explanatory sentence in `visualNotes` documenting why it was removed).

## 5. Teaching Structure

```text
bridge          -> Beat 1 (0.4s-2.0s): "So... why not avoid repeated work everywhere?" -- restates Scene 10's closing instinct as a question, without re-explaining Scene 10's mechanism.
temptation       -> Beat 2, first half (2.4s-3.3s): "CACHE EVERYTHING!" -- the tempting overgeneralization, stated as an exclamation.
correction        -> Beat 2, second half (3.4s-4.2s): "Not so fast." -- immediate deflation, same beat.
costs              -> Beat 3 (4.6s-6.8s): "More memory. More stale data. More to keep in sync." -- names memory usage, stale data risk, and invalidation complexity in plain language, no mechanism detail.
qualification        -> Beat 4 (7.2s-9.0s): "Not every request is expensive enough to justify caching -- and misses still happen." -- covers the remaining two required reasons (not every computation is expensive enough; cache misses still happen) in one sentence.
decision rule          -> Beat 5 (9.4s-11.0s): "Cache where avoiding repeated expensive work is worth the tradeoff." -- the scene's takeaway, given more visual weight (sceneTitle-scale) than Beats 3-4.
```

No mechanism is explained in depth anywhere in the scene: staleness, invalidation, and memory limits are each named in a few words and left entirely to Scenes 12/13.

## 6. Humor Treatment

- **Exact joke:** "CACHE EVERYTHING!" (large, `typography.display` scale, `theme.accent` red, quick 0.88->1 scale-in) immediately followed by "Not so fast." (small, `typography.sectionHeading` scale, `theme.foreground` white, simple crossfade).
- **Timing:** the whole beat spans 2.4s-4.2s (1.8s total), under the task's ~2-second budget. The punch text holds fully visible from ~2.55s-3.3s (0.75s), then the correction crossfades in from 3.4s and holds to 4.2s.
- **Motion:** punch uses `motionPresets.emphasizeScale`'s duration for the scale-in (0.88 -> 1), the shared ease-out bezier, and a fast 0.15s/0.2s fade in/out (`windowOpacity`) — no bounce, no spring, no hard cut. Correction uses a plain 0.2s/0.3s crossfade, no scale motion at all (a deliberately quieter, "coming back down to earth" treatment vs. the punch's emphasis).
- **Why clarity is preserved:** the joke is purely typographic (no character, no sound effect, no meme image), lasts under two seconds, and is immediately followed by Beat 3's actual technical content. It also does not imply caching itself is bad — "Not so fast" corrects the *instinct to cache everything*, not the tool, consistent with the task's explicit accuracy constraints.

## 7. Timing

Scene duration: `sharedWindow(9, 2)` = 11.0s = 330 frames at 30fps (updated from the previous `sharedWindow(7)` = 8s = 240 frames, per the task's explicit instruction; global frames 4710-5039 in the composed episode, confirmed by `remotion compositions` reporting 5040 total frames after this scene's addition, up from 4710 before it — i.e. exactly +330 frames and no other scene's window shifted in size).

```text
bridgeIn:            0.4   bridgeOut:            2.0   fadeIn 0.5  fadeOut 0.4
punchIn:             2.4   punchOut:             3.3   fadeIn 0.15 fadeOut 0.2   (scale 0.88->1 over emphasizeScale's duration)
correctionIn:        3.4   correctionOut:        4.2   fadeIn 0.2  fadeOut 0.3
costsIn:             4.6   costsOut:             6.8   fadeIn 0.35 fadeOut 0.35
notEveryRequestIn:   7.2   notEveryRequestOut:   9.0   fadeIn 0.35 fadeOut 0.35
decisionRuleIn:      9.4   (window end: 11.0, the scene's own duration boundary)  fadeIn 0.4  fadeOut 0.4  (scale 0.96->1)
```

The decision-rule beat's window end (11.0s) is set exactly at the scene's own duration boundary, the same "land at the cutoff" technique Scenes 08/09/10 use for their closing lines, so it reaches and holds full opacity before the hard `Sequence` cut rather than visibly fading out mid-scene.

## 8. Localization

- **EN / DE / FR:** all six new keys (`cacheEverythingBridge`, `cacheEverythingPunch`, `cacheEverythingCorrection`, `cacheEverythingCosts`, `cacheEverythingNotEveryRequest`, `cacheEverythingDecisionRule`) were added to `src/shared/localization/index.ts` in all three language blocks.
- **Punch-line translation treatment:** "CACHE EVERYTHING!" was translated as a natural, punchy equivalent rather than word-for-word: DE "ALLES CACHEN!", FR "TOUT METTRE EN CACHE !" — both confirmed via rendered stills (`scene-11-de-punch.png`, `scene-11-fr-punch.png`) to render on a single line at full display size with the same visual energy as the English version.
- **Shortened equivalent used (as the task explicitly permitted):** the German `cacheEverythingNotEveryRequest` line uses the task's own suggested shorter fallback shape ("Nicht jede Anfrage lohnt sich — und Fehltreffer passieren trotzdem.") rather than a literal translation of the longer English sentence, since a literal translation was estimated to run long. Both required ideas (not every request is worth caching; misses still happen) are preserved. The French version of the same line was kept close to the full English meaning ("Toutes les requêtes ne valent pas la peine d'être mises en cache — et il y a encore des échecs.") and confirmed to still wrap cleanly to two lines without overflow.
- **Overflow/wrapping findings:** confirmed via rendered stills — EN's costs and not-every-request lines wrap to two lines; DE's punch and long-line both render on one line; FR's punch renders on one line, its long-line and closing-rule lines each wrap to two/three lines respectively; DE's closing-rule line wraps to three lines. All stayed within the safe horizontal margins in every case, no clipping observed.

## 9. Numeric Latency Policy

- **Confirmed:** no `~8 ms`, `~10 ms`, or `~180 ms` appears anywhere in `Scene11CacheEverything.tsx` or in any of the six new translation keys.
- **Old numeric recap removed:** `scenes.ts`'s previous `storyBeats` for Scene 11 (`['180 ms -> 8 ms', 'CACHE EVERYTHING']`) has been replaced with the five conceptual beats matching the implemented scene; the numeric recap beat is gone from the metadata as well as from the implementation.

## 10. Review Artifacts

```text
renders/review/task-020/scene-11-start.png
renders/review/task-020/scene-11-cache-everything.png
renders/review/task-020/scene-11-not-so-fast.png
renders/review/task-020/scene-11-costs.png
renders/review/task-020/scene-11-not-every-request.png
renders/review/task-020/scene-11-decision-rule.png
renders/review/task-020/scene-11-preview.mp4
renders/review/task-020/scene-11-de-punch.png
renders/review/task-020/scene-11-fr-punch.png
renders/review/task-020/scene-11-de-long-line.png
renders/review/task-020/scene-11-fr-long-line.png
renders/review/task-020/scene-11-de-closing.png
renders/review/task-020/scene-11-fr-closing.png
renders/review/task-020/scene-10-regression.png
renders/review/task-020/scene-09-regression.png
```

All confirmed Git-ignored (matched by `renders/*` in `.gitignore`).

## 11. Human Review Requests

| Artifact | Purpose | What to review | Agent assessment | Known issues |
|---|---|---|---|---|
| scene-11-start.png | Bridge beat | Whether the Scene 10 -> 11 bridge feels natural | Muted centered text, single line, legible | None observed |
| scene-11-cache-everything.png | Punch beat | Whether "CACHE EVERYTHING!" lands as a quick joke rather than a distraction | Large bold accent-red text, scale-in confirmed via preview MP4 | None observed |
| scene-11-not-so-fast.png | Correction beat | Whether "Not so fast." corrects the idea immediately | Small, calm white text, clean crossfade from the punch beat | None observed |
| scene-11-costs.png | Costs beat | Whether memory/stale/sync costs read clearly without becoming a checklist slide | Single sentence, plain text, no cards/chips/badges | None observed |
| scene-11-not-every-request.png | Qualification beat | Whether the long line is readable at normal speed | Single sentence, wraps to two lines, full meaning preserved | Question 5 (readability at normal playback speed) can only be fully judged from the preview MP4, not a still |
| scene-11-decision-rule.png | Closing beat | Whether the closing rule is clear and memorable | Larger (sceneTitle-scale) text than Beats 3-4, wraps to three lines, holds to the scene boundary | None observed |
| scene-11-de-punch.png / scene-11-fr-punch.png | Localization, punch beat | Whether DE/FR punch lines keep the same energy | Both render on one line at full display size | None observed |
| scene-11-de-long-line.png / scene-11-fr-long-line.png | Localization, qualification beat | Whether DE/FR long lines stay legible; whether the shortened DE equivalent still reads naturally | DE uses a shortened equivalent (Section 8), fits one line; FR uses the fuller translation, wraps to two lines | DE wording is a shortened equivalent, not a literal translation — flagged for human review per Section 8 |
| scene-11-de-closing.png / scene-11-fr-closing.png | Localization, closing beat | Whether DE/FR closing rules are clear and legible | Both wrap to 2-3 lines, stay within safe margins | None observed |
| scene-11-preview.mp4 | Full Scene 11 playback (frames 4710-5039) | Overall pacing across all 5 beats; whether the joke timing and tone shift feel intentional in motion | Not independently assessable from stills alone; included for full-motion human review | None observed in constituent stills |
| scene-10-regression.png | Regression check | Confirm Scene 10 unaffected by Scene 11's addition | Identical why-fast visual/caption content as before this task | None observed |
| scene-09-regression.png | Regression check | Confirm Scene 09 unaffected | Identical cache-hit visual/caption content as before this task | None observed |

Human review status: **PENDING**

## 12. Verification Results

```text
TypeScript:                 PASS
build:                       PASS (npm run build: typecheck + remotion bundle, both succeeded)
composition discovery:        PASS (remotion compositions: Redis-EN/DE/FR now report 5040 frames / 168.00s, up from 4710/157.00s -- exactly Scene 11's new 330-frame window, no other scene's duration changed)
scene validation:              PASS (validateEpisodeArchitecture ran without throwing at bundle/import time; 14-scene count, ordering, and empty assetIds all still valid)
asset validation:               PASS (Scene 11's assetIds is [] -- no asset reference to validate; no manifest changes)
Redis-EN:                        PASS (all 6 EN stills rendered without runtime error)
Redis-DE:                         PASS (3 DE stills rendered, correct translations, no overflow)
Redis-FR:                          PASS (3 FR stills rendered, correct translations, no overflow)
start:                              PASS
CACHE EVERYTHING:                    PASS
Not so fast:                          PASS
costs:                                  PASS
not-every-request:                       PASS
decision rule:                            PASS
Scene 11 MP4:                              PASS
localization checks:                        PASS (DE/FR punch, long-line, closing all confirmed legible)
Scene 10 regression:                         PASS
Scene 09 regression:                          PASS
no placeholder developer dependency:           PASS (assetIds: []; no resolveAsset call anywhere in the scene; developer asset in assets.ts untouched)
review-animations QA:                           PASS (Section 2 / no "Never Ship" violations found)
```

## 13. Problems / Risks

- **German `cacheEverythingNotEveryRequest` uses a shortened equivalent, not a literal translation** (Section 8). This was explicitly permitted by the task given the line's length in German, and both required ideas (not every request is worth caching; misses still happen) are preserved — but it is a content/translation judgment call, flagged here for human review rather than treated as self-evidently correct.
- The scene's tonal shift (from four architecture-heavy scenes to a no-image, typography-only scene) is a deliberate design choice per TASK-019's Option D recommendation; whether it reads as an intentional shift vs. a jarring change in visual language (human review question 7/8) can only be judged in the context of watching Scenes 08-11 back to back, which is outside this task's scope to assess.
- No other risks identified. The `developer` placeholder asset remains untouched and unresolved, as intended.

## 14. Recommended Next Step

```text
If Scene 11 is human-approved:
→ plan Scene 12: stale cache / fast but wrong answer.

If Scene 11 is not approved:
→ revise only the rejected Scene 11 timing, wording, humor beat, or typography treatment.
```

## 15. Git Status

- Branch: `master`
- Changed files (modified):
  - `src/episodes/001-redis/RedisEpisode.tsx` — added Scene 11 import, `scene11Window` import, and `<Sequence>`
  - `src/episodes/001-redis/episode.config.ts` — added `scene11Window` export and included its duration in `durationInFrames`
  - `src/episodes/001-redis/scenes.ts` — updated Scene 11's `durationStrategy` to `sharedWindow(9, 2)`, `assetIds` to `[]`, `storyBeats` to the 5-beat structure, and `visualNotes` to describe the typography-driven scene
  - `src/shared/localization/index.ts` — added 6 new translation keys × 3 languages for Scene 11 text
- New untracked files added by this task:
  - `src/episodes/001-redis/scenes/Scene11CacheEverything.tsx` (new scene component)
  - `feedbacks/task-020-feedback.md` (this report)
- Pre-existing untracked files at task start, unrelated to this task and left untouched:
  - `feedbacks/task-017-feedback.md`, `feedbacks/task-018-feedback.md`, `feedbacks/task-019-feedback.md`
  - `src/episodes/001-redis/scenes/Scene10WhyRedisFast.tsx`
  - `tasks/TASK-017.md`, `tasks/TASK-018.md`, `tasks/TASK-019.md`, `tasks/TASK-020.md`
- Ignored review media: all files under `renders/review/task-020/` and the `build/` directory (confirmed via `.gitignore` matching `renders/*` and `build/`), not shown in `git status`.
- No commits made. No pushes made.

## 16. Final Status

```text
TASK-020 STATUS: PASS
```
