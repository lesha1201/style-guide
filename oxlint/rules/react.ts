import type { DummyRuleMap } from 'oxlint';

export default {
  'react-js/function-component-definition': 'warn',
  'react-js/hook-use-state': 'warn',
  'react-js/jsx-sort-props': ['warn', { reservedFirst: true }],
  'react-js/no-unstable-nested-components': ['error', { allowAsProps: true }],
  'react/jsx-boolean-value': 'warn',
  'react/jsx-curly-brace-presence': 'warn',
  'react/jsx-fragments': 'warn',
  'react/jsx-no-constructed-context-values': 'error',
  'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
  'react/jsx-pascal-case': 'warn',
  'react/self-closing-comp': 'warn',
} as DummyRuleMap;
