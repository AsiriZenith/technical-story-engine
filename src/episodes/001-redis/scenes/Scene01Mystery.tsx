import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  architectureNodeSemantics,
  type ArchitectureNodeKind,
} from '../../../shared/architecture/node-semantics';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {
  layout,
  provisionalColors,
  typography,
} from '../../../shared/styles/visual-system';

export type Scene01MysteryProps = {
  language: Language;
  // Scene-local duration for the dev "Scene 01 · Ns" caption. Falls back to
  // the composition's own duration for standalone rendering; a scene embedded
  // via <Sequence> must pass its own window's duration, since useVideoConfig()
  // reports the whole composition length, not this sequence's local length.
  durationInFrames?: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

const beats = {
  requestIn: 0.5,
  architectureIn: 1.8,
  baselineMoveStart: 2.8,
  baselineMoveEnd: 5.4,
  baselineResultIn: 5.2,
  sameRequestIn: 8.1,
  redisIn: 9.2,
  secondMoveStart: 11.1,
  secondMoveMid: 12.4,
  secondMoveEnd: 13.8,
  fastResultIn: 13.6,
  finalIn: 16.5,
  questionIn: 18.2,
} as const;

// Centered hub composition: Client -> Application -> Database stay on one row;
// Redis sits above Application as the new stop the request now detours through,
// following the reviewed reference's vertical cache-above-server relationship.
const diagram = {
  canvasWidth: 1920,
  nodeWidth: 260,
  nodeHeight: 210,
  rowTop: 530,
  redisTop: 260,
  packetSize: 64,
} as const;

const nodeCenterX = (left: number) => left + diagram.nodeWidth / 2;

const clientLeft = layout.safeHorizontal;
const databaseLeft = diagram.canvasWidth - layout.safeHorizontal - diagram.nodeWidth;
const applicationLeft = diagram.canvasWidth / 2 - diagram.nodeWidth / 2;
const redisLeft = applicationLeft;
const hubX = nodeCenterX(applicationLeft);
const clientRight = clientLeft + diagram.nodeWidth;
const applicationRight = applicationLeft + diagram.nodeWidth;
const redisBottom = diagram.redisTop + diagram.nodeHeight;

const rowCenterY = diagram.rowTop + diagram.nodeHeight / 2;
const redisCenterY = diagram.redisTop + diagram.nodeHeight / 2;
const rowPacketTop = rowCenterY - diagram.packetSize / 2;
const redisPacketTop = redisCenterY - diagram.packetSize / 2;
const packetClientX = nodeCenterX(clientLeft) - diagram.packetSize / 2;
const packetHubX = hubX - diagram.packetSize / 2;
const packetDatabaseX = nodeCenterX(databaseLeft) - diagram.packetSize / 2;

const HorizontalArrow: React.FC<{
  x1: number;
  x2: number;
  y: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
  dashed?: boolean;
}> = ({x1, x2, y, color, strokeWidth = 5, opacity = 1, dashed = false}) => (
  <>
    <line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke={color}
      strokeWidth={strokeWidth}
      opacity={opacity}
      strokeDasharray={dashed ? '12 12' : undefined}
    />
    <polygon points={`${x2 - 20},${y - 11} ${x2},${y} ${x2 - 20},${y + 11}`} fill={color} opacity={opacity} />
  </>
);

const VerticalArrow: React.FC<{
  x: number;
  y1: number;
  y2: number;
  color: string;
  strokeWidth?: number;
  opacity?: number;
}> = ({x, y1, y2, color, strokeWidth = 5, opacity = 1}) => {
  const pointingUp = y2 < y1;
  return (
    <>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth={strokeWidth} opacity={opacity} />
      <polygon
        points={
          pointingUp
            ? `${x - 11},${y2 + 20} ${x},${y2} ${x + 11},${y2 + 20}`
            : `${x - 11},${y2 - 20} ${x},${y2} ${x + 11},${y2 - 20}`
        }
        fill={color}
        opacity={opacity}
      />
    </>
  );
};

const NodeGlyph: React.FC<{kind: ArchitectureNodeKind; accent: string}> = ({
  kind,
  accent,
}) => {
  if (kind === 'database') {
    return (
      <svg width="54" height="44" viewBox="0 0 66 52" aria-hidden="true">
        <ellipse cx="33" cy="10" rx="27" ry="8" fill="none" stroke={accent} strokeWidth="4" />
        <path d="M6 10v30c0 4 12 8 27 8s27-4 27-8V10" fill="none" stroke={accent} strokeWidth="4" />
        <path d="M6 25c0 4 12 8 27 8s27-4 27-8" fill="none" stroke={accent} strokeWidth="3" />
      </svg>
    );
  }

  if (kind === 'cache') {
    return (
      <svg width="54" height="44" viewBox="0 0 66 52" aria-hidden="true">
        {[7, 21, 35].map((y) => (
          <rect key={y} x="7" y={y} width="52" height="10" rx="5" fill={accent} />
        ))}
      </svg>
    );
  }

  if (kind === 'application') {
    return (
      <svg width="54" height="44" viewBox="0 0 66 52" aria-hidden="true">
        <path d="M24 8 9 26l15 18M42 8l15 18-15 18" fill="none" stroke={accent} strokeWidth="5" />
      </svg>
    );
  }

  return (
    <svg width="54" height="44" viewBox="0 0 66 52" aria-hidden="true">
      <circle cx="23" cy="26" r="15" fill="none" stroke={accent} strokeWidth="4" />
      <path d="M36 26h22m-9-9 9 9-9 9" fill="none" stroke={accent} strokeWidth="4" />
    </svg>
  );
};

const SceneNode: React.FC<{
  kind: ArchitectureNodeKind;
  label: string;
  role: string;
  left: number;
  top?: number;
  opacity?: number;
  scale?: number;
  dimmed?: boolean;
}> = ({kind, label, role, left, top = diagram.rowTop, opacity = 1, scale = 1, dimmed = false}) => {
  const semantics = architectureNodeSemantics[kind];

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: provisionalColors.panel,
        borderColor: semantics.accent,
        borderRadius:
          semantics.shape === 'capsule' ? 999 : semantics.shape === 'stack' ? 14 : 25,
        borderStyle: semantics.shape === 'double-border' ? 'double' : 'solid',
        borderWidth: semantics.shape === 'double-border' ? 6 : 3,
        boxShadow:
          semantics.shape === 'stack'
            ? `inset 0 -10px 0 ${provisionalColors.panelRaised}`
            : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 9,
        height: 210,
        justifyContent: 'center',
        left,
        opacity: opacity * (dimmed ? 0.42 : 1),
        padding: 20,
        position: 'absolute',
        scale,
        top,
        width: 260,
      }}
    >
      <NodeGlyph kind={kind} accent={semantics.accent} />
      <div
        style={{
          fontSize: label.length > 12 ? 34 : 40,
          fontWeight: 800,
          lineHeight: 1.02,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: semantics.accent,
          fontSize: role.length > 17 ? 15 : 17,
          fontWeight: 800,
          letterSpacing: 1.5,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        {role}
      </div>
    </div>
  );
};

