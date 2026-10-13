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
  narrationFit?: SceneDurationStrategy['narrationFit'],
): SceneDurationStrategy => ({
  kind: 'shared-window',
  targetSeconds,
  localizationMarginSeconds,
  ...(narrationFit ? {narrationFit} : {}),
});

export const redisScenes = [
  {
    id: '01-mystery',
    order: 1,
    workingTitle: 'The Mystery',
    purpose: 'Establish the surprising latency improvement that the episode explains.',
    durationStrategy: sharedWindow(20, 2),
    assetIds: [],
    storyBeats: ['GET /users/42', 'Before Redis: 180 ms', 'After Redis: 10 ms'],
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
      'Timing bar is implemented as a reusable shared component; later scenes may reuse it to compare against the 10 ms cache-hit result.',
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
    assetIds: ['scene07TechnicalArchitecture'],
    storyBeats: [
      'GET /users/42 -> Application -> Redis -> MISS',
      'Database -> Result -> Store user:42 in Redis -> Response',
    ],
    visualNotes: [
      'Reuses the exact approved Scene 07 technical-architecture PNG as the visual foundation; never redrawn or recomposed as native Remotion nodes.',
      'Sequential SpotlightImage highlighting only (Application -> Redis -> Database -> Application -> Redis), never simultaneous. Client is not spotlighted; its role was already established in Scenes 01/04/07.',
    ],
  },
  {
    id: '09-cache-hit',
    order: 9,
    workingTitle: 'Cache Hit',
    purpose: 'Deliver the central lesson: the expensive query is skipped, not accelerated.',
    durationStrategy: sharedWindow(12, 2),
    assetIds: ['scene07TechnicalArchitecture'],
    storyBeats: [
      'GET /users/42 -> Application -> Redis -> HIT -> Response',
      'Redis did not speed up the query. Redis allowed us to skip it.',
    ],
    visualNotes: [
      'Reuses the exact approved Scene 07 technical-architecture PNG as the visual foundation; never redrawn or recomposed as native Remotion nodes.',
      'Sequential SpotlightImage highlighting only (Application -> Redis -> Application -> Client), never simultaneous. Redis stays the sole spotlight through both the cache-hit and Database-skipped beats; Database is never itself spotlighted so it reads as skipped by contrast.',
      'No joke should interrupt this explanation.',
    ],
  },
  {
    id: '10-why-redis-fast',
    order: 10,
    workingTitle: 'Why Redis Can Be Fast',
    purpose: 'Explain fast cache hits without reducing the comparison to RAM versus disk.',
    durationStrategy: sharedWindow(13, 2, 'extend'),
    assetIds: ['scene07TechnicalArchitecture'],
    storyBeats: [
      'Already prepared result',
      'Simple lookup',
      'Data held in memory',
      'Original expensive work avoided',
      'Modern databases also use memory heavily',
    ],
    visualNotes: [
      'Reuses the exact approved Scene 07 technical-architecture PNG as the visual foundation; never redrawn or recomposed as native Remotion nodes.',
      'A single Redis SpotlightImage target is held across the prepared-result / simple-lookup / in-memory beats, then released (not handed to Database) for the avoided-work payoff beat -- a deliberate departure from Scenes 08/09 node-to-node handoffs, since this scene explains why one step is fast rather than retracing the request path.',
      'Database is never spotlighted in this scene.',
    ],
  },
  {
    id: '11-cache-everything',
    order: 11,
    workingTitle: 'Cache Everything',
    purpose: 'Set up the tempting overgeneralization before introducing correctness costs.',
    durationStrategy: sharedWindow(11, 2),
    assetIds: [],
    storyBeats: [
      'So... why not avoid repeated work everywhere?',
      'CACHE EVERYTHING! -> Not so fast.',
      'More memory. More stale data. More to keep in sync.',
      'Not every request is expensive enough to justify caching -- and misses still happen.',
      'Cache where avoiding repeated expensive work is worth the tradeoff.',
    ],
    visualNotes: [
      'Fully Remotion-native, no image asset (TASK-020A Option A, "the pile"): one Redis stack node; a stream of request dots piles up as cached entries. Memory / stale / sync show up on that same pile (overflowing capacity frame, hollow warning-outline entries, tether lines to a Database cylinder). Beat 4 sorts requests: light ones bypass the cache, one heavy repeated one is cached. Beats 1, 2, 5 stay typographic.',
      'The only humorous beat ("CACHE EVERYTHING!" -> "Not so fast.") is purely typographic: no character illustration, no new asset. The formerly-listed developer placeholder asset is intentionally not used.',
      'TASK-020A Option A ("the pile"): one Redis stack node; a stream of request dots piles up as cached entries. Memory / stale / sync show up on that same pile (overflowing capacity frame, hollow warning-outline entries, tether lines to a Database cylinder). Beat 4 sorts requests: light ones bypass the cache, one heavy repeated one is cached. The costs and "not every request" sentences stay as captions under the diagram. Deliberately distinct from Scene 13\'s bar/ring/reroute/heartbeat motifs so Scene 13 still lands as new.',
    ],
  },
  {
    id: '12-stale-cache',
    order: 12,
    workingTitle: 'Stale Cache',
    purpose: 'Demonstrate that a fast answer can still be wrong.',
    durationStrategy: sharedWindow(11, 2),
    assetIds: [],
    storyBeats: [
      'What does "stale data" actually mean?',
      'Database: alice.new@example.com (current value changes)',
      'Redis: alice.old@example.com (cached copy stays old)',
      'The application reads Redis -- and returns that answer fast',
      'Wrong answer. Very fast.',
      'Caching reuses old work. That is also how it can become stale.',
    ],
    visualNotes: [
      'Fully Remotion-native, typography-driven scene -- no image asset, no SpotlightImage. Stays no-image like Scene 11 (now the TASK-020A Option A pile diagram), but this scene itself is typography-driven, with a second concrete use case: a two-card Database-vs-Redis value comparison, both cards held on screen together so the divergence is simultaneous, not just narrated.',
      'The Alice email example (alice.new@example.com / alice.old@example.com) already established in the outline is used unchanged. Values are not translated.',
      'The only humorous beat ("Wrong answer. Very fast.") is purely typographic, calm and wry, not a large comedic spectacle. The formerly-listed alicePortrait placeholder asset is intentionally not used.',
    ],
  },
  {
    id: '13-cache-tradeoffs',
    order: 13,
    workingTitle: 'Cost of Caching',
    purpose: 'Introduce the operational and design costs that accompany caching.',
    durationStrategy: sharedWindow(22.7, 2, 'extend'),
    assetIds: [],
    storyBeats: [
      'And stale data is only one of the costs.',
      'Freshness -- expiration + invalidation',
      'Capacity -- memory usage',
      'Resilience -- cache misses + cache failures',
      'Operations -- monitoring + extra infrastructure',
      'Caching trades repeated work for extra state, infrastructure, and coordination.',
    ],
    visualNotes: [
      'Rebuilt under TASK-025e (Option A) after human review found the original text-label-plus-caption treatment too flat. Fully Remotion-native, hybrid central-node scene -- no image asset, no SpotlightImage. A small central Redis node stays on screen from Beat 2 onward; one of four per-category diagrams (Freshness / Capacity / Resilience / Operations) is fully active at a time around it.',
      'Each category now gets a literal diagram instead of a caption: Freshness -- a depleting countdown ring that shifts to a stale-red state; Capacity -- a memory bar that fills then evicts its oldest block; Resilience -- the central node dims while a request packet reroutes to a temporary Database node, then the node springs back; Operations -- a pulsing monitoring heartbeat.',
      'Standing rule set by TASK-025e: spring() for node-settle/return-to-state beats (the Resilience node\'s return only), interpolate() for everything else.',
      'No humor in this scene, per the approved plan -- tone stays calm and matter-of-fact. See storyboard/scenes/scene-13-cache-tradeoffs.md for the full history (superseded approach, rebuild options considered, and rationale).',
    ],
  },
  {
    id: '14-final-mental-model',
    order: 14,
    workingTitle: 'Final Mental Model',
    purpose: 'Leave viewers with the correct question to ask about any cache.',
    durationStrategy: sharedWindow(19, 2, 'extend'),
    assetIds: [],
    storyBeats: [
      'Without caching: Request -> Application -> Database -> expensive work -> Response',
      'Cache hit: Request -> Application -> Redis -> Response',
      'What work did Redis allow us to stop doing?',
    ],
    visualNotes: [
      'Implemented under TASK-026 (Option A) as a bookend to Scene 01: a simplified, file-local rebuild of Scene 01\'s Client/Application/Database/Redis node-and-packet diagram (Scene 01\'s own node/glyph/arrow components are not shared/exported, so this scene re-implements a trimmed copy, the same pattern Scene 13 already used).',
      'A single packet makes one forward trip per path (Request -> Application -> Database for the slow path, Request -> Application -> Redis for the fast path); no animated return leg is drawn, matching Scene 01\'s own baseline-packet convention. A "Response" chip near the Request node stands in for the return trip on both paths.',
      'Packet motion uses a scene-local interpolate() timeline sized to this scene\'s own beat windows, not motionPresets.moveLinear\'s fixed 3.8s duration, which does not fit -- the same per-scene timing convention Scenes 01/12/13 already use.',
      'No spring() in this scene: every beat is a one-way entrance/exit or forward travel, not a return-to-a-prior-state settle, so the standing rule from TASK-025e (spring() for node-settle/return beats) does not apply here.',
      'No bottom-caption treatment: the closing beat is a single centered question (mirroring Scene 01\'s own big-number-then-question finale structure), not a caption over a background visual.',
    ],
  },
] as const satisfies readonly RedisSceneDefinition[];

export type RedisSceneId = (typeof redisScenes)[number]['id'];
