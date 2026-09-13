import {
  redisAssetManifest,
  type AssetCandidate,
  type AssetDimensions,
  type AssetManifestEntry,
  type AssetStatus,
  type AssetType,
  type RedisAssetId,
} from './assets';

type RedisManifestEntry = AssetManifestEntry & {id: RedisAssetId};

const assetManifest: readonly RedisManifestEntry[] = redisAssetManifest;

export type ResolvedAsset = {
  id: RedisAssetId;
  candidateId: string | null;
  candidateName: string;
  status: AssetStatus;
  type: AssetType;
  path: string | null;
  dimensions: AssetDimensions | null;
  aspectRatio: number | null;
  optional: boolean;
  description: string;
  selected: boolean;
};

const dimensionsToAspectRatio = (dimensions: AssetDimensions | null): number | null =>
  dimensions ? dimensions.width / dimensions.height : null;

const candidateToResolvedAsset = (
  asset: RedisManifestEntry,
  candidate: AssetCandidate,
): ResolvedAsset => ({
  id: asset.id,
  candidateId: candidate.id,
  candidateName: candidate.name,
  status: candidate.status,
  type: asset.type,
  path: candidate.path,
  dimensions: candidate.dimensions,
  aspectRatio: dimensionsToAspectRatio(candidate.dimensions),
  optional: asset.optional,
  description: asset.description,
  selected: candidate.id === asset.selectedCandidateId,
});

export const resolveAsset = (
  assetId: RedisAssetId,
  candidateId?: string | null,
): ResolvedAsset => {
  const asset = assetManifest.find((entry) => entry.id === assetId);

  if (!asset) {
    throw new Error(`Unknown asset ID: ${assetId}`);
  }

  const requestedCandidateId = candidateId ?? asset.selectedCandidateId ?? null;
  const candidate = requestedCandidateId
    ? asset.candidates?.find((entry) => entry.id === requestedCandidateId)
    : undefined;

  if (requestedCandidateId && !candidate) {
    throw new Error(`Unknown candidate ${requestedCandidateId} for asset ${assetId}.`);
  }

  if (candidate) {
    return candidateToResolvedAsset(asset, candidate);
  }

  return {
    id: asset.id,
    candidateId: null,
    candidateName: 'Manifest default',
    status: asset.status,
    type: asset.type,
    path: asset.path,
    dimensions: null,
    aspectRatio: null,
    optional: asset.optional,
    description: asset.description,
    selected: true,
  };
};

export const listAssetCandidates = (assetId: RedisAssetId): readonly ResolvedAsset[] => {
  const asset = assetManifest.find((entry) => entry.id === assetId);

  if (!asset) {
    throw new Error(`Unknown asset ID: ${assetId}`);
  }

  return asset.candidates?.map((candidate) => candidateToResolvedAsset(asset, candidate)) ?? [];
};
