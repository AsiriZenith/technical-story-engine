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
import type {NarrationSpan} from '../../shared/audio/music-ducking';
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

// Background music (EN only for now, matching narration). Source file is 116.036s @ 30fps;
// RedisEpisode loops it when the episode is longer.
export const redisMusicTrack = {
  src: 'episodes/001-redis/audio/music/background.mp3',
  durationInFrames: Math.floor(116.035906 * fps),
} as const;

// Accent SFX (EN only, first pass pending human approval). `seconds` is scene-relative and
// matches that scene's own beat constant. Durations are the source .wav lengths.
export const redisSfxSounds = {
  pop: {src: 'episodes/001-redis/audio/sfx/pop.wav', durationInFrames: Math.ceil(1.099365 * fps), volume: 0.25},
  click: {src: 'episodes/001-redis/audio/sfx/click.wav', durationInFrames: Math.ceil(1.466667 * fps), volume: 0.25},
  ding: {src: 'episodes/001-redis/audio/sfx/ding.wav', durationInFrames: Math.ceil(0.781383 * fps), volume: 0.2},
} as const;

export const redisAccentSfx: readonly {
  sceneId: RedisSceneId;
  seconds: number;
  sound: keyof typeof redisSfxSounds;
  beat: string;
}[] = [
  {sceneId: '01-mystery', seconds: 5.2, sound: 'pop', beat: 'baselineResultIn (180 ms result lands)'},
  {sceneId: '01-mystery', seconds: 13.6, sound: 'ding', beat: 'fastResultIn (10 ms reveal)'},
  {sceneId: '08-cache-miss', seconds: 3.5, sound: 'click', beat: 'redisMissIn (miss highlight)'},
  {sceneId: '09-cache-hit', seconds: 3.7, sound: 'pop', beat: 'redisIn (cache hit highlight)'},
  {sceneId: '13-cache-tradeoffs', seconds: 6.8, sound: 'pop', beat: 'capacityIn (capacity callout lands)'},
  {sceneId: '13-cache-tradeoffs', seconds: 9.9, sound: 'click', beat: 'resilienceIn (Redis node dims)'},
  {sceneId: '14-final-mental-model', seconds: 14.5, sound: 'ding', beat: 'questionIn (closing question)'},
];

// Accent SFX (EN only, first pass pending human approval).  is scene-relative and
// matches that scene's own beat constant. Durations are the source .wav lengths.
export const redisSfxSounds = {
  pop: {src: 'episodes/001-redis/audio/sfx/pop.wav', durationInFrames: Math.ceil(1.099365 * fps), volume: 0.25},
  click: {src: 'episodes/001-redis/audio/sfx/click.wav', durationInFrames: Math.ceil(1.466667 * fps), volume: 0.25},
  ding: {src: 'episodes/001-redis/audio/sfx/ding.wav', durationInFrames: Math.ceil(0.781383 * fps), volume: 0.2},
} as const;

export const redisAccentSfx: readonly {
  sceneId: RedisSceneId;
  seconds: number;
  sound: keyof typeof redisSfxSounds;
  beat: string;
}[] = [
  {sceneId: '01-mystery', seconds: 5.2, sound: 'pop', beat: 'baselineResultIn (180 ms result lands)'},
  {sceneId: '01-mystery', seconds: 13.6, sound: 'ding', beat: 'fastResultIn (10 ms reveal)'},
  {sceneId: '08-cache-miss', seconds: 3.5, sound: 'click', beat: 'redisMissIn (miss highlight)'},
  {sceneId: '09-cache-hit', seconds: 3.7, sound: 'pop', beat: 'redisIn (cache hit highlight)'},
  {sceneId: '13-cache-tradeoffs', seconds: 6.8, sound: 'pop', beat: 'capacityIn (capacity callout lands)'},
  {sceneId: '13-cache-tradeoffs', seconds: 9.9, sound: 'click', beat: 'resilienceIn (Redis node dims)'},
  {sceneId: '14-final-mental-model', seconds: 14.5, sound: 'ding', beat: 'questionIn (closing question)'},
];

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

// Absolute-frame spans where narration is actually playing (one per scene), used for ducking.
// The tail of each scene window beyond its clip (localization margin) is a narration gap.
export const getRedisNarrationSpans = (language: Language): readonly NarrationSpan[] =>
  getRedisSceneTimeline(language).flatMap((window) => {
    const clip = getRedisNarrationClip(language, window.sceneId);
    return clip
      ? [
          {
            startFrame: window.start,
            endFrame: window.start + (clip.trimAfterFrames - clip.trimBeforeFrames),
          },
        ]
      : [];
  });

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
