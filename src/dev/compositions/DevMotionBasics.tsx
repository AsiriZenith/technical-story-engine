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
import {motionPresets} from '../../shared/motion/presets';
import {layout, provisionalColors, typography} from '../../shared/styles/visual-system';

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
            ? interpolate(
                frame,
                [0, motionPresets.enterSoft.durationSeconds * fps],
                [0, 1],
                {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                },
              )
            : 1,
        scale:
          mode === 'scale'
            ? interpolate(
                frame,
                [
                  0,
                  (motionPresets.emphasizeScale.durationSeconds * fps) / 2,
                  motionPresets.emphasizeScale.durationSeconds * fps,
                ],
                [1, motionPresets.emphasizeScale.peakScale, 1],
                {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                output: 'perceptual-scale',
                },
              )
            : mode === 'spring'
              ? interpolate(frame, [0, motionPresets.enterSoft.durationSeconds * fps], [0.5, 1], {
                  easing: Easing.spring({damping: 200}),
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  output: 'perceptual-scale',
                })
              : 1,
        translate:
          mode === 'slide'
            ? interpolate(
                frame,
                [0, motionPresets.enterFast.durationSeconds * fps],
                [`0px ${motionPresets.enterFast.offsetPixels}px`, '0px 0px'],
                {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                },
              )
            : '0px 0px',
        width: 330,
      }}
    >
      {label}
    </Interactive.Div>
  );
};

export const DevMotionBasics: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        padding: `${layout.safeVertical}px ${layout.safeHorizontal}px`,
      }}
    >
      <div style={{color: theme.accent, ...typography.technicalLabel}}>
        DEV / MOTION BASICS
      </div>
      <div style={{marginTop: 22, ...typography.sectionHeading}}>Minimal motion vocabulary</div>
      <div
        style={{
          display: 'flex',
          gap: 55,
          marginTop: 105,
          opacity: interpolate(
            frame,
            [
              durationInFrames - motionPresets.exitSoft.durationSeconds * fps,
              durationInFrames - 1,
            ],
            [1, 0],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
          ),
        }}
      >
        <div style={{width: 330}}>
          <Sequence durationInFrames={5 * fps} layout="none">
            <MotionCard label="enterSoft" mode="fade" />
          </Sequence>
        </div>
        <div style={{width: 330}}>
          <Sequence
            from={Math.round(motionPresets.staggerSmall.delaySeconds * fps)}
            durationInFrames={5 * fps - Math.round(motionPresets.staggerSmall.delaySeconds * fps)}
            layout="none"
          >
            <MotionCard label="enterFast" mode="slide" />
          </Sequence>
        </div>
        <div style={{width: 330}}>
          <Sequence
            from={Math.round(motionPresets.staggerSmall.delaySeconds * fps * 2)}
            durationInFrames={5 * fps - Math.round(motionPresets.staggerSmall.delaySeconds * fps * 2)}
            layout="none"
          >
            <MotionCard label="emphasizeScale" mode="scale" />
          </Sequence>
        </div>
        <div style={{width: 330}}>
          <Sequence
            from={Math.round(motionPresets.staggerSmall.delaySeconds * fps * 3)}
            durationInFrames={5 * fps - Math.round(motionPresets.staggerSmall.delaySeconds * fps * 3)}
            layout="none"
          >
            <MotionCard label="staggerSmall" mode="spring" />
          </Sequence>
        </div>
      </div>
      <div
        style={{
          alignItems: 'center',
          bottom: 105,
          display: 'flex',
          gap: 70,
          left: layout.safeHorizontal,
          position: 'absolute',
        }}
      >
        <div
          style={{
            backgroundColor: provisionalColors.panelRaised,
            borderRadius: 18,
            padding: '20px 26px',
            width: 420,
          }}
        >
          <div style={{color: theme.muted, ...typography.technicalLabel}}>counterValue</div>
          <div style={{color: provisionalColors.number, marginTop: 8, ...typography.sectionHeading}}>
            {Math.round(
              interpolate(
                frame,
                [
                  motionPresets.counterValue.startSeconds * fps,
                  (motionPresets.counterValue.startSeconds +
                    motionPresets.counterValue.durationSeconds) *
                    fps,
                ],
                [180, 8],
                {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
              ),
            )}{' '}
            ms
          </div>
        </div>
        <div style={{height: 112, position: 'relative', width: 1050}}>
          <div
            style={{
              backgroundColor: provisionalColors.line,
              height: 4,
              left: 0,
              position: 'absolute',
              right: 0,
              top: 58,
            }}
          />
          <div style={{color: theme.muted, left: 0, position: 'absolute', top: 0, ...typography.caption}}>
            moveLinear
          </div>
          <div
            style={{
              alignItems: 'center',
              backgroundColor: theme.foreground,
              borderRadius: 999,
              color: theme.background,
              display: 'flex',
              fontSize: 20,
              fontWeight: 800,
              height: 64,
              justifyContent: 'center',
              left: interpolate(
                frame,
                [
                  motionPresets.moveLinear.startSeconds * fps,
                  (motionPresets.moveLinear.startSeconds + motionPresets.moveLinear.durationSeconds) *
                    fps,
                ],
                [0, 986],
                {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
              ),
              position: 'absolute',
              top: 28,
              width: 64,
            }}
          >
            GET
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
