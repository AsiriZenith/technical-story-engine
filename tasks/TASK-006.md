# TASK-006 — Production Scene 02: Where the 180 ms Comes From

## Objective

Implement **Scene 02** for episode `001-redis`.

Scene 01 is approved and established the mystery:

```text
GET /users/42
180 ms → 8 ms
What changed?
```

Scene 02 should explain the **original request path before Redis** and show where the ~180 ms is spent.

The scene should make one idea clear:

> The latency is made up of several pieces, and the database work is the dominant one.

Do **not** explain cache hit/miss yet.

Do **not** start the restaurant analogy yet.

Use the existing Remotion/React/TypeScript visual system and the approved Scene 01 vibe.

---

# Preconditions

Begin only after:

```text
TASK-005A STATUS: PASS
```

and after the approved Scene 01 state has been committed.

Before implementation, run:

```bash
git status
git log --oneline -5
```

Expected:

- clean Scene 01 baseline;
- current branch contains approved TASK-005A work;
- existing EN/DE/FR compositions remain valid;
- Human Review Requests / External Asset Requests feedback contract is active.

If there are unexplained changes, stop and report them.

Do not create or push commits unless explicitly authorized.

---

# Part A — Scene Scope

Implement only:

```text
Scene 02 — Where the 180 ms Comes From
```

Do not implement:
- Scene 03;
- restaurant analogy;
- cache miss;
- cache hit;
- stale cache;
- trade-offs.

Do not add:
- narration;
- music;
- SFX;
- external generated images;
- external generated video.

This scene should be fully achievable in Remotion.

---

# Part B — Core Technical Story

Use the illustrative latency breakdown from the source article:

```text
Request processing:   5 ms
DB/network:           8 ms
Database work:      155 ms
Serialization:        5 ms
Other:                7 ms
--------------------------
Total:              180 ms
```

These values are illustrative.

The scene should visually communicate:

```text
180 ms
=
small app overhead
+
small network overhead
+
large database work
+
small serialization/other overhead
```

The most important insight:

```text
Database work dominates.
```

Do not imply that every API has exactly this breakdown.

If explanatory text is needed, use wording such as:

```text
Illustrative breakdown
```

or an equivalent localized label.

---

# Part C — Narrative Progression

Recommended progression:

```text
1. Carry over / reference the 180 ms result from Scene 01.

2. Ask:
   "Where did the 180 ms go?"

3. Build a horizontal or vertical timing bar.

4. Add segments progressively:
   - request processing
   - DB/network
   - database work
   - serialization
   - other

5. Emphasize the large database-work segment.

6. End with:
   "Most of the time is spent doing database work."
```

Do not yet answer what Redis does.

This scene should prepare the viewer for that answer.

---

# Part D — Visual Direction

Preserve the approved Scene 01 vibe:

- dark technical grid background;
- current typography direction;
- current spacing discipline;
- clean diagrams;
- restrained motion;
- technical explainer feel.

The timing breakdown should be the main visual device.

Preferred options:

```text
stacked timing bar
```

or

```text
single 180 ms bar partitioned into labeled segments
```

The bar should make the 155 ms database-work portion visually dominant.

Avoid:
- pie charts;
- overly decorative infographics;
- dense tables;
- tiny labels;
- generic dashboard aesthetics.

---

# Part E — Timing Bar Semantics

The timing graphic should be reusable in later scenes if practical.

Possible conceptual structure:

```text
[ 5 ][ 8 ][          155          ][ 5 ][ 7 ]
```

with labels positioned cleanly.

The viewer should be able to understand at a glance:

```text
155 ms ≫ everything else
```

If exact proportional widths make the smaller segments unreadable, use a readable compromise while preserving the clear dominance of 155 ms.

Do not distort so much that the graphic becomes misleading.

If a readability compromise is used, document it in feedback.

---

# Part F — Technical Labels

Use clear, concise labels.

Preferred English labels:

