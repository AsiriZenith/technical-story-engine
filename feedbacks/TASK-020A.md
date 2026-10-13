# TASK-020A Feedback — Scene 11 Visual Rework Planning

Planning task only. No `.tsx` file was written or modified; nothing was implemented. Files changed: this feedback and `storyboard/scenes/scene-11-should-we-cache-everything.md`.

## 1. Context Reviewed

- `storyboard/scenes/scene-11-should-we-cache-everything.md` — still described the TASK-020 build. It matched the as-built 5 beats, so I did not need to fall back on `TASK-020.md`. I also read `feedbacks/task-020-feedback.md` for the as-built timings and humor rules.
- `Scene11CacheEverything.tsx` (current), `Scene13CacheCosts.tsx` (post-rebuild: `CapacityBar`, `FreshnessRing`, `ResilienceReroute`, `OperationsHeartbeat`, `CentralNode`).
- `AGENTS.md` visual-first principle, `shared/motion/presets.ts`, `shared/architecture/node-semantics.ts`, the Scene 11 localization strings, `narration/script.md`, and `scene-boundaries.json`.

Facts that matter for the options:

- Scene 11's text is short: bridge, joke, "More memory. More stale data. More to keep in sync.", "Not every request is expensive enough… and misses still happen.", decision rule.
- **Timing flag:** beats were authored for an 11.0s window. The audio-derived window is 161.16–172.79s = **11.63s**. TASK-029 re-timed Scenes 10, 13 and 14 only; `Scene11CacheEverything.tsx` is not modified. The script itself flags Scene 11 as slightly over its window, and Whisper matched Scene 11 worst of the late scenes (93%, "cash everything"). Any implementation needs a beat re-time against the real narration first, ideally confirmed by ear.

## 2. Skills Consulted

I read these `SKILL.md` files before forming the options. I did not open `review-animations/STANDARDS.md`, and I read `animate` only through its "should it animate / what purpose" gate. I did not re-check the `remotion-best-practices` pack; TASK-025d already concluded it has nothing diagram-specific, and nothing here needs canvas/WebGL effects.

| Skill | What I took from it | Where it shows up |
|---|---|---|
| `frontend-design` | "Visual structure is information"; avoid decorative labels and the SaaS-card kit; spend boldness in one place. | Pushes against labeled gauge-per-cost rows (Option C) and for **one memorable object** in Option A. Also the reason no option adds cards or chips. |
| `animate` | Gate first: why does this move, and what purpose (state indication / explanation)? Ease-out only, no `scale(0)` entrances, cheapest tool. | Every proposed motion has a stated purpose below. Entrances start at 0.9–0.96 scale plus opacity. All motion is `interpolate()` on `opacity`/`translate`/`scale`, as the Scene 13 file does. |
| `review-animations` | "Delete first" remedial order; GPU-only properties; cohesion with the rest of the episode. | The reason beat 2 is left alone. It also pushes the pile growth onto `scale`/`translate` instead of animated `height` (the same trick as Scene 13's `scaleX` bar). It also drives the cohesion argument against repeating Scene 13's motifs. |

Note: the "sub-300ms UI" and reduced-motion rules are web-UI rules. As in Scenes 13 and 14 they are interpreted for video, where fades are ~0.35–0.5s.

## 3. Overlap Question (Scene 13 foreshadowing)

Scene 11's three costs (memory, stale, sync) overlap two of Scene 13's four categories (Capacity, Freshness), and Scene 12 sits between them and spends a full scene on staleness. If Scene 11 draws a small bar and a small ring, Scene 13's `CapacityBar` and `FreshnessRing` stop being new: the viewer has seen both ~25 seconds earlier at lower stakes. Scene 13 is the episode's cost payoff, so I'd protect it.

**Recommendation on the question: use a distinct visual treatment.** Share the episode's *grammar* (Redis stack icon, cache-red accent, Database cylinder, request dots) and not its *diagrams*. Option C is the only option that foreshadows, and I flag it as the highest-risk choice.

## 4. Options

All options leave **beat 2 (the joke) typographic and under ~2s**, per the TASK-020 humor rules. The brevity was a deliberate constraint, so none of them touches it. All three also keep **beat 1 typographic**: it is a one-line transition, not a teaching moment. I agree with the task's expectation there.

### Option A — "The pile" (recommended)

One object carries the scene. After "Not so fast." a Redis stack node fades in at center. Small request dots stream in from the left and each one lands in the node as a cached entry. The pile of entries is the visual for "cache everything" and also the thing that goes wrong.

| Beat | Treatment |
|---|---|
| 1 Bridge | Typographic, unchanged. |
| 2 Joke | Typographic, unchanged. |
| 3 Costs | The cost lines are spoken as three phrases, so each one changes the *same pile*, with ~0.12s staggers (`staggerSmall`). **"More memory"**: the pile's entries stack up past the node's frame (stacked blocks rise by `translate`/`scale`, not a bar). **"More stale data"**: a few entries lose fill and become warning-colored outlines. No ring and no countdown, so Scene 13's motif is not reused. **"More to keep in sync"**: thin tether lines draw from the entries down to a Database cylinder that fades in (`strokeDashoffset` draw-on). The sentence stays on screen as a smaller caption under the diagram; it is not removed. |
| 4 Not every request | The stream resolves into two kinds of request. Light dots pass the node and go straight to the Database. One heavy, repeated request block loops back twice and *that* one lands in the node. A short caption keeps the sentence. "Misses still happen" stays in the caption only (see risk below). |
| 5 Decision rule | Typographic closing line, unchanged. The pile fades out before it so the takeaway has the screen alone. |

- **New vs reused:** new — request dots, entry blocks, tether lines, heavy-request block. Reused — Scene 13's `CentralNode`/`StackIcon` pattern (copied file-local as Scene 13 did; Scene 01's glyphs are not exported) and `CylinderIcon`, `windowOpacity`, `easeOut`, node-semantics colors.
- **Animation approach:** `interpolate()` for everything. Possible `spring()`: none required. If the human wants it, the only candidate is the pile "settling" after the stale entries flip, but that is not a return-to-state beat, so the standing rule says no. I'd leave it out.
- **Effort/risk:** medium-high — roughly Scene 13's rebuild size minus one diagram, since there is one object rather than four. Biggest craft risk: three cost changes inside ~2.2s of costs beat (re-timed to the real ~2.5–3s once beats are re-aligned). If it reads cluttered, drop the tether lines (sync) to the caption only.
- **Scene 13 overlap:** low. It uses the same node, accent and Database cylinder, and a different diagram. The stale-outline entries are only a state change, not a countdown ring, and the pile growth is not a fill bar. A reviewer should still check that "entries piling past the frame" does not read as a memory bar. If it does, switch the pile to a loose cluster instead of a column.

