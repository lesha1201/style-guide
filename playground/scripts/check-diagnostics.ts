import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

type Severity = 'error' | 'warning';

interface Diagnostic {
  ruleId: string;
  severity: Severity;
}

interface ExpectedDiagnostics {
  eslint: Diagnostic[];
  oxlint: Diagnostic[];
}

interface OxlintOutput {
  diagnostics: {
    code: string;
    severity: Severity;
  }[];
}

interface EslintFile {
  messages: {
    ruleId: string | null;
    severity: number;
  }[];
}

const playgroundDirectory = fileURLToPath(new URL('..', import.meta.url));

const expected = JSON.parse(
  readFileSync(
    new URL('../fixtures/expected-diagnostics.json', import.meta.url),
    'utf8',
  ),
) as ExpectedDiagnostics;

function run(command: string, args: string[]): string {
  const result = spawnSync('pnpm', ['exec', command, ...args], {
    cwd: playgroundDirectory,
    encoding: 'utf8',
  });

  if (result.error) {
    throw result.error;
  }

  return result.stdout;
}

function normalizeOxlintDiagnostics(output: string): Diagnostic[] {
  const parsed = JSON.parse(output) as OxlintOutput;

  return parsed.diagnostics.map(diagnostic => ({
    ruleId: diagnostic.code.replace(/^([^(]+)\((.+)\)$/, '$1/$2'),
    severity: diagnostic.severity,
  }));
}

function normalizeEslintDiagnostics(output: string): Diagnostic[] {
  const parsed = JSON.parse(output) as EslintFile[];
  const diagnostics: Diagnostic[] = [];

  for (const file of parsed) {
    for (const message of file.messages) {
      if (message.ruleId) {
        diagnostics.push({
          ruleId: message.ruleId,
          severity: message.severity === 2 ? 'error' : 'warning',
        });
      }
    }
  }

  return diagnostics;
}

function hasDiagnostic(
  diagnostics: Diagnostic[],
  expectedDiagnostic: Diagnostic,
): boolean {
  return diagnostics.some(
    diagnostic =>
      diagnostic.ruleId === expectedDiagnostic.ruleId &&
      diagnostic.severity === expectedDiagnostic.severity,
  );
}

const results = [
  {
    diagnostics: normalizeOxlintDiagnostics(
      run('oxlint', ['--format', 'json', 'fixtures/violations']),
    ),
    expected: expected.oxlint,
    name: 'Oxlint',
  },
  {
    diagnostics: normalizeEslintDiagnostics(
      run('eslint', ['--format', 'json', 'fixtures/violations']),
    ),
    expected: expected.eslint,
    name: 'ESLint',
  },
];

for (const result of results) {
  const missing = result.expected.filter(
    expectedDiagnostic =>
      !hasDiagnostic(result.diagnostics, expectedDiagnostic),
  );

  if (missing.length === 0) {
    console.info(
      `${result.name}: all ${result.expected.length} expected diagnostics found.`,
    );
    continue;
  }

  console.error(`${result.name}: missing expected diagnostics:`);

  for (const diagnostic of missing) {
    console.error(`  ${diagnostic.ruleId} (${diagnostic.severity})`);
  }

  process.exitCode = 1;
}
