export const ChargeRouteApi = {
  default: '/admin/api/v1/charge',
  getOne: (id: string) => `/admin/api/v1/charge/${id}`,
} as const

export const CHARGE_TABLE_HEADERS = [
  { text: 'ID', value: 'id' },
  { text: 'Provider ID', value: 'provider_id' },
  { text: 'Merchant ID', value: 'merchant_id' },
  { text: 'Charge', value: 'charge' },
  { text: 'Created At', value: 'created_time' },
  { text: 'Actions', value: 'actions' },
]