export const Scene01Mystery: React.FC<Scene01MysteryProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames: compositionDurationInFrames} = useVideoConfig();
  const sceneDurationInFrames = durationInFrames ?? compositionDurationInFrames;
  const seconds = frame / fps;
  const architectureOpacity = interpolate(
    seconds,
    [
      beats.architectureIn,
      beats.architectureIn + motionPresets.enterSoft.durationSeconds,
      beats.finalIn,
      beats.finalIn + motionPresets.exitSoft.durationSeconds,
    ],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const redisOpacity = interpolate(
    seconds,
    [beats.redisIn, beats.redisIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const redisScale = interpolate(
    seconds,
    [beats.redisIn, beats.redisIn + motionPresets.emphasizeScale.durationSeconds],
    [0.88, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const baselinePacketOpacity = interpolate(
    seconds,
    [
      beats.baselineMoveStart,
      beats.baselineMoveStart + 0.2,
      beats.baselineMoveEnd,
      beats.baselineMoveEnd + 0.2,
    ],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const secondPacketOpacity = interpolate(
    seconds,
    [
      beats.secondMoveStart,
      beats.secondMoveStart + 0.2,
      beats.secondMoveEnd,
      beats.secondMoveEnd + 0.2,
    ],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const baselinePacketLeft = interpolate(
    seconds,
    [beats.baselineMoveStart, beats.baselineMoveStart + 0.8, beats.baselineMoveEnd],
    [packetClientX, packetHubX, packetDatabaseX],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const secondPacketLeft = interpolate(
    seconds,
    [beats.secondMoveStart, beats.secondMoveMid, beats.secondMoveEnd],
    [packetClientX, packetHubX, packetHubX],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const secondPacketTop = interpolate(
    seconds,
    [beats.secondMoveStart, beats.secondMoveMid, beats.secondMoveEnd],
    [rowPacketTop, rowPacketTop, redisPacketTop],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const finalOpacity = interpolate(
    seconds,
    [beats.finalIn, beats.finalIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

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
        name="Request headline"
        style={{
          left: layout.safeHorizontal,
          opacity: interpolate(
            seconds,
            [
              beats.requestIn,
              beats.requestIn + motionPresets.enterSoft.durationSeconds,
              beats.finalIn,
              beats.finalIn + motionPresets.exitSoft.durationSeconds,
            ],
            [0, 1, 1, 0],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          position: 'absolute',
          top: 76,
          translate: `0 ${interpolate(
            seconds,
            [beats.requestIn, beats.requestIn + motionPresets.enterSoft.durationSeconds],
            [motionPresets.enterSoft.offsetPixels, 0],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}px`,
        }}
      >
        <div style={{color: theme.accent, ...typography.technicalLabel, marginBottom: 18, textTransform: 'uppercase'}}>
          {translate(language, 'mystery')}
        </div>
        <div
          style={{
            ...typography.code,
            backgroundColor: provisionalColors.panel,
            border: `2px solid ${provisionalColors.line}`,
            borderRadius: 14,
            color: provisionalColors.code,
            fontSize: 44,
            padding: '18px 28px',
          }}
        >
          GET /users/42
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Same request note"
        style={{
          color: theme.muted,
          fontSize: language === 'de' ? 29 : 32,
          fontWeight: 700,
          opacity: interpolate(
            seconds,
            [
              beats.sameRequestIn,
              beats.sameRequestIn + motionPresets.enterFast.durationSeconds,
              beats.finalIn,
              beats.finalIn + motionPresets.exitSoft.durationSeconds,
            ],
            [0, 1, 1, 0],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
          ),
          position: 'absolute',
          right: layout.safeHorizontal,
          textAlign: 'right',
          top: 124,
        }}
      >
        {translate(language, 'sameRequest')}
      </Interactive.Div>

      <div style={{opacity: architectureOpacity}}>
        <svg
          width={diagram.canvasWidth}
          height="1080"
          style={{left: 0, position: 'absolute', top: 0}}
        >
          <HorizontalArrow x1={clientRight} x2={applicationLeft} y={rowCenterY} color={provisionalColors.line} />
          <HorizontalArrow
            x1={applicationRight}
            x2={databaseLeft}
            y={rowCenterY}
            color={provisionalColors.line}
            opacity={1 - redisOpacity * 0.6}
            dashed={redisOpacity > 0.5}
          />
          <VerticalArrow
            x={hubX - 18}
            y1={diagram.rowTop}
            y2={redisBottom}
            color={architectureNodeSemantics.cache.accent}
            opacity={redisOpacity}
          />
          <VerticalArrow
            x={hubX + 18}
            y1={redisBottom}
            y2={diagram.rowTop}
            color={architectureNodeSemantics.cache.accent}
            opacity={redisOpacity * 0.8}
          />
        </svg>

        <SceneNode kind="client" label={translate(language, 'request')} role={translate(language, 'requestOrigin')} left={clientLeft} top={diagram.rowTop} />
        <SceneNode kind="application" label={translate(language, 'application')} role={translate(language, 'routingLogic')} left={applicationLeft} top={diagram.rowTop} />
        <SceneNode kind="cache" label="Redis" role={translate(language, 'fastLookup')} left={redisLeft} top={diagram.redisTop} opacity={redisOpacity} scale={redisScale} />
        <SceneNode kind="database" label={translate(language, 'database')} role={translate(language, 'sourceOfTruth')} left={databaseLeft} top={diagram.rowTop} dimmed={redisOpacity > 0.8 && seconds >= beats.secondMoveStart} />

        <div
          style={{
            alignItems: 'center',
            backgroundColor: theme.foreground,
            border: `5px solid ${theme.background}`,
            borderRadius: 999,
            color: theme.background,
            display: 'flex',
            fontSize: 19,
            fontWeight: 900,
            height: diagram.packetSize,
            justifyContent: 'center',
            left: baselinePacketLeft,
            opacity: baselinePacketOpacity,
            position: 'absolute',
            top: rowPacketTop,
            width: diagram.packetSize,
          }}
        >
          GET
        </div>
        <div
          style={{
            alignItems: 'center',
            backgroundColor: theme.foreground,
            border: `5px solid ${theme.background}`,
            borderRadius: 999,
            color: theme.background,
            display: 'flex',
            fontSize: 19,
            fontWeight: 900,
            height: diagram.packetSize,
            justifyContent: 'center',
            left: secondPacketLeft,
            opacity: secondPacketOpacity,
            position: 'absolute',
            top: secondPacketTop,
            width: diagram.packetSize,
          }}
        >
          GET
        </div>

        <Interactive.Div
          name="Baseline latency"
          style={{
            bottom: 100,
            left: layout.safeHorizontal,
            opacity: interpolate(
              seconds,
              [
                beats.baselineResultIn,
                beats.baselineResultIn + motionPresets.enterFast.durationSeconds,
                beats.fastResultIn,
                beats.fastResultIn + 0.35,
              ],
              [0, 1, 1, 0.45],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            ),
            position: 'absolute',
          }}
        >
          <div style={{color: theme.muted, ...typography.technicalLabel}}>
            {translate(language, 'beforeRedis')}
          </div>
          <div style={{color: provisionalColors.number, fontSize: 92, fontWeight: 900, lineHeight: 1.05}}>
            180 ms
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Fast latency"
          style={{
            bottom: 100,
            opacity: interpolate(
              seconds,
              [beats.fastResultIn, beats.fastResultIn + motionPresets.enterFast.durationSeconds],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            ),
            position: 'absolute',
            right: layout.safeHorizontal,
            scale: interpolate(
              seconds,
              [
                beats.fastResultIn,
                beats.fastResultIn + motionPresets.emphasizeScale.durationSeconds,
                beats.fastResultIn + 0.9,
              ],
              [0.88, motionPresets.emphasizeScale.peakScale, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            textAlign: 'right',
          }}
        >
          <div style={{color: theme.muted, ...typography.technicalLabel}}>
            {translate(language, 'afterRedis')}
          </div>
          <div style={{color: provisionalColors.success, fontSize: 112, fontWeight: 900, lineHeight: 1.05}}>
            8 ms
          </div>
        </Interactive.Div>
      </div>

      <Interactive.Div
        name="Final comparison"
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          inset: 0,
          justifyContent: 'center',
          opacity: finalOpacity,
          position: 'absolute',
          scale: interpolate(
            seconds,
            [beats.finalIn, beats.finalIn + motionPresets.emphasizeScale.durationSeconds],
            [0.96, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <div style={{color: theme.muted, ...typography.technicalLabel, marginBottom: 42}}>
          {translate(language, 'sameRequest')}
        </div>
        <div style={{alignItems: 'center', display: 'flex', gap: 44, whiteSpace: 'nowrap'}}>
          <span style={{color: provisionalColors.number, fontSize: 132, fontWeight: 900}}>180 ms</span>
          <span style={{color: theme.muted, fontSize: 96}}>→</span>
          <span style={{color: provisionalColors.success, fontSize: 150, fontWeight: 900}}>8 ms</span>
        </div>
        <div
          style={{
            color: theme.foreground,
            fontSize: language === 'de' ? 68 : 76,
            fontWeight: 800,
            marginTop: 58,
            opacity: interpolate(
              seconds,
              [beats.questionIn, beats.questionIn + motionPresets.enterSoft.durationSeconds],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            ),
            textAlign: 'center',
          }}
        >
          {translate(language, 'whatChanged')}
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
          Scene 01 · {Math.round(sceneDurationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
