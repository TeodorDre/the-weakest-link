<template>
  <button
    ref="buttonEl"
    :class="{
      [$style.button]: true,
      [$style.animated]: staticAnimation,
      [$style.primary]: variation === 'primary',
      [$style.secondary]: variation === 'secondary',
      [$style.secondaryBlack]: variation === 'secondary-black',
    }"
    type="button"
  >
    <slot name="icon"></slot>
    <small :class="$style.text">
      {{ text }}
    </small>
  </button>
</template>

<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core';
import { defineProps, ref } from 'vue';

import useEffect from '@/code/global/use-effect';
import { UnexpectedComponentStateError } from '@/code/errors/component-state-error';
import { toPixel } from '@/base/dom';

const props = withDefaults(defineProps<{
  staticAnimation?: boolean;
  text: string,
  variation?: 'primary' | 'secondary' | 'secondary-black'
}>(), {
  staticAnimation: false,
  variation: 'primary',
});

let requestAnimationFrameIndex = 0;
let requestTimeoutIndex = 0;

const buttonEl = ref<HTMLButtonElement>();
const { x: positionX, y: positionY, width, height } = useElementBounding(buttonEl);

let staticAnimationOffsetX = 0;

const setCSSMousePosition = (x: number, y: number) => {
  buttonEl.value?.style.setProperty('--mouse-x', toPixel(x));
  buttonEl.value?.style.setProperty('--mouse-y', toPixel(y));
};

const tick = (mode: 'increase' | 'decrease') => {
  let _mode = mode;

  if (staticAnimationOffsetX === 0) {
    _mode = 'increase';
  }

  if (staticAnimationOffsetX >= width.value) {
    _mode = 'decrease';
  }

  if (_mode === 'increase') {
    staticAnimationOffsetX += 1;
  } else {
    staticAnimationOffsetX -= 1;
  }

  setCSSMousePosition(staticAnimationOffsetX, height.value / 2);

  requestTimeoutIndex = window.setTimeout(() => {
    requestAnimationFrameIndex = window.requestAnimationFrame(tick.bind(undefined, _mode));
  }, 1000 / 30);
};

const onMouseInteraction = (event: MouseEvent) => {
  const { clientX, clientY } = event;

  if (props.staticAnimation && event.type === 'mouseenter') {
    window.clearTimeout(requestTimeoutIndex);
    window.cancelAnimationFrame(requestAnimationFrameIndex);
  }

  if (props.staticAnimation && event.type === 'mouseleave') {
    tick('increase');
  }

  const mouseX = clientX - positionX.value;
  const mouseY = clientY - positionY.value;

  setCSSMousePosition(mouseX, mouseY);
};

useEffect(() => {
  if (!buttonEl.value) {
    throw new UnexpectedComponentStateError('buttonEl');
  }

  if (props.staticAnimation) {
    requestAnimationFrameIndex = window.requestAnimationFrame(tick.bind(undefined, 'increase'));
  } else {
    setCSSMousePosition(0, 0);
  }

  buttonEl.value.addEventListener('mouseenter', onMouseInteraction);
  buttonEl.value.addEventListener('mousemove', onMouseInteraction);
  buttonEl.value.addEventListener('mouseleave', onMouseInteraction);

  return () => {
    window.cancelAnimationFrame(requestAnimationFrameIndex);

    buttonEl.value?.removeEventListener('mouseenter', onMouseInteraction);
    buttonEl.value?.removeEventListener('mousemove', onMouseInteraction);
    buttonEl.value?.removeEventListener('mouseleave', onMouseInteraction);
  };
});
</script>

<style lang="scss" module>
.button {
  padding: 15px 20px;
  font: inherit;
  font-weight: normal;
  white-space: nowrap;
  border-radius: var(--b-expanded-border-size);
  cursor: pointer;
  border: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}

.buttonSmartTv {
  padding: 15px 30px;
  font-size: 36px;
}

.primary {
  color: var(--c-primary-color);
  --primary-color-gradient: radial-gradient(
      circle 50px at var(--mouse-x) var(--mouse-y),
      var(--c-accent-color),
      var(--c-accent-color-80) 40.62%,
      var(--c-accent-color-20) 100%
  );

  background-color: var(--c-accent-color);

  &:hover {
    background-color: var(--c-accent-hover-color);
  }
}

.animated {
  background: var(--primary-color-gradient);

  &:hover {
    background-color: initial;
  }
}

.secondary {
  color: var(--c-primary-color);
  backdrop-filter: blur(5px);
  --secondary-color-gradient: radial-gradient(
      circle 100px at var(--mouse-x) var(--mouse-y),
      var(--c-background-color),
      var(--c-background-color-20) 40.62%,
      var(--c-background-color-10) 100%
  );
  background: var(--secondary-color-gradient);
}

.secondaryBlack {
  color: var(--c-third-color);
  background: 0;
}

@media (max-width: 360px) {
  .button {
    padding: 7px 15px;
  }

  .text {
    font-size: 10px;
  }
}
</style>
