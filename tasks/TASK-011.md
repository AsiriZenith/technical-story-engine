# TASK-011 — Implement Scene 04 Using the Exact User-Supplied Diagram Asset

## Objective

Implement **Scene 04 — Original Request Path Before Redis**.

The user has already generated, reviewed, and manually added the exact production image for this scene.

Use this exact file:

```text
public/episodes/001-redis/assets/scene-04-original-request-path.jpg
```

Do **not** redraw, reinterpret, recreate, or replace this diagram.

This is a final production asset.

Do not begin Scene 05.

---

## Manual Asset Inputs

### Asset 1

Path:

```text
public/episodes/001-redis/assets/scene-04-original-request-path.jpg
```

Type:

```text
final production
```

Usage:

```text
Primary visual for Scene 04.
Use the exact supplied image directly in the scene.
```

Allowed transformations:

```text
scale
position
opacity
subtle entrance/exit motion
safe crop only if absolutely necessary and if no important diagram content is lost
background integration
```

Not allowed:

```text
redraw
reinterpret
trace into a different composition
replace diagram objects
replace arrows
change relationships between objects
invent a new layout
silently redesign the diagram
```

Localization notes:

```text
If the JPG contains baked English text, preserve it as supplied.
Do not modify the image contents in this task.
Document localization limitations in feedback.
```

Baked text:

```text
Inspect and report.
```

### Stop condition

If this exact file is missing:

```text
public/episodes/001-redis/assets/scene-04-original-request-path.jpg
```

stop Scene 04 implementation and report the missing asset.

Do not generate or recreate the asset.

---

## Core Scene Message

Scene 04 should establish the original request path before Redis:

```text
User / Client
→ Application
→ Database
→ expensive work
→ response

≈ 180 ms
```

The scene should make it clear that:

```text
Without Redis, the request goes all the way to the database,
and the expensive database work happens again.
```

Do not introduce Redis as an active part of this scene.

---

## Background Integration Rule

The user explicitly wants the **exact supplied diagram** used.

However, the image background may not perfectly match the project’s established background.

Therefore:

```text
diagram content = preserve exactly
background integration = adapt carefully
```

Preserve the project’s established visual system:

```text
dark technical background
existing grid language
existing episode palette
same overall Scene 01–03 vibe
```

If the JPG background already blends well:
- use it cleanly as-is.

If it differs slightly:
- integrate it using surrounding background treatment, framing, masking, or subtle blending;
- do not alter the actual diagram content;
- do not redraw the diagram to make the background match.

The user is specifically approving the diagram, not necessarily the JPG background color.

---

## Scene Structure

Use a simple explanatory rhythm.

Suggested flow:

```text
1. short setup / transition from Scene 03
2. exact request-path diagram appears
3. emphasize request traveling through Application to Database
4. emphasize expensive database work
5. land on total latency ≈ 180 ms
6. hold long enough to read
```

The diagram should remain the dominant visual.

Do not add unnecessary secondary graphics around it.

---

## Motion

Use restrained motion only.

Allowed examples:
- fade in
- slight scale in
- subtle pan/focus
- restrained emphasis on the database-work area
- clean fade/hold

Do not:
- reconstruct arrows in code unless explicitly needed only as a non-destructive overlay;
- add decorative motion that competes with the supplied diagram;
- create an alternative architecture diagram.

Use Remotion-native motion:

```text
useCurrentFrame()
interpolate()
spring() only if genuinely useful
scene-relative timing
```

---

## Required Skills

Consult:

```text
technical-story-video
frontend-design
animate
```

Before completion:

```text
review-animations
```

The manual-asset policy is authoritative.

Do not let design or animation guidance cause reinterpretation of the supplied JPG.

---

## Asset Manifest

Register the image in the existing episode asset manifest using a logical asset ID, for example:

```text
scene04OriginalRequestPath
```

Use the canonical:

```text
resolveAsset()
```

pipeline established by TASK-010.

Do not introduce another asset resolver or direct ad-hoc path lookup pattern.

Initial status should reflect the fact that the human has already approved this production image for Scene 04.

Use the documented lifecycle consistently.

---

## Localization

Support the existing:

```text
en
de
fr
```

shared episode structure.

If the image contains baked English text:
- do not alter the image;
- do not fake localization by redrawing the diagram;
- document the limitation clearly.

If supplemental localized text is needed, place it outside the core diagram without covering important visual content.

---

## Scope

Implement only Scene 04.

Do not:
- begin Scene 05;
- add cache-aside logic yet;
- add restaurant analogy yet;
- generate new external media;
- modify Scene 03;
- modify the supplied JPG contents;
- change approved Scene 01–03 visuals.

