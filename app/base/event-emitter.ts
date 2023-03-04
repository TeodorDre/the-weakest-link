import { Disposable, IDisposable, toDisposable } from './lifecycle';
import * as std from './std';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Listener = (...args: any[]) => void;

export class EventEmitter<TEventMap> extends Disposable {
  readonly #events: Record<any, Listener[]> = {};

  constructor() {
    super();
  }

  public on<T extends keyof TEventMap>(event: T, listener: (arg: TEventMap[T]) => void): IDisposable {
    if (!std.isArray(this.#events[event])) {
      this.#events[event] = [];
    }

    this.#events[event].unshift(listener);

    return toDisposable(() => this.removeEventListener<T>(event, listener));
  }

  public removeEventListener<T extends keyof TEventMap>(event: T, listener: Listener): void {
    if (!std.isArray(this.#events[event])) {
      return;
    }

    const idx: number = this.#events[event].indexOf(listener);
    if (idx > -1) {
      this.#events[event].splice(idx, 1);
    }
  }

  public removeAllListeners(): void {
    Object.keys(this.#events).forEach((event: string) =>
      this.#events[event].splice(0, this.#events[event].length),
    );
  }

  public emit<T extends keyof TEventMap>(event: T, arg?: TEventMap[T]): void {
    if (typeof this.#events[event] !== 'object') {
      return;
    }

    this.#events[event].forEach(listener => listener.apply(this, [arg]));
  }

  public once<T extends keyof TEventMap>(event: T, listener: (arg?: TEventMap[T]) => void): void {
    const removable: IDisposable = this.on(event, (arg?: TEventMap[T]) => {
      removable.dispose();
      listener.apply(this, [arg]);
    });
  }

  public dispose() {
    this.removeAllListeners();
  }
}
