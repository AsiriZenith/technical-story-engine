# TASK-007 — Install and Validate High-Impact Motion & Visual Design Skills

## Objective

Upgrade the agent skill foundation for `technical-story-engine` before continuing production Scene 03.

This task installs and validates the **highest-priority Phase 1 skills** identified in the skills recommendation report:

```text
emilkowalski/skills@animate
emilkowalski/skills@review-animations
anthropics/skills@frontend-design
```

The purpose is to improve:

- motion quality;
- easing/spring decisions;
- animation restraint;
- visual hierarchy;
- typography/layout judgment;
- agent-side motion review.

This is an **infrastructure-only** task.

Do not implement Scene 03.

---

# Why These Skills Now

The current project already has the official Remotion skill set and the local `technical-story-video` skill.

The biggest remaining immediate production gaps are:

```text
motion craft
animation review
visual hierarchy
```

These three skills have the highest direct value for Scenes 03–04 and later production.

Do **not** install the entire ecosystem in this task.

Specifically defer:

```text
animation-vocabulary
svg-animations
canvas-design
web-design-guidelines
vercel-composition-patterns
audio-ducking
technical-storyboard-scripting
remotion-sound-orchestration
external-asset-director
visual-qa-audit
```

These may be evaluated in later tasks when the production stage actually needs them.

---

# Preconditions

Begin only after:

```text
TASK-005B STATUS: PASS
TASK-006A STATUS: PASS
```

and after the approved Scene 01 / Scene 02 cleanup state has been committed.

Before changing anything:

```bash
git status
git log --oneline -5
```

Expected:

- clean approved baseline;
- Scene 01 approved;
- Scene 02 approved;
- development captions absent from production;
- existing official Remotion skills discoverable;
- existing `technical-story-video` skill discoverable.

If there are unexplained changes, stop and report them.

Do not create or push Git commits unless explicitly authorized.

---

# Part A — Inspect Existing Skill Infrastructure

Before installing anything, inspect:

```text
skills-lock.json
.agents/skills/
.claude/skills/
scripts/sync-agent-skills.ps1
AGENTS.md
CLAUDE.md
docs/agent-workflow.md
```

Confirm:

1. how external skills are currently stored;
2. whether Codex and Claude Code both discover project-local skills;
3. whether the sync script is only intended for local custom skills or also external skills;
4. whether any incoming skill conflicts with existing project rules.

Do not assume external skills should be copied manually.

Prefer the supported `skills` CLI installation mechanism.

---

# Part B — Inspect CLI Before Installation

Run the currently installed CLI help first.

For example:

```bash
npx skills --help
npx skills add --help
```

Confirm the supported syntax before executing install commands.

Do not blindly rely on copied commands if the CLI version differs.

---

# Part C — Install the Selected Skills

Install only:

## 1. Motion Design

```text
emilkowalski/skills@animate
```

Expected role:

- decide whether something should animate;
- define the purpose of motion;
- improve easing/spring choices;
- reduce robotic linear animation;
- improve entrances, exits, emphasis, causality, and state changes.

---

## 2. Animation Review

```text
emilkowalski/skills@review-animations
```

Expected role:

- critique animation quality;
- identify abrupt starts/stops;
- identify unnecessary bounce;
- identify mismatched durations;
- flag spatial discontinuity;
- strengthen agent-side motion QA.

---

## 3. Visual Design

```text
anthropics/skills@frontend-design
```

Expected role:

- strengthen typography hierarchy;
- improve whitespace;
- improve layout balance;
- avoid generic template aesthetics;
- improve focal-point control;
- improve visual consistency.

---

# Part D — Agent Targets

Install these skills for:

```text
Codex
Claude Code
```

Do not install them for unrelated agents unless the current skill CLI requires a shared project installation that automatically exposes them.

The repository currently uses:

```text
Codex
Claude Code
```

as its supported coding-agent pair.

---

# Part E — Installation Safety Review

