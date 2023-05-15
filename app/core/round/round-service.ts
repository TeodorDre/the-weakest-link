import { Disposable, IDisposable } from '@/base/lifecycle';
import { EventEmitter } from '@/base/event-emitter';
import { GameRulesConstants } from '@/core/helpers/game';

interface EventMap {
  'next-round': number;
  'paused': number;
  'resumed': number;
}

export class RoundService extends Disposable {
  readonly #emitter = new EventEmitter<EventMap>();

  private currentRound = 0;
  private isPaused = false;

  constructor() {
    super();
  }

  public on<T extends keyof EventMap>(event: T, listener: (arg: EventMap[T]) => void): IDisposable {
    return this.#emitter.on(event, listener);
  }

  public pauseRound() {
    this.isPaused = true;

    this.#emitter.emit('paused');
  }

  public resumeRound() {
    this.isPaused = false;
    this.#emitter.emit('resumed');
  }

  public switchNextRound(): void {
    this.#emitter.emit('next-round', this.currentRound)

    if (this.currentRound >= GameRulesConstants.TotalRoundsCount) {
      this.currentRound = 0;
    }

    this.currentRound += 1;
  }
}
