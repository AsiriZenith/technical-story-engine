# Episode 001-redis — Storyboard

## Episode Goal

This episode explains why an API endpoint can become dramatically faster after introducing Redis.

Core technical thesis:

> Redis does not necessarily make the original database query faster. Instead, Redis lets the application avoid repeating expensive work when a cached result already exists.

Running example: `GET /users/42` — before Redis, ~180 ms; after Redis (cache hit), ~10 ms.

The episode deliberately avoids the simplistic explanation "Redis is fast because RAM is fast and databases are slow because disks are slow." Instead it builds toward the mental model: **what work did Redis allow us to stop doing?**

## Scene Status

| # | Scene | Status | File |
|---|-------|--------|------|
| 01 | The Mystery | Implemented, human approved | [scene-01-mystery.md](scenes/scene-01-mystery.md) |
| 02 | Where the 180 ms Comes From | Implemented, human approved | [scene-02-latency-breakdown.md](scenes/scene-02-latency-breakdown.md) |
| 03 | The Misconception | Implemented, human approved | [scene-03-misconception.md](scenes/scene-03-misconception.md) |
| 04 | Original Request Path | Implemented, human approved | [scene-04-request-path-before-redis.md](scenes/scene-04-request-path-before-redis.md) |
| 05 | Restaurant: Repeated Work | Implemented, human approved | [scene-05-restaurant-analogy.md](scenes/scene-05-restaurant-analogy.md) |
| 06 | Ready Order / Cache | Implemented, human approved | [scene-06-ready-shelf-analogy.md](scenes/scene-06-ready-shelf-analogy.md) |
| 07 | Restaurant to Architecture | Implemented, human approved enough to proceed | [scene-07-analogy-to-architecture.md](scenes/scene-07-analogy-to-architecture.md) |
| 08 | Cache Miss | Implemented, PASS | [scene-08-cache-miss.md](scenes/scene-08-cache-miss.md) |
| 09 | Cache Hit | Implemented, PASS | [scene-09-cache-hit.md](scenes/scene-09-cache-hit.md) |
| 10 | Why Redis Can Be Fast | Implemented, PASS | [scene-10-why-redis-fast.md](scenes/scene-10-why-redis-fast.md) |
| 11 | Cache Everything? | Implemented, human approved (TASK-020A pile diagram) | [scene-11-should-we-cache-everything.md](scenes/scene-11-should-we-cache-everything.md) |
| 12 | Stale Cache | Implemented, PASS | [scene-12-stale-cache.md](scenes/scene-12-stale-cache.md) |
| 13 | Cost of Caching | Implemented, TASK-024 PASS, human review pending | [scene-13-cache-tradeoffs.md](scenes/scene-13-cache-tradeoffs.md) |
| 14 | Final Mental Model | Implemented, awaiting human video review | [scene-14-final-mental-model.md](scenes/scene-14-final-mental-model.md) |

## Current Overall Status

```text
Scene planning:        complete
Scene implementation:  14 of 14 scenes implemented (100%)
Visual system:         established
Localization:          EN / DE / FR integrated through Scene 14
Review workflow:       established and working
Final scene:           implemented (TASK-026), awaiting human video review
Full-episode review:   completed by agent (TASK-027), awaiting human confirmation
8ms/10ms discrepancy:   resolved (TASK-028) — standardized on ~10 ms
Narration script:       approved (EN)
Narration audio (EN):   integrated (TASK-029) — ONE continuous Descript file,
                        narration/audio/en/episode-full.wav; per-scene spans are
                        derived in narration/audio/en/scene-boundaries.json
EN scene duration:      audio-derived (7700 frames / 256.67s); DE/FR still use
                        author-estimated timing (6861 frames / 228.70s)
Music + ducking (EN):   integrated (TASK-030, retuned TASK-030B) — texture-only pad,
                        looped, ducked under narration; mix quality pending human listen
Accent SFX (EN):        7 placements, first pass (TASK-030B), pending human approval
Narration (DE/FR):      outstanding — not yet recorded
EN narration/visual sync: only Scenes 10, 13, 14 re-timed so far (TASK-029); other
                        scenes' beats still follow the old author-estimated timing —
                        human review pending (see feedbacks/TASK-029.md)
Full-episode QA:       still required
Final render/package:  still required
```

The episode is past per-scene production and is now in:

```text
EN narration integrated (TASK-029), human sync review pending
-> re-time remaining scenes' beats to the narration (see feedbacks/TASK-029.md)
-> DE/FR narration
-> polish transitions/timing (see feedbacks/TASK-027.md's 10->11 transition finding)
-> final multilingual validation
-> final render
```

Whole-episode delivery is estimated at roughly 75-85% complete; core scene production at roughly 90-93% complete. See `decisions.md` for open items that must be resolved before final lock, and `docs/REDIS_EPISODE_PRODUCTION_STATUS.md` for the fuller narrative status writeup this structure was extracted from.

## Maintaining This Storyboard

Update this table and the relevant `scenes/scene-NN-*.md` file whenever a scene's implementation or review status changes. Log any newly identified open issue in `decisions.md` rather than growing a single status document. See the "Storyboard convention" section in the repository-root `AGENTS.md`.
