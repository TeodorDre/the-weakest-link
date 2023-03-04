<template>
  <app-button :class="$style.timer" :text="displayedTimer" static-animation />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatTime } from '@/base/date';
import AppButton from '@/components/ui/AppButton.vue';

const displayedTimer = computed(() => formatTime(30));
</script>

<style lang="scss" module>
.timer {
  width: 100%;
  text-align: center;
}
</style>
