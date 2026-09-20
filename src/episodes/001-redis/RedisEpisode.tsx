import {Sequence} from 'remotion';
import type {Language} from '../../shared/localization';
import {
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

export type RedisEpisodeProps = {
  language: Language;
};

export const RedisEpisode: React.FC<RedisEpisodeProps> = ({language}) => {
  return (
    <>
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
    </>
  );
};
