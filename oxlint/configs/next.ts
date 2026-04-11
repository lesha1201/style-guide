import { defineConfig } from 'oxlint';

import nextRules from '../rules/next.ts';
import reactConfig from './react.ts';

export default defineConfig({
  extends: [reactConfig],
  plugins: ['nextjs'],
  rules: {
    ...nextRules,
  },
});
