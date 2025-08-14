import type { DefaultFiltersPayload } from '../global.type'

export const usersQueryKeys = {
  user: ({ id }: { id: string }) => ['user', { id }],
  usersPagination: (page: number) => ['users', { page }],
  usersFilters: (payload: DefaultFiltersPayload) => [
    'users',
    { page: payload.page },
    { q: payload.q },
    // {merchant_id: payload.merchant_id},
    // {role: payload.role},
  ],
}
