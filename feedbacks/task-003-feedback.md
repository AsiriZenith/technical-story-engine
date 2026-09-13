# TASK-003 Feedback

## 1. Summary

Added persistent shared agent rules, a Claude Code pointer to those rules, task/handoff and visual-QA documentation, four development-only Remotion compositions, reusable architecture placeholders, a manifest-driven asset preview, a project-specific `technical-story-video` skill for both agents, and a deterministic Windows-safe skill synchronization script. No Redis production scene or final media was created.

## 2. Preconditions

```text
TASK-002 baseline: PASS
Git clean baseline: PASS
```

TASK-002 was committed as `2a5c6cc Task-002`. Its feedback ended with `TASK-002 STATUS: PASS`; the 14-scene, timing, asset, language, and official-skill foundations were present. The only initial untracked path was the user-supplied `tasks/TASK-003.md`, so it was explained rather than treated as unfinished TASK-002 work.

## 3. Agent Instructions

`AGENTS.md` is the concise canonical operating guide. It covers the Remotion/React/TypeScript core, episode/shared/DEV boundaries, relative timing, EN/DE/FR localization, provider-independent media, technical storytelling, restrained humor, validation, visual inspection, task scope, and Git authority.

`CLAUDE.md` safely points Claude Code to `AGENTS.md` and the shared project documents instead of duplicating a second policy body. Its only agent-specific note explains Claude's skill path and generated-copy rule. Future contributors update `AGENTS.md` and keep the pointer accurate, preventing policy drift.

## 4. Development Compositions

- `DEV-Typography`: primary title, secondary heading, body copy, technical/code label, `180 ms` emphasis, and `CACHE HIT` status treatment using current theme tokens.
- `DEV-ArchitectureNodes`: simple Client, Application, Redis, and Database nodes plus a reusable Remotion-timed request packet.
- `DEV-MotionBasics`: fade, slide, scale, spring, and stagger experiments driven by local sequence time and Remotion interpolation.
- `DEV-AssetPreview`: selects a logical Redis asset ID, displays type/status/path/optionality, previews real image paths with contain behavior when available, and shows a transparency grid or future-video contract state when media is absent.

All four are registered under the `Development` folder. Existing Redis compositions are nested separately under `Production/Episodes`; composition IDs and durations remain unchanged.

## 5. Custom Skill

- Canonical source: `.agents/skills/technical-story-video/SKILL.md`.
- Codex path: `.agents/skills/technical-story-video/`.
- Claude Code path: `.claude/skills/technical-story-video/`.
- Synchronization: `scripts/sync-agent-skills.ps1` copies the canonical `SKILL.md` into the Claude directory and verifies equal SHA-256 hashes. The Claude copy is a regular file, not a symlink or junction.
- Workflow: source material -> technical thesis -> narrative -> narration -> storyboard -> metaphor -> technical representation -> implementation -> render -> director review -> revision.
- Principles: metaphor -> explicit mapping -> technical model; technical clarity over novelty; explain -> tiny joke -> continue; shared language-neutral master; provider-independent assets; validate and visually inspect before feedback.

The official `skills` CLI discovered `technical-story-video` for both Codex and Claude Code. The two files ended with identical hash `4178A872C2CFFE9B9141768147EC51C3E0C75441FE432A76D9BD6085D8E80E46`.

## 6. Visual QA Convention

`docs/agent-workflow.md` requires visible-change feedback to record the composition, inspected frames, checks performed, and known issues. The checklist covers focal point, readability, safe margins, alignment, technical correctness, motion pacing, hierarchy, language overflow, and asset quality. It is an informed human/agent review, not computer-vision scoring.

For this task, frames 60 of all four DEV compositions, frame 20 of `DEV-MotionBasics`, and frame 0 of `Redis-EN` were rendered and inspected. Typography hierarchy and margins were clear; nodes and mappings were legible; motion states and fixed stagger positions were visible; the placeholder asset state, metadata, contain area, and transparency grid were clear; the Redis placeholder was unchanged. An initial request-packet transform rendered its content separately, so it was corrected to interpolate the positioned `left` value and re-rendered successfully.

## 7. Files Created or Changed

- `AGENTS.md`, `CLAUDE.md`: aligned persistent agent instructions.
- `docs/agent-workflow.md`: lifecycle, model escalation, handoff, skill sync, validation, and visual QA.
- `.agents/skills/technical-story-video/SKILL.md`: canonical project skill.
- `.claude/skills/technical-story-video/SKILL.md`: synchronized Claude copy.
- `scripts/sync-agent-skills.ps1`: copy-and-hash synchronization.
- `src/dev/DevRoot.tsx`: four DEV composition registrations.
- `src/dev/components/ArchitectureNode.tsx`: reusable node and request packet placeholders.
- `src/dev/compositions/DevTypography.tsx`, `DevArchitectureNodes.tsx`, `DevMotionBasics.tsx`, `DevAssetPreview.tsx`: isolated visual playgrounds.
- `src/Root.tsx`: separate Production and Development folders.
- `package.json`: one `dev:still` helper.
- `README.md`: agent workflow and custom-skill guidance.
- `feedbacks/task-003-feedback.md`: this report.

