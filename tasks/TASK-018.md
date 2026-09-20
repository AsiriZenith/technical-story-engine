# TASK-018 — Implement Scene 10: Why Redis Is Fast

## Objective

Implement **Scene 10 — Why Redis Is Fast** using the approved plan from `TASK-017`.

Scene 10 should answer:

```text
Why is the cache-hit path so much faster?
```

The scene must teach:

```text
prepared result
simple lookup
in-memory access
avoided Database work
```

with the strongest emphasis on:

```text
avoiding repeated Database work
```

Do not start Scene 11.

---

## Required Installed Skills

Before implementation, explicitly consult the installed skills that apply.

Required:

```text
technical-story-video
remotion-best-practices
remotion-markup
frontend-design
animate
remotion-captions
remotion-render
review-animations
```

Use when needed:

```text
remotion-docs
remotion-studio
```

In the feedback report, state:
- which skills were actually consulted;
- how each influenced the implementation.

Do not use irrelevant skills just because they are installed.

---

## Approved Visual Strategy

Use the approved **Option C — Hybrid** plan from TASK-017.

Reuse the exact approved architecture asset:

```text
public/episodes/001-redis/assets/scene-07-technical-architecture.png
```

Use:
- the existing architecture image as the visual anchor;
- `SpotlightImage` for Redis emphasis;
- Remotion-native localized captions for the explanation;
- no new image asset;
- no new drawn diagram shapes;
- no FocusBox/glow-box treatment.

Do not:
- edit the PNG;
- regenerate it;
- redraw it;
- add baked explanatory text;
- generate a Scene 10 asset.

---

## Core Technical Message

Communicate all four ideas clearly:

### Prepared result

```text
Redis already holds a prepared result.
```

### Simple lookup

```text
Finding it is a simple, direct lookup — not a query.
```

### In-memory access

```text
That lookup happens in memory, which helps — but it is not the whole story.
```

### Avoided Database work

```text
The expensive Database work behind that result is skipped entirely.
```

This last point is the most important.

The final mental model must make clear:

```text
The speedup comes from avoiding repeated work,
not from making the Database itself faster.
```

Also guard against the oversimplification:

```text
Redis = RAM fast
Database = disk slow
```

Do not teach that framing.

---

## Approved Beat Plan

Preserve the planned Scene 10 window:

```text
sharedWindow(13, 2)
```

Expected total:

```text
15.0s
450 frames at 30fps
```

Do not change unrelated scene durations.

### Beat 0 — Bridge

Approx:

```text
0.4s → 2.0s
```

Visual:
- full-brightness architecture;
- no spotlight.

Caption:

```text
Why is that path so much faster?
```

---

### Beat 1 — Prepared result

Approx:

```text
2.4s → 5.0s
```

Visual:
- Redis spotlighted;
- rest of diagram dimmed.

Caption:

```text
Redis already holds a prepared result.
```

---

### Beat 2 — Simple lookup

Approx:

```text
5.4s → 7.8s
```

Visual:
- keep the same Redis spotlight active;
- do not hand off to another node.

Caption:

```text
Finding it is a simple, direct lookup — not a query.
```

---

### Beat 3 — In-memory access

Approx:

```text
8.2s → 10.4s
```

Visual:
- keep Redis spotlight active.

Caption:

```text
That lookup happens in memory, which helps — but it is not the whole story.
```

The qualifier is important.

---

### Beat 4 — Expensive work avoided

Approx:

```text
10.8s → 13.6s
```

Visual:
- release the Redis spotlight;
- return to full brightness;
- do not spotlight Database;
- no new target.

Caption:

```text
The expensive Database work behind that result is skipped entirely.
```

This is the strongest conceptual beat.

Do not turn this into another node-hopping sequence.

---

### Beat 5 — Closing mental model

Approx:

```text
14.0s → 15.0s
```

Visual:
- no spotlight;
- full image.

Use two short sequential captions if timing allows:

```text
Modern databases also use memory heavily.
```

then:

```text
The speedup comes from avoiding repeated work — not from memory being magic.
```