After installation, inspect each installed `SKILL.md`.

Check for guidance that conflicts with the repository.

Project rules always win.

Important guardrails:

```text
Remotion + React + TypeScript remain the permanent production core.
```

New skills must not introduce:

- runtime animation frameworks that replace Remotion timing;
- browser-only CSS animation as the source of production timing;
- provider-specific runtime SDK dependencies;
- uncontrolled randomness;
- unreviewed external assets;
- instructions that bypass the Human Media Review Gate;
- instructions that bypass EN/DE/FR shared-timeline requirements.

If a skill recommends a conflicting technique, document the conflict and keep the project rule authoritative.

Do not modify third-party skill content unless there is a compelling technical reason.

Prefer documenting project precedence instead.

---

# Part F — Update Project Guidance

Update the canonical project guidance so agents know **when** to consult these skills.

Prefer a concise section in:

```text
AGENTS.md
```

and/or:

```text
docs/agent-workflow.md
```

Do not duplicate the full skill content.

Suggested invocation guidance:

```text
For visible production scene work:
- consult `frontend-design` for hierarchy/layout decisions.

For meaningful animation work:
- consult `animate` before implementing motion.

Before declaring motion-heavy scene work complete:
- consult `review-animations` during agent QA.
```

The existing `technical-story-video` skill should remain the primary repository workflow skill.

The new external skills are specialists, not replacements for it.

If appropriate, add these specialist-skill references to the canonical `technical-story-video` skill, then run the existing custom-skill synchronization process.

---

# Part G — Do Not Over-Apply Skills

Document that these skills are **contextual**.

Examples:

```text
Changing a config file
→ no need for frontend-design

Adding a static TypeScript type
→ no need for animate

Building a scene entrance or packet motion
→ use animate

Reviewing a new MP4
→ use review-animations

Designing a scene layout
→ use frontend-design
```

Avoid loading every skill into every task unnecessarily.

---

# Part H — Discovery Verification

Verify all three skills are discoverable for:

```text
Codex
Claude Code
```

Use the supported CLI commands for the installed version.

For example, if supported:

```bash
npx skills list -a codex --json
npx skills list -a claude-code --json
```

Verify exact discovered names/paths.

Do not mark PASS based only on files existing on disk.

---

# Part I — Lockfile Verification

Inspect:

```text
skills-lock.json
```

Confirm:

- all three newly installed skills are represented correctly;
- source repositories are correct;
- no unexpected skills were added;
- no existing Remotion or custom skills disappeared.

If the installation mechanism does not update `skills-lock.json`, document the actual behavior instead of fabricating an entry.

---

# Part J — Compatibility Check Against Existing Project

Run the normal project validation after installation:

```text
typecheck
build
composition discovery
scene validation
asset validation
```

No production output should change merely because skills were installed.

Render at least one existing representative production still to confirm the repository still operates normally.

Suggested:

```text
Scene 01 approved final frame
```

or:

```text
Scene 02 approved final frame
```

Do not redesign or modify either approved scene.

---

# Part K — Skill Evaluation Notes

Create a concise document:

```text
docs/skills-strategy.md
```

or update an existing equivalent if one already exists.

Document:

## Current production specialists

```text
animate
review-animations
frontend-design
```

## Deferred candidates

### Phase 2
```text
svg-animations
audio-ducking
web-design-guidelines
```

### Possible later additions
```text
animation-vocabulary
canvas-design
vercel-composition-patterns
technical-storyboard-scripting
remotion-sound-orchestration
external-asset-director
visual-qa-audit
```

For each deferred skill, briefly state the trigger for reconsideration.

Examples:

```text
svg-animations
→ before packet-heavy cache hit/miss scenes

audio-ducking
→ before narration + background music integration

external-asset-director
→ before final restaurant/character asset generation
```

Do not install them in TASK-007.

---

# Part L — No Production Scene Changes

TASK-007 must not implement Scene 03.

