# Scene 10 — Why Redis Can Be Fast

## Purpose
Explain why a cache hit is fast without falling back to the simplistic "RAM vs. disk" explanation.

## Narrative Beat
Teaching points: already prepared result, simple lookup, data held in memory, original expensive work avoided, modern databases also use memory heavily. Strongest message: "The expensive database work is skipped."

## Status
Implemented, PASS.

## Visual Approach
Reuses the exact approved Scene 07 technical-architecture PNG (`scene07TechnicalArchitecture`) as the visual foundation; never redrawn or recomposed as native Remotion nodes. A single Redis `SpotlightImage` target is held across the prepared-result / simple-lookup / in-memory beats, then released (not handed to Database) for the avoided-work payoff beat — a deliberate departure from Scenes 08/09's node-to-node handoffs, since this scene explains why one step is fast rather than retracing the request path. Database is never spotlighted in this scene. No new asset required.

## Assets Used
`scene07TechnicalArchitecture` (`approved`, human-approved 2026-09-14, reused from Scene 07).

## Known Issues
Inherits the `SpotlightImage` mask-math issue tracked in `decisions.md`; this scene is one of the ones tuned around current `SpotlightImage` behavior.

## Review Notes
The "one continuous spotlight held, then released" pattern is a deliberate departure from the handoff pattern in Scenes 08/09 — do not "fix" it to match those scenes without understanding why it differs.
