export type CharacterPlan = {
  id: string;
  name: string;
  roleInExplanation: string;
  requiredPosesAndExpressions: readonly string[];
  likelyScenes: readonly string[];
  localizationConcerns: readonly string[];
};

export const redisCharacterPlan = [
  {
    id: 'chef-database',
    name: 'Chef / Database',
    roleInExplanation: 'Represents legitimate expensive work; the database is not incompetent or bad.',
    requiredPosesAndExpressions: ['neutral', 'working', 'tired', 'cache-hit coffee reaction'],
    likelyScenes: ['02', '03', '04', '06'],
    localizationConcerns: ['Keep any dialogue as Remotion text, not baked into artwork.'],
  },
  {
    id: 'cashier-application',
    name: 'Cashier / Application',
    roleInExplanation: 'Routes requests to either the ready shelf or the chef.',
    requiredPosesAndExpressions: ['neutral', 'taking an order', 'checking shelf', 'serving order'],
    likelyScenes: ['04', '05', '06'],
    localizationConcerns: ['Keep role labels separate and allow longer German and French labels.'],
  },
  {
    id: 'customers-requests',
    name: 'Customers / Requests',
    roleInExplanation: 'Represent repeated requests for the same underlying data.',
    requiredPosesAndExpressions: ['ordering', 'waiting', 'receiving order', 'two visual variants'],
    likelyScenes: ['04', '05', '06'],
    localizationConcerns: ['Order text and speech bubbles must remain overlay text.'],
  },
  {
    id: 'alice',
    name: 'Alice',
    roleInExplanation: 'Provides a concrete user record for repeat-query and stale-cache examples.',
    requiredPosesAndExpressions: ['neutral profile/avatar'],
    likelyScenes: ['03', '07', '08', '12'],
    localizationConcerns: ['Email addresses stay unchanged; explanatory labels are localized separately.'],
  },
  {
    id: 'developer',
    name: 'Developer',
    roleInExplanation: 'Embodies the understandable temptation to cache everything.',
    requiredPosesAndExpressions: ['neutral', 'excited realization', 'overconfident cache-everything pose'],
    likelyScenes: ['11', '13'],
    localizationConcerns: ['Do not bake the CACHE EVERYTHING phrase into the character asset.'],
  },
] as const satisfies readonly CharacterPlan[];
