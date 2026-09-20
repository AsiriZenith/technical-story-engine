# Architecture Review — 2026-09-20

## Overview

This is an early-stage, single-episode React + Remotion + TypeScript project for producing
long-form (10–12 min) developer-education videos. Only one episode (`001-redis`) has real
implementation; everything else is scaffolding. The typed scene/asset contract and timing
model are unusually rigorous for this stage, but the component-reuse layer that would make a
second episode cheaper to produce hasn't been built yet — the codebase hasn't crossed the
"second episode" test of its own abstractions, and it's already showing seams (a scene-count
mismatch between spec and implementation, a caption component duplicated five times, hardcoded
duration aggregation). Audio narration is not wired in at all yet; duration is currently
author-estimated rather than derived from audio.

## Folder Structure Summary

- **`src/episodes/001-redis/`** — the one implemented episode. Contains `scenes.ts` (typed
  story-data outline, 14 entries), `episode.config.ts` (derives the frame timeline and
  composition metadata from `scenes.ts`), `assets.ts` (logical-asset manifest), `characters.ts`
  (character/pose planning, no artwork yet), `asset-resolver.ts`, `validation.ts` (enforces
  architecture invariants), and `RedisEpisode.tsx` (the actual `<Sequence>` composition). A
  `scenes/` subfolder holds one `.tsx` file per scene (`Scene01Mystery.tsx` …
  `Scene13CacheCosts.tsx`). Sibling directories `assets/{characters,generated-video,restaurant,
  sfx}/`, `captions/`, `metadata/`, `narration/` contain only `.gitkeep` — scaffolded but unused.
- **`src/shared/`** — intended cross-episode home. In practice only a few things are populated:
  `styles/theme.ts`, `styles/visual-system.ts`, `motion/presets.ts`, `timing/scene-timing.ts`,
  `localization/index.ts`, `architecture/node-semantics.ts`, and
  `components/{SpotlightImage.tsx, TimingBar.tsx}`. `shared/{animations,audio,layouts,utils}/`
  and part of `shared/components/` are `.gitkeep`-only stubs — declared but not built.
- **`src/dev/`** — an isolated playground (`DevRoot.tsx`, `DevArchitectureNodes.tsx`,
  `DevAssetPreview.tsx`, `DevMotionBasics.tsx`, `DevTypography.tsx`), correctly kept out of the
  `Production` composition tree in `Root.tsx`.
- **`src/Root.tsx`** — registers `Redis-EN/DE/FR` compositions under a `Production/Episodes`
  folder, and the dev playground under `Development`.
- **`.agents/skills/`** (canonical) + `.claude/skills/` (synced junctions) — the official
  `remotion-dev/skills` pack plus three custom specialists, tracked via `skills-lock.json`.
- No test directory exists. This matches `docs/production-architecture.md`'s stated choice to
  rely on typed validation instead of a test framework — confirmed against `package.json`
  scripts (`typecheck`, `validate:architecture`, `compositions`, `build`, `render:{en,de,fr}`;
  no `test` script).

## Component Architecture

- **No reusable scene templates exist.** Each of the 13 implemented scenes
  (`Scene01Mystery.tsx` … `Scene13CacheCosts.tsx`) is a standalone, hand-written component.
  There is no `TitleCard`, `ComparisonLayout`, `CodeReveal`, or generic diagram wrapper in
  `shared/`. Only two genuinely reusable visual primitives exist: `SpotlightImage.tsx`
  (dim/spotlight-region overlay on an `<Img>`, reused across Scenes 08–10 to highlight nodes in
  the Scene-07 architecture PNG) and `TimingBar.tsx` (proportional latency-breakdown bar, used
  in Scene 02).
- **`BottomCaption` is duplicated five times**, independently redefined and near-byte-identical
  in `Scene06ReadyShelfCacheHit.tsx:172`, `Scene07AnalogyToArchitecture.tsx:179`,
  `Scene08CacheMiss.tsx:158`, `Scene09CacheHit.tsx:153`, and `Scene10WhyRedisFast.tsx:119` — same
  gradient scrim, same `layout.captionBottom` positioning, same text-shadow, with small
  undocumented forks (Scene 06 adds an `emphasize` prop the others lack; some hardcode
  `fontSize: 40` instead of using the shared typography scale). This should be one shared
  component.
- **Animation constants are shared; animation calls are not.** `shared/motion/presets.ts`
  defines named timing constants (`enterSoft`, `enterFast`, `exitSoft`, `emphasizeScale`,
  `moveLinear`, `staggerSmall`, `counterValue`) and all 13 scenes import from it — good
  adherence to "named constants, not scattered literals." But there is no shared animation
  *hook* (e.g. `useFadeIn`, `useSlideIn`); every scene writes its own `interpolate()` calls
  directly against the presets — 69 inline `interpolate()` call sites across the 13 scene files
  (2 in Scene08/09/10, up to 17 in Scene01). `spring()` is used **zero** times in `src/`, despite
  `AGENTS.md` naming it alongside `interpolate()` as an expected production-timing tool.
