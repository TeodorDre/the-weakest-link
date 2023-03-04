import { Disposable, IDisposable } from '@/base/lifecycle';
import { EventEmitter } from '@/base/event-emitter';

interface EventMap {
  'next-round': number;
}

export class RoundService extends Disposable {
  readonly #emitter = new EventEmitter<EventMap>();

  private currentRound = 0;

  constructor() {
    super();
  }

  public on<T extends keyof EventMap>(event: T, listener: (arg: EventMap[T]) => void): IDisposable {
    return this.#emitter.on(event, listener);
  }

  public switchNextRound() {
    this.currentRound += 1;

    this.#emitter.emit('next-round', this.currentRound)

    if (this.currentRound >= 8) {
      this.currentRound = 0;
    }
  }
}
