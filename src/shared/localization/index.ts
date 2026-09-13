export const supportedLanguages = ['en', 'de', 'fr'] as const;

export type Language = (typeof supportedLanguages)[number];

export const defaultLanguage: Language = 'en';

const messages = {
  en: {
    episodeNumber: 'VIDEO #001',
    titleLineOne: 'Why Your API Gets Faster',
    titleLineTwo: 'After Adding Redis',
    language: 'Language',
  },
  de: {
    episodeNumber: 'VIDEO #001',
    titleLineOne: 'Warum deine API schneller wird',
    titleLineTwo: 'wenn du Redis hinzufügst',
    language: 'Sprache',
  },
  fr: {
    episodeNumber: 'VIDÉO N° 001',
    titleLineOne: 'Pourquoi votre API accélère',
    titleLineTwo: 'avec Redis',
    language: 'Langue',
  },
} as const;

export type MessageKey = keyof (typeof messages)[typeof defaultLanguage];

export const translate = (language: Language, key: MessageKey): string =>
  messages[language]?.[key] ?? messages[defaultLanguage][key];
