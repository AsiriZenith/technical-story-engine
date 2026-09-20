import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {translate, type Language} from '../../../shared/localization';
import {motionPresets} from '../../../shared/motion/presets';
import {theme} from '../../../shared/styles/theme';
import {layout, provisionalColors, typography} from '../../../shared/styles/visual-system';

export type Scene12StaleCacheProps = {
  language: Language;
  durationInFrames: number;
  // Shows the development scene-duration caption. Production compositions
  // must never pass this; only DEV compositions should opt in.
  debug?: boolean;
};

// Scene-relative seconds, per the TASK-021/022-approved 6-beat plan. Fully
// Remotion-native (Option D from TASK-021), continuing Scene 11's no-image
// visual language with a second use case: a two-card Database-vs-Redis
// value comparison, both cards held on screen together so the divergence
// is simultaneous, not just narrated.
const beats = {
  bridgeIn: 0.4,
  bridgeOut: 2.0,
  cardsIn: 2.4,
  dbCrossfadeStart: 3.2,
  dbCrossfadeEnd: 3.6,
  databaseCaptionOut: 4.6,
  redisIn: 5.0,
  redisCaptionOut: 7.2,
  pulseStart: 7.6,
  responseIn: 7.8,
  fastResponseCaptionOut: 9.4,
  cardsOut: 9.4,
  jokeIn: 9.6,
  jokeOut: 10.8,
  takeawayIn: 11.0,
} as const;

// The closing beat's window ends exactly at the scene's own duration
// boundary (13.0s), the same "land at the cutoff" technique Scenes
// 08-11 use for their own closing lines.
const takeawayEnd = 13.0;

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

const DATABASE_OLD_EMAIL = 'alice.old@example.com';
const DATABASE_NEW_EMAIL = 'alice.new@example.com';
const REDIS_OLD_EMAIL = 'alice.old@example.com';

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

// A small, file-local value card: label + role + value, modeled on Scene
// 01's SceneNode shape (icon/value + role label). Not a new shared
// primitive -- kept local to this scene, matching Scene 11's own
// file-local CenteredLine helper.
const ValueCard: React.FC<{
  label: string;
  role: string;
  roleColor: string;
  opacity: number;
  children: React.ReactNode;
}> = ({label, role, roleColor, opacity, children}) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      opacity,
      width: 460,
    }}
  >
    <div style={{color: theme.foreground, fontSize: typography.sectionHeading.fontSize, fontWeight: 800}}>
      {label}
    </div>
    <div style={{color: roleColor, ...typography.technicalLabel, textTransform: 'uppercase'}}>{role}</div>
    <div
      style={{
        backgroundColor: provisionalColors.panel,
        border: `2px solid ${provisionalColors.line}`,
        borderRadius: 14,
        color: provisionalColors.code,
        padding: '16px 22px',
        position: 'relative',
      }}
    >
      {children}
    </div>
  </div>
);

// Same-position crossfade layer: two stacked absolute spans occupying the
// identical box, one fading out as the other fades in -- no bounce, no
// hard cut, no whole-card motion.
const CrossfadeValue: React.FC<{oldOpacity: number; newOpacity: number}> = ({
  oldOpacity,
  newOpacity,
}) => (
  <div style={{...typography.code, position: 'relative', whiteSpace: 'nowrap'}}>
    <span style={{opacity: 0}}>{DATABASE_NEW_EMAIL}</span>
    <span style={{left: 0, opacity: oldOpacity, position: 'absolute', top: 0}}>{DATABASE_OLD_EMAIL}</span>
    <span style={{left: 0, opacity: newOpacity, position: 'absolute', top: 0}}>{DATABASE_NEW_EMAIL}</span>
  </div>
);

// A caption line anchored near the bottom of frame, used for the three
// mid-scene beats where the value cards occupy the vertical center -- kept
// as a plain positioned block (no BottomCaption gradient scrim, since
// there is no photographic image here for a scrim to protect, per
// TASK-021 Section 14).
const BottomLine: React.FC<{opacity: number; children: React.ReactNode}> = ({opacity, children}) => (
  <div
    style={{
      bottom: 120,
      color: theme.foreground,
      fontSize: typography.body.fontSize,
      fontWeight: 700,
      left: 0,
      lineHeight: 1.3,
      opacity,
      padding: `0 ${layout.safeHorizontal}px`,
      pointerEvents: 'none',
      position: 'absolute',
      textAlign: 'center',
      width: 1920,
    }}
  >
    {children}
  </div>
);

