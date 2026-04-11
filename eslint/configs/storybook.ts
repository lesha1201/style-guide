import type { Linter } from 'eslint';

import storybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  // oxlint-disable-next-line import/no-named-as-default-member
  storybook.configs['flat/recommended'] as unknown as Linter.Config,
);
