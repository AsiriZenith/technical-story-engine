# Episode 001-redis — Open Decisions

This log records known open issues that have not yet been resolved. It does not resolve them — resolving any of these requires an explicit follow-up task and, where visible media is affected, human review.

## 1. `~8 ms` vs `~10 ms` inconsistency — RESOLVED (TASK-028)

**Issue:** The episode's canonical cache-hit example throughout narration/captions was `~8 ms`, but the approved Scene 07 technical-architecture image (`scene07TechnicalArchitecture`, reused by Scenes 07, 08, 09, and 10) contains baked text reading `~10 ms`.

**Decision:** Standardized on **`~10 ms`** everywhere (Option 1 below), since it matches the existing, already-approved architecture image — no image regeneration needed. This was decided before narration recording begins (TASK-028's "Why"), since narration will state the exact number out loud and the two values can't coexist once spoken.

**What was changed:** Every occurrence of the episode's cache-hit example stated as `~8 ms` was updated to `~10 ms` in `Scene01Mystery.tsx`, `src/shared/localization/index.ts` (`cacheHitFastResponse` key, all three languages), `scenes.ts` (Scene 01's `storyBeats` and Scene 02's `visualNotes`), `DevTypography.tsx`'s demo value, and the relevant storyboard files (`README.md`, `scene-01-mystery.md`, `scene-02-latency-breakdown.md`, `scene-07-analogy-to-architecture.md`, `scene-08-cache-miss.md`). Scene 02's own, unrelated `network/DB connection ~8 ms` breakdown value was left untouched — it describes a different quantity (part of the pre-Redis 180ms breakdown), not the cache-hit comparison. See `feedbacks/TASK-028.md` for the full list.

**Original options considered:**
- Option 1 — standardize narration/captions toward `~10 ms` across the episode (**chosen**), or
- Option 2 — replace/correct the architecture image (would have required a new user-approved asset; not needed since Option 1 was chosen).

## 2. `SpotlightImage` radial-gradient mask-math issue

**Issue:** The current CSS radial-gradient dimensions in `SpotlightImage` behave more like radii than full extents, so the actual feather/reach of the spotlight is larger than the conceptual region definition suggests.

**Why not yet fixed:** Multiple approved scenes (Scenes 04, 07, 08, 09, 10) are already visually tuned around the current behavior. Fixing the math would shift the spotlight appearance in all of them simultaneously.

**What would resolve it:** A dedicated cleanup task, explicitly scoped to `SpotlightImage`, with regression checks (rendered frame comparison) against Scenes 04, 07, 08, 09, and 10 before merging. **Do not fix this globally during normal scene work.**

## 3. Scene 13 closing-frame ambient labels

**Issue:** In Scene 13's closing frame, some of the four ambient category labels (Freshness / Capacity / Resilience / Operations) remain partially visible while others are hidden behind the closing text — an inconsistent mixed state.

**Why not yet fixed:** Not a technical failure, but a visual-design judgment call that needs a human decision on the desired end state.

**What would resolve it:** A human design decision between the two coherent options — all four labels faintly visible, or all four fully hidden — followed by a small Scene 13 polish task implementing that choice. This is also currently the episode's human-review bottleneck: Scene 13 review determines whether Scene 14 planning can begin (see `README.md` and `docs/REDIS_EPISODE_PRODUCTION_STATUS.md` "Immediate Next Step").

**Update (TASK-025c):** Scene 14's visual approach (Option A) has now been approved and documented in `scenes/scene-14-final-mental-model.md`, but that approval is planning-only and does not resolve or bypass this gate. Scene 13's human review is still outstanding. TASK-026 (Scene 14 implementation) must confirm Scene 13's review outcome before implementation begins.

**Update (TASK-025e):** The ambient-label issue itself is now **resolved** — Scene 13 was rebuilt (Option A, per TASK-025d's planning) to replace the four text-label-plus-caption callouts with per-category diagrams (a freshness countdown ring, a capacity/eviction bar, a resilience node-dim-and-reroute beat, and an operations heartbeat motif). These vignettes retire in sequence rather than settling into a lingering ambient state, so there is no longer a closing-frame state where some category labels are visible and others are hidden; this was confirmed against rendered stills at each beat (see `feedbacks/task-025e-scene13-rebuild-feedback.md`). This resolves the ambient-label issue specifically, but **does not** resolve the broader human-review gate above: Scene 13's rebuild still needs human video review before TASK-026 (Scene 14 implementation) can proceed, since implementing a fix is not the same as a human confirming it looks right on screen.

**Update (TASK-026):** The user confirmed Scene 13's rebuild review before this task began, clearing the human-review gate described above. Scene 14 (the episode's final scene) has now been implemented — see `feedbacks/task-026-scene14-implementation-feedback.md`. The originally-flagged 13-vs-14 scene count mismatch from the architecture review is now fully resolved: all 14 scenes in `scenes.ts` have a corresponding implemented `.tsx` file, registered in both `episode.config.ts`'s timeline and `RedisEpisode.tsx`'s sequence list. This item can be considered closed pending Scene 14's own human video review (a separate, per-scene gate, not a reopening of this item).

## 4. DE/FR narration deferred (TASK-029)

**Issue:** Only EN narration exists. `Redis-DE` and `Redis-FR` keep the author-estimated scene timing (6861 frames / 228.70s after TASK-020C; was 6330 / 211.00s) and play no narration.

**What would resolve it:** A future task that records DE/FR narration as single files, derives their `scene-boundaries.json` the same way, and registers them in `episode.config.ts` (`narrationBoundaries` / `redisNarrationTracks`). Note DE/FR scenes will then also need beats re-timed to their own narration.

## 5. Episode timing depends on a derived artifact: `scene-boundaries.json` (TASK-029)

**Issue:** EN scene windows (and therefore total duration and every Sequence offset) are computed from `narration/audio/en/scene-boundaries.json`, which is derived from the narration audio, not authored.

**Rule:** If the EN narration is ever re-recorded or re-exported, or `narration/script.md` changes materially, regenerate `scene-boundaries.json` with `scripts/derive-scene-boundaries.mjs` (whisper.cpp word-level transcript + ffmpeg silence detection, aligned to the script) and re-copy the audio to `public/episodes/001-redis/audio/narration/en/episode-full.wav`. Stale boundaries make audio and visuals silently desync. Audio is also duplicated in `public/` because Remotion's `staticFile` only serves from there.

## 6. Scene beats not yet re-timed to narration (TASK-029)

**Issue:** Only Scenes 10, 13 and 14 had their beat constants re-timed to the real narration. Scenes 01, 02, 03, 05, 07, 08, 11 and 12 show 1–5s offsets between key visual beats and the spoken phrase they illustrate (largest: Scenes 07 and 12). See `feedbacks/TASK-029.md`.

**What would resolve it:** A follow-up task re-timing those scenes' beat constants (timing constants only) to the word-level times, after the user confirms the boundaries by ear.

## 7. DE/FR planned windows for Scenes 13 and 14 were shorter than their beats (found TASK-020B, fixed TASK-020C)

**Bug:** DE/FR have no narration, so they use author-estimated windows. Scene 13's planned window (`sharedWindow(14, 2, 'extend')` = 16s) and Scene 14's (`sharedWindow(12, 2, 'extend')` = 14s) were shorter than the beats TASK-029 re-timed to the EN narration (Scene 13 runs to 24.7s, closing at 18.9s; Scene 14's closing question appears at 14.5s). DE/FR hard-cut mid-scene: Scene 13 stopped during the Operations beat and never showed its closing line; Scene 14 stopped during the cache-hit diagram and never showed its closing question. Confirmed with stills (`renders/review/TASK-020C/before-*`).

**Pre-existing:** introduced by TASK-029's EN re-timing, not by Scene 11's changes (Scene 11's +2s DE/FR shift only moved where the cut happened). EN was never affected (audio-derived windows).

**Fix:** Scene 13 -> `sharedWindow(22.7, 2, 'extend')` (24.7s, exactly the EN window and `closingEnd`); Scene 14 -> `sharedWindow(19, 2, 'extend')` (21s, close to EN's 20.77s). DE/FR now 6861 frames / 228.70s (was 6390); EN unchanged at 7700.

**Re-verify later:** these values match the *EN-timed* beats and are author estimates for DE/FR. When real DE/FR narration exists, those scenes need their own audio-derived timing pass (TASK-031 multilingual validation, item 4 above) and these numbers should be replaced by derived windows.

## 8. `audio-ducking` — RESOLVED (TASK-030), mix quality not yet confirmed by ear

**Resolved:** Background music (`narration/audio/music/background.mp3`, served from `public/episodes/001-redis/audio/music/`) is wired in `RedisEpisode.tsx` as a looped `<Audio>` with a ducking envelope from `src/shared/audio/music-ducking.ts`. Resting volume 0.10, ducked 0.04 while a scene's narration clip plays (9-frame attack, 24-frame release), plus one 2s fade-in / 3s fade-out over the whole episode. EN only, matching narration.

**Still open:** The agent cannot listen. The envelope was verified numerically at scene boundaries, not by ear. Human review of loudness, ducking smoothness and the loop seam (track is 224.4s, episode 256.67s, so it wraps once near 224s) is pending — see `feedbacks/TASK-030.md`. Volumes are constants in `defaultDuckingConfig`.

## 9. Music swapped to texture-only pad; volumes lowered; accent SFX added (TASK-030B)

**Music:** `background.mp3` replaced by the user with a texture-only pad/drone track (116.036s, was 224.424s; loops ~2.2x, seams at frames 3481 and 6962). **Source/license: not yet recorded — the user has not supplied it; the file has no embedded tags. Must be filled in before final release.** Ducking constants in `defaultDuckingConfig` lowered: resting 0.10 -> 0.06, ducked 0.04 -> 0.02 (attack/release/fades unchanged).

**Accent SFX (first pass, pending human approval):** 7 placements in `redisAccentSfx` (`episode.config.ts`) — 3 pop, 2 click, 2 ding, EN only. Source files are `.wav` (not `.mp3` as the task text said) in `narration/audio/sfx/`, copied to `public/episodes/001-redis/audio/sfx/`. Volumes 0.25 (pop/click), 0.20 (ding). Source/license of the SFX files also not recorded. Mix quality not confirmed by ear. See `feedbacks/TASK-030B.md`.
