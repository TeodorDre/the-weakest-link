<template>
  <button :class="$style.button">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  text: string;
}>();
</script>

<style lang="scss" module>
.button {
  padding: 15px 20px;
  font: inherit;
  font-weight: normal;
  background-color: var(--c-background-color-20);
  color: var(--c-primary-color);
  width: 100%;
  white-space: nowrap;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
  text-align: left;
  margin: 0;
}
</style>
