# TASK-028

## Why

All 14 scenes are visually approved. Before recording/generating narration,
the script needs to be written and locked, and the `~8ms`/`~10ms`
inconsistency (`decisions.md` item 1) needs to be resolved first, since
narration will state exact numbers out loud. Decision: standardize on
**~10ms** everywhere (matches the existing, already-approved architecture
image used in Scenes 07–10 — no image regeneration needed).

## Step 1 — Fix the 8ms → 10ms inconsistency

Search the codebase (scene components, `scenes.ts`, localization files,
storyboard files, `docs/`) for any occurrence of the episode's cache-hit
latency example stated as `~8 ms` / `8ms` and change it to `~10 ms` / `10ms`.
This is specifically about the **cache-hit example number** (the "before/
after Redis" comparison) — do not touch unrelated numbers like Scene 02's
latency breakdown (`network / DB connection ~8 ms`), which is a different
value describing a different thing.

Update `decisions.md` item 1 to mark this resolved, noting the decision
(standardized on 10ms, no image change needed since the existing asset
already used that value).

Re-render Scene 01's affected still to confirm the text change looks correct
(font size/wrapping unaffected by the digit-count change from "8" to "10").
This one still can go in `renders/review/TASK-028/` per the established
convention, since it's a small human-checkable visual confirmation, not just
an agent-only verification.

## Step 2 — Write the full narration script

Create `src/episodes/001-redis/narration/script.md` with one section per
scene (01 through 14), written for **spoken delivery** — natural sentence
flow, not caption-style bullet fragments. Base each scene's narration on
that scene's `storyboard/scenes/scene-NN-*.md` Narrative Beat, and keep the
episode's core thesis intact throughout: the deliberate avoidance of "Redis
is fast because RAM is fast" in favor of "what work did Redis let us stop
doing?" Use the corrected `~10ms` figure wherever the cache-hit example is
referenced.

Format each scene's section as:

```markdown
## Scene NN — <Title>
<narration text, written as continuous spoken prose>

*(Est. duration: match or note against the scene's current visual timing)*
```

Flag in the file if any scene's narration doesn't comfortably fit its
current visual duration (per TASK-025e/026's note that scene timing isn't
locked until narration exists) — don't silently force-fit awkward pacing.

## Step 3 — Prepare a voice-tool test snippet

Since evaluating ElevenLabs/Descript/Play.ht requires the user to actually
test each service (not something achievable from this task), extract one
representative ~20-30s excerpt — recommend Scene 01's narration, since it's
short, sets the tone, and includes the corrected 10ms figure — into:

```
src/episodes/001-redis/narration/voice-test-snippet.md
```

Just the plain text, ready to paste into each tool.

## Step 4 — Prepare a voice-tool comparison rubric

Create `src/episodes/001-redis/narration/voice-tool-comparison.md` with an
empty comparison table for the user to fill in after testing the snippet
across ElevenLabs, Descript, and Play.ht:

```markdown
| Criteria | ElevenLabs | Descript | Play.ht |
|---|---|---|---|
| Naturalness (1-5) | | | |
| Handles technical terms (Redis, API, DB) well? | | | |
| Cost at ~211s/episode | | | |
| Has an API (for future automation)? | | | |
| Notes | | | |
```

## Step 5 — Update storyboard

Update `storyboard/README.md` to note the narration script is drafted and
awaiting: (a) the user's read-through/edit approval of the script text
itself, and (b) the user's voice-tool selection from their own testing.
Neither is done yet — this task only prepares the materials for both.

## Step 6 — Write feedback

Write to:

```
D:\my works\video-lab\technical-story-engine\feedbacks\TASK-028.md
```

Include: confirmation of the 8ms→10ms fix and where it was found/changed,
the full narration script content (or a summary if very long — your
judgment), any scenes flagged for a timing mismatch, and clear next-step
instructions for the user (test the snippet in the three tools, fill in the
rubric, read through the full script for edits).

No full-episode render is needed for this task — only the Scene 01
still from Step 1.
