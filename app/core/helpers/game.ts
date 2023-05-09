import { IPlayer } from '@/core/player-types';
import hostJokes from '@/mocks/host_jokes.json';
import { getRandomElement } from '@/base/array';

export namespace GameRulesConstants {
  export const TotalPlayersCount = 8;
  export const TotalRoundsCount = 7; // first round - zero
  export const FirstRoundTimeSeconds = 150; // 2.5 minutes = 150 seconds.

  export const TotalGamePrize = 400_000; // $
  export const PreFinalRoundPrize = 100_000; // $
  export const TotalRoundPrize = 50_000; // $

  export const FinalRoundQuestionsCount = 5; // each player - 5 questions.

  export const RoundBankValues = [
    1000,
    2000,
    5000,
    10_000,
    20_000,
    30_000,
    40_000,
    50_000,
  ]

  /**
   * Rounds time
   *  First round - 150
   *  Second round - 140
   *  Third round - 130
   *  Fourth round - 120
   *  Fifth round - 110
   *  Sixth round - 100
   *  Seventh round - 90
   */
}

export namespace GameRulesFunctions {
  export function getFirstPlayerRoundByName(names: IPlayer[]): IPlayer {
    return names.reduce((acc, curr) => {
      if (acc.name > curr.name) {
        return curr;
      }

      return acc;
    }, names[0]);
  }

  export function getRandomHostJoke(): string {
    return getRandomElement(hostJokes) as string;
  }
}

