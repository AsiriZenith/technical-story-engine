import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {architectureNodeSemantics} from '../../../shared/architecture/node-semantics';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {layout, provisionalColors, typography} from '../../../shared/styles/visual-system';

export type Scene13CacheCostsProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds, per the TASK-023/024-approved 6-beat plan. Fully
// Remotion-native (Option D from TASK-023): a small central Redis node
// stays on screen from Beat 2 onward while exactly one of four callouts
// (Freshness / Capacity / Resilience / Operations) is active around it at
// a time -- no arrows, no connecting lines, no dense grid.
const beats = {
  bridgeIn: 0.4,
  bridgeOut: 2.4,
  nodeIn: 2.8,
  freshnessIn: 2.8,
  freshnessOut: 5.6,
  capacityIn: 6.0,
  capacityOut: 8.4,
  resilienceIn: 8.8,
  resilienceOut: 11.2,
  operationsIn: 11.6,
  operationsOut: 14.0,
  closingIn: 14.4,
} as const;

// The closing beat's window ends exactly at the scene's own duration
// boundary (16.0s), the same "land at the cutoff" technique Scenes 08-12
// use for their own closing lines.
const closingEnd = 16.0;

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

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

// A simplified version of Scene 01's cache-node stack icon, kept file-local
// (Scene 01's own NodeGlyph is not exported/shared). Deliberately not a
// detailed Redis logo -- just the same three-bar stack shape at the
// project's existing cache accent color.
const StackIcon: React.FC<{accent: string}> = ({accent}) => (
  <svg width="40" height="32" viewBox="0 0 66 52" aria-hidden="true">
    {[7, 21, 35].map((y) => (
      <rect key={y} x="7" y={y} width="52" height="10" rx="5" fill={accent} />
    ))}
  </svg>
);

// The central "Redis" node: icon + label, modeled directly on Scene 01's
// cache-node treatment (same accent, same stack shape), simplified and
// kept file-local to this scene.
const CentralNode: React.FC<{opacity: number; scale: number}> = ({opacity, scale}) => (
  <div
    style={{
      alignItems: 'center',
      backgroundColor: provisionalColors.panel,
      border: `3px solid ${architectureNodeSemantics.cache.accent}`,
      borderRadius: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      opacity,
      padding: '22px 30px',
      scale,
    }}
  >
    <StackIcon accent={architectureNodeSemantics.cache.accent} />
    <div style={{color: theme.foreground, fontSize: 34, fontWeight: 800}}>Redis</div>
  </div>
);

type CalloutPosition = 'top' | 'right' | 'bottom' | 'left';

const calloutOffset: Record<CalloutPosition, {x: number; y: number}> = {
  top: {x: 0, y: -260},
  right: {x: 460, y: 0},
  bottom: {x: 0, y: 260},
  left: {x: -460, y: 0},
};

// One reusable callout component for all four categories -- label + one
// short caption, positioned around the central node. No icon grid, no
// card border, no connecting line back to the node; proximity and timing
// (the node's own pulse) carry the relationship instead.
const Callout: React.FC<{
  position: CalloutPosition;
  opacity: number;
  label: string;
  caption: string;
}> = ({position, opacity, label, caption}) => {
  const {x, y} = calloutOffset[position];
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        left: '50%',
        maxWidth: 520,
        opacity,
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        translate: `calc(-50% + ${x}px) calc(-50% + ${y}px)`,
      }}
    >
      <div style={{color: architectureNodeSemantics.cache.accent, ...typography.technicalLabel, textTransform: 'uppercase'}}>
        {label}
      </div>
      <div style={{color: theme.foreground, fontSize: 30, fontWeight: 700, lineHeight: 1.3}}>{caption}</div>
    </div>
  );
};

