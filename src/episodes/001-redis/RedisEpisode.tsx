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
} from './episode.config';
import {Scene01Mystery} from './scenes/Scene01Mystery';
import {Scene02LatencyBreakdown} from './scenes/Scene02LatencyBreakdown';
import {Scene03DatabaseMisconception} from './scenes/Scene03DatabaseMisconception';
import {Scene04OriginalRequestPath} from './scenes/Scene04OriginalRequestPath';
import {Scene05RestaurantRepeatWork} from './scenes/Scene05RestaurantRepeatWork';
import {Scene06ReadyShelfCacheHit} from './scenes/Scene06ReadyShelfCacheHit';
import {Scene07AnalogyToArchitecture} from './scenes/Scene07AnalogyToArchitecture';

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
    </>
  );
};
