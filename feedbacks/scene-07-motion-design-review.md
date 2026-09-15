# Scene 07 Motion Design Review — Plan Only (No Implementation)

Review-only pass on `src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx`,
requested separately from a numbered task. No files were modified. Source
images (`scene-07-analogy-mapping.png`, `scene-07-technical-architecture.png`)
are approved and are not proposed to change in any way.

**Note on skills used:** `frontend-design` and `animate` were consulted
directly. `review-animations` is reserved for explicit user invocation
(`/review-animations`) and could not be invoked by me as a skill call — I
applied the same review bar `animate` describes (the two skills share one
bar), but you should run `/review-animations` yourself for the formal pass
before this is implemented.

Inputs reviewed: the scene source, both approved PNGs, and the current
render artifacts in `renders/review/task-014/` (`scene-07-start.png`,
`scene-07-analogy-mapping.png`, `scene-07-technical-architecture.png`,
`scene-07-end.png`, `scene-07-preview.mp4`), plus four extra stills I
rendered temporarily at the edges of each highlight's visible window to
check for drift (and deleted afterward — they weren't required deliverables,
just verification).

---

## Two findings before the beat-by-beat plan

These affect the recommendation for every beat below, so stating them once:

**Finding A — same transform-tracking bug just fixed in Scene 06, present
here too, but currently low-severity.** `DiagramBeat` applies
`transform: scale(${scale})` directly to the `<Img>`, while every
`<FocusBox>` is rendered as an untransformed sibling in fixed canvas
coordinates — exactly the structural bug TASK-013A found and fixed in Scene
06 (an `<Img>` transform with a focus box that doesn't share it). Here the
scale range is much smaller (1.0 → 1.03, no pan, vs. Scene 06's 1.0 → 1.045
*plus* a 20px pan), and I rendered stills at the early and late edges of two
boxes' visible windows to check: the drift is on the order of single-digit
to low-double-digit pixels at the extremes, and isn't visually obvious at
normal viewing distance given the boxes are already sized with margin. It is
still a real, code-confirmed defect and should be fixed the same way Scene 06
was (wrap `<Img>` and its focus-box children in one transformed container)
whenever this scene is next touched — I'm flagging it now rather than
letting it compound if the scale range or box tightness ever changes later.

**Finding B — two of the five analogy-beat boxes use the wrong accent
color.** `<FocusBox>` defaults to amber
(`rgba(255,209,102,0.85)`) when no `color` is passed. The Redis/Cache box
(red), Database box (green), and Cached-result box (amber) all correctly
match their own badge's border color in the source image. But the Request
and Application boxes don't pass a `color` prop, so they render amber too —
while their badges in the source image have a blue border. Amber now
silently means three different things in one beat (Request, Application,
Cached result) while red and green each mean exactly one thing. This is
worth fixing regardless of the broader recommendation below.

---

## Beat-by-beat plan

### Beat 1 — Analogy image opens (0.0s–0.9s scene time)
1. **Emphasize:** Nothing yet — let the full mapping image land and read as
   a whole for a beat before calling out any one piece of it.
2. **Highlight needed:** No.
3. **Target region:** N/A.
4. **Image moving/zooming:** Yes — the very start of the 1.0→1.03 scale
   push-in (`analogyIn: 0.4` → `analogyOut: 6.4`), barely perceptible this
   early.
5. **Alignment:** N/A (no highlight).
6. **Appears/disappears:** N/A.

### Beat 2 — Request (0.9s–1.7s)
1. **Emphasize:** That the customer's spoken order is "the request."
2. **Highlight needed:** Marginal. The badge is already a high-contrast,
   clearly-bordered box in the image's own art, at the natural start of the
   reading order (top-left) — a viewer's eye goes there first regardless.
   **Recommendation: drop this highlight.** If a cue is kept for pacing
   (to mark "we're on this one now" in sync with narration later), it
   should be a soft glow *behind* the badge, not a second outline duplicating
   the badge's own border.
3. **Target region (if kept):** `left:95, top:150, width:330, height:80`
   (unchanged from current code — this box is already correctly sized/placed
   against the badge; the issue is color and necessity, not position).
4. **Image moving/zooming:** Yes, same slow 1.0→1.03 push-in as the whole
   beat.
5. **Alignment:** Currently broken by Finding A (box doesn't share the
   image's transform) — if this highlight is kept, it must be fixed the
   same way as Scene 06 (wrap in a transformed container) before this beat
   goes back to production.
6. **Appears/disappears:** Current: fades in at 0.9s, then *persists*
   (never fades out) through the rest of the beat. **Recommendation: if
   kept, fade out by ~1.5s**, just before the Application box takes over —
   so only one box is ever lit at a time (see the cumulative-stacking issue
   below).

### Beat 3 — Application (1.7s–2.5s)
1. **Emphasize:** That the cashier is "the application" — the thing that
   receives the request and decides where to go next.
2. **Highlight needed:** Marginal, same reasoning as Request — the badge is
   already legible and next in natural reading order.
   **Recommendation: drop, or soft glow only, same as Beat 2.**
3. **Target region (if kept):** `left:565, top:185, width:310, height:75`.
4. **Image moving/zooming:** Yes, same push-in.
5. **Alignment:** Same Finding A fix required if kept.
6. **Appears/disappears:** Current: fades in at 1.7s, persists to the end of
   the beat. **Recommendation: fade out by ~2.3s** if kept, matching the
   "one at a time" pattern.

### Beat 4 — Redis / Cache (2.5s–3.3s)
1. **Emphasize:** This is the pivot concept of the whole scene — the
   restaurant's ready shelf *is* Redis. This is the one analogy-beat
   highlight I'd keep unconditionally.
2. **Highlight needed:** Yes.
3. **Target region:** `left:935, top:245, width:375, height:90`, color red
   (`rgba(220,56,45,0.85)`) — already correct, matches the badge's own red
   border.
4. **Image moving/zooming:** Yes, same push-in.
5. **Alignment:** Needs the Finding A transform-tracking fix.
6. **Appears/disappears:** Current: fades in at 2.5s, persists to beat end.
   **Recommendation: fade out by ~3.1s**, right before Database takes over.

### Beat 5 — Database (3.3s–4.1s)
1. **Emphasize:** The chef *is* the database — the second half of the
   pivotal pairing (cache vs. source of truth) that the scene is building
   toward. Also worth keeping unconditionally, as the direct counterpart to
   Beat 4.
2. **Highlight needed:** Yes.
3. **Target region:** `left:1470, top:135, width:330, height:90`, color
   green (`rgba(37,166,106,0.85)`) — already correct.
4. **Image moving/zooming:** Yes, same push-in.
5. **Alignment:** Needs the Finding A fix.
6. **Appears/disappears:** Current: fades in at 3.3s, persists to beat end.
   **Recommendation: fade out by ~3.9s**, right before Cached result takes
   over (or before the beat ends, if Cached result is dropped — see next).

### Beat 6 — Cached result (4.1s–6.4s, currently persists to the cut)
1. **Emphasize:** That what's sitting on the shelf/in Redis is the
   *result*, not the raw order.
2. **Highlight needed:** Marginal-to-no. The "Cached result" tag with its
   arrow pointing at the glowing burger is already a self-contained, clearly
   legible callout in the source art — it doesn't need a second box drawn
   around it to register. **Recommendation: drop this highlight**, and let
   the beat hold on the full, unhighlighted mapping image for its last ~2
   seconds instead (a clean settle before the cut, rather than one more
   box appearing).
3. **Target region (if kept):** `left:1195, top:405, width:290, height:90`,
   default amber (already correct match here — this is the one box where
   amber is right).
4. **Image moving/zooming:** Yes, same push-in, now at its largest
   cumulative scale (~1.02–1.03) — the box furthest from screen-center
   would show the most drift from Finding A if this highlight is kept.
5. **Alignment:** Needs the Finding A fix if kept.
6. **Appears/disappears:** Current: fades in at 4.1s and is the only one of
   the five that's actually still visible right up to the cut (by design —
   it's the last one added and nothing removes it). If dropped per the
   recommendation above, nothing to time here.

### The cumulative-stacking problem (spans Beats 2–6)
As currently written, none of the five analogy boxes ever fade out — each
one fades in and then stays. By the end of the beat (confirmed in a still
rendered near `analogyOut`), **all five are lit simultaneously**: Request,
Application, Redis/Cache, Database, and Cached result, each in a
differently-colored glowing rectangle, at once. That's the opposite of "one
main focus target at a time" and reads as visual noise piling up rather than
a guided walkthrough, even though no two boxes spatially overlap.

**Recommendation:** convert every kept highlight in this beat to a proper
sequential spotlight — fade the previous box out (over ~0.3–0.4s) as the
next one fades in, so at most one is ever visible, the same discipline the
technical-architecture beat below already follows correctly.

Combined with dropping Request, Application, and Cached result (per Beats
2/3/6 above), the analogy beat would end up with **at most two highlights
total** — Redis/Cache, then Database — which is both the minimum needed to
land the pivot idea and fully compliant with "prefer fewer highlights" /
"one main focus target at a time." If you'd rather keep all five for
narration-pacing reasons once real narration exists, the sequential (not
cumulative) fix above should still apply regardless.

### Beat 7 — Beat marker / cut (6.45s–6.7s)
1. **Emphasize:** Nothing — this is a deliberate pause between the two
   diagrams, not a target on either one.
2. **Highlight needed:** No (and none is used — this is already correct;
   the small pulsing dot is not a diagram highlight, it's a transition
   beat).
3. **Target region:** N/A.
4. **Image moving/zooming:** Neither image is visible/opaque during the
   marker's peak.
5. **Alignment:** N/A.
6. **Appears/disappears:** Fine as-is; no change recommended.

### Beat 8 — Technical-architecture image opens (7.0s–8.5s)
1. **Emphasize:** Nothing yet — same reasoning as Beat 1: let the dense,
   six-step diagram register as a whole before pointing at any one node.
2. **Highlight needed:** No.
3. **Target region:** N/A.
4. **Image moving/zooming:** Yes — start of a second, separate 1.0→1.03
   push-in (`techIn: 7.0` → `techOut: 16.0`).
5. **Alignment:** N/A.
6. **Appears/disappears:** N/A.

### Beat 9 — Redis node (8.5s–11.5s)
1. **Emphasize:** "This is the fast, not-source-of-truth cache" — directly
   continuing the Database/Redis pairing built in the analogy beat.
2. **Highlight needed:** Yes. Unlike the analogy beat's five stacked boxes,
   this diagram is dense enough (six numbered steps, two side-note callouts,
   a stats block) that a brief guided pointer genuinely helps a first-time
   viewer know where to look first, even though the node's own red border
   and "CACHE / FAST ACCESS" text already say the same thing. This is a
   legitimate case for keeping a highlight, not a redundant one.
3. **Target region:** `left:1225, top:130, width:365, height:225`, red — a
   close, only slightly generous fit around the node (in the rendered still
   at this box's early frame, its right edge sits close to the adjoining
   side-note callout's connector arrow without covering the callout's text —
   worth a final eyeball check in the formal review, but not a change I'd
   make blind).
4. **Image moving/zooming:** Yes, same push-in, now roughly 20–70% through
   its own 9s window (scale ≈1.005–1.015).
5. **Alignment:** Needs the Finding A fix (same as every box in this scene).
6. **Appears/disappears:** Current timing (8.5s–11.5s, ~0.4s fades) is
   good — no change. It already doesn't overlap the Database node's window
   (which starts 0.3s after this one ends), so this beat already follows
   the "one at a time" rule correctly.

### Beat 10 — Database node (11.8s–15.3s)
1. **Emphasize:** "This is the accurate, persistent source of truth" — the
   counterpart to Beat 9.
2. **Highlight needed:** Yes, same reasoning as Beat 9.
3. **Target region:** `left:1225, top:635, width:365, height:230`, green —
   also a close fit in the rendered still checked near this box's late
   frame (15.2s), no visible drift or overlap onto neighboring text at
   normal viewing size.
4. **Image moving/zooming:** Yes, same push-in, now at its largest
   cumulative scale for this beat (~1.015–1.028) — this box would show the
   most drift of the two tech-beat boxes from Finding A, though not
   visibly so in the still I checked.
5. **Alignment:** Needs the Finding A fix.
6. **Appears/disappears:** Current timing (11.8s–15.3s, ~0.4s fades) is
   good — no change.

### Beat 11 — Image holds clean, then closing caption (15.3s–16.0s image, 16.4s caption)
1. **Emphasize:** The scene's takeaway line ("Redis answers repeated
   requests without repeating database work"), after the viewer has had the
   full diagram to themselves for a moment.
2. **Highlight needed:** No — this is text, not a diagram highlight, and it
   correctly appears only after the image has fully faded (the TASK-014 fix
   that kept it off the image's own bottom-band stats). No change
   recommended here.
3. **Target region:** N/A.
4. **Image moving/zooming:** Image has fully faded out by the time the
   caption appears (confirmed in `scene-07-end.png`).
5. **Alignment:** N/A.
6. **Appears/disappears:** Fine as-is.

---

## Summary of recommendations

| Beat | Current | Recommendation |
| --- | --- | --- |
| Request | amber box, persists | Drop, or soft glow (no border), fades out before next |
| Application | amber box, persists | Drop, or soft glow (no border), fades out before next |
| Redis/Cache (analogy) | red box, persists | Keep; fade out before Database |
| Database (analogy) | green box, persists | Keep; fade out before next |
| Cached result | amber box, persists | Drop |
| Redis node (tech) | red box, timed window | Keep as-is (already correct pattern) |
| Database node (tech) | green box, timed window | Keep as-is (already correct pattern) |

Net effect if fully adopted: **7 highlight boxes → as few as 2** (Redis/
Cache and Database in the analogy beat), all strictly one-at-a-time, all
color-consistent with their own badge borders, none large or filled — plus
the Finding A transform-tracking fix applied scene-wide so every kept
highlight (and any future one) tracks the image exactly rather than
depending on the current scale being small enough to hide the drift.

Nothing here proposes touching the two approved source images — every
recommendation is about which Remotion-drawn overlays exist, their color,
their timing, and how they're parented to the image's transform.

**Not implemented.** Stopping here per your instruction.
