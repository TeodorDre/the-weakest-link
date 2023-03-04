<template>
  <header :class="$style.header">
    <nav>
      <router-link :class="$style.link" :to="{ name: $AppRoute.HomePage, }">
        {{ $t('nav.home') }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" module>
.header {
  padding: 10px;
  min-height: 40px;
}

.link {
  color: inherit;;
  text-decoration: none;
}
</style>
