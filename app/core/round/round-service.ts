import { Disposable, IDisposable } from '@/base/lifecycle';
import { EventEmitter } from '@/base/event-emitter';
import { GameRulesConstants } from '@/core/helpers/game';

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

  public switchNextRound(): void {
    this.#emitter.emit('next-round', this.currentRound)

    if (this.currentRound >= GameRulesConstants.TotalRoundsCount) {
      this.currentRound = 0;
    }

    this.currentRound += 1;
  }
}
