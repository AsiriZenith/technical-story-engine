# TASK-020B Feedback — Scene 11 motion preview, layout/timing fixes, DE/FR regression

Artifacts are in `renders/review/TASK-020B/`.

## 1. What changed

| File | Change |
|---|---|
| `Scene11CacheEverything.tsx` | Beat 4: node, database and lanes glide up 170px (`stageShift`, `interpolate()`, 9.1–9.75s) as the pile retires. Beat-4 caption window `sortOut` 10.8 -> 11.2s; `decisionRuleIn` 11.1 -> 11.4s. Scene duration unchanged. |
| `scenes.ts` (Scene 12 `visualNotes`), `Scene12StaleCache.tsx` (header comment) | Removed "Scene 11's Option D" wording; now says Scene 11 is the TASK-020A pile diagram. No behavior change. The `Option D from TASK-021` label in Scene 12's own comment is Scene 12's own option and was left alone. |

## 2. Self-review of the three open questions

**Limit of this review:** I cannot play video. The MP4 was rendered, but my assessment of motion comes from stills at several frames of it (beat-4 start/mid-shift/end, caption, rule crossfade), not from watching it at speed.

1. **Beat 4 bottom-heavy?** Yes (node at y=700, upper half empty). Fixed minimally by shifting the node group up 170px so it sits at ~y=530. Before/after: `beat4-before.png` / `beat4-after.png`; `beat4-mid-shift.png` shows the glide. Not redesigned. Note the shift runs while the Database cylinder's tether lines are fading out (9.1–9.5s), so there may be a brief visible mismatch where tether ends and cylinder part ways; I did not see it in the mid-shift still, but a still can't rule it out.
2. **Beat-4 caption time?** Was ~1.15s at full opacity (~1.8s including fades) — rushed. Now full opacity 9.65–11.2s (~1.55s) plus fades; the rule fades in at 11.4s and holds ~1.8s at full opacity to the 13.63s window end. Narration for "not every request is worth it" ends ~11.6s, so the caption now covers its whole spoken line. The rule's own full-opacity hold is shorter than before (about 2.3s -> 1.8s); human should judge whether three lines at 80px read in that time.
3. **Pile vs `CapacityBar`?** `compare-s11-pile-vs-s13-capacitybar.png` (left Scene 11 at 7.0s, right Scene 13 at its bar peak, 8.7s). My read, for the human to overrule: different silhouette (vertical column of discrete entries vs. one horizontal bar), different role (overflow plus stale state vs. fill and evict), and Scene 13 puts the bar off to the side with a "CAPACITY" label. I think it is distinct, but both are red fill on the same Redis node, so it is a judgment call.

Beat-4 content note: the task mentions a "miss/hit sequence". Scene 11's beat 4 is light requests bypassing the cache and one heavy request being cached; there is no miss shown (deliberately, so as not to front-run Scene 13's reroute).

## 3. DE/FR regression (Step 2)

`npm run compositions` (after changes):

| Composition | Frames | Duration |
|---|---|---|
| Redis-EN | 7700 | 256.67s |
| Redis-DE | 6390 | 213.00s |
| Redis-FR | 6390 | 213.00s |

- **EN did not shift at all** (shift = 0 frames). EN Scene 11's window is `max(9, 11.63 + 2)` = 13.63s either way; raising the planned target to 11 doesn't change that. TASK-020A's "+2s" applies only to DE/FR. I computed EN's 7700 independently from the boundaries before running the command, but I did not run `compositions` on the pre-change code to measure the old totals directly.
- **DE/FR: +60 frames (+2.0s)**, from 6330 to 6390 by arithmetic (planned Scene 11 window 11s -> 13s), not measured on the old code. Scenes 12 onward start 2s later in DE/FR (Scene 12 at frame 5100, Scene 13 at 5490).
- Regression stills (DE and FR, Scene 12 at +1.5s and Scene 13 at +1.2s): `regress-{DE,FR}-scene12-open.png`, `regress-{DE,FR}-scene13-open.png`. All four show a single centered line, no overlap or clipping, the expected translated text. I did not check any other frames of Scenes 12/13 in DE/FR.

**Pre-existing issue found, not caused by this shift, not fixed:** DE/FR use planned windows (no audio). Scene 13's planned window is `sharedWindow(14, 2, 'extend')` = 16s, but its beats were re-timed in TASK-029 to the EN narration and run to 24.7s (closing at 18.9s). I infer from the code that DE/FR Scene 13 (and likely 14) therefore cut off before their later beats; I did not render a late DE/FR Scene 13 frame to confirm. Raising those planned windows is a separate decision, so I left it for you.

## 4. Verification

- `npm run typecheck`: PASS.
- `npm run compositions`: PASS, numbers above.
- `renders/review/TASK-020B/` contains: `scene-11-preview.mp4` (Redis-EN, frames 5355–5824 = Scene 10's last 1s, all of Scene 11, Scene 12's first 1s), `beat4-before.png`, `beat4-after.png`, `beat4-mid-shift.png`, `beat4-caption-late.png`, `rule-crossfade.png`, `rule-hold.png`, `compare-s11-pile-vs-s13-capacitybar.png` (+ its two source stills), and four DE/FR regression stills.
- I did not look at the Scene 10 -> 11 and 11 -> 12 cut frames individually.

## 5. Human Review Request

| Artifact | Please judge |
|---|---|
| `scene-11-preview.mp4` | At real speed, does pile growth / stale flip / tether draw-on read clearly and sync with the narration cues (5.5s memory, 6.7s stale, 8.0s sync; transcript-derived, ±0.1–0.2s)? Do the cuts from Scene 10 and into Scene 12 feel right? Does the beat-4 glide look smooth? |
| `compare-s11-pile-vs-s13-capacitybar.png` | Is the pile distinct enough from Scene 13's capacity bar, or does it front-run it? |
| `beat4-before.png` / `beat4-after.png`, `beat4-caption-late.png`, `rule-hold.png` | Did the layout shift fix the bottom-heavy composition? Is the caption now on screen long enough, and is the rule's shorter hold still readable? |
| `regress-*` (DE/FR) | Anything that reads wrong after the 2s shift? Also decide whether to fix the pre-existing Scene 13/14 DE/FR window problem in section 3. |

Human review status: **PENDING.** Not proceeding to any other scene or task.
