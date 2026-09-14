# Technical Story Engine

A reusable Remotion, React, and TypeScript project for producing localized technical-explainer videos. Each video is an episode in this repository and shares the same rendering infrastructure.

## Setup

Node.js 20 or newer is recommended.

```bash
npm install
npm run dev
```

`npm run dev` opens Remotion Studio. Other useful commands are:

```bash
npm run typecheck
npm run compositions
npm run build
npm run render:en
npm run render:de
npm run render:fr
```

The render scripts write to `renders/`, which is intentionally ignored by Git except for its `.gitkeep` file.

## Architecture

- `src/shared/` contains small pieces intended for reuse across episodes: localization, styles, layouts, audio helpers, animations, components, and utilities.
- `src/episodes/<episode-id>/` contains an episode component, typed configuration, scenes, metadata, captions, narration references, and episode-specific asset organization.
- `public/shared/` is for curated static assets shared by episodes.
- `public/episodes/<episode-id>/` is for curated runtime media addressed through Remotion's `staticFile()` API.
- `scripts/` is reserved for repeatable production and validation tooling.
- `feedbacks/` records task verification and implementation decisions.

The first episode is `001-redis`. `Redis-EN`, `Redis-DE`, and `Redis-FR` are development compositions that pass different language props to one `RedisEpisode` implementation. English (`en`) is the primary and fallback language; German (`de`) and French (`fr`) demonstrate the localization path.

The typed 14-scene outline, shared-window timing model, replaceable asset manifest, and character plan are described in [Production architecture](docs/production-architecture.md). The registered compositions intentionally remain five-second placeholders until production scenes and narration timing are implemented.

## Agent skills

The official `remotion-dev/skills` pack is installed project-locally. Canonical skill files are in `.agents/skills/` for Codex and other agents; Claude Code discovery links are in `.claude/skills/`. `skills-lock.json` records the source and hashes. Restore the same project setup on another machine with `npx skills experimental_install`.

The provisional visual tokens and Human Media Review Gate are documented in [Visual system](docs/visual-system.md) and [Agent workflow](docs/agent-workflow.md). Rendered media remains pending until the user explicitly approves it.

Project operating rules live in `AGENTS.md`, with `CLAUDE.md` pointing to the same source of truth. See [Agent workflow](docs/agent-workflow.md) for task handoffs, model escalation, validation, custom-skill synchronization, and visual QA.

## External assets

Illustrations, Canva exports, generated clips, TTS, music, and sound effects are replaceable inputs. Keep provider-specific generation outside the runtime. Reference media by stable paths held in episode configuration so a replacement usually requires a file or path change, not a scene rewrite. Avoid baking narration or localized text into visual clips when the visual can be shared across languages.

For scene-specific visuals where precision matters, the user generates, reviews, and manually places the asset before the agent uses it in a scene, exactly as supplied. See [Manual asset workflow](docs/manual-asset-workflow.md).

Future language-specific audio belongs under `public/episodes/<episode-id>/audio/narration/<language>/`; shared episode music and sound effects belong beside `narration/` under `audio/`. Captions, narration manifests, and publishing metadata belong in the matching source episode directories.
