import type { DefaultFiltersPayload } from '../global.type'

export const providersQueryKeys = {
  // users: (country: string) => ['users', country],
  provider: ({ id }: { id: string }) => ['provider', id],
  providersPagination: (page: number, country: string) => ['provider', page, country],
  providersFilters: (payload: DefaultFiltersPayload) => [
    'provider',
    payload.page,
    payload.q,
    // payload.country_id,
  ],
  serviceAvailability: ['serviceAvailability'],
}
