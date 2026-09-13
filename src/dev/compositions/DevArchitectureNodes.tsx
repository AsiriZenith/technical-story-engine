import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../../shared/styles/theme';
import {ArchitectureNode, RequestPacket} from '../components/ArchitectureNode';

export const DevArchitectureNodes: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        padding: '100px 120px',
      }}
    >
      <div style={{color: theme.accent, fontSize: 24, fontWeight: 800, letterSpacing: 5}}>
        DEV / ARCHITECTURE NODES
      </div>
      <div style={{fontSize: 58, fontWeight: 750, marginTop: 26}}>Request path primitives</div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 75,
          justifyContent: 'center',
          marginTop: 120,
        }}
      >
        <ArchitectureNode name="Client node" label="Client" detail="REQUEST" accent="#65b5ff" />
        <div style={{color: theme.muted, fontSize: 54}}>→</div>
        <ArchitectureNode
          name="Application node"
          label="Application"
          detail="ROUTER"
          accent="#9b8cff"
        />
        <div style={{color: theme.muted, fontSize: 54}}>→</div>
        <ArchitectureNode name="Redis node" label="Redis" detail="CACHE" accent="#dc382d" />
        <div style={{color: theme.muted, fontSize: 54}}>→</div>
        <ArchitectureNode
          name="Database node"
          label="Database"
          detail="SOURCE"
          accent="#36c98f"
        />
      </div>
      <RequestPacket frame={frame} fps={fps} />
      <div
        style={{
          bottom: 90,
          color: theme.muted,
          fontSize: 28,
          left: 120,
          opacity: interpolate(frame, [0, fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          position: 'absolute',
        }}
      >
        Simple placeholders for isolated component iteration.
      </div>
    </AbsoluteFill>
  );
};
