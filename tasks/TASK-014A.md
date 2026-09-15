Review Scene 07 only.

Do not modify any files.

I want to replace the current FocusBox rectangle highlighting with a reusable spotlight approach.

Concept:
- render the full image slightly dimmed;
- render the same image again above it;
- clip/mask the top image to only the target region;
- keep that target region at normal brightness;
- no extra border around the target;
- no glow rectangle;
- both image layers must share the exact same scale/pan transform.

Inspect the current Scene07AnalogyToArchitecture.tsx and tell me:

1. whether this approach fits the existing component structure;
2. what changes would be required;
3. whether normalized/percentage target coordinates would be better than fixed pixel coordinates;
4. whether we should create a reusable component such as SpotlightImage;
5. any technical risks in Remotion.

Do not implement.
Do not modify assets.
Stop after the feasibility review.

Create a feedback once you analyze inside the feedback folder (D:\my works\video-lab\technical-story-engine\feedbacks)