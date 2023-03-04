import onUnexpectedError from '@/code/errors/on-unexpected-error';

const _typeof = {
  undefined: 'undefined',
  number: 'number',
  string: 'string',
  object: 'object',
  function: 'function',
};

export function isString(str: unknown): str is string {
  return typeof str === _typeof.string;
}

export function isNull(val: unknown): val is null {
  return val === null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(func: unknown): func is Function {
  return typeof func === _typeof.function;
}

export function isTrue(val: unknown): val is true {
  return val === true;
}

export function isFalse(val: unknown): val is false {
  return val === false;
}

export function isUndefined(obj: unknown): obj is undefined {
  return typeof obj === _typeof.undefined;
}

export function isDefined(obj: unknown): obj is boolean | number | null | string | object {
  return typeof obj !== _typeof.undefined;
}

export function isArray<T>(val: unknown[]): val is T[] {
  return Array.isArray(val);
}

export function once<T extends VoidFunction>(this: unknown, fn: T): T {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const _this = this;
  let didCall = false;
  let result: unknown;

  return function () {
    if (didCall) {
      return result;
    }

    didCall = true;
    // eslint-disable-next-line prefer-rest-params
    result = Reflect.apply(fn, _this, arguments);

    return result;
  } as unknown as T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(obj: unknown): obj is Record<string, any> {
  return (
    typeof obj === _typeof.object &&
    obj !== null &&
    !Array.isArray(obj) &&
    !(obj instanceof RegExp) &&
    !(obj instanceof Date)
  );
}

export function isUndefinedOrNull(obj: unknown): obj is undefined | null {
  return isUndefined(obj) || obj === null;
}

export function isNumber(num: unknown): num is number {
  return typeof num === _typeof.number;
}

export function isNumberInRange(value: number, start: number, end: number): boolean {
  return start <= value && end >= value;
}

export function clone<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    onUnexpectedError(error);
    throw error;
  }
}
