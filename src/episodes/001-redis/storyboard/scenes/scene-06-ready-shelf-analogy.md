# Scene 06 — Ready Order / Cache

## Purpose
Teach the caching concept with a ready-order shelf before returning to the technical architecture.

## Narrative Beat
Ready shelf: a burger is already prepared and waiting. Customer orders -> cashier checks the ready shelf -> already there -> served immediately. "The chef didn't cook at all."

## Status
Implemented, human approved.

## Visual Approach
Both beats are user-supplied PNG assets (`scene06ReadyShelf`, `scene06ServeFromShelf`) rendered exactly as supplied; their visible windows do not overlap since both carry a baked "Ready shelf" label. The "The chef didn't cook at all." takeaway is supplemental Remotion text, localized, never baked into the artwork.

## Assets Used
`scene06ReadyShelf`, `scene06ServeFromShelf` (both `approved`, human-approved 2026-09-14).

## Known Issues
None beyond the shared baked-English-label localization limitation.

## Review Notes
This is the restaurant version of a cache hit: the chef stays visibly calm and idle, never cooking for this request. Keep that visual contrast intact in any future revision.
