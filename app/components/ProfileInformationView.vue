<template>
  <article :class="$style.information">
    <p> {{ $t('session.youUserName', { userName }) }} </p>
    <app-button static-animation :text="$t('session.logout')" @click="logout()"></app-button>
  </article>
</template>

<script lang="ts" setup>
import useLogout from '@/code/session/use-logout';
import AppButton from '@/components/ui/AppButton.vue';
import { storeToRefs } from 'pinia';
import useSessionStore from '@/code/store/session-store';

const { logout } = useLogout();
const { userName } = storeToRefs(useSessionStore());
</script>

<style lang="scss" module>
.information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
</style>
