import { Disposable } from '@/base/lifecycle';
import useGameStore from '@/code/store/game-store';
import { EventEmitter } from '@/base/event-emitter';

export type CurrentGameStatus =
  'waiting-players'
  | 'paused'
  | 'players-representation'
  | 'players-voted-ban'
  | 'host-question'
  | 'player-answer'
  | 'round'
  | 'pre-final-round'
  | 'final-round'

export type ScreenRoundComponentName =
  'ScreenPauseRound' |
  'ScreenWaitingPlayers' |
  'ScreenPlayersRepresentation' |
  'ScreenQuestionsRound' |
  'ScreenVotingPlayersBan' |
  'ScreenFinalRound'

export interface ICurrentGameProcessData {
  status: CurrentGameStatus;
}

interface GameEventMap {
  'pause': void;
  'resume': void;
}

export class GameService extends Disposable {
  public readonly emitter: EventEmitter<GameEventMap > = new EventEmitter<GameEventMap>();

  constructor() {
    super();

    this.registerListeners();
  }

  private registerListeners() {
    const gameStore = useGameStore();
  }
}
