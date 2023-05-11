<template>
  <div
    :class="{
      [$style.sum]: true,
      [$style.current]: isCurrent,
    }"
  >{{ sum }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  sum: number;
  isCurrent: boolean;
}>();
</script>

<style lang="scss" module>
.sum {
  background-color: var(--c-accent-color-20);
  padding: 5px 10px;
  border-radius: 20px;
  text-align: center;
}

.current {
  background-color: var(--c-error-color-30);
}
</style>
