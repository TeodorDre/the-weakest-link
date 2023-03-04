<template>
  <app-icon>
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title v-if="$isNativeTitleTooltipShown">{{ $t('icons.share') }}</title>
      <rect width="42" height="42" rx="21" fill="#29383C" />
      <path d="M22.8566 14.6495C22.7143 14.5047 22.4985 14.4604 22.3106 14.5373C22.1228 14.6141 22 14.797 22 15V17.7792H20.9488C17.147 17.7792 14 20.6471 14 24.2622V26C14 26.203 14.1227 26.3858 14.3106 26.4627C14.4984 26.5396 14.7141 26.4953 14.8565 26.3506L15.3666 25.832C16.964 24.2082 19.6191 23.2594 22 23.215V25.9926C22 26.1956 22.1228 26.3784 22.3106 26.4553C22.4985 26.5322 22.7143 26.4878 22.8566 26.3431L27.8566 20.8468C28.0478 20.6522 28.0478 20.3403 27.8566 20.1458L22.8566 14.6495Z" fill="currentColor" />
    </svg>
  </app-icon>
</template>

<script lang="ts" setup>
import AppIcon from './AppIcon.vue';
</script>

