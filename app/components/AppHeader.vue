<template>
  <header :class="$style.header">
    <nav :class="$style.nav">
      <router-link
        v-for="{routeName, text} in links"
        :key="routeName"
        :class="$style.link"
        :to="{ name: routeName, }">
        {{ text }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { AppRoute } from '@/routes';
import { translate } from '@/code/localization/translate';

const links = [
  {
    routeName: AppRoute.HomePage,
    text: translate('nav.home')
  },
  {
    routeName: AppRoute.RoundPage,
    text: translate('nav.round')
  }
  , {
    routeName: AppRoute.ProfilePage,
    text: translate('nav.profile')
  }
]
</script>

<style lang="scss" module>
.header {
  padding: 10px;
  min-height: var(--g-header-height);
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
