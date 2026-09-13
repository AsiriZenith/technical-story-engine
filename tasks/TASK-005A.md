# TASK-005A — Revise Scene 01 Diagram Language Using Approved Reference Direction

## Objective

Revise **Scene 01 — The 180 ms → 8 ms Mystery** based on human review feedback.

Do **not** begin Scene 02.

The revision target is the **diagram language**, especially the mid-state where Redis is introduced.

The human review direction is:

- Keep the **background and overall visual vibe** from the current Scene 01.
- Change the **diagram/architecture presentation** to follow the visual logic of the reviewed reference.
- Use the **diagram only** from the reference direction — do **not** copy its background.
- Preserve the current scene goal, pacing intent, and mystery framing unless a diagram revision requires small timing adjustments.

---

## Human Review Decision

Scene 01 is **not yet approved**.

Revision required:

```text
Use the current Scene 01 background/vibe,
but redesign the architecture diagram in the direction
of the reviewed reference diagram.
```

Interpretation:

## Reference Image

Use this reference image for structural inspiration:

`public/episodes/001-redis/reference/architecture-flow-reference.png`

Important:
- treat this file as reference-only;
- do not render this image directly in the final scene;
- do not copy its background;
- do not copy its exact visual styling;
- preserve the existing Scene 01 background and overall vibe;
- borrow only the diagram-flow structure, directional clarity, and architecture relationships;
- recreate the revised diagram natively in Remotion/React.

### Preserve
- dark technical background/grid from current scene;
- current overall production vibe;
- `GET /users/42`;
- `180 ms`;
- `8 ms`;
- final `180 ms → 8 ms`;
- final “What changed?” mystery ending;
- EN/DE/FR support;
- no narration/audio;
- no external assets.

### Change
- the current node/flow diagram structure and visual treatment;
- the Redis-introduction frame and related diagram states;
- architecture communication clarity;
- the path/flow readability.

---

## Design Direction From Human Feedback

The reviewed reference suggests a clearer system-flow diagram.

Adopt these useful properties from the reference direction:

- clearer flow arrows;
- more explicit directional movement;
- stronger center structure;
- more obvious relationship between user/request, app/server, Redis, and downstream system;
- visually clearer system-diagram feeling rather than isolated boxes only;
- stronger architecture readability in the mid state.

Do **not** copy the reference literally.

Do **not** replace the background.

Do **not** introduce the reference’s separate background style.

Do **not** introduce visual clutter or many numbered step circles unless they materially help clarity.

The goal is to translate the **diagram clarity** of the reference into our established Scene 01 aesthetic.

---

## Scope

Revise only Scene 01 and its related review artifacts.

Do not implement Scene 02.

Do not create external asset requests.

Do not generate images or video from outside tools.

This revision must remain achievable fully in Remotion.

---

## Part A — Diagram Revision Requirements

Revise the architecture presentation so that the scene more clearly communicates:

### Before Redis
A path equivalent to:

```text
Request / User
→ Application
→ Database
→ Response
```

### After Redis appears
A path equivalent to:

```text
Request / User
→ Application
→ Redis
→ Response
```

while still visually implying that Database remains part of the system reality, not that it vanished from existence.

The design should reduce ambiguity around:

```text
Did Redis make the database faster?
```

We still want mystery, but not confusion.

Redis should read as a **new stop in the architecture** rather than merely another floating box.

---

## Part B — Visual Translation Rule

Use the reference diagram as **structural inspiration**, not as a style transplant.

Translate its strengths into the current visual system:

### Keep from current scene
- background;
- palette family;
- typography direction;
- glow/border language where still useful;
- overall technical-video vibe.

### Borrow conceptually from reference
- clearer directional diagram layout;
- stronger architecture centrality;
- clearer arrows / path relationships;
- stronger flow readability.

If useful, the revised scene may move closer to a centered flow-diagram composition rather than the existing left-to-right box lineup.

But it must still support:
- the 180 ms setup;
- the Redis entrance;
- the 8 ms reveal;
- the final `180 ms → 8 ms` hold.

---

## Part C — Mid-State Priority

The highest-priority revision target is the mid image / Redis introduction state.

That state must feel closer to:

```text
clear architecture diagram
```

and less like:

```text
just another labeled box inserted into a row
```

Specific goals:

- Redis should feel architecturally meaningful;
- path relationships should be clearer;
- Database should still be legible as source-of-truth / expensive-work side;
- the viewer should more clearly understand that the request path changed.

---

## Part D — Typography and Labels

Keep the current good parts unless the revised diagram forces small improvements.

However, address these prior issues if possible:

- Redis role label should no longer feel cramped.
- Architecture labels should avoid awkward wrapping where possible.
- German/French layout safety must still be checked.

Do not overload the diagram with too much tiny text.

Use fewer, stronger labels if that improves clarity.

---

## Part E — Motion and Timing

Keep the scene silent-first.

Preserve the overall pacing goal, but small timing changes are allowed if the revised diagram requires them.

The scene should still approximately do:

```text
request enters
→ 180 ms setup
→ Redis enters / path changes
→ repeated request travels
→ 8 ms appears
→ 180 ms → 8 ms
→ What changed?
```

If timing changes are made, explain why.

Do not change pacing gratuitously.

---

## Part F — Review Artifacts

Regenerate human-review artifacts for the revised scene.

Required:

```text
renders/review/task-005a/scene-01-start.png
renders/review/task-005a/scene-01-mid.png
renders/review/task-005a/scene-01-8ms.png
renders/review/task-005a/scene-01-end.png
renders/review/task-005a/scene-01-preview.mp4
```

Also include:

```text
renders/review/task-005a/scene-01-mid-de.png
renders/review/task-005a/scene-01-mid-fr.png
```

if the revised diagram introduces new localization pressure.

All review media must remain ignored by Git.

---

## Part G — Human Review Requests

The feedback report must explicitly say that this revision was driven by human feedback:

```text
Replace the diagram language with a structure closer to the reviewed reference,
while keeping the original Scene 01 background and overall vibe.
```

Ask the user to review:

1. whether the new diagram is clearer;
2. whether the background/vibe was preserved;
3. whether Redis now feels like part of a meaningful path;
4. whether the diagram is more professional and understandable;
5. whether the 180 ms → 8 ms mystery remains strong;
6. whether the revised motion still feels restrained.

Human review status remains:

```text
PENDING
```

---

## Part H — External Asset Requests

Expected:

```text
None.
```

This revision should be fully achievable in Remotion.

---

## Part I — Validation

Run and record:

- typecheck;
- build;
- composition discovery;
- scene validation;
- asset validation;
- Redis-EN stills;
- Redis-DE check if affected;
- Redis-FR check if affected;
- revised Scene 01 MP4 render.

---

## Acceptance Criteria

TASK-005A is complete only when:

- [ ] Scene 01 is revised rather than Scene 02 being started.
- [ ] The current background/vibe is preserved.
- [ ] The diagram direction is revised to match the structural clarity of the reviewed reference.
- [ ] The revision uses the reference diagram only as structural inspiration, not as a background/style replacement.
- [ ] Redis is more clearly integrated into a meaningful architecture path.
- [ ] Mid-state readability is improved.
- [ ] `180 ms`, `8 ms`, and `180 ms → 8 ms` remain strong.
- [ ] EN/DE/FR support remains intact.
- [ ] Required review artifacts are rerendered.
- [ ] Human Review Requests section is included.
- [ ] External Asset Requests section says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `feedbacks/task-005a-feedback.md` is created.
- [ ] The reference image is used only as guidance and is not included as a runtime production asset.

---

## Required Feedback Report

Create:

```text
feedbacks/task-005a-feedback.md
```

It must contain:

### 1. Summary
What was revised.

### 2. Human Feedback Incorporated
Quote/summarize the human direction:
- keep current background/vibe;
- revise the diagram toward the reviewed reference diagram.

### 3. Scene Revision
Explain:
- diagram changes;
- what was preserved;
- what was changed;
- any timing changes.

### 4. Human Review Requests
For each review artifact include:
- Artifact
- Type
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 5. External Asset Requests
Expected:
```text
None.
```

### 6. Review Artifacts
List exact paths.

### 7. Verification Results
PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- revised start still
- revised mid still
- revised 8 ms still
- revised end still
- revised MP4

### 8. Problems / Risks
Include:
- localization pressure;
- diagram clarity tradeoffs;
- pacing impact;
- technical ambiguity still remaining.

### 9. Recommended Next Step
Conditionally:
- if approved, proceed to Scene 02;
- if not approved, revise Scene 01 again.

### 10. Final Status
Finish with exactly one:
```text
TASK-005A STATUS: PASS
```
or
```text
TASK-005A STATUS: PARTIAL
```
or
```text
TASK-005A STATUS: BLOCKED
```

---

## Agent Behavior

- Do not start Scene 02.
- Preserve the approved background/vibe.
- Revise the diagram only.
- Use the reference direction as structural inspiration, not a direct copy.
- Render review media.
- Inspect your own output.
- Mark human review PENDING.
- Stop after writing the feedback.
