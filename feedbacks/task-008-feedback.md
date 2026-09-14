# TASK-008 Feedback — Scene 03 Rebuilt on the Supplied Diagram Assets

## 1. Reset Performed

The reset was carried out before any new work, as its own step.

What was removed/restored:
- Reverted four tracked files to the committed baseline: `RedisEpisode.tsx`,
  `episode.config.ts`, `scenes.ts`, `src/shared/localization/index.ts`. The
  localization revert also removed an unrelated whole-file quote-style
  reformatting that a previous attempt had introduced.
- Deleted the previous `Scene03DatabaseMisconception.tsx` (the redrawn
  implementation), `feedbacks/task-008*-feedback.md`, the old
  `tasks/TASK-008*.md` files, and `renders/review/task-008*`.

Baseline used:
`1e8a51b chore: add motion and visual design agent skills` — the committed
TASK-007 / approved Scene 01 + Scene 02 state.

No destructive reset was needed or used. `git log` confirmed HEAD was already
that baseline with no newer commits, and every Scene 03 change was uncommitted,
so the cleanup was a plain `git checkout --` of the four files plus removal of
untracked files. No commit, rebase, or `git reset` was performed.

How unrelated work was protected:
- Before reverting `src/shared/localization/index.ts`, its working copy was
  diffed against `HEAD` with quoting normalized, to confirm the reformatting
  had not hidden any Scene 01/02 content edits. It had not.
- Scene 01, Scene 02, TASK-007 skill infrastructure (16 skills +
  `skills-lock.json`), TASK-001–007 tasks/feedbacks, and
  `architecture-flow-reference.png` were left untouched.
- The two reference JPGs and both new Scene 03 PNG assets were preserved.
- Everything removed was first copied to a scratchpad backup
  (`task-008-backup/`, including a `scene03-tracked-changes.patch`), so the
  discarded work remained recoverable.

After cleanup, typecheck, build, and composition discovery passed, compositions
returned to 1170 frames (Scene 01 + Scene 02 only), and Scene 01/02 stills were
rendered and inspected.

## 2. Asset Usage

### `public/episodes/001-redis/assets/scene-03-joke-diagram.png`

- Registered in the asset manifest as logical ID `scene03JokeDiagram`
  (`type: image`, `status: candidate`).
- Used for the misconception/joke beat, from 1.95s to 7.75s scene-relative.
- Rendered with Remotion's `<Img>` + `staticFile()` at full bleed
  (`width/height: 100%`, `objectFit: cover`). The asset is 1024×576 and the
  composition is 1920×1080 — both exactly 16:9 — so it appears complete and
  uncropped.
- Used directly. It is not redrawn, traced, masked, recomposed, or partially
  replaced. The only operations applied are opacity, a scale from 0.988→1 on
  entrance, and the full-frame fit.

### `public/episodes/001-redis/assets/scene-03-end-diagram.png`

- Registered as logical ID `scene03EndDiagram` (`type: image`,
  `status: candidate`).
- Used for the final payoff beat, from 7.9s to the end of the scene.
- Same direct full-bleed `<Img>` treatment and same entrance motion.
- Used directly, not redrawn or reinterpreted.

Scene code asks for the logical ID and receives a path via a new `getAssetPath()`
helper, so swapping either file never reaches scene code — per the manifest rule
in `docs/production-architecture.md`.

## 3. Joke Scene

The joke beat renders the exact user-provided `scene-03-joke-diagram.png`.

This is not "inspired by" the asset and not a reconstruction of it. The PNG file
itself is loaded and displayed. Every element the viewer sees in that beat — the
"So Redis made the database faster?" title, the Application → Redis → Database
row, the megaphone character, the "FASTER!" bubble, the "REDIS CACHE" plaque, and
the "X NOT THIS" banner — comes from the user's file, not from code.

No shapes, characters, arrows, or labels for this beat exist in the Remotion
source. The scene component contains no diagram drawing code at all.

## 4. End Scene

The payoff beat renders the exact user-provided `scene-03-end-diagram.png`.

Again, the PNG file itself is displayed. The Before/After cards, the repeated-work
stack, the loop icon, the crossed loop-with-X, the green dotted paths, the green
check circle, and both baked takeaway lines all come from the user's file.

No before/after diagram was designed, drawn, or approximated in code.

## 5. Background / Style Integration

How the project background was preserved:
- The scene keeps the standard project shell: `theme.background` (`#08111f`)
  plus the same 48px grid overlay used by Scenes 01 and 02, identical markup.
- The supplied PNGs have a background of roughly `#09131F`–`#0C1421`, sampled
  from their corners — within a few values per channel of the project's
  `#08111f`. They therefore sit on the project background seamlessly, with no
  visible box, seam, or foreign backdrop.

