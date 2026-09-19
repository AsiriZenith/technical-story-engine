# TASK-016A Feedback — Audit and Install Official Remotion Agent Skills

## 1. Summary

- Official `remotion-dev/skills` were **already installed** for this project before this task began.
- No installation was required.
- Audit confirms the official bundle is complete and current per the project's `skills-lock.json`.

## 2. Installation Command

```text
No installation command executed — official skills were already present.
```

Only read-only verification commands were run:

```bash
npx --yes skills --version
npx --yes skills --help
npx --yes skills list
```

No `npx skills add`, `npx skills update`, or `npx skills remove` was executed. No files were modified.

## 3. Installed Skill Inventory

All 11 official skills are present, sourced from `remotion-dev/skills`, and recorded in `skills-lock.json` with content hashes. Confirmed via `npx skills list`, which additionally shows each skill is registered for both `Codex` and `Claude Code` agents (among others):

| Skill | Status | Source |
|---|---|---|
| remotion-best-practices | installed | remotion-dev/skills |
| remotion-create | installed | remotion-dev/skills |
| remotion-markup | installed | remotion-dev/skills |
| remotion-studio | installed | remotion-dev/skills |
| remotion-render | installed | remotion-dev/skills |
| remotion-maps | installed | remotion-dev/skills |
| remotion-captions | installed | remotion-dev/skills |
| remotion-saas | installed | remotion-dev/skills |
| remotion-interactivity | installed | remotion-dev/skills |
| remotion-docs | installed | remotion-dev/skills |
| remotion-upgrade | installed | remotion-dev/skills |
| remotion-multimedia | installed | remotion-dev/skills |

All 12 skill directories exist under `.agents/skills/` (canonical) and are mirrored under `.claude/skills/` for Claude Code discovery, with `skills-lock.json` hashes to detect drift.

## 4. Existing / Duplicate Skill Analysis

- No older or duplicate Remotion skill definitions were found. Each `remotion-*` directory under `.agents/skills/` and `.claude/skills/` maps to exactly one `remotion-dev/skills` entry in `skills-lock.json`, with a single computed hash — no version collisions.
- Two non-Remotion official skills are also installed via the skills CLI and are unrelated to this audit but worth noting since they live alongside the Remotion set: `animate` (source `emilkowalski/skills`) and `frontend-design` (source `anthropics/skills`), plus `review-animations` (source `emilkowalski/skills`).
- `technical-story-video` is a local, project-authored skill (source: `local` in `npx skills list`), correctly excluded from the official-skill audit; its canonical copy lives at `.agents/skills/technical-story-video/SKILL.md` and is synced to `.claude/skills/technical-story-video/` via `scripts/sync-agent-skills.ps1`, per `CLAUDE.md`.
- `remotion-best-practices/` on disk also contains nested subfolders for every other `remotion-*` skill (`agents`, `assets`, etc.) — this appears to be the CLI's internal reference/index structure for the best-practices router skill, not a separate duplicate installation. No cleanup is recommended.
- No conflicts detected. No cleanup recommended.

## 5. Project Relevance Analysis

| Skill | Classification | Reasoning |
|---|---|---|
| remotion-best-practices | PRIMARY | Default official guidance whenever unsure which specialized Remotion skill applies; router skill for the rest of the bundle. |
| remotion-markup | PRIMARY | Core skill for layout, animation, timing, typography, media, and effects — directly covers spotlight/scene composition work this project does every task. |
| remotion-render | PRIMARY | Every task renders review PNGs/MP4s and final EN/DE/FR renders; this project's validation gate depends on it. |
| remotion-captions | PRIMARY | Project explicitly supports EN/DE/FR localized captions; this is the authoritative skill for correct, localization-safe caption timing/layout. |
| remotion-docs | USE WHEN NEEDED | Consult when uncertain about current Remotion APIs/behavior instead of relying on possibly-stale memory. |
| remotion-studio | USE WHEN NEEDED | Useful for interactive visual debugging before committing to full renders; not required every task. |
| remotion-multimedia | USE WHEN NEEDED | Relevant once narration/audio or generated video clips are inspected/measured; not yet in active use for Scene 08/09 work (still-image + Remotion animation only). |
| remotion-create | NOT CURRENTLY NEEDED | Project scaffolding is already established; this skill is for bootstrapping new Remotion projects. |
| remotion-maps | NOT CURRENTLY NEEDED | No map-based visualization in this technical-explainer format. |
| remotion-saas | NOT CURRENTLY NEEDED | Project is not building a SaaS product/player around Remotion. |
| remotion-interactivity | NOT CURRENTLY NEEDED | Output is rendered video, not an interactive player experience. |
| remotion-upgrade | NOT CURRENTLY NEEDED | Explicitly out of scope for this task and for TASK-016; only relevant when a deliberate, separately-authorized Remotion version upgrade is planned. |

## 6. TASK-016 Skill Recommendation

Recommended skill set for executing `TASK-016.md` (Scene 09 implementation), based on reading the task file without implementing it:

