<template>
  <div :class="$style.home">
    <registration-user-block-view v-if="!isAuth"></registration-user-block-view>
  </div>
</template>

<script lang="ts" setup>
import useSessionStore from '@/code/store/session-store';
import RegistrationUserBlockView from '@/components/session/RegistrationUserBlockView.vue';
import { storeToRefs } from 'pinia';

const { isAuth } = storeToRefs(useSessionStore());

console.log(isAuth.value);
</script>

<style lang="scss" module>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
