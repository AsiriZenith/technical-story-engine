import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {SpotlightImage, type SpotlightRegion} from '../../../shared/components/SpotlightImage';
import {theme} from '../../../shared/styles/theme';
import {layout, provisionalColors, typography} from '../../../shared/styles/visual-system';
import {resolveAsset} from '../asset-resolver';

export type Scene04OriginalRequestPathProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Focus-frame timing walks the diagram left to right, matching the intended
// explanation order: request path, then Database, then Expensive work (the
// most important beat, given the longest hold), then Total Latency.
//
// TASK-011B: totalFocusIn was nudged from 9.5 to 9.55 (workFocusOut 9.2 +
// its own 0.35s fade-out = 9.55) — a tiny, deliberately-scoped timing
// adjustment so the Work and Total spotlights never both have nonzero
// opacity at once (previously there was a ~0.05s window, 9.5-9.55, where
// the outgoing Work fade-out and the incoming Total fade-in overlapped).
// The other three handoffs (Request->Database at 4.9, Database->Work at
// 7.0) already met exactly with no gap or overlap and needed no change. No
// other timing changed and the scene's total duration is unaffected.
const beats = {
  setupIn: 0.35,
  setupOut: 1.45,
  diagramIn: 1.05,
  requestFocusIn: 2.8,
  requestFocusOut: 4.6,
  databaseFocusIn: 4.9,
  databaseFocusOut: 6.7,
  workFocusIn: 7.0,
  workFocusOut: 9.2,
  totalFocusIn: 9.55,
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

// TASK-011B: normalized (0-1) spotlight target regions, converted from the
// pixel boxes the old FocusFrame rectangles used
// (left/top/width/height against the 1920x1080 canvas — see the removed
// FocusFrame usages this replaces). The source JPG is 2752x1536 (aspect
// ~1.792), displayed via objectFit: 'contain' at ~1920x1071.7 with ~4px of
// top/bottom letterboxing (per the diagram's own prior comment) — SpotlightImage's
// feather mask is computed as a fraction of its full 1920x1080 wrapper, not
// of that slightly-smaller contained image box, so these regions carry the
// same sub-1%-of-canvas approximation the original FocusFrame boxes already
// made. At this box scale the discrepancy is sub-pixel and not visible.
//
// "Request" is a single wide box spanning both the Client and Application
// nodes together in the source diagram — Scene 04 never had a separate
// Application highlight, so per TASK-011B's "nearest equivalent" guidance,
// there is no distinct Application region to convert; see the feedback
// report for the documented target mapping.
const requestSpotlightRegion: SpotlightRegion = {
  height: 221 / 1080,
  width: 816 / 1920,
  x: 86 / 1920,
  y: 417 / 1080,
};
const databaseSpotlightRegion: SpotlightRegion = {
  height: 345 / 1080,
  width: 255 / 1920,
  x: 1100 / 1920,
  y: 336 / 1080,
};
const workSpotlightRegion: SpotlightRegion = {
  height: 380 / 1080,
  width: 355 / 1920,
  x: 1373 / 1920,
  y: 321 / 1080,
};
const totalSpotlightRegion: SpotlightRegion = {
  height: 122 / 1080,
  width: 900 / 1920,
  x: 513 / 1920,
  y: 872 / 1080,
};

// dimBrightness is carried over unchanged from the approved Scene 07 value
// (TASK-014C/D). featherPaddingFactor needed a Scene-04-specific retune:
// Scene 04's four targets sit much closer together (as little as ~18px
// apart, Database-to-Work) than Scene 07's, and SpotlightImage's mask
// radius scales with the target's own pixel size (radius_px = region_width
// * featherPaddingFactor) — at Scene 07's 1.35, Scene 04's larger boxes
// (e.g. Request at 816px wide) produced a mask reaching ~1100px, well past
// the neighboring box and visibly bleeding brightness into it. 0.55 keeps
// each box's own soft falloff without visibly lighting its neighbor; see
// the feedback report for the measured pixel evidence and the exact
// underlying cause (CSS radial-gradient's explicit ellipse size is a
// radius, not a diameter, so the softened area is roughly 2x wider than
// "featherPaddingFactor" reads as documented — a SpotlightImage-level
// detail out of this task's scope, not something fixed here).
const spotlightTuning = {
  dimBrightness: 0.58,
  featherPaddingFactor: 0.55,
} as const;

type SpotlightTarget = {
  region: SpotlightRegion;
  opacity: number;
};

// The four spotlights (Request, Database, Work, Total) form one ordered,
// non-overlapping sequence (see the beats comment above for the exact
// handoff seconds), so at most one is ever shown: whichever target's
// window we're currently in. `segments` must be in ascending
// `handoffSeconds` order; the first segment's `handoffSeconds` should be 0
// (or below) so it's always selected before the first real handoff.
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

export const Scene04OriginalRequestPath: React.FC<Scene04OriginalRequestPathProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const asset = resolveAsset('scene04OriginalRequestPath');

  if (!asset.path) {
    throw new Error('Asset scene04OriginalRequestPath has no file selected yet.');
  }

  const setupOpacity = windowOpacity(seconds, beats.setupIn, beats.setupOut);
  const setupShift = interpolate(
    seconds,
    [beats.setupIn, beats.setupIn + motionPresets.enterSoft.durationSeconds],
    [motionPresets.enterSoft.offsetPixels, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const diagramOpacity = enterOpacity(seconds, beats.diagramIn, 0.65);
  const diagramScale = interpolate(seconds, [beats.diagramIn, beats.diagramIn + 0.8], [0.985, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const requestOpacity = windowOpacity(
    seconds,
    beats.requestFocusIn,
    beats.requestFocusOut,
    0.3,
    0.3,
  );
  const databaseOpacity = windowOpacity(
    seconds,
    beats.databaseFocusIn,
    beats.databaseFocusOut,
    0.3,
    0.3,
  );
  const workOpacity = windowOpacity(seconds, beats.workFocusIn, beats.workFocusOut, 0.3, 0.35);
  const totalOpacity = enterOpacity(seconds, beats.totalFocusIn, 0.35);

  const activeSpotlight = pickSequentialSpotlight(seconds, [
    {handoffSeconds: 0, target: {opacity: requestOpacity, region: requestSpotlightRegion}},
    {
      handoffSeconds: beats.databaseFocusIn,
      target: {opacity: databaseOpacity, region: databaseSpotlightRegion},
    },
    {
      handoffSeconds: beats.workFocusIn,
      target: {opacity: workOpacity, region: workSpotlightRegion},
    },
    {
      handoffSeconds: beats.totalFocusIn,
      target: {opacity: totalOpacity, region: totalSpotlightRegion},
    },
  ]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(101,181,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(101,181,255,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 72% 44%, rgba(220,56,45,0.16), transparent 29%), radial-gradient(circle at 52% 88%, rgba(255,209,102,0.11), transparent 24%)',
        }}
      />

      <Interactive.Div
        name="Scene 04 setup"
        style={{
          left: layout.safeHorizontal,
          opacity: setupOpacity,
          position: 'absolute',
          top: 72,
          translate: `0 ${setupShift}px`,
          zIndex: 3,
        }}
      >
        <div
          style={{
            color: theme.muted,
            ...typography.technicalLabel,
            marginBottom: 10,
            textTransform: 'uppercase',
          }}
        >
          {translate(language, 'beforeRedis')}
        </div>
        <div style={{color: provisionalColors.number, fontSize: 72, fontWeight: 900, lineHeight: 1}}>
          180 ms
        </div>
      </Interactive.Div>

      <AbsoluteFill style={{opacity: diagramOpacity}}>
        <SpotlightImage
          src={staticFile(asset.path)}
          scale={diagramScale}
          objectFit="contain"
          region={activeSpotlight.region}
          spotlightOpacity={activeSpotlight.opacity}
          dimBrightness={spotlightTuning.dimBrightness}
          featherPaddingFactor={spotlightTuning.featherPaddingFactor}
        />
      </AbsoluteFill>

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
          Scene 04 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
