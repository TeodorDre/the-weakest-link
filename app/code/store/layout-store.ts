import { defineStore } from 'pinia';
import useState from '@/code/global/use-state';

type PopupComponentName = 'ChooseRolePopupView' | 'EnterGamePopupView' | 'RoundPausePopup';

const LAYOUT_STORE_NAME = 'layout';

const useLayoutStore = defineStore(LAYOUT_STORE_NAME, () => {
  const [popupName, setPopupName] = useState<PopupComponentName | null>(null);

  return {
    popupName,
    setPopupName,
  }
});

export default useLayoutStore;
