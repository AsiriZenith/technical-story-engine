import {AbsoluteFill, Img, staticFile} from 'remotion';
import {redisAssetManifest, type RedisAssetId} from '../../episodes/001-redis/assets';
import {theme} from '../../shared/styles/theme';

export type DevAssetPreviewProps = {
  assetId: RedisAssetId;
};

const statusColor = {
  placeholder: '#718096',
  candidate: '#d69e2e',
  approved: '#1e9b63',
} as const;

export const DevAssetPreview: React.FC<DevAssetPreviewProps> = ({assetId}) => {
  const asset = redisAssetManifest.find((entry) => entry.id === assetId);

  if (!asset) {
    throw new Error(`Unknown asset ID: ${assetId}`);
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        padding: '90px 120px',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <div style={{color: theme.accent, fontSize: 24, fontWeight: 800, letterSpacing: 5}}>
            DEV / ASSET PREVIEW
          </div>
          <div style={{fontSize: 58, fontWeight: 750, marginTop: 24}}>{asset.id}</div>
        </div>
        <div
          style={{
            alignSelf: 'flex-start',
            backgroundColor: statusColor[asset.status],
            borderRadius: 999,
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: 2,
            padding: '15px 24px',
            textTransform: 'uppercase',
          }}
        >
          {asset.status}
        </div>
      </div>
      <div style={{display: 'flex', gap: 56, marginTop: 55}}>
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#d9e0e8',
            backgroundImage:
              'conic-gradient(#ffffff 25%, #d9e0e8 0 50%, #ffffff 0 75%, #d9e0e8 0)',
            backgroundSize: '44px 44px',
            borderRadius: 24,
            display: 'flex',
            height: 610,
            justifyContent: 'center',
            overflow: 'hidden',
            width: 1080,
          }}
        >
          {asset.path && asset.type === 'image' ? (
            <Img
              name="Manifest image"
              src={staticFile(asset.path)}
              style={{height: '100%', objectFit: 'contain', width: '100%'}}
            />
          ) : (
            <div
              style={{
                backgroundColor: 'rgba(8, 17, 31, 0.88)',
                borderRadius: 18,
                color: theme.foreground,
                fontSize: 34,
                fontWeight: 700,
                padding: '30px 38px',
                textAlign: 'center',
              }}
            >
              {asset.type === 'video' ? 'VIDEO CONTRACT READY' : 'NO IMAGE SELECTED'}
            </div>
          )}
        </div>
        <div style={{fontSize: 28, lineHeight: 1.55, width: 500}}>
          <div style={{color: theme.muted, fontSize: 20, fontWeight: 800, letterSpacing: 3}}>
            LOGICAL ASSET
          </div>
          <div style={{marginTop: 18}}>{asset.description}</div>
          <div style={{borderTop: '2px solid #233650', marginTop: 35, paddingTop: 28}}>
            <strong>Type:</strong> {asset.type}
            <br />
            <strong>Optional:</strong> {asset.optional ? 'yes' : 'no'}
            <br />
            <strong>Path:</strong> {asset.path ?? 'not selected'}
          </div>
          <div style={{color: theme.muted, fontSize: 23, marginTop: 36}}>
            Image previews use contain sizing over a transparency grid. Video entries expose the same
            provider-independent contract until a real clip is selected.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
