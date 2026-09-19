import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {SpotlightImage, type SpotlightRegion} from '../../../shared/components/SpotlightImage';
import {theme} from '../../../shared/styles/theme';
import {layout} from '../../../shared/styles/visual-system';
import {resolveAsset} from '../asset-resolver';

export type Scene09CacheHitProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Seven beats deliver the cache-hit payoff: the same
// request arrives again (no spotlight) -> Application checks Redis first ->
// Redis already has the result (cache hit) -> the Database is skipped
// (Redis stays the sole spotlight target through this beat too, so the
// Database reads as skipped by contrast rather than by a second highlight)
// -> the cached result returns to Application -> the response reaches the
// Client noticeably faster -> closing mental model (no spotlight). Every
// spotlighted beat hands off to the next with a 0.4s fade-out immediately
// followed by a 0.4s fade-in, so no two node spotlights are ever both
// nonzero (see `pickSequentialSpotlight` below, the same handoff shape
// Scene 08 established for this asset, itself following TASK-011B/014D's
// Scene 04/07 precedent).
const beats = {
  requestIn: 0.4,
  requestOut: 2.0,
  appCheckIn: 2.3,
  appCheckOut: 3.3,
  redisIn: 3.7,
  redisOut: 8.2,
  resultAppIn: 8.6,
  resultAppOut: 9.8,
  clientIn: 10.2,
  clientOut: 12.0,
  closingIn: 12.5,
} as const;

