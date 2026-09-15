import {Img} from 'remotion';

// Normalized target region, expressed as fractions (0-1) of the rendered
// image's own box — not fixed canvas pixels. This keeps a spotlight valid
// regardless of the canvas resolution it's used at, as long as the caller's
// `objectFit: 'cover'` box has the same aspect ratio as the source asset (see
// the per-scene comment on that assumption where each SpotlightImage is
// used).
export type SpotlightRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SpotlightImageProps = {
  src: string;
  // Shared scale applied to the whole transformed wrapper (e.g. a slow
  // push-in). Both image layers and any `children` overlay live inside this
  // one transform, so they can never drift apart.
  scale?: number;
  // CSS object-fit for both image layers. Defaults to 'cover' (the original
  // behavior, correct when the container and source asset share an aspect
  // ratio). Pass 'contain' for an asset whose aspect ratio doesn't match its
  // container, so the spotlight doesn't crop the image differently than a
  // plain, non-spotlit <Img> would. Normalized `region` coordinates are
  // always fractions of this same objectFit box, whichever value is used.
  objectFit?: 'cover' | 'contain';
  region: SpotlightRegion;
  // 0 = no spotlight (both layers read identically, image is at full,
  // uniform brightness — the "before" state). 1 = full spotlight (area
  // outside `region` is dimmed to `dimBrightness`, area inside stays at
  // normal brightness).
  spotlightOpacity: number;
  // Brightness multiplier applied outside the spotlighted region at peak
  // (spotlightOpacity === 1).
  dimBrightness?: number;
  // How much larger the soft feather mask is than the target region itself,
  // as a multiple of the region's own size. Larger values produce a softer,
  // more gradual falloff instead of a crisp rectangular edge.
  featherPaddingFactor?: number;
  children?: React.ReactNode;
};

const clamp01 = (value: number): number => Math.min(Math.max(value, 0), 1);

// A reusable "dim everything, keep one region bright" highlight. Two copies
// of the same image are stacked: a base layer whose brightness is driven
// down as `spotlightOpacity` rises, and a masked top layer (full brightness,
// same image, same sizing) that only shows through an elliptical soft-edged
// mask centered on `region`. Using a radial-gradient CSS mask instead of a
// hard `clip-path` avoids a harsh rectangular edge. No border, no glow, no
// drawn shape — the "highlight" is the source artwork itself staying bright
// while its surroundings dim.
export const SpotlightImage: React.FC<SpotlightImageProps> = ({
  src,
  scale = 1,
  objectFit = 'cover',
  region,
  spotlightOpacity,
  dimBrightness = 0.58,
  featherPaddingFactor = 1.35,
  children,
}) => {
  const opacity = clamp01(spotlightOpacity);
  const brightness = 1 - opacity * (1 - dimBrightness);

  const sharedImageStyle: React.CSSProperties = {
    display: 'block',
    height: '100%',
    objectFit,
    width: '100%',
  };

  const centerXPct = (region.x + region.width / 2) * 100;
  const centerYPct = (region.y + region.height / 2) * 100;
  const maskWidthPct = region.width * 100 * featherPaddingFactor;
  const maskHeightPct = region.height * 100 * featherPaddingFactor;

  const maskImage =
    `radial-gradient(ellipse ${maskWidthPct}% ${maskHeightPct}% at ${centerXPct}% ${centerYPct}%, ` +
    'rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)';

  return (
    <div
      style={{
        height: '100%',
        position: 'relative',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        width: '100%',
      }}
    >
      <Img
        src={src}
        style={{
          ...sharedImageStyle,
          filter: `brightness(${brightness})`,
        }}
      />
      <div
        style={{
          WebkitMaskImage: maskImage,
          WebkitMaskRepeat: 'no-repeat',
          height: '100%',
          left: 0,
          maskImage,
          maskRepeat: 'no-repeat',
          opacity,
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      >
        <Img src={src} style={sharedImageStyle} />
      </div>
      {children}
    </div>
  );
};
