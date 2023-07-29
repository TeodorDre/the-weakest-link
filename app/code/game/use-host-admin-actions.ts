import useSafeGameService from '@/code/game/use-safe-game-service';
import useGameStore from '@/code/store/game-store';
import { audioService } from '@/services';

export default function useHostAdminActions() {
  const gameService = useSafeGameService();
  const gameStore = useGameStore();

  const goodbyePlayer = () => {
    audioService.play('playerKickedBackground');
  };

  const startPlayersVotingForBan = () => {
    audioService.play('playersVotingBackground');
  };

  const endPlayersVotingForBan = () => {
    audioService.play('playersVotedShort');
  };

  const pauseRound = () => {
    gameStore.setGameState({ status: 'paused' });

    gameService.emitter.emit('pause');
    audioService.play('mainLoopBackground');
  };

  const resumeRound = () => {
    gameService.emitter.emit('resume');
    gameStore.setGameState({ status: 'waiting-players' });
  };

  const startRound = () => {
    audioService.play('firstRoundStart')

    window.setTimeout(() => {
      audioService.play('roundBackground', false);
    }, 2500);
  };

  const endRound = () => {
    audioService.play('endRoundShort');
  };

  const addMoneyToBank = () => {
  };

  const removeMoneyFromBank = () => {
  };

  const addPlayer = () => {
  };

  const removePlayer = () => {
  };

  return {
    startPlayersVotingForBan,
    endPlayersVotingForBan,
    startRound,
    endRound,
    pauseRound,
    goodbyePlayer,
    resumeRound,
    addMoneyToBank,
    removeMoneyFromBank,
    addPlayer,
    removePlayer,
  }
}
