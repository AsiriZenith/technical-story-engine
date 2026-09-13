# TASK-004 — Provisional Visual System and Human Media Review Gate

## Objective

Create and validate the first **provisional visual system** for `technical-story-engine` before implementing final Redis episode scenes.

This task should use the DEV playground created in TASK-003 to test:

- typography hierarchy;
- architecture-node semantics;
- spacing and layout;
- a minimal motion vocabulary;
- multilingual text-length resilience;
- the provider-independent asset-resolution boundary.

This is still **pre-production infrastructure and visual validation**.

Do not build final Redis scenes yet.

---

# Preconditions

TASK-004 should only begin after:

```text
TASK-003 STATUS: PASS
```

and after TASK-003 changes have been reviewed and committed.

Before making changes, verify:

```bash
git status
git log --oneline -5
```

Expected:

- clean TASK-003 baseline commit;
- `AGENTS.md` exists;
- `CLAUDE.md` exists;
- DEV compositions exist;
- the `technical-story-video` skill exists for Codex and Claude Code;
- TASK-002 scene/timing/asset architecture still passes validation.

If there are unexplained uncommitted changes, stop and report them.

Do not create or push Git commits unless explicitly authorized.

---

# Part A — Human Media Review Gate

This task introduces a permanent production rule.

Whenever a task creates or materially changes user-facing media such as:

```text
.png
.jpg
.webp
.mp4
.mov
.wav
.mp3
```

the agent must treat technical success and human approval as separate states.

The required flow is:

```text
implement
↓
render/export media
↓
agent-side QA
↓
write feedback report
↓
HUMAN REVIEW: PENDING
↓
stop
↓
user inspects/listens
↓
user feedback informs the next task
```

The agent must **not** mark media as finally approved merely because:

```text
render succeeded
build passed
agent thinks it looks good
```

Asset status semantics should be:

```text
placeholder
→ temporary development asset

candidate
→ generated/rendered and ready for human review

approved
→ explicitly approved by the user
```

Do not promote a candidate asset to `approved` without explicit human acceptance.

---

# Part B — Update Project Instructions

Update the project guidance so the Human Media Review Gate becomes part of the persistent workflow.

Update as appropriate:

```text
AGENTS.md
CLAUDE.md or shared referenced documentation
docs/agent-workflow.md
technical-story-video skill
```

Avoid unnecessary duplication.

The custom skill should retain the high-level workflow:

```text
implementation
→ render
→ agent review
→ human review
→ revision
```

Do not copy the full review policy into every file if one canonical document can be referenced.

---

# Part C — Provisional Typography System

Use `DEV-Typography`.

Create a provisional typography scale suitable for technical explainer videos at:

```text
1920 × 1080
```

Define practical roles such as:

```text
display / hero number
scene title
section heading
body
technical label
code / key
status
caption / disclaimer
```

Do not lock final branding.

The purpose is to answer:

- Is text readable at normal YouTube viewing sizes?
- Can hierarchy be understood immediately?
- Do long German/French strings remain manageable?
- Are large numeric moments like `180 ms → 8 ms` visually strong?
- Can labels such as `CACHE HIT`, `CACHE MISS`, `DATABASE`, `APPLICATION` fit reliably?

Prefer centralized theme tokens or typed helpers rather than ad hoc inline styles.

---

# Part D — Multilingual Stress Cases

Test at least English, German, and French variants for representative UI/text.

Examples:

```text
EN:
Cache Hit

DE:
Cache-Treffer

FR:
Succès du cache
```

and longer technical copy.

Test at least:

```text
short label
medium heading
long explanatory line
```

The exact wording is not final localization.

The goal is layout resilience.

Render representative frames for:

```text
EN
DE
FR
```

and note any overflow or hierarchy problems.

Do not create separate visual systems per language.

---

# Part E — Architecture Node Semantics

Use `DEV-ArchitectureNodes`.

Create a provisional semantic system for:

```text
Client / Request
Application / API
Redis / Cache
Database
```

The viewer should be able to distinguish them quickly.

The system may use:

```text
shape
iconography
border treatment
label hierarchy
small semantic accents
```

but avoid over-decoration.

Do not rely solely on color for meaning.

These components should be suitable for later use in:

```text
cache miss
cache hit
request path
restaurant-to-architecture transition
final mental model
```

