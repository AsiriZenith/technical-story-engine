# Episode Production Status — “Why Your API Gets Faster After Adding Redis”

_Last updated: 2026-09-20_

## 1. Executive Summary

This episode is now in the **late production stage**.

The core explainer has been planned scene-by-scene, implemented in Remotion, and visually developed through Scene 13.

Current overall status:

```text
Scene planning:        almost complete
Scene implementation:  13 of 14 scenes implemented
Visual system:         established
Localization:          EN / DE / FR integrated through Scene 13
Review workflow:       established and working
Final scene:           not yet implemented
Narration/audio:       not yet finalized for the complete episode
Full-episode QA:       still required
Final render/package:  still required
```

The most important point is that the difficult structural work is already done.

The episode is no longer in the “figuring out what the video should be” phase.

It is now primarily in the:

```text
finish final scene
→ review entire episode
→ finalize narration/audio
→ polish transitions/timing
→ final multilingual validation
→ final render
```

phase.

---

# 2. Episode Goal

This episode explains why an API endpoint can become dramatically faster after introducing Redis.

The key technical thesis is:

```text
Redis does not necessarily make the original Database query faster.

Instead, Redis lets the application avoid repeating expensive work
when a cached result already exists.
```

The episode uses the example:

```text
GET /users/42

Before Redis:
~180 ms

After Redis / cache hit:
~8 ms
```

The episode deliberately avoids the simplistic explanation:

```text
Redis is fast because RAM is fast
and Databases are slow because disks are slow.
```

Instead, the video builds toward this mental model:

```text
What work did Redis allow us to stop doing?
```

---

# 3. Current Episode Structure

The episode currently contains 14 planned scenes.

Status:

```text
Scene 01  ✅ Implemented + reviewed
Scene 02  ✅ Implemented + reviewed
Scene 03  ✅ Implemented + reviewed
Scene 04  ✅ Implemented + reviewed
Scene 05  ✅ Implemented + reviewed
Scene 06  ✅ Implemented + reviewed
Scene 07  ✅ Implemented + reviewed
Scene 08  ✅ Implemented + reviewed
Scene 09  ✅ Implemented + reviewed
Scene 10  ✅ Implemented + reviewed enough to proceed
Scene 11  ✅ Implemented + reviewed enough to proceed
Scene 12  ✅ Implemented + reviewed enough to proceed
Scene 13  ✅ Implemented; latest feedback PASS
Scene 14  ⏳ Not yet implemented
```

So, in simple terms:

```text
13 / 14 scenes implemented
≈ 93% of scene implementation complete
```

That does **not** mean the entire episode is 93% finished, because final audio, full-episode QA, and delivery work still remain.

A more realistic total-project estimate is:

```text
Core scene production:     ~90–93% complete
Whole episode delivery:    ~75–85% complete
```

The exact percentage depends mainly on how much audio, narration, transition polishing, and final localization work remains.

---

# 4. Scene-by-Scene Status

## Scene 01 — Mystery / Hook

Purpose:

```text
GET /users/42
~180 ms

Add Redis

Same request
~8 ms

“What changed?”
```

Status:

```text
COMPLETE
HUMAN APPROVED
```

Important outcome:

The opening establishes the mystery without explaining the answer too early.

---

## Scene 02 — Latency Breakdown

Purpose:

Break the original ~180 ms into meaningful parts.

Example structure:

```text
request processing      ~5 ms
network / DB connection ~8 ms
Database work          ~155 ms
serialization           ~5 ms
other                   ~7 ms
```

Main point:

```text
Most of the time is spent doing Database work.
```

Status:

```text
COMPLETE
HUMAN APPROVED
```

---

## Scene 03 — Misconception

Purpose:

Challenge:

```text
Did Redis make the Database faster?
```

Then correct it.

Status:

```text
COMPLETE
HUMAN APPROVED
```

Important production lesson:

Early attempts failed because the coding agent kept recreating / reinterpreting visual references.

This scene directly caused the project to adopt the permanent:

