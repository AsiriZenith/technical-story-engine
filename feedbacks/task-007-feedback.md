# TASK-007 Feedback — Install and Validate High-Impact Motion & Visual Design Skills

## 1. Summary

Installed three Phase 1 specialist skills via the project's `skills` CLI (already in use for the official Remotion skill set): `emilkowalski/skills@animate`, `emilkowalski/skills@review-animations`, and `anthropics/skills@frontend-design`. Installed for both Codex and Claude Code, tracked in `skills-lock.json` alongside the existing Remotion skills. Updated `AGENTS.md` and the canonical `technical-story-video` skill with a concise "when to consult" pointer, and re-synced the Claude Code copy. Created `docs/skills-strategy.md` documenting rationale and deferred candidates. No Scene 03 or production-scene code was touched; this is infrastructure-only, matching the task's scope.

## 2. Preconditions

```text
Approved Scene 01/02 baseline: PASS
Git clean baseline: PASS
```

`git status` at task start showed only `tasks/TASK-007.md` and `docs/skills-recommendations-report.md` untracked (task/report files, expected); no modified tracked files. `git log --oneline -5` showed `792b206 feat: scene 01 and 02 completed` and `bc72ee4 feat: approve Scene 01 Redis mystery` at HEAD, matching the expected approved baseline.

## 3. Installed Skills

### animate
```text
Source:             emilkowalski/skills
Installed path:     .agents/skills/animate (symlinked to .claude/skills/animate, universal for Codex)
Codex discovery:    Confirmed (npx skills list -a codex --json)
Claude Code discovery: Confirmed (npx skills list -a claude-code --json)
Primary role:       Motion-decision and implementation skill — whether to animate, purpose, tool, properties, easing/duration/spring, interruption, exit, reduced-motion.
```

### review-animations
```text
Source:             emilkowalski/skills
Installed path:     .agents/skills/review-animations (symlinked to .claude/skills/review-animations, universal for Codex)
Codex discovery:    Confirmed
Claude Code discovery: Confirmed
Primary role:       Animation-diff review against a non-negotiable craft-bar checklist; produces a findings table + block/approve verdict.
```

### frontend-design
```text
Source:             anthropics/skills
Installed path:     .agents/skills/frontend-design (symlinked to .claude/skills/frontend-design, universal for Codex)
Codex discovery:    Confirmed
Claude Code discovery: Confirmed
Primary role:       Visual-design direction — palette, typography, layout, hierarchy, avoiding templated/generic aesthetics.
```

