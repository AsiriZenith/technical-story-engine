# TASK-001 — Project Foundation

## Objective

Create the initial production foundation for a reusable technical-explainer video system.

The permanent core of the project is:

- **Remotion**
- **React**
- **TypeScript**

This repository is intended to support many future episodes, not only the first Redis video.

All externally generated media — AI illustrations, Canva assets, generated video clips, TTS audio, music, and sound effects — must be treated as **replaceable assets**. The application architecture must not depend on a particular external generation platform.

---

## Development Agent Strategy

The primary development agent for this project is **OpenAI Codex**.

If Codex usage/credits become constrained, development may continue using **Claude Code**.

Do not introduce implementation choices that unnecessarily depend on one coding agent. The repository, documentation, tasks, commands, and feedback files must remain understandable and usable by either Codex or Claude Code.

### Suggested model usage

This task does **not** require the most expensive/frontier model for every step.

Recommended approach:

#### Codex

- **Default / daily development:** GPT-5.6 Sol
- **Routine, well-specified edits where efficiency matters:** GPT-5.6 Terra
- **Escalate to GPT-6 Astra only when needed**, such as:
  - difficult architectural decisions;
  - complex multi-file debugging;
  - stubborn Remotion timing/rendering problems;
  - major refactors;
  - problems where the normal model has already failed after a reasonable attempt.

Do not use GPT-6 Astra by default merely because it is available.

#### Claude Code fallback

- **Default / daily development:** Claude Sonnet 5
- **Escalate to Claude Opus 5** for:
  - difficult architecture;
  - complex debugging;
  - large refactors;
  - problems Sonnet 5 cannot solve reliably.

The goal is to preserve high-capability-model usage for work that genuinely benefits from it.

---

## Project Principles

1. Remotion + React + TypeScript are the permanent video-production engine.
2. External assets must be replaceable without redesigning the episode.
3. Reusable functionality belongs under shared infrastructure rather than being copied into each episode.
4. Individual videos are **episodes inside the same repository**, not separate repositories.
5. Episodes are directories, not permanent Git branches.
6. Use short-lived feature branches when useful, and merge completed work into `main`.
7. Final renders and large generated intermediate files must not be committed to normal Git history.
8. The project must support localization from the beginning.
9. **English is the primary/original language.**
10. **German and French are additional localization languages.**
11. The visual timeline should remain language-neutral whenever practical.
12. Avoid baking language-specific text or dialogue into external generated clips when the same asset can instead be reused across languages.
13. Do not build production scenes yet. This task is foundation only.

---

## Initial Episode

The first episode is:

**Video #001 — Why Your API Gets Faster After Adding Redis**

Episode identifier:

```text
001-redis
```

Primary language:

```text
en
```

Additional languages:

```text
de
fr
```

The initial placeholder composition is only a technical verification that the project runs and renders.

---

## Required Repository Structure

Create a structure equivalent to the following. Minor changes are allowed when required by current Remotion conventions, but explain every meaningful deviation in the feedback report.

```text
.
├── src/
│   ├── shared/
│   │   ├── components/
│   │   ├── animations/
│   │   ├── layouts/
│   │   ├── localization/
│   │   ├── audio/
│   │   ├── styles/
│   │   └── utils/
│   │
│   └── episodes/
│       └── 001-redis/
│           ├── scenes/
│           ├── assets/
│           │   ├── characters/
│           │   ├── restaurant/
│           │   ├── generated-video/
│           │   └── sfx/
│           ├── narration/
│           ├── captions/
│           ├── metadata/
│           ├── episode.config.ts
│           └── RedisEpisode.tsx
│
├── public/
│   ├── shared/
│   └── episodes/
│       └── 001-redis/
│
├── scripts/
├── Tasks/
├── feedbacks/
├── renders/
├── .gitignore
├── package.json
├── tsconfig.json
├── remotion.config.ts
└── README.md
```

Do not add empty directories using meaningless placeholder files everywhere unless Git tracking requires it. Use `.gitkeep` selectively if necessary.

---

## Step 1 — Initialize the Application

Initialize a current Remotion project using:

