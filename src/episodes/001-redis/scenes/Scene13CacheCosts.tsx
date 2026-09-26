import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
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

// Scene-relative seconds. Same 6-beat/16s timeline approved under
// TASK-023/024; TASK-025e (Option A rebuild) only replaces what happens
// visually inside beats 2-5, not the overall scene length or sequencing,
// so the shared episode timeline (episode.config.ts) is unaffected.
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
// (Scene 01's own NodeGlyph is not exported/shared).
const StackIcon: React.FC<{accent: string}> = ({accent}) => (
  <svg width="40" height="32" viewBox="0 0 66 52" aria-hidden="true">
    {[7, 21, 35].map((y) => (
      <rect key={y} x="7" y={y} width="52" height="10" rx="5" fill={accent} />
    ))}
  </svg>
);

// A simplified version of Scene 01's cylinder database icon, kept
// file-local -- only appears for one beat (Resilience), so it stays a
// small inline glyph rather than a full SceneNode.
const CylinderIcon: React.FC<{accent: string}> = ({accent}) => (
  <svg width="34" height="28" viewBox="0 0 66 52" aria-hidden="true">
    <ellipse cx="33" cy="10" rx="27" ry="8" fill="none" stroke={accent} strokeWidth="4" />
    <path d="M6 10v30c0 4 12 8 27 8s27-4 27-8V10" fill="none" stroke={accent} strokeWidth="4" />
    <path d="M6 25c0 4 12 8 27 8s27-4 27-8" fill="none" stroke={accent} strokeWidth="3" />
  </svg>
);

// The central "Redis" node. During the Resilience beat it dims (a cache
// miss/failure) and then returns to its settled state -- the one
// node-settle/return-to-state beat in this scene, so `opacity`/`scale`
// arrive here already blended with a `spring()` return by the caller,
// per the standing rule: spring() for return-to-state, interpolate()
// everywhere else.
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

// Shared positioning wrapper for one category's diagram + caption group.
// Replaces the old label-only Callout: the diagram is now the thing that
// carries the idea, the caption underneath is one short supporting line.
const CategoryVignette: React.FC<{
  position: CalloutPosition;
  opacity: number;
  label: string;
  caption: string;
  children: React.ReactNode;
}> = ({position, opacity, label, caption, children}) => {
  const {x, y} = calloutOffset[position];
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        left: '50%',
        maxWidth: 460,
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
      {children}
      <div style={{color: theme.foreground, fontSize: 26, fontWeight: 700, lineHeight: 1.3}}>{caption}</div>
    </div>
  );
};

// Freshness: a cached-value chip with a depleting countdown ring around
// it. `ringProgress` is 0 (fresh) -> 1 (fully stale) across the beat's
// held window; the ring color and the chip itself both shift once the
// value has gone stale, so staleness is something that visibly happens,
// not just a label that says "expiration."
const FreshnessRing: React.FC<{ringProgress: number}> = ({ringProgress}) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const isStale = ringProgress > 0.66;
  const ringColor = isStale ? provisionalColors.warning : architectureNodeSemantics.cache.accent;

  return (
    <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', position: 'relative'}}>
      <svg width="112" height="112" viewBox="0 0 112 112" style={{transform: 'rotate(-90deg)'}}>
        <circle cx="56" cy="56" r={radius} fill="none" stroke={provisionalColors.line} strokeWidth="8" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * ringProgress}
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
      <div
        style={{
          alignItems: 'center',
          color: isStale ? provisionalColors.warning : provisionalColors.code,
          display: 'flex',
          fontSize: 15,
          fontWeight: 800,
          inset: 0,
          justifyContent: 'center',
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        {isStale ? 'stale' : 'fresh'}
      </div>
    </div>
  );
};