Installation used `npx skills add <owner>/skills --skill <name> --agent claude-code codex -y --json`, one call per skill (the CLI's `-s`/`--skill` flag takes one skill name per invocation reliably; passing multiple names in one call was not attempted since the task specifies installing exactly one skill from `emilkowalski/skills` twice and one from `anthropics/skills`). Security scan on each (`Gen: Safe`, `Socket: 0 alerts`, `Snyk: Low Risk`) reported clean.

## 4. Skill Content Review

### animate / review-animations
Useful guidance: a strict "should this even animate" frequency gate, `transform`/`opacity`-only GPU properties, `ease-out` over `ease-in`, sub-300ms UI durations, reduced-motion and hover-gating requirements, symmetric enter/exit paths. This directly improves motion craft and gives `review-animations` a concrete checklist for agent-side QA.

**Conflict / translation needed**: both skills are written for a live browser runtime — CSS transitions, `@starting-style`, WAAPI (`element.animate()`), and the `motion.dev`/Framer Motion JS library as the "reach for a spring" tool. This repository's permanent production core is Remotion + React + TypeScript, which renders deterministically frame-by-frame; runtime CSS transitions and a JS motion library are not valid sources of production timing here (`AGENTS.md`). **Resolution**: documented in `docs/skills-strategy.md` and `AGENTS.md` that the *decisions* (should it animate, which easing curve, which duration/spring config, GPU-only properties, reduced-motion) translate directly to Remotion's `interpolate()`/`spring()` model driven by scene-relative local frames, while the browser-runtime code snippets (CSS classes, WAAPI calls, `motion.div`) should not be adopted verbatim. No changes were made to the skill files themselves — only project guidance documenting precedence.

### frontend-design
Useful guidance: typography/hierarchy discipline, avoidance of generic "AI-generated" visual tells (warm cream + terracotta palette, SaaS card kit, ALL-CAPS eyebrow labels, `→` on buttons), a two-pass plan-then-critique workflow, restraint ("spend your boldness in one place"). No technique here conflicts with Remotion/React/TypeScript — it is markup- and CSS-token-agnostic design guidance and applies directly to scene layout in Remotion components. No conflicts found.

No skill instructed anything that would bypass the Human Media Review Gate or the EN/DE/FR shared-timeline requirement; none introduce provider-specific runtime SDKs, uncontrolled randomness, or unreviewed external assets. Skill files were not modified.

## 5. Project Guidance Changes

- `AGENTS.md`: added a "Specialist skills" section listing the three skills, their trigger conditions, and the Remotion-translation precedence note.
- `.agents/skills/technical-story-video/SKILL.md`: added one bullet under "Production decisions" pointing to the three specialists and noting the browser-runtime-to-Remotion translation, with a pointer to `AGENTS.md` for detail.
- `.claude/skills/technical-story-video/SKILL.md`: re-generated via `scripts/sync-agent-skills.ps1` (matching SHA-256 hash confirmed by the script).
- `docs/skills-strategy.md` (new): full rationale, precedence note, contextual-use table, and deferred-skill trigger table.

`technical-story-video` remains the first skill consulted for narrative/storyboard/scene-lifecycle work; the three new skills are referenced as specialists, not a replacement.

## 6. Lockfile / Discovery State

`skills-lock.json` gained three new entries (`animate`, `frontend-design`, `review-animations`), each with `source`, `sourceType: github`, `skillPath`, and `computedHash`. All 12 pre-existing entries (11 Remotion skills + none for `technical-story-video`, which is a local skill with no lockfile entry, consistent with pre-task state) are unchanged. Discovery was verified with actual CLI output, not just file presence:

```text
npx skills list -a claude-code --json  -> animate, frontend-design, review-animations, all present
npx skills list -a codex --json        -> animate, frontend-design, review-animations, all present
```

Each installed skill lives at `.agents/skills/<name>` with `.claude/skills/<name>` as a Windows symlink back to it (created by the `skills` CLI itself, not `scripts/sync-agent-skills.ps1`). `scripts/sync-agent-skills.ps1` was run once, but only for the pre-existing local `technical-story-video` skill (it targets that skill exclusively; it is not part of the external-skill install/sync mechanism). It requires Windows PowerShell's `Get-FileHash`, which is unavailable through the Git Bash `powershell.exe` alias in this shell — running it via the dedicated PowerShell tool succeeded and reported a matching hash.

## 7. Deferred Skills

Not installed in this task; full trigger detail in `docs/skills-strategy.md`.

```text
svg-animations              -> before packet-heavy cache hit/miss scenes needing custom SVG path motion
audio-ducking                -> before narration + background music integration
web-design-guidelines        -> before broader UI/web-surface work beyond single-scene layout
animation-vocabulary         -> if motion terminology/consistency becomes recurring review friction
canvas-design                 -> if a scene needs raw <canvas> drawing beyond Remotion/React markup
vercel-composition-patterns  -> if composition-structuring patterns would reduce cross-episode boilerplate
technical-storyboard-scripting -> before storyboard scripting needs higher volume/automation
remotion-sound-orchestration -> before multi-track narration/SFX/music orchestration is needed
external-asset-director      -> before final restaurant/character asset generation from external providers
visual-qa-audit               -> if agent-side visual QA needs a more systematic audit than the current checklist
```

## 8. Verification Results

```text
Codex skill discovery:                 PASS
Claude Code skill discovery:           PASS
TypeScript:                            PASS
build:                                 PASS
composition discovery:                 PASS (9 compositions listed, unchanged from before install)
scene validation:                      PASS (no dedicated scene-validation script exists in this repo beyond
                                        composition discovery + representative render; both ran clean)
asset validation:                      PASS (no dedicated asset-validation script exists; composition
                                        discovery and the representative render, which exercises the
                                        existing asset references, completed without error)
approved production still regression check: PASS (rendered renders/task-007-regression.png from the
                                        approved Redis-EN composition at frame 60; render pipeline
                                        completed without error, confirming skill installation did not
                                        touch or break production rendering; this is a fresh verification
                                        frame, not a pixel diff against the existing approved title-card
                                        still, since no equivalent frame=60 approved reference exists)
```

## 9. Problems / Risks

- **Runtime-model conflict (documented, not a blocker)**: `animate`/`review-animations` assume CSS/WAAPI/JS-motion-library runtimes; this repository uses Remotion's deterministic frame model. Mitigated by the precedence note in `AGENTS.md` and `docs/skills-strategy.md` — agents must translate decisions, not copy runtime snippets.
- **`scripts/sync-agent-skills.ps1` shell dependency**: the script needs `Get-FileHash`, absent from the Git Bash `powershell.exe` alias on this machine; it works correctly when invoked through actual Windows PowerShell. No repository change made for this — documenting it here since a future agent running it through the wrong shell will get a misleading `CommandNotFoundException` rather than a hash mismatch.
- **No dedicated scene/asset validation scripts**: the repo currently has no `npm run validate:scenes` / `validate:assets`-equivalent beyond `compositions` discovery and manual representative renders (per `docs/agent-workflow.md`). Reported PASS above reflects the checks that actually exist and were run, not a fabricated dedicated script.
- **Windows symlinks for the new skills**: `.claude/skills/animate|review-animations|frontend-design` are real Windows symlinks (created by the `skills` CLI with elevated/dev-mode symlink support present on this machine), unlike `technical-story-video`, which uses a plain-copy sync script specifically because Windows symlink support can't be assumed. If this repository is later cloned/used on a machine without symlink privileges, `skills experimental_install` (restore-from-lockfile) should be used to re-materialize these three, rather than assuming the symlinks survive a plain `git clone`.
- Token/context overhead: three additional `SKILL.md` files (plus `RECIPES.md`/`STANDARDS.md`) are now discoverable; per the new `AGENTS.md` guidance they are contextual and should only be loaded when the task involves visible/motion work, not on every task.

## 10. Recommended Next Task

Production can proceed to Scene 03. Infrastructure is in place, validated, and does not regress existing approved output. Scene 03 implementation should consult `frontend-design` for layout/hierarchy decisions and `animate` before implementing any new motion, translating both into Remotion's `interpolate()`/`spring()` model as documented, and run `review-animations` during agent QA before declaring motion-heavy scene work complete.

## 11. Git Status

```text
Branch: master (up to date with origin/master)

Modified:
  .agents/skills/technical-story-video/SKILL.md
  .claude/skills/technical-story-video/SKILL.md
  AGENTS.md
  skills-lock.json

Untracked:
  .agents/skills/animate/
  .agents/skills/frontend-design/
  .agents/skills/review-animations/
  .claude/skills/animate/
  .claude/skills/frontend-design/
  .claude/skills/review-animations/
  docs/skills-recommendations-report.md   (pre-existing untracked, not created by this task)
  docs/skills-strategy.md                 (new, this task)
  tasks/TASK-007.md                       (pre-existing untracked, the task file itself)
  renders/task-007-regression.png         (new, verification render this task)
  feedbacks/task-007-feedback.md          (this report)

No unexpected binaries beyond the expected verification PNG. No commits or pushes were performed.
```

## 12. Final Status

```text
TASK-007 STATUS: PASS
```
