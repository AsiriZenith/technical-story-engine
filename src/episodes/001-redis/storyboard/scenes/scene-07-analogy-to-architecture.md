# Scene 07 — Restaurant to Architecture

## Purpose
Map the restaurant analogy cleanly onto the real technical request path.

## Narrative Beat
Customer -> Request, Cashier -> Application, Redis/Cache -> ready shelf, Database -> chef, cached result -> burger. Then: the real system: Client -> Application -> Redis (cache hit) or Database (cache miss) -> Response. "Redis answers repeated requests without repeating database work."

## Status
Implemented, human approved enough to proceed.

## Visual Approach
Both beats are user-supplied PNG assets (`scene07AnalogyMapping`, `scene07TechnicalArchitecture`) rendered exactly as supplied; never redrawn, reinterpreted, substituted, or simplified into a new diagram. The technical-architecture image is dense (6 numbered steps) and is held long enough to read at normal playback speed, never redrawn as native Remotion nodes. Both images carry baked English labels, so their visible windows do not overlap. Focus-frame emphasis (never new labels) highlights each analogy label in sequence, then the Redis and Database roles in the architecture diagram.

## Assets Used
`scene07AnalogyMapping`, `scene07TechnicalArchitecture` (both `approved`, human-approved 2026-09-14). `scene07TechnicalArchitecture` is reused as the visual foundation for Scenes 08, 09, and 10.

## Known Issues
The architecture image contains baked text "~10 ms", while the episode's established canonical example is "~8 ms". This discrepancy is open and unresolved — see `decisions.md`. It also inherits the `SpotlightImage` mask-math issue tracked in `decisions.md`; this scene is one of the ones tuned around current behavior.

## Review Notes
This scene establishes the current architecture image reused later by Scenes 08–10 — any change to `scene07TechnicalArchitecture` or its spotlight behavior must be regression-checked against those scenes.
