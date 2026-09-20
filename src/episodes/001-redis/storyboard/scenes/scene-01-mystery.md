# Scene 01 — The Mystery

## Purpose
Establish the surprising latency improvement that the episode explains, without giving away the answer.

## Narrative Beat
`GET /users/42` takes ~180 ms. After adding Redis, the same request takes ~8 ms. The scene ends on the open question "What changed?" rather than answering it.

## Status
Implemented, human approved.

## Visual Approach
Fully Remotion-native, typography-driven scene (no image asset, no `SpotlightImage`): centered `Interactive.Div` text blocks, typography tokens, theme colors, and the existing motion-presets/`interpolate()` vocabulary. This scene is the visual precedent later reused by Scenes 11–13.

## Assets Used
None (`assetIds: []` in `scenes.ts`).

## Known Issues
None.

## Review Notes
The opening deliberately establishes the mystery without explaining the answer too early — do not add any hint of the cache mechanism here.
