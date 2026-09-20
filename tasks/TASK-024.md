# TASK-024 — Implement Scene 13: Operational and Design Costs of Caching

## Objective

Implement **Scene 13 — Operational and Design Costs of Caching** using the approved plan from `TASK-023`.

Scene 12 established that stale data is one concrete cost of caching.

Scene 13 should widen the lens and explain the broader operational/design responsibilities introduced by adding a cache layer.

Do **not** start Scene 14.

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

Use the approved **Option D — hybrid central-node Remotion-native scene** from TASK-023.

The scene should use:

- no image asset;
- no `SpotlightImage`;
- no architecture PNG;
- no FocusBox/glow-box;
- no new illustration.

Build the scene from:
- one small central Redis node;
- four short callouts around it;
- existing typography tokens;
- existing theme colors;
- existing motion presets;
- `interpolate()`;
- `AbsoluteFill`;
- small file-local helpers only.

The intended visual idea is:

```text
Redis in the center
→ Freshness responsibility
→ Capacity responsibility
→ Resilience responsibility
→ Operations responsibility
```

The node represents the extra stateful layer introduced by caching.

---

## Core Teaching Goal

The scene should teach four categories:

```text
Freshness
Capacity
Resilience
Operations
```

with this mapping:

```text
Freshness
→ expiration + invalidation

Capacity
→ memory usage

Resilience
→ cache misses + cache failures

Operations
→ monitoring + extra infrastructure
```

The closing mental model must be:

```text
Caching trades repeated work for extra state, infrastructure, and coordination.
```

---

## Scene 12 Continuity

Scene 12 ended with:

```text
Caching reuses old work. That’s also how it can become stale.
```

Scene 13 should begin with:

```text
And stale data is only one of the costs.
```

or a very close equivalent.

Do not repeat the Alice email example.

Do not re-explain stale-cache mechanics.

---

## Technical Accuracy

Do not imply:
- caching is usually not worth it;
- Redis is unreliable by default;
- cache invalidation is impossible;
- expiration alone solves every freshness problem;
- memory pressure always causes failure;
- cache misses are exceptional errors;
- every cache requires the exact same production strategy.

The correct framing is:

```text
Caching adds another stateful layer that must be stored,
refreshed, observed, and handled when unavailable.
```

---

## Scope Boundary

Scene 13 can mention:

```text
expiration
invalidation
memory
misses
failures
monitoring
extra infrastructure
```

Do not go into:

```text
eviction-policy details
cluster topology
replication
Sentinel
persistence modes
cache stampede mitigation
distributed locking
specific TTL tuning
metrics implementation details
```

Keep it conceptual.

---

## Duration

Keep the approved Scene 13 window:

```text
sharedWindow(14, 2)
```

Expected total:

```text
16.0s
480 frames at 30fps
```

Do not modify unrelated scene durations.

---

## Approved Beat Plan

### Beat 1 — Bridge

Approx:

```text
0.4s → 2.4s
```

Visual:
- centered text;
- dark background;
- no central node yet.

Caption:

```text
And stale data is only one of the costs.
```

Motion:
- soft fade;
- slight upward settle;
- ease-out.

---

### Beat 2 — Freshness

Approx:

```text
2.8s → 5.6s
```

Visual:
- central Redis node enters;
- Freshness callout appears;
- only one callout visible at a time.

Label:

```text
Freshness
```

Caption:

```text
It needs expiration and invalidation — so data does not sit unchecked forever.
```

Motion:
- central node fades/settles in once;
- Freshness callout fades in;
- small central-node scale pulse `1 → 1.06 → 1`;
- no arrows/connecting lines.

---

### Beat 3 — Capacity

Approx:

```text
6.0s → 8.4s
```

Visual:
- central node remains;
- Freshness fades out;
- Capacity appears in a different position.

Label:

```text
Capacity
```

Caption:

```text
It consumes memory — and memory is not infinite.
```

Motion:
- same restrained callout transition;
- small central-node pulse.

---

### Beat 4 — Resilience

Approx:

```text
8.8s → 11.2s
```