// Caption windows are independent of spotlight windows (the single Redis
// spotlight hold carries two sequential captions -- cache hit, then Database
// skipped -- exactly as Scene 08's Database beat carried two captions under
// one spotlight), but stay close to their parent spotlight's active window
// so text and highlight never desync.
const captionWindows = {
  request: {start: 0.4, end: 2.0, fadeIn: 0.5, fadeOut: 0.4},
  checkRedis: {start: 2.3, end: 3.5, fadeIn: 0.4, fadeOut: 0.35},
  cacheHit: {start: 3.9, end: 5.6, fadeIn: 0.4, fadeOut: 0.35},
  databaseSkipped: {start: 6.0, end: 7.9, fadeIn: 0.35, fadeOut: 0.35},
  resultReturns: {start: 8.7, end: 9.7, fadeIn: 0.35, fadeOut: 0.35},
  fastResponse: {start: 10.2, end: 11.9, fadeIn: 0.35, fadeOut: 0.35},
  closing: {start: 12.5, end: 13.6, fadeIn: 0.5, fadeOut: 0.4},
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

// Shared push-in so the image layers use the exact same curve throughout
// the scene, matching Scene 07/08's `computePushInScale`.
const computePushInScale = (seconds: number, start: number, end: number): number =>
  interpolate(seconds, [start, end], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

// Normalized (0-1) spotlight target regions against the technical-
// architecture PNG's own box. Application and Redis are reused byte-for-byte
// from Scene 08 (TASK-015-approved; Redis itself traces back to Scene 07 /
// TASK-014C). Database is intentionally NOT given its own spotlight target
// in this scene -- see the beats comment above and Section 4 of the feedback
// report -- so its region constant is not needed here. Client is newly
// activated as a spotlight target for the "fast response" beat: Scene 08
// measured it (color-matched border scan of its blue outline against the
// source PNG's own 1672x941 pixel grid: x:105-332, y:327-497) but left it
// unused. This task pads that same raw scan by the identical 20px
// horizontal / 15px vertical margin Scene 08 applied to Application's own
// raw scan, so all three node regions share one consistent measurement
// method: 105-20=85 to 332+20=352 (width 267), 327-15=312 to 497+15=512
// (height 200).
const applicationSpotlightRegion: SpotlightRegion = {
  height: 209 / 941,
  width: 287 / 1672,
  x: 598 / 1672,
  y: 309 / 941,
};
const redisSpotlightRegion: SpotlightRegion = {
  height: 225 / 1080,
  width: 365 / 1920,
  x: 1225 / 1920,
  y: 130 / 1080,
};
const clientSpotlightRegion: SpotlightRegion = {
  height: 200 / 941,
  width: 267 / 1672,
  x: 85 / 1672,
  y: 312 / 941,
};

// dimBrightness and featherPaddingFactor are carried over unchanged from
// Scene 08's approved local tuning (see Scene08CacheMiss.tsx for the full
// derivation of 0.9): Application and Redis sit on the same horizontal band
// with the same ~0.109 gap that motivated the retune there, and Client sits
// far enough from both that the tighter feather does not under-cover it.
// This is a local Scene 09 tuning only; SpotlightImage's shared default and
// Scene 07/08's approved values are untouched.
const spotlightTuning = {
  dimBrightness: 0.58,
  featherPaddingFactor: 0.9,
} as const;

type SpotlightTarget = {
  region: SpotlightRegion;
  opacity: number;
};

// The four spotlight appearances (Application, Redis, Application again,
// Client) form one ordered, non-overlapping sequence -- see the `beats`
// comment above for the exact handoff seconds -- so at most one is ever
// shown: whichever target's window we're currently in. Segments must be in
// ascending `handoffSeconds` order; the first segment's `handoffSeconds`
// should be 0 (or below) so it is always selected before the first real
// handoff. This is the same helper Scene 04/08 use for their sequential
// spotlight targets.
const pickSequentialSpotlight = (
  seconds: number,
  segments: readonly {handoffSeconds: number; target: SpotlightTarget}[],
): SpotlightTarget => {
  let active = segments[0].target;
  for (const segment of segments) {
    if (seconds >= segment.handoffSeconds) {
      active = segment.target;
    }
  }
  return active;
};

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

export const Scene09CacheHit: React.FC<Scene09CacheHitProps> = ({
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

  const imageScale = computePushInScale(seconds, beats.requestIn, beats.closingIn);

  const appCheckOpacity = windowOpacity(seconds, beats.appCheckIn, beats.appCheckOut, 0.4, 0.4);
  const redisOpacity = windowOpacity(seconds, beats.redisIn, beats.redisOut, 0.4, 0.4);
  const resultAppOpacity = windowOpacity(seconds, beats.resultAppIn, beats.resultAppOut, 0.4, 0.4);
  const clientOpacity = windowOpacity(seconds, beats.clientIn, beats.clientOut, 0.4, 0.4);

  const activeSpotlight = pickSequentialSpotlight(seconds, [
    {handoffSeconds: 0, target: {opacity: appCheckOpacity, region: applicationSpotlightRegion}},
    {handoffSeconds: beats.redisIn, target: {opacity: redisOpacity, region: redisSpotlightRegion}},
    {
      handoffSeconds: beats.resultAppIn,
      target: {opacity: resultAppOpacity, region: applicationSpotlightRegion},
    },
    {handoffSeconds: beats.clientIn, target: {opacity: clientOpacity, region: clientSpotlightRegion}},
  ]);

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
        region={activeSpotlight.region}
        spotlightOpacity={activeSpotlight.opacity}
        dimBrightness={spotlightTuning.dimBrightness}
        featherPaddingFactor={spotlightTuning.featherPaddingFactor}
      />

      <BottomCaption
        opacity={captionOpacity(captionWindows.request)}
        text={translate(language, 'cacheHitRequestArrives')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.checkRedis)}
        text={translate(language, 'cacheHitCheckRedis')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.cacheHit)}
        text={translate(language, 'cacheHitFound')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.databaseSkipped)}
        text={translate(language, 'cacheHitDatabaseSkipped')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.resultReturns)}
        text={translate(language, 'cacheHitResultReturns')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.fastResponse)}
        text={translate(language, 'cacheHitFastResponse')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.closing)}
        text={translate(language, 'cacheHitClosing')}
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
          Scene 09 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
