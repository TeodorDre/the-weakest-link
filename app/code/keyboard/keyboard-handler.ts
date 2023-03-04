import { EventEmitter } from '@/base/event-emitter';
import { Disposable, IDisposable } from '@/base/lifecycle';
import { isServer } from '@/base/dom';

export enum KeyCode {
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  Space = 'Space',
  KeyD = 'KeyD',
  KeyK = 'KeyK',
  KeyM = 'KeyM',
  KeyI = 'KeyI',
  KeyF = 'KeyF',
  KeyS = 'KeyS',
  KeyB = 'KeyB',
  KeyN = 'KeyN',
  KeyL = 'KeyL',
  Escape = 'Escape',
  Digit1 = 'Digit1',
  Digit2 = 'Digit2',
  Digit3 = 'Digit3',
  Digit4 = 'Digit4',
  Digit5 = 'Digit5',
  Digit6 = 'Digit6',
  Digit7 = 'Digit7',
  Digit8 = 'Digit8',
  Digit9 = 'Digit9',
  Digit0 = 'Digit0',
}

const values = Object.values(KeyCode);

export type AppKeyboardEvent = {
  type: 'keydown' | 'keyup';
  event: KeyboardEvent;
};

interface KeyboardEventMap {
  [key: string]: AppKeyboardEvent;
}

export class KeyboardHandler extends Disposable {
  readonly #emitter: EventEmitter<KeyboardEventMap> = new EventEmitter();

  constructor() {
    super();
    this.#init();
  }

  public on<T extends keyof KeyboardEventMap>(event: T, listener: (arg: KeyboardEventMap[T]) => void): IDisposable {
    return this.#emitter.on(event, listener);
  }

  #onKeydown = (event: KeyboardEvent): void => {
    const { code } = event;

    if (!values.includes(code as KeyCode)) {
      return;
    }

    this.#emitter.emit(code, {
      type: 'keydown',
      event,
    });
  };

  #onKeyup = (event: KeyboardEvent): void => {
    const { code } = event;

    if (!values.includes(code as KeyCode)) {
      return;
    }

    this.#emitter.emit(code, {
      type: 'keyup',
      event,
    });
  };

  #init(): void {
    if (isServer) {
      return;
    }

    window.addEventListener('keydown', this.#onKeydown);
    window.addEventListener('keyup', this.#onKeyup);
  }

  public dispose() {
    window.removeEventListener('keydown', this.#onKeydown);
    window.removeEventListener('keyup', this.#onKeyup);
    this.#emitter.dispose();
  }
}
