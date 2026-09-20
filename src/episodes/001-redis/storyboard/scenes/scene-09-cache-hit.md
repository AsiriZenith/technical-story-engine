# Scene 09 — Cache Hit

## Purpose
Deliver the episode's central lesson: the expensive query is skipped, not accelerated.

## Narrative Beat
`GET /users/42 -> Application -> Redis -> HIT -> Response`. Database is skipped entirely. "Redis did not speed up the query. Redis allowed us to skip it."

## Status
Implemented, PASS.

## Visual Approach
Reuses the exact approved Scene 07 technical-architecture PNG (`scene07TechnicalArchitecture`) as the visual foundation; never redrawn or recomposed as native Remotion nodes. Sequential `SpotlightImage` highlighting only (Application -> Redis -> Application -> Client), never simultaneous. Redis stays the sole spotlight through both the cache-hit and Database-skipped beats. The Database is not highlighted with an X or warning symbol — instead Redis stays active and the Database remains dim, keeping the explanation clean and avoiding inventing extra diagram geometry.

## Assets Used
`scene07TechnicalArchitecture` (`approved`, human-approved 2026-09-14, reused from Scene 07).

## Known Issues
Inherits the `SpotlightImage` mask-math issue tracked in `decisions.md`; this scene is one of the ones tuned around current `SpotlightImage` behavior.

## Review Notes
No joke should interrupt this explanation — this is the episode's central point. Database is never itself spotlighted in this scene so it reads as skipped by contrast, not failure.
