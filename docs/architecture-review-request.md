# Task: Architecture & Folder Structure Review

## Context

This is a React + Remotion + TypeScript project (`technical-story-engine`) for producing
long-form (10–12 min) developer-education videos. Some video generation has already been
attempted, but the output quality wasn't satisfying. Before continuing content production,
I'm pausing to properly understand this codebase's current architecture and Remotion's
capabilities, so future scene specs and prompts can be more precise.

This review is exploratory and read-only — it should not change any application code.

## Step 1 — Create a branch first

Before doing anything else, create and check out a new git branch for this exploratory
work, off the current branch:

```
git checkout -b learning/architecture-review
```

Do not commit any code changes on this branch — only the feedback file described below.

## Step 2 — Analyze the existing project

Walk the project's folder structure and source files, and build an understanding of:

1. **Folder structure** — what each top-level and key nested directory is for
   (e.g. compositions, components, assets, audio, scripts, config).
2. **Component architecture** — how scenes/compositions are structured:
   - Are there reusable "template" components (title card, comparison layout,
     code-reveal, diagram) or is each video's visuals written one-off?
   - How is animation logic organized — shared hooks/utilities vs. repeated
     inline `interpolate`/`spring` calls per component?
   - How are typography, color, and spacing handled — a shared theme/tokens file,
     or hardcoded per component?
3. **Audio handling** — how narration and background music are wired in
   (structure only, not implementation detail).
4. **Timing/duration approach** — whether scene/video duration is derived from
   audio length (`calculateMetadata`, `getAudioDurationInSeconds`) or hardcoded
   frame counts.
5. **Captions** — whether any caption/subtitle system exists yet, and how.
6. **Naming and file conventions** — consistency of naming, file organization,
   and whether the structure would scale cleanly to many more videos.
7. **Reusability gaps** — anything that would make producing video #2, #5, or #20
   harder than it should be (duplicated code, missing abstractions, brittle
   one-off scenes).

## Step 3 — Write the feedback file

Write your findings to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\architecture-review.md
```

Structure the file with these sections:

```markdown
# Architecture Review — [date]

## Overview
Brief summary of the project's current state and maturity.

## Folder Structure Summary
What exists today, directory by directory, and what each is for.

## Component Architecture
How scenes/compositions/templates are currently organized. Include concrete
file/component names as examples, not just generalizations.

## Audio & Timing Approach
How narration, music, and duration are currently handled.

## Strengths
What's already well-structured and worth keeping/building on.

## Issues & Gaps
Specific things that will limit reuse, consistency, or scaling to more videos.
Be concrete — name files/patterns, not vague categories.

## Recommendations
Concrete suggestions for a reusable template/component structure going forward
(e.g. a shared `templates/` folder, a `theme.ts` tokens file, a shared
`useAudioDrivenDuration` hook) — recommendations only, do not implement them yet.
```

Keep the tone factual and specific — this file will be read by a developer who
knows the codebase but wants an outside pass on it before deciding what to
refactor or standardize.
