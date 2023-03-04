import { useLocalStorage } from '@/code/local-storage/use-local-storage';
import useSessionStore from '@/code/store/session-store';
import { LocalStorageKey } from '@/code/local-storage/local-storage';
import { useRouter } from 'vue-router';
import { AppRoute } from '@/routes';

export default function useLogout() {
  const { removeLocalStorageValue } = useLocalStorage();
  const sessionStore = useSessionStore();
  const router = useRouter();

  const logout = () => {
    void router.push({ name: AppRoute.HomePage })

    sessionStore.setUserName('');
    sessionStore.setToken(undefined);
    removeLocalStorageValue(LocalStorageKey.AuthToken);
    removeLocalStorageValue(LocalStorageKey.Role);
  };

  return {
    logout,
  }
}
