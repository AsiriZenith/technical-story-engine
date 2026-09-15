# TASK-014A — Spotlight Highlight Feasibility Review (No Implementation)

Review-only pass on `src/episodes/001-redis/scenes/Scene07AnalogyToArchitecture.tsx`,
scoped to Scene 07 as instructed. No files modified, no assets modified.
Stopping after this feasibility review per the task instructions.

Proposed concept restated: instead of `FocusBox` (a drawn rectangle outline +
glow sitting on top of the artwork), replace it with a spotlight built from
two copies of the same image — a dimmed full-frame base layer and an
undimmed top layer clipped to only the target region — so the "highlight" is
the artwork itself at normal brightness, with everything else dimmed around
it, and no drawn border/glow at all.

---

## 1. Does this fit the existing component structure?

Yes, and the existing structure is already shaped in a way that helps here.
`DiagramBeat` (line 98) already does the two things a spotlight needs:

- It owns a single transformed wrapper `<div>` (the `scale(${scale})` on
  line 121) and renders the `<Img>` plus `children` *inside* that same
  element (line 126–136). That's exactly the container a second `<Img>`
  layer needs to live in — if both image layers are siblings inside this
  same wrapper, they automatically share the identical scale transform with
  no extra wiring. This directly satisfies the task's "both image layers
  must share the exact same scale/pan transform" requirement for free.
- `FocusBox` is already passed in as `children` per-beat (lines 279–294,
  307–322), so the call sites already treat "what to highlight and when"
  as a prop-driven overlay concern, not something baked into `DiagramBeat`
  itself. A `SpotlightImage`-shaped child (or a `DiagramBeat` variant) can
  slot into the same position in the tree.

What does **not** fit cleanly as-is: `FocusBox` currently renders as an
absolutely-positioned sibling *next to* the `<Img>` (both are direct children
of the transformed wrapper, `Img` then `FocusBox` — lines 126–136). A
spotlight needs the *opposite* relationship — a second full-bleed `<Img>`
that itself gets clipped, not a small decorative box floating over the
image. So the component boundary moves: `DiagramBeat` currently renders one
`<Img>` and treats highlights as decoration on top of it; a spotlight
version needs `DiagramBeat` (or its replacement) to render **two** `<Img>`
elements using identical `objectFit`/sizing, with the highlight expressed as
a clip region on the second one rather than as a child element. This is a
moderate restructure of `DiagramBeat`, not a small addition next to it.

## 2. What changes would be required?

1. **Base (dimmed) layer.** Either `filter: brightness(x)` on the existing
   `<Img>`, or the existing `<Img>` plus a dark scrim overlay. A `filter`
   is simpler (one property, no extra element, no compositing edge cases)
   and is the more natural read of "render the full image slightly
   dimmed" — recommend `filter: brightness(0.55)` (or similar) over a scrim
   div unless a non-linear dim curve is wanted later.
2. **Top (spotlight) layer.** A second `<Img src=...>` with the exact same
   `style` (`display: block`, `height: 100%`, `width: 100%`,
   `objectFit: 'cover'`) as the base layer, positioned absolutely over it
   (`position: absolute`, `inset: 0`) inside the same transformed wrapper,
   with `clipPath: inset(top right bottom left [round radius])` (or
   `polygon(...)` if a non-rectangular shape is ever wanted) driven by the
   target-region props. Using the same `objectFit`/sizing keys as the base
   layer is what actually guarantees the two layers line up pixel-for-pixel
   — this needs to be enforced by sharing one style object between both
   `<Img>`s, not by eyeballing two copies in sync.
3. **Animated reveal.** `FocusBox` currently animates via `opacity`
   (0→1→0), which is trivial. A clip-path spotlight has two independent
   things that can animate: the clip region's opacity (fade the whole top
   layer in/out — cheap, and enough if the target rect itself is static
   per-beat, which it is today) or the clip region's geometry (animate the
   inset itself growing/shrinking — more expensive to reason about and not
   asked for here). Recommend keeping today's behavior: the clip rect is
   set once per highlight (static geometry) and only the top layer's
   `opacity` animates, exactly mirroring `FocusBox`'s current
   `windowOpacity`/`enterOpacity` usage. This keeps the existing beat-timing
   code (`redisCacheFocus`, `databaseLabelFocus`, `redisNodeFocus`,
   `databaseNodeFocus`) unchanged — only what those opacity values are
   applied *to* changes.
4. **`DiagramBeat` signature change.** `children` currently accepts
   arbitrary overlay nodes (line 103). For a spotlight, `DiagramBeat` (or
   its replacement) more naturally accepts a list of `{opacity, region}`
   spotlight descriptors and renders the dimmed/clipped layer pair itself,
   since it's the one component that knows the shared transform, the
   `asset.path`, and the shared `objectFit` sizing. Passing raw JSX
   `children` as today does not compose well with "the top layer must be
   the *same image*, styled identically to the base" — that constraint is
   much easier to guarantee if one component owns both `<Img>` tags.
