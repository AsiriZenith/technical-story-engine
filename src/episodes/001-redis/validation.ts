import type {Language} from '../../shared/localization';
import type {AssetManifestEntry} from './assets';
import type {RedisSceneDefinition} from './scenes';

type ArchitectureInput = {
  scenes: readonly RedisSceneDefinition[];
  assets: readonly AssetManifestEntry[];
  languages: readonly Language[];
};

const assertUnique = (values: readonly string[], label: string): void => {
  if (new Set(values).size !== values.length) {
    throw new Error(`${label} must be unique.`);
  }
};

export const validateEpisodeArchitecture = ({
  scenes,
  assets,
  languages,
}: ArchitectureInput): true => {
  if (scenes.length !== 14) {
    throw new Error(`Episode 001 must define exactly 14 scenes; found ${scenes.length}.`);
  }

  assertUnique(
    scenes.map((scene) => scene.id),
    'Scene IDs',
  );
  assertUnique(
    assets.map((asset) => asset.id),
    'Asset IDs',
  );

  scenes.forEach((scene, index) => {
    if (scene.order !== index + 1) {
      throw new Error(`Scene order is not deterministic at ${scene.id}.`);
    }
  });

  const validAssetIds = new Set(assets.map((asset) => asset.id));
  for (const asset of assets) {
    const candidateIds = asset.candidates?.map((candidate) => candidate.id) ?? [];
    assertUnique(candidateIds, `Candidate IDs for ${asset.id}`);

    if (asset.selectedCandidateId && !candidateIds.includes(asset.selectedCandidateId)) {
      throw new Error(`Asset ${asset.id} selects unknown candidate ${asset.selectedCandidateId}.`);
    }

    if (asset.status === 'approved' && asset.humanApproval.approvedBy !== 'user') {
      throw new Error(`Approved asset ${asset.id} requires explicit user approval.`);
    }

    for (const candidate of asset.candidates ?? []) {
      if (candidate.status === 'approved' && candidate.humanApproval.approvedBy !== 'user') {
        throw new Error(`Approved candidate ${candidate.id} requires explicit user approval.`);
      }
    }
  }

  for (const scene of scenes) {
    for (const assetId of scene.assetIds) {
      if (!validAssetIds.has(assetId)) {
        throw new Error(`Scene ${scene.id} references unknown asset ${assetId}.`);
      }
    }
  }

  if (languages.join(',') !== 'en,de,fr') {
    throw new Error('Supported languages must remain en, de, fr in that order.');
  }

  return true;
};
