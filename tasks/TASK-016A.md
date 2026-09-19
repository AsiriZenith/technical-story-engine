# TASK-016A — Audit and Install Official Remotion Agent Skills Before TASK-016

## Objective

Before executing `TASK-016.md`, perform a **Remotion Agent Skills audit** using the official Remotion skill set.

This is an **analysis / environment-preparation task only**.

Do **not** implement Scene 09.
Do **not** modify `TASK-016.md` yet unless the audit concludes that changes are needed and those changes are documented as recommendations only.
Do **not** modify production scene code.

The purpose is to make sure the coding agent is using the official Remotion-maintained Agent Skills before continuing video production.

---

## Official Source Provided by the User

Remotion maintains official Agent Skills at:

```text
remotion-dev/skills
```

Official installation command:

```bash
npx skills add remotion-dev/skills
```

The official skill set includes:

```text
/remotion-best-practices
/remotion-create
/remotion-markup
/remotion-studio
/remotion-render
/remotion-maps
/remotion-captions
/remotion-saas
/remotion-interactivity
/remotion-docs
/remotion-upgrade
/remotion-multimedia
```

The user obtained this list from the official Remotion Agent Skills documentation.

---

## Important Context

This repository already has some previously installed skills, including project-specific and third-party skills such as:

```text
technical-story-video
frontend-design
animate
review-animations
```

Earlier tasks may also have installed older Remotion-related skills.

Do not assume the official `remotion-dev/skills` package is already installed.

Do not assume an old Remotion skill set is equivalent to the current official one.

---

# Phase 1 — Audit Existing Skills

Inspect the current repository / agent environment and determine which relevant skills are already installed.

Check both agent environments used by this project where possible:

```text
Claude Code
Codex
```

Report:

1. which Remotion skills are currently installed;
2. their source/repository if discoverable;
3. whether they appear to come from the official:

```text
remotion-dev/skills
```

4. whether the official skill bundle is already fully installed;
5. whether there are duplicate, older, or conflicting Remotion skill definitions.

Do not delete anything during this audit.

---

# Phase 2 — Install Official Remotion Skills If Missing

If the official Remotion skills are **not already installed**, install them using the official command:

```bash
npx skills add remotion-dev/skills
```

Before executing:
- inspect the command/help if needed;
- do not invent unsupported CLI flags;
- follow the CLI's supported installation flow;
- install for the agent environments relevant to this repository.

If the command is interactive, complete the supported prompts appropriately.

If the skills are already installed and current enough for use, do **not** reinstall unnecessarily.

Do not:
- upgrade Remotion packages;
- change application dependencies;
- change the Remotion version;
- run `/remotion-upgrade`;
- modify source code.

This task is about **Agent Skills only**.

---

# Phase 3 — Verify Installed Official Skills

After installation/audit, verify availability of the following official skills:

```text
remotion-best-practices
remotion-create
remotion-markup
remotion-studio
remotion-render
remotion-maps
remotion-captions
remotion-saas
remotion-interactivity
remotion-docs
remotion-upgrade
remotion-multimedia
```

For each skill report:

```text
installed / missing / unavailable
```

If missing, explain why.

---

# Phase 4 — Analyze Which Skills Matter for This Project

Analyze the official skills against this project's actual workflow.

For each skill, classify it as one of:

```text
PRIMARY
USE WHEN NEEDED
NOT CURRENTLY NEEDED
```

Use the following project context.

This project:
- uses Remotion + React + TypeScript as the permanent rendering engine;
- builds technical explainer videos;
- uses still images plus Remotion animation;
- uses deterministic frame-based animation;
- renders review PNGs and MP4s;
- supports EN / DE / FR captions;
- uses reusable animation components such as `SpotlightImage`;
- requires human media review gates;
- already has project-specific motion/design skills.

At minimum, explicitly analyze:

### `remotion-best-practices`

Expected role:

```text
default official Remotion guidance when unsure which specialized skill applies
```

### `remotion-markup`

Analyze for:
- React/Remotion layout;
- animation;
- timing;
- typography;
- media elements;
- effects;
- audio;
- fonts.

### `remotion-render`

Analyze for:
- MP4 rendering;
- still rendering;
- review artifact generation.

### `remotion-studio`

Analyze whether it can make visual review/debugging easier before full renders.

### `remotion-captions`

Analyze for:
- EN / DE / FR captions;
- subtitle layout;
- timing;
- localization-safe caption rendering.

### `remotion-docs`

Analyze as the preferred current-reference skill when the agent is unsure about:
- Remotion APIs;
- component behavior;
- package guidance;
- current recommended patterns.

### `remotion-multimedia`

Analyze whether it is useful later for:
- audio/video metadata;
- narration files;
- generated clips;
- media inspection.

Also explain why these may not be relevant right now:

```text
remotion-create
remotion-maps
remotion-saas
remotion-interactivity
remotion-upgrade
```