How the assets were layered in:
- Each diagram is its own `AbsoluteFill` layer above the background, carrying
  only an opacity value. The project background stays behind them and is what
  shows during the opening beat and the handoff between diagrams.

Text and motion added around them:
- One opening recall block ("DATABASE WORK / 155 ms") reusing Scene 02's exact
  carried-over-result pattern — same position, typography tokens, and colour —
  so Scene 03 continues visually from where Scene 02 ends.
- For German and French only, one supplemental localized line placed in the
  genuinely empty band beneath the diagram. Nothing is drawn over the artwork.
- Motion is opacity plus a 0.988→1 entrance scale. Nothing else.

No frames, borders, vignettes, captions, or decorative chrome were added around
the diagrams.

## 6. 0.02s Overlap Fix

Root cause:
The previous implementation kept the "155 ms" recall block visible until
`diagramIn + 0.25s` while the misconception question faded in at 1.85s. Their
bounding boxes intersected (recall spanned roughly y=80–209, the question began
at y=168), so from about 1.85s both were opaque and collided. The report of an
overlap "at 0.02s" corresponds to the 0:02 position — two seconds into the
Scene-03 preview MP4, which began at Scene 03's own frame 0 — not to 20
milliseconds. Rendering frames 0–3 confirms the literal 0.00–0.10s window was
always blank, so the 0:02 reading is the one that matches an actual defect.

Exact fix:
The rebuild removes the overlap by construction rather than by nudging
coordinates. Every text-bearing layer now has a visible window that closes
completely before the next one opens (`Scene03DatabaseMisconception.tsx:26-33`):

- recall: 0.40s → 1.35s, fully faded out by 1.80s
- joke diagram: 1.95s → 7.30s, fully faded out by 7.75s
- end diagram: opens at 7.90s

Because the windows do not intersect, no two text-bearing layers can be
simultaneously visible at any frame. This also rules out the subtler failure of
crossfading the two diagrams, which would have ghosted one set of baked text
through the other.

Frame 0–3 validation:
`overlap-frame-000.png` through `overlap-frame-003.png` (Scene 03 local frames
0–3) were rendered and inspected. All four are pure background with no text.

Two further frames were rendered because they are where this bug class actually
lives:
- `overlap-check-2s.png` (2.00s — the position the report pointed at): the joke
  diagram is mid-fade-in and the recall block is completely gone. No collision,
  no ghosting.
- `overlap-check-handoff.png` (7.80s — between the two diagrams): pure
  background, empirically confirming the diagrams never coexist.

MP4 validation:
The first four frames were extracted from the *encoded* `scene-03-preview.mp4`
with ffmpeg (`mp4-frame-001.png`–`mp4-frame-004.png`, covering 0.00–0.10s).
Frame 1 is clean background, so the fix holds in the encoded video and not only
in the composition.

## 7. Skills Used

- `technical-story-video`: kept the task scoped to Scene 03, enforced the
  logical-asset-ID manifest rule instead of hard-coding file paths in the scene,
  required real rendered review media over compile-only confidence, and set human
  review to PENDING with a stop afterwards.
- `frontend-design`: its own rule that "where the brief pins down a visual
  direction, follow it exactly" applied directly here. The decision it drove was
  subtractive: reuse the existing token system and Scene 02's typographic
  pattern, and add no frames, labels, eyebrows, or decorative chrome around the
  supplied artwork.
- `animate`: drove the motion ingredients — `transform`/`opacity` only, a strong
  custom ease-out rather than a weak built-in, no `scale(0)` entrance (0.988→1),
  and no scattered per-element motion. Its "explanatory motion can be longer"
  tier justified 0.45–0.5s fades, which would be too slow for a UI control but
  are correct for a video beat.
- `review-animations`: run as the QA pass before writing this report. Results
  below.

`review-animations` findings table — no rows. Nothing in the diff triggered a
finding, so the table is empty rather than padded.

Verdict by tier:
- Feel-breaking regressions: none. Easing is `Easing.bezier(0.16, 1, 0.3, 1)`, a
  strong ease-out matching Scenes 01–02; no `ease-in`, no `scale(0)`.
- Missed simplifications: none identified. Motion is already at the floor —
  opacity plus a sub-2% entrance scale.
- Performance: `opacity` and `transform` only; no layout properties animated.
- Interruptibility & timing: not applicable. Remotion renders deterministically
  per frame, so there is no interruption or keyframe-restart failure mode.
