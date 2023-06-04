<template>
  <section :class="$style.wrapper">
    <header :class="$style.header">
      <p> {{ $t('game.searchGames') }} </p>
      <app-slot-button @click="closePopup()">
        <icon-close />
      </app-slot-button>
    </header>
    <div :class="$style.body">
      <app-input
        :placeholder="$t('common.search')"
        v-model:input="searchText"
      />
      <section>
        <ul :class="$style.list">
          <li
            v-for="result in fakeResults"
            :key="result">
            <app-search-result-block
              :text="getSearchBlockText(result)"
              @click="goToRoom(result)"
            />
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
import IconClose from '@/components/icons/IconClose.vue';
import AppSlotButton from '@/components/ui/AppSlotButton.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSearchResultBlock from '@/components/ui/AppSearchResultBlock.vue';
import { ref } from 'vue';
import { ISearchResultBlock } from '@/code/search/search-api';
import { nanoid } from 'nanoid';
import useLayoutStore from '@/code/store/layout-store';
import { useRouter } from 'vue-router';
import { AppRoute } from '@/routes';

const fakeResults: ISearchResultBlock[] = [
  { name: 'Teodor', id: nanoid(3), createdAt: new Date().toDateString() },
  { name: 'Tanya', id: nanoid(3), createdAt: new Date().toDateString() },
  { name: 'Pikul', id: nanoid(3), createdAt: new Date().toDateString() }
];

const layoutStore = useLayoutStore();
const router = useRouter();

const searchText = ref('');

const closePopup = () => {
  layoutStore.setPopupName(null);
}

const goToRoom = (result: ISearchResultBlock) => {
  closePopup();

  router.push({
    name: AppRoute.RoundPage,
    params: {
      id: result.id,
    }
  })
};

const getSearchBlockText = (block: ISearchResultBlock) => `${block.name} - ${block.createdAt}`;
</script>

<style lang="scss" module>
.wrapper {
  position: absolute;
  padding: 20px;
  border-radius: var(--b-expanded-border-size);
  background-color: var(--c-accent-color);
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.body {
  display: grid;
  margin-top: 10px;
  grid-template-columns: 1fr;
  gap: 20px
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
</style>
