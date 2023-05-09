<template>
  <app-button :class="$style.timer" :text="displayedTimer" static-animation />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { formatTime } from '@/base/date';
import { translate } from '@/code/localization/translate';
import AppButton from '@/components/ui/AppButton.vue';
import { roundService } from '@/services';
import { GameRulesConstants } from '@/core/helpers/game';

const FIRST_ROUND_TIME = GameRulesConstants.FirstRoundTimeSeconds;

const isRunning = ref<boolean>();
const roundTimeout = ref<number>(0);
let timeoutId: number | undefined;

const roundTick = () => {
  timeoutId = window.setTimeout(() => {
    if (roundTimeout.value <= 0) {
      return;
    }

    roundTimeout.value -= 1;
    roundTick();
  }, 1000);
};

const runRound = (offsetRound: number) => {
  roundTimeout.value = FIRST_ROUND_TIME - offsetRound;

  isRunning.value = true;

  roundTick();
};

const displayedTimer = computed(() => {
  if (!isRunning.value) {
    return translate('round.notStarted');
  }

  return formatTime(roundTimeout.value);
});

roundService.on('next-round', (round) => {
  const offsetRound = round * 10;

  window.clearTimeout(timeoutId);

  runRound(offsetRound);
});
</script>

<style lang="scss" module>
.timer {
  width: 100%;
  text-align: center;
}
</style>
