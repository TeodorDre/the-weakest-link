<template>
  <div :class="$style.home">
    <registration-user-block-view v-if="!isAuth"></registration-user-block-view>
    <user-action-block-view v-else />
  </div>
</template>

<script lang="ts" setup>
import useSessionStore from '@/code/store/session-store';
import RegistrationUserBlockView from '@/components/RegistrationUserBlockView.vue';
import { storeToRefs } from 'pinia';
import UserActionBlockView from '@/components/UserActionBlockView.vue';

const { isAuth } = storeToRefs(useSessionStore());
</script>

<style lang="scss" module>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
}
</style>
