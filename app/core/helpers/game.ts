import { IPlayer } from '@/core/player-types';

export namespace GameRulesConstants {
  export const TotalPlayersCount = 8;
  export const TotalRoundsCount = 6; // first round - zero
  export const FirstRoundTimeSeconds = 150; // 2.5 minutes = 150 seconds.

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
}