5. **Multiple simultaneous/sequential spotlights per beat.** Both beats
   currently support more than one highlight per image (analogy beat has
   two focus targets, tech beat has two). A clip-path top layer can only
   show one contiguous region at a time (or a `polygon`/multi-rect
   `clip-path` with more complex path syntax for more than one region at
   once) — today's usage is sequential/non-overlapping (per the motion
   review's finding that only one is ever meant to be lit at once, see
   `feedbacks/scene-07-motion-design-review.md`), so a single top layer
   whose clip target changes between beats is sufficient. If a future
   scene ever needs two regions spotlighted *simultaneously*, `clip-path`
   supports multiple rects via `polygon()`/`path()`, so it's not a hard
   blocker — just not needed for Scene 07 as currently timed.

## 3. Normalized/percentage coordinates vs. fixed pixel coordinates

**Percentage (or normalized 0–1) coordinates are the better choice**, for
reasons specific to this pattern rather than as a general preference:

- Today's `FocusBox` coordinates (e.g. `left:935, top:245, width:375,
  height:90` at line 281–286) are fixed pixels against the known
  1920×1080 canvas, which works because `DiagramBeat`'s wrapper is
  exactly 1920×1080 and the box is a sibling absolutely positioned against
  that same box — canvas pixels and container pixels are identical.
- A `clip-path: inset(...)` on an `<Img>` using `objectFit: cover` is
  clipping in the **element's own box**, not the canvas. As long as the
  wrapper stays 1920×1080 (true today), fixed pixels and percentages
  produce identical results. The reason to prefer percentages anyway:
  - It removes a hidden dependency on the wrapper always being exactly
    1920×1080. If a `SpotlightImage` is reused in a context with a
    different canvas size (a different episode's resolution, a
    picture-in-picture insert, a thumbnail render), percentage-based
    `clip-path`/positioning keeps working with zero changes; fixed pixel
    props would silently misalign.
  - `objectFit: cover` already means the *rendered* image and the source
    PNG's pixels are not guaranteed to be a 1:1 mapping unless the source
    asset's aspect ratio exactly matches the container's (both scene
    beats' assets are confirmed 16:9-in-16:9 today, per the comment at
    line 83–86, so this holds now). Expressing target regions as
    percentages of the container is the more honest unit given the
    rendering path already goes through `objectFit: cover` — pixel values
    are implicitly "pixels of a 1920×1080 canvas that happens to equal the
    source image's own pixel grid right now," which is a coincidence of
    the current assets, not a guarantee `clip-path` gives you.
  - Worth flagging as a documented constraint either way (in code comments
    on the new component): the percentage-of-container mapping is only
    equal to percentage-of-source-image when the asset's aspect ratio
    matches the container's. If a future asset isn't exactly 16:9,
    `object-fit: cover` will crop it, and *both* pixel and percentage
    target coordinates would need to be defined against the container
    (post-crop) box, not the original PNG's own pixel grid — a
    `SpotlightImage` component should make that assumption explicit in a
    comment near its region props, the same way `DiagramBeat`'s existing
    comment at line 83–86 already documents the "both beats are exactly
    16:9" assumption for `FocusBox`.

Recommendation: define target regions as normalized `{x, y, width, height}`
in `0–1` (fractions of the container), convert to `%` strings at the
`clip-path`/position call site. This is slightly nicer than raw `%` strings
as prop types (easier to do math on, e.g. computing an inset's four edges
from an x/y/width/height rect) while rendering to the same CSS.

## 4. Should this become a reusable `SpotlightImage` component?

Yes. The two current call sites (`scene07AnalogyMapping`,
`scene07TechnicalArchitecture`, lines 272–296 and 300–324) already show the
pattern is used at least twice within this one scene, and `DiagramBeat`'s
own doc comment (line 90–97) explicitly frames itself as a
transform-tracking fix that's already been needed identically in Scene 06
(TASK-013A) — i.e., this exact "image + timed region highlight, sharing one
transform" shape has already been duplicated across scenes once. A
`SpotlightImage` component that owns: the shared transformed wrapper, the
dimmed base `<Img>`, the clipped top `<Img>`, and a small
`{region, opacity}[]` prop for one-or-more timed spotlights would let Scene
06 and any future scene adopt the same pattern instead of hand-rolling
`FocusBox` siblings again. Suggested boundary:

- `SpotlightImage` owns: asset resolution, both `<Img>` layers, the dim
  filter, the clip-path math from normalized region → CSS, and the outer
  scale/pan transform wrapper (subsuming what `DiagramBeat` does today).
- The scene owns: beat timing (`windowOpacity`/`enterOpacity` calls) and
  passes the resulting opacity + normalized region per spotlight as props,
  exactly as it computes `redisNodeFocus`/`databaseNodeFocus` etc. today.

This is a clean split because timing math is scene-specific (baked to this
episode's narration beats) while "how do I draw a spotlight that tracks a
zooming image" is not.

## 5. Technical risks in Remotion

- **Doubled `<Img>` load/decode cost.** Two `<Img>` tags pointing at the
  same `src` means two image decodes per frame render (Remotion's `<Img>`
  wraps `delayRender`/`continueRender` around load). Browsers dedupe the
  network fetch via cache, but decode/paint is still doubled per frame.
  For a still PNG at 1920×1080 this is unlikely to be a real bottleneck,
  but it's worth a render-time sanity check (compare render duration for
  this scene before/after) rather than assuming it's free, especially
  since Scene 07 already renders two large diagram PNGs across its beats.
  An alternative that avoids the second `<Img>`/decode entirely: use one
  `<Img>` for the dimmed base and a `background-image` `<div>` (same URL)
  for the clipped top layer — background-image painting doesn't carry
  Remotion's `delayRender` semantics the same way, so this needs care to
  ensure the top layer doesn't pop in before the image is actually loaded
  (the base `<Img>`'s own load-gating would still hold up the frame, so in
  practice this is probably safe, but it's a subtlety worth testing rather
  than assuming).
- **`clip-path` + `filter` compositing.** Chromium (Remotion's render
  target) supports both `clip-path: inset(... round Npx)` and `filter:
  brightness()` well, including animated opacity on a clipped element —
  low risk. The one thing to verify empirically: clip-path edges are hard
  by default (no feathering). If the desired look wants a *soft*-edged
  spotlight rather than a hard rectangular cutout, that needs an additional
  `mask-image` radial/linear gradient rather than plain `clip-path`, which
  is a materially different (and slightly trickier) CSS mechanism — worth
  deciding up front since it changes the implementation shape, not just a
  parameter.
- **Two layers must stay pixel-identical or the seam shows.** Any
  divergence between the base and top `<Img>` — different `objectFit`,
  different `width`/`height`, one wrapped in an extra `div` the other
  isn't — will show as a visible misalignment right at the clip edge
  (the classic "ghosting" artifact of two stacked images that don't quite
  line up). This is a correctness risk more than a Remotion-specific one,
  but it's the main new failure mode this approach introduces that
  `FocusBox` never had (a rectangle overlay can't visibly "misalign" with
  the image the way two images-of-images can). Sharing one style object
  between both `<Img>` tags (as noted in §2) is the concrete mitigation.
- **Static frame rendering, not video, so no motion-artifact risk.**
  Remotion renders discrete frames rather than a live compositor, so
  there's no risk of e.g. clip-path animation stutter or filter
  recompute lag across frames the way there might be in a live browser —
  each frame is computed fresh and deterministically, which actually makes
  this approach *lower*-risk in Remotion than it would be as a live CSS
  transition in a normal web page.
- **Interaction with the existing scale/pan transform.** As long as both
  `<Img>` layers live inside `DiagramBeat`'s existing transformed wrapper
  (per §1), the scale transform applies uniformly to both and this is a
  non-issue — this is explicitly *not* a new risk, since it's the exact
  problem `DiagramBeat`'s own doc comment (lines 90–97) already solved once
  for `FocusBox`, and the fix generalizes directly to a second `<Img>`
  layer. The risk would only reappear if the two image layers were ever
  rendered in separate wrapper elements instead of siblings inside one.

---

## Summary

- Fits the existing structure with a moderate restructure of `DiagramBeat`
  (from "one image + decorative children" to "two synchronized image
  layers"), not a drop-in addition.
- Core changes: dimmed base layer (`filter: brightness()`), a second
  identically-styled `<Img>` clipped via `clip-path: inset(... round)`,
  reusing today's opacity-driven beat timing unchanged.
- Normalized (0–1) region coordinates are the better choice over fixed
  pixels, converted to `%`/`clip-path` at render time, with the
  container-vs-source-aspect-ratio assumption documented explicitly.
- A reusable `SpotlightImage` component is worth extracting — this exact
  "image + timed highlight sharing one transform" shape has already been
  duplicated once (Scene 06 / TASK-013A), so a third occurrence is a
  reasonable bet.
- Main technical risks are non-blocking but worth deliberately deciding
  rather than discovering mid-implementation: doubled image decode cost
  (likely negligible, worth a quick render-time check), hard vs. soft clip
  edges (a real design decision, not just an implementation detail), and
  keeping both image layers pixel-identical in styling to avoid a visible
  seam at the clip boundary.

**Not implemented.** No files or assets modified. Stopping here per your
instruction.
