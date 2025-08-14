export const UserRouteApi = {
  default: '/admin/api/v1/user',
  getOne: (id: string) => `/admin/api/v1/user/${id}`,
  getOneName: `/admin/api/v1/user/*`,
}
