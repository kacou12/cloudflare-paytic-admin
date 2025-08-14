import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

import type { DefaultFiltersPayload } from '@/services/global.type'
import { ipQueryKeys } from '@/services/ip/ip-query-keys'

import type { IpRequest, IpUpdatePayload } from '@/services/ip/ip-type'
import {
  createIp,
  deleteIp,
  fetchFiltersIps,
  fetchIpById,
  updateIp,
} from '@/services/ip/ip-service'

export function useIpsFiltersQuery(enabled: boolean = true) {
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
      queryKey: ipQueryKeys.ipsFilters(filters),
    })
  }

  const query = useQuery({
    queryKey: computed(() => ipQueryKeys.ipsFilters(filters)),
    queryFn: () => fetchFiltersIps({ ...filters }),
  })

  watch(
    () => filters.q,
    () => {
      filters.page = 1
      query.refetch()
    },
  )

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}

export function useIpQuery(x_id: string) {
  return useQuery({
    queryKey: computed(() => ipQueryKeys.ip({ x_id })),
    queryFn: () => fetchIpById(x_id),
    enabled: false,
  })
}

export function useCreateIpMutation() {
  const { invalidateQuery } = useIpsFiltersQuery()
  return useMutation({
    mutationFn: (values: IpRequest) => createIp(values),
    onSuccess: () => {
      invalidateQuery()
    },
  })
}

export function useUpdateIpMutation(x_id: string) {
  const { invalidateQuery } = useIpsFiltersQuery()
  return useMutation({
    mutationFn: (payload: IpUpdatePayload) => updateIp(x_id, payload),
    onSuccess: () => {
      invalidateQuery()
    },
  })
}

export function useDeleteIpMutation(id: number) {
  const { invalidateQuery } = useIpsFiltersQuery()
  return useMutation({
    mutationFn: () => deleteIp(id),
    onSuccess: () => {
      invalidateQuery()
    },
  })
}
