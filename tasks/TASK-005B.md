# TASK-005B — Remove Development Scene Caption from Scene 01 Production Output

## Objective

Make one targeted cleanup revision to **Scene 01**.

Human review confirms Scene 01 is visually approved except for the lower-left development caption:

```text
Scene 01 · 22s
```

This text must **not appear in the production video**.

Do not make any other visual, timing, layout, animation, localization, or architecture changes unless required to remove this caption safely.

---

## Human Review Decision

Approved:
- Scene 01 visual design
- diagram direction
- background/vibe
- typography
- motion
- pacing
- overall mystery framing

Revision required:
- remove the lower-left `Scene 01 · 22s` label from actual production output.

---

## Required Change

Find the source of the Scene 01 caption and remove it from production compositions.

The following must not appear in:

```text
Redis-EN
Redis-DE
Redis-FR
```

or any final combined episode render:

```text
Scene 01 · 22s
```

Also verify that no equivalent development-only scene-duration label remains visible in Scene 01 after the cleanup.

Preferred behavior:

```text
DEV compositions may show debug metadata
PROD episode compositions must not
```

If a debug-label mechanism is useful, keep it only behind an explicit development/debug flag.

---

## Scope

Do only this cleanup.

Do not:
- redesign Scene 01;
- change the revised diagram;
- change timing;
- change motion;
- change typography;
- change localization;
- implement Scene 02 or Scene 03;
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
renders/review/task-005b/scene-01-clean.png
renders/review/task-005b/scene-01-preview.mp4
```

Also verify the production compositions still render correctly for:

```text
Redis-EN
Redis-DE
Redis-FR
```

and confirm the cleaned Scene 01 no longer shows the caption.

---

## Human Review Requests

Ask the user only to confirm:

1. `Scene 01 · 22s` is gone.
2. No development/debug scene-duration label remains in Scene 01.
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

- [ ] `Scene 01 · 22s` is absent from production output.
- [ ] Any equivalent development scene-duration label is absent from Scene 01 production output.
- [ ] DEV-only metadata may remain available only behind a debug/development boundary.
- [ ] Scene 01 visual design is otherwise unchanged.
- [ ] Scene 01 timing is unchanged.
- [ ] EN/DE/FR remain valid.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Review PNG is rendered.
- [ ] Review MP4 is rendered.
- [ ] `feedbacks/task-005b-feedback.md` is created.
- [ ] Scene 02 and Scene 03 are not modified beyond any shared debug-label cleanup.

---

## Required Feedback Report

Create:

```text
feedbacks/task-005b-feedback.md
```

Include:

### 1. Summary
Explain exactly where the caption came from and how it was removed/gated for Scene 01.

### 2. Production Verification
Confirm whether any shared logic affected other scenes and what was verified.

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

### 6. Git Status
List changed/untracked files and ignored renders.

### 7. Final Status
Finish with exactly one:

```text
TASK-005B STATUS: PASS
```

or

```text
TASK-005B STATUS: PARTIAL
```

or

```text
TASK-005B STATUS: BLOCKED
```

---

## Agent Behavior

- Treat this as a surgical cleanup task.
- Do not redesign approved visuals.
- Remove/gate development metadata from production output.
- Render actual review media.
- Stop after feedback.
- Do not begin the next scene.
