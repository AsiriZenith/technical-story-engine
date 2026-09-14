export const assetStatuses = ['placeholder', 'candidate', 'approved'] as const;
export type AssetStatus = (typeof assetStatuses)[number];

export const assetTypes = ['image', 'video'] as const;
export type AssetType = (typeof assetTypes)[number];

export type AssetDimensions = {
  width: number;
  height: number;
};

export type HumanApproval = {
  approvedBy: 'user';
  approvedAt: string;
};

export type AssetReviewState =
  | {status: 'placeholder'; path: string | null; humanApproval?: never}
  | {status: 'candidate'; path: string; humanApproval?: never}
  | {status: 'approved'; path: string; humanApproval: HumanApproval};

export type AssetCandidate = AssetReviewState & {
  id: string;
  name: string;
  dimensions: AssetDimensions | null;
};

export type AssetManifestEntry = AssetReviewState & {
  id: string;
  type: AssetType;
  optional: boolean;
  description: string;
  candidates?: readonly AssetCandidate[];
  selectedCandidateId?: string | null;
};

export const redisAssetManifest = [
  {
    id: 'restaurantBackground',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Language-neutral 16:9 illustrated restaurant environment.',
  },
  {
    id: 'chefNeutral',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Chef/database character in a neutral pose.',
    selectedCandidateId: 'pose-study-a',
    candidates: [
      {
        id: 'pose-study-a',
        name: 'Pose study A',
        status: 'placeholder',
        path: null,
        dimensions: null,
      },
      {
        id: 'pose-study-b',
        name: 'Pose study B',
        status: 'placeholder',
        path: null,
        dimensions: null,
      },
    ],
  },
  {
    id: 'chefWorking',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Chef/database character preparing an order.',
  },
  {
    id: 'chefTired',
    type: 'image',
    path: null,
    optional: true,
    status: 'placeholder',
    description: 'Brief tired reaction after legitimate repeated work.',
  },
  {
    id: 'cashier',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Cashier/application character with separable background.',
  },
  {
    id: 'customerA',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Primary customer/request character.',
  },
  {
    id: 'customerB',
    type: 'image',
    path: null,
    optional: true,
    status: 'placeholder',
    description: 'Alternate customer for repeated-request staging.',
  },
  {
    id: 'burger',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Prepared chicken burger with extra cheese and no onions.',
  },
  {
    id: 'orderTicket',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Language-neutral ticket; labels are rendered in Remotion.',
  },
  {
    id: 'readyShelf',
    type: 'image',
    path: null,
    optional: false,
    status: 'placeholder',
    description: 'Ready-order shelf that becomes Redis in the transition.',
  },
  {
    id: 'restaurantGeneratedClip',
    type: 'video',
    path: null,
    optional: true,
    status: 'placeholder',
    description: 'Optional replaceable motion clip for the restaurant sequence.',
  },
  {
    id: 'alicePortrait',
    type: 'image',
    path: null,
    optional: true,
    status: 'placeholder',
    description: 'Alice/user record identity used in stale-cache explanation.',
  },
  {
    id: 'developer',
    type: 'image',
    path: null,
    optional: true,
    status: 'placeholder',
    description: 'Developer reaction character for the cache-everything temptation.',
  },
  {
    id: 'scene03JokeDiagram',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-03-joke-diagram.png',
    optional: false,
    status: 'candidate',
    description:
      'User-supplied Scene 03 misconception diagram. Rendered exactly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
  {
    id: 'scene03EndDiagram',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-03-end-diagram.png',
    optional: false,
    status: 'candidate',
    description:
      'User-supplied Scene 03 repeated-work payoff diagram. Rendered exactly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
] as const satisfies readonly AssetManifestEntry[];

export type RedisAssetId = (typeof redisAssetManifest)[number]['id'];

// Scenes ask for a logical asset ID and receive a `staticFile`-relative path, so
// replacing the underlying file never reaches scene code.
export const getAssetPath = (id: RedisAssetId): string => {
  const asset = redisAssetManifest.find((entry) => entry.id === id);

  if (!asset?.path) {
    throw new Error(`Asset ${id} has no file selected yet.`);
  }

  return asset.path;
};
