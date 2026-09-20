# Scene 04 — Original Request Path

## Purpose
Show that repeated requests repeat the same expensive database work, before Redis is introduced.

## Narrative Beat
`Client -> API -> Database -> expensive work -> Response`. "USER 42" repeated three times. "Database: Alice. Again."

## Status
Implemented, human approved.

## Visual Approach
Final visual approach uses `SpotlightImage` on the exact user-supplied Scene 04 JPG (`scene04OriginalRequestPath`) as the dominant visual, rather than rectangular highlight boxes. Do not redraw, reinterpret, or substitute the asset.

## Assets Used
`scene04OriginalRequestPath` (`approved`, human-approved 2026-09-14).

## Known Issues
The diagram carries baked English labels, so localization remains a documented asset limitation. Also see the `SpotlightImage` radial-gradient mask-math issue in `decisions.md` — this scene is one of the ones tuned around current `SpotlightImage` behavior; do not fix that globally without regression-checking this scene.

## Review Notes
`SpotlightImage` technical debt (radius/diameter mismatch in the radial gradient) was first discovered here. Do not globally fix it during normal scene work — multiple approved scenes are already tuned around the current behavior.
