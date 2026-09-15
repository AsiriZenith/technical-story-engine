import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {SpotlightImage, type SpotlightRegion} from '../../../shared/components/SpotlightImage';
import {theme} from '../../../shared/styles/theme';
import {layout} from '../../../shared/styles/visual-system';
import {resolveAsset} from '../asset-resolver';

export type Scene07AnalogyToArchitectureProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Both beats carry baked English labels, so their
// visible windows never overlap: the analogy-mapping beat fully fades out
// before the technical-architecture beat fades in, with a short beat-marker
// gap between them. The technical beat is held long because it is a dense,
// six-step diagram that must stay readable at normal playback speed.
// The technical-architecture image has its own baked stats and copy filling
// its bottom band (the ~10 ms comparison and "SAME REQUEST. FASTER
// RESPONSE." line), so unlike Scenes 05/06 the takeaway caption cannot
// overlay that image without covering important supplied content. It is
// timed to appear only after the image has fully faded out instead.
//
// TASK-014D: databaseFocusIn was nudged from 11.8 to 11.9 (redisFocusOut
// 11.5 + its own 0.4s fade-out = 11.9) — a tiny, deliberately-scoped timing
// adjustment so the technical-architecture beat's Redis and Database
// spotlights never both have nonzero opacity at once (previously there was
// a ~0.1s window, 11.8-11.9, where the outgoing Redis fade-out and the
// incoming Database fade-in overlapped). No other timing changed and the
// scene's total duration (540 frames / 18s) is unaffected.
const beats = {
  analogyIn: 0.4,
  analogyOut: 6.4,
  markerPeak: 6.7,
  techIn: 7.0,
  techOut: 16.0,
  redisFocusIn: 8.5,
  redisFocusOut: 11.5,
  databaseFocusIn: 11.9,
  databaseFocusOut: 15.3,
  takeawayIn: 16.4,
} as const;

// Only the pivotal pairing — Redis/Cache, then Database — is highlighted in
// the analogy-mapping beat. Request, Application, and Cached result are
// self-evident from the artwork's own high-contrast badges and were dropped
// per motion design review (see feedbacks/scene-07-motion-design-review.md)
// rather than stacking five simultaneous highlights. The two are a
// sequential, non-overlapping handoff (same crossfade shape as the
// technical-architecture beat's Redis/Database pair below), never both lit
// at once.
//
// TASK-014D: databaseIn was nudged from 4.5 to 4.7 (redisCacheOut 4.3 + its
// own 0.4s fade-out = 4.7) for the same reason as databaseFocusIn above —
// closing a ~0.2s window where the outgoing Redis/Cache spotlight and the
// incoming Database spotlight would otherwise both be partially visible.
const analogyFocusTimes = {
  redisCacheIn: 2.5,
  redisCacheOut: 4.3,
  databaseIn: 4.7,
} as const;

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const enterOpacity = (seconds: number, start: number, duration: number): number =>
  interpolate(seconds, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

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

// Shared by both beats' SpotlightImage push-in so the image layers use the
// exact same curve every time it's computed.
const computePushInScale = (seconds: number, start: number, end: number): number =>
  interpolate(seconds, [start, end], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

// Normalized (0-1) spotlight target regions, converted from the pixel boxes
// the old FocusBox rectangles used against the 1920x1080 canvas. Both
// source assets are exactly 16:9, so with SpotlightImage's objectFit:
// 'cover' rendering, percentage-of-container equals percentage-of-source-
// image here; see SpotlightImage.tsx's own doc comment for that assumption.
//
// Analogy-mapping image (left:935,top:245,width:375,height:90 -> Redis/
// Cache; left:1470,top:135,width:330,height:90 -> Database):
const redisCacheSpotlightRegion: SpotlightRegion = {
  height: 90 / 1080,
  width: 375 / 1920,
  x: 935 / 1920,
  y: 245 / 1080,
};
const databaseAnalogySpotlightRegion: SpotlightRegion = {
  height: 90 / 1080,
  width: 330 / 1920,
  x: 1470 / 1920,
  y: 135 / 1080,
};
// Technical-architecture image (left:1225,top:130,width:365,height:225 ->
// Redis node; left:1225,top:635,width:365,height:230 -> Database node):
const redisNodeSpotlightRegion: SpotlightRegion = {
  height: 225 / 1080,
  width: 365 / 1920,
  x: 1225 / 1920,
  y: 130 / 1080,
};
const databaseNodeSpotlightRegion: SpotlightRegion = {
  height: 230 / 1080,
  width: 365 / 1920,
  x: 1225 / 1920,
  y: 635 / 1080,
};

// Both images use the standard approved spotlight tuning from TASK-014C.
const spotlightTuning = {
  dimBrightness: 0.58,
  featherPaddingFactor: 1.35,
} as const;

type SpotlightTarget = {
  region: SpotlightRegion;
  opacity: number;
};

// Each beat's two spotlights (Redis, then Database) never overlap in time
// (see the beats/analogyFocusTimes comments above), so at most one is ever
// shown per beat: whichever target's window we're currently in. This keeps
// exactly one SpotlightImage mounted per beat instead of stacking two
// independent dim/mask layers over the same image, which would double the
// dimming math for no visual benefit.
const pickActiveSpotlight = (
  seconds: number,
  handoffSeconds: number,
  before: SpotlightTarget,
  after: SpotlightTarget,
): SpotlightTarget => (seconds < handoffSeconds ? before : after);

const BeatMarker: React.FC<{opacity: number}> = ({opacity}) => (
  <AbsoluteFill
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      opacity,
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        backgroundColor: theme.foreground,
        borderRadius: '50%',
        boxShadow: `0 0 28px ${theme.foreground}`,
        height: 14,
        width: 14,
      }}
    />
  </AbsoluteFill>
);

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

