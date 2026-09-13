# Agent Workflow

## Task lifecycle

```text
TASK file
  -> agent implementation
  -> validation
  -> feedbacks/task-XXX-feedback.md
  -> human review
  -> next TASK
```

Start only from the committed baseline required by the active task. Treat the task file as scope, preserve unrelated work, record commands and results truthfully, and stop after its feedback report. Switching between Codex and Claude Code is safest at task boundaries; if a mid-task handoff is unavoidable, hand over the exact Git state, completed checks, remaining work, and known risks.

## Model escalation

- Codex: use GPT-5.6 Sol by default; reserve GPT-6 Astra for difficult or escalated work.
- Claude Code: use Sonnet by default; reserve Opus for difficult or escalated work.

Model labels and availability may evolve. Keep the principle: begin with the capable default and escalate only when complexity, ambiguity, or failed attempts justify the added cost.

## Custom skill synchronization

The canonical project skill is `.agents/skills/technical-story-video/SKILL.md`. Claude Code's `.claude/skills/technical-story-video/SKILL.md` is a generated regular-file copy, not a junction. Edit only the canonical file, then run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/sync-agent-skills.ps1
```

The script copies the skill and verifies matching SHA-256 hashes. Commit both copies so discovery works without depending on Windows link support. The official Remotion skills remain managed separately by `skills-lock.json` and the `skills` CLI.

## Validation

Choose checks in proportion to the change. The normal baseline is TypeScript, build, composition discovery, scene/asset validation, and a representative still or preview for visible work. Do not claim a check passed unless it ran.

## Visual QA

Every feedback report for a visible change should include:

```text
Visual QA
- composition rendered
- frame(s) inspected
- what was checked
- known visual issues
```

Inspect focal point, text readability, safe margins, alignment, technical correctness, motion pacing, visual hierarchy, language overflow, and asset quality. Select frames that expose the changed states, not only frame zero. This is an informed human/agent review checklist, not automated visual scoring.

For a quick playground loop, run `npm run dev:still`, inspect `renders/dev-typography.png`, revise, and repeat. Use a direct `remotion still` command when another DEV composition or frame is more representative.

## Human Media Review Gate

Technical success and human acceptance are separate states for user-facing `.png`, `.jpg`, `.webp`, `.mp4`, `.mov`, `.wav`, and `.mp3` outputs.

```text
implement -> render/export -> agent QA -> feedback report
-> HUMAN REVIEW: PENDING -> stop -> user review -> later revision or approval
```

Asset states mean:

- `placeholder`: temporary development material, not ready for approval.
- `candidate`: generated or rendered media ready for human review.
- `approved`: explicitly accepted by the user. Build success or agent preference can never grant this state.

When media changes, record exact artifact paths and agent QA findings, set human review to `PENDING`, and stop after the report. User feedback belongs in a subsequent task. Never silently promote a candidate to approved.

## Feedback handoff contract

Every task feedback report must make review and external dependencies explicit.

When human review is required, add one entry per artifact:

```markdown
## Human Review Requests

### Review Request 1

Artifact:
<path>

Type:
PNG / MP4 / MP3 / WAV / ...

Purpose:
...

What to review:
- ...

Agent assessment:
PASS / PASS WITH ISSUES / FAIL

Known issues:
- ...

Human review status:
PENDING
```

When no review is required, write `## Human Review Requests` followed by `None.`

When external generation is required, use this complete requirement record for each logical asset:

```markdown
## External Asset Requests

### Asset Request 1

Asset ID:
...

Why needed:
...

Preferred type:
PNG / MP4 / WAV / ...

Dimensions / duration:
...

Composition requirements:
...

Character requirements:
...

Visual-style constraints:
...

Motion requirements:
...

Localization constraints:
...

Transparent background:
YES / NO

Audio:
...

Integration target:
...

Status:
NEEDS EXTERNAL GENERATION
```

When none is required, write `## External Asset Requests` followed by `None.`

The coding agent supplies requirements, not the final provider prompt. A later prompt should combine those requirements with the storyboard, human review, channel direction, and the chosen tool's capabilities.
