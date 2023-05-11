import { defineStore } from 'pinia';
import useState from '@/code/global/use-state';
import { GameRulesConstants } from '@/core/helpers/game';
import { IPlayer } from '@/core/player-types';
import { ref } from 'vue';
import { ApplicationError } from '@/code/errors/application-error';

const GAME_STORE_NAME = 'game';

const useGameStore = defineStore(GAME_STORE_NAME, () => {
  // Сколько всего заработано в игре (за все раунды)
  const [currentTotalBankScore, setCurrentTotalBankScore] = useState(0)
  // Сколько в текущем раунде (берутся значения из GamesRulesConstants.
  const [currentRoundScore, setCurrentRoundScore] = useState(0)

  // Сколько положили денег в банк в текущем раунде
  const [currentRoundBankScore, setCurrentRoundBankScore] = useState(0);

  const [currentRoundPlayer, setCurrentRoundPlayer] = useState<IPlayer | null>(null);

  const players = ref<IPlayer[]>([]);

  const addPlayer = (player: IPlayer) => {
    players.value.push(player);
  };

  const deletePlayer = (player: IPlayer) => {
    const playerIndex = players.value.findIndex((plr) => plr.id === player.id);

    if (playerIndex === -1) {
      throw new ApplicationError(`deletePlayer# - Player ${player.name} not found`)
    }

    players.value.splice(playerIndex, 1);
  };

  const clearPlayers = () => {
    players.value = [];
  }

  return {
    clearPlayers,
    players,
    addPlayer,
    deletePlayer,
    currentRoundPlayer,
    setCurrentRoundPlayer,
    currentRoundScore,
    setCurrentRoundScore,
    currentTotalBankScore,
    setCurrentTotalBankScore,
    currentRoundBankScore,
    setCurrentRoundBankScore,
  }
});

export default useGameStore;
