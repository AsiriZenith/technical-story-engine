# TASK-022 Feedback — Implement Scene 12: Stale Cache / Fast but Wrong Answer

## 1. Summary

Implemented `Scene12StaleCache.tsx` — a fully Remotion-native, data-state scene (Option D from TASK-021) with no image asset, no `SpotlightImage`, and no character illustration. The scene bridges from Scene 11's "More stale data." line, shows a Database value card crossfading from an old to a new email address, reveals a Redis card holding the frozen old value alongside it (both visible together, the scene's central comparison), a fast response beat where the application reads Redis and returns the stale value, a brief calm joke ("Wrong answer. Very fast."), and closes on the required takeaway. Scene 12's `scenes.ts` metadata was updated: `assetIds` changed from `['alicePortrait']` to `[]`, and `storyBeats`/`visualNotes` rewritten to match the implemented 6-beat structure; the approved `sharedWindow(11, 2)` duration was kept unchanged. Wired into the episode (`episode.config.ts`, `RedisEpisode.tsx`). All required review artifacts were rendered, including DE/FR localization checks for the divergence, joke, and closing beats. Scene 13 was not started.

## 2. Skills Used

```text
technical-story-video
  Purpose: workflow ordering, Human Media Review Gate.
  Decision influenced: kept the deliverable at "candidate" (rendered, agent-QA'd) with human review PENDING, not approved.

remotion-best-practices
  Purpose: default routing check for any Remotion-specific implementation question.
  Decision influenced: confirmed no new Remotion mechanic was needed -- the scene is built entirely from existing interpolate()/AbsoluteFill patterns already used by Scenes 01 and 11.

remotion-markup
  Purpose: reviewed how Scene 01's SceneNode (label + role + value card) and Scene 11's CenteredLine (file-local, unexported helper) are structured.
  Decision influenced: modeled the new ValueCard component directly on SceneNode's shape (label/role/value), and reused CenteredLine's exact pattern for the pure-text beats (bridge, joke, takeaway); introduced a separate BottomLine helper (see Section 3) rather than forcing CenteredLine to double as a bottom caption.

frontend-design
  Purpose: restraint guidance; explicit instruction against a new arbitrary "stale" color.
  Decision influenced: used the already-defined but previously-unused `provisionalColors.warning` token for the Redis/"CACHED COPY" role and its returned-value indicator, rather than inventing a new amber -- a genuine reuse of an existing design token rather than a new visual style.

animate
  Purpose: confirm the Database value transition should be a same-position crossfade (not a keyframe restart, not a whole-card move), and that the Redis emphasis should be a small scale pulse, not a spring/bounce.
  Decision influenced: implemented the old->new email transition as two stacked absolutely-positioned spans crossfading opacity in place (Section 7), and the Redis emphasis as a single ease-out scale pulse (1 -> 1.06 -> 1) using `motionPresets.emphasizeScale`'s duration, with no spring config anywhere in the file.

remotion-captions
  Purpose: localization-safe caption/label timing and layout guidance.
  Decision influenced: pre-emptively used a shortened "GECACHT" for the German "CACHED COPY" role label (rather than the longer literal "ZWISCHENGESPEICHERT"), per the task's explicit "If CACHED COPY is too long in German, use a shorter equivalent" instruction; confirmed via rendered DE/FR stills that both card role labels and all caption lines render within the card width / safe margins in all three languages.

remotion-render
  Purpose: production of the required review stills and preview MP4.
  Decision influenced: used directly to produce Section 11's artifacts and to catch a layout issue during implementation (Section 14) before it reached the review set.

review-animations
  Purpose: self-QA against the "Never Ship" checklist before declaring the scene complete.
  Decision influenced: confirmed no violations -- the crossfade and pulse use `interpolate()` (not CSS `transition: all` or keyframe restarts), no element starts at `scale(0)`, all easing is the shared ease-out bezier (no `ease-in` on any entrance), and no new spring/bounce config was introduced.
```

Not consulted: `remotion-docs` (no API uncertainty arose), `remotion-studio` (stills/preview render were sufficient for verification).

## 3. Visual Strategy

Confirmed as fully Remotion-native, per the approved TASK-021 plan:

