# Scene 08 — Cache Miss

## Purpose
Trace the full cache-miss path and show the result being stored for later use. Main point: the first request after introducing Redis can still be expensive.

## Narrative Beat
`GET /users/42 -> Application -> Redis -> MISS`. `Database -> Result -> Store user:42 in Redis -> Response`.

## Status
Implemented, PASS.

## Visual Approach
Reuses the exact approved Scene 07 technical-architecture PNG (`scene07TechnicalArchitecture`) as the visual foundation; never redrawn or recomposed as native Remotion nodes. Sequential `SpotlightImage` highlighting only (Application -> Redis -> Database -> Application -> Redis), never simultaneous. Client is not spotlighted; its role was already established in Scenes 01/04/07.

## Assets Used
`scene07TechnicalArchitecture` (`approved`, human-approved 2026-09-14, reused from Scene 07).

## Known Issues
Inherits the `~8 ms` vs `~10 ms` baked-text discrepancy and the `SpotlightImage` mask-math issue tracked in `decisions.md`; this scene is one of the ones tuned around current `SpotlightImage` behavior.

## Review Notes
Keep spotlight sequencing strictly sequential (never simultaneous) to preserve the step-by-step miss path established here.
