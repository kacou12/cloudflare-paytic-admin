import type {
  DashboardTransactionsStatsPayload,
  DefaultFiltersPayload,
  TransactionFiltersPayload,
} from '@/services/global.type'
import { transactionQueryKeys } from '@/services/transactions/transaction-query-keys'
import {
  fetchDashboardFiltersTransactions,
  fetchDashboardTransactionsStats,
  fetchFiltersTransactions,
  fetchTransactionStats, // Ajout de l'importation
  fetchUserTransactions,
  updateTransactionStatus,
} from '@/services/transactions/transaction-service'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'

import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore'
import type { TransactionTypesEnum } from '@/constants/constant.enum'

const transactionFilters = storeToRefs(useTransactionFiltersStore())

const buildTransactionFiltersPayload = (): TransactionFiltersPayload => ({
  limit: transactionFilters.limit.value,
  page: transactionFilters.page.value,
  q: transactionFilters.q.value,
  status: transactionFilters.status.value,
  type: transactionFilters.type.value,
  operator: transactionFilters.operator.value,
  dates: transactionFilters.dates.value,
})

  const invalidateQuery = () => {
    const queryClient = useQueryClient()
    queryClient.invalidateQueries({
      queryKey: transactionQueryKeys.transactionDashboardFilters(buildTransactionFiltersPayload()),
    })
  }
export function useDashboardTransactionsFiltersQuery() {


  const query = useQuery({
    queryKey: computed(() =>
      transactionQueryKeys.transactionDashboardFilters(buildTransactionFiltersPayload()),
    ),

    queryFn: ({ signal }) => fetchDashboardFiltersTransactions(buildTransactionFiltersPayload()),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      limit: transactionFilters.limit.value,
      q: transactionFilters.q.value,
      status: transactionFilters.status.value,
      operator: transactionFilters.operator.value,
      dates: transactionFilters.dates.value,
      type: transactionFilters.type.value,
    }),
    () => {
      transactionFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    // filters,
    invalidateQuery,
  }
}

export function useTransactionsFiltersQuery(type: TransactionTypesEnum) {
  const queryClient = useQueryClient()

  const buildTransactionFiltersPayload = (): TransactionFiltersPayload => ({
    limit: transactionFilters.limit.value,
    page: transactionFilters.page.value,
    q: transactionFilters.q.value,
    status: transactionFilters.status.value,
    type: type,
    operator: transactionFilters.operator.value,
    dates: transactionFilters.dates.value,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: transactionQueryKeys.transactionFilters(buildTransactionFiltersPayload()),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      transactionQueryKeys.transactionFilters(buildTransactionFiltersPayload()),
    ),

    queryFn: ({ signal }) => fetchFiltersTransactions(buildTransactionFiltersPayload()),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      limit: transactionFilters.limit.value,
      q: transactionFilters.q.value,
      status: transactionFilters.status.value,
      operator: transactionFilters.operator.value,
      dates: transactionFilters.dates.value,
    }),
    () => {
      transactionFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    // filters,
    invalidateQuery,
  }
}

export function useDashboardTransactionsStatsQuery() {
  const queryClient = useQueryClient()

  const buildTransactionFiltersPayload = (): DashboardTransactionsStatsPayload => ({
    dates: transactionFilters.dates.value,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: transactionQueryKeys.transactionDashboardStats(buildTransactionFiltersPayload()),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      transactionQueryKeys.transactionDashboardStats(buildTransactionFiltersPayload()),
    ),

    queryFn: ({ signal }) => fetchDashboardTransactionsStats(buildTransactionFiltersPayload()),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      dates: transactionFilters.dates.value,
    }),
    () => {
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    // filters,
    invalidateQuery,
  }
}

export function useTransactionStatsQuery(type: TransactionTypesEnum) {
  // Ajout du paramètre type
  const queryClient = useQueryClient()

  const buildTransactionStatsPayload = (): DashboardTransactionsStatsPayload => ({
    // Le payload reste similaire pour l'instant
    dates: transactionFilters.dates.value,
    type: type, // Ajout du type au payload
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: transactionQueryKeys.transactionStats(buildTransactionStatsPayload()), // Nouvelle clé de requête
    })
  }

  const query = useQuery({
    queryKey: computed(
      () => transactionQueryKeys.transactionStats(buildTransactionStatsPayload()), // Nouvelle clé de requête
    ),

    queryFn: ({ signal }) => fetchTransactionStats(buildTransactionStatsPayload()), // Appel de la nouvelle fonction
  })
  // si les filtres de dates changent, on refetch
  watch(
    () => ({
      dates: transactionFilters.dates.value,
      type: type, // Observer le changement de type également
    }),
    () => {
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    invalidateQuery,
  }
}

export function useUserTransactionsQuery(id: string) {
  return useQuery({
    queryKey: computed(() => transactionQueryKeys.transaction({ id, country: '' })),
    queryFn: ({ signal }) => fetchUserTransactions({ id }),
    // enabled: false,
  })
}


export function useUpdateTransactionStatusMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (status: string) => updateTransactionStatus({ id, status }),

    onSuccess: () => {
      console.log('update transaction successfully')


    queryClient.invalidateQueries({
      queryKey: transactionQueryKeys.transactionDashboardFilters(buildTransactionFiltersPayload()),
    })

      
    },
  })
}