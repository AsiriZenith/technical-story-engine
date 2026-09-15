# TASK-014 Feedback - Implement Scene 07 Using the Exact Analogy-Mapping and Technical-Architecture Assets

## 1. Summary

Implemented Scene 07, "Restaurant Analogy → Technical Architecture", as a
production scene in the existing Redis episode sequence. The scene uses the
two exact user-supplied PNGs as the dominant visuals, registered through the
episode asset manifest and resolved through the canonical `resolveAsset()`
pipeline from TASK-010.

No Scene 08 work was started. No AI-generated video was used. The supplied
technical architecture diagram was never redrawn as native Remotion nodes. No
new external media was generated.

## 2. Manual Asset Usage

### Asset 1 — Analogy Mapping

- Exact asset path:
  `public/episodes/001-redis/assets/scene-07-analogy-mapping.png`
- Logical asset ID:
  `scene07AnalogyMapping`
- Manifest status:
  `approved`, with `humanApproval: {approvedBy: 'user', approvedAt: '2026-09-14'}`
- Source dimensions:
  `1672x941` (16:9)

### Asset 2 — Technical Architecture

- Exact asset path:
  `public/episodes/001-redis/assets/scene-07-technical-architecture.png`
- Logical asset ID:
  `scene07TechnicalArchitecture`
- Manifest status:
  `approved`, with `humanApproval: {approvedBy: 'user', approvedAt: '2026-09-14'}`
- Source dimensions:
  `1672x941` (16:9)

Both images render directly with Remotion's `<Img>` and `staticFile()` after
resolving the logical IDs with `resolveAsset('scene07AnalogyMapping')` /
`resolveAsset('scene07TechnicalArchitecture')`. Neither image was redrawn,
traced, reinterpreted, recomposed, or replaced. The technical architecture
diagram in particular was rendered exactly as supplied — its six numbered
steps, arrows, and node labels were not rebuilt as native Remotion
shapes/components. The only transformations applied are the allowed ones: a
full-bleed `objectFit: 'cover'` fit (a no-op crop, since the source is
already exactly 16:9), opacity fades, a very slow restrained `scale`
push-in, and non-destructive focus-frame overlays drawn around (never onto)
the supplied labels and nodes.

## 3. Scene Implementation

Scene 07 is added to the production episode after Scene 06 using
`scene07Window`, an 18-second shared window (16s target + 2s localization
margin) derived from the existing scene timing system.

Timing and motion (scene-relative seconds):

- `0.0–0.4s`: hold on background, transitioning in from Scene 06.
- `0.4–6.4s`: analogy-mapping image, fading in and holding with a very slow
  1.0→1.03 scale. Five restrained focus boxes reveal in sequence, following
  the image's own left-to-right / request-to-database reading order, and
  persist once shown (a cumulative walk-through): Request (0.9s), Application
  (1.7s), Redis/Cache (2.5s), Database (3.3s), Cached result (4.1s).
- `~6.45–7.0s`: analogy image fades out (`exitSoft`); a small pulsing dot
  marks the beat cut into the architecture beat (no redrawn arrow/diagram
  element).
- `7.0–16.0s`: technical-architecture image, fading in and holding for 9
  seconds — long enough to read all six numbered steps at normal playback
  speed. Two sequential focus frames emphasize, in order, the Redis node
  (8.5–11.5s) and then the Database node (11.8–15.3s), without covering
  either node's own text.
