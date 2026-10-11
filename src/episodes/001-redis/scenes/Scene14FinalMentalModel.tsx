import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  architectureNodeSemantics,
  type ArchitectureNodeKind,
} from '../../../shared/architecture/node-semantics';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {layout, provisionalColors, typography} from '../../../shared/styles/visual-system';

export type Scene14FinalMentalModelProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Option A (TASK-026): a simplified rebuild of
// Scene 01's node/packet diagram, replayed as the episode's closing
// bookend -- first the slow (uncached) path, then the fast (cache-hit)
// path, then the closing question.
// TASK-029: re-timed against the real EN narration (scene-relative; narration
// starts at 0s) after this scene was extended from 14.0s to the audio-derived
// 20.77s window. Comments quote the spoken phrase each beat tracks.
const beats = {
  diagramIn: 0.5, // "Here's the mental model to keep." (0.1-2.3s)
  withoutCachingIn: 2.3, // "Without caching," (2.4s)
  slowPacketStart: 3.1,
  slowPacketAppArrive: 3.9, // "application," (3.8s)
  slowPacketDbArrive: 5.0, // "database," (4.9s)
  expensiveWorkIn: 5.0,
  expensiveWorkOut: 6.9, // "expensive work," (5.8-7.0s)
  slowResponseIn: 7.1, // "response." (7.2s)
  slowGroupOut: 8.3,
  redisIn: 8.4,
  cacheHitIn: 8.6, // "With a cache hit," (8.4s)
  fastPacketStart: 9.3,
  fastPacketAppArrive: 10.1, // "application," (10.0s)
  fastPacketRedisArrive: 11.2, // "straight to Redis," (11.1s)
  fastResponseIn: 12.4, // "and back." (12.4s)
  fastGroupOut: 13.8,
  questionIn: 14.5, // "The real question to ask about any cache." (13.4s) ... "What work did it let you stop doing?" (16.3s)
} as const;

// The closing question holds through the scene's own duration boundary --
// the same "land at the cutoff" technique Scenes 08-13 use, and this
// being the episode's final beat, there is no exit to animate toward
// (see enterOpacity below).

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