Visual:
- central node remains;
- Capacity fades out;
- Resilience appears.

Label:

```text
Resilience
```

Caption:

```text
Sometimes it misses. Sometimes it fails. Both need a plan.
```

This must not imply misses or failures are exceptional errors.

Motion:
- same pattern;
- small central-node pulse.

---

### Beat 5 — Operations

Approx:

```text
11.6s → 14.0s
```

Visual:
- central node remains;
- Resilience fades out;
- Operations appears.

Label:

```text
Operations
```

Caption:

```text
Someone has to watch it, and something has to run it.
```

Motion:
- same callout transition;
- small central-node pulse.

---

### Beat 6 — Closing mental model

Approx:

```text
14.4s → 16.0s
```

Visual:
- central Redis node remains;
- the four callout labels may become faintly visible around it, or fade low enough that the closing line dominates;
- do not let all four compete visually with the closing sentence.

Caption:

```text
Caching trades repeated work for extra state, infrastructure, and coordination.
```

Motion:
- gentle fade/scale;
- hold to the scene boundary.

---

## Central Redis Node Design

Model the central node on the existing Scene 01 cache-node visual language.

Reuse:
- the existing cache accent color;
- stack-icon vocabulary;
- existing typography tokens.

Keep it simple:

```text
[stack icon]
Redis
```

Do not build a detailed Redis logo.

Do not add:
- arrows;
- spokes;
- borders connecting callouts;
- gradients that create a new visual style;
- glossy UI.

---

## Callout Design

Create one file-local reusable callout component for all four categories.

Each callout should contain:

```text
category label
short explanatory caption
```

No icon grid is required.

At most one callout should be fully active at a time during Beats 2–5.

Suggested spatial positions:

```text
Freshness  → top
Capacity   → right
Resilience → bottom
Operations → left
```

The exact positions may be tuned for balance and localization safety.

Do not let callouts overlap the central node.

---

## Tone

No humor.

Scene 13 should feel calm and matter-of-fact:

```text
Here is the cost side of the tradeoff.
```

Do not make caching feel scary or reckless.

---

## Motion Design

Use established project motion:

- `interpolate()`;
- shared ease-out bezier;
- existing `motionPresets`;
- `enterSoft`;
- `emphasizeScale`;
- no spring/bounce;
- no `scale(0)`;
- no hard cuts;
- no CSS `transition: all`.

Each new callout entrance should be paired with a subtle Redis-node pulse.

No simultaneous active callouts during the explanatory beats.

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
- bridge;
- four category labels;
- four category captions;
- closing mental model.

Suggested key family:

```text
cacheCostsBridge
cacheCostsFreshness
cacheCostsFreshnessCaption
cacheCostsCapacity
cacheCostsCapacityCaption
cacheCostsResilience
cacheCostsResilienceCaption
cacheCostsOperations
cacheCostsOperationsCaption
cacheCostsClosing
```

Choose natural translations, not awkward literal ones.

Render dedicated DE/FR stills for:
- category layouts as needed;
- closing mental model.

---

## Numeric Latency Policy

Do not use:

```text
~8 ms
~10 ms
~180 ms
```

Scene 13 is about tradeoffs, not performance measurement.

---

## Metadata Update

Update Scene 13 metadata to match the approved grouping.

Replace the old overlapping groupings with:

```text
Freshness
Capacity
Resilience
Operations
```

and update `storyBeats` / `visualNotes` accordingly.

Do not modify Scene 14 metadata.

---

## Review Artifacts

Render:

```text
renders/review/task-024/scene-13-start.png
renders/review/task-024/scene-13-freshness.png
renders/review/task-024/scene-13-capacity.png
renders/review/task-024/scene-13-resilience.png
renders/review/task-024/scene-13-operations.png
renders/review/task-024/scene-13-end.png
renders/review/task-024/scene-13-preview.mp4
```

Localization checks:

```text
renders/review/task-024/scene-13-de-freshness.png
renders/review/task-024/scene-13-fr-freshness.png
renders/review/task-024/scene-13-de-resilience.png
renders/review/task-024/scene-13-fr-resilience.png
renders/review/task-024/scene-13-de-closing.png
renders/review/task-024/scene-13-fr-closing.png
```

