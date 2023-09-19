<template>
  <app-button
    :class="$style.timer"
    :text="displayedTimer"
    :disabled="isButtonDisabled"
    static-animation
    @click="onButtonClick()"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { formatTime } from '@/base/date';
import { translate } from '@/code/localization/translate';
import AppButton from '@/components/ui/AppButton.vue';
import { GameRulesConstants } from '@/core/game';
import { storeToRefs } from 'pinia';
import useGameStore from '@/code/store/game-store';

const FIRST_ROUND_TIME = GameRulesConstants.FirstRoundTimeSeconds;

const gameStore = useGameStore();

const { gameStatus } = storeToRefs(gameStore);
const isRunning = ref(false);

const roundTimeout = ref(0);
let timeoutId: number | undefined;

const onButtonClick = () => {
  gameStore.setGameState({
    status: 'host-question',
    paused: false,
  });
};

const isButtonDisabled = computed(() => {
  if (gameStatus.value === 'waiting-players') {
    return true;
  }

  return false;
});

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
  if (gameStatus.value === 'waiting-players') {
    return translate('round.waitingPlayers')
  }

  if (gameStatus.value === 'host-question' || gameStatus.value === 'player-answer') {
    return formatTime(roundTimeout.value);
  }

  return translate('round.notStarted');
});
</script>

<style lang="scss" module>
.timer {
  width: 100%;
  text-align: center;
}
</style>
