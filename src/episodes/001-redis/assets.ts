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
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 03 misconception diagram. Rendered exactly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
  {
    id: 'scene03EndDiagram',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-03-end-diagram.png',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 03 repeated-work payoff diagram. Rendered exactly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
  {
    id: 'scene04OriginalRequestPath',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-04-original-request-path.jpg',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 04 original request path diagram. Rendered directly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
  {
    id: 'scene05FirstOrder',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-05-first-order.png',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 05 first-order restaurant beat (customer -> cashier -> chef -> burger, ~10 min). Rendered exactly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
  {
    id: 'scene05RepeatOrder',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-05-repeat-order.png',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 05 repeat-order restaurant beat (same customer flow, same expensive work again, ~10 min again). Rendered exactly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
  {
    id: 'scene06ReadyShelf',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-06-ready-shelf.png',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 06 ready-shelf beat (a burger already prepared and waiting on the ready shelf, chef calm and idle). Rendered exactly as supplied; never redrawn or reinterpreted. Contains a baked "Ready shelf" label.',
  },
  {
    id: 'scene06ServeFromShelf',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-06-serve-from-shelf.png',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 06 serve-from-shelf beat (cashier hands the pre-made burger straight from the shelf to the customer; chef stays calm and idle). Rendered exactly as supplied; never redrawn or reinterpreted. Contains a baked "Ready shelf" label.',
  },
  {
    id: 'scene07AnalogyMapping',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-07-analogy-mapping.png',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 07 restaurant-to-architecture mapping (Request/Application/Redis-Cache/Cached result/Database labels over the restaurant scene). Rendered exactly as supplied; never redrawn or reinterpreted. Contains baked English labels.',
  },
  {
    id: 'scene07TechnicalArchitecture',
    type: 'image',
    path: 'episodes/001-redis/assets/scene-07-technical-architecture.png',
    optional: false,
    status: 'approved',
    humanApproval: {
      approvedBy: 'user',
      approvedAt: '2026-09-14',
    },
    description:
      'User-supplied Scene 07 "The Real System" technical architecture diagram (Client -> Application -> Redis/Database, numbered request/cache-hit/cache-miss flow). Rendered exactly as supplied; never redrawn, simplified, or recomposed as native Remotion shapes. Contains baked English labels.',
  },
] as const satisfies readonly AssetManifestEntry[];

export type RedisAssetId = (typeof redisAssetManifest)[number]['id'];
