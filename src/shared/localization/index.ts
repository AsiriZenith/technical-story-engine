export const supportedLanguages = ['en', 'de', 'fr'] as const;

export type Language = (typeof supportedLanguages)[number];

export const defaultLanguage: Language = 'en';

const messages = {
  en: {
    episodeNumber: 'VIDEO #001',
    titleLineOne: 'Why Your API Gets Faster',
    titleLineTwo: 'After Adding Redis',
    language: 'Language',
    request: 'Request',
    application: 'Application',
    database: 'Database',
    requestOrigin: 'Request origin',
    routingLogic: 'Routing logic',
    sourceOfTruth: 'Source of truth',
    beforeRedis: 'Before Redis',
    afterRedis: 'After Redis',
    sameRequest: 'Same request. Same data.',
    fastLookup: 'Fast lookup',
    whatChanged: 'What changed?',
    mystery: 'The mystery',
  },
  de: {
    episodeNumber: 'VIDEO #001',
    titleLineOne: 'Warum deine API schneller wird',
    titleLineTwo: 'wenn du Redis hinzufügst',
    language: 'Sprache',
    request: 'Anfrage',
    application: 'Anwendung',
    database: 'Datenbank',
    requestOrigin: 'Anfragequelle',
    routingLogic: 'Routing-Logik',
    sourceOfTruth: 'Datenquelle',
    beforeRedis: 'Vor Redis',
    afterRedis: 'Nach Redis',
    sameRequest: 'Gleiche Anfrage. Gleiche Daten.',
    fastLookup: 'Schneller Zugriff',
    whatChanged: 'Was hat sich geändert?',
    mystery: 'Das Rätsel',
  },
  fr: {
    episodeNumber: 'VIDÉO N° 001',
    titleLineOne: 'Pourquoi votre API accélère',
    titleLineTwo: 'avec Redis',
    language: 'Langue',
    request: 'Requête',
    application: 'Application',
    database: 'Base de données',
    requestOrigin: 'Origine de la requête',
    routingLogic: 'Logique de routage',
    sourceOfTruth: 'Source de vérité',
    beforeRedis: 'Avant Redis',
    afterRedis: 'Après Redis',
    sameRequest: 'Même requête. Mêmes données.',
    fastLookup: 'Accès rapide',
    whatChanged: 'Qu’est-ce qui a changé ?',
    mystery: 'Le mystère',
  },
} as const;

export type MessageKey = keyof (typeof messages)[typeof defaultLanguage];

export const translate = (language: Language, key: MessageKey): string =>
  messages[language]?.[key] ?? messages[defaultLanguage][key];
