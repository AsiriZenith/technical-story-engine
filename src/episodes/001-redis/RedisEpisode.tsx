import type {Language} from '../../shared/localization';
import {Scene01Mystery} from './scenes/Scene01Mystery';

export type RedisEpisodeProps = {
  language: Language;
};

export const RedisEpisode: React.FC<RedisEpisodeProps> = ({language}) => {
  return <Scene01Mystery language={language} />;
};