- `technical-story-video` — primary repository workflow skill; governs scene/task structure, handoff, and review conventions used throughout TASK-016.
- `frontend-design` — TASK-016 explicitly calls for using it for motion/layout design decisions (spotlight sequencing, visual hierarchy).
- `animate` — TASK-016 explicitly calls for it; governs spotlight entrance/exit/emphasis motion design for the 7 narrative beats.
- `review-animations` — for agent QA of the spotlight motion sequence before declaring Scene 09 complete, per this project's standard practice.
- `remotion-best-practices` — default official guidance for any Remotion-specific implementation questions that arise while building Scene 09.
- `remotion-markup` — directly applicable: Scene 09 requires image/spotlight layering, timing/sequencing of 7 beats, and localized caption placement — all covered by this skill's layout/animation/timing/media guidance.
- `remotion-render` — required for the review PNG/MP4 render artifacts and EN/DE/FR render validation TASK-016 mandates.
- `remotion-captions` — required for EN/DE/FR caption text on the new Database-skipped/result-return/fast-response beats.

Also useful where relevant, not mandatory:

- `remotion-docs` — if any uncertainty arises about current `SpotlightImage`-adjacent APIs, masking, or transform behavior.
- `remotion-studio` — for interactive preview/debugging of the 7-beat spotlight sequence before committing to full render validation.

No other official skills are needed; `remotion-create`, `remotion-maps`, `remotion-saas`, `remotion-interactivity`, and `remotion-upgrade` do not apply to Scene 09 work (see Section 5).

## 7. Recommended Permanent Skill Policy

```text
Every production task:
→ technical-story-video
→ remotion-best-practices

Visual/layout work:
→ frontend-design
→ remotion-markup

Motion (entrances, exits, emphasis, state changes):
→ animate

Caption/subtitle work (EN/DE/FR):
→ remotion-captions

Rendering (review stills, preview MP4, final EN/DE/FR renders):
→ remotion-render

Current API uncertainty:
→ remotion-docs

Final animation QA before declaring scene work complete:
→ review-animations

Studio debugging / interactive preview before full render:
→ remotion-studio when useful

Audio/video metadata, narration files, generated clip inspection:
→ remotion-multimedia when that work begins

Explicitly excluded unless separately authorized:
→ remotion-upgrade (dependency/version changes only)
→ remotion-create, remotion-maps, remotion-saas, remotion-interactivity (not applicable to this project's format)
```

This matches the example policy in TASK-016A and reflects the actual audit: all listed skills are installed and available; none require project-specific substitution.

## 8. Documentation Recommendation

A documentation update is recommended but not urgent, and was **not made in this task**.

- `AGENTS.md` already references "the official Remotion skills" generically (see "Specialist skills" section, line 39) and points to `skills-lock.json` / `.agents/skills/` as the source of truth — so the pointer is accurate today and needs no correction.
- Recommended future addition: expand the "Specialist skills" section of `AGENTS.md` to explicitly name the routing policy from Section 7 above (which official Remotion skill applies to which kind of task), rather than only naming the three non-Remotion contextual specialists (`frontend-design`, `animate`, `review-animations`) as it currently does. This would make the skill-selection policy self-contained instead of requiring a fresh audit like this one to reconstruct it.
- No changes recommended to `docs/agent-workflow.md`, `docs/production-architecture.md`, or `README.md` — none currently reference Remotion skills incorrectly or need correction.

## 9. Verification Results

```text
official skill audit:                     PASS
official skill installation if required:  NOT RUN (not required — already installed)
remotion-best-practices available:        PASS
remotion-markup available:                PASS
remotion-studio available:                PASS
remotion-render available:                PASS
remotion-captions available:              PASS
remotion-docs available:                  PASS
remotion-multimedia available:            PASS
all official skills inventory checked:    PASS (11/11 remotion-dev/skills entries verified)
no production source changes:             PASS
no dependency upgrade:                    PASS
Scene 09 not started:                     PASS
```

## 10. Git Status

- Branch: `master`
- Files added/changed by skill installation: **none** — no install command was run.
- Pre-existing unrelated changes (present at task start, untouched by this task):
  - Modified: `src/episodes/001-redis/RedisEpisode.tsx`, `src/episodes/001-redis/episode.config.ts`, `src/episodes/001-redis/scenes.ts`, `src/shared/localization/index.ts`
  - Untracked: `feedbacks/task-015-feedback.md`, `src/episodes/001-redis/scenes/Scene08CacheMiss.tsx`, `tasks/TASK-015.md`, `tasks/TASK-016.md`, `tasks/TASK-016A.md`
- New untracked file from this task: `feedbacks/task-016a-feedback.md` (this report).
- No commits made. No pushes made.

## 11. Recommended Next Step

```text
If the official Remotion skills audit/install is successful:
→ update TASK-016 execution guidance to use the recommended skill set, then execute TASK-016.

If installation or discovery is incomplete:
→ resolve the missing official Remotion skills before starting TASK-016.
```

The audit succeeded — all official skills are installed and discoverable. TASK-016 already names an appropriate subset (`frontend-design`, `animate`); no change to `TASK-016.md` is required. The full recommended set for execution is documented in Section 6 above.

## 12. Final Status

```text
TASK-016A STATUS: PASS
```
