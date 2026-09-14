# TASK-009 Feedback — Codify the Manual Asset Workflow

## 1. Summary

This was a documentation/process task: no scene code, scene visuals, or
approved renders were touched. I added one new dedicated policy document,
`docs/manual-asset-workflow.md`, and added short pointers into the three
existing docs that already govern agent behavior (`AGENTS.md`,
`docs/agent-workflow.md`, `docs/production-architecture.md`) plus one line in
`README.md` so it doesn't go stale next to the new policy. The full rule body
lives in exactly one place; every other doc points to it rather than
duplicating it, matching the pattern `CLAUDE.md` already uses for `AGENTS.md`.

While writing the policy I found and corrected one factual overclaim before
it shipped: I had written that scenes consume assets through the existing
`resolveAsset()` resolver, then checked the actual TASK-008 code and found it
uses a second, separate helper I had added instead. The doc now describes the
real state and flags the duplication as a risk rather than asserting a
tidier architecture than what exists. See Problems / Risks.

Scene 04 was not started. No scene, asset, or render code was modified.

## 2. Task-008 Lesson Applied

What failed before:
The TASK-008/008A/008B/008C family repeatedly ran the same loop — hand the
agent a reference image, the agent reinterprets it, the agent redraws a
different diagram, the output doesn't match. Multiple revisions did not fix
this because the failure was structural (reinterpretation guesses at intent),
not a quality problem that more iteration could close.

What succeeded in TASK-008 (the reset attempt):
The user generated, reviewed, and manually placed two exact PNGs
(`scene-03-joke-diagram.png`, `scene-03-end-diagram.png`). The agent rendered
them directly with Remotion's `<Img>`, full-bleed, unchanged. TASK-008's
feedback report backs this with a pixel-level check: mean per-channel
difference between the rendered frame and the source file was ~2/255 (0.8%),
consistent with resampling only, not reinterpretation.

How that changed the future workflow:
Manual creation + manual placement + direct use is now the documented
default for scene-specific visuals where precision matters, not a fallback
used only after reinterpretation has already failed. `docs/manual-asset-workflow.md`
states this as Rule 1–2, with Rule 6 naming exactly the categories of beat
(joke beats, core explanatory diagrams, dense infographics, branded
compositions) where this applies — narrower than "every visual," matching
what TASK-008 actually demonstrated rather than overgeneralizing.

## 3. Files Updated

| Path | Why updated | Key rules added/changed |
| --- | --- | --- |
| `docs/manual-asset-workflow.md` (new) | No existing doc was the right home for the full policy; this is the single source of truth the others point to | All six rules (ownership, no reinterpretation, reference-only vs. final-production, pause-if-missing, task-authoring template, human-control-first for critical beats), plus the TASK-008 lesson written out in full |
| `AGENTS.md` | Primary repository instructions — the one file both Codex and Claude Code are told to read first | One bullet added under "Assets and visual communication" pointing to the new policy and naming which beats it covers |
| `docs/agent-workflow.md` | Task-authoring / handoff guidance — where the existing `Feedback handoff contract` and `External Asset Requests` pattern already lives | New "Manual asset inputs" section: states the pause condition inline, and explicitly distinguishes this stricter rule from the existing `External Asset Requests` contract (which still applies to replaceable, non-precision-critical media) |
| `docs/production-architecture.md` | Production/pipeline architecture — where the asset manifest, status lifecycle, and logical-ID resolution are already documented | One paragraph after "Replaceable external media": final production assets go in the manifest with a real path; reference-only material stays outside it (e.g. under `.../reference/`) so it's never mistaken for something a scene should import |
| `README.md` | Already has an "External assets" section that would otherwise read as incomplete next to the new policy | One line pointing to the new doc |
| `CLAUDE.md` | Reviewed, not changed | Its existing pointer ("use `docs/production-architecture.md` for ... asset ... conventions") already covers this without needing a duplicate policy body — verified still accurate after the above edits |

## 4. New Workflow Rules

All six now live in `docs/manual-asset-workflow.md`:

1. **Manual asset ownership** — the user owns image generation for
   scene-specific visuals; reviews and approves before the file enters the
   repo; the agent only uses it afterward.
2. **No agent-led reinterpretation once an approved asset exists** — the
   agent must use the exact file. Allowed: import, scale, position, animate,
   explicitly-safe crop, meaning-preserving mask/reveal, surrounding
   localized text, integration into the existing background/motion system.
   Not allowed: redrawing, reinterpreting, approximate recreation, invented
   substitute objects, silent redesign.
3. **Distinguish asset types** — reference-only (may be interpreted/recreated)
   vs. final production (used exactly as supplied, registered in the
   manifest with a real path). A task must state which each asset is; the
   agent asks rather than guesses if a task doesn't say.
4. **Pause if a required asset does not exist yet** — stop the dependent
   implementation, document what's missing, wait for the user, resume after
   it exists. DEV-only placeholders for layout experiments remain fine; a
   production scene standing in for a missing final asset is not.
