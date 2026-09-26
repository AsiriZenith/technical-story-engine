# TASK-025c: Establish Visual-First Design Principle + Approve Scene 14 Option A

## Why

Going forward, every scene across every episode should default to diagram-
and animation-driven explanation over text-only explanation. This is a
standing creative principle for the channel (audience is video/visual
learners), not a one-off decision for Scene 14. This task documents that
principle and locks in the already-decided direction for Scene 14.

This is a documentation/decision task. Do not implement Scene 14 in this
task — that is TASK-026.

## Step 1 — Add the design principle to AGENTS.md

Add a new section (near the "Storyboard convention" section added in
TASK-025a) titled something like "Visual-first design principle." State:

- Every scene should default to a diagram, animation, or visual metaphor
  over a text-only explanation. Text-only beats (like Option C considered
  for Scene 14) should be treated as a fallback, not the default choice.
- When multiple ways exist to explain a concept, prefer the one that gives
  the viewer something to *watch* — motion, spatial relationships, visual
  before/after contrast — over the one that's fastest to build.
- This applies to scene planning tasks going forward: when a planning task
  proposes options (as TASK-025b did for Scene 14), the options themselves
  should lean toward creative visual treatments first; a text-only option
  should only be included as a deliberate low-effort fallback, not presented
  as equally preferred.
- Note the trade-off this implies: visual-first scenes generally cost more
  implementation effort than text-only ones (as seen with Scene 14's Option A
  vs Option C). That's an accepted trade-off for this channel, not something
  to optimize away by defaulting to cheaper text-based scenes.

## Step 2 — Update the Scene 14 storyboard file

In `storyboard/scenes/scene-14-final-mental-model.md`, update `Visual
Approach`:

- Change status from "proposed, pending approval" to **approved**.
- Record the approved direction as **Option A**: rebuild a simplified version
  of Scene 01's Client/Application/Database/Redis node diagram, animating a
  request packet along the slow path (without caching) and then the fast
  path (cache hit), ending on the closing question — mirroring Scene 01 as
  a visual bookend.
- Note that this follows the same "re-implement a simplified local copy"
  pattern Scene 13 already used for its own node, rather than extracting a
  shared component (that extraction remains a separate, not-yet-scheduled
  cleanup item, not part of this task).
- Note that `interpolate()` is expected to drive the packet-motion animation
  (via `motionPresets.moveLinear`), consistent with the rest of the episode.
  Do not decide the `spring()` question here — that was tied to Option C's
  closing beat and does not apply to Option A as scoped; leave it out of
  Scene 14 unless a future task proposes it specifically for this scene's
  closing beat.

## Step 3 — Note the open sequencing dependency

Add a note (in `decisions.md` or directly in the Scene 14 file, your
judgment) that per TASK-025b's feedback, Scene 13's human review is still
outstanding and is meant to gate whether Scene 14 implementation proceeds.
TASK-026 should confirm that review outcome before implementation begins.

## Step 4 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\task-025c-design-principle-feedback.md
```

Confirm what was added/changed in `AGENTS.md` and the storyboard files, and
flag anything that needed a judgment call.
