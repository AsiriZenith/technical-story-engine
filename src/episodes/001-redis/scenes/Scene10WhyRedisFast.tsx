import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {SpotlightImage, type SpotlightRegion} from '../../../shared/components/SpotlightImage';
import {theme} from '../../../shared/styles/theme';
import {layout} from '../../../shared/styles/visual-system';
import {resolveAsset} from '../asset-resolver';

export type Scene10WhyRedisFastProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds, per the TASK-017/018-approved beat plan. Unlike
// Scenes 07/08/09's node-to-node handoffs, this scene holds ONE spotlight
// target (Redis) across three explanatory beats, then releases it entirely
// for the payoff beat instead of handing off to a second target -- see
// `redisSpotlightWindow` below. Beat 0 (bridge) and Beat 5 (closing) carry
// no spotlight, matching Scenes 08/09's own no-spotlight open/close shape.
const beats = {
  bridgeIn: 0.4,
  bridgeOut: 2.0,
  preparedResultIn: 2.4,
  preparedResultOut: 5.0,
  simpleLookupIn: 5.4,
  simpleLookupOut: 7.8,
  inMemoryIn: 8.2,
  inMemoryOut: 10.4,
  workAvoidedIn: 10.8,
  workAvoidedOut: 13.6,
  modernDbIn: 13.9,
  modernDbOut: 14.3,
  closingIn: 14.5,
} as const;

// The single continuous Redis spotlight window: fades in at the start of
// "prepared result" and fades out at the end of "in-memory" -- i.e. exactly
// spanning the three beats it stays held across -- then stays released
// (opacity 0) through the "work avoided" and closing beats. This is a single
// window, not a sequence of handoff segments, because Redis is the only
// spotlight target this scene ever uses.
const redisSpotlightWindow = {
  start: beats.preparedResultIn,
  end: beats.inMemoryOut,
  fadeIn: 0.4,
  fadeOut: 0.4,
} as const;

