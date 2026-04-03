import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);
const nodeConfig: OxlintConfig = await jiti.import('./oxlint/configs/node.ts', {
  default: true,
});

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
