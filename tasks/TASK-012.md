# TASK-012 — Implement Scene 05 Using the Exact Restaurant Analogy Images

## Objective

Implement **Scene 05 — Repeated Work Restaurant Analogy**.

The user has already generated, reviewed, and manually added the exact production images for this scene.

Use these exact files:

```text
public/episodes/001-redis/assets/scene-05-first-order.png
public/episodes/001-redis/assets/scene-05-repeat-order.png
```

These are final production assets.

Do **not** redraw, reinterpret, recreate, or replace either image.

Do not generate AI video for this scene.

Do not begin Scene 06.

---

## Manual Asset Inputs

### Asset 1 — First Order

Path:

```text
public/episodes/001-redis/assets/scene-05-first-order.png
```

Type:

```text
final production
```

Usage:

```text
Primary visual for the first-order beat.
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
replace characters
change restaurant layout
replace cashier
replace chef
replace burger
change the ~10 min meaning
generate a different version
```

### Asset 2 — Same Order Again

Path:

```text
public/episodes/001-redis/assets/scene-05-repeat-order.png
```

Type:

```text
final production
```

Usage:

```text
Primary visual for the repeated-order beat.
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
replace characters
change restaurant layout
replace cashier
replace chef
replace burger
change the ~10 min again meaning
generate a different version
```

### Stop condition

If either asset is missing, stop the dependent implementation and report exactly what is missing.

Do not generate or recreate the images.

---

## Core Scene Message

Scene 05 explains repeated backend work using a restaurant analogy.

### Beat 1 — First Order

The first customer places an order.

Visual meaning:

```text
Customer
→ Cashier
→ Chef
→ Burger

~10 min
```

The chef is competent.

The work simply takes time.

### Beat 2 — Same Order Again

A different customer orders the same burger again.

Visual meaning:

```text
Another customer
→ Same cashier
→ Same chef
→ Same burger work again

~10 min again
```

The key idea:

```text
The same expensive work has to happen again.
```

Do not imply:
- the chef is bad;
- the chef is slow;
- the restaurant is broken.

The analogy should map cleanly to:

```text
Customer = Request
Cashier = Application
Chef = Database
Burger preparation = Expensive database work
```

Do not introduce the cache/ready shelf yet.

That belongs to the next scene.

---

## Scene Narrative

Recommended rhythm:

```text
1. Transition from Scene 04
2. First-order image appears
3. Brief focus on customer → cashier → chef
4. Emphasize ~10 min
5. Transition to repeated-order image
6. Make "same work again" visually obvious
7. Emphasize ~10 min again
8. Land on the takeaway:
   "Same work. Again."
```

The images should remain the dominant visuals.

---

## Important Teaching Point

The viewer should understand:

```text
The problem is not that the chef became slower.
The same expensive process is simply being repeated.
```

This scene is preparation for the later cache analogy.

Do not reveal the solution yet.

---

## Background Integration

Preserve:
- the existing dark technical episode vibe;
- the visual continuity of Scenes 01–04;
- the supplied image content exactly.

If the images have their own dark restaurant background and already integrate well:
- use them cleanly as-is.

If minor framing is needed:
- use the project background around the image;
- do not alter the actual restaurant illustration.

---

## Motion

Use Remotion to animate the stills.

This scene does **not** require AI-generated video.

Preferred motion:

```text
fade in
subtle scale/push-in
small focus emphasis
clean transition between images
short hold on ~10 min
short hold on ~10 min again
```

Optional:
- a very subtle guided pan toward the chef;
- a restrained highlight over the time label;
- a simple beat marker between first order and repeat order.

Avoid:
- fake character animation;
- excessive zoom;
- parallax that distorts the scene;
- redrawing arrows in a competing style;
- flashy transitions;
- motion that makes the images feel like slideshows with effects.

Use:

```text
useCurrentFrame()
interpolate()
motionPresets
scene-relative timing
```

Use `spring()` only if clearly justified.

---

## Humor

Keep the humor light.

The second beat may land with a restrained punch such as:

```text
Same work. Again.
```

