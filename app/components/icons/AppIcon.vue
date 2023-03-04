<template>
  <div :class="$style.icon">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" module>
.icon {
  width: 24px;
  height: 24px;
  user-select: none;
  vertical-align: initial;
  display: inline-block;
  flex-shrink: 0;
  color: currentColor;
  text-align: center;
  line-height: 1em;

  &--md {
    width: 48px;
    height: 48px;
  }
}

.iconSmartTv {
  width: 48px;
  height: 48px;
}
</style>