## 8. Commands Executed

Important commands actually run:

```text
git status --short
git log --oneline -5
git branch --show-current
npm.cmd run typecheck
npm.cmd run validate:architecture
npm.cmd run build
npm.cmd run compositions
npm.cmd run dev:still
npx.cmd remotion still src/index.ts DEV-ArchitectureNodes renders/dev-architecture-nodes-fixed.png --frame=60
npx.cmd remotion still src/index.ts DEV-MotionBasics renders/dev-motion-basics.png --frame=60
npx.cmd remotion still src/index.ts DEV-MotionBasics renders/dev-motion-basics-stagger.png --frame=20
npx.cmd remotion still src/index.ts DEV-AssetPreview renders/dev-asset-preview.png --frame=60
npx.cmd remotion still src/index.ts Redis-EN renders/task-003-redis-regression.png --frame=0
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/sync-agent-skills.ps1
npx.cmd skills list -a codex --json
npx.cmd skills list -a claude-code --json
git diff --check
git check-ignore -v <build and render outputs>
```

The official `quick_validate.py` was attempted for both skill copies, but this environment has only a nonfunctional Microsoft Store Python alias. Equivalent frontmatter/name/description/TODO structural checks were run in PowerShell, while actual agent discovery was verified with the official skills CLI.

## 9. Verification Results

- **PASS — TypeScript:** `npm.cmd run typecheck` completed with exit code 0.
- **PASS — build:** `npm.cmd run build` completed with exit code 0.
- **PASS — composition discovery:** seven compositions registered successfully.
- **PASS — Redis production compositions:** `Redis-EN`, `Redis-DE`, and `Redis-FR` remain 1920x1080, 30 FPS, 150 frames.
- **PASS — DEV composition discovery:** all four required `DEV-*` compositions were listed.
- **PASS — scene validation:** TASK-002 module-load validation passed during discovery and build.
- **PASS — asset validation:** TASK-002 asset-reference validation passed; `DEV-AssetPreview` resolved its default logical ID.
- **PASS — custom Codex skill discovery:** skills CLI listed `technical-story-video` in project scope.
- **PASS — custom Claude skill discovery:** skills CLI listed `technical-story-video` for Claude Code, and the synchronized regular-file copy exists.
- **PASS — DEV still render:** all four DEV compositions rendered; representative commands exited successfully.
- **PASS — visual inspection:** rendered DEV and Redis frames were opened and reviewed; the discovered packet issue was fixed and verified.

## 10. Problems / Risks

- No project instruction conflict was found. `CLAUDE.md` uses the shared `AGENTS.md` source rather than duplicating rules.
- Some concepts necessarily appear in the project guide, workflow document, and skill, but the skill references maintained docs and keeps only decision-changing principles.
- The sync script must be rerun after canonical skill edits; hash verification catches failed copies but is not automatic on commit.
- Direct PowerShell script execution is blocked by local policy, so the documented command uses a process-scoped `-ExecutionPolicy Bypass`. No global policy was changed.
- The official skill creator's Python validator could not run because Python is not installed. PowerShell structural checks and official CLI discovery passed instead.
- Installed Remotion guidance suggested `Sequence.premountFor`, but Remotion 4.0.524's local types do not expose it. The unsupported prop was removed.
- Individual CSS `translate` split the request packet visually in this environment; interpolating its positioned `left` value produced the correct deterministic render.
- DEV and production registration are separated by folders, but contributors must continue keeping prototypes under `src/dev/`.
- Still inspection samples states but cannot fully prove motion pacing; moving work should add representative frames or preview playback.
- DEV visuals deliberately reuse provisional theme tokens and are not final branding or production components.
- Git still warns that the sandbox cannot read a user-level global ignore file; repository ignore behavior remains verified.

## 11. Recommended Next Task

TASK-004 should use the DEV playground to evaluate a small provisional visual system—typography scale, architecture-node semantics, spacing, and a minimal motion vocabulary—then define an asset-resolution boundary for candidate media. It should validate multiple frames and language-length stress cases before authorizing any final Redis scene animation.

## 12. Git Status

- Branch: `master`.
- Modified tracked files: `README.md`, `package.json`, and `src/Root.tsx`.
- New TASK-003 paths: `AGENTS.md`, `CLAUDE.md`, `docs/agent-workflow.md`, both custom skill directories, the sync script, `src/dev/`, and this feedback report.
- `tasks/TASK-003.md` remains the user-supplied untracked task brief.
- No unexpected untracked binary files were found.
- Build output and all DEV/Redis QA PNGs remain ignored by existing rules.
- No commit or push was performed.

## 13. Final Status

TASK-003 STATUS: PASS
