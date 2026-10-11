import {createSceneTimeline, type SceneWindow, type TimedScene} from './scene-timing';

// One entry per scene, derived (not authored) from the single continuous
// narration file by `scripts/derive-scene-boundaries.mjs`. Entries tile the file:
// each scene's `endSeconds` is the next scene's `startSeconds`, so the pause between
// scenes belongs to the scene it precedes. Regenerate whenever the audio is re-exported.
export type SceneBoundary = {
  sceneId: string;
  startSeconds: number;
  endSeconds: number;
};

export type NarratedScene = TimedScene;

export const getNarrationSeconds = (boundary: SceneBoundary): number =>
  boundary.endSeconds - boundary.startSeconds;

export const getBoundaryFor = (
  boundaries: readonly SceneBoundary[],
  sceneId: string,
): SceneBoundary => {
  const boundary = boundaries.find((entry) => entry.sceneId === sceneId);
  if (!boundary) {
    throw new Error(`No narration boundary for scene ${sceneId}; regenerate scene-boundaries.json.`);
  }
  return boundary;
};

// Real narration duration per scene, in seconds.
export const getSceneNarrationDurations = (
  scenes: readonly NarratedScene[],
  boundaries: readonly SceneBoundary[],
): Record<string, number> =>
  Object.fromEntries(
    scenes.map((scene) => [scene.id, getNarrationSeconds(getBoundaryFor(boundaries, scene.id))]),
  );

export const assertBoundariesTile = (
  scenes: readonly NarratedScene[],
  boundaries: readonly SceneBoundary[],
): void => {
  let cursor = 0;
  for (const scene of scenes) {
    const boundary = getBoundaryFor(boundaries, scene.id);
    if (Math.abs(boundary.startSeconds - cursor) > 0.005 || boundary.endSeconds <= boundary.startSeconds) {
      throw new Error(`Narration boundaries are not contiguous at scene ${scene.id}.`);
    }
    cursor = boundary.endSeconds;
  }
};

// Audio-driven scene timeline. Per scene:
//   'extend'    -> narration + localization margin
//   'longer-of' -> max(visual targetSeconds, narration + localization margin)
// The narration clip for a scene always starts at the scene's first frame, so visuals and
// audio can never drift across scenes regardless of how windows grow.
export const createAudioDrivenTimeline = <Scene extends NarratedScene>(
  scenes: readonly Scene[],
  boundaries: readonly SceneBoundary[],
  fps: number,
): readonly SceneWindow<Scene['id']>[] => {
  assertBoundariesTile(scenes, boundaries);

  return createSceneTimeline(
    scenes.map((scene) => {
      const {targetSeconds, localizationMarginSeconds, narrationFit} = scene.durationStrategy;
      const narrationPlusMargin =
        getNarrationSeconds(getBoundaryFor(boundaries, scene.id)) + localizationMarginSeconds;
      const resolvedSeconds =
        narrationFit === 'extend' ? narrationPlusMargin : Math.max(targetSeconds, narrationPlusMargin);

      return {
        ...scene,
        durationStrategy: {
          kind: 'shared-window' as const,
          targetSeconds: resolvedSeconds,
          localizationMarginSeconds: 0,
        },
      };
    }),
    fps,
  );
};

export type NarrationClip = {
  trimBeforeFrames: number;
  trimAfterFrames: number;
};

// Frame range of the shared narration file that belongs to one scene.
export const getNarrationClip = (boundary: SceneBoundary, fps: number): NarrationClip => ({
  trimBeforeFrames: Math.round(boundary.startSeconds * fps),
  trimAfterFrames: Math.round(boundary.endSeconds * fps),
});
