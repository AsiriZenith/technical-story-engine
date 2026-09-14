# TASK-008 — RESET AND REBUILD Scene 03 Using the Manually Added Exact Diagram Assets

## Objective

Discard the failed Scene 03 implementation work from the previous TASK-008 / TASK-008A / TASK-008B / TASK-008C attempts, return to the clean pre-Scene-03 baseline, and rebuild Scene 03.

This time, **do not redraw, reinterpret, or recreate the two core diagrams**.

The user has now manually added the exact diagram assets that must be used in Scene 03:

```text
public/episodes/001-redis/assets/scene-03-joke-diagram.png
public/episodes/001-redis/assets/scene-03-end-diagram.png
```

These are now the required production assets for Scene 03.

The agent must use these exact images in the Scene 03 implementation.

Do not begin Scene 04.

---

## Part 0 — RESET FAILED TASK-008 CHANGES FIRST

Before implementing anything new, remove the failed Scene 03 work created by previous TASK-008-family attempts.

The target baseline is the last clean state before Scene 03 implementation began, i.e. the committed TASK-007 / approved Scene 01 + Scene 02 state, while preserving the newly added Scene 03 PNG assets.

Before resetting:

```bash
git status
git log --oneline -10
```

### Safety rule

Do not blindly run a destructive reset if there are newer unrelated commits.

If HEAD contains new unrelated work after TASK-007, stop and report before changing anything.

If the Scene 03 changes are uncommitted, restore only the Scene-03-related code and remove only the untracked files created by failed TASK-008 attempts.

Do not delete:
- Scene 01;
- Scene 02;
- TASK-007 skill installation;
- the newly added Scene 03 PNG assets;
- unrelated project documentation;
- unrelated user work.

### Preserve these files

```text
public/episodes/001-redis/assets/scene-03-joke-diagram.png
public/episodes/001-redis/assets/scene-03-end-diagram.png
```

After cleanup, verify the repository still builds and Scenes 01–02 still render correctly.

---

## Critical Change From Previous Attempts

Previous attempts failed because the agent kept doing this:

```text
reference image
→ reinterpret
→ redraw different diagram
→ output wrong picture
```

That must stop.

This task requires:

```text
exact manually added diagram asset
→ use that exact asset in the scene
→ keep project background and motion system around it
```

The core rule is:

```text
Use the user's exact PNG assets.
Do not redraw them.
Do not reinterpret them.
Do not substitute different objects.
```

---

## Required Scene 03 Assets

Use these exact files:

### Joke scene asset
```text
public/episodes/001-redis/assets/scene-03-joke-diagram.png
```

### End scene asset
```text
public/episodes/001-redis/assets/scene-03-end-diagram.png
```

These are no longer “reference-only” files.

They are the intended visual diagram assets for Scene 03.

### Required behavior

- import and render the exact PNG assets;
- preserve their visual content;
- do not redraw the diagrams in code;
- do not replace their objects with custom shapes;
- do not approximate them with a new agent-generated layout.

The agent may:
- scale them;
- position them;
- animate them;
- layer localized text around/over them if needed;
- blend them into the existing scene system.

The agent may not:
- redesign them;
- reconstruct them loosely;
- invent alternative diagrams.

---

## Scene 03 Goal

Scene 03 still communicates:

```text
Wrong idea:
Redis made the database faster.

Correct idea:
The repeated work changed.
The database itself did not become faster.
We stopped repeating some of the work.
```

But the two diagram beats must now come from the exact PNG assets already added by the user.

---

## Part A — Use the Exact Joke Diagram Asset

Use:

```text
public/episodes/001-redis/assets/scene-03-joke-diagram.png
```

for the misconception/joke beat.

### Requirements

- render the exact image;
- fit it into the Scene 03 layout cleanly;
- preserve the existing dark technical background behind it;
- add or retain only the surrounding scene structure needed for readability, localization, and motion;
- do not redraw the character/object staging from scratch.

If the image already contains some text or visual labels, the agent must decide carefully whether to:
- keep them as part of the asset; or
- cover/supplement them with localized production text where required.

But the core diagram image itself must remain the user-provided PNG.

---

## Part B — Use the Exact End Diagram Asset

Use:

