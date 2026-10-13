import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {architectureNodeSemantics} from '../../../shared/architecture/node-semantics';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {layout, provisionalColors, typography} from '../../../shared/styles/visual-system';

export type Scene11CacheEverythingProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds. Beats 1, 2 and 5 stay typographic (TASK-020: the
// joke is brief and purely typographic). Beats 3-4 are the TASK-020A
// "pile" diagram: one Redis node whose cached entries pile up, and the three
// costs show up on that same pile. The timings below track the real EN
// narration (scene window 11.63s, audio-derived): "cache everything" ~2.3s,
// "Not so fast" ~4.0s, "More memory… more stale data… more to keep in sync"
// ~5.5-9.5s, "and not every request is worth it" ~9.5-11.6s. The narration
// has no spoken decision-rule line: beat 5 appears as narration ends (11.63s)
// and holds through the scene window's 2s silent tail (13.63s).
const beats = {
  bridgeIn: 0.3,
  bridgeOut: 1.9,
  punchIn: 2.2,
  punchOut: 3.5,
  correctionIn: 3.7,
  correctionOut: 4.7,
  stageIn: 4.7, // Redis node + request stream arrive
  streamStart: 4.8, // first request dot leaves
  memoryCue: 5.5, // "More memory."
  staleCue: 6.7, // "More stale data."
  syncCue: 8.0, // "More to keep in sync."
  pileOut: 9.1,
  sortIn: 9.35, // "…not every request is worth it"
  sortOut: 11.2,
  decisionRuleIn: 11.4,
} as const;

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut} as const;

const windowOpacity = (
  seconds: number,
  start: number,
  end: number,
  fadeIn: number = motionPresets.enterSoft.durationSeconds,
  fadeOut: number = motionPresets.exitSoft.durationSeconds,
): number =>
  interpolate(seconds, [start, start + fadeIn, end, end + fadeOut], [0, 1, 1, 0], clampOpts);

const ramp = (seconds: number, start: number, end: number, from = 0, to = 1): number =>
  interpolate(seconds, [start, end], [from, to], clampOpts);