or equivalent localized wording.

Do not over-joke.

The analogy must stay technically clear.

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
scene05FirstOrder
scene05RepeatOrder
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

Implement only Scene 05.

Do not:
- begin Scene 06;
- add the ready shelf/cache solution yet;
- add Redis into the restaurant visual;
- generate AI video;
- modify Scene 04;
- modify the supplied PNG contents;
- change approved Scenes 01–04.

---

## Review Artifacts

Render:

```text
renders/review/task-012/scene-05-start.png
renders/review/task-012/scene-05-first-order.png
renders/review/task-012/scene-05-repeat-order.png
renders/review/task-012/scene-05-end.png
renders/review/task-012/scene-05-preview.mp4
```

Also render regressions:

```text
renders/review/task-012/scene-01-regression.png
renders/review/task-012/scene-02-regression.png
renders/review/task-012/scene-03-regression.png
renders/review/task-012/scene-04-regression.png
```

If useful for localization review:

```text
renders/review/task-012/scene-05-repeat-order-de.png
renders/review/task-012/scene-05-repeat-order-fr.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the exact first-order image is used;
2. whether the exact repeat-order image is used;
3. whether the two-image transition feels natural;
4. whether it is obvious that the chef performs the expensive work again;
5. whether the chef still feels competent;
6. whether `~10 min` and `~10 min again` are readable;
7. whether the second customer makes the repetition clearer;
8. whether the scene feels consistent with Scenes 01–04;
9. whether the scene is ready to proceed to Scene 06.

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
Scene 05 first-order still
Scene 05 repeated-order still
Scene 05 end still
Scene 05 MP4
Scene 01 regression
Scene 02 regression
Scene 03 regression
Scene 04 regression
```

---

## Acceptance Criteria

TASK-012 is complete only when:

- [ ] Both exact PNGs exist at the supplied paths.
- [ ] Both are registered in the asset manifest.
- [ ] Both use canonical `resolveAsset()`.
- [ ] The exact images are rendered directly.
- [ ] Neither image is redrawn or reinterpreted.
- [ ] No AI-generated video is used.
- [ ] First order clearly reads as full work taking ~10 min.
- [ ] Second order clearly reads as the same expensive work happening again.
- [ ] The chef remains competent.
- [ ] Cache/ready-shelf solution is not introduced yet.
- [ ] Motion is restrained and supports comprehension.
- [ ] Scene 01 remains unchanged.
- [ ] Scene 02 remains unchanged.
- [ ] Scene 03 remains unchanged.
- [ ] Scene 04 remains unchanged.
- [ ] Required review PNGs are rendered.
- [ ] Required preview MP4 is rendered.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `feedbacks/task-012-feedback.md` is created.
- [ ] Scene 06 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-012-feedback.md
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
- first-order timing;
- repeated-order timing;
- transition between them;
- motion and emphasis;
- final takeaway.

### 4. Technical Analogy
Explain how the scene maps:
- Customer → Request
- Cashier → Application
- Chef → Database
- Burger preparation → Expensive work

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
- Scene 05 first order
- Scene 05 repeated order
- Scene 05 end
- Scene 05 MP4
- Scene 01 regression
- Scene 02 regression
- Scene 03 regression
- Scene 04 regression

### 10. Problems / Risks
Include:
- baked text/localization issues;
- scene duration concerns;
- transition clarity;
- future narration timing.

### 11. Recommended Next Step

```text
If Scene 05 is human-approved:
→ plan Scene 06, where the ready shelf/cache solution is introduced.

If Scene 06 requires precision-critical imagery:
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
TASK-012 STATUS: PASS
```

or

```text
TASK-012 STATUS: PARTIAL
```

or

```text
TASK-012 STATUS: BLOCKED
```

---

## Agent Behavior

- Use the exact user-supplied Scene 05 PNGs.
- Do not redraw or reinterpret them.
- Do not generate AI video.
- Preserve Scene 01–04.
- Do not introduce the cache solution yet.
- Do not start Scene 06.
- Render review artifacts.
- Mark human review PENDING.
- Stop after feedback.
