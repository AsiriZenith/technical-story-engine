# Scene 13 — Cost of Caching

## Purpose
Expand from stale data into the broader operational and design costs of adding a cache layer.

## Narrative Beat
"And stale data is only one of the costs." Freshness -- expiration + invalidation. Capacity -- memory usage. Resilience -- cache misses + cache failures. Operations -- monitoring + extra infrastructure. Closing: "Caching trades repeated work for extra state, infrastructure, and coordination."

## Status
Rebuilt under TASK-025e (Option A). Awaiting human video review of the rebuild — this is a separate gate from the typed/automated checks already run (typecheck, composition discovery, representative-frame stills); only explicit human acceptance can mark this scene `approved`, per the Human Media Review Gate in `docs/agent-workflow.md`. Until then this scene is a **review candidate**, not approved.

## Visual Approach

### Superseded — original implementation (history, not deleted)
Fully Remotion-native, hybrid central-node scene — no image asset, no `SpotlightImage`. A small central Redis node (Scene 01's cache-node accent/stack-icon vocabulary, simplified) stays on screen from Beat 2 onward; one of four callouts (Freshness / Capacity / Resilience / Operations) is fully active at a time around it, each paired with a small ease-out pulse on the central node, never an arrow or connecting line. Grouping replaces earlier overlapping "Memory and cache misses" / "Monitoring and failure handling" wording with four non-overlapping categories. No humor in this scene, per the approved plan — tone stays calm and matter-of-fact.

Human review (per TASK-025d's "Why") found this treatment flat and not visual enough — text label + caption per category, no diagram, no motion beyond a fade and a small scale pulse. This does not meet the "visual-first design principle" added to `AGENTS.md` under TASK-025c. A full creative rebuild is proposed below, planned under TASK-025d; see `feedbacks/task-025d-scene13-rebuild-planning-feedback.md` for the full option comparison.

### Implemented rebuild — Option A (TASK-025e)

**Status: implemented, awaiting human video review.** The plan below (originally written under TASK-025d as "proposed, pending approval") was built as described, with two small as-built deviations noted inline.

**Skills consulted:** `frontend-design` (avoiding the generic "label + caption card" pattern in favor of one diagrammatic device per idea; structural devices — icons, gauges, motion — should encode information, not decorate) and `animate` (naming each animation's purpose — state indication / explanation — before building it, and keeping all motion on `transform`/`opacity`, translated to this codebase's `interpolate()`/`motionPresets` vocabulary per `AGENTS.md`). The `remotion-best-practices` pack (markup/interactivity/effects references) was checked; nothing in it changes the approach beyond what's already established (no canvas/WebGL effects or new interactivity structuring needed — everything renders as inline SVG/div shapes, consistent with the rest of the episode).

**Recommended option — Option A: per-category mini-diagrams (replaces text captions with a literal visual device per cost):**
The central Redis node (kept, same stack-icon/accent vocabulary) stays on screen, but each of the four costs gets its own small animated diagram instead of a label+caption text block:
- **Freshness** — a cached-value chip next to the node with a depleting countdown ring around it, echoing Scene 12's Database-vs-Redis divergence: a small two-node diff where the Database side visibly updates while the Redis side freezes and its ring drains to a stale-red state.
- **Capacity** — a small horizontal memory bar beside the node fills as blocks enter, then an older block visibly slides out (evicted) as a new one arrives — a literal eviction-under-pressure visual for "memory usage."
- **Resilience** — the Redis node dims/fades toward `theme.muted` for one beat while a request packet (same packet-and-path grammar Scene 01 uses, and Scene 14 Option A will reuse) reroutes around it directly to a Database node that appears only for this beat, then Redis brightens and returns — a cache-miss/failure fallback shown as motion, not stated in text.
- **Operations** — a small pulsing signal ring plus a compact status readout beside the node, a heartbeat/monitoring motif.
One short one-line caption remains under each active vignette for clarity, but the diagram — not the caption — carries the idea, per the visual-first principle.
**Reuses:** `architectureNodeSemantics` (adds the `database` accent/shape to this scene for the first time, for the resilience reroute — same semantics already used in Scenes 01/07-10), `motionPresets.emphasizeScale`/`enterSoft`/`exitSoft` and the existing `windowOpacity` helper pattern, `theme`/`typography` tokens for captions. **No new external image asset** — everything is inline SVG/div, consistent with Scene 13/14-area scenes not needing generated imagery.

*As-built deviation 1:* the reroute packet uses a scene-local `interpolate()` timeline (matching its own beat window) rather than `motionPresets.moveLinear`'s fixed 3.8s duration, which didn't fit the ~1.9s beat window here — the same "scene defines its own beat-relative timing constants" convention Scene 01/12/13 already use for their own packet/value motion, not a new pattern.

**Animation:** `interpolate()` throughout for the freshness ring, capacity bar, and heartbeat motif. The Resilience beat's "cache dims out, then returns" settle uses `spring()` for the return only (the dim itself is `interpolate()`), resolving what was an open question under TASK-025d/025b as a **standing rule** set by TASK-025e: `spring()` for node-settle/return-to-state beats, `interpolate()` for everything else. This is now the project's default going forward, not a one-off exception — see `AGENTS.md`/motion guidance if this needs revisiting later.

*As-built deviation 2:* the pulse-on-entrance treatment from the superseded version was kept for Freshness/Capacity/Operations (their central-node pulse still uses `interpolate()` + `motionPresets.emphasizeScale`), but was replaced entirely by the dim+spring treatment for Resilience — the standing rule applies specifically to the node's return from a dimmed state, not to every category equally.

**Trade-off:** Highest production effort of the three options considered (four bespoke small diagrams instead of four text callouts), but the strongest fit for the visual-first principle — every abstract cost gets something to watch, not just read.

**Option B — icon-driven quadrant board (smaller rebuild):**
Keeps the current four-position layout and central-node skeleton, but replaces each text label with a compact icon/motif (a battery/gauge glyph for Capacity, a clock glyph for Freshness, a broken-link glyph for Resilience, a signal glyph for Operations); one zone brightens/pulses at a time while the other three stay dim, with a single caption line under the active icon. Informed by `frontend-design`'s guidance that structural devices (icons here) should encode information rather than decorate.
**Reuses:** current Scene 13 skeleton (four `calloutOffset` positions, `windowOpacity`, node pulse) almost unchanged — smallest new-code effort of the three.
**Animation:** same `interpolate()`-driven fades/pulses as today; icon activation gets `motionPresets.emphasizeScale`.
**Trade-off:** Moderate effort, more visual than the superseded version (recognizable shapes instead of only uppercase text labels) but not as literal/explanatory as Option A's diagrams — a middle ground, not the strongest visual-first option available.

**Option C — polished text callouts (explicit low-effort fallback, not an equal peer):**
Keep the current text-label-plus-caption structure close to as-is, with only typography/spacing polish. Included only because the task requires noting a fallback exists; **not recommended**, since it does not address the human review's core objection (flat, not visual) and would repeat the exact treatment that was just rejected.
**Reuses:** current implementation almost entirely.
**Animation:** unchanged.
**Trade-off:** Lowest effort, but fails the reason this rebuild task exists.

**Recommendation:** **Option A** — approved and implemented under TASK-025e. It is the only option that replaces text explanation with an actual diagram for every one of the four costs, consistent with `AGENTS.md`'s visual-first principle and its explicitly accepted effort trade-off. Options B and C remain documented above as the considered alternatives, not deleted, per the project's history-keeping convention.

**Ambient-label issue (`decisions.md` item 3):** Resolved by this rebuild, pending the human video review above confirming that's actually how it reads on screen. The per-category vignettes now retire in sequence rather than settling into a lingering ambient state — confirmed against rendered stills at each beat (see `feedbacks/task-025e-scene13-rebuild-feedback.md`) — so there is no closing-frame state where "some labels are visible, some are hidden." See `decisions.md` item 3 for the full resolution note.

## Assets Used
None (`assetIds: []` in `scenes.ts`). The implemented rebuild (Option A) confirms no new external image/generated asset was needed — all new visuals are inline SVG/div shapes, consistent with prior guidance that Scene 13/14-area scenes don't require generated imagery.

## Known Issues
None currently known in the rebuilt version. (The original implementation's ambient-label partial-visibility issue is resolved by this rebuild — see `decisions.md` item 3 — pending human review confirmation.)

## Review Notes
This is the episode's current human-review bottleneck (per the production-status doc's "Immediate Next Step"): the original implementation was reviewed and found unsatisfying (too flat, not visual enough), which led to the TASK-025d rebuild plan and this TASK-025e implementation of Option A. Scene 14 planning/implementation remains gated on Scene 13's review being satisfied — implementing the rebuild does not itself satisfy that gate; a human must review the rebuilt scene before TASK-026 (Scene 14 implementation) can proceed. TASK-025e and TASK-026 are otherwise independent: nothing about Scene 14's approach depends on Scene 13's rebuild details.
