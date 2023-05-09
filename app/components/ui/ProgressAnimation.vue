<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

let requestAnimationFrameIndex: number | undefined;
const progress = ref(Number(props.isActive));

defineExpose({ progress });

const initializeAnimation = (currentProgress: number, isActive: boolean) => {
  const { duration } = props;

  const desiredProgress = isActive ? 1 : 0;
  const desiredDiff = desiredProgress - currentProgress;
  const realAnimationDuration = Math.abs(desiredDiff) * duration;
  const currentTime = window.performance.now();

  const tick = () => {
    const newTime = window.performance.now();

    const timeDiff = newTime - currentTime;
    const percentTimeChange = timeDiff / realAnimationDuration;

    if (percentTimeChange >= 1) {
      progress.value = desiredProgress;

      return;
    }

    const newDesiredProgress = currentProgress + desiredDiff * percentTimeChange;

    progress.value = newDesiredProgress;

    requestAnimationFrameIndex = window.requestAnimationFrame(tick);
  };

  requestAnimationFrameIndex = window.requestAnimationFrame(tick);
};

const startNewAnimation = (isActive: boolean) => {
  if (requestAnimationFrameIndex) {
    window.cancelAnimationFrame(requestAnimationFrameIndex);
  }

  initializeAnimation(progress.value, isActive);
};

watch(() => props.isActive, (curr, prev) => {
  if (prev !== curr) {
    startNewAnimation(curr);
  }
});

onUnmounted(() => {
  if (requestAnimationFrameIndex) {
    window.cancelAnimationFrame(requestAnimationFrameIndex);
  }
});
</script>
