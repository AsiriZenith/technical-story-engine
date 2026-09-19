# TASK-015 — Implement Scene 08: Cache Miss Path

## 1. Summary

Scene 08 (`Scene08CacheMiss.tsx`) is implemented and wired into the
episode timeline immediately after Scene 07. It walks the full cache-miss
path — Application checks Redis, Redis misses, the Database still performs
the expensive work, the result returns, and the Application stores it in
Redis before responding — as seven sequential beats over a single reused
image, using `SpotlightImage` exclusively. No new architecture image was
generated; the exact approved `scene-07-technical-architecture.png` is
reused unmodified as Scene 08's visual foundation. Scene 09's cache-hit
payoff (fast response, Database skipped) is not shown; Scene 08 ends on
"Redis now has the result," per the task's Scene 09 boundary. Scene 09 was
not started.

## 2. Source Asset Usage

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

Logical asset ID: `scene07TechnicalArchitecture` (already present and
`approved` in `assets.ts`, originally added for Scene 07). Scene 08's
`scenes.ts` entry now lists this same ID in its `assetIds`, documenting the
reuse. The file was only read at render time via `staticFile()` — never
opened for editing, never written to. `git status` (Section 15) shows no
changes under `public/episodes/001-redis/assets/`.

## 3. Cache-Miss Flow

Implemented sequence, matching the task's core technical message exactly:

```text
Client -> Application (beat 1, no spotlight, "A request reaches the application.")
Application -> Redis check (beat 2, Application then Redis spotlighted, "Before touching the Database, the application checks Redis.")
Redis miss (beat 3, Redis spotlight held, "But this time, Redis does not have the result.")
Application -> Database (beat 4, Database spotlighted, "So the application still has to ask the Database." then "The expensive work still happens on this request.")
Database -> result (beat 5, Application spotlighted, "The Database returns the result.")
Application -> store in Redis (beat 6, Redis spotlighted, "Before responding, the application stores that result in Redis.")
Response returns (beat 7, no spotlight, "The first request was still expensive. But now Redis has the result ready for next time.")
```

No caption or beat implies Redis makes the Database query itself faster, that
a cache miss is fast, that Redis replaces the Database, or that the Database
stops being the source of truth. The Database is explicitly framed as still
doing the expensive work on this request.

## 4. Motion Design

