import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

import type { DefaultFiltersPayload } from '@/services/global.type'
import { providersQueryKeys } from '@/services/providers/provider-query-keys'
import {
  createProvider,
  deleteProvider,
  fetchFiltersProviders,
  fetchProviderById,
  fetchProviderServiceAvailibilities,
  updateProvider,
  updateProviderServiceAvailability,
} from '@/services/providers/provider-service'
import type { ProviderRequest, ProviderServiceAvailabilityPayload, ProviderUpdatePayload } from '@/services/providers/provider-type'

// const { currentCountry: country } = storeToRefs(useCountryStore())

export function useProvidersFiltersQuery(enabled: boolean = true, limit: number = 10) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    limit: 10
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: providersQueryKeys.providersFilters({
        ...filters,
        // country_id: country.value?.id,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      providersQueryKeys.providersFilters({
        ...filters,
        // country_id: country.value?.id,
      }),
    ),

    queryFn: ({ signal }) =>
      fetchFiltersProviders({
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

export function useProviderQuery(id: string) {
  return useQuery({
    queryKey: computed(() => providersQueryKeys.provider({ id })),
    queryFn: ({ signal }) => fetchProviderById({ id }),
    enabled: false,
  })
}

export function useCreateProviderMutation() {
  const { invalidateQuery } = useProvidersFiltersQuery()
  return useMutation({
    mutationFn: (values: ProviderRequest) => createProvider({ data: values }),

    onSuccess: () => {
      console.log('create provider successfully')

      invalidateQuery()
    },
  })
}

export function useUpdateProviderMutation(id: string) {
  const { invalidateQuery } = useProvidersFiltersQuery()
  return useMutation({
    mutationFn: (payload: ProviderUpdatePayload) => updateProvider({ id, data: payload }),

    onSuccess: () => {
      console.log('update provider successfully')

      invalidateQuery()
    },
  })
}

export function useDeleteProviderMutation(id: string) {
  const { invalidateQuery } = useProvidersFiltersQuery()
  return useMutation({
    mutationFn: () => deleteProvider({ id }),

    onSuccess: () => {
      console.log('delete provider successfully')

      invalidateQuery()
    },
  })
}


export function useProviderServiceAvailibilitiesQuery() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: computed(() =>
      providersQueryKeys.serviceAvailability,
    ),
    queryFn: ({ signal }) => fetchProviderServiceAvailibilities(),
    // enabled: false,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: providersQueryKeys.serviceAvailability,
    })
  }

  return {
    invalidateQuery,
    ...query,
  }
}

export function useUpdateProviderServiceAvailibilityMutation() {
  const { invalidateQuery } = useProviderServiceAvailibilitiesQuery()
  return useMutation({
    mutationFn: (payload: ProviderServiceAvailabilityPayload[]) =>
      updateProviderServiceAvailability({ data: payload }),

    onSuccess: () => {
      console.log('update provider service availibility successfully')

      invalidateQuery()
    },
  })
}