- React;
- TypeScript;
- a maintainable project structure suitable for multiple compositions and episodes.

Use stable/current package versions compatible with one another.

Do not add unnecessary libraries.

The project should have straightforward scripts for at least:

```bash
npm install
npm run dev
npm run build
```

If current Remotion conventions use different commands, expose equivalent scripts and document them in `README.md`.

---

## Step 2 — Create Shared Infrastructure

Create the shared folder structure, but keep implementation minimal.

At this stage, do **not** prematurely build a full component library.

Create only enough infrastructure to establish the architectural boundaries.

Shared code should be intended for assets/features reused across episodes, such as future:

```text
ApiNode
RedisNode
DatabaseNode
RequestPacket
AnimatedArrow
TimingBar
Typography
Scene layouts
Audio helpers
Localization helpers
```

These examples are guidance only. Do not implement all of them in TASK-001.

---

## Step 3 — Episode Configuration

Create a typed configuration for `001-redis`.

The configuration should contain at least:

```ts
id: "001-redis"
title: "Why Your API Gets Faster After Adding Redis"
primaryLanguage: "en"
languages: ["en", "de", "fr"]
```

It should also provide an appropriate place for future episode-level properties such as:

- FPS;
- width;
- height;
- narration tracks;
- caption tracks;
- metadata;
- assets;
- scene timing.

Do not over-engineer a large schema yet.

---

## Step 4 — Localization Foundation

Create a very small but real localization mechanism.

Supported language codes:

```text
en
de
fr
```

English is the fallback/default language.

For TASK-001, only a few placeholder strings are required, for example:

```text
Video #001
Why Your API Gets Faster After Adding Redis
Language
```

Provide translations sufficient to demonstrate that the same composition can render language-dependent text.

The goal is architectural validation, not final translation quality.

Avoid duplicating an entire composition for each language.

Preferred conceptual usage:

```tsx
<RedisEpisode language="en" />
<RedisEpisode language="de" />
<RedisEpisode language="fr" />
```

or an equivalent typed design.

---

## Step 5 — Placeholder Composition

Create a clean placeholder composition at:

```text
1920 × 1080
30 FPS
```

A short duration is sufficient.

It should display approximately:

```text
VIDEO #001

Why Your API Gets Faster
After Adding Redis

Language: EN
```

Do not spend significant effort on design or animation.

The purpose is to prove:

- Remotion boots;
- TypeScript compiles;
- the episode is registered correctly;
- language selection works;
- rendering works.

If appropriate, register separate development compositions such as:

```text
Redis-EN
Redis-DE
Redis-FR
```

that all point to the same episode implementation with different language props.

Do **not** create three separately maintained episode components.

---

## Step 6 — Asset Boundaries

Establish conventions for replaceable external media.

The codebase must be able to later consume assets from sources such as:

- ChatGPT-generated illustrations;
- Canva;
- Google AI-generated images/video;
- other generated video tools;
- externally generated TTS;
- music;
- sound effects.

No provider-specific SDK is required in TASK-001.

No external media-generation API should become a required runtime dependency.

A future external restaurant clip should conceptually be replaceable by changing an asset path/configuration rather than rewriting the surrounding episode.

Document this principle briefly in the README.

---

## Step 7 — Audio and Multilingual Preparation

Do not generate narration in this task.

Create a sensible location/convention for future audio files such as:

```text
audio/
├── narration/
│   ├── en/
│   ├── de/
│   └── fr/
├── music/
└── sfx/
```

The repository should anticipate that the final YouTube workflow may use:

- one shared visual video;
- English original narration;
- German dubbed narration;
- French dubbed narration;
- language-specific caption files;
- language-specific YouTube metadata.

Do not implement YouTube uploading in TASK-001.

---

## Step 8 — Git Hygiene

Create an appropriate `.gitignore`.

At minimum, prevent normal Git tracking of:

- `node_modules`;
- Remotion/build caches;
- temporary files;
- rendered videos;
- large intermediate video output;
- generated temporary audio;
- local environment/secrets.

Examples that should generally remain outside normal Git:

```text
renders/
out/
*.mp4
*.mov
```