// A fade-in that holds at full opacity forever after -- used for the
// diagram group and the closing question, both of which stay on screen
// through the scene's own duration boundary rather than fading out.
const enterOpacity = (seconds: number, start: number, fadeIn: number): number =>
  interpolate(seconds, [start, start + fadeIn], [0, 1], {
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

// Simplified local diagram grammar -- Scene 01's own SceneNode/NodeGlyph/
// arrow components are not shared/exported, so this file re-implements a
// trimmed copy (no role subtitle, no dimmed-node styling variants beyond
// the one needed here), the same "re-implement, don't extract" pattern
// Scene 13 already used for its own central node.
const diagram = {
  canvasWidth: 1920,
  nodeWidth: 250,
  nodeHeight: 180,
  rowTop: 560,
  redisTop: 300,
  packetSize: 40,
} as const;

const nodeCenterX = (left: number) => left + diagram.nodeWidth / 2;

const requestLeft = layout.safeHorizontal;
const databaseLeft = diagram.canvasWidth - layout.safeHorizontal - diagram.nodeWidth;
const applicationLeft = diagram.canvasWidth / 2 - diagram.nodeWidth / 2;
const redisLeft = applicationLeft;
const hubX = nodeCenterX(applicationLeft);
const requestRight = requestLeft + diagram.nodeWidth;
const applicationRight = applicationLeft + diagram.nodeWidth;
const redisBottom = diagram.redisTop + diagram.nodeHeight;

const rowCenterY = diagram.rowTop + diagram.nodeHeight / 2;
const redisCenterY = diagram.redisTop + diagram.nodeHeight / 2;
const rowPacketTop = rowCenterY - diagram.packetSize / 2;
const redisPacketTop = redisCenterY - diagram.packetSize / 2;
const packetRequestX = nodeCenterX(requestLeft) - diagram.packetSize / 2;
const packetHubX = hubX - diagram.packetSize / 2;
const packetDatabaseX = nodeCenterX(databaseLeft) - diagram.packetSize / 2;

const HorizontalArrow: React.FC<{
  x1: number;
  x2: number;
  y: number;
  color: string;
  opacity?: number;
  dashed?: boolean;
}> = ({x1, x2, y, color, opacity = 1, dashed = false}) => (
  <>
    <line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke={color}
      strokeWidth={5}
      opacity={opacity}
      strokeDasharray={dashed ? '12 12' : undefined}
    />
    <polygon points={`${x2 - 20},${y - 11} ${x2},${y} ${x2 - 20},${y + 11}`} fill={color} opacity={opacity} />
  </>
);

const VerticalArrow: React.FC<{x: number; y1: number; y2: number; color: string; opacity?: number}> = ({
  x,
  y1,
  y2,
  color,
  opacity = 1,
}) => (
  <>
    <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth={5} opacity={opacity} />
    <polygon points={`${x - 11},${y2 + 20} ${x},${y2} ${x + 11},${y2 + 20}`} fill={color} opacity={opacity} />
  </>
);

const NodeGlyph: React.FC<{kind: ArchitectureNodeKind; accent: string}> = ({kind, accent}) => {
  if (kind === 'database') {
    return (
      <svg width="46" height="38" viewBox="0 0 66 52" aria-hidden="true">
        <ellipse cx="33" cy="10" rx="27" ry="8" fill="none" stroke={accent} strokeWidth="4" />
        <path d="M6 10v30c0 4 12 8 27 8s27-4 27-8V10" fill="none" stroke={accent} strokeWidth="4" />
        <path d="M6 25c0 4 12 8 27 8s27-4 27-8" fill="none" stroke={accent} strokeWidth="3" />
      </svg>
    );
  }

  if (kind === 'cache') {
    return (
      <svg width="46" height="38" viewBox="0 0 66 52" aria-hidden="true">
        {[7, 21, 35].map((y) => (
          <rect key={y} x="7" y={y} width="52" height="10" rx="5" fill={accent} />
        ))}
      </svg>
    );
  }

  if (kind === 'application') {
    return (
      <svg width="46" height="38" viewBox="0 0 66 52" aria-hidden="true">
        <path d="M24 8 9 26l15 18M42 8l15 18-15 18" fill="none" stroke={accent} strokeWidth="5" />
      </svg>
    );
  }

  return (
    <svg width="46" height="38" viewBox="0 0 66 52" aria-hidden="true">
      <circle cx="23" cy="26" r="15" fill="none" stroke={accent} strokeWidth="4" />
      <path d="M36 26h22m-9-9 9 9-9 9" fill="none" stroke={accent} strokeWidth="4" />
    </svg>
  );
};

const SceneNode: React.FC<{
  kind: ArchitectureNodeKind;
  label: string;
  left: number;
  top?: number;
  opacity?: number;
  scale?: number;
  dimmed?: boolean;
}> = ({kind, label, left, top = diagram.rowTop, opacity = 1, scale = 1, dimmed = false}) => {
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
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: diagram.nodeHeight,
        justifyContent: 'center',
        left,
        opacity: opacity * (dimmed ? 0.42 : 1),
        padding: 18,
        position: 'absolute',
        scale,
        top,
        width: diagram.nodeWidth,
      }}
    >
      <NodeGlyph kind={kind} accent={semantics.accent} />
      <div style={{fontSize: 32, fontWeight: 800, lineHeight: 1.02, textAlign: 'center'}}>{label}</div>
    </div>
  );
};

// The "expensive work happening" beat -- three dots pulsing in sequence
// beneath the Database node while the request is on the slow path.
const WorkingDots: React.FC<{seconds: number; start: number}> = ({seconds, start}) => {
  const period = 0.6;
  const local = seconds - start;
  const dotOpacity = (index: number) => {
    const phase = ((local - index * 0.15) % period + period) % period;
    return interpolate(phase, [0, period * 0.3, period * 0.6], [0.3, 1, 0.3], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    });
  };

  return (
    <div style={{alignItems: 'center', display: 'flex', gap: 10}}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          style={{
            backgroundColor: architectureNodeSemantics.database.accent,
            borderRadius: 999,
            height: 14,
            opacity: local >= 0 ? dotOpacity(index) : 0,
            width: 14,
          }}
        />
      ))}
    </div>
  );
};

