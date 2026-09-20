# Episode 001-redis — Open Decisions

This log records known open issues that have not yet been resolved. It does not resolve them — resolving any of these requires an explicit follow-up task and, where visible media is affected, human review.

## 1. `~8 ms` vs `~10 ms` inconsistency

**Issue:** The episode's canonical cache-hit example throughout narration/captions is `~8 ms`, but the approved Scene 07 technical-architecture image (`scene07TechnicalArchitecture`, reused by Scenes 07, 08, 09, and 10) contains baked text reading `~10 ms`.

**Why not yet fixed:** The image is a human-approved, user-supplied asset under the manual asset workflow (`docs/manual-asset-workflow.md`); the coding agent cannot redraw, reinterpret, or silently correct it. No decision has been made yet on which side to change.

**What would resolve it:**
- Option 1 — standardize narration/captions toward `~10 ms` across the episode, or
- Option 2 — replace/correct the architecture image (requires a new user-approved asset).

Do not silently choose one; this needs an explicit task and user decision.

## 2. `SpotlightImage` radial-gradient mask-math issue

**Issue:** The current CSS radial-gradient dimensions in `SpotlightImage` behave more like radii than full extents, so the actual feather/reach of the spotlight is larger than the conceptual region definition suggests.

**Why not yet fixed:** Multiple approved scenes (Scenes 04, 07, 08, 09, 10) are already visually tuned around the current behavior. Fixing the math would shift the spotlight appearance in all of them simultaneously.

**What would resolve it:** A dedicated cleanup task, explicitly scoped to `SpotlightImage`, with regression checks (rendered frame comparison) against Scenes 04, 07, 08, 09, and 10 before merging. **Do not fix this globally during normal scene work.**

## 3. Scene 13 closing-frame ambient labels

**Issue:** In Scene 13's closing frame, some of the four ambient category labels (Freshness / Capacity / Resilience / Operations) remain partially visible while others are hidden behind the closing text — an inconsistent mixed state.

**Why not yet fixed:** Not a technical failure, but a visual-design judgment call that needs a human decision on the desired end state.

**What would resolve it:** A human design decision between the two coherent options — all four labels faintly visible, or all four fully hidden — followed by a small Scene 13 polish task implementing that choice. This is also currently the episode's human-review bottleneck: Scene 13 review determines whether Scene 14 planning can begin (see `README.md` and `docs/REDIS_EPISODE_PRODUCTION_STATUS.md` "Immediate Next Step").
