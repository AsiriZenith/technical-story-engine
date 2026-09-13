import {Interactive, interpolate} from 'remotion';
import {
  architectureNodeSemantics,
  type ArchitectureNodeKind,
} from '../../shared/architecture/node-semantics';
import {theme} from '../../shared/styles/theme';
import {provisionalColors, typography} from '../../shared/styles/visual-system';

export type ArchitectureNodeProps = {
  name: string;
  label: string;
  kind: ArchitectureNodeKind;
};

const NodeIcon: React.FC<{kind: ArchitectureNodeKind; accent: string}> = ({kind, accent}) => {
  if (kind === 'database') {
    return (
      <svg width="66" height="52" viewBox="0 0 66 52" aria-hidden="true">
        <ellipse cx="33" cy="10" rx="27" ry="8" fill="none" stroke={accent} strokeWidth="4" />
        <path d="M6 10v30c0 4 12 8 27 8s27-4 27-8V10" fill="none" stroke={accent} strokeWidth="4" />
        <path d="M6 25c0 4 12 8 27 8s27-4 27-8" fill="none" stroke={accent} strokeWidth="3" />
      </svg>
    );
  }

  if (kind === 'cache') {
    return (
      <svg width="66" height="52" viewBox="0 0 66 52" aria-hidden="true">
        {[7, 21, 35].map((y) => (
          <rect key={y} x="7" y={y} width="52" height="10" rx="5" fill={accent} />
        ))}
      </svg>
    );
  }

  if (kind === 'application') {
    return (
      <svg width="66" height="52" viewBox="0 0 66 52" aria-hidden="true">
        <path d="M24 8 9 26l15 18M42 8l15 18-15 18" fill="none" stroke={accent} strokeWidth="5" />
      </svg>
    );
  }

  return (
    <svg width="66" height="52" viewBox="0 0 66 52" aria-hidden="true">
      <circle cx="23" cy="26" r="15" fill="none" stroke={accent} strokeWidth="4" />
      <path d="M36 26h22m-9-9 9 9-9 9" fill="none" stroke={accent} strokeWidth="4" />
    </svg>
  );
};

export const ArchitectureNode: React.FC<ArchitectureNodeProps> = ({
  name,
  label,
  kind,
}) => {
  const semantics = architectureNodeSemantics[kind];

  return (
    <Interactive.Div
      name={name}
      style={{
        alignItems: 'center',
        backgroundColor: provisionalColors.panel,
        borderColor: semantics.accent,
        borderRadius: semantics.shape === 'capsule' ? 999 : semantics.shape === 'stack' ? 14 : 28,
        borderStyle: semantics.shape === 'double-border' ? 'double' : 'solid',
        borderWidth: semantics.shape === 'double-border' ? 7 : 3,
        boxShadow:
          semantics.shape === 'stack'
            ? `inset 0 -12px 0 ${provisionalColors.panelRaised}, 0 18px 50px rgba(0, 0, 0, 0.25)`
            : '0 18px 50px rgba(0, 0, 0, 0.25)',
        color: theme.foreground,
        display: 'flex',
        flexDirection: 'column',
        gap: 13,
        height: 270,
        justifyContent: 'center',
        padding: 24,
        width: 300,
      }}
    >
      <NodeIcon kind={kind} accent={semantics.accent} />
      <div style={{...typography.sectionHeading, fontSize: 44}}>{label}</div>
      <div style={{color: semantics.accent, ...typography.technicalLabel, fontSize: 20}}>
        {semantics.role}
      </div>
    </Interactive.Div>
  );
};

export type RequestPacketProps = {
  frame: number;
  fps: number;
};

export const RequestPacket: React.FC<RequestPacketProps> = ({frame, fps}) => (
  <div
    style={{
      alignItems: 'center',
      backgroundColor: '#f6f8fb',
      border: '5px solid #08111f',
      borderRadius: 999,
      color: '#08111f',
      display: 'flex',
      fontSize: 24,
      fontWeight: 800,
      height: 82,
      justifyContent: 'center',
      left: interpolate(frame, [0, 4 * fps], [196, 1456], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
      position: 'absolute',
      top: 615,
      width: 82,
    }}
  >
    GET
  </div>
);