Regression stills:

```text
renders/review/task-024/scene-12-regression.png
renders/review/task-024/scene-11-regression.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the bridge from Scene 12 feels natural;
2. whether the central Redis node is simple and readable;
3. whether Freshness clearly communicates expiration/invalidation responsibility;
4. whether Capacity clearly communicates finite memory;
5. whether Resilience correctly frames misses/failures without making them sound catastrophic;
6. whether Operations clearly communicates monitoring/infrastructure;
7. whether the four callout positions feel balanced;
8. whether the central-node pulse feels restrained;
9. whether the closing mental model unifies the four categories;
10. whether EN/DE/FR remain legible;
11. whether Scene 13 is ready to proceed to Scene 14.

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
Scene 13 start
Freshness
Capacity
Resilience
Operations
closing
Scene 13 MP4
localization checks
Scene 12 regression
Scene 11 regression
no image asset dependency
no SpotlightImage
review-animations QA
```

---

## Acceptance Criteria

TASK-024 is complete only when:

- [ ] Scene 13 exists and renders.
- [ ] No image asset is used.
- [ ] No `SpotlightImage` is used.
- [ ] Central Redis node is implemented using existing visual vocabulary.
- [ ] Freshness beat is implemented.
- [ ] Capacity beat is implemented.
- [ ] Resilience beat is implemented.
- [ ] Operations beat is implemented.
- [ ] One callout is active at a time during explanatory beats.
- [ ] Closing mental model is implemented.
- [ ] Scene 13 metadata uses Freshness / Capacity / Resilience / Operations grouping.
- [ ] Scene does not become a dense checklist/dashboard.
- [ ] Scene does not imply caching is bad or Redis is unreliable by default.
- [ ] No numeric latency references are used.
- [ ] No FocusBox/glow-box treatment is introduced.
- [ ] EN/DE/FR render correctly.
- [ ] Required review artifacts are rendered.
- [ ] Scene 12 regression passes.
- [ ] Scene 11 regression passes.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `review-animations` QA completed.
- [ ] Human review status is PENDING.
- [ ] `feedbacks/task-024-feedback.md` is created.
- [ ] Scene 14 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-024-feedback.md
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
- central Redis node;
- four callouts;
- no image;
- no SpotlightImage.

### 4. Tradeoff Grouping
Document the final mapping:
- Freshness;
- Capacity;
- Resilience;
- Operations.

### 5. Teaching Structure
Explain how each beat communicates its responsibility category.

### 6. Central Node Design
Report:
- visual tokens;
- icon treatment;
- labels;
- motion.

### 7. Callout Design
Report:
- positions;
- typography;
- active-state behavior;
- whether only one callout is fully active at a time.

### 8. Timing
Report every beat timing and total duration.

### 9. Localization
Report:
- EN;
- DE;
- FR;
- final category translations;
- any shortened equivalents;
- overflow/wrapping findings.

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
- Freshness
- Capacity
- Resilience
- Operations
- closing
- Scene 13 MP4
- localization checks
- Scene 12 regression
- Scene 11 regression
- no image asset
- no SpotlightImage
- review-animations QA

### 14. Problems / Risks
Report remaining concerns.

### 15. Recommended Next Step

Use exactly:

```text
If Scene 13 is human-approved:
→ plan Scene 14: final mental-model recap.

If Scene 13 is not approved:
→ revise only the rejected Scene 13 grouping, wording, callout layout, or motion.
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
TASK-024 STATUS: PASS
```

or

```text
TASK-024 STATUS: PARTIAL
```

or

```text
TASK-024 STATUS: BLOCKED
```

---

## Agent Behavior

- Use installed skills.
- Follow the approved TASK-023 plan.
- Use no image asset.
- Keep the scene focused on operational/design costs.
- Keep the callout layout restrained.
- Create review media.
- Create feedback.
- Do not start Scene 14.
- Stop after feedback.
