# Scene 11 — Cache Everything?

## Purpose
Correct the obvious overgeneralization: "Redis is fast, so should we cache everything?" Answer: no.

## Narrative Beat
"So... why not avoid repeated work everywhere?" "CACHE EVERYTHING!" -> "Not so fast." Teaching points: memory usage, stale data, keeping data synchronized, not every request is expensive enough, cache misses still happen. Closing rule: "Cache where avoiding repeated expensive work is worth the tradeoff."

## Status
Implemented, PASS.

## Visual Approach
Fully Remotion-native, typography-driven scene — no image asset, no `SpotlightImage`. Scene 01 is the visual precedent: centered `Interactive.Div` text blocks, typography tokens, theme colors, and the existing motion-presets/`interpolate()` vocabulary. The only humorous beat ("CACHE EVERYTHING!" -> "Not so fast.") is purely typographic: no character illustration, no new asset. Costs (memory / stale data / invalidation) and the "not every request qualifies" point are each a single plain sentence, not cards/chips/badges, to avoid a checklist-slide feel.

## Assets Used
None (`assetIds: []` in `scenes.ts`). The formerly-listed `developer` placeholder asset is intentionally not used.

## Known Issues
None.

## Review Notes
Keep the humor purely typographic and brief — this scene sets up the cost discussion continued in Scenes 12 and 13, it should not resolve it.
