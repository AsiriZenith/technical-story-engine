import {
  defaultLanguage,
  supportedLanguages,
  type Language,
} from '../../shared/localization';
import {createSceneTimeline, type SceneWindow} from '../../shared/timing/scene-timing';
import {redisAssetManifest, type AssetManifestEntry} from './assets';
import {redisCharacterPlan, type CharacterPlan} from './characters';
import {redisScenes, type RedisSceneDefinition, type RedisSceneId} from './scenes';
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

// Implemented-scene windows, exported so RedisEpisode can place each scene's
// <Sequence> at the right offset without duplicating the timeline math.
export const scene01Window = redisPlannedSceneTimeline[0];
export const scene02Window = redisPlannedSceneTimeline[1];

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
  durationInFrames: scene01Window.duration + scene02Window.duration,
  assets: redisAssetManifest,
  scenes: redisScenes,
  plannedSceneTimeline: redisPlannedSceneTimeline,
  characters: redisCharacterPlan,
  narrationTracks: {},
  captionTracks: {},
  metadata: {},
} as const satisfies EpisodeConfig;