```text
manual asset workflow
```

for precision-critical visuals.

---

## Scene 04 — Original Request Path Before Redis

Purpose:

Show:

```text
Client
→ Application
→ Database
→ expensive work
→ response
```

and explain why the original request takes roughly ~180 ms.

Status:

```text
COMPLETE
```

Final visual approach:

```text
SpotlightImage
```

rather than rectangular highlight boxes.

Important technical debt discovered:

`SpotlightImage` currently has a radial-gradient radius/diameter mismatch.

This is documented technical debt.

Do not globally fix it during normal scene work because multiple approved scenes are already tuned around the current behavior.

---

## Scene 05 — Restaurant Repeated Work Analogy

Purpose:

Show the analogy:

```text
Customer orders burger
→ cashier
→ chef cooks
→ ~10 minutes

Another customer orders same burger
→ chef cooks again
→ ~10 minutes again
```

Main idea:

```text
Same work. Again.
```

Status:

```text
COMPLETE
HUMAN APPROVED
```

---

## Scene 06 — Ready Shelf Analogy

Purpose:

Introduce the cache concept with the ready shelf.

Mapping:

```text
Ready shelf = cache
Chef        = Database
Prepared burger = cached result
```

Main idea:

```text
If the result is already prepared,
the chef does not need to do the work again.
```

Status:

```text
COMPLETE
HUMAN APPROVED
```

---

## Scene 07 — Analogy → Real Technical Architecture

Purpose:

Map:

```text
customer    → request/client
cashier     → application
ready shelf → Redis/cache
chef        → Database
```

Then transition into the real architecture.

Status:

```text
COMPLETE
HUMAN APPROVED ENOUGH TO PROCEED
```

This scene established the current architecture image reused later by Scenes 08–10.

Known inherited issue:

The image contains baked text:

```text
~10 ms
```

while the episode’s established example is:

```text
~8 ms
```

This discrepancy remains documented.

---

## Scene 08 — Cache Miss

Purpose:

Explain the first request after introducing Redis.

Flow:

```text
request
→ Application
→ Redis check
→ miss
→ Database
→ expensive work
→ Application
→ store result in Redis
→ response
```

Main point:

```text
The first request can still be expensive.
```

Status:

```text
COMPLETE
PASS
```

---

## Scene 09 — Cache Hit

Purpose:

Explain the repeated request.

Flow:

```text
request
→ Application
→ Redis
→ hit
→ cached result
→ Application
→ response
```

Database:

```text
skipped entirely
```

Main point:

```text
The Database did not get faster.
We simply did not need it this time.
```

Status:

```text
COMPLETE
PASS
```

Important visual decision:

The Database is not highlighted with an X or warning symbol.

Instead:

```text
Redis stays active
Database remains dim
```

This keeps the explanation clean and avoids inventing extra diagram geometry.

---

## Scene 10 — Why Redis Is Fast

Purpose:

Explain why a cache hit is fast without using the simplistic “RAM vs disk” explanation.

Teaching points:

```text
prepared result
simple lookup
in-memory access
avoided Database work
```

Strongest message:

```text
The expensive Database work is skipped.
```

Status:

```text
COMPLETE
PASS
```

Visual strategy:

```text
one continuous Redis spotlight
→ held across several explanatory beats
→ released for the avoided-work payoff
```

No new asset required.

---

## Scene 11 — Should We Cache Everything?

Purpose:

Correct the obvious overgeneralization:

```text
Redis is fast
→ so should we cache everything?
```

Answer:

```text
No.
```

Teaching points:

```text
memory usage
stale data
keeping data synchronized
not every request is expensive enough
cache misses still happen
```

Closing rule:

```text
Cache where avoiding repeated expensive work
is worth the tradeoff.
```

Status:

```text
COMPLETE
PASS
```

Visual style:

Fully Remotion-native.

No image.

No `SpotlightImage`.

Small joke:

```text
CACHE EVERYTHING!
→ Not so fast.
```

---

