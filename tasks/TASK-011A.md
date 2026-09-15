# TASK-011A — Fix Scene 04 MP4 Highlighting / Focus Timing Only

## Objective

Revise **Scene 04 — Original Request Path Before Redis** to fix the incorrect component highlighting seen in the rendered MP4.

The user has manually reviewed the Scene 04 video and found that:

```text
the source image is correct
the background is correct
the problem is the animated highlighting / focus overlays
```

This is a **motion/highlight correction task only**.

Do **not** change the approved source image.

Do **not** redesign Scene 04.

Do **not** change Scene 05 or later scenes.

---

## Human Review Decision

Scene 04 image/background status:

```text
APPROVED
```

Scene 04 MP4 highlight behavior:

```text
REVISION REQUIRED
```

The user specifically reported that the highlighting of components while the explanation progresses is incorrect.

Two review screenshots were supplied showing the current issue.

Observed problem pattern:
- translucent / focus rectangles do not align cleanly with the intended component;
- highlight regions are too broad and visually overlap unrelated areas;
- the emphasis does not track the intended explanation clearly;
- the highlight treatment makes the diagram look incorrect even though the underlying image itself is fine.

---

## Production Asset — Do Not Change

Keep using the exact existing asset:

```text
public/episodes/001-redis/assets/scene-04-original-request-path.jpg
```

This asset is already approved.

Do not:
- edit the JPG;
- replace the JPG;
- redraw the diagram;
- alter its background;
- change any text inside the image;
- generate a new image.

---

## Scope

Modify only the Scene 04 animation / focus-emphasis logic.

Likely file:

```text
src/episodes/001-redis/scenes/Scene04OriginalRequestPath.tsx
```

Inspect the actual implementation before changing anything.

Do not touch other scenes unless required only for regression verification.

---

## What Needs To Be Fixed

Current Scene 04 uses focus/highlight overlays during the 12-second MP4.

Those overlays must be corrected so that each emphasis:

1. highlights only the intended component;
2. does not cover unrelated components;
3. does not create large translucent blocks across the diagram;
4. does not visually misalign with the underlying JPG;
5. supports the explanation order cleanly.

---

## Intended Emphasis Sequence

The scene should communicate the request path in a restrained way:

```text
User / Client
→ Request
→ Application
→ Database
→ Expensive work
→ Response
→ Total Latency ~180 ms
```

The underlying image already contains this full story.

The animation should only guide attention.

Do **not** create new diagram elements.

---

## Preferred Highlight Behavior

Use one of these restrained approaches:

### Preferred
A thin, clean focus outline or subtle glow around only the intended region.

### Acceptable
A soft localized emphasis using:
- opacity;
- small scale;
- thin border;
- subtle glow;
- slight vignette/focus shift.

### Avoid
- large semi-transparent filled rectangles;
- overlays that cover neighboring labels;
- broad blocks that obscure the diagram;
- stacked overlapping focus frames;
- focus areas that visibly drift away from their target;
- excessive motion.

---

## Suggested Focus Targets

Inspect the actual JPG and derive the coordinates carefully.

At minimum, the emphasis sequence should correctly target:

### 1. Request path
Highlight only the request path region:

```text
User / Client → Request → Application
```

Do not cover the Database or Expensive Work blocks yet.

### 2. Database
Highlight only the Database block.

### 3. Expensive Work
Highlight only the Expensive Work block.

This is the most important emphasis.

### 4. Total Latency
Highlight only:

```text
Total Latency: ~180 ms
```

Do not include unrelated diagram content.

---

## Coordinate / Alignment Requirement

Do not guess overlay coordinates casually.

Use the rendered Scene 04 frame and the source asset dimensions to verify each focus region.

If needed:
- inspect the source image dimensions;
- inspect the Remotion render scale;
- map source coordinates to composition coordinates;
- account for `objectFit`, scaling, and any letterboxing/padding.

The focus overlay must remain aligned at all relevant frames.

---

## Strong Recommendation

If the current implementation uses fixed rectangles that are hard to align reliably, simplify.

It is better to have:

```text
fewer, accurate highlights
```

than:

```text
many inaccurate highlights
```

If necessary, remove one or more focus frames and rely on timing + subtle global motion instead.

The image already explains the architecture.

The highlight is only support.

---

## Motion Requirements

Consult:

```text
animate
review-animations
```

Use Remotion-native timing only:

```text
useCurrentFrame()
interpolate()
motionPresets
scene-relative timing
```

No AI video.

No new media.

No redesign.

---

## Timing

Keep the current overall Scene 04 duration unless the highlight correction genuinely requires a small timing adjustment.

