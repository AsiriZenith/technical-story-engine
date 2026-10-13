# TASK-030B

## Why

Human review of TASK-030's music: the current track's mood/genre is right,
but its melody is too present/distracting — swap for a texture-only
pad/drone track (no melodic hook, no percussion) at a lower volume. Also,
Part B (accent SFX: pop/click/ding) from the original TASK-030 spec never
ran — only Part A (music/ducking) was implemented. This task does both.

## Step 1 — Confirm new music file

Confirm the user has replaced
`src/episodes/001-redis/narration/audio/music/background.mp3` with the new
track (same filename, same path — just different content). If the file's
modification time / duration hasn't changed from TASK-030's recorded
224.424s, stop and ask the user to confirm the swap happened before
proceeding — do not assume.

Also record this track's source/license this time (TASK-030's feedback
flagged that the previous file had none recorded) — ask the user for the
source URL if not obvious, and note it in `decisions.md`.

## Step 2 — Lower resting/ducked volume further

Per the user's "keep low sound" request, reduce `defaultDuckingConfig` in
`src/shared/audio/music-ducking.ts`:

- Resting (narration gap): 0.10 -> **0.06**
- Ducked (narration playing): 0.04 -> **0.02**

Keep attack/release/fade timings as-is (0.3s/0.8s/2s/3s) — those weren't
flagged as a problem, only the melody and level were.

## Step 3 — Re-render and re-verify music

- `npm run compositions` — confirm duration unchanged.
- Render `renders/review/TASK-030B/redis-en-with-music-v2.mp4`.
- Repeat the same mechanical spot-checks as TASK-030 (ducking values at the
  same sampled frames) to confirm the new volume constants took effect
  correctly — report the updated values at those same frames for an
  apples-to-apples comparison with TASK-030's numbers.

## Step 4 — Implement accent SFX (Part B, not yet done)

This is the same Part B spec from the original TASK-030 task file — carry it
out now:

- Confirm `sfx/pop.mp3`, `sfx/click.mp3`, `sfx/ding.mp3` all exist at
  `src/episodes/001-redis/narration/audio/sfx/`.
- Propose 5-8 candidate placements across the episode (not per-scene):
  `click` for discrete state changes (node dim/highlight, path going
  dashed), `pop` for elements landing/appearing (pile entries, CapacityBar
  fill steps, packet arrivals), `ding` reserved for only 1-2 genuine payoff
  moments in the whole episode (e.g. Scene 01's "10 ms" reveal, Scene 14's
  closing question).
- Implement each as a short, non-looping `<Audio>` at its specific
  scene-relative frame, at a modest volume (subtle punctuation, not a jump
  scare).
- List exact placements (scene/beat/sound) in feedback — flag as a first
  pass pending approval, same as originally specced.

## Step 5 — Final combined render

Render the full mix (narration + new music + accents) to:
```
renders/review/TASK-030B/redis-en-full-mix-v2.mp4
```

## Step 6 — Update storyboard and decisions

- `decisions.md`: record the music track swap (with source/license this
  time), the new volume constants, and that accent SFX is now implemented
  (first pass, pending approval).
- `storyboard/README.md`: update to reflect music + SFX are both in place.

## Step 7 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-030B.md
```

Include: confirmation of the new track and its source/license, the updated
ducking values and spot-check comparison against TASK-030's numbers, the
full accent SFX placement list, and a Human Review Request asking the user
to listen for: whether the new track fades into the background properly
now, whether the lower volume still feels present enough to matter, and
whether each accent placement lands well (same questions as TASK-030's
original Human Review Request for Part A, plus accent-specific ones for
Part B).

Human review status: PENDING.
