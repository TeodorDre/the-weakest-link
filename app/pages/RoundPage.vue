<template>
  <div :class="$style.round">
    <round-sidebar-view />
    <div :class="$style.roundMain">
      <player-list-view></player-list-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RoundSidebarView from '@/components/round/RoundSidebarView.vue';
import PlayerListView from '@/components/players/PlayerListView.vue';
import { onBeforeMount } from 'vue';
import useLayoutStore from '@/code/store/layout-store';
import { useLocalStorage } from '@/code/local-storage/use-local-storage';
import { LocalStorageKey } from '@/code/local-storage/local-storage';

const layoutStore = useLayoutStore();
const { getLocalStorageValue } = useLocalStorage();

onBeforeMount(() => {
  const role = getLocalStorageValue(LocalStorageKey.Role);

  if (!role) {
    layoutStore.setPopupName('ChooseRolePopupView')
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
  padding: 10px;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
