# TASK-013A — Fix Scene 06 MP4 Ready-Shelf Highlighting Only

## Objective

Revise **Scene 06 — The Ready Shelf / Cache-Hit Analogy** to fix the incorrect ready-shelf focus/highlight seen in the rendered MP4.

The user has manually reviewed the Scene 06 video and found that:

```text
the source images are correct
the background is correct
the problem is the animated focus/highlight overlay
```

This is a **motion/highlight correction task only**.

Do **not** change the approved source images.

Do **not** redesign Scene 06.

Do **not** change Scene 07 or any other production scene.

---

## Human Review Decision

Scene 06 image/background status:

```text
APPROVED
```

Scene 06 MP4 ready-shelf highlight behavior:

```text
REVISION REQUIRED
```

The user specifically reported the problem from approximately:

```text
2s → 5s
```

in:

```text
renders/review/task-013/scene-06-preview.mp4
```

The supplied review screenshot shows the current issue clearly.

Observed problem:
- the amber ready-shelf focus rectangle is too large;
- it extends beyond the actual shelf cabinet;
- it overlaps the cashier/counter region;
- it does not tightly match the intended ready-shelf area;
- the highlight draws attention to an incorrect region even though the underlying image itself is correct.

---

## Important Prior Lesson

TASK-011A fixed the same class of problem in Scene 04.

Follow the same discipline:

```text
inspect source image
→ derive target coordinates from actual image layout
→ account for render scaling / objectFit
→ use a tight, accurate highlight
→ verify with rendered stills
```

Do not randomly nudge the current rectangle.

---

## Production Assets — Do Not Change

Keep using the exact existing assets:

```text
public/episodes/001-redis/assets/scene-06-ready-shelf.png
public/episodes/001-redis/assets/scene-06-serve-from-shelf.png
```

These assets are approved.

Do not:
- edit either PNG;
- replace either PNG;
- redraw any restaurant elements;
- alter their backgrounds;
- change any baked text;
- generate new media.

---

## Scope

Modify only the Scene 06 focus/highlight motion.

Likely file:

```text
src/episodes/001-redis/scenes/Scene06ReadyShelfCacheHit.tsx
```

Inspect the actual implementation first.

Do not modify unrelated scene code.

---

## What Needs To Be Fixed

The current Scene 06 ready-shelf focus overlay appears approximately between:

```text
~2s and ~5s
```

The overlay must be corrected so that it:

1. highlights only the actual ready-shelf cabinet;
2. does not cover the cashier;
3. does not cover unrelated counter space;
4. does not extend significantly below or beside the shelf;
5. remains visually aligned during the entire visible highlight window;
6. remains subtle and supportive.

---

## Correct Highlight Target

The highlight should tightly emphasize the **ready shelf cabinet itself**:

```text
the cabinet frame
+ the “Ready shelf” sign
+ the shelf containing the prepared burger
```

It should **not** include:

```text
cashier
cash register
chef
large areas of the counter
empty restaurant background
```

The purpose is simply:

```text
Look here: the burger is already waiting on the shelf.
```

---

## Preferred Highlight Behavior

Preferred treatment:

```text
thin amber outline
+ subtle glow
+ little or no fill
```

The underlying image should remain fully readable.

Avoid:
- large semi-transparent boxes;
- oversized rounded rectangles;
- focus frames that drift into the cashier;
- strong filled overlays;
- multiple simultaneous highlights;
- excessive animation.

---

## Coordinate / Alignment Requirement

Do not guess.

Inspect:

```text
public/episodes/001-redis/assets/scene-06-ready-shelf.png
```

and determine:

- source image dimensions;
- ready-shelf cabinet bounds in source-image coordinates;
- rendered image geometry inside the 1920×1080 composition;
- `objectFit` behavior;
- any scale/pan transforms applied during the beat.

### Critical requirement

The focus frame must follow the same transform as the image.

If the image itself is slowly scaling or translating during the 2s–5s window, a fixed overlay in composition coordinates may drift relative to the shelf.

If that is the root cause:

```text
either
→ apply equivalent transform to the highlight

or
→ simplify/remove the image pan while the highlight is visible
```

Choose the simpler and more reliable solution.

The highlight must remain aligned throughout the whole visible interval, not just at one sampled frame.

---

## Strong Recommendation

If accurate tracking becomes unnecessarily complex:

```text
remove the rectangular focus frame
```

and use a safer alternative such as:

- subtle localized glow;
- restrained vignette;
- small pulsing outline;
- brief opacity emphasis;
- no highlight at all if the image already explains the point clearly.

The supplied image already makes the ready shelf obvious.

A highlight is optional support, not required content.

Accuracy is more important than having an overlay.

---

## Timing

Keep the existing Scene 06 overall duration unchanged.

Current scene duration:

```text
14 seconds
```

Do not significantly retime Scene 06.

Only adjust the ready-shelf emphasis timing if necessary.

Target problem window:

```text
approximately 2s → 5s
```

---

## Motion Requirements