## Scene 12 — Stale Cache / Fast but Wrong

Purpose:

Make stale data concrete.

Example:

```text
Database:
alice.new@example.com

Redis:
alice.old@example.com
```

Flow:

```text
Database changes
→ Redis still has old copy
→ Application reads Redis
→ stale value returned quickly
```

Joke:

```text
Wrong answer. Very fast.
```

Closing message:

```text
Caching reuses old work.
That’s also how it can become stale.
```

Status:

```text
COMPLETE
PASS
```

No new asset required.

Fully Remotion-native.

---

## Scene 13 — Operational and Design Costs

Purpose:

Expand from stale data into the broader cost of adding a cache layer.

Final grouping:

```text
Freshness
→ expiration + invalidation

Capacity
→ memory usage

Resilience
→ misses + failures

Operations
→ monitoring + extra infrastructure
```

Visual structure:

```text
central Redis node
+
one active responsibility callout at a time
```

Closing mental model:

```text
Caching trades repeated work
for extra state, infrastructure, and coordination.
```

Status:

```text
IMPLEMENTED
TASK-024 STATUS: PASS
HUMAN REVIEW STILL PENDING
```

Latest known issue:

The closing frame currently leaves some of the ambient category labels partially visible while others are hidden behind the closing text.

This is not a technical failure, but it should be visually judged before final lock.

---

# 5. Scene 14 — What Remains at the Story Level

Scene 14 is the only planned scene not yet implemented.

Purpose:

```text
final mental-model recap
```

This should tie the entire episode together.

Likely final message:

```text
Redis did not magically speed up the Database.

It allowed the application to avoid repeating expensive work.

That is why the request became faster.
```

The strongest final question should probably return to:

```text
“What work did Redis allow us to stop doing?”
```

Scene 14 should not introduce new concepts.

It should only synthesize what the viewer already learned.

This should likely be a relatively simple scene compared with Scenes 07–13.

---

# 6. Production Architecture Status

The technical foundation is mature.

Current permanent architecture:

```text
Remotion
+
React
+
TypeScript
```

Remotion owns:

```text
timeline
scene timing
captions
technical overlays
diagrams
transitions
compositing
audio
rendering
localization
```

External/generated images are treated as replaceable assets.

The Remotion project is the permanent master.

This is an important milestone because the production pipeline no longer depends on a single image/video generator.

---

# 7. Agent Workflow Status

The agent workflow is now stable.

Current process:

```text
Task markdown
→ Codex / Claude Code implementation
→ automated validation
→ review renders
→ feedback file
→ ChatGPT review
→ human review
→ next task
```

Every new development task now explicitly asks the coding agent to use the installed skills.

Current important skills include:

```text
technical-story-video

Official Remotion:
remotion-best-practices
remotion-markup
remotion-render
remotion-captions
remotion-docs
remotion-studio
remotion-multimedia

Supporting:
frontend-design
animate
review-animations
```

The official Remotion skill bundle was audited and confirmed installed for both Codex and Claude Code.

---

# 8. Human Media Review Gate

The project now has an important permanent rule:

Any user-visible media:

```text
.png
.jpg
.mp4
.wav
.mp3
```

must go through:

```text
agent render
→ agent QA
→ feedback report
→ HUMAN REVIEW: PENDING
→ user review
→ approval/revision
```

An agent PASS does not equal human approval.

This is especially important for:

```text
motion feel
caption readability
visual balance
joke timing
spotlight quality
scene-to-scene continuity
```

---

# 9. Manual Asset Workflow

Another major part of the project that is already solved is the asset workflow.

For precision-critical visuals:

```text
assistant/user/external generator
→ user approves image
→ user adds exact file to repo
→ coding agent uses exact file
```

The coding agent is not allowed to:

```text
redraw
reinterpret
approximate
substitute
silently redesign
```

This workflow successfully solved earlier problems where agents produced visually “similar” but incorrect assets.

---

# 10. Localization Status

The episode currently supports:

```text
English
German
French
```

The localization system is integrated into the Remotion project.

