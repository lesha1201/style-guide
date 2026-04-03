// oxlint-disable typescript/no-unsafe-member-access, typescript/no-unsafe-argument
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';

import commentsRules from '../rules/comments.js';

/**
 * The base ESLint config which is shared among all environments.
 */
export default defineConfig(tseslint.configs.base, comments.recommended, {
  languageOptions: {
    globals: { ...globals.es2026 },
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      projectService: true,
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  rules: {
    ...commentsRules,
  },
});
