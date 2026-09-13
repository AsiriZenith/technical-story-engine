# TASK-006 Feedback — Production Scene 02: Where the 180 ms Comes From

## 1. Summary

Implemented Scene 02 for episode `001-redis`: a 17-second silent-first scene that carries over the `180 ms` result from the approved Scene 01, asks "Where did the 180 ms go?", and reveals an illustrative latency breakdown (request 5 ms, DB/network 8 ms, database work 155 ms, serialization 5 ms, other 7 ms) as a single proportional timing bar. The database-work segment is the overwhelming visual majority of the bar and receives an additional emphasis pass (grows, brightens, other segments recede) before the scene ends on "Most of the time is spent doing database work." Cache hit/miss and the restaurant analogy are not introduced. Scene 01 and Scene 02 now play back-to-back in the same `Redis-EN/DE/FR` compositions via `<Sequence>`. Scene 03 was not started.

## 2. Preconditions

```text
TASK-005A baseline: PASS
Git clean baseline: PASS
```

`git status --short` showed only the new `tasks/TASK-006.md` before implementation began; `git log --oneline -5` showed `bc72ee4 feat: approve Scene 01 Redis mystery` at HEAD, confirming the approved Scene 01 baseline was committed.

## 3. Scene Implementation

### Component structure
- `src/episodes/001-redis/scenes/Scene02LatencyBreakdown.tsx` — the isolated Scene 02 component (`{language, durationInFrames}` props), independent of Scene 01's internals.
- `src/shared/components/TimingBar.tsx` — a new reusable presentational component. It lays out segments with widths strictly proportional to `valueMs / totalMs` (no distortion), renders an inline label+value for any segment wide enough to hold text, and renders a floating "callout" label with a leader line above the bar for segments driven by a caller-supplied `calloutOpacity`. All animation curves (reveal opacity, emphasis scale, callout timing) are computed by the scene and passed in as plain per-segment values — the component itself holds no motion logic, matching how `Scene01Mystery`'s `SceneNode` is driven by its scene.
- `src/episodes/001-redis/RedisEpisode.tsx` now renders `<Sequence>` wrappers for both scenes, using `scene01Window`/`scene02Window` (newly exported from `episode.config.ts`) so the timeline math lives in one place.

### Integration decision (scenes.ts)
TASK-006's Part B content (the exact 5/8/155/5/7 ms illustrative breakdown) matches the story data already captured under scene id `09-latency-breakdown` in `scenes.ts`, not the id originally in position 2 (`02-database-speed-misconception`). Since TASK-006 explicitly specifies this content as "Scene 02" and explicitly forbids the cache-hit/removal beats that scene's original story text carried (`Remove the expensive database-work portion`, `Cache hit result: approximately 8 ms` — content that belongs to the *later* cache-hit scene), I moved that scene definition to array position 2, renamed it `02-latency-breakdown`, rewrote its `purpose`/`storyBeats` to match what is actually implemented now (pre-Redis path + "database work dominates," no cache-hit resolution), and renumbered the scenes that shifted (`order` 2–8 → 3–9, ids renamed to match) so `id`'s numeric prefix keeps matching `order`. Scenes 10–14 were untouched. `validateEpisodeArchitecture` still requires exactly 14 scenes with `order === index + 1`; this passes. No other scene's content was changed.

### Duration
`durationStrategy: sharedWindow(15, 2)` → 17 seconds (510 frames at 30 fps), within the requested 16–22 s range and unchanged from the original scene-9 definition.