// Caption windows are independent of the spotlight window but stay close to
// it so text and highlight never desync (same relationship Scenes 08/09
// use). The closing beat's budget is tight (scene ends at 15.0s and "work
// avoided" runs until 13.6s), so `whyFastClosing` uses a concise equivalent
// of the task's full closing line rather than the longer original -- see
// Section 9/10 of the feedback report for the exact wording decision. The
// closing caption's `end` lands exactly at the scene's own duration boundary
// (15.0s) so it never visibly fades before the hard Sequence cut, the same
// technique Scene 08/09 use for their own closing captions.
const captionWindows = {
  bridge: {start: beats.bridgeIn, end: beats.bridgeOut, fadeIn: 0.5, fadeOut: 0.4},
  preparedResult: {start: beats.preparedResultIn, end: beats.preparedResultOut, fadeIn: 0.4, fadeOut: 0.35},
  simpleLookup: {start: beats.simpleLookupIn, end: beats.simpleLookupOut, fadeIn: 0.35, fadeOut: 0.35},
  inMemory: {start: beats.inMemoryIn, end: beats.inMemoryOut, fadeIn: 0.35, fadeOut: 0.35},
  workAvoided: {start: beats.workAvoidedIn, end: beats.workAvoidedOut, fadeIn: 0.35, fadeOut: 0.35},
  modernDbMemory: {start: beats.modernDbIn, end: beats.modernDbOut, fadeIn: 0.3, fadeOut: 0.3},
  closing: {start: beats.closingIn, end: 15.0, fadeIn: 0.3, fadeOut: 0.4},
} as const;

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const windowOpacity = (
  seconds: number,
  start: number,
  end: number,
  fadeIn: number = motionPresets.enterSoft.durationSeconds,
  fadeOut: number = motionPresets.exitSoft.durationSeconds,
): number =>
  interpolate(seconds, [start, start + fadeIn, end, end + fadeOut], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

// Shared push-in so the image layer uses the exact same curve as Scenes
// 07/08/09's `computePushInScale`.
const computePushInScale = (seconds: number, start: number, end: number): number =>
  interpolate(seconds, [start, end], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

// Normalized (0-1) Redis spotlight target region against the technical-
// architecture PNG's own box, reused byte-for-byte from Scenes 07/08/09
// (TASK-014C-approved, carried forward unchanged through TASK-015/016).
// This is the ONLY spotlight region this scene uses -- Application, Client,
// and Database regions are intentionally not imported here; see the
// feedback report Section 6/8 for why Database stays unspotlighted even
// during the "work avoided" beat.
const redisSpotlightRegion: SpotlightRegion = {
  height: 225 / 1080,
  width: 365 / 1920,
  x: 1225 / 1920,
  y: 130 / 1080,
};

// Carried over unchanged from Scene 08/09's approved local tuning, per the
// task's explicit instruction to reuse it directly. This is a local Scene 10
// tuning only; SpotlightImage's shared default and Scene 07/08/09's approved
// values are untouched, and the known radial-gradient radius/diameter
// technical debt (documented since Scene 08) is carried forward, not fixed.
const spotlightTuning = {
  dimBrightness: 0.58,
  featherPaddingFactor: 0.9,
} as const;

const BottomCaption: React.FC<{opacity: number; text: string}> = ({opacity, text}) => (
  <AbsoluteFill style={{opacity, pointerEvents: 'none'}}>
    <div
      style={{
        background: 'linear-gradient(rgba(8,17,31,0) 0%, rgba(8,17,31,0.82) 62%)',
        bottom: 0,
        height: 220,
        left: 0,
        position: 'absolute',
        width: 1920,
      }}
    />
    <div
      style={{
        bottom: layout.captionBottom,
        color: theme.foreground,
        fontSize: 40,
        fontWeight: 700,
        left: 0,
        lineHeight: 1.3,
        padding: `0 ${layout.safeHorizontal}px`,
        position: 'absolute',
        textAlign: 'center',
        textShadow: '0 2px 18px rgba(0,0,0,0.65)',
        width: 1920,
      }}
    >
      {text}
    </div>
  </AbsoluteFill>
);

export const Scene10WhyRedisFast: React.FC<Scene10WhyRedisFastProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  const asset = resolveAsset('scene07TechnicalArchitecture');
  if (!asset.path) {
    throw new Error('Asset scene07TechnicalArchitecture has no file selected yet.');
  }

  const imageScale = computePushInScale(seconds, beats.bridgeIn, captionWindows.closing.end);

  const redisOpacity = windowOpacity(
    seconds,
    redisSpotlightWindow.start,
    redisSpotlightWindow.end,
    redisSpotlightWindow.fadeIn,
    redisSpotlightWindow.fadeOut,
  );

  const captionOpacity = (window: (typeof captionWindows)[keyof typeof captionWindows]): number =>
    windowOpacity(seconds, window.start, window.end, window.fadeIn, window.fadeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        overflow: 'hidden',
      }}
    >
      <SpotlightImage
        src={staticFile(asset.path)}
        scale={imageScale}
        region={redisSpotlightRegion}
        spotlightOpacity={redisOpacity}
        dimBrightness={spotlightTuning.dimBrightness}
        featherPaddingFactor={spotlightTuning.featherPaddingFactor}
      />

      <BottomCaption
        opacity={captionOpacity(captionWindows.bridge)}
        text={translate(language, 'whyFastBridge')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.preparedResult)}
        text={translate(language, 'whyFastPreparedResult')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.simpleLookup)}
        text={translate(language, 'whyFastSimpleLookup')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.inMemory)}
        text={translate(language, 'whyFastInMemory')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.workAvoided)}
        text={translate(language, 'whyFastWorkAvoided')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.modernDbMemory)}
        text={translate(language, 'whyFastModernDbMemory')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.closing)}
        text={translate(language, 'whyFastClosing')}
      />

      {debug ? (
        <div
          style={{
            bottom: 28,
            color: theme.muted,
            fontSize: 18,
            left: layout.safeHorizontal,
            opacity: 0.55,
            position: 'absolute',
            zIndex: 5,
          }}
        >
          Scene 10 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
