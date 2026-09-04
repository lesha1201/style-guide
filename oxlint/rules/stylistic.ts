import type { DummyRuleMap } from 'oxlint';

export default {
  '@stylistic/padding-line-between-statements': [
    'warn',
    // Blank line before `return`
    { blankLine: 'always', next: 'return', prev: '*' },
    // Blank line after all directives (e.g. `use strict`)
    { blankLine: 'always', next: '*', prev: 'directive' },
    { blankLine: 'any', next: 'directive', prev: 'directive' },
  ],
} satisfies DummyRuleMap;
