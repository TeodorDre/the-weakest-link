<template>
  <section
    ref="notificationEl"
    :class="{
      [$style.notificationContainer]: true,
      [$style.mobile]: $isMobile,
      [$style.top]: position === 'top',
      [$style.bottom]: position === 'bottom',
    }"
  >
    <div :class="$style.wrapper">
      <p :class="$style.text" v-html="currentNotification?.message"></p>
      <app-slot-button :class="$style.iconClose" @click="onCloseButtonClick()">
        X
      </app-slot-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import {NotificationPosition} from '@/code/notification/notification';

import AppSlotButton from '@/components/ui/AppSlotButton.vue';
import useLayoutStore from '@/code/store/layout-store';

const layoutStore = useLayoutStore();
const { currentNotification } = storeToRefs(layoutStore);

const position = computed<NotificationPosition>(() => currentNotification.value?.position || 'top');

const hideTimeoutMs = computed(() => currentNotification.value?.hideTimeoutMs || 3000);
let hideTimeoutId: number | undefined;

const notificationEl = ref<HTMLElement>();

const doRemoveNotification = () => {
  if (!currentNotification.value?.id) {
    return;
  }

  layoutStore.removeNotification(currentNotification.value?.id);
};

onMounted(() => {
  hideTimeoutId = window.setTimeout(() => {
    doRemoveNotification();
  }, hideTimeoutMs.value);
})

const onCloseButtonClick = () => {
  doRemoveNotification();
};
</script>

<style lang="scss" module>
.notificationContainer {
  position: fixed;
  z-index: 5;
  display: block;
  max-width: 450px;
  overflow: hidden;
}

.top {
  top: 100px;
  left: 160px;
}

.bottom {
  bottom: var(--g-header-height);
  right: 80px;
}

.mobile.bottom {
  bottom: 40px;
  left: 40px;
  right: 40px;
}

.iconClose {
  margin-left: 10px;
  color: var(--c-error-color);
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: var(--c-accent-color);
}

.text {
  color: var(--c-primary-color);
}
</style>
