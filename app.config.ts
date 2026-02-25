import 'dotenv/config';
import type { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'cat-duacode-app',
  slug: config.slug ?? 'cat-duacode-app',
  extra: {
    catApiKey: process.env.CAT_API_KEY,
  },
});