Scenes 08–13 added new EN/DE/FR caption keys and validation renders.

Known limitation:

Several reused images contain baked English text.

Most importantly:

```text
scene-07-technical-architecture.png
```

contains English labels and:

```text
~10 ms
```

This remains visible in all language variants for the scenes that reuse that asset.

This has been accepted temporarily, but it should be revisited during final episode QA.

---

# 11. Important Known Issues / Technical Debt

## A. ~8 ms vs ~10 ms inconsistency

Episode canonical example:

```text
~8 ms
```

Architecture image:

```text
~10 ms
```

This is currently visible in some scenes.

Decision still required:

```text
Option 1:
standardize narration/captions toward ~10 ms

or

Option 2:
replace/correct the architecture image
```

Do not silently choose one.

---

## B. SpotlightImage mask math

Known issue:

The current CSS radial-gradient dimensions behave more like radii than full extents.

Result:

Actual feather reach is larger than the conceptual region definition.

Multiple scenes are already tuned around this behavior.

Therefore:

```text
DO NOT fix globally during normal scene development.
```

If fixed later, it should be a dedicated cleanup task with regression checks for:

```text
Scene 04
Scene 07
Scene 08
Scene 09
Scene 10
```

---

## C. Scene 13 closing-frame ambient labels

Current Scene 13 end state:

```text
some category labels partially visible
some hidden behind closing text
```

This is not broken, but the design should be human-reviewed.

A final polish task may choose:

```text
all four faintly visible
```

or:

```text
all four hidden
```

instead of the current mixed result.

---

# 12. Current Runtime / Episode Length

After Scene 13 was added:

```text
5910 frames
30 fps
≈ 197 seconds
≈ 3 minutes 17 seconds
```

Scene 14 will increase this slightly.

Expected final episode length is likely around:

```text
~3.3–3.6 minutes
```

depending on Scene 14 timing and final audio/timing adjustments.

---

# 13. What Still Remains

## Phase A — Finish the Story

Remaining:

```text
1. Review Scene 13 visually
2. Plan Scene 14
3. Implement Scene 14
4. Review Scene 14
```

After this, the full visual story will exist.

---

## Phase B — Full Episode Visual Review

Once Scene 14 exists, do not immediately publish.

Render the entire episode and review:

```text
Scene 01 → Scene 14
```

Look for:

```text
pacing problems
repetitive visual patterns
transition quality
caption timing
sudden style changes
unnecessary pauses
too-fast beats
too-long beats
visual fatigue
inconsistent emphasis
```

This is different from individual-scene approval.

A scene can look good alone and still feel wrong inside the full sequence.

---

# 14. Narration / Voice Work Still Required

The visual episode is much further ahead than the final audio layer.

Before final delivery, narration needs to be finalized.

Likely process:

```text
final narration script
→ user records voice or selected TTS
→ pronunciation review
→ audio cleanup
→ narration timing alignment
→ Remotion integration
```

Because the user is considering recording the narration personally, this phase may include:

```text
pronunciation checking
multiple takes
noise reduction
timing adjustments
natural pauses
retakes for difficult phrases
```

The final voice timing may force small visual timing changes.

Therefore:

```text
do not consider scene timing permanently locked
until narration is integrated.
```

---

# 15. Background Music / Sound Design

Still likely required:

```text
background music
very light sound design
optional transition accents
audio ducking under narration
```

This should remain subtle.

For this type of technical explainer:

```text
narration > clarity > music
```

Music should support pacing, not compete with the technical explanation.

The project already identified `audio-ducking` as a skill/tool area to address before final narration/music integration.

---

# 16. Final Localization Work

Current text localization is already built into scenes.

But the complete multilingual delivery still needs:

```text
final EN audio
final DE audio
final FR audio
```

if the episode will actually ship with multiple audio tracks.

The likely desired final delivery is:

```text
one video
+
multiple language audio tracks
```

rather than three separate uploads.

That should be validated near final export.

---

# 17. Final Full-Episode QA