export const Scene12StaleCache: React.FC<Scene12StaleCacheProps> = ({
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

  // Both cards fade in once and stay held through Beat 4, then fade out
  // together before the text-only joke/takeaway beats.
  const databaseCardOpacity = windowOpacity(seconds, beats.cardsIn, beats.cardsOut, 0.4, 0.4);
  const redisCardOpacity = windowOpacity(seconds, beats.redisIn, beats.cardsOut, 0.4, 0.4);

  // Database value same-position crossfade (Beat 2): old -> new, no
  // whole-card animation.
  const dbNewOpacity = interpolate(
    seconds,
    [beats.dbCrossfadeStart, beats.dbCrossfadeEnd],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const dbOldOpacity = interpolate(
    seconds,
    [beats.dbCrossfadeStart, beats.dbCrossfadeEnd],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  // Beat 4 -- brief Redis emphasis pulse (scale only, no new shape/arrow)
  // plus a small returned-value indicator.
  const redisPulseScale = interpolate(
    seconds,
    [
      beats.pulseStart,
      beats.pulseStart + motionPresets.emphasizeScale.durationSeconds / 2,
      beats.pulseStart + motionPresets.emphasizeScale.durationSeconds,
    ],
    [1, 1.06, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );
  const responseOpacity = windowOpacity(seconds, beats.responseIn, beats.fastResponseCaptionOut, 0.3, 0.35);

  // Beat 5 -- joke: calm, wry, brief.
  const jokeOpacity = windowOpacity(seconds, beats.jokeIn, beats.jokeOut, 0.3, 0.3);

  // Beat 6 -- takeaway: slightly more visual weight, holds to the scene's
  // own duration boundary.
  const takeawayOpacity = windowOpacity(seconds, beats.takeawayIn, takeawayEnd, 0.4, 0.4);
  const takeawayScale = interpolate(
    seconds,
    [beats.takeawayIn, beats.takeawayIn + motionPresets.emphasizeScale.durationSeconds],
    [0.96, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut},
  );

  const captionOpacity = (
    start: number,
    end: number,
    fadeIn = 0.35,
    fadeOut = 0.35,
  ): number => windowOpacity(seconds, start, end, fadeIn, fadeOut);

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
        {translate(language, 'staleCacheBridge')}
      </CenteredLine>

      <AbsoluteFill style={{alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{alignItems: 'flex-start', display: 'flex', gap: 64, justifyContent: 'center'}}>
          <ValueCard
            label="Database"
            role={translate(language, 'staleCacheRoleCurrent')}
            roleColor={provisionalColors.success}
            opacity={databaseCardOpacity}
          >
            <CrossfadeValue oldOpacity={dbOldOpacity} newOpacity={dbNewOpacity} />
          </ValueCard>

          <div style={{scale: redisPulseScale}}>
            <ValueCard
              label="Redis"
              role={translate(language, 'staleCacheRoleCachedCopy')}
              roleColor={provisionalColors.warning}
              opacity={redisCardOpacity}
            >
              <div style={{...typography.code, whiteSpace: 'nowrap'}}>{REDIS_OLD_EMAIL}</div>
            </ValueCard>
          </div>
        </div>

        <div
          style={{
            color: provisionalColors.warning,
            fontSize: 26,
            fontWeight: 800,
            marginTop: 44,
            opacity: responseOpacity,
            textAlign: 'center',
          }}
        >
          {REDIS_OLD_EMAIL}
        </div>
      </AbsoluteFill>

      <BottomLine opacity={captionOpacity(beats.cardsIn, beats.databaseCaptionOut, 0.4, 0.35)}>
        {translate(language, 'staleCacheDatabaseChanges')}
      </BottomLine>

      <BottomLine opacity={captionOpacity(beats.redisIn, beats.redisCaptionOut)}>
        {translate(language, 'staleCacheRedisOld')}
      </BottomLine>

      <BottomLine opacity={captionOpacity(beats.responseIn - 0.2, beats.fastResponseCaptionOut)}>
        {translate(language, 'staleCacheFastResponse')}
      </BottomLine>

      <CenteredLine
        opacity={jokeOpacity}
        liftPixels={0}
        fontSize={typography.sectionHeading.fontSize}
        fontWeight={typography.sectionHeading.fontWeight}
        color={theme.foreground}
      >
        {translate(language, 'staleCacheJoke')}
      </CenteredLine>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          opacity: takeawayOpacity,
          pointerEvents: 'none',
          scale: takeawayScale,
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
          {translate(language, 'staleCacheTakeaway')}
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
          Scene 12 - {Math.round(durationInFrames / fps)}s
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
