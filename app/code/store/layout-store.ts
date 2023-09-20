import { defineStore } from 'pinia';
import useState from '@/code/global/use-state';
import { nanoid } from 'nanoid';
import { ISimpleNotification, IBaseNotification } from '@/code/notification/notification';
import { toDisposable, IDisposable } from '@/base/lifecycle';
import { getFirstElement, indexOutOfRange } from '@/base/array';
import { ref, computed } from 'vue';

type PopupComponentName = 'ChooseRolePopupView' | 'EnterGamePopupView' | 'RoundPausePopup';

const LAYOUT_STORE_NAME = 'layout';

const useLayoutStore = defineStore(LAYOUT_STORE_NAME, () => {
  const [popupName, setPopupName] = useState<PopupComponentName | null>(null);

  const notifications = ref<ISimpleNotification[]>([]);
  const currentNotification = computed(() => getFirstElement(notifications.value));
  const removeNotification = (notificationId: string) => {
    const index = notifications.value.findIndex((notification) => notification.id === notificationId);

    if (indexOutOfRange(index)) {
      return console.error('removeNotification - index cant be < 0');
    }

    notifications.value.splice(index, 1);
  };

  const addNotification = (notification: IBaseNotification): IDisposable => {
    if (currentNotification.value) {
      removeNotification(currentNotification.value.id);
    }

    // Добавляем туда id
    const notificationId = nanoid(2);
    Reflect.set(notification, 'id', notificationId);

    notifications.value.push(notification as ISimpleNotification);
    return toDisposable(() => removeNotification(notificationId));
  };

  return {
    currentNotification,
    addNotification,
    notifications,
    popupName,
    setPopupName,
    removeNotification,
  }
});

export default useLayoutStore;