// Capacity: a memory bar that fills as entries are cached, then evicts
// its oldest block (slides out, fades) once the bar reaches capacity --
// "memory usage" and "not infinite" shown as pressure, not stated in
// text.
const CapacityBar: React.FC<{fillProgress: number; evictProgress: number}> = ({
  fillProgress,
  evictProgress,
}) => {
  const barWidth = 220;
  const barHeight = 26;

  return (
    <div style={{position: 'relative'}}>
      <div
        style={{
          backgroundColor: provisionalColors.panel,
          border: `2px solid ${provisionalColors.line}`,
          borderRadius: barHeight / 2,
          height: barHeight,
          overflow: 'hidden',
          position: 'relative',
          width: barWidth,
        }}
      >
        {/* scaleX (not an animated `width`) keeps this on transform/opacity, per the animate/review-animations GPU-property rule. */}
        <div
          style={{
            backgroundColor: architectureNodeSemantics.cache.accent,
            borderRadius: barHeight / 2,
            height: '100%',
            scale: `${fillProgress} 1`,
            transformOrigin: 'left',
            width: barWidth,
          }}
        />
        {evictProgress > 0 ? (
          <div
            style={{
              backgroundColor: provisionalColors.warning,
              borderRadius: barHeight / 2,
              height: '100%',
              left: 0,
              opacity: 1 - evictProgress,
              position: 'absolute',
              top: 0,
              translate: `${evictProgress * 70}px 0`,
              width: barWidth * 0.22,
            }}
          />
        ) : null}
      </div>
      <div style={{color: theme.muted, fontSize: 15, fontWeight: 700, marginTop: 10, textTransform: 'uppercase'}}>
        memory
      </div>
    </div>
  );
};

// Resilience: the central node dims (cache miss/failure) while a request
// packet reroutes past it, straight to a Database node that only exists
// for this beat -- then the packet fades and the central node returns.
// The `spring()` return is applied to the node itself by the parent
// component (per the standing rule); this component only draws the
// reroute path.
const ResilienceReroute: React.FC<{
  packetOpacity: number;
  packetProgress: number;
  databaseOpacity: number;
}> = ({packetOpacity, packetProgress, databaseOpacity}) => {
  const pathLength = 150;
  return (
    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{height: 40, position: 'relative', width: pathLength}}>
        <svg width={pathLength} height="4" style={{position: 'absolute', top: 18}}>
          <line
            x1={0}
            y1={2}
            x2={pathLength}
            y2={2}
            stroke={provisionalColors.line}
            strokeDasharray="10 8"
            strokeWidth={3}
          />
        </svg>
        <div
          style={{
            alignItems: 'center',
            backgroundColor: theme.foreground,
            borderRadius: 999,
            color: theme.background,
            display: 'flex',
            fontSize: 13,
            fontWeight: 900,
            height: 28,
            justifyContent: 'center',
            left: packetProgress * (pathLength - 28),
            opacity: packetOpacity,
            position: 'absolute',
            top: 4,
            width: 28,
          }}
        >
          GET
        </div>
      </div>
      <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 6, opacity: databaseOpacity}}>
        <CylinderIcon accent={architectureNodeSemantics.database.accent} />
        <div style={{color: architectureNodeSemantics.database.accent, fontSize: 14, fontWeight: 800, textTransform: 'uppercase'}}>
          database
        </div>
      </div>
    </div>
  );
};

