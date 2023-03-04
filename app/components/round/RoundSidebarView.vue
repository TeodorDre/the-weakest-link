<template>
  <div :class="$style.sidebar">
    <current-round-timer-view />
    <app-button :text="$t('round.switchNextRound')" @click="switchNextRound()"></app-button>
  </div>
</template>

<script lang="ts" setup>
import CurrentRoundTimerView from '@/components/round/CurrentRoundTimerView.vue';
import AppButton from '@/components/ui/AppButton.vue';

import { roundService } from '@/services';

const switchNextRound = () => {
  roundService.switchNextRound();
};
</script>

<style lang="scss" module>
.sidebar {
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: var(--c-primary-color-15);
  padding: 5px;
  height: 100vh;
  min-width: 100px;
}
</style>
