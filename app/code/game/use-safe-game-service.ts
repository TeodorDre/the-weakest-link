import { UnexpectedComponentStateError } from '@/code/errors/component-state-error';
import { inject } from 'vue';
import { GameService } from '@/core/game-service';

export default function useSafeGameService() {
  const service = inject('gameService');

  if (!service) {
    throw new UnexpectedComponentStateError('service');
  }

  return service as GameService;
}
