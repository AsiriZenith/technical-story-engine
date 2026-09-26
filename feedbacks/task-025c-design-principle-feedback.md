# TASK-025c Feedback — Visual-First Design Principle + Scene 14 Option A Approval

This is a documentation/decision task. No `.tsx` files were written or modified, and Scene 14 was not implemented.

## Step 1 — `AGENTS.md`

Added a new "Visual-first design principle" section, placed directly before "Timing and localization" (after "Repository architecture," which contains the "Storyboard convention" subsection referenced by the task). Content follows the task description closely:
- Diagram/animation/visual-metaphor is the default; text-only is a fallback.
- Prefer whatever gives the viewer something to watch over whatever's fastest to build.
- Applies to future planning tasks: options presented should lean visual-first; text-only options are a deliberate low-effort fallback, not an equal peer.
- Explicitly names the cost trade-off (Scene 14 Option A vs. Option C) as accepted, not something to optimize away.

`CLAUDE.md` already points to `AGENTS.md` as the canonical shared file, so no separate pointer update was needed.

## Step 2 — `scene-14-final-mental-model.md`

- `Visual Approach` status changed from "proposed, pending approval" to **approved**.
- Recorded Option A (Scene 01 node/packet diagram bookend) as the approved direction, with the slow-path/fast-path/closing-question screen order spelled out.
- Noted the implementation pattern explicitly follows Scene 13's "re-implement a simplified local copy" precedent, not a shared-component extraction, and flagged that extraction as a separate, unscheduled cleanup item.
- Documented that `interpolate()` + `motionPresets.moveLinear` drives the packet motion, and explicitly left the `spring()` question out of scope for Scene 14 as currently scoped (it was tied to Option C's closing beat, which is not the approved direction).
- Left `Status` (implementation status, distinct from `Visual Approach` status) untouched — still "Not yet implemented," since TASK-026 (not this task) is the implementation task.
- Kept a reference to the rejected Options B/C and the feedback file, rather than deleting that history.

## Step 3 — Sequencing dependency

Added notes in two places (judgment call — used both rather than picking one, since they serve different readers):
- `scene-14-final-mental-model.md`'s "Review Notes" section: made explicit that Scene 13's human review is still outstanding as of this task, that approving Scene 14's visual approach does not clear that gate, and that TASK-026 must confirm the Scene 13 review outcome before implementation begins.
- `decisions.md` item 3 (the existing Scene 13 ambient-labels/review-gate entry): appended an "Update (TASK-025c)" note pointing at the Scene 14 approval and restating the same TASK-026 gate, so the open-decisions log stays the authoritative single source for this dependency.

## Judgment calls flagged

1. **Placement of the new AGENTS.md section** — the task said "near the Storyboard convention section" but that subsection lives inside "Repository architecture," which is a poor fit for a cross-cutting creative principle. Placed it as its own top-level section between "Repository architecture" and "Timing and localization" instead, closer to "Assets and visual communication" in spirit; linked to it from the Scene 14 file's `Visual Approach` header.
2. **Where to put the Step 3 sequencing note** — the task allowed either `decisions.md` or the Scene 14 file, "your judgment." Chose both (see above) since the Scene 14 file is where TASK-026 will look first, and `decisions.md` item 3 is already the canonical log entry for this exact gate — updating only one risked the other going stale.
3. Did not touch the Scene 14 `Status` field (implementation status) — only `Visual Approach`'s internal approval status changed, per the task's Step 2 wording.
