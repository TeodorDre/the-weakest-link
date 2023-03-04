import { createPinia } from 'pinia';
import { App } from 'vue';

import { isChrome, isClient, isFirefox, isIOS, isMobile, isSafari, isServer, toPercent, toPixel } from '@/base/dom';
import { t } from '@/code/localization/translate';

export const globalProperties = {
  $t: t,
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

  const pinia = createPinia();
  app.use(pinia);
}
