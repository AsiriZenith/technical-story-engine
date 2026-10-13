import {Audio, Loop, Sequence, staticFile} from 'remotion';
import {
  buildDuckingKeyframes,
  defaultDuckingConfig,
  getMusicVolume,
} from '../../shared/audio/music-ducking';
import type {Language} from '../../shared/localization';
import {
  getRedisEpisodeDuration,
  getRedisNarrationClip,
  getRedisNarrationSpans,
  getRedisSceneTimeline,
  redisAccentSfx,
  redisAccentSfx,
  redisMusicTrack,
  redisNarrationTracks,
  redisSfxSounds,
} from './episode.config';
import {Scene01Mystery} from './scenes/Scene01Mystery';
import {Scene02LatencyBreakdown} from './scenes/Scene02LatencyBreakdown';
import {Scene03DatabaseMisconception} from './scenes/Scene03DatabaseMisconception';
import {Scene04OriginalRequestPath} from './scenes/Scene04OriginalRequestPath';
import {Scene05RestaurantRepeatWork} from './scenes/Scene05RestaurantRepeatWork';
import {Scene06ReadyShelfCacheHit} from './scenes/Scene06ReadyShelfCacheHit';
import {Scene07AnalogyToArchitecture} from './scenes/Scene07AnalogyToArchitecture';
import {Scene08CacheMiss} from './scenes/Scene08CacheMiss';
import {Scene09CacheHit} from './scenes/Scene09CacheHit';
import {Scene10WhyRedisFast} from './scenes/Scene10WhyRedisFast';
import {Scene11CacheEverything} from './scenes/Scene11CacheEverything';
import {Scene12StaleCache} from './scenes/Scene12StaleCache';
import {Scene13CacheCosts} from './scenes/Scene13CacheCosts';
import {Scene14FinalMentalModel} from './scenes/Scene14FinalMentalModel';

export type RedisEpisodeProps = {
  language: Language;
  // Set false (via --props) to render music/narration only, without accent SFX.
  accentSfx?: boolean;
};

// Music loops; inside <Loop> the frame restarts each iteration, so rebuild the absolute episode
// frame before sampling the ducking envelope.
const MusicTrack: React.FC<{language: Language}> = ({language}) => {
  const loop = Loop.useLoop();
  const keyframes = buildDuckingKeyframes(getRedisNarrationSpans(language), defaultDuckingConfig);
  const totalFrames = getRedisEpisodeDuration(language);
  const offset = loop ? loop.iteration * loop.durationInFrames : 0;

  return (
    <Audio
      src={staticFile(redisMusicTrack.src)}
      volume={(frame) =>
        getMusicVolume(frame + offset, totalFrames, keyframes, defaultDuckingConfig)
      }
    />
  );
};

