<template>
  <section :class="$style.admin">
    <app-button
      @click="isPaused ? resumeRound() : pauseRound()"
      :text="isPaused ? 'Продолжить' : 'Пауза'"
    />
    <app-button
      @click="startRound()"
      text="Начать раунд"
    />
    <app-button
      @click="endRound()"
      text="Закончить раунд"
    />
    <app-button
      @click="startPlayersVotingForBan()"
      text="Голосование на вылет"
    />
    <app-button
      @click="endPlayersVotingForBan()"
      text="Голосование закончилось"
    />
    <app-button
      @click="goodbyePlayer()"
      text="Прощание с игроком"
    />
    <app-button
      @click="startPrefinalRound()"
      text="Начать пред.фин. раунд"
    />
    <app-button
      @click="startFinalRound()"
      text="Начать фин.раунд"
    />
    <app-button
      @click="endFinalRound()"
      text="Закончить фин. раунд"
    />
    <app-button
      @click="playerWon()"
      text="Победа"
    />
  </section>
</template>

<script setup lang="ts">
import useHostAdminActions from '@/code/game/use-host-admin-actions';
import AppButton from '@/components/ui/AppButton.vue';
import { storeToRefs } from 'pinia';
import useGameStore from '@/code/store/game-store';

const gameStore = useGameStore();
const { isPaused } = storeToRefs(gameStore);

const {
  startPlayersVotingForBan,
  endPlayersVotingForBan,
  startRound,
  endRound,
  pauseRound,
  resumeRound,
  startPrefinalRound,
  playerWon,
  startFinalRound,
  endFinalRound,
  goodbyePlayer,
} = useHostAdminActions();

</script>


<style module lang="scss">
.admin {
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
}
</style>