Do **not** blindly ignore every image/audio/video extension because some curated source assets may later need to be versioned.

If a future large source asset genuinely requires version control, Git LFS can be evaluated separately.

Do not configure Git LFS in this task unless it is actually necessary.

---

## Step 9 — README

Create a concise `README.md` documenting:

- project purpose;
- core stack;
- repository architecture;
- how to install dependencies;
- how to open Remotion Studio;
- how to render/test the placeholder;
- localization model (`en`, `de`, `fr`);
- episode directory convention;
- replaceable-external-asset principle;
- where generated renders belong.

Keep it practical rather than verbose.

---

## Step 10 — Verification

Before marking the task complete, verify as much as the environment permits.

At minimum:

1. dependencies install successfully;
2. TypeScript passes;
3. Remotion can enumerate/register the composition(s);
4. the English placeholder can render;
5. German and French variants use the same implementation rather than duplicated scene code;
6. no output video is accidentally tracked by Git;
7. no secrets or local credentials are committed.

If full rendering cannot be executed because of the environment, clearly state exactly what could and could not be verified.

Do not claim a test passed unless it was actually run.

---

# Acceptance Criteria

TASK-001 is complete only when:

- [ ] Remotion + React + TypeScript project is functional.
- [ ] Repository is organized for multiple episodes.
- [ ] `001-redis` exists as the first episode.
- [ ] English, German, and French are represented in typed configuration.
- [ ] English is the primary/default language.
- [ ] A shared composition implementation can display localized placeholder text.
- [ ] The placeholder composition is 1920×1080 at 30 FPS.
- [ ] Shared infrastructure directories exist without unnecessary over-engineering.
- [ ] Replaceable external-asset conventions are documented.
- [ ] Heavy renders/intermediate output are ignored by Git.
- [ ] README contains setup and verification instructions.
- [ ] TypeScript/build checks have been run.
- [ ] A placeholder render has been attempted and its result recorded.
- [ ] A feedback report has been created.

---

# Out of Scope

Do **not** do any of the following in TASK-001:

- build the final Redis intro animation;
- generate restaurant artwork;
- integrate AI-generated video;
- implement final characters;
- generate TTS;
- write German/French final narration;
- build final captions;
- create YouTube thumbnails;
- implement YouTube upload automation;
- add music;
- add sound design;
- build the complete reusable component library;
- render the full episode.

Those belong to later tasks.

---

# Required Feedback Report

After completing the task, create:

```text
feedbacks/task-001-feedback.md
```

The feedback must include:

## 1. Summary

What was implemented.

## 2. Files Created or Changed

List the important files/directories and briefly explain their purpose.

## 3. Commands Executed

Include the important commands actually run.

## 4. Verification Results

Report separately:

```text
PASS
FAIL
NOT RUN
```

for:

- dependency installation;
- TypeScript;
- build;
- Remotion composition discovery;
- English render;
- German localization;
- French localization.

Do not hide failures.

## 5. Architecture Decisions

Explain any meaningful choices or deviations from TASK-001.

## 6. Problems / Risks

List:

- errors encountered;
- workarounds;
- technical debt;
- questionable assumptions;
- environment limitations.

## 7. Agent Recommendations

State what the next development task should probably focus on based on the actual repository state.

Do **not** begin that next task.

## 8. Git Status

Report:

- current branch;
- changed/untracked files;
- whether any generated render or large binary appears to be tracked accidentally.

## 9. Final Status

Finish with exactly one:

```text
TASK-001 STATUS: PASS
```

or

```text
TASK-001 STATUS: PARTIAL
```

or

```text
TASK-001 STATUS: BLOCKED
```

Do not mark the task `PASS` if critical acceptance criteria were not verified.

---

# Important Agent Behavior

- Inspect the repository before making changes.
- Prefer simple, explicit architecture over premature abstraction.
- Use current Remotion conventions.
- Keep the implementation easy for another coding agent to continue.
- Do not silently expand scope.
- Do not continue into TASK-002.
- If an assumption would significantly affect the architecture, document it in the feedback rather than hiding it.
- Leave the repository in a runnable state.
