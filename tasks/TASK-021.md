# TASK-021 — Plan Scene 12: Stale Cache / Fast but Wrong Answer

## Objective

Plan **Scene 12 — Stale Cache: Fast but Wrong Answer** before implementation.

This is a planning / design / asset-decision task only.

Do **not** implement Scene 12 yet.

Scene 11 established that caching has tradeoffs and should not be applied blindly.

Scene 12 should now make one specific tradeoff concrete:

```text
A cached answer can be fast and still be wrong.
```

This scene should explain stale cache clearly, with a small amount of humor if it helps.

Do not start Scene 13.

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

In the feedback report, state:
- which skills were actually consulted;
- how each influenced the plan.

Do not use irrelevant skills just because they are installed.

---

## Core Teaching Goal

Explain stale cache using a simple sequence:

```text
Database value changes
→ Redis still holds the old cached value
→ Application reads Redis
→ response is fast
→ but response is outdated
```

The key point:

```text
Caching improves speed by reusing old work.
That also means the cached copy can become stale.
```

The viewer should understand:

```text
fast ≠ correct
```

in the presence of stale data.

---

## Technical Accuracy

Do not imply:
- stale cache happens on every cached request;
- Redis is incorrect by itself;
- the Database is wrong;
- cache invalidation always fails;
- the only solution is a very short TTL;
- stale data makes caching a bad idea.

The correct framing is:

```text
Once data can change, the cached copy and the source of truth can diverge.
The system needs an expiration/invalidation strategy to manage that risk.
```

Do **not** explain the full invalidation strategy here.

Scene 13 owns the deeper operational tradeoffs.

---

## Humor

A short joke is allowed and encouraged if it stays technically useful.

Possible direction:

```text
“Wrong answer. Very fast.”
```

or equivalent.

The joke should be:
- brief;
- after the stale result is established;
- not mocking the system or user;
- followed immediately by the technical takeaway.

Do not turn the scene into a meme.

---

## Visual Strategy Analysis

Compare these approaches:

### Option A — Reuse the architecture PNG

Use:

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

with captions / spotlight treatment.

Potential problem:
the existing asset is about cache-hit/miss flow, not stale-vs-fresh state.

### Option B — Reuse an existing analogy asset

Use the restaurant / ready-shelf metaphor from Scenes 05–07.

Potential mapping:

```text
Database = chef/current kitchen state
Redis = ready shelf
stale result = old item still on shelf
```

Only recommend this if an existing approved image genuinely supports the stale-data concept without reinterpretation.

### Option C — New dedicated Scene 12 infographic

A simple diagram such as:

```text
Database: value = NEW
Redis: value = OLD
Application reads Redis
→ OLD response
```

Possible visual contrast:
- Database labeled “Current”
- Redis labeled “Cached copy”
- different values / timestamps
- response marked “Fast, but stale”

### Option D — Fully Remotion-native data-state scene

Use:
- typography;
- simple React boxes;
- current-value vs cached-value comparison;
- no image asset.

For example:

```text
Database    price: $25
Redis       price: $20
```

or another neutral technical value.

Then animate:
- Database value changes;
- Redis remains unchanged;
- app reads cached value;
- response returns old value.

Analyze all four.

Recommend exactly one.

Do not create a new asset in this task.

---

## Manual Asset Workflow

If the recommendation requires a new precision-critical image:

- do not let the coding agent generate it;
- create an External Asset Request;
- stop implementation until the user approves the asset.

Suggested path if needed:

```text
public/episodes/001-redis/assets/scene-12-stale-cache.png
```

Do not create it now.

---

## Preferred Teaching Example

Choose one simple example that makes “old copy” obvious.

Possible examples:

```text
user name changed
product price changed
profile status changed
inventory value changed
```

Choose the cleanest, least distracting option.

Avoid:
- medical data;
- financial loss scenarios;
- dramatic real-world consequences.

The example should be technically neutral and easy to localize.

---

## Beat Planning

Create a concise beat plan.

Likely structure:

```text
Beat 1 — Database value changes
Beat 2 — Redis still has old value
Beat 3 — Application reads Redis
Beat 4 — stale response returns fast
Beat 5 — “Wrong answer. Very fast.”
Beat 6 — takeaway: cache needs expiration/invalidation strategy
```

But do not force this structure if a simpler plan is better.

Prefer 4–6 beats.

---

## Scene 11 Continuity

Scene 11 introduced:

```text
More stale data.
More to keep in sync.
```

Scene 12 should make that one phrase concrete.

Do not repeat all of Scene 11's other tradeoffs.

