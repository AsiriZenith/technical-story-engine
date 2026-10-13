# TASK-020B

## Why

TASK-020A implemented Option A ("the pile") for Scene 11 but stopped short of
the project's Human Media Review Gate: no MP4 was rendered, so the actual
motion (pile growth, stale-entry flip, tether-line draw-on, the beat-4
miss/hit sequence) has never been watched — only a handful of static stills.
Two side effects from the window change (11s → 13s) also need verification
before this goes to human review.

## Step 1 — Render full motion preview

Render `renders/review/TASK-020B/scene-11-preview.mp4` (Redis-EN) covering
Scene 11 in full, plus at least 1s of Scene 10's tail and Scene 12's head so
the cuts in/out can be checked too.

Self-review the motion specifically for the three open questions from
TASK-020A's feedback:
1. Is beat 4's composition bottom-heavy (empty upper half)? If so, propose
   and apply a minimal layout fix (e.g. vertically re-center the pile/node
   group) — do not redesign the beat.
2. Does beat 4's caption have enough on-screen time before the decision rule
   appears (TASK-020A flagged ~1.4s as possibly too short)? If it reads
   rushed, adjust timing slightly within the existing beat windows — do not
   change overall scene duration.
3. Does the beat-3 pile (entries stacking/overflowing a frame) read as too
   similar to Scene 13's `CapacityBar` fill? Render one side-by-side still
   (Scene 11 beat-3 peak vs. Scene 13's `CapacityBar` peak) for the human to
   judge directly rather than guessing.

## Step 2 — DE/FR regression check

The window change shifts every scene after Scene 11 later by ~2s in DE/FR
(EN is less affected since Scenes 10/13/14 already use audio-derived timing
per TASK-029; confirm whether EN shifted at all and report the actual
number, don't assume TASK-020A's "+2s" estimate is precise for EN).

- Run `npm run compositions` and report new total duration for all three
  `Redis-EN/DE/FR` compositions.
- Render regression stills for DE and FR at Scene 12's opening beat and
  Scene 13's opening beat (the two scenes immediately downstream) to confirm
  no caption overlap, clipping, or awkward timing introduced by the shift.
- If anything regresses, fix the minimal timing issue — do not redesign
  Scene 12/13.

## Step 3 — Fix stale Scene 12 reference

`Scene12StaleCache.tsx` / `scenes.ts`'s Scene 12 `visualNotes` still
reference "Scene 11's Option D" (the superseded typography-only approach).
Update to reflect Scene 11 is now the Option A pile/diagram treatment —
small wording fix only, no behavior change.

## Step 4 — Verify

- `npm run typecheck`
- `npm run compositions` (report alongside Step 2's findings)
- Confirm `renders/review/TASK-020B/` contains the full preview MP4, the
  beat-4 layout-fix before/after (if changed), the Scene 11-vs-13 comparison
  still, and the DE/FR regression stills.

## Step 5 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-020B.md
```

Structure as a Human Review Request (same format as prior scene tasks),
explicitly asking the human to judge:
- The full motion preview — does the pile/tether/miss sequence read clearly
  at real speed, now that it's not just stills?
- The Scene 11-vs-13 comparison still — does the pile feel visually distinct
  enough from Scene 13's capacity bar, or does it still front-run it?
- Whether the beat-4 layout and caption-timing fixes (if applied) resolved
  those two open questions.
- The DE/FR regression stills — anything that reads wrong after the timing
  shift.

Human review status: PENDING. Do not proceed to any other scene or task
until this comes back approved.
