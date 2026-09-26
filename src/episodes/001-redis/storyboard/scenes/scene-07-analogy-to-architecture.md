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
**Resolved (TASK-028):** the architecture image's baked "~10 ms" text and the episode's canonical example were previously inconsistent (episode example was "~8 ms"); the episode was standardized on ~10 ms everywhere, matching this already-approved image, so no image regeneration was needed. See `decisions.md` item 1. This scene still inherits the `SpotlightImage` mask-math issue tracked in `decisions.md`; it is one of the scenes tuned around current behavior.

## Review Notes
This scene establishes the current architecture image reused later by Scenes 08–10 — any change to `scene07TechnicalArchitecture` or its spotlight behavior must be regression-checked against those scenes.