const PathLabel: React.FC<{opacity: number; children: React.ReactNode}> = ({opacity, children}) => (
  <div
    style={{
      color: theme.accent,
      left: '50%',
      opacity,
      position: 'absolute',
      textAlign: 'center',
      top: 90,
      translate: '-50% 0',
      ...typography.technicalLabel,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

export const Scene14FinalMentalModel: React.FC<Scene14FinalMentalModelProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  // The diagram fades out before the closing question appears -- the same
  // sequencing Scene 01 uses for its own architecture diagram vs. its
  // final comparison text, rather than overlaying the question on top of
  // a still-visible diagram.
  const diagramOpacity = windowOpacity(seconds, beats.diagramIn, beats.questionIn, 0.6, 0.45);

  const withoutCachingOpacity = windowOpacity(seconds, beats.withoutCachingIn, beats.slowGroupOut, 0.4, 0.35);
  const cacheHitOpacity = windowOpacity(seconds, beats.cacheHitIn, beats.fastGroupOut, 0.4, 0.35);

  // Slow path: Request -> Application -> Database (a forward trip only --
  // the same "no animated return leg" convention Scene 01's baseline
  // packet already established; the response is indicated by the chip
  // near the Request node, not a second packet trip).
  const slowPacketOpacity = interpolate(
    seconds,
    [beats.slowPacketStart, beats.slowPacketStart + 0.2, beats.slowPacketDbArrive, beats.slowPacketDbArrive + 0.2],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const slowPacketLeft = interpolate(
    seconds,
    [beats.slowPacketStart, beats.slowPacketAppArrive, beats.slowPacketDbArrive],
    [packetRequestX, packetHubX, packetDatabaseX],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const expensiveWorkOpacity = windowOpacity(seconds, beats.expensiveWorkIn, beats.expensiveWorkOut, 0.15, 0.25);
  const slowResponseOpacity = windowOpacity(seconds, beats.slowResponseIn, beats.slowGroupOut, 0.3, 0.35);

  // Fast path: Redis fades in above Application (mirroring Scene 01's own
  // Redis entrance), Database dims to show it is skipped, and the packet
  // travels the short Request -> Application -> Redis route.
  const redisOpacity = interpolate(
    seconds,
    [beats.redisIn, beats.redisIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const redisScale = interpolate(
    seconds,
    [beats.redisIn, beats.redisIn + motionPresets.emphasizeScale.durationSeconds],
    [0.88, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const databaseDimmed = redisOpacity > 0.5 && seconds >= beats.cacheHitIn;

  const fastPacketOpacity = interpolate(
    seconds,
    [
      beats.fastPacketStart,
      beats.fastPacketStart + 0.15,
      beats.fastPacketRedisArrive,
      beats.fastPacketRedisArrive + 0.15,
    ],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const fastPacketLeft = interpolate(
    seconds,
    [beats.fastPacketStart, beats.fastPacketAppArrive, beats.fastPacketRedisArrive],
    [packetRequestX, packetHubX, packetHubX],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const fastPacketTop = interpolate(
    seconds,
    [beats.fastPacketStart, beats.fastPacketAppArrive, beats.fastPacketRedisArrive],
    [rowPacketTop, rowPacketTop, redisPacketTop],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const fastResponseOpacity = windowOpacity(seconds, beats.fastResponseIn, beats.fastGroupOut, 0.25, 0.35);

  const questionOpacity = enterOpacity(seconds, beats.questionIn, 0.6);
  const questionScale = interpolate(
    seconds,
    [beats.questionIn, beats.questionIn + motionPresets.emphasizeScale.durationSeconds],
    [0.94, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
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
      <div style={{opacity: diagramOpacity}}>
        <PathLabel opacity={withoutCachingOpacity}>
          {translate(language, 'finalMentalModelWithoutCaching')}
        </PathLabel>
        <PathLabel opacity={cacheHitOpacity}>{translate(language, 'finalMentalModelCacheHit')}</PathLabel>

        <svg width={diagram.canvasWidth} height="1080" style={{left: 0, position: 'absolute', top: 0}}>
          <HorizontalArrow x1={requestRight} x2={applicationLeft} y={rowCenterY} color={provisionalColors.line} />
          <HorizontalArrow
            x1={applicationRight}
            x2={databaseLeft}
            y={rowCenterY}
            color={provisionalColors.line}
            opacity={1 - redisOpacity * 0.6}
            dashed={redisOpacity > 0.5}
          />
          <VerticalArrow
            x={hubX - 16}
            y1={diagram.rowTop}
            y2={redisBottom}
            color={architectureNodeSemantics.cache.accent}
            opacity={redisOpacity}
          />
        </svg>

        <SceneNode kind="client" label={translate(language, 'request')} left={requestLeft} />
        <SceneNode kind="application" label={translate(language, 'application')} left={applicationLeft} />
        <SceneNode
          kind="cache"
          label="Redis"
          left={redisLeft}
          top={diagram.redisTop}
          opacity={redisOpacity}
          scale={redisScale}
        />
        <SceneNode
          kind="database"
          label={translate(language, 'database')}
          left={databaseLeft}
          dimmed={databaseDimmed}
        />

        <div
          style={{
            alignItems: 'center',
            backgroundColor: theme.foreground,
            borderRadius: 999,
            display: 'flex',
            height: diagram.packetSize,
            justifyContent: 'center',
            left: slowPacketLeft,
            opacity: slowPacketOpacity,
            position: 'absolute',
            top: rowPacketTop,
            width: diagram.packetSize,
          }}
        />
        <div
          style={{
            alignItems: 'center',
            backgroundColor: theme.foreground,
            borderRadius: 999,
            display: 'flex',
            height: diagram.packetSize,
            justifyContent: 'center',
            left: fastPacketLeft,
            opacity: fastPacketOpacity,
            position: 'absolute',
            top: fastPacketTop,
            width: diagram.packetSize,
          }}
        />

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            left: nodeCenterX(databaseLeft),
            opacity: expensiveWorkOpacity,
            position: 'absolute',
            textAlign: 'center',
            top: diagram.rowTop + diagram.nodeHeight + 26,
            translate: '-50% 0',
          }}
        >
          <WorkingDots seconds={seconds} start={beats.expensiveWorkIn} />
          <div
            style={{
              color: architectureNodeSemantics.database.accent,
              fontSize: 20,
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {translate(language, 'finalMentalModelExpensiveWork')}
          </div>
        </div>

        <div
          style={{
            color: provisionalColors.success,
            fontSize: 22,
            fontWeight: 800,
            left: nodeCenterX(requestLeft),
            opacity: Math.max(slowResponseOpacity, fastResponseOpacity),
            position: 'absolute',
            textAlign: 'center',
            textTransform: 'uppercase',
            top: diagram.rowTop + diagram.nodeHeight + 30,
            translate: '-50% 0',
          }}
        >
          {translate(language, 'finalMentalModelResponse')}
        </div>
      </div>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          opacity: questionOpacity,
          pointerEvents: 'none',
          scale: questionScale,
        }}
      >
        <div
          style={{
            backgroundColor: theme.background,
            color: theme.foreground,
            fontSize: typography.sceneTitle.fontSize,
            fontWeight: typography.sceneTitle.fontWeight,
            lineHeight: typography.sceneTitle.lineHeight,
            maxWidth: layout.maxTextWidth + 480,
            padding: `24px ${layout.safeHorizontal}px`,
            textAlign: 'center',
          }}
        >
          {translate(language, 'finalMentalModelQuestion')}
        </div>
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
          Scene 14 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