- **Theme/typography is shared but occasionally bypassed.** `shared/styles/theme.ts` and
  `shared/styles/visual-system.ts` (a `typography` scale with 9 named roles, `layout` spacing
  tokens, `provisionalColors`) are imported throughout scenes. But `TimingBar.tsx` hardcodes
  `fontSize: 24/48/15/26` inline instead of using the `typography` scale, and the duplicated
  `BottomCaption` blocks hardcode `fontSize: 40` rather than `typography.caption`.
  `provisionalColors` (a name that implies "not final") is used directly in production scene
  code, e.g. `TimingBar.tsx:138`.

## Audio & Timing Approach

- **Audio is not implemented.** There are zero references to `<Audio>`, `useAudioData`, or any
  Remotion audio import anywhere in `src/`. `episode.config.ts` defines `narrationTracks: {}`
  and `captionTracks: {}` as empty objects — the types exist (`EpisodeTrackPaths = Partial<Record
  <Language, string>>`), but nothing populates or consumes them. There is no music track either.
  This matches `docs/production-architecture.md`'s framing that narration integration is later
  work, but it means the project hasn't yet exercised its audio-to-timing pipeline at all.
- **Duration is fully hardcoded as author-estimated seconds, not audio-derived.**
  `scenes.ts` gives each scene a `durationStrategy: sharedWindow(targetSeconds,
  localizationMarginSeconds)` — a manual time estimate per scene (e.g. Scene 01 = 20s + 2s
  margin). `shared/timing/scene-timing.ts`'s `createSceneTimeline()` converts these into frame
  windows, and `episode.config.ts` sums 13 scene windows into `durationInFrames` via 13 explicit
  hand-written `+` lines rather than a `.reduce()` over the timeline array. There is no
  `calculateMetadata` and no `getAudioDurationInSeconds` anywhere in the codebase.
- `getSceneProgress(localFrame, duration)` correctly clamps local progress to `0..1` for
  normalized-beat placement, matching the "scene-relative, not global-frame" philosophy
  described in `docs/production-architecture.md`.
- **Documentation drift:** `docs/production-architecture.md:19` still states "the current
  EN/DE/FR compositions remain five-second placeholders," but `Root.tsx` and
  `episode.config.ts` now wire a real ~13-scene timeline (roughly 3 minutes) into the
  `Redis-EN/DE/FR` compositions. That doc line needs updating.

## Strengths

- **The typed scene/asset contract is unusually rigorous for this stage.** `scenes.ts` +
  `assets.ts` + `validation.ts` together enforce duplicate-ID checks, ordering checks, and
  unknown-asset-reference checks automatically at module load via `redisArchitectureIsValid`,
  exercised through `typecheck`/`compositions`/`build` without needing a test framework — exactly
  as `docs/production-architecture.md` intends.
- **The manual-asset-approval workflow is well-designed.** The `AssetReviewState` union in
  `assets.ts` (`placeholder → candidate → approved`, requiring `humanApproval`) is consistently
  populated for the 8 real production assets currently in use.
- **`SpotlightImage.tsx` is a genuinely good reusable primitive** — clear, well-commented
  semantics (normalized region coordinates, feathered radial mask). It's a solid template for
  what the rest of `shared/components/` should look like once built out.
- **The scene-relative timing model is sound.** `createSceneTimeline`, `getSceneProgress`, and
  local-frame `<Sequence>` usage correctly avoid global frame literals, per `AGENTS.md`'s stated
  rule. This part of the architecture is ready to scale to more scenes and episodes as-is.
- Named motion-timing constants (`shared/motion/presets.ts`) are consistently imported and used
  across all 13 scenes rather than scattered as magic numbers.

## Issues & Gaps

- **Scene count mismatch between spec and implementation.** `scenes.ts` defines 14 scenes
  (through `'14-final-mental-model'`, `order: 14`) and `validation.ts:22-24` hard-asserts
  `scenes.length !== 14`. Only 13 scenes are implemented and sequenced in `RedisEpisode.tsx` /
  `episode.config.ts` (`scene01Window` … `scene13Window`); no `Scene14FinalMentalModel.tsx`
  exists. This is the clearest signal that the outline and implementation have already drifted
  within episode #1 alone.
- **No scene template layer.** Every future video requires writing 10–14 bespoke scene
  components from scratch — there's no abstracted `TitleCardScene`, `ComparisonScene`,
  `DiagramRevealScene`, etc., despite the `src/episodes/` structure anticipating multiple
  episodes.
