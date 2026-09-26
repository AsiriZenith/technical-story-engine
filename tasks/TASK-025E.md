# TASK-025e: Scene 13 Rebuild Implementation (Option A)

## Why

Human review found the current `Scene13CacheCosts.tsx` visually flat. Option
A (per-category mini-diagrams) was approved in TASK-025d planning. This task
implements it, replacing the four text-label-plus-caption callouts with
literal small diagrams.

## Standing rule being applied here (confirm if you disagree)

`spring()` is used for node-settle/return-to-state beats; `interpolate()` is
used for everything else. This resolves the open `spring()` question from
TASK-025d/025b as a standing rule rather than a per-scene decision. Apply it
here: the resilience beat's node-dims-then-returns settle uses `spring()`;
the freshness ring, capacity bar, and heartbeat motif use `interpolate()`.

## Step 1 — Read context first

- `storyboard/scenes/scene-13-cache-tradeoffs.md` (approved Option A
  description, and the superseded approach kept as history — do not
  reintroduce that structure).
- The current `Scene13CacheCosts.tsx`, to understand what's being replaced
  (central Redis node, `windowOpacity` pattern for the four callout
  positions) and what should be kept vs. rebuilt.
- `shared/motion/presets.ts` for existing named timing constants — reuse
  them where they fit; only add new named presets if genuinely needed (don't
  scatter new magic numbers).
- Scene 01's packet-and-path grammar (for the resilience beat's reroute-to-
  Database moment) and Scene 12's Database-vs-Redis divergence treatment
  (for the freshness-ring inspiration) — reuse the visual vocabulary, not
  necessarily the code, per this codebase's established "re-implement a
  simplified local copy" convention (Scene 13 already did this for its own
  node, per TASK-025b's findings).

## Step 2 — Build the four per-category diagrams

All inline SVG/div — no new external image assets, consistent with the
planning task's confirmation that none are needed:

1. **Memory usage** — a filling/evicting capacity bar.
2. **Stale data** — a decaying freshness ring.
3. **Resilience / not every request is expensive enough** — Redis node dims,
   a request packet reroutes to a Database node that appears only for this
   beat, then Redis returns to its settled state (`spring()` on the return,
   per the standing rule above).
4. **Cache misses still happen / monitoring** — a pulsing operations/
   heartbeat motif.

Keep the central Redis node from the current implementation if it still
fits Option A's composition; adapt as needed.

## Step 3 — Self-review before writing feedback

Apply the `review-animations` skill (named but not directly used in
TASK-025d, since there was no code yet) to your own output: check for
justified motion, GPU-safe properties (`transform`/`opacity`-equivalent via
`interpolate()`/`spring()`, not layout-triggering properties), and no
keyframes that jarringly restart from zero if a beat is short. Fix anything
that fails this check before finalizing.

## Step 4 — Update the storyboard scene file

In `storyboard/scenes/scene-13-cache-tradeoffs.md`:
- Mark `Visual Approach` as implemented (Option A), keep the superseded
  approach as history as before.
- Update `Status` to reflect the scene is rebuilt and awaiting human video
  review (this is a different gate than the typed/automated checks — per
  the project's existing convention, only the human confirms final
  approval).

## Step 5 — Resolve the ambient-label entry in `decisions.md`

Per TASK-025d's finding, Option A makes item 3 (ambient-label visibility)
moot, since the vignettes retire in sequence rather than settling into a
lingering partial state. Update that entry to reflect it's resolved by this
rebuild, pending the human review in Step 4 confirming that's actually how
it reads on screen.

## Step 6 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\task-025e-scene13-rebuild-feedback.md
```

Include: what was built for each of the four diagrams, confirmation of the
self-review pass in Step 3, current render length/timing impact if changed,
and explicit confirmation that this does not block or change the Scene 14
implementation task (TASK-026) — they are independent, though Scene 13's
human review (separate from this feedback) still gates it per the existing
sequencing note.
