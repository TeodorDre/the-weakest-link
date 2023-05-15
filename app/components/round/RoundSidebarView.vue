<template>
  <aside :class="$style.sidebar">
    <current-round-bank-progress />
  </aside>
</template>

<script lang="ts" setup>
import CurrentRoundBankProgress from '@/components/round/CurrentRoundBankProgress.vue';
</script>

<style lang="scss" module>
.sidebar {
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: var(--c-primary-color-15);
  padding: 25px 5px 5px;
  min-width: 150px;
  border-right: 1px solid var(--c-accent-color);
}
</style>
