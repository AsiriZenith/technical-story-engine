import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {layout, typography} from '../../../shared/styles/visual-system';
import {resolveAsset} from '../asset-resolver';

export type Scene05RestaurantRepeatWorkProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Both restaurant beats carry baked English labels
// ("First order" / "~10 min" / "Same order again" / "~10 min again"), so their
// visible windows never overlap: the first beat fully fades out before the
// second fades in, with a short beat-marker gap between them.
const beats = {
  firstIn: 0.4,
  firstOut: 6.0,
  markerPeak: 6.3,
  secondIn: 6.6,
  secondOut: 14.5,
  takeawayIn: 11.6,
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

// Both beats are exactly 16:9, so a full-bleed cover shows the supplied
// artwork complete and (functionally) uncropped. A slow scale/pan carries a
// restrained push-in toward the chef on the right without ever exposing an
// edge; the asset itself is never redrawn, masked, or recomposed.
const RestaurantBeat: React.FC<{
  assetId: 'scene05FirstOrder' | 'scene05RepeatOrder';
  seconds: number;
  start: number;
  end: number;
}> = ({assetId, seconds, start, end}) => {
  const asset = resolveAsset(assetId);

  if (!asset.path) {
    throw new Error(`Asset ${assetId} has no file selected yet.`);
  }

  const scale = interpolate(seconds, [start, end], [1, 1.045], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const panX = interpolate(seconds, [start, end], [0, -18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  return (
    <Img
      src={staticFile(asset.path)}
      style={{
        display: 'block',
        height: '100%',
        objectFit: 'cover',
        transform: `scale(${scale}) translateX(${panX}px)`,
        width: '100%',
      }}
    />
  );
};

// A minimal beat marker in the cut between the two orders — not a redrawn
// arrow or diagram element, just a small pulse acknowledging "next order".
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

const TakeawayCaption: React.FC<{opacity: number; text: string}> = ({opacity, text}) => (
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
        left: 0,
        position: 'absolute',
        textAlign: 'center',
        textShadow: '0 2px 18px rgba(0,0,0,0.65)',
        width: 1920,
        ...typography.sectionHeading,
      }}
    >
      {text}
    </div>
  </AbsoluteFill>
);

export const Scene05RestaurantRepeatWork: React.FC<Scene05RestaurantRepeatWorkProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  const firstOpacity = windowOpacity(seconds, beats.firstIn, beats.firstOut);
  const secondOpacity = windowOpacity(seconds, beats.secondIn, beats.secondOut);
  const markerOpacity = windowOpacity(seconds, beats.firstOut + 0.05, beats.markerPeak, 0.2, 0.25);
  const takeawayOpacity = enterOpacity(seconds, beats.takeawayIn, 0.5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill style={{opacity: firstOpacity}}>
        <RestaurantBeat
          assetId="scene05FirstOrder"
          seconds={seconds}
          start={beats.firstIn}
          end={beats.firstOut}
        />
      </AbsoluteFill>

      <BeatMarker opacity={markerOpacity} />

      <AbsoluteFill style={{opacity: secondOpacity}}>
        <RestaurantBeat
          assetId="scene05RepeatOrder"
          seconds={seconds}
          start={beats.secondIn}
          end={beats.secondOut}
        />
      </AbsoluteFill>

      <TakeawayCaption opacity={takeawayOpacity} text={translate(language, 'sameWorkAgain')} />

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
          Scene 05 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
