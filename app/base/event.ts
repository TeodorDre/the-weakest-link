import { Disposable } from '@/base/lifecycle';

export default abstract class AppEvent<T> extends Disposable {
  private _defaultPrevented = false;

  protected constructor(public readonly data: T) {
    super();
  }

  public get defaultPrevented(): boolean {
    return this._defaultPrevented;
  }

  public preventDefault(): void {
    this._defaultPrevented = true;
  }
}
