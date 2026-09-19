# TASK-016 Feedback — Scene 09: Cache Hit / Database Skipped / Fast Response

## 1. Summary

Implemented Scene 09 (`Scene09CacheHit.tsx`), the cache-hit payoff scene that follows Scene 08's cache-miss path. The same request arrives again; the application checks Redis first; this time Redis already has the result; the Database is skipped entirely (shown by contrast, not by highlighting the Database); the cached result returns to the application; the response reaches the client noticeably faster (~8 ms, the episode's established example); and the scene closes on the intended mental model: "The Database did not get faster. We simply did not need it this time." The scene reuses the exact approved Scene 07 technical-architecture PNG, uses `SpotlightImage` exclusively, and never spotlights more than one node at a time. Scene 10 was not started.

## 2. Source Asset Usage

- Exact architecture asset path: `public/episodes/001-redis/assets/scene-07-technical-architecture.png`
- Logical asset ID: `scene07TechnicalArchitecture`, resolved via `resolveAsset('scene07TechnicalArchitecture')` in `asset-resolver.ts` — the same resolver call Scene 08 uses.
- Source image confirmed unchanged: not opened for editing at any point in this task; the file is only read via `staticFile()` at render time. `scenes.ts` now lists `scene07TechnicalArchitecture` in Scene 09's `assetIds`, which is validated against the existing asset manifest by `validateEpisodeArchitecture` (no new asset entry created).

## 3. Cache-Hit Flow

```text
Client
→ Application
→ Redis check
→ hit
→ cached result
→ Application
→ Client
```

The Database is skipped by never becoming a spotlight target during this scene. After the Application-check beat, the spotlight moves to Redis and **stays on Redis** through both the "cache hit" and "Database is skipped" captions — the same node stays visually active while the caption states the Database was not touched. The Database card is only ever seen in its default dimmed-relative-to-spotlight state (see `scene-09-database-skipped.png`), which is the "Preferred treatment" the task specified: Redis bright, Database dim, no red X or new drawn symbol. The spotlight then returns to Application (result returns) and finally moves to Client (response arrives, faster).

## 4. Motion Design

Spotlight sequence: **Application → Redis (held through 2 beats) → Application → Client**, strictly sequential via the same `pickSequentialSpotlight` helper Scene 04/08 use (structurally guarantees only one target is ever nonzero, not just numerically arranged that way).

- Application (beat 2): establishes where the repeated request is checked, mirroring Scene 08's opening beat so viewers recognize the repeated flow.
- Redis (beats 3–4): held across two captions instead of handed off to a second target, per the task's explicit "keep Redis as the active spotlight; leave Database visibly dimmed" instruction. Database was **not** spotlighted — see the reasoning above and Section 8.
- Application again (beat 5): shows the result physically returning from Redis before responding, mirroring Scene 08's own "result returns to Application" beat shape.
- Client (beat 6): newly activated in this scene (Scene 08 measured this region but left it unused) because this is the first Scene in the pair where the *response side* is the payoff — "the response returns much faster" needed a visual target, and Client is the only node that represents that side of the flow without inventing new geometry.
- No path/arrow highlighting, no new diagram shapes, no comedic beat (per the task's explicit "No joke should interrupt this explanation").

## 5. Spotlight Regions

Normalized `0–1` regions, all against the technical-architecture PNG's own box (`SpotlightImage`'s `objectFit: 'cover'` default):

```text
Application (reused byte-for-byte from Scene 08 / TASK-015-approved)
  x: 0.357656 (598/1672)
  y: 0.328373 (309/941)
  width: 0.171650 (287/1672)
  height: 0.222104 (209/941)

Redis (reused byte-for-byte from Scene 08 / Scene 07 / TASK-014C-approved)
  x: 0.638021 (1225/1920)
  y: 0.120370 (130/1080)
  width: 0.190104 (365/1920)
  height: 0.208333 (225/1080)

Client (newly activated this task)
  x: 0.050837 (85/1672)
  y: 0.331562 (312/941)
  width: 0.159689 (267/1672)
  height: 0.212540 (200/941)
```

