# Episode 001-redis — Narration Script (Draft, EN)

Written for spoken delivery (natural sentence flow), one section per scene,
based on that scene's `storyboard/scenes/scene-NN-*.md` Narrative Beat. Uses
the corrected `~10 ms` cache-hit figure throughout (see TASK-028 /
`decisions.md` item 1).

**Timing method:** each scene's current visual window is `targetSeconds +
localizationMarginSeconds` from `scenes.ts` (e.g. Scene 01 is `20 + 2 = 22s`).
Durations below are estimated at a natural explainer pace of **~2.3 words per
second** (~140 wpm) — a deliberately conservative rate for technical content
with short pauses, not a fast read. Where a scene's script comfortably fits
within its **target** seconds, that's marked "fits". Where it only fits by
using the full localization margin, or runs over even the full window, that's
flagged explicitly, per TASK-028's instruction not to silently force-fit
awkward pacing. **This is a first draft for the user's read-through and edit,
not locked.**

This is a draft to be read aloud and timed by a human before it's treated as
final — the word-count estimate is a planning aid, not a guarantee.

---

## Scene 01 — The Mystery

Here's a strange one. This API call takes about 180 milliseconds to respond. Add Redis to the picture, send the exact same request, and it comes back in around 10 milliseconds. Same request. Same data. So... what changed?

*(Est. duration: ~43 words / ~18.7s narration vs. 20s target (22s window) — fits comfortably, room to spare.)*

## Scene 02 — Where the 180 ms Comes From

Where does that 180 milliseconds actually go? Request handling and the network add a few milliseconds. But the database work itself — running the query — eats up the vast majority of the time. That's where the real cost is hiding.

*(Est. duration: ~39 words / ~16.9s narration vs. 15s target (17s window) — **tight**: uses nearly the entire localization margin, leaving little room for a longer DE/FR read. Consider trimming slightly during the read-through pass if the DE/FR translations run long.)*

## Scene 03 — The Misconception

So did Redis make the database twenty times faster? No — not this. What actually changed is the repeated work. The database itself didn't get any faster. We just stopped repeating some of that expensive work.

*(Est. duration: ~35 words / ~15.2s narration vs. 13s target (14s window) — **flagged**: runs slightly past the full window (~1.2s over). The point needs the contrast ("didn't get faster" vs. "stopped repeating") to land, so this wasn't trimmed further; flagging rather than force-fitting per TASK-028.)*

## Scene 04 — Original Request Path

Before Redis, every request takes the same path: application, database, and back. Three different customers ask for the same user, Alice — and each time, the database repeats that expensive work.

*(Est. duration: ~30 words / ~13.0s narration vs. 11s target (12s window) — **flagged**: slightly over the full window (~1s). Short scene with real content (three repeats need to register); flagging rather than cutting the repetition that makes the point.)*

## Scene 05 — Restaurant: Repeated Work

Picture a restaurant. A customer orders a burger — cashier, chef, about ten minutes. A different customer orders the exact same burger. Same cashier, same chef, same ten minutes — all over again.

*(Est. duration: ~31 words / ~13.5s narration vs. 13s target (15s window) — fits, with margin to spare.)*

## Scene 06 — Ready Order / Cache

Now imagine a ready shelf. A burger is already made, sitting there waiting. The next customer orders — the cashier checks the shelf, it's already there, and serves it immediately. The chef didn't cook at all.

*(Est. duration: ~35 words / ~15.2s narration vs. 12s target (14s window) — **flagged**: runs slightly past the full window (~1.2s over). Consider trimming "sitting there waiting" during the read-through if it needs to tighten.)*

## Scene 07 — Restaurant to Architecture

Customer, cashier, ready shelf, chef — these map to request, application, Redis, and database. The burger is the cached result. In the real system: a request hits the application, which checks Redis first. Hit or miss, Redis answers repeated requests without repeating that database work.

*(Est. duration: ~44 words / ~19.1s narration vs. 16s target (18s window) — **flagged**: runs past the full window (~1.1s over). This scene carries two ideas at once (the analogy mapping, then the real request flow) and is already trimmed close to the minimum needed for both to land — a genuine timing tension worth the user's attention, not something to compress further here.)*

## Scene 08 — Cache Miss

A request comes in. The application checks Redis first — but this time, it's not there. A miss. So the application asks the database, which does that expensive work, gets the result, and — before responding — stores it in Redis for next time.

*(Est. duration: ~41 words / ~17.8s narration vs. 14s target (16s window) — **flagged**: runs past the full window (~1.8s over). Traces a 5-step path (check → miss → ask DB → get result → store), which is inherently more words than the budget allows; flagging for the user's pacing call rather than dropping a step.)*

## Scene 09 — Cache Hit

Now the same request arrives again. The application checks Redis — and this time, it's there. The database is skipped entirely. Redis didn't make that query faster. Redis let us skip it altogether.

*(Est. duration: ~32 words / ~13.9s narration vs. 12s target (14s window) — fits right at the edge of the full window; this is the episode's central line, so it was kept whole rather than trimmed further.)*

## Scene 10 — Why Redis Can Be Fast

Why is that so much faster? Redis already holds the prepared result — a simple, direct lookup, not a query. Yes, that's in memory, and memory helps. But the real reason is that the expensive database work behind it never had to happen again.

*(Est. duration: ~43 words / ~18.7s narration vs. 13s target (15s window) — **flagged, notably over** (~3.7s past the full window). This scene deliberately avoids the "RAM vs. disk" shortcut and needs the full "lookup, not query — memory helps, but here's the real reason" arc to do that; it may need either a longer visual window in a later timing pass, or a further trim the user should make deliberately, not one made silently here.)*

## Scene 11 — Cache Everything?

So why not cache everything? Cache everything! ...Not so fast. More memory, more stale data, more to keep in sync — and not every request is worth it.

*(Est. duration: ~27 words / ~11.7s narration vs. 9s target (11s window) — **flagged**: slightly over the full window (~0.7s). Short, punchy scene; the joke beat ("Cache everything!" → "Not so fast.") needs its own breath, which is most of the overage.)*

## Scene 12 — Stale Cache

What does "stale data" actually mean? Say the database updates Alice's email — but Redis still holds the old value. The application reads Redis and returns that old answer, fast. Wrong answer. Very fast.

*(Est. duration: ~33 words / ~14.3s narration vs. 11s target (13s window) — **flagged**: slightly over the full window (~1.3s). The "wrong answer, very fast" beat needs its own separated delivery to land as the joke it's written as.)*

## Scene 13 — Cost of Caching

Stale data is only one of the costs. Freshness needs expiration and invalidation. Capacity — memory isn't infinite. Resilience — misses and failures still happen. And operations — someone has to watch it, something has to run it. Caching trades repeated work for extra state and coordination.

*(Est. duration: ~44 words / ~19.1s narration vs. 14s target (16s window) — **flagged, notably over** (~3.1s past the full window). Four distinct categories (freshness, capacity, resilience, operations) each need at least a clause to register — this is the densest scene in the episode content-wise, and compressing it further risks the categories blurring together rather than landing as four separate costs. Worth a deliberate pacing or timing decision from the user, not a silent cut.)*

## Scene 14 — Final Mental Model

Here's the mental model to keep. Without caching: application, database, expensive work, response. With a cache hit: application, straight to Redis, and back. The real question to ask about any cache: what work did it let you stop doing?

*(Est. duration: ~39 words / ~17.0s narration vs. 12s target (14s window) — **flagged, notably over** (~3.0s past the full window). This is the episode's closing thesis question and the Scene 01 bookend line — kept whole rather than cut. Likely needs either a slightly longer Scene 14 window in a later timing pass, or the visual pacing (packet travel speed) sped up slightly to match a tighter narration read; the user's call, not decided here.)*

---

## Summary of timing flags

Scenes that fit comfortably or at the edge of their current window: **01, 05, 09**.
Scenes flagged as running past their current full window (target + localization margin): **02** (tight, not over), **03, 04, 06, 07, 08, 11, 12** (modestly over), **10, 13, 14** (notably over, ~3s+).

This is a common and expected outcome of writing narration against scene timing that was locked before narration existed (per TASK-025e/026's own note) — it does not mean the visuals are wrong. Resolving it is a deliberate, separate step: either adjust a handful of scene windows in `scenes.ts`/`episode.config.ts` once the script is read aloud and timed for real, tighten specific sentences during the read-through, or accept a slightly faster narration pace for the denser scenes (10, 13, 14 in particular). No scene timing was changed by this task.