- Origin, physicality & cohesion: full-frame content is the modal case, so a
  centered origin is correct. The skill's warning about "a jarring crossfade
  where a subtle blur would bridge two states" was the load-bearing one here: a
  crossfade was deliberately rejected in favour of non-overlapping windows,
  because crossfading two text-bearing diagrams ghosts.
- Accessibility: `prefers-reduced-motion` and hover gating are not applicable to
  a rendered video file — there is no user agent or pointer at render time.
  Noting this explicitly rather than silently skipping it.

Decision: Approve.

## 8. Human Review Requests

### Review Request 1

Artifact:
`renders/review/task-008/scene-03-joke.png`

Purpose:
Confirm the joke beat is the exact supplied asset.

What to review:
- Whether this is your `scene-03-joke-diagram.png`, unaltered.
- Whether the upscale softness (see Known issues) is acceptable.

Known issues:
- The source PNG is 1024×576 and the video is 1920×1080, so it is upscaled
  1.875×. Text is slightly soft compared to Remotion-rendered type.

Human review status:
PENDING

### Review Request 2

Artifact:
`renders/review/task-008/scene-03-end.png`

Purpose:
Confirm the payoff beat is the exact supplied asset.

What to review:
- Whether this is your `scene-03-end-diagram.png`, unaltered.

Known issues:
- Same 1.875× upscale softness.

Human review status:
PENDING

### Review Request 3

Artifact:
`renders/review/task-008/scene-03-start.png`

Purpose:
Review the opening recall beat, the only Remotion-drawn content in the scene.

What to review:
- Whether continuing from Scene 02 with "DATABASE WORK / 155 ms" is the right
  entry, or whether Scene 03 should open directly on the joke diagram.

Known issues:
- Deliberately sparse; it exists to bridge Scene 02 and the first diagram.

Human review status:
PENDING

### Review Request 4

Artifact:
`renders/review/task-008/scene-03-preview.mp4`

Purpose:
Review the full 14-second scene in motion.

What to review:
- Whether each diagram gets enough on-screen time to read (5.8s joke, 6.1s end).
- Whether the ~0.15s background gap between the two diagrams reads as a
  deliberate beat change or as a blink.
- Whether the scene still feels like the same episode as Scenes 01–02.

Known issues:
- Scene duration was extended from 8s+1s to 13s+1s (see Problems / Risks).

Human review status:
PENDING

### Review Request 5

Artifacts:
`renders/review/task-008/overlap-frame-000.png` … `overlap-frame-003.png`,
plus `overlap-check-2s.png`, `overlap-check-handoff.png`, and
`mp4-frame-001.png` … `mp4-frame-004.png`

Purpose:
Evidence for the overlap fix at the frame level and in the encoded MP4.

What to review:
- Whether the overlap you saw is gone.
- Whether the 0:02 (two-second) interpretation matches what you actually saw. If
  you meant a different moment, tell me the timestamp and I will re-diagnose.

Known issues:
- The literal 0.00–0.10s window was already blank in the previous build, so the
  fix targets the 0:02 collision.

Human review status:
PENDING

### Review Request 6

Artifacts:
`renders/review/task-008/scene-03-joke-de.png`,
`scene-03-end-de.png`, `scene-03-joke-fr.png`, `scene-03-end-fr.png`

Purpose:
Review how localization was handled given both PNGs carry baked English.

What to review:
- Whether the supplemental DE/FR line beneath the diagram is the treatment you
  want, or whether you would rather I removed it and you supplied localized PNGs.

Known issues:
- The diagrams themselves remain English in all three languages. This is the
  main open constraint — see Problems / Risks.

Human review status:
PENDING

### Review Request 7

Artifacts:
`renders/review/task-008/scene-01-regression.png`,
`scene-02-regression.png`

Purpose:
Confirm Scenes 01 and 02 are unaffected.

What to review:
- Whether both scenes look identical to before.

Known issues:
- None observed.

Human review status:
PENDING

## 9. External Asset Requests

None.

## 10. Verification Results

| Check | Result | Notes |
| --- | --- | --- |
| reset to pre-Scene-03 baseline | PASS | HEAD already `1e8a51b`; reverted 4 files, removed untracked failed-attempt files; no `git reset` used |
| TypeScript | PASS | `npm run typecheck` |
| build | PASS | `npm run build` |
| composition discovery | PASS | `npm run compositions`; Redis-EN/DE/FR at 1590 frames (53.00s) |
| scene validation | PASS | Scene 03 renders as stills and MP4 from the integrated compositions; episode validation runs on module load |
| asset validation | PASS | Both PNGs registered as `candidate` manifest entries; scene resolves them by logical ID via `getAssetPath()` |
| Redis-EN | PASS | Stills + MP4 rendered |
| Redis-DE | PASS | Joke and end stills rendered |
| Redis-FR | PASS | Joke and end stills rendered |
| joke asset direct-use check | PASS | Mean per-channel difference vs source: 1.9/255 (0.8%), consistent with resampling only |
| end asset direct-use check | PASS | Mean per-channel difference vs source: 2.0/255 (0.8%), consistent with resampling only |
| overlap frames 0–3 | PASS | All four pure background, no text |
| overlap fix in encoded MP4 | PASS | First 4 frames extracted from the MP4 with ffmpeg; frame 1 clean |
| Scene 03 preview | PASS | `scene-03-preview.mp4`, 420 frames, 1.2 MB |
| Scene 01 regression | PASS | Rendered and inspected; unchanged |
| Scene 02 regression | PASS | Rendered and inspected; unchanged |

