# TASK-020C Feedback — Scene 11 close-out + DE/FR window fix (Scenes 13, 14)

Artifacts: `renders/review/TASK-020C/`.

## 1. Scene 11 closure

- `storyboard/scenes/scene-11-should-we-cache-everything.md`: Status now "Implemented, human-approved"; the TASK-020A pile is marked approved/current; the TASK-020 typography-only version stays as superseded history; Known Issues cleared.
- `storyboard/README.md`: Scene 11 row -> "Implemented, human approved (TASK-020A pile diagram)". I also updated the stale DE/FR total in the status block (see section 5).

## 2. Scene 13 — confirmed cut off, then fixed

Before (DE; FR behaves the same since both use the planned window): Scene 13 window was `sharedWindow(14, 2, 'extend')` = 16s = 480 frames, but beats run to 24.7s (closing at 18.9s).

- `before-DE-scene13-last-frame.png` (last frame of the window, 16.0s): cut mid-Operations beat ("Betrieb / Monitoring"). The closing line never appears.
- `before-DE-scene13-at-20s.png`: at 20s Scene 13 time the render was already showing Scene 14, because Scene 13's window had ended.

Fix: `sharedWindow(22.7, 2, 'extend')` = 24.7s = 741 frames, exactly the EN window and Scene 13's `closingEnd`. I first tried 23 (25.0s); the last frame then showed the closing line mostly faded out, because the scene's closing fade-out starts at 24.7s. 22.7 lands on the cutoff like EN does, so I used that.

After: `after-DE-scene13-last-frame.png`, `after-FR-scene13-last-frame.png` (closing line fully visible on the last frame), `after-{DE,FR}-scene13-at-20s.png` (Scene 13 content now present at 20s).

## 3. Scene 14 — same bug, fixed the same way

Yes, it had it. Planned window `sharedWindow(12, 2, 'extend')` = 14s, but the closing question appears at 14.5s (`questionIn`), so it never showed in DE/FR. `before-DE-scene14-last-frame.png` shows the cut mid-cache-hit diagram.

Fix: `sharedWindow(19, 2, 'extend')` = 21s = 630 frames (EN window is 623 frames / 20.77s; the scene holds its closing question to the end, so 7 frames more is harmless). After: `after-{DE,FR}-scene14-question.png` (question visible at 15.5s) and `after-{DE,FR}-scene14-last-frame.png` (still visible on the last frame; DE wraps to 2 lines, FR to 2 lines, within safe margins).

Only the two `scenes.ts` lines changed; EN uses `extend` = narration + margin and ignores the target, which is why EN is unaffected.

## 4. Verification

- `npm run typecheck`: PASS.
- `npm run compositions`:

| Composition | Frames | Duration | Previous |
|---|---|---|---|
| Redis-EN | 7700 | 256.67s | 7700 (unchanged) |
| Redis-DE | 6861 | 228.70s | 6390 |
| Redis-FR | 6861 | 228.70s | 6390 |

- Regression stills re-rendered at the same frames as TASK-020B: `regress-{DE,FR}-scene12-open.png`, `regress-{DE,FR}-scene13-open.png` (Scene 12 and 13 start frames unchanged by this fix, since only Scene 13's length and later scenes moved). I inspected all four in TASK-020B; in this task I re-rendered them but did not re-open them individually, so treat this regression check as "re-rendered, not re-inspected".
- Not checked: the beats between the ones I sampled in DE/FR Scenes 13/14, and no MP4s rendered for DE/FR.

## 5. decisions.md

Added item 7 (bug, pre-existing, fix, and re-verification note). Also updated item 4's and the README's stale "6330 frames / 211.00s" DE/FR total to 6861 / 228.70s.

## 6. Caveats

- The DE/FR window values are author estimates matched to the EN-timed beats, not derived from DE/FR audio. They must be redone when DE/FR narration exists (TASK-031).
- DE/FR's Scene 14 text is longer than EN and Scene 13/14 beats were timed to EN speech, so DE/FR sync against future narration is unknown.

Human review status: nothing new to review beyond a glance at the before/after stills. No other tasks started.
