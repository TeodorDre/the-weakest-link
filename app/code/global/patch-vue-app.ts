import { createPinia } from 'pinia';
import { App } from 'vue';

import { isChrome, isClient, isFirefox, isIOS, isMobile, isSafari, isServer, toPercent, toPixel } from '@/base/dom';
import { t } from '@/code/localization/translate';
import { createRouter, createWebHashHistory } from 'vue-router';
import { AppRoute, routes } from '@/routes';

export const globalProperties = {
  $t: t,
  $AppRoute: AppRoute,
  $toPixel: toPixel,
  $toPercent: toPercent,
  $isMobile: isMobile,
  $isFirefox: isFirefox,
  $isDesktop: !isMobile,
  $iOS: isIOS,
  $isSafari: isSafari,
  $isChrome: isChrome,
  $isClient: isClient,
  $isServer: isServer,
  $isNativeTitleTooltipShown: false,
};

export default function patchVueApp(app: App<unknown>, props?: Partial<typeof globalProperties>) {
  Object.assign(app.config.globalProperties, globalProperties, props);

  const router = createRouter({ history: createWebHashHistory('/'), routes, })
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);
}
