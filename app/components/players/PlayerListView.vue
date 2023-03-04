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
        <p> {{ 1000 }} </p>
      </section>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import players from '@/mocks/players.json';
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
