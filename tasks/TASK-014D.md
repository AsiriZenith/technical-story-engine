# TASK-014D — Regenerate Full Scene 07 Using Approved Spotlight System

## Objective

Regenerate the full **Scene 07 — Restaurant Analogy → Technical Architecture** using the approved `SpotlightImage` system and the exact tuning approved in TASK-014C.

The approved spotlight settings are:

```text
dimBrightness: 0.58
featherPaddingFactor: 1.35
```

These values are now the standard for this Scene 07 conversion.

Do not change either source image.

Do not redesign the scene.

Do not change Scene 07 duration.

Do not start Scene 08.

---

## Approved Source Assets

Use the exact existing files:

```text
public/episodes/001-redis/assets/scene-07-analogy-mapping.png
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

These are final production assets.

Do not:
- edit;
- replace;
- redraw;
- reinterpret;
- regenerate;
- recolor;
- alter baked text.

---

## Approved Highlight Technique

Use the reusable:

```text
SpotlightImage
```

pattern.

Required structure:

```text
shared transformed wrapper
├── dimmed base image
└── masked full-brightness image
```

Rules:
- normalized `0–1` target regions only;
- no `FocusBox` rectangle for the converted targets;
- no border overlay;
- no glow rectangle;
- no hard rectangular mask edge;
- both image layers must remain pixel-identical in sizing/object-fit/position;
- both image layers must share the exact same transform wrapper;
- only one spotlight visible at a time;
- surrounding content must remain readable.

Use these exact tuning values:

```text
dimBrightness: 0.58
featherPaddingFactor: 1.35
```

Do not retune them in this task unless a target clearly fails and the reason is documented.

---

## Scene 07 Target Behavior

### Analogy image

Do not spotlight:
- Request;
- Application;
- Cached result.

Spotlight only:

```text
1. Redis / Cache
2. Database
```

Sequence:

```text
Redis / Cache spotlight
→ fade out
→ Database spotlight
→ fade out
```

Only one spotlight may be visible at a time.

Use normalized regions derived from the current target areas.

The Redis target is already implemented and approved from TASK-014C.

Convert the Database analogy target to the same spotlight system.

---

### Technical Architecture image

Remove the old rectangle/glow `FocusBox` emphasis for:

```text
Redis
Database
```

Convert both to the approved spotlight system.

Sequence:

```text
Redis spotlight
→ fade out
→ Database spotlight
→ fade out
```

Only one spotlight may be visible at a time.

Do not spotlight unrelated:
- Client;
- Application;
- numbered arrows;
- callout text;
- latency panel.

The source image itself already communicates those elements.

---

## Timing

Preserve the existing overall Scene 07 duration:

```text
540 frames / 18 seconds
```

Do not significantly retime the scene.

Keep the current beat structure unless a tiny adjustment is required only to prevent spotlight overlap.

The spotlight sequence must remain clearly sequential.

---

## Motion

Keep the existing restrained push-in / scale behavior.

Do not add:
- new zooms;
- pans;
- camera moves;
- flashy transitions.

The spotlight is now the main attention-guidance mechanism.

Use the existing Remotion timing approach:

```text
useCurrentFrame()
interpolate()
existing scene timing helpers
```

---

## Required Implementation Changes

Expected files may include:

```text
src/shared/components/SpotlightImage.tsx
src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx
```

Likely work:

1. keep the approved Redis analogy spotlight;
2. convert analogy Database from `FocusBox` to `SpotlightImage`;
3. convert technical Redis from `FocusBox` to `SpotlightImage`;
4. convert technical Database from `FocusBox` to `SpotlightImage`;
5. remove now-unused Scene 07 `FocusBox` code if no longer needed in this scene;
6. preserve all timing and transforms;
7. keep normalized target regions documented.

Do not refactor unrelated scenes in this task.

---

## Review Artifacts

Render:

```text
renders/review/task-014d/scene-07-start.png
renders/review/task-014d/scene-07-analogy-redis-spotlight.png
renders/review/task-014d/scene-07-analogy-database-spotlight.png
renders/review/task-014d/scene-07-technical-redis-spotlight.png
renders/review/task-014d/scene-07-technical-database-spotlight.png
renders/review/task-014d/scene-07-end.png
renders/review/task-014d/scene-07-preview.mp4
```

Also render timing safety frames near handoffs:

```text
renders/review/task-014d/scene-07-analogy-handoff.png
renders/review/task-014d/scene-07-technical-handoff.png
```

These should prove that two spotlights are not visible at once.

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. analogy Redis spotlight;
2. analogy Database spotlight;
3. technical Redis spotlight;
4. technical Database spotlight;
5. whether any target is too broad;
6. whether any target is too tight;
7. whether surrounding content remains readable;
8. whether any spotlight has a visible hard edge;
9. whether any spotlight drifts during image scale;
10. whether spotlight handoffs overlap;
11. whether Scene 07 now feels cleaner than the old FocusBox version;
12. whether this Scene 07 is ready to lock.

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
```

