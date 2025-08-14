import { AppRoute } from '@/constants/app-route'
import { createRouter, createWebHistory } from 'vue-router'
import { requiresAuth } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_API_URL),
  routes: [
    {
      path: AppRoute.LOGIN.path,
      name: AppRoute.LOGIN.name,
      component: () => import('@/views/guests/LoginView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.LOST_PASSWORD.path,
      name: AppRoute.LOST_PASSWORD.name,
      component: () => import('@/views/guests/ForgetPasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.VERIFY_EMAIL.path,
      name: AppRoute.VERIFY_EMAIL.name,
      component: () => import('@/views/guests/forgetPassword/verifyEmailView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.UPDATE_PASSWORD.path,
      name: AppRoute.UPDATE_PASSWORD.name,
      component: () => import('@/views/guests/forgetPassword/definePasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.SUCCESS_UPDATE_PASSWORD.path,
      name: AppRoute.SUCCESS_UPDATE_PASSWORD.name,
      component: () => import('@/views/guests/forgetPassword/successResetPasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },

    {
      path: AppRoute.ADMIN.path,
      name: AppRoute.ADMIN.name,
      component: () => import('@/components/layouts/DefaultLayout.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { layout: 'DefaultLayout', requiresAuth: true },
      redirect: AppRoute.DASHBOARD,
      children: [
        {
          path: AppRoute.DASHBOARD.path,
          name: AppRoute.DASHBOARD.name,
          component: () => import('@/views/DashboardView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.TRANSFERED.path,
          name: AppRoute.TRANSFERED.name,
          component: () => import('@/views/transfered/transferedView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.COLLECTED.path,
          name: AppRoute.COLLECTED.name,
          component: () => import('@/views/collected/collectedView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },

        {
          path: AppRoute.ALL_REQUESTS.path,
          name: AppRoute.ALL_REQUESTS.name,
          component: () => import('@/views/requests/allRequestsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.PENDING_REQUESTS.path,
          name: AppRoute.PENDING_REQUESTS.name,
          component: () => import('@/views/requests/pendingRequestsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.VALIDATED_REQUESTS.path,
          name: AppRoute.VALIDATED_REQUESTS.name,
          component: () => import('@/views/requests/validatedRequestsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.CANCELLED_REQUESTS.path,
          name: AppRoute.CANCELLED_REQUESTS.name,
          component: () => import('@/views/requests/cancelledRequestsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        // Aggregator switch   =============== **************
        {
          path: AppRoute.AGGREGATOR_SWITCH.path,
          name: AppRoute.AGGREGATOR_SWITCH.name,
          component: () => import('@/views/AggregatorSwitch/AggregatorSwitchView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.SECURITY.path,
          name: AppRoute.SECURITY.name,
          component: () => import('@/views/security/securityView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.MERCHANT_WEBHOOKS_KEYS.path,
          name: AppRoute.MERCHANT_WEBHOOKS_KEYS.name,
          component: () => import('@/views/merchants/MerchantWebhooksAndKeysView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.TRANSACTIONS.path,
          name: AppRoute.TRANSACTIONS.name,
          component: () => import('@/views/transactions/transactionsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },

        // Administration   =============== **************
        {
          path: AppRoute.ADMINISTRATION.path,
          name: AppRoute.ADMINISTRATION.name,
          component: () => import('@/views/administration/AdministrationView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ADMINISTRATION_USER.path,
          name: AppRoute.ADMINISTRATION_USER.name,
          component: () => import('@/views/administration/administrationUserView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        // Providers
        {
          path: AppRoute.PROVIDERS.path,
          name: AppRoute.PROVIDERS.name,
          component: () => import('@/views/providers/ProvidersView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ISSUERS.path,
          name: AppRoute.ISSUERS.name,
          component: () => import('@/views/issuers/IssuersView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.USERS.path,
          name: AppRoute.USERS.name,
          component: () => import('@/views/users/usersView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ISSUER_PROVIDER_RATE.path,
          name: AppRoute.ISSUER_PROVIDER_RATE.name,
          component: () => import('@/views/IssuersProviderRate/IssuersProviderRateView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.MERCHANT.path,
          name: AppRoute.MERCHANT.name,
          component: () => import('@/views/merchants/MerchantsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },

        {
          path: AppRoute.MERCHANT_DETAILS.path,
          name: AppRoute.MERCHANT_DETAILS.name,
          component: () => import('@/views/merchants/MerchantDetailsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.CHARGE.path,
          name: AppRoute.CHARGE.name,
          component: () => import('@/views/charges/ChargesView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
      ],
    },

    {
      path: AppRoute.ABOUT.path,
      name: AppRoute.ABOUT.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

router.beforeEach(requiresAuth)

export default router
