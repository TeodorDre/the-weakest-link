<template>
  <div :class="$style.round">
    <round-sidebar-view />
    <admin-control-panel />
    <div :class="$style.roundMain">
      <div :class="$style.screen">
        <component :is="currentScreenComponentName" />
      </div>
      <player-list-view></player-list-view>
    </div>
    <player-actions-sidebar-view />
  </div>
</template>

<script lang="ts" setup>
import RoundSidebarView from '@/components/round/RoundSidebarView.vue';
import PlayerListView from '@/components/players/PlayerListView.vue';
import useGameStore from '@/code/store/game-store';
import PlayerActionsSidebarView from '@/components/round/PlayerActionsSidebarView.vue';
import { storeToRefs } from 'pinia';
import { provide } from 'vue';
import useLayoutStore from '@/code/store/layout-store';
import AdminControlPanel from '@/components/AdminControlPanel.vue';
import { gameService } from '@/services';

const gameStore = useGameStore();
const layoutStore = useLayoutStore();

const { currentScreenComponentName } = storeToRefs(gameStore);

gameService.emitter.on('pause', () => {
  layoutStore.setPopupName('RoundPausePopup');
});

gameService.emitter.on('resume', () => {
  layoutStore.setPopupName(null);
});

provide('gameService', gameService);
</script>

<style lang="scss" module>
.round {
  display: flex;
  gap: 10px;
  position: relative;
}

.screen {

}

.roundMain {
  display: flex;
  flex-grow: 1;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
}
</style>
