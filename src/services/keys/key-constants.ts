export const KeyRouteApi = {
  default: '/admin/api/v1/key',
  getOne: (id: string) => `/admin/api/v1/key/${id}`,
} as const

export const KEY_TABLE_HEADERS = [
  { text: 'ID', value: 'id' },
  { text: 'Merchant ID', value: 'merchant_id' },
  { text: 'Environnement', value: 'environment' },
  { text: 'Clé API', value: 'key_value' },
  { text: 'Remarque', value: 'remark' },
  { text: 'Statut', value: 'status' },
  { text: 'Created At', value: 'created_time' },
  { text: 'Actions', value: 'actions' },
]
