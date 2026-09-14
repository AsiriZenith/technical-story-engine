# TASK-011 Feedback - Implement Scene 04 Using the Exact User-Supplied Diagram Asset

## 1. Summary

Implemented Scene 04, "Original Request Path", as a production scene in the
existing Redis episode sequence. The scene uses the exact user-supplied JPG as
the dominant visual, registered through the episode asset manifest and resolved
through the canonical `resolveAsset()` pipeline from TASK-010.

No Scene 05 work was started. No new external media was generated.

## 2. Manual Asset Usage

- Exact asset path:
  `public/episodes/001-redis/assets/scene-04-original-request-path.jpg`
- Logical asset ID:
  `scene04OriginalRequestPath`
- Manifest status:
  `approved`, with `humanApproval: {approvedBy: 'user', approvedAt: '2026-09-14'}`
- Source dimensions:
  `2752x1536`
- Source SHA-256:
  `8A948FB361B3CEE4F4BF400511D01A6CB44C2B6047AF7AD7F56D5AC156214BC0`

The scene renders the JPG directly with Remotion's `<Img>` and `staticFile()`
after resolving the logical ID with `resolveAsset('scene04OriginalRequestPath')`.
The diagram was not redrawn, traced, reinterpreted, recomposed, or replaced.

## 3. Background Integration

The source background already matches the episode's dark technical grid closely.
The scene keeps the JPG itself unfiltered and uses `objectFit: 'contain'`, so no
important diagram content is cropped. Because the source aspect ratio is slightly
wider than 16:9, this preserves the full image with only tiny top/bottom backing
areas visible.

Integration treatment:

- existing project dark grid behind the image;
- subtle ambient red/amber backing behind the full image;
- non-destructive focus frames over the request path, expensive-work area, and
  latency box.

The diagram content itself was not changed.

## 4. Scene Implementation

Scene 04 is added to the production episode after Scene 03 using
`scene04Window`, a 12-second shared window derived from the existing scene timing
system.

Timing and motion:

- setup recall appears first: "Before Redis / 180 ms";
- supplied diagram fades/scales in with restrained scene-relative motion;
- a quiet white focus frame indicates the request path;
- a red focus frame emphasizes the expensive database-work area;
- an amber focus frame lands on `Total Latency: ~180 ms`;
- the final state holds long enough to read.

The scene uses `useCurrentFrame()`, `interpolate()`, and the existing
`motionPresets`. It introduces no active Redis path element and does not add
cache-aside logic.

## 5. Localization

The JPG contains baked English text:

- `Before Redis`
- `User`
- `Request`
- `User / Client`
- `Application`
- `Database`
- `Expensive work`
- `Response`
- `Total Latency: ~180 ms`

Per the task and manual-asset policy, that text was preserved exactly as
supplied. The same visual timeline renders for EN/DE/FR, but Scene 04 is not
fully localized because the approved production image contains baked English
labels. I did not fake localization by redrawing or editing the diagram.

## 6. Skills Used

- `technical-story-video`: used as the primary repository workflow; kept the
  scene scoped to the active task, preserved the manual-asset policy, rendered
  review artifacts, and ended with human review pending.
- `frontend-design`: used to keep the supplied JPG as the dominant visual and
  spend visual emphasis only on restrained focus treatment rather than adding
  extra chrome or competing graphics.
- `animate`: used to choose only necessary explanatory motion: opacity and
  transform-based entrance plus brief focus emphasis, using scene-relative
  Remotion interpolation and existing motion tokens.
- `review-animations`: used before completion to review the motion. Findings:
  none blocking. Motion is justified as explanation, occasional rather than
  high-frequency UI, uses opacity/transform for moving elements, avoids springs
  where unnecessary, and stays cohesive with Scenes 01-03. Reduced-motion and
  hover gating are browser-interaction concerns and are not applicable to this
  fixed rendered video, but movement is minimal.

## 7. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-011/scene-04-start.png`

Type:
PNG

Purpose:
Review the opening transition from Scene 03 into the "Before Redis / 180 ms"
setup.

