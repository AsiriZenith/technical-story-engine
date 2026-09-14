import type {SceneDurationStrategy} from '../../shared/timing/scene-timing';
import type {RedisAssetId} from './assets';

export type RedisSceneDefinition = {
  id: string;
  order: number;
  workingTitle: string;
  purpose: string;
  durationStrategy: SceneDurationStrategy;
  assetIds: readonly RedisAssetId[];
  storyBeats: readonly string[];
  visualNotes?: readonly string[];
};

const sharedWindow = (
  targetSeconds: number,
  localizationMarginSeconds = 1,
): SceneDurationStrategy => ({
  kind: 'shared-window',
  targetSeconds,
  localizationMarginSeconds,
});

export const redisScenes = [
  {
    id: '01-mystery',
    order: 1,
    workingTitle: 'The Mystery',
    purpose: 'Establish the surprising latency improvement that the episode explains.',
    durationStrategy: sharedWindow(20, 2),
    assetIds: [],
    storyBeats: ['GET /users/42', 'Before Redis: 180 ms', 'After Redis: 8 ms'],
  },
  {
    id: '02-latency-breakdown',
    order: 2,
    workingTitle: 'Where the 180 ms Comes From',
    purpose:
      'Show the original pre-Redis request path and make database work the visually dominant share of the 180 ms total, without yet explaining cache hit/miss.',
    durationStrategy: sharedWindow(15, 2),
    assetIds: [],
    storyBeats: [
      'GET /users/42 -> Application -> Database',
      'Illustrative breakdown: request 5 ms, DB/network 8 ms, database work 155 ms, serialization 5 ms, other 7 ms',
      'Illustrative total: 180 ms',
      'Database work dominates',
    ],
    visualNotes: [
      'Timing bar is implemented as a reusable shared component; later scenes may reuse it to compare against the 8 ms cache-hit result.',
    ],
  },
  {
    id: '03-database-speed-misconception',
    order: 3,
    workingTitle: 'The Misconception',
    purpose: 'Reject the idea that Redis directly makes the database query faster.',
    durationStrategy: sharedWindow(13, 1),
    assetIds: ['scene03JokeDiagram', 'scene03EndDiagram'],
    storyBeats: [
      'Database work: 155 ms',
      'Did Redis make the database 20x faster?',
      'NOT THIS',
      'The repeated work changed.',
      "The database didn't become faster. We stopped repeating some of the work.",
    ],
    visualNotes: [
      'Both diagram beats are user-supplied PNG assets rendered exactly as supplied. Do not redraw, reinterpret, or substitute them.',
      'The two diagrams carry baked English labels, so their visible windows must not overlap and localized copy is added around them rather than over them.',
    ],
  },
  {
    id: '04-original-request-path',
    order: 4,
    workingTitle: 'Original Request Path',
    purpose: 'Show that repeated requests repeat the same expensive database work.',
    durationStrategy: sharedWindow(11),
    assetIds: [],
    storyBeats: [
      'Client -> API -> Database -> expensive work -> Response',
      'USER 42 repeated three times',
      'Database: Alice. Again.',
    ],
  },
  {
    id: '05-restaurant-repeat-work',
    order: 5,
    workingTitle: 'Restaurant: Repeated Work',
    purpose: 'Make repeated legitimate work intuitive through a compact restaurant analogy.',
    durationStrategy: sharedWindow(13, 2),
    assetIds: [
      'restaurantBackground',
      'chefWorking',
      'chefTired',
      'cashier',
      'customerA',
      'customerB',
      'burger',
      'orderTicket',
    ],
    storyBeats: [
      'Chicken burger, extra cheese, no onions',
      'Chef prepares the order from scratch',
      'The identical order arrives again, then again',
    ],
    visualNotes: ['Keep the humor brief and supportive.'],
  },
  {
    id: '06-ready-order-cache',
    order: 6,
    workingTitle: 'Ready Order / Cache',
    purpose: 'Teach caching with a ready-order shelf before returning to architecture.',
    durationStrategy: sharedWindow(10),
    assetIds: [
      'restaurantBackground',
      'cashier',
      'customerA',
      'burger',
      'orderTicket',
      'readyShelf',
    ],
    storyBeats: ['ORDER:42', 'Serve the prepared order without repeating the full job'],
  },
  {
    id: '07-restaurant-to-architecture',
    order: 7,
    workingTitle: 'Restaurant to Architecture',
    purpose: 'Map the analogy cleanly onto the technical request path.',
    durationStrategy: sharedWindow(11, 2),
    assetIds: ['restaurantBackground', 'chefNeutral', 'cashier', 'customerA', 'readyShelf'],
    storyBeats: [
      'Customer -> Request',
      'Cashier -> Application',
      'Ready shelf -> Redis',
      'Chef -> Database',
    ],
    visualNotes: ['Preserve spatial relationships for a future morph; do not implement it yet.'],
  },
  {
    id: '08-cache-miss',
    order: 8,
    workingTitle: 'Cache Miss',
    purpose: 'Trace the full miss path and show the result being stored for later.',
    durationStrategy: sharedWindow(14, 2),
    assetIds: [],
    storyBeats: [
      'GET /users/42 -> Application -> Redis -> MISS',
      'Database -> Result -> Store user:42 in Redis -> Response',
    ],
    visualNotes: ['Optional tiny empty-drawer shrug from Redis.'],
  },
  {
    id: '09-cache-hit',
    order: 9,
    workingTitle: 'Cache Hit',
    purpose: 'Deliver the central lesson: the expensive query is skipped, not accelerated.',
    durationStrategy: sharedWindow(12, 2),
    assetIds: [],
    storyBeats: [
      'GET /users/42 -> Application -> Redis -> HIT -> Response',
      'Redis did not speed up the query. Redis allowed us to skip it.',
    ],
    visualNotes: ['No joke should interrupt this explanation.'],
  },
  {
    id: '10-why-redis-fast',
    order: 10,
    workingTitle: 'Why Redis Can Be Fast',
    purpose: 'Explain fast cache hits without reducing the comparison to RAM versus disk.',
    durationStrategy: sharedWindow(13, 2),
    assetIds: [],
    storyBeats: [
      'Already prepared result',
      'Simple lookup',
      'Data held in memory',
      'Original expensive work avoided',
      'Modern databases also use memory heavily',
    ],
  },
  {
    id: '11-cache-everything',
    order: 11,
    workingTitle: 'Cache Everything',
    purpose: 'Set up the tempting overgeneralization before introducing correctness costs.',
    durationStrategy: sharedWindow(7),
    assetIds: ['developer'],
    storyBeats: ['180 ms -> 8 ms', 'CACHE EVERYTHING'],
    visualNotes: ['Use only a brief humorous reaction.'],
  },
  {
    id: '12-stale-cache',
    order: 12,
    workingTitle: 'Stale Cache',
    purpose: 'Demonstrate that a fast answer can still be wrong.',
    durationStrategy: sharedWindow(11, 2),
    assetIds: ['alicePortrait'],
    storyBeats: [
      'Database: alice.new@example.com',
      'Redis: alice.old@example.com',
      'FAST: yes; CORRECT: no',
    ],
  },
  {
    id: '13-cache-tradeoffs',
    order: 13,
    workingTitle: 'Cost of Caching',
    purpose: 'Introduce the operational and design costs that accompany caching.',
    durationStrategy: sharedWindow(14, 2),
    assetIds: [],
    storyBeats: [
      'Expiration and invalidation',
      'Memory and cache misses',
      'Monitoring and failure handling',
      'Extra infrastructure',
      'Caching trades some simplicity for speed.',
    ],
  },
  {
    id: '14-final-mental-model',
    order: 14,
    workingTitle: 'Final Mental Model',
    purpose: 'Leave viewers with the correct question to ask about any cache.',
    durationStrategy: sharedWindow(12, 2),
    assetIds: [],
    storyBeats: [
      'Without caching: Request -> Application -> Database -> expensive work -> Response',
      'Cache hit: Request -> Application -> Redis -> Response',
      'What work did Redis allow us to stop doing?',
    ],
  },
] as const satisfies readonly RedisSceneDefinition[];

export type RedisSceneId = (typeof redisScenes)[number]['id'];
