import { describe, expect, it } from 'vitest';

import { greet } from './greet';

describe('greet', () => {
  it('uses the file name', () => {
    expect(greet('/tmp/Ada')).toBe('Hello, Ada');
  });
});
