# TASK-003 — Agent Operating Rules, Dev Playground, and Custom Skill Skeleton

## Objective

Strengthen `technical-story-engine` before real scene production begins.

This task establishes:

1. persistent project instructions for Codex;
2. persistent project instructions for Claude Code;
3. development-only Remotion compositions for isolated visual testing;
4. a project-specific skill skeleton for `technical-story-engine`;
5. lightweight validation and review conventions for future visual tasks.

This task is still infrastructure work.

Do **not** begin production animation for the Redis episode.

---

# Preconditions

TASK-003 should only begin after:

```text
TASK-002 STATUS: PASS
```

and after TASK-002 changes have been reviewed and committed.

Before making changes, verify:

```bash
git status
git log --oneline -5
```

Expected:

- repository has a clean TASK-002 baseline;
- official Remotion skills are installed for Codex;
- official Remotion skills are installed for Claude Code;
- the 14-scene contract exists;
- the timing contract exists;
- the replaceable asset manifest exists.

If TASK-002 is not complete or the working tree contains unexplained changes, stop and report the blocker.

Do not silently combine unfinished TASK-002 work with TASK-003.

---

# Part A — Create `AGENTS.md`

Create a root-level:

```text
AGENTS.md
```

This file is the persistent operating guide for Codex.

Keep it concise enough that an agent can actually follow it.

It should cover the following project rules.

## Core Technology

```text
Remotion + React + TypeScript
```

are the permanent production core.

External tools are optional asset providers, not architectural dependencies.

Examples:

```text
ChatGPT image generation
Canva
Google AI
Claude-assisted design
external TTS
music/SFX tools
future generators
```

A scene should not need to be rewritten merely because an asset provider changes.

---

## Episode Architecture

This repository contains many episodes.

Episodes live under:

```text
src/episodes/
```

Do not create a separate repository per episode.

Do not use permanent Git branches to represent episodes.

Reusable functionality belongs in:

```text
src/shared/
```

Episode-specific functionality belongs inside the episode directory.

Do not prematurely promote one-off code to shared infrastructure.

---

## Scene Timing Rules

Never scatter arbitrary absolute global frame numbers through scene code.

Prefer:

```text
scene-relative timing
normalized progress
local frame values
named timing constants
```

Animations should remain adaptable to scene-duration changes.

Avoid code patterns such as:

```ts
if (frame === 1847) { ... }
```

when the event logically belongs to a scene-relative moment.

---

## Localization Rules

Supported languages:

```text
en
de
fr
```

Primary/original:

```text
en
```

Visuals should remain language-neutral where practical.

Avoid baking essential language-specific text into generated media.

Important on-screen copy should be rendered by Remotion when practical so it can later be localized.

German and French should share the same conceptual visual timeline as English.

Do not create separate duplicated episode implementations for each language.

---

## External Asset Rules

All external media must be referenced through provider-independent logical asset definitions.

Bad:

```tsx
<GoogleGeneratedRestaurantClip />
```

Better:

```tsx
<RestaurantScene assetId="restaurantGeneratedClip" />
```

or equivalent.

Asset providers may change without changing surrounding scene architecture.

---

## Visual Communication Rules

Technical correctness is more important than visual novelty.

Every scene should have one clear focal idea.

Prefer:

```text
simple visual
→ clear motion
→ one technical insight
```

over:

```text
many decorative elements
+ multiple competing labels
+ unnecessary motion
```

Real-world analogies should help explain the engineering model.

Preferred storytelling pattern:

```text
real-world metaphor
        ↓
visual mapping
        ↓
technical model
```

Do not use analogy merely as decoration.

---

## Humor Rules

Humor is seasoning, not the main content.

Preferred rhythm:

```text
explain
→ small visual joke
→ continue
```

Humor should:

- reinforce the technical point;
- be short;
- work visually where possible;
- not interrupt key explanations.

Avoid:

- constant memes;
- forced internet slang;
- jokes that obscure technical meaning;
- humor during the central lesson if it weakens clarity.

---

## Validation Rules

Before completing a coding task, run the checks relevant to that task.

Typical baseline:

```text
typecheck
build
composition discovery
scene validation
asset validation
representative still/preview render
```

Never claim a check passed unless it was actually executed.

For visual work, successful TypeScript/build is **not enough**.

A representative visual output must be inspected whenever practical.

---

## Task Discipline

When implementing files such as:

```text
tasks/TASK-00X.md
```

follow that task only.

Do not automatically continue to the next task.

Always produce the requested feedback report.

Do not silently expand scope.

---

# Part B — Create `CLAUDE.md`

Create a root-level:

```text
CLAUDE.md
```

This is the project operating guide for Claude Code.

It should express the same project principles as `AGENTS.md`.

Do not maintain two completely different policy documents.

Preferred approach:

- keep the important project rules aligned;
- allow small agent-specific notes only when required;
- avoid unnecessary duplication that will drift.

If the agent ecosystem supports referencing a shared project document safely, that may be used.

Otherwise, maintain both files with deliberately parallel sections.

Document how future contributors should keep them synchronized.

---

# Part C — Add Project Documentation for Agent Workflow