Consulted `frontend-design` and `animate` conventions (translated to
Remotion's deterministic `interpolate()` model, per `AGENTS.md`) before
implementation, and followed the existing Scene 04 / Scene 07 pattern rather
than inventing a new one:

- Five spotlight appearances, strictly sequential: Application -> Redis ->
  Database -> Application -> Redis. Never two simultaneous.
- `pickSequentialSpotlight` (copied from Scene 04's `Scene04OriginalRequestPath.tsx`,
  same shape) selects the single active target by comparing the current
  second against each segment's handoff second — the "only one target at a
  time" guarantee is structural, not just a matter of the numbers lining up.
- Every handoff is a 0.4s fade-out immediately followed by a 0.4s fade-in at
  the same second, so no gap and no overlap (see Section 7, Timing).
- Client is intentionally not spotlighted. Its role (request origin) was
  already established in Scenes 01/04/07; re-highlighting it here would add
  a sixth spotlight appearance without teaching anything new about the
  cache-miss path specifically. The path/arrow regions the task listed as
  optional (Application->Redis area, Application->Database miss area,
  response/client area) were also intentionally not activated — the task's
  own spotlight rule prefers "a sequence of node spotlights" over invented
  arrow/path geometry, and a plain node-to-node sequence already reads
  clearly at normal playback speed without adding new drawn shapes.
- No comedic beat was added at the cache-miss moment (beat 3): the caption
  is a single plain sentence, no joke, per the task's explicit restraint
  instruction there.
- A single, very slow push-in (`computePushInScale`, `1 -> 1.03` over the
  whole scene) is applied to the one `SpotlightImage` wrapper so all spotlight
  layers and the base image share the same transform and can never drift
  apart — same technique as Scenes 04/07.

## 5. Spotlight Regions

Normalized `0-1` regions, all against the technical-architecture PNG's own
box (`SpotlightImage`'s `objectFit: 'cover'`, default, matches Scene 07's use
of this same asset):

```text
Application (measured fresh for this task; see method below)
  x: 0.357656 (598/1672)
  y: 0.328373 (309/941)
  width: 0.171650 (287/1672)
  height: 0.222104 (209/941)

Redis (reused exactly from Scene 07 / TASK-014C-approved)
  x: 0.6380208333 (1225/1920)
  y: 0.1203703704 (130/1080)
  width: 0.1901041667 (365/1920)
  height: 0.2083333333 (225/1080)

Database (reused exactly from Scene 07 / TASK-014C-approved)
  x: 0.6380208333 (1225/1920)
  y: 0.5879629630 (635/1080)
  width: 0.1901041667 (365/1920)
  height: 0.2129629630 (230/1080)
```

Redis and Database reuse Scene 07's already-approved fractions unchanged
(same card, same image, no reason to re-derive). Application had no prior
approved region (Scene 07 never highlighted it), so it was measured directly
against the source PNG's own pixels (1672x941): a horizontal scanline
through the card's vertical center (y=412) located the left/right border
color transitions at x=620/863; a vertical scanline through the card's
horizontal center (x=740) located the top/bottom border transitions at
y=325/505. A small pad (20px horizontal, 15px vertical) was added on top of
that tight border box, matching the proportion by which Redis/Database's own
approved regions already extend past their tight card borders. Client was
also measured this way (color-matched border scan of its blue outline:
x:105-332, y:327-497) but is not used as a spotlight target in this scene
(Section 4).

## 6. Spotlight Settings

```text
dimBrightness: 0.58
featherPaddingFactor: 0.9
```

`dimBrightness` is unchanged from the TASK-014C/D-approved value. This
matters because dim level is scene-independent (not tied to region size),
and there was no motivating reason to retune it here.

`featherPaddingFactor` was retuned from Scene 07's 1.35 to 0.9, applied
uniformly to all three Scene 08 targets. Reason: Application and Redis sit
only ~0.109 apart on the same horizontal band (Application's right edge at
x~0.529, Redis's left edge at x~0.638). Per this project's known
`SpotlightImage` mask-sizing technical debt (Section 8) — the value fed to
CSS `radial-gradient(ellipse Wpct Hpct at ...)` behaves as a radius, not the
documented "how much larger than the region" multiplier — Scene 07's 1.35
would have put Application's actual falloff radius at
`0.1717 * 1.35 = 0.232`, reaching past Redis's left edge and visibly
lighting the Redis card while Application was still meant to be the sole
target. At 0.9, Application's falloff radius is `0.1717 * 0.9 = 0.155`,
leaving roughly a 0.05 (5% of image width) margin before Redis's edge. This
was verified visually: `scene-08-check-redis.png` shows Redis's card reading
clearly dim while Application is lit, with no visible glow crossing into it.
No other target-spacing pair in this scene was tighter than
Application-Redis, so 0.9 was applied to all three rather than varying it
per target.

## 7. Timing

All times are scene-local seconds (`useCurrentFrame()` / `fps`, fps=30):

```text
Beat 1 (request arrives, no spotlight):        0.4s -> 2.0s   (caption fade 0.4-0.9, hold to 2.0, fade out to 2.4)
Beat 2a (Application spotlight, "check"):      2.3s -> 3.1s   (fade in 2.3-2.7, hold 2.7-3.1, fade out 3.1-3.5)
Beat 2b/3 (Redis spotlight, "check" + "miss"): 3.5s -> 6.6s   (fade in 3.5-3.9, hold 3.9-6.6, fade out 6.6-7.0)
Beat 4 (Database spotlight):                   7.0s -> 10.4s  (fade in 7.0-7.4, hold 7.4-10.4, fade out 10.4-10.8)
Beat 5 (Application spotlight, "result"):      10.8s -> 12.0s (fade in 10.8-11.2, hold 11.2-12.0, fade out 12.0-12.4)
Beat 6 (Redis spotlight, "store"):             12.4s -> 14.0s (fade in 12.4-12.8, hold 12.8-14.0, fade out 14.0-14.4)
Beat 7 (closing caption, no spotlight):        14.6s -> 15.6s (fade in 14.6-15.1, hold 15.1-15.6, fade out 15.6-16.0)
```

Every spotlight handoff second is exactly `previous fade-out end = next
fade-in start` (e.g. Application's fade-out ends at 3.5s, Redis's fade-in
starts at 3.5s), the same non-overlap discipline TASK-011B/014D established
for Scenes 04/07. `scene-08-handoff-check.png` (rendered at exactly 3.5s,
the Application->Redis handoff) confirms the frame reads as fully undimmed
at that instant — neither spotlight active, matching the TASK-014D handoff-
proof pattern.

The scene's total duration (480 frames / 16s = the existing
`sharedWindow(14, 2)` strategy already defined in `scenes.ts` before this
task) was preserved unchanged; only beat timing inside that window was
authored. No other scene's duration was touched.

## 8. Spotlight Technical Debt

The known `featherPaddingFactor`-vs-radius/diameter inconsistency (documented
in this project and referenced by TASK-015) directly affected this scene:
without a local retune, the Application spotlight's actual falloff radius at
Scene 07's 1.35 value would have visibly bled into the neighboring Redis
card (Section 6 has the exact math). Local tuning was required and applied
(`featherPaddingFactor: 0.9`, Scene-08-scoped only). `SpotlightImage.tsx`
itself was not modified, and Scene 07's own approved values
(`featherPaddingFactor: 1.35`) were left untouched — confirmed by
`scene-07-regression.png` matching the expected TASK-014D appearance.

## 9. Localization

The technical-architecture PNG has baked English text (all six step labels,
node names, callout boxes, and the "~10 ms / ~180 ms" latency comparison) —
this is an existing, documented limitation carried over unchanged from Scene
07, not something introduced or worsened here. All seven beat captions are
new Remotion-rendered text, added to `src/shared/localization/index.ts` for
`en`, `de`, `fr` (`cacheMissRequestArrives`, `cacheMissCheckRedis`,
`cacheMissNotFound`, `cacheMissAskDatabase`, `cacheMissExpensiveWork`,
`cacheMissResultReturns`, `cacheMissStoreInRedis`, `cacheMissClosing`),
rendered through the existing `translate()` system and the same
`BottomCaption` treatment Scene 07 uses. `scene-08-de-check.png` and
`scene-08-fr-check.png` confirm German and French captions (including the
two-line French closing line, the longest string) stay within the caption's
horizontal safe padding and do not overflow or clip.

**Known limitation, carried over from Scene 07, not scene-08-specific:** the
image's own baked "With Redis (cache hit) ~10 ms / vs. ~180 ms without
cache" callout stays visible (dimmed, not hidden) in the bottom-left
throughout Scene 08, since this scene never fades the image out. Because
Scene 08 is about a cache *miss*, that baked "cache hit" framing sitting
behind the caption is a thematic mismatch inherent to reusing this exact
asset — flagged as a known issue in Section 13, not a code defect (the task
explicitly forbids editing the PNG).

## 10. Review Artifacts

```text
renders/review/task-015/scene-08-start.png
renders/review/task-015/scene-08-check-redis.png
renders/review/task-015/scene-08-cache-miss.png
renders/review/task-015/scene-08-database-work.png
renders/review/task-015/scene-08-store-in-redis.png
renders/review/task-015/scene-08-end.png
renders/review/task-015/scene-08-preview.mp4
renders/review/task-015/scene-08-handoff-check.png
renders/review/task-015/scene-07-regression.png
renders/review/task-015/scene-04-regression.png
```

Two extra, non-required stills rendered for this report's own localization
verification (Section 9), not part of the required list:
`renders/review/task-015/scene-08-de-check.png`,
`renders/review/task-015/scene-08-fr-check.png`.

All frames render against `Redis-EN` (or `Redis-DE`/`Redis-FR` for the two
extra localization checks). Scene 08 occupies global frames 3360-3839 (480
frames / 16s), confirmed via `remotion compositions` reporting an episode
total of 3840 frames (3360 previous + 480 new).

## 11. Human Review Requests

### Review Request 1

Artifact:
renders/review/task-015/scene-08-start.png

Purpose:
Confirm the scene opens on the clean, undimmed architecture diagram before
any spotlight, matching the "allow the full diagram to register" beat-1
instruction.

What to review:
- Full uniform brightness, no premature spotlight, no seam.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 2

Artifact:
renders/review/task-015/scene-08-check-redis.png

Purpose:
Confirm the Application spotlight (beat 2) is tight, does not bleed into
Redis, and the "checks Redis" caption reads clearly.

What to review:
- Whether the Application highlight is tight enough and whether any glow is
  visible on the neighboring Redis card.
- Whether the caption is legible against the image's own baked bottom-left
  latency numbers (see Section 9's known limitation).

Agent assessment:
PASS WITH ISSUES

Known issues:
- The caption sits close to and partially over the image's baked "~10 ms /
  vs. ~180 ms" text; the gradient scrim keeps the caption itself readable,
  but the baked numbers remain partly visible through/around it. Flagged for
  human judgment (Section 9, Section 13).

Human review status:
PENDING

### Review Request 3

Artifact:
renders/review/task-015/scene-08-cache-miss.png

Purpose:
Confirm the cache-miss beat (Redis held as the sole spotlight target) reads
as a clear, restrained "not found" moment with no comedic beat.

What to review:
- Whether Redis reads as clearly the active target (pixel-verified: Redis
  label at (220,233,240) vs. Application at (10,17,30) and Database at
  (2,14,23) in this frame).
- Whether the caption tone stays plain/serious as required.

Agent assessment:
PASS

Known issues:
- Same baked bottom-left text proximity as Review Request 2.

Human review status:
PENDING

### Review Request 4

Artifact:
renders/review/task-015/scene-08-database-work.png

Purpose:
Confirm the Database beat — the most important conceptual beat — clearly
shows the Database as the sole active target and the "still has to ask the
Database" caption is unambiguous.

What to review:
- Database card readability, dim level of everything else, whether the
  "expensive work still happens" idea reads clearly across this beat's two
  sequential captions (only one is shown per rendered still; the full
  sequence is visible in the MP4).

Agent assessment:
PASS

Known issues:
- None observed beyond the baked bottom-left text proximity noted above.

Human review status:
PENDING

### Review Request 5

Artifact:
renders/review/task-015/scene-08-store-in-redis.png

Purpose:
Confirm the "store in Redis" beat clearly sets up Scene 09 without showing
Scene 09's own cache-hit payoff.

What to review:
- Whether "the application stores that result in Redis" reads as
  forward-looking setup rather than already delivering the fast-response
  payoff.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 6

Artifact:
renders/review/task-015/scene-08-end.png

Purpose:
Confirm the closing caption ("The first request was still expensive. But
now Redis has the result ready for next time.") reads as the intended
Scene 09 setup line and does not oversell speed.

What to review:
- Caption wording and whether it stops short of Scene 09's payoff, per the
  task's explicit Scene 09 boundary.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 7

Artifact:
renders/review/task-015/scene-08-handoff-check.png

Purpose:
Prove the Application->Redis handoff (beat 2->3, at exactly 3.5s) has no
moment where both spotlights, or neither incorrectly, are visible.

What to review:
- Confirm the frame at the handoff second shows the full image at uniform,
  undimmed brightness with neither spotlight active.

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 8

Artifact:
renders/review/task-015/scene-08-preview.mp4

Purpose:
Confirm the full Scene 08 sequence (all seven beats, five spotlight
appearances, four handoffs) plays back cleanly end to end at normal speed,
with no drift, no simultaneous spotlights, and a pace that lets each beat
register before the next starts.

What to review:
- Full playback pacing, especially whether the Database beat (the most
  important conceptual beat) is held long enough.
- Whether Scene 08 is ready to proceed to Scene 09.

Agent assessment:
PASS

Known issues:
- None observed in playback (full 480-frame / 16s render).

Human review status:
PENDING

### Review Request 9

Artifact:
renders/review/task-015/scene-07-regression.png

Purpose:
Confirm Scene 07 is visually unaffected by this task (Scene 08 reuses its
asset and region values but Scene 07's own file/timing was not touched).

What to review:
- Matches the TASK-014D-approved appearance (Redis spotlighted mid-beat, as
  expected at this frame's timestamp).

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

### Review Request 10

Artifact:
renders/review/task-015/scene-04-regression.png

Purpose:
Confirm Scene 04 is unaffected (no shared code changed beyond adding new,
additive `Scene08...`/localization/timeline entries).

What to review:
- Matches the prior approved appearance ("Expensive work" spotlighted).

Agent assessment:
PASS

Known issues:
- None observed.

Human review status:
PENDING

## 12. Verification Results

```text
TypeScript:                  PASS
build:                       PASS
composition discovery:       PASS (3840 total frames = 3360 prior + 480 new Scene 08 window; Redis-EN/DE/FR all report 3840)
scene validation:            PASS (validateEpisodeArchitecture runs at module load; still exactly 14 scenes, sequential order, unique IDs)
asset validation:            PASS (scene07TechnicalArchitecture resolves; scene 08's new assetIds entry validates against the manifest)
Redis-EN:                    PASS (still renders at start/check-redis/cache-miss/database-work/store-in-redis/end/handoff-check frames, and full preview MP4)
Redis-DE:                    PASS (scene-08-de-check.png renders correctly, no overflow)
Redis-FR:                    PASS (scene-08-fr-check.png renders correctly, two-line wrap, no overflow)
Scene 08 start:               PASS
Redis check:                  PASS
cache miss:                   PASS
Database work:                PASS
store in Redis:               PASS
end:                          PASS
handoff safety:                PASS (no simultaneous spotlights at the 3.5s Application->Redis handoff)
Scene 08 MP4:                  PASS (480 frames / 16s, global frames 3360-3839)
Scene 07 regression:           PASS
Scene 04 regression:           PASS
no seam:                       PASS (checked at scene-08-start.png, opacity 0 state)
no drift:                      PASS (single shared transformed SpotlightImage wrapper; one scale value feeds the whole scene)
no hard edge:                  PASS (radial-gradient mask on all three targets, no clip-path)
no simultaneous spotlights:    PASS (pickSequentialSpotlight enforces single-active-target; confirmed both visually and via pixel sampling at the handoff frame)
```

## 13. Problems / Risks

- The source image's baked "With Redis (cache hit) ~10 ms / vs. ~180 ms
  without cache" callout remains visible (dimmed but not hidden) throughout
  Scene 08, which is thematically a cache-*miss* scene. This is an inherent
  consequence of reusing the exact approved asset unmodified (as required)
  rather than a defect in this task's code. Flagged for human judgment: it
  may read as acceptable context-carryover, or it may warrant a future task
  to crop/mask that specific baked callout region more aggressively for
  miss-path scenes, without touching the source PNG itself.
- The bottom caption sits close to, and in a few beats partially over, that
  same baked bottom-left text. The gradient scrim keeps the caption itself
  legible in every rendered still, but it is a real proximity, not an
  illusion — worth a human look at normal viewing distance/size.
- `featherPaddingFactor: 0.9` is a Scene-08-local tuning, not a component
  fix. If a future task changes Application's or Redis's region size or
  position, this value should be re-verified against the same bleed math in
  Section 6, not assumed to still be safe.

## 14. Recommended Next Step

```text
If Scene 08 is human-approved:
→ plan Scene 09: cache hit / Database skipped / fast response.

If Scene 08 is not approved:
→ revise only the rejected Scene 08 spotlight, timing, or explanatory beat.
```

## 15. Git Status

Branch: `master`

Changed files (tracked, modified by this task):
```text
M src/episodes/001-redis/RedisEpisode.tsx      (+9, Scene 08 Sequence + import)
M src/episodes/001-redis/episode.config.ts     (+4/-1, scene08Window + duration sum)
M src/episodes/001-redis/scenes.ts             (+7/-2, scene 08 assetIds + visualNotes)
M src/shared/localization/index.ts             (+28, cacheMiss* keys for en/de/fr)
```

New untracked files from this task:
```text
?? src/episodes/001-redis/scenes/Scene08CacheMiss.tsx
?? feedbacks/task-015-feedback.md
```

Other untracked files, pre-existing before this task, unrelated:
```text
?? tasks/TASK-015.md   (the task file itself, added before this session started)
```

Ignored review media (confirmed via `git check-ignore -v`, matched by
`.gitignore:7: renders/*`):
```text
renders/review/task-015/scene-08-start.png
renders/review/task-015/scene-08-check-redis.png
renders/review/task-015/scene-08-cache-miss.png
renders/review/task-015/scene-08-database-work.png
renders/review/task-015/scene-08-store-in-redis.png
renders/review/task-015/scene-08-end.png
renders/review/task-015/scene-08-preview.mp4
renders/review/task-015/scene-08-handoff-check.png
renders/review/task-015/scene-07-regression.png
renders/review/task-015/scene-04-regression.png
renders/review/task-015/scene-08-de-check.png
renders/review/task-015/scene-08-fr-check.png
```

Commits/pushes: None. No commits were made and nothing was pushed; all
changes remain in the working tree per the task's "stop after feedback"
instruction.

## 16. Final Status

TASK-015 STATUS: PASS