Before final render, perform one dedicated QA phase.

Recommended checks:

## Visual

```text
safe margins
no clipping
no overlapping captions
no bad scene seams
consistent typography
consistent node colors
no spotlight drift
no asset scaling artifacts
```

## Technical

```text
TypeScript
build
composition discovery
asset validation
all scene durations
all localization keys
all compositions
```

## Editorial

```text
technical correctness
no contradictory numbers
no repeated explanations
jokes remain brief
terminology consistent
Database / Redis capitalization consistent
```

## Audio

```text
narration volume
music level
ducking
no clipping
no silent gaps
no timing mismatch
```

---

# 18. Final Render Work

After QA:

```text
render final English master
render multilingual tracks / package
verify exported audio
verify video duration
verify captions/subtitles if used
verify playback
```

Potential final outputs may include:

```text
master MP4
YouTube upload version
thumbnail
subtitle files
multi-audio version
short promotional clips
```

depending on the publishing plan.

---

# 19. Repository / Git Cleanup

The current project has accumulated many uncommitted files across recent tasks.

Before final delivery, a dedicated repository cleanup/checkpoint is recommended.

Likely work:

```text
review git status
verify all intended scene files tracked
verify feedback files
verify task files
verify assets
remove accidental temporary files
confirm review renders stay ignored
commit a stable episode checkpoint
```

Do not mix this cleanup with creative scene work.

---

# 20. Recommended Remaining Task Sequence

The safest sequence from here is:

```text
TASK-025
Review / plan Scene 14

TASK-026
Implement Scene 14

TASK-027
Full visual episode render + director review

TASK-028
Narration script lock + voice-production plan

TASK-029
Narration integration

TASK-030
Music / audio mix / ducking

TASK-031
Full EN/DE/FR validation

TASK-032
Final technical + editorial QA

TASK-033
Final render / delivery package

TASK-034
Repository cleanup / stable checkpoint
```

Exact numbering can change, but the order is important.

---

# 21. What Is Already “Solved”

A large amount of uncertainty that existed at the beginning of this episode no longer exists.

We already solved:

```text
Remotion architecture
scene structure
visual system
technical story
restaurant analogy
manual asset workflow
agent workflow
human review gate
SpotlightImage pattern
asset resolver
localization structure
skill usage policy
scene timing conventions
review render process
feedback process
```

This matters because future episodes should be much faster.

This first episode has been doing two jobs at once:

```text
1. producing the Redis explainer
2. building the reusable video-production system
```

Much of the difficult system-building work will carry forward.

---

# 22. Realistic Remaining Effort

The remaining work is smaller than the work already completed, but it is important.

Approximate remaining effort by category:

```text
Scene 14:
small–medium

Full visual review:
medium

Narration:
medium–high

Audio/music:
medium

Localization/audio validation:
medium

Final QA/render:
medium
```

So the project is not “almost ready to upload tomorrow,” but it is well past the risky experimental stage.

The highest-risk work now is no longer:

```text
Can we build this video?
```

It is:

```text
Can we polish the complete episode into a professional final product?
```

That is a much better stage to be in.

---

# 23. Current Best Status Statement

A concise description of where the project stands today:

```text
The Redis explainer’s visual production system is established and stable.

13 of 14 scenes are implemented.

The technical story is almost complete.

The remaining major work is the final recap scene,
full-episode visual review,
narration/audio integration,
multilingual validation,
and final delivery QA.
```

---

# 24. Immediate Next Step

Before doing anything else:

```text
Human-review Scene 13
```

If accepted:

```text
→ plan Scene 14
```

If not accepted:

```text
→ make a small Scene 13 polish task only
```

After Scene 14 is complete:

```text
STOP scene-by-scene development
and switch to full-episode review mode.
```

That transition is important.

At that point, the project should stop thinking like:

```text
“How do we build the next scene?”
```

and start thinking like:

```text
“Does this entire 3+ minute video work as one coherent piece?”
```

That will be the final production phase of this episode.
