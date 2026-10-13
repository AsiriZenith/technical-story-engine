# TASK-030B Feedback — Pad track swap, lower volume, accent SFX

Status: implemented and mechanically verified. **Human review: PENDING.** I cannot listen; nothing here is a judgment of how it sounds.

## Step 1 — New music file

- `background.mp3` changed: duration **116.036s** (TASK-030 recorded 224.424s), so the swap is confirmed. No embedded tags.
- Copied to `public/episodes/001-redis/audio/music/background.mp3`; `redisMusicTrack.durationInFrames` updated to 3481.
- It now loops ~2.2 times (seams at frames 3481 and 6962). Those seams fall at: 3481 is in Scene 7 (narration 3002–3685, ducked); 6962 is in Scene 13 (narration 6336–7017, ducked). Both land while the music is ducked, but a pad's loop seam may still be audible.
- **Source/license: NOT recorded.** I have no way to determine it from the file and have not been given it. Please send the source URL/license; it is flagged in `decisions.md` (item 9) as an open item.

## Step 2 — Volumes

Resting 0.10 -> **0.06**, ducked 0.04 -> **0.02**. Attack 9f, release 24f, fade-in 60f, fade-out 90f unchanged.

## Step 3 — Verification

- `npm run typecheck` passes. `npm run compositions`: Redis-EN 7700 frames (256.67s), DE/FR 6861, unchanged.
- Music-only render: `renders/review/TASK-030B/redis-en-with-music-v2.mp4` (accent SFX disabled via `--props='{"language":"en","accentSfx":false}'`).
- Volume at the same frames as TASK-030:

| Frame | Event | TASK-030 | TASK-030B |
|---|---|---|---|
| 30 | fade-in | 0.020 | 0.010 |
| 60 | fade-in done, ducked | 0.040 | 0.020 |
| 530 | S1 narration ends | 0.040 | 0.020 |
| 542 | release midpoint | 0.070 | 0.040 |
| 554 | resting | 0.100 | 0.060 |
| 591 | resting | 0.100 | 0.060 |
| 596 | attack midpoint | 0.067 | 0.038 |
| 600 | S2 narration starts | 0.040 | 0.020 |
| 2998 / 3002 | S7 attack / start | 0.067 / 0.040 | 0.038 / 0.020 |
| 3685 / 3697 / 3709 | S7 end / release / rest | 0.040 / 0.070 / 0.100 | 0.020 / 0.040 / 0.060 |
| 6332 / 6336 | S13 attack / start | 0.067 / 0.040 | 0.038 / 0.020 |
| 7017 / 7029 / 7041 | S13 end / release / rest | 0.040 / 0.070 / 0.100 | 0.020 / 0.040 / 0.060 |

Transition frames are identical; levels scale as expected. Max over the episode 0.06, min 0.

## Step 4 — Accent SFX (first pass, pending approval)

Files: `pop.wav`, `click.wav`, `ding.wav` (the task text said `.mp3`; the files in the folder are `.wav`, used as-is, copied to `public/episodes/001-redis/audio/sfx/`). Source/license of these files is also unrecorded. Each plays once (non-looping `<Audio>` in its own `<Sequence>`) at scene-relative time = that scene's own beat constant. EN only. Defined in `redisAccentSfx` in `episode.config.ts`.

| # | Scene | Time in scene | Beat | Sound | Volume |
|---|---|---|---|---|---|
| 1 | 01 Mystery | 5.2s | `baselineResultIn` — 180 ms result lands | pop | 0.25 |
| 2 | 01 Mystery | 13.6s | `fastResultIn` — 10 ms reveal | **ding** | 0.20 |
| 3 | 08 Cache Miss | 3.5s | `redisMissIn` — miss highlight | click | 0.25 |
| 4 | 09 Cache Hit | 3.7s | `redisIn` — cache-hit highlight | pop | 0.25 |
| 5 | 13 Cache Costs | 6.8s | `capacityIn` — capacity callout lands | pop | 0.25 |
| 6 | 13 Cache Costs | 9.9s | `resilienceIn` — Redis node dims | click | 0.25 |
| 7 | 14 Final Model | 14.5s | `questionIn` — closing question | **ding** | 0.20 |

Two dings only, as specified. I picked placements from the beat constants rather than inspecting each frame, so a few may land slightly off the visible motion. SFX are not ducked and not tied to the music envelope. Several overlap narration by design (they punctuate beats while the voice speaks).

## Step 5 — Full mix

`renders/review/TASK-030B/redis-en-full-mix-v2.mp4` (narration + new music + accents). Render result and any errors are noted in the final summary below.

## Human Review Request

Please listen to both files and report:

1. **Music:** does the pad now sit in the background properly (no melodic hook pulling attention)?
2. **Level:** at 0.06 / 0.02 is it still present enough to matter, or inaudible?
3. **Ducking:** are the transitions smooth or abrupt? Any early/late ducking at scene boundaries?
4. **Loop seams** at ~116s and ~232s: audible?
5. **Fade-in / fade-out** at the ends.
6. **Each accent (1–7):** does it land on the visual beat, is the volume right (too loud / too quiet), does the sound type fit? Which should be moved, changed or cut?
7. Overall: "narration > clarity > music"?
8. Please send the music and SFX source/license.

Human review status: **PENDING**
