export enum Authentication {
  AccessToken = 'access-token',
  RefreshToken = 'refresh-token',
  DeviceId = 'device-id',
  ExpiryIn = 'expires-in',
}

export const AuthRouteApi = {
  login: '/admin/api/v1/auth/login',
  // getOne: (id: string) => `/api/v1/admins/${id}`,
  logout: '/admin/api/v1/auth/logout',
  refreshToken: '/admin/api/v1/auth/token/new',
}
