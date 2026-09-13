# TASK-002 — Agent Skills, Scene Contract, and Asset Manifest

## Objective

Prepare `technical-story-engine` for real episode production without creating final video scenes yet.

This task has three goals:

1. Install and verify the official Remotion Agent Skills for the development agents used by this project.
2. Define the scene/timing contract for `001-redis`.
3. Define a replaceable asset-manifest convention for external media.

The permanent production core remains:

- Remotion
- React
- TypeScript

Primary development agent:

- OpenAI Codex

Fallback development agent:

- Claude Code

External image/video/TTS tools remain replaceable.

---

# Precondition — Clean TASK-001 Baseline

Before making TASK-002 changes, inspect Git.

TASK-001 feedback reported that the repository was initialized but had no commits and all project files were still untracked.

TASK-002 should begin only from a committed TASK-001 baseline.

Check:

```bash
git status
git log --oneline -5
```

If the repository still has no baseline commit:

- do **not** silently combine TASK-001 and TASK-002 into one commit;
- stop implementation;
- report that the user needs to create the initial TASK-001 commit first.

Do not create or push Git commits unless explicitly authorized by the user.

---

# Part A — Install Official Remotion Agent Skills

## Why

This project will rely heavily on AI development agents.

We want Codex and Claude Code to use the current Remotion-maintained guidance rather than guessing APIs or relying on stale internal knowledge.

Official source:

```text
https://github.com/remotion-dev/skills
```

Remotion documents installation with:

```bash
npx skills add remotion-dev/skills
```

The skill collection includes capabilities such as:

```text
remotion-best-practices
remotion-create
remotion-markup
remotion-studio
remotion-render
remotion-captions
remotion-docs
remotion-upgrade
remotion-multimedia
```

The official pack should be our primary Remotion skill source.

---

## Installation Scope

Prefer a **project-local/shared installation** so that:

- Codex can use the skills;
- Claude Code can use the skills;
- another machine can understand the project setup;
- skill configuration does not depend only on one developer's global home directory.

Before installation:

1. inspect the installed `skills` CLI/help;
2. determine its supported project-local installation mechanism;
3. determine how it targets Codex and Claude Code;
4. use the official/current mechanism rather than inventing paths.

Suggested exploration:

```bash
npx skills --help
npx skills add --help
```

Then install:

```bash
npx skills add remotion-dev/skills
```

If the installer asks which agents should receive the skills, select:

```text
Codex
Claude Code
```

Do not install unrelated skills.

If the CLI provides a supported way to install once for both agents, prefer that.

---

## Skill Verification

After installation, verify:

1. skill files/directories actually exist;
2. Codex has a discoverable project-local skill path;
3. Claude Code has a discoverable project-local skill path;
4. the installed source is `remotion-dev/skills`;
5. at minimum `remotion-best-practices` is discoverable;
6. installation did not modify unrelated global configuration unexpectedly.

Record the exact paths created by the installer.

Do not manually copy guessed directories if the supported installer can perform the setup.

---

## Third-Party Skills Policy

Do **not** install community Remotion/video skills in TASK-002.

We may evaluate community motion-design skills later, but only after reviewing:

- overlap with official Remotion guidance;
- conflicting animation rules;
- maintenance quality;
- impact on our own visual identity;
- compatibility with both Codex and Claude Code.

TASK-002 should leave us with a small, trusted skill foundation rather than a large collection of overlapping prompts.

---

# Part B — Scene Architecture for Episode 001

Episode:

```text
001-redis
```

Working title:

```text
Why Your API Gets Faster After Adding Redis
```

Languages:

```text
en — primary
de — additional
fr — additional
```

The visual timeline should remain as language-neutral as practical.

Do not create final narration or artwork in this task.

---

## Scene Outline

Create a typed scene definition representing the currently approved narrative.

Use IDs similar to:

```text
01-mystery
02-database-speed-misconception
03-original-request-path
04-restaurant-repeat-work
05-ready-order-cache
06-restaurant-to-architecture
07-cache-miss
08-cache-hit
09-latency-breakdown
10-why-redis-fast
11-cache-everything
12-stale-cache
13-cache-tradeoffs
14-final-mental-model
```

Minor naming changes are allowed if they improve consistency.

