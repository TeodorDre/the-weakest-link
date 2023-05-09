<template>
  <div :class="$style.layout">
    <app-header />
    <main class="root">
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

const { popupName } = storeToRefs(useLayoutStore());

import { gameLoopService } from '@/services';

gameLoopService.init();
</script>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
}

.routerView {
  height: calc(100vh - var(--g-header-height));
}
</style>
