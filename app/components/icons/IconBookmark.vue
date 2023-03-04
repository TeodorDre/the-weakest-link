<template>
  <app-icon>
    <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
      <title v-if="$isNativeTitleTooltipShown">{{ $t('icons.bookmark') }}</title>
      <circle cx="21" cy="21" r="21" fill="#29383C" />
      <path
        d="M16.7 16.5H25.3C25.4105 16.5 25.5 16.5895 25.5 16.7V26.5436C25.5 26.7113 25.306 26.8045 25.1751 26.6997L21.7496 23.9594C21.3114 23.6088 20.6886 23.6088 20.2504 23.9594L16.8249 26.6997C16.694 26.8045 16.5 26.7113 16.5 26.5436V16.7C16.5 16.5895 16.5895 16.5 16.7 16.5Z"
        fill="currentColor" stroke="currentColor"
      />
    </svg>
  </app-icon>
</template>

<script lang="ts" setup>
import AppIcon from './AppIcon.vue';
</script>
