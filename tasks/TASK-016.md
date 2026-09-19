# TASK-016 — Implement Scene 09: Cache Hit / Database Skipped / Fast Response

## Objective

Implement **Scene 09 — Cache Hit: Redis Has the Result Ready**.

Scene 08 established the cache-miss path:

```text
request
→ Application checks Redis
→ miss
→ Database work
→ result stored in Redis
```

Scene 09 should now deliver the payoff:

```text
same request again
→ Application checks Redis
→ cache hit
→ Database is skipped
→ cached result returns quickly
```

Do not start Scene 10.

## Core Technical Message

The key idea is:

```text
Redis did not make the Database faster.
Redis made it possible to skip the Database entirely on this request.
```

The viewer should understand:

```text
Client
→ Application
→ Redis
→ cached result
→ response
```

while the Database is not used on the cache-hit path.

Do not imply:
- the Database disappeared permanently;
- Redis became the source of truth;
- every request is always a cache hit;
- Redis speeds up the original Database query itself.

## Reuse Existing Approved Architecture Asset

Reuse the exact existing asset:

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

Do not edit, redraw, regenerate, replace, or alter baked labels.

## Spotlight System

Use the approved:

```text
SpotlightImage
```

approach.

Do not use FocusBox, glow rectangles, translucent boxes, or thick borders.

Use normalized `0–1` spotlight regions and keep the transform-safe structure:

```text
shared transformed wrapper
├── dimmed base image
└── masked full-brightness image
```

Only one primary spotlight at a time.

## Spotlight Technical Debt

The current `SpotlightImage` implementation still has the known radial-gradient radius/diameter mismatch.

Do not fix the global component contract in this task.

Use Scene-09-local tuning if necessary and document it.

Do not change Scene 04 / Scene 07 / Scene 08 appearance.

## Recommended Narrative

### Beat 1 — Same request again

Open on the full architecture.

Message:

```text
Now the same request arrives again.
```

No spotlight at first.

### Beat 2 — Application checks Redis again

Spotlight Application, then Redis.

Message:

```text
The application checks Redis first.
```

Mirror Scene 08 enough that the viewer recognizes the repeated request flow.

### Beat 3 — Cache hit

Hold Redis as the focal point.

Message:

```text
This time, Redis already has the result.
```

### Beat 4 — Database skipped

This is the most important conceptual beat.

Preferred treatment:
- keep Redis as the active spotlight;
- leave Database visibly dimmed;
- use a localized caption such as:

```text
The Database is skipped entirely.
```

Do not add a red X or new drawn symbol unless absolutely necessary.

The contrast between Redis bright and Database dim should do most of the work.

### Beat 5 — Cached result returns

Guide attention back toward Application.

Message:

```text
The cached result comes straight back to the application.
```

### Beat 6 — Fast response

Return attention toward the Client / response side.

Message:

```text
Now the response can return much faster.
```

Use the established episode example:

```text
~8 ms after Redis
```

The source image may contain baked `~10 ms` text. Do not overwrite or edit it. Document the discrepancy as a known limitation if visible.

### Beat 7 — Closing mental model

End on:

```text
The Database did not get faster.
We simply did not need it this time.
```

## Scene Boundary

Scene 09 should own:

```text
cache hit
Database skipped
fast response
```

Do not move into stale cache, invalidation, expiration, cache-everything tradeoffs, or Redis internals.

## Motion Design Rules

Use:

```text
frontend-design
animate
```

Design the sequence internally before coding.

Rules:
- one main target at a time;
- fewer spotlights are better;
- no accumulated highlights;
- avoid path geometry unless absolutely necessary;
- no extra arrows;
- no new diagram shapes;
- no comedic effects;
- keep continuity with Scene 08;
- if the image scales, spotlight layers must share the same transformed parent.

## Recommended Active Spotlight Regions

Likely active regions:

```text
Application
Redis
Application again
Client / response area
```

Database should generally stay dim during the cache-hit payoff.

Do not spotlight Database unless needed briefly to establish it as the skipped component. Prefer leaving it dim while Redis stays bright.

Reuse approved normalized regions from Scene 08 where appropriate.

## Timing

Inspect the existing Scene 09 planned window.

Preserve its intended duration unless the placeholder window is clearly incorrect.

Do not change unrelated scene durations.

## Localization

Support:

```text
en
de
fr
```

All new caption text must use the existing localization system.

The reused PNG contains baked English text. Do not redraw or translate inside the PNG.

## Scope

Implement Scene 09 only.

Do not:
- start Scene 10;
- modify Scene 08;
- modify Scene 07;
- modify Scene 04;
- edit `SpotlightImage` global sizing math;
- generate new image/video assets;
- change the architecture PNG;
- change source assets.

## Review Artifacts

