# Scene 03 — The Misconception

## Purpose
Challenge and reject the idea that Redis directly makes the original database query faster.

## Narrative Beat
Database work: ~155 ms. "Did Redis make the database 20x faster?" — "NOT THIS." "The repeated work changed." "The database didn't become faster. We stopped repeating some of the work."

## Status
Implemented, human approved.

## Visual Approach
Both beats are user-supplied PNG assets (`scene03JokeDiagram`, `scene03EndDiagram`) rendered exactly as supplied. Their visible windows must not overlap, since both carry baked English labels; localized copy is added around them rather than over them.

## Assets Used
`scene03JokeDiagram`, `scene03EndDiagram` (both `approved`, human-approved 2026-09-14).

## Known Issues
None beyond the general baked-English-label localization limitation shared by several user-supplied diagrams (see `decisions.md`).

## Review Notes
Important production lesson: early attempts at this scene failed because the coding agent kept recreating/reinterpreting visual references. This directly caused the project to adopt the permanent manual asset workflow (`docs/manual-asset-workflow.md`) for precision-critical visuals — do not redraw or reinterpret these assets.
