<template>
  <button :class="$style.button" :disabled="isDisabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isDisabled?: boolean;
}>(), {
  isDisabled: false,
});
</script>

<style module lang="scss">
.button {
  color: var(--c-primary-color);
  background-color: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;

  &:focus {
    outline: none;
    color: var(--c-accent-color);
  }

  &:hover {
    color: var(--c-accent-color);
  }
}
</style>
