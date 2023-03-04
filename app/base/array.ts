export function getFirstElement<T>(array: T[]): T | undefined {
  if (array.length > 0) {
    return array[0];
  }

  return undefined;
}

export function getRandomElement<T>(
  array: readonly (T | undefined | null)[],
): T | undefined | null {
  if (!array.length) {
    return undefined;
  }

  return array[Math.floor(array.length * Math.random())];
}

export function indexOutOfRange(index: number): boolean {
  return index === -1;
}

export function coalesce<T>(array: ReadonlyArray<T | undefined | null>): T[] {
  return array.filter(e => Boolean(e)) as T[];
}