Application and Redis are unchanged copies of Scene 08's already-approved constants (no re-derivation). Client was not previously used as a spotlight target: Scene 08 measured its raw border scan (x:105–332, y:327–497 against the same 1672×941 pixel grid) but left it inactive. This task pads that raw scan by the identical 20px-horizontal/15px-vertical margin Scene 08 applied to Application's own raw scan (620–863/325–505 → 598/287, 309/209), producing 85–352 (width 267) / 312–512 (height 200) — the same measurement method applied to a third node for consistency. Database's region constant was intentionally not carried over since it is never used as a spotlight target in this scene (Section 4).

## 6. Spotlight Settings

```text
dimBrightness: 0.58
featherPaddingFactor: 0.9
```

Both are carried over unchanged from Scene 08's approved local tuning. Application and Redis sit on the same horizontal band with the same ~0.109 gap that motivated Scene 08's 0.9 retune (vs. `SpotlightImage`'s shared default of 1.35), and that same tuning applies here since both regions are reused unchanged. Client sits far enough from both Application and Redis that the tighter 0.9 feather does not under-cover it — confirmed visually in `scene-09-fast-response.png`. This is a local Scene 09 tuning only; `SpotlightImage`'s shared default and Scene 07/08's approved values are untouched, and the scene's known-technical-debt comment (radial-gradient radius/diameter mismatch) is carried forward from Scene 08 rather than fixed, per the task's explicit instruction not to touch the global component contract.

## 7. Timing

Scene-relative seconds (scene duration: 12s target + 2s localization margin = 14.0s = 420 frames at 30fps):

```text
requestIn:      0.4   requestOut:      2.0   (no spotlight)
appCheckIn:     2.3   appCheckOut:     3.3   (Application)
redisIn:        3.7   redisOut:        8.2   (Redis, held through 2 captions)
resultAppIn:    8.6   resultAppOut:    9.8   (Application)
clientIn:      10.2   clientOut:      12.0   (Client)
closingIn:     12.5                          (no spotlight)
```

Caption windows (independent of spotlight windows but kept close to their parent spotlight's active span):

```text
request           0.4–2.0    "Now the same request arrives again."
checkRedis         2.3–3.5    "The application checks Redis first."
cacheHit            3.9–5.6    "This time, Redis already has the result."
databaseSkipped      6.0–7.9    "The Database is skipped entirely."
resultReturns          8.7–9.7    "The cached result comes straight back to the application."
fastResponse             10.2–11.9  "Now the response returns much faster — about 8 ms after Redis."
closing                    12.5–13.6  "The Database did not get faster. We simply did not need it this time."
```

No spotlight overlap: every handoff is a 0.4s fade-out immediately followed by a 0.4s fade-in at the same second (e.g. Application fades fully out by 3.7s exactly as Redis begins fading in), the same non-overlapping handoff shape Scene 04/08 established. Verified visually in `scene-09-handoff-check.png` (rendered exactly at the 3.7s Application→Redis handoff second): the whole image sits at uniform full brightness with no highlighted region, confirming neither spotlight is bleeding into the other. The closing caption's end (13.6s) plus its 0.4s fade-out lands at exactly 14.0s — the scene's own duration boundary — matching Scene 08's same pattern of ending precisely at its allotted window.

## 8. Database-Skipped Treatment

The Database is never given its own spotlight appearance in this scene. During both the "cache hit" and "Database is skipped" captions, Redis remains the sole bright node; the Database card is left in the ambient-dim state that any non-active node has while a spotlight is active elsewhere. This is the task's own "Preferred treatment": the contrast between Redis staying bright and Database staying dim does the explanatory work, reinforced by the explicit caption text "The Database is skipped entirely." No red X, no new drawn symbol, and no second spotlight target were introduced — confirmed visually in `scene-09-database-skipped.png`.

## 9. Latency / Baked Text Limitation

- The reused source PNG carries baked yellow text reading **"~10 ms"** with a smaller caption below it reading "vs. ~180 ms without cache," positioned in the lower-left of the frame (confirmed by direct visual inspection of `scene-07-technical-architecture.png`).
- The episode's established cache-hit example, used consistently since earlier scenes, is **"~8 ms"** (used in this scene's `cacheHitFastResponse` caption text: "Now the response returns much faster — about 8 ms after Redis.").
- This discrepancy **is visible** in Scene 09: the baked "~10 ms" text sits in the same lower portion of frame as the bottom caption band, and at the "fast response" beat specifically (`scene-09-fast-response.png`), the baked "~10 ms" is legible at reduced brightness (dimmed because the frame's other bright node — Client — currently holds the spotlight) directly above the "about 8 ms after Redis" caption text. The two numbers are visible in the same frame simultaneously.
- No overlay was added to hide or contradict the baked text, and the source image was not modified, edited, or regenerated, per the task's explicit instruction. The scene's own spoken/written claim (~8 ms) is the one carried by localized text; the baked ~10 ms is an asset-level artifact from an earlier approved diagram and is flagged here as a known limitation rather than silently left undocumented. **Recommend as a follow-up (not performed in this task):** either retune the episode's canonical example to ~10 ms for full consistency with this specific asset, or request a corrected asset in a future task if the ~8 ms figure is the one to keep; both are asset/content decisions outside this task's scope (no source-image edits, no new assets).

## 10. Localization

- Baked-English limitation: the reused PNG's labels ("Client," "Application," "Redis," "Database," step numbers, "~10 ms," "vs. ~180 ms without cache," "SAME REQUEST. FASTER RESPONSE.") remain in English in every language composition, exactly as already documented for Scenes 07/08. This is an existing, accepted asset limitation, not something introduced or newly discovered by this task.
- EN/DE/FR captions: seven new translation keys were added (`cacheHitRequestArrives`, `cacheHitCheckRedis`, `cacheHitFound`, `cacheHitDatabaseSkipped`, `cacheHitResultReturns`, `cacheHitFastResponse`, `cacheHitClosing`) to `src/shared/localization/index.ts`, following the exact same key-naming and per-language-block pattern as Scene 08's `cacheMiss*` keys. All three languages were rendered and visually confirmed correct: `scene-09-cache-hit.png` (EN), `scene-09-de-check.png` (DE), `scene-09-fr-check.png` (FR).

## 11. Review Artifacts

```text
renders/review/task-016/scene-09-start.png
renders/review/task-016/scene-09-check-redis.png
renders/review/task-016/scene-09-cache-hit.png
renders/review/task-016/scene-09-database-skipped.png
renders/review/task-016/scene-09-result-return.png
renders/review/task-016/scene-09-fast-response.png
renders/review/task-016/scene-09-end.png
renders/review/task-016/scene-09-preview.mp4
renders/review/task-016/scene-09-handoff-check.png
renders/review/task-016/scene-08-regression.png
renders/review/task-016/scene-07-regression.png
```

Additional stills rendered to verify localization (not part of the task's required list, but produced as evidence for Section 10):

```text
renders/review/task-016/scene-09-de-check.png
renders/review/task-016/scene-09-fr-check.png
```

All files confirmed Git-ignored via `git check-ignore -v` (matched by `renders/*` in `.gitignore`).

## 12. Human Review Requests

| Artifact | Purpose | What to review | Agent assessment | Known issues |
|---|---|---|---|---|
| scene-09-start.png | Opening beat, no spotlight | Whether the repeated-request setup is immediately understandable | Full-brightness architecture diagram with "Now the same request arrives again." caption; reads clearly | Baked "~10 ms" visible in frame (Section 9) |
| scene-09-check-redis.png | Application spotlight | Whether Application → Redis mirrors Scene 08 clearly | Application card cleanly isolated, rest dimmed; same visual language as Scene 08's equivalent beat | None observed |
| scene-09-cache-hit.png | Redis spotlight, beat 3 | Whether the cache hit is obvious | Redis card bright, "This time, Redis already has the result." caption reinforces it | None observed |
| scene-09-database-skipped.png | Redis spotlight held, beat 4 | Whether the Database being skipped is unmistakable; whether Database remains appropriately dim | Redis stays bright, Database stays dim, caption states the skip explicitly | None observed |
| scene-09-result-return.png | Application spotlight again | Whether the result-return beat is clear | Application re-highlighted, caption confirms return path | None observed |
| scene-09-fast-response.png | Client spotlight | Whether the response feels faster without overclaiming | Client highlighted, "about 8 ms after Redis" caption | Baked "~10 ms" visible simultaneously in frame — see Section 9 for full discussion; not hidden or edited |
| scene-09-end.png | Closing beat, no spotlight | Whether the scene ends on the correct mental model | Full-brightness frame, closing line matches task's required wording exactly | None observed |
| scene-09-handoff-check.png | Spotlight handoff boundary (3.7s) | Whether spotlight regions are clean, sequential, no bleed | Whole frame at uniform brightness at the exact Application→Redis handoff second — confirms no overlap | None observed |
| scene-09-preview.mp4 | Full Scene 09 playback (frames 3840–4259 of Redis-EN) | Whether Scene 09 is ready to proceed to Scene 10; overall pacing across all 7 beats | Not independently assessable via stills alone; included for full-motion human review | None observed in constituent stills |
| scene-08-regression.png | Regression check | Confirm Scene 08 is unaffected by Scene 09's addition | Identical cache-miss visual/caption content as before this task | None observed |
| scene-07-regression.png | Regression check | Confirm Scene 07 is unaffected | Identical restaurant-to-architecture analogy content as before this task | None observed |

Human review status: **PENDING**

## 13. Verification Results

```text
TypeScript:                PASS
build:                      PASS
composition discovery:      PASS
scene validation:           PASS (validateEpisodeArchitecture ran without throwing at import/build time)
asset validation:           PASS (scene07TechnicalArchitecture reference validated against asset manifest)
Redis-EN:                   PASS (stills rendered across all 7 beats without runtime error)
Redis-DE:                   PASS (still rendered, caption correct)
Redis-FR:                   PASS (still rendered, caption correct)
Scene 09 start:              PASS
Redis check:                  PASS
cache hit:                     PASS
Database skipped:               PASS
result return:                   PASS
fast response:                     PASS
end:                                 PASS
handoff safety:                       PASS
Scene 09 MP4:                          PASS
Scene 08 regression:                    PASS
Scene 07 regression:                     PASS
no seam:                                  PASS
no drift:                                  PASS (single shared push-in transform wraps all spotlight layers, same technique as Scenes 04/07/08)
no hard edge:                               PASS (SpotlightImage's radial-gradient feather mask, unchanged)
no simultaneous spotlights:                  PASS (pickSequentialSpotlight structurally allows only one active target; verified visually at handoff second)
```

## 14. Problems / Risks

- The baked "~10 ms" vs. episode-established "~8 ms" discrepancy (Section 9) is visible in this scene, most notably during the "fast response" beat. This is an inherited asset limitation, not introduced by this task, but it is more prominent here than in Scene 07/08 because this scene's own narration actively states a specific, different number in the same frame. Recommend human review specifically weigh in on whether this is acceptable as-is or whether a follow-up task should address it (see the two options proposed in Section 9).
- `SpotlightImage`'s known radial-gradient radius/diameter mismatch (documented technical debt, carried from Scene 08) still applies; not fixed here per the task's explicit instruction not to touch the global component contract in this task.

## 15. Recommended Next Step

```text
If Scene 09 is human-approved:
→ plan Scene 10: why Redis is fast.

If Scene 09 is not approved:
→ revise only the rejected Scene 09 spotlight, timing, or explanatory beat.
```

## 16. Git Status

- Branch: `master`
- Changed files (modified, pre-existing from TASK-015 and extended by this task):
  - `src/episodes/001-redis/RedisEpisode.tsx` — added Scene 09 import and `<Sequence>`
  - `src/episodes/001-redis/episode.config.ts` — added `scene09Window` export and included its duration in `durationInFrames`
  - `src/episodes/001-redis/scenes.ts` — added `scene07TechnicalArchitecture` to Scene 09's `assetIds` and expanded its `visualNotes`
  - `src/shared/localization/index.ts` — added 7 new translation keys × 3 languages for Scene 09 captions
- Untracked files added by this task:
  - `src/episodes/001-redis/scenes/Scene09CacheHit.tsx` (new scene component)
  - `feedbacks/task-016-feedback.md` (this report)
- Untracked files from earlier tasks, unrelated to this task and left untouched:
  - `src/episodes/001-redis/scenes/Scene08CacheMiss.tsx`
  - `feedbacks/task-015-feedback.md`
  - `tasks/TASK-015.md`, `tasks/TASK-016.md`, `tasks/TASK-016A.md`
- Ignored review media: all files under `renders/review/task-016/` (confirmed via `git check-ignore -v`), not shown in `git status`.
- No commits made. No pushes made.

## 17. Final Status

```text
TASK-016 STATUS: PASS
```
