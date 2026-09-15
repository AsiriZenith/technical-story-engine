# TASK-012 Feedback - Implement Scene 05 Using the Exact Restaurant Analogy Images

## 1. Summary

Implemented Scene 05, "Restaurant: Repeated Work", as a production scene in the
existing Redis episode sequence. The scene uses the two exact user-supplied
restaurant PNGs as the dominant visuals, registered through the episode asset
manifest and resolved through the canonical `resolveAsset()` pipeline from
TASK-010.

No Scene 06 work was started. No cache/ready-shelf element was introduced. No
AI-generated video was used. No new external media was generated.

## 2. Manual Asset Usage

### Asset 1 — First Order

- Exact asset path:
  `public/episodes/001-redis/assets/scene-05-first-order.png`
- Logical asset ID:
  `scene05FirstOrder`
- Manifest status:
  `candidate` (not yet human-approved — human review is PENDING)
- Source dimensions:
  `1672x941` (16:9)

### Asset 2 — Same Order Again

- Exact asset path:
  `public/episodes/001-redis/assets/scene-05-repeat-order.png`
- Logical asset ID:
  `scene05RepeatOrder`
- Manifest status:
  `candidate` (not yet human-approved — human review is PENDING)
- Source dimensions:
  `1672x941` (16:9)

Both scenes render the PNGs directly with Remotion's `<Img>` and
`staticFile()` after resolving the logical IDs with
`resolveAsset('scene05FirstOrder')` / `resolveAsset('scene05RepeatOrder')`.
Neither image was redrawn, traced, reinterpreted, recomposed, or replaced.
The only transformations applied are the allowed ones: a full-bleed
`objectFit: 'cover'` fit (a no-op crop, since the source is already exactly
16:9), opacity fades, and a slow, restrained `scale`/`translateX` push-in
toward the chef.

## 3. Scene Implementation

Scene 05 is added to the production episode after Scene 04 using
`scene05Window`, a 15-second shared window (13s target + 2s localization
margin) derived from the existing scene timing system.

Timing and motion (scene-relative seconds):

- `0.0–0.4s`: hold on background, transitioning in from Scene 04.
- `0.4–6.0s`: first-order image ("1 First order" / customer → cashier → chef →
  burger / "~10 min"), fading in over `enterSoft` and holding with a subtle
  1.0→1.045 scale and small pan toward the chef.
- `~6.05–6.6s`: first image fades out (`exitSoft`); a small pulsing dot marks
  the beat cut between the two orders (no redrawn arrow/diagram element).
- `6.6–14.5s`: repeat-order image ("2 Same order again" / same cashier, same
  chef, "~10 min again"), fading in and holding with the same restrained
  push-in.
- `11.6s` onward: the localized takeaway caption ("Same work. Again." / DE /
  FR) fades in over the still-visible repeat-order image, with a soft bottom
  scrim for legibility, and holds through the cut into Scene 06.

The scene uses `useCurrentFrame()`, `interpolate()`, and the existing
`motionPresets` (`enterSoft`, `exitSoft`). No `spring()` was used — none was
justified for this restrained, hold-dominant motion. The images remain the
dominant visuals throughout; the only added chrome is the takeaway caption and
its scrim.

Final takeaway: the caption "Same work. Again." (localized) lands while the
second image is still on screen, making clear that the chef performed the
same expensive work again, not that the chef became slower.

## 4. Technical Analogy

The scene maps cleanly onto the technical request path, matching TASK-012's
required mapping without introducing any cache/Redis element yet:

- Customer → Request
- Cashier → Application
- Chef → Database
- Burger preparation → Expensive database work

Both beats show the identical pipeline (customer → cashier → chef → burger,
~10 min) with a different customer the second time, making the "same
expensive work happens again" idea visually explicit. The chef is shown
performing the same competent, unhurried work in both beats — nothing implies
the chef is slow or the restaurant is broken.

## 5. Localization

Both PNGs contain baked English text:

- `1 First order` / `2 Same order again`
- `~10 min` / `~10 min again`

Per the task and manual-asset policy, that text was preserved exactly as
supplied and not edited, redrawn, or covered. The same visual timeline renders
for EN/DE/FR, but Scene 05 is not fully localized because the approved
production images contain baked English labels — this is documented here as a
known limitation, not faked.

