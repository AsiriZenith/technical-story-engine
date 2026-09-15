# TASK-014 — Implement Scene 07 Using the Exact Analogy-Mapping and Technical-Architecture Assets

## Objective

Implement **Scene 07 — Restaurant Analogy → Technical Architecture**.

The user has already generated, reviewed, and manually added the exact production images for this scene.

Use these exact files:

```text
public/episodes/001-redis/assets/scene-07-analogy-mapping.png
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

These are **final production assets**.

Do **not** redraw, reinterpret, recreate, or replace either image.

Do not generate AI video for this scene.

Do not begin Scene 08.

---

## Manual Asset Inputs

### Asset 1 — Analogy Mapping

Path:

```text
public/episodes/001-redis/assets/scene-07-analogy-mapping.png
```

Type:

```text
final production
```

Usage:

```text
Primary visual for mapping the restaurant analogy to technical roles.
```

The image already communicates the mapping between:

```text
Customer / Request
Cashier / Application
Ready shelf / Redis / Cache
Chef / Database
Burger / Cached result
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
replace labels
replace characters
replace shelf
replace architecture labels
invent a different mapping
silently simplify the supplied image
```

---

### Asset 2 — Technical Architecture

Path:

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

Type:

```text
final production
```

Usage:

```text
Primary visual for transitioning from the restaurant analogy into the real Client → Application → Redis / Database architecture.
```

The supplied image already contains a detailed technical flow.

Use it exactly as supplied.

Do not redraw the architecture in code.

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
redraw nodes
replace arrows
change architecture relationships
change Redis / Database roles
replace the supplied technical diagram
invent an alternative architecture
```

---

## Stop Condition

If either file is missing, stop the dependent implementation and report exactly what is missing.

Do not generate or recreate either image.

---

# Core Scene Message

Scene 07 must explicitly connect the restaurant analogy to the real technical system.

The viewer should understand:

```text
Customer      = Request / Client
Cashier       = Application
Ready shelf   = Redis / Cache
Chef          = Database
Burger        = Cached result
```

Then transition into the real system:

```text
Client
→ Application
→ Redis / Cache
→ Database when needed
→ Response
```

The purpose of this scene is:

```text
We are done with the analogy.
Now map it directly back to the architecture.
```

---

# Scene Narrative

Recommended rhythm:

```text
1. Transition from Scene 06.
2. Show the exact analogy-mapping image.
3. Hold long enough for the viewer to understand each role.
4. Emphasize the mapping in a restrained way.
5. Transition into the exact technical-architecture image.
6. Hold on the real architecture.
7. Land on the message that Redis can satisfy repeated requests without repeating database work.
```

Do not over-explain with extra custom diagrams.

The supplied images should remain the dominant visuals.

---

# Important Technical Framing

The technical image is more detailed than a simple four-node architecture.

Preserve its meaning exactly.

Do not simplify it into a new diagram.

The viewer should understand:
- Application checks Redis;
- cache hit can return the cached result;
- cache miss can reach the Database;
- Database remains the source of truth;
- Redis is fast access, not the source of truth.

Do not imply:
- Redis permanently replaces the Database;
- the Database disappears;
- every request always hits Redis;
- Redis makes Database execution itself faster.

---

# Background Integration

Preserve:
- the existing dark technical episode vibe;
- continuity with Scenes 01–06;
- the supplied image content exactly.

If the images already match the project background:
- use them cleanly as-is.

If minor framing is needed:
- use the project background around them;
- do not alter the actual illustration or diagram content.

---

# Motion

Use Remotion to animate the still images.

This scene does **not** require AI-generated video.

Preferred motion:

```text
fade in
subtle scale/push-in
small focus emphasis
clean transition from analogy image to technical architecture image
short hold on the final technical architecture
```

Potential emphasis:
- lightly emphasize each mapping label in the analogy image;
- then emphasize Redis and Database roles in the technical image.

Do not:
- fake character animation;
- redraw arrows;
- create new node components over the supplied architecture;
- add flashy transitions;
- animate so aggressively that text becomes hard to read.

Use:

```text
useCurrentFrame()
interpolate()
motionPresets
scene-relative timing
```

Use `spring()` only if clearly justified.

---

# Required Skills

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

Do not let design or animation guidance cause reinterpretation of either image.

---

# Asset Manifest

Register both images in the existing episode asset manifest using logical IDs, for example:

```text
scene07AnalogyMapping
scene07TechnicalArchitecture
```

Use the canonical:

```text
resolveAsset()
```

pipeline established by TASK-010.

Do not introduce another asset-resolution pattern.

Because the user has manually reviewed and approved these exact files for production, use the documented asset lifecycle consistently.

Also review the already-human-approved Scene 05 and Scene 06 assets still marked `candidate` in prior feedback. If the current repository still has them as `candidate`, promote only those human-approved assets to `approved` with the appropriate approval metadata. Do not promote unrelated assets.

---

# Localization

Support:

```text
en
de
fr
```

Inspect both supplied images for baked English text.

If baked English exists:
- preserve the image exactly;
- do not redraw or translate inside the image;
- document the localization limitation;
- if needed, add small localized supporting text outside the image without covering important content.

Do not fake localization by replacing the artwork.

---

# Scope

Implement only Scene 07.

Do not:
- begin Scene 08;
- modify the supplied image contents;
- generate AI video;
- change approved Scenes 01–06;
- replace the technical architecture with native Remotion shapes;
- jump ahead to later cache-invalidations/tradeoffs.

---

# Review Artifacts

Render:

```text
renders/review/task-014/scene-07-start.png
renders/review/task-014/scene-07-analogy-mapping.png
renders/review/task-014/scene-07-technical-architecture.png
renders/review/task-014/scene-07-end.png
renders/review/task-014/scene-07-preview.mp4
```

