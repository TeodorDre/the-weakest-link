import { RouteLocationNamedRaw, RouteRecord, RouteRecordRaw } from 'vue-router';

export enum AppRoute {
  HomePage = 'HomePage',
  RoundPage = 'RoundPage',
}

export const routes: RouteRecordRaw[] = [
  {
    name: AppRoute.HomePage,
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    name: AppRoute.RoundPage,
    path: '/round',
    component: () => import('@/pages/RoundPage.vue'),
  },
];
