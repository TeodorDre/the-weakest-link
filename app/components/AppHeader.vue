<template>
  <header :class="$style.header">
    <nav :class="$style.nav">
      <router-link :class="$style.link" :to="{ name: $AppRoute.HomePage, }">
        {{ $t('nav.home') }}
      </router-link>
      <router-link :class="$style.link" :to="{ name: $AppRoute.RoundPage }">
        {{ $t('nav.round') }}
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

.nav {
  display: flex;
  gap: 10px;
}

.link {
  color: inherit;;
  text-decoration: none;
}
</style>
