import eslintReact from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import { TYPESCRIPT_FILES } from '../constants.js';
import jsxA11yRules from '../rules/jsx-a11y.js';
import { reactRules, reactTypeCheckedRules } from '../rules/react.js';

export default defineConfig(
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.recommended,
  eslintReact.configs['recommended'],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  {
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactRules,
      ...jsxA11yRules,
    },
  },
  {
    files: TYPESCRIPT_FILES,
    rules: {
      ...reactTypeCheckedRules,
    },
  },
);
