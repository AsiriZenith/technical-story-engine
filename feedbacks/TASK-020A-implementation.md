# TASK-020A Implementation Feedback — Scene 11 "the pile" (Option A, approved)

Changed: `Scene11CacheEverything.tsx` (rewritten beats 3-4, re-timed all beats), `scenes.ts` (Scene 11 `sharedWindow(11, 2)`, storyBeats/visualNotes), storyboard file.

- Beats 1, 2, 5 stay typographic. Beats 3-4 are one inline-SVG diagram, `interpolate()` only (no spring), no assets.
- Beat 3: request dots pile into a Redis node; "More memory" = entries overflow a dashed capacity frame (turns warning-colored); "More stale data" = three entries go hollow warning-outline; "More to keep in sync" = tether lines draw to a Database cylinder. The costs sentence stays as a caption, each phrase lighting up on its cue.
- Beat 4: two light dots bypass to the Database; one heavy request enters Redis (node pulses). Caption keeps the sentence. "Misses still happen" is caption-only (showing it would front-run Scene 13's reroute).
- **Re-timing** (from TASK-029 transcript times, ±0.1-0.2s, not verified by ear): punch 2.2s, "Not so fast" 3.7s, costs cues 5.5/6.7/8.0s, beat 4 at 9.35s.
- **Window finding:** EN Scene 11 window is max(target, narration+margin) = 13.63s, not 11.63s. Narration has no decision-rule line, so the rule appears at 11.1s and holds ~2.5s in silence.
- **DE/FR side effect:** planned window raised 11s -> 13s so beat 5 isn't cut off; DE/FR total runtime +2s (later scenes shift in those languages).
- Verification: `tsc --noEmit` PASS. EN stills at 7.6/8.9/10.0s, DE rule, FR beat 4 reviewed visually; no overflow. No MP4 preview rendered; motion not reviewed.
- Known: beat-4 composition is bottom-heavy (upper half empty); beat-4 caption has ~1.4s on screen before the rule; pile-vs-bar similarity to Scene 13 needs reviewer check. Scene 12's visualNotes still say "Scene 11's Option D" (stale wording, untouched).
- Human review: PENDING.
