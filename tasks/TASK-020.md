# TASK-020 — Implement Scene 11: Should We Cache Everything?

## Objective

Implement **Scene 11 — “Should We Cache Everything?”** using the approved plan from `TASK-019`.

This scene should challenge the obvious overgeneralization after Scene 10:

```text
If caching is so useful, should we cache everything?
```

The answer is:

```text
No.
```

But the scene must explain why without drifting into the deeper stale-cache and operational-tradeoff scenes that follow.

Do not start Scene 12.

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

Use the approved **Option D — fully Remotion-native typography-driven scene** from TASK-019.

This scene should use:

- no image asset;
- no `SpotlightImage`;
- no FocusBox;
- no architecture PNG;
- no restaurant image;
- no character illustration.

Use the existing project visual vocabulary:

```text
typography tokens
theme colors
Interactive.Div
interpolate()
motionPresets
```

Use Scene 01 as the visual precedent.

Do not create a new reusable component unless absolutely necessary.

---

## Asset Cleanup

The current Scene 11 manifest entry reportedly still lists:

```text
assetIds: ['developer']
```

The `developer` asset is a placeholder with no file.

Because this implementation uses no asset:

```text
update Scene 11 assetIds to []
```

Do not:
- generate the developer asset;
- resolve the placeholder;
- create a new image;
- block on a missing character asset.

This is an intentional removal of an unused placeholder dependency.

---

## Core Teaching Goal

Communicate:

```text
Caching trades memory and complexity
for less repeated work.
```

Scene 11 should briefly introduce:

- memory usage;
- stale data risk;
- invalidation/synchronization complexity;
- cache misses still happen;
- not every request/computation is expensive enough to justify caching.

Do not explain the mechanisms in depth.

The closing rule is:

```text
Cache where avoiding repeated expensive work is worth the tradeoff.
```

---

## Scope Boundary

Scene 11 introduces concerns only at a high level.

Leave for later scenes:

### Scene 12
- what stale data actually means;
- how a fast answer can still be wrong.

### Scene 13
- expiration;
- invalidation mechanics;
- eviction;
- memory limits;
- monitoring;
- failures;
- infrastructure/operational costs.

Do not duplicate those scenes here.

---

## Duration

The current Scene 11 timing is too short for the approved 5-beat plan.

Update Scene 11 to:

```text
sharedWindow(9, 2)
```

Expected total:

```text
11.0s
330 frames at 30fps
```

Adjust only Scene 11's own window and total episode duration accordingly.

Do not modify unrelated scene durations.

---

## Approved Beat Plan

### Beat 1 — Setup / bridge

Approx:

```text
0.4s → 2.0s
```

Visual:
- centered text;
- dark background;
- no image.

Text:

```text
So... why not avoid repeated work everywhere?
```

Motion:
- soft fade;
- slight upward settle;
- ease-out.

Purpose:
- bridges directly from Scene 10;
- avoids repeating latency numbers.

---

### Beat 2 — Temptation + correction

Approx:

```text
2.4s → 4.2s
```

First:

```text
CACHE EVERYTHING!
```

Use:
- large display text;
- strong visual emphasis;
- quick scale-in from roughly `0.88 → 1`;
- no bounce/spring;
- no hard cut.

Then quickly transition to:

```text
Not so fast.
```

The joke should remain brief.

This is the scene's only humorous beat.

---

### Beat 3 — Costs

Approx:

```text
4.6s → 6.8s
```

Text:

```text
More memory. More stale data. More to keep in sync.
```

Use plain centered text.

Do not split this into cards/chips/badges.

Do not over-design.

---

### Beat 4 — Not every request qualifies

Approx:

```text
7.2s → 9.0s
```

Text:

```text
Not every request is expensive enough to justify caching — and misses still happen.
```

Keep this as one clear explanatory beat.

If localization makes the line too long, use a shorter equivalent that preserves both ideas:

```text
not every request is worth caching
misses still happen
```

Do not change the technical meaning.

---

### Beat 5 — Decision rule / closing

Approx:

```text
9.4s → 10.8s
```

Text:

```text
Cache where avoiding repeated expensive work is worth the tradeoff.
```

Give this slightly more visual weight than Beats 3–4.

Use:
- scene-title-like typography;
- gentle fade/scale;
- hold to the scene boundary.

This should be the scene's takeaway.

---

## Humor Rules

The only joke is:

```text
CACHE EVERYTHING!
→ Not so fast.
```

Keep it:
- under ~2 seconds total;
- purely typographic;
- technically harmless;
- immediately followed by the actual explanation.

Do not add:
- character reaction;
- meme image;
- sound effect;
- bouncing text;
- goofy motion.

---

## Motion Design

Use established project motion:

- `interpolate()`;
- ease-out curves;
- existing `motionPresets`;
- subtle scale / fade;
- no `scale(0)`;
- no CSS-style `transition: all`;
- no new custom spring unless absolutely necessary.

Use `review-animations` before declaring the task complete.

---

## Localization

Support:

```text
en
de
fr
```

Add translation keys for:

```text
cacheEverythingBridge
cacheEverythingPunch
cacheEverythingCorrection
cacheEverythingCosts
cacheEverythingNotEveryRequest
cacheEverythingDecisionRule
```

All text must remain localization-safe.

Render dedicated DE/FR review stills for:
- punch line;
- long explanatory beat;
- closing decision rule.

If the punch line needs a natural localized equivalent instead of a literal translation, preserve the same energy and meaning.

---

## Numeric Latency Policy

Do not use:

```text
~8 ms
~10 ms
~180 ms
```

in Scene 11.

