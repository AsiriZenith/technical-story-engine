# TASK-022 — Implement Scene 12: Stale Cache / Fast but Wrong Answer

## Objective

Implement **Scene 12 — Stale Cache: Fast but Wrong Answer** using the approved plan from `TASK-021`.

Scene 11 introduced stale data as one cost of caching.

Scene 12 should now make that tradeoff concrete:

```text
Database value changes
→ Redis still holds the old cached value
→ Application reads Redis
→ response is fast
→ but response is stale
```

Do not start Scene 13.

---

## Required Installed Skills

Before implementation, explicitly consult the installed skills that apply.

Required:

```text
technical-story-video
remotion-best-practices
remotion-markup
frontend-design
animate
remotion-captions
remotion-render
review-animations
```

Use when needed:

```text
remotion-docs
remotion-studio
```

In the feedback report, state:
- which skills were actually consulted;
- how each influenced the implementation.

Do not use irrelevant skills just because they are installed.

---

## Approved Visual Strategy

Use the approved **Option D — fully Remotion-native data-state scene** from TASK-021.

Use:
- no image asset;
- no `SpotlightImage`;
- no character illustration;
- no architecture PNG;
- no restaurant visual.

Build the scene from:
- typography tokens;
- theme colors;
- `AbsoluteFill`;
- `Interactive.Div` where appropriate;
- `interpolate()`;
- existing motion presets;
- one small file-local value-card helper if useful.

Do not create a new shared component unless absolutely necessary.

---

## Placeholder Asset Cleanup

Scene 12 currently lists:

```text
assetIds: ['alicePortrait']
```

The `alicePortrait` asset is a placeholder with no file.

Because the approved plan uses no image:

```text
update Scene 12 assetIds to []
```

Do not:
- generate the Alice portrait;
- resolve the placeholder;
- create a new asset;
- block on the placeholder.

Leave the placeholder asset itself untouched in `assets.ts`.

---

## Approved Example

Use the existing Alice email example already present in the Scene 12 outline:

```text
Database: alice.new@example.com
Redis:    alice.old@example.com
```

The key visual idea:

```text
Database = current value
Redis = cached old value
```

Use this example unchanged unless a very small wording change is required for implementation clarity.

Do not replace it with a price, inventory, or status example.

---

## Core Teaching Goal

The viewer should understand:

```text
The Database can change.
Redis can still hold an older copy.
If the application reads Redis before that copy is refreshed,
the response can be fast but outdated.
```

The scene's core takeaway:

```text
Caching reuses old work.
That is also how cached data can become stale.
```

Do not imply:
- Redis is broken;
- the Database is wrong;
- stale cache happens every time;
- caching is bad;
- the fix is simply "use a very short TTL."

---

## Scene Boundary

Scene 12 explains:
- Database value changes;
- Redis still holds the older cached copy;
- app reads Redis;
- old value returns;
- fast does not guarantee correct/current.

Do **not** explain:
- TTL mechanics;
- invalidation strategies;
- eviction;
- memory limits;
- monitoring;
- failures;
- infrastructure overhead.

Those belong to Scene 13.

---

## Duration

Keep the approved Scene 12 duration:

```text
sharedWindow(11, 2)
```

Expected total:

```text
13.0s
390 frames at 30fps
```

Do not change unrelated scene durations.

---

## Approved Beat Plan

### Beat 1 — Bridge

Approx:

```text
0.4s → 2.0s
```

Visual:
- centered text;
- dark background;
- no cards yet.

Text:

```text
What does “stale data” actually mean?
```

Motion:
- soft fade;
- slight upward settle;
- ease-out.

---

### Beat 2 — Database value changes

Approx:

```text
2.4s → 4.6s
```

Show a Database value card.

Suggested structure:

```text
Database
CURRENT
alice.old@example.com
```

Then crossfade the value to:

```text
alice.new@example.com
```

Caption:

```text
The Database record changes.
```

Important:
- use a same-position crossfade;
- no bounce;
- no hard cut;
- do not animate the whole card unnecessarily.

---

### Beat 3 — Redis stays old

Approx:

```text
5.0s → 7.2s
```

Keep the Database card visible with:

```text
alice.new@example.com
```

Add a Redis card showing:

```text
Redis
CACHED COPY
alice.old@example.com
```

Caption:

```text
But Redis still holds the old value.
```

The viewer should see both values simultaneously.

