import eslintReact from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';

import { TYPESCRIPT_FILES } from '../constants.ts';
import { reactRules, reactTypeCheckedRules } from '../rules/react.ts';

export default defineConfig(
  eslintReact.configs['recommended-typescript'],
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