Create a concise document such as:

```text
docs/agent-workflow.md
```

It should explain:

```text
TASK file
   ↓
Agent implementation
   ↓
Validation
   ↓
feedbacks/task-XXX-feedback.md
   ↓
Human/ChatGPT review
   ↓
Next TASK
```

Also document the recommended model escalation strategy:

```text
Codex:
GPT-5.6 Sol → default
GPT-6 Astra → difficult/escalated work only

Claude Code:
Sonnet → default
Opus → difficult/escalated work only
```

The exact available model names may evolve, so keep this section practical rather than deeply coupled to a specific CLI implementation.

Also explain that agent switching should ideally happen at task boundaries rather than halfway through an unfinished task.

---

# Part D — Development-Only Remotion Compositions

Create a development/playground area for reusable visual components.

Suggested structure:

```text
src/dev/
├── DevRoot.tsx
├── components/
└── compositions/
```

or a similarly clean structure.

Create development-only compositions for at least:

```text
DEV-Typography
DEV-ArchitectureNodes
DEV-MotionBasics
DEV-AssetPreview
```

Names may vary slightly if current project conventions suggest something better.

These compositions are **not final episode content**.

Their purpose is fast visual iteration without rendering the full episode.

---

## DEV-Typography

Demonstrate:

- primary title;
- secondary heading;
- body text;
- code/technical label;
- numeric emphasis such as `180 ms`;
- status labels such as `CACHE HIT`.

Use existing theme tokens from the project where possible.

Do not finalize the channel's entire visual identity yet.

This composition is a sandbox for visual comparison.

---

## DEV-ArchitectureNodes

Create simple development placeholders for conceptual nodes such as:

```text
Client
Application
Redis
Database
```

These may be basic React/SVG components.

Do not over-design them.

The goal is to create an isolated environment where later tasks can improve:

```text
<ApiNode />
<RedisNode />
<DatabaseNode />
<RequestPacket />
```

without opening the entire Redis episode.

If existing TASK-002 architecture already defines suitable placeholders, reuse it rather than duplicating.

---

## DEV-MotionBasics

Provide a small visual test area for common motion primitives.

Examples:

```text
fade in/out
slide
scale emphasis
stagger
spring entrance
simple path/request movement
```

Use official Remotion guidance.

Do not build a huge motion library.

The purpose is to validate:

- timing;
- readability;
- common motion behavior;
- render correctness.

---

## DEV-AssetPreview

Provide a generic composition capable of previewing an asset from the provider-independent asset manifest.

It should make it easy to inspect:

```text
placeholder
candidate
approved
```

assets.

For images:

- show fit/contain behavior;
- show transparency if applicable;
- display logical asset ID;
- display status.

For video assets, if none currently exist, the composition may support the future contract without requiring a real video asset in TASK-003.

Do not hard-code a provider into this viewer.

---

# Part E — Development Composition Registration

Keep development compositions clearly separate from production episode compositions.

For example:

```text
PROD / episode compositions
Redis-EN
Redis-DE
Redis-FR

DEV / playground
DEV-Typography
DEV-ArchitectureNodes
DEV-MotionBasics
DEV-AssetPreview
```

Do not duplicate the entire Remotion root if one clean root can register both groups.

If useful, add a small convention or helper for composition categories.

Avoid unnecessary abstraction.

---

# Part F — Custom Project Skill Skeleton

Create our project-specific skill skeleton.

Codex path:

```text
.agents/skills/technical-story-video/
```

Claude Code path:

```text
.claude/skills/technical-story-video/
```

Do not yet write a massive skill.

The initial skill should contain the essential workflow and reference project documentation where appropriate.

Suggested purpose:

```text
Teach an agent how this repository converts a technical topic/article into
a clear, multilingual technical explainer video using the project's
storytelling, Remotion, asset, localization, and review conventions.
```

The skill should include a concise workflow such as:

```text
source material
↓
core technical thesis
↓
video narrative
↓
narration
↓
storyboard
↓
visual metaphor
↓
technical representation
↓
implementation
↓
render
↓
director review
↓
revision
```

It should also capture:

```text
real-world metaphor → technical model
```

and:

```text
technical clarity > visual novelty
```

and:

```text
explain → tiny joke → continue
```

Keep the skill modular enough to evolve after Video #001.

Do not copy the entire `AGENTS.md` into the skill.

Reference project docs where possible to reduce duplication.

---

# Part G — Skill Synchronization

Because both Codex and Claude Code need this custom skill, define how the two copies stay synchronized.

Preferred options:

1. supported link/reference mechanism if reliable on Windows and across Git;
2. a canonical skill source plus a small sync script;
3. two generated copies backed by one canonical source.

Do not use brittle symlink behavior if it creates Windows compatibility problems.

A simple script such as:

```text
scripts/sync-agent-skills.*
```

is acceptable if needed.

The source of truth should be obvious.

Document it.

---

# Part H — Visual QA Convention

Introduce a lightweight future visual-review convention.

For any task that changes visible output, the feedback report should later include:

```text
Visual QA
- composition rendered
- frame(s) inspected
- what was checked
- known visual issues
```

