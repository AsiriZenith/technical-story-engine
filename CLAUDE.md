# Claude Code Project Guide

Read and follow the repository-root `AGENTS.md`; it is the canonical shared operating guide for both Codex and Claude Code. Also use `docs/production-architecture.md` for scene, timing, asset, and multilingual conventions and `docs/agent-workflow.md` for task handoff and visual QA.

Claude-specific note: project skills are discoverable under `.claude/skills/`. Do not edit generated custom-skill copies there; update the canonical `.agents/skills/technical-story-video/SKILL.md` and run `scripts/sync-agent-skills.ps1`.

When shared operating rules change, update `AGENTS.md` and verify this pointer remains accurate rather than duplicating a second policy body here.
