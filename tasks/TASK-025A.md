# TASK-025b: Scene 14 Visual Approach Planning

## Why

`storyboard/scenes/scene-14-final-mental-model.md` currently has Purpose and
Narrative Beat filled in, but `Visual Approach` is explicitly undecided. Per
the recommended task sequence, this decision should be made and reviewed
before implementation starts (TASK-026), not invented mid-build.

**This is a planning task only. Do not write or modify any `.tsx` component
code. Do not implement Scene 14.**

## Step 1 — Read context first

- `src/episodes/001-redis/storyboard/scenes/scene-14-final-mental-model.md`
  (Purpose/Narrative Beat — the source of truth for what this scene must say)
- `src/episodes/001-redis/storyboard/README.md` (episode goal/thesis, so the
  recap scene reinforces the right mental model)
- The other 13 scene files, briefly, to identify which visual motifs already
  exist (SpotlightImage architecture diagram, TimingBar, restaurant analogy
  imagery, etc.) that a recap scene could reuse rather than invent new assets
  for.

## Step 2 — Propose 2-3 visual approach options

For each option, describe (in prose, no code):
- What appears on screen and in what order.
- Which existing assets/components it reuses (`SpotlightImage`, `TimingBar`,
  existing character/analogy imagery) vs. what (if anything) new it would
  require.
- Which animation approach fits best — this episode has used `interpolate()`
  everywhere and `spring()` nowhere; note where `spring()` would suit a
  recap/emphasis beat better than `interpolate()`, per
  `shared/motion/presets.ts` and `AGENTS.md`'s existing guidance.
- Trade-offs: production effort (new assets needed?) vs. how well it lands
  the "what work did Redis let us stop doing?" mental model as the final
  takeaway of the episode.

## Step 3 — Recommend one

State which option you'd recommend and why, but do not treat this as final —
flag it as a recommendation awaiting human approval.

## Step 4 — Update the storyboard scene file

Fill in the `Visual Approach` section of
`scene-14-final-mental-model.md` with the recommended option (clearly marked
as "proposed, pending approval," not "decided"). Leave `Status` as "Not yet
implemented."

## Step 5 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\task-025b-scene14-planning-feedback.md
```

Include: the options considered, the recommendation, any open questions that
need a human decision before TASK-026 (implementation) can start.
