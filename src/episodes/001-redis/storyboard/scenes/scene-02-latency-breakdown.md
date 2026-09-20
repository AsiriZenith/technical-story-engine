# Scene 02 — Where the 180 ms Comes From

## Purpose
Break the original ~180 ms pre-Redis request into meaningful parts and make database work the visually dominant share, without yet explaining cache hit/miss.

## Narrative Beat
`GET /users/42 -> Application -> Database`. Illustrative breakdown: request processing ~5 ms, network/DB connection ~8 ms, database work ~155 ms, serialization ~5 ms, other ~7 ms. Illustrative total: ~180 ms. Main point: database work dominates.

## Status
Implemented, human approved.

## Visual Approach
Timing bar implemented as a reusable shared component; later scenes may reuse it to compare against the ~8 ms cache-hit result.

## Assets Used
None (`assetIds: []` in `scenes.ts`).

## Known Issues
None.

## Review Notes
The timing-bar component is shared, so changes here can affect any future scene that reuses it for a cache-hit comparison.
