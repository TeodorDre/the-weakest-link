<template>
  <div
    :data-layer-fullscreen="fullscreen"
    :class="{
      [$style.layer]: true,
      [$style.fullscreen]: fullscreen,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  fullscreen?: boolean;
}>(), {
  fullscreen: false,
});
</script>

<style lang="scss" module>
.layer {
  position: absolute;
}

.fullscreen {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
