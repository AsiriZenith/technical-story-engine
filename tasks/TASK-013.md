# TASK-013 — Implement Scene 06 Using the Exact Ready-Shelf Assets

## Objective

Implement **Scene 06 — The Ready Shelf / Cache-Hit Analogy**.

The user has already generated, reviewed, and manually added the exact production images for this scene.

Use these exact files:

```text
public/episodes/001-redis/assets/scene-06-ready-shelf.png
public/episodes/001-redis/assets/scene-06-serve-from-shelf.png
```

These are **final production assets**.

Do **not** redraw, reinterpret, recreate, or replace either image.

Do not generate AI video for this scene.

Do not begin Scene 07.

---

## Manual Asset Inputs

### Asset 1 — Ready Shelf Setup

Path:

```text
public/episodes/001-redis/assets/scene-06-ready-shelf.png
```

Type:

```text
final production
```

Usage:

```text
Primary visual for introducing the ready shelf near the cashier.
```

Allowed transformations:

```text
scale
position
opacity
subtle push-in / pan
focus emphasis
safe masking/reveal
background integration
```

Not allowed:

```text
redraw
reinterpret
replace shelf
replace customer
replace cashier
replace chef
replace burger
change the core composition
create a new version of the analogy
```

### Asset 2 — Serve From Shelf

Path:

```text
public/episodes/001-redis/assets/scene-06-serve-from-shelf.png
```

Type:

```text
final production
```

Usage:

```text
Primary visual for showing the burger being served directly from the ready shelf.
```

Allowed transformations:

```text
scale
position
opacity
subtle push-in / pan
focus emphasis
safe masking/reveal
background integration
```

Not allowed:

```text
redraw
reinterpret
replace shelf
replace customer
replace cashier
replace chef
replace burger
change the core composition
create a new version of the analogy
```

### Stop condition

If either asset is missing, stop the dependent implementation and report exactly what is missing.

Do not generate or recreate the images.

---

## Core Scene Message

Scene 06 introduces the solution in the restaurant analogy.

### Beat 1 — Ready Shelf Exists

The viewer should understand:

```text
A burger is already prepared and waiting on the ready shelf.
```

### Beat 2 — Customer Is Served From the Shelf

The viewer should understand:

```text
Customer orders
→ Cashier checks the ready shelf
→ Burger is already there
→ Customer gets it immediately
```

### Main teaching point

This scene must clearly communicate:

```text
The chef did not become faster.
The chef did not cook at all for this request.
```

This is the restaurant version of a **cache hit**.

Analogy mapping:

```text
Ready shelf = Cache
Cashier = Application
Chef = Database
Pre-made burger = Cached result
Serving from shelf = Cache hit response
```

---

## Scene Narrative

Recommended rhythm:

```text
1. Transition from Scene 05
2. Show the ready shelf setup image
3. Emphasize the already-prepared burger on the shelf
4. Transition to the serve-from-shelf image
5. Make it obvious the cashier serves directly from the shelf
6. Keep the chef visible and calm in the background
7. Land on the takeaway:
   "The chef didn’t cook at all."
```

The assets should remain the dominant visuals.

---

## Background Integration

Preserve:
- the existing dark technical episode vibe;
- the visual continuity of Scenes 01–05;
- the supplied image content exactly.

If the images already integrate well, use them as-is.

If minor framing is needed:
- use the project background around the image;
- do not alter the actual illustration.

---

## Motion

Use Remotion to animate the stills.

This scene does **not** require AI-generated video.

Preferred motion:

```text
fade in
subtle scale/push-in
small focus emphasis on the ready shelf
clean transition between the two images
short hold on the served-from-shelf moment
```

Optional:
- a restrained highlight around the ready shelf;
- a gentle emphasis that the chef is idle / not cooking.

Avoid:
- fake character animation;
- excessive zoom;
- flashy transitions;
- new competing overlays that obscure the supplied images.

Use:

```text
useCurrentFrame()
interpolate()
motionPresets
scene-relative timing
```

Use `spring()` only if clearly justified.

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

Do not let design/animation guidance cause reinterpretation of the exact images.

---

## Asset Manifest

Register both images in the existing episode asset manifest using logical IDs, for example:

```text
scene06ReadyShelf
scene06ServeFromShelf
```

Use the canonical:

```text
resolveAsset()
```

pipeline established by TASK-010.

Do not introduce another asset-resolution pattern.

Because the user has already manually approved these assets for production, use the documented asset lifecycle consistently.

---

## Localization

Support:

```text
en
de
fr
```

Inspect both PNGs for baked English text.

If baked English exists:
- do not edit or redraw the images;
- document the localization limitation;
- if helpful, add small localized supporting text outside the image without covering important content.

Do not fake localization by replacing the artwork.

