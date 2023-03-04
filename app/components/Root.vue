<template>
  <div :class="$style.layout">
    <app-header />
    <main class="root">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
</script>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
}
</style>
