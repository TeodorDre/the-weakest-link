<template>
  <app-icon>
    <svg :class="$style.volume" xmlns="http://www.w3.org/2000/svg" viewBox="5 6 24 24">
      <title v-if="$isNativeTitleTooltipShown">{{ $t('icons.volume') }}</title>

      <mask :id="diameterLineMaskId">
        <rect x="0" y="0" width="36" height="36" fill="currentColor" />
        <progress-animation ref="animation1" :duration="animationDuration" :is-active="mode === 'off'">
          <path :class="pathClassName" :d="getMaskPathD(progress1)" stroke="black" stroke-width="2" />
        </progress-animation>
      </mask>

      <mask :id="secondVolumeWaveId">
        <rect x="0" y="0" width="36" height="36" fill="currentColor" />
        <progress-animation ref="animation2" :duration="animationDuration" :is-active="mode === 'half'">
          <circle cx="18" cy="18" :r="getCircleRadius(progress2)" fill="black" />
        </progress-animation>
      </mask>

      <g :mask="`url(#${diameterLineMaskId})`">
        <path
          :class="pathClassName"
          d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z"
        />
        <path
          :mask="`url(#${secondVolumeWaveId})`"
          :class="pathClassName"
          d="M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
        />
      </g>
      <progress-animation ref="animation3" :duration="animationDuration" :is-active="mode === 'off'">
        <path :class="diameterLinePathClassName" stroke="currentColor" :d="getMainPathD(progress3)" stroke-width="2" />
      </progress-animation>
    </svg>
  </app-icon>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, computed, Ref, ref } from 'vue';

import ProgressAnimation from '../ui/ProgressAnimation.vue';
import AppIcon from './AppIcon.vue';

defineProps<{
  mode: 'off' | 'half' | 'full',
  pathClassName?: string,
  diameterLinePathClassName?: string,
}>();

const animation1 = ref<ComponentPublicInstance<{ progress: Ref<number>; }>>();
const progress1 = computed(() => animation1.value?.progress || 0);

const animation2 = ref<ComponentPublicInstance<{ progress: Ref<number>; }>>();
const progress2 = computed(() => animation2.value?.progress || 0);

const animation3 = ref<ComponentPublicInstance<{ progress: Ref<number>; }>>();
const progress3 = computed(() => animation3.value?.progress || 0);

const useUniqueHash = (hashPrefix: string) => {
  const hashRandomPart = Math.random()
    .toString()
    .substr(2);

  return `${hashPrefix}${hashRandomPart}`;
};

const getGeneratePathDFunc = (startX: number, endX: number) => (progress: number) => {
  const startY = 9.5;
  const endY = 26.5;

  const currentX = startX + (endX - startX) * progress;
  const currentY = startY + (endY - startY) * progress;

  return `M ${startX},${startY} L ${currentX},${currentY} Z`;
};

const getMainPathD = getGeneratePathDFunc(8, 25);
const getMaskPathD = getGeneratePathDFunc(10, 27);
const getCircleRadius = (progress: number) => 6 + 3.2 * progress;

const animationDuration = 300;

const diameterLineMaskId = useUniqueHash('diameter-line-');
const secondVolumeWaveId = useUniqueHash('second-volume-wave-');
</script>

<style lang="scss" module>
.volume {
  fill: currentColor;
}
</style>
