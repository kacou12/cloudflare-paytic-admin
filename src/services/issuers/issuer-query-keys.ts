import type { DefaultFiltersPayload } from '../global.type'

export const issuersQueryKeys = {
  issuer: ({ id }: { id: string }) => ['issuer', { id }],
  issuersPagination: (page: number) => ['issuers', { page }],
  issuersFilters: (payload: DefaultFiltersPayload) => [
    'issuers',
    { page: payload.page },
    { q: payload.q },
    // {country_id: payload.country_id},
  ],
}