```text
public/episodes/001-redis/assets/scene-03-end-diagram.png
```

for the final payoff beat.

### Requirements

- render the exact image;
- preserve the diagram content;
- integrate it into the established video background/style;
- do not redraw the before/after explanation as a new agent-designed diagram.

Again, surrounding localized text or emphasis may be added if necessary, but the diagram image itself must remain the user-provided PNG.

---

## Part C — Text Overlap Bug at ~0.02s

There is a text-overlap issue in the Scene 03 video around:

```text
0.02 seconds
```

This must be fixed.

Inspect the first frames explicitly.

Render diagnostic stills at or near:

```text
frame 0
frame 1
frame 2
frame 3
```

Find exactly which text elements overlap and fix the root cause.

Possible causes:
- overlapping scene transition timing;
- multiple text layers visible too early;
- Sequence overlap;
- opacity/enter timing;
- layout collision.

Required outcome:
- no visible unreadable text overlap;
- no stacked text collision at the start of the scene;
- encoded MP4 also confirms the fix.

---

## Part D — Existing Project Style Must Remain

Preserve:
- dark technical grid background;
- Scene 01–02 overall vibe;
- existing typography family;
- existing palette;
- safe margins;
- EN/DE/FR shared implementation.

The scene should feel like part of the same episode.

The newly added PNG diagram assets should be integrated into the existing video system — not shown on a random foreign background.

---

## Part E — Required Skills

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

Important:
- use the skills for motion/layout judgment;
- do not let those skills cause diagram reinterpretation.

Motion advice must still be translated into Remotion-native logic:

```text
useCurrentFrame()
interpolate()
spring()
scene-relative timing
```

---

## Part F — Motion Expectations

The exact PNG assets may be animated, introduced, emphasized, or transitioned, but not redrawn.

Examples of acceptable motion:
- fade/slide/scale in;
- small emphasis motion;
- mask reveal;
- focus transition between question → joke asset → correction → end asset;
- gentle movement that improves readability.

Unacceptable behavior:
- replacing the asset with reconstructed shapes;
- breaking the asset into a newly invented diagram;
- over-animating until the explanation becomes harder to read.

---

## Part G — Localization

Support:

```text
en
de
fr
```

Use one shared implementation.

If the PNGs contain fixed English text, document how localization was handled.

Preferred approach:
- preserve the exact diagrams;
- add supplemental localized text outside the PNG where necessary;
- avoid destructive editing of the asset unless absolutely necessary.

If some baked text in the PNG cannot be localized cleanly, document that constraint instead of silently altering the diagram.

---

## Part H — Required Review Artifacts

Create:

```text
renders/review/task-008/scene-03-start.png
renders/review/task-008/scene-03-joke.png
renders/review/task-008/scene-03-end.png
renders/review/task-008/scene-03-preview.mp4
```

Also create overlap diagnostics:

```text
renders/review/task-008/overlap-frame-000.png
renders/review/task-008/overlap-frame-001.png
renders/review/task-008/overlap-frame-002.png
renders/review/task-008/overlap-frame-003.png
```

If useful, also render:
```text
scene-03-joke-de.png
scene-03-end-de.png
scene-03-joke-fr.png
scene-03-end-fr.png
```

All review media must remain Git-ignored.

---

## Part I — Mandatory Asset-Fidelity QA

Before writing feedback, inspect:

```text
public/episodes/001-redis/assets/scene-03-joke-diagram.png
vs
renders/review/task-008/scene-03-joke.png
```

and:

```text
public/episodes/001-redis/assets/scene-03-end-diagram.png
vs
renders/review/task-008/scene-03-end.png
```

The agent must explicitly confirm:

```text
Did I use the exact user-provided PNG assets?
Did I avoid redrawing or reinterpreting them?
Did I preserve the diagram content?
Did I only integrate them into the existing background/style/motion system?
```

If any answer is NO, revise before completion.

---

## Human Review Requests

Ask the human reviewer to confirm:

1. the joke scene uses the exact `scene-03-joke-diagram.png` asset;
2. the end scene uses the exact `scene-03-end-diagram.png` asset;
3. the agent did not redraw or reinterpret those diagrams;
4. the assets were integrated cleanly into the existing video style;
5. the 0.02s text-overlap issue is fully fixed;
6. Scene 03 now looks correct and professional;
7. Scene 03 still fits the same visual family as Scenes 01–02.

