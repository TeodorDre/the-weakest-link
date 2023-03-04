<template>
  <div :class="$style.round">
    <round-sidebar-view />
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import RoundSidebarView from '@/components/round/RoundSidebarView.vue';
</script>

<style lang="scss" module>
.round {
  display: flex;
  gap: 10px;
}
</style>
