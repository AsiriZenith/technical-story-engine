# TASK-005 — Production Scene 01: The 180 ms → 8 ms Mystery

## Objective

Implement the first real production scene for `001-redis`.

Scene 01 introduces the central mystery:

```text
GET /users/42

Before Redis: 180 ms
After Redis:    8 ms
```

The viewer should immediately understand that the request is the same, the data is the same, the response time changes dramatically, Redis is somehow involved, and the video will explain what changed.

Use Remotion + React + TypeScript. Do not require external generated assets for this scene.

---

## Preconditions

Begin only after TASK-004 is reviewed, committed, and the working tree is clean.

Run:

```bash
git status
git log --oneline -5
```

Expected:
- clean TASK-004 baseline;
- provisional visual system exists;
- motion presets exist;
- architecture nodes exist;
- Human Media Review Gate exists;
- EN/DE/FR compositions remain valid.

If there are unexplained changes, stop and report them.

Do not create or push commits unless explicitly authorized.

---

## Part A — Persistent Feedback Handoff Contract

Before implementing Scene 01, ensure the canonical project guidance includes standardized feedback sections for:

### Human Review Requests

When review is required:

```markdown
## Human Review Requests

### Review Request 1

Artifact:
<path>

Type:
PNG / MP4 / MP3 / WAV / ...

Purpose:
...

What to review:
- ...
- ...

Agent assessment:
PASS / PASS WITH ISSUES / FAIL

Known issues:
- ...

Human review status:
PENDING
```

Otherwise:

```markdown
## Human Review Requests

None.
```

### External Asset Requests

When external generation is required:

```markdown
## External Asset Requests

### Asset Request 1

Asset ID:
...

Why needed:
...

Preferred type:
PNG / MP4 / WAV / ...

Dimensions / duration:
...

Composition requirements:
...

Character requirements:
...

Visual-style constraints:
...

Motion requirements:
...

Localization constraints:
...

Transparent background:
YES / NO

Audio:
...

Integration target:
...

Status:
NEEDS EXTERNAL GENERATION
```

Otherwise:

```markdown
## External Asset Requests

None.
```

Update the canonical shared guidance where appropriate:

```text
AGENTS.md
docs/agent-workflow.md
docs/production-architecture.md
.agents/skills/technical-story-video/SKILL.md
```

Keep `CLAUDE.md` aligned through the existing shared-reference strategy.

The coding agent provides requirements, not the final prompt for external image/video generation. Final prompts will later be prepared from agent requirements + storyboard + human review + channel visual direction + tool capabilities.

---

## Part B — Scene Scope

Implement only:

```text
Scene 01 — The Mystery
```

Do not implement Scene 02.

Do not:
- build restaurant assets;
- add external media;
- generate narration;
- add production music;
- add production SFX.

The scene must be strong enough to review silently.

---

## Part C — Scene Narrative

Approximate progression:

```text
1. Show GET /users/42
2. Establish Before Redis → 180 ms
3. Repeat the same request
4. Introduce Redis visually
5. Show After Redis → 8 ms
6. Emphasize 180 ms → 8 ms
7. End with: What changed?
```

Do not add a long explanation. The purpose is curiosity.

---

## Part D — Scene Duration

Use the TASK-002 timing contract.

Target approximately:

```text
18–24 seconds
```

Choose the exact duration based on readability and pacing.

Use scene-relative timing. Do not scatter arbitrary global frame numbers through the implementation.

The scene must remain easy to retime later when narration is integrated.

---

## Part E — Visual Hierarchy

Use clear phases:

### Phase 1
Focus:
```text
GET /users/42
```

### Phase 2
Focus:
```text
180 ms
```

### Phase 3
Redis enters.

Focus: something changed in the architecture.

Do not explain cache hit/miss yet.

### Phase 4
Focus:
```text
8 ms
```

### Phase 5
Focus:
```text
180 ms → 8 ms
```

End with:
```text
What changed?
```

Hold the ending long enough to register.

---

## Part F — Technical Visuals

