# Contributing

## Before creating a pull request

These config is designed for usage inside my personal projects. Before creating
a pull request, it's better to raise an issue and confirm that your proposal
will be accepted.

## Development

### Getting started

This project uses `pnpm`.

To get started, you need to have it installed on your system. You can follow
the instructions on the [pnpm website](https://pnpm.io/installation) to install it.

Then, run:

```sh
pnpm i
```

### Playground

The private `playground` workspace package exercises all published configs:
Oxlint (including type-aware rules), ESLint, Oxfmt, and the TypeScript base
config. It imports the package through its public entrypoints, so the root
`playground:check` command builds `dist/` first.

Run all playground checks:

```sh
pnpm playground:check
```

The clean fixture must produce no warnings. The `fixtures/violations` fixture
asserts that representative rules from each config chain still fire. If a rule
change is intentional, update `playground/fixtures/expected-diagnostics.json`.

See [playground/README.md](./playground/README.md) for details.

In VS Code, open the repository root so the Oxc extension can discover the
nested playground configs. Run `pnpm build` after changing package source so
the playground configs can resolve `dist/`, then restart the Oxc servers if
needed.

### Testing on another project

You can also test locally on a separate project by installing local
`@alexey-ryabov/style-guide`.

Here is an example of how to test the package on a project that uses `pnpm`:
inside the project, install the local package via path to ensure it installs
all its dependencies as well:

```sh
pnpm add ../path/to/style-guide
```

Follow [README](./README.md) to find out how to use the configs.

### Commits

Commit messages should be in the format:

```
type(scope?): message

[Body]
```

The scope should be included most of the time, and all allowed types and scopes
are documented in [.commitlintrc.js](./.commitlintrc.js).

Commits are used to automatically generate releases (see [Releases](#releases)).

## Releases

The default branch for this repository is `canary`. Each relevant commit into
`canary` triggers an automated pre-release. Merging `canary` into `main` will
trigger a release.

We use [semantic-release](https://semantic-release.gitbook.io/semantic-release/)
to automate releases. It will automatically generate Git tag, create release
notes based on the commits, publish to npm, etc.

### How commits affect versions

By default, commits with the `feat` type will cause a minor version bump, and
commits with the `fix` or `perf` type will cause a patch version bump.

If your commit is a breaking change, which will create new major release, you
should add a footer with `BREAKING CHANGE: [message]`

```
feat(eslint): migrate to ESLint 8

Resolves #1

BREAKING CHANGE: see the ESLint 8 release notes for all breaking changes
```

In this example, the release notes would look like this:

> # 1.0.0 (2023-01-01)
>
> ### Features
>
> - eslint: migrate to ESLint 8 ([commit-hash])
>
> ### BREAKING CHANGES
>
> - eslint: see the ESLint 8 release notes for all breaking changes
