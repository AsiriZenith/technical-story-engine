# TASK-006A — Remove Development Scene Caption from Production Output

## Objective

Make one targeted revision to Scene 02.

Human review approved the scene visually except for the lower-left development caption:

```text
Scene 02 · 17s
```

This text must **not appear in the production video**.

Do not make any other visual, timing, layout, animation, localization, or architecture changes unless required to remove this caption safely.

---

## Human Review Decision

Approved:
- Scene 02 visual design
- timing bar
- typography
- motion
- background/vibe
- pacing
- breakdown presentation

Revision required:
- remove the lower-left `Scene 02 · 17s` label from actual production output.

---

## Required Change

Find the source of the scene-duration/development caption and remove it from production compositions.

The following must not appear in:

```text
Redis-EN
Redis-DE
Redis-FR
```

or any final combined episode render:

```text
Scene 02 · 17s
```

Also check whether Scene 01 or any shared wrapper renders similar development-only labels such as:

```text
Scene 01 · 22s
Scene XX · Ns
```

If such labels are development metadata rather than intentional viewer-facing content, remove or gate them from production output.

Preferred design:

```text
DEV compositions may show debug metadata
PROD episode compositions must not
```

If a debug-label mechanism is useful, keep it behind an explicit development/debug flag rather than deleting useful tooling globally.

---

## Scope

Do only this cleanup.

Do not:
- redesign Scene 02;
- change timing-bar proportions;
- change motion timing;
- change typography;
- change localization;
- implement Scene 03;
- add narration/audio;
- add external assets.

---

## Validation

Run:

```text
typecheck
build
composition discovery
scene validation
asset validation
```

Render and inspect at least:

```text
renders/review/task-006a/scene-02-clean.png
renders/review/task-006a/scene-02-preview.mp4
```

Also inspect the Scene 01 → Scene 02 boundary in a combined production render or representative frame to confirm no scene metadata caption remains.

Verify EN/DE/FR production compositions remain valid.

---

## Human Review Requests

Ask the user only to confirm:

1. `Scene 02 · 17s` is gone.
2. No other development/debug scene-duration label appears.
3. Everything else remains visually unchanged.

Human review status:

```text
PENDING
```

---

## External Asset Requests

```text
None.
```

---

## Acceptance Criteria

- [ ] `Scene 02 · 17s` is absent from production output.
- [ ] Any equivalent development scene-duration labels are absent from production output.
- [ ] DEV-only metadata may remain available only behind a debug/development boundary.
- [ ] Scene 02 visual design is otherwise unchanged.
- [ ] Scene 02 timing is unchanged.
- [ ] EN/DE/FR remain valid.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Review PNG is rendered.
- [ ] Review MP4 is rendered.
- [ ] `feedbacks/task-006a-feedback.md` is created.
- [ ] Scene 03 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-006a-feedback.md
```

Include:

### 1. Summary
Explain exactly where the caption came from and how it was removed/gated.

### 2. Production Verification
Confirm whether similar scene metadata existed elsewhere and what was done.

### 3. Human Review Requests
List the cleaned PNG/MP4 and mark review as `PENDING`.

### 4. External Asset Requests
`None.`

### 5. Verification Results
PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- EN
- DE
- FR
- cleaned PNG
- cleaned MP4
- combined Scene 01 → Scene 02 boundary check

### 6. Git Status
List changed/untracked files and ignored renders.

### 7. Final Status
Finish with exactly one:

```text
TASK-006A STATUS: PASS
```

or

```text
TASK-006A STATUS: PARTIAL
```

or

```text
TASK-006A STATUS: BLOCKED
```

---

## Agent Behavior

- Treat this as a surgical cleanup task.
- Do not redesign approved visuals.
- Remove/gate development metadata from production output.
- Render actual review media.
- Stop after feedback.
- Do not begin Scene 03.
