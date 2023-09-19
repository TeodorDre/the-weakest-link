import { Disposable } from '@/base/lifecycle';
import useGameStore from '@/code/store/game-store';
import { EventEmitter } from '@/base/event-emitter';
import { audioService } from '@/services';
import { LifecycleService, LifePhase } from '@/code/lifecycle/lifecycle-service';
import { isDev } from '@/base/dom';

import mockPlayers from '@/mocks/mock_players.json';
import { IPlayer } from '@/core/player-types';
import { timeout } from '@/base/async';

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
  'player-connected': IPlayer;
  'player-disconnected': IPlayer;
  'all-players-connected': undefined;
  'pause': undefined;
  'resume': undefined;
  'money-bank-added': undefined;
  'money-bank-list': undefined;
}

export class GameService extends Disposable {
  public readonly emitter: EventEmitter<GameEventMap> = new EventEmitter<GameEventMap>();

  constructor(
    private readonly lifecycleService: LifecycleService,
  ) {
    super();

    this.lifecycleService.when(LifePhase.Ready).then(() => this.registerListeners())
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

  public onPlayerConnected(player: IPlayer) {
    const gameStore = useGameStore();
    gameStore.addPlayer(player);

    this.emitter.emit('player-connected', player);
  }

  public onPlayerDisconnected(player: IPlayer) {
    const gameStore = useGameStore();
    gameStore.removePlayer(player);

    this.emitter.emit('player-disconnected', player);
  }

  private async setupTestData() {
    const timeouts = [
      timeout(500),
      timeout(1000),
      timeout(1500),
      timeout(2000),
      timeout(2500),
    ]

    let index = 0;

    for await (const d of timeouts.values()) {
      const player = mockPlayers[index];

      this.onPlayerConnected(player);
      index++;
    }

    this.emitter.emit('all-players-connected');
  }

  private registerListeners() {
    const gameStore = useGameStore();

    if (isDev) {
      this.setupTestData();
    }

    const onAllPlayersConnected = () => {
      gameStore.setGameState({
        paused: false,
        status: 'players-representation',
      });

      runPlayersPresentation();
    };

    const runPlayersPresentation = async () => {
      const timeouts = [
        timeout(500),
        timeout(1000),
        timeout(1500),
        timeout(2000),
        timeout(2500),
      ]

      let index = 0;

      for await (const d of timeouts.values()) {
        const player = mockPlayers[index];

        console.info('Привет игрок ' + player.name);

        index++;
      }
    };

    this.emitter.on('all-players-connected', onAllPlayersConnected);
  }
}
