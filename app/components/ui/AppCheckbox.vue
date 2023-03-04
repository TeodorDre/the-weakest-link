<template>
  <div
    :class="$style.checkbox"
  >
    <div :class="$style.wrapper">
      <input
        :id="id"
        type="checkbox"
        :class="$style.input"
        :checked="input"
        @input="(event) => emit('update:input', Boolean(event.target.checked))"
      >
      <label :class="$style.label" :for="id"></label>
    </div>
    <span :class="$style.text">
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid';

defineProps<{
  text: string;
  input?: boolean;
}>();

const id = nanoid(3);
const emit = defineEmits(['update:input']);
</script>

<style lang="scss" module>
.checkbox {
  display: flex;
  gap: 5px;
  align-items: center;
}

.checkboxChecked {
}

.input {
  height: 0;
  width: 0;
  outline: none;
  opacity: 0;

  &:checked + label {
    background: var(--c-accent-color);
  }

  &:checked + label::after {
    left: 100%;
    transform: translateX(-100%);
  }
}

.wrapper {
  display: flex;
}

.text {
  font-size: 10px;
}

.label {
  position: relative;
  width: 34px;
  height: 14px;
  background-color: var(--c-secondary-color);
  border-radius: 100px;
  transition: background-color .3s;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: var(--c-primary-color);
    border-radius: 90px;
    box-shadow: var(--c-shadow-button);
    transition: all .3s;
  }
}
</style>
