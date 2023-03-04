import { defineStore } from 'pinia';
import useState from '@/code/global/use-state';
import { computed } from 'vue';
import { isDefined } from '@/base/std';

const SESSION_STORE_NAME = 'session';

const useSessionStore = defineStore(SESSION_STORE_NAME, () => {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState<string | undefined>(undefined);

  const isAuth = computed(() => isDefined(token.value));

  return {
    token,
    isAuth,
    userName,
    setUserName,
    setToken,
  }
});

export default useSessionStore;