- `16.4s` onward: the localized takeaway caption ("Redis answers repeated
  requests without repeating database work." / DE / FR) fades in — but only
  after the architecture image has fully faded out, not overlaid on it (see
  Problems/Risks for why).

The scene uses `useCurrentFrame()`, `interpolate()`, and the existing
`motionPresets` (`enterSoft`, `exitSoft`). No `spring()` was used — none was
justified for this restrained, hold-dominant motion. The supplied images
remain the dominant visuals throughout; the only added chrome is the focus
boxes, the beat marker, and the closing caption.

Final takeaway: after both images have been read in full, the caption states
the scene's core message plainly — Redis answers repeated requests without
the database repeating its work — closing the analogy-to-architecture arc
before Scene 08.

## 4. Technical Mapping

The scene explains the mapping exactly as specified, using the supplied
analogy-mapping image's own baked labels (never redrawn) plus sequential
focus-frame emphasis in Remotion:

- Customer → Request / Client
- Cashier → Application
- Ready shelf → Redis / Cache
- Chef → Database
- Burger → Cached result

## 5. Architecture Meaning

The supplied technical-architecture image ("THE REAL SYSTEM") is used
exactly as provided and communicates, via its own six numbered steps:

- Cache check: step 2, "Check cache (e.g. user:42)" — Application asks Redis.
- Cache hit: step 3, "Cache hit? Return cached result (fast)" — Redis returns
  data directly to the Application.
- Cache miss: step 4, "Cache miss? Fetch from database" — Application falls
  through to the Database.
- Database as source of truth: the Database node is explicitly labeled
  "SOURCE OF TRUTH" / "PERSISTENT STORAGE", with a side note "Database holds
  the real data. ALWAYS ACCURATE AND PERSISTENT."; the Redis node is
  explicitly labeled "CACHE" / "FAST ACCESS" with a side note "Redis stores
  frequent data in memory. FAST, BUT NOT THE SOURCE OF TRUTH."
- Response return: step 5 ("Return data, and optionally update cache") and
  step 6 ("Response, cached or fresh data") close the loop back to the
  Client.

Nothing was added or removed from this meaning. The scene's only overlay
(two sequential focus frames on the Redis and Database nodes) reinforces the
existing "fast access, not source of truth" vs. "source of truth" contrast
that the image already states in its own text — it does not introduce a new
claim.

## 6. Asset Status Updates

Per the task's instruction, I reviewed the previously human-approved Scene
05 and Scene 06 assets that were still marked `candidate` in the manifest
from TASK-012/TASK-013 and promoted all four to `approved`:

- `scene05FirstOrder` → `approved` (`approvedBy: 'user', approvedAt: '2026-09-14'`)
- `scene05RepeatOrder` → `approved` (`approvedBy: 'user', approvedAt: '2026-09-14'`)
- `scene06ReadyShelf` → `approved` (`approvedBy: 'user', approvedAt: '2026-09-14'`)
- `scene06ServeFromShelf` → `approved` (`approvedBy: 'user', approvedAt: '2026-09-14'`)

No unrelated assets were touched — every other still-`placeholder` manifest
entry (the never-implemented character/background candidates) was left
exactly as-is. The two new Scene 07 assets were registered directly as
`approved`, per the task's statement that the user has already manually
reviewed and approved these exact files for production.

## 7. Localization

Both PNGs contain baked English text:

- Analogy-mapping: `Request`, `Application`, `Redis / Cache`, `Cached
  result`, `Database`.
- Technical-architecture: `THE REAL SYSTEM`, `GET /users/42`, all six
  numbered step labels, `Client`/`REQUEST`, `Application`/`BUSINESS LOGIC`,
  `Redis`/`CACHE`/`FAST ACCESS`, `Database`/`SOURCE OF TRUTH`/`PERSISTENT
  STORAGE`, both side-note callouts, the `~10 ms` / `~180 ms` comparison, and
  `SAME REQUEST. FASTER RESPONSE.`

Per the task and manual-asset policy, that text was preserved exactly as
supplied and not edited, redrawn, or covered. The same visual timeline
renders for EN/DE/FR, but Scene 07 is not fully localized because the
approved production images contain baked English labels — documented here
as a known limitation, not faked.

As supplemental treatment, the scene adds one small piece of localized text
outside the image content, rendered via `translate()` rather than baked into
any artwork: the closing takeaway ("Redis answers repeated requests without
repeating database work." / "Redis beantwortet wiederholte Anfragen, ohne
die Datenbankarbeit zu wiederholen." / "Redis répond aux requêtes répétées
sans répéter le travail de la base de données."). This caption is timed to
appear only after the technical-architecture image has fully faded out, so
it never sits on top of that image's own dense bottom-band text (see
Problems/Risks).

## 8. Skills Used

- `technical-story-video`: used as the primary repository workflow; kept the
  scene scoped to the active task, preserved the manual-asset policy,
  promoted only the specifically-named prior-approved assets, rendered
  review artifacts, and ended with human review pending.
- `frontend-design`: used to keep both supplied PNGs as the dominant
  full-bleed visuals, to size and place six focus-emphasis boxes so each
  reads as pointing at an existing label rather than a new competing
  graphic, and — after catching a layout problem during review — to move and
  resize the closing caption so it never covers the architecture diagram's
  own stats and copy.
- `animate`: used to choose only necessary explanatory motion — fades, a
  very restrained scale push-in, five sequential label-reveal boxes, two
  sequential node-emphasis boxes, and a small beat marker at the cut — using
  scene-relative Remotion interpolation and existing motion tokens, and to
  justify skipping `spring()`.
- `review-animations`: used before completion to review the motion.
  Findings: one real issue caught and fixed (see below); otherwise none
  blocking. Motion is explanatory and occasional (not high-frequency UI),
  uses opacity/transform on moving elements, avoids springs where
  unnecessary, and stays cohesive with Scenes 01-06's restrained pacing.
  - Issue found: the first draft placed the closing takeaway caption over
    the still-visible technical-architecture image, in the same bottom band
    where the image's own baked `~10 ms` comparison and "SAME REQUEST.
    FASTER RESPONSE." text live — this violated "do not cover important
    content" and the "text becomes hard to read" motion constraint. Fixed by
    delaying the caption until after that image fades out, extending the
    scene's target duration from 15s to 16s to give the caption room, and
    separately tightening its font size and horizontal padding after
    confirming the longer French/German translations wrap safely within the
    frame.

## 9. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-014/scene-07-start.png`

Type:
PNG

Purpose:
Review the opening transition from Scene 06 into Scene 07.

What to review:
- Whether the transition feels consistent with Scenes 01-06.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-014/scene-07-analogy-mapping.png`

Type:
PNG

Purpose:
Review the analogy-mapping beat and its five sequential label-focus boxes.

What to review:
- Whether the exact analogy-mapping image is used.
- Whether the restaurant-to-system mapping is immediately understandable.
- Whether the focus boxes read as restrained emphasis on the existing
  labels, not new competing graphics.

Agent assessment:
PASS

Known issues:
- Baked English labels (Request, Application, Redis / Cache, Cached result,
  Database).

Human review status:
PENDING

### Review Request 3

Artifact:
`renders/review/task-014/scene-07-technical-architecture.png`

Type:
PNG

Purpose:
Review the technical-architecture beat and its Redis-node focus emphasis.

What to review:
- Whether the exact technical-architecture image is used, unsimplified.
- Whether Redis and Database roles remain technically correct (cache/fast
  access vs. source of truth).
- Whether the technical image is readable at normal playback speed.
- Whether the Redis focus frame reads as restrained emphasis.

Agent assessment:
PASS

Known issues:
- Baked English labels throughout the diagram.

Human review status:
PENDING

### Review Request 4

Artifact:
`renders/review/task-014/scene-07-end.png`

Type:
PNG

Purpose:
Review the closing takeaway caption after the technical-architecture image
has faded out.

What to review:
- Whether "Redis answers repeated requests without repeating database work."
  lands clearly as the scene's final message.
- Whether ending on a plain background (rather than over the diagram) feels
  like a deliberate closing beat rather than a gap.
- Whether the scene is ready to proceed to Scene 08.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 5

Artifact:
`renders/review/task-014/scene-07-preview.mp4`

Type:
MP4

Purpose:
Review the full 18-second Scene 07 motion sequence.

What to review:
- Whether motion is restrained and supports comprehension (fades, push-in,
  sequential focus boxes, beat marker) without feeling flashy.
- Whether the transition from the analogy image to the technical-architecture
  image feels natural.
- Whether the scene feels consistent with Scenes 01-06.

Agent assessment:
PASS

Known issues:
- Future narration timing may require small beat adjustments.
- Baked English labels remain in DE/FR renders.

Human review status:
PENDING

### Review Request 6

Artifact:
`renders/review/task-014/scene-07-technical-architecture-de.png`

Type:
PNG

Purpose:
Check the German composition during the technical-architecture beat.

What to review:
- Whether the baked English diagram text remains an acceptable limitation
  for this approved asset.

Agent assessment:
PASS WITH ISSUES

Known issues:
- The entire diagram (all labels, numbered steps, and callouts) is English,
  not German; only the closing caption is localized, and it appears after
  this image has faded out.

Human review status:
PENDING

### Review Request 7

Artifact:
`renders/review/task-014/scene-07-technical-architecture-fr.png`

Type:
PNG

Purpose:
Check the French composition during the technical-architecture beat.

What to review:
- Whether the baked English diagram text remains an acceptable limitation
  for this approved asset.

Agent assessment:
PASS WITH ISSUES

Known issues:
- The entire diagram (all labels, numbered steps, and callouts) is English,
  not French; only the closing caption is localized, and it appears after
  this image has faded out.

Human review status:
PENDING

## 10. External Asset Requests

None.

## 11. Verification Results

| Check | Result | Notes |
| --- | --- | --- |
| TypeScript | PASS | `npm run typecheck` |
| build | PASS | `npm run build` |
| composition discovery | PASS | `npm run compositions`; Redis-EN/DE/FR now 3360 frames, 112.00s |
| scene validation | PASS | Exercised during module load by typecheck/build/composition discovery (`validateEpisodeArchitecture`) |
| asset validation | PASS | Manifest includes `scene07AnalogyMapping` and `scene07TechnicalArchitecture` as `approved`; Scene 05/06 assets promoted to `approved` |
| Redis-EN | PASS | Rendered Scene 07 stills and MP4 from `Redis-EN` |
| Redis-DE | PASS | Rendered `scene-07-technical-architecture-de.png` |
| Redis-FR | PASS | Rendered `scene-07-technical-architecture-fr.png`; also verified the longer closing caption wraps safely within the frame |
| Scene 07 analogy mapping | PASS | `renders/review/task-014/scene-07-analogy-mapping.png` |
| Scene 07 technical architecture | PASS | `renders/review/task-014/scene-07-technical-architecture.png` |
| Scene 07 end | PASS | `renders/review/task-014/scene-07-end.png` |
| Scene 07 MP4 | PASS | `renders/review/task-014/scene-07-preview.mp4`, 7.9 MB |
| Scene 01 regression | PASS | `renders/review/task-014/scene-01-regression.png` |
| Scene 02 regression | PASS | `renders/review/task-014/scene-02-regression.png` |
| Scene 03 regression | PASS | `renders/review/task-014/scene-03-regression.png` |
| Scene 04 regression | PASS | `renders/review/task-014/scene-04-regression.png` |
| Scene 05 regression | PASS | `renders/review/task-014/scene-05-regression.png` |
| Scene 06 regression | PASS | `renders/review/task-014/scene-06-regression.png` |

## 12. Problems / Risks

- Baked text/localization: both approved PNGs contain extensive baked
  English text (the technical-architecture image especially), so DE/FR
  renders show that English content alongside the one localized closing
  caption.
- Technical image readability: the diagram is dense (six numbered steps plus
  two side-note callouts); it is held for 9 seconds at normal playback
  speed, which reads clearly at design time but should be confirmed against
  actual narration pacing once that exists.
- Transition clarity: the analogy → architecture cut uses a
  fade-out/beat-marker/fade-in cut rather than a crossfade, to keep the two
  baked-text images from ever overlapping on screen; human review should
  confirm this feels like a clean beat rather than an abrupt cut.
- Caption placement (resolved during this task, noted for future scenes with
  text-dense supplied images): the closing takeaway could not be overlaid on
  the technical-architecture image without covering its own baked stats, so
  it was moved to appear only after that image fades out. This is a
  precedent worth reusing — Scene 08+ tasks with dense, fully-labeled
  supplied diagrams should plan caption timing around the image's existing
  content rather than assuming a caption can always sit in a bottom scrim
  band.
- Future narration timing: no narration audio exists yet, so motion and
  holds were tuned by visual beats only.

## 13. Recommended Next Step

If Scene 07 is human-approved:
-> plan Scene 08.

If Scene 08 requires precision-critical imagery:
-> generate/approve/add those assets before creating its implementation task.

## 14. Git Status

- Branch: `master`
- Changed files:
  - `src/episodes/001-redis/RedisEpisode.tsx`
  - `src/episodes/001-redis/assets.ts`
  - `src/episodes/001-redis/episode.config.ts`
  - `src/episodes/001-redis/scenes.ts`
  - `src/shared/localization/index.ts`
- Untracked files:
  - `feedbacks/task-012-feedback.md` (from an earlier task; not committed yet)
  - `feedbacks/task-013-feedback.md` (from an earlier task; not committed yet)
  - `feedbacks/task-014-feedback.md`
  - `public/episodes/001-redis/assets/scene-06-ready-shelf.png` (from an
    earlier task; not committed yet)
  - `public/episodes/001-redis/assets/scene-06-serve-from-shelf.png` (from an
    earlier task; not committed yet)
  - `public/episodes/001-redis/assets/scene-07-analogy-mapping.png`
  - `public/episodes/001-redis/assets/scene-07-technical-architecture.png`
  - `src/episodes/001-redis/scenes/Scene05RestaurantRepeatWork.tsx` (from an
    earlier task; not committed yet)
  - `src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx` (from an
    earlier task; not committed yet)
  - `src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx`
  - `tasks/TASK-012.md`
  - `tasks/TASK-013.md`
  - `tasks/TASK-014.md`
- Ignored review media:
  - `renders/review/task-014/scene-07-start.png`
  - `renders/review/task-014/scene-07-analogy-mapping.png`
  - `renders/review/task-014/scene-07-technical-architecture.png`
  - `renders/review/task-014/scene-07-end.png`
  - `renders/review/task-014/scene-07-preview.mp4`
  - `renders/review/task-014/scene-01-regression.png`
  - `renders/review/task-014/scene-02-regression.png`
  - `renders/review/task-014/scene-03-regression.png`
  - `renders/review/task-014/scene-04-regression.png`
  - `renders/review/task-014/scene-05-regression.png`
  - `renders/review/task-014/scene-06-regression.png`
  - `renders/review/task-014/scene-07-technical-architecture-de.png`
  - `renders/review/task-014/scene-07-technical-architecture-fr.png`
- Commits/pushes: none.

## 15. Final Status

TASK-014 STATUS: PASS
