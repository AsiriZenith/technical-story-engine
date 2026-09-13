import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {TimingBar, type TimingBarSegment} from '../../../shared/components/TimingBar';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {
  layout,
  provisionalColors,
  typography,
} from '../../../shared/styles/visual-system';

export type Scene02LatencyBreakdownProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

const beats = {
  carryIn: 0.4,
  questionIn: 1.8,
  barIn: 3.2,
  segmentsStart: 4.0,
  slotDuration: 0.9,
  emphasizeIn: 8.6,
  emphasizeDuration: 1.0,
  takeawayIn: 10.0,
} as const;

// Illustrative only — see Part B of TASK-006. Values are not a claim that every
// API has this exact breakdown, only that database work dominates this example.
const breakdown = [
  {id: 'request', valueMs: 5, color: '#65b5ff'},
  {id: 'dbNetwork', valueMs: 8, color: '#8aa6c2'},
  {id: 'databaseWork', valueMs: 155, color: provisionalColors.number},
  {id: 'serialization', valueMs: 5, color: '#9b8cff'},
  {id: 'other', valueMs: 7, color: '#718096'},
] as const;

const totalMs = breakdown.reduce((sum, segment) => sum + segment.valueMs, 0);

const barWidthPx = 1920 - layout.safeHorizontal * 2;
const barTop = 610;

export const Scene02LatencyBreakdown: React.FC<Scene02LatencyBreakdownProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  const anchorOpacity = interpolate(
    seconds,
    [beats.carryIn, beats.carryIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const questionOpacity = interpolate(
    seconds,
    [
      beats.questionIn,
      beats.questionIn + motionPresets.enterSoft.durationSeconds,
      beats.barIn,
      beats.barIn + 0.6,
    ],
    [0, 1, 1, 0.55],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const barContainerOpacity = interpolate(
    seconds,
    [beats.barIn, beats.barIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const barContainerScale = interpolate(
    seconds,
    [beats.barIn, beats.barIn + motionPresets.enterSoft.durationSeconds],
    [0.96, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const emphasisProgress = interpolate(
    seconds,
    [beats.emphasizeIn, beats.emphasizeIn + beats.emphasizeDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const takeawayOpacity = interpolate(
    seconds,
    [beats.takeawayIn, beats.takeawayIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const labels: Record<(typeof breakdown)[number]['id'], string> = {
    request: translate(language, 'request'),
    dbNetwork: translate(language, 'dbNetwork'),
    databaseWork: translate(language, 'databaseWork'),
    serialization: translate(language, 'serialization'),
    other: translate(language, 'other'),
  };

  const segments: TimingBarSegment[] = breakdown.map((definition, index) => {
    const slotStart = beats.segmentsStart + index * beats.slotDuration;
    const revealOpacity = interpolate(
      seconds,
      [slotStart, slotStart + motionPresets.enterSoft.durationSeconds],
      [0, 1],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
    );
    const isDatabaseWork = definition.id === 'databaseWork';
    const emphasisOpacity = isDatabaseWork ? 1 : 1 - emphasisProgress * 0.45;
    const calloutOpacity = isDatabaseWork
      ? 0
      : interpolate(
          seconds,
          [
            slotStart,
            slotStart + 0.2,
            slotStart + beats.slotDuration - 0.25,
            slotStart + beats.slotDuration - 0.05,
          ],
          [0, 1, 1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );

    return {
      id: definition.id,
      label: labels[definition.id],
      valueMs: definition.valueMs,
      color: definition.color,
      textColor: isDatabaseWork ? theme.background : theme.foreground,
      opacity: revealOpacity * emphasisOpacity,
      emphasisScale: isDatabaseWork ? 1 + emphasisProgress * 0.18 : 1,
      calloutOpacity,
    };
  });

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
        name="Carried-over result"
        style={{
          left: layout.safeHorizontal,
          opacity: anchorOpacity,
          position: 'absolute',
          top: 76,
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

      <Interactive.Div
        name="Latency question"
        style={{
          left: 0,
          opacity: questionOpacity,
          padding: '0 220px',
          position: 'absolute',
          textAlign: 'center',
          top: 230,
          width: 1920,
        }}
      >
        <div
          style={{
            ...typography.sceneTitle,
            fontSize: language === 'de' ? 58 : 64,
            fontWeight: 800,
          }}
        >
          {translate(language, 'latencyQuestion')}
        </div>
      </Interactive.Div>

      <div
        style={{
          left: layout.safeHorizontal,
          opacity: barContainerOpacity,
          position: 'absolute',
          scale: barContainerScale,
          top: barTop - 90,
          transformOrigin: 'left center',
        }}
      >
        <div
          style={{
            color: theme.muted,
            position: 'absolute',
            right: 0,
            textAlign: 'right',
            top: -46,
            width: barWidthPx,
            ...typography.technicalLabel,
            fontSize: 18,
          }}
        >
          {translate(language, 'illustrativeBreakdown')}
        </div>

        <TimingBar segments={segments} totalMs={totalMs} widthPx={barWidthPx} />
      </div>

      <Interactive.Div
        name="Takeaway"
        style={{
          left: 0,
          opacity: takeawayOpacity,
          position: 'absolute',
          textAlign: 'center',
          top: 850,
          width: 1920,
        }}
      >
        <div
          style={{
            color: theme.foreground,
            fontSize: language === 'de' ? 52 : 58,
            fontWeight: 800,
            padding: '0 160px',
          }}
        >
          {translate(language, 'latencyTakeaway')}
        </div>
      </Interactive.Div>

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
          Scene 02 · {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
