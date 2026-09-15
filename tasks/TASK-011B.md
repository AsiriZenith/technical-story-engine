# TASK-011B — Convert Scene 04 Highlighting to Spotlight Approach

## 1. Objective

Update **Scene 04** so that its image-based emphasis uses the same **spotlight approach** that was approved for Scene 07, instead of the current rectangle/glow-style highlight treatment.

This task belongs to the **TASK-011** scene family and is a follow-up patch task.

The user reviewed the current Scene 04 output and is **not satisfied** with the current highlight style.  
The request is to apply the **spotlight approach** to this scene as well.

Important:

- **Do not change the source image**
- **Do not redesign the scene**
- **Do not regenerate assets**
- **Only update the MP4 behavior / scene rendering**
- **Create a feedback file at the end**

---

## 2. Scene Scope

Target scene:

```text
Scene 04 — “Before Redis”
```

Expected review render location remains under the Scene 04 review area, for example:

```text
renders/review/task-011b/
```

Do not work on unrelated scenes.

---

## 3. Source Asset Preservation

Use the exact existing Scene 04 image asset already used by the project.

Do **not**:

- replace the image;
- redraw the image;
- crop the image differently;
- edit text inside the image;
- modify colors baked into the asset.

This task is **animation / emphasis only**.

---

## 4. Required Highlighting Change

Replace the current box/glow emphasis style with the approved **spotlight** method.

Use the same general spotlight system already established in the project:

```text
SpotlightImage
```

Use the same visual principle:

```text
shared transformed wrapper
├── dimmed base image
└── masked full-brightness image
```

Rules:

- no rectangle highlight boxes for the converted targets;
- no thick glow box around the selected element;
- no hard rectangular mask edge;
- surrounding content should remain readable;
- spotlight must feel subtle and professional;
- both image layers must stay inside the same transformed wrapper;
- no drift between spotlight and image during scale / motion.

---

## 5. Spotlight Settings

Start with the approved values already accepted for Scene 07:

```text
dimBrightness: 0.58
featherPaddingFactor: 1.35
```

Use these values if they work well for Scene 04 too.

If Scene 04 needs a slight retune because its image composition is different, that is allowed **only if truly necessary**, and the exact final values must be documented in the feedback.

Do not make large stylistic changes.

---

## 6. Scene 04 Expected Behavior

This scene should guide attention through the “before Redis” flow more clearly.

Use spotlight emphasis for the relevant image targets in sequence.

At minimum, convert the important explanatory beats to spotlight-based emphasis, especially where the current rectangle/glow approach is visually unsatisfying.

Likely emphasis targets in Scene 04 include the major elements already being explained in the scene, such as:

```text
Request
Application
Database
Expensive work
```

Use the actual current scene logic and narration timing as the source of truth.

Important constraints:

- only one spotlight should be active at a time;
- spotlight handoff should be sequential and clean;
- no overlap unless the scene already depends on a tiny handoff blend;
- if overlap currently exists, reduce or remove it where appropriate;
- do not create visual confusion.

---

## 7. Preserve Existing Scene Structure

Keep the existing:

- scene concept;
- duration;
- composition structure;
- source asset usage;
- overall motion language.

Do not:

- redesign the layout;
- replace the image with a new illustration;
- add new assets;
- change the story beat order unless needed to fix spotlight overlap.

This is a **highlighting-system upgrade**, not a scene rewrite.

---

## 8. Implementation Guidance

Expected files may include things like:

```text
src/shared/components/SpotlightImage.tsx
src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx
```

Possible work:

1. inspect current Scene 04 highlight implementation;
2. identify which current highlight boxes / glow boxes are used;
3. replace those image-emphasis moments with `SpotlightImage`;
4. keep timing behavior aligned with the current explanation;
5. ensure transform safety;
6. keep the scene duration unchanged;
7. remove or stop using the old highlight boxes in Scene 04 for the converted targets.

Do not refactor unrelated scenes in this task.

---

## 9. Review Artifacts

Render the following review outputs:

