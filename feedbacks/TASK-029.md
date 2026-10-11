# TASK-029 Feedback — Single-file EN narration integrated, audio-driven timing

## Summary

- Step 1: `episode-full.wav` was already in place (the user had renamed it; the original `Redis-Accelerated API Latency Mystery.wav` is deleted in the working tree, not preserved). A copy was added at `public/episodes/001-redis/audio/narration/en/episode-full.wav` because Remotion's `staticFile` only serves from `public/`. **Two copies of a 20 MB file now exist** — see `decisions.md` item 5.
- Step 2: Scene boundaries derived and written to `src/episodes/001-redis/narration/audio/en/scene-boundaries.json`.
- Steps 3–4: audio-driven durations + narration wired into `Redis-EN` (**with one deliberate deviation from Step 4 — see "Deviation" below**).
- Step 5: Scenes 10, 13, 14 beat constants re-timed.
- Step 6: typecheck, compositions, full render done. Sync self-review below.
- Step 7: `storyboard/README.md` and `storyboard/decisions.md` (items 4–6) updated.

## Step 2 — How boundaries were derived

No transcription tool was installed (no Python, Whisper, WhisperX or ffmpeg on PATH). I used Remotion's own tooling rather than adding a project dependency:

- `@remotion/install-whisper-cpp` (whisper.cpp 1.5.5 + `base.en` model) installed in a **scratch directory outside the repo** — `package.json` is unchanged.
- ffmpeg from `@remotion/compositor-win32-x64-msvc` for 16 kHz conversion and `silencedetect`.
- `scripts/derive-scene-boundaries.mjs` (new, committed-quality, re-runnable): merges whisper tokens into words, aligns the transcript to each scene's text in `narration/script.md` with a global edit-distance alignment, then places each boundary at the **midpoint of the pause immediately before the next scene's first word**.

Boundaries tile the file contiguously (each scene's `endSeconds` = next scene's `startSeconds`; scene 01 starts at 0, scene 14 ends at the file end, 230.32s). This is deliberate: the ~0.3s pause between scenes belongs to the scene it precedes, so no audio time is lost between spans.

### Derived boundaries

Narr. words = script words; "Script est." = the TASK-028 estimate in `script.md` (~2.3 words/s); Δ = actual vs estimate.

| Scene | Start (s) | End (s) | Duration (s) | Script est. (s) | Δ | Alignment match |
|---|---|---|---|---|---|---|
| 01 mystery | 0.00 | 17.67 | 17.67 | 18.7 | −5% | 100% |
| 02 latency-breakdown | 17.67 | 33.10 | 15.43 | 16.9 | −9% | 100% |
| 03 database-speed-misconception | 33.10 | 47.96 | 14.86 | 15.2 | −2% | 100% |
| 04 original-request-path | 47.96 | 62.50 | 14.54 | 13.0 | +12% | 100% |
| 05 restaurant-repeat-work | 62.50 | 75.58 | 13.08 | 13.5 | −3% | 90% |
| 06 ready-order-cache | 75.58 | 89.74 | 14.16 | 15.2 | −7% | 100% |
| 07 restaurant-to-architecture | 89.74 | 112.49 | 22.75 | 19.1 | +19% | 100% |
| 08 cache-miss | 112.49 | 129.72 | 17.23 | 17.8 | −3% | 100% |
| 09 cache-hit | 129.72 | 143.66 | 13.94 | 13.9 | 0% | 100% |
| 10 why-redis-fast | 143.66 | 161.16 | 17.50 | 18.7 | −6% | 100% |
| 11 cache-everything | 161.16 | 172.79 | 11.63 | 11.7 | −1% | 93% |
| 12 stale-cache | 172.79 | 188.87 | 16.08 | 14.3 | +12% | 100% |
| 13 cache-tradeoffs | 188.87 | 211.56 | 22.69 | 19.1 | +19% | 98% |
| 14 final-mental-model | 211.56 | 230.32 | 18.76 | 17.0 | +10% | 100% |

**Sanity check:** every scene is within ±19% of the estimate (threshold was 30%); nothing implausible. The sum, 230.32s, is the whole file.

### Alignment confidence

