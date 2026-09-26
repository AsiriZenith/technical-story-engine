# TASK-029

## Why

Script is approved (`narration/script.md`, as edited/finalized by the user)
and the voice tool is decided: **Descript**. Per the user's decision, Scenes
10, 13, and 14 will have their visual duration **extended** to fit the
narration naturally, rather than trimming the script further. This task
generates the actual narration audio and wires it into the Remotion
timeline, replacing the author-estimated scene durations with audio-derived
ones.

## Step 1 — Generate narration audio in Descript

This step needs the user, not the agent — Descript's voice cloning/
generation is a manual web action. Confirm with the user whether the audio
files already exist before starting; if not, pause here and ask the user to:

1. Generate one audio file per scene (or one continuous file, if Descript's
   workflow makes per-scene export easier — ask the user which they produced)
   from the approved `script.md`, using their chosen Descript voice.
2. Export as `.wav` or `.mp3` and place under:
   ```
   src/episodes/001-redis/narration/audio/en/scene-01.mp3
   src/episodes/001-redis/narration/audio/en/scene-02.mp3
   ...
   src/episodes/001-redis/narration/audio/en/scene-14.mp3
   ```
   (English only for now — DE/FR narration is out of scope for this task;
   see `decisions.md` note in Step 6.)

Do not proceed to Step 2 until these files exist and their path is
confirmed.

## Step 2 — Add audio-driven duration support

This is the core architectural change flagged since the original
architecture review (Recommendation 8): duration should be measured from
real narration, not author-estimated.

- Add a `getAudioDurationInSeconds` (from `@remotion/media-utils`) based
  helper, e.g. `shared/timing/audio-duration.ts`, that resolves each scene's
  actual narration length.
- Introduce `calculateMetadata` on the `Redis-EN` composition (see Remotion's
  dynamic-duration pattern) so the composition's total duration is computed
  from the sum of real per-scene audio durations plus each scene's existing
  `localizationMarginSeconds`, rather than the current author-estimated
  `targetSeconds` in `scenes.ts`.
- For Scenes 10, 13, and 14 specifically: per the user's decision, let their
  visual duration extend to match their real narration length (do not trim
  or speed up narration to fit the old window). Other scenes should use
  whichever is longer — the existing visual `targetSeconds` or the real
  narration length plus margin — so a shorter-than-expected narration doesn't
  awkwardly shrink an already-tuned scene.
- Keep this audio-driven path EN-only for now, consistent with Step 1's
  scope; DE/FR should continue using their current author-estimated timing
  until their own narration exists (do not break DE/FR compositions).

## Step 3 — Wire `<Audio>` into the episode

- Add `<Audio>` components per scene in `RedisEpisode.tsx`, sourcing each
  scene's narration file, positioned within that scene's `<Sequence>` so
  timing stays scene-relative (per the existing `createSceneTimeline`
  convention — do not hardcode global frame offsets).
- Populate `episode.config.ts`'s `narrationTracks` (currently `{}`) with the
  EN audio paths.

## Step 4 — Re-tune affected scene visuals

For Scenes 10, 13, and 14 (the ones being extended): check whether any
animation currently timed against the *old* fixed duration (e.g. a
`windowOpacity` fade-out anchored to the previous `closingEnd`) needs its
timing constant adjusted so it doesn't fire too early now that the scene is
longer. Do not redesign these scenes' visuals — only adjust timing constants
so existing animations still land correctly against the new, longer window.

## Step 5 — Verify

- `npm run typecheck`
- `npm run compositions` — report the new total episode duration (previously
  6330 frames / 211.00s with author-estimated timing) now that EN duration is
  audio-derived.
- Render the full `Redis-EN` episode with narration to:
  ```
  renders/review/TASK-029/redis-en-with-narration.mp4
  ```
  per the established renders/review convention (kept, not deleted).
- Self-review specifically for narration/visual sync: does each scene's key
  visual beat (e.g. the "10 ms" reveal, the cache-hit/miss diagrams) land at
  roughly the right moment relative to what's being said, not just that the
  overall scene duration matches. Flag any scene where sync feels off even
  though duration matches.

## Step 6 — Update storyboard and decisions

- `storyboard/README.md`: note narration is now integrated (EN only),
  duration is audio-derived for EN, and DE/FR narration remains outstanding.
- `decisions.md`: add a note that DE/FR narration and audio-driven timing for
  those languages is deferred to a future task (per the original sequence's
  TASK-031 multilingual validation step), not silently forgotten.

## Step 7 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-029.md
```

Include: confirmation of the audio files used, the new audio-derived
duration vs. the old estimated one, which scenes' timing constants needed
adjustment in Step 4, the narration/visual sync self-review findings, and a
Human Review Request pointing at the rendered file from Step 5.

Do not proceed past Step 1 without confirming the narration audio actually
exists at the expected path.
