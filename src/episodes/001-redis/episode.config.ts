import {
  defaultLanguage,
  supportedLanguages,
  type Language,
} from '../../shared/localization';
import {
  createAudioDrivenTimeline,
  getNarrationClip,
  type NarrationClip,
  type SceneBoundary,
} from '../../shared/timing/audio-duration';
import {createSceneTimeline, type SceneWindow} from '../../shared/timing/scene-timing';
import {redisAssetManifest, type AssetManifestEntry} from './assets';
import {redisCharacterPlan, type CharacterPlan} from './characters';
import {redisScenes, type RedisSceneDefinition, type RedisSceneId} from './scenes';
import enSceneBoundaries from './narration/audio/en/scene-boundaries.json';
import {validateEpisodeArchitecture} from './validation';

export type EpisodeTrackPaths = Partial<Record<Language, string>>;

export type EpisodeConfig = {
  id: string;
  title: string;
  primaryLanguage: Language;
  languages: readonly Language[];
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  assets: readonly AssetManifestEntry[];
  scenes: readonly RedisSceneDefinition[];
  plannedSceneTimeline: readonly SceneWindow<RedisSceneId>[];
  characters: readonly CharacterPlan[];
  narrationTracks: EpisodeTrackPaths;
  captionTracks: EpisodeTrackPaths;
  metadata: Record<string, string>;
};

const fps = 30;

export const redisPlannedSceneTimeline = createSceneTimeline(redisScenes, fps);

// Narration sources per language. Each track is ONE continuous file in /public; its
// per-scene spans live in the derived scene-boundaries.json beside the source audio.
// Languages without narration yet (DE/FR) keep the author-estimated planned timeline.
export const redisNarrationTracks = {
  en: 'episodes/001-redis/audio/narration/en/episode-full.wav',
} as const satisfies EpisodeTrackPaths;

const narrationBoundaries: Partial<Record<Language, readonly SceneBoundary[]>> = {
  en: enSceneBoundaries,
};

export const hasAudioDrivenTiming = (language: Language): boolean =>
  narrationBoundaries[language] !== undefined;

// Scene windows for a language: audio-derived when narration exists, planned otherwise.
export const getRedisSceneTimeline = (
  language: Language,
): readonly SceneWindow<RedisSceneId>[] => {
  const boundaries = narrationBoundaries[language];
  return boundaries
    ? createAudioDrivenTimeline(redisScenes, boundaries, fps)
    : redisPlannedSceneTimeline;
};

export const getRedisEpisodeDuration = (language: Language): number =>
  getRedisSceneTimeline(language).reduce((total, window) => total + window.duration, 0);

// Frame range of the shared narration file that belongs to a scene (null: no narration).
export const getRedisNarrationClip = (
  language: Language,
  sceneId: RedisSceneId,
): NarrationClip | null => {
  const boundary = narrationBoundaries[language]?.find((entry) => entry.sceneId === sceneId);
  return boundary ? getNarrationClip(boundary, fps) : null;
};

export const redisArchitectureIsValid = validateEpisodeArchitecture({
  scenes: redisScenes,
  assets: redisAssetManifest,
  languages: supportedLanguages,
});

export const redisEpisodeConfig = {
  id: '001-redis',
  title: 'Why Your API Gets Faster After Adding Redis',
  primaryLanguage: defaultLanguage,
  languages: supportedLanguages,
  fps,
  width: 1920,
  height: 1080,
  // Author-estimated planned duration (DE/FR). EN is audio-derived: use getRedisEpisodeDuration.
  durationInFrames: redisPlannedSceneTimeline.reduce((total, window) => total + window.duration, 0),
  assets: redisAssetManifest,
  scenes: redisScenes,
  plannedSceneTimeline: redisPlannedSceneTimeline,
  characters: redisCharacterPlan,
  narrationTracks: redisNarrationTracks,
  captionTracks: {},
  metadata: {},
} as const satisfies EpisodeConfig;
