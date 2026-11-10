# AGENTS.md

Publishable ESM package `@alexey-ryabov/style-guide`: shared Oxlint, Oxfmt,
ESLint, and TypeScript configs. The repo also contains a private `playground`
workspace package that exercises the public configs.

## Environment

- Development tooling targets POSIX (Linux/macOS) only. Windows is not a
  supported development environment.
- Repo scripts and playground code may assume POSIX commands and binaries. Don't
  add Windows-specific branches to them.
- This applies to repo tooling only; published configs must remain
  platform-agnostic.

## Communication

- Prefer concise, plain-language answers. Lead with the answer; use examples
  when they explain better than prose.
- Ask when something consequential is unclear instead of guessing. Distinguish
  facts from suggestions.

## Commands

- `pnpm i` — install. pnpm 11.25.0 via Corepack; Node 24 (`.node-version`).
- `pnpm format` / `pnpm format:check` — Oxfmt. There is no Prettier;
  `.prettierignore` is vestigial.
- `pnpm typecheck` — `tsc --noEmit`.
- `pnpm build` — `rm -rf dist && tsc`; emits gitignored `dist/`. Never edit
  `dist/` by hand; `prepublishOnly` builds it on publish.
- `pnpm lint` — Oxlint using this repo's own `oxlint.config.ts` with
  `--disable-nested-config`, since the playground has its own config.
- `pnpm playground:check` — build `dist/`, then run the playground's Oxlint,
  ESLint, Oxfmt, TypeScript, and diagnostics checks. `pnpm playground:format`
  formats the playground. The playground is local-only and not part of CI.
- There is no unit-test suite. Use `pnpm playground:check` to validate configs
  end to end; it builds `dist/` first because consumers receive only `dist/` +
  `typescript/`.
- CI check order: commitlint (PR commits) → `format:check` → `typecheck` →
  `lint`.
- `import/no-cycle` is `error` only when `CI` is set; use `CI=true pnpm lint` to
  catch cycles locally.

## Playground

`playground/` is a private workspace package that exercises every public config
end to end. It imports the package through `dist/`, so run `pnpm build` (or
`pnpm playground:check`) before using it.

- Clean fixtures must produce no warnings. `fixtures/violations/` plus
  `fixtures/expected-diagnostics.json` verifies that representative rules still
  fire after dependency upgrades.
- It has its own nested Oxlint, ESLint, Oxfmt, and TypeScript configs. Oxlint's
  `options.typeAware` is root-only and must stay in the root config, not the
  playground config.

## Source layout and conventions

- Public entrypoints come from `package.json` `exports`: `oxlint/*` maps to
  `dist/oxlint/configs/*.js`, `eslint/*` to `dist/eslint/configs/*.js`, plus
  `oxfmt`, `typescript`, and `eslint/utils`. Rule/constant modules are internal;
  add explicit exports for new public utilities.
- Import relative modules with an explicit `.ts` extension
  (`allowImportingTsExtensions` + `rewriteRelativeImportExtensions`); `tsc`
  rewrites them to `.js`.
- `tsconfig.json` includes only `eslint/`, `oxlint/`, and `oxfmt/`. Add new
  source roots there, and to `files`/`exports` if published.
- `playground/` is a private workspace package that consumes the package through
  its public exports. Root Oxlint/Oxfmt ignore it; run its scripts via the root
  `playground:*` commands.
- Oxlint is the primary linter; ESLint is a minimal complement for plugins or
  rules Oxlint can't run. Prefer adding rules to `oxlint/rules/<tool>.ts`; use
  `eslint/rules/*.ts` only when necessary.
- Oxlint rule maps default-export `satisfies DummyRuleMap`; ESLint maps are
  typed `as Linter.RulesRecord`. Keys are alphabetized; the `sort-keys` override
  in `oxlint.config.ts` warns for `oxlint/rules/**` and `eslint/rules/**`.
- Do not set `options` (e.g. `typeAware`) in shared Oxlint configs; consumers
  set those in their root config.
- Runtime plugins/configs imported by published configs go in `dependencies`;
  `eslint`, `oxfmt`, `oxlint`, and `typescript` are optional peer dependencies.
- `typescript-eslint` (used by the ESLint config) still needs the TypeScript 6
  API. The repo follows the README setup: `typescript` is aliased to
  `@typescript/typescript6`, while `@typescript/native` aliases TS 7 and
  provides `tsc`. Don't move it to a TS 7-only version.

## Commits and releases

- Commit as `type(scope): message`. Scopes are restricted to `deps`, `eslint`,
  `oxlint`, `oxfmt`, `typescript`; the Husky `commit-msg` hook runs commitlint.
- Commits drive semantic-release: `feat` minor, `fix`/`perf` patch,
  `BREAKING CHANGE:` major. Never bump `version` or edit changelogs/tags
  manually.
- `canary` is the default branch and produces pre-releases; `main` is stable.
  Target `canary` for normal changes.
- README documents the public config API; update it when adding or renaming
  exported configs.
- `pnpm-workspace.yaml` sets `minimumReleaseAge: 120` (minutes), so freshly
  published dependency versions may resolve to older ones during
  install/upgrade. Use `--config.minimum-release-age=0` for local playground
  experiments against the newest versions.
