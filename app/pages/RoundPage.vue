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
</script>

<style lang="scss" module>
.round {
  height: calc(100vh - 40px);
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
