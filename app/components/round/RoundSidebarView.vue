<template>
  <div :class="$style.sidebar">
    <current-round-timer-view />
  </div>
</template>

<script lang="ts" setup>
import CurrentRoundTimerView from '@/components/round/CurrentRoundTimerView.vue';
</script>

<style lang="scss" module>
.sidebar {
  background-color: var(--c-primary-color-15);
  padding: 5px;
  height: 100vh;
  min-width: 100px;
}
</style>
