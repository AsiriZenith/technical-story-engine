# TASK-025a: Establish Storyboard Structure (Episode 001-redis)

## Why

Scene context has been living in chat conversations and one growing status doc
(`REDIS_EPISODE_PRODUCTION_STATUS.md`). Going forward, every task should
reference a durable, per-scene file on disk instead. This task creates that
structure for episode `001-redis` and establishes the convention for all
future episodes.

This is an organizational task — do not change any Remotion component code.

## Step 1 — Create the folder structure

```
src/episodes/001-redis/storyboard/
  README.md
  scenes/
    scene-01-mystery.md
    scene-02-latency-breakdown.md
    scene-03-misconception.md
    scene-04-request-path-before-redis.md
    scene-05-restaurant-analogy.md
    scene-06-ready-shelf-analogy.md
    scene-07-analogy-to-architecture.md
    scene-08-cache-miss.md
    scene-09-cache-hit.md
    scene-10-why-redis-fast.md
    scene-11-should-we-cache-everything.md
    scene-12-<derive-name-from-scenes.ts>.md
    scene-13-<derive-name-from-scenes.ts>.md
    scene-14-final-mental-model.md
  decisions.md
```

Confirm actual scene names/order against `src/episodes/001-redis/scenes.ts`
(the typed source of truth) rather than only this task file, in case they've
diverged.

## Step 2 — Populate each scene file

Use this fixed template for every file in `scenes/`, so all scenes (this
episode and future ones) stay structurally consistent:

```markdown
# Scene NN — <Title>

## Purpose
What this scene needs to communicate, in one or two sentences.

## Narrative Beat
The specific content/flow of this scene (dialogue points, example numbers,
diagram flow, etc.)

## Status
Implementation status + review status (e.g. "Implemented, human approved" /
"Not yet implemented").

## Visual Approach
Key visual decisions (e.g. "uses SpotlightImage on the Scene 07 architecture
asset", "TimingBar for latency breakdown").

## Assets Used
Which entries from `assets.ts` this scene depends on.

## Known Issues
Any scene-specific technical debt or open questions (leave empty if none).

## Review Notes
Anything a reviewer should know before approving changes to this scene.
```

Populate each file using the detailed per-scene content already written in
`REDIS_EPISODE_PRODUCTION_STATUS.md` Section 4 ("Scene-by-Scene Status") —
that section already has purpose, status, and important notes per scene;
this step is mostly restructuring that content into individual files, not
inventing new content. For `scene-14-final-mental-model.md`, since it's not
yet implemented, fill in only Purpose/Narrative Beat as currently planned and
mark Status as "Not yet implemented."

## Step 3 — Write the episode index (`storyboard/README.md`)

Include:
- Episode goal and core thesis (from `REDIS_EPISODE_PRODUCTION_STATUS.md`
  Section 2)
- A status table listing all 14 scenes with a one-line status each and a
  relative link to that scene's file in `scenes/`
- Current overall episode status summary (implementation %, what phase the
  episode is in)

## Step 4 — Write the open-decisions log (`storyboard/decisions.md`)

Extract the known open issues from `REDIS_EPISODE_PRODUCTION_STATUS.md`
Section 11, e.g.:
- The baked "~10 ms" text in the Scene 07 architecture image vs. the
  episode's established "~8 ms" example — not yet resolved, needs a decision
  (relabel the example vs. replace/correct the image)
- The `SpotlightImage` radial-gradient mask-math issue — explicitly **do not
  fix globally** during normal scene work; multiple approved scenes are tuned
  around current behavior; any fix must be a dedicated task with regression
  checks against Scenes 04, 07, 08, 09, 10
- Scene 13's closing-frame ambient labels (partially visible vs. fully
  visible vs. fully hidden) — needs a human design decision

Each entry should note: what the issue is, why it hasn't been fixed yet (if
applicable), and what would need to happen to resolve it.

## Step 5 — Document the convention going forward

Add a short section to `AGENTS.md` (or `docs/production-architecture.md`,
whichever already holds process conventions) stating:

- Every episode has a `storyboard/` folder following this structure.
- Every task/spec working on a specific scene must reference its
  `storyboard/scenes/scene-NN-*.md` file.
- The `storyboard/README.md` and `decisions.md` should be updated whenever a
  scene's status changes or a new open decision is identified — this replaces
  maintaining one large growing status document per episode.

## Do not

- Do not modify any `.tsx` scene components.
- Do not resolve any of the open decisions logged in `decisions.md` — this
  task only records them.
- Do not delete `REDIS_EPISODE_PRODUCTION_STATUS.md` yet — leave it in place
  until the new structure is confirmed to cover everything needed.