- All 14 boundaries sit inside a real silence of 0.25–0.65s (found by ffmpeg, independent of Whisper) right before the next scene's first word — **no boundary had to be guessed**.
- Every scene's first and last word matched the script (e.g. `Here's … changed?`, `Where … hiding.`).
- Lowest word-level match: Scene 05 (90%) and Scene 11 (93%), Scene 13 (98%). These are Whisper mishearings, not alignment errors (e.g. spoken "cash everything" for "cache everything", "10 minutes" vs "ten minutes", "Memory is an infinite" for "isn't infinite"). Boundaries there are still bracketed by clear pauses.
- Mildest uncertainty: Scene 02→03 (pause only ~0.25s, 32.98–33.23) and Scene 03→04 (~0.35s). Still unambiguous in the silence log, but the shortest pauses in the file — worth listening to there first.
- Whisper `base.en` is a small model; word times are accurate to roughly ±0.1–0.2s. That is enough for scene boundaries, but beat-level retiming for other scenes should be confirmed by ear.

## Step 3/4 — Timing and audio wiring

Files: `src/shared/timing/audio-duration.ts` (new), `scene-timing.ts` (optional `narrationFit`), `scenes.ts` (Scenes 10/13/14 marked `'extend'`), `episode.config.ts`, `Root.tsx` (`calculateMetadata`), `RedisEpisode.tsx`.

Duration rule, per the standing decision:
- Scenes 10, 13, 14 (`'extend'`): narration + `localizationMarginSeconds`.
- All others: `max(targetSeconds, narration + localizationMarginSeconds)`.
- DE/FR: unchanged (author-estimated, 6330 frames / 211.00s). `calculateMetadata` returns the planned duration for them.

`calculateMetadata` is attached to the Production compositions generally and branches on `props.language` (EN → audio-derived, otherwise → planned), rather than only on `Redis-EN`; this is equivalent for EN and leaves DE/FR identical.

### New EN duration

**7700 frames / 256.67s** (was 6330 frames / 211.00s). The +45.67s is large and worth knowing about: the narration alone is 230.32s, longer than the 211s the visuals were planned for, and the margin is added on top of it for every scene.

| Scene | Old window (s) | New window (s) |
|---|---|---|
| 01 | 22.00 | 20.00 |
| 02 | 17.00 | 17.43 |
| 03 | 14.00 | 15.87 |
| 04 | 12.00 | 15.53 |
| 05 | 15.00 | 15.07 |
| 06 | 14.00 | 16.17 |
| 07 | 18.00 | 24.77 |
| 08 | 16.00 | 19.23 |
| 09 | 14.00 | 15.93 |
| 10 | 15.00 | 19.50 |
| 11 | 11.00 | 13.63 |
| 12 | 13.00 | 18.07 |
| 13 | 16.00 | 24.70 |
| 14 | 14.00 | 20.77 |

Scene 01 is the only scene that gets *shorter* (22.0 → 20.0), because its rule is `max(20, 17.67+2)`; its last beat (`questionIn` 18.2s) still fits.

### Deviation from Step 4 (needs your call)

Step 4 asks for **one** `<Audio>` playing continuously, relying on each scene's `<Sequence>` duration equalling its audio span. That conflicts with Step 3: once a scene's window is `max(visual target, narration + margin)` it is *longer* than its audio span, so a single continuous track would run ahead of the visuals and drift by the accumulated extra time (about 26s by the end of the episode).

I kept **one source file** but play it as **one `<Audio>` per scene**, each trimmed (`trimBefore`/`trimAfter`) to that scene's span and started at the scene's first frame. Audio and visuals therefore re-anchor at every scene boundary and cannot drift; the cost is a short silent tail in scenes whose window exceeds their narration (about 2s, the margin; ~2.3s in Scene 01). Cuts fall in the middle of a silence, so no clicks are expected. The alternative (true single `<Audio>`) would require windows exactly equal to the audio spans, i.e. dropping the margins and the `max(target, …)` rule. If you prefer that, it is a small change in `createAudioDrivenTimeline` + `RedisEpisode.tsx`.

## Step 5 — Re-tuned timing constants (Scenes 10, 13, 14)

Only `beats`/closing constants changed; no visuals redesigned. Each beat now tracks the spoken phrase (word times from the transcript; comments in the code quote them).

- **Scene 10** (15.0 → 19.5s): simple-lookup/in-memory/work-avoided windows moved to 5.3–8.1 / 8.5–11.3 / 11.7–16.3; modern-DB supplemental beat moved to 16.6–17.2; closing at 17.5, and its hard-coded end (15.0) replaced with a named `sceneEndSeconds = 19.5`.
- **Scene 13** (16.0 → 24.7s): bridge 0.4–2.8; Freshness 3.1–6.4; Capacity 6.8–9.6; Resilience 9.9–13.5; Operations 13.9–18.5; closing at 18.9; `closingEnd` 16.0 → 24.7.
- **Scene 14** (14.0 → 20.77s): slow path now plays during "Without caching, application, database, expensive work, response" (2.3–8.3s); fast path during "With a cache hit, application, straight to Redis, and back" (8.4–13.8s); closing question appears at 14.5s, ahead of the spoken question at 16.3s so the held diagram is not blank, and holds to the end.

## Step 6 — Verification

- `npm run typecheck`: **passes** (no errors).
- `npm run compositions`: `Redis-EN` **7700 frames (256.67s)**; `Redis-DE` and `Redis-FR` **6330 frames (211.00s)** — unchanged.
- Full render: `renders/review/TASK-029/redis-en-with-narration.mp4` (see "Render checks" below).

### Narration/visual sync self-review

Method: compared every scene's beat constants against the spoken-phrase times from the transcript. This is a **timing-constant analysis, not a viewing/listening** — I cannot listen to the render. Offsets are "visual vs. spoken": **late** = visual appears after the words, **early** = before.

| Scene | Status | Findings |
|---|---|---|
| 01 | Drifts | Visuals paced for 20s, narration is 17.7s. "180 ms" result at 5.2s vs spoken ~4s (~1s late); Redis enters 9.2s vs "Add Redis" 6.5s (**~2.7s late**); fast "10 ms" result 13.6s vs spoken ~11–12s (~1.5s late); final comparison 16.5s vs "Same request, same data" 13–15s; closing question 18.2s lands **after** narration ends (17.7s). |
| 02 | Drifts | Bar segments (4.0–8.6s) match "request handling and the network" (3.8–7s); database emphasis 8.6s vs "database work" 7.3s (~1.3s late); takeaway 10.0s vs "real cost is hiding" 13.2s (**~3.2s early**). |
| 03 | Drifts | "NOT THIS" joke diagram in at 1.95s vs "No, not this" 3.9–5.5s (~2s early); end diagram 7.9s vs "The database itself didn't get any faster" 9.0s (~1–2s early). |
| 04 | Mostly OK | Database focus at 4.9s matches "database" 4.9s; total-focus at 9.55s vs "the database repeats that expensive work" 11.8s (~2.2s early). |
| 05 | Mostly OK | Second order appears 6.6s vs "A different customer…" 4.9s (~1.7s late); takeaway 11.6s vs "all over again" 12.0s (OK). |
| 06 | Mostly OK | Shelf and serve beats land within ~0.3s of "ready shelf" / "next customer orders"; takeaway 10.7s vs "chef didn't cook at all" 12.5s (~1.8s early). |
| 07 | **Drifts most** | Analogy image swaps to the architecture diagram at 7.0s, but the narrator is still doing the mapping and "The burger is the cached result" until ~11.6s and says "In the real system" at 12.0s — architecture appears **~5s early**. Redis/database focus (8.5–15.3s) is also early relative to "checks Redis first" (15.6s). |
| 08 | Drifts | Miss beat ~0.7s early; "result returns" 10.8s vs "gets the result" 12.4s (~1.6s early); "store in Redis" 12.4s vs "stores it in Redis" 15.3s (**~2.9s early**). |
| 09 | OK | Within roughly ±1s throughout; closing 12.5s vs "Redis let us skip it altogether" 12.0s. |
| 10 | Re-timed | Beats track the spoken phrases (see Step 5). Not heard/seen by me. |
| 11 | Drifts | Punchline "CACHE EVERYTHING!" at 2.4s matches (2.3s); "Not so fast" 0.6s early; costs list 4.6–6.8s vs spoken 5.5–9.5s; "not every request" 7.2s vs 9.5s (~2.3s early). |
| 12 | **Drifts** | Cards ~1s early; **joke beat "Wrong answer. Very fast." shows at 9.6–10.8s but is spoken at 12.5–15s (~3s early)**, so the visual punchline lands before the narrator's. |
| 13 | Re-timed | Beats track the spoken phrases (see Step 5). Not heard/seen by me. |
| 14 | Re-timed | Beats track the spoken phrases (see Step 5). Not heard/seen by me. |

**Where to listen first**: Scenes 07 and 12 (largest offsets), then 01, 02, 03, 08, 11. Scenes 10, 13, 14 were re-timed against the transcript but are unverified by ear; the transcript timestamps are `base.en` word times.

Scenes with drift were **not** adjusted because Step 5 limits retiming to 10, 13 and 14. They are recorded in `decisions.md` item 6 as a follow-up (beat constants only; the boundaries are not at fault — the visuals were authored against the old estimates).

## Step 7 — Docs

- `storyboard/README.md`: narration integrated (EN, single-file source), EN duration audio-derived, DE/FR narration outstanding.
- `storyboard/decisions.md`: item 4 (DE/FR deferred), item 5 (`scene-boundaries.json` is a derived artifact; regenerate if audio is re-exported), item 6 (remaining beat re-timing).

## Files changed / added

- Added: `scripts/derive-scene-boundaries.mjs`, `src/shared/timing/audio-duration.ts`, `src/episodes/001-redis/narration/audio/en/scene-boundaries.json`, `public/episodes/001-redis/audio/narration/en/episode-full.wav`, `renders/review/TASK-029/redis-en-with-narration.mp4` (git-ignored).
- Modified: `src/shared/timing/scene-timing.ts`, `src/episodes/001-redis/{scenes.ts, episode.config.ts, RedisEpisode.tsx}`, `src/Root.tsx`, `src/episodes/001-redis/scenes/{Scene10WhyRedisFast, Scene13CacheCosts, Scene14FinalMentalModel}.tsx`, `storyboard/{README,decisions}.md`.
- Not committed (per AGENTS.md). Pre-existing working-tree changes (`TASK-029.md` edit, deleted original WAV) were left alone.
- Removed exports: `scene01Window`…`scene14Window` from `episode.config.ts` (nothing else used them); use `getRedisSceneTimeline(language)`.

## Render checks

- Render completed: 1920x1080, 7700 frames, h264 + AAC audio, 256.67s, 59.6 MB.
- Audio anchoring verified from the rendered file: speech onsets after the silences between scenes fall 0.1–0.3s after each scene's window start (e.g. Scene 02 window starts 20.00s, speech resumes 20.20s; Scene 03 37.43s → 37.60s; Scene 13 211.20s → 211.38s), so per-scene audio re-anchoring works as designed.
- Frames inspected (`renders/review/TASK-029/frames/`): Scene 10 "work avoided" caption over the architecture image at 12.0s; Scene 13 Operations vignette at 16.5s (spoken "Someone has to watch it, something has to run it"); Scene 14 slow path reaching Database / "Expensive work" at 5.6s; Scene 14 closing question at 16.1s. All rendered cleanly, with no overlap or clipping seen in those frames.
- Not checked: playback listening (not possible for the agent), clicks at the 13 audio cut points, and frames for Scenes 01–09, 11, 12 (not changed by this task).

## Human Review Requests

### Review Request 1

Artifact:
`renders/review/TASK-029/redis-en-with-narration.mp4`

Type:
MP4

Purpose:
Confirm the narration and visuals stay in sync across the whole EN episode, and that the derived scene boundaries fall at the right moments. Audio/visual desync is the main risk of this single-file approach.

What to review:
- **Listen for desync scene by scene**, especially Scenes 07 and 12 (analogy→architecture swap ~5s ahead of the narrator; the "Wrong answer. Very fast." joke ~3s ahead), then 01, 02, 03, 08, 11. These are known, flagged, and not yet re-timed.
- Scenes 10, 13, 14 were re-timed to the narration — confirm the visual beats land with the spoken phrases.
- Scene boundaries: do the cuts between scenes fall in natural pauses with no clipped words? Shortest pauses: 02→03 and 03→04.
- Is the 2s silent tail after narration in scenes whose window is longer than their narration acceptable, or should margins be trimmed (EN is now 256.67s vs 230.32s of speech)?
- Decision for you: keep one `<Audio>` per scene trimmed from the single file (current), or switch to a true single continuous `<Audio>` with windows exactly equal to audio spans (drops margins and the `max(target, …)` rule).

Agent assessment:
PASS WITH ISSUES

Known issues:
- Beat constants for Scenes 01, 02, 03, 05, 07, 08, 11, 12 are still tuned to the old author-estimated timing (1–5s offsets, listed above).
- No listening/viewing was performed by the agent; sync findings come from comparing beat constants to word-level transcript times.
- Whisper `base.en` word times are approximate (±0.1–0.2s).
- Episode is 45.67s longer than before (256.67s).

Human review status:
PENDING

## External Asset Requests

None.

HUMAN REVIEW: PENDING
