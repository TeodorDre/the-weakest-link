<template>
  <div class="skeleton" :class="{ [$style.skeletonAnimated]: animated }" :style="{ width, height, borderRadius }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  width: string,
  height: string,
  borderRadius: string,
  animated?: boolean;
}>();
</script>

<style lang="scss" module>
.skeleton {
  display: block;
  background: var(--c-background-dark-color);
  border: 1px solid transparent;
}

@keyframes :global(skeleton-animation) {
  0% {
    background-position: -50%;
  }
  100% {
    background-position: 50%;
  }
}

.skeletonAnimated :global {
  --g-skeleton-gradient: linear-gradient(
      90.17deg,
      rgba(0, 0, 0, 0.0416667) 0%,
      rgba(0, 2, 2, 0.0987162) 23.2%,
      rgba(0, 17, 19, 0.6) 48.73%,
      rgba(0, 17, 19, 0.6) 50.58%,
      rgba(0, 2, 2, 0.0772737) 73.84%,
      rgba(0, 0, 0, 0.0416667) 100%
  );

  background: var(--g-skeleton-gradient), #1c2e33;
  background-size: var(--s-skeleton-background-size);
  animation-name: skeleton-animation;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

</style>