Human review status:

```text
PENDING
```

---

## External Asset Requests

```text
None.
```

The required assets already exist locally in the repository.

Do not request new external generation.

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
Scene 03 still renders
Scene 03 MP4
Scene 01 regression
Scene 02 regression
```

Also verify:
- frame 0–3 overlap diagnostics;
- encoded MP4 around 0.00–0.10s.

---

## Acceptance Criteria

TASK-008 is complete only when:

- [ ] Failed prior Scene 03 changes were safely cleared first.
- [ ] Scene 01 remains unchanged.
- [ ] Scene 02 remains unchanged.
- [ ] Both manually added Scene 03 PNG assets remain in place.
- [ ] The joke beat uses `scene-03-joke-diagram.png` exactly.
- [ ] The end beat uses `scene-03-end-diagram.png` exactly.
- [ ] The agent does not redraw or reinterpret either diagram.
- [ ] The assets are integrated into the project’s dark-grid background/style.
- [ ] Viewer-facing surrounding text is handled cleanly.
- [ ] 0.02s text overlap issue is fixed at the frame level.
- [ ] Encoded MP4 confirms the overlap fix.
- [ ] Required review PNGs exist.
- [ ] Required MP4 exists.
- [ ] Asset-fidelity QA is performed.
- [ ] `review-animations` QA is performed.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests says `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] EN/DE/FR remain valid.
- [ ] `feedbacks/task-008-feedback.md` is created.
- [ ] Scene 04 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-008-feedback.md
```

It must contain:

### 1. Reset Performed
Explain:
- what failed TASK-008-family code was removed/restored;
- baseline used;
- how unrelated work was protected.

### 2. Asset Usage
For each PNG:
- exact file path;
- where it was used;
- how it was integrated into the scene;
- confirmation that it was used directly rather than redrawn.

### 3. Joke Scene
Explain exactly how `scene-03-joke-diagram.png` was used.

Do not say merely:
```text
"inspired by"
```

State clearly that the exact user-provided asset was used.

### 4. End Scene
Explain exactly how `scene-03-end-diagram.png` was used.

Again, state clearly that the exact user-provided asset was used.

### 5. Background / Style Integration
Explain:
- how the existing project background was preserved;
- how the PNG assets were layered into the scene;
- any overlay text or motion added around them.

### 6. 0.02s Overlap Fix
Explain:
- root cause;
- exact fix;
- frame 0–3 validation;
- MP4 validation.

### 7. Skills Used
Report:
- technical-story-video
- frontend-design
- animate
- review-animations

### 8. Human Review Requests
For every artifact:
- path
- purpose
- what to review
- known issues
- `Human review status: PENDING`

### 9. External Asset Requests

Expected:

```text
None.
```

### 10. Verification Results

PASS / FAIL / NOT RUN for:
- reset to pre-Scene-03 baseline;
- TypeScript;
- build;
- composition discovery;
- scene validation;
- asset validation;
- Redis-EN;
- Redis-DE;
- Redis-FR;
- joke asset direct-use check;
- end asset direct-use check;
- overlap frames 0–3;
- overlap fix in encoded MP4;
- Scene 03 preview;
- Scene 01 regression;
- Scene 02 regression.

### 11. Problems / Risks
Explicitly report any localization limitations or other constraints caused by baked content inside the PNG assets.

### 12. Recommended Next Step

```text
If Scene 03 is human-approved:
→ proceed to Scene 04.

Otherwise:
→ revise Scene 03 only.
```

### 13. Git Status
Report branch, changed/untracked files, ignored review media, commits/pushes.

### 14. Final Status

Finish with exactly one:

```text
TASK-008 STATUS: PASS
```

or

```text
TASK-008 STATUS: PARTIAL
```

or

```text
TASK-008 STATUS: BLOCKED
```

---

## Agent Behavior

- Use the exact user-provided Scene 03 PNG assets.
- Do not redraw or reinterpret the diagrams.
- Preserve the project background and overall video system.
- Fix the 0.02s overlap at the actual frame level.
- Do not start Scene 04.
- Render actual review media.
- Stop after TASK-008 feedback.
