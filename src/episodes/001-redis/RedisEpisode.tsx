import {Sequence} from 'remotion';
import type {Language} from '../../shared/localization';
import {scene01Window, scene02Window} from './episode.config';
import {Scene01Mystery} from './scenes/Scene01Mystery';
import {Scene02LatencyBreakdown} from './scenes/Scene02LatencyBreakdown';

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
    </>
  );
};
