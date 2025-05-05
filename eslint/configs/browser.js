import { defineConfig } from 'eslint/config';
import globals from 'globals';

import base from './_base.js';

export default defineConfig(base, {
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
});