- **No image asset** — `Scene12StaleCache.tsx` imports no `staticFile()`, no `resolveAsset()`, nothing from `assets.ts`.
- **No `SpotlightImage`** — not imported or used anywhere in the file.
- **Local helpers used** (all file-local, unexported, not added to `src/shared/components/`):
  - `CenteredLine` — reused verbatim from Scene 11's own pattern, for the bridge/joke pure-text beats.
  - `BottomLine` — a new small local helper (a plain positioned block anchored near the bottom of frame) added specifically because, unlike Scene 11, this scene has value cards occupying the vertical center during three of its captions; `BottomLine` keeps those captions legible below the cards without needing a `BottomCaption`-style gradient scrim (there is still no photographic image here for a scrim to protect).
  - `ValueCard` — the small labeled card (label/role/value), modeled on Scene 01's `SceneNode` shape, per TASK-021's Section 14 recommendation.
  - `CrossfadeValue` — a small same-position crossfade layer (two stacked absolute spans) for the Database value's old->new transition.

None of these four helpers are shared/exported; all four live entirely inside `Scene12StaleCache.tsx`.

## 4. Asset Cleanup

- **Removed:** `scenes.ts`'s `12-stale-cache` entry previously listed `assetIds: ['alicePortrait']`. This has been changed to `assetIds: []`.
- **Final `assetIds`:** `[]`.
- **Placeholder asset untouched:** `assets.ts`'s `alicePortrait` entry (`status: 'placeholder'`, `path: null`) was not modified, generated, or resolved. `resolveAsset('alicePortrait')` is never called anywhere in the new scene. Confirmed via `grep` that no `alicePortrait` reference remains in Scene 12's `assetIds` array (only an explanatory sentence in `visualNotes` documenting why it was removed).

## 5. Example

The approved Alice email example was used unchanged:

```text
Database (CURRENT):     alice.old@example.com  ->  alice.new@example.com  (crossfades during Beat 2)
Redis (CACHED COPY):    alice.old@example.com  (stays frozen from Beat 3 onward)
```

No wording change to the example values was needed. The Database card's role label is "CURRENT" (EN) and the Redis card's role label is "CACHED COPY" (EN), matching the task's suggested structure exactly.

## 6. Teaching Structure

```text
Database change  -> Beat 2 (2.4s-4.6s): Database card enters showing the old email, then crossfades in place to the new email. Caption: "The Database record changes."
Redis stale copy   -> Beat 3 (5.0s-7.2s): Redis card enters beside the (already-updated) Database card, showing the old email. Both cards remain visible together -- the scene's central comparison. Caption: "But Redis still holds the old value."
fast response         -> Beat 4 (7.6s-9.4s): a brief scale pulse on the Redis card plus a small amber returned-value indicator showing the old email being sent back. Caption: "The application reads Redis -- and returns that answer fast."
joke                    -> Beat 5 (9.6s-10.8s): cards fade out; "Wrong answer. Very fast." appears alone, calm and brief.
takeaway                  -> Beat 6 (11.0s-13.0s): "Caching reuses old work. That's also how it can become stale." -- larger, sceneTitle-scale text, holding to the scene's own duration boundary.
```

No TTL/invalidation/eviction/monitoring content appears anywhere in the scene, per the approved boundary.

## 7. Value Card Design

```text
Database card: label "Database", role "CURRENT" (green, provisionalColors.success), value alice.old@example.com -> alice.new@example.com (same-position crossfade, monospace typography.code style, panel/border chrome matching Scene 01's GET /users/42 badge)
Redis card:    label "Redis", role "CACHED COPY" (amber, provisionalColors.warning), value alice.old@example.com (static, no crossfade)
```