```text
Request
DB/network
Database work
Serialization
Other
```

Use localization keys for German and French.

Do not put long explanatory sentences inside narrow bar segments.

If needed:
- use labels above/below;
- connect with guide lines;
- reveal one label at a time.

---

# Part G — Motion

Use the existing motion vocabulary.

Suggested motion flow:

```text
180 ms appears
→ bar grows
→ segments resolve
→ values appear
→ database segment receives emphasis
→ small segments recede slightly
→ final takeaway appears
```

Motion should support comprehension.

Avoid:
- bouncing each segment;
- unnecessary zooms;
- camera movement;
- excessive stagger.

The 155 ms database-work segment should become the visual focal point.

---

# Part H — Optional Tiny Humor

Humor is optional.

One acceptable micro-beat:

```text
the 155 ms segment expands so much that the small segments get visually squeezed
```

but keep it subtle and technical.

Do not add character humor here.

If humor reduces clarity, omit it.

---

# Part I — Localization

Support:

```text
en
de
fr
```

Use the same implementation.

Test:
- long German labels;
- French label wrapping;
- takeaway line length.

The timing values remain identical across languages.

Do not bake text into assets.

---

# Part J — Scene Duration

Target approximately:

```text
16–22 seconds
```

Choose the final duration based on readability.

Use scene-relative timing.

Do not hard-code unrelated global frame numbers.

Leave enough flexibility for later narration retiming.

---

# Part K — Integration

Scene 02 should be isolated using the existing episode scene structure.

Preferred conceptual path:

```text
src/episodes/001-redis/scenes/Scene02LatencyBreakdown.tsx
```

or the equivalent repository convention.

Integrate it into the typed scene/timing contract.

Do not make Scene 01 and Scene 02 tightly coupled.

Scene 01 should remain independently maintainable.

---

# Part L — Review Artifacts

Generate review media:

```text
renders/review/task-006/scene-02-start.png
renders/review/task-006/scene-02-mid.png
renders/review/task-006/scene-02-end.png
renders/review/task-006/scene-02-preview.mp4
```

Also render language stress checks if necessary:

```text
scene-02-mid-de.png
scene-02-mid-fr.png
```

Suggested frame meanings:

```text
start
→ 180 ms question / initial bar

mid
→ full timing breakdown

end
→ database work emphasized + takeaway
```

Review renders must remain ignored by Git.

---

# Part M — Human Review Requests

The feedback report must ask the user to review:

1. whether the 180 ms breakdown is immediately understandable;
2. whether the database-work segment clearly dominates;
3. whether the labels are readable;
4. whether the scene feels consistent with Scene 01;
5. whether the motion is too slow, too fast, or too busy;
6. whether the final takeaway is memorable;
7. whether the scene feels technical rather than like a generic business chart.

Human review status:

```text
PENDING
```

---

# Part N — External Asset Requests

Expected:

```markdown
## External Asset Requests

None.
```

If an external asset unexpectedly becomes necessary, stop dependent work and document the request using the standard contract.

Do not generate or import external assets for this scene without explicit approval.

---

# Part O — Agent Visual QA

Inspect all rendered artifacts.

For stills, check:

```text
focal point
timing-bar proportions
label readability
safe margins
visual hierarchy
technical correctness
language wrapping
Scene 01 visual consistency
```

For MP4, also check:

```text
segment reveal pacing
database-segment emphasis timing
final takeaway hold
motion smoothness
whether segment animation helps or distracts
```

Do not claim human approval.

---

# Part P — Validation

Run and record:

```text
typecheck
build
composition discovery
scene validation
asset validation
Redis-EN
Redis-DE
Redis-FR
Scene 02 still renders
Scene 02 MP4 render
```

Verify Scene 01 remains unchanged and valid.

---

# Acceptance Criteria

TASK-006 is complete only when:

- [ ] Approved Scene 01 baseline is clean and committed.
- [ ] Scene 02 is implemented.
- [ ] Scene 01 remains unchanged unless a shared bug fix is required.
- [ ] The 180 ms total is clearly explained.
- [ ] The illustrative breakdown is shown.
- [ ] Database work is visually dominant.
- [ ] The scene does not yet explain cache hit/miss.
- [ ] The scene does not yet use the restaurant analogy.
- [ ] The scene uses scene-relative timing.
- [ ] EN/DE/FR use the same implementation.
- [ ] Required PNG review frames are rendered.
- [ ] Required MP4 preview is rendered.
- [ ] Agent visual QA is performed.
- [ ] Human Review Requests section is present.
- [ ] Human review status is PENDING.
- [ ] External Asset Requests section is present.
- [ ] External Asset Requests is `None.`
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Scene validation passes.
- [ ] Asset validation passes.
- [ ] Review media is ignored by Git.
- [ ] `feedbacks/task-006-feedback.md` is created.
- [ ] Scene 03 is not implemented.

---

# Out of Scope

Do not:
- implement Scene 03;
- implement the restaurant analogy;
- generate chef/cashier/customer assets;
- create external images/video;
- implement cache miss;
- implement cache hit;
- create narration;
- add final music/SFX;
- localize final narration;
- create captions;
- create YouTube metadata;
- create thumbnails;
- begin TASK-007.

---

# Required Feedback Report

Create:

```text
feedbacks/task-006-feedback.md
```

It must contain:

## 1. Summary
What was implemented.

## 2. Preconditions
Report:

```text
TASK-005A baseline: PASS / FAIL
Git clean baseline: PASS / FAIL
```

## 3. Scene Implementation
Explain:
- component structure;
- duration;
- timing-bar implementation;
- localization handling;
- whether the timing bar is reusable.

## 4. Technical Story
Explain how the 180 ms breakdown is communicated and how the scene avoids implying the values are universal.

## 5. Motion
Explain:
- motion presets used;
- segment reveal;
- database-work emphasis;
- final hold.

## 6. Human Review Requests
For each artifact include:
- Artifact
- Type
- Purpose
- What to review
- Agent assessment
- Known issues
- Human review status: PENDING

## 7. External Asset Requests
Expected:

```text
None.
```

If not none, use the full standardized request contract.

## 8. Agent Visual QA
Report each artifact as:

```text
PASS
PASS WITH ISSUES
FAIL
```

## 9. Review Artifacts
List exact paths.

## 10. Commands Executed
List important commands actually run.

## 11. Verification Results
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
- Scene 02 start still;
- Scene 02 mid still;
- Scene 02 end still;
- Scene 02 MP4.

## 12. Problems / Risks
Include:
- timing-bar readability;
- localization pressure;
- proportion compromises;
- pacing;
- future narration timing;
- technical ambiguity;
- reusable-component risks.

## 13. Recommended Next Task
Do not finalize the next task until human review is received.

Conditionally:

```text
If Scene 02 is approved:
→ proceed to the next scene according to the episode plan.

If revisions are required:
→ revise Scene 02 first.
```

## 14. Git Status
Report:
- branch;
- changed/untracked files;
- unexpected binaries;
- ignored review media.

## 15. Final Status

Finish with exactly one:

```text
TASK-006 STATUS: PASS
```

or

```text
TASK-006 STATUS: PARTIAL
```

or

```text
TASK-006 STATUS: BLOCKED
```

PASS means implementation and agent QA passed.

It does not mean human visual approval.

---

# Agent Behavior

- Read `AGENTS.md`.
- Read relevant official Remotion skills.
- Read the `technical-story-video` skill.
- Inspect the approved Scene 01 implementation.
- Preserve the approved visual vibe.
- Reuse existing tokens and motion presets where appropriate.
- Keep the timing breakdown technically clear.
- Do not introduce external assets.
- Render actual review media.
- Inspect your own output.
- Record known issues honestly.
- Mark human review PENDING.
- Stop after TASK-006 feedback.
- Do not begin TASK-007.