Use the provisional architecture-node language.

At minimum represent:

```text
Request
Application
Database
Redis
```

Initial path:

```text
Request → Application → Database
```

Then Redis appears in a way that suggests an architectural change.

Do not imply that Redis literally makes the database faster.

Do not teach cache hit/miss yet.

---

## Part G — Motion

Use the provisional TASK-004 motion vocabulary.

Motion must be:

```text
restrained
readable
deterministic
technical
```

Avoid:
- constant bouncing;
- large camera swings;
- random motion;
- excessive particle effects;
- flashy transitions that compete with the idea.

Important beats:
```text
request enters
→ baseline resolves to 180 ms
→ Redis appears
→ second request moves
→ 8 ms appears
→ 180 ms → 8 ms locks in
```

Use scene-relative timing.

---

## Part H — Humor

Humor is optional and tiny.

Possible beat:
- Database briefly notices Redis.

Do not add dialogue, memes, or anything that delays the hook.

If humor weakens clarity, omit it.

---

## Part I — Localization

Continue supporting:

```text
en
de
fr
```

Primary:
```text
en
```

Important text must remain localizable.

Do not bake English text into media.

Test representative German and French layouts.

All languages should use the same underlying scene implementation.

---

## Part J — Production Integration

Implement Scene 01 as an isolated production scene using the established episode scene/timing architecture.

Preferred conceptual boundary:

```text
src/episodes/001-redis/scenes/Scene01Mystery.tsx
```

or the equivalent existing project convention.

Do not bypass the TASK-002 scene contract.

Do not replace the episode with a monolithic composition.

---

## Part K — Review Artifacts

Generate:

```text
renders/review/task-005/scene-01-start.png
renders/review/task-005/scene-01-mid.png
renders/review/task-005/scene-01-end.png
renders/review/task-005/scene-01-preview.mp4
```

Choose meaningful frames:
- start = request/baseline setup;
- mid = Redis introduction or transition;
- end = 180 ms → 8 ms + mystery question.

If useful, render an extra still for the `8 ms` reveal.

Review media must remain ignored by Git.

---

## Part L — Agent Visual QA

Inspect all artifacts.

For stills, review:
- focal point;
- readability;
- safe margins;
- node clarity;
- technical correctness;
- visual hierarchy;
- text wrapping;
- localization safety.

For MP4, also review:
- motion pacing;
- timing of Redis entrance;
- duration of 180 ms state;
- duration of 8 ms state;
- transition smoothness;
- final-question hold;
- whether the scene is too busy.

The scene should communicate the mystery without narration.

Do not claim human approval.

---

## Part M — Human Review Request

The feedback report must request human review of:

```text
1. Overall pacing
2. Strength of the 180 ms → 8 ms reveal
3. Typography scale
4. Redis entrance
5. Architecture readability
6. Final "What changed?" hold
7. Whether any humor is distracting
8. Whether the scene feels professional and memorable
```

Human review status:

```text
PENDING
```

---

## Part N — External Asset Requests

Expected for TASK-005:

```markdown
## External Asset Requests

None.
```

Scene 01 should be fully achievable in Remotion.

If an external asset unexpectedly becomes necessary, do not generate it and do not hard-code a provider. Document the requirement using the standardized External Asset Request contract and stop dependent work.

---

## Part O — Validation

Run and record:

```text
typecheck
build
composition discovery
scene validation
asset validation
custom skill sync if changed
Redis-EN check
Redis-DE layout check
Redis-FR layout check
Scene 01 still renders
Scene 01 MP4 render
```

Verify EN/DE/FR still share the same episode implementation.

---

## Acceptance Criteria

TASK-005 is complete only when:

