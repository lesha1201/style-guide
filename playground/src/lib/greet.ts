import { basename } from 'node:path';

export function greet(path: string): string {
  return `Hello, ${basename(path)}`;
}
