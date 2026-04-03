import { defineConfig } from 'oxlint';

import baseConfig from './base.js';

export default defineConfig({
  extends: [baseConfig],
  env: {
    node: true,
  },
});
