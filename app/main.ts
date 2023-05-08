import '@/assets/styles/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import patchVueApp from '@/code/global/patch-vue-app';
import { useLocalStorage } from '@/code/local-storage/use-local-storage';
import { LocalStorageKey } from '@/code/local-storage/local-storage';
import { ILocalSession } from '@/code/session/session';
import useSessionStore from '@/code/store/session-store';
import useMiddleware from '@/routes/middleware';

import ChooseRolePopupView from '@/components/popups/ChooseRolePopupView.vue';
import EnterGamePopupView from '@/components/popups/EnterGamePopupView.vue';

function main() {
  const { getLocalStorageValue } = useLocalStorage();
  const app = createApp(App);

  app.component('ChooseRolePopupView', ChooseRolePopupView);
  app.component('EnterGamePopupView', EnterGamePopupView);

  const { router } = patchVueApp(app);
  const sessionStore = useSessionStore();

  useMiddleware(router);

  const auth = getLocalStorageValue<ILocalSession>(LocalStorageKey.AuthToken);

  if (auth) {
    const { name, token } = auth.value;

    sessionStore.setToken(token);
    sessionStore.setUserName(name);
  }

  app.mount('#app');
}

main();
