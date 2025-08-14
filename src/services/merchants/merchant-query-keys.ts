import type { DefaultFiltersPayload, TransactionFiltersPayload } from '../global.type'
import type { MerchantStatsPayload } from './merchant-type' // Added import

export const merchantsQueryKeys = {
  // users: (country: string) => ['users', country],
  merchant: ({ id }: { id: string }) => ['merchant', id],
  merchantsPagination: (page: number, country: string) => ['merchant', page, country],
  merchantsFilters: (payload: DefaultFiltersPayload) => [
    'merchant',
    payload.page,
    payload.q,
    // payload.country_id,
  ],
    transactionsMerchantFilters: (payload: TransactionFiltersPayload) => [
      'transactionsMerchantFilters',
      { limit: payload.limit },
      { page: payload.page },
      { q: payload.q },
      { status: payload.status },
      { type: payload.type },
      { operator: payload.operator }, // Ajout du champ 'operator'
      { dates: payload.dates },       // Ajout du champ 'dates'
    ],
  serviceAvailability: ({ country }: { country: string }) => ['serviceAvailability', country],
  merchantStats: (payload: MerchantStatsPayload) => [
    'merchantStats',
    { dates: payload.dates },
  ],
}