---

## Review Artifacts

Render:

```text
renders/review/task-011/scene-04-start.png
renders/review/task-011/scene-04-main.png
renders/review/task-011/scene-04-end.png
renders/review/task-011/scene-04-preview.mp4
```

Also render regressions:

```text
renders/review/task-011/scene-01-regression.png
renders/review/task-011/scene-02-regression.png
renders/review/task-011/scene-03-regression.png
```

If useful for localization review:

```text
renders/review/task-011/scene-04-main-de.png
renders/review/task-011/scene-04-main-fr.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the exact supplied JPG is clearly being used;
2. whether the diagram was preserved without reinterpretation;
3. whether background integration feels consistent with Scenes 01–03;
4. whether the request path is easy to understand;
5. whether the database work reads as the expensive step;
6. whether `180 ms` is clear;
7. whether motion is restrained and polished;
8. whether the scene is ready to proceed to Scene 05.

Human review status:

```text
PENDING
```

---

## External Asset Requests

Expected:

```text
None.
```

The required production asset already exists.

Do not request or generate another image.

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

Also verify:

```text
Scene 04 still renders
Scene 04 MP4 renders
Scene 01 regression
Scene 02 regression
Scene 03 regression
```

---

## Acceptance Criteria

TASK-011 is complete only when:

- [ ] The exact JPG exists at the supplied path.
- [ ] The JPG is registered in the asset manifest.
- [ ] Scene 04 uses the canonical `resolveAsset()` pipeline.
- [ ] The exact supplied image is rendered directly.
- [ ] The diagram is not redrawn or reinterpreted.
- [ ] The image background is integrated carefully with the project style.
- [ ] No important diagram content is altered.
- [ ] Redis is not introduced as an active path element in this scene.
- [ ] The original request path is understandable.
- [ ] Database work is clearly the expensive step.
- [ ] `180 ms` is visually clear.
- [ ] Motion is restrained.
- [ ] Scene 01 remains unchanged.
- [ ] Scene 02 remains unchanged.
- [ ] Scene 03 remains unchanged.
- [ ] Required review PNGs are rendered.
- [ ] Required preview MP4 is rendered.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `feedbacks/task-011-feedback.md` is created.
- [ ] Scene 05 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-011-feedback.md
```

It must contain:

### 1. Summary
What was implemented.

### 2. Manual Asset Usage
Report:
- exact asset path;
- logical asset ID;
- manifest status;
- confirmation that the exact JPG was used directly;
- confirmation that it was not redrawn/reinterpreted.

### 3. Background Integration
Explain:
- whether the source background matched;
- what integration treatment was used;
- confirmation that diagram content was not changed.

### 4. Scene Implementation
Explain:
- timing;
- motion;
- hierarchy;
- how the 180 ms / expensive database work message was emphasized.

### 5. Localization
Report:
- baked-text limitations;
- any EN/DE/FR supplemental handling.

### 6. Skills Used
Explain how:
- `technical-story-video`
- `frontend-design`
- `animate`
- `review-animations`

were used.

### 7. Human Review Requests
For each artifact:
- Artifact
- Type
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 8. External Asset Requests

Expected:

```text
None.
```

### 9. Verification Results

PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- Redis-EN
- Redis-DE
- Redis-FR
- Scene 04 start
- Scene 04 main
- Scene 04 end
- Scene 04 MP4
- Scene 01 regression
- Scene 02 regression
- Scene 03 regression

### 10. Problems / Risks
Include:
- baked text/localization issues;
- background integration concerns;
- scene duration concerns;
- future narration timing.

### 11. Recommended Next Step

```text
If Scene 04 is human-approved:
→ proceed to Scene 05 planning.

If Scene 05 needs precision-critical imagery:
→ generate/approve/add those assets before creating its implementation task.
```

### 12. Git Status
Report:
- branch;
- changed files;
- untracked files;
- ignored review media;
- commits/pushes.

### 13. Final Status

Finish with exactly one:

```text
TASK-011 STATUS: PASS
```

or

```text
TASK-011 STATUS: PARTIAL
```

or

```text
TASK-011 STATUS: BLOCKED
```

---

## Agent Behavior

- Use the exact user-supplied Scene 04 JPG.
- Do not redraw or reinterpret the diagram.
- Treat only background integration as flexible.
- Preserve Scene 01–03.
- Do not generate new media.
- Do not start Scene 05.
- Render review artifacts.
- Mark human review PENDING.
- Stop after feedback.
