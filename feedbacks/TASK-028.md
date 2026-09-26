# TASK-028 Feedback — 8ms→10ms Fix, Narration Script, Voice-Tool Prep

## Step 1 — 8ms → 10ms fix

Standardized the episode's cache-hit example on **`~10 ms`** everywhere (matching the already-approved Scene 07 architecture image; no image regeneration needed), per the decision recorded in this task's "Why."

**Files changed** (all occurrences of the cache-hit comparison number, `8 ms` → `10 ms`):

- `src/episodes/001-redis/scenes/Scene01Mystery.tsx` — the "After Redis" reveal value and the final `180 ms → 8 ms` comparison (2 occurrences).
- `src/shared/localization/index.ts` — `cacheHitFastResponse` key, all three languages (en/de/fr): "...about 8 ms after Redis" → "...about 10 ms after Redis" (and localized equivalents).
- `src/episodes/001-redis/scenes.ts` — Scene 01's `storyBeats` (`'After Redis: 8 ms'` → `10 ms`) and Scene 02's `visualNotes` (referencing "the 8 ms cache-hit result").
- `src/dev/compositions/DevTypography.tsx` — the demo hero-number value (`180 ms → 8 ms` → `10 ms`).
- Storyboard files: `storyboard/README.md`, `scenes/scene-01-mystery.md`, `scenes/scene-02-latency-breakdown.md` (only the line referencing the cache-hit result, not Scene 02's own breakdown value), `scenes/scene-07-analogy-to-architecture.md`, `scenes/scene-08-cache-miss.md` (both updated from "open discrepancy" to "resolved").
- `docs/REDIS_EPISODE_PRODUCTION_STATUS.md` — four occurrences of the cache-hit example, plus the "Important Known Issues" section A, all updated/marked resolved.
- `storyboard/decisions.md` item 1 — marked **RESOLVED (TASK-028)**, with the decision and full file list recorded.

**Deliberately left unchanged:** Scene 02's own `network / DB connection ~8 ms` value, in `scenes.ts`, `scene-02-latency-breakdown.md`, and `docs/REDIS_EPISODE_PRODUCTION_STATUS.md` — this is a different quantity (part of the pre-Redis 180ms latency breakdown), not the cache-hit comparison number, per the task's explicit instruction not to touch it.

**Not changed:** historical files under `feedbacks/` and `tasks/` (e.g. `feedbacks/task-005-feedback.md`, `tasks/TASK-005.md`) still say "8 ms" in many places — these are point-in-time records of past task work and were left as-is, consistent with not rewriting history; only living/current documentation (scene code, `scenes.ts`, localization, storyboard, `docs/`) was updated, matching the task's explicit search scope.

**Verification:** `npm run typecheck` — pass. `npm run compositions` — all three `Redis-EN/DE/FR` compositions still report 6330 frames / 211.00s, confirming this was a text-only content change with no timing impact.

**Re-rendered stills** (per the task, saved to the review folder since they're a small human-checkable visual confirmation):

```
renders/review/TASK-028/scene-01-10ms-reveal.png       (frame 438, the "After Redis: 10 ms" reveal)
renders/review/TASK-028/scene-01-final-comparison.png  (frame 540, the "180 ms → 10 ms" final comparison)
```

Both confirmed: the extra digit ("10" vs "8") doesn't affect font sizing or line-wrapping in either the reveal beat or the final comparison — text remains legible and correctly positioned.

## Step 2 — Narration script

Written to `src/episodes/001-redis/narration/script.md`: one section per scene (01–14), spoken-prose style, based on each scene's storyboard Narrative Beat, keeping the episode's "what work did Redis let us stop doing?" thesis intact and using the corrected `~10 ms` figure throughout.

**Timing flags (per the task's explicit instruction not to silently force-fit):** estimated at ~2.3 words/second (a conservative explainer pace), most scenes run at or past their current visual window once written as natural spoken sentences rather than caption fragments:

- **Fit comfortably or at the edge:** Scenes 01, 05, 09.
- **Tight (uses nearly the full localization margin):** Scene 02.
- **Modestly over the full window (~1–2s):** Scenes 03, 04, 06, 07, 08, 11, 12.
- **Notably over the full window (~3s+):** Scenes 10, 13, 14 — these carry genuinely dense content (Scene 10's "not RAM magic" nuance, Scene 13's four cost categories, Scene 14's closing thesis + bookend structure) that resists further compression without losing clarity.

This is flagged as an expected outcome of writing narration against scene timing that was locked before narration existed (per TASK-025e/026's own note), not a sign the visuals are wrong. No scene timing was changed by this task — that's a separate, deliberate decision for the user to make after reading the script aloud and timing it for real.

## Step 3 — Voice-tool test snippet

Written to `src/episodes/001-redis/narration/voice-test-snippet.md`: Scene 01's narration verbatim (~43 words, ~19–20s at natural pace), chosen per the task's own recommendation since it's short, sets the tone, and includes the corrected 10ms figure.

## Step 4 — Voice-tool comparison rubric

Written to `src/episodes/001-redis/narration/voice-tool-comparison.md`: the empty comparison table exactly as specified (ElevenLabs / Descript / Play.ht columns; Naturalness, technical-term handling, cost at ~211s, API availability, notes), plus a short "how to use this" section pointing at the test snippet.

## Step 5 — Storyboard updated

`storyboard/README.md`'s overall-status block now lists: the 8ms/10ms fix as resolved, the narration script as drafted and awaiting the user's read-through/edit approval, and voice-tool selection as not yet made (awaiting the user's own testing). Neither of the two pending items is marked done — this task only prepared the materials.

## Next steps for the user

1. **Test the voice snippet.** Paste `src/episodes/001-redis/narration/voice-test-snippet.md`'s text into ElevenLabs, Descript, and Play.ht, and fill in `src/episodes/001-redis/narration/voice-tool-comparison.md`.
2. **Read through the full script.** Open `src/episodes/001-redis/narration/script.md`, read each scene's narration aloud (ideally timed with a stopwatch), and edit the wording as you see fit — this is a first draft, not locked.
3. **Decide on the timing-flagged scenes.** For Scenes 10, 13, and 14 especially (each ~3s+ over their current visual window at a natural pace), decide whether to: read faster/tighter for those scenes specifically, trim the script further yourself, or extend those scenes' visual windows in a follow-up task. This task deliberately did not decide this for you.
4. Once both the script and voice tool are settled, the next task can move to recording/generating the actual narration audio.

## Human Review Requests

### Review Request 1

Artifact:
`renders/review/TASK-028/scene-01-10ms-reveal.png` and `renders/review/TASK-028/scene-01-final-comparison.png`

Type:
PNG

Purpose:
Confirm the `8 ms` → `10 ms` text change didn't affect layout, font sizing, or line-wrapping in Scene 01 — the only visual asset this task touched.

What to review:
- Does "10 ms" read cleanly at both sizes (the reveal beat and the larger final-comparison beat)?
- Any awkward spacing or wrapping introduced by the extra digit?

Agent assessment:
PASS

Known issues:
None.

Human review status:
PENDING

## External Asset Requests

None.