As supplemental treatment, the scene adds one small piece of localized text
outside the image content: the final takeaway caption ("Same work. Again." /
"Dieselbe Arbeit. Noch einmal." / "Le même travail. Encore."), rendered in
Remotion via `translate()` rather than baked into any artwork, positioned in a
bottom scrim band that does not cover the baked labels or characters.

## 6. Skills Used

- `technical-story-video`: used as the primary repository workflow; kept the
  scene scoped to the active task, preserved the manual-asset policy, kept the
  cache/ready-shelf idea out of this scene, rendered review artifacts, and
  ended with human review pending.
- `frontend-design`: used to keep both supplied PNGs as the dominant
  full-bleed visuals and to make the one added text element (the takeaway
  caption) legible via a minimal bottom scrim rather than extra chrome or
  competing graphics.
- `animate`: used to choose only necessary explanatory motion — fades, a
  restrained scale/pan push-in toward the chef, and a small beat marker at the
  cut — using scene-relative Remotion interpolation and existing motion
  tokens, and to justify skipping `spring()`.
- `review-animations`: used before completion to review the motion (see
  Problems/Risks and Human Review Requests for details). Findings: none
  blocking. Motion is explanatory and occasional (not high-frequency UI), uses
  opacity/transform on moving elements, avoids springs where unnecessary, and
  stays cohesive with Scenes 01-04's restrained pacing. One early version left
  the takeaway caption stranded on a plain background after the image faded
  out early; this was caught during review and fixed by extending the
  repeat-order image's hold so the caption always overlays the visible image.

## 7. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-012/scene-05-start.png`

Type:
PNG

Purpose:
Review the opening transition from Scene 04 into Scene 05.