Consult:

```text
animate
review-animations
```

Use only Remotion-native timing:

```text
useCurrentFrame()
interpolate()
motionPresets
scene-relative timing
```

No new media.

No AI video.

No redesign.

---

## Review Artifacts

Render multiple points across the problem interval, not just one frame.

Required:

```text
renders/review/task-013a/scene-06-highlight-2s.png
renders/review/task-013a/scene-06-highlight-3s.png
renders/review/task-013a/scene-06-highlight-4s.png
renders/review/task-013a/scene-06-highlight-5s.png
renders/review/task-013a/scene-06-clean.png
renders/review/task-013a/scene-06-preview.mp4
```

The 2s / 3s / 4s / 5s stills are required because alignment must remain correct while the image is moving.

Also render regressions:

```text
renders/review/task-013a/scene-01-regression.png
renders/review/task-013a/scene-02-regression.png
renders/review/task-013a/scene-03-regression.png
renders/review/task-013a/scene-04-regression.png
renders/review/task-013a/scene-05-regression.png
```

No Scene 07 modification is required.

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether the shelf highlight is correctly aligned at ~2s;
2. whether it remains aligned at ~3s;
3. whether it remains aligned at ~4s;
4. whether it remains aligned at ~5s;
5. whether the overlay avoids the cashier/counter;
6. whether the highlight feels subtle rather than intrusive;
7. whether the approved source image remains unchanged;
8. whether the revised MP4 now feels correct.

Human review status:

```text
PENDING
```

---

## External Asset Requests

```text
None.
```

Do not generate or request new assets.

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
Scene 06 highlight @ 2s
Scene 06 highlight @ 3s
Scene 06 highlight @ 4s
Scene 06 highlight @ 5s
Scene 06 clean frame
Scene 06 revised MP4
Scene 01 regression
Scene 02 regression
Scene 03 regression
Scene 04 regression
Scene 05 regression
```

---

## Acceptance Criteria

TASK-013A is complete only when:

- [ ] Both Scene 06 source PNGs remain unchanged.
- [ ] Only Scene 06 focus/highlight logic is revised.
- [ ] Ready-shelf highlight aligns correctly around 2s.
- [ ] Ready-shelf highlight aligns correctly around 3s.
- [ ] Ready-shelf highlight aligns correctly around 4s.
- [ ] Ready-shelf highlight aligns correctly around 5s.
- [ ] Highlight does not cover cashier/counter unnecessarily.
- [ ] Highlight does not extend beyond the intended shelf region.
- [ ] Highlight remains restrained.
- [ ] Scene duration remains unchanged.
- [ ] No new media is generated.
- [ ] Scene 01 regression passes.
- [ ] Scene 02 regression passes.
- [ ] Scene 03 regression passes.
- [ ] Scene 04 regression passes.
- [ ] Scene 05 regression passes.
- [ ] Required stills are rendered.
- [ ] Revised MP4 is rendered.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] `feedbacks/task-013a-feedback.md` is created.

---

## Required Feedback Report

Create:

```text
feedbacks/task-013a-feedback.md
```

It must contain:

### 1. Summary
Explain that this task only corrected the Scene 06 ready-shelf focus/highlight behavior.

### 2. Root Cause
Report the real cause found in code.

Check specifically for:
- oversized fixed coordinates;
- incorrect source-to-canvas coordinate mapping;
- image scale/translation while overlay stays fixed;
- `objectFit` mismatch;
- highlight timing overlapping image motion.

Do not guess in the report.

### 3. Fix
Explain:
- final highlight bounds;
- whether highlight transforms now track the image;
- whether image motion was simplified;
- whether the rectangle was replaced with a safer emphasis;
- any timing adjustment.

### 4. Source Asset Preservation
Confirm:
- both exact PNG paths;
- no image modification;
- no background modification.

### 5. Review Artifacts
List all exact paths.

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
- highlight @ 2s
- highlight @ 3s
- highlight @ 4s
- highlight @ 5s
- Scene 06 MP4
- Scene 01 regression
- Scene 02 regression
- Scene 03 regression
- Scene 04 regression
- Scene 05 regression

### 9. Problems / Risks
Report any remaining alignment concern.

### 10. Recommended Next Step

```text
If Scene 06 MP4 highlighting is human-approved:
→ keep Scene 06 locked and continue reviewing remaining scene MP4s.

Otherwise:
→ revise only Scene 06 highlight logic again.
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
TASK-013A STATUS: PASS
```

or

```text
TASK-013A STATUS: PARTIAL
```

or

```text
TASK-013A STATUS: BLOCKED
```

---

## Agent Behavior

- Do not modify the Scene 06 source images.
- Do not modify their backgrounds.
- Do not redesign the scene.
- Fix only the ready-shelf focus/highlight behavior.
- Verify alignment across multiple frames while the image moves.
- Prefer removing the highlight over keeping an inaccurate one.
- Do not start new production work.
- Render review artifacts.
- Stop after feedback.
