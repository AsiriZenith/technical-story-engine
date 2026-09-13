import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {theme} from '../../shared/styles/theme';

const MotionCard: React.FC<{label: string; mode: 'fade' | 'slide' | 'scale' | 'spring'}> = ({
  label,
  mode,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Interactive.Div
      name={`${label} demo`}
      style={{
        alignItems: 'center',
        backgroundColor: mode === 'spring' ? '#dc382d' : '#14233a',
        border: '2px solid #2c4361',
        borderRadius: 22,
        display: 'flex',
        fontSize: 34,
        fontWeight: 750,
        height: 210,
        justifyContent: 'center',
        opacity:
          mode === 'fade'
            ? interpolate(frame, [0, fps, 3 * fps, 4 * fps], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1,
        scale:
          mode === 'scale'
            ? interpolate(frame, [0, fps], [0.75, 1], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                output: 'perceptual-scale',
              })
            : mode === 'spring'
              ? interpolate(frame, [0, fps], [0.5, 1], {
                  easing: Easing.spring({damping: 200}),
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  output: 'perceptual-scale',
                })
              : 1,
        translate:
          mode === 'slide'
            ? interpolate(frame, [0, fps], ['0px 80px', '0px 0px'], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : '0px 0px',
        width: 330,
      }}
    >
      {label}
    </Interactive.Div>
  );
};

export const DevMotionBasics: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        padding: '100px 120px',
      }}
    >
      <div style={{color: theme.accent, fontSize: 24, fontWeight: 800, letterSpacing: 5}}>
        DEV / MOTION BASICS
      </div>
      <div style={{fontSize: 58, fontWeight: 750, marginTop: 26}}>Readable motion primitives</div>
      <div style={{display: 'flex', gap: 55, marginTop: 135}}>
        <div style={{width: 330}}>
          <Sequence durationInFrames={5 * fps} layout="none">
            <MotionCard label="Fade" mode="fade" />
          </Sequence>
        </div>
        <div style={{width: 330}}>
          <Sequence from={8} durationInFrames={5 * fps - 8} layout="none">
            <MotionCard label="Slide" mode="slide" />
          </Sequence>
        </div>
        <div style={{width: 330}}>
          <Sequence from={16} durationInFrames={5 * fps - 16} layout="none">
            <MotionCard label="Scale" mode="scale" />
          </Sequence>
        </div>
        <div style={{width: 330}}>
          <Sequence from={24} durationInFrames={5 * fps - 24} layout="none">
            <MotionCard label="Spring" mode="spring" />
          </Sequence>
        </div>
      </div>
      <div style={{color: theme.muted, fontSize: 29, marginTop: 120}}>
        Staggered entrances use local sequence time. No CSS transitions or global episode frames.
      </div>
    </AbsoluteFill>
  );
};