```text
renders/review/task-011b/scene-04-start.png
renders/review/task-011b/scene-04-request-spotlight.png
renders/review/task-011b/scene-04-application-spotlight.png
renders/review/task-011b/scene-04-database-spotlight.png
renders/review/task-011b/scene-04-expensive-work-spotlight.png
renders/review/task-011b/scene-04-handoff-check.png
renders/review/task-011b/scene-04-end.png
renders/review/task-011b/scene-04-preview.mp4
```

If one of those target labels does not exactly exist in the current scene implementation, render the nearest equivalent spotlight checkpoint and document the mapping in feedback.

The handoff-check artifact should help verify that two spotlights are not fighting each other.

---

## 10. Human Review Goals

The user should be able to review:

1. whether the spotlight method looks better than the old glow-box method;
2. whether the correct part of the image is emphasized;
3. whether the surrounding image remains readable;
4. whether there is any hard-edged rectangular mask;
5. whether the spotlight drifts during scaling;
6. whether spotlight transitions overlap awkwardly;
7. whether the scene now feels cleaner and more professional.

Human review status must be:

```text
PENDING
```

---

## 11. Validation

Run and report:

```text
TypeScript
build
composition discovery
scene validation
asset validation
```

Also verify:

- source image unchanged;
- scene duration unchanged;
- spotlight layer aligned with image transform;
- no seam between stacked image layers;
- no drift;
- no hard rectangle edge;
- no double-image ghosting;
- only one spotlight visible at a time for the converted targets;
- preview MP4 rendered successfully.

---

## 12. Acceptance Criteria

TASK-011B is complete only when:

- [ ] Scene 04 source image is unchanged.
- [ ] Scene 04 uses spotlight-style emphasis for the converted image targets.
- [ ] Old rectangle/glow highlight treatment is removed for the converted targets.
- [ ] SpotlightImage approach is used.
- [ ] Spotlight tuning values are documented.
- [ ] Surrounding content remains readable.
- [ ] No hard rectangular mask edge is visible.
- [ ] No spotlight drift occurs during scaling / motion.
- [ ] No seam or ghosting appears between image layers.
- [ ] Scene duration remains unchanged.
- [ ] No new source image asset is generated.
- [ ] Review PNGs are rendered.
- [ ] Scene 04 preview MP4 is rendered.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] feedbacks/task-011b-feedback.md is created.
- [ ] Human review status is PENDING.

---

## 13. Required Feedback File

Create:

```text
feedbacks/task-011b-feedback.md
```

It must contain the following sections.

### 1. Summary
Explain what changed in Scene 04 and confirm this task converted the scene to the spotlight-based emphasis approach.

### 2. Final Spotlight Settings
Report the exact final values used:

```text
dimBrightness
featherPaddingFactor
```

If they remained:

```text
0.58
1.35
```

say so explicitly.

### 3. Converted Targets
List the Scene 04 targets that were converted to spotlight emphasis.

### 4. Timing
List the spotlight timing windows and confirm whether spotlight windows overlap or not.

### 5. Transform Safety
Confirm both image layers share the same transformed wrapper.

### 6. Source Asset Preservation
Confirm the source image was not changed.

### 7. Old Highlight Removal
State which old glow-box / rectangle highlight usages were removed or replaced.

### 8. Review Artifacts
List exact rendered artifact paths.

### 9. Human Review Requests
For each rendered artifact provide:

- Artifact
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 10. Verification Results
Report PASS / FAIL / NOT RUN for:

- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- source image preservation
- request spotlight
- application spotlight
- database spotlight
- expensive-work spotlight
- handoff check
- no seam
- no drift
- no hard edge
- no simultaneous conflicting spotlights
- preview MP4

### 11. Problems / Risks
Note any remaining issue or uncertainty.

### 12. Recommended Next Step
Use exactly:

```text
If TASK-011B is human-approved:
→ lock Scene 04 spotlight behavior and continue with the next planned scene task.

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
End with exactly one of:

```text
TASK-011B STATUS: PASS
```

or

```text
TASK-011B STATUS: PARTIAL
```

or

```text
TASK-011B STATUS: BLOCKED
```

---

## 14. Agent Stop Condition

After:

- updating Scene 04;
- rendering the review artifacts;
- creating `feedbacks/task-011b-feedback.md`;

stop immediately.

Do not continue to another task automatically.
