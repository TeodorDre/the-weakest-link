import { IDisposable } from '@/base/lifecycle';

interface DisposableData {
  source: string | null;
  parent: IDisposable | null;
  isSingleton: boolean;
}

export interface IDisposableTracker {
  /**
   * Is called on construction of a disposable.
   */
  trackDisposable(disposable: IDisposable): void;

  setParent(child: IDisposable, parent: IDisposable | null): void;

  /**
   * Is called after a disposable is disposed.
   */
  markAsDisposed(disposable: IDisposable): void;

  /**
   * Indicates that the given object is a singleton which does not need to be disposed.
   */
  markAsSingleton(disposable: IDisposable): void;
}

export class DisposableTracker implements IDisposableTracker {
  readonly #livingDisposables = new Map<IDisposable, DisposableData>();

  #getDisposableData(d: IDisposable) {
    let val = this.#livingDisposables.get(d);
    if (!val) {
      val = { parent: null, source: null, isSingleton: false };
      this.#livingDisposables.set(d, val);
    }
    return val;
  }

  trackDisposable(d: IDisposable): void {
    const data = this.#getDisposableData(d);
    if (!data.source) {
      data.source = new Error().stack!;
    }
  }

  setParent(child: IDisposable, parent: IDisposable | null): void {
    const data = this.#getDisposableData(child);
    data.parent = parent;
  }

  markAsDisposed(x: IDisposable): void {
    this.#livingDisposables.delete(x);
  }

  markAsSingleton(disposable: IDisposable): void {
    this.#getDisposableData(disposable).isSingleton = true;
  }

  #getRootParent(data: DisposableData, cache: Map<DisposableData, DisposableData>): DisposableData {
    const cacheValue = cache.get(data);
    if (cacheValue) {
      return cacheValue;
    }

    const result = data.parent ? this.#getRootParent(this.#getDisposableData(data.parent), cache) : data;
    cache.set(data, result);
    return result;
  }

  public getTrackedDisposables() {
    const rootParentCache = new Map<DisposableData, DisposableData>();

    const leaking = [...this.#livingDisposables.entries()]
      .filter(([, v]) => v.source !== null && !this.#getRootParent(v, rootParentCache).isSingleton)
      .map(([k]) => k)
      .flat();

    return leaking;
  }

  public ensureNoLeakingDisposables() {
    const rootParentCache = new Map<DisposableData, DisposableData>();
    const leaking = [...this.#livingDisposables.values()]
      .filter(v => v.source !== null && !this.#getRootParent(v, rootParentCache).isSingleton);

    if (leaking.length > 0) {
      const count = 10;
      const firstLeaking = leaking.slice(0, count);
      const remainingCount = leaking.length - count;

      const separator = '--------------------\n\n';
      let s = firstLeaking.map(l => l.source).join(separator);
      if (remainingCount > 0) {
        s += `${separator}+ ${remainingCount} more`;
      }

      throw new Error(`These disposables were not disposed:\n${s}`);
    }
  }
}
