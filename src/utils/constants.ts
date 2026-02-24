export const APP_CONFIG = {
  name: 'Cat Lovers App',
  version: '1.0.0',
  author: 'Gherson Sánchez',
} as const;

export const API_CONFIG = {
  baseURL: 'https://api.thecatapi.com/v1',
  apiKey: 'REPLACE_WITH_YOUR_API_KEY',
} as const;

export const COLORS = {
  brand: {
    DEFAULT: '#8B5CF6',
    light: '#EDE9FE',
    dark: '#5B21B6',
  },
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: {
    main: '#0F172A',
    muted: '#64748B',
  },
} as const;
