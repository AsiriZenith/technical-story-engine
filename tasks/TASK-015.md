# TASK-015 — Implement Scene 08: Cache Miss Path

## Objective

Implement **Scene 08 — Cache Miss: Redis Does Not Have the Result Yet**.

Scene 07 has now mapped the restaurant analogy back to the real technical architecture.

Scene 08 should answer the next question:

```text
What happens when the application checks Redis
and the value is not there yet?
```

This scene should teach the **cache-miss path** clearly and sequentially.

Do not start Scene 09.

---

## Core Technical Message

For a cache miss:

```text
Client sends request
→ Application checks Redis
→ Redis does not have the result
→ Application queries Database
→ Database performs the expensive work
→ result returns to Application
→ Application stores the result in Redis
→ response returns to Client
```

The key idea is:

```text
On a cache miss, we still pay the expensive database cost.
But we also prepare Redis so the next identical request can avoid that work.
```

Do not imply:
- Redis makes the Database query itself faster;
- a cache miss is fast;
- Redis replaces the Database;
- the Database is no longer the source of truth.

---

## Reuse Existing Approved Architecture Asset

Reuse the exact existing production asset:

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

This image is already approved.

Use it directly.

Do not:
- redraw the architecture;
- recreate nodes in React;
- edit the PNG;
- alter arrows/text inside the image;
- generate a replacement architecture image.

This scene should use the existing architecture image as the visual foundation.

---

## Highlighting System

Use the approved project spotlight approach:

```text
SpotlightImage
```

Do **not** return to:
- `FocusBox`;
- thick outlines;
- glow rectangles;
- translucent highlight blocks.

Use:

```text
dimmed base image
+
masked full-brightness image
```

inside the same transformed wrapper.

### Important Spotlight Rule

Only one primary target should be emphasized at a time.

If a path segment needs attention, prefer:
- a broader soft spotlight region covering that path segment;
- or a sequence of node spotlights;

rather than adding drawn arrows/rectangles on top of the source image.

Do not invent new diagram geometry unless absolutely necessary.

---

## Spotlight Math Caveat

There is known technical debt in the current `SpotlightImage` mask sizing math:

```text
featherPaddingFactor
```

does not map perfectly to the documented visual extent because the CSS radial-gradient ellipse values act as radii.

Do **not** fix that shared component behavior in this task if doing so would alter already-approved Scene 04 / Scene 07 visuals.

Instead:
- tune Scene 08's spotlight regions/values locally if needed;
- document any Scene 08-specific tuning in feedback.

A separate cleanup task can fix the component contract later.

---

## Scene Narrative

Recommended beat structure:

### Beat 1 — Request arrives

Show the architecture cleanly first.

Message:

```text
A request reaches the application.
```

Allow the full diagram to register before any spotlight.

---

### Beat 2 — Application checks Redis

Spotlight:

```text
Application
→ Redis / Cache
```

Narrative idea:

```text
Before touching the Database,
the application checks Redis.
```

---

### Beat 3 — Cache miss

Emphasize the cache-miss part of the diagram.

Message:

```text
But this time, Redis does not have the result.
```

Keep this visually simple.

Do not use a comedic beat here unless it is extremely restrained.

---

### Beat 4 — Database work still happens

Spotlight:

```text
Database
```

Then, if useful, include the miss/request path between Application and Database as part of a broader spotlight region.

Message:

```text
So the application still has to ask the Database.
```

Then reinforce:

```text
The expensive work still happens on this request.
```

This is the most important conceptual beat of Scene 08.

---

### Beat 5 — Result comes back

Guide attention back from Database to Application.

Message:

```text
The Database returns the result.
```

Do not over-animate.

---

### Beat 6 — Store result in Redis

Spotlight:

```text
Application
→ Redis
```

Message:

```text
Before responding, the application stores that result in Redis.
```

This prepares the viewer for Scene 09.

---

### Beat 7 — Response returns

Return to the full diagram or spotlight the Client/response path.

Closing message:

```text
The first request was still expensive.
But now Redis has the result ready for next time.
```

This line should set up Scene 09 naturally.

---

## Scene 09 Boundary

Do **not** show the full fast cache-hit story yet.

Scene 08 ends with:

```text
Redis now has the result.
```

Scene 09 should own:

```text
same request again
→ Redis hit
→ Database skipped
→ fast response
```

Do not steal Scene 09's payoff.

---

## Motion Design Phase

Before implementation, inspect the architecture image and current Scene 08 placeholder/window.

Use:

```text
frontend-design
animate
```

Create the motion plan internally before coding.

The implementation should follow these rules:

- one main focus target at a time;
- prefer fewer spotlights;
- no accumulated highlighting;
- no overlapping spotlights;
- no extra drawn boxes;
- keep movement restrained;
- image push-in only if it helps comprehension;
- if the image scales, spotlight layers must share the exact same transformed parent.

Do not create a separate design-review task unless truly blocked.

---

## Asset / Region Strategy

Use normalized `0–1` regions.

At minimum define regions for:

```text
Client
Application
Redis
Database
Application→Redis area
Application→Database miss area
response/client area
```

However, do not use all of them just because they exist.

Only activate the regions needed for the final motion plan.

Document final normalized regions in feedback.

---

## Timing

Inspect the existing Scene 08 planned window in the episode configuration and preserve its intended duration unless the current placeholder is clearly wrong.

Do not modify unrelated scene durations.

If a small internal beat adjustment is needed:
- keep total Scene 08 duration unchanged;
- change only beat timing inside Scene 08.

---

## Localization

Support:

```text
en
de
fr
```

The architecture PNG has baked English text.

Do not redraw or translate the image.

Document this existing limitation.

