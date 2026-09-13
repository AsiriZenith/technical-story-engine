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
] as const satisfies readonly AssetManifestEntry[];

export type RedisAssetId = (typeof redisAssetManifest)[number]['id'];
