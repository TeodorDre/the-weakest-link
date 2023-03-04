<template>
  <div :class="$style.tooltip">
    <icon-tooltip-arrow
      v-show="isArrowShown"
      :class="{
        [$style.arrow]: true,
        [$style.arrowTopRight]: arrowDirection === 'top-right',
        [$style.arrowBottomLeft]: arrowDirection === 'bottom-left',
      }"
    />
    <div :class="$style.title">
      {{ title }}
    </div>
    <span :class="$style.text">
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import IconTooltipArrow from '@/components/icons/IconTooltipArrow.vue';

withDefaults(defineProps<{
  title: string;
  text: string;
  isArrowShown?: boolean;
  arrowDirection?: 'top-right' | 'bottom-left';
}>(), { arrowDirection: 'top-right', isArrowShown: true });
</script>

<style lang="scss" module>
.tooltip {
  background-color: var(--c-primary-color);
  padding: 20px;
  position: relative;
  border-radius: 15px;
}

.arrow {
  position: absolute;
}

.arrowTopRight {
  top: -6px;
  right: 20px;
}

.arrowBottomLeft {
  bottom: -6px;
  left: 20px;
  transform: rotate(180deg);
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.text {
  display: block;
  margin-top: 10px;
}
</style>
