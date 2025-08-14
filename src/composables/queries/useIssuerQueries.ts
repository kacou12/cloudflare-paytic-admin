import type { DefaultFiltersPayload } from '@/services/global.type'
import { issuersQueryKeys } from '@/services/issuers/issuer-query-keys'
import {
  createIssuer,
  deleteIssuer,
  fetchFiltersIssuers,
  fetchIssuerById,
  updateIssuer,
} from '@/services/issuers/issuer-service'
import type { IssuerRequest, IssuerUpdatePayload } from '@/services/issuers/issuer-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'

export function useIssuersFiltersQuery(limit?: number) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    limit,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: issuersQueryKeys.issuersFilters({
        ...filters,
        // country: country.value?.id,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      issuersQueryKeys.issuersFilters({
        ...filters,
        // country: country.value?.id,
      }),
    ),
    queryFn: ({ signal }) => fetchFiltersIssuers(filters),
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

export function useIssuerQuery(id: string) {
  return useQuery({
    queryKey: computed(() => issuersQueryKeys.issuer({ id })),
    queryFn: ({ signal }) => fetchIssuerById({ id }),
    enabled: false,
  })
}

export function useCreateIssuerMutation() {
  const { invalidateQuery } = useIssuersFiltersQuery()
  return useMutation({
    mutationFn: (values: IssuerRequest) => createIssuer({ data: values }),

    onSuccess: () => {
      console.log('create issuer successfully')

      invalidateQuery()
    },
  })
}

export function useUpdateIssuerMutation(id: string) {
  const { invalidateQuery } = useIssuersFiltersQuery()
  return useMutation({
    mutationFn: (payload: IssuerUpdatePayload) => updateIssuer({ id, data: payload }),

    onSuccess: () => {
      console.log('update issuer successfully')

      invalidateQuery()
    },
  })
}

export function useDeleteIssuerMutation(id: string) {
  const { invalidateQuery } = useIssuersFiltersQuery()
  return useMutation({
    mutationFn: () => deleteIssuer({ id }),

    onSuccess: () => {
      console.log('delete issuer successfully')

      invalidateQuery()
    },
  })
}