---

## Scope

Implement only Scene 06.

Do not:
- begin Scene 07;
- modify the supplied PNG contents;
- generate AI video;
- change approved Scenes 01–05;
- jump ahead to later cache-invalidations or edge cases.

---

## Review Artifacts

Render:

```text
renders/review/task-013/scene-06-start.png
renders/review/task-013/scene-06-ready-shelf.png
renders/review/task-013/scene-06-serve-from-shelf.png
renders/review/task-013/scene-06-end.png
renders/review/task-013/scene-06-preview.mp4
```

Also render regressions:

```text
renders/review/task-013/scene-01-regression.png
renders/review/task-013/scene-02-regression.png
renders/review/task-013/scene-03-regression.png
renders/review/task-013/scene-04-regression.png
renders/review/task-013/scene-05-regression.png
```

If useful for localization review:

```text
renders/review/task-013/scene-06-serve-from-shelf-de.png
renders/review/task-013/scene-06-serve-from-shelf-fr.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the exact ready-shelf image is used;
2. whether the exact serve-from-shelf image is used;
3. whether it is obvious the burger was already prepared;
4. whether it is obvious the cashier serves from the shelf;
5. whether the chef looks calm and not actively cooking;
6. whether the cache-hit idea is clear;
7. whether the scene feels consistent with Scenes 01–05;
8. whether the scene is ready to proceed to Scene 07.

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

Both required production assets already exist.

Do not request new image or video generation.

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
Scene 06 ready-shelf still
Scene 06 serve-from-shelf still
Scene 06 end still
Scene 06 MP4
Scene 01 regression
Scene 02 regression
Scene 03 regression
Scene 04 regression
Scene 05 regression
```

---

## Acceptance Criteria

TASK-013 is complete only when:

- [ ] Both exact PNGs exist at the supplied paths.
- [ ] Both are registered in the asset manifest.
- [ ] Both use canonical `resolveAsset()`.
- [ ] The exact images are rendered directly.
- [ ] Neither image is redrawn or reinterpreted.
- [ ] No AI-generated video is used.
- [ ] The ready shelf is clearly introduced.
- [ ] Serving from the shelf is clearly shown.
- [ ] The viewer can infer a cache hit.
- [ ] The chef clearly does not cook for this request.
- [ ] Motion is restrained and supports comprehension.
- [ ] Scene 01 remains unchanged.
- [ ] Scene 02 remains unchanged.
- [ ] Scene 03 remains unchanged.
- [ ] Scene 04 remains unchanged.
- [ ] Scene 05 remains unchanged.
- [ ] Required review PNGs are rendered.
- [ ] Required preview MP4 is rendered.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `feedbacks/task-013-feedback.md` is created.
- [ ] Scene 07 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-013-feedback.md
```

It must contain:

### 1. Summary
What was implemented.

### 2. Manual Asset Usage
For each asset report:
- exact path;
- logical asset ID;
- manifest status;
- confirmation that the exact image was used directly;
- confirmation that it was not redrawn/reinterpreted.

### 3. Scene Implementation
Explain:
- ready-shelf setup timing;
- serve-from-shelf timing;
- transition between them;
- motion and emphasis;
- final takeaway.

### 4. Technical Analogy
Explain how the scene maps:
- Ready shelf → Cache
- Cashier → Application
- Chef → Database
- Pre-made burger → Cached result
- Serving from shelf → Cache hit

### 5. Localization
Report:
- baked-text limitations;
- any EN/DE/FR supplemental treatment.

### 6. Skills Used
Explain how:
- `technical-story-video`
- `frontend-design`
- `animate`
- `review-animations`

were used.

### 7. Human Review Requests
For each artifact include:
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
- Scene 06 ready shelf
- Scene 06 serve from shelf
- Scene 06 end
- Scene 06 MP4
- Scene 01 regression
- Scene 02 regression
- Scene 03 regression
- Scene 04 regression
- Scene 05 regression

### 10. Problems / Risks
Include:
- baked text/localization issues;
- scene duration concerns;
- transition clarity;
- future narration timing.

### 11. Recommended Next Step

```text
If Scene 06 is human-approved:
→ plan Scene 07.

If Scene 07 requires precision-critical imagery:
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
TASK-013 STATUS: PASS
```

or

```text
TASK-013 STATUS: PARTIAL
```

or

```text
TASK-013 STATUS: BLOCKED
```

---

## Agent Behavior

- Use the exact user-supplied Scene 06 PNGs.
- Do not redraw or reinterpret them.
- Do not generate AI video.
- Preserve Scene 01–05.
- Make the cache-hit idea obvious.
- Do not start Scene 07.
- Render review artifacts.
- Mark human review PENDING.
- Stop after feedback.