Render:

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
```

Regression stills:

```text
renders/review/task-016/scene-08-regression.png
renders/review/task-016/scene-07-regression.png
```

All review media must remain Git-ignored.

## Human Review Requests

Ask the user to review:

1. whether the repeated-request setup is immediately understandable;
2. whether Application → Redis mirrors Scene 08 clearly;
3. whether the cache hit is obvious;
4. whether the Database being skipped is unmistakable;
5. whether the Database remains appropriately dim;
6. whether the result-return beat is clear;
7. whether the response feels faster without overclaiming;
8. whether spotlight regions are clean and do not bleed;
9. whether spotlights remain sequential;
10. whether the scene ends on the correct mental model;
11. whether Scene 09 is ready to proceed to Scene 10.

Human review status:

```text
PENDING
```

## Validation

Run:

```text
typecheck
build
composition discovery
scene validation
asset validation
Redis-EN
Redis-DE
Redis-FR
```

Verify:
- Scene 09 start
- Redis check
- cache hit
- Database skipped
- result return
- fast response
- Scene 09 end
- handoff safety
- Scene 09 MP4
- Scene 08 regression
- Scene 07 regression

## Acceptance Criteria

TASK-016 is complete only when:

- [ ] Scene 09 exists and renders.
- [ ] Exact approved architecture PNG is reused.
- [ ] No new architecture image is generated.
- [ ] Cache-hit path is technically correct.
- [ ] Application checks Redis first.
- [ ] Redis already has the result.
- [ ] Database is clearly skipped on this request.
- [ ] Database is not presented as removed permanently.
- [ ] Result returns from Redis to Application.
- [ ] Response returns to Client.
- [ ] Scene communicates faster response without claiming Redis speeds the DB query.
- [ ] Scene ends on “Database did not get faster; we did not need it this time.”
- [ ] SpotlightImage is used.
- [ ] No FocusBox/glow-box treatment is introduced.
- [ ] Only one primary spotlight is visible at a time.
- [ ] No spotlight drift.
- [ ] No hard spotlight edge.
- [ ] No source image modification.
- [ ] EN/DE/FR remain valid.
- [ ] Required review stills are rendered.
- [ ] Scene 09 preview MP4 is rendered.
- [ ] Scene 08 regression passes.
- [ ] Scene 07 regression passes.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Human review status is PENDING.
- [ ] `feedbacks/task-016-feedback.md` is created.
- [ ] Scene 10 is not started.

## Required Feedback Report

Create:

```text
feedbacks/task-016-feedback.md
```

It must contain:

### 1. Summary
Explain what was implemented in Scene 09.

### 2. Source Asset Usage
Report:
- exact architecture asset path;
- logical asset ID;
- confirmation source image is unchanged.

### 3. Cache-Hit Flow
Document:

```text
Client
→ Application
→ Redis check
→ hit
→ cached result
→ Application
→ Client
```

Explain explicitly how Database is skipped.

### 4. Motion Design
Explain:
- spotlight sequence;
- why those targets were selected;
- why Database was or was not spotlighted.

### 5. Spotlight Regions
Report normalized `0–1` values for every active region.

### 6. Spotlight Settings
Report:

```text
dimBrightness
featherPaddingFactor
```

and explain any Scene-09-specific tuning.

### 7. Timing
Report each beat's timing and confirm no spotlight overlap.

### 8. Database-Skipped Treatment
Explain exactly how the scene makes it clear that the Database is not used.

### 9. Latency / Baked Text Limitation
Report:
- any visible `~10 ms` baked source-image text;
- the established episode example of `~8 ms`;
- whether the discrepancy is visible in Scene 09;
- how the scene avoids creating a contradictory overlay.

Do not modify the source image.

### 10. Localization
Report:
- baked-English limitation;
- EN/DE/FR captions.

### 11. Review Artifacts
List exact paths.

### 12. Human Review Requests
For every artifact include:
- Artifact
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 13. Verification Results
PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- Redis-EN
- Redis-DE
- Redis-FR
- Scene 09 start
- Redis check
- cache hit
- Database skipped
- result return
- fast response
- end
- handoff safety
- Scene 09 MP4
- Scene 08 regression
- Scene 07 regression
- no seam
- no drift
- no hard edge
- no simultaneous spotlights

### 14. Problems / Risks
Report remaining concerns.

### 15. Recommended Next Step

Use exactly:

```text
If Scene 09 is human-approved:
→ plan Scene 10: why Redis is fast.

If Scene 09 is not approved:
→ revise only the rejected Scene 09 spotlight, timing, or explanatory beat.
```

### 16. Git Status
Report:
- branch;
- changed files;
- untracked files;
- ignored review media;
- commits/pushes.

### 17. Final Status

Finish with exactly one:

```text
TASK-016 STATUS: PASS
```

or

```text
TASK-016 STATUS: PARTIAL
```

or

```text
TASK-016 STATUS: BLOCKED
```

## Agent Behavior

- Reuse the exact approved architecture image.
- Use SpotlightImage.
- Keep the Database clearly skipped.
- Keep focus sequential.
- Do not start Scene 10.
- Render review artifacts.
- Create feedback.
- Stop after feedback.
