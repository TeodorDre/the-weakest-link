<template>
  <section :class="$style.chooseRole">
    <h1>Выберите роль</h1>
    <select v-model="role">
      <option value="player">Игрок</option>
      <option value="watcher">Зритель</option>
      <option value="host">Ведущий </option>
    </select>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useLocalStorage } from '@/code/local-storage/use-local-storage';
import { LocalStorageKey } from '@/code/local-storage/local-storage';
import useLayoutStore from '@/code/store/layout-store';

const { setLocalStorageValue } = useLocalStorage();
const layoutStore = useLayoutStore();
const role = ref('player');

watch(role, (val) => {
  setLocalStorageValue(LocalStorageKey.Role, { value: val, expires: 60 * 60 * 24 });
  layoutStore.setPopupName(null);
});
</script>

<style lang="scss" module>
.chooseRole {
  position: absolute;
  top: 30%;
  left: 45%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: var(--c-accent-color);
  gap: 10px;
  width: 200px;
  min-height: 250px;
  border-radius: var(--b-default-border-size);
}
</style>