export const Scene07AnalogyToArchitecture: React.FC<Scene07AnalogyToArchitectureProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  const analogyOpacity = windowOpacity(seconds, beats.analogyIn, beats.analogyOut);
  const techOpacity = windowOpacity(seconds, beats.techIn, beats.techOut);
  const markerOpacity = windowOpacity(
    seconds,
    beats.analogyOut + 0.05,
    beats.markerPeak,
    0.2,
    0.25,
  );
  const takeawayOpacity = enterOpacity(seconds, beats.takeawayIn, 0.5);

  // A single sequential handoff: Redis/Cache highlights, fades out, then
  // Database highlights and holds to the end of the beat. Never both lit at
  // once — the same crossfade shape as the technical-architecture pair
  // below.
  const redisCacheFocus =
    windowOpacity(
      seconds,
      analogyFocusTimes.redisCacheIn,
      analogyFocusTimes.redisCacheOut,
      0.4,
      0.4,
    ) * analogyOpacity;
  const databaseLabelFocus =
    enterOpacity(seconds, analogyFocusTimes.databaseIn, 0.4) * analogyOpacity;

  const redisNodeFocus =
    windowOpacity(seconds, beats.redisFocusIn, beats.redisFocusOut, 0.4, 0.4) * techOpacity;
  const databaseNodeFocus =
    windowOpacity(seconds, beats.databaseFocusIn, beats.databaseFocusOut, 0.4, 0.4) * techOpacity;

  const analogyAsset = resolveAsset('scene07AnalogyMapping');
  if (!analogyAsset.path) {
    throw new Error('Asset scene07AnalogyMapping has no file selected yet.');
  }
  const analogyScale = computePushInScale(seconds, beats.analogyIn, beats.analogyOut);
  const analogySpotlight = pickActiveSpotlight(
    seconds,
    analogyFocusTimes.databaseIn,
    {opacity: redisCacheFocus, region: redisCacheSpotlightRegion},
    {opacity: databaseLabelFocus, region: databaseAnalogySpotlightRegion},
  );

  const technicalAsset = resolveAsset('scene07TechnicalArchitecture');
  if (!technicalAsset.path) {
    throw new Error('Asset scene07TechnicalArchitecture has no file selected yet.');
  }
  const technicalScale = computePushInScale(seconds, beats.techIn, beats.techOut);
  const technicalSpotlight = pickActiveSpotlight(
    seconds,
    beats.databaseFocusIn,
    {opacity: redisNodeFocus, region: redisNodeSpotlightRegion},
    {opacity: databaseNodeFocus, region: databaseNodeSpotlightRegion},
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill style={{opacity: analogyOpacity}}>
        <SpotlightImage
          src={staticFile(analogyAsset.path)}
          scale={analogyScale}
          region={analogySpotlight.region}
          spotlightOpacity={analogySpotlight.opacity}
          dimBrightness={spotlightTuning.dimBrightness}
          featherPaddingFactor={spotlightTuning.featherPaddingFactor}
        />
      </AbsoluteFill>

      <BeatMarker opacity={markerOpacity} />

      <AbsoluteFill style={{opacity: techOpacity}}>
        <SpotlightImage
          src={staticFile(technicalAsset.path)}
          scale={technicalScale}
          region={technicalSpotlight.region}
          spotlightOpacity={technicalSpotlight.opacity}
          dimBrightness={spotlightTuning.dimBrightness}
          featherPaddingFactor={spotlightTuning.featherPaddingFactor}
        />
      </AbsoluteFill>

      <BottomCaption
        opacity={takeawayOpacity}
        text={translate(language, 'redisSkipsRepeatedWork')}
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
          Scene 07 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
