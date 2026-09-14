# Skills Strategy

Tracks which external agent skills are installed, why, and what is deliberately deferred. Maintained alongside `skills-lock.json` and `.agents/skills/`. See `AGENTS.md` for the concise invocation rule agents actually follow day to day; this document holds the fuller rationale.

## Current production specialists

Installed via the `skills` CLI (`npx skills add ... --agent claude-code codex`), tracked in `skills-lock.json`, discoverable by both Codex and Claude Code.

| Skill | Source | Role |
| --- | --- | --- |
| `animate` | `emilkowalski/skills` | Decide whether/how something should animate; easing, spring, and duration choices; reduces robotic linear motion. |
| `review-animations` | `emilkowalski/skills` | Critiques animation diffs against a strict craft bar — abrupt starts/stops, unjustified bounce, mismatched durations, spatial discontinuity. |
| `frontend-design` | `anthropics/skills` | Typography hierarchy, whitespace, layout balance, focal-point control; avoids generic template aesthetics. |

All three are **advisory specialists**. `technical-story-video` (`.agents/skills/technical-story-video/SKILL.md`, synced to `.claude/skills/` via `scripts/sync-agent-skills.ps1`) remains the primary repository workflow skill and is consulted first for narrative/storyboard/scene-lifecycle decisions.

### Project-rule precedence

These three skills assume a browser runtime (CSS transitions, `@starting-style`, WAAPI, the `motion.dev`/Framer Motion JS library). This repository's permanent production core is Remotion + React + TypeScript, which requires deterministic, frame-accurate animation — `interpolate()` / `spring()` driven by scene-relative local frames — not real-time CSS transitions or a JS motion library as the source of production timing (`AGENTS.md`, Timing and localization).

Where a skill's concrete implementation snippet assumes a live DOM/CSS runtime, translate the *decision* (should it animate, which easing/duration, which craft-bar violation) into Remotion's `interpolate()`/`spring()` idiom rather than adopting the snippet verbatim. No other conflicts were found: reduced-motion handling, GPU-only `transform`/`opacity` properties, and the typography/hierarchy guidance in `frontend-design` all apply directly to Remotion-rendered output.

### Contextual use — do not over-apply

| Change | Consult |
| --- | --- |
| Config file, static TypeScript type | Neither |
| Scene entrance, packet/data motion | `animate` |
| Reviewing a new rendered MP4/still for motion quality | `review-animations` |
| Designing a scene layout / typography | `frontend-design` |

## Deferred candidates

### Phase 2

| Skill | Trigger for reconsideration |
| --- | --- |
| `svg-animations` | Before packet-heavy cache hit/miss scenes needing custom SVG path motion. |
| `audio-ducking` | Before narration + background music integration. |
| `web-design-guidelines` | Before broader UI/web-surface work beyond single-scene layout (e.g. a companion web page or player chrome). |

### Possible later additions

| Skill | Trigger for reconsideration |
| --- | --- |
| `animation-vocabulary` | If motion terminology/consistency across scenes becomes a recurring review friction point. |
| `canvas-design` | If a scene needs raw `<canvas>` drawing beyond what Remotion/React markup covers. |
| `vercel-composition-patterns` | If composition-structuring patterns from that skill would reduce boilerplate across episodes. |
| `technical-storyboard-scripting` | Before storyboard scripting is done at higher volume/automation than the current manual task flow. |
| `remotion-sound-orchestration` | Before multi-track narration/SFX/music orchestration is needed. |
| `external-asset-director` | Before final restaurant/character asset generation from external providers. |
| `visual-qa-audit` | If agent-side visual QA needs a more systematic audit pass than the current representative-frame checklist in `docs/agent-workflow.md`. |

None of the above are installed in TASK-007.
