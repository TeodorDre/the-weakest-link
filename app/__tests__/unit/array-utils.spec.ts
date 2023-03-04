import { describe, expect, it } from 'vitest';
import { getFirstElement } from '../../base/array';

describe('@/code/base/array getFirstElement', () => {
  it('gets first element in non-empty array', () => {
    const arr = [1, 2];
    const firstElement = getFirstElement(arr);
    expect(firstElement).toBe(1);
  });

  it('returns undefined for empty array', () => {
    const arr: unknown[] = [];
    const firstElement = getFirstElement(arr);
    expect(firstElement).toBe(undefined);
  });
});