### Timing-bar implementation
Segment widths are pure linear proportions of the bar's pixel width (1680 px, matching Scene 01's safe-margin span) against `valueMs`/180. No proportional distortion was needed to keep the 155 ms segment dominant (it renders at ~86% of the bar width); the four small segments (28–75 px each) are too narrow for inline text, so each gets a single floating callout label revealed one at a time in its own ~0.9 s slot (per Part F's "reveal one label at a time" suggestion), avoiding overlapping labels entirely rather than compressing or renormalizing the scale.

### Localization handling
Added new `translate()` keys (`latencyQuestion`, `illustrativeBreakdown`, `dbNetwork`, `databaseWork`, `serialization`, `other`, `latencyTakeaway`) for `en`/`de`/`fr`; the existing `request` and `beforeRedis` keys are reused for the "Request" segment label and the carried-over "Before Redis / 180 ms" anchor, avoiding duplicate near-identical keys. All timing values (`5`, `8`, `155`, `5`, `7`, `180`) are identical across languages — only labels are translated.

### Reusability
`TimingBar` takes generic `{id, label, valueMs, color, textColor?, opacity?, emphasisScale?, calloutOpacity?}` segments and a `totalMs`/`widthPx`, with no Scene-02-specific assumptions baked in. It is intended for reuse by the later cache-hit scene (now id `09-cache-hit`) to show the same shape of comparison against an 8 ms result, as noted in `scenes.ts`'s `visualNotes` for `02-latency-breakdown`.

## 4. Technical Story

The scene never claims the 5/8/155/5/7 ms split is universal: a persistent "Illustrative breakdown" label sits above the bar for the entire time it's visible, and the question that opens the scene ("Where did the 180 ms go?") is phrased about *this* example, tying back to Scene 01's specific `GET /users/42` number rather than making a general claim. The single takeaway line ("Most of the time is spent doing database work.") states the qualitative lesson (database work dominates) rather than repeating the exact figures as if they were a universal constant. Cache hit/miss is not mentioned; the scene stops at "this is why 180 ms happens," setting up but not answering what Redis changes.

## 5. Motion

- Presets reused: `motionPresets.enterSoft` (0.7 s fades for the carried-over anchor, headline, bar container, segment reveals, takeaway) and the same `Easing.bezier(0.16, 1, 0.3, 1)` easing curve used throughout Scene 01.
- **Segment reveal**: the 5 segments fill in sequentially, one per ~0.9 s slot (4.0 s–8.3 s), each with its own callout label appearing and fading within its slot so only one label is ever on screen — no simultaneous/overlapping labels, no stagger-bounce.
- **Database-work emphasis** (8.6 s–9.6 s): the database-work segment scales up vertically (`scaleY` from bottom, +18%) and its inline label stays fully opaque, while the four small segments recede to ~55% opacity (they dim, they do not vanish, keeping the full picture visible).
- **Final hold**: the takeaway line fades in at 10.0 s and holds through the end of the 17 s scene (~6.3 s hold), matching Scene 01's restrained, no-bounce, no-camera-movement motion vocabulary. The question headline also recedes to ~55% opacity once the bar appears, so it doesn't compete with the timing bar for attention without disappearing entirely.

## 6. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-006/scene-02-start.png`

Type:
PNG

Purpose:
Review the carried-over 180 ms result and the opening question before the bar appears.

What to review:
- Whether the carry-over from Scene 01 reads clearly as a continuation, not a new unrelated number.
- Typography scale, focal order, and safe margins.

Agent assessment:
PASS

Known issues:
- None.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-006/scene-02-mid.png`

Type:
PNG

Purpose:
Review the full timing breakdown once all five segments have revealed, before emphasis.

What to review:
- Whether the 180 ms breakdown is immediately understandable at a glance.
- Whether the database-work segment already reads as dominant here.
- Whether the small-segment callout label (captured mid-reveal for "Other") is readable and doesn't collide with the "Illustrative breakdown" caption.

Agent assessment:
PASS

Known issues:
- An earlier render had the "Illustrative breakdown" caption overlapping the active callout label; this was found and fixed during agent QA by moving the caption above the callout zone before final rendering (see Section 12).

Human review status:
PENDING

### Review Request 3

Artifact:
`renders/review/task-006/scene-02-end.png`

Type:
PNG

Purpose:
Review the database-work emphasis state and the final takeaway line together.

What to review:
- Whether the database-work segment's growth/emphasis reads as a deliberate highlight rather than a glitch.
- Whether the small segments receding (not vanishing) still lets the viewer see the full picture.
- Whether "Most of the time is spent doing database work." is memorable and lands as the scene's takeaway.
- Whether the scene feels technical rather than like a generic business chart.

Agent assessment:
PASS

Known issues:
- None.

Human review status:
PENDING

### Review Request 4

Artifact:
`renders/review/task-006/scene-02-mid-de.png`

Type:
PNG

Purpose:
Check German localization pressure on the mid-breakdown state (`DATENBANKARBEIT` is the longest inline segment label used in this scene).

What to review:
- Whether `DATENBANKARBEIT` fits inside the database-work segment without wrapping or clipping.
- Whether `Wohin gehen die 180 ms?` and the other German labels fit safely.

Agent assessment:
PASS

Known issues:
- None; `DATENBANKARBEIT` fits on one line with margin to spare inside the ~1447 px segment.

Human review status:
PENDING

### Review Request 5

Artifact:
`renders/review/task-006/scene-02-mid-fr.png`

Type:
PNG

Purpose:
Check French localization pressure, notably the long `TRAVAIL DE LA BASE DE DONNÉES` inline label and the question line with its trailing "?" spacing.

What to review:
- Whether `TRAVAIL DE LA BASE DE DONNÉES` fits inside the database-work segment without wrapping.
- Whether `Où sont passées les 180 ms ?` fits without wrapping or crowding safe margins.

Agent assessment:
PASS

Known issues:
- None; both fit on a single line at the current font sizes.

Human review status:
PENDING

### Review Request 6

Artifact:
`renders/review/task-006/scene-02-preview.mp4`

Type:
MP4

Purpose:
Review the complete 17-second Scene 02 progression in motion.

What to review:
- Whether segment-reveal pacing (one segment every ~0.9 s) feels too slow, too fast, or too busy.
- Whether the sequential single-callout labels are easy to read as they appear/disappear.
- Whether the database-work emphasis timing (starting at 8.6 s) lands at the right moment relative to the reveal.
- Whether the final takeaway hold (~6.3 s) is long enough to read comfortably.
- Whether the scene feels consistent with Scene 01's vibe and motion restraint.

Agent assessment:
PASS WITH ISSUES

Known issues:
- No narration or audio, so the 17 s pacing is provisional, as with Scene 01.
- Continuous GUI playback was unavailable in this environment; agent QA used the successful H.264 encode, ffprobe stream metadata (1920×1080, 30 fps, 17.000 s), and individually rendered stills/frames at each named beat to verify the motion sequence, rather than watching continuous playback.
- This file contains only Scene 02's own 510 frames (rendered via `--frames=660-1169` against the full `Redis-EN` composition) so the review artifact matches its name; the full two-scene composition (Scene 01 + Scene 02, 1170 frames / 39 s) was also rendered and spot-checked at the scene boundary during agent QA (frame 660) to confirm the cut and the "Scene 02 · 17s" caption are correct when embedded, but that combined file was not kept as a named review artifact since it wasn't requested by Part L.

Human review status:
PENDING

## 7. External Asset Requests

None.

## 8. Agent Visual QA

- `scene-02-start.png` — **PASS**: carried-over 180 ms anchor and question headline are clear, correctly positioned, inside safe margins.
- `scene-02-mid.png` — **PASS**: all five segments visible, database-work segment unmistakably dominant, callout label readable and no longer overlapping the illustrative-breakdown caption after the fix.
- `scene-02-end.png` — **PASS**: database-work segment visibly emphasized (taller, still gold, still legible), other segments recede but remain visible, takeaway line reads cleanly.
- `scene-02-mid-de.png` — **PASS**: German labels fit without clipping; longest label (`DATENBANKARBEIT`) stays on one line.
- `scene-02-mid-fr.png` — **PASS**: French labels fit without clipping; longest label (`TRAVAIL DE LA BASE DE DONNÉES`) stays on one line.
- `scene-02-preview.mp4` — **PASS WITH ISSUES**: correct duration/resolution/framerate; segment reveal, callout sequencing, and emphasis all confirmed via extracted frames; no continuous-playback judgment available in this environment (see Review Request 6).

## 9. Review Artifacts

- `renders/review/task-006/scene-02-start.png` — Redis-EN, scene-local frame 78 (1.30s / global frame 738), carry-over + question before the bar.
- `renders/review/task-006/scene-02-mid.png` — Redis-EN, scene-local frame 246 (8.20s / global frame 906), full breakdown revealed.
- `renders/review/task-006/scene-02-end.png` — Redis-EN, scene-local frame 360 (12.00s / global frame 1020), database-work emphasis + takeaway.
- `renders/review/task-006/scene-02-mid-de.png` — Redis-DE, same mid frame, German localization check.
- `renders/review/task-006/scene-02-mid-fr.png` — Redis-FR, same mid frame, French localization check.
- `renders/review/task-006/scene-02-preview.mp4` — Redis-EN, Scene 02's own 17-second range (frames 660–1169 of the full composition).

## 10. Commands Executed

```text
git status --short
git log --oneline -5
npm.cmd run typecheck
npm.cmd run build
npm.cmd run compositions
npx.cmd remotion still src/index.ts Redis-<LANGUAGE> <artifact> --frame=<frame> --overwrite
npx.cmd remotion render src/index.ts Redis-EN renders/review/task-006/scene-02-preview.mp4 --codec=h264 --frames=660-1169 --overwrite
npx.cmd remotion render src/index.ts Redis-EN renders/review/task-006/redis-en-full.mp4 --codec=h264 --overwrite   (boundary QA only, deleted afterward)
npx.cmd remotion ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration,codec_name -of default=noprint_wrappers=1 <mp4>
npx.cmd remotion ffmpeg -ss <timestamp> -i <mp4> -frames:v 1 -y <sample.png>
git check-ignore -v <review media>
```

## 11. Verification Results

- TypeScript: **PASS**
- Build: **PASS**
- Composition discovery: **PASS**
- Scene validation: **PASS** (runs inside `validateEpisodeArchitecture` during module load, exercised by typecheck/build/compositions; confirms 14 scenes, sequential `order`, unique ids)
- Asset validation: **PASS** (same mechanism; no new asset IDs introduced)
- Redis-EN: **PASS** — 1170 frames (39.00 s), both scenes sequenced correctly
- Redis-DE: **PASS** — 1170 frames, same shared implementation; mid-breakdown frame inspected
- Redis-FR: **PASS** — 1170 frames, same shared implementation; mid-breakdown frame inspected
- Scene 02 start still: **PASS**
- Scene 02 mid still: **PASS**
- Scene 02 end still: **PASS**
- Scene 02 MP4: **PASS** — H.264, 1920×1080, 30 fps, 17.000 seconds

## 12. Problems / Risks

- **Timing-bar readability**: no proportional distortion was applied — the 155 ms segment is ~86% of the true linear width, and the four small segments (28–75 px) are individually too narrow for inline text. This is handled via sequential external callout labels rather than compressing the scale, per Part E's guidance to prefer a "readable compromise" that doesn't distort the graphic; documenting it here as requested.
- **Localization pressure**: no clipping or forced wrapping was found for German or French at the frames inspected; `DATENBANKARBEIT` and `TRAVAIL DE LA BASE DE DONNÉES` both fit on one line inside the 155 ms segment because that segment is wide (~1447 px). A future copy change to any of the four small-segment labels would need to stay short enough for the callout bubble's `whiteSpace: 'nowrap'` styling, since those bubbles are not designed to wrap.
- **Proportion compromise**: none was needed for the dominant/small segment split itself; the only compromise made was moving small-segment text out of the bar entirely (external callouts) rather than shrinking font size to fit, which was the explicitly preferred approach in Part F.
- **Pacing**: 17 s is readable silently but, as with Scene 01, is provisional pending narration; the five sequential 0.9 s reveal slots plus emphasis and takeaway hold are the primary levers if a narration script needs more or less time.
- **Future narration timing**: the scene's five named beats (`carryIn`, `questionIn`, `barIn`, `segmentsStart`, `emphasizeIn`, `takeawayIn`) are all in scene-relative seconds, so retiming for narration only requires editing the `beats` object, not scene-timing plumbing.
- **Technical ambiguity**: intentionally left open per scope — the scene does not explain cache hit/miss or what Redis changes about this path; that remains for the later scenes (now `08-cache-miss` / `09-cache-hit`).
- **Reusable-component risk**: `TimingBar`'s callout-clamping (`calloutSafeMargin = 90`) and connector-line length (`90 - 58`) are tuned by inspection for this scene's specific segment count/widths; a future scene reusing it with very different segment counts or a narrower bar should re-verify callout placement visually rather than assuming the same constants hold.
- **Scene-order integration**: promoting the former `09-latency-breakdown` scene to position 2 (as `02-latency-breakdown`) and renumbering scenes 3–9 is a planning-data change, not an implementation change — no other scene's component code exists yet, so nothing downstream was broken, but a human reviewing `scenes.ts` history should be aware the "Scene 02" implemented here is not the scene that was originally listed second in the 14-scene outline.

## 13. Recommended Next Task

```text
If Scene 02 is approved:
→ proceed to the next scene according to the episode plan (now id '03-database-speed-misconception', order 3).

If revisions are required:
→ revise Scene 02 first and rerender its review artifacts before proceeding.
```

## 14. Git Status

- Branch: `master`.
- Modified tracked files: `src/episodes/001-redis/RedisEpisode.tsx`, `src/episodes/001-redis/episode.config.ts`, `src/episodes/001-redis/scenes.ts`, `src/episodes/001-redis/scenes/Scene01Mystery.tsx` (scene-duration prop fix only, no visual/motion change), `src/shared/localization/index.ts`.
- Untracked files: `src/episodes/001-redis/scenes/Scene02LatencyBreakdown.tsx`, `src/shared/components/TimingBar.tsx`, `tasks/TASK-006.md`, `feedbacks/task-006-feedback.md`.
- Unexpected binaries: none.
- Ignored review media: all files under `renders/review/task-006/` are matched by `renders/*` in `.gitignore`.
- Commits created or pushed: none.

## 15. Final Status

TASK-006 STATUS: PASS
