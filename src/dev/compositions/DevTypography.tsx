import {AbsoluteFill, Interactive} from 'remotion';
import {theme} from '../../shared/styles/theme';

export const DevTypography: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: theme.background,
      color: theme.foreground,
      fontFamily: theme.fontFamily,
      padding: '100px 120px',
    }}
  >
    <Interactive.Div
      name="Playground label"
      style={{color: theme.accent, fontSize: 24, fontWeight: 800, letterSpacing: 5}}
    >
      DEV / TYPOGRAPHY
    </Interactive.Div>
    <Interactive.Div
      name="Primary title"
      style={{fontSize: 104, fontWeight: 800, lineHeight: 1.02, marginTop: 42}}
    >
      One focal idea.
    </Interactive.Div>
    <Interactive.Div
      name="Secondary heading"
      style={{color: theme.muted, fontSize: 52, fontWeight: 600, marginTop: 22}}
    >
      A visual sandbox, not a final identity.
    </Interactive.Div>
    <div style={{alignItems: 'end', display: 'flex', gap: 72, marginTop: 105}}>
      <Interactive.Div name="Body copy" style={{fontSize: 34, lineHeight: 1.45, width: 690}}>
        Compare hierarchy, contrast, and comfortable reading sizes before these choices reach an
        episode.
      </Interactive.Div>
      <Interactive.Div
        name="Technical label"
        style={{
          backgroundColor: '#14233a',
          border: '2px solid #2c4361',
          borderRadius: 14,
          color: '#b8cff0',
          fontFamily: 'Consolas, monospace',
          fontSize: 31,
          padding: '20px 26px',
        }}
      >
        GET /users/42
      </Interactive.Div>
      <Interactive.Div
        name="Numeric emphasis"
        style={{color: '#ffd166', fontSize: 86, fontWeight: 800, lineHeight: 0.9}}
      >
        180 ms
      </Interactive.Div>
    </div>
    <Interactive.Div
      name="Status label"
      style={{
        alignSelf: 'flex-start',
        backgroundColor: '#1e8e5a',
        borderRadius: 999,
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: 3,
        marginTop: 75,
        padding: '16px 26px',
      }}
    >
      CACHE HIT
    </Interactive.Div>
  </AbsoluteFill>
);
