import { Disposable } from '@/base/lifecycle';
import { ApplicationError } from '@/code/errors/application-error';
import { Barrier } from '@/base/async';

export enum LifePhase {
  // Состояния приложения по умолчанию, при старте
  Starting = 1,
  // Приложение готово к работе, и идет запуск основного view.
  Ready = 2,
  // Активация сервисов которые создаются по требованию.
  Eventually = 3,
  // Приложение начало работу в нормальном режиме. (Созданы вьюхи)
  Started = 4,
}

export class LifecycleService extends Disposable  {
  private readonly phaseWhen = new Map<LifePhase, Barrier>();
  private _phase: LifePhase = LifePhase.Starting;

  constructor() {
    super();
  }

  public get phase(): LifePhase {
    return this._phase;
  }

  public set phase(value: LifePhase) {
    if (value < this.phase) {
      throw new ApplicationError('Lifecycle cannot go backwards');
    }

    if (this._phase === value) {
      return;
    }

    this._phase = value;

    const barrier = this.phaseWhen.get(this._phase);

    if (barrier) {
      barrier.open();
      this.phaseWhen.delete(this._phase);
    }
  }

  public async when(phase: LifePhase): Promise<void> {
    if (phase <= this._phase) {
      return;
    }

    let barrier = this.phaseWhen.get(phase);

    if (!barrier) {
      barrier = new Barrier();
      this.phaseWhen.set(phase, barrier);
    }

    await barrier.wait();
  }
}
