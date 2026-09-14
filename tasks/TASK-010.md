# TASK-010 — Consolidate the Asset Resolver Before Scene 04

## Objective

Clean up the asset pipeline before continuing production.

TASK-008 introduced a second asset path helper:

```text
getAssetPath()
```

while the repository already had:

```text
resolveAsset()
```

This task must consolidate the duplicate asset-resolution logic into one clear, provider-independent path and preserve the approved Scene 03 behavior.

This is a small technical cleanup task.

Do **not** begin Scene 04.

---

## Why This Task Exists

TASK-009 feedback identified the following risk:

```text
Two asset-resolution helpers now exist side by side.
```

Current state:

```text
src/episodes/001-redis/asset-resolver.ts
→ resolveAsset()

src/episodes/001-redis/assets.ts
→ getAssetPath()
```

Scene 03 currently uses the newer helper.

If we continue without cleanup, future scenes could introduce a third access pattern.

The goal is:

```text
one canonical asset-resolution API
```

for all episode production code.

---

## Preconditions

Begin only after:

```text
TASK-009 STATUS: PASS
```

and after the user-approved Scene 03 state is preserved.

Before changing anything:

```bash
git status
git log --oneline -10
```

Important:
- TASK-008 and TASK-009 changes may still be uncommitted.
- Do not lose Scene 03.
- Do not lose the two manually added PNG assets.
- Do not lose the manual-asset workflow documentation.

Do not create or push commits unless explicitly authorized.

---

## Part A — Inspect the Existing Asset System

Inspect:

```text
src/episodes/001-redis/assets.ts
src/episodes/001-redis/asset-resolver.ts
src/episodes/001-redis/scenes/Scene03DatabaseMisconception.tsx
docs/production-architecture.md
docs/manual-asset-workflow.md
```

Determine:

1. what `resolveAsset()` currently returns;
2. what `getAssetPath()` currently returns;
3. which callers use each helper;
4. whether either API contains behavior the other lacks;
5. whether current manifest status handling (`placeholder`, `candidate`, `approved`) is preserved.

Do not rewrite the whole asset system unnecessarily.

---

## Part B — Choose One Canonical Resolver

Prefer reusing the existing canonical resolver if it can cleanly support Scene 03.

Target concept:

```ts
resolveAsset(assetId)
```

or the existing equivalent.

The chosen canonical resolver should be able to provide what scene components need without exposing provider details.

Scene code should not need to know:

```text
ChatGPT
Canva
Google
Nano Banana
manual upload source
```

It should only ask for a logical asset ID.

---

## Part C — Remove Duplicate Resolution Logic

After choosing the canonical resolver:

- migrate Scene 03 to it;
- remove `getAssetPath()` if it is no longer needed;
- remove duplicated lookup logic;
- update imports;
- keep manifest behavior intact.

Do not create another wrapper unless there is a concrete requirement.

The desired direction is:

```text
logical asset ID
→ canonical resolver
→ manifest entry
→ static asset path
→ Remotion <Img>
```

---

## Part D — Preserve Scene 03 Exact Assets

These manually supplied production assets must remain untouched:

```text
public/episodes/001-redis/assets/scene-03-joke-diagram.png
public/episodes/001-redis/assets/scene-03-end-diagram.png
```

Do not:
- modify them;
- redraw them;
- recompress them;
- rename them unless strictly necessary;
- change their rendered appearance.

Scene 03 must continue using these exact files.

---

## Part E — Review Asset Status

TASK-008 registered the two manually supplied Scene 03 assets as:

```text
candidate
```

The human has since manually reviewed and approved Scene 03.

Review whether the project’s documented lifecycle now implies these should be:

```text
approved
```

If yes, update only those two manifest entries.

If not, document why they remain candidates.

Do not automatically promote unrelated assets.

---

## Part F — Keep the Manual Asset Policy Intact

The following TASK-009 rules remain authoritative:

```text
User creates/approves precision-critical scene visuals first.
User manually adds them to the repo.
Agent uses final-production assets directly.
Agent does not redraw or reinterpret them.
```

This task is only about resolver plumbing.

Do not weaken or rewrite that policy.

---

## Part G — Documentation Alignment

Update only the documentation needed to reflect the final canonical resolver.

At minimum inspect:

```text
docs/production-architecture.md
docs/manual-asset-workflow.md
```

If one currently mentions the duplicate state, update it after cleanup.

Avoid duplicating implementation details across many docs.

---

## Part H — Regression Validation

Run:

```text
typecheck
build
composition discovery
```

Render / verify:

```text
Scene 03 joke frame
Scene 03 end frame
Scene 03 preview MP4 if needed
Scene 01 regression
Scene 02 regression
```

The Scene 03 frames should visually match the approved versions.

No visible changes are expected.

---

## Human Review Requests

This is primarily a technical cleanup.

Human review is only needed if any rendered output changes unexpectedly.

Expected:

```text
Human Review Requests
None, if visual regression checks are identical.
```

If any output differs, stop and report it instead of proceeding.

---

## External Asset Requests

```text
None.
```

Do not request or generate any new assets.

---

## Acceptance Criteria

TASK-010 is complete only when:

- [ ] Existing asset-resolution code was inspected.
- [ ] One canonical resolver is selected.
- [ ] Duplicate helper logic is removed.
- [ ] Scene 03 uses the canonical resolver.
- [ ] Scene 03 exact PNG assets remain unchanged.
- [ ] Manifest status for the two Scene 03 assets is reviewed.
- [ ] Manual asset policy remains intact.
- [ ] Relevant docs match the actual implementation.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Scene 03 visual regression passes.
- [ ] Scenes 01 and 02 regression checks pass.
- [ ] No new assets are generated.
- [ ] Scene 04 is not started.
- [ ] `feedbacks/task-010-feedback.md` is created.

---

## Required Feedback Report

Create:

```text
feedbacks/task-010-feedback.md
```

It must contain:

### 1. Summary
What was consolidated.

### 2. Previous State
Explain:
- `resolveAsset()`
- `getAssetPath()`
- callers of each

### 3. Canonical Resolver
State:
- chosen API
- why
- final call flow

### 4. Scene 03 Migration
Explain:
- what changed in code
- confirmation exact PNGs remain unchanged

### 5. Asset Status Review
Report whether:

```text
scene03JokeDiagram
scene03EndDiagram
```

are now `approved` or remain `candidate`, and why.

### 6. Documentation Changes
List files updated.

### 7. Verification Results
PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- Scene 03 joke regression
- Scene 03 end regression
- Scene 01 regression
- Scene 02 regression

### 8. Human Review Requests
Expected:
```text
None.
```
unless visual output changed.

### 9. External Asset Requests
```text
None.
```

### 10. Problems / Risks
Report remaining asset-pipeline debt, if any.

### 11. Recommended Next Task
If clean:

```text
Proceed to Scene 04 planning/implementation using the manual-asset policy.
```

If Scene 04 requires precision-critical external visuals:

```text
identify/manual-generate/approve those assets before implementation.
```

### 12. Git Status
Report:
- branch
- changed files
- untracked files
- commits/pushes

### 13. Final Status

Finish with exactly one:

```text
TASK-010 STATUS: PASS
```

or

```text
TASK-010 STATUS: PARTIAL
```

or

```text
TASK-010 STATUS: BLOCKED
```

---

## Agent Behavior

- Keep this task surgical.
- Do not redesign Scene 03.
- Do not modify user-supplied PNG contents.
- Do not generate new media.
- Do not start Scene 04.
- Consolidate, validate, report, stop.
