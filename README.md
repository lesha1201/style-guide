# Style Guide

This repository is the home of my personal style guide, which includes configs
for popular linting and styling tools.

The following configs are available, and are designed to be used together.

- [Oxfmt](#oxfmt)
- [Oxlint](#oxlint)
- [ESLint](#eslint)
- [TypeScript](#typescript)

## Contributing

Please read [contributing](./CONTRIBUTING.md) guide before creating a pull
request.

## Installation

Install the main package:

```sh
pnpm i -D @alexey-ryabov/style-guide
```

Install the required peer dependencies depending on which configs you use:

```sh
# If you use @alexey-ryabov/style-guide/oxfmt
pnpm i -D oxfmt

# If you use @alexey-ryabov/style-guide/oxlint
pnpm i -D oxlint

# If you use @alexey-ryabov/style-guide/eslint
pnpm i -D eslint

# If you use @alexey-ryabov/style-guide/typescript
pnpm i -D typescript
```

## Oxfmt

> Note: Oxfmt is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: https://oxc.rs/docs/guide/usage/formatter/quickstart.html

Example of how to use the config:

```js
import defaultConfig from '@alexey-ryabov/style-guide/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...defaultConfig,
  ignorePatterns: ['pnpm-lock.yaml'],
});
```

## Oxlint

> Note: Oxlint is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: https://oxc.rs/docs/guide/usage/linter/quickstart.html

This Oxlint config is designed to be composable. It's designed to be used
in TypeScript projects.

The following base configs are available. You can use one or all of these
configs, but they should always be first in the configs order:

- `@alexey-ryabov/style-guide/oxlint/base`
- `@alexey-ryabov/style-guide/oxlint/browser`
  - extends `@alexey-ryabov/style-guide/oxlint/base`
- `@alexey-ryabov/style-guide/oxlint/node`
  - extends `@alexey-ryabov/style-guide/oxlint/base`

The following additional configs are available:

- `@alexey-ryabov/style-guide/oxlint/react`
- `@alexey-ryabov/style-guide/oxlint/next`
  - extends `@alexey-ryabov/style-guide/oxlint/react`
- `@alexey-ryabov/style-guide/oxlint/vitest`

### Type-aware linting

If you want type-aware linting you need to enable it in your root Oxlint config:

```ts
import baseConfig from '@alexey-ryabov/style-guide/oxlint/base';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
  options: {
    typeAware: true,
  },
});
```

And install `oxlint-tsgolint`:

```sh
pnpm i -D oxlint-tsgolint
```

> For more details see: https://oxc.rs/docs/guide/usage/linter/type-aware.html

### Examples

#### Next.js

```ts
import base from '@alexey-ryabov/style-guide/oxlint/base';
import node from '@alexey-ryabov/style-guide/oxlint/node';
import browser from '@alexey-ryabov/style-guide/oxlint/browser';
import next from '@alexey-ryabov/style-guide/oxlint/next';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base, node, browser, next],
  jsPlugins: ['eslint-plugin-turbo'],
  options: {
    typeAware: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    'jsx-a11y': {
      polymorphicPropName: 'as',
      components: {
        Button: 'button',
        Checkbox: 'input',
        Radio: 'input',
        Input: 'input',
        FieldLabel: 'label',
      },
    },
  },
  rules: {
    'turbo/no-undeclared-env-vars': 'error',
  },
});
```

## ESLint

> Note: ESLint is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: https://eslint.org/docs/user-guide/getting-started#installation-and-usage

Our primary linting tool is Oxlint and this ESLint config is complementary to
enable some useful plugins that don't work well or missing in Oxlint. It's
minimal and only enables certain specific rules.

- `@alexey-ryabov/style-guide/eslint/base`
- `@alexey-ryabov/style-guide/eslint/react`
- `@alexey-ryabov/style-guide/eslint/storybook`

If you extend some popular configs for ESLint, you might want to use
`eslint-plugin-oxlint` to disable overlapping rules in ESLint. Please
refer to the official documentation: https://github.com/oxc-project/eslint-plugin-oxlint

## TypeScript

We provide a base config for TypeScript which contains some defaults we usually
use.

To use it, just extend it in your `tsconfig.json`:

```json
{
  "extends": "@alexey-ryabov/style-guide/typescript"
}
```

The base config isn't intended to be used as a complete one, so you might need
to add more settings in your `tsconfig.json`. For example:

```json
{
  "extends": "@alexey-ryabov/style-guide/typescript",
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".storybook/**/*"
  ],
  "exclude": ["node_modules"]
}
```

## Acknowledge

Inspired by https://github.com/vercel/style-guide.
