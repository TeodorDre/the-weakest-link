import { ApplicationError } from '@/code/errors/application-error';

export interface IDisposable {
  dispose(): void;
}

export function toDisposable(func: () => void): IDisposable {
  const self = {
    dispose: () => {
      Reflect.apply(func, undefined, []);
    },
  };

  return self;
}

export class DisposableStore implements IDisposable {
  readonly #_toDispose = new Set<IDisposable>();
  #_isDisposed = false;

  public dispose(): void {
    if (this.#_isDisposed) {
      return;
    }

    this.#_isDisposed = true;
    this.clear();
  }

  public clear(): void {
    this.#_toDispose.forEach(item => item.dispose());
    this.#_toDispose.clear();
  }

  public add<T extends IDisposable>(t: T): T {
    if (!t) {
      return t;
    }

    if ((t as unknown) as DisposableStore === this) {
      throw new ApplicationError('Cannot register a disposable on itself!');
    }

    if (this.#_isDisposed) {
      console.warn('Registering disposable on object that has already been disposed of');

      t.dispose();
    } else {
      this.#_toDispose.add(t);
    }

    return t;
  }
}


export abstract class Disposable implements IDisposable {
  public static None = Object.freeze<IDisposable>({
    dispose() {
      //
    },
  });

  protected constructor() {
    //
  }

  public dispose(): void {
    //
  }
}
