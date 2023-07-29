import useLayoutStore from '@/code/store/layout-store';
import { useRouter } from 'vue-router';
import { AppRoute } from '@/routes';

export default function useGameRoomActions() {
  const layoutStore = useLayoutStore();
  const router = useRouter();

  const createRoom = () => {
    router.push({ name: AppRoute.CreateGamePage })
  };

  const enterRoom = () => {
    layoutStore.setPopupName('EnterGamePopupView');
  };

  return {
    createRoom,
    enterRoom,
  }
}