If the second line is too long for the available localized timing, preserve the same meaning with a concise equivalent while keeping:
- EN
- DE
- FR
legible and safe.

Do not change the technical meaning.

---

## Spotlight Strategy

Use only the approved Redis region:

```text
x: 1225 / 1920
y: 130 / 1080
width: 365 / 1920
height: 225 / 1080
```

Reuse it directly from Scenes 07/08/09 where possible.

No new spotlight regions are required.

Use the Scene 08/09 local tuning:

```text
dimBrightness: 0.58
featherPaddingFactor: 0.9
```

Do not modify the global `SpotlightImage` mask-sizing behavior.

Do not alter Scene 04, 07, 08, or 09.

---

## Motion Design

Keep the motion restrained.

Use the established scene vocabulary:
- slow push-in;
- `windowOpacity`;
- deterministic Remotion timing;
- ease-out fades;
- no hard cuts;
- no `scale(0)`;
- no unnecessary motion.

The visual distinction for this scene is:

```text
one Redis spotlight held across several explanatory beats
→ then released for the payoff
```

This should feel different from Scenes 08/09's sequential node-hopping.

---

## Localization

Support:

```text
en
de
fr
```

Add localized translation keys for the new Scene 10 captions.

Suggested key family:

```text
whyFastBridge
whyFastPreparedResult
whyFastSimpleLookup
whyFastInMemory
whyFastWorkAvoided
whyFastModernDbMemory
whyFastClosing
```

Use the existing localization system and `BottomCaption` treatment.

The reused architecture image contains baked English. Preserve it unchanged and document this known limitation.

---

## Latency Number Policy

Do **not** introduce a new numeric latency comparison in Scene 10.

There is an existing discrepancy:

```text
episode example: ~8 ms
baked architecture image: ~10 ms
```

Scene 10 should avoid adding either number in new captions.

Do not:
- hide the baked number;
- edit the source image;
- add a contradictory numeric overlay;
- silently normalize the episode to one number.

Document the inherited discrepancy in feedback.

---

## Scope

Implement Scene 10 only.

Do not:
- start Scene 11;
- modify previous scenes except strictly additive wiring required for Scene 10;
- edit source assets;
- generate images;
- change global spotlight math;
- change project dependencies;
- upgrade Remotion.

---

## Review Artifacts

Render:

```text
renders/review/task-018/scene-10-start.png
renders/review/task-018/scene-10-prepared-result.png
renders/review/task-018/scene-10-simple-lookup.png
renders/review/task-018/scene-10-in-memory.png
renders/review/task-018/scene-10-work-avoided.png
renders/review/task-018/scene-10-end.png
renders/review/task-018/scene-10-preview.mp4
```

Also render:

```text
renders/review/task-018/scene-10-spotlight-release-check.png
renders/review/task-018/scene-09-regression.png
renders/review/task-018/scene-08-regression.png
```

Optional localization stills:

```text
renders/review/task-018/scene-10-de-check.png
renders/review/task-018/scene-10-fr-check.png
```

All review media must remain Git-ignored.

---

## Human Review Requests

Ask the user to review:

1. whether Scene 10 clearly answers "why is the cache-hit path faster?";
2. whether the Redis spotlight held across three beats feels intentional rather than repetitive;
3. whether the "prepared result" point is understandable;
4. whether "simple lookup" is clear;
5. whether memory is presented as only one contributing factor;
6. whether "avoided Database work" is clearly the strongest point;
7. whether the scene avoids the simplistic RAM-vs-disk explanation;
8. whether the spotlight release creates a clean payoff;
9. whether the closing mental model is clear;
10. whether EN/DE/FR captions remain readable;
11. whether Scene 10 is ready to proceed to Scene 11.

Human review status:

