import {AbsoluteFill} from 'remotion';
import {translate, type Language} from '../../shared/localization';
import {theme} from '../../shared/styles/theme';

export type RedisEpisodeProps = {
  language: Language;
};

export const RedisEpisode: React.FC<RedisEpisodeProps> = ({language}) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: theme.background,
        color: theme.foreground,
        display: 'flex',
        fontFamily: theme.fontFamily,
        justifyContent: 'center',
        padding: 120,
        textAlign: 'center',
      }}
    >
      <div>
        <div
          style={{
            color: theme.accent,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 6,
            marginBottom: 36,
          }}
        >
          {translate(language, 'episodeNumber')}
        </div>
        <h1
          style={{
            fontSize: 82,
            lineHeight: 1.08,
            margin: 0,
            maxWidth: 1400,
          }}
        >
          {translate(language, 'titleLineOne')}
          <br />
          {translate(language, 'titleLineTwo')}
        </h1>
        <div
          style={{
            color: theme.muted,
            fontSize: 30,
            marginTop: 52,
            textTransform: 'uppercase',
          }}
        >
          {translate(language, 'language')}: {language}
        </div>
      </div>
    </AbsoluteFill>
  );
};