What to review:
- Whether the setup feels consistent with Scenes 01-03.
- Whether the opening is clear without adding extra explanation.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-011/scene-04-main.png`

Type:
PNG

Purpose:
Review the main request-path diagram and expensive-work emphasis.

What to review:
- Whether the exact supplied JPG is clearly being used.
- Whether the diagram was preserved without reinterpretation.
- Whether the request path is easy to understand.
- Whether the database work reads as the expensive step.

Agent assessment:
PASS

Known issues:
- The diagram has baked English labels in every language.

Human review status:
PENDING

### Review Request 3

Artifact:
`renders/review/task-011/scene-04-end.png`

Type:
PNG

Purpose:
Review the final hold on the full request path and `~180 ms` latency message.

What to review:
- Whether `180 ms` is clear.
- Whether the focus treatment is restrained and polished.
- Whether the scene is ready to proceed to Scene 05.

Agent assessment:
PASS

Known issues:
- Baked English labels remain by design.

Human review status:
PENDING

### Review Request 4

Artifact:
`renders/review/task-011/scene-04-preview.mp4`

Type:
MP4

Purpose:
Review the full 12-second Scene 04 motion sequence.

What to review:
- Whether background integration feels consistent with Scenes 01-03.
- Whether motion is restrained and does not compete with the supplied diagram.
- Whether the scene clearly teaches that the request goes to the database and
  repeats expensive work before Redis.

Agent assessment:
PASS

Known issues:
- Future narration timing may require beat adjustments.
- Baked English labels remain in DE/FR renders.

Human review status:
PENDING

### Review Request 5

Artifact:
`renders/review/task-011/scene-04-main-de.png`

Type:
PNG

Purpose:
Check the German composition with the Scene 04 visual.

What to review:
- Whether the baked English diagram is acceptable for this approved asset.

Agent assessment:
PASS WITH ISSUES

Known issues:
- The diagram text is English, not German.

Human review status:
PENDING

### Review Request 6

Artifact:
`renders/review/task-011/scene-04-main-fr.png`

Type:
PNG

Purpose:
Check the French composition with the Scene 04 visual.

What to review:
- Whether the baked English diagram is acceptable for this approved asset.

Agent assessment:
PASS WITH ISSUES

Known issues:
- The diagram text is English, not French.

Human review status:
PENDING

## 8. External Asset Requests

None.

## 9. Verification Results

| Check | Result | Notes |
| --- | --- | --- |
| TypeScript | PASS | `npm.cmd run typecheck` |
| build | PASS | `npm.cmd run build` |
| composition discovery | PASS | `npm.cmd run compositions`; Redis EN/DE/FR are 1950 frames, 65.00s |
| scene validation | PASS | Exercised during module load by typecheck/build/composition discovery |
| asset validation | PASS | Manifest includes `scene04OriginalRequestPath`; approval metadata accepted |
| Redis-EN | PASS | Rendered Scene 04 stills and MP4 from `Redis-EN` |
| Redis-DE | PASS | Rendered `scene-04-main-de.png` |
| Redis-FR | PASS | Rendered `scene-04-main-fr.png` |
| Scene 04 start | PASS | `renders/review/task-011/scene-04-start.png` |
| Scene 04 main | PASS | `renders/review/task-011/scene-04-main.png` |
| Scene 04 end | PASS | `renders/review/task-011/scene-04-end.png` |
| Scene 04 MP4 | PASS | `renders/review/task-011/scene-04-preview.mp4`, 1.1 MB |
| Scene 01 regression | PASS | `scene-01-regression.png` matches TASK-010 hash exactly |
| Scene 02 regression | PASS | `scene-02-regression.png` matches TASK-010 hash exactly |
| Scene 03 regression | PASS | `scene-03-regression.png` matches TASK-010 Scene 03 end hash exactly |

## 10. Problems / Risks

- Baked text/localization: the approved JPG contains English labels, so DE/FR
  renders are not fully localized.
- Background integration: the source background already fits well; current
  integration is intentionally light. Human review should confirm the focus
  frames do not feel too editorial.
- Scene duration: the 12-second shared window works for visual review, but final
  narration may require small beat timing adjustments.
- Future narration timing: no narration audio exists yet, so motion was tuned by
  visual beats only.

## 11. Recommended Next Step

If Scene 04 is human-approved:
-> proceed to Scene 05 planning.

If Scene 05 needs precision-critical imagery:
-> generate/approve/add those assets before creating its implementation task.

## 12. Git Status

- Branch: `master`
- Changed files:
  - `docs/manual-asset-workflow.md`
  - `src/episodes/001-redis/RedisEpisode.tsx`
  - `src/episodes/001-redis/assets.ts`
  - `src/episodes/001-redis/episode.config.ts`
  - `src/episodes/001-redis/scenes.ts`
  - `src/episodes/001-redis/scenes/Scene03DatabaseMisconception.tsx`
- Untracked files:
  - `feedbacks/task-010-feedback.md`
  - `feedbacks/task-011-feedback.md`
  - `public/episodes/001-redis/assets/scene-04-original-request-path.jpg`
  - `src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx`
  - `tasks/TASK-010.md`
  - `tasks/TASK-011.md`
- Ignored review media:
  - `renders/review/task-011/scene-04-start.png`
  - `renders/review/task-011/scene-04-main.png`
  - `renders/review/task-011/scene-04-end.png`
  - `renders/review/task-011/scene-04-preview.mp4`
  - `renders/review/task-011/scene-01-regression.png`
  - `renders/review/task-011/scene-02-regression.png`
  - `renders/review/task-011/scene-03-regression.png`
  - `renders/review/task-011/scene-04-main-de.png`
  - `renders/review/task-011/scene-04-main-fr.png`
- Commits/pushes: none.

## 13. Final Status

TASK-011 STATUS: PASS
