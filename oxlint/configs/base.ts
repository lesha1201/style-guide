import { defineConfig } from 'oxlint';

import { TYPESCRIPT_FILES } from '../constants.ts';
import importRules from '../rules/import.ts';
import oxcRules from '../rules/oxc.ts';
import standardRules from '../rules/standard.ts';
import stylisticRules from '../rules/stylistic.ts';
import tsdocRules from '../rules/tsdoc.ts';
import typescriptRules from '../rules/typescript.ts';
import unicornRules from '../rules/unicorn.ts';

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
