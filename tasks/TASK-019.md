# TASK-019 — Plan Scene 11: Should We Cache Everything?

## Objective

Plan **Scene 11 — “Should We Cache Everything?”** before implementation.

This is a planning / design / asset-decision task only.

Do **not** implement Scene 11 yet.

Scene 10 established why Redis can make repeated requests much faster:

```text
prepared result
simple lookup
in-memory access
expensive Database work avoided
```

Scene 11 should now challenge the obvious overgeneralization:

```text
If caching is so fast, should we cache everything?
```

The answer should be:

```text
No.
```

But the scene must explain *why* in a concise, technically accurate way.

Do not start Scene 12.

---

## Required Installed Skills

Before analysis, explicitly consult the installed skills that apply.

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
remotion-captions
remotion-docs
remotion-studio
review-animations
```

Report in feedback:
- which skills were actually consulted;
- how each influenced the plan.

Do not use irrelevant skills just because they are installed.

---

## Core Teaching Goal

Scene 11 should establish:

```text
Caching is useful when repeated work is expensive
and reused often enough to justify keeping a cached copy.
```

But caching everything introduces cost and complexity.

At minimum consider these reasons not to cache everything:

```text
memory usage
stale data risk
invalidation complexity
cache misses still happen
not every computation is expensive enough to justify caching
```

Do not overload Scene 11 with all later tradeoff details.

This scene is a **decision filter**, not the full operational-tradeoffs scene.

Later scenes will own:
- stale data / correctness;
- expiration / invalidation mechanics;
- memory limits / monitoring / failures;
- broader operational tradeoffs.

Scene 11 should give the viewer one simple rule:

```text
Cache where avoiding repeated expensive work is worth the tradeoff.
```

---

## Tone

This scene can be slightly lighter than Scene 10.

A small visual joke is allowed, for example:

```text
“Cache everything!”
```

followed quickly by:

```text
“Not so fast.”
```

But:
- keep the joke under control;
- do not sacrifice technical clarity;
- avoid meme-heavy or childish presentation.

Recommended structure:

```text
setup
→ temptation
→ correction
→ simple decision rule
```

---

## Visual Strategy Analysis

Compare the following options:

### Option A — Reuse current architecture asset

Use:

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

with captions / spotlight treatment.

### Option B — Reuse an existing restaurant / shelf visual

Use an analogy asset from Scenes 05–07.

Potentially show:

```text
too many burgers/items piled onto the ready shelf
```

as a visual metaphor for caching everything.

### Option C — New dedicated Scene 11 image

A simple infographic such as:

```text
CACHE EVERYTHING?
```

with a cache box overflowing with:
- memory;
- stale entries;
- invalidation warnings;
- low-value items.

### Option D — Hybrid Remotion-native scene

Use:
- simple large text;
- a few existing icons/shapes/components;
- no new image asset.

Analyze all four.

Recommend exactly one.

Do not generate a new asset in this task.

---

## Manual Asset Workflow

If the recommendation requires a new precision-critical image:

- do not let the coding agent generate it;
- create an External Asset Request;
- stop implementation until the user approves the asset.

Suggested path if needed:

```text
public/episodes/001-redis/assets/scene-11-cache-everything.png
```

Do not create it now.

---

## Story / Beat Planning

Create a concise beat plan.

A likely structure:

```text
Beat 1 — “So... cache everything?”
Beat 2 — quick humorous over-caching visual
Beat 3 — memory / stale data / invalidation appear as costs
Beat 4 — not every request is expensive enough to justify caching
Beat 5 — decision rule: cache expensive repeated work where the payoff is worth it
```

But inspect the existing episode style before finalizing.

Avoid turning this scene into a checklist-heavy slide.

Prefer:
- 3–5 beats;
- one main idea at a time;
- minimal on-screen text.

---

## Technical Accuracy

Scene 11 must not imply:

```text
caching is bad
```

or:

```text
only slow Database queries should be cached
```

Caching can apply to many expensive/repeated computations or external calls.

Do not imply:
- stale data always happens;
- cache invalidation makes caching not worth using;
- memory is always the main bottleneck;
- caching guarantees speed improvements.

A better mental model:

```text
Caching trades extra complexity and memory
for less repeated work.
```

---

## Scene 10 Continuity

Scene 10 ends on:

```text
avoiding repeated work is the real reason for the speedup
```

Scene 11 should naturally follow with:

```text
Great — so why not avoid repeated work everywhere?
```

Then correct that instinct.

Do not repeat the full Scene 10 explanation.

---

## Localization

Plan for:

```text
en
de
fr
```

If the scene uses:
- large title text;
- joke text;
- tradeoff labels;

they must remain short and localization-safe.

Avoid dense copy.

---

## Motion / Visual Rules

Use established motion language:
- restrained fades;
- simple scale / push-in;
- deterministic Remotion timing;
- no hard cuts unless justified;
- no FocusBox/glow-box revival;
- no excessive badges/arrows.

If using SpotlightImage:
- explain why;
- define which region(s);
- no overlap;
- do not fix global spotlight math here.

If no SpotlightImage is needed, say so.

---

## Latency Number Policy

Do not use:
```text
~8 ms
~10 ms
~180 ms
```
unless absolutely required.

This scene is about whether caching is appropriate, not about re-proving speed.

Prefer conceptual wording.

---

## Deliverable

Create planning feedback only.

Do not:
- implement Scene 11;
- modify `src/`;
- modify assets;
- modify localization;
- modify timing;
- render production MP4;
- start Scene 12.

---

## Required Feedback Report

Create:

```text
feedbacks/task-019-feedback.md
```

It must contain:

### 1. Summary

State the recommended Scene 11 concept.

### 2. Skills Used

For each relevant installed skill:
- skill;
- how it was used;
- what decision it influenced.

### 3. Teaching Goal

Explain how the scene will communicate:

```text
why caching everything is a bad default
```

without drifting into later tradeoff scenes.

### 4. Visual Option Comparison

Compare:

```text
Option A — existing architecture image
Option B — existing analogy image
Option C — new dedicated image
Option D — Remotion-native hybrid
```

For each report:
- advantages;
- disadvantages;
- clarity;
- implementation risk.

Recommend one.

### 5. Asset Decision

State exactly one:

```text
NO NEW ASSET REQUIRED
```

or:

```text
NEW ASSET REQUIRED
```

### 6. External Asset Request

If needed, specify:
- Asset ID
- Exact path
- Purpose
- Dimensions/aspect ratio
- Composition
- Required labels
- Style
- What must not be included
- Localization constraints
- Allowed transformations
- Status: REQUIRED BEFORE IMPLEMENTATION

If no asset is required:

```text
None.
```

### 7. Beat-by-Beat Plan

For every beat report:
- approximate timing;
- visual;
- caption/message;
- motion/emphasis;
- why the beat exists.

### 8. Humor Decision

State:
- whether a joke is used;
- where;
- exact purpose;
- why it does not harm clarity.

### 9. Tradeoff Scope

Explicitly list:
- what Scene 11 introduces;
- what it intentionally leaves for Scenes 12–13.

### 10. Motion / Spotlight Strategy

State:
- whether SpotlightImage is used;
- if yes, which regions;
- if no, why it is unnecessary.

### 11. Localization Plan

Explain EN / DE / FR treatment and any phrase-shortening concerns.

### 12. Latency Number Recommendation

Confirm whether Scene 11 avoids numeric latency references.

### 13. Reusable Component Notes

State whether implementation should reuse:
- BottomCaption;
- existing title components;
- existing diagram components;
- any new reusable primitive.

Do not implement anything now.

### 14. Verification Results

PASS / FAIL / NOT RUN for:

```text
installed skills consulted
Scene 10 continuity reviewed
visual options compared
asset decision made
motion plan created
humor decision made
tradeoff boundary defined
localization plan created
latency-number policy addressed
no production source changes
no asset changes
Scene 11 not implemented
Scene 12 not started
```

### 15. Git Status

Report:
- branch;
- files changed by this task;
- pre-existing changes;
- commits/pushes.

Do not commit or push.

### 16. Recommended Next Step

Use exactly one:

```text
If NEW ASSET REQUIRED:
→ generate and human-approve the Scene 11 asset before creating the implementation task.

If NO NEW ASSET REQUIRED:
→ create the Scene 11 implementation task using the approved motion plan and required installed skills.
```

### 17. Final Status

Finish with exactly one:

```text
TASK-019 STATUS: PASS
```

or

```text
TASK-019 STATUS: PARTIAL
```

or

```text
TASK-019 STATUS: BLOCKED
```

---

## Agent Behavior

- Use the installed skills.
- Analyze before implementation.
- Keep Scene 11 concise.
- Follow the manual-asset workflow.
- Do not generate an image.
- Do not modify production code.
- Create feedback.
- Stop after feedback.
