import type { DefaultFiltersPayload } from '@/services/global.type'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'
import {
  createIssuerProviderRate,
  fetchIssuerProviderRate,
  updateIssuerProviderRate,
} from '@/services/issuer-provider-rate/Issuer-provider-rate-service'
import type {
  IssuerProviderRateRequest,
  IssuerProviderRateUpdatePayload,
  UpdateIssuerProviderRateUpdatePayload,
} from '@/services/issuer-provider-rate/Issuer-provider-rate-type'
import { IssuerProviderRateQueryKeys } from '@/services/issuer-provider-rate/Issuer-provider-rate-keys'


export function useIssuerProviderRateFiltersQuery(enabled?: boolean) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    limit: 100
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: IssuerProviderRateQueryKeys.IssuerProviderRate,
    })
  }

  const query = useQuery({
    queryKey: computed(() => IssuerProviderRateQueryKeys.IssuerProviderRate),
    queryFn: ({ signal }) => fetchIssuerProviderRate(filters),
    // queryFn: ({ signal }) => fetchFiltersIssuerProviderRate(filters),
    enabled,
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
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

export function useCreateIssuerProviderRateMutation() {
  const { invalidateQuery } = useIssuerProviderRateFiltersQuery()
  return useMutation({
    mutationFn: (values: IssuerProviderRateRequest) => createIssuerProviderRate({ data: values }),

    onSuccess: () => {
      console.log('create issuer successfully')

      invalidateQuery()
    },
  })
}

export function useUpdateIssuerProviderRateMutation() {
  const { invalidateQuery } = useIssuerProviderRateFiltersQuery()
  return useMutation({
    mutationFn: (payload: UpdateIssuerProviderRateUpdatePayload) =>
      updateIssuerProviderRate({ data: payload }),

    onSuccess: () => {
      console.log('update issuer successfully')

      invalidateQuery()
    },
  })
}
