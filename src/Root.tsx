import {Composition, Folder} from 'remotion';
import {RedisEpisode} from './episodes/001-redis/RedisEpisode';
import {redisEpisodeConfig} from './episodes/001-redis/episode.config';

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Episodes">
      {redisEpisodeConfig.languages.map((language) => (
        <Composition
          key={language}
          id={`Redis-${language.toUpperCase()}`}
          component={RedisEpisode}
          durationInFrames={redisEpisodeConfig.durationInFrames}
          fps={redisEpisodeConfig.fps}
          width={redisEpisodeConfig.width}
          height={redisEpisodeConfig.height}
          defaultProps={{language}}
        />
      ))}
    </Folder>
  );
};
