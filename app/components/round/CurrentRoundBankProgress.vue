<template>
  <section :class="$style.bank">
    <ul :class="$style.list">
      <li
        v-for="sum in GameRulesConstants.RoundBankValues"
        :key="sum"
      >
        <round-bank-value-button
          :is-current="currentRoundScore === sum"
          :sum="sum"
        />
      </li>
    </ul>

    <round-bank-value-button
      :class="$style.inBank"
      :is-current="false"
      :sum="currentRoundBankScore"
    />
  </section>
</template>

<script lang="ts" setup>
import { GameRulesConstants } from '@/core/game';
import RoundBankValueButton from '@/components/round/RoundBankValueButton.vue';
import { storeToRefs } from 'pinia';
import useGameStore from '@/code/store/game-store';

const gameStore = useGameStore();

const { currentRoundBankScore, currentRoundScore } = storeToRefs(gameStore)
</script>

<style lang="scss" module>
.bank {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 10px;
}

.inBank {
  margin-bottom: 20px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
