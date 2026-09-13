export const architectureNodeSemantics = {
  client: {
    accent: '#65b5ff',
    role: 'REQUEST ORIGIN',
    shape: 'capsule',
  },
  application: {
    accent: '#9b8cff',
    role: 'ROUTING LOGIC',
    shape: 'double-border',
  },
  cache: {
    accent: '#ef4b42',
    role: 'FAST LOOKUP',
    shape: 'stack',
  },
  database: {
    accent: '#36c98f',
    role: 'SOURCE OF TRUTH',
    shape: 'cylinder',
  },
} as const;

export type ArchitectureNodeKind = keyof typeof architectureNodeSemantics;
