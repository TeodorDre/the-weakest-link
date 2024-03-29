<template>
  <header :class="$style.header">
    <nav :class="$style.nav">
      <router-link
        v-for="{routeName, text} in links"
        :key="routeName"
        :class="$style.link"
        :to="{ name: routeName }">
        {{ text }}
      </router-link>
    </nav>
    <div v-if="isLobbyPage" :class="$style.lobby">
      <p> Lobby: {{ lobbyName }} </p>
      <p> Players: {{ playersConnected }} / {{ lobbyPlayersCount }} </p>
    </div>
    <app-slot-button>
      <icon-volume mode="off" />
    </app-slot-button>
  </header>
</template>

<script lang="ts" setup>
import { AppRoute } from '@/routes';
import { translate } from '@/code/localization/translate';
import IconVolume from '@/components/icons/IconVolume.vue';
import AppSlotButton from '@/components/ui/AppSlotButton.vue';
import { storeToRefs } from 'pinia';
import useSessionStore from '@/code/store/session-store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useGameStore from '@/code/store/game-store';

const { isAuth } = storeToRefs(useSessionStore());
const route = useRoute();
const gameStore = useGameStore();

const { lobbyName, lobbyPlayersCount, playersConnected } = storeToRefs(gameStore);

const isLobbyPage = computed(() => route.name === AppRoute.RoundPage);

const links = computed(() => {
  const links = [
    {
      routeName: AppRoute.HomePage,
      text: translate('nav.home')
    }
  ]

  if (isAuth.value) {
    links.push({
      routeName: AppRoute.ProfilePage,
      text: translate('nav.profile')
    })
  }

  return links;
})
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  min-height: var(--g-header-height);
  background-color: var(--c-primary-color-15);
  border-bottom: 1px solid var(--c-accent-color);
}

.lobby {
  display: flex;
  gap: 10px;
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
