import type { MerchantRequestFiltersPayload } from '../global.type'

export const merchantRequestsQueryKeys = {
  merchantRequestsFilters: (payload: MerchantRequestFiltersPayload) => [
    'merchant-requests',
    payload.page,
    payload.q,
    payload.status,
    payload.type,
    payload.limit,
    payload.dates,
  ],
}
