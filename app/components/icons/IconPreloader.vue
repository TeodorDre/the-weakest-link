<template>
  <app-icon
    :class="{
      [$style.icon]: true,
      [$style.iconLight]: isLightMode,
    }"
  >
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <title v-if="$isNativeTitleTooltipShown">{{ $t('icons.preloader') }}</title>
      <circle :class="$style.circleLeft" stroke-width="1.5" r="15" cy="50" cx="20" fill="currentColor" />
      <circle :class="$style.circleRight" stroke-width="1.5" r="15" cy="50" cx="30" fill="currentColor" />
    </svg>
  </app-icon>
</template>

<script lang="ts" setup>
import AppIcon from './AppIcon.vue';

withDefaults(defineProps<{
  isLightMode?: boolean;
}>(), {
  isLightMode: false,
});
</script>

<style lang="scss" module>
.icon {
  width: 100px;
  height: 100px;
  color: var(--c-accent-color);
}

.iconLight {
  color: var(--c-primary-color);
  opacity: 0.2;
}

.circleRight {
  animation: preloader-animation_right linear 3s infinite;
  animation-delay: 0s;
  transform: translateX(50%);
}

.circleLeft {
  animation: preloader-animation_left linear 3s infinite;
  animation-delay: 0s;
}

@keyframes preloader-animation_left {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes preloader-animation_right {
  0% {
    transform: translateX(50%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(50%);
  }
}
</style>
