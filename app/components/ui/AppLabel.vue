<template>
  <div
    :class="$style.label"
    :style="{
      position: position,
      left: left ? $toPixel(left) : undefined,
      top: top ?  $toPixel(top) : undefined,
    }"
  >
    <span>
      {{ text }}
    </span>
    <slot name="icon"></slot>
  </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  position?: 'absolute' | 'fixed';
  text: string;
  left?: number;
  top?: number;
}>(), {
  position: 'fixed',
});
</script>

<style module lang="scss">
.label {
  z-index: var(--z-index-label-tips);
  padding: 4px 10px;
  border-radius: 2px;
  white-space: nowrap;
  background-color: var(--c-background-dark-color-75);
  transition: opacity 0.1s ease;

  /*
    Safari tries to select text inside volume label
    when session is changing volume
  */
  user-select: none;

  /*
    pointer-events: none; is used to fix chrome-related issue
    https://github.com/facebook/react/issues/4492
  */
  pointer-events: none;
}
</style>