### Option B — "The scale" (cost vs benefit)

A balance-scale fills in the whole scene: left pan = *repeated expensive work avoided* (benefit), right pan = *the costs*.

| Beat | Treatment |
|---|---|
| 1 | Typographic. |
| 2 | Typographic, unchanged. |
| 3 | The scale appears; three weights drop onto the cost pan one at a time, each tagged with a one-word glyph (memory chip, hollow dot, link). The beam tips toward cost. |
| 4 | A light request tries the benefit pan and barely moves it (small payoff); a heavy request lands and tips it back. Caption keeps the sentence. |
| 5 | The decision rule is the scale settling level/benefit-side as the closing line appears. |

- **New vs reused:** all new (beam, pans, weights). Almost nothing from Scene 13.
- **Animation approach:** `interpolate()` on the beam's `rotate` and the weights' `translate`. The beam settling at the end is a genuine node-settle/return-to-state, so this is the one option where the `spring()` standing rule clearly applies. I'd flag it as open, not decided, as TASK-025d did.
- **Effort/risk:** medium. Fewer moving parts than A, but custom drawing, and the balance-scale is a familiar metaphor (cliché risk per `frontend-design`). It carries the *decision rule* better than A does, since "worth the tradeoff" is literally weighing. Its weakness: it doesn't show *what* caching everything looks like, and there is no Redis node, so it drifts from the episode's architecture vocabulary.
- **Scene 13 overlap:** very low, because it shares no diagrams. It does change the episode's visual language, which was a concern when Scene 11 went typography-only.

### Option C — "Glyphs beside the phrases" (lowest effort, foreshadows Scene 13)

Keep the text structure. Add a small inline motif beside each cost phrase: tiny filling bar for memory, tiny decaying ring for stale, link icon for sync. Beat 4 gets a two-request contrast. Beat 5 unchanged.

- **New vs reused:** mostly reused — it is, nearly literally, scaled-down `CapacityBar` and `FreshnessRing`.
- **Animation approach:** `interpolate()` only; no spring.
- **Effort/risk:** low-medium. It most directly matches the task's own beat-3 suggestion, but it **visually front-runs Scene 13** and weakens its impact. It is also still text-forward, which is the complaint being addressed, and it drifts toward the icon-row/checklist feel TASK-020 deliberately avoided. Not recommended.

### Why no text-only option

AGENTS.md says a text-only option should appear only as a deliberate fallback. The current build *is* that fallback, and it is the thing being replaced, so I did not re-list it.

## 5. Recommendation — PENDING HUMAN APPROVAL, NOT FINAL

**Option A**, with Option B as the alternative if the reviewer would rather have a stronger decision-rule beat than a stronger "what goes wrong" beat. Rationale: Option A is the only one that (1) shows what "cache everything" looks like, (2) keeps the episode's architecture vocabulary, (3) puts all three costs on one object, so Scene 13 still gets its four fresh diagrams, and (4) has a single memorable object, per `frontend-design`. Option C is not recommended because of the Scene 13 overlap.

## 6. Risks and Open Questions

1. **Scene 13 overlap / front-running** — covered above. It is lowest in B, low in A, and highest in C. The pile-vs-bar similarity in A needs an explicit reviewer check.
2. **"Misses still happen" has no visual in A.** Showing a miss would use Scene 13's reroute grammar and would front-run its Resilience beat. I left it in the caption. If the human wants it shown, that is a deliberate trade against Scene 13.
3. **Beat re-time is a prerequisite.** Window is 11.63s vs the 11.0s the code assumes, and beat boundaries inside Scene 11 have not been checked against the audio. A diagram-per-phrase beat 3 needs the three phrases' spoken times, not the old estimates.
4. **Localization.** Diagrams are language-neutral, but captions in DE/FR stay as they are. The shortened German beat-4 line from TASK-020 was already a judgment call; it shares the screen with a diagram now, so check wrap in DE/FR.
5. **Unresolved:** whether the human wants the pile caption kept under the diagram or reduced to the one-word glyph. I assumed the sentence stays (it is spoken, and the viewer on mute still needs it).

## 7. Storyboard Update

`storyboard/scenes/scene-11-should-we-cache-everything.md`: the TASK-020 approach is retained under "SUPERSEDED / under revision" as history; the new direction is added as "PROPOSED (TASK-020A), pending approval". `Status` still says Implemented/PASS for TASK-020 and now states it is under revision with nothing implemented. No `.tsx`, `scenes.ts` or other file was touched.

## 8. Final Status

```text
TASK-020A STATUS: PLANNING COMPLETE — recommendation pending human approval
```