Any new overlay/caption text outside the image should use the existing localization system.

---

## Scope

Implement Scene 08 only.

Do not:
- start Scene 09;
- modify Scene 07;
- modify Scene 04;
- modify Scene 06;
- fix the global SpotlightImage radius/diameter math;
- generate new image/video assets;
- change source architecture PNG;
- add narration audio unless the project already has an established narration step for this scene.

---

## Review Artifacts

Render:

```text
renders/review/task-015/scene-08-start.png
renders/review/task-015/scene-08-check-redis.png
renders/review/task-015/scene-08-cache-miss.png
renders/review/task-015/scene-08-database-work.png
renders/review/task-015/scene-08-store-in-redis.png
renders/review/task-015/scene-08-end.png
renders/review/task-015/scene-08-preview.mp4
```

Also render at least one handoff-safety frame:

```text
renders/review/task-015/scene-08-handoff-check.png
```

This should prove two spotlight targets are not active simultaneously.

Regression stills:

```text
renders/review/task-015/scene-07-regression.png
renders/review/task-015/scene-04-regression.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the cache-miss flow is understandable without narration;
2. whether Application → Redis check is clear;
3. whether the cache-miss beat is obvious;
4. whether Database work is clearly shown as still necessary;
5. whether storing the result in Redis is understandable;
6. whether the scene clearly prepares the viewer for the next request;
7. whether spotlight regions are tight enough;
8. whether any spotlight bleeds into unrelated nodes;
9. whether any two spotlights overlap;
10. whether the source architecture image remains visually unchanged;
11. whether Scene 08 is ready to proceed to Scene 09.

Human review status:

```text
PENDING
```

---

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

```text
Scene 08 start
Redis check
cache miss
Database work
store in Redis
Scene 08 end
handoff safety
Scene 08 MP4
Scene 07 regression
Scene 04 regression
```

---

## Acceptance Criteria

TASK-015 is complete only when:

- [ ] Scene 08 exists and renders.
- [ ] Exact approved technical architecture PNG is reused.
- [ ] No new architecture image is generated.
- [ ] No architecture redraw is introduced.
- [ ] Cache-miss path is technically correct.
- [ ] Redis check occurs before Database work.
- [ ] Cache miss leads to Database work.
- [ ] Database remains source of truth.
- [ ] Result is stored in Redis before the scene ends.
- [ ] Scene ends by setting up the future cache hit.
- [ ] Scene 09's cache-hit payoff is not implemented here.
- [ ] SpotlightImage is used for image emphasis.
- [ ] No old glow-box / FocusBox treatment is introduced.
- [ ] Only one primary spotlight is visible at a time.
- [ ] No visible spotlight drift.
- [ ] No hard rectangular spotlight edge.
- [ ] No source image modification.
- [ ] EN/DE/FR compositions remain valid.
- [ ] Required review stills are rendered.
- [ ] Scene 08 preview MP4 is rendered.
- [ ] Scene 07 regression passes.
- [ ] Scene 04 regression passes.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Human review status is PENDING.
- [ ] `feedbacks/task-015-feedback.md` is created.
- [ ] Scene 09 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-015-feedback.md
```

It must contain:

### 1. Summary
Explain what was implemented in Scene 08.

### 2. Source Asset Usage
Report:
- exact architecture asset path;
- logical asset ID used;
- confirmation that the source image was not changed.

### 3. Cache-Miss Flow
Document the implemented sequence:

```text
Client
→ Application
→ Redis check
→ miss
→ Database
→ result
→ store Redis
→ response
```

### 4. Motion Design
Explain:
- which spotlights were used;
- why each was necessary;
- which possible targets were intentionally not highlighted.

### 5. Spotlight Regions
Report normalized `0–1` values for every active spotlight region.

### 6. Spotlight Settings
Report exact values used for:

```text
dimBrightness
featherPaddingFactor
```

If different per target, document each one and why.

### 7. Timing
Report each beat's timing and confirm spotlights do not overlap.

### 8. Spotlight Technical Debt
State whether the known radial-gradient radius/diameter inconsistency affected Scene 08, and whether any local tuning was required.

Do not silently fix the shared component contract in this task.

### 9. Localization
Report:
- baked-English limitation;
- new localized overlay/caption treatment for EN/DE/FR.

### 10. Review Artifacts
List exact output paths.

### 11. Human Review Requests
For every review artifact include:
- Artifact
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 12. Verification Results
PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- Redis-EN
- Redis-DE
- Redis-FR
- Scene 08 start
- Redis check
- cache miss
- Database work
- store in Redis
- end
- handoff safety
- Scene 08 MP4
- Scene 07 regression
- Scene 04 regression
- no seam
- no drift
- no hard edge
- no simultaneous spotlights

### 13. Problems / Risks
Report remaining concerns.

### 14. Recommended Next Step

Use exactly:

```text
If Scene 08 is human-approved:
→ plan Scene 09: cache hit / Database skipped / fast response.

If Scene 08 is not approved:
→ revise only the rejected Scene 08 spotlight, timing, or explanatory beat.
```

### 15. Git Status
Report:
- branch;
- changed files;
- untracked files;
- ignored review media;
- commits/pushes.

### 16. Final Status

Finish with exactly one:

```text
TASK-015 STATUS: PASS
```

or

```text
TASK-015 STATUS: PARTIAL
```

or

```text
TASK-015 STATUS: BLOCKED
```

---

## Agent Behavior

- Reuse the exact approved architecture image.
- Do not redraw.
- Use SpotlightImage.
- Keep focus sequential.
- Keep the cache miss technically correct.
- Do not start Scene 09.
- Render review artifacts.
- Create feedback.
- Stop after feedback.
