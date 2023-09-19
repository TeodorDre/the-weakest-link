import { GameRulesConstants } from '@/core/game';
import { IPlayer, PlayerRole } from '@/core/player-types';
import { nanoid } from 'nanoid';
import { getRandomElement } from '@/base/array';

const EMPTY_PLAYERS: IPlayer[] = Array.from({ length: GameRulesConstants.TotalPlayersCount });

const FAKE_PLAYER_NAMES = [
  'Tanya',
  'Andrey',
  'Pikul',
  'Vika',
  'Dasha',
  'Slava',
  'Vikonka',
  'Alexander'
];

const usedNames = new Set<string>();

const getRandomName = (): string => {
  const name = getRandomElement(FAKE_PLAYER_NAMES) as string;

  if (usedNames.has(name)) {
    return getRandomName();
  }

  usedNames.add(name);
  return name;
}

export default function generateFakePlayers(): IPlayer[] {
  const players = EMPTY_PLAYERS.slice().map(() => ({
    id: nanoid(3),
    name: getRandomName(),
    role: PlayerRole.Player,
  }))

  usedNames.clear();

  return players;
}