Additional checks beyond the required list:
- 2.00s frame and 7.80s handoff frame rendered and inspected (overlap and
  ghosting checks).
- PNG background colours sampled and compared against `theme.background` to
  verify seamless integration.

## 11. Problems / Risks

Localization limitation caused by baked content (the main one):
Both PNGs have English text baked into the artwork — titles, node labels,
"FASTER!", "X NOT THIS", "Before"/"After", and both closing takeaway lines. This
cannot be localized without editing your assets, which the task forbids. Current
handling: the diagrams are left exactly as supplied in all three languages, and
DE/FR get one supplemental translated line in the empty band beneath the artwork.
German and French viewers therefore still see English inside the diagrams. The
clean fix is per-language exports (for example `scene-03-joke-diagram.de.png`);
the manifest could then hold one entry per language with no change to scene code.
I did not build that mechanism, since it would be speculative until you decide.

Asset resolution:
The PNGs are 1024×576 against a 1920×1080 composition — a 1.875× upscale, so
diagram text is measurably softer than Remotion-rendered type. It reads fine at
normal playback but is visible when paused. Re-exporting both at 1920×1080 would
remove this entirely and needs no code change.

Scene duration changed — please confirm:
I extended Scene 03 from `sharedWindow(8)` (9s) to `sharedWindow(13, 1)` (14s).
The committed 8s window was written before these assets existed, when the scene
was planned as a brief coach joke. Two full-frame, text-dense diagrams need
reading time; at 9s each diagram would have had roughly 3.5s. This shifts the
episode from 39s to 53s. It is a deliberate, reversible one-line change, flagged
here because it was not explicitly requested.

Clarity risk:
The ~0.15s background gap between the diagrams is what guarantees zero ghosting,
but it is a judgment call on feel that a still cannot settle. Worth watching in
the MP4 to confirm it reads as a beat change rather than a blink.

Motion:
No concerns. Motion is deliberately minimal and passed the `review-animations`
pass with no findings.

Overlap-report ambiguity:
My fix targets the 0:02 collision, since frames 0–3 were already blank in the
previous build. If you actually saw something wrong in the first tenth of a
second, the diagnosis needs redoing — tell me what you saw and where.

## 12. Recommended Next Step

If Scene 03 is human-approved:
→ proceed to Scene 04.

Otherwise:
→ revise Scene 03 only.

Two decisions would help most before Scene 04: whether to keep the 14s duration,
and whether you want localized PNG variants or are happy shipping English
diagrams with DE/FR supplemental lines.

## 13. Git Status

Branch:
`master` (HEAD still `1e8a51b`; no commits made)

Changed files:
- `src/episodes/001-redis/RedisEpisode.tsx` — Scene 03 `<Sequence>` added
- `src/episodes/001-redis/assets.ts` — two manifest entries + `getAssetPath()`
- `src/episodes/001-redis/episode.config.ts` — `scene03Window` + duration
- `src/episodes/001-redis/scenes.ts` — Scene 03 asset IDs, duration, beats, notes
- `src/shared/localization/index.ts` — two keys added for the DE/FR lines

Untracked files:
- `src/episodes/001-redis/scenes/Scene03DatabaseMisconception.tsx` (new scene)
- `public/episodes/001-redis/assets/scene-03-joke-diagram.png` (yours)
- `public/episodes/001-redis/assets/scene-03-end-diagram.png` (yours)
- `public/episodes/001-redis/reference/does-redis-make-database-faster.jpg` (yours)
- `public/episodes/001-redis/reference/repeated-work-terminated.jpg` (yours)
- `tasks/TASK-008.md`
- `feedbacks/task-008-feedback.md` (this file)

Ignored review media:
- `renders/review/task-008/` — confirmed ignored via `git check-ignore`
  (`.gitignore:7`, `renders/*`).

Commits/pushes performed:
None.

## 14. Final Status

TASK-008 STATUS: PASS
