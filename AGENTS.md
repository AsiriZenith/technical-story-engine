# Technical Story Engine Agent Guide

## Scope and core

- Remotion, React, and TypeScript are the permanent production core.
- External image, video, TTS, music, and design tools are replaceable asset providers, never architectural dependencies.
- Follow only the active `tasks/TASK-00X.md`; do not start the next task. Always create its requested feedback report.

## Repository architecture

- Keep all episodes in `src/episodes/`; do not create per-episode repositories or permanent episode branches.
- Put genuinely reusable code in `src/shared/` and episode-specific code in its episode directory. Do not promote one-off code prematurely.
- Keep DEV playground code in `src/dev/` and clearly separated from production compositions.

## Timing and localization

- Use scene-relative local frames, normalized progress, and named timing constants. Do not scatter absolute global frame numbers through scene code.
- Supported languages are `en`, `de`, and `fr`; English is primary. Keep one shared conceptual visual timeline and one episode implementation.
- Keep visuals language-neutral where practical. Render essential localized copy in Remotion instead of baking it into generated media.

## Assets and visual communication

- Reference external media through provider-independent logical asset IDs. A provider change must not require scene architecture changes.
- Technical clarity outranks visual novelty. Give each scene one focal idea and prefer simple visuals, purposeful motion, and one technical insight.
- Use analogies to teach: real-world metaphor -> explicit mapping -> technical model.
- Humor is brief seasoning: explain -> tiny visual joke -> continue. Never let a joke weaken a central explanation.

## Validation and review

- Run the relevant typecheck, build, composition discovery, scene/asset validation, and representative render checks before completion.
- For visible changes, render and inspect representative frames; compilation alone is insufficient. Record focal point, readability, safe margins, alignment, correctness, pacing, hierarchy, language overflow, asset quality, and known issues.
- Apply the Human Media Review Gate in `docs/agent-workflow.md`: rendered media may become a `candidate`, but only explicit user acceptance may mark it `approved`. End media-producing tasks with `HUMAN REVIEW: PENDING` and stop.
- Report only checks actually executed. Preserve user changes, avoid unrelated scope, and do not commit or push unless explicitly authorized.

See `docs/production-architecture.md` and `docs/agent-workflow.md` for maintained detail. Keep `CLAUDE.md` pointing to this shared source when these rules change.
