import type { DashboardTransactionsStatsPayload, TransactionFiltersPayload } from '../global.type'

export const transactionQueryKeys = {
  transaction: ({ id, country }: { id: string; country: string }) => [
    'transaction',
    { id },
    { country },
  ],
  // transactionPagination: (page: number) => ['transaction', { page }], // Ce n'est plus nécessaire si transactionFilters gère la pagination

  // Clé de requête pour les filtres de transactions générales
  transactionFilters: (payload: TransactionFiltersPayload) => [
    'transactionFilters',
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { status: payload.status },
    { type: payload.type },
    { operator: payload.operator }, // Ajout du champ 'operator'
    { dates: payload.dates }, // Ajout du champ 'dates'
  ],
  transactionDashboardFilters: (payload: TransactionFiltersPayload) => [
    'transactionDashboardFilters',
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { status: payload.status },
    { type: payload.type },
    { operator: payload.operator }, // Ajout du champ 'operator'
    { dates: payload.dates }, // Ajout du champ 'dates'
  ],
  transactionDashboardStats: (payload: DashboardTransactionsStatsPayload) => [
    'transactionDashboardStats',
    { dates: payload.dates }, // Ajout du champ 'dates'
  ],
  transactionStats: (payload: DashboardTransactionsStatsPayload) => [
    // Nouvelle clé pour TransactionStatsResponse
    'transactionStats',
    { dates: payload.dates },
    { type: payload.type }, // Ajout du champ 'type'
  ],

  // Clé de requête pour les filtres de transactions échouées
  transactionFailedFilters: (payload: TransactionFiltersPayload) => [
    'transactionFailedFilters',
    'failed', // Un indicateur pour les transactions échouées
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { status: payload.status },
    { type: payload.type },
    { operator: payload.operator }, // Ajout du champ 'operator'
    { dates: payload.dates }, // Ajout du champ 'dates'
    // {has_relaunch_payment: payload.has_relaunch_payment} // Laissez ceci si c'est encore pertinent pour 'failed'
  ],
}
