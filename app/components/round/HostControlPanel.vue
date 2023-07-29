<template>
  <section :class="$style.admin">
    <app-button :text="$t('hostAction.pause')" />
    <app-button :text="$t('hostAction.play')"/>
  </section>
</template>

<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue';
</script>

<style lang="scss" module>
.admin {

}
</style>
