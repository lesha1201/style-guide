import { defineConfig } from 'oxlint';

import importRules from '../rules/import.js';
import standardRules from '../rules/standard.js';
import stylisticRules from '../rules/stylistic.js';
import unicornRules from '../rules/unicorn.js';
import tsdocRules from '../rules/tsdoc.js';
import typescriptRules from '../rules/typescript.js';
import { TYPESCRIPT_FILES } from '../constants.js';
import oxcRules from '../rules/oxc.js';

export default defineConfig({
  // There is no recommended configs in Oxlint for now and instead it has
  // categories for rules so we can enable/disable all rules in a certain
  // category at once. We only enable `correctness` category and configure
  // all other rules manually.
  categories: {
    correctness: 'error',
  },
  plugins: ['oxc', 'eslint', 'unicorn', 'import', 'typescript'],
  jsPlugins: ['@stylistic/eslint-plugin', 'eslint-plugin-tsdoc'],
  env: {
    es2026: true,
  },
  rules: {
    ...oxcRules,
    ...standardRules,
    ...stylisticRules,
    ...importRules,
    ...unicornRules,
    ...typescriptRules,
  },
  overrides: [
    {
      files: TYPESCRIPT_FILES,
      rules: {
        ...tsdocRules,
      },
    },
  ],
});
