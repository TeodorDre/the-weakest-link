export class ApplicationError extends Error {
  public name = 'ApplicationError';

  readonly #__proto__: unknown;

  constructor(message?: string) {
    super(message);

    const actualProto = new.target.prototype;

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.#__proto__ = actualProto;
    }
  }

  public [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): unknown {
    if (hint === 'string') {
      return `ERROR: ${this.name} - ${this.message}`;
    }

    return true;
  }
}
