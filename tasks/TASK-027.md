# TASK-027

## Why

All 14 scenes are now implemented and human-approved individually. Per the
recommended sequence, the next step is a full-episode review — watching
Scene 01 through Scene 14 as one continuous piece, not scene by scene, since
a scene can look right alone and still feel wrong in the full sequence.

This task also establishes a new standing convention: renders made for human
review should be preserved on disk, not deleted after the agent's own
self-review, so the human doesn't need to re-render anything to check the
work.

## Step 1 — Document the renders/review convention

Add a short section to `docs/agent-workflow.md` (wherever the existing
"Human Media Review Gate" is documented) stating:

- Any render produced specifically to support a Human Review Request must be
  saved under `renders/review/` and left in place — not deleted after the
  agent's own self-review, unlike ad-hoc verification stills used only to
  check the agent's own work during development (those may still be deleted
  as before).
- Suggested structure: `renders/review/<task-id>/` (e.g.
  `renders/review/TASK-027/`), containing the video/stills relevant to that
  task's Human Review Request.
- `renders/` is already gitignored, so this does not add anything to git —
  it's a local working folder for the human to check without re-rendering.
- Apply this from TASK-027 onward; earlier tasks' deleted renders don't need
  to be regenerated retroactively.

## Step 2 — Render the full episode

Render the complete `Redis-EN` composition (all 14 scenes, current runtime
~211s per TASK-026's verification) to:

```
D:\my works\video-lab\technical-story-engine\renders\review\TASK-027\redis-en-full.mp4
```

Also render DE and FR versions to the same folder if that's a quick addition
given the existing `render:de`/`render:fr` scripts; if it meaningfully slows
this task down, EN-only is fine for this pass — note which you did.

## Step 3 — Self-review the full sequence

Watch/inspect the full render yourself first and report on:

- Pacing across the whole episode — any scene that now feels too slow/fast
  next to its neighbors, even though it passed its own individual review.
- Transition quality between scenes — do cuts feel abrupt or well-paced.
- Repetitive visual patterns — e.g. does the SpotlightImage technique used in
  Scenes 07–10 start to feel repetitive by Scene 10, now seen back-to-back.
- Sudden style changes — the shift from Scenes 07–10's SpotlightImage
  approach to Scenes 11–13's fully-diagrammatic approach to Scene 14's node
  diagram; does this progression feel intentional or jarring.
- Caption timing and any overlapping/clipped text across scenes.
- The Scene 14 known issue (packet overlapping the Database node icon) —
  note whether it reads differently now, seen in context after Scene 13
  rather than in isolation.

## Step 4 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-027.md
```

Structure it as a Human Review Request (same format as TASK-026's feedback),
pointing at the saved render path from Step 2 rather than temporary deleted
stills. Include your own self-review findings from Step 3 as the "Agent
assessment" section, clearly separated from what needs the human's own eyes.

## Step 5 — Update storyboard

Update `storyboard/README.md`'s overall status to reflect the episode has
completed full-episode review (pending human confirmation) — this is a
different milestone than "all scenes implemented," which was already true
after TASK-026.
