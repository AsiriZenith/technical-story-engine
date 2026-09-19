import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {SpotlightImage, type SpotlightRegion} from '../../../shared/components/SpotlightImage';
import {theme} from '../../../shared/styles/theme';
import {layout} from '../../../shared/styles/visual-system';
import {resolveAsset} from '../asset-resolver';

export type Scene08CacheMissProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Seven beats walk the cache-miss path in strict
// sequence: request arrives (no spotlight) -> Application checks Redis ->
// cache miss (Redis held) -> Database does the expensive work -> result
// returns to Application -> Application stores the result in Redis ->
// response returns (no spotlight, closing line). Every spotlighted beat
// hands off to the next with a 0.4s fade-out immediately followed by a
// 0.4s fade-in, so no two node spotlights are ever both nonzero (see
// `pickSequentialSpotlight` below, the same handoff shape TASK-011B/014D
// established for Scene 04 and Scene 07).
const beats = {
  requestIn: 0.4,
  requestOut: 2.0,
  appCheckIn: 2.3,
  appCheckOut: 3.1,
  redisMissIn: 3.5,
  redisMissOut: 6.6,
  databaseIn: 7.0,
  databaseOut: 10.4,
  resultAppIn: 10.8,
  resultAppOut: 12.0,
  storeRedisIn: 12.4,
  storeRedisOut: 14.0,
  closingIn: 14.6,
} as const;

// Caption windows are independent of spotlight windows (a single spotlight
// hold can carry two sequential captions, e.g. the Database beat), but stay
// inside their parent spotlight's fade-in/fade-out envelope so text and
// highlight never desync.
const captionWindows = {
  request: {start: 0.4, end: 2.0, fadeIn: 0.5, fadeOut: 0.4},
  checkRedis: {start: 2.3, end: 3.5, fadeIn: 0.4, fadeOut: 0.35},
  miss: {start: 4.3, end: 6.2, fadeIn: 0.4, fadeOut: 0.4},
  askDatabase: {start: 7.4, end: 8.8, fadeIn: 0.35, fadeOut: 0.35},
  expensiveWork: {start: 9.2, end: 10.4, fadeIn: 0.35, fadeOut: 0.35},
  resultReturns: {start: 11.2, end: 12.0, fadeIn: 0.35, fadeOut: 0.35},
  storeInRedis: {start: 12.8, end: 14.0, fadeIn: 0.35, fadeOut: 0.35},
  closing: {start: 14.6, end: 15.6, fadeIn: 0.5, fadeOut: 0.4},
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
// the scene, matching Scene 07's `computePushInScale`.
const computePushInScale = (seconds: number, start: number, end: number): number =>
  interpolate(seconds, [start, end], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

// Normalized (0-1) spotlight target regions against the technical-
// architecture PNG's own box. Redis and Database reuse the exact fractions
// already approved for this same image in Scene 07 (TASK-014C/D:
// left:1225,top:130,width:365,height:225 -> Redis; left:1225,top:635,
// width:365,height:230 -> Database, against a 1920x1080 reference canvas).
// Application was measured fresh for this task directly against the source
// PNG's own pixel grid (1672x941): a horizontal scanline through the card's
// vertical center (y=412) located its left/right border transitions at
// x=620/863, and a vertical scanline through its horizontal center (x=740)
// located its top/bottom border transitions at y=325/505; a small pad
// (20px horizontal, 15px vertical) was then added to match Redis/Database's
// own padding-beyond-border proportions. Client was measured the same way
// (color-matched border scan, x:105-332, y:327-497) but is not used as a
// spotlight target in this scene (see feedback report).
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
const databaseSpotlightRegion: SpotlightRegion = {
  height: 230 / 1080,
  width: 365 / 1920,
  x: 1225 / 1920,
  y: 635 / 1080,
};

// dimBrightness is carried over unchanged from the approved Scene 07 value.
// featherPaddingFactor needed a Scene-08-specific retune: Application and
// Redis sit only ~0.109 apart (Application's right edge at x~0.529, Redis's
// left edge at x~0.638) on the same horizontal band. At Scene 07's 1.35,
// SpotlightImage's documented mask-radius-vs-diameter gap (see this
// project's known technical debt, referenced in TASK-015) would put
// Application's actual falloff radius at ~0.1717*1.35=0.232 -- reaching
// past Redis's own left edge and visibly lighting the Redis card while
// Application is still the intended sole target. 0.9 keeps Application's
// falloff radius at ~0.1717*0.9=0.155, roughly 0.05 short of Redis's edge,
// while still giving all three targets a soft, non-rectangular edge. This
// is a local Scene 08 tuning only; SpotlightImage's shared default and
// Scene 07's approved values are untouched.
const spotlightTuning = {
  dimBrightness: 0.58,
  featherPaddingFactor: 0.9,
} as const;

type SpotlightTarget = {
  region: SpotlightRegion;
  opacity: number;
};

// The five spotlight appearances (Application, Redis, Database, Application
// again, Redis again) form one ordered, non-overlapping sequence -- see the
// `beats` comment above for the exact handoff seconds -- so at most one is
// ever shown: whichever target's window we're currently in. Segments must
// be in ascending `handoffSeconds` order; the first segment's
// `handoffSeconds` should be 0 (or below) so it is always selected before
// the first real handoff. This is the same helper Scene 04 uses
// (TASK-011B) for its four-target sequence.
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

export const Scene08CacheMiss: React.FC<Scene08CacheMissProps> = ({
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
  const redisMissOpacity = windowOpacity(seconds, beats.redisMissIn, beats.redisMissOut, 0.4, 0.4);
  const databaseOpacity = windowOpacity(seconds, beats.databaseIn, beats.databaseOut, 0.4, 0.4);
  const resultAppOpacity = windowOpacity(seconds, beats.resultAppIn, beats.resultAppOut, 0.4, 0.4);
  const storeRedisOpacity = windowOpacity(
    seconds,
    beats.storeRedisIn,
    beats.storeRedisOut,
    0.4,
    0.4,
  );

  const activeSpotlight = pickSequentialSpotlight(seconds, [
    {handoffSeconds: 0, target: {opacity: appCheckOpacity, region: applicationSpotlightRegion}},
    {
      handoffSeconds: beats.redisMissIn,
      target: {opacity: redisMissOpacity, region: redisSpotlightRegion},
    },
    {
      handoffSeconds: beats.databaseIn,
      target: {opacity: databaseOpacity, region: databaseSpotlightRegion},
    },
    {
      handoffSeconds: beats.resultAppIn,
      target: {opacity: resultAppOpacity, region: applicationSpotlightRegion},
    },
    {
      handoffSeconds: beats.storeRedisIn,
      target: {opacity: storeRedisOpacity, region: redisSpotlightRegion},
    },
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
        text={translate(language, 'cacheMissRequestArrives')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.checkRedis)}
        text={translate(language, 'cacheMissCheckRedis')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.miss)}
        text={translate(language, 'cacheMissNotFound')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.askDatabase)}
        text={translate(language, 'cacheMissAskDatabase')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.expensiveWork)}
        text={translate(language, 'cacheMissExpensiveWork')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.resultReturns)}
        text={translate(language, 'cacheMissResultReturns')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.storeInRedis)}
        text={translate(language, 'cacheMissStoreInRedis')}
      />
      <BottomCaption
        opacity={captionOpacity(captionWindows.closing)}
        text={translate(language, 'cacheMissClosing')}
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
          Scene 08 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
