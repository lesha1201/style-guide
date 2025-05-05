import { fixupConfigRules } from '@eslint/compat';
import * as eslintrc from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';

import nextRules from '../rules/next.js';
import react from './react.js';

const compat = new eslintrc.FlatCompat();

export default defineConfig(
  react,
  fixupConfigRules(compat.extends('plugin:@next/next/core-web-vitals')),
  {
    rules: {
      ...nextRules,
    },
  },
);
