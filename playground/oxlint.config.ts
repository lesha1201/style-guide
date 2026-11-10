import baseConfig from '@alexey-ryabov/style-guide/oxlint/base';
import browserConfig from '@alexey-ryabov/style-guide/oxlint/browser';
import nextConfig from '@alexey-ryabov/style-guide/oxlint/next';
import nodeConfig from '@alexey-ryabov/style-guide/oxlint/node';
import vitestConfig from '@alexey-ryabov/style-guide/oxlint/vitest';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig, nodeConfig, browserConfig, nextConfig, vitestConfig],
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: '19',
    },
    'jsx-a11y': {
      polymorphicPropName: 'as',
      components: {
        Button: 'button',
        Checkbox: 'input',
        FieldLabel: 'label',
        Input: 'input',
        Radio: 'input',
      },
    },
  },
});
