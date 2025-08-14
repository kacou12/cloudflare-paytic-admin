import { AppRoute } from '@/constants/app-route'
import { getAccessToken } from '@/services/auth/auth-util'
import type {
  _Awaitable,
  NavigationGuardReturn,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded
} from 'vue-router'

export function requiresAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
): _Awaitable<NavigationGuardReturn> {
  if (to.meta.requiresAuth) {
    // see more https://router.vuejs.org/guide/advanced/meta.html
    // see more https://router.vuejs.org/guide/advanced/navigation-guards.html
    if (!getAccessToken()) {
      // RouteRecordNameGeneric
      return AppRoute.LOGIN.name
    }
  }
}