5. **Task files include an asset contract** — the `## Manual Asset Inputs`
   template (path / type / usage / allowed transformations / localization
   notes / baked-text flag), paired with an explicit stop condition and an
   explicit "do not generate/recreate unless instructed" line.
6. **Human control preferred for critical visual beats** — joke beats, core
   explanatory diagrams, branded compositions, dense infographics, and any
   composition where visual precision is part of correctness default to
   human-generated/approved-first.

## 5. Future Task Authoring Guidance

Reproduced from `docs/manual-asset-workflow.md` so it's visible here too:

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

Stop condition:

```markdown
If a listed asset is not yet present in the repository, stop implementation
for the parts that depend on it and report exactly what is missing.
```

Non-goal, stated explicitly so it can't be read as implicit permission:

```markdown
Do not generate, redraw, or recreate these assets unless this task explicitly
instructs otherwise.
```

`docs/agent-workflow.md`'s existing `External Asset Requests` handoff format
is unchanged and still governs genuinely replaceable media (illustrations,
generated clips, TTS, music) where the exact result is not
precision-critical — the two contracts now coexist with an explicit line
saying which one applies when.

## 6. Validation

| Check | Result | Notes |
| --- | --- | --- |
| task-008 feedback reviewed | PASS | Read in full this session (its own turn); its pixel-comparison evidence and lesson are what Section 2 above summarizes |
| markdown docs updated | PASS | 1 new file, 4 edited |
| documentation consistency review | PASS | Every path/file referenced across the new and edited docs was checked to exist (`ls`/existence check on all 10 referenced paths); `CLAUDE.md`'s pointer re-verified accurate after the edits; one internal overclaim (a specific resolver function name) found and corrected before finalizing |
| markdown lint/format check | NOT RUN | No lint tooling is configured in this repo (no `.markdownlint*`, no lint script in `package.json`); installing one was out of scope for a docs-only task |
| build sanity check | PASS | `npm run typecheck` and `npm run compositions` re-run after the doc edits — both pass, unaffected, as expected since no code changed |

## 7. Problems / Risks

- **Two asset-resolution helpers now exist side by side.** The episode
  already had `resolveAsset()` in `src/episodes/001-redis/asset-resolver.ts`.
  TASK-008 added a second, narrower `getAssetPath()` in `assets.ts` and used
  that in Scene 03 instead of the existing resolver. I did not fix this here
  — TASK-009 is scoped to documentation, and reconciling two resolvers is a
  code change, not a documentation example. I corrected the new doc so it
  describes the current (imperfect) state rather than an aspirational one,
  and flagged this explicitly in `docs/manual-asset-workflow.md`'s Rule 3.
  Worth a small follow-up task before Scene 04 introduces a third pattern.
- **Judgment call on scope, not a gap:** I added a one-line pointer to
  `README.md`. The task's minimum requirement named three doc roles and
  README isn't one of them, but it already has an "External assets" section
  that would have read as incomplete/contradictory next to the new policy if
  left alone, so I updated it rather than leaving a stale doc in place.
- **No enforcement mechanism.** This is documentation, not a lint rule or
  CI check. Nothing currently stops a future task or agent from hard-coding
  a redraw again; the safeguard is that the task file template (Rule 5) makes
  the reference-only/final-production distinction explicit up front, so a
  future agent has no ambiguous case to guess at the way earlier attempts
  did.

## 8. Recommended Next Step

If the workflow documentation is approved:
→ proceed to the next production task using the new manual-asset policy.

Otherwise:
→ revise the documentation first.

## 9. Git Status

Branch:
`master` (HEAD still `1e8a51b`; no commits made)

Changed files (from this task):
- `AGENTS.md`
- `docs/agent-workflow.md`
- `docs/production-architecture.md`
- `README.md`

New files (from this task):
- `docs/manual-asset-workflow.md`
- `feedbacks/task-009-feedback.md`
- `tasks/TASK-009.md` (the task file itself, added by the user before this
  session)

Untracked files carried over from TASK-008 (unchanged by this task, listed
for completeness since they remain uncommitted):
- `src/episodes/001-redis/RedisEpisode.tsx` (modified)
- `src/episodes/001-redis/assets.ts` (modified)
- `src/episodes/001-redis/episode.config.ts` (modified)
- `src/episodes/001-redis/scenes.ts` (modified)
- `src/shared/localization/index.ts` (modified)
- `src/episodes/001-redis/scenes/Scene03DatabaseMisconception.tsx` (new)
- `public/episodes/001-redis/assets/scene-03-joke-diagram.png` (yours)
- `public/episodes/001-redis/assets/scene-03-end-diagram.png` (yours)
- `public/episodes/001-redis/reference/does-redis-make-database-faster.jpg` (yours)
- `public/episodes/001-redis/reference/repeated-work-terminated.jpg` (yours)
- `feedbacks/task-008-feedback.md`
- `tasks/TASK-008.md`

Commits/pushes performed:
None.

## 10. Final Status

TASK-009 STATUS: PASS