This is the scene's most important visual comparison.

---

### Beat 4 — Fast stale response

Approx:

```text
7.6s → 9.4s
```

Keep both cards visible.

Briefly emphasize the Redis card using existing scale/emphasis motion.

Show a small response/value indicator:

```text
alice.old@example.com
```

Caption:

```text
The application reads Redis — and returns that answer fast.
```

Do not add:
- arrows unless truly necessary;
- complex flow animation;
- new diagram geometry.

Prefer the Redis emphasis + returned-value indicator.

---

### Beat 5 — Joke

Approx:

```text
9.6s → 10.8s
```

Text:

```text
Wrong answer. Very fast.
```

Use:
- centered text;
- brief fade;
- calm, wry treatment.

Do not make this a large comedic spectacle.

No meme, no sound effect, no character reaction.

---

### Beat 6 — Takeaway

Approx:

```text
11.0s → 13.0s
```

Text:

```text
Caching reuses old work. That’s also how it can become stale.
```

Use slightly more visual weight than the mid-scene captions.

Hold to the scene boundary.

Do not preview invalidation mechanics.

---

## Value Card Design

Create a small file-local helper if helpful, modeled on existing scene-local patterns.

Recommended content per card:

```text
label
role
value
```

Example:

```text
Database
CURRENT
alice.new@example.com
```

and:

```text
Redis
CACHED COPY
alice.old@example.com
```

Use existing typography tokens and theme colors.

For stale/cached-old emphasis, prefer the existing:

```text
provisionalColors.warning
```

Do not invent a new arbitrary stale-data color.

Keep the card design simple.

No glossy UI.
No card-stack dashboard look.
No badges beyond the role text itself.

---

## Localization

Support:

```text
en
de
fr
```

Add translation keys for:
- bridge;
- Database change caption;
- Redis old-value caption;
- fast-return caption;
- joke;
- takeaway;
- role label `CURRENT`;
- role label `CACHED COPY`;
- optional `Response` label if used.

The email values are not translated.

Check especially:

```text
CURRENT
CACHED COPY
Wrong answer. Very fast.
```

for natural DE/FR equivalents.

If `CACHED COPY` is too long in German, use a shorter equivalent preserving meaning.

Render dedicated DE/FR stills.

---

## Numeric Latency Policy

Do not use:

```text
~8 ms
~10 ms
~180 ms
```

Scene 12 is about correctness, not latency measurement.

Use only:

```text
fast
```

conceptually.

---

## Motion Rules

Use established project motion:
- `interpolate()`;
- shared ease-out bezier;
- existing motion presets;
- same-position crossfade for old → new Database value;
- gentle card entrance;
- small Redis emphasis pulse;
- no `scale(0)`;
- no spring/bounce;
- no CSS `transition: all`;
- no hard rectangular highlight treatment.

Use `review-animations` before declaring the task complete.

---

## Metadata Update

Update Scene 12 metadata to match implementation:

- `assetIds: []`;
- keep/update story beats to reflect:
  - Database current value changes;
  - Redis cached copy remains old;
  - old response comes back fast;
  - “Wrong answer. Very fast.”;
  - stale-cache takeaway;
- visual notes should describe the Remotion-native two-card comparison.

Do not change Scene 13+ metadata beyond necessary duration consistency.

---

## Review Artifacts

Render:

```text
renders/review/task-022/scene-12-start.png
renders/review/task-022/scene-12-database-old.png
renders/review/task-022/scene-12-database-new.png
renders/review/task-022/scene-12-divergence.png
renders/review/task-022/scene-12-fast-stale-response.png
renders/review/task-022/scene-12-wrong-fast.png
renders/review/task-022/scene-12-end.png
renders/review/task-022/scene-12-preview.mp4
```

Localization checks:

```text
renders/review/task-022/scene-12-de-divergence.png
renders/review/task-022/scene-12-fr-divergence.png
renders/review/task-022/scene-12-de-joke.png
renders/review/task-022/scene-12-fr-joke.png
renders/review/task-022/scene-12-de-end.png
renders/review/task-022/scene-12-fr-end.png
```

Regression stills:

