import type { DummyRuleMap } from 'oxlint';

export default {
  'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
  'import/first': 'error',
  'import/no-absolute-path': 'error',
  'import/no-cycle': process.env.CI ? 'error' : 'off',
  'import/no-duplicates': 'warn',
  'import/no-mutable-exports': 'error',
  'import/no-named-as-default': 'warn',
  'import/no-named-as-default-member': 'warn',
  'import/no-self-import': 'error',
} as DummyRuleMap;