What to review:
- Whether the transition feels consistent with Scenes 01-04.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-012/scene-05-first-order.png`

Type:
PNG

Purpose:
Review the first-order beat (customer → cashier → chef → burger, ~10 min).

What to review:
- Whether the exact first-order image is used.
- Whether it clearly reads as full work taking ~10 min.
- Whether the chef reads as competent (not slow).

Agent assessment:
PASS

Known issues:
- Baked English labels ("1 First order", "~10 min").

Human review status:
PENDING

### Review Request 3

Artifact:
`renders/review/task-012/scene-05-repeat-order.png`

Type:
PNG

Purpose:
Review the repeat-order beat (different customer, same work again, ~10 min
again).

What to review:
- Whether the exact repeat-order image is used.
- Whether the second customer makes the repetition clearer.
- Whether it is obvious the chef performs the expensive work again.
- Whether the chef still feels competent.

Agent assessment:
PASS

Known issues:
- Baked English labels ("2 Same order again", "~10 min again").

Human review status:
PENDING

### Review Request 4

Artifact:
`renders/review/task-012/scene-05-end.png`

Type:
PNG

Purpose:
Review the final takeaway caption overlaid on the still-visible repeat-order
image.

What to review:
- Whether `~10 min` and `~10 min again` are readable.
- Whether "Same work. Again." lands clearly without over-joking.
- Whether the two-image transition feels natural overall.
- Whether the scene is ready to proceed to Scene 06.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 5

Artifact:
`renders/review/task-012/scene-05-preview.mp4`

Type:
MP4

Purpose:
Review the full 15-second Scene 05 motion sequence.

What to review:
- Whether motion is restrained and supports comprehension (fades, push-in,
  beat marker) without feeling like a slideshow with effects.
- Whether the scene feels consistent with Scenes 01-04.
- Whether the cache/ready-shelf solution is absent, as required.

Agent assessment:
PASS

Known issues:
- Future narration timing may require small beat adjustments.
- Baked English labels remain in DE/FR renders.

Human review status:
PENDING

### Review Request 6

Artifact:
`renders/review/task-012/scene-05-repeat-order-de.png`

Type:
PNG

Purpose:
Check the German composition, including the localized takeaway caption.

What to review:
- Whether "Dieselbe Arbeit. Noch einmal." is readable and well-placed.
- Whether the baked English image labels remain an acceptable limitation for
  this approved-pending asset.

Agent assessment:
PASS WITH ISSUES

Known issues:
- The image labels are English, not German; only the takeaway caption is
  localized.

Human review status:
PENDING

### Review Request 7

Artifact:
`renders/review/task-012/scene-05-repeat-order-fr.png`

Type:
PNG

Purpose:
Check the French composition, including the localized takeaway caption.

What to review:
- Whether "Le même travail. Encore." is readable and well-placed.
- Whether the baked English image labels remain an acceptable limitation for
  this approved-pending asset.

Agent assessment:
PASS WITH ISSUES

Known issues:
- The image labels are English, not French; only the takeaway caption is
  localized.

Human review status:
PENDING

## 8. External Asset Requests

None.

## 9. Verification Results

| Check | Result | Notes |
| --- | --- | --- |
| TypeScript | PASS | `npm run typecheck` |
| build | PASS | `npm run build` |
| composition discovery | PASS | `npm run compositions`; Redis-EN/DE/FR now 2400 frames, 80.00s |
| scene validation | PASS | Exercised during module load by typecheck/build/composition discovery (`validateEpisodeArchitecture`) |
| asset validation | PASS | Manifest includes `scene05FirstOrder` and `scene05RepeatOrder` as `candidate` assets |
| Redis-EN | PASS | Rendered Scene 05 stills and MP4 from `Redis-EN` |
| Redis-DE | PASS | Rendered `scene-05-repeat-order-de.png` |
| Redis-FR | PASS | Rendered `scene-05-repeat-order-fr.png` |
| Scene 05 first order | PASS | `renders/review/task-012/scene-05-first-order.png` |
| Scene 05 repeated order | PASS | `renders/review/task-012/scene-05-repeat-order.png` |
| Scene 05 end | PASS | `renders/review/task-012/scene-05-end.png` |
| Scene 05 MP4 | PASS | `renders/review/task-012/scene-05-preview.mp4`, 7.7 MB |
| Scene 01 regression | PASS | `renders/review/task-012/scene-01-regression.png` |
| Scene 02 regression | PASS | `renders/review/task-012/scene-02-regression.png` |
| Scene 03 regression | PASS | `renders/review/task-012/scene-03-regression.png` |
| Scene 04 regression | PASS | `renders/review/task-012/scene-04-regression.png` |

## 10. Problems / Risks

- Baked text/localization: both approved-pending PNGs contain English labels,
  so DE/FR renders show an English "1 First order" / "~10 min" / "2 Same order
  again" / "~10 min again" alongside the localized takeaway caption.
- Scene duration: the 15-second shared window (13s target + 2s margin) reads
  clearly for visual review, but final narration may require small beat
  timing adjustments.
- Transition clarity: the first→second order cut uses a fade-out/beat-marker/
  fade-in cut rather than a crossfade, to keep the two baked-text images from
  ever overlapping on screen; human review should confirm this feels like a
  clean beat rather than an abrupt cut.
- Future narration timing: no narration audio exists yet, so motion and holds
  were tuned by visual beats only.

## 11. Recommended Next Step

If Scene 05 is human-approved:
-> plan Scene 06, where the ready shelf/cache solution is introduced.

If Scene 06 requires precision-critical imagery:
-> generate/approve/add those assets before creating its implementation task.

## 12. Git Status

- Branch: `master`
- Changed files:
  - `src/episodes/001-redis/RedisEpisode.tsx`
  - `src/episodes/001-redis/assets.ts`
  - `src/episodes/001-redis/episode.config.ts`
  - `src/episodes/001-redis/scenes.ts`
  - `src/shared/localization/index.ts`
- Untracked files:
  - `feedbacks/task-012-feedback.md`
  - `src/episodes/001-redis/scenes/Scene05RestaurantRepeatWork.tsx`
  - `tasks/TASK-012.md`
- Ignored review media:
  - `renders/review/task-012/scene-05-start.png`
  - `renders/review/task-012/scene-05-first-order.png`
  - `renders/review/task-012/scene-05-repeat-order.png`
  - `renders/review/task-012/scene-05-end.png`
  - `renders/review/task-012/scene-05-preview.mp4`
  - `renders/review/task-012/scene-01-regression.png`
  - `renders/review/task-012/scene-02-regression.png`
  - `renders/review/task-012/scene-03-regression.png`
  - `renders/review/task-012/scene-04-regression.png`
  - `renders/review/task-012/scene-05-repeat-order-de.png`
  - `renders/review/task-012/scene-05-repeat-order-fr.png`
- Commits/pushes: none.

## 13. Final Status

TASK-012 STATUS: PASS
