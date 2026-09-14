import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {layout, provisionalColors, typography} from '../../../shared/styles/visual-system';
import {getAssetPath} from '../assets';

export type Scene03DatabaseMisconceptionProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Both diagram assets carry baked text, so every window
// below closes completely before the next one opens: at no frame can two
// text-bearing layers be visible at the same time.
const beats = {
  recallIn: 0.4,
  recallOut: 1.35,
  jokeIn: 1.95,
  jokeOut: 7.3,
  endIn: 7.9,
} as const;

const diagramFadeIn = 0.5;
const diagramFadeOut = motionPresets.exitSoft.durationSeconds;

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
  fadeIn: number,
  fadeOut: number,
): number =>
  interpolate(seconds, [start, start + fadeIn, end, end + fadeOut], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

// Both diagrams are exactly 16:9, so a full-bleed fit shows the supplied artwork
// complete and uncropped. The asset is never redrawn, masked, or recomposed.
const DiagramAsset: React.FC<{
  assetId: 'scene03JokeDiagram' | 'scene03EndDiagram';
  scale: number;
}> = ({assetId, scale}) => (
  <Img
    src={staticFile(getAssetPath(assetId))}
    style={{
      display: 'block',
      height: '100%',
      objectFit: 'cover',
      transform: `scale(${scale})`,
      width: '100%',
    }}
  />
);

// The supplied diagrams have English labels baked in. Rather than editing the
// artwork, the localized line is placed in the empty band beneath it.
const LocalizedCaption: React.FC<{
  bottom: number;
  fontSize: number;
  text: string;
}> = ({bottom, fontSize, text}) => (
  <div
    style={{
      bottom,
      color: theme.foreground,
      fontSize,
      fontWeight: 700,
      left: 0,
      lineHeight: 1.2,
      padding: `0 ${layout.safeHorizontal}px`,
      position: 'absolute',
      textAlign: 'center',
      width: 1920,
    }}
  >
    {text}
  </div>
);

export const Scene03DatabaseMisconception: React.FC<Scene03DatabaseMisconceptionProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  const recallOpacity = windowOpacity(
    seconds,
    beats.recallIn,
    beats.recallOut,
    motionPresets.enterFast.durationSeconds,
    motionPresets.exitSoft.durationSeconds,
  );
  const recallShift = interpolate(
    seconds,
    [beats.recallIn, beats.recallIn + motionPresets.enterSoft.durationSeconds],
    [motionPresets.enterSoft.offsetPixels, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  const jokeOpacity = windowOpacity(
    seconds,
    beats.jokeIn,
    beats.jokeOut,
    diagramFadeIn,
    diagramFadeOut,
  );
  const jokeScale = interpolate(
    seconds,
    [beats.jokeIn, beats.jokeIn + diagramFadeIn],
    [0.988, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  const endOpacity = enterOpacity(seconds, beats.endIn, diagramFadeIn);
  const endScale = interpolate(
    seconds,
    [beats.endIn, beats.endIn + diagramFadeIn],
    [0.988, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  const showLocalizedCaption = language !== 'en';

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

      <Interactive.Div
        name="Carried-over database work"
        style={{
          left: layout.safeHorizontal,
          opacity: recallOpacity,
          position: 'absolute',
          top: 76,
          translate: `0 ${recallShift}px`,
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
          {translate(language, 'databaseWork')}
        </div>
        <div
          style={{color: provisionalColors.number, fontSize: 72, fontWeight: 900, lineHeight: 1}}
        >
          155 ms
        </div>
      </Interactive.Div>

      <AbsoluteFill style={{opacity: jokeOpacity}}>
        <DiagramAsset assetId="scene03JokeDiagram" scale={jokeScale} />
        {showLocalizedCaption ? (
          <LocalizedCaption
            bottom={92}
            fontSize={language === 'de' ? 34 : 36}
            text={translate(language, 'misconceptionQuestion')}
          />
        ) : null}
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: endOpacity}}>
        <DiagramAsset assetId="scene03EndDiagram" scale={endScale} />
        {showLocalizedCaption ? (
          <LocalizedCaption
            bottom={48}
            fontSize={language === 'de' ? 30 : 32}
            text={translate(language, 'stoppedRepeatingWork')}
          />
        ) : null}
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
          }}
        >
          Scene 03 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