- **`BottomCaption` duplicated across 5 files** (see Component Architecture) — any future
  styling change (e.g. a safe-margin adjustment) requires touching 5+ files instead of 1.
- **No animation hooks.** 69 raw `interpolate()` call sites mean common patterns (fade-in-then-
  hold, staggered entrance) are reimplemented per scene; adjusting easing project-wide means
  touching every scene file individually.
- **Redis-specific keys live in "shared" localization.** `shared/localization/index.ts` is a
  single flat dictionary (`en`/`de`/`fr`, 60+ keys in one namespace) containing episode-specific
  keys like `cacheCostsFreshnessCaption`. This will need per-episode namespacing before episode
  #2's translations can be added without risking key collisions or unbounded file growth.
- **Manual, hand-summed duration aggregation.** `episode.config.ts` sums scene windows with 13
  explicit `+` lines instead of `.reduce()` over the timeline array — copy/paste-prone as scene
  count grows, and already out of sync with the 14-scene contract in `scenes.ts`.
- **Scene/asset ID convention split is undocumented.** Scene IDs in `scenes.ts` use kebab-case
  (`01-mystery`, `08-cache-miss`); asset IDs in `assets.ts` use camelCase (`scene03JokeDiagram`,
  `readyShelf`). `validation.ts` enforces cross-references so this doesn't break anything today,
  but nothing documents or enforces the convention itself, so a future episode could introduce a
  third convention.
- **`shared/{animations,audio,layouts,utils}/` are still `.gitkeep`-only stubs** — exactly the
  directories a second episode would need populated to avoid re-solving the same problems.
  Right now they're aspirational scaffolding, not working shared code.
- **Duration isn't audio-coupled yet.** Since scene duration is currently author-estimated
  seconds rather than derived from actual narration length, every scene's `targetSeconds` will
  likely need hand re-tuning once real narration exists for episode 1 — there's no
  audio-driven-duration mechanism in place to make that measurement-driven.
- **Stale documentation.** `docs/production-architecture.md:19` describes the compositions as
  "five-second placeholders," which no longer reflects the current ~13-scene, multi-minute
  timeline.

## Recommendations

1. **Extract `BottomCaption` into `shared/components/BottomCaption.tsx`** with an explicit
   `emphasize` prop and typography-scale font sizing, and update all 5 scenes to import it. This
   is the single highest-value, lowest-risk cleanup available right now.
2. **Build a small set of shared scene templates** in `shared/components/` (e.g. `TitleCard`,
   `ComparisonLayout`, `CodeReveal`, `DiagramReveal`) informed by the patterns already repeated
   across the 13 Redis scenes, so episode #2 can compose from templates rather than starting
   from a blank `.tsx` file each time.
3. **Add shared animation hooks** (e.g. `useFadeIn`, `useSlideIn`, `useStagger`) wrapping the
   `shared/motion/presets.ts` constants, to replace the 69 scattered raw `interpolate()` calls
   and make future easing/timing adjustments a one-place change. Consider introducing `spring()`
   for at least emphasis/attention beats, since it's named in `AGENTS.md` but currently unused.
4. **Resolve the 13-vs-14 scene mismatch** — either implement `Scene14FinalMentalModel.tsx` or
   trim `scenes.ts`/`validation.ts` back to 13, so the typed contract and the real composition
   agree again.
5. **Replace the hand-summed duration aggregation** in `episode.config.ts` with a `.reduce()`
   over the scene timeline array, removing a manual-edit step from adding future scenes.
6. **Namespace `shared/localization/index.ts` per episode** (e.g. nest keys under a `redis`
   object, or split into per-episode locale files merged at build time) before starting
   episode #2, to avoid key collisions and an ever-growing flat dictionary.
7. **Document the scene-ID (kebab-case) vs. asset-ID (camelCase) convention explicitly** in
   `AGENTS.md` or `docs/production-architecture.md`, or unify them, so future episodes don't
   invent a third pattern.
8. **Plan an audio-driven duration path** (a `useAudioDrivenDuration`-style hook or
   `calculateMetadata` + `getAudioDurationInSeconds` integration) before recording real
   narration for episode 1, so scene timing can be measured rather than re-estimated by hand
   once audio exists.
9. **Update `docs/production-architecture.md:19`** to reflect the current real timeline instead
   of the stale "five-second placeholder" description.
10. **Resolve `provisionalColors` to final theme tokens** before they spread further into
    production scene code (currently used directly in `TimingBar.tsx`), or rename the export if
    it is in fact final.

These are recommendations only — none of the above has been implemented as part of this review.
