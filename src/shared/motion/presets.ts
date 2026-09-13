export const motionPresets = {
  enterSoft: {durationSeconds: 0.7, offsetPixels: 42},
  enterFast: {durationSeconds: 0.32, offsetPixels: 24},
  exitSoft: {durationSeconds: 0.45, offsetPixels: 24},
  emphasizeScale: {durationSeconds: 0.5, peakScale: 1.08},
  moveLinear: {startSeconds: 0.4, durationSeconds: 3.8},
  staggerSmall: {delaySeconds: 0.12},
  counterValue: {startSeconds: 1, durationSeconds: 1.5},
} as const;

export type MotionPresetName = keyof typeof motionPresets;
