import {Interactive, interpolate} from 'remotion';
import {theme} from '../../shared/styles/theme';

export type ArchitectureNodeProps = {
  name: string;
  label: string;
  detail: string;
  accent: string;
};

export const ArchitectureNode: React.FC<ArchitectureNodeProps> = ({
  name,
  label,
  detail,
  accent,
}) => (
  <Interactive.Div
    name={name}
    style={{
      alignItems: 'center',
      backgroundColor: '#101d2f',
      border: `3px solid ${accent}`,
      borderRadius: 24,
      boxShadow: '0 18px 50px rgba(0, 0, 0, 0.25)',
      color: theme.foreground,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      justifyContent: 'center',
      minHeight: 220,
      padding: 28,
      width: 300,
    }}
  >
    <div style={{color: accent, fontSize: 28, fontWeight: 700, letterSpacing: 3}}>
      {detail}
    </div>
    <div style={{fontSize: 48, fontWeight: 700}}>{label}</div>
  </Interactive.Div>
);

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
