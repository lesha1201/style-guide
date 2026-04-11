import { defineConfig } from 'oxlint';

import baseConfig from './base.ts';

export default defineConfig({
  extends: [baseConfig],
  env: {
    node: true,
  },
});
