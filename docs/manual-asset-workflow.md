# Manual Asset Workflow

For scene-specific visual assets where precision matters, image generation
happens outside the agent, first. This policy exists because it is what
actually worked, not because it is the more cautious-sounding option.

## The lesson this policy comes from

TASK-008's family of attempts (TASK-008 / 008A / 008B / 008C) tried to give
the agent a joke diagram and a before/after payoff diagram to build from a
reference image. Every attempt followed the same failing loop:

```text
reference image -> agent reinterprets -> agent redraws a different diagram
-> output does not match what was asked for
```

The agent could follow the general idea but kept substituting its own
objects, staging, and layout for the reference's specific ones. Multiple
revisions did not fix this, because the failure was structural: reinterpretation
guesses at intent, and guesses drift.

TASK-008 (the reset attempt) instead used two PNGs the user generated,
reviewed, and placed directly into the repository at
`public/episodes/001-redis/assets/scene-03-joke-diagram.png` and
`scene-03-end-diagram.png`. The agent rendered those exact files with
Remotion's `<Img>` full-bleed, changing nothing about their content. That
attempt matched expectations immediately. See `feedbacks/task-008-feedback.md`
for the full record, including a pixel-level check confirming the rendered
frames matched the source files to within resampling noise.

Conclusion: for visual assets where precision matters, manual creation +
manual placement + direct use beats agent reinterpretation. This document
codifies that as the default, not an exception.

## Rule 1 — Manual asset ownership

The user owns the image-generation step for scene-specific visual assets.

That means:

- the user may create visuals with any external tool (image generators,
  Canva, a design tool, hand-drawn artwork — the tool is never an
  architectural dependency, per `AGENTS.md`);
- the user reviews and approves the result before it enters the repository;
- the user manually adds the approved file to the repository;
- only then may the agent use it in scene implementation.

The agent does not initiate scene-visual generation requests as a way to move
a task forward. If an asset is missing, see Rule 4.

## Rule 2 — No agent-led reinterpretation once an approved asset exists

If the user has supplied a final production asset (see Rule 3), the agent
must use that exact asset.

The agent must not:

- redraw it;
- reinterpret it;
- replace it with an approximate recreation;
- swap in invented objects or staging;
- silently "improve" it by redesigning it.

Allowed operations, all of which preserve the asset's content:

- import (via `staticFile()` and Remotion's `<Img>`/`<Video>`, addressed by
  logical asset ID per `AGENTS.md`'s asset rule);
- scale, position, animate;
- crop, but only if explicitly instructed and safe — cropping a diagram that
  depends on its full composition is not safe by default;
- mask/reveal, if the reveal preserves the asset's meaning rather than
  fragmenting it;
- layer localized or supporting text around the asset, never over its
  content;
- integrate it into the episode's established background, palette, and
  motion system.

## Rule 3 — Distinguish asset types

Every scene task must state which of these two kinds each visual input is.

### Reference-only asset

Used to inspire or guide creation. May be interpreted, adapted, or recreated
natively in Remotion. Its background, exact layout, and incidental details
are not binding — only the concept it is meant to convey is.

In the `001-redis` episode, `public/episodes/001-redis/reference/*.jpg` are
reference-only: they informed earlier design intent but were never meant to
appear in the rendered video.

### Final production asset

Already reviewed and approved by the user for direct use. Must be rendered
exactly as supplied unless the task explicitly instructs otherwise. Registered
in the episode's asset manifest (`src/episodes/001-redis/assets.ts`) with a
real `path`, consumed by scenes through a manifest lookup by logical ID,
never by a scene hard-coding a file path.
`src/episodes/001-redis/asset-resolver.ts` holds the episode's canonical
`resolveAsset()` lookup.

In the `001-redis` episode, `public/episodes/001-redis/assets/scene-03-joke-diagram.png`
and `scene-03-end-diagram.png` are final production assets.

A task file must never leave this ambiguous. If a task hands the agent an
image and does not say which kind it is, the agent should ask rather than
guess — guessing which kind an asset is reproduces the exact failure this
policy exists to prevent.

## Rule 4 — Pause if a required asset does not exist yet

If scene implementation depends on a visual that is not yet in the
repository as a final production asset:

```text
stop the dependent implementation,
document exactly what is needed (see the task-authoring template below),
ask the user to create/add it,
resume only after the asset exists.
```

Do not fill the gap with an agent-generated placeholder that is intended to
be mistaken for the final visual. A clearly-labeled DEV-only placeholder
(per `AGENTS.md`'s `src/dev/` separation) is acceptable for layout
experimentation; a production scene is not.

## Rule 5 — Task files must include an asset contract

Any task that depends on user-supplied visuals should include a section
shaped like this:

```markdown
## Manual Asset Inputs

### Asset 1

Path:
Type: reference-only / final production
Usage:
Allowed transformations:
Localization notes:
Baked text: yes / no — if yes, which languages it blocks
```

Repeat per asset. If every needed asset already exists and is final
production, the task should say so explicitly rather than leaving the section
implied.

Pair it with an explicit stop condition:

```markdown
If a listed asset is not yet present in the repository, stop implementation
for the parts that depend on it and report exactly what is missing.
```

And an explicit non-goal, to close the door the previous attempts kept
walking through:

```markdown
Do not generate, redraw, or recreate these assets unless this task explicitly
instructs otherwise.
```

## Rule 6 — Human control is preferred for critical visual beats

Default to a human-generated or human-approved asset first, agent scene
implementation second, whenever a scene contains any of:

- a key joke beat;
- an explanatory diagram carrying the scene's core technical point;
- a branded composition;
- a dense infographic;
- any composition where visual precision is part of what makes it correct.

Scenes that are mostly Remotion-native layout (text, simple architecture
nodes, motion) do not need this — this rule targets the cases TASK-008
actually failed on, not every visual in the episode.

## How this changes task authoring going forward

- A scene task that needs precise visuals asks the user for those visuals
  before or alongside the task, not as an agent-generated deliverable inside
  the task.
- The task file states, per asset, whether it is reference-only or final
  production, using Rule 5's template.
- The agent's job for a final production asset is integration (position,
  scale, motion, surrounding localized text), not creation.
- `docs/agent-workflow.md`'s existing `External Asset Requests` handoff
  section still applies to genuinely replaceable media (illustrations,
  generated clips, TTS, music) where the provider and exact result are not
  precision-critical. This document's stricter rule applies specifically to
  scene-defining visuals where the previous reinterpretation loop caused
  real failures.

## Related documents

- `AGENTS.md` — the top-level operating rules this document extends.
- `docs/production-architecture.md` — the asset manifest, status lifecycle
  (`placeholder` / `candidate` / `approved`), and logical-ID resolution
  architecture that final production assets are registered into.
- `docs/agent-workflow.md` — task lifecycle, the Human Media Review Gate, and
  the `Human Review Requests` / `External Asset Requests` feedback contract.
