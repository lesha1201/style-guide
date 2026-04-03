import { defineConfig } from 'oxlint';

import reactRules from '../rules/react.js';

export default defineConfig({
  plugins: ['react', 'jsx-a11y'],
  jsPlugins: [{ name: 'react-js', specifier: 'eslint-plugin-react' }],
  rules: {
    ...reactRules,
  },
});