// Beat 1/5-style "soft fade + slight upward settle" treatment.
const CenteredLine: React.FC<{
  opacity: number;
  liftPixels: number;
  fontSize: number;
  fontWeight: number;
  color: string;
  children: React.ReactNode;
}> = ({opacity, liftPixels, fontSize, fontWeight, color, children}) => (
  <AbsoluteFill style={{alignItems: 'center', display: 'flex', justifyContent: 'center', pointerEvents: 'none'}}>
    <div
      style={{
        color,
        fontSize,
        fontWeight,
        lineHeight: 1.2,
        maxWidth: layout.maxTextWidth + 480,
        opacity,
        padding: `0 ${layout.safeHorizontal}px`,
        textAlign: 'center',
        translate: `0 ${liftPixels}px`,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

// --- Diagram geometry (1920x1080 canvas, drawn in one SVG) -----------------
const cacheAccent = architectureNodeSemantics.cache.accent;
const dbAccent = architectureNodeSemantics.database.accent;

const NODE = {x: 960, y: 700, w: 240, h: 150};
const DB = {x: 1480, y: 700};
const ENTRY = {w: 180, h: 26, pitch: 34, baseY: 598};
const entryCount = 9;
const entryCenterY = (i: number): number => ENTRY.baseY - i * ENTRY.pitch;
const insideFrame = 5; // entries 0-4 fit the frame; 5-8 overflow it

// Request stream: entries 0-4 arrive first, 5-8 arrive during "More memory."
const dotStart = (i: number): number =>
  i < insideFrame ? beats.streamStart + i * 0.15 : beats.memoryCue + (i - insideFrame) * 0.2;
const dotTravel = 0.45;
const dotFromX = 300;
const dotToX = 868;

const staleEntries = [1, 3, 6];
const tetheredEntries = [0, 2, 4, 6, 8];

const dist = (x1: number, y1: number, x2: number, y2: number): number => Math.hypot(x2 - x1, y2 - y1);

const StackGlyph: React.FC = () => (
  <g transform={`translate(${NODE.x - 28} ${NODE.y - 56})`}>
    {[0, 14, 28].map((y) => (
      <rect key={y} x="0" y={y} width="56" height="10" rx="5" fill={cacheAccent} />
    ))}
  </g>
);

const CylinderGlyph: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x - 44} ${y - 46})`} fill="none" stroke={dbAccent} strokeWidth="5">
    <ellipse cx="44" cy="14" rx="40" ry="12" />
    <path d="M4 14v62c0 7 18 12 40 12s40-5 40-12V14" />
    <path d="M4 42c0 7 18 12 40 12s40-5 40-12" strokeWidth="4" />
  </g>
);

// Position along the bypass lane (left -> right, then up into the database).
const bypassLane = {y: 820, endY: 772};
const bypassPoint = (p: number): {x: number; y: number} => {
  const horizontal = DB.x - dotFromX;
  const vertical = bypassLane.y - bypassLane.endY;
  const d = p * (horizontal + vertical);
  return d <= horizontal
    ? {x: dotFromX + d, y: bypassLane.y}
    : {x: DB.x, y: bypassLane.y - (d - horizontal)};
};

export const Scene11CacheEverything: React.FC<Scene11CacheEverythingProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const sceneEnd = durationInFrames / fps;

  // Beat 1 -- setup / bridge.
  const bridgeOpacity = windowOpacity(seconds, beats.bridgeIn, beats.bridgeOut, 0.5, 0.4);
  const bridgeLift = ramp(
    seconds,
    beats.bridgeIn,
    beats.bridgeIn + motionPresets.enterSoft.durationSeconds,
    motionPresets.enterSoft.offsetPixels,
    0,
  );

  // Beat 2 -- temptation + correction. Typographic only, unchanged
  // treatment (0.88 -> 1 scale-in, no bounce/spring).
  const punchOpacity = windowOpacity(seconds, beats.punchIn, beats.punchOut, 0.15, 0.2);
  const punchScale = ramp(seconds, beats.punchIn, beats.punchIn + motionPresets.emphasizeScale.durationSeconds, 0.88, 1);
  const correctionOpacity = windowOpacity(seconds, beats.correctionIn, beats.correctionOut, 0.2, 0.3);

  // Beat 3 -- the pile. Node persists through beat 4; pile/tethers retire first.
  // Beat 4: once the pile retires, the node/database/lanes glide up so the
  // sort beat sits mid-screen instead of low (TASK-020B).
  const stageShift = ramp(seconds, beats.pileOut, beats.sortIn + 0.4, 0, -170);
  const nodeOpacity = windowOpacity(seconds, beats.stageIn, beats.sortOut, 0.3, 0.35);
  const pileOpacity = windowOpacity(seconds, beats.stageIn, beats.pileOut, 0.3, 0.4);

  // Memory: the frame warns once entries overflow it.
  const frameWarn = ramp(seconds, beats.memoryCue + 0.5, beats.memoryCue + 1.3);

  // Sync: database + tethers.
  const dbOpacity = Math.max(
    windowOpacity(seconds, beats.syncCue - 0.1, beats.pileOut, 0.3, 0.4),
    windowOpacity(seconds, beats.sortIn, beats.sortOut, 0.3, 0.35),
  );

  // Costs caption: three phrases light up on their spoken cue.
  const costPhrases = translate(language, 'cacheEverythingCosts').split(/(?<=[.!?])\s+/);
  const costCues = [beats.memoryCue, beats.staleCue, beats.syncCue];
  const costsCaptionOpacity = windowOpacity(seconds, beats.stageIn + 0.4, beats.pileOut, 0.3, 0.4);

  // Beat 4 -- sort: light requests bypass the cache, one heavy repeated
  // request is the one that is cached.
  const sortOpacity = windowOpacity(seconds, beats.sortIn, beats.sortOut, 0.3, 0.35);
  const heavyProgress = ramp(seconds, beats.sortIn + 0.15, beats.sortIn + 0.85);
  const nodeSortPulse = interpolate(
    seconds,
    [beats.sortIn + 0.85, beats.sortIn + 1.05, beats.sortIn + 1.3],
    [1, 1.05, 1],
    clampOpts,
  );
  const lightRequests = [0.1, 0.3].map((delay) => ramp(seconds, beats.sortIn + delay, beats.sortIn + delay + 0.8));

  // Beat 5 -- decision rule, held to the scene's own duration boundary.
  const decisionRuleOpacity = windowOpacity(seconds, beats.decisionRuleIn, sceneEnd, 0.4, 0.4);
  const decisionRuleScale = ramp(
    seconds,
    beats.decisionRuleIn,
    beats.decisionRuleIn + motionPresets.emphasizeScale.durationSeconds,
    0.96,
    1,
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
      <CenteredLine
        opacity={bridgeOpacity}
        liftPixels={bridgeLift}
        fontSize={typography.sectionHeading.fontSize}
        fontWeight={typography.sectionHeading.fontWeight}
        color={theme.muted}
      >
        {translate(language, 'cacheEverythingBridge')}
      </CenteredLine>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          opacity: punchOpacity,
          pointerEvents: 'none',
          scale: punchScale,
        }}
      >
        <div
          style={{
            color: theme.accent,
            fontSize: typography.display.fontSize,
            fontWeight: typography.display.fontWeight,
            lineHeight: typography.display.lineHeight,
            padding: `0 ${layout.safeHorizontal}px`,
            textAlign: 'center',
          }}
        >
          {translate(language, 'cacheEverythingPunch')}
        </div>
      </AbsoluteFill>

      <CenteredLine
        opacity={correctionOpacity}
        liftPixels={0}
        fontSize={typography.sectionHeading.fontSize}
        fontWeight={typography.sectionHeading.fontWeight}
        color={theme.foreground}
      >
        {translate(language, 'cacheEverythingCorrection')}
      </CenteredLine>

      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{left: 0, position: 'absolute', top: 0}}
        aria-hidden="true"
      >
        {/* Redis node -- persists through beats 3-4. */}
        <g
          opacity={nodeOpacity}
          transform={`translate(0 ${stageShift}) translate(${NODE.x} ${NODE.y}) scale(${nodeSortPulse}) translate(${-NODE.x} ${-NODE.y})`}
        >
          <rect
            x={NODE.x - NODE.w / 2}
            y={NODE.y - NODE.h / 2}
            width={NODE.w}
            height={NODE.h}
            rx="22"
            fill={provisionalColors.panel}
            stroke={cacheAccent}
            strokeWidth="3"
          />
          <StackGlyph />
          <text
            x={NODE.x}
            y={NODE.y + 52}
            fill={theme.foreground}
            fontSize="34"
            fontWeight="800"
            textAnchor="middle"
          >
            Redis
          </text>
        </g>

        {/* Beat 3 pile: capacity frame, request dots, entries, tethers. */}
        <g opacity={pileOpacity}>
          <rect
            x={NODE.x - ENTRY.w / 2 - 14}
            y={entryCenterY(insideFrame - 1) - ENTRY.h / 2 - 8}
            width={ENTRY.w + 28}
            height={(insideFrame - 1) * ENTRY.pitch + ENTRY.h + 16}
            rx="14"
            fill="none"
            stroke={provisionalColors.line}
            strokeDasharray="10 8"
            strokeWidth="3"
          />
          <rect
            x={NODE.x - ENTRY.w / 2 - 14}
            y={entryCenterY(insideFrame - 1) - ENTRY.h / 2 - 8}
            width={ENTRY.w + 28}
            height={(insideFrame - 1) * ENTRY.pitch + ENTRY.h + 16}
            rx="14"
            fill="none"
            opacity={frameWarn}
            stroke={provisionalColors.warning}
            strokeDasharray="10 8"
            strokeWidth="3"
          />

          {tetheredEntries.map((i, k) => {
            const x1 = NODE.x + ENTRY.w / 2;
            const y1 = entryCenterY(i);
            const x2 = DB.x - 50;
            const y2 = DB.y - 20 + (tetheredEntries.length - 1 - k) * 10;
            const length = dist(x1, y1, x2, y2);
            const draw = ramp(seconds, beats.syncCue + k * 0.1, beats.syncCue + k * 0.1 + 0.5);
            return (
              <line
                key={`tether-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={provisionalColors.code}
                strokeDasharray={length}
                strokeDashoffset={length * (1 - draw)}
                strokeLinecap="round"
                strokeWidth="3"
                opacity={0.7}
              />
            );
          })}

          {Array.from({length: entryCount}, (_, i) => {
            const start = dotStart(i);
            const arrive = start + dotTravel;
            const dotProgress = ramp(seconds, start, arrive);
            const dotOpacity = interpolate(seconds, [start, start + 0.1, arrive - 0.05, arrive + 0.1], [0, 1, 1, 0], clampOpts);
            const entryOpacity = ramp(seconds, arrive - 0.1, arrive + 0.15);
            const staleIndex = staleEntries.indexOf(i);
            const stale = staleIndex >= 0 ? ramp(seconds, beats.staleCue + staleIndex * 0.25, beats.staleCue + staleIndex * 0.25 + 0.4) : 0;
            const y = entryCenterY(i);
            return (
              <g key={`entry-${i}`}>
                <circle cx={dotFromX + (dotToX - dotFromX) * dotProgress} cy={y} r="9" fill={theme.foreground} opacity={dotOpacity} />
                <g opacity={entryOpacity}>
                  <rect
                    x={NODE.x - ENTRY.w / 2}
                    y={y - ENTRY.h / 2}
                    width={ENTRY.w}
                    height={ENTRY.h}
                    rx={ENTRY.h / 2}
                    fill={cacheAccent}
                    opacity={1 - stale}
                  />
                  <rect
                    x={NODE.x - ENTRY.w / 2}
                    y={y - ENTRY.h / 2}
                    width={ENTRY.w}
                    height={ENTRY.h}
                    rx={ENTRY.h / 2}
                    fill="none"
                    opacity={stale}
                    stroke={provisionalColors.warning}
                    strokeDasharray="8 6"
                    strokeWidth="3"
                  />
                </g>
              </g>
            );
          })}
        </g>

        {/* Database -- appears for "keep in sync", returns for the sort beat. */}
        <g opacity={dbOpacity} transform={`translate(0 ${stageShift})`}>
          <CylinderGlyph x={DB.x} y={DB.y} />
        </g>

        {/* Beat 4: lanes, light requests (bypass), heavy request (cached). */}
        <g opacity={sortOpacity} transform={`translate(0 ${stageShift})`}>
          <line
            x1={dotFromX}
            y1={NODE.y}
            x2={NODE.x - NODE.w / 2}
            y2={NODE.y}
            stroke={provisionalColors.line}
            strokeDasharray="10 8"
            strokeWidth="3"
          />
          <polyline
            points={`${dotFromX},${bypassLane.y} ${DB.x},${bypassLane.y} ${DB.x},${bypassLane.endY}`}
            fill="none"
            stroke={provisionalColors.line}
            strokeDasharray="10 8"
            strokeWidth="3"
          />
          {lightRequests.map((p, k) => {
            const point = bypassPoint(p);
            return <circle key={`light-${k}`} cx={point.x} cy={point.y} r="10" fill={theme.muted} opacity={p > 0 && p < 1 ? 1 : 0} />;
          })}
          <rect
            x={dotFromX + (NODE.x - 56 - dotFromX) * heavyProgress}
            y={NODE.y - 22}
            width="112"
            height="44"
            rx="10"
            fill={provisionalColors.number}
            opacity={heavyProgress > 0 ? 1 - ramp(heavyProgress, 0.7, 1) : 0}
          />
        </g>
      </svg>

      {/* Beat 3 caption: the costs sentence, phrase by phrase on its cue. */}
      <AbsoluteFill style={{alignItems: 'center', display: 'flex', justifyContent: 'flex-end', pointerEvents: 'none'}}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 24px',
            justifyContent: 'center',
            marginBottom: layout.captionBottom + 36,
            maxWidth: layout.maxTextWidth + 480,
            opacity: costsCaptionOpacity,
            padding: `0 ${layout.safeHorizontal}px`,
          }}
        >
          {costPhrases.map((phrase, i) => (
            <span
              key={phrase}
              style={{
                color: theme.foreground,
                fontSize: typography.sectionHeading.fontSize - 12,
                fontWeight: 700,
                lineHeight: 1.2,
                opacity: ramp(seconds, costCues[i] ?? costCues[costCues.length - 1], (costCues[i] ?? 0) + 0.3, 0.3, 1),
              }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </AbsoluteFill>

      {/* Beat 4 caption. */}
      <AbsoluteFill style={{alignItems: 'center', display: 'flex', justifyContent: 'flex-end', pointerEvents: 'none'}}>
        <div
          style={{
            color: theme.foreground,
            fontSize: typography.body.fontSize,
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: layout.captionBottom + 20,
            maxWidth: layout.maxTextWidth + 200,
            opacity: sortOpacity,
            padding: `0 ${layout.safeHorizontal}px`,
            textAlign: 'center',
          }}
        >
          {translate(language, 'cacheEverythingNotEveryRequest')}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          opacity: decisionRuleOpacity,
          pointerEvents: 'none',
          scale: decisionRuleScale,
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
          {translate(language, 'cacheEverythingDecisionRule')}
        </div>
      </AbsoluteFill>

      {debug ? (
        <Interactive.Div
          name="Scene 11 debug"
          style={{
            bottom: 28,
            color: theme.muted,
            fontSize: 18,
            left: layout.safeHorizontal,
            opacity: 0.55,
            position: 'absolute',
          }}
        >
          Scene 11 - {Math.round(durationInFrames / fps)}s
        </Interactive.Div>
      ) : null}
    </AbsoluteFill>
  );
};