Also render regressions:

```text
renders/review/task-014/scene-01-regression.png
renders/review/task-014/scene-02-regression.png
renders/review/task-014/scene-03-regression.png
renders/review/task-014/scene-04-regression.png
renders/review/task-014/scene-05-regression.png
renders/review/task-014/scene-06-regression.png
```

If useful for localization review:

```text
renders/review/task-014/scene-07-technical-architecture-de.png
renders/review/task-014/scene-07-technical-architecture-fr.png
```

All review media must remain Git-ignored.

---

# Human Review Requests

Ask the user to review:

1. whether the exact analogy-mapping image is used;
2. whether the exact technical-architecture image is used;
3. whether the restaurant-to-system mapping is immediately understandable;
4. whether the transition between the two images feels natural;
5. whether Redis and Database roles remain technically correct;
6. whether the technical image is readable at normal playback speed;
7. whether motion is restrained;
8. whether the scene feels consistent with Scenes 01–06;
9. whether the scene is ready to proceed to Scene 08.

Human review status:

```text
PENDING
```

---

# External Asset Requests

Expected:

```text
None.
```

Both required production assets already exist.

Do not request new image or video generation.

---

# Validation

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
Scene 07 analogy-mapping still
Scene 07 technical-architecture still
Scene 07 end still
Scene 07 MP4
Scene 01 regression
Scene 02 regression
Scene 03 regression
Scene 04 regression
Scene 05 regression
Scene 06 regression
```

---

# Acceptance Criteria

TASK-014 is complete only when:

- [ ] Both exact PNGs exist at the supplied paths.
- [ ] Both are registered in the asset manifest.
- [ ] Both use canonical `resolveAsset()`.
- [ ] The exact images are rendered directly.
- [ ] Neither image is redrawn or reinterpreted.
- [ ] No AI-generated video is used.
- [ ] Restaurant analogy maps clearly to the technical roles.
- [ ] Technical architecture is shown using the exact supplied diagram.
- [ ] Redis is shown as cache/fast access, not source of truth.
- [ ] Database remains source of truth.
- [ ] Cache-hit/cache-miss logic in the supplied image remains intact.
- [ ] Motion is restrained and supports comprehension.
- [ ] Scene 01 remains unchanged.
- [ ] Scene 02 remains unchanged.
- [ ] Scene 03 remains unchanged.
- [ ] Scene 04 remains unchanged.
- [ ] Scene 05 remains unchanged.
- [ ] Scene 06 remains unchanged.
- [ ] Previously human-approved Scene 05/06 assets are promoted to `approved` if still marked `candidate`.
- [ ] Required review PNGs are rendered.
- [ ] Required preview MP4 is rendered.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] `feedbacks/task-014-feedback.md` is created.
- [ ] Scene 08 is not started.

---

# Required Feedback Report

Create:

```text
feedbacks/task-014-feedback.md
```

It must contain:

## 1. Summary
What was implemented.

## 2. Manual Asset Usage
For each asset report:
- exact path;
- logical asset ID;
- manifest status;
- confirmation that the exact image was used directly;
- confirmation that it was not redrawn/reinterpreted.

## 3. Scene Implementation
Explain:
- analogy-mapping timing;
- technical-architecture timing;
- transition between them;
- motion and emphasis;
- final takeaway.

## 4. Technical Mapping
Explain:
- Customer → Request / Client
- Cashier → Application
- Ready shelf → Redis / Cache
- Chef → Database
- Burger → Cached result

## 5. Architecture Meaning
Explain how the supplied technical image communicates:
- cache check;
- cache hit;
- cache miss;
- Database source of truth;
- response return.

## 6. Asset Status Updates
Report whether previously human-approved Scene 05 and Scene 06 assets were moved from `candidate` to `approved`, and why.

## 7. Localization
Report:
- baked-text limitations;
- any EN/DE/FR supplemental treatment.

## 8. Skills Used
Explain how:
- `technical-story-video`
- `frontend-design`
- `animate`
- `review-animations`

were used.

## 9. Human Review Requests
For each artifact include:
- Artifact
- Type
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

## 10. External Asset Requests

Expected:

```text
None.
```

## 11. Verification Results

PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- Redis-EN
- Redis-DE
- Redis-FR
- Scene 07 analogy mapping
- Scene 07 technical architecture
- Scene 07 end
- Scene 07 MP4
- Scene 01 regression
- Scene 02 regression
- Scene 03 regression
- Scene 04 regression
- Scene 05 regression
- Scene 06 regression

## 12. Problems / Risks
Include:
- baked text/localization issues;
- technical image readability;
- scene duration concerns;
- transition clarity;
- future narration timing.

## 13. Recommended Next Step

```text
If Scene 07 is human-approved:
→ plan Scene 08.

If Scene 08 requires precision-critical imagery:
→ generate/approve/add those assets before creating its implementation task.
```

## 14. Git Status
Report:
- branch;
- changed files;
- untracked files;
- ignored review media;
- commits/pushes.

## 15. Final Status

Finish with exactly one:

```text
TASK-014 STATUS: PASS
```

or

```text
TASK-014 STATUS: PARTIAL
```

or

```text
TASK-014 STATUS: BLOCKED
```

---

# Agent Behavior

- Use the exact user-supplied Scene 07 PNGs.
- Do not redraw or reinterpret them.
- Do not generate AI video.
- Preserve Scene 01–06.
- Preserve the supplied architecture meaning.
- Do not start Scene 08.
- Render review artifacts.
- Mark human review PENDING.
- Stop after feedback.
