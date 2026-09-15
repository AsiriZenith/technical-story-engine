Implement a small spotlight prototype for Scene 07 only.

Do not convert the whole scene yet.

Create a reusable SpotlightImage component using the feasibility-review design:

- one dimmed base image;
- one identical image layer above it;
- normalized 0–1 target-region coordinates;
- both image layers inside the exact same transformed wrapper;
- no FocusBox;
- no border;
- no glow rectangle;
- no source-image modification.

For this prototype, use only ONE target:

Scene 07 analogy image → Redis / Cache.

Use the existing Redis/Cache target area as the starting reference, but convert it to normalized coordinates.

Prefer a subtle spotlight:
- outside area slightly dimmed;
- Redis/Cache region remains at normal brightness;
- avoid a harsh obvious rectangular edge if reasonably possible.

Do not implement Database yet.
Do not modify the technical-architecture beat yet.

Render:
- one clean frame before spotlight;
- one frame at peak Redis spotlight;
- one frame near the end of spotlight;
- a short preview MP4 covering this beat.

Stop after this prototype and report what was changed.

Create a feedback once you analyze inside the feedback folder (D:\my works\video-lab\technical-story-engine\feedbacks)