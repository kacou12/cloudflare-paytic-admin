import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

import type { DefaultFiltersPayload } from '../../services/global.type'
import { chargesQueryKeys } from '../../services/charge/charge-query-keys'
import {
  createCharge,
  deleteCharge,
  fetchFiltersCharges,
  fetchChargeById,
  updateCharge,
} from '../../services/charge/charge-service'
import type { ChargeRequest, ChargeUpdatePayload } from '../../services/charge/charge-type'

export function useChargesFiltersQuery(enabled: boolean = true) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: chargesQueryKeys.chargesFilters({
        ...filters,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      chargesQueryKeys.chargesFilters({
        ...filters,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersCharges({
        ...filters,
      }),
    enabled,
  })

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

export function useChargeQuery(id: string) {
  return useQuery({
    queryKey: computed(() => chargesQueryKeys.charge(id)),
    queryFn: ({ signal }) => fetchChargeById(id),
    enabled: false,
  })
}

export function useCreateChargeMutation() {
  const { invalidateQuery } = useChargesFiltersQuery()
  return useMutation({
    mutationFn: (values: ChargeRequest) => createCharge(values),
    onSuccess: () => {
      invalidateQuery()
    },
  })
}

export function useUpdateChargeMutation(id: string) {
  const { invalidateQuery } = useChargesFiltersQuery()
  return useMutation({
    mutationFn: (payload: ChargeUpdatePayload) => updateCharge(id, payload),
    onSuccess: () => {
      invalidateQuery()
    },
  })
}

export function useDeleteChargeMutation(id: string) {
  const { invalidateQuery } = useChargesFiltersQuery()
  return useMutation({
    mutationFn: () => deleteCharge(id),
    onSuccess: () => {
      invalidateQuery()
    },
  })
}
