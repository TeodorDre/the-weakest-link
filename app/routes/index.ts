import { RouteLocationNamedRaw, RouteRecord, RouteRecordRaw } from 'vue-router';

export enum AppRoute {
  HomePage = 'HomePage',
  RoundPage = 'RoundPage',
  LoginPage = 'LoginPage',
  ProfilePage = 'ProfilePage',
  CreateGamePage = 'CreateGamePage',
}

export const routes: RouteRecordRaw[] = [
  {
    name: AppRoute.CreateGamePage,
    path: '/create-game/',
    component: () => import('@/pages/CreateGamePage.vue'),
  },
  {
    name: AppRoute.HomePage,
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    name: AppRoute.RoundPage,
    path: '/round/:id/',
    component: () => import('@/pages/RoundPage.vue'),
  },
  {
    name: AppRoute.LoginPage,
    path: '/login/',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    name: AppRoute.ProfilePage,
    path: '/profile/',
    component: () => import('@/pages/ProfilePage.vue')
  }
];
