# TASK-025d: Scene 13 Visual Rebuild Planning

## Why

Scene 13 was reviewed by the human and found unsatisfying: the visuals feel
flat and don't meet the new "visual-first design principle" established in
`AGENTS.md` (TASK-025c) — every scene should default to a diagram/animation/
visual metaphor over a plain or minimally-visual treatment. This calls for a
**full creative rebuild**, not a targeted tweak: rethink Scene 13's visual
approach from scratch, keeping only its underlying teaching content.

**This is a planning task only. Do not write or modify any `.tsx` component
code. Do not implement anything.**

## Step 1 — Read context first

- `storyboard/scenes/scene-13-cache-tradeoffs.md` — the current
  Purpose/Narrative Beat (what this scene must teach) and its current Visual
  Approach (what's being replaced).
- `decisions.md` item 3 — the existing open issue about Scene 13's
  closing-frame ambient labels (partially visible/hidden). Note whether your
  proposed rebuild makes this issue moot, or whether it still applies.
- The new "Visual-first design principle" section in `AGENTS.md`.
- Scenes 11 and 12's storyboard files and implementation, for consistency —
  these are the neighboring scenes in the same "fully Remotion-native, no
  image asset" stretch of the episode.

## Step 2 — Use the installed skills

Before proposing options, check `.agents/skills/` (the `remotion-dev/skills`
pack plus the three custom specialist skills, tracked via
`skills-lock.json`) for any skill relevant to diagram construction,
animation, or visual composition. Actually consult and apply the relevant
skill(s) while forming your proposals in Step 3 — don't just note that they
exist. If a skill provides patterns or components suited to this scene's
content (cache trade-offs: memory usage, stale data, synchronization, "not
every request is expensive enough," cache misses still happen), reflect that
in the options below and name which skill informed which option.

## Step 3 — Propose 2-3 rebuilt visual approach options

For each option, per the visual-first principle, options should lean toward
strong diagram/animation treatments — a plain-text fallback should only
appear if explicitly labeled as the deliberate low-effort option, not
presented as an equal peer (per `AGENTS.md`'s guidance). For each option
describe:
- What appears on screen and in what order, and how it visually represents
  the trade-offs (memory usage, staleness, sync burden, "not everything is
  worth caching").
- Which installed skill(s) informed it, and which existing shared
  components/assets it reuses vs. what new work it requires (no new external
  images should be needed — confirm this explicitly per Claude's earlier
  guidance that Scene 13/14-area scenes don't require generated imagery).
- Animation approach (`interpolate()` vs. considering `spring()` for any
  emphasis beat — note but don't decide the `spring()` question if it comes
  up; flag it as open, consistent with how it was handled for Scene 14).
- Trade-offs: production effort vs. visual impact.

## Step 4 — Recommend one

State your recommendation and reasoning, clearly marked as pending human
approval, not final.

## Step 5 — Update the storyboard scene file

In `storyboard/scenes/scene-13-cache-tradeoffs.md`:
- Keep the current (superseded) Visual Approach documented as history, don't
  delete it.
- Add the new proposed rebuild direction, marked "proposed rebuild, pending
  approval."
- Note whether the ambient-label issue from `decisions.md` item 3 is resolved
  by the new approach or still open.
- Do not change `Status` — the scene remains "implemented" until the rebuild
  is actually done in a future implementation task.

## Step 6 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\task-025d-scene13-rebuild-planning-feedback.md
```

Include: which skills were consulted and how they informed the options, the
options considered, the recommendation, and the status of the ambient-label
issue under the new approach.
