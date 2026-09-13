# TASK-006A Feedback — Remove Development Scene Caption from Production Output

## 1. Summary

The `Scene 02 · 17s` text came from a hardcoded, unconditional `<div>` at the bottom-left of `src/episodes/001-redis/scenes/Scene02LatencyBreakdown.tsx` (added during TASK-006 as a leftover-from-development duration indicator, mirroring an identical element already present in `Scene01Mystery.tsx` since TASK-005). Neither element was ever gated — both scene components always rendered their caption whenever the scene rendered at all, including in the production `Redis-EN`/`Redis-DE`/`Redis-FR` compositions, since `RedisEpisode.tsx` is the only place either scene is used.

Fix: added an optional `debug?: boolean` prop (default `false`) to both `Scene01MysteryProps` and `Scene02LatencyBreakdownProps`, and wrapped each caption `<div>` in `{debug ? (...) : null}`. `RedisEpisode.tsx` — the component backing all three production compositions — does not pass `debug` to either scene, so both captions are now absent from production by default. The mechanism (the caption markup and its duration-calculation logic) was kept, not deleted, per the task's preference for gating over deleting useful tooling; a future DEV composition that wants the debug caption can pass `debug` explicitly.

No other visual, timing, layout, animation, localization, or architecture change was made. Scene 03 was not started.

## 2. Production Verification

Both production scene components had the same pattern:

- `Scene01Mystery.tsx` — unconditional `Scene 01 · {Ns}` caption (present since TASK-005).
- `Scene02LatencyBreakdown.tsx` — unconditional `Scene 02 · {Ns}` caption (present since TASK-006; this is the one human review flagged).

Both are now gated behind the same `debug` prop and default to hidden. Grepped the full `src/` tree for the caption pattern (`Scene 0\d · `) after the fix — the only remaining occurrences are inside the now-conditional JSX blocks themselves, not anywhere unconditional. No other scene, wrapper, or DEV composition renders an equivalent development label; `RedisEpisode.tsx` is the sole consumer of both scene components and passes neither `debug` prop, so `Redis-EN`, `Redis-DE`, and `Redis-FR` never render either caption. No shared wrapper (`AbsoluteFill`, layout, etc.) injects any similar label.

## 3. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-006a/scene-02-clean.png`

Type:
PNG

Purpose:
Confirm the `Scene 02 · 17s` caption is gone and nothing else in the frame changed.

What to review:
- Bottom-left corner is empty (no development caption).
- Everything else — timing bar, database-work emphasis, takeaway line, typography, colors — matches the previously reviewed Scene 02 mid/end state exactly.

Agent assessment:
PASS

Known issues:
- None.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-006a/scene-02-preview.mp4`

Type:
MP4

Purpose:
Confirm the caption is absent throughout the full 17-second Scene 02 playback, not just at one still frame.

What to review:
- No `Scene 02 · Ns` text appears at any point during playback.
- Motion, pacing, and visuals are otherwise identical to the TASK-006 preview.

Agent assessment:
PASS

Known issues:
- No narration/audio, as before (unchanged from TASK-006, not a new issue introduced by this task).

Human review status:
PENDING

Please confirm:
1. `Scene 02 · 17s` is gone.
2. No other development/debug scene-duration label appears.
3. Everything else remains visually unchanged.

## 4. External Asset Requests

None.

## 5. Verification Results

- TypeScript: **PASS**
- Build: **PASS**
- Composition discovery: **PASS**
- Scene validation: **PASS** (runs inside `validateEpisodeArchitecture` during module load, exercised by typecheck/build/compositions)
- Asset validation: **PASS** (same mechanism; no asset IDs changed)
- Redis-EN: **PASS** — 1170 frames (39.00 s), unchanged
- Redis-DE: **PASS** — 1170 frames, unchanged
- Redis-FR: **PASS** — 1170 frames, unchanged
- Cleaned PNG (`scene-02-clean.png`): **PASS** — caption absent, rest of frame unchanged
- Cleaned MP4 (`scene-02-preview.mp4`): **PASS** — H.264, 1920×1080, 30 fps, 17.000 seconds; caption absent throughout
- Combined Scene 01 → Scene 02 boundary check: **PASS** — inspected the last rendered frame of Scene 01 (global frame 659) and the first frame of Scene 02 (global frame 660) in the full `Redis-EN` composition; neither `Scene 01 · 22s` nor `Scene 02 · 17s` appears at the boundary or anywhere else in production output

## 6. Git Status

- Branch: `master`.
- Modified tracked files (all pre-existing changes from TASK-006, this task added `debug` gating to two of them): `src/episodes/001-redis/scenes/Scene01Mystery.tsx` (debug-gated caption), `src/episodes/001-redis/RedisEpisode.tsx`, `src/episodes/001-redis/episode.config.ts`, `src/episodes/001-redis/scenes.ts`, `src/shared/localization/index.ts` (unchanged by this task, still pending commit from TASK-006).
- Untracked files: `src/episodes/001-redis/scenes/Scene02LatencyBreakdown.tsx` (debug-gated caption), `src/shared/components/TimingBar.tsx`, `tasks/TASK-006.md`, `tasks/TASK-006A.md`, `feedbacks/task-006-feedback.md`, `feedbacks/task-006a-feedback.md`.
- Unexpected binaries: none.
- Ignored review media: all files under `renders/review/task-006a/` are matched by `renders/*` in `.gitignore`.
- Commits created or pushed: none.

## 7. Final Status

TASK-006A STATUS: PASS
