# TASK-014C — Tune Scene 07 Redis Spotlight Prototype

## Objective

Tune the existing Redis/Cache spotlight prototype in Scene 07.

The spotlight technique itself is approved.

This task is not a redesign and is not a scene-wide conversion yet.

Only tune the current Redis/Cache spotlight so that:

- the focused area is tighter;
- the rest of the image is not dimmed too aggressively;
- the effect feels subtle and professional.

Do not convert Database yet.
Do not modify the technical-architecture beat yet.
Do not change source images.

## Current Approved Technique

Keep the existing `SpotlightImage` approach:

- one dimmed base image;
- one identical image above it;
- a soft feathered mask;
- normalized 0–1 region coordinates;
- both image layers inside the same transformed wrapper;
- no border;
- no glow rectangle;
- no source-image modification.

Do not return to `FocusBox` for the Redis/Cache target.

## Current Prototype Values

Current defaults are approximately:

```text
dimBrightness: 0.45
featherPaddingFactor: 1.7
```

The current spotlight is visually acceptable, but:
- the surrounding frame becomes too dark;
- the bright zone is slightly too broad;
- the bright area spills farther into the ready shelf than necessary.

## Target Tuning

Use these as the starting values:

```text
dimBrightness: 0.58
featherPaddingFactor: 1.35
```

You may make small adjustments only if the rendered result clearly benefits from them.

Recommended acceptable ranges:

```text
dimBrightness: 0.55–0.60
featherPaddingFactor: 1.30–1.40
```

Do not go outside these ranges unless there is a clear technical reason documented in feedback.

## Visual Goal

At peak spotlight:

- Redis / Cache remains clearly dominant;
- surrounding content remains readable;
- the ready shelf may receive a small amount of soft spill;
- the rest of the frame should not look almost black;
- no rectangular edge should be visible.

The effect should feel like gentle attention guidance, not dramatic stage lighting.

## Scope

Modify only the Redis/Cache spotlight prototype in Scene 07.

Expected files may include:

```text
src/shared/components/SpotlightImage.tsx
src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx
```

Only touch what is necessary.

Do not:
- modify source PNGs;
- change Scene 07 duration;
- add Database spotlight;
- modify technical-architecture spotlight logic;
- change Scene 06;
- redesign the scene;
- add new assets;
- change narration/timing structure.

## Important Implementation Rule

Keep the same transform-safe structure:

```text
shared transformed wrapper
├── dimmed base image
└── masked full-brightness image
```

Both image layers must remain pixel-identical in:
- size;
- object-fit;
- position;
- transform.

Do not introduce separate transforms.

## Review Artifacts

Render:

```text
renders/review/task-014c/scene-07-clean-before.png
renders/review/task-014c/scene-07-spotlight-peak.png
renders/review/task-014c/scene-07-spotlight-fadeout.png
renders/review/task-014c/scene-07-preview.mp4
```

The preview should cover approximately 2s → 5s of Scene 07 so the Redis spotlight fade-in, hold, and fade-out are visible.

## Human Review Requests

Ask the user to review:
1. whether the overall image remains readable during the spotlight;
2. whether the dim level feels subtle enough;
3. whether the bright area is tighter around Redis/Cache;
4. whether the bright zone still has a natural soft edge;
5. whether the ready-shelf spill feels acceptable;
6. whether there is any seam, ghosting, drift, or rectangular edge;
7. whether this tuned style should become the standard for future spotlight highlights.

Human review status:

```text
PENDING
```

## Validation

Run:

```text
typecheck
composition discovery
```

Also verify:
- clean frame has no visible seam;
- peak frame has no hard rectangle;
- spotlight tracks push-in with no drift;
- fade-out returns cleanly to normal brightness.

## Acceptance Criteria

TASK-014C is complete only when:

- [ ] Spotlight technique remains unchanged structurally.
- [ ] Redis/Cache is the only converted spotlight target.
- [ ] Surrounding image is less dark than TASK-014B.
- [ ] Bright zone is tighter than TASK-014B.
- [ ] No new border or glow rectangle appears.
- [ ] No hard rectangular mask edge appears.
- [ ] No drift occurs during push-in.
- [ ] Source images remain unchanged.
- [ ] Scene duration remains unchanged.
- [ ] Database is not converted yet.
- [ ] Technical architecture beat is not modified.
- [ ] Required PNGs are rendered.
- [ ] Short preview MP4 is rendered.
- [ ] Human review status is PENDING.
- [ ] TypeScript passes.
- [ ] Composition discovery passes.
- [ ] `feedbacks/task-014c-feedback.md` is created.

## Required Feedback Report

Create:

```text
feedbacks/task-014c-feedback.md
```

It must contain:

### 1. Summary
Explain that this task only tuned the existing Redis spotlight prototype.

### 2. Final Tuning Values
Report the exact final values used for:

```text
dimBrightness
featherPaddingFactor
```

If different from:

```text
0.58
1.35
```

explain why.

### 3. Visual Result
Explain:
- surrounding brightness;
- spotlight tightness;
- feather softness;
- ready-shelf spill.

### 4. Transform Safety
Confirm both image layers still share the exact same transformed wrapper.

### 5. Source Asset Preservation
Confirm no PNG was modified.

### 6. Review Artifacts
List exact paths.

### 7. Human Review Requests
For each artifact include:
- Artifact
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

### 8. Verification Results
PASS / FAIL / NOT RUN for:
- TypeScript
- composition discovery
- clean frame
- peak frame
- fade-out frame
- preview MP4
- no seam
- no drift
- no hard rectangle

### 9. Problems / Risks
Report any remaining visual concern.

### 10. Recommended Next Step

Use exactly:

```text
If TASK-014C is human-approved:
→ reuse these exact spotlight tuning values for the next Scene 07 spotlight conversion.

Otherwise:
→ tune only these two spotlight parameters again.
```

### 11. Git Status
Report:
- branch;
- changed files;
- untracked files;
- review media;
- commits/pushes.

### 12. Final Status

Finish with exactly one:

```text
TASK-014C STATUS: PASS
```

or

```text
TASK-014C STATUS: PARTIAL
```

or

```text
TASK-014C STATUS: BLOCKED
```

## Agent Behavior

- Do not redesign.
- Do not expand scope.
- Do not convert Database.
- Do not modify the technical-architecture beat.
- Do not modify source images.
- Tune only the Redis spotlight.
- Render review artifacts.
- Stop after feedback.