// A dim, label-only echo of a callout for the closing beat, so the four
// categories stay faintly present without competing with the closing line.
const AmbientLabel: React.FC<{position: CalloutPosition; opacity: number; label: string}> = ({
  position,
  opacity,
  label,
}) => {
  const {x, y} = calloutOffset[position];
  return (
    <div
      style={{
        color: theme.muted,
        left: '50%',
        opacity,
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        translate: `calc(-50% + ${x}px) calc(-50% + ${y}px)`,
        ...typography.technicalLabel,
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
  );
};

export const Scene13CacheCosts: React.FC<Scene13CacheCostsProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  // Beat 1 -- bridge.
  const bridgeOpacity = windowOpacity(seconds, beats.bridgeIn, beats.bridgeOut, 0.5, 0.4);
  const bridgeLift = interpolate(
    seconds,
    [beats.bridgeIn, beats.bridgeIn + motionPresets.enterSoft.durationSeconds],
    [motionPresets.enterSoft.offsetPixels, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Central node: fades/settles in once at Beat 2 and stays for the rest
  // of the scene.
  const nodeOpacity = interpolate(
    seconds,
    [beats.nodeIn, beats.nodeIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // One small ease-out scale pulse on the central node, timed to each
  // callout's entrance -- no arrows/connecting lines carry the
  // relationship, timing and proximity do.
  const pulseStarts = [beats.freshnessIn, beats.capacityIn, beats.resilienceIn, beats.operationsIn];
  const pulseDuration = motionPresets.emphasizeScale.durationSeconds;
  const nodePulseScale = Math.max(
    1,
    ...pulseStarts.map((start) =>
      interpolate(seconds, [start, start + pulseDuration / 2, start + pulseDuration], [1, 1.06, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: easeOut,
      }),
    ),
  );

  // Beats 2-5 -- exactly one callout fully active at a time; windows are
  // non-overlapping (each ends at least 0.4s before the next begins).
  const freshnessOpacity = windowOpacity(seconds, beats.freshnessIn, beats.freshnessOut, 0.35, 0.35);
  const capacityOpacity = windowOpacity(seconds, beats.capacityIn, beats.capacityOut, 0.35, 0.35);
  const resilienceOpacity = windowOpacity(seconds, beats.resilienceIn, beats.resilienceOut, 0.35, 0.35);
  const operationsOpacity = windowOpacity(seconds, beats.operationsIn, beats.operationsOut, 0.35, 0.35);

  // Beat 6 -- closing: all four labels settle to a low ambient opacity so
  // they stay faintly present without competing with the closing line.
  const ambientOpacity = windowOpacity(seconds, beats.closingIn, closingEnd, 0.4, 0.1) * 0.35;
  const closingOpacity = windowOpacity(seconds, beats.closingIn, closingEnd, 0.4, 0.4);
  const closingScale = interpolate(
    seconds,
    [beats.closingIn, beats.closingIn + motionPresets.emphasizeScale.durationSeconds],
    [0.96, 1],
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
      <CenteredLine
        opacity={bridgeOpacity}
        liftPixels={bridgeLift}
        fontSize={typography.sectionHeading.fontSize}
        fontWeight={typography.sectionHeading.fontWeight}
        color={theme.muted}
      >
        {translate(language, 'cacheCostsBridge')}
      </CenteredLine>

      <AbsoluteFill style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
        <CentralNode opacity={nodeOpacity} scale={nodePulseScale} />
      </AbsoluteFill>

      <Callout
        position="top"
        opacity={freshnessOpacity}
        label={translate(language, 'cacheCostsFreshness')}
        caption={translate(language, 'cacheCostsFreshnessCaption')}
      />
      <Callout
        position="right"
        opacity={capacityOpacity}
        label={translate(language, 'cacheCostsCapacity')}
        caption={translate(language, 'cacheCostsCapacityCaption')}
      />
      <Callout
        position="bottom"
        opacity={resilienceOpacity}
        label={translate(language, 'cacheCostsResilience')}
        caption={translate(language, 'cacheCostsResilienceCaption')}
      />
      <Callout
        position="left"
        opacity={operationsOpacity}
        label={translate(language, 'cacheCostsOperations')}
        caption={translate(language, 'cacheCostsOperationsCaption')}
      />

      <AmbientLabel position="top" opacity={ambientOpacity} label={translate(language, 'cacheCostsFreshness')} />
      <AmbientLabel position="right" opacity={ambientOpacity} label={translate(language, 'cacheCostsCapacity')} />
      <AmbientLabel position="bottom" opacity={ambientOpacity} label={translate(language, 'cacheCostsResilience')} />
      <AmbientLabel position="left" opacity={ambientOpacity} label={translate(language, 'cacheCostsOperations')} />

      <AbsoluteFill
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          opacity: closingOpacity,
          pointerEvents: 'none',
          scale: closingScale,
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
          {translate(language, 'cacheCostsClosing')}
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
          Scene 13 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
