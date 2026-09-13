export type SceneDurationStrategy = {
  kind: 'shared-window';
  targetSeconds: number;
  localizationMarginSeconds: number;
};

export type TimedScene = {
  id: string;
  order: number;
  durationStrategy: SceneDurationStrategy;
};

export type SceneWindow<SceneId extends string = string> = {
  sceneId: SceneId;
  start: number;
  duration: number;
  endExclusive: number;
};

export type SceneFrameState<SceneId extends string = string> =
  SceneWindow<SceneId> & {
    localFrame: number;
    progress: number;
  };

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(Math.max(value, minimum), maximum);

export const createSceneTimeline = <Scene extends TimedScene>(
  scenes: readonly Scene[],
  fps: number,
): readonly SceneWindow<Scene['id']>[] => {
  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error('Scene timeline FPS must be a positive number.');
  }

  let nextStart = 0;

  return scenes.map((scene) => {
    const duration = Math.round(
      (scene.durationStrategy.targetSeconds +
        scene.durationStrategy.localizationMarginSeconds) *
        fps,
    );

    if (duration <= 0) {
      throw new Error(`Scene ${scene.id} must have a positive duration.`);
    }

    const window: SceneWindow<Scene['id']> = {
      sceneId: scene.id,
      start: nextStart,
      duration,
      endExclusive: nextStart + duration,
    };

    nextStart = window.endExclusive;
    return window;
  });
};

export const getSceneProgress = (
  localFrame: number,
  durationInFrames: number,
): number => {
  if (durationInFrames <= 1) {
    return localFrame >= 0 ? 1 : 0;
  }

  return clamp(localFrame / (durationInFrames - 1), 0, 1);
};

export const getSceneFrameState = <SceneId extends string>(
  globalFrame: number,
  window: SceneWindow<SceneId>,
): SceneFrameState<SceneId> => {
  const localFrame = globalFrame - window.start;

  return {
    ...window,
    localFrame,
    progress: getSceneProgress(localFrame, window.duration),
  };
};
