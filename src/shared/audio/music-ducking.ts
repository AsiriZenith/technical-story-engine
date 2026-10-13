import {interpolate} from 'remotion';

// Background-music volume envelope: one overall fade-in/fade-out, plus ducking while a scene's
// narration clip is playing. Pure functions of the absolute episode frame so the envelope can be
// spot-checked without rendering.
export type DuckingConfig = {
  restVolume: number; // narration gap (scene tail / transition)
  duckedVolume: number; // narration playing
  attackFrames: number; // ramp down, finishing exactly when narration starts
  releaseFrames: number; // ramp up, starting exactly when narration ends
  fadeInFrames: number;
  fadeOutFrames: number;
};

export type NarrationSpan = {
  startFrame: number; // absolute episode frame where a scene's narration starts
  endFrame: number; // absolute episode frame where it ends
};

export const defaultDuckingConfig: DuckingConfig = {
  restVolume: 0.06,
  duckedVolume: 0.02,
  attackFrames: 9,
  releaseFrames: 24,
  fadeInFrames: 60,
  fadeOutFrames: 90,
};

type Keyframes = {inputRange: number[]; outputRange: number[]};

// Builds strictly increasing keyframes for interpolate(). When the gap between two narration
// spans is too short to hold release + attack, the rest point is skipped and music stays ducked.
export const buildDuckingKeyframes = (
  spans: readonly NarrationSpan[],
  config: DuckingConfig,
): Keyframes => {
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  const push = (frame: number, volume: number) => {
    inputRange.push(frame);
    outputRange.push(volume);
  };
  const lastFrame = () => inputRange[inputRange.length - 1] ?? -Infinity;

  spans.forEach((span, i) => {
    const attackStart = span.startFrame - config.attackFrames;
    if (attackStart > lastFrame()) push(attackStart, config.restVolume);
    push(span.startFrame, config.duckedVolume);
    push(span.endFrame, config.duckedVolume);

    const nextAttackStart = spans[i + 1]
      ? spans[i + 1].startFrame - config.attackFrames
      : Infinity;
    const releaseEnd = span.endFrame + config.releaseFrames;
    if (releaseEnd < nextAttackStart) push(releaseEnd, config.restVolume);
  });
  return {inputRange, outputRange};
};

export const getMusicVolume = (
  frame: number,
  totalFrames: number,
  keyframes: Keyframes,
  config: DuckingConfig,
): number => {
  const ducking = interpolate(frame, keyframes.inputRange, keyframes.outputRange, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const envelope = interpolate(
    frame,
    [0, config.fadeInFrames, totalFrames - config.fadeOutFrames, totalFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return ducking * envelope;
};
