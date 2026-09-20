import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {layout, typography} from '../../../shared/styles/visual-system';

export type Scene11CacheEverythingProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds, per the TASK-019/020-approved 5-beat plan. Unlike
// Scenes 07-10, this scene is fully Remotion-native (Option D from
// TASK-019): no image asset, no SpotlightImage. Scene 01 is the visual
// precedent -- centered text blocks, typography tokens, theme colors, and
// the existing motionPresets/interpolate() vocabulary, nothing new.
const beats = {
  bridgeIn: 0.4,
  bridgeOut: 2.0,
  punchIn: 2.4,
  punchOut: 3.3,
  correctionIn: 3.4,
  correctionOut: 4.2,
  costsIn: 4.6,
  costsOut: 6.8,
  notEveryRequestIn: 7.2,
  notEveryRequestOut: 9.0,
  decisionRuleIn: 9.4,
} as const;

// The closing beat's window ends exactly at the scene's own duration
// boundary (11.0s), the same "land at the cutoff" technique Scenes 08/09/10
// use for their own closing lines, so it never visibly fades before the hard
// Sequence cut.
const decisionRuleEnd = 11.0;

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

// Beat 1/3/4's shared "soft fade + slight upward settle" treatment.
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

export const Scene11CacheEverything: React.FC<Scene11CacheEverythingProps> = ({
  language,
  durationInFrames,
  debug = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  // Beat 1 -- setup / bridge: soft fade + slight upward settle, ease-out.
  const bridgeOpacity = windowOpacity(seconds, beats.bridgeIn, beats.bridgeOut, 0.5, 0.4);
  const bridgeLift = interpolate(
    seconds,
    [beats.bridgeIn, beats.bridgeIn + motionPresets.enterSoft.durationSeconds],
    [motionPresets.enterSoft.offsetPixels, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Beat 2 -- temptation + correction: quick scale-in punch (0.88 -> 1, no
  // bounce/spring), then an immediate crossfade to a small, muted correction
  // line. Whole beat stays under ~2s total (2.4s-4.2s), per the task's
  // explicit humor-timing rule.
  const punchOpacity = windowOpacity(seconds, beats.punchIn, beats.punchOut, 0.15, 0.2);
  const punchScale = interpolate(
    seconds,
    [beats.punchIn, beats.punchIn + motionPresets.emphasizeScale.durationSeconds],
    [0.88, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const correctionOpacity = windowOpacity(seconds, beats.correctionIn, beats.correctionOut, 0.2, 0.3);

  // Beat 3 -- costs: plain centered text, no cards/chips/badges.
  const costsOpacity = windowOpacity(seconds, beats.costsIn, beats.costsOut, 0.35, 0.35);
  const costsLift = interpolate(
    seconds,
    [beats.costsIn, beats.costsIn + motionPresets.enterSoft.durationSeconds],
    [motionPresets.enterSoft.offsetPixels, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Beat 4 -- not every request qualifies (folds in "misses still happen").
  const notEveryRequestOpacity = windowOpacity(
    seconds,
    beats.notEveryRequestIn,
    beats.notEveryRequestOut,
    0.35,
    0.35,
  );
  const notEveryRequestLift = interpolate(
    seconds,
    [beats.notEveryRequestIn, beats.notEveryRequestIn + motionPresets.enterSoft.durationSeconds],
    [motionPresets.enterSoft.offsetPixels, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Beat 5 -- decision rule / closing: slightly more visual weight than
  // Beats 3-4 (sceneTitle-scale, not body-scale), gentle fade + scale,
  // holding to the scene's own duration boundary.
  const decisionRuleOpacity = windowOpacity(seconds, beats.decisionRuleIn, decisionRuleEnd, 0.4, 0.4);
  const decisionRuleScale = interpolate(
    seconds,
    [beats.decisionRuleIn, beats.decisionRuleIn + motionPresets.emphasizeScale.durationSeconds],
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

      <CenteredLine
        opacity={costsOpacity}
        liftPixels={costsLift}
        fontSize={typography.sectionHeading.fontSize}
        fontWeight={typography.sectionHeading.fontWeight}
        color={theme.foreground}
      >
        {translate(language, 'cacheEverythingCosts')}
      </CenteredLine>

      <CenteredLine
        opacity={notEveryRequestOpacity}
        liftPixels={notEveryRequestLift}
        fontSize={typography.body.fontSize}
        fontWeight={700}
        color={theme.foreground}
      >
        {translate(language, 'cacheEverythingNotEveryRequest')}
      </CenteredLine>

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
            color: theme.foreground,
            fontSize: typography.sceneTitle.fontSize,
            fontWeight: typography.sceneTitle.fontWeight,
            lineHeight: typography.sceneTitle.lineHeight,
            maxWidth: layout.maxTextWidth + 480,
            padding: `0 ${layout.safeHorizontal}px`,
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
