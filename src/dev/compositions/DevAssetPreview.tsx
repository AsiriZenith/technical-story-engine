import {AbsoluteFill, Img, staticFile} from 'remotion';
import {
  listAssetCandidates,
  resolveAsset,
  type ResolvedAsset,
} from '../../episodes/001-redis/asset-resolver';
import type {RedisAssetId} from '../../episodes/001-redis/assets';
import {theme} from '../../shared/styles/theme';
import {layout, provisionalColors, typography} from '../../shared/styles/visual-system';

export type DevAssetPreviewProps = {
  assetId: RedisAssetId;
};

const statusColor = {
  placeholder: provisionalColors.placeholder,
  candidate: provisionalColors.warning,
  approved: provisionalColors.success,
} as const;

const dimensionsLabel = (asset: ResolvedAsset): string =>
  asset.dimensions ? `${asset.dimensions.width} × ${asset.dimensions.height}` : 'not available';

const aspectLabel = (asset: ResolvedAsset): string =>
  asset.aspectRatio ? asset.aspectRatio.toFixed(2) : 'not available';

const PreviewSurface: React.FC<{asset: ResolvedAsset}> = ({asset}) => (
  <div
    style={{
      alignItems: 'center',
      backgroundColor: '#d9e0e8',
      backgroundImage: 'conic-gradient(#fff 25%, #d9e0e8 0 50%, #fff 0 75%, #d9e0e8 0)',
      backgroundSize: '42px 42px',
      borderRadius: 22,
      display: 'flex',
      height: 500,
      justifyContent: 'center',
      overflow: 'hidden',
      width: 940,
    }}
  >
    {asset.path && asset.type === 'image' ? (
      <Img
        name="Selected manifest image"
        src={staticFile(asset.path)}
        style={{height: '100%', objectFit: 'contain', width: '100%'}}
      />
    ) : (
      <div
        style={{
          backgroundColor: 'rgba(8, 17, 31, 0.9)',
          borderRadius: 18,
          color: theme.foreground,
          padding: '30px 38px',
          textAlign: 'center',
        }}
      >
        <div style={{...typography.sectionHeading}}>{asset.candidateName}</div>
        <div style={{color: theme.muted, marginTop: 12, ...typography.caption}}>
          {asset.type === 'video' ? 'VIDEO PREVIEW CONTRACT' : 'PLACEHOLDER PREVIEW SLOT'}
        </div>
      </div>
    )}
  </div>
);

export const DevAssetPreview: React.FC<DevAssetPreviewProps> = ({assetId}) => {
  const selected = resolveAsset(assetId);
  const candidates = listAssetCandidates(assetId);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        padding: `${layout.safeVertical}px ${layout.safeHorizontal}px`,
      }}
    >
      <div style={{alignItems: 'start', display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <div style={{color: theme.accent, ...typography.technicalLabel}}>DEV / ASSET REVIEW</div>
          <div style={{marginTop: 18, ...typography.sceneTitle}}>{selected.id}</div>
        </div>
        <div
          style={{
            backgroundColor: statusColor[selected.status],
            borderRadius: 999,
            padding: '14px 22px',
            textTransform: 'uppercase',
            ...typography.status,
          }}
        >
          {selected.status}
        </div>
      </div>

      <div style={{display: 'flex', gap: layout.diagramGutter, marginTop: 42}}>
        <PreviewSurface asset={selected} />
        <div style={{width: 590}}>
          <div style={{color: theme.muted, ...typography.technicalLabel}}>SELECTED CANDIDATE</div>
          <div style={{fontSize: 42, fontWeight: 750, marginTop: 14}}>{selected.candidateName}</div>
          <div style={{marginTop: 24, ...typography.caption}}>{selected.description}</div>
          <div
            style={{
              borderTop: `2px solid ${provisionalColors.line}`,
              marginTop: 26,
              paddingTop: 22,
              ...typography.caption,
            }}
          >
            Type: {selected.type}
            <br />
            Path: {selected.path ?? 'not selected'}
            <br />
            Dimensions: {dimensionsLabel(selected)}
            <br />
            Aspect ratio: {aspectLabel(selected)}
          </div>
          <div style={{color: theme.muted, marginTop: 26, ...typography.technicalLabel}}>
            AVAILABLE VARIANTS
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14}}>
            {(candidates.length > 0 ? candidates : [selected]).map((candidate) => (
              <div
                key={candidate.candidateId ?? 'manifest-default'}
                style={{
                  alignItems: 'center',
                  backgroundColor: candidate.selected
                    ? provisionalColors.panelRaised
                    : provisionalColors.panel,
                  border: `2px ${candidate.selected ? 'solid' : 'dashed'} ${
                    candidate.selected ? theme.foreground : provisionalColors.line
                  }`,
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 15px',
                  ...typography.caption,
                }}
              >
                <span>{candidate.candidateName}</span>
                <span style={{color: statusColor[candidate.status], fontWeight: 800}}>
                  {candidate.selected ? 'SELECTED · ' : ''}
                  {candidate.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
