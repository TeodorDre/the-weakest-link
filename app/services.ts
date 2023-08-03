import AudioService from '@/core/audio-service';
import { GameService } from '@/core/game/game-service';

const audioService = new AudioService();
const gameService = new GameService();

export {
  gameService,
  audioService
}
