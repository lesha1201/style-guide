# Playground

A private workspace package that exercises every config published by
`@alexey-ryabov/style-guide`. It is intended for checking config changes and
dependency upgrades, not for running an application.

## What it covers

| Config     | Entrypoints                                                                    |
| ---------- | ------------------------------------------------------------------------------ |
| Oxlint     | `oxlint/base`, `oxlint/browser`, `oxlint/next`, `oxlint/node`, `oxlint/vitest` |
| ESLint     | `eslint/base`, `eslint/react`, `eslint/storybook`, `eslint/utils`              |
| Oxfmt      | `oxfmt`                                                                        |
| TypeScript | `typescript`                                                                   |

Oxlint runs with type-aware rules enabled via `oxlint-tsgolint`. ESLint uses the
same TypeScript 6 / TypeScript 7 split recommended in the main README:
`typescript` is aliased to TypeScript 6 for `typescript-eslint`, while
`@typescript/native` provides `tsc`.

The source is React/Next-shaped, but Next.js and Storybook are not installed.
Vitest is installed only for the test file types; the tests are never run. Only
the files needed to exercise lint, format, and type checking are present.

## Commands

From the repository root:

```sh
pnpm playground:check
pnpm playground:format
```

`playground:check` builds `dist/` first, then runs Oxlint, ESLint, Oxfmt,
`tsc`, and the diagnostics contract check.

From this directory, individual scripts are also available:

```sh
pnpm lint
pnpm lint:eslint
pnpm format:check
pnpm typecheck
pnpm check:diagnostics
```

These do not build `dist/`. Run `pnpm build` at the repository root after
changing package source files before running them directly.

## VS Code

Open the repository root. The Oxc extension discovers
`playground/oxlint.config.ts` and `playground/oxfmt.config.ts` as nested configs;
do not set `oxc.configPath` or `oxc.fmt.configPath`, because either setting
disables nested config discovery. The workspace settings already pin both to
`null` and enable format-on-save.

The playground configs import the package through `dist/`. Run `pnpm build`
after cloning or changing package source, then run **Oxc: Restart oxlint
Server** and **Oxc: Restart oxfmt Server** if the editor still shows stale
results.

## Checking dependency upgrades

```sh
pnpm up --latest -r
pnpm playground:check
```

`minimumReleaseAge` in `pnpm-workspace.yaml` may keep very fresh versions out.
To test the absolute latest versions:

```sh
pnpm up --latest -r --config.minimum-release-age=0
pnpm playground:check
```

Failures fall into three groups:

- The config no longer loads or a rule no longer exists.
- The clean fixture now reports a warning or error.
- The `fixtures/violations` contract no longer produces an expected rule.

## Diagnostics contract

`fixtures/violations/` contains intentionally bad code. Each file targets a
different part of the config:

- `oxlint.tsx` — Oxlint core and JSX accessibility rules
- `imports.ts` — import plugin rules
- `unicorn.ts` — Unicorn rules
- `react.tsx` — Oxlint React and React JS plugin rules
- `tsdoc.ts` — TSDoc syntax rules
- `eslint.tsx` — ESLint comment and type-aware React rules
- `story.stories.tsx` — Storybook rules

`fixtures/expected-diagnostics.json` lists the rule IDs and severities that must
still be reported. The check is presence-only, so new diagnostics do not fail.
Update the file when a rule or severity change is intentional.

## Caveats

- The package is consumed through a workspace link, so peers resolve from the
  workspace root. This is close to, but not identical to, a fresh npm install.
- The fixture deliberately does not run an application. Changes that only
  affect runtime behavior will not be detected here.
