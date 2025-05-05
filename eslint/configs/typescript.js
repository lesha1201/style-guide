import { defineConfig } from 'eslint/config';
import tsdoc from 'eslint-plugin-tsdoc';
import * as tseslint from 'typescript-eslint';

import { TYPESCRIPT_FILES } from '../constants.js';
import tsdocRules from '../rules/tsdoc.js';
import typescriptRules from '../rules/typescript.js';

export default defineConfig(
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      tsdoc,
    },
    rules: {
      ...typescriptRules,
    },
  },
  {
    files: TYPESCRIPT_FILES,
    rules: {
      ...tsdocRules,
    },
  },
);