Each scene definition should have a small typed contract with fields such as:

```ts
id
order
workingTitle
purpose
durationStrategy
assetIds
```

Add other fields only when they clearly help.

Do not create a huge cinematic schema.

---

# Part C — Timing Contract

TASK-001 registered fixed five-second placeholder compositions.

TASK-002 should introduce a foundation suitable for a real multi-scene episode.

## Requirement

Scene animation should not depend on arbitrary hard-coded global frame numbers.

We expect:

```text
English narration
German narration
French narration
```

to have slightly different spoken durations while sharing the same visual concept.

Create a timing model that can later support:

```ts
scene.start
scene.duration
scene.progress
```

or an equivalent clean abstraction.

Prefer scene-relative animation logic such as:

```text
0.00 → scene starts
0.25 → key event
0.60 → explanation beat
1.00 → scene ends
```

rather than embedding assumptions such as:

```text
frame === 1637
```

throughout components.

---

## Important YouTube Constraint

Our expected final delivery model is:

```text
ONE YouTube video
├── English original audio
├── German dubbed audio
└── French dubbed audio
```

Therefore the preferred end state is a shared visual master whose duration can accommodate all language tracks.

TASK-002 should not solve final dubbing synchronization yet.

Instead, document a strategy for later tasks.

The timing contract should support one of these future approaches:

```text
A. narration is localized while important animation beats stay within shared scene windows

or

B. a master timeline uses planned pauses/timing margins so localized tracks remain roughly the same duration
```

Do not render separate final language videos merely as a workaround.

Development compositions for EN/DE/FR are still acceptable.

---

# Part D — Approved Storyboard Data

Represent the following storyboard as structured episode data or documentation that future implementation tasks can consume.

## Scene 01 — The Mystery

Concept:

```text
GET /users/42

Before Redis: 180 ms
After Redis:    8 ms
```

Purpose:

Create the central mystery.

No final animation implementation yet.

---

## Scene 02 — The Misconception

Question:

```text
Did Redis somehow make the database 20x faster?
```

Possible visual joke:

```text
Redis acting like a gym coach beside the database.
```

Then reject the model:

```text
NOT THIS
```

---

## Scene 03 — Original Request Path

Concept:

```text
Client
  ↓
API
  ↓
Database
  ↓
expensive work
  ↓
Response
```

Repeated requests repeat the work.

Visual-humor concept:

```text
USER 42
USER 42
USER 42

Database:
"Alice. Again."
```

---

## Scene 04 — Restaurant: Repeated Work

Restaurant analogy:

```text
Customer
→ chicken burger
→ extra cheese
→ no onions
```

Chef prepares it from scratch.

Another identical order arrives.

Then another.

The humor should remain brief and visually supportive.

---

## Scene 05 — Ready Order / Cache

Introduce a ready-order shelf.

Example conceptual key:

```text
ORDER:42
```

The same order can now be served without the chef repeating the entire job.

This teaches caching before returning to technical architecture.

---

## Scene 06 — Restaurant → Architecture

This is an important transition.

Conceptual mapping:

```text
Customer    → Request
Cashier     → Application
Ready shelf → Redis
Chef        → Database
```

Restaurant elements should transition/simplify into technical components.

Do not implement the final morph yet.

---

## Scene 07 — Cache Miss

Concept:

```text
GET /users/42
      ↓
Application
      ↓
Redis
      ↓
MISS
      ↓
Database
      ↓
Result
      ↓
Store user:42 in Redis
      ↓
Response
```

Potential tiny visual gag:

Redis checks an empty drawer and shrugs.

---

## Scene 08 — Cache Hit

Concept:

```text
GET /users/42
      ↓
Application
      ↓
Redis
      ↓
HIT
      ↓
Response
```

Database disappears from this request path.

Central lesson:

```text
Redis did not speed up the query.
Redis allowed us to skip it.
```

No joke should interrupt this core explanation.

---

## Scene 09 — Where Did 172 ms Go?

Use the illustrative breakdown:

```text
Request handling        5 ms
DB/network              8 ms
Database work         155 ms
Serialization           5 ms
Other                   7 ms
                      ------
Total                  180 ms
```

Then visually remove the expensive database-work portion for a cache hit.

