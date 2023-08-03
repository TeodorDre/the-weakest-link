import { Disposable } from '@/base/lifecycle';
import useGameStore from '@/code/store/game-store';
import { EventEmitter } from '@/base/event-emitter';
import { audioService } from '@/services';

export type CurrentGameStatus =
  'waiting-players'
  | 'players-representation'
  | 'players-voted-ban'
  | 'round'
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
  paused: boolean;
}

interface GameEventMap {
  'pause': void;
  'resume': void;
  'money-bank-added': void;
  'money-bank-list': void;
}

export class GameService extends Disposable {
  public readonly emitter: EventEmitter<GameEventMap> = new EventEmitter<GameEventMap>();

  constructor() {
    super();

    this.registerListeners();
  }

  public resumeRound() {
    const gameStore = useGameStore();

    gameStore.setGameState({ paused: false, status: gameStore.gameStatus });
    audioService.play('mainLoopBackground');

    this.emitter.emit('resume');
  }

  public pauseGame() {
    const gameStore = useGameStore();

    gameStore.setGameState({ paused: true, status: gameStore.gameStatus });
    audioService.play('mainLoopBackground');

    this.emitter.emit('pause');
  }

  private registerListeners() {
    const gameStore = useGameStore();
  }
}
