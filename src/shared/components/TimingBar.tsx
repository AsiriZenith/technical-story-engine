import {theme} from '../styles/theme';
import {provisionalColors, typography} from '../styles/visual-system';

export type TimingBarSegment = {
  id: string;
  label: string;
  valueMs: number;
  color: string;
  textColor?: string;
  opacity?: number;
  emphasisScale?: number;
  calloutOpacity?: number;
};

export type TimingBarProps = {
  segments: readonly TimingBarSegment[];
  totalMs: number;
  widthPx: number;
  heightPx?: number;
  inlineLabelMinWidthPx?: number;
};

/**
 * Proportional timing bar: segment widths are linear against `totalMs`, so the
 * graphic never distorts the underlying values. Segments too narrow for inline
 * text rely on the caller-driven `calloutOpacity` to surface a floating label
 * above the bar instead of squeezing text into the block itself.
 */
export const TimingBar: React.FC<TimingBarProps> = ({
  segments,
  totalMs,
  widthPx,
  heightPx = 130,
  inlineLabelMinWidthPx = 220,
}) => {
  let cursor = 0;
  const laidOut = segments.map((segment) => {
    const segmentWidth = (segment.valueMs / totalMs) * widthPx;
    const left = cursor;
    cursor += segmentWidth;
    return {segment, left, width: segmentWidth};
  });

  return (
    <div style={{height: heightPx + 90, position: 'relative', width: widthPx}}>
      <div
        style={{
          borderRadius: 16,
          display: 'flex',
          height: heightPx,
          overflow: 'visible',
          position: 'absolute',
          top: 90,
          width: widthPx,
        }}
      >
        {laidOut.map(({segment, width}, index) => {
          const opacity = segment.opacity ?? 1;
          const emphasisScale = segment.emphasisScale ?? 1;
          const showInline = width >= inlineLabelMinWidthPx;

          return (
            <div
              key={segment.id}
              style={{
                alignItems: 'center',
                backgroundColor: segment.color,
                borderRight:
                  index < segments.length - 1 ? `2px solid ${theme.background}` : 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                opacity,
                position: 'relative',
                transform: `scaleY(${emphasisScale})`,
                transformOrigin: 'bottom',
                width,
              }}
            >
              {showInline ? (
                <>
                  <div
                    style={{
                      color: segment.textColor ?? theme.background,
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: 1,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    {segment.label}
                  </div>
                  <div
                    style={{
                      color: segment.textColor ?? theme.background,
                      fontSize: 48,
                      fontWeight: 900,
                    }}
                  >
                    {segment.valueMs} ms
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>

      {laidOut.map(({segment, left, width}) => {
        const calloutOpacity = segment.calloutOpacity ?? 0;

        if (calloutOpacity <= 0) {
          return null;
        }

        const centerX = left + width / 2;
        const calloutSafeMargin = 90;
        const calloutX = Math.min(
          Math.max(centerX, calloutSafeMargin),
          widthPx - calloutSafeMargin,
        );

        return (
          <div
            key={`${segment.id}-callout`}
            style={{
              left: calloutX,
              opacity: calloutOpacity,
              position: 'absolute',
              top: 0,
              transform: 'translateX(-50%)',
            }}
          >
            <div
              style={{
                backgroundColor: provisionalColors.panel,
                border: `2px solid ${segment.color}`,
                borderRadius: 10,
                color: theme.foreground,
                padding: '8px 16px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{...typography.technicalLabel, fontSize: 15}}>{segment.label}</div>
              <div style={{color: segment.color, fontSize: 26, fontWeight: 900}}>
                {segment.valueMs} ms
              </div>
            </div>
            <div
              style={{
                backgroundColor: segment.color,
                height: 90 - 58,
                margin: '0 auto',
                width: 2,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
