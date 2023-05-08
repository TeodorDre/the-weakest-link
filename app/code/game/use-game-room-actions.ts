import useLayoutStore from '@/code/store/layout-store';

export default function useGameRoomActions() {
  const layoutStore = useLayoutStore();

  const createRoom = () => {};

  const enterRoom = () => {
    layoutStore.setPopupName('EnterGamePopupView');
  };

  return {
    createRoom,
    enterRoom,
  }
}
