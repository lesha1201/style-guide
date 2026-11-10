import { defineConfig } from 'oxfmt';

import defaultConfig from './oxfmt/index.ts';

export default defineConfig({
  ...defaultConfig,
  ignorePatterns: ['playground/**', 'pnpm-lock.yaml'],
});
