import type { Linter } from 'eslint';

import eslintReact from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';

import { TYPESCRIPT_FILES } from '../constants.ts';
import { reactRules, reactTypeCheckedRules } from '../rules/react.ts';

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
