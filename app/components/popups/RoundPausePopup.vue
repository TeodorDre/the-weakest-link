<template>
  <section :class="$style.chooseRole">
    <h1>Пауза</h1>
    <p>
      Но пока вы ждете остальных, можете поиграть в пасхалку!
    </p>
  </section>
</template>

<script lang="ts" setup>
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
  min-height: 250px;
  border-radius: var(--b-default-border-size);
}
</style>
