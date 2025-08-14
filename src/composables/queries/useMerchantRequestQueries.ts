import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

import type { MerchantRequestFiltersPayload } from '@/services/global.type'
import { merchantRequestsQueryKeys } from '@/services/merchant-request/merchant-request-query-keys'
import {
  fetchMerchantRequests,
  rejectMerchantRequest,
  validateMerchantRequest,
} from '@/services/merchant-request/merchant-request-service'
import type { RejectMerchantRequest } from '@/services/merchant-request/merchant-request-schema'
import { useMerchantRequestStore } from '@/stores/useMerchantRequestStore'
import { storeToRefs } from 'pinia'
import type { MerchantRequestStatusEnum } from '@/constants/constant.enum'

const merchantRequestFilters = storeToRefs(useMerchantRequestStore())

const buildMerchantRequestFiltersPayload = (): MerchantRequestFiltersPayload => ({
  limit: merchantRequestFilters.limit.value,
  page: merchantRequestFilters.page.value,
  q: merchantRequestFilters.q.value,
  status: merchantRequestFilters.status.value,
  type: merchantRequestFilters.type.value,
  dates: merchantRequestFilters.dates.value,
})

const invalidateQuery = () => {
  const queryClient = useQueryClient()
  queryClient.invalidateQueries({
    queryKey: merchantRequestsQueryKeys.merchantRequestsFilters(
      buildMerchantRequestFiltersPayload(),
    ),
  })
}

export function useMerchantRequestsFiltersQuery(status?:MerchantRequestStatusEnum) {
  merchantRequestFilters.status.value = status;
  const query = useQuery({
    queryKey: computed(() =>
      merchantRequestsQueryKeys.merchantRequestsFilters(buildMerchantRequestFiltersPayload()),
    ),

    queryFn: ({ signal }) => fetchMerchantRequests(buildMerchantRequestFiltersPayload()),
  })

  watch(
    () => ({
      limit: merchantRequestFilters.limit.value,
      q: merchantRequestFilters.q.value,
      status: merchantRequestFilters.status.value,
      type: merchantRequestFilters.type.value,
      dates: merchantRequestFilters.dates.value,
    }),
    () => {
      merchantRequestFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    invalidateQuery,
  }
}

export function useValidateMerchantRequestMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => validateMerchantRequest({ id }),

    onSuccess: () => {
      console.log('validate merchant request successfully')

      queryClient.invalidateQueries({
      queryKey: merchantRequestsQueryKeys.merchantRequestsFilters(
      buildMerchantRequestFiltersPayload(),
    ),
  })
    },
  })
}

export function useRejectMerchantRequestMutation(id: string) {
  
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: RejectMerchantRequest) => rejectMerchantRequest({ id, data: payload }),

    onSuccess: () => {
      console.log('reject merchant request successfully')

      queryClient.invalidateQueries({
      queryKey: merchantRequestsQueryKeys.merchantRequestsFilters(
      buildMerchantRequestFiltersPayload(),
        ),
      })
    },
  })
}
