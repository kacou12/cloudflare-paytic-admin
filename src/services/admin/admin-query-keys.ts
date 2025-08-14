import type { AdminFiltersPayload } from './admin-type'

export const adminQueryKeys = {
  // admins: (country: string) => ['admins', country],
  admin: ({ id, country }: { id: string; country: string }) => ['admin', id, country],
  adminPagination: (page: number) => ['admin', page],
  adminFilters: (payload: AdminFiltersPayload) => [
    'admin',
    payload.page,
    payload.searchText,
    payload.country,
  ],
}
