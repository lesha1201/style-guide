import eslintReact from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';

import type { Linter } from 'eslint';
import { TYPESCRIPT_FILES } from '../constants.js';
import { reactRules, reactTypeCheckedRules } from '../rules/react.js';

export default defineConfig(
  eslintReact.configs['recommended-typescript'] as unknown as Linter.Config,
  {
    rules: {
      ...reactRules,
    },
  },
  {
    files: TYPESCRIPT_FILES,
    rules: {
      ...reactTypeCheckedRules,
    },
  },
);
