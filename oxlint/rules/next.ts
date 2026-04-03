import type { DummyRuleMap } from 'oxlint';

/**
 * `jsx-a11y` rules configured for Next.js.
 */
const a11yRules = {
  'jsx-a11y/alt-text': [
    'warn',
    {
      elements: ['img'],
      img: ['Image'],
    },
  ],
} as DummyRuleMap;

export default {
  ...a11yRules,
} as DummyRuleMap;
