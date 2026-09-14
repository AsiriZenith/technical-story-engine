# TASK-010 Feedback - Consolidate the Asset Resolver Before Scene 04

## 1. Summary

Consolidated Scene 03 asset lookup onto the existing canonical `resolveAsset()`
API in `src/episodes/001-redis/asset-resolver.ts`. Removed the duplicate
`getAssetPath()` helper from `src/episodes/001-redis/assets.ts` and kept Scene
03 rendering the same logical asset IDs through the manifest.

No Scene 04 work was started. No new production assets were generated.

## 2. Previous State

- `resolveAsset(assetId, candidateId?)` looked up a logical asset ID in
  `redisAssetManifest` and returned a full `ResolvedAsset` record: logical ID,
  candidate identity, review status, media type, path, dimensions/aspect ratio,
  optional flag, description, and selected state. It also supported selected or
  explicitly requested candidates and preserved manifest status handling.
- `getAssetPath(assetId)` lived in `assets.ts`, performed a second manifest
  lookup, threw if no `path` existed, and returned only the static-file-relative
  path string.
- Callers of `resolveAsset()`: `src/dev/compositions/DevAssetPreview.tsx` and,
  after this task, `src/episodes/001-redis/scenes/Scene03DatabaseMisconception.tsx`.
- Callers of `getAssetPath()`: before this task, only
  `Scene03DatabaseMisconception.tsx`.

`getAssetPath()` had no status, candidate, type, dimension, or selected-candidate
behavior that `resolveAsset()` lacked. Its only extra behavior was throwing when
the selected asset had no file path.

## 3. Canonical Resolver

Chosen API: `resolveAsset(assetId, optionalCandidateId)`.

Why: it already existed, was documented as the provider-independent resolver,
preserved candidate selection and review status metadata, and returned all
manifest information a production scene or DEV preview might need without naming
any external provider.

Final call flow:

```text
logical asset ID
-> resolveAsset()
-> redisAssetManifest entry or selected candidate
-> static-file-relative path
-> Remotion staticFile()
-> Remotion <Img>
```

## 4. Scene 03 Migration

`Scene03DatabaseMisconception.tsx` now imports `resolveAsset()` from
`../asset-resolver` instead of `getAssetPath()` from `../assets`.

`DiagramAsset` resolves the logical ID, checks that the resolved manifest entry
has a selected `path`, and passes that path to `staticFile()`. The missing-path
error behavior from `getAssetPath()` is preserved at the consuming boundary.

The exact PNG contents remain unchanged:

- `public/episodes/001-redis/assets/scene-03-joke-diagram.png`
  - SHA-256 before/after:
    `1B5AE4D1DC3700C8A6CB0CC0F07A974180F070CA1545E655F040C8222D061C1A`
- `public/episodes/001-redis/assets/scene-03-end-diagram.png`
  - SHA-256 before/after:
    `01406BA8CAF981667039BE5061EF00F6344C91E7F1B70CD9E9132843FD1F1FEC`

## 5. Asset Status Review

Both Scene 03 final-production assets are now `approved`:

- `scene03JokeDiagram`: `approved`
- `scene03EndDiagram`: `approved`

Reason: TASK-010 states that the human has manually reviewed and approved Scene
03. The manifest now records `humanApproval: {approvedBy: 'user',
approvedAt: '2026-09-14'}` for only these two entries. No unrelated assets were
promoted.

## 6. Documentation Changes

Updated:

- `docs/manual-asset-workflow.md`

The document no longer describes the TASK-008 duplicate helper as current state
and now points to `resolveAsset()` as the canonical lookup.

Inspected but not changed:

- `docs/production-architecture.md`
- `docs/agent-workflow.md`

## 7. Verification Results

| Check | Result | Notes |
| --- | --- | --- |
| TypeScript | PASS | `npm.cmd run typecheck` |
| build | PASS | `npm.cmd run build` |
| composition discovery | PASS | `npm.cmd run compositions`; Redis EN/DE/FR remain 1590 frames at 1920x1080, 30 FPS |
| Scene 03 joke regression | PASS | Rendered `renders/review/task-010/scene-03-joke-regression.png` at Redis-EN frame 1245; SHA-256 matches `renders/review/task-008/scene-03-joke.png` exactly |
| Scene 03 end regression | PASS | Rendered `renders/review/task-010/scene-03-end-regression.png` at Redis-EN frame 1440; SHA-256 matches `renders/review/task-008/scene-03-end.png` exactly |
| Scene 01 regression | PASS | Rendered and inspected `renders/review/task-010/scene-01-regression.png` at Redis-EN frame 585; no issue observed, and Scene 01 code was untouched |
| Scene 02 regression | PASS | Rendered `renders/review/task-010/scene-02-regression.png` at Redis-EN frame 1110; SHA-256 matches `renders/review/task-008/scene-02-regression.png` exactly |

## 8. Human Review Requests

None.

## 9. External Asset Requests

None.

## 10. Problems / Risks

Minor remaining asset-pipeline debt: `resolveAsset()` correctly permits
placeholder entries with `path: null`, so production image consumers still need
to guard against missing paths when they require a real file. I did not add a
second path-only wrapper because the task explicitly asked to avoid duplicate
resolution APIs.

The Scene 03 PNGs still contain baked English labels, a known asset constraint
from TASK-008, not a resolver issue.

## 11. Recommended Next Task

Proceed to Scene 04 planning/implementation using the manual-asset policy.

If Scene 04 requires precision-critical external visuals,
identify/manual-generate/approve those assets before implementation.

## 12. Git Status

- Branch: `master`
- Changed files:
  - `docs/manual-asset-workflow.md`
  - `src/episodes/001-redis/assets.ts`
  - `src/episodes/001-redis/scenes/Scene03DatabaseMisconception.tsx`
  - `feedbacks/task-010-feedback.md`
- Untracked files:
  - `tasks/TASK-010.md`
  - `feedbacks/task-010-feedback.md`
- Commits/pushes: none.

## 13. Final Status

TASK-010 STATUS: PASS
