<template>
  <div>
    Вопрос: {{ currentQuestion?.question_text }}
  </div>
</template>

<script setup lang="ts">
import { IGameSimpleQuestion, questionStorage, QuestionStorageError } from '@/core/questions';
import { onMounted, ref } from 'vue';
import useHostAdminActions from '@/code/game/use-host-admin-actions';
import { gameService } from '@/services';

const currentQuestion = ref<IGameSimpleQuestion>()

const { startRound, endRound } = useHostAdminActions();

let intervalId: number;

onMounted(() => {
  startRound();

  intervalId = window.setInterval(() => {
    try {
      const question = questionStorage.getRandomQuestion();

      currentQuestion.value = question;
    } catch (error) {
      if (error instanceof QuestionStorageError) {
        gameService.endRound();
      }

      window.clearInterval(intervalId);
    }
  }, 5000);
})
</script>

<style module lang="scss">

</style>
