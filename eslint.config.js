import { defineConfig } from 'eslint/config';

import node from './eslint/configs/node.js';

export default defineConfig(node, {
  files: ['eslint/rules/**'],
  rules: {
    'sort-keys': 'error',
  },
});
