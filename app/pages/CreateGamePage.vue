<template>
  <section>
    <header>
      <h1>{{ $t('createGamePage.title') }}</h1>
    </header>
    <div :class="$style.body">
      <form :class="$style.form">
        <fieldset>
          <legend>Укажите название лобби</legend>
          <app-input
            :placeholder="$t('createGamePage.lobbyName')"
            v-model:input="lobbyName"></app-input>
        </fieldset>
        <fieldset>
          <legend>Пароль от лобби</legend>
          <app-input
            :placeholder="$t('common.password')"
            v-model:input="password"></app-input>
        </fieldset>
        <fieldset>
          <legend>Загрузите файл с вопросами (.json)</legend>
          <input id="file" type="file" @change="onFileChange" accept="application/json" />
        </fieldset>
        <fieldset>
          <legend>Укажите количество игроков</legend>
          <app-input
            :placeholder="$t('createGamePage.playersCount')"
            v-model:input="playersCount"></app-input>
        </fieldset>
        <app-button @click="createGame()" :text="$t('createGamePage.submitCreateGame')" />
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AppInput from '@/components/ui/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { ref } from 'vue';
import { parseJsonFile } from '@/base/dom';
import { nanoid } from 'nanoid';
import { useRouter } from 'vue-router';
import { AppRoute } from '@/routes';

const router = useRouter();

const password = ref('');
const lobbyName = ref('');
const playersCount = ref('');

const onFileChange = async (event: any) => {
  try {
    const result = await parseJsonFile(event.target.files[0]);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

const createGame = () => {
  const id = nanoid(2);

  router.push({
    name: AppRoute.RoundPage,
    params: { id }
  })
};
</script>

<style lang="scss" module>
.body {
  margin-top: 20px;
}

.form {
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
