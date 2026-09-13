import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../../shared/styles/theme';
import {layout, typography} from '../../shared/styles/visual-system';
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
        padding: `${layout.safeVertical}px ${layout.safeHorizontal}px`,
      }}
    >
      <div style={{color: theme.accent, ...typography.technicalLabel}}>
        DEV / ARCHITECTURE NODES
      </div>
      <div style={{marginTop: 22, ...typography.sectionHeading}}>Semantic request path</div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: layout.nodeGap,
          justifyContent: 'center',
          marginTop: 95,
        }}
      >
        <ArchitectureNode name="Client node" label="Client" kind="client" />
        <div style={{color: theme.muted, fontSize: 54}}>→</div>
        <ArchitectureNode
          name="Application node"
          label="Application"
          kind="application"
        />
        <div style={{color: theme.muted, fontSize: 54}}>→</div>
        <ArchitectureNode name="Redis node" label="Redis" kind="cache" />
        <div style={{color: theme.muted, fontSize: 54}}>→</div>
        <ArchitectureNode
          name="Database node"
          label="Database"
          kind="database"
        />
      </div>
      <RequestPacket frame={frame} fps={fps} />
      <div
        style={{
          bottom: layout.captionBottom,
          color: theme.muted,
          left: layout.safeHorizontal,
          opacity: interpolate(frame, [0, fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          position: 'absolute',
        }}
      >
        Shape + icon + role label carry meaning when color is unavailable.
      </div>
    </AbsoluteFill>
  );
};
