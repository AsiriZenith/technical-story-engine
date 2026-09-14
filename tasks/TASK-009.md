# TASK-009 — Codify the Manual Asset Workflow Before Further Scene Production

## Objective

Before beginning the next content-production scene, update the project’s main workflow/instruction markdown files so future scene tasks follow the new approved asset workflow.

This task is a **process/documentation task**, not a new scene-production task.

The new rule is:

```text
Do not hand over image generation to the agent.
Scene-specific images/visual assets must be generated externally by the user,
reviewed by the user, manually added into the project at the intended location,
and only then may the agent use them to build the scene.
```

This decision comes directly from the successful outcome of TASK-008.

Do not begin Scene 04 in this task.

---

## Source of Truth for This Task

Read and use:

```text
feedbacks/task-008-feedback.md
```

Important conclusion from that report:

```text
Scene 03 worked correctly only after the exact user-provided PNG assets were used directly.
Previous attempts failed when the agent tried to reinterpret or recreate the diagrams.
```

That lesson must now be written into the project’s main instructions/workflow documents.

---

## Human Decision To Codify

The human has approved the following workflow direction:

```text
For future scene work, image generation should happen from our end first.
We will generate or refine scene images/assets ourselves.
We will manually place those assets into the project.
Then the agent may use those exact assets in scene implementation.
```

Equivalent meaning:
- no agent-led image-generation handoff for scene visuals;
- no agent reinterpretation of desired diagrams if a manual asset will exist;
- the user keeps direct control of scene-image quality before scene implementation starts.

---

## Required Outcome

Update the project’s main markdown guidance so future tasks and future agent work follow this pipeline:

```text
1. Identify whether a scene needs external visual assets.
2. If yes, stop scene implementation until the user creates/approves those assets.
3. The user manually adds the approved assets into the repository.
4. The agent uses those exact assets in the scene.
5. The agent does not redraw, reinterpret, or substitute them unless explicitly instructed.
6. Scene tasks should clearly distinguish:
   - reference-only assets
   - final production assets
```

---

## Scope

This task should only update workflow/instruction markdown files and, if needed, a reusable task-template section for future tasks.

Do not:
- implement Scene 04;
- modify the approved Scene 03 visuals;
- change scene code unless strictly needed for documentation examples;
- request new external assets;
- generate new images/video/audio;
- alter approved renders.

---

## Main Documents To Review and Update

Inspect the repository and update the relevant “main” markdown files that govern agent behavior.

Likely candidates include files such as:

```text
AGENTS.md
README.md
docs/production-architecture.md
docs/workflow.md
docs/pipeline.md
docs/scene-production.md
tasks/TASK-001.md ... current reusable workflow docs
```

Use judgment based on the actual repository structure.

### Minimum requirement

At least update the documents that serve these roles:

1. **Primary repository instructions**
2. **Production workflow / pipeline guidance**
3. **Task-authoring guidance for future scene tasks**

If there is no existing dedicated doc for one of those roles, create a focused markdown doc rather than forcing bad placement.

---

## New Workflow Rules To Add

The updated docs must clearly state the following rules.

### Rule 1 — Manual Asset Ownership

For scene-specific visual assets:

```text
The user owns the image-generation step.
```

That means:
- the user may create visuals with ChatGPT image tools, Google tools, Canva, Claude, or other external tools;
- the user reviews/approves them first;
- the user manually adds them to the repository;
- only then can the agent use them.

### Rule 2 — No Agent-Led Reinterpretation Once an Approved Asset Exists

If the user has supplied a final approved asset:

```text
The agent must use that exact asset.
```

The agent must not:
- redraw it;
- reinterpret it;
- replace it with an approximate recreation;
- swap in invented objects;
- silently “improve” it by redesign.

Allowed operations:
- import;
- scale;
- crop only if explicitly safe/approved;
- position;
- animate;
- mask/reveal if it preserves meaning;
- layer localized/supporting text around it;
- integrate it into the video style.

### Rule 3 — Distinguish Asset Types

Every future task should distinguish between:

```text
Reference-only asset
vs
Final production asset
```

Definitions:

#### Reference-only asset
Used to inspire or guide creation.
May be interpreted or recreated.

#### Final production asset
Already approved by the user.
Must be used directly unless the task explicitly says otherwise.

### Rule 4 — Scene Tasks Must Pause if Required Assets Do Not Exist

If a scene depends on external images/graphics not yet available, the task should not let the agent guess.

Instead it should:

```text
stop dependent implementation,
document the needed assets,
ask the user to create/add them,
then continue after assets exist.
```

### Rule 5 — Future Task Files Should Include an Asset Contract

For scenes requiring user-supplied visuals, task files should include a section like:

```text
External / Manual Asset Inputs
```

That section should specify:
- exact file paths;
- whether each asset is reference-only or final production;
- whether the agent may reinterpret it;
- localization constraints;
- whether baked text exists;
- whether the asset should be rendered directly or used only as reference.

