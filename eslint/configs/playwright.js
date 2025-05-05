import { defineConfig } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';

import playwrightRules from '../rules/playwright.js';

export default defineConfig(playwright.configs['flat/recommended'], {
  rules: {
    ...playwrightRules,
  },
});
