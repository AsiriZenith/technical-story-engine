# TASK-020C

## Why

Scene 11 (TASK-020/020A/020B) is human-approved — closing it out. Separately,
TASK-020B's regression check surfaced a pre-existing bug: DE/FR Scene 13's
planned window (`sharedWindow(14, 2, 'extend')` = 16s) is shorter than its
actual re-timed beats (re-timed to EN narration in TASK-029, running to
~24.7s, closing at 18.9s). DE/FR renders of Scene 13 are currently cut off
before their later beats. Scene 14 may have the same issue — check it too.
Fixing both now, before DE/FR narration exists, per the user's decision.

## Step 1 — Close out Scene 11

- `storyboard/scenes/scene-11-should-we-cache-everything.md`: mark the
  TASK-020A "pile" approach as **approved** (supersedes the TASK-020
  typography-only version, which stays as history). Update `Status` to
  "implemented, human-approved."
- `storyboard/README.md`: update Scene 11's row in the status table.

## Step 2 — Fix DE/FR Scene 13 window

- Confirm Scene 13's actual rendered length in DE/FR today (should match the
  ~24.7s/18.9s-close figure TASK-020B inferred from code — verify by
  rendering a late DE/FR Scene 13 still, e.g. near the 20s mark, to confirm
  it's currently blank/cut rather than assuming).
- Extend Scene 13's planned window in `scenes.ts` for DE/FR to safely cover
  the actual beat timing (e.g. `sharedWindow(25, 2, 'extend')` or whatever
  value covers the real ~24.7s content with margin — confirm the exact
  number against the real beat timings, don't guess).
- This only affects DE/FR (EN already uses audio-derived timing from
  TASK-029 and is unaffected).

## Step 3 — Check Scene 14 for the same issue

- Verify whether Scene 14's DE/FR planned window has the same mismatch
  against its TASK-026/029 actual beat timing. If yes, fix the same way as
  Step 2. If no, state that explicitly in feedback — don't skip the check.

## Step 4 — Verify

- `npm run typecheck`
- `npm run compositions` — report new DE/FR total durations.
- Render DE and FR stills at Scene 13's (and Scene 14's, if fixed) latest
  beats to confirm they're no longer cut off.
- Re-render the Scene 12/13 regression stills from TASK-020B
  (`regress-{DE,FR}-scene12-open.png`, `regress-{DE,FR}-scene13-open.png`)
  to confirm the Scene 11 timing shift + this window fix don't conflict.

## Step 5 — Update decisions.md

Add an entry documenting: the bug found, that it was pre-existing (not
caused by Scene 11's changes), and that it's now fixed for DE/FR's current
(author-estimated) timing — noting this will need re-verification once real
DE/FR narration exists and those scenes get their own audio-derived timing
pass (per the original TASK-031 multilingual validation step).

## Step 6 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-020C.md
```

Include: Scene 11 closure confirmation, the exact window values changed for
Scene 13 (and 14 if applicable), before/after stills proving the cutoff is
fixed, and new composition durations for all three languages.