Do not force use of a skill merely because it exists.

---

# Phase 5 — Recommend Skill Usage for TASK-016

Analyze `tasks/TASK-016.md` without implementing it.

Recommend the exact skills the agent should consult when executing TASK-016.

Expected likely set:

```text
technical-story-video
frontend-design
animate
review-animations
remotion-best-practices
remotion-markup
remotion-render
remotion-captions
```

Also consider:

```text
remotion-docs
remotion-studio
```

only where useful.

Explain the role of each recommended skill.

Do not use unnecessary official skills just to increase the count.

---

# Phase 6 — Recommend a Permanent Skill Policy

Propose a simple policy for future tasks.

A good outcome may resemble:

```text
Every production task:
→ technical-story-video
→ remotion-best-practices

Visual/layout work:
→ frontend-design
→ remotion-markup

Motion:
→ animate

Caption/subtitle work:
→ remotion-captions

Rendering:
→ remotion-render

Current API uncertainty:
→ remotion-docs

Final animation QA:
→ review-animations

Studio debugging / interactive preview:
→ remotion-studio when useful
```

This is only an example.

The final recommendation should reflect the actual audit and installed skill capabilities.

---

# Documentation Review

Inspect existing project documentation such as:

```text
AGENTS.md
docs/agent-workflow.md
docs/production-architecture.md
README.md
```

Do not edit them in this task.

Report whether a future documentation update is recommended to codify the official Remotion skills.

If yes, specify:
- which file(s);
- what kind of rule should be added.

Do not make the documentation change yet unless explicitly instructed later.

---

# No Production Changes

This task must not modify:

```text
src/
public/
episode timing
scene implementation
assets
localization
rendered production behavior
TASK-016 implementation
```

Installing official Agent Skills may create/update skill configuration files in locations managed by the skills CLI. Those changes are allowed and must be reported.

---

# Validation

Verify:

1. official Remotion skills installation state;
2. relevant skills can be discovered by the agent;
3. no production source files changed;
4. no Remotion dependency upgrade occurred;
5. no Scene 09 work was started.

---

# Required Feedback Report

Create:

```text
feedbacks/task-016a-feedback.md
```

It must contain:

## 1. Summary

State:
- whether official Remotion skills were already installed;
- whether installation was required;
- whether installation succeeded.

## 2. Installation Command

Report exactly what command(s) were executed.

If no installation was necessary, state:

```text
No installation command executed — official skills were already present.
```

## 3. Installed Skill Inventory

Report each official skill:

```text
remotion-best-practices
remotion-create
remotion-markup
remotion-studio
remotion-render
remotion-maps
remotion-captions
remotion-saas
remotion-interactivity
remotion-docs
remotion-upgrade
remotion-multimedia
```

with status.

## 4. Existing / Duplicate Skill Analysis

Report:
- previously installed Remotion skills;
- duplicates;
- older versions if identifiable;
- conflicts, if any;
- whether any cleanup is recommended.

Do not perform destructive cleanup.

## 5. Project Relevance Analysis

Classify every official Remotion skill as:

```text
PRIMARY
USE WHEN NEEDED
NOT CURRENTLY NEEDED
```

with short reasoning.

## 6. TASK-016 Skill Recommendation

List the exact skill set recommended for `TASK-016.md`.

For each skill, explain its role.

## 7. Recommended Permanent Skill Policy

Provide a concise future-task workflow for:
- design;
- markup;
- motion;
- captions;
- rendering;
- docs lookup;
- animation QA.

## 8. Documentation Recommendation

State whether project docs should be updated later.

Do not edit them in this task.

## 9. Verification Results

PASS / FAIL / NOT RUN for:

```text
official skill audit
official skill installation if required
remotion-best-practices available
remotion-markup available
remotion-studio available
remotion-render available
remotion-captions available
remotion-docs available
remotion-multimedia available
all official skills inventory checked
no production source changes
no dependency upgrade
Scene 09 not started
```

## 10. Git Status

Report:
- branch;
- files added/changed by skill installation;
- pre-existing unrelated changes;
- commits/pushes.

Do not commit or push.

## 11. Recommended Next Step

Use exactly:

```text
If the official Remotion skills audit/install is successful:
→ update TASK-016 execution guidance to use the recommended skill set, then execute TASK-016.

If installation or discovery is incomplete:
→ resolve the missing official Remotion skills before starting TASK-016.
```

## 12. Final Status

Finish with exactly one:

```text
TASK-016A STATUS: PASS
```

or

```text
TASK-016A STATUS: PARTIAL
```

or

```text
TASK-016A STATUS: BLOCKED
```

---

# Agent Behavior

- Audit first.
- Install only if needed.
- Use the official `remotion-dev/skills` source.
- Do not invent CLI flags.
- Do not upgrade dependencies.
- Do not touch production scenes.
- Do not implement TASK-016.
- Create feedback.
- Stop after feedback.
