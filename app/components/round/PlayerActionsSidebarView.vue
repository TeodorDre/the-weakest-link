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
  padding-right: 20px;
  padding-top: 20px;
}

.roundTimer {
}
</style>
