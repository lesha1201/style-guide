import { defineConfig } from 'eslint/config';
import jest from 'eslint-plugin-jest';

import { TYPESCRIPT_FILES } from '../constants.js';
import jestRules from '../rules/jest.js';

export default defineConfig(
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  {
    rules: {
      ...jestRules,
    },
  },
  {
    files: TYPESCRIPT_FILES,
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': 'error',
    },
  },
);
