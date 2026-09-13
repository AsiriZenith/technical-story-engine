import {
  defaultLanguage,
  supportedLanguages,
  type Language,
} from '../../shared/localization';

export type EpisodeAssetPaths = {
  restaurantClip?: string;
};

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
  assets: EpisodeAssetPaths;
  narrationTracks: EpisodeTrackPaths;
  captionTracks: EpisodeTrackPaths;
  metadata: Record<string, string>;
  sceneTiming: readonly {id: string; from: number; durationInFrames: number}[];
};

export const redisEpisodeConfig = {
  id: '001-redis',
  title: 'Why Your API Gets Faster After Adding Redis',
  primaryLanguage: defaultLanguage,
  languages: supportedLanguages,
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 150,
  assets: {},
  narrationTracks: {},
  captionTracks: {},
  metadata: {},
  sceneTiming: [{id: 'placeholder', from: 0, durationInFrames: 150}],
} as const satisfies EpisodeConfig;
