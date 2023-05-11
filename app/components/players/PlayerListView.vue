<template>
  <ul :class="$style.playerList">
    <li
      v-for="player in players"
      :key="player.name"
      :class="$style.playerListItem"
    >
      <section>
        <h3>
          {{ player.name }}
        </h3>
      </section>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import useGameStore from '@/code/store/game-store';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();

const { players } = storeToRefs(gameStore);
</script>

<style lang="scss" module>
.playerList {
  display: flex;
  gap: 10px;
}

.playerListItem {
  padding: 10px;
  width: 120px;
  height: 70px;
  background-color: var(--c-accent-color);
}
</style>
