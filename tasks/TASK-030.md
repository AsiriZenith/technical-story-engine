# TASK-030 (revised — music + ducking + accent SFX)

## Why

Narration (TASK-029) is integrated and approved. This is the last real
production task before full QA/final render: add background music with
ducking under narration, plus a small set of restrained accent sound effects
at key visual beats.

The user has supplied all four files:

```
src/episodes/001-redis/narration/audio/music/background.mp3
src/episodes/001-redis/narration/audio/sfx/pop.mp3
src/episodes/001-redis/narration/audio/sfx/click.mp3
src/episodes/001-redis/narration/audio/sfx/ding.mp3
```

Confirm all four exist before starting; if any are missing, stop and report
which, rather than proceeding with partial audio.

## Part A — Background music + ducking

### Step A1 — Wire `<Audio>` for music with ducking

- Add a second `<Audio>` track (alongside the existing narration `<Audio>`
  from TASK-029) in `RedisEpisode.tsx`, looped via `<Loop>` since the track
  is shorter than the episode (~256.67s EN).
- Implement ducking via `interpolate()` on the `<Audio>`'s `volume` prop:
  **lower during narration, higher during visual-only/narration-gap
  moments** (scene transitions, held visual beats with no speech) — using
  `scene-boundaries.json`'s narration timing to know when narration is
  actually playing. This is the exact behavior the user described; no
  design change from the original plan, just confirming the mapping:
  narration present -> duck down; narration silent -> music rises (still
  staying subtle, never competing for attention).
- Add fade-in at the episode start and fade-out at the end (one overall
  envelope, plus the ducking variation under narration).
- Keep resting/ducked volume levels conservative — can be tuned after human
  review.

## Part B — Accent sound effects (pop / click / ding)

### Step B1 — Select placements, with restraint

Per `AGENTS.md`'s general preference for restraint and the narration voice's
established calm/composed tone: **do not place a sound effect on every
animation beat.** Propose a short list of candidate placements (aim for
roughly 5-8 total across the whole 14-scene episode, not per-scene) using
this guide:

- **`click.mp3`** — discrete state changes: a node dimming/highlighting, a
  path switching to dashed (e.g. Scene 09/14's Database-gets-skipped
  moments, Scene 13's Resilience dim).
- **`pop.mp3`** — elements landing/appearing: a diagram element arriving
  (e.g. Scene 11's pile entries landing, Scene 13's `CapacityBar` fill
  completing a step, Scene 14's packet arriving at a node).
- **`ding.mp3`** — reserve for genuine payoff moments only, used **once or
  twice in the entire episode**, not per-scene (e.g. Scene 01's "10 ms"
  reveal, or Scene 14's closing question landing). This is the episode's
  rarest sound — if it's used more than twice, that's a sign it's being
  overused.

List the exact candidate placements (scene + beat + which sound) in
feedback for human approval — do not treat this list as final; implement it,
but flag it clearly as a first pass open to the human trimming or adding to
it.

### Step B2 — Implement

Add each accent sound as a short, non-looping `<Audio>` instance positioned
at its specific frame within the relevant scene's `<Sequence>` (scene-
relative timing, per the existing convention — not global frame literals).
Keep each accent at a modest volume relative to narration and music — it
should read as a subtle punctuation, not a jump-scare.

## Step C — Verify

- `npm run typecheck`
- `npm run compositions` — confirm duration unaffected.
- Render the full `Redis-EN` episode with narration + music + accents to:
  ```
  renders/review/TASK-030/redis-en-full-mix.mp4
  ```
- Self-review mechanically (the agent cannot listen, per the established
  limitation from TASK-020B/030's original scope — state this explicitly
  rather than claiming a mix-quality judgment was made):
  - Spot-check the ducking `interpolate()` values at 2-3 scene-transition
    frames to confirm they actually change as expected.
  - Confirm each accent SFX's computed start frame lands where intended
    (cross-check against the beat timing in the relevant scene file).
  - Confirm no console/render errors from the now-three-or-more concurrent
    `<Audio>` tracks.

## Step D — Update storyboard and decisions

- `storyboard/README.md`: note music, ducking, and accent SFX are
  integrated (EN only, matching narration's current scope).
- `decisions.md`: mark `audio-ducking` resolved; add a note that accent SFX
  placements are a first pass pending human approval and may be
  trimmed/expanded.

## Step E — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-030.md
```

Include: the music ducking implementation and volume values used, the full
list of accent SFX candidate placements (scene/beat/sound/reason), the
mechanical verification results, and a Human Review Request explicitly
asking the user to listen for:
- Music level relative to narration (too loud/competing, or appropriately
  subtle).
- Whether ducking transitions sound smooth vs. abrupt.
- Whether each accent placement lands well and reads as a nice touch rather
  than a distraction — call out specifically whether the `ding` placements
  feel special (used sparingly) or overused.
- Whether any additional beats deserve an accent, or any proposed ones
  should be cut.

Human review status: PENDING.
