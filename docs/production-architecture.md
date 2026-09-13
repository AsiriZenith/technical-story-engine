# Production Architecture

## Agent skills

The project uses only the official [`remotion-dev/skills`](https://github.com/remotion-dev/skills) pack for Remotion guidance. Version-control-friendly canonical copies live in `.agents/skills/<skill-name>/`. Codex discovers that universal project path directly; `.claude/skills/<skill-name>/` contains project-local junctions for Claude Code. `skills-lock.json` records the upstream source, skill path, and content hash for all 12 installed skills.

Installation used:

```text
npx skills add remotion-dev/skills --agent codex claude-code --skill "*" -y --json
```

No community video or motion-design skills are part of this foundation.

## Scene contract

`src/episodes/001-redis/scenes.ts` is the approved, typed 14-scene outline. Each scene has a stable ID and order, working title, explanatory purpose, shared-window duration strategy, logical asset IDs, structured story beats, and only the visual notes that future production needs. It is story data, not a cinematic scene framework.

The episode config exposes the scene data and a derived planned timeline. The current EN/DE/FR compositions remain five-second placeholders; a later production task can switch their duration to the planned visual master when real scenes exist.

## Timing philosophy

Each scene requests a target duration plus a small localization margin. `createSceneTimeline()` converts those shared windows into deterministic frame ranges. A future scene sequence can use each window's `start` and `duration`; inside a Remotion `Sequence`, `useCurrentFrame()` is local to that scene. `getSceneProgress(localFrame, duration)` maps the local frame to a clamped `0..1` value, so key events can be placed at normalized beats such as `0.25` or `0.60` without global frame literals.

The final delivery remains one YouTube video with English original audio plus German and French dubbed tracks. The preferred approach is a shared visual master: important visual beats stay inside common scene windows, and the planned margins accommodate moderate speech-length differences. Later narration work must measure all three tracks and adjust pauses or scene windows; separate final language videos are not the synchronization strategy.

## Replaceable external media

`src/episodes/001-redis/assets.ts` maps stable logical IDs to media type, current public path, optionality, status, and purpose. A consuming scene asks for an ID such as `readyShelf` or `restaurantGeneratedClip`; it does not name the tool that created the file. Replacing a generated clip, export, or manual illustration therefore updates the manifest rather than the scene architecture.

Statuses are `placeholder`, `candidate`, and `approved`. While comparing files, use a version-control-friendly directory such as:

```text
public/episodes/001-redis/assets/chef-master/
  candidate-a.png
  candidate-b.png
  approved.png
```

Set `path` only when a real file is selected, and update `status` as it moves through review. Provider notes may live in production records, but consuming components depend only on the logical ID. Do not bake localized labels into generated media when Remotion can render them.

## Character and restaurant planning

`src/episodes/001-redis/characters.ts` records the explanatory role, required poses, likely scenes, and localization concerns for Chef/Database, Cashier/Application, Customers/Requests, Alice, and Developer. It deliberately contains no generated artwork.

Future restaurant assets should preserve a 16:9, simple colorful illustrated layout with a customer, cashier, ready-order shelf, and chef in a clear spatial hierarchy. Prefer transparent or separable characters, leave labels for Remotion, and maintain positions that can later simplify into Request, Application, Redis, and Database components.

## Validation

The episode config runs lightweight typed validation during module loading. It rejects duplicate scene or asset IDs, non-sequential scene ordering, unknown asset references, and any supported-language list other than `en`, `de`, `fr`. Consequently type checking, architecture validation, composition discovery, and bundling all exercise the contract without adding a test framework.
