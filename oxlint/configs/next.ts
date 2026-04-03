import { defineConfig } from 'oxlint';

import nextRules from '../rules/next.js';
import reactConfig from './react.js';

export default defineConfig({
  extends: [reactConfig],
  plugins: ['nextjs'],
  rules: {
    ...nextRules,
  },
});
