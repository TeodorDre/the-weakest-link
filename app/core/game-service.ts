import { Disposable } from '@/base/lifecycle';
import useGameStore from '@/code/store/game-store';
import { EventEmitter } from '@/base/event-emitter';
import { audioService } from '@/services';
import { LifecycleService, LifePhase } from '@/code/lifecycle/lifecycle-service';

import mockPlayers from '@/mocks/mock_players.json';
import { IPlayer } from '@/core/player-types';
import { timeout } from '@/base/async';
import useLayoutStore from '@/code/store/layout-store';
import { NotificationLevel } from '@/code/notification/notification';
import { IRoundData } from '@/core/round';
import useHostAdminActions from '@/code/game/use-host-admin-actions';

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
}

interface GameEventMap {
  'player-connected': IPlayer;
  'player-disconnected': IPlayer;
  'all-players-connected': undefined;
  'game-started': undefined;
  'round-started': IRoundData;
  'round-ended': IRoundData;
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

    gameStore.setGameState({ status: gameStore.gameStatus });
    audioService.play('mainLoopBackground');

    this.emitter.emit('resume');
  }

  public pauseGame() {
    const gameStore = useGameStore();

    gameStore.setGameState({ status: gameStore.gameStatus });
    audioService.play('mainLoopBackground');

    this.emitter.emit('pause');
  }

  public endRound() {
    const gameStore = useGameStore();
    const hostAdminActions = useHostAdminActions();

    this.emitter.emit('round-ended', {
      roundNumber: 1,
    });

    hostAdminActions.endRound();

    gameStore.setGameState({
      status: 'players-voted-ban',
    })
  }

  public onPlayerConnected(player: IPlayer) {
    const gameStore = useGameStore();
    const layoutStore = useLayoutStore();

    layoutStore.addNotification({
      level: NotificationLevel.Info,
      message: `Игрок ${player.name} подключился к игре`
    })

    gameStore.addPlayer(player);

    this.emitter.emit('player-connected', player);
  }

  public onPlayerDisconnected(player: IPlayer) {
    const gameStore = useGameStore();
    gameStore.removePlayer(player);

    this.emitter.emit('player-disconnected', player);
  }

  public async startTestGame() {
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
    const layoutStore = useLayoutStore();

    const onAllPlayersConnected = () => {
      gameStore.setGameState({
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

        layoutStore.addNotification({
          level: NotificationLevel.Info,
          message: 'Привет игрок ' + player.name
        })

        index++;
      }

      this.emitter.emit('game-started');
    };

    const onGameStarted = async () => {
      layoutStore.addNotification({
        level: NotificationLevel.Success,
        message: 'Игра начнется, через несколько секунд',
        hideTimeoutMs: 3000,
      })

      await timeout(3000);

      this.emitter.emit('round-started', { roundNumber: 1 });
    };

    const onRoundStarted = (event: IRoundData) => {
      gameStore.setGameState({
        status: 'round',
      })

      layoutStore.addNotification({
        level: NotificationLevel.Info,
        message: `Раунд ${event.roundNumber} начался`
      })
    };

    this.emitter.on('round-started', onRoundStarted);
    this.emitter.on('game-started', onGameStarted);
    this.emitter.on('all-players-connected', onAllPlayersConnected);
  }
}
