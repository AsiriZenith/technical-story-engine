# TASK-025d Feedback — Scene 13 Visual Rebuild Planning

This is a planning task only. No `.tsx` files were written or modified, and no implementation happened.

## Context Reviewed
- `storyboard/scenes/scene-13-cache-tradeoffs.md` (Purpose/Narrative Beat and the superseded Visual Approach).
- `storyboard/decisions.md` item 3 (Scene 13 ambient-label issue and its role as the episode's human-review bottleneck).
- `AGENTS.md`'s "Visual-first design principle" section (added under TASK-025c).
- `storyboard/scenes/scene-11-should-we-cache-everything.md` and `scene-12-stale-cache.md`, plus their implementations (`Scene11CacheEverything.tsx`, `Scene12StaleCache.tsx`) — the neighboring "fully Remotion-native, no image asset" scenes.
- The current implementation, `Scene13CacheCosts.tsx`, `shared/motion/presets.ts`, and `shared/architecture/node-semantics.ts`.

## Skills Consulted

Per Step 2, checked `.agents/skills/` (both the `remotion-best-practices` pack and the three custom specialists named in `AGENTS.md`) and actually applied two of them while forming the options below:

- **`frontend-design`** — informed the core critique driving Option A: the superseded implementation's "uppercase label + one-line caption" per category is exactly the kind of structural device that should encode information rather than decorate, and a text callout is not doing that — it's the generic default (a labeled text block), not a choice made for this scene's actual content (memory pressure, staleness, failure fallback, monitoring). This pushed toward literal per-category diagrams (a filling/evicting memory bar, a decaying freshness ring, an actual reroute-around-a-dark-node beat, a heartbeat motif) instead of another label+caption treatment.
- **`animate`** — informed the animation-approach section of each option: naming each new animation's purpose (state indication for the capacity bar/eviction, explanation for the resilience reroute) before proposing it, keeping every new motion on `transform`/`opacity`-equivalent properties (`interpolate()` on `scale`/`translate`/`opacity`, per this codebase's translation of that skill's CSS/WAAPI guidance into Remotion's `interpolate()`/`spring()` model, per `AGENTS.md`'s "Specialist skills" section), and explicitly flagging the one place a `spring()` exception might fit (the resilience beat's node-dims-then-returns settle) as **open, not decided** — consistent with how the same question was left open for Scene 14 under TASK-025c/025b.
- **`review-animations`** was not directly applied (nothing to review yet — no code was written), but its standards (justified motion, GPU-safe properties, no keyframes-that-restart-from-zero on rapidly-triggered UI) shaped what I avoided proposing.
- Checked the `remotion-best-practices` pack (`remotion-markup/effects.md`, `remotion-interactivity/REFERENCE.md`, and the top-level `SKILL.md` router) for anything diagram-construction-specific. Nothing in it changes the recommended approach: the `effects` pack is for canvas/WebGL post-processing (blur, glow, distortion, etc.), which isn't needed here since nothing in Option A requires per-pixel effects — it's all inline SVG/div shapes and `interpolate()`, the same vocabulary the rest of the episode already uses. Noted this explicitly in the storyboard file so it's clear the pack was checked, not skipped.

## Options Considered

### Option A — per-category mini-diagrams (recommended)
Keeps the central Redis node but replaces each of the four text-label-plus-caption callouts with a literal small diagram: a decaying freshness ring (echoing Scene 12's Database-vs-Redis divergence), a filling/evicting capacity bar, a resilience beat where the node dims and a request packet reroutes to a Database node that appears only for that beat (reusing Scene 01's packet-and-path grammar, and the same grammar Scene 14 Option A will use), and a pulsing operations/heartbeat motif. No new external asset — everything is inline SVG/div. Highest effort of the three, but the only option where every abstract cost has an actual thing to watch, not just read.

### Option B — icon-driven quadrant board
Keeps the current skeleton (four positions, central node, `windowOpacity` pattern) almost unchanged, but swaps each text label for a compact icon/glyph (gauge, clock, broken-link, signal) with one short caption. Smaller rebuild than Option A, more visual than the superseded version, but a middle ground — glyphs instead of diagrams.

### Option C — polished text callouts (explicit low-effort fallback, not a peer)
Keeps the existing text-label-plus-caption structure with only typographic polish. Included solely because the task requires documenting a fallback, explicitly marked as not recommended: it repeats the exact treatment human review just rejected as flat.

## Recommendation

**Option A**, pending human approval. It's the only option that fully replaces stated-in-text explanation with diagrams for all four costs, matching `AGENTS.md`'s visual-first principle and its explicitly accepted "visual costs more to build" trade-off. Option B is a reasonable fallback if reviewers want a smaller-scope rebuild. Option C is not recommended.

## Ambient-Label Issue (`decisions.md` item 3) Status

- **Under Option A:** becomes **moot** — the per-category vignettes retire in sequence rather than settling into a lingering faint state, so there's no "some labels visible, some hidden" inconsistency left to resolve.
- **Under Option B or C:** **still applies, unchanged** — either would carry over the current ambient-label closing treatment, so the same human design decision (all four faintly visible vs. all four fully hidden) would still be needed.

None of this is resolved yet regardless of option — `decisions.md` item 3 remains open until an implementation task actually builds the chosen rebuild; this task only determines whether the issue becomes moot or still needs a decision, depending on which option is eventually approved.

## Judgment Calls

1. Interpreted "no new external images should be needed" as also ruling out new generated SVG *asset files* checked in as static media — Option A's diagrams are all inline SVG markup (same pattern as the existing `StackIcon`), not new asset files, so this holds.
2. Kept the superseded Visual Approach's full text in the storyboard file (not summarized/shortened) per Step 5's "keep as history, don't delete" instruction, even though it makes that section longer.
3. Did not pick between Option A and B unilaterally beyond stating a recommendation — both remain documented as live choices for human approval, per the task's "clearly marked as pending human approval, not final" instruction.