The current Scene 04 duration is approximately:

```text
12 seconds
```

Do not significantly extend or shorten the scene in this task.

---

## Review Artifacts

Render:

```text
renders/review/task-011a/scene-04-highlight-request.png
renders/review/task-011a/scene-04-highlight-database.png
renders/review/task-011a/scene-04-highlight-expensive-work.png
renders/review/task-011a/scene-04-highlight-latency.png
renders/review/task-011a/scene-04-preview.mp4
```

Also render one clean frame with no focus overlay for comparison:

```text
renders/review/task-011a/scene-04-clean.png
```

And regressions:

```text
renders/review/task-011a/scene-01-regression.png
renders/review/task-011a/scene-02-regression.png
renders/review/task-011a/scene-03-regression.png
```

No need to modify Scene 05+.

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the Request/Application highlight is correctly aligned;
2. whether the Database highlight is correctly aligned;
3. whether the Expensive Work highlight is correctly aligned;
4. whether the Total Latency highlight is correctly aligned;
5. whether any overlay covers unrelated content;
6. whether the MP4 now feels cleaner and easier to follow;
7. whether the original approved image/background remains unchanged.

Human review status:

```text
PENDING
```

---

## External Asset Requests

```text
None.
```

Do not generate or request any new image/video assets.

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

```text
Scene 04 highlight-request still
Scene 04 highlight-database still
Scene 04 highlight-expensive-work still
Scene 04 highlight-latency still
Scene 04 preview MP4
Scene 01 regression
Scene 02 regression
Scene 03 regression
```

---

## Acceptance Criteria

TASK-011A is complete only when:

- [ ] The original Scene 04 JPG remains unchanged.
- [ ] The background remains unchanged.
- [ ] Only Scene 04 focus/highlight motion is revised.
- [ ] Request/Application emphasis is correctly aligned.
- [ ] Database emphasis is correctly aligned.
- [ ] Expensive Work emphasis is correctly aligned.
- [ ] Total Latency emphasis is correctly aligned.
- [ ] No large translucent blocks obscure unrelated content.
- [ ] No focus rectangle overlaps unrelated labels/components.
- [ ] Motion remains restrained.
- [ ] Scene duration remains effectively unchanged.
- [ ] Scene 01 regression passes.
- [ ] Scene 02 regression passes.
- [ ] Scene 03 regression passes.
- [ ] Required PNG review frames are rendered.
- [ ] Revised MP4 is rendered.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] `feedbacks/task-011a-feedback.md` is created.

---

## Required Feedback Report

Create:

```text
feedbacks/task-011a-feedback.md
```

It must contain:

### 1. Summary
Explain that this task only corrected Scene 04 highlight/focus behavior.

### 2. Root Cause
Explain what caused the incorrect highlighting.

Examples:
- wrong fixed coordinates;
- scaling mismatch;
- object-fit mismatch;
- oversized focus regions;
- incorrect timing;
- multiple overlays colliding.

Report the real cause found in code.

### 3. Fix
Explain:
- what focus overlays were changed;
- whether any were removed;
- how coordinates/alignment were corrected;
- whether timing changed.

### 4. Source Asset Preservation
Confirm:
- exact JPG path;
- no image modification;
- no background modification.

### 5. Review Artifacts
List exact paths.

### 6. Human Review Requests
For each artifact include:
- Artifact
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 7. External Asset Requests

```text
None.
```

### 8. Verification Results

PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- request highlight frame
- database highlight frame
- expensive-work highlight frame
- latency highlight frame
- Scene 04 MP4
- Scene 01 regression
- Scene 02 regression
- Scene 03 regression

### 9. Problems / Risks
Report any remaining alignment concern.

### 10. Recommended Next Step

```text
If Scene 04 MP4 highlight behavior is human-approved:
→ keep Scene 04 locked and continue reviewing later scene MP4s.

Otherwise:
→ revise only Scene 04 highlight logic again.
```

### 11. Git Status
Report:
- branch;
- changed files;
- untracked files;
- ignored review media;
- commits/pushes.

### 12. Final Status

Finish with exactly one:

```text
TASK-011A STATUS: PASS
```

or

```text
TASK-011A STATUS: PARTIAL
```

or

```text
TASK-011A STATUS: BLOCKED
```

---

## Agent Behavior

- Do not modify the Scene 04 source image.
- Do not modify the background.
- Do not redesign the scene.
- Fix only the highlight/focus behavior in the MP4.
- Prefer fewer accurate highlights over many inaccurate ones.
- Do not start new production work.
- Render review artifacts.
- Stop after feedback.
