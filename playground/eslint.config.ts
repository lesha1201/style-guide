import { fileURLToPath } from 'node:url';

import baseConfig from '@alexey-ryabov/style-guide/eslint/base';
import reactConfig from '@alexey-ryabov/style-guide/eslint/react';
import storybookConfig from '@alexey-ryabov/style-guide/eslint/storybook';
import { includeIgnoreFile } from '@alexey-ryabov/style-guide/eslint/utils';
import { defineConfig } from 'eslint/config';

const gitignorePath = fileURLToPath(new URL('../.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  baseConfig,
  reactConfig,
  storybookConfig,
]);
