# TASK-017 — Plan Scene 10: Why Redis Is Fast + Asset Decision

## Objective

Plan **Scene 10 — Why Redis Is Fast** before implementation.

Do **not** implement Scene 10 yet.

This is a planning / design / asset-decision task.

The goal is to define the clearest visual explanation for:

```text
Redis is fast here because the application can reuse a prepared result,
look it up simply in memory, and avoid repeating expensive database work.
```

The scene must **not** oversimplify the explanation into:

```text
Redis is fast because RAM is fast and databases are slow.
```

The key mental model is:

```text
The biggest win is not that Redis made the Database faster.
The biggest win is that Redis let us avoid repeating the expensive work.
```

---

## Required Installed Skills

Before doing the analysis, explicitly use the installed skills that apply.

Required:

```text
technical-story-video
remotion-best-practices
remotion-markup
frontend-design
animate
```

Use when relevant:

```text
remotion-docs
remotion-studio
review-animations
```

Do not use irrelevant skills merely because they are installed.

Report in feedback which skills were actually consulted and what each contributed.

---

## Context From Previous Scene

Scene 09 established:

```text
same request again
→ Application checks Redis
→ cache hit
→ Database skipped
→ cached result returns
→ faster response
```

Scene 10 should now answer:

```text
Why is that path so much faster?
```

Do not re-explain the full cache-hit path.

Do not move into stale cache, invalidation, expiration, or tradeoffs yet.

---

## Core Technical Points To Communicate

At minimum, the scene should explain these ideas:

### 1. Prepared result

Redis can already hold the result in a form that is ready to return.

The application does not need to rebuild that result through the same expensive Database work.

### 2. In-memory access

Redis operates in memory, so lookup latency is typically very low.

But do **not** present this as the only reason for the speedup.

### 3. Simple lookup

A cache hit is a direct key-based lookup.

The request does not need to repeat complex Database work.

### 4. Avoided Database work

This is the most important point.

The expensive Database processing that dominated the original ~180 ms path is skipped.

### 5. Correct mental model

End the scene with something close to:

```text
Redis is fast here because we reused work that was already done.
```

or:

```text
The speedup comes from avoiding repeated work, not from making the Database itself faster.
```

---

## Important Technical Accuracy

Do not imply:

```text
Database = disk and therefore slow
Redis = RAM and therefore fast
```

That is too simplistic and technically misleading.

Do not imply:
- Redis always beats every Database operation;
- Redis eliminates the Database;
- cached data is always fresh;
- every request is a cache hit.

---

## Latency Number Policy

TASK-016 surfaced a visible discrepancy between:

```text
episode example: ~8 ms
baked architecture image: ~10 ms
```

Do not introduce a new numeric latency comparison in Scene 10 unless there is a clear reason.

Prefer a conceptual explanation:

```text
fast cache lookup
vs.
expensive Database work avoided
```

If the scene needs a number, explicitly report the recommendation in feedback before implementation.

Do not silently choose between `~8 ms` and `~10 ms`.

---

## Visual Design Analysis

Inspect the current episode assets and existing scene style.

Decide whether Scene 10 should use:

### Option A — Existing technical architecture asset

Reuse:

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

with a new spotlight/motion treatment.

### Option B — New dedicated Scene 10 infographic image

Create a dedicated explanatory image focused only on:

```text
Prepared result
In-memory lookup
Simple key lookup
Database work skipped
```

### Option C — Hybrid

Use one approved still image plus Remotion-native labels/callouts around it.

Analyze all three and recommend one.

Do not create the image in this task.

---

## Manual Asset Workflow

If the recommended approach requires a new precision-critical image:

- do not let the coding agent generate it;
- create an `External Asset Request` in the feedback;
- specify exact composition requirements;
- stop implementation until the user approves and manually adds the asset.

Suggested asset path if needed:

```text
public/episodes/001-redis/assets/scene-10-why-redis-fast.png
```

Do not invent additional asset paths unless necessary.

---

## Motion Design Plan

Create a simple beat-by-beat plan.

A likely structure could be:

```text
Beat 1 — Cache hit result already exists
Beat 2 — Simple Redis lookup
Beat 3 — Expensive Database work stays dim / skipped
Beat 4 — Compare “lookup” vs “work avoided”
Beat 5 — Closing mental model
```

But do not blindly use this structure.

Inspect the actual existing style and propose the clearest plan.

