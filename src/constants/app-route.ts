export const AppRoute = Object.freeze({
  // APP_MOBILE: { name: 'App mobile' },
  UNAUTHORIZE: '/unauthorize',

  LOGIN: {
    name: 'login',
    path: '/login',
  },
  LOST_PASSWORD: {
    name: 'lost-password',
    path: '/lost-password',
  },
  ABOUT: {
    name: 'about',
    path: '/about',
  },
  VERIFY_EMAIL: {
    name: 'verify-email',
    path: '/verify-email',
  },
  UPDATE_PASSWORD: {
    name: 'update-password',
    path: '/update-password',
  },
  SUCCESS_UPDATE_PASSWORD: {
    name: 'success-update-password',
    path: '/success-update-password',
  },

  DASHBOARD: {
    name: 'dashboard',
    path: '/dashboard',
  },
  ADMIN: {
    name: 'admin',
    path: '/',
  },

  COLLECTED: {
    name: 'collected',
    path: '/collected',
  },
  TRANSFERED: {
    name: 'transfered',
    path: '/transfered',
  },
  TRANSACTIONS: {
    name: 'transactions',
    path: '/transactions',
  },
  WALLET: {
    name: 'wallet',
    path: '/wallet',
  },
  CLIENTS: {
    name: 'clients',
    path: '/clients',
  },
  CLIENT_DETAILS: {
    name: 'clients-details',
    path: '/clients-details/:id',
  },
  ALL_REQUESTS: {
    name: 'requests',
    path: '/requests',
  },
  PENDING_REQUESTS: {
    name: 'pending-requests',
    path: '/pending-requests',
  },
  VALIDATED_REQUESTS: {
    name: 'validated-requests',
    path: '/validated-requests',
  },
  CANCELLED_REQUESTS: {
    name: 'cencelled-requests',
    path: '/cencelled-requests',
  },

  USERS_MANAGEMENT_USER: {
    name: 'users-management-user',
    path: '/users-management/user/:id',
  },

  // Administration
  ADMINISTRATION: {
    name: 'administration',
    path: '/administration',
  },
  // Securité
  SECURITY: {
    name: 'security',
    path: '/security',
  },

  ADMINISTRATION_USER: {
    name: 'administration-user',
    path: '/administration/user/:id',
  },

  // Providers

  PROVIDERS: {
    name: 'providers',
    path: '/providers',
  },
  ISSUERS: {
    name: 'issuers',
    path: '/issuers',
  },
  USERS: {
    name: 'users',
    path: '/users',
  },
  ISSUER_PROVIDER_RATE: {
    name: 'issuer-provider-rate',
    path: '/issuer-provider-rate',
  },

  MERCHANT: {
    name: 'merchant',
    path: '/merchant',
  },
  MERCHANT_DETAILS: {
    name: 'merchant-details',
    path: '/merchant/details/:id',
  },
  MERCHANT_WEBHOOKS_KEYS: {
    name: 'merchant-webhooks-and-keys',
    path: '/merchant/webhooks-and-keys/:id',
  },
  CHARGE: {
    name: 'charge',
    path: '/charge',
  },
  IP: {
    name: 'ip',
    path: '/ip',
  },
  KEY: {
    name: 'key',
    path: '/key',
  },
  WEBHOOK: {
    name: 'webhook',
    path: '/webhook',
  },
  // Aggregator switch
  AGGREGATOR_SWITCH: {
    name: 'aggregator-switch',
    path: '/aggregator-switch',
  },
})