Result:

```text
~8 ms
```

The numbers must be clearly presented as illustrative.

---

## Scene 10 — Why Redis Can Be Fast

Teach:

```text
already prepared result
+
simple lookup
+
data held in memory
+
original expensive work avoided
```

Avoid simplistic:

```text
Redis = RAM = good
Database = disk = bad
```

Modern databases also use memory heavily.

---

## Scene 11 — "Cache Everything"

Developer sees:

```text
180 ms → 8 ms
```

and is tempted by:

```text
CACHE EVERYTHING
```

Brief humorous setup.

---

## Scene 12 — Stale Cache

Example:

```text
Database:
alice.new@example.com

Redis:
alice.old@example.com
```

Redis returns the stale value quickly.

Visual:

```text
FAST    ✅
CORRECT ❌
```

---

## Scene 13 — Cost of Caching

Introduce:

```text
expiration
invalidation
memory
cache misses
monitoring
failure handling
extra infrastructure
```

Message:

```text
Caching trades some simplicity for speed.
```

---

## Scene 14 — Final Mental Model

Without caching:

```text
Request
→ Application
→ Database
→ expensive work
→ Response
```

Cache hit:

```text
Request
→ Application
→ Redis
→ Response
```

Final idea:

```text
What work did Redis allow us to stop doing?
```

---

# Part E — Replaceable Asset Manifest

Introduce an asset manifest for episode-specific external media.

The manifest should allow a scene to refer to a logical asset ID rather than a tool/provider-specific path.

Conceptually:

```ts
restaurantBackground
chefNeutral
chefWorking
chefTired
cashier
customerA
customerB
burger
orderTicket
readyShelf
restaurantGeneratedClip
```

Each asset entry may contain fields similar to:

```ts
id
type
path
optional
description
```

Use only fields that provide real value.

---

## Critical Rule

The manifest must **not** encode the generation provider as part of the consuming scene architecture.

Bad:

```tsx
<GoogleVeoRestaurantScene />
```

Better:

```tsx
<RestaurantScene assetId="restaurantGeneratedClip" />
```

or an equivalent abstraction.

The asset behind that ID may later come from:

```text
ChatGPT image generation
Canva
Google AI
another video generator
manual illustration
```

without rewriting the episode.

---

## Asset Status

TASK-002 should support asset states such as:

```text
placeholder
candidate
approved
```

This may be represented in code or in a companion manifest/document.

We want to compare multiple candidate assets before selecting one.

For example:

```text
chef-master
├── candidate-chatgpt.png
├── candidate-canva.png
└── approved.png
```

The implementation should avoid complicated media-asset management software.

Keep it simple and version-control friendly.

---

# Part F — Character Asset Planning

Do not generate characters yet.

Create an initial character manifest/document for:

```text
Chef / Database
Cashier / Application
Customers / Requests
Alice
Developer
```

For each character capture only:

```text
role in explanation
required poses/expressions
likely scenes
localization concerns
```

Example:

```text
Chef / Database

Role:
Represents legitimate expensive work.

Important:
Do not portray the database as incompetent or "bad."

Likely states:
- neutral
- working
- tired
- coffee/cache-hit reaction
```

This will later guide both AI illustration and Canva experiments.

---

# Part G — Restaurant Prototype Preservation

A visual prototype has already been approved conceptually.

The final production system should preserve these ideas:

```text
16:9
simple colorful illustrated restaurant
customer
cashier
ready-order cache shelf
chef
clear spatial hierarchy
animation-friendly composition
```

However:

- do not bake English explanatory text permanently into generated media when avoidable;
- allow language-specific labels to be rendered by Remotion;
- prefer transparent/separable character assets when practical;
- keep the restaurant layout compatible with the future restaurant-to-architecture transition.

No new final restaurant asset is required in TASK-002.

---

# Part H — Documentation

Update `README.md` or create concise project documentation for:

1. installed Remotion skills;
2. agent compatibility;
3. scene contract;
4. timing philosophy;
5. asset manifest;
6. replaceable external media;
7. multilingual visual-timeline principle.

Do not duplicate large blocks of documentation unnecessarily.

If a focused document is cleaner, use something such as:

```text
docs/production-architecture.md
```

