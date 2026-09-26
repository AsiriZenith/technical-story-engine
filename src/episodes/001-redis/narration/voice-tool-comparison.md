# Voice Tool Comparison — Episode 001-redis

Test `voice-test-snippet.md` (Scene 01's narration, ~20s read) in each tool
below, then fill in this table. This is a planning aid for the user's own
manual evaluation — no tool has been tested by the agent.

| Criteria | ElevenLabs | Descript | Play.ht |
|---|---|---|---|
| Naturalness (1-5) | | | |
| Handles technical terms (Redis, API, DB) well? | | | |
| Cost at ~211s/episode | | | |
| Has an API (for future automation)? | | | |
| Notes | | | |

## How to use this

1. Paste the text from `voice-test-snippet.md` into each of ElevenLabs, Descript, and Play.ht.
2. Generate the audio and listen for: does it pronounce "Redis," "API," and "GET slash users slash 42" naturally, or does it stumble?
3. Fill in a 1–5 naturalness score and any other observations per column.
4. Check each service's current pricing against the episode's ~211-second runtime (all 14 scenes) to estimate a per-episode cost.
5. Note whether each service offers an API — relevant if this episode's narration pipeline is automated for future episodes rather than generated one-off through a web UI.
6. Once filled in, the chosen tool becomes the voice for the full script in `script.md`.
