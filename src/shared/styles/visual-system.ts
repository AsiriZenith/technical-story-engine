export const typography = {
  display: {fontSize: 112, fontWeight: 800, lineHeight: 0.95},
  sceneTitle: {fontSize: 80, fontWeight: 800, lineHeight: 1.04},
  sectionHeading: {fontSize: 52, fontWeight: 700, lineHeight: 1.12},
  body: {fontSize: 34, fontWeight: 400, lineHeight: 1.42},
  technicalLabel: {fontSize: 26, fontWeight: 800, letterSpacing: 2},
  code: {fontFamily: 'Consolas, monospace', fontSize: 30, fontWeight: 600},
  status: {fontSize: 28, fontWeight: 800, letterSpacing: 2},
  caption: {fontSize: 24, fontWeight: 500, lineHeight: 1.35},
  disclaimer: {fontSize: 20, fontWeight: 500, lineHeight: 1.35},
} as const;

export type TypographyRole = keyof typeof typography;

export const layout = {
  safeHorizontal: 120,
  safeVertical: 90,
  safeTitleHeight: 220,
  nodeGap: 58,
  diagramGutter: 48,
  captionBottom: 64,
  maxTextWidth: 1040,
} as const;

export const provisionalColors = {
  panel: '#111f33',
  panelRaised: '#172942',
  line: '#38506d',
  code: '#b8cff0',
  number: '#ffd166',
  success: '#25a66a',
  warning: '#d69e2e',
  placeholder: '#718096',
} as const;
