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
    assetIds: ['scene04OriginalRequestPath'],
    storyBeats: [
      'Client -> API -> Database -> expensive work -> Response',
      'USER 42 repeated three times',
      'Database: Alice. Again.',
    ],
    visualNotes: [
      'Uses the exact user-supplied Scene 04 JPG as the dominant visual. Do not redraw, reinterpret, or substitute it.',
      'The diagram carries baked English labels, so localization remains a documented asset limitation.',
    ],
  },
  {
    id: '05-restaurant-repeat-work',
    order: 5,
    workingTitle: 'Restaurant: Repeated Work',
    purpose: 'Make repeated legitimate work intuitive through a compact restaurant analogy.',
    durationStrategy: sharedWindow(13, 2),
    assetIds: ['scene05FirstOrder', 'scene05RepeatOrder'],
    storyBeats: [
      'First order: customer -> cashier -> chef -> burger, ~10 min',
      'A different customer orders the same burger again',
      'Same cashier, same chef, same work again, ~10 min again',
      'Same work. Again.',
    ],
    visualNotes: [
      'Both beats are user-supplied PNG assets rendered exactly as supplied. Do not redraw, reinterpret, or substitute them.',
      'Both diagrams carry baked English labels ("First order" / "~10 min" / "Same order again" / "~10 min again"), so their visible windows do not overlap. The "Same work. Again." takeaway is supplemental Remotion text, localized, never baked into the artwork.',
      'Cache/ready-shelf solution is intentionally not introduced yet; that belongs to Scene 06.',
    ],
  },
  {
    id: '06-ready-order-cache',
    order: 6,
    workingTitle: 'Ready Order / Cache',
    purpose: 'Teach caching with a ready-order shelf before returning to architecture.',
    durationStrategy: sharedWindow(12, 2),
    assetIds: ['scene06ReadyShelf', 'scene06ServeFromShelf'],
    storyBeats: [
      'Ready shelf: a burger is already prepared and waiting',
      'Customer orders -> cashier checks the ready shelf -> already there -> served immediately',
      "The chef didn't cook at all",
    ],
    visualNotes: [
      'Both beats are user-supplied PNG assets rendered exactly as supplied. Do not redraw, reinterpret, or substitute them.',
      'Both images carry a baked "Ready shelf" label, so their visible windows do not overlap. The "The chef didn\'t cook at all." takeaway is supplemental Remotion text, localized, never baked into the artwork.',
      'This is the restaurant version of a cache hit: the chef stays visibly calm and idle, never cooking for this request.',
    ],
  },
  {
    id: '07-restaurant-to-architecture',
    order: 7,
    workingTitle: 'Restaurant to Architecture',
    purpose: 'Map the analogy cleanly onto the technical request path.',
    durationStrategy: sharedWindow(16, 2),
    assetIds: ['scene07AnalogyMapping', 'scene07TechnicalArchitecture'],
    storyBeats: [
      'Customer -> Request, Cashier -> Application, Redis/Cache -> ready shelf, Database -> chef, cached result -> burger',
      'The real system: Client -> Application -> Redis (cache hit) or Database (cache miss) -> Response',
      'Redis answers repeated requests without repeating database work',
    ],
    visualNotes: [
      'Both beats are user-supplied PNG assets rendered exactly as supplied. Do not redraw, reinterpret, substitute, or simplify either into a new diagram.',
      'The technical-architecture image is dense (6 numbered steps); it is held long enough to read at normal playback speed and is never redrawn as native Remotion nodes.',
      'Both images carry baked English labels, so their visible windows do not overlap. Focus-frame emphasis (never new labels) highlights each analogy label in sequence, then the Redis and Database roles in the architecture diagram.',
    ],
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
