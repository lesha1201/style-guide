import { defineConfig } from 'oxlint';

import nodeConfig from './oxlint/configs/node.ts';

export default defineConfig({
  extends: [nodeConfig],
  // TODO: `env` isn't inherited https://github.com/oxc-project/oxc/issues/20087
  env: {
    es2026: true,
    node: true,
  },
  overrides: [
    {
      files: ['./oxlint/rules/**/*', './eslint/rules/**/*'],
      rules: {
        'sort-keys': [
          'warn',
          'asc',
          { allowLineSeparatedGroups: true, natural: true },
        ],
      },
    },
  ],
});