- [ ] TASK-004 baseline is clean and committed.
- [ ] Persistent feedback handoff contract is documented.
- [ ] Scene 01 is implemented as a real production scene.
- [ ] Scene 01 uses the TASK-002 timing/scene architecture.
- [ ] No monolithic workaround was introduced.
- [ ] No external asset is required.
- [ ] `GET /users/42` is clearly introduced.
- [ ] `180 ms` is clearly established.
- [ ] Redis is introduced without teaching an incorrect model.
- [ ] `8 ms` is clearly revealed.
- [ ] `180 ms → 8 ms` becomes the final visual emphasis.
- [ ] The scene ends on a clear mystery/question.
- [ ] Motion uses scene-relative timing.
- [ ] EN/DE/FR remain supported.
- [ ] Required PNG review frames are rendered.
- [ ] Required MP4 preview is rendered.
- [ ] Agent-side visual QA is performed.
- [ ] Human Review Requests section is present.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests section is present.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Scene validation passes.
- [ ] Asset validation passes.
- [ ] Review media is ignored by Git.
- [ ] `feedbacks/task-005-feedback.md` is created.
- [ ] Scene 02 is not implemented.

---

## Out of Scope

Do not:
- implement Scene 02;
- implement the full repeated-database-work explanation;
- create restaurant characters;
- create restaurant background;
- integrate Canva;
- integrate external image/video generation;
- create narration;
- create final German/French voice tracks;
- create captions;
- add final music/SFX;
- build stale-cache scenes;
- create YouTube metadata;
- create thumbnails;
- begin TASK-006.

---

## Required Feedback Report

Create:

```text
feedbacks/task-005-feedback.md
```

It must contain:

### 1. Summary
What was implemented.

### 2. Preconditions
```text
TASK-004 baseline: PASS / FAIL
Git clean baseline: PASS / FAIL
```

### 3. Scene Implementation
Explain component boundaries, duration, visual phases, architecture representation, and localization handling.

### 4. Motion
Explain presets used, major timing beats, and pacing choices.

### 5. Human Review Requests
For each required artifact include:
```text
Artifact
Type
Purpose
What to review
Agent assessment
Known issues
Human review status: PENDING
```

### 6. External Asset Requests
Expected:
```text
None.
```

If not none, use the full standardized contract.

### 7. Agent Visual QA
Report each artifact as:
```text
PASS
PASS WITH ISSUES
FAIL
```

### 8. Review Artifacts
List exact paths for:
```text
scene-01-start.png
scene-01-mid.png
scene-01-end.png
scene-01-preview.mp4
```

plus any additional QA artifacts.

### 9. Commands Executed
List important commands actually run.

### 10. Verification Results
Report separately:
```text
PASS
FAIL
NOT RUN
```

for:
- TypeScript;
- build;
- composition discovery;
- scene validation;
- asset validation;
- Redis-EN;
- Redis-DE;
- Redis-FR;
- Scene 01 start still;
- Scene 01 mid still;
- Scene 01 end still;
- Scene 01 MP4.

### 11. Problems / Risks
Include pacing, localization, text wrapping, motion concerns, technical ambiguity, theme limitations, future narration risks, and technical debt.

### 12. Recommended Next Task
Do not finalize TASK-006 until human review is received.

Conditionally recommend:
```text
If Scene 01 is approved:
→ proceed to Scene 02 / original request path.

If revisions are required:
→ revise Scene 01 first.
```

### 13. Git Status
Report branch, changed/untracked files, unexpected binaries, and ignored review media.

### 14. Final Status

Finish with exactly one:

```text
TASK-005 STATUS: PASS
```

or

```text
TASK-005 STATUS: PARTIAL
```

or

```text
TASK-005 STATUS: BLOCKED
```

PASS means implementation and agent QA passed. It does not mean human visual approval.

---

## Agent Behavior

- Read `AGENTS.md`.
- Read relevant official Remotion skills.
- Read `technical-story-video`.
- Inspect TASK-002 timing/scene architecture.
- Inspect TASK-004 visual-system code.
- Reuse existing tokens and motion presets where appropriate.
- Do not over-design.
- Do not add provider-specific dependencies.
- Render actual review media.
- Inspect your own output.
- Record unresolved issues honestly.
- Mark human review PENDING.
- Stop after TASK-005 feedback.
- Do not begin TASK-006.
