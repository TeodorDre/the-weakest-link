<template>
  <div :class="$style.playerActions">
    <current-round-timer-view :class="$style.roundTimer" />
  </div>
</template>

<script setup lang="ts">
import CurrentRoundTimerView from '@/components/round/CurrentRoundTimerView.vue';
</script>

<style module lang="scss">
.playerActions {
  position: absolute;
  top: 20px;
  right: 250px;
  padding: 10px;
}

.roundTimer {
}
</style>
