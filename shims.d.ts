import { AppRoute } from '@/routes';
import { toPercent, toPixel } from '@/base/dom';
import { translate } from '@/code/localization/translate';

declare module '*.vue' {
  import { ComponentPublicInstance } from 'vue';

  declare const component: ComponentPublicInstance;

  export default component;
}

declare global {

}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: typeof translate;
    $AppRoute: typeof AppRoute;
    $toPixel: typeof toPixel;
    $toPercent: typeof toPercent;
    $isMobile: boolean;
    $isDesktop: boolean;
    $iOS: boolean;
    $isSafari: boolean;
    $isChrome: boolean;
    $isClient: boolean;
    $isServer: boolean;
    $isFirefox: boolean;
  }
}

export {};