Do not reuse the current numeric recap from the old Scene 11 outline.

This scene is conceptual, not numeric.

---

## Existing Scene Metadata

Update Scene 11 metadata to match the implementation:

- assetIds: `[]`;
- story beats should reflect the new 5-beat structure rather than the old two-beat numeric recap;
- visual notes should describe the typography-driven scene.

Do not modify Scene 12+ metadata beyond what is required for episode duration consistency.

---

## Review Artifacts

Render:

```text
renders/review/task-020/scene-11-start.png
renders/review/task-020/scene-11-cache-everything.png
renders/review/task-020/scene-11-not-so-fast.png
renders/review/task-020/scene-11-costs.png
renders/review/task-020/scene-11-not-every-request.png
renders/review/task-020/scene-11-decision-rule.png
renders/review/task-020/scene-11-preview.mp4
```

Also render localization checks:

```text
renders/review/task-020/scene-11-de-punch.png
renders/review/task-020/scene-11-fr-punch.png
renders/review/task-020/scene-11-de-long-line.png
renders/review/task-020/scene-11-fr-long-line.png
renders/review/task-020/scene-11-de-closing.png
renders/review/task-020/scene-11-fr-closing.png
```

Regression stills:

```text
renders/review/task-020/scene-10-regression.png
renders/review/task-020/scene-09-regression.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the Scene 10 → Scene 11 bridge feels natural;
2. whether “CACHE EVERYTHING!” lands as a quick joke rather than a distraction;
3. whether “Not so fast.” corrects the idea immediately;
4. whether the costs beat is understandable without becoming a checklist slide;
5. whether the long “not every request...” line is readable at normal speed;
6. whether the closing rule is clear and memorable;
7. whether the scene feels visually consistent with Scene 01 despite being image-free;
8. whether the scene successfully changes tone after four architecture-heavy scenes;
9. whether EN/DE/FR stay legible;
10. whether Scene 11 is ready to proceed to Scene 12.

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
Scene 11 start
CACHE EVERYTHING
Not so fast
costs beat
not-every-request beat
decision rule
Scene 11 MP4
DE/FR localization stills
Scene 10 regression
Scene 09 regression
no asset resolution error
no placeholder developer dependency
```

---

## Acceptance Criteria

TASK-020 is complete only when:

- [ ] Scene 11 exists and renders.
- [ ] No image asset is used.
- [ ] `assetIds` for Scene 11 is `[]`.
- [ ] Placeholder `developer` asset is not required.
- [ ] Scene duration is updated to 11.0s / 330 frames.
- [ ] Only Scene 11 timing is changed.
- [ ] Bridge beat implemented.
- [ ] “CACHE EVERYTHING!” joke implemented.
- [ ] “Not so fast.” correction implemented.
- [ ] Memory/stale/sync costs named concisely.
- [ ] Not-every-request / cache-miss point included.
- [ ] Decision rule closes the scene.
- [ ] No numeric latency references are used.
- [ ] No SpotlightImage is used.
- [ ] No FocusBox/glow-box treatment is introduced.
- [ ] Motion uses existing project tokens/presets.
- [ ] EN/DE/FR render correctly.
- [ ] Required review artifacts are rendered.
- [ ] Scene 10 regression passes.
- [ ] Scene 09 regression passes.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `review-animations` QA completed.
- [ ] Human review status is PENDING.
- [ ] `feedbacks/task-020-feedback.md` is created.
- [ ] Scene 12 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-020-feedback.md
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
- no new visual primitive unless unavoidable.

### 4. Asset Cleanup
Report:
- removal of Scene 11 `developer` dependency;
- final `assetIds`;
- whether the placeholder asset remains untouched.

### 5. Teaching Structure
Explain:
- bridge;
- temptation;
- correction;
- costs;
- qualification;
- decision rule.

### 6. Humor Treatment
Explain:
- exact joke;
- timing;
- motion;
- why clarity is preserved.

### 7. Timing
Report every beat timing and total duration.

### 8. Localization
Report:
- EN;
- DE;
- FR;
- any shortened equivalents;
- punch-line translation treatment;
- overflow/wrapping findings.

### 9. Numeric Latency Policy
Confirm:
- no `~8 ms`;
- no `~10 ms`;
- no `~180 ms`;
- old numeric recap removed from Scene 11 metadata if present.

### 10. Review Artifacts
List exact paths.

### 11. Human Review Requests
For every artifact include:
- Artifact;
- Purpose;
- What to review;
- Agent assessment;
- Known issues;
- Human review status: PENDING.

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
- start
- CACHE EVERYTHING
- Not so fast
- costs
- not-every-request
- decision rule
- Scene 11 MP4
- localization checks
- Scene 10 regression
- Scene 09 regression
- no placeholder developer dependency
- review-animations QA

### 13. Problems / Risks
Report remaining concerns.

### 14. Recommended Next Step

Use exactly:

```text
If Scene 11 is human-approved:
→ plan Scene 12: stale cache / fast but wrong answer.

If Scene 11 is not approved:
→ revise only the rejected Scene 11 timing, wording, humor beat, or typography treatment.
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
TASK-020 STATUS: PASS
```

or

```text
TASK-020 STATUS: PARTIAL
```

or

```text
TASK-020 STATUS: BLOCKED
```

---

## Agent Behavior

- Use installed skills.
- Follow the approved TASK-019 plan.
- Use no image asset.
- Remove the unused developer placeholder dependency from Scene 11 metadata.
- Keep the scene concise.
- Create review media.
- Create feedback.
- Do not start Scene 12.
- Stop after feedback.
