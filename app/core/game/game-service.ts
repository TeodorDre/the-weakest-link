import { Disposable } from '@/base/lifecycle';
import { IPlayer } from '@/core/player-types';

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
  players: IPlayer[];
}

export class GameService extends Disposable {
  constructor() {
    super();
  }
}
