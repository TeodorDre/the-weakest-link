<template>
  <section :class="$style.wrapper">
    <header>
      <p> {{ $t('home.welcomeUser', { userName }) }} </p>
    </header>
    <article :class="$style.listWrapper">
      <p> {{ $t('home.selectAction') }} </p>
      <ul :class="$style.list">
        <li>
          <app-button
            :text="$t('home.enterExistGame')"
            static-animation
            :class="$style.button"
            @click="enterRoom()"
          />
        </li>
        <li>
          <app-button
            :text="$t('home.createNewGame')"
            static-animation
            :class="$style.button"
            @click="createRoom()"
          />
        </li>
      </ul>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useSessionStore from '@/code/store/session-store';
import AppButton from '@/components/ui/AppButton.vue';
import useGameRoomActions from '@/code/game/use-game-room-actions';

const { userName } = storeToRefs(useSessionStore());

const { createRoom, enterRoom } = useGameRoomActions();
</script>

<style lang="scss" module>
.listWrapper {
  margin-top: 20px;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.list {
  display: grid;
  gap: 20px;
  margin-top: 10px;
  grid-template-columns: 1fr;
}

.button {
  width: 100%;
  text-align: center;
}
</style>
