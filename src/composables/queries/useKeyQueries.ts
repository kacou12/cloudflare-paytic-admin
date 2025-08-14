import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { keysQueryKeys } from '@/services/keys/key-query-keys'
import {
  createKey,
  deleteKey,
  fetchFiltersKeys,
  fetchKeyById,
  updateKey,
} from '@/services/keys/key-service'
import type { KeyRequest, KeyUpdatePayload } from '@/services/keys/key-type'
import type { DefaultFiltersPayload } from '@/services/global.type'
import { computed, reactive, watch } from 'vue'
import { merchantsQueryKeys } from '@/services/merchants/merchant-query-keys'
// Queries
export function useKeysFiltersQuery(enabled: boolean = true) {
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
      queryKey: keysQueryKeys.keysFilters({
        ...filters,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      keysQueryKeys.keysFilters({
        ...filters,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersKeys({
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

// Mutations
export function useCreateKeyMutation(merchant_id:string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: KeyRequest) => createKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: merchantsQueryKeys.merchant({id:merchant_id}) })
    },
  })
}

export function useUpdateKeyMutation(merchant_id:string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({data, key_id}:{data: KeyUpdatePayload, key_id: string}) =>  updateKey(key_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: merchantsQueryKeys.merchant({id:merchant_id}) })
    },
  })
}

export function useDeleteKeyMutation(merchant_id:string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: merchantsQueryKeys.merchant({id:merchant_id}) })
    },
  })
}

// export function useRegenerateKeyMutation(id: string) {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: () => regenerateKey(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: keysQueryKeys.key(id) })
//       queryClient.invalidateQueries({ queryKey: keysQueryKeys.all })
//     },
//   })
// }
