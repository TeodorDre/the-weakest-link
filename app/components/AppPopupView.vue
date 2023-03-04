<template>
  <root-z-index-layer
    :class="$style.popup"
    fullscreen
    class="popup-layer"
  >
    <component :ref="(comp) => popupEl = comp?.$el" :is="popupName" />
  </root-z-index-layer>
</template>

<script lang="ts" setup>
import RootZIndexLayer from '@/components/ui/RootZIndexLayer.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import useLayoutStore from '@/code/store/layout-store';
import { storeToRefs } from 'pinia';

const popupEl = ref<HTMLElement>();
const layoutStore = useLayoutStore();

const { popupName } = storeToRefs(layoutStore);

onClickOutside(popupEl, () => {
  layoutStore.setPopupName(null);
}, {
  ignore: []
});
</script>

<style lang="scss" module>
.popup {
  z-index: var(--z-index-popup-view);
  overflow: auto;
  backdrop-filter: blur(6px);
}
</style>
