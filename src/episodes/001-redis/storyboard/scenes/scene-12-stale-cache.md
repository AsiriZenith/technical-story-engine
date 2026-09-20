# Scene 12 — Stale Cache

## Purpose
Demonstrate that a fast answer can still be wrong.

## Narrative Beat
"What does 'stale data' actually mean?" Database: `alice.new@example.com` (current value changes). Redis: `alice.old@example.com` (cached copy stays old). The application reads Redis and returns that answer fast. "Wrong answer. Very fast." Closing: "Caching reuses old work. That's also how it can become stale."

## Status
Implemented, PASS.

## Visual Approach
Fully Remotion-native, typography-driven scene — no image asset, no `SpotlightImage`. Continues Scene 11's visual language with a second concrete use case: a two-card Database-vs-Redis value comparison, both cards held on screen together so the divergence is simultaneous, not just narrated. The Alice email example (`alice.new@example.com` / `alice.old@example.com`) is used unchanged and values are not translated. The only humorous beat ("Wrong answer. Very fast.") is purely typographic, calm and wry, not a large comedic spectacle.

## Assets Used
None (`assetIds: []` in `scenes.ts`). The formerly-listed `alicePortrait` placeholder asset is intentionally not used.

## Known Issues
None.

## Review Notes
Email values are intentionally not localized/translated across `en`/`de`/`fr` — keep them literal identifiers, not translatable content.
