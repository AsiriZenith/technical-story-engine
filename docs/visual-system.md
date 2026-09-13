# Provisional Visual System

This system is a reusable pre-production baseline, not final channel branding.

## Typography

The 1920x1080 roles in `src/shared/styles/visual-system.ts` are: `display` for hero numbers, `sceneTitle`, `sectionHeading`, `body`, `technicalLabel`, `code`, `status`, `caption`, and `disclaimer`. The scale favors immediate hierarchy and YouTube readability. `DEV-Typography` stress-tests one shared layout with short, medium, and long EN/DE/FR copy; do not create language-specific visual systems.

## Layout

- Keep key content at least 120 px from horizontal edges and 90 px from vertical edges.
- Reserve roughly 220 px for a safe title area before dense diagrams.
- Keep explanatory copy at or below 1040 px wide.
- Use a 58 px default gap between architecture nodes and 48 px diagram gutters.
- Place captions/disclaimers at least 64 px above the bottom edge.
- Reduce copy before shrinking primary text below its role size. Wrap labels only when their semantic unit remains obvious.

## Architecture semantics

Client, Application, Cache, and Database nodes combine icon, role label, border/shape treatment, and color. Color is an accent, not the sole identifier. Their roles are request origin, routing logic, fast lookup, and source of truth. Keep arrows and gutters quiet so the active request path remains the focal point.

## Motion vocabulary

`src/shared/motion/presets.ts` defines a deliberately small deterministic vocabulary:

- `enterSoft`: readable default entrance.
- `enterFast`: quick supporting-element entrance.
- `exitSoft`: restrained exit near a scene boundary.
- `emphasizeScale`: one brief, low-amplitude emphasis.
- `moveLinear`: request/data movement along a path.
- `staggerSmall`: compact sequencing delay.
- `counterValue`: controlled numeric change.

All timings are local to the composition or scene and scale through FPS. Avoid random motion and repeated bounce. Motion must reveal order, state, or causality.

## Asset resolution and review

Consumers call `resolveAsset(logicalId, optionalCandidateId)` and never name a provider. A manifest entry may hold multiple variants and one selected candidate. The resolver returns logical ID, candidate identity, status, type, path, optional dimensions/aspect ratio, and selection state.

`placeholder` is temporary, `candidate` is ready for human review, and `approved` requires explicit user approval metadata. Use `DEV-AssetPreview` to compare variants before selection. Follow the Human Media Review Gate in `docs/agent-workflow.md` for every user-facing media output.