The bridge can be something like:

```text
What does “stale data” actually mean?
```

or equivalent.

---

## Localization

Plan for:

```text
en
de
fr
```

Keep labels and example values short.

If using:
- OLD / NEW;
- CURRENT / CACHED;
- WRONG / FAST;

ensure they have clean localized equivalents.

Avoid baking essential text into an image unless a new manually-approved asset is explicitly chosen.

---

## Motion / Visual Rules

Use installed animation skills and established project motion language.

Rules:
- one main idea at a time;
- no clutter;
- no glow-box / FocusBox revival;
- avoid unnecessary arrows;
- avoid dense UI;
- keep contrast strong between current value and cached value;
- use color carefully through existing theme tokens;
- no new arbitrary visual style.

If `SpotlightImage` is not needed, say so.

If using Remotion-native boxes, prefer existing design tokens and primitives.

---

## Latency Number Policy

Do not use:

```text
~8 ms
~10 ms
~180 ms
```

unless absolutely required.

The point is correctness, not speed comparison.

Prefer:

```text
fast
```

over a number.

---

## Deliverable

Create planning feedback only.

Do not:
- implement Scene 12;
- modify `src/`;
- modify assets;
- modify localization;
- modify timing;
- render production MP4;
- start Scene 13.

---

## Required Feedback Report

Create:

```text
feedbacks/task-021-feedback.md
```

It must contain:

### 1. Summary

State the recommended Scene 12 concept.

### 2. Skills Used

For each relevant installed skill:
- skill;
- how it was used;
- what decision it influenced.

### 3. Teaching Goal

Explain how the scene will teach:

```text
current Database value
cached old value
fast stale response
```

### 4. Example Choice

State the chosen stale-data example and explain why it is the clearest.

### 5. Visual Option Comparison

Compare:

```text
Option A — reuse architecture PNG
Option B — reuse analogy image
Option C — new dedicated infographic
Option D — fully Remotion-native data-state scene
```

For each:
- advantages;
- disadvantages;
- clarity;
- implementation risk.

Recommend one.

### 6. Asset Decision

State exactly one:

```text
NO NEW ASSET REQUIRED
```

or:

```text
NEW ASSET REQUIRED
```

### 7. External Asset Request

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

### 8. Beat-by-Beat Plan

For every beat report:
- approximate timing;
- visual;
- caption/message;
- emphasis/motion;
- why the beat exists.

### 9. Humor Decision

State:
- whether the “wrong answer, very fast” joke is used;
- exact wording or equivalent;
- timing;
- why it supports rather than distracts.

### 10. Correctness / Invalidation Boundary

Explicitly state:
- what Scene 12 explains;
- what is deferred to Scene 13.

### 11. Motion / Spotlight Strategy

State:
- whether `SpotlightImage` is used;
- if not, why;
- what Remotion-native components or tokens are preferred.

### 12. Localization Plan

Explain EN / DE / FR treatment, including any short labels.

### 13. Latency Number Recommendation

Confirm whether numeric latency references are avoided.

### 14. Reusable Component Notes

State whether implementation should reuse:
- existing typography tokens;
- existing card/node components;
- `BottomCaption`;
- a new local component;
- or a new shared primitive.

Do not implement anything now.

### 15. Verification Results

PASS / FAIL / NOT RUN for:

```text
installed skills consulted
Scene 11 continuity reviewed
stale-data example selected
visual options compared
asset decision made
motion plan created
humor decision made
Scene 12 / Scene 13 boundary defined
localization plan created
latency-number policy addressed
no production source changes
no asset changes
Scene 12 not implemented
Scene 13 not started
```

### 16. Git Status

Report:
- branch;
- files changed by this task;
- pre-existing changes;
- commits/pushes.

Do not commit or push.

### 17. Recommended Next Step

Use exactly one:

```text
If NEW ASSET REQUIRED:
→ generate and human-approve the Scene 12 asset before creating the implementation task.

If NO NEW ASSET REQUIRED:
→ create the Scene 12 implementation task using the approved motion plan and required installed skills.
```

### 18. Final Status

Finish with exactly one:

```text
TASK-021 STATUS: PASS
```

or

```text
TASK-021 STATUS: PARTIAL
```

or

```text
TASK-021 STATUS: BLOCKED
```

---

## Agent Behavior

- Use installed skills.
- Analyze before implementation.
- Keep stale-cache teaching focused.
- Follow the manual-asset workflow.
- Do not generate an image.
- Do not modify production code.
- Create feedback.
- Stop after feedback.
