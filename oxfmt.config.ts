import { defineConfig } from 'oxfmt';

import defaultConfig from './oxfmt/index.ts';

export default defineConfig({
  ...defaultConfig,
  ignorePatterns: ['pnpm-lock.yaml'],
});