If current DEV placeholders are sufficient, evolve them rather than rebuilding them from scratch.

---

# Part F — Layout and Spacing Rules

Define a small spacing/layout system for technical scenes.

At minimum establish conventions for:

```text
safe title area
content margins
node spacing
diagram gutters
caption/disclaimer placement
maximum text width
```

Do not over-engineer a full responsive design framework.

The target is:

```text
clear
consistent
repeatable
easy for agents to reuse
```

Document the key layout rules.

---

# Part G — Minimal Motion Vocabulary

Use `DEV-MotionBasics`.

Define only a small set of motion behaviors that future scenes may reuse.

Suggested categories:

```text
enter
exit
emphasize
move-along-path
stagger
counter/value change
```

Create a small number of named motion presets.

For example, conceptually:

```text
enterSoft
enterFast
emphasizeScale
moveLinear
staggerSmall
```

Names may differ.

Important:

- use Remotion-native timing;
- prefer scene-relative timing;
- keep motion deterministic;
- avoid excessive bouncing;
- do not introduce random motion;
- technical information should remain easy to follow.

This task should test the motion vocabulary, not finalize all channel animation behavior.

---

# Part H — Asset Resolution Boundary

Build or refine a simple provider-independent asset resolver.

The consuming scene should use logical IDs.

Conceptually:

```ts
resolveAsset("chefNeutral")
resolveAsset("restaurantBackground")
resolveAsset("restaurantGeneratedClip")
```

The resolver should return the currently selected asset based on the manifest.

It should support statuses:

```text
placeholder
candidate
approved
```

and allow multiple candidates to exist while one is selected for preview.

Do not encode provider names into consuming components.

Do not add provider SDKs.

---

# Part I — Candidate Comparison Support

Improve `DEV-AssetPreview` so future tasks can compare multiple candidates.

For example:

```text
chefNeutral
├── candidate-chatgpt
├── candidate-canva
└── selected candidate
```

The preview should make it easy to see:

```text
logical asset ID
candidate name
status
file type
path
dimensions/aspect ratio when available
```

Do not create final chef or restaurant assets in this task.

Use placeholders or existing test assets.

The purpose is to prepare the review workflow.

---

# Part J — DEV Review Media

TASK-004 must produce reviewable media artifacts.

At minimum render:

```text
DEV typography EN PNG
DEV typography DE PNG
DEV typography FR PNG
DEV architecture nodes PNG
DEV motion preview MP4
DEV asset preview PNG
```

Suggested output folder:

```text
renders/review/task-004/
```

These files should remain ignored by Git unless the current repository convention explicitly says otherwise.

The exact filenames should be clear and stable.

Example:

```text
typography-en.png
typography-de.png
typography-fr.png
architecture-nodes.png
motion-basics.mp4
asset-preview.png
```

---

# Part K — Agent-Side Visual QA

The agent must inspect the rendered PNGs and the motion preview.

For PNG review, check:

```text
focal point
text readability
safe margins
spacing
alignment
hierarchy
technical meaning
language overflow
visual clutter
```

For MP4 review, also check:

```text
motion pacing
transition smoothness
unnecessary movement
whether movement supports comprehension
```

The agent must document known issues.

Do not claim:

```text
HUMAN APPROVED
```

The final feedback must say:

```text
HUMAN REVIEW: PENDING
```

---

# Part L — Review Artifact Manifest

Create a lightweight review manifest for the generated media.

For example:

```text
renders/review/task-004/review-manifest.json
```

or an equivalent markdown/json file.

Each entry should contain:

```text
artifact
purpose
composition
frame or duration
agent QA result
human review status
```

Human review status must initially be:

```text
PENDING
```

Do not over-engineer this.

---

# Part M — Validation

Run and record:

```text
typecheck
build
composition discovery
scene validation
asset validation
custom skill sync/validation
DEV still renders
DEV motion preview render
```

Also verify existing production compositions remain intact:

```text
Redis-EN
Redis-DE
Redis-FR
```

No final Redis episode scene should be implemented.

---

# Acceptance Criteria

TASK-004 is complete only when:

