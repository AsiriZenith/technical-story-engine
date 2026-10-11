# TASK-029 (revised — single-file narration)

## Why

Script is approved (`narration/script.md`). Voice tool: Descript. The user
generated **one continuous narration audio file for the whole episode**,
not per-scene clips — Descript's export doesn't support per-scene splitting
cost-effectively. This supersedes the original TASK-029, which assumed
per-scene files; that version was never executed, so this replaces it
outright, not a follow-up patch.

The file is at:

```
D:\my works\video-lab\technical-story-engine\src\episodes\001-redis\narration\audio\en\Redis-Accelerated API Latency Mystery.wav
```

## Step 1 — Normalize the filename and location

Rename/copy to a stable, script-safe filename (the current name has spaces
and is awkward to reference in code):

```
src/episodes/001-redis/narration/audio/en/episode-full.wav
```

Keep the original as-is if the user wants it preserved; copying rather than
moving is fine.

## Step 2 — Determine per-scene boundaries within the single file

Since there is one continuous file, each scene's start/end timestamp within
it must be derived, not assumed. Use word-level transcription + alignment:

1. Run a local transcription tool capable of word-level timestamps (e.g.
   `whisper` with `--word_timestamps True`, or `whisperx` if available) on
   `episode-full.wav`. Check what's already installed before adding a new
   dependency.
2. Align the transcript against `narration/script.md`'s per-scene text,
   matching each scene's known script text to a contiguous span of
   transcribed words, to determine each scene's **start time** and **end
   time** (in seconds) within the single file.
3. Write the result to a new file,
   `narration/audio/en/scene-boundaries.json`, as an array of
   `{ sceneId, startSeconds, endSeconds }` entries for all 14 scenes.
4. **Sanity-check this output before trusting it**: the sum of each scene's
   `(endSeconds - startSeconds)` should roughly match the per-scene word
   counts already estimated in TASK-028's feedback (~2.3 words/sec). Flag any
   scene whose derived duration looks implausible (e.g. off by more than
   ~30% from that estimate) rather than silently proceeding — alignment
   errors are the main risk in this approach.

If alignment confidence is low for any scene (ambiguous boundary, e.g. very
short transitional phrases), report this clearly in feedback rather than
guessing — the user can confirm/correct boundaries by ear if needed.

## Step 3 — Add audio-driven duration support

Same architectural goal as the original TASK-029, adapted for a single
source file:

- Add a helper (e.g. `shared/timing/audio-duration.ts`) that reads
  `scene-boundaries.json` and returns each scene's real narration duration
  (`endSeconds - startSeconds`), rather than using `getAudioDurationInSeconds`
  per-file (not applicable here, since there's one shared file).
- Introduce `calculateMetadata` on the `Redis-EN` composition so total
  duration is computed from the sum of real per-scene durations (from
  `scene-boundaries.json`) plus each scene's existing
  `localizationMarginSeconds`, replacing the author-estimated `targetSeconds`
  in `scenes.ts` for EN.
- Per the user's standing decision: Scenes 10, 13, and 14 extend to fit their
  real narration length. Other scenes use whichever is longer — existing
  visual `targetSeconds` or real narration length plus margin.
- Keep this EN-only; DE/FR continue using author-estimated timing until their
  own narration exists (do not break DE/FR compositions).

## Step 4 — Wire `<Audio>` into the episode (single-file approach)

- Add **one** `<Audio>` component for the whole `Redis-EN` composition
  (sourcing `episode-full.wav`), rather than one per scene — using
  `startFrom`/`endAt` (or trimming) is not even needed, since the single
  track plays continuously under the whole episode once scene durations are
  derived from it correctly in Step 3. The key correctness requirement: each
  scene's `<Sequence>` duration (from Step 3) must match that scene's actual
  span in the audio, so visuals and narration stay in sync as one continuous
  timeline — not click-track-synced per scene.
- Populate `episode.config.ts`'s `narrationTracks.en` with the single file
  path.

## Step 5 — Re-tune affected scene visuals

For Scenes 10, 13, and 14 (extended scenes): check whether any animation
timed against the old fixed duration needs its timing constant adjusted so
it doesn't fire too early against the new, longer window. Only adjust timing
constants — do not redesign visuals.

## Step 6 — Verify

- `npm run typecheck`
- `npm run compositions` — report new total EN duration (previously 6330
  frames / 211.00s with author-estimated timing).
- Render the full `Redis-EN` episode with narration to:
  ```
  renders/review/TASK-029/redis-en-with-narration.mp4
  ```
- Self-review for narration/visual sync, scene by scene: does each scene's
  key visual beat land at roughly the right moment relative to the derived
  audio boundaries. Explicitly flag any scene where Step 2's alignment looked
  uncertain, so the human reviewer knows where to listen most carefully.

## Step 7 — Update storyboard and decisions

- `storyboard/README.md`: narration integrated (EN only, single-file source),
  duration audio-derived for EN; DE/FR narration outstanding.
- `decisions.md`: note (a) DE/FR narration deferred to a future task, and
  (b) the episode now depends on `scene-boundaries.json` as a derived
  artifact — if the narration audio is ever re-recorded/re-exported, this
  file must be regenerated, since scene timing now depends on it.

## Step 8 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-029.md
```

Include: the derived scene boundaries (table of scene/start/end/duration),
any low-confidence alignments flagged, the new audio-derived total duration,
which scenes' timing constants needed adjustment, narration/visual sync
self-review findings per scene, and a Human Review Request pointing at the
rendered file — explicitly asking the user to listen for any audio/visual
desync, since that's the main risk this single-file approach introduces.
