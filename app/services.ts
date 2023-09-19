import AudioService from '@/core/audio-service';
import { GameService } from '@/core/game/game-service';
import { LifecycleService } from '@/code/lifecycle/lifecycle-service';

const lifecycleService = new LifecycleService();

const audioService = new AudioService();
const gameService = new GameService(lifecycleService);

export {
  gameService,
  audioService,
  lifecycleService,
}