- [ ] TASK-003 baseline is clean and committed before TASK-004 changes.
- [ ] Human Media Review Gate is documented.
- [ ] Asset status semantics are `placeholder`, `candidate`, `approved`.
- [ ] `approved` requires explicit human acceptance.
- [ ] Project agent guidance reflects the review gate.
- [ ] Provisional typography roles are defined.
- [ ] EN/DE/FR typography stress cases are rendered.
- [ ] Architecture-node semantics are improved and documented.
- [ ] Basic layout/spacing conventions are defined.
- [ ] A small named motion vocabulary exists.
- [ ] Asset resolution remains provider-independent.
- [ ] `DEV-AssetPreview` supports candidate comparison or selection.
- [ ] Required PNG review artifacts are rendered.
- [ ] A DEV MP4 motion preview is rendered.
- [ ] Agent-side QA is performed.
- [ ] Review artifact paths are included in feedback.
- [ ] Review artifacts are marked `HUMAN REVIEW: PENDING`.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] TASK-002 architecture validation still passes.
- [ ] Existing Redis EN/DE/FR compositions remain intact.
- [ ] No final Redis production scene is implemented.
- [ ] `feedbacks/task-004-feedback.md` is created.

---

# Out of Scope

Do not:

- create final branding;
- finalize channel color palette;
- generate final chef/cashier/customer characters;
- generate final restaurant artwork;
- integrate Canva output;
- integrate Google AI-generated video;
- implement Scene 01 of the Redis episode;
- implement restaurant animation;
- generate narration;
- generate final German/French translations;
- create captions;
- add production music/SFX;
- create YouTube thumbnails;
- upload to YouTube;
- install more third-party skills;
- begin TASK-005.

---

# Required Feedback Report

Create:

```text
feedbacks/task-004-feedback.md
```

It must contain:

## 1. Summary

What was implemented.

## 2. Preconditions

Report:

```text
TASK-003 baseline: PASS / FAIL
Git clean baseline: PASS / FAIL
```

## 3. Human Media Review Gate

Explain the final project rule and how asset approval works.

## 4. Typography System

List provisional roles and any multilingual layout findings.

## 5. Architecture Nodes

Explain semantic differences and layout decisions.

## 6. Motion Vocabulary

List the named motion behaviors created.

## 7. Asset Resolution

Explain logical asset lookup, candidate selection, and status handling.

## 8. Review Artifacts

List exact paths for every generated:

```text
PNG
MP4
```

Include purpose and composition.

## 9. Agent Visual QA

For each review artifact report:

```text
PASS
PASS WITH ISSUES
FAIL
```

and briefly explain why.

## 10. Human Review Status

Must state:

```text
HUMAN REVIEW: PENDING
```

Do not claim human approval.

## 11. Commands Executed

List important commands actually run.

## 12. Verification Results

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
- Redis production compositions;
- DEV compositions;
- scene validation;
- asset validation;
- skill synchronization;
- typography EN render;
- typography DE render;
- typography FR render;
- architecture render;
- asset preview render;
- motion preview MP4.

## 13. Problems / Risks

Include:

- visual inconsistencies;
- language overflow;
- motion concerns;
- theme limitations;
- asset-resolution limitations;
- technical debt;
- environment limitations.

## 14. Recommended Next Task

Do not recommend final production automatically.

Base the recommendation on:

```text
agent findings
+
pending human review
```

If human review is pending, explicitly state that TASK-005 should not be finalized until the user reviews TASK-004 media.

## 15. Git Status

Report:

- branch;
- changed/untracked files;
- unexpected binaries;
- ignored review renders.

## 16. Final Status

Finish with exactly one:

```text
TASK-004 STATUS: PASS
```

or

```text
TASK-004 STATUS: PARTIAL
```

or

```text
TASK-004 STATUS: BLOCKED
```

`PASS` means the task implementation and agent QA succeeded.

It does **not** mean the visual system has human approval.

---

# Agent Behavior

- Read `AGENTS.md`.
- Read the official Remotion skills relevant to this task.
- Read the project `technical-story-video` skill.
- Inspect existing DEV compositions before replacing anything.
- Keep the system provisional.
- Prefer reusable tokens/helpers over duplicated styles.
- Do not over-design.
- Render real review media.
- Inspect your own outputs.
- Clearly separate technical PASS from human approval.
- Stop after writing TASK-004 feedback.
- Do not begin TASK-005.