```text
renders/review/task-022/scene-11-regression.png
renders/review/task-022/scene-10-regression.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the stale-data concept is immediately understandable;
2. whether the Database old→new change is visually clear;
3. whether the Redis cached-old value remains obvious;
4. whether the two cards clearly show divergence at the same time;
5. whether the Redis emphasis in the fast-response beat is restrained;
6. whether “Wrong answer. Very fast.” lands as a brief technical joke;
7. whether the takeaway correctly explains stale cache without drifting into invalidation mechanics;
8. whether the value-card design feels consistent with the existing visual system;
9. whether EN/DE/FR remain readable;
10. whether Scene 12 is ready to proceed to Scene 13.

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
Scene 12 start
Database old state
Database new state
Database/Redis divergence
fast stale response
Wrong answer. Very fast.
takeaway
Scene 12 MP4
localization stills
Scene 11 regression
Scene 10 regression
no placeholder alicePortrait dependency
review-animations QA
```

---

## Acceptance Criteria

TASK-022 is complete only when:

- [ ] Scene 12 exists and renders.
- [ ] No image asset is used.
- [ ] `assetIds` for Scene 12 is `[]`.
- [ ] Placeholder `alicePortrait` asset is not required.
- [ ] Scene duration remains 13.0s / 390 frames.
- [ ] Database old value is shown.
- [ ] Database changes to new value.
- [ ] Redis remains on the old cached value.
- [ ] Database and Redis divergence is simultaneously visible.
- [ ] Fast stale response beat is implemented.
- [ ] “Wrong answer. Very fast.” beat is implemented.
- [ ] Closing stale-cache takeaway is implemented.
- [ ] Scene does not explain TTL/invalidation mechanics.
- [ ] No numeric latency references are used.
- [ ] No `SpotlightImage` is used.
- [ ] No FocusBox/glow-box treatment is introduced.
- [ ] Existing tokens/presets are reused.
- [ ] EN/DE/FR render correctly.
- [ ] Required review artifacts are rendered.
- [ ] Scene 11 regression passes.
- [ ] Scene 10 regression passes.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `review-animations` QA completed.
- [ ] Human review status is PENDING.
- [ ] `feedbacks/task-022-feedback.md` is created.
- [ ] Scene 13 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-022-feedback.md
```

It must contain:

### 1. Summary
Explain what was implemented.

### 2. Skills Used
For each installed skill actually consulted:
- skill;
- purpose;
- decision influenced.

### 3. Visual Strategy
Confirm:
- fully Remotion-native;
- no image asset;
- no SpotlightImage;
- any local helper used.

### 4. Asset Cleanup
Report:
- removal of Scene 12 `alicePortrait` dependency;
- final `assetIds`;
- confirmation placeholder asset remains untouched.

### 5. Example
Document the final Alice email example.

### 6. Teaching Structure
Explain:
- Database change;
- Redis stale copy;
- fast response;
- joke;
- takeaway.

### 7. Value Card Design
Report:
- labels;
- role text;
- values;
- tokens/colors used;
- whether `provisionalColors.warning` was used.

### 8. Timing
Report every beat timing and total duration.

### 9. Localization
Report:
- EN;
- DE;
- FR;
- translated role labels;
- joke translation;
- overflow/wrapping findings;
- any shortened equivalents.

### 10. Numeric Latency Policy
Confirm no `~8 ms`, `~10 ms`, or `~180 ms` is used.

### 11. Review Artifacts
List exact paths.

### 12. Human Review Requests
For every artifact include:
- Artifact;
- Purpose;
- What to review;
- Agent assessment;
- Known issues;
- Human review status: PENDING.

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
- start
- Database old
- Database new
- divergence
- fast stale response
- joke
- takeaway
- Scene 12 MP4
- localization checks
- Scene 11 regression
- Scene 10 regression
- no placeholder alicePortrait dependency
- review-animations QA

### 14. Problems / Risks
Report remaining concerns.

### 15. Recommended Next Step

Use exactly:

```text
If Scene 12 is human-approved:
→ plan Scene 13: operational and design costs of caching.

If Scene 12 is not approved:
→ revise only the rejected Scene 12 timing, wording, value-card treatment, or humor beat.
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
TASK-022 STATUS: PASS
```

or

```text
TASK-022 STATUS: PARTIAL
```

or

```text
TASK-022 STATUS: BLOCKED
```

---

## Agent Behavior

- Use installed skills.
- Follow the approved TASK-021 plan.
- Use no image asset.
- Remove the unused `alicePortrait` dependency from Scene 12 metadata.
- Keep stale-cache teaching focused.
- Create review media.
- Create feedback.
- Do not start Scene 13.
- Stop after feedback.
