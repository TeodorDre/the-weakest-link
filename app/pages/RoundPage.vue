<template>
  <div :class="$style.round">
    <round-sidebar-view />
    <div :class="$style.roundMain">
      <player-list-view></player-list-view>
      <div>
        <component :is="currentScreenComponentName" />
      </div>
    </div>
    <player-actions-sidebar-view />
  </div>
</template>

<script lang="ts" setup>
import RoundSidebarView from '@/components/round/RoundSidebarView.vue';
import PlayerListView from '@/components/players/PlayerListView.vue';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import useLayoutStore from '@/code/store/layout-store';
import { useLocalStorage } from '@/code/local-storage/use-local-storage';
import { LocalStorageKey } from '@/code/local-storage/local-storage';
import useGameStore from '@/code/store/game-store';
import generateFakePlayers from '@/core/helpers/generate-fake-players';
import PlayerActionsSidebarView from '@/components/round/PlayerActionsSidebarView.vue';
import { storeToRefs } from 'pinia';

const layoutStore = useLayoutStore();
const gameStore = useGameStore();

const { currentScreenComponentName } = storeToRefs(gameStore);
const players = generateFakePlayers();

for (const player of players) {
  gameStore.addPlayer(player);
}

const { getLocalStorageValue } = useLocalStorage();

onBeforeUnmount(() => {
  gameStore.clearPlayers();
})

onBeforeMount(() => {
  const role = getLocalStorageValue(LocalStorageKey.Role);

  if (!role) {
    return layoutStore.setPopupName('ChooseRolePopupView')
  }
});
</script>

<style lang="scss" module>
.round {
  display: flex;
  gap: 10px;
}

.roundMain {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
