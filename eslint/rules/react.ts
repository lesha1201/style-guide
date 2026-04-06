import type { Linter } from 'eslint';

const disabledReactRules = {
  '@eslint-react/dom/no-missing-button-type': 'off',
  '@eslint-react/jsx-no-children-prop': 'off',
  '@eslint-react/no-array-index-key': 'off',
  '@eslint-react/set-state-in-effect': 'off',
} as Linter.RulesRecord;

export const reactRules = {
  ...disabledReactRules,
} as Linter.RulesRecord;

const disabledReactTypeCheckedRules = {
  '@eslint-react/dom/no-string-style-prop': 'off',
  '@eslint-react/dom/no-unknown-property': 'off',
} as Linter.RulesRecord;

export const reactTypeCheckedRules = {
  ...disabledReactTypeCheckedRules,
  '@eslint-react/no-leaked-conditional-rendering': 'warn',
} as Linter.RulesRecord;
