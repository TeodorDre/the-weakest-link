<template>
  <div :class="$style.layout">
    <app-header />
    <app-notification />
    <main :class="$style.root">
      <router-view :class="$style.routerView"></router-view>
    </main>
    <transition name="fade">
      <app-popup-view v-if="popupName" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import AppPopupView from '@/components/AppPopupView.vue';
import { storeToRefs } from 'pinia';
import useLayoutStore from '@/code/store/layout-store';
import { audioService } from '@/services';
import AppNotification from '@/components/AppNotification.vue';

const { popupName } = storeToRefs(useLayoutStore());

audioService.init();
</script>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
}

.root {
}

.routerView {
  height: calc(100vh - var(--g-header-height));
}
</style>