Do not:

- add Scene 03 component code;
- modify approved Scene 01 visuals;
- modify approved Scene 02 visuals;
- change episode timing;
- introduce narration;
- introduce external assets;
- add audio;
- add SFX.

This task exists only to improve agent capability before continuing production.

---

# Acceptance Criteria

TASK-007 is complete only when:

- [ ] Preconditions pass.
- [ ] Existing skill infrastructure is inspected.
- [ ] CLI syntax is checked before installation.
- [ ] `animate` is installed.
- [ ] `review-animations` is installed.
- [ ] `frontend-design` is installed.
- [ ] All three are discoverable by Codex.
- [ ] All three are discoverable by Claude Code.
- [ ] Installed skill contents are reviewed for project-rule conflicts.
- [ ] Project guidance explains when to use each specialist skill.
- [ ] Existing `technical-story-video` remains the primary repository workflow skill.
- [ ] Skills are not configured to override Remotion architecture.
- [ ] `skills-lock.json` behavior is verified and documented.
- [ ] Deferred skill candidates are documented but not installed.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Scene validation passes.
- [ ] Asset validation passes.
- [ ] Existing approved production output remains unchanged.
- [ ] Scene 03 is not implemented.
- [ ] `feedbacks/task-007-feedback.md` is created.

---

# Required Feedback Report

Create:

```text
feedbacks/task-007-feedback.md
```

It must contain:

## 1. Summary

What was installed and why.

## 2. Preconditions

Report:

```text
Approved Scene 01/02 baseline: PASS / FAIL
Git clean baseline: PASS / FAIL
```

## 3. Installed Skills

For each:

```text
Skill name
Source
Installed path
Codex discovery
Claude Code discovery
Primary role
```

## 4. Skill Content Review

For each new skill, summarize:

- useful guidance;
- any conflicts with existing project rules;
- any techniques that should not be used in this repository.

## 5. Project Guidance Changes

List files updated and explain how agents are instructed to invoke the specialist skills.

## 6. Lockfile / Discovery State

Report:

- `skills-lock.json` changes;
- exact discovery verification;
- any sync-script behavior;
- whether custom skill synchronization was required.

## 7. Deferred Skills

List the skills deliberately not installed and the trigger for reconsidering each.

At minimum address:

```text
svg-animations
audio-ducking
web-design-guidelines
animation-vocabulary
canvas-design
vercel-composition-patterns
technical-storyboard-scripting
remotion-sound-orchestration
external-asset-director
visual-qa-audit
```

## 8. Verification Results

Report:

```text
PASS
FAIL
NOT RUN
```

for:

- Codex skill discovery;
- Claude Code skill discovery;
- TypeScript;
- build;
- composition discovery;
- scene validation;
- asset validation;
- approved production still regression check.

## 9. Problems / Risks

Include:

- conflicting skill instructions;
- duplicate guidance;
- CLI/version issues;
- skill-discovery problems;
- lockfile concerns;
- token/context overhead;
- Windows path/symlink concerns.

## 10. Recommended Next Task

Recommend whether production can proceed to Scene 03.

Do not implement Scene 03.

## 11. Git Status

Report:

- branch;
- changed files;
- untracked files;
- unexpected binaries;
- commits/pushes performed.

## 12. Final Status

Finish with exactly one:

```text
TASK-007 STATUS: PASS
```

or

```text
TASK-007 STATUS: PARTIAL
```

or

```text
TASK-007 STATUS: BLOCKED
```

Do not mark PASS unless all three new skills are discoverable for both Codex and Claude Code.

---

# Agent Behavior

- Treat third-party skills as advisory specialists.
- Project rules in `AGENTS.md` remain authoritative.
- Do not blindly accept conflicting skill advice.
- Do not install additional speculative skills.
- Do not start Scene 03.
- Run actual discovery verification.
- Record actual command results.
- Stop after writing TASK-007 feedback.