---

# Part I — Tests / Verification

Add lightweight tests or validation where useful.

At minimum verify:

- scene IDs are unique;
- scene order is deterministic;
- all referenced asset IDs are valid;
- supported language configuration remains `en`, `de`, `fr`;
- existing `Redis-EN`, `Redis-DE`, `Redis-FR` compositions still work;
- TypeScript passes;
- build passes;
- composition discovery passes.

A full video render is not mandatory if no visual implementation changed, but at least one placeholder render/still should be executed if practical to detect regressions.

Do not introduce a large test framework merely for TASK-002 unless one is already justified.

Simple typed validation or a small Node/TypeScript validation script is acceptable.

---

# Acceptance Criteria

TASK-002 is complete only when:

- [ ] TASK-001 has a clean committed baseline before TASK-002 modifications.
- [ ] Official `remotion-dev/skills` are installed using a supported mechanism.
- [ ] Skill installation is available to Codex.
- [ ] Skill installation is available to Claude Code.
- [ ] Installed skill paths are documented.
- [ ] No third-party video/motion skill was installed.
- [ ] Episode 001 has a typed 14-scene outline.
- [ ] A scene-relative timing contract exists.
- [ ] Multilingual shared-timeline constraints are documented.
- [ ] Episode 001 has a replaceable asset manifest.
- [ ] Assets can be marked or organized as placeholder/candidate/approved.
- [ ] Character requirements are documented without generating final characters.
- [ ] Provider names are not hard-coded into consuming scene components.
- [ ] Existing EN/DE/FR composition architecture remains intact.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] No final production scene has been implemented.
- [ ] A feedback report is created.

---

# Out of Scope

Do not:

- generate final chef/cashier/customer artwork;
- generate Canva scenes;
- generate Google AI video clips;
- build the final restaurant animation;
- implement the restaurant-to-architecture morph;
- generate final narration;
- create final German/French translations;
- create captions;
- add background music;
- add SFX;
- create thumbnails;
- upload to YouTube;
- install a large bundle of community agent skills;
- begin TASK-003.

---

# Required Feedback Report

Create:

```text
feedbacks/task-002-feedback.md
```

It must contain:

## 1. Summary

What was implemented.

## 2. Agent Skills

Report:

- exact source installed;
- exact install command(s);
- installed skills;
- project-local paths;
- Codex discovery path;
- Claude Code discovery path;
- any installer prompts/options selected.

## 3. Files Created or Changed

Important files and purpose.

## 4. Scene Contract

Summarize the data model chosen.

## 5. Timing Contract

Explain how scene-relative timing works and how it prepares for EN/DE/FR narration.

## 6. Asset Manifest

Explain how external assets remain provider-independent and replaceable.

## 7. Commands Executed

List important commands actually run.

## 8. Verification Results

Report separately as:

```text
PASS
FAIL
NOT RUN
```

for:

- Git baseline precondition;
- Remotion skills installation;
- Codex skill availability;
- Claude Code skill availability;
- TypeScript;
- build;
- composition discovery;
- scene validation;
- asset validation;
- regression render/still.

## 9. Problems / Risks

Include:

- installation issues;
- timing assumptions;
- asset-management assumptions;
- multilingual risks;
- technical debt;
- environment limitations.

## 10. Recommended Next Task

Recommend what TASK-003 should focus on based on the repository's real state.

Do not begin it.

## 11. Git Status

Report:

- branch;
- changed/untracked files;
- any unexpected binary files;
- whether renders remain ignored.

## 12. Final Status

Finish with exactly one:

```text
TASK-002 STATUS: PASS
```

or

```text
TASK-002 STATUS: PARTIAL
```

or

```text
TASK-002 STATUS: BLOCKED
```

Do not claim PASS if either Codex or Claude Code skill installation was not verified.

---

# Agent Behavior

- Inspect existing TASK-001 architecture before changing it.
- Read the installed Remotion skill guidance when relevant.
- Do not rewrite working TASK-001 infrastructure without a concrete reason.
- Keep types small and understandable.
- Prefer data-driven scene registration over duplicated components.
- Do not invent final assets.
- Do not silently expand scope.
- Do not start TASK-003.
- Record real command/test results rather than assumptions.
