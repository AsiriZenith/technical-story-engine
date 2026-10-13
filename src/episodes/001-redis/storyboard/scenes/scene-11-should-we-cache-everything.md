# Scene 11 — Cache Everything?

## Purpose
Correct the obvious overgeneralization: "Redis is fast, so should we cache everything?" Answer: no.

## Narrative Beat
"So... why not avoid repeated work everywhere?" "CACHE EVERYTHING!" -> "Not so fast." Teaching points: memory usage, stale data, keeping data synchronized, not every request is expensive enough, cache misses still happen. Closing rule: "Cache where avoiding repeated expensive work is worth the tradeoff."

## Status
Implemented, human-approved (TASK-020/020A/020B/020C). Current approach: TASK-020A "pile" diagram (approved). The TASK-020 typography-only version is superseded and kept below as history.

## Visual Approach — SUPERSEDED (TASK-020 as built; kept as history)
Fully Remotion-native, typography-driven scene — no image asset, no `SpotlightImage`. Scene 01 is the visual precedent: centered `Interactive.Div` text blocks, typography tokens, theme colors, and the existing motion-presets/`interpolate()` vocabulary. The only humorous beat ("CACHE EVERYTHING!" -> "Not so fast.") is purely typographic: no character illustration, no new asset. Costs (memory / stale data / invalidation) and the "not every request qualifies" point are each a single plain sentence, not cards/chips/badges, to avoid a checklist-slide feel.

## Visual Approach — CURRENT (TASK-020A Option A "the pile", human-approved)
Direction (decided by the human): **pure Remotion diagrams, no new generated image assets** — inline SVG/div shapes driven by `interpolate()`, same technique as the Scene 13 rebuild.

Approved: **Option A — "the pile"**. One Redis stack node is the whole stage. After "Not so fast." a stream of small request dots flows in and everything piles into the node as cached entries. The three costs of beat 3 then show up *on that same pile* (it grows too tall / some entries go stale-hollow / tether lines run back to a Database cylinder), instead of as three separate gauge-style diagrams. Beat 4 sorts the stream (cheap requests pass straight through; one heavy repeated request is the one that gets cached). Beats 1, 2 and 5 stay typographic.

- **Why not the Scene 13 motifs:** Scene 13 owns the filling bar, the decaying ring, the reroute and the heartbeat. Scene 11 uses a different object (a pile of entries) so Scene 13's diagrams still land as new.
- **Shared grammar kept deliberately:** the Redis stack icon, cache-red accent, and Database cylinder from `node-semantics.ts`.
- **Alternatives documented, not chosen:** Option B (cost-vs-benefit balance scale) and Option C (small inline glyphs beside each phrase — lowest effort, but it front-runs Scene 13's `CapacityBar`/`FreshnessRing`). Full detail in `feedbacks/TASK-020A.md`.
- **As built:** beats re-timed to the EN narration (window 13.63s = 11.63s narration + 2s margin; decision rule fades in at 11.1s, after the last spoken word). Scene 11 planned window raised to sharedWindow(11, 2) so DE/FR (no audio yet) also show the rule. Stills: renders/review/task-020a/.
- **Original flag (resolved):** Scene 11's beats were authored for an 11.0s window; the audio-derived window is 11.63s and Scene 11 was not re-timed in TASK-029. Any implementation task must re-time beats against the real narration first.

## Assets Used
None (`assetIds: []` in `scenes.ts`). The formerly-listed `developer` placeholder asset is intentionally not used. The proposed direction also needs no assets.

## Known Issues
None open. (Original review finding — too text-heavy — resolved by the pile diagram.)

## Review Notes
Keep the humor purely typographic and brief — this scene sets up the cost discussion continued in Scenes 12 and 13, it should not resolve it. That constraint applies to the proposed direction too (beat 2 stays as-is).