Also verify:
- no Scene 07 source asset changes;
- Scene 07 duration remains 540 frames / 18s;
- Redis/Database spotlights are sequential;
- no Scene 07 `FocusBox` remains for these four converted targets;
- no hard mask edge;
- no seam;
- no drift;
- no double-image ghosting;
- no simultaneous spotlights.

---

## Acceptance Criteria

TASK-014D is complete only when:

- [ ] Both source images remain unchanged.
- [ ] Approved `SpotlightImage` technique is used.
- [ ] Approved tuning values `0.58 / 1.35` are used.
- [ ] Analogy Redis uses spotlight.
- [ ] Analogy Database uses spotlight.
- [ ] Technical Redis uses spotlight.
- [ ] Technical Database uses spotlight.
- [ ] Request is not highlighted.
- [ ] Application is not highlighted.
- [ ] Cached result is not highlighted.
- [ ] Only one spotlight is visible at a time.
- [ ] No rectangle/glow `FocusBox` remains for the four converted targets.
- [ ] No hard rectangular mask edge is visible.
- [ ] Surrounding content remains readable.
- [ ] No spotlight drift occurs during image scaling.
- [ ] No seam/ghosting appears between stacked image layers.
- [ ] Scene duration remains unchanged.
- [ ] No new assets are generated.
- [ ] Required PNG review artifacts are rendered.
- [ ] Full Scene 07 preview MP4 is rendered.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Human review status is PENDING.
- [ ] `feedbacks/task-014d-feedback.md` is created.
- [ ] Scene 08 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-014d-feedback.md
```

It must contain:

### 1. Summary
Explain that Scene 07 was fully converted from rectangle/glow highlights to the approved spotlight system.

### 2. Spotlight Settings
Report:

```text
dimBrightness
featherPaddingFactor
```

Expected:

```text
0.58
1.35
```

If different, explain why.

### 3. Target Regions
For each target report normalized coordinates:

```text
Analogy Redis
Analogy Database
Technical Redis
Technical Database
```

Use:

```text
x
y
width
height
```

in `0–1`.

### 4. Timing
Report:
- Redis analogy spotlight window;
- Database analogy spotlight window;
- Redis technical spotlight window;
- Database technical spotlight window;
- confirmation that the windows do not overlap.

### 5. Transform Safety
Confirm:
- both image layers share the same transformed wrapper;
- no spotlight layer has an independent transform.

### 6. Source Asset Preservation
Confirm both PNGs are unchanged.

### 7. Old FocusBox Removal
Report exactly which Scene 07 `FocusBox` usages were removed or replaced.

### 8. Review Artifacts
List exact paths.

### 9. Human Review Requests
For each artifact include:
- Artifact
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 10. Verification Results

PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- source image preservation
- analogy Redis spotlight
- analogy Database spotlight
- analogy handoff
- technical Redis spotlight
- technical Database spotlight
- technical handoff
- no seam
- no drift
- no hard edge
- no simultaneous spotlights
- full Scene 07 MP4

### 11. Problems / Risks
Report any remaining visual concern.

### 12. Recommended Next Step

Use exactly:

```text
If TASK-014D is human-approved:
→ lock Scene 07 and proceed to plan Scene 08.

Otherwise:
→ revise only the rejected spotlight target or timing; do not redesign the whole scene.
```

### 13. Git Status
Report:
- branch;
- changed files;
- untracked files;
- ignored review media;
- commits/pushes.

### 14. Final Status

Finish with exactly one:

```text
TASK-014D STATUS: PASS
```

or

```text
TASK-014D STATUS: PARTIAL
```

or

```text
TASK-014D STATUS: BLOCKED
```

---

## Agent Behavior

- Use the exact approved source images.
- Use the exact approved spotlight technique.
- Use the approved tuning values.
- Do not redesign.
- Do not modify unrelated scenes.
- Do not generate new media assets.
- Do not start Scene 08.
- Render review artifacts.
- Stop after feedback.