```text
PENDING
```

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
```

Verify:

```text
Scene 10 start
prepared result
simple lookup
in-memory beat
work avoided
closing beat
spotlight release
Scene 10 MP4
Scene 09 regression
Scene 08 regression
no seam
no drift
no hard edge
no simultaneous spotlights
```

---

## Acceptance Criteria

TASK-018 is complete only when:

- [ ] Scene 10 exists and renders.
- [ ] No new image asset is created.
- [ ] Exact approved architecture PNG is reused.
- [ ] Redis is the only spotlight target.
- [ ] Redis spotlight is held across the first three explanation beats.
- [ ] Spotlight is released for the avoided-work payoff.
- [ ] Database is not spotlighted.
- [ ] Prepared-result idea is explained.
- [ ] Simple lookup is explained.
- [ ] In-memory access is explained as a contributing factor, not the whole explanation.
- [ ] Avoided Database work receives the strongest emphasis.
- [ ] RAM-vs-disk oversimplification is explicitly guarded against.
- [ ] No new latency number is introduced.
- [ ] Existing ~8 ms / ~10 ms discrepancy is documented.
- [ ] EN/DE/FR captions render correctly.
- [ ] No FocusBox/glow-box treatment is introduced.
- [ ] No spotlight drift.
- [ ] No hard edge.
- [ ] Required review artifacts are rendered.
- [ ] Scene 09 regression passes.
- [ ] Scene 08 regression passes.
- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] Composition discovery passes.
- [ ] Human review status is PENDING.
- [ ] `feedbacks/task-018-feedback.md` is created.
- [ ] Scene 11 is not started.

---

## Required Feedback Report

Create:

```text
feedbacks/task-018-feedback.md
```

It must contain:

### 1. Summary
Explain what was implemented.

### 2. Skills Used
For each installed skill actually consulted, report:
- skill;
- purpose;
- implementation decision influenced.

### 3. Source Asset Usage
Report:
- exact asset path;
- logical asset ID;
- confirmation asset was unchanged.

### 4. Teaching Structure
Explain how the scene teaches:
- prepared result;
- simple lookup;
- in-memory access;
- avoided Database work.

State which point received the strongest emphasis.

### 5. Motion Design
Explain:
- why Redis remains highlighted across several beats;
- why the spotlight is released rather than handed to Database.

### 6. Spotlight Region
Report normalized values.

### 7. Spotlight Settings
Report exact:
- `dimBrightness`;
- `featherPaddingFactor`.

### 8. Timing
List all beat and caption timing.

### 9. Localization
Report:
- EN;
- DE;
- FR;
- any wrapping/overflow concerns.

### 10. Latency Discrepancy
Document the inherited:
- `~8 ms`;
- `~10 ms`;
and confirm no new Scene 10 numeric claim was added.

### 11. Review Artifacts
List exact paths.

### 12. Human Review Requests
For each artifact include:
- Artifact;
- Purpose;
- What to review;
- Agent assessment;
- Known issues;
- Human review status: PENDING.

### 13. Verification Results
PASS / FAIL / NOT RUN for:
- TypeScript
- build
- composition discovery
- scene validation
- asset validation
- Redis-EN
- Redis-DE
- Redis-FR
- Scene 10 start
- prepared result
- simple lookup
- in-memory
- work avoided
- end
- spotlight release
- Scene 10 MP4
- Scene 09 regression
- Scene 08 regression
- no seam
- no drift
- no hard edge
- no simultaneous spotlights

### 14. Problems / Risks
Report remaining concerns.

### 15. Recommended Next Step

Use exactly:

```text
If Scene 10 is human-approved:
→ plan Scene 11: should we cache everything?

If Scene 10 is not approved:
→ revise only the rejected Scene 10 spotlight, timing, caption, or explanatory beat.
```

### 16. Git Status
Report:
- branch;
- changed files;
- untracked files;
- ignored review media;
- commits/pushes.

### 17. Final Status

Finish with exactly one:

```text
TASK-018 STATUS: PASS
```

or

```text
TASK-018 STATUS: PARTIAL
```

or

```text
TASK-018 STATUS: BLOCKED
```

---

## Agent Behavior

- Use the installed skills.
- Follow the approved TASK-017 plan.
- Reuse the existing architecture asset.
- Generate no new image assets.
- Keep Redis as the only spotlight target.
- Create review media.
- Create feedback.
- Do not start Scene 11.
- Stop after feedback.