Rules:
- one primary focus at a time;
- no accumulated highlights;
- use SpotlightImage where image-based emphasis is needed;
- no glow-box / FocusBox revival;
- restrained motion;
- no unnecessary arrows/shapes;
- clarity over spectacle.

---

## Spotlight / Component Reuse

If the scene will reuse `SpotlightImage`, analyze:

- target regions needed;
- whether existing Scene 07/08/09 regions can be reused;
- whether Scene 10 needs new normalized regions;
- whether the known `featherPaddingFactor` radius/diameter technical debt matters here.

Do not fix the global SpotlightImage math in this task.

---

## Localization

Plan for:

```text
en
de
fr
```

Any new Remotion-rendered captions/callouts must use the localization system.

If a reused asset contains baked English text, document the limitation.

---

## Deliverable

Create a planning report only.

Do not:
- implement Scene 10;
- modify `src/`;
- modify assets;
- modify localization;
- modify scene timing;
- render a production MP4;
- start Scene 11.

---

## Required Feedback Report

Create:

```text
feedbacks/task-017-feedback.md
```

It must contain:

### 1. Summary

State the recommended Scene 10 concept.

### 2. Skills Used

For each relevant installed skill, report:

```text
skill
how it was used
what decision it influenced
```

### 3. Technical Teaching Goal

Explain how the scene will communicate:

```text
prepared result
in-memory access
simple lookup
avoided Database work
```

and which of these should receive the strongest emphasis.

### 4. Visual Approach Comparison

Compare:

```text
Option A — reuse architecture image
Option B — new dedicated Scene 10 image
Option C — hybrid
```

For each, report:
- advantages;
- disadvantages;
- implementation risk;
- clarity.

Then recommend one.

### 5. Asset Decision

State exactly one:

```text
NO NEW ASSET REQUIRED
```

or:

```text
NEW ASSET REQUIRED
```

If new asset required, include a complete External Asset Request.

### 6. External Asset Request

If applicable, specify:

```text
Asset ID
Exact path
Purpose
Dimensions/aspect ratio
Composition
Required labels
Style
What must NOT be included
Localization constraints
Allowed transformations
Status: REQUIRED BEFORE IMPLEMENTATION
```

If no asset is required:

```text
None.
```

### 7. Beat-by-Beat Motion Plan

For every beat report:
- approximate timing;
- visual;
- spotlight target if any;
- caption/message;
- why the beat exists.

### 8. Spotlight Strategy

Report:
- whether SpotlightImage should be used;
- which regions would be active;
- any local tuning concerns;
- whether the known mask-sizing issue affects this scene.

### 9. Localization Plan

Explain EN / DE / FR treatment.

### 10. Latency Number Recommendation

Explicitly address the:

```text
~8 ms vs ~10 ms
```

discrepancy.

Recommend whether Scene 10 should:
- avoid numbers;
- use one number;
- require an asset correction first.

Do not modify anything.

### 11. Scene Boundary

State what Scene 10 should cover and what it must leave for later scenes.

### 12. Documentation / Reusable Component Notes

Report whether any reusable component/pattern should be introduced during the future implementation task.

Do not implement it now.

### 13. Verification Results

PASS / FAIL / NOT RUN for:

```text
installed skills consulted
existing assets reviewed
Scene 09 continuity reviewed
visual options compared
asset decision made
motion plan created
localization plan created
latency discrepancy addressed
no production source changes
no asset changes
Scene 10 not implemented
Scene 11 not started
```

### 14. Git Status

Report:
- branch;
- files changed by this task;
- pre-existing changes;
- commits/pushes.

Do not commit or push.

### 15. Recommended Next Step

Use exactly one of:

```text
If NEW ASSET REQUIRED:
→ generate and human-approve the Scene 10 asset before creating the implementation task.

If NO NEW ASSET REQUIRED:
→ create the Scene 10 implementation task using the approved motion plan and required installed skills.
```

### 16. Final Status

Finish with exactly one:

```text
TASK-017 STATUS: PASS
```

or

```text
TASK-017 STATUS: PARTIAL
```

or

```text
TASK-017 STATUS: BLOCKED
```

---

## Agent Behavior

- Use the installed skills.
- Analyze before implementation.
- Follow the manual-asset workflow.
- Do not generate an image.
- Do not modify production code.
- Create feedback.
- Stop after feedback.
