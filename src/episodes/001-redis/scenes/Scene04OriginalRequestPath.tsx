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
import {resolveAsset} from '../asset-resolver';

export type Scene04OriginalRequestPathProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

const beats = {
  setupIn: 0.35,
  setupOut: 1.45,
  diagramIn: 1.05,
  pathFocusIn: 3.1,
  workFocusIn: 5.55,
  totalFocusIn: 7.65,
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

const FocusFrame: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  color: string;
  radius?: number;
}> = ({left, top, width, height, opacity, color, radius = 28}) => (
  <div
    style={{
      border: `4px solid ${color}`,
      borderRadius: radius,
      boxShadow: `0 0 34px ${color}`,
      height,
      left,
      opacity,
      pointerEvents: 'none',
      position: 'absolute',
      top,
      width,
    }}
  />
);

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
  const pathOpacity = windowOpacity(seconds, beats.pathFocusIn, beats.workFocusIn - 0.25, 0.35, 0.35);
  const workOpacity = windowOpacity(seconds, beats.workFocusIn, beats.totalFocusIn - 0.15, 0.3, 0.35);
  const totalOpacity = enterOpacity(seconds, beats.totalFocusIn, 0.35);

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

      <AbsoluteFill
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          opacity: diagramOpacity,
          transform: `scale(${diagramScale})`,
          transformOrigin: 'center center',
        }}
      >
        <Img
          src={staticFile(asset.path)}
          style={{
            display: 'block',
            height: '100%',
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: diagramOpacity}}>
        <FocusFrame
          left={320}
          top={432}
          width={1270}
          height={200}
          opacity={pathOpacity * 0.48}
          color="rgba(255,255,255,0.76)"
          radius={18}
        />
        <FocusFrame
          left={1372}
          top={372}
          width={325}
          height={292}
          opacity={workOpacity * 0.55}
          color="rgba(220,56,45,0.78)"
          radius={22}
        />
        <FocusFrame
          left={515}
          top={883}
          width={925}
          height={148}
          opacity={totalOpacity * 0.42}
          color="rgba(255,209,102,0.75)"
          radius={22}
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
