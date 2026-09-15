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

export type Scene06ReadyShelfCacheHitProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Both beats carry a baked "Ready shelf" label, so
// their visible windows never overlap: the first beat fully fades out before
// the second fades in, with a short beat-marker gap between them.
const beats = {
  shelfIn: 0.4,
  shelfOut: 5.6,
  shelfFocusIn: 1.9,
  shelfFocusOut: 5.15,
  introTextIn: 2.1,
  markerPeak: 5.9,
  serveIn: 6.2,
  serveOut: 13.5,
  takeawayIn: 10.7,
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
// restrained push-in toward the ready shelf without ever exposing an edge;
// the asset itself is never redrawn, masked, or recomposed.
//
// The scale/pan transform is applied to this wrapper div, not to the <Img>
// directly, and any focus-frame overlay is passed in as `children` so it
// renders *inside* the same transformed element. A CSS `transform` makes its
// element a containing block for absolutely positioned descendants, so a
// child like <ShelfFocusFrame> — positioned with the same left/top/width/
// height it would use against the untransformed 1920x1080 canvas — moves
// and scales in exact lockstep with the image. (An earlier version applied
// the transform only to the <Img> and rendered the focus box as a plain
// sibling in fixed canvas coordinates; the box then visibly drifted off the
// shelf as the image panned/scaled underneath it.)
const RestaurantBeat: React.FC<{
  assetId: 'scene06ReadyShelf' | 'scene06ServeFromShelf';
  seconds: number;
  start: number;
  end: number;
  panToXPixels?: number;
  children?: React.ReactNode;
}> = ({assetId, seconds, start, end, panToXPixels = -14, children}) => {
  const asset = resolveAsset(assetId);

  if (!asset.path) {
    throw new Error(`Asset ${assetId} has no file selected yet.`);
  }

  const scale = interpolate(seconds, [start, end], [1, 1.045], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const panX = interpolate(seconds, [start, end], [0, panToXPixels], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  return (
    <div
      style={{
        height: '100%',
        transform: `scale(${scale}) translateX(${panX}px)`,
        transformOrigin: 'center center',
        width: '100%',
      }}
    >
      <Img
        src={staticFile(asset.path)}
        style={{
          display: 'block',
          height: '100%',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      {children}
    </div>
  );
};

// Restrained highlight tightly bounding the ready-shelf cabinet only (its
// "Ready shelf" header and the two glass shelves), derived from the source
// PNG's own proportions (1672x941, rendered full-bleed with no letterboxing
// since its aspect ratio already matches the 1920x1080 canvas): the cabinet
// spans roughly x 0.476-0.675 and y 0.295-0.647 of the image, which maps to
// this box in canvas coordinates. It intentionally stops short of the
// cashier on the left and the chef on the right.
const ShelfFocusFrame: React.FC<{opacity: number}> = ({opacity}) => (
  <div
    style={{
      border: `3px solid rgba(255,209,102,0.85)`,
      borderRadius: 18,
      boxShadow: '0 0 26px rgba(255,209,102,0.5)',
      height: 385,
      left: 912,
      opacity,
      pointerEvents: 'none',
      position: 'absolute',
      top: 315,
      width: 385,
    }}
  />
);

// A minimal beat marker in the cut between the two beats — not a redrawn
// arrow or diagram element, just a small pulse acknowledging the next beat.
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

const BottomCaption: React.FC<{opacity: number; text: string; emphasize?: boolean}> = ({
  opacity,
  text,
  emphasize = false,
}) => (
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
        ...(emphasize ? typography.sectionHeading : typography.body),
      }}
    >
      {text}
    </div>
  </AbsoluteFill>
);

export const Scene06ReadyShelfCacheHit: React.FC<Scene06ReadyShelfCacheHitProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  const shelfOpacity = windowOpacity(seconds, beats.shelfIn, beats.shelfOut);
  const shelfFocusOpacity =
    windowOpacity(seconds, beats.shelfFocusIn, beats.shelfFocusOut, 0.45, 0.4) * shelfOpacity;
  const introTextOpacity = enterOpacity(seconds, beats.introTextIn, 0.5) * shelfOpacity;
  const serveOpacity = windowOpacity(seconds, beats.serveIn, beats.serveOut);
  const markerOpacity = windowOpacity(seconds, beats.shelfOut + 0.05, beats.markerPeak, 0.2, 0.25);
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
      <AbsoluteFill style={{opacity: shelfOpacity}}>
        <RestaurantBeat
          assetId="scene06ReadyShelf"
          seconds={seconds}
          start={beats.shelfIn}
          end={beats.shelfOut}
          panToXPixels={-20}
        >
          <ShelfFocusFrame opacity={shelfFocusOpacity} />
        </RestaurantBeat>
      </AbsoluteFill>

      <BottomCaption
        opacity={introTextOpacity}
        text={translate(language, 'readyShelfIntro')}
      />

      <BeatMarker opacity={markerOpacity} />

      <AbsoluteFill style={{opacity: serveOpacity}}>
        <RestaurantBeat
          assetId="scene06ServeFromShelf"
          seconds={seconds}
          start={beats.serveIn}
          end={beats.serveOut}
          panToXPixels={-10}
        />
      </AbsoluteFill>

      <BottomCaption
        opacity={takeawayOpacity}
        text={translate(language, 'chefDidntCookAtAll')}
        emphasize
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
          Scene 06 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
