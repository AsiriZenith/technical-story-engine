# Scene 13 — Cost of Caching

## Purpose
Expand from stale data into the broader operational and design costs of adding a cache layer.

## Narrative Beat
"And stale data is only one of the costs." Freshness -- expiration + invalidation. Capacity -- memory usage. Resilience -- cache misses + cache failures. Operations -- monitoring + extra infrastructure. Closing: "Caching trades repeated work for extra state, infrastructure, and coordination."

## Status
Implemented; TASK-024 status PASS. Human review still pending (Scene 13 is the current immediate next step for human review before Scene 14 planning begins).

## Visual Approach
Fully Remotion-native, hybrid central-node scene — no image asset, no `SpotlightImage`. A small central Redis node (Scene 01's cache-node accent/stack-icon vocabulary, simplified) stays on screen from Beat 2 onward; one of four callouts (Freshness / Capacity / Resilience / Operations) is fully active at a time around it, each paired with a small ease-out pulse on the central node, never an arrow or connecting line. Grouping replaces earlier overlapping "Memory and cache misses" / "Monitoring and failure handling" wording with four non-overlapping categories. No humor in this scene, per the approved plan — tone stays calm and matter-of-fact.

## Assets Used
None (`assetIds: []` in `scenes.ts`).

## Known Issues
The closing frame currently leaves some ambient category labels partially visible while others are hidden behind the closing text. Not a technical failure, but needs a human design decision — see `decisions.md`.

## Review Notes
This is the episode's current human-review bottleneck (per the production-status doc's "Immediate Next Step"): if accepted, planning proceeds to Scene 14; if not, only a small Scene 13 polish task should follow, not new scene work.
