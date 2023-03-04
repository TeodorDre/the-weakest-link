<template>
  <input
    :class="{
      [$style.input]: true,
      [$style.inputDisabled]: disabled,
    }"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="type"
    :value="input"
    @input="(event) => emit('update:input', event.target.value)"
  />
</template>

<script lang="ts" setup>

interface Props {
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  input?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits(['update:input']);
</script>

<style module lang="scss">
.input {
  box-sizing: border-box;
  min-height: 40px;
  padding: 0 12px;
  color: var(--c-primary-color);
  background-color: var(--c-background-dark-color);
  border: 1px solid var(--c-primary-color-15);
  border-radius: 8px;
  font-size: 12px;
  font-family: inherit;
  outline: none;
}

.inputDisabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
