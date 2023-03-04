import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import useSessionStore from '@/code/store/session-store';
import { storeToRefs } from 'pinia';
import { AppRoute } from '@/routes/index';

const authProtectedRoutes = [
  AppRoute.ProfilePage,
  AppRoute.RoundPage,
];

export default function useMiddleware(router: Router) {
  const { isAuth } = storeToRefs(useSessionStore());

  const isAuthMiddleware = (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (authProtectedRoutes.includes(to.name as AppRoute) && !isAuth.value) {
      return next({ name: AppRoute.HomePage })
    }

    return next();
  }

  router.beforeEach(isAuthMiddleware);
}
