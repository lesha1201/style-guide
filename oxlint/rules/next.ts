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
} satisfies DummyRuleMap;

export default {
  ...a11yRules,
} satisfies DummyRuleMap;
