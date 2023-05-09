<template>
  <aside :class="$style.sidebar">
    <current-round-timer-view />
    <app-button :text="$t('round.switchNextRound')" @click="switchNextRound()"></app-button>
  </aside>
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
  padding: 25px 5px 5px;
  height: calc(100vh - var(--g-header-height));
  min-width: 100px;
  border-right: 1px solid var(--c-accent-color);
}
</style>
