import { describe, expect, it } from 'vitest';
import generateFakePlayers from '@/core/helpers/generate-fake-players';
import { GameRulesFunctions } from '@/core/helpers/game';

describe('@core/games-rules-constants', () => {
  it('getFirstRoundPlayerByName', () => {
    const players = generateFakePlayers();
    const player = GameRulesFunctions.getFirstPlayerRoundByName(players);

    expect(player.name).toBe('Alexander');
  });
});
