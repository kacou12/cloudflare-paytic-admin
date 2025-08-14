import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

import type { DashboardTransactionsStatsPayload, DefaultFiltersPayload, TransactionFiltersPayload } from '@/services/global.type'
import { merchantsQueryKeys } from '@/services/merchants/merchant-query-keys'
import {
  createMerchant,
  deleteMerchant,
  fetchFiltersMerchants,
  fetchMerchantById,
  fetchTransactionsFiltersMerchant,
  updateMerchant,
  updateMerchantCharges,
  fetchMerchantStats,
  toggleMerchantStatus, // Added fetchMerchantStats
} from '@/services/merchants/merchant-service'
import type { MerchantPayinPayoutChargePayload, MerchantRequest, MerchantUpdatePayload, MerchantStatsResponse, MerchantStatsPayload, MerchantStatusPayload } from '@/services/merchants/merchant-type' // Added MerchantStatsResponse and MerchantStatsPayload
import { storeToRefs } from 'pinia'
import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore'
import type { MaybeRef } from 'vue' // Added MaybeRef
import { unref } from 'vue' // Added unref



const initialFilters: DefaultFiltersPayload = {
  q: undefined,
  page: 1,
}
  const filters = reactive<DefaultFiltersPayload>({
  ...initialFilters,
})


const transactionFilters = storeToRefs(useTransactionFiltersStore())


export function useMerchantsFiltersQuery() {
  const queryClient = useQueryClient()




  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: merchantsQueryKeys.merchantsFilters({
        ...filters,
        // country_id: country.value?.id,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      merchantsQueryKeys.merchantsFilters({
        ...filters,
        // country_id: country.value?.id,
      }),
    ),

    queryFn: ({ signal }) =>
      fetchFiltersMerchants({
        ...filters,
        // country_id: country.value?.id,
      }),
    // enabled: enabled,
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
      // country_id: country.value?.id,
    }),
    () => {
      filters.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}

export function useTransactionsFiltersMerchantQuery(id: string) {
  const queryClient = useQueryClient()
  
     const buildTransactionFiltersPayload = (): TransactionFiltersPayload => ({
      limit: transactionFilters.limit.value,
      page: transactionFilters.page.value,
      q: transactionFilters.q.value,
      status: transactionFilters.status.value,
      type: transactionFilters.type.value,
      operator: transactionFilters.operator.value,
      dates: transactionFilters.dates.value,
    });
   
  
    const invalidateQuery = () => {
      queryClient.invalidateQueries({
        queryKey: merchantsQueryKeys.transactionsMerchantFilters(buildTransactionFiltersPayload()),
      })
    }
  
    const query = useQuery({
      queryKey: computed(() =>
        merchantsQueryKeys.transactionsMerchantFilters(buildTransactionFiltersPayload()),
      ),
  
      queryFn: ({ signal }) =>
        fetchTransactionsFiltersMerchant(id, buildTransactionFiltersPayload()),
    })
    // si les autres filtre a part la page change , on reset la page courante
    watch(
      () => ({
        limit: transactionFilters.limit.value,
        q: transactionFilters.q.value,
        status: transactionFilters.status.value,
        operator: transactionFilters.operator.value,
        dates: transactionFilters.dates.value,
        type: transactionFilters.type.value
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

export function useMerchantQuery(id: string) {
  return useQuery({
    queryKey: computed(() => merchantsQueryKeys.merchant({ id })),
    queryFn: ({ signal }) => fetchMerchantById({ id }),
    // enabled: false,
  })
}

export function useCreateMerchantMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: MerchantRequest) => createMerchant({ data: values }),

    onSuccess: () => {
      console.log('create merchant successfully')

      queryClient.invalidateQueries({
        queryKey: merchantsQueryKeys.merchantsFilters({
          ...filters,
        // country_id: country.value?.id,
        })
      })
    },
  })
}

export function useUpdateMerchantMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MerchantUpdatePayload) => updateMerchant({ id, data: payload }),

    onSuccess: () => {
      console.log('update merchant successfully')

      queryClient.invalidateQueries({
        queryKey: merchantsQueryKeys.merchantsFilters({
          ...filters,
        // country_id: country.value?.id,
        })
      })

      
    },
  })
}
export function usetoggleMerchantStatusMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MerchantStatusPayload) => toggleMerchantStatus({ id, data: payload }),

    onSuccess: () => {
      console.log('toggle merchant status  merchant successfully')

      queryClient.invalidateQueries({
        queryKey: merchantsQueryKeys.merchantsFilters({
          ...filters,
        // country_id: country.value?.id,
        })
      })

      
    },
  })
}

export function useUpdateMerchantChargesMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MerchantPayinPayoutChargePayload[]) => updateMerchantCharges({  data: payload }),

    onSuccess: () => {
      console.log('update merchant charges successfully')

      queryClient.invalidateQueries({
        queryKey: merchantsQueryKeys.merchantsFilters({
          ...filters,
        // country_id: country.value?.id,
        })
      })

      
    },
  })
}

export function useMerchantStatsQuery(
  merchant_id: string, // merchant_id is mandatory
  
) {
  const transactionFiltersStore = useTransactionFiltersStore()
  const { dates: storeDates } = storeToRefs(transactionFiltersStore)
  const queryClient = useQueryClient()

 
   const buildMerchantStatsPayload = (): DashboardTransactionsStatsPayload => ({
    dates: transactionFilters.dates.value,
    merchant_id

  });

 

  const query = useQuery<MerchantStatsResponse | undefined>({
    queryKey: computed(() => merchantsQueryKeys.merchantStats(buildMerchantStatsPayload())),
    queryFn: () => fetchMerchantStats(buildMerchantStatsPayload()),
   
  })

  watch(
    () => ({
      dates: storeDates.value,
    }),
    () => {
      query.refetch()
    },
    { deep: true },
  )

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: merchantsQueryKeys.merchantStats(buildMerchantStatsPayload()),
    })
  }

  return {
    ...query,
    invalidateQuery,
  }
}

export function useDeleteMerchantMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteMerchant({ id }),

    onSuccess: () => {
      console.log('delete merchant successfully')
      
      queryClient.invalidateQueries({
        queryKey: merchantsQueryKeys.merchantsFilters({
          ...filters,
        // country_id: country.value?.id,
        })
      })
    },
  })
}