### Rule 6 — Human Control Is Preferred for Critical Visual Beats

If a scene contains:
- a key joke beat;
- an explanatory diagram;
- a branded composition;
- a dense infographic;
- a composition where visual precision matters;

the default should be:

```text
human-generated / human-approved asset first
agent scene implementation second
```

---

## Lessons From TASK-008 To Capture

The updated docs should summarize the practical lesson from TASK-008:

### What failed before
- multiple revision attempts where the agent recreated the image incorrectly;
- the agent followed the “idea” but not the exact diagram;
- this reduced visual control.

### What worked
- the user manually added:
  - `public/episodes/001-redis/assets/scene-03-joke-diagram.png`
  - `public/episodes/001-redis/assets/scene-03-end-diagram.png`
- the agent used those exact PNGs directly;
- the scene then matched expectations.

### Workflow conclusion
For visual assets that need precision:

```text
manual asset creation + manual placement + direct asset use
beats agent reinterpretation
```

---

## What To Add to Future Task-Writing Guidance

Update the guidance so future task files can follow a reliable template.

Add a reusable rule set for any future scene task that needs visuals:

### Suggested structure for future tasks

```markdown
## Manual Asset Inputs

### Asset 1
Path:
Type: reference-only / final production
Usage:
Allowed transformations:
Localization notes:

### Asset 2
...
```

And a decision checkpoint such as:

```markdown
If required manual assets are not yet present, stop implementation and report the missing assets.
```

Also add language like:

```markdown
Do not generate/recreate these assets unless explicitly instructed.
```

---

## Required Deliverables

Update the relevant repository markdown files so this workflow is clearly documented.

Also create one concise dedicated markdown document if helpful, for example:

```text
docs/manual-asset-workflow.md
```

if no existing file is the right home for the full policy.

The documentation should be practical, not abstract.

It should help future task authors and future agents avoid repeating the same mistake.

---

## Human Review Artifacts

Create:

```text
feedbacks/task-009-feedback.md
```

No media render is required for this task.

If useful, include a concise summary table in the feedback showing:
- which docs were changed;
- what rule was added to each one.

---

## Validation

Run and record:

```text
markdown lint / formatting check if available
repository build sanity check if appropriate
link/reference sanity review
```

At minimum, verify:
- the updated docs exist;
- the instructions are internally consistent;
- the new workflow is unambiguous.

No scene render is required.

---

## Acceptance Criteria

TASK-009 is complete only when:

- [ ] `feedbacks/task-008-feedback.md` was reviewed.
- [ ] The key workflow lesson from TASK-008 is captured.
- [ ] Main workflow/instruction markdown files were updated.
- [ ] The docs clearly state that future image generation for scene visuals will be done externally/by the user first.
- [ ] The docs clearly state that manually added approved assets must be used directly.
- [ ] The docs clearly distinguish reference-only vs final production assets.
- [ ] The docs state that scene implementation must pause if required assets are missing.
- [ ] The docs add a reusable asset-input/task-authoring pattern for future tasks.
- [ ] The instructions do not begin Scene 04.
- [ ] `feedbacks/task-009-feedback.md` is created.
- [ ] Final status is reported.

---

## Required Feedback Report

Create:

```text
feedbacks/task-009-feedback.md
```

It must contain:

### 1. Summary
What documentation/workflow changes were made.

### 2. Task-008 Lesson Applied
Summarize:
- what failed before;
- what succeeded in TASK-008;
- how that changed the future workflow.

### 3. Files Updated
For each file:
- path;
- why it was updated;
- key rules added/changed.

### 4. New Workflow Rules
List the final rules now documented in the repository.

### 5. Future Task Authoring Guidance
Show how future tasks should specify:
- manual asset inputs;
- reference-only vs final production;
- stop conditions if assets are missing.

### 6. Validation
PASS / FAIL / NOT RUN for:
- task-008 feedback reviewed
- markdown docs updated
- documentation consistency review
- optional lint/format check
- optional build sanity check

### 7. Problems / Risks
Include any ambiguity that still remains.

### 8. Recommended Next Step

```text
If the workflow documentation is approved:
→ proceed to the next production task using the new manual-asset policy.

Otherwise:
→ revise the documentation first.
```

### 9. Git Status
Report:
- branch;
- changed files;
- untracked files;
- commits/pushes performed.

### 10. Final Status
Finish with exactly one:

```text
TASK-009 STATUS: PASS
```

or

```text
TASK-009 STATUS: PARTIAL
```

or

```text
TASK-009 STATUS: BLOCKED
```

---

## Agent Behavior

- Treat TASK-008 as the evidence base.
- Update documentation, not production scene code.
- Do not start Scene 04.
- Do not request new image generation.
- Make the workflow explicit and reusable.
- Preserve clarity over verbosity.