Suggested checks:

```text
focal point
text readability
safe margins
alignment
technical correctness
motion pacing
visual hierarchy
language overflow
asset quality
```

Do not build automated computer-vision scoring.

This is a human/agent review checklist.

Add the convention to project documentation.

---

# Part I — Optional Screenshot/Still Helper

If simple and useful, add a small script or documented command for rendering representative development stills.

Example conceptual commands:

```text
npm run dev:still:typography
npm run dev:still:nodes
```

or a generic equivalent.

Do not add many scripts merely for convenience.

The goal is to make:

```text
implement
→ render still
→ inspect
→ fix
```

fast.

---

# Part J — Validation

Run and record:

```text
TypeScript
build
composition discovery
scene/asset validation from TASK-002
development composition discovery
at least one DEV still render
existing Redis composition regression check
```

Visually inspect at least one representative DEV still.

The DEV compositions do not need to look polished yet.

They need to be functional and useful for future iteration.

---

# Acceptance Criteria

TASK-003 is complete only when:

- [ ] TASK-002 is complete, reviewed, and committed before TASK-003 changes.
- [ ] Root `AGENTS.md` exists.
- [ ] Root `CLAUDE.md` exists.
- [ ] Both documents reflect the same core project rules.
- [ ] Agent task/feedback workflow is documented.
- [ ] Development-only Remotion compositions exist.
- [ ] `DEV-Typography` exists.
- [ ] `DEV-ArchitectureNodes` exists.
- [ ] `DEV-MotionBasics` exists.
- [ ] `DEV-AssetPreview` exists.
- [ ] DEV compositions are clearly separated from production compositions.
- [ ] A project-specific `technical-story-video` skill exists for Codex.
- [ ] The same skill is available to Claude Code.
- [ ] There is a documented synchronization/source-of-truth strategy for the custom skill.
- [ ] The custom skill does not duplicate large project docs unnecessarily.
- [ ] Visual QA expectations are documented.
- [ ] At least one DEV still is rendered and inspected.
- [ ] Existing EN/DE/FR Redis compositions remain discoverable.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] TASK-002 validation remains passing.
- [ ] No final Redis production scene is implemented.
- [ ] `feedbacks/task-003-feedback.md` is created.

---

# Out of Scope

Do not:

- create final channel branding;
- lock final typography;
- generate final chef/cashier/customer characters;
- generate Canva assets;
- generate Google AI clips;
- implement the final restaurant sequence;
- implement the final intro scene;
- implement final Redis architecture animations;
- create narration;
- create captions;
- add music/SFX;
- localize final scripts;
- upload anything to YouTube;
- install additional third-party community skill packs;
- begin TASK-004.

---

# Required Feedback Report

Create:

```text
feedbacks/task-003-feedback.md
```

It must contain:

## 1. Summary

What was implemented.

## 2. Preconditions

Report:

```text
TASK-002 baseline: PASS / FAIL
Git clean baseline: PASS / FAIL
```

## 3. Agent Instructions

Describe:

- `AGENTS.md`;
- `CLAUDE.md`;
- how they remain aligned;
- any agent-specific differences.

## 4. Development Compositions

List every DEV composition and explain its purpose.

## 5. Custom Skill

Report:

- canonical source path;
- Codex path;
- Claude Code path;
- synchronization method;
- key workflow encoded in the skill.

## 6. Visual QA Convention

Explain how future visual tasks should be reviewed.

## 7. Files Created or Changed

List important files.

## 8. Commands Executed

List important commands actually run.

## 9. Verification Results

Report separately:

```text
PASS
FAIL
NOT RUN
```

for:

- TypeScript;
- build;
- composition discovery;
- Redis production compositions;
- DEV composition discovery;
- scene validation;
- asset validation;
- custom Codex skill discovery;
- custom Claude skill discovery;
- DEV still render;
- visual inspection.

## 10. Problems / Risks

Include:

- instruction conflicts;
- duplicate documentation;
- skill synchronization issues;
- Windows path/symlink problems;
- DEV/production separation risks;
- visual QA limitations;
- technical debt.

## 11. Recommended Next Task

Recommend TASK-004 based on the real repository state.

Do not begin TASK-004.

## 12. Git Status

Report:

- branch;
- changed/untracked files;
- unexpected binaries;
- ignored renders.

## 13. Final Status

Finish with exactly one:

```text
TASK-003 STATUS: PASS
```

or

```text
TASK-003 STATUS: PARTIAL
```

or

```text
TASK-003 STATUS: BLOCKED
```

Do not mark PASS if either agent cannot discover the custom skill or if the development compositions fail to register.

---

# Agent Behavior

- Read the official installed Remotion skills before implementing relevant Remotion code.
- Inspect TASK-002 architecture before adding new abstractions.
- Keep `AGENTS.md` and `CLAUDE.md` concise.
- Avoid conflicting project instructions.
- Prefer project-specific conventions over adding more third-party skills.
- Keep DEV components reusable but intentionally simple.
- Do not confuse DEV compositions with final video scenes.
- Do not silently expand scope.
- Do not start TASK-004.
- Record actual test results only.
