import {AbsoluteFill} from 'remotion';
import type {Language} from '../../shared/localization';
import {layout, provisionalColors, typography} from '../../shared/styles/visual-system';
import {theme} from '../../shared/styles/theme';

export type DevTypographyProps = {language: Language};

const stressCopy: Record<
  Language,
  {languageName: string; status: string; heading: string; explanation: string; disclaimer: string}
> = {
  en: {
    languageName: 'English',
    status: 'CACHE HIT',
    heading: 'Why repeated requests become faster',
    explanation:
      'A cache hit lets the application reuse a prepared result instead of repeating expensive database work.',
    disclaimer: 'Illustrative latency values; actual performance depends on the workload.',
  },
  de: {
    languageName: 'Deutsch',
    status: 'CACHE-TREFFER',
    heading: 'Warum wiederholte Anfragen schneller werden',
    explanation:
      'Bei einem Cache-Treffer kann die Anwendung ein vorbereitetes Ergebnis wiederverwenden, statt aufwendige Datenbankarbeit zu wiederholen.',
    disclaimer: 'Beispielhafte Latenzwerte; die tatsächliche Leistung hängt von der Arbeitslast ab.',
  },
  fr: {
    languageName: 'Français',
    status: 'SUCCÈS DU CACHE',
    heading: 'Pourquoi les requêtes répétées deviennent plus rapides',
    explanation:
      "Un succès du cache permet à l'application de réutiliser un résultat préparé au lieu de répéter un traitement coûteux de la base de données.",
    disclaimer: 'Valeurs de latence indicatives ; les performances réelles dépendent de la charge.',
  },
};

export const DevTypography: React.FC<DevTypographyProps> = ({language}) => {
  const copy = stressCopy[language];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        padding: `${layout.safeVertical}px ${layout.safeHorizontal}px`,
      }}
    >
      <div style={{alignItems: 'center', display: 'flex', justifyContent: 'space-between'}}>
        <div style={{color: theme.accent, ...typography.technicalLabel}}>DEV / TYPOGRAPHY</div>
        <div
          style={{
            backgroundColor: provisionalColors.panelRaised,
            border: `2px solid ${provisionalColors.line}`,
            borderRadius: 999,
            padding: '12px 20px',
            ...typography.caption,
          }}
        >
          {copy.languageName} · {language.toUpperCase()}
        </div>
      </div>

      <div style={{display: 'grid', gap: 76, gridTemplateColumns: '1.55fr 0.9fr', marginTop: 48}}>
        <div style={{maxWidth: layout.maxTextWidth}}>
          <div style={{color: provisionalColors.number, ...typography.display}}>180 ms → 8 ms</div>
          <div style={{marginTop: 32, ...typography.sceneTitle}}>{copy.heading}</div>
          <div style={{color: theme.muted, marginTop: 26, ...typography.body}}>
            {copy.explanation}
          </div>
        </div>

        <div
          style={{
            backgroundColor: provisionalColors.panel,
            border: `2px solid ${provisionalColors.line}`,
            borderRadius: 24,
            padding: 34,
          }}
        >
          <div style={{color: theme.muted, ...typography.technicalLabel}}>LABEL STRESS</div>
          <div
            style={{
              backgroundColor: provisionalColors.success,
              borderRadius: 999,
              display: 'inline-block',
              marginTop: 26,
              maxWidth: '100%',
              padding: '14px 22px',
              ...typography.status,
            }}
          >
            {copy.status}
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30}}>
            {['APPLICATION', 'REDIS / CACHE', 'DATABASE'].map((label) => (
              <div
                key={label}
                style={{
                  border: `2px solid ${provisionalColors.line}`,
                  borderRadius: 10,
                  padding: '10px 14px',
                  ...typography.technicalLabel,
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: '#0a1525',
              borderRadius: 12,
              color: provisionalColors.code,
              marginTop: 30,
              padding: '18px 20px',
              ...typography.code,
            }}
          >
            user:42
          </div>
          <div style={{color: theme.muted, marginTop: 30, ...typography.caption}}>
            Caption: prepared data returned from cache.
          </div>
        </div>
      </div>

      <div
        style={{
          bottom: layout.captionBottom,
          color: theme.muted,
          left: layout.safeHorizontal,
          maxWidth: layout.maxTextWidth,
          position: 'absolute',
          ...typography.disclaimer,
        }}
      >
        {copy.disclaimer}
      </div>
    </AbsoluteFill>
  );
};