- Tokens/colors used: `typography.sectionHeading` for card labels, `typography.technicalLabel` for role text, `typography.code` for the email values, `theme.foreground`/`theme.muted` for neutral chrome, `provisionalColors.panel`/`provisionalColors.line` for the value box background/border (the exact same panel treatment Scene 01's request badge uses).
- **`provisionalColors.warning` was used** — for the Redis card's "CACHED COPY" role label and for the returned-value indicator in Beat 4, per the task's explicit instruction to prefer this existing token over inventing a new stale-data color. This is the first use of `provisionalColors.warning` anywhere in the episode's implemented scenes.
- No badges beyond the role text itself, no glossy UI, no card-stack dashboard look — each card is a label, a small uppercase role line, and one bordered value box.
- **Known layout tradeoff (documented, not a bug):** because the Redis card is always present in the DOM (opacity-only hidden before Beat 3, to avoid a card-count layout shift when it appears), the Database card sits slightly left of true horizontal center during Beats 1-2 while it is the only visible card, then the pair reads as centered together once Redis fades in at Beat 3. This was a deliberate choice to guarantee zero horizontal reflow when Redis appears (no jump), verified visually across `scene-12-database-old.png`, `scene-12-database-new.png`, and `scene-12-divergence.png`.

## 8. Timing

Scene duration: `sharedWindow(11, 2)` = 13.0s = 390 frames at 30fps (unchanged from the approved `scenes.ts` entry; global frames 5040-5429 in the composed episode, confirmed by `remotion compositions` reporting 5430 total frames after this scene's addition).

```text
bridgeIn:              0.4   bridgeOut:              2.0   (no cards yet)
cardsIn:               2.4   (Database card enters)
dbCrossfadeStart:      3.2   dbCrossfadeEnd:         3.6   (old -> new email, same-position crossfade)
databaseCaptionOut:    4.6   ("The Database record changes.")
redisIn:               5.0   (Redis card enters, both cards now visible)
redisCaptionOut:       7.2   ("But Redis still holds the old value.")
pulseStart:            7.6   (Redis scale pulse, 1 -> 1.06 -> 1 over emphasizeScale's duration)
responseIn:            7.8   (returned-value indicator appears)
fastResponseCaptionOut: 9.4  ("The application reads Redis -- and returns that answer fast.")
cardsOut:              9.4   (both cards + indicator fade out together)
jokeIn:                9.6   jokeOut:                10.8  ("Wrong answer. Very fast.")
takeawayIn:            11.0  (window end: 13.0, the scene's own duration boundary)
```

The takeaway beat's window end (13.0s) is set exactly at the scene's own duration boundary, the same "land at the cutoff" technique Scenes 08-11 use for their closing lines.

## 9. Localization

- **EN / DE / FR:** all eight new keys (`staleCacheBridge`, `staleCacheDatabaseChanges`, `staleCacheRedisOld`, `staleCacheFastResponse`, `staleCacheJoke`, `staleCacheTakeaway`, `staleCacheRoleCurrent`, `staleCacheRoleCachedCopy`) were added to `src/shared/localization/index.ts` in all three language blocks.
- **Translated role labels:** EN "CURRENT"/"CACHED COPY" -> DE "AKTUELL"/"GECACHT" -> FR "ACTUEL"/"COPIE EN CACHE". Confirmed via rendered stills (`scene-12-de-divergence.png`, `scene-12-fr-divergence.png`) that all four role labels fit cleanly within the 460px card width in every language, with no overflow or wrapping inside the card.
- **Joke translation:** DE "Falsche Antwort. Sehr schnell." / FR "Mauvaise réponse. Très rapide." — both confirmed on a single line via rendered stills (`scene-12-de-joke.png`, `scene-12-fr-joke.png`), preserving the same calm, wry, brief character as the English original.
- **Shortened equivalent used (as the task explicitly permitted):** the German "CACHED COPY" role label uses "GECACHT" rather than the longer literal "ZWISCHENGESPEICHERT", per the task's own flagged concern. Confirmed to fit within the card width alongside "AKTUELL".
- **Email values are not translated** — `alice.new@example.com` / `alice.old@example.com` render identically in EN/DE/FR, confirmed across all rendered stills.
- **Overflow/wrapping findings:** the closing takeaway line wraps to three lines in EN/DE and four lines in FR, all confirmed to stay within the safe horizontal margins with no clipping. The bridge, database-change, and Redis-old captions each render on a single line in all three languages.

## 10. Numeric Latency Policy

**Confirmed:** no `~8 ms`, `~10 ms`, or `~180 ms` appears anywhere in `Scene12StaleCache.tsx` or in any of the eight new translation keys. Beat 4's caption uses "fast" as a plain adjective, matching the approved plan's preference for the word over a number, since this scene's point is correctness, not a new speed comparison. The old `12-stale-cache` `storyBeats` entry (`'FAST: yes; CORRECT: no'`) contained no number either, so no numeric content needed to be removed from the metadata this time.

## 11. Review Artifacts

```text
renders/review/task-022/scene-12-start.png
renders/review/task-022/scene-12-database-old.png
renders/review/task-022/scene-12-database-new.png
renders/review/task-022/scene-12-divergence.png
renders/review/task-022/scene-12-fast-stale-response.png
renders/review/task-022/scene-12-wrong-fast.png
renders/review/task-022/scene-12-end.png
renders/review/task-022/scene-12-preview.mp4
renders/review/task-022/scene-12-de-divergence.png
renders/review/task-022/scene-12-fr-divergence.png
renders/review/task-022/scene-12-de-joke.png
renders/review/task-022/scene-12-fr-joke.png
renders/review/task-022/scene-12-de-end.png
renders/review/task-022/scene-12-fr-end.png
renders/review/task-022/scene-11-regression.png
renders/review/task-022/scene-10-regression.png
```

All confirmed Git-ignored (matched by `renders/*` in `.gitignore`).

## 12. Human Review Requests

| Artifact | Purpose | What to review | Agent assessment | Known issues |
|---|---|---|---|---|
| scene-12-start.png | Bridge beat | Whether the stale-data question reads clearly | Muted centered text, single line, legible | None observed |
| scene-12-database-old.png | Beat 2 start | Whether the initial Database state is clear before the crossfade | Single card, old email visible, "CURRENT" role legible | Card sits left of true center (Section 7 known tradeoff) |
| scene-12-database-new.png | Beat 2 end | Whether the old -> new crossfade reads as a same-position change, not a jump | Value swapped in place, same card position/size | Same left-of-center note as above |
| scene-12-divergence.png | Beat 3 -- the scene's central comparison | Whether Database (NEW) and Redis (OLD) disagreement is immediately obvious | Both cards visible together, green "CURRENT" vs. amber "CACHED COPY", values clearly different | None observed |
| scene-12-fast-stale-response.png | Beat 4 | Whether the Redis emphasis is restrained and the stale returned value is clear | Small amber value indicator below the cards; caption states "fast" without overclaiming | Question 5 (whether the pulse itself is restrained) can only be fully judged from the preview MP4, not a still |
| scene-12-wrong-fast.png | Beat 5 -- joke | Whether "Wrong answer. Very fast." lands as a brief technical aside | Cards fully cleared, single calm line, no spectacle | None observed |
| scene-12-end.png | Beat 6 -- takeaway | Whether the closing line explains stale cache without drifting into invalidation mechanics | Larger text, matches the approved wording exactly, no TTL/invalidation content | None observed |
| scene-12-de-divergence.png / scene-12-fr-divergence.png | Localization, Beat 3 | Whether DE/FR role labels and values stay legible and well-fitted in the cards | All four translated role labels fit within card width, no overflow | DE "CACHED COPY" uses the shortened "GECACHT" equivalent — flagged in Section 9 |
| scene-12-de-joke.png / scene-12-fr-joke.png | Localization, Beat 5 | Whether the joke keeps its wry, brief character in DE/FR | Both render on one line, natural phrasing | None observed |
| scene-12-de-end.png / scene-12-fr-end.png | Localization, Beat 6 | Whether the closing takeaway stays legible in DE/FR | DE wraps to 3 lines, FR wraps to 4 lines, both within safe margins | None observed |
| scene-12-preview.mp4 | Full Scene 12 playback (frames 5040-5429) | Overall pacing across all 6 beats; whether the crossfade, card entrance, and pulse feel restrained in motion | Not independently assessable from stills alone; included for full-motion human review | None observed in constituent stills |
| scene-11-regression.png | Regression check | Confirm Scene 11 unaffected by Scene 12's addition | Identical cache-everything visual/caption content as before this task | None observed |
| scene-10-regression.png | Regression check | Confirm Scene 10 unaffected | Identical why-fast visual/caption content as before this task | None observed |

Human review status: **PENDING**

## 13. Verification Results

```text
TypeScript:                 PASS
build:                       PASS (npm run build: typecheck + remotion bundle, both succeeded)
composition discovery:        PASS (remotion compositions: Redis-EN/DE/FR now report 5430 frames / 181.00s, up from 5040/168.00s -- exactly Scene 12's 390-frame window, no other scene's duration changed)
scene validation:              PASS (validateEpisodeArchitecture ran without throwing at bundle/import time; 14-scene count, ordering, and empty assetIds all still valid)
asset validation:               PASS (Scene 12's assetIds is [] -- no asset reference to validate; no manifest changes)
Redis-EN:                        PASS (all 7 EN stills rendered without runtime error)
Redis-DE:                         PASS (3 DE stills rendered, correct translations, no overflow)
Redis-FR:                          PASS (3 FR stills rendered, correct translations, no overflow)
start:                              PASS
Database old:                        PASS
Database new:                         PASS
divergence:                            PASS
fast stale response:                    PASS
joke:                                    PASS
takeaway:                                 PASS
Scene 12 MP4:                              PASS
localization checks:                        PASS (DE/FR divergence, joke, and closing all confirmed legible)
Scene 11 regression:                         PASS
Scene 10 regression:                          PASS
no placeholder alicePortrait dependency:       PASS (assetIds: []; no resolveAsset call anywhere in the scene; alicePortrait in assets.ts untouched)
review-animations QA:                           PASS (Section 2 / no "Never Ship" violations found)
```

## 14. Problems / Risks

- **Database card sits left of true horizontal center during Beats 1-2**, before the Redis card fades in (Section 7). This is a deliberate tradeoff (the Redis card is always present in the layout, opacity-hidden, to avoid a horizontal reflow when it appears) rather than an oversight, but it is a visible asymmetry for roughly 2.6 seconds at the start of the card sequence. Flagged for human review rather than silently accepted; an alternative (re-centering the Database card alone, then animating it leftward when Redis enters) was considered but rejected as adding motion complexity for a state that only lasts ~2.6s.
- **German "CACHED COPY" uses a shortened equivalent** ("GECACHT" instead of "ZWISCHENGESPEICHERT"), per the task's own anticipated concern. The meaning (a cached/stored copy) is preserved, but it is a more casual/compressed term than the fully spelled-out word — flagged for human review rather than treated as self-evidently correct.
- No other risks identified. The `alicePortrait` placeholder asset remains untouched and unresolved, as intended.

## 15. Recommended Next Step

```text
If Scene 12 is human-approved:
→ plan Scene 13: operational and design costs of caching.

If Scene 12 is not approved:
→ revise only the rejected Scene 12 timing, wording, value-card treatment, or humor beat.
```

## 16. Git Status

- Branch: `master`
- Changed files (modified):
  - `src/episodes/001-redis/RedisEpisode.tsx` — added Scene 12 import, `scene12Window` import, and `<Sequence>`
  - `src/episodes/001-redis/episode.config.ts` — added `scene12Window` export and included its duration in `durationInFrames`
  - `src/episodes/001-redis/scenes.ts` — updated Scene 12's `assetIds` to `[]`, `storyBeats` to the 6-beat structure, and added `visualNotes` describing the Remotion-native two-card comparison
  - `src/shared/localization/index.ts` — added 8 new translation keys × 3 languages for Scene 12 text
- New untracked files added by this task:
  - `src/episodes/001-redis/scenes/Scene12StaleCache.tsx` (new scene component)
  - `feedbacks/task-022-feedback.md` (this report)
- Pre-existing untracked files at task start, unrelated to this task and left untouched:
  - `feedbacks/task-017-feedback.md`, `feedbacks/task-018-feedback.md`, `feedbacks/task-019-feedback.md`, `feedbacks/task-020-feedback.md`, `feedbacks/task-021-feedback.md`
  - `src/episodes/001-redis/scenes/Scene10WhyRedisFast.tsx`, `src/episodes/001-redis/scenes/Scene11CacheEverything.tsx`
  - `tasks/TASK-017.md`, `tasks/TASK-018.md`, `tasks/TASK-019.md`, `tasks/TASK-020.md`, `tasks/TASK-021.md`, `tasks/TASK-022.md`
- Ignored review media: all files under `renders/review/task-022/` and the `build/` directory (confirmed via `.gitignore` matching `renders/*` and `build/`), not shown in `git status`.
- No commits made. No pushes made.

## 17. Final Status

```text
TASK-022 STATUS: PASS
```