export const RedisEpisode: React.FC<RedisEpisodeProps> = ({language, accentSfx = true}) => {
  const [
    scene01Window,
    scene02Window,
    scene03Window,
    scene04Window,
    scene05Window,
    scene06Window,
    scene07Window,
    scene08Window,
    scene09Window,
    scene10Window,
    scene11Window,
    scene12Window,
    scene13Window,
    scene14Window,
  ] = getRedisSceneTimeline(language);
  const narrationTrack = redisNarrationTracks[language as keyof typeof redisNarrationTracks];

  return (
    <>
      {narrationTrack
        ? getRedisSceneTimeline(language).map((window) => {
            const clip = getRedisNarrationClip(language, window.sceneId);
            return clip ? (
              // One shared narration file; each scene plays its own span from its first
              // frame, so audio and visuals re-anchor at every scene boundary.
              <Sequence
                key={window.sceneId}
                name={`Narration ${window.sceneId}`}
                from={window.start}
                durationInFrames={window.duration}
              >
                <Audio
                  src={staticFile(narrationTrack)}
                  trimBefore={clip.trimBeforeFrames}
                  trimAfter={clip.trimAfterFrames}
                />
              </Sequence>
            ) : null;
          })
        : null}
      {narrationTrack ? (
        <Loop name="Music" durationInFrames={redisMusicTrack.durationInFrames}>
          <MusicTrack language={language} />
        </Loop>
      ) : null}
      {narrationTrack && accentSfx
        ? redisAccentSfx.map((accent, index) => {
            const window = getRedisSceneTimeline(language).find((w) => w.sceneId === accent.sceneId);
            const sound = redisSfxSounds[accent.sound];
            return window ? (
              <Sequence
                key={`sfx-${index}`}
                name={`SFX ${accent.sound} ${accent.sceneId}`}
                from={window.start + Math.round(accent.seconds * 30)}
                durationInFrames={sound.durationInFrames}
              >
                <Audio src={staticFile(sound.src)} volume={sound.volume} />
              </Sequence>
            ) : null;
          })
        : null}
      {narrationTrack
        ? redisAccentSfx.map((accent, index) => {
            const window = getRedisSceneTimeline(language).find((w) => w.sceneId === accent.sceneId);
            const sound = redisSfxSounds[accent.sound];
            return window ? (
              <Sequence
                key={}
                name={}
                from={window.start + Math.round(accent.seconds * 30)}
                durationInFrames={sound.durationInFrames}
              >
                <Audio src={staticFile(sound.src)} volume={sound.volume} />
              </Sequence>
            ) : null;
          })
        : null}
      <Sequence
        name="Scene 01 — Mystery"
        from={scene01Window.start}
        durationInFrames={scene01Window.duration}
      >
        <Scene01Mystery language={language} durationInFrames={scene01Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 02 — Latency Breakdown"
        from={scene02Window.start}
        durationInFrames={scene02Window.duration}
      >
        <Scene02LatencyBreakdown language={language} durationInFrames={scene02Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 03 — The Misconception"
        from={scene03Window.start}
        durationInFrames={scene03Window.duration}
      >
        <Scene03DatabaseMisconception
          language={language}
          durationInFrames={scene03Window.duration}
        />
      </Sequence>
      <Sequence
        name="Scene 04 - Original Request Path"
        from={scene04Window.start}
        durationInFrames={scene04Window.duration}
      >
        <Scene04OriginalRequestPath
          language={language}
          durationInFrames={scene04Window.duration}
        />
      </Sequence>
      <Sequence
        name="Scene 05 - Restaurant: Repeated Work"
        from={scene05Window.start}
        durationInFrames={scene05Window.duration}
      >
        <Scene05RestaurantRepeatWork
          language={language}
          durationInFrames={scene05Window.duration}
        />
      </Sequence>
      <Sequence
        name="Scene 06 - Ready Shelf / Cache Hit"
        from={scene06Window.start}
        durationInFrames={scene06Window.duration}
      >
        <Scene06ReadyShelfCacheHit
          language={language}
          durationInFrames={scene06Window.duration}
        />
      </Sequence>
      <Sequence
        name="Scene 07 - Restaurant Analogy to Architecture"
        from={scene07Window.start}
        durationInFrames={scene07Window.duration}
      >
        <Scene07AnalogyToArchitecture
          language={language}
          durationInFrames={scene07Window.duration}
        />
      </Sequence>
      <Sequence
        name="Scene 08 - Cache Miss"
        from={scene08Window.start}
        durationInFrames={scene08Window.duration}
      >
        <Scene08CacheMiss language={language} durationInFrames={scene08Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 09 - Cache Hit"
        from={scene09Window.start}
        durationInFrames={scene09Window.duration}
      >
        <Scene09CacheHit language={language} durationInFrames={scene09Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 10 - Why Redis Is Fast"
        from={scene10Window.start}
        durationInFrames={scene10Window.duration}
      >
        <Scene10WhyRedisFast language={language} durationInFrames={scene10Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 11 - Cache Everything?"
        from={scene11Window.start}
        durationInFrames={scene11Window.duration}
      >
        <Scene11CacheEverything language={language} durationInFrames={scene11Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 12 - Stale Cache"
        from={scene12Window.start}
        durationInFrames={scene12Window.duration}
      >
        <Scene12StaleCache language={language} durationInFrames={scene12Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 13 - Cost of Caching"
        from={scene13Window.start}
        durationInFrames={scene13Window.duration}
      >
        <Scene13CacheCosts language={language} durationInFrames={scene13Window.duration} />
      </Sequence>
      <Sequence
        name="Scene 14 - Final Mental Model"
        from={scene14Window.start}
        durationInFrames={scene14Window.duration}
      >
        <Scene14FinalMentalModel language={language} durationInFrames={scene14Window.duration} />
      </Sequence>
    </>
  );
};