// Operations: a pulsing signal ring plus a status readout -- a heartbeat
// motif for "someone has to watch it, something has to run it."
const OperationsHeartbeat: React.FC<{pulseScale: number}> = ({pulseScale}) => (
  <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 10}}>
    <div
      style={{
        alignItems: 'center',
        border: `3px solid ${provisionalColors.success}`,
        borderRadius: 999,
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        scale: pulseScale,
        width: 60,
      }}
    >
      <div style={{backgroundColor: provisionalColors.success, borderRadius: 999, height: 16, width: 16}} />
    </div>
    <div style={{color: provisionalColors.success, fontSize: 14, fontWeight: 800, textTransform: 'uppercase'}}>
      monitoring
    </div>
  </div>
);

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
  const nodeEnterOpacity = interpolate(
    seconds,
    [beats.nodeIn, beats.nodeIn + motionPresets.enterSoft.durationSeconds],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // A small ease-out scale pulse on the central node for the Freshness,
  // Capacity, and Operations beats -- proximity and timing carry the
  // relationship, no arrows/connecting lines. The Resilience beat gets
  // its own dim + spring()-return treatment below instead of a pulse.
  const pulseStarts = [beats.freshnessIn, beats.capacityIn, beats.operationsIn];
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

  // Resilience beat: the node dims via interpolate() (a state change, not
  // a settle), then returns to its resting state via spring() once the
  // beat ends -- the standing rule's one spring() beat in this scene.
  const resilienceDimEnd = beats.resilienceIn + 0.5;
  const nodeDimFactor = interpolate(
    seconds,
    [beats.resilienceIn, resilienceDimEnd, beats.resilienceOut],
    [1, 0.32, 0.32],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const resilienceReturnFrame = Math.round(beats.resilienceOut * fps);
  const resilienceReturnSpring = spring({
    config: {damping: 14, mass: 0.6, stiffness: 120},
    fps,
    frame: frame - resilienceReturnFrame,
  });
  const nodeResilienceFactor =
    seconds < beats.resilienceOut ? nodeDimFactor : 0.32 + resilienceReturnSpring * 0.68;

  const nodeOpacity = nodeEnterOpacity * nodeResilienceFactor;
  const nodeScale = nodePulseScale * (0.9 + nodeResilienceFactor * 0.1);

  // Beats 2-5 -- exactly one category vignette fully active at a time;
  // windows are non-overlapping (each ends at least 0.4s before the next
  // begins).
  const freshnessOpacity = windowOpacity(seconds, beats.freshnessIn, beats.freshnessOut, 0.35, 0.35);
  const capacityOpacity = windowOpacity(seconds, beats.capacityIn, beats.capacityOut, 0.35, 0.35);
  const resilienceOpacity = windowOpacity(seconds, beats.resilienceIn, beats.resilienceOut, 0.35, 0.35);
  const operationsOpacity = windowOpacity(seconds, beats.operationsIn, beats.operationsOut, 0.35, 0.35);

  // Freshness ring: depletes across the held part of its window, past the
  // entrance fade and before the exit fade.
  const freshnessRingProgress = interpolate(
    seconds,
    [beats.freshnessIn + 0.5, beats.freshnessOut - 0.4],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Capacity bar: fills across the first ~60% of its held window, then
  // evicts its oldest block across the remainder.
  const capacityFillProgress = interpolate(
    seconds,
    [beats.capacityIn + 0.4, beats.capacityIn + 1.8],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const capacityEvictProgress = interpolate(
    seconds,
    [beats.capacityIn + 1.9, beats.capacityOut - 0.4],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Resilience reroute: the packet travels from the node's side of the
  // path to the temporary Database node, then both fade before the
  // node's spring()-return above takes over.
  const reroutePacketOpacity = interpolate(
    seconds,
    [beats.resilienceIn + 0.3, beats.resilienceIn + 0.5, beats.resilienceOut - 0.5, beats.resilienceOut - 0.2],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const reroutePacketProgress = interpolate(
    seconds,
    [beats.resilienceIn + 0.3, beats.resilienceOut - 0.5],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const rerouteDatabaseOpacity = windowOpacity(seconds, beats.resilienceIn + 0.2, beats.resilienceOut - 0.3, 0.3, 0.3);

  // Operations heartbeat: a short repeating pulse, active only while the
  // beat is on screen.
  const heartbeatPeriod = 0.9;
  const heartbeatLocal = ((seconds - beats.operationsIn) % heartbeatPeriod + heartbeatPeriod) % heartbeatPeriod;
  const heartbeatPulseScale = interpolate(
    heartbeatLocal,
    [0, heartbeatPeriod * 0.3, heartbeatPeriod],
    [1, 1.16, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Beat 6 -- closing. Per TASK-025d/025e, Option A's per-category
  // vignettes retire in sequence rather than settling into a lingering
  // ambient state, so the closing beat is just the takeaway line -- the
  // old AmbientLabel treatment (and the partial-visibility issue it
  // caused, decisions.md item 3) no longer applies.
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
        <CentralNode opacity={nodeOpacity} scale={nodeScale} />
      </AbsoluteFill>

      <CategoryVignette
        position="top"
        opacity={freshnessOpacity}
        label={translate(language, 'cacheCostsFreshness')}
        caption={translate(language, 'cacheCostsFreshnessCaption')}
      >
        <FreshnessRing ringProgress={freshnessRingProgress} />
      </CategoryVignette>

      <CategoryVignette
        position="right"
        opacity={capacityOpacity}
        label={translate(language, 'cacheCostsCapacity')}
        caption={translate(language, 'cacheCostsCapacityCaption')}
      >
        <CapacityBar fillProgress={capacityFillProgress} evictProgress={capacityEvictProgress} />
      </CategoryVignette>

      <CategoryVignette
        position="bottom"
        opacity={resilienceOpacity}
        label={translate(language, 'cacheCostsResilience')}
        caption={translate(language, 'cacheCostsResilienceCaption')}
      >
        <ResilienceReroute
          packetOpacity={reroutePacketOpacity}
          packetProgress={reroutePacketProgress}
          databaseOpacity={rerouteDatabaseOpacity}
        />
      </CategoryVignette>

      <CategoryVignette
        position="left"
        opacity={operationsOpacity}
        label={translate(language, 'cacheCostsOperations')}
        caption={translate(language, 'cacheCostsOperationsCaption')}
      >
        <OperationsHeartbeat pulseScale={heartbeatPulseScale} />
      </CategoryVignette>

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
