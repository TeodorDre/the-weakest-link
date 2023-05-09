import { RoundService } from '@/core/round/round-service';
import GameLoopService from '@/core/game-loop/game-loop-service';

const roundService = new RoundService();
const gameLoopService = new GameLoopService();

export {
  roundService,
  gameLoopService,
}
