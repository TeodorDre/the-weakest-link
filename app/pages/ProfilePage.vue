<template>
  <div :class="$style.profile">
    <profile-information-view />
  </div>
</template>

<script lang="ts" setup>
import ProfileInformationView from '@/components/ProfileInformationView.vue';
</script>

<style lang="scss" module>
.profile {
  padding: 10px;
}
</style>
