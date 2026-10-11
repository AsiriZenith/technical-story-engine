# TASK-020A

## Why

Scene 11 ("Should We Cache Everything?") was implemented under TASK-020 as a
deliberately typography-only scene (approved Option D from TASK-019 — no
image asset, no diagrams, no motion graphics beyond text fade/scale). Human
review of `scene-11-preview.mp4` found it too text-heavy and wants more
visual/motion content, consistent with the project's visual-first design
principle (`AGENTS.md`).

Decision: **pure Remotion diagrams, no new generated image assets** — same
technique as Scene 13's rebuild (TASK-025d/025e): inline SVG/div shapes
animated with `interpolate()`/`spring()`, nothing external to approve.

**This is a planning task only. Do not modify `Scene11CacheEverything.tsx`
or any other `.tsx` file. Do not implement anything.**

## Step 1 — Read context first

- `storyboard/scenes/scene-11-should-we-cache-everything.md` (if it doesn't
  yet reflect TASK-020's as-built beats, treat `TASK-020.md` and
  `feedbacks/task-020-feedback.md` as the source of truth for the current
  5-beat structure: bridge → "CACHE EVERYTHING!"/"Not so fast." joke → costs
  → not-every-request → decision rule).
- `Scene13CacheCosts.tsx` (post-rebuild) — the established pattern for
  "per-concept mini-diagram" treatment: `CapacityBar`, `FreshnessRing`,
  `ResilienceReroute`, `OperationsHeartbeat`. Scene 11's costs (memory,
  staleness, sync complexity, cache misses) overlap conceptually with
  Scene 13's categories — figure out whether Scene 11 should visually
  *foreshadow* Scene 13's diagrams (same motifs, simpler/smaller) or use
  distinct visual treatment to avoid feeling repetitive by the time the
  viewer reaches Scene 13.
- `AGENTS.md`'s "Visual-first design principle" and the `spring()` standing
  rule (node-settle/return-to-state beats only).
- `shared/motion/presets.ts`, `shared/architecture/node-semantics.ts`.

## Step 2 — Consult installed skills

Same requirement as TASK-020: explicitly consult `frontend-design`,
`animate`, and `review-animations` (plus any others that apply) while
forming the options in Step 3 — not just name-check them. State in feedback
which skill informed which option, as TASK-025d did.

## Step 3 — Propose 2-3 visual treatments, beat by beat

For each option, go through Scene 11's 5 beats and specify what becomes
visual vs. stays as plain text:

- **Beat 1 (bridge)** — likely stays simple/typographic; it's a one-line
  transition, not a teaching moment. Note if you disagree.
- **Beat 2 (the joke)** — per TASK-020's explicit humor rules, this must stay
  under ~2s, purely typographic, no character/meme/bounce. Confirm whether
  any option proposes visual treatment here or deliberately leaves it as-is
  (the joke's brevity was a deliberate constraint, not an oversight).
- **Beat 3 (costs: memory/stale/sync)** — the strongest candidate for
  diagrams. Consider small inline motifs (not full Scene-13-scale builds):
  e.g. a tiny filling bar for memory, a small decaying dot/ring for
  staleness, a sync/link icon for complexity — appearing beside or in place
  of each phrase rather than replacing the explanatory text entirely.
- **Beat 4 (not every request qualifies)** — consider a simple visual
  contrast (e.g. two request types, one flagged as "not worth it") rather
  than a diagram.
- **Beat 5 (decision rule)** — likely stays typographic per TASK-020's own
  "scene-title-like typography" direction for the takeaway, but note if an
  option proposes otherwise.

For each option, state: what's new vs. reused, animation approach
(`interpolate()` vs. where `spring()` might fit per the standing rule), and
effort/risk (note explicitly whether an option risks visually front-running
Scene 13's own diagrams, which would undercut Scene 13's impact later in the
episode).

## Step 4 — Recommend one

Mark clearly as pending human approval, not final.

## Step 5 — Update the storyboard scene file

In `storyboard/scenes/scene-11-should-we-cache-everything.md`: document the
current TASK-020 implementation as superseded/under revision (keep as
history, don't delete), and add the proposed new direction marked "proposed,
pending approval." Do not change `Status` to anything implying
implementation has happened.

## Step 6 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-020A.md
```

Include: skills consulted and how they informed the options, the beat-by-beat
options considered, the recommendation, and specifically flag the
risk/overlap with Scene 13's diagrams called out in Step 3.

Do not implement anything. Stop after writing feedback.
