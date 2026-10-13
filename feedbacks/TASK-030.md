# TASK-030 Feedback — Background music with ducking (EN)

Status: implemented and mechanically verified. **Human review: PENDING.**

## Track used

- File: `src/episodes/001-redis/narration/audio/music/background.mp3` (supplied by the user; copied to `public/episodes/001-redis/audio/music/background.mp3` so `staticFile` can serve it, same pattern as narration).
- Properties: MP3, 256 kbps, 48 kHz stereo, 224.424s.
- **Source/license: not recorded.** The file was supplied without provenance and I could not determine it from the file. Please add the source and license here or in `decisions.md` before final release.

## Implementation

- `src/shared/audio/music-ducking.ts` (new): pure functions. `buildDuckingKeyframes()` turns per-scene narration spans into strictly increasing keyframes; `getMusicVolume()` samples them with `interpolate()` and multiplies by the overall fade envelope.
- `episode.config.ts`: `redisMusicTrack` (EN only) and `getRedisNarrationSpans()`. A span is each scene's window start to start + narration clip length (from `scene-boundaries.json`). The rest of each scene window (localization margin, 1–2s) counts as a narration gap.
- `RedisEpisode.tsx`: music `<Audio>` inside `<Loop>` (6732 frames; episode is 7700). `Loop.useLoop()` supplies the iteration so the volume callback uses the absolute episode frame, not the per-iteration frame.
- Limitation: `scene-boundaries.json` tiles the file at the midpoint of inter-scene pauses, so spans include up to half a pause on each side. The music therefore ducks slightly early/late versus the exact first/last spoken word. Mid-scene pauses are not detected; music stays ducked through them.

## Volume values

| State | Volume |
|---|---|
| Resting (narration gap) | 0.10 |
| Ducked (narration playing) | 0.04 |
| Attack (ramp to ducked, ends at narration start) | 9 frames (0.3s) |
| Release (ramp to resting, starts at narration end) | 24 frames (0.8s) |
| Episode fade-in | 60 frames (2s) |
| Episode fade-out | 90 frames (3s) |

All are in `defaultDuckingConfig`. Deliberately conservative.

## Mechanical verification (not by ear)

- `npm run typecheck`: passes.
- `npm run compositions`: Redis-EN 7700 frames (256.67s), unchanged; DE/FR 6861, unchanged.
- Render: `renders/review/TASK-030/redis-en-with-music.mp4` (59.8 MB). No errors or warnings in render output. Streams: h264 video 256.67s, AAC audio 256.73s.
- Volume values computed from the real timeline (bundled `getMusicVolume`):
  - Start/end: frame 0 → 0.000, frame 30 → 0.020, frame 60 → 0.040 (fade-in complete, ducked), last frame → 0.000.
  - Scene 1→2 (narration 0–530, then 600–1063): f530 0.040, f542 0.070, f554 0.100 (rest), f591 0.100, f596 0.067, f600 0.040.
  - Scene 7 (3002–3685): f2998 0.067, f3002 0.040, f3685 0.040, f3697 0.070, f3709 0.100.
  - Scene 13 (6336–7017): f6332 0.067, f6336 0.040, f7017 0.040, f7029 0.070, f7041 0.100.
  - Over all 7700 frames, max 0.100 and min 0.000.
- The loop seam is at frame 6732, inside Scene 13's narration, so the music is ducked (0.04) when it wraps.

I cannot listen. Nothing above is a judgment of how the mix sounds.

## Human Review Request

Please listen to `renders/review/TASK-030/redis-en-with-music.mp4` and report on:

1. **Level:** is the music too loud or competing with narration anywhere, or so quiet it is pointless?
2. **Ducking transitions:** do they sound abrupt or smooth? (0.3s attack / 0.8s release; also check the early/late ducking caused by midpoint boundaries.)
3. **Loop seam:** the track wraps at ~224.4s (Scene 13). Is it audible?
4. **Overall:** does it feel like "narration > clarity > music"?
5. The fade-in (2s) and fade-out (3s) at the ends.

This is the first audio-mix judgment in the project, so please treat it as a real review. Tell me the values to change (they are constants in `defaultDuckingConfig`).

Human review status: **PENDING**
