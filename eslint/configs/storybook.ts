import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import type { Linter } from 'eslint';

export default defineConfig(
  // oxlint-disable-next-line import/no-named-as-default-member
  storybook.configs['flat/recommended'] as unknown as Linter.Config,
);
