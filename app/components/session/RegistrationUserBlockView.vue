<template>
  <section :class="$style.registration">
    <h1>{{ $t('home.makeRegistration') }}</h1>
    <app-input :placeholder="$t('common.login')" v-model:input="login"></app-input>
    <app-input :placeholder="$t('common.password')" v-model:input="password"></app-input>
    <app-button :text="$t('session.register')" static-animation @click="register()"></app-button>
  </section>
</template>

<script lang="ts" setup>
import AppInput from '@/components/ui/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';

import { ref } from 'vue';
import { useLocalStorage } from '@/code/local-storage/use-local-storage';
import { LocalStorageKey } from '@/code/local-storage/local-storage';
import { ILocalSession } from '@/code/session/session';
import { nanoid } from 'nanoid';
import { useRouter } from 'vue-router';
import { AppRoute } from '@/routes';
import useSessionStore from '@/code/store/session-store';

const { setLocalStorageValue } = useLocalStorage();
const router = useRouter();
const sessionStore = useSessionStore();

const login = ref('');
const password = ref('');

function register() {
  if (!login.value || !password.value) {
    return;
  }

  console.log(login.value);
  console.log(password.value);

  const token = nanoid(5);

  setLocalStorageValue(LocalStorageKey.AuthToken, {
    expires: 60 * 60 * 24,
    value: {
      name: login.value,
      password: password.value,
      token,
    } as ILocalSession,
  });

  sessionStore.setToken(token);
  sessionStore.setUserName(login.value);

  router.push({ name: AppRoute.HomePage });
}
</script>

<style lang="scss" module>
.registration {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
